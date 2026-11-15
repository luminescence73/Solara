import {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,MessageFlags,PermissionFlagsBits} from 'discord.js';
const topics=[['game','Game Support',ButtonStyle.Primary],['group','Find a Group',ButtonStyle.Secondary],['raid','Raid Help',ButtonStyle.Secondary],['staff','Contact Staff',ButtonStyle.Danger],['discord','Discord Support',ButtonStyle.Secondary],['faq','FAQ',ButtonStyle.Secondary],['guide','Server Guide',ButtonStyle.Secondary]];
export async function ensureHelpPanel(guild){
  await guild.channels.fetch();
  const channel=guild.channels.cache.find(c=>c.name==='help-and-requests'&&c.isTextBased());
  if(!channel)return;
  const msgs=await channel.messages.fetch({limit:30}).catch(()=>null);
  if(msgs?.some(m=>m.author.id===guild.client.user.id&&m.embeds.some(e=>e.footer?.text==='solara-help-v1')))return;
  const embed=new EmbedBuilder().setColor(0xb83b32).setTitle('☀️ RED SUN RISING / SUPPORT')
  .setDescription('**Select a route below.**\n\n**GAME SUPPORT** — Classes, builds, mechanics, addons, and strategy.\n**FIND A GROUP** — Organize dungeons, raids, and leveling.\n**RAID HELP** — Encounters and preparation.\n**CONTACT STAFF** — Private request to guild leadership.\n**DISCORD SUPPORT** — Roles, channels, and technical issues.\n**FAQ / SERVER GUIDE** — Common questions and navigation.\n\nSolara will try to help first. Staff requests are handled privately.')
  .setFooter({text:'solara-help-v1'});
  const buttons=topics.map(([id,label,style])=>new ButtonBuilder().setCustomId('help:'+id).setLabel(label).setStyle(style));
  await channel.send({embeds:[embed],components:[new ActionRowBuilder().addComponents(buttons.slice(0,4)),new ActionRowBuilder().addComponents(buttons.slice(4))]});
}
const knowledge=[
  {words:['addon','curseforge','mod'],answer:'Use the #addon-intel channel for addon recommendations. Only install addons confirmed compatible with your exact WoW Forever client. Download from trusted addon pages and check version requirements.'},
  {words:['tank','healer','dps','class','spec','specialization'],answer:'Start in #class-intel for your class and specialization. Tank holds enemy attention, healer supports group survival, and DPS focuses on damage and encounter mechanics. Exact builds depend on the game version.'},
  {words:['dungeon','raid','boss','mechanic'],answer:'Check #dungeon-intel or #raid-intel for verified encounter information. Include the dungeon/raid and boss name for a specific answer; Solara will not invent mechanics.'},
  {words:['profession','craft','gather'],answer:'Visit #profession-intel for profession and crafting guides. Include your profession and goal for more targeted help.'},
  {words:['reset','patch','maintenance'],answer:'Check #weekly-intel, #patch-notes and #maintenance-alerts for updates. Solara cannot confirm live changes until verified sources are connected.'},
  {words:['role','onboard','verify'],answer:'Use /verify to request guild verification and /profile to set your basic preferences. More onboarding automation is being developed.'}
];
function answerQuestion(q){
  const words=q.toLowerCase().match(/[a-z]+/g)||[];
  const match=knowledge.find(k=>k.words.some(w=>words.includes(w)));
  return match?.answer||'I do not have a verified answer for that yet. Please check the relevant intel channel or contact staff. A future guide-backed assistant can answer more specific questions once the guide library is populated.';
}
export async function handleHelp(interaction){
  if(interaction.isButton()&&interaction.customId.startsWith('help:')){
    const route=interaction.customId.slice(5);
    if(route==='faq')return interaction.reply({content:'☀️ **FAQ**\n• Verification: /verify\n• Guild preferences: /profile\n• WoW guides: check the intel channels\n• Group activities: use Find a Group\n• Staff matters: Contact Staff',flags:MessageFlags.Ephemeral});
    if(route==='guide')return interaction.reply({content:'☀️ **Server Guide**\nWelcome & Information: rules and onboarding\nGuild Operations: events, raids and group finder\nWoW Intel: classes, dungeons, raids, professions and addons\nLive Updates: patches and resets\nSocial Commons: general chat and community\nStaff Headquarters: private staff-only area',flags:MessageFlags.Ephemeral});
    const modal=new ModalBuilder().setCustomId('helpform:'+route).setTitle(route==='staff'?'Private Staff Request':'Ask Solara');
    const input=new TextInputBuilder().setCustomId('question').setLabel(route==='staff'?'What do you need staff to know?':'What do you need help with?').setStyle(TextInputStyle.Paragraph).setMaxLength(1500).setRequired(true);
    modal.addComponents(new ActionRowBuilder().addComponents(input));
    return interaction.showModal(modal);
  }
  if(interaction.isModalSubmit()&&interaction.customId.startsWith('helpform:')){
    const route=interaction.customId.slice(9);
    const question=interaction.fields.getTextInputValue('question').trim();
    if(route==='staff'){
      const channel=interaction.guild.channels.cache.find(c=>c.name==='staff-chat'&&c.isTextBased());
      if(!channel)return interaction.reply({content:'Staff requests are temporarily unavailable. Please contact a guild officer directly.',flags:MessageFlags.Ephemeral});
      await channel.send({embeds:[new EmbedBuilder().setColor(0xb83b32).setTitle('Private member request').addFields({name:'Member',value:'<@'+interaction.user.id+'>'},{name:'Request',value:question.slice(0,1024)})],allowedMentions:{parse:[]}});
      return interaction.reply({content:'Your private request has been sent to staff.',flags:MessageFlags.Ephemeral});
    }
    if(route==='group')return interaction.reply({content:'For now, post your activity, time, and roles needed in #group-finder. Automated LFG listings are planned.\n\nYour request: '+question.slice(0,1000),flags:MessageFlags.Ephemeral});
    const answer=answerQuestion(question);
    return interaction.reply({content:'☀️ **Solara / '+(route==='raid'?'Raid Help':route==='discord'?'Discord Support':'Game Support')+'**\n'+answer+'\n\n*This is a starter knowledge-base response, not a live AI-generated answer.*',flags:MessageFlags.Ephemeral});
  }
}
