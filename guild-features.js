import {parseEventTime} from './raid-reminders.js';
import {updateLiveRaidBoard} from './raid-board.js';
import {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,MessageFlags,PermissionFlagsBits,StringSelectMenuBuilder} from 'discord.js';
const RED=0xe88a31;
const RAID_CLASSES=['Warrior','Paladin','Hunter','Rogue','Priest','Shaman','Mage','Warlock','Druid'];
const RAID_SPECS={
 Warrior:['Arms','Fury','Protection'],Paladin:['Holy','Protection','Retribution'],
 Hunter:['Beast Mastery','Marksmanship','Survival'],Rogue:['Assassination','Combat','Subtlety'],
 Priest:['Discipline','Holy','Shadow'],Shaman:['Elemental','Enhancement','Restoration'],
 Mage:['Arcane','Fire','Frost'],Warlock:['Affliction','Demonology','Destruction'],
 Druid:['Balance','Feral Combat','Restoration']
};
function raidMembers(embed){return [...(embed.fields.find(f=>f.name.startsWith('Members ('))?.value||'').matchAll(/<@!?(\d+)>/g)].map(m=>m[1]);}
function rosterSummary(embed){
 const members=raidMembers(embed),classes=classMap(embed);
 return '**Raid roster ('+members.length+')**\n'+(members.map(id=>'<@'+id+'> — '+(classes.get(id)||'Class not selected')).join('\n')||'No signups');
}
function memberClass(member){return RAID_CLASSES.find(name=>member.roles.cache.some(r=>r.name===name))||null;}
function classMap(embed){const field=embed.fields.find(f=>f.name==='Raid Classes');const result=new Map();for(const line of (field?.value||'').replace(/^\|\||\|\|$/g,'').split('\n')){const match=/^<(?:@!?)(\d+)> — (.+)$/.exec(line);if(match)result.set(match[1],match[2]);}return result;}
function setClassField(fields,classes){const result=fields.filter(f=>f.name!=='Raid Classes');if(classes.size)result.push({name:'Raid Classes',value:[...classes].map(([id,name])=>'<@'+id+'> — '+name).join('\n').slice(0,1024)});return result;}

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
const pingRoles=['Raid Pings','Dungeon Pings','Guild Event Pings','Game Update Pings'];
function channelLink(guild,name){const ch=guild.channels.cache.find(c=>c.name===name);return ch?'<#'+ch.id+'>':'#'+name;}
function linkify(guild,text){return text.replace(/#([a-z][a-z0-9-]+)/g,(full,name)=>channelLink(guild,name));}

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
async function infoPanel(guild,name,title,body){
 const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());if(!channel)return;
 const recent=await channel.messages.fetch({limit:100}).catch(()=>null);
 const owned=recent?[...recent.values()].filter(m=>m.author.id===guild.client.user.id):[];
 const matches=owned.filter(m=>m.content.startsWith('## '+title)||(name==='rules'&&(m.components.some(row=>row.components.some(c=>c.customId==='rules:agree'))||m.embeds.some(e=>e.footer?.text==='solara-rules-v1'))));
 const content='## '+title+'\n\n'+linkify(guild,body);
 if(content.length>2000){console.error('Guild info panel exceeds Discord limit:',name,content.length);return;}
 const payload={content,embeds:[],components:[],allowedMentions:{parse:[]}};
 if(matches.length){
  await matches[0].edit(payload);
  for(const duplicate of matches.slice(1))await duplicate.delete().catch(()=>{});
 }else await channel.send(payload);
}
async function pingPanel(guild){
 const channel=guild.channels.cache.find(c=>c.name==='roles-and-pings'&&c.isTextBased());if(!channel)return;
 const recent=await channel.messages.fetch({limit:100}).catch(()=>null);
 const old=recent?.find(m=>m.author.id===guild.client.user.id&&(m.components.some(row=>row.components.some(c=>c.customId?.startsWith('ping:toggle:')))||m.content.startsWith('## 🔥  SOLARA / ROLES & SIGNALS')));
 const body=[
 '## 🔥  SOLARA / ROLES & SIGNALS',
 '',
 '*Choose the call you wish to answer.*',
 '',
 '**⚔️  COMBAT IDENTITY**',
 'Tank · Healer · DPS · Flexible · Still Learning',
 '',
 '**🌅  YOUR ADVENTURE**',
 'Your experience, main class and playstyle are selected in '+channelLink(guild,'onboarding')+'.',
 '',
 '**🔔  GUILD NOTIFICATIONS**',
 'Select any button below to **add or remove** its notification role.',
 '',
 '⚔️ **Raid Pings** — Organized raid events.',
 '🏰 **Dungeon Pings** — Group dungeon runs.',
 '🔥 **Guild Event Pings** — Community activities.',
 '☀️ **Game Update Pings** — Major WoW updates.',
 '',
 '**☀️  UPDATE YOUR CHOICES**',
 'Return to '+channelLink(guild,'onboarding')+' to change your profile. Notification buttons here can be used anytime.',
 '',
 '—',
 '*Notification roles are optional. Staff roles are managed by leadership.*'
 ].join('\n');
 const rows=[new ActionRowBuilder().addComponents(
  button('ping:toggle:0','⚔️ Raid Pings',ButtonStyle.Secondary),
  button('ping:toggle:1','🏰 Dungeon Pings',ButtonStyle.Secondary)),
  new ActionRowBuilder().addComponents(
  button('ping:toggle:2','🔥 Guild Events',ButtonStyle.Secondary),
  button('ping:toggle:3','☀️ Game Updates',ButtonStyle.Secondary))];
 const payload={content:body,embeds:[],components:rows,allowedMentions:{parse:[]}};
 if(old)await old.edit(payload);else await channel.send(payload);
}
export async function ensureGuildPanels(guild){
 await guild.channels.fetch();
 const rules='*Rise together. Stand as one.*\n\n'+RULES.map(([title,body])=>'**'+title+'**\n'+body).join('\n\n')+'\n\n—\n*Violations may result in warnings, restrictions or removal depending on severity.*';
 await infoPanel(guild,'rules','☀️  SOLARA / THE GUILD CODE',rules);
 const welcome='*Every legend begins with a spark.*\n\n**01  ·  YOUR JOURNEY**\nExperience and favorite adventures\n\n**02  ·  YOUR CALLING**\nCombat role, faction and main class\n\n**03  ·  YOUR RHYTHM**\nPlaystyle, guild alerts and activities\n\n—\nEight quick choices. Your answers determine your roles.\n\n*Guild verification is required first.*';
 await panel(guild,'onboarding','solara-onboarding-v2','☀️  SOLARA / THE FIRST LIGHT',welcome,[button('onboard:start','Begin Your Journey')]);
 await panel(guild,'group-finder','solara-lfg-v1','☀️  RED SUN RISING / CALL TO ARMS','*No adventurer stands alone.*\n\n**⚔️  GATHER YOUR PARTY**\nFind allies for dungeons, leveling, quests, world exploration, and farming.\n\n**✦  HOW TO BEGIN**\nSelect **Create Group** to share your activity, time, requirements, and available spaces. Guildmates can join directly.\n\n**🔥  HEADING INTO A RAID?**\nSchedule dungeons with **Schedule Dungeon** to send a start-time ping to the **Dungeon Pings** role. For raids, use #raid-signups. See the live overview in #guild-events.\n\n*Find your people. Answer the call. Rise together.*',[button('lfg:new','Create Group'),button('dungeon:new','Schedule Dungeon')]);
 const infoPanels=[
 ['guild-information','⚔️  RED SUN RISING / GUILD INFORMATION',`*Forged together. Rising as one.*

**☀️  WHO WE ARE**
Red Sun Rising is a World of Warcraft: Forever guild community for leveling, dungeons, raiding, professions, collecting, and friendship. All experience levels and playstyles are welcome.

**♛  LEADERSHIP & SUPPORT**
Guild leadership oversees events, moderation, and membership. Need assistance? Visit #help-and-requests. Official notices appear in #announcements.

**🔥  EVENTS & RAIDING**
#guild-events — Live Raid Board and event updates.
#raid-signups — Raid schedules, rosters, and signups.
#group-finder — Dungeon, quest, leveling, and farming groups.
#roles-and-pings — Choose your notifications.

**📚  WOW FOREVER INTEL**
Explore the Archives for class, profession, dungeon, raid, gear, world, collectible, beginner, and addon guides.

**🌅  GETTING STARTED**
#rules — Read the Guild Code.
#onboarding — Choose your class, role, interests, and playstyle.
#introductions — Meet your guildmates.
Complete onboarding to access the wider guild channels.

**🛡️  GUILD EXPECTATIONS**
Respect fellow members, communicate about group plans, protect private information, and follow the full rules in #rules.

—
*For the latest schedules and rosters, use the linked channels.*`],
 ['announcements','☀️  RED SUN RISING / GUILD BULLETIN','*The latest word from the guild.*\n\n**📣  GUILD ANNOUNCEMENTS**\nLeadership news, important decisions and guild-wide notices.\n\n**🔥  EVENTS & RAID UPDATES**\nUpcoming activities, schedule changes and sign-up reminders.\n\n**🌅  GAME UPDATES**\nWeekly resets, patches and major changes relevant to the guild.\n\n—\n*Announcements are posted by guild leadership and Solara.*'],
 ['welcome','🌅  SOLARA / GUILD & SERVER GUIDE','*Find your place beneath the rising sun.*\n\n**☀️  GETTING STARTED**\n#rules — Review the Guild Code.\n#onboarding — Set your guild preferences.\n#introductions — Meet your fellow adventurers.\n\n**⚔️  GUILD ACTIVITIES**\n#group-finder — Find allies for dungeons and adventures.\n#raid-signups — Join scheduled raids.\n\n**📚  ADVENTURER INTEL**\nExplore class, profession, dungeon, raid and addon guides in the intel channels.\n\n**🛡️  NEED HELP?**\nUse #help-and-requests for questions or private contact with staff.\n\n—\n*Some channels are available only after verification and onboarding.*'],
 ['roles-and-pings','🔥  SOLARA / ROLES & SIGNALS','*Choose the call you wish to answer.*\n\n**⚔️  COMBAT IDENTITY**\nTank · Healer · DPS · Flexible · Still Learning\n\n**🌅  YOUR ADVENTURE**\nExperience, main class, favorite activities and playstyle.\n\n**🔔  GUILD NOTIFICATIONS**\nRaid Pings — Organized raid events.\nDungeon Pings — Group dungeon runs.\nGuild Event Pings — Community activities.\nGame Update Pings — Major WoW updates.\n\n**☀️  UPDATE YOUR CHOICES**\nReturn to #onboarding and complete it again. Solara updates your preference roles and existing introduction card.\n\n—\n*Notification roles are optional. Staff roles are managed by leadership.*']
 ];
 for(const [name,title,body] of infoPanels)if(name!=='roles-and-pings')await infoPanel(guild,name,title,body);
 const hearthPanels=[
  ['screenshots-and-clips','📸  THE HEARTH / MOMENTS WORTH KEEPING',
   '*Every adventure has a story worth sharing.*\n\nShare your WoW Forever screenshots, memorable battles, character appearances, dungeon victories, and gameplay clips. Add a little context so guildmates can celebrate the moment with you.\n\n**☀️ FEATURED MOMENTS**\nStandout community posts may be showcased in #community-highlights.\n\n—\n*Keep posts respectful and follow #rules.*'],
  ['achievements','🏆  THE HEARTH / HALL OF TRIUMPHS',
   '*Big or small, every victory deserves its moment.*\n\nCelebrate level milestones, hard-won loot, dungeon and raid clears, profession progress, rare finds, and personal goals. Tell the guild what you accomplished!\n\n**✦ SHARE THE STORY**\nScreenshots are welcome, and memorable accomplishments may be featured in #community-highlights.'],
  ['suggestions','💡  THE HEARTH / THE IDEA FORGE',
   '*Help shape the future of Red Sun Rising.*\n\nShare suggestions for guild activities, channel organization, raid planning, community events, and Solara features.\n\n**✦ A USEFUL SUGGESTION**\nExplain what you would change, why it would help, and how you imagine it working. Staff can review ideas here without promising every suggestion will be implemented.\n\n—\n*For immediate help, use #help-and-requests.*'],
  ['community-highlights','🔥  THE HEARTH / COMMUNITY HIGHLIGHTS',
   '*The moments that make Red Sun Rising our home.*\n\nThis is the guild showcase for memorable screenshots, impressive achievements, funny exchanges, and wholesome community moments.\n\n**☀️ HOW IT WORKS**\nSolara automatically features member posts from #general, #screenshots-and-clips, #memes, #achievements, #off-topic, and #introductions when they collect **5 or more reactions**. The highlight includes the original post, reaction count, and a link back to the conversation.\n\n*Reactions update the featured post automatically; Solara also checks recent messages periodically.*\n\n—\n*This channel is a curated showcase; members can continue sharing in the original channels.*'],
  ['help-and-requests','🛡️  THE HEARTH / HELP & REQUESTS',
   '*No adventurer has to figure everything out alone.*\n\nAsk for assistance with WoW Forever gameplay, guild activities, roles, onboarding, or finding the right channel. Include relevant details, but never post passwords or other private information.\n\nFor organizing dungeon and quest parties, use #group-finder.']
 ];
 for(const [name,title,body] of hearthPanels)await infoPanel(guild,name,title,body);

 await pingPanel(guild);
 await updateLiveRaidBoard(guild);
 await panel(guild,'raid-signups','solara-raids-v1','☀️  RED SUN RISING / THE WAR TABLE','*When the sun rises, we march together.*\n\n**⚔️  RAID OPERATIONS**\nSchedule a guild raid, reserve your place, and choose your class and specialization.\n\n**✦  PLAN THE BATTLE**\nRaid leaders: select **Schedule Raid** and enter the raid name, start date, timezone, requirements, and group size. Example: `11/15 8:00 AM CST`.\n\n**🔔  THE RALLY SIGNAL**\nAt the scheduled start, Solara will notify members with the **Raid Pings** role in this channel. Enable it in #roles-and-pings.\n\n**✧  THE WAR COUNCIL**\nTrack open raids and class compositions in #guild-events.\n\n*Every raid has its own signup card and private roster viewer.*',[button('raid:new','Schedule Raid')]);
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

function introductionText(userId,answers){
 const value=(key)=>answers[key]||'Not provided';
 return [
 '☀️ **<@'+userId+'> has joined the rising sun!**',
 '',
 '**🌅  THE ADVENTURER**',
 'Experience  ·  '+value('experience'),
 'Interests  ·  '+value('interest'),
 '',
 '**⚔️  THE CALLING**',
 'Combat Role  ·  '+value('role'),
 'Main Class  ·  '+value('class'),
 'Faction  ·  '+value('faction'),
 '',
 '**🔥  THE GUILD LIFE**',
 'Playstyle  ·  '+value('playstyle'),
 'Activities  ·  '+value('participation'),
 'Notifications  ·  '+value('notifications'),
 '',
 '*Forged in flame. United at dawn.*'
 ].join('\n');
}
async function introductionPayload(guild,userId,answers){
 const member=await guild.members.fetch(userId).catch(()=>null);
 const avatar=member?.displayAvatarURL({size:256})||null;
 const embed=new EmbedBuilder()
 .setColor(0xd96a2f)
 .setTitle('☀️ RED SUN RISING  |  NEW ADVENTURER')
 .setDescription(introductionText(userId,answers))
 .setFooter({text:'SOLARA  •  RED SUN RISING ROSTER'});
 if(avatar)embed.setThumbnail(avatar);
 return {content:'',embeds:[embed],allowedMentions:{parse:[]}};
}
function legacyIntroductionUser(message){
 if(!message || !message.author.bot)return null;
 const raw=[message.content,...message.embeds.flatMap(e=>[e.title||'',e.description||'',...e.fields.map(f=>f.value)])].join('\n');
 const matches=[...raw.matchAll(/<@!?(\d{15,22})>/g)].map(m=>m[1]);
 return [...new Set(matches)].length===1?matches[0]:null;
}
async function recentIntroductionMessages(channel,max=500){
 const found=[];let before;
 while(found.length<max){
  const batch=await channel.messages.fetch({limit:Math.min(100,max-found.length),...(before?{before}:{})}).catch(()=>null);
  if(!batch?.size)break;
  found.push(...batch.values());
  before=batch.last().id;
  if(batch.size<100)break;
 }
 return found;
}
async function upsertIntroduction(guild,userId,answers){
 const channel=guild.channels.cache.find(c=>c.name==='introductions'&&c.isTextBased());
 if(!channel)return;
 const messages=await recentIntroductionMessages(channel);
 const own=messages.filter(m=>m.author.id===guild.client.user.id&&legacyIntroductionUser(m)===userId);
 const payload=await introductionPayload(guild,userId,answers);
 if(own.length){
  await own[0].edit(payload);
  // Duplicate bot-created cards are consolidated, never user-authored messages.
  for(const extra of own.slice(1))await extra.delete().catch(error=>console.warn('Could not remove duplicate introduction',extra.id,error.message));
 }else await channel.send(payload);
}
export async function refreshExistingIntroductions(guild){
 const channel=guild.channels.cache.find(c=>c.name==='introductions'&&c.isTextBased());
 if(!channel)return {updated:0};
 const messages=await recentIntroductionMessages(channel);
 const users=new Map();
 for(const message of messages){
  if(message.author.id!==guild.client.user.id)continue;
  const userId=legacyIntroductionUser(message);
  if(!userId)continue;
  if(!users.has(userId))users.set(userId,[]);
  users.get(userId).push(message);
 }
 let updated=0;
 for(const [userId,cards] of users){
  const newest=cards[0];
  // Preserve only data that actually appears in old cards; never invent answers.
  const raw=[newest.content,...newest.embeds.flatMap(e=>[e.description||'',...e.fields.map(f=>f.name+': '+f.value)])].join('\n').replace(/\\n/g,'\n');
  const answers={};
  const labels={experience:'Experience',interest:'Interests',role:'Combat Role',class:'Main Class',faction:'Faction',playstyle:'Playstyle',participation:'Activities',notifications:'Notifications'};
  for(const [key,label] of Object.entries(labels)){
   const line=raw.split('\n').find(line=>line.trim().replace(/\*+/g,'').toLowerCase().startsWith(label.toLowerCase()));
   if(!line)continue;
   const match=line.replace(/\*+/g,'').match(/(?:·|:)\s*(.+)$/);
   if(match)answers[key]=match[1].trim();
  }
  if(!Object.keys(answers).length)continue;
  try {
   await newest.edit(await introductionPayload(guild,userId,answers));
   for(const duplicate of cards.slice(1))await duplicate.delete().catch(()=>{});
  }catch(error){console.warn('Legacy introduction update failed',userId,error.message);continue;}
  updated++;
 }
 return {updated};
}
export async function handleGuildFeature(interaction){
 const id=interaction.customId||'';
 if(id.startsWith('ping:toggle:')&&interaction.isButton()){
  const index=Number(id.slice('ping:toggle:'.length)),name=pingRoles[index];
  if(!name)return interaction.reply({content:'Unknown notification option.',flags:MessageFlags.Ephemeral});
  const member=await interaction.guild.members.fetch(interaction.user.id);
  if(!member.roles.cache.some(r=>r.name==='Guild Member'))return interaction.reply({content:'Guild verification is required first.',flags:MessageFlags.Ephemeral});
  const role=interaction.guild.roles.cache.find(r=>r.name===name);
  if(!role)return interaction.reply({content:'This notification role is not configured.',flags:MessageFlags.Ephemeral});
  const has=member.roles.cache.has(role.id);
  if(has)await member.roles.remove(role,'Solara notification preference');
  else await member.roles.add(role,'Solara notification preference');
  return interaction.reply({content:(has?'🔕 Removed ':'🔔 Enabled ')+name+'.',flags:MessageFlags.Ephemeral});
 }
 if(id==='rules:agree'){
  const role=interaction.guild.roles.cache.find(r=>r.name==='Rules Accepted');
  if(!role)return interaction.reply({content:'Rules acknowledgment is temporarily unavailable. Please contact staff.',flags:MessageFlags.Ephemeral});
  await interaction.member.roles.add(role);
  return interaction.reply({content:'☀️ **Guild Code accepted.**\nContinue to #onboarding once verified.',flags:MessageFlags.Ephemeral});
 }
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
  if(ch)await upsertIntroduction(interaction.guild,interaction.user.id,session.answers);
  return;
 }
 if(id==='lfg:new'||id==='raid:new'||id==='dungeon:new'){
  const raid=id==='raid:new',dungeon=id==='dungeon:new';
  if(!interaction.member.roles.cache.some(r=>r.name==='Guild Member'))return interaction.reply({content:'Guild verification is required.',flags:MessageFlags.Ephemeral});
  if(raid&&!interaction.memberPermissions?.has(PermissionFlagsBits.ManageEvents)&&!interaction.member.roles.cache.some(r=>['Raid Leader','Officer','Guild Leader','Administrator'].includes(r.name)))return interaction.reply({content:'Only raid leaders and authorized staff can schedule raids.',flags:MessageFlags.Ephemeral});
  const modal=new ModalBuilder().setCustomId(raid?'raid:form':dungeon?'dungeon:form':'lfg:form').setTitle(raid?'Schedule Guild Raid':dungeon?'Schedule Dungeon':'Create Guild Group');
  const fields=raid||dungeon?[['title','Raid name'],['when','Date, time and timezone'],['details','Requirements and notes'],['slots','Maximum signups (2–40)']]:[['title','Activity or dungeon'],['when','When and timezone'],['details','Roles needed / notes'],['slots','Maximum members (2–40)']];
  for(const [key,label] of fields)modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(key).setLabel(label).setStyle(key==='details'?TextInputStyle.Paragraph:TextInputStyle.Short).setRequired(true).setMaxLength(key==='details'?500:100)));
  return interaction.showModal(modal);
 }
 if((id==='raid:form'||id==='lfg:form'||id==='dungeon:form')&&interaction.isModalSubmit()){
  const raid=id.startsWith('raid'),dungeon=id.startsWith('dungeon');const title=interaction.fields.getTextInputValue('title').trim(),when=interaction.fields.getTextInputValue('when').trim(),details=interaction.fields.getTextInputValue('details').trim(),slots=Number(interaction.fields.getTextInputValue('slots'));
  if(!Number.isInteger(slots)||slots<2||slots>40)return interaction.reply({content:'Maximum members must be a number from 2 to 40.',flags:MessageFlags.Ephemeral});
  const raidStart=(raid||dungeon)?parseEventTime(when):null;
  if((raid||dungeon)&&(!raidStart||raidStart<=Date.now()))return interaction.reply({content:'Enter a future event time such as **11/15 8:00 AM CST** or **11/15 8:00 AM CT**. Include the timezone. CST is fixed UTC−6; CT follows daylight saving time.',flags:MessageFlags.Ephemeral});
  const ch=interaction.guild.channels.cache.find(c=>c.name===(raid?'raid-signups':'group-finder')&&c.isTextBased());
  if(!ch)return interaction.reply({content:'The event channel is unavailable.',flags:MessageFlags.Ephemeral});
  const embed=new EmbedBuilder().setColor(RED).setTitle((raid?'⚔️ Raid: ':dungeon?'🏰 Dungeon: ':'☀️ Group: ')+title) .addFields({name:'When',value:when},...((raid||dungeon)?[{name:raid?'Raid Start':'Dungeon Start',value:'<t:'+Math.floor(raidStart/1000)+':F>'}]:[]),{name:'Details',value:details},{name:'Organizer',value:'<@'+interaction.user.id+'>'},{name:'Members (1/'+slots+')',value:'<@'+interaction.user.id+'>'}).setFooter({text:'solara-event|'+slots+'|'+interaction.user.id});
  // Members select a class and specialization explicitly using Class & Spec.
  await ch.send({embeds:[embed],components:[new ActionRowBuilder().addComponents(button('event:join','Join'),button('event:leave','Leave',ButtonStyle.Secondary),button('event:close','Close',ButtonStyle.Danger),...(raid?[button('raid:class','Class & Spec',ButtonStyle.Secondary),button('raid:roster','View Roster',ButtonStyle.Secondary)]:[]))],allowedMentions:{parse:[]}});
  if(raid)await updateLiveRaidBoard(interaction.guild).catch(e=>console.error('Raid board refresh failed',e));
  return interaction.reply({content:'Your '+(raid?'raid':dungeon?'dungeon':'group')+' listing was created.',flags:MessageFlags.Ephemeral});
 }
 if(id==='raid:roster'&&interaction.isButton()){
  const embed=interaction.message.embeds[0];
  if(!embed?.title?.startsWith('⚔️ Raid:'))return interaction.reply({content:'Raid roster unavailable.',flags:MessageFlags.Ephemeral});
  return interaction.reply({content:rosterSummary(embed).slice(0,1900),flags:MessageFlags.Ephemeral,allowedMentions:{parse:[]}});
 }
 if(id==='raid:class'&&interaction.isButton()){
  const original=interaction.message.embeds[0];
  if(!original?.title?.startsWith('⚔️ Raid:')||original.title.includes(' — CLOSED'))return interaction.reply({content:'This raid is unavailable.',flags:MessageFlags.Ephemeral});
  const members=original.fields.find(f=>f.name.startsWith('Members ('))?.value||'';
  if(!members.includes('<@'+interaction.user.id+'>'))return interaction.reply({content:'Join this raid first, then select your class.',flags:MessageFlags.Ephemeral});
  const menu=new StringSelectMenuBuilder().setCustomId('raid:choose-class:'+interaction.message.id).setPlaceholder('Select your class first').addOptions(RAID_CLASSES.map(name=>({label:name,value:name})));
  return interaction.reply({content:'Choose the class you will bring to this raid:',components:[new ActionRowBuilder().addComponents(menu)],flags:MessageFlags.Ephemeral});
 }
 if(id.startsWith('raid:choose-class:')&&interaction.isStringSelectMenu()){
  const messageId=id.slice('raid:choose-class:'.length),chosen=interaction.values[0];
  if(!RAID_CLASSES.includes(chosen))return interaction.update({content:'Invalid class.',components:[]});
  const menu=new StringSelectMenuBuilder().setCustomId('raid:choose-spec:'+messageId+':'+chosen)
   .setPlaceholder('Choose your '+chosen+' specialization')
   .addOptions(RAID_SPECS[chosen].map(name=>({label:name,value:name})));
  return interaction.update({content:'**'+chosen+'** selected. Now choose your specialization:',components:[new ActionRowBuilder().addComponents(menu)]});
 }
 if(id.startsWith('raid:choose-spec:')&&interaction.isStringSelectMenu()){
  const match=/^raid:choose-spec:(\d+):(.+)$/.exec(id);
  const chosen=interaction.values[0],className=match?.[2];
  if(!match||!RAID_SPECS[className]?.includes(chosen))return interaction.update({content:'Invalid specialization.',components:[]});
  const channel=interaction.guild.channels.cache.find(c=>c.name==='raid-signups'&&c.isTextBased());
  const message=await channel?.messages.fetch(match[1]).catch(()=>null);
  const original=message?.embeds[0];
  if(!original?.title?.startsWith('⚔️ Raid:')||original.title.includes(' — CLOSED'))return interaction.update({content:'This raid is unavailable.',components:[]});
  if(!raidMembers(original).includes(interaction.user.id))return interaction.update({content:'Join the raid first.',components:[]});
  const classes=classMap(original);classes.set(interaction.user.id,className+' — '+chosen);
  await message.edit({embeds:[EmbedBuilder.from(original).setFields(setClassField(original.fields,classes))]});
  await updateLiveRaidBoard(interaction.guild).catch(e=>console.error('Raid board refresh failed',e));
  return interaction.update({content:'Your raid selection is **'+className+' — '+chosen+'**.',components:[]});
 }
 if(id.startsWith('event:')&&interaction.isButton()){
  await interaction.deferReply({flags:MessageFlags.Ephemeral});
  const original=interaction.message.embeds[0];const match=/^solara-event\|(\d+)\|(\d+)$/.exec(original?.footer?.text||'');
  if(!match)return interaction.editReply('This listing is not recognized.');
  const [,capacity,owner]=match;const isStaff=interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages);
  if(id==='event:close'){
    if(interaction.user.id!==owner&&!isStaff)return interaction.editReply('Only the organizer or staff can close this listing.');
    await interaction.message.edit({components:[],embeds:[EmbedBuilder.from(original).setColor(0x777777).setTitle(original.title+' — CLOSED')]});
    if(original.title?.startsWith('⚔️ Raid:'))await updateLiveRaidBoard(interaction.guild).catch(e=>console.error('Raid board refresh failed',e));
    return interaction.editReply('Listing closed.');
  }
  const field=original.fields.find(f=>f.name.startsWith('Members ('));
  const users=[...field.value.matchAll(/<@(\d+)>/g)].map(m=>m[1]);
  const next=id==='event:join'?[...new Set([...users,interaction.user.id])]:users.filter(x=>x!==interaction.user.id);
  if(id==='event:join'&&next.length>Number(capacity))return interaction.editReply('This group is full.');
  if(id==='event:leave'&&interaction.user.id===owner)return interaction.editReply('The organizer must close the listing instead.');
  const classes=classMap(original);
  if(id==='event:leave')classes.delete(interaction.user.id);

  const fields=original.fields.filter(f=>!f.name.startsWith('Members (')&&f.name!=='Raid Classes');
  fields.push({name:'Members ('+next.length+'/'+capacity+')',value:next.map(u=>'<@'+u+'>').join('\n')||'No signups'});
  await interaction.message.edit({embeds:[EmbedBuilder.from(original).setFields(setClassField(fields,classes))],allowedMentions:{parse:[]}});
  if(original.title?.startsWith('⚔️ Raid:'))await updateLiveRaidBoard(interaction.guild).catch(e=>console.error('Raid board refresh failed',e));
  return interaction.editReply(id==='event:join'?'You joined the listing.':'You left the listing.');
 }
}
