import {updateHorizon,HORIZON_INTERVAL} from './horizon.js';
import {initializeBotLogs,logBotEvent} from './bot-logs.js';
import {ensureStaffGuides} from './staff-panels.js';
import {checkCommunityHighlights,onCommunityReaction,SCAN_MINUTES} from './community-highlights.js';
import {checkRaidReminders,checkDungeonReminders} from './raid-reminders.js';
import {ensureIntelGuides} from './intel-guides.js';
import {ensureGuildPanels,handleGuildFeature,refreshExistingIntroductions,WELCOME_GUIDE_TITLE,WELCOME_GUIDE_BODY} from './guild-features.js';
import {ensureHelpPanel,handleHelp} from './help.js';
import { setupGuild } from './setup.js';
import { Client, GatewayIntentBits, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, MessageFlags } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
let staffChannelId = process.env.VERIFICATION_CHANNEL_ID;
let memberRoleId = process.env.GUILD_MEMBER_ROLE_ID;
let pendingRoleId = process.env.PENDING_ROLE_ID;
if (!token || !guildId) {
  console.error('Missing DISCORD_TOKEN or GUILD_ID in Railway Variables.');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions] });
client.once('clientReady', async () => {
  console.log('Solara online as ' + client.user.tag);
  // Remove previously registered guild slash commands; all features use panels.
  try {
    const {REST,Routes}=await import('discord.js');
    await new REST({version:'10'}).setToken(token).put(Routes.applicationGuildCommands(client.user.id,guildId),{body:[]});
    console.log('Legacy guild slash commands cleared.');
  } catch(error){console.error('Could not clear legacy slash commands:',error);}
  try {
    const guild=await client.guilds.fetch(guildId);
    const result=await setupGuild(guild);
    staffChannelId=result.verificationChannelId;
    memberRoleId=result.memberRoleId;
    pendingRoleId=result.pendingRoleId;
    console.log('Automatic Red Sun Rising setup complete:',JSON.stringify(result));
    // Each feature initializes independently so a broken guide or external
    // source cannot prevent welcome verification and Horizon boards.
    const run=async(name,fn)=>{
      try{await fn();console.log('Solara initialized:',name);}
      catch(error){console.error('Solara initialization failed:',name,error);logBotEvent('error',name+' initialization failed',error?.message);}
    };
    await run('welcome verification',()=>ensureVerificationPanel(guild));
    await run('help panel',()=>ensureHelpPanel(guild));
    await run('guild panels',()=>ensureGuildPanels(guild));
    await run('staff guides',()=>ensureStaffGuides(guild));
    initializeBotLogs(guild);
    await run('Horizon boards',()=>updateHorizon(guild,logBotEvent));
    setInterval(()=>updateHorizon(guild,logBotEvent).catch(error=>logBotEvent('error','Horizon refresh failed',error.message)),HORIZON_INTERVAL);
    await run('community highlights',()=>checkCommunityHighlights(guild));
    setInterval(()=>checkCommunityHighlights(guild).catch(e=>console.error('Highlight scan failed',e)),SCAN_MINUTES*60000);
    await run('raid reminders',()=>checkRaidReminders(guild));
    await run('dungeon reminders',()=>checkDungeonReminders(guild));
    setInterval(()=>Promise.all([checkRaidReminders(guild),checkDungeonReminders(guild)]).catch(e=>console.error('Event reminder interval failed',e)),15000);
    await run('intel guides',()=>ensureIntelGuides(guild));
    await run('introduction migration',async()=>{
      const migration=await refreshExistingIntroductions(guild);
      console.log('Existing introduction cards refreshed:',migration.updated);
    });
    await run('verification queue',()=>migrateVerificationQueue(guild));
    console.log('Help, onboarding and guild activity panels initialized.');
  } catch (error) {console.error('Automatic guild setup failed:',error);logBotEvent('error','Guild setup failed',error?.message);}
});
async function ensureVerificationPanel(guild) {
  await guild.channels.fetch();
  const channel=guild.channels.cache.find(c=>c.name==='welcome'&&c.isTextBased());
  if(!channel)return;
  const messages=await channel.messages.fetch({limit:100});
  const managed=[...messages.values()].filter(m=>m.author.id===client.user.id&&(
    m.content.includes('SOLARA / GUILD & SERVER GUIDE')||
    m.content.includes('SOLARA / GATES OF THE DAWN')||
    m.components.some(row=>row.components.some(c=>c.customId==='verify:start'))
  )).sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
  console.log('Welcome migration: found '+managed.length+' managed posts in #welcome');
  const onboard=guild.channels.cache.find(c=>c.name==='onboarding');
  const guide=WELCOME_GUIDE_BODY.replace(/#([a-z][a-z0-9-]+)/g,(label,name)=>{
    const target=guild.channels.cache.find(c=>c.name===name);
    return target?'<#'+target.id+'>':label;
  });
  const guideText='## '+WELCOME_GUIDE_TITLE+'\n\n'+guide;
  const verification=['## ☀️  SOLARA / GATES OF THE DAWN','','**The sun rises for those who stand together.**','','Welcome to **Red Sun Rising**, a private home for guild adventurers.','','**I.** Select **Enter the Gates** below.','**II.** Enter your WoW character name.','**III.** Await a private guild staff review.','**IV.** Once approved, begin your journey in '+(onboard?'<#'+onboard.id+'>':'#onboarding')+'.','','*Your guild adventure begins at dawn.*'].join('\n');
  const plain={embeds:[],components:[],allowedMentions:{parse:[]}};
  const verifyPayload={...plain,content:verification,components:[new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('verify:start').setLabel('Enter the Gates').setStyle(ButtonStyle.Primary))]};
  // Discord orders messages by creation time, not edit time. Reuse the older
  // message for the guide and the newer message for verification.
  // Existing Discord messages cannot be moved. Reassign the oldest message
  // to the guide and the next-oldest to verification; preserve the button.
  let first=managed[0];
  if(first)await first.edit({...plain,content:guideText});
  else first=await channel.send({...plain,content:guideText});
  let second=managed[1];
  if(second)await second.edit(verifyPayload);
  else second=await channel.send(verifyPayload);
  for(const extra of managed.slice(2))await extra.delete().catch(error=>console.warn('Old welcome duplicate removal failed',error.message));
  console.log('Welcome order verified by message IDs: guide='+first.id+' verification='+second.id);

}

function verificationText(member,character,status){
 return ['☀️ **GUILD VERIFICATION REQUEST**','**Discord member:** '+member,'**Character name:** '+character,'**Status:** '+status,'','━━━━━━━━━━━━━━━━━━━━'].join('\n');
}
async function migrateVerificationQueue(guild){
 const channel=guild.channels.cache.find(c=>c.name==='verification-queue'&&c.isTextBased());if(!channel)return;
 const messages=await channel.messages.fetch({limit:100}).catch(()=>null);
 for(const m of messages?.values()||[]){
  if(m.author.id!==client.user.id)continue;
  const embed=m.embeds[0];
  const isOldEmbed=embed?.title?.includes('Guild Verification Request');
  const isOldText=m.content.includes('GUILD VERIFICATION REQUEST');
  if(!isOldEmbed&&!isOldText)continue;
  const field=name=>embed?.fields?.find(f=>f.name===name)?.value;
  const read=name=>m.content.match(new RegExp('\\*\\*'+name+'\\*\\*\\s*\\n([^\\n]+)'))?.[1];
  const inline=name=>m.content.match(new RegExp('\\*\\*'+name+':\\*\\*\\s*([^\\n]+)'))?.[1];
  const member=field('Discord member')||inline('Discord member')||read('Discord member')||'Not provided';
  const character=field('Character name')||inline('Character name')||read('Character name')||'Not provided';
  const status=field('Status')||inline('Status')||read('Status')||'Not provided';
  const content=verificationText(member,character,status);
  if(m.content!==content||m.embeds.length)await m.edit({content,embeds:[],allowedMentions:{parse:[]}}).catch(e=>console.warn('Verification migration failed',m.id,e.message));
 }
}
client.on('guildMemberAdd',async member=>{
  if(member.guild.id!==guildId)return;
  try {
    const role=member.guild.roles.cache.find(r=>r.name==='Pending Verification');
    if(role)await member.roles.add(role,'Awaiting guild verification');
  } catch(error){console.error('Pending verification role failed:',error);}
});
client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.inGuild() || interaction.guildId !== guildId) return;
    if ((interaction.isButton()&&/^(rules:|onboard:|lfg:|dungeon:|raid:|event:|ping:)/.test(interaction.customId))||(interaction.isStringSelectMenu()&&(interaction.customId==='onboard:select'||(interaction.customId.startsWith('raid:choose-class:')||interaction.customId.startsWith('raid:choose-spec:'))))||(interaction.isModalSubmit()&&/^(lfg:form|raid:form|dungeon:form)$/.test(interaction.customId))) return await handleGuildFeature(interaction);
    if ((interaction.isButton()&&interaction.customId.startsWith('help:'))||(interaction.isModalSubmit()&&interaction.customId.startsWith('helpform:'))) return await handleHelp(interaction);
    if (interaction.isButton()&&interaction.customId==='verify:start'){
      if(memberRoleId&&interaction.member.roles.cache.has(memberRoleId))return interaction.reply({content:'You are already verified. Visit #onboarding to customize your roles.',flags:MessageFlags.Ephemeral});
      if(!staffChannelId)return interaction.reply({content:'Verification is temporarily unavailable. Please contact guild leadership.',flags:MessageFlags.Ephemeral});
      const modal=new ModalBuilder().setCustomId('verify_form').setTitle('Red Sun Rising Verification');
      modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('character').setLabel('Your WoW character name').setStyle(TextInputStyle.Short).setMaxLength(60).setRequired(true)));
      return interaction.showModal(modal);
    }
    if (interaction.isModalSubmit() && interaction.customId === 'verify_form') {
      await interaction.deferReply({flags:MessageFlags.Ephemeral});
      const channel = await client.channels.fetch(staffChannelId).catch(()=>null);
      if (!channel?.isTextBased()) return interaction.editReply('Verification channel is unavailable. Please contact staff.');
      const character = interaction.fields.getTextInputValue('character').trim();
      const requestText=verificationText('<@'+interaction.user.id+'>',character,'Pending staff review');
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('approve:'+interaction.user.id).setLabel('Approve').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('reject:'+interaction.user.id).setLabel('Reject').setStyle(ButtonStyle.Danger));
      await channel.send({content:requestText,embeds:[],components:[buttons],allowedMentions:{parse:[]}});
      if (pendingRoleId) await interaction.member.roles.add(pendingRoleId).catch(e=>console.error('Pending role:',e.message));
      return interaction.editReply('Your verification request was sent to guild staff. ☀️');
    }
    if (interaction.isButton() && /^(approve|reject):\d+$/.test(interaction.customId)) {
      if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({content:'Only authorized staff can review verification requests.',flags:MessageFlags.Ephemeral});
      await interaction.deferReply({flags:MessageFlags.Ephemeral});
      const [action,userId] = interaction.customId.split(':');
      const member = await interaction.guild.members.fetch(userId).catch(()=>null);
      if (!member) return interaction.editReply('That member is no longer in the server.');
      if (action==='approve' && !memberRoleId) return interaction.editReply('GUILD_MEMBER_ROLE_ID is not configured.');
      if (action==='approve') await member.roles.add(memberRoleId);
      if (pendingRoleId) await member.roles.remove(pendingRoleId).catch(()=>{});
      const original=interaction.message;
      const fields=original.embeds[0]?.fields||[];
      const characterName=fields.find(f=>f.name==='Character name')?.value||
        original.content.match(/\*\*Character name\*\*\s*\n([^\n]+)/)?.[1]||'Not provided';
      const updatedText=verificationText('<@'+userId+'>',characterName,(action==='approve'?'Approved':'Rejected')+' by <@'+interaction.user.id+'>');
      await interaction.message.edit({content:updatedText,embeds:[],components:[],allowedMentions:{parse:[]}});
      return interaction.editReply(action==='approve'?'Member verified.':'Request rejected.');
    }
  } catch (error) {
    console.error('Interaction error:',error);
    logBotEvent('error','Discord interaction failed',error?.message);
    const msg='Something went wrong. Please notify staff.';
    if (interaction.deferred || interaction.replied) await interaction.followUp({content:msg,flags:MessageFlags.Ephemeral}).catch(()=>{});
    else await interaction.reply({content:msg,flags:MessageFlags.Ephemeral}).catch(()=>{});
  }
});
process.on('unhandledRejection',error=>{console.error('Unhandled rejection:',error);logBotEvent('error','Unhandled promise rejection',error?.message||error);});
process.on('uncaughtExceptionMonitor',error=>{logBotEvent('error','Uncaught exception',error?.message||error);});
client.on('messageReactionAdd',onCommunityReaction);
client.on('messageReactionRemove',onCommunityReaction);
client.login(token).catch(error=>{console.error('Discord login failed:',error.message);process.exit(1);});
