import {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,MessageFlags,PermissionFlagsBits,StringSelectMenuBuilder} from 'discord.js';
const RED=0xb83b32;
const questions=[
 ['experience','Experience',['New Player','Returning Player','Experienced Player','Veteran']],
 ['interest','Primary interests',['Social','Raiding','Dungeons','Questing','Professions','Collecting']],
 ['role','Combat role',['Tank','Healer','DPS','Flexible','Still Learning']],
 ['faction','Faction',['Alliance','Horde','Undecided']],
 ['class','Main class',['Warrior','Paladin','Hunter','Rogue','Priest','Shaman','Mage','Warlock','Druid','Monk','Death Knight','Demon Hunter','Evoker','Undecided']],
 ['playstyle','Playstyle',['Casual','Semi-Competitive','Competitive','Mixed']],
 ['notifications','Notifications',['Raid Pings','Dungeon Pings','Guild Event Pings','Game Update Pings','None']],
 ['participation','Guild activities',['Regularly','Occasionally','Not Sure Yet']]
];
const sessions=new Map();
const roleKeys=['experience','interest','role','class','playstyle','notifications'];
function button(id,label,style=ButtonStyle.Primary){return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);}
async function panel(guild,name,marker,title,description,buttons){
 const ch=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());if(!ch)return;
 const messages=await ch.messages.fetch({limit:50}).catch(()=>null);
 if(messages?.some(m=>m.author.id===guild.client.user.id&&m.embeds.some(e=>e.footer?.text===marker)))return;
 await ch.send({embeds:[new EmbedBuilder().setColor(RED).setTitle(title).setDescription(description).setFooter({text:marker})],components:[new ActionRowBuilder().addComponents(buttons)]});
}
export async function ensureGuildPanels(guild){
 await guild.channels.fetch();
 await panel(guild,'onboarding','solara-onboarding-v2','☀️ RED SUN RISING / ONBOARDING','Verified guild members can customize their experience. Choose your class, role, interests, and notification preferences. You can repeat onboarding to update your roles.',[button('onboard:start','Start Onboarding')]);
 await panel(guild,'group-finder','solara-lfg-v1','⚔️ RED SUN RISING / FIND A GROUP','Looking for dungeon, raid, questing, or farming partners? Create a group listing and let other guild members join.',[button('lfg:new','Create Group')]);
 await panel(guild,'raid-signups','solara-raids-v1','☀️ RED SUN RISING / RAID EVENTS','Raid leaders can create events with a time and signup slots. Members can join or leave with the buttons on each event.',[button('raid:new','Schedule Raid')]);
}
function stepPayload(userId){
 const session=sessions.get(userId);const [key,label,options]=questions[session.step];
 const menu=new StringSelectMenuBuilder().setCustomId('onboard:select').setPlaceholder('Choose '+label).addOptions(options.map(v=>({label:v,value:v})));
 return {content:'☀️ **Onboarding — '+(session.step+1)+'/'+questions.length+'**\n'+label,components:[new ActionRowBuilder().addComponents(menu)],flags:MessageFlags.Ephemeral};
}
async function applyRoles(interaction,answers){
 const member=await interaction.guild.members.fetch(interaction.user.id);
 const names=questions.filter(([key])=>roleKeys.includes(key)).flatMap(([key,,options])=>options).filter(x=>x!=='None'&&x!=='Undecided');
 const previous=member.roles.cache.filter(r=>names.includes(r.name)&&!r.managed);
 const desired=Object.entries(answers).filter(([k,v])=>roleKeys.includes(k)&&v!=='None'&&v!=='Undecided').map(([,v])=>v);
 const remove=previous.filter(r=>!desired.includes(r.name));
 if(remove.size)await member.roles.remove(remove);
 for(const name of desired){const role=interaction.guild.roles.cache.find(r=>r.name===name);if(role&&!member.roles.cache.has(role.id))await member.roles.add(role);}
 const complete=interaction.guild.roles.cache.find(r=>r.name==='Onboarding Complete');
 if(complete)await member.roles.add(complete);
}
export async function handleGuildFeature(interaction){
 const id=interaction.customId||'';
 if(id==='onboard:start'){
  if(!interaction.member.roles.cache.some(r=>r.name==='Guild Member'))return interaction.reply({content:'Please complete guild verification first.',flags:MessageFlags.Ephemeral});
  sessions.set(interaction.user.id,{step:0,answers:{}});
  return interaction.reply(stepPayload(interaction.user.id));
 }
 if(id==='onboard:select'&&interaction.isStringSelectMenu()){
  const session=sessions.get(interaction.user.id);if(!session)return interaction.reply({content:'Start onboarding again to continue.',flags:MessageFlags.Ephemeral});
  session.answers[questions[session.step][0]]=interaction.values[0];session.step++;
  if(session.step<questions.length){const payload=stepPayload(interaction.user.id);delete payload.flags;return interaction.update(payload);}
  sessions.delete(interaction.user.id);
  await interaction.deferUpdate();
  await applyRoles(interaction,session.answers);
  await interaction.editReply({content:'☀️ Onboarding complete! Your preference roles have been updated.\n'+Object.entries(session.answers).map(([k,v])=>'**'+k+':** '+v).join('\n'),components:[]});
  const ch=interaction.guild.channels.cache.find(c=>c.name==='introductions'&&c.isTextBased());
  if(ch)await ch.send({embeds:[new EmbedBuilder().setColor(RED).setTitle('☀️ Guild Adventurer').setDescription('<@'+interaction.user.id+'>').addFields(Object.entries(session.answers).slice(0,8).map(([k,v])=>({name:k,value:v,inline:true})))],allowedMentions:{parse:[]}});
  return;
 }
 if(id==='lfg:new'||id==='raid:new'){
  const raid=id==='raid:new';
  if(!interaction.member.roles.cache.some(r=>r.name==='Guild Member'))return interaction.reply({content:'Guild verification is required.',flags:MessageFlags.Ephemeral});
  if(raid&&!interaction.memberPermissions?.has(PermissionFlagsBits.ManageEvents)&&!interaction.member.roles.cache.some(r=>['Raid Leader','Officer','Guild Leader','Administrator'].includes(r.name)))return interaction.reply({content:'Only raid leaders and authorized staff can schedule raids.',flags:MessageFlags.Ephemeral});
  const modal=new ModalBuilder().setCustomId(raid?'raid:form':'lfg:form').setTitle(raid?'Schedule Guild Raid':'Create Guild Group');
  const fields=raid?[['title','Raid name'],['when','Date, time and timezone'],['details','Requirements and notes'],['slots','Maximum signups (2–40)']]:[['title','Activity or dungeon'],['when','When and timezone'],['details','Roles needed / notes'],['slots','Maximum members (2–40)']];
  for(const [key,label] of fields)modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(key).setLabel(label).setStyle(key==='details'?TextInputStyle.Paragraph:TextInputStyle.Short).setRequired(true).setMaxLength(key==='details'?500:100)));
  return interaction.showModal(modal);
 }
 if((id==='raid:form'||id==='lfg:form')&&interaction.isModalSubmit()){
  const raid=id.startsWith('raid');const title=interaction.fields.getTextInputValue('title').trim(),when=interaction.fields.getTextInputValue('when').trim(),details=interaction.fields.getTextInputValue('details').trim(),slots=Number(interaction.fields.getTextInputValue('slots'));
  if(!Number.isInteger(slots)||slots<2||slots>40)return interaction.reply({content:'Maximum members must be a number from 2 to 40.',flags:MessageFlags.Ephemeral});
  const ch=interaction.guild.channels.cache.find(c=>c.name===(raid?'raid-signups':'group-finder')&&c.isTextBased());
  if(!ch)return interaction.reply({content:'The event channel is unavailable.',flags:MessageFlags.Ephemeral});
  const embed=new EmbedBuilder().setColor(RED).setTitle((raid?'⚔️ Raid: ':'☀️ Group: ')+title).addFields({name:'When',value:when},{name:'Details',value:details},{name:'Organizer',value:'<@'+interaction.user.id+'>'},{name:'Members (1/'+slots+')',value:'<@'+interaction.user.id+'>'}).setFooter({text:'solara-event|'+slots+'|'+interaction.user.id});
  await ch.send({embeds:[embed],components:[new ActionRowBuilder().addComponents(button('event:join','Join'),button('event:leave','Leave',ButtonStyle.Secondary),button('event:close','Close',ButtonStyle.Danger))],allowedMentions:{parse:[]}});
  return interaction.reply({content:'Your '+(raid?'raid':'group')+' listing was created.',flags:MessageFlags.Ephemeral});
 }
 if(id.startsWith('event:')&&interaction.isButton()){
  await interaction.deferReply({flags:MessageFlags.Ephemeral});
  const original=interaction.message.embeds[0];const match=/^solara-event\|(\d+)\|(\d+)$/.exec(original?.footer?.text||'');
  if(!match)return interaction.editReply('This listing is not recognized.');
  const [,capacity,owner]=match;const isStaff=interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages);
  if(id==='event:close'){
    if(interaction.user.id!==owner&&!isStaff)return interaction.editReply('Only the organizer or staff can close this listing.');
    await interaction.message.edit({components:[],embeds:[EmbedBuilder.from(original).setColor(0x777777).setTitle(original.title+' — CLOSED')]});
    return interaction.editReply('Listing closed.');
  }
  const field=original.fields.find(f=>f.name.startsWith('Members ('));
  const users=[...field.value.matchAll(/<@(\d+)>/g)].map(m=>m[1]);
  const next=id==='event:join'?[...new Set([...users,interaction.user.id])]:users.filter(x=>x!==interaction.user.id);
  if(id==='event:join'&&next.length>Number(capacity))return interaction.editReply('This group is full.');
  if(id==='event:leave'&&interaction.user.id===owner)return interaction.editReply('The organizer must close the listing instead.');
  const fields=original.fields.filter(f=>!f.name.startsWith('Members ('));
  fields.push({name:'Members ('+next.length+'/'+capacity+')',value:next.map(u=>'<@'+u+'>').join('\n')||'No signups'});
  await interaction.message.edit({embeds:[EmbedBuilder.from(original).setFields(fields)],allowedMentions:{parse:[]}});
  return interaction.editReply(id==='event:join'?'You joined the listing.':'You left the listing.');
 }
}
