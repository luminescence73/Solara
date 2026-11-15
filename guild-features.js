import {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,MessageFlags,PermissionFlagsBits,StringSelectMenuBuilder} from 'discord.js';
const RED=0xe88a31;
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
const RULES=[
 ['I. RESPECT THE FLAME','Respect everyone. Harassment, discrimination, bullying and personal attacks are prohibited.'],
 ['II. STAND UNITED','Keep disagreements civil. Avoid hostility, drama and public arguments.'],
 ['III. HONOR YOUR ALLIES','Help new and returning players. Do not shame anyone for their class, gear, experience or performance.'],
 ['IV. FIGHT FAIRLY','Respect group expectations and raid instructions. Communicate when plans change or you cannot attend.'],
 ['V. PROTECT THE GUILD','Do not share private guild discussions, personal information or confidential staff matters without permission.'],
 ['VI. KEEP THE HEARTH CLEAN','No spam, scams, malicious links, inappropriate content or disruptive behavior.'],
 ['VII. RESPECT LEADERSHIP','Follow reasonable staff instructions. Raise concerns about decisions privately.'],
 ['VIII. GUARD THE GATES','This Discord is for Red Sun Rising guild members only. Do not invite outsiders without leadership approval.']
];
const roleKeys=['experience','interest','role','class','playstyle','notifications'];
function button(id,label,style=ButtonStyle.Primary){return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);}
async function panel(guild,name,marker,title,description,buttons){
 const ch=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());if(!ch)return;
 const messages=await ch.messages.fetch({limit:100}).catch(()=>null);
 const buttonId=buttons[0].data.custom_id;
 const old=messages?.find(m=>m.author.id===guild.client.user.id&&(m.embeds.some(e=>e.footer?.text===marker)||m.components.some(row=>row.components.some(c=>c.customId===buttonId))));
 const content='## '+title+'\n\n'+description;
 const payload={content,embeds:[],components:[new ActionRowBuilder().addComponents(buttons)],allowedMentions:{parse:[]}};
 if(old)await old.edit(payload);else await ch.send(payload);
}
export async function ensureGuildPanels(guild){
 await guild.channels.fetch();
 const rules='*Rise together. Stand as one.*\n\n'+RULES.map(([title,body])=>'**'+title+'**\n'+body).join('\n\n')+'\n\n—\n*Violations may result in warnings, restrictions or removal depending on severity.*\n\n**Read and accept the Guild Code below.**';
 await panel(guild,'rules','solara-rules-v1','☀️  SOLARA / THE GUILD CODE',rules,[button('rules:agree','Accept Guild Code',ButtonStyle.Success)]);
 const welcome='*Every legend begins with a spark.*\n\n**01  ·  YOUR JOURNEY**\nExperience and favorite adventures\n\n**02  ·  YOUR CALLING**\nCombat role, faction and main class\n\n**03  ·  YOUR RHYTHM**\nPlaystyle, guild alerts and activities\n\n—\nEight quick choices. Your answers determine your roles.\n\n*Guild verification and rule acknowledgment are required first.*';
 await panel(guild,'onboarding','solara-onboarding-v2','☀️  SOLARA / THE FIRST LIGHT',welcome,[button('onboard:start','Begin Your Journey')]);
 await panel(guild,'group-finder','solara-lfg-v1','⚔  SOLARA / CALL TO ARMS','*No adventurer stands alone.*\n\nFind allies for dungeons, raids, quests and farming. Create a listing and let guildmates join.',[button('lfg:new','Create Group')]);
 await panel(guild,'raid-signups','solara-raids-v1','🔥  SOLARA / THE WAR TABLE','*When the sun rises, we march together.*\n\nRaid leaders can schedule encounters. Members can claim a spot using the signup buttons.',[button('raid:new','Schedule Raid')]);
}
function stepPayload(userId){
 const session=sessions.get(userId);const [key,label,options]=questions[session.step];
 const menu=new StringSelectMenuBuilder().setCustomId('onboard:select').setPlaceholder('Select '+label).addOptions(options.map(v=>({label:v,value:v})));
 const count=session.step+1;
 const content='## ☀️  THE FIRST LIGHT\n\n**'+String(count).padStart(2,'0')+' / '+questions.length+'   ·   '+label.toUpperCase()+'**\n\n*Choose what best describes you.*\n\n'+('▰'.repeat(count)+'▱'.repeat(questions.length-count))+'\n\n*You can update your choices later.*';
 return {content,embeds:[],components:[new ActionRowBuilder().addComponents(menu)],flags:MessageFlags.Ephemeral};
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
 if(id==='rules:agree'){
  const role=interaction.guild.roles.cache.find(r=>r.name==='Rules Accepted');
  if(!role)return interaction.reply({content:'Rules acknowledgment is temporarily unavailable. Please contact staff.',flags:MessageFlags.Ephemeral});
  await interaction.member.roles.add(role);
  return interaction.reply({content:'☀️ **Guild Code accepted.**\nContinue to #onboarding once verified.',flags:MessageFlags.Ephemeral});
 }
 if(id==='onboard:start'){
  if(!interaction.member.roles.cache.some(r=>r.name==='Guild Member'))return interaction.reply({content:'Please complete guild verification first.',flags:MessageFlags.Ephemeral});
  if(!interaction.member.roles.cache.some(r=>r.name==='Rules Accepted'))return interaction.reply({content:'Please read #rules and select **I Agree to the Guild Code** before onboarding.',flags:MessageFlags.Ephemeral});
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
