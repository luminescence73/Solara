import {ensureGuildPanels,handleGuildFeature} from './guild-features.js';
import {ensureHelpPanel,handleHelp} from './help.js';
import { setupGuild } from './setup.js';
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, MessageFlags } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
let staffChannelId = process.env.VERIFICATION_CHANNEL_ID;
let memberRoleId = process.env.GUILD_MEMBER_ROLE_ID;
let pendingRoleId = process.env.PENDING_ROLE_ID;
if (!token || !guildId) {
  console.error('Missing DISCORD_TOKEN or GUILD_ID in Railway Variables.');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const commands = [
  new SlashCommandBuilder().setName('setup').setDescription('Create Red Sun Rising channels and roles (server administrator only)').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  new SlashCommandBuilder().setName('verify').setDescription('Request Red Sun Rising guild verification'),
  new SlashCommandBuilder().setName('solara').setDescription('Show Solara bot status and available commands'),
  new SlashCommandBuilder().setName('profile').setDescription('Set your guild profile preferences')
    .addStringOption(o => o.setName('experience').setDescription('Your WoW experience').setRequired(true).addChoices(
      {name:'New Player',value:'New Player'},{name:'Returning Player',value:'Returning Player'},
      {name:'Experienced Player',value:'Experienced Player'},{name:'Veteran',value:'Veteran'}))
    .addStringOption(o => o.setName('role').setDescription('Preferred combat role').setRequired(true).addChoices(
      {name:'Tank',value:'Tank'},{name:'Healer',value:'Healer'},{name:'DPS',value:'DPS'},
      {name:'Flexible',value:'Flexible'},{name:'Still Learning',value:'Still Learning'}))
    .addStringOption(o => o.setName('class').setDescription('Main class (optional)').setRequired(false))
    .addStringOption(o => o.setName('interests').setDescription('Your interests, e.g. raids, dungeons, social').setRequired(false))
    .addStringOption(o => o.setName('playstyle').setDescription('Casual, competitive, or mixed').setRequired(false))
];
const rest = new REST({version:'10'}).setToken(token);
client.once('clientReady', async () => {
  console.log('Solara online as ' + client.user.tag);
  try {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {body:commands.map(c=>c.toJSON())});
    console.log('Guild slash commands registered.');
  } catch (error) { console.error('Command registration failed:',error); }
  try {
    const guild=await client.guilds.fetch(guildId);
    const result=await setupGuild(guild);
    staffChannelId=result.verificationChannelId;
    memberRoleId=result.memberRoleId;
    pendingRoleId=result.pendingRoleId;
    console.log('Automatic Red Sun Rising setup complete:',JSON.stringify(result));
    await ensureHelpPanel(guild);
    await ensureGuildPanels(guild);
    console.log('Help, onboarding and guild activity panels initialized.');
  } catch (error) {console.error('Automatic guild setup failed:',error);}
});
client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.inGuild() || interaction.guildId !== guildId) return;
    if ((interaction.isButton()&&/^(onboard:|lfg:|raid:|event:)/.test(interaction.customId))||(interaction.isStringSelectMenu()&&interaction.customId==='onboard:select')||(interaction.isModalSubmit()&&/^(lfg:form|raid:form)$/.test(interaction.customId))) return await handleGuildFeature(interaction);
    if ((interaction.isButton()&&interaction.customId.startsWith('help:'))||(interaction.isModalSubmit()&&interaction.customId.startsWith('helpform:'))) return await handleHelp(interaction);
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'setup') {
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator))
          return interaction.reply({content:'Only server administrators can run setup.',flags:MessageFlags.Ephemeral});
        await interaction.deferReply({flags:MessageFlags.Ephemeral});
        try {
          const result=await setupGuild(interaction.guild);
          console.log('Setup result:',JSON.stringify(result));
          return interaction.editReply('☀️ Guild setup complete! Created '+result.made.roles+' roles, '+result.made.categories+' categories and '+result.made.channels+' channels. Existing matching items were kept. Set Railway variables GUILD_MEMBER_ROLE_ID='+result.memberRoleId+', PENDING_ROLE_ID='+result.pendingRoleId+', VERIFICATION_CHANNEL_ID='+result.verificationChannelId+'. Review channel permissions before inviting members.');
        } catch(e) {console.error('Setup failed:',e);return interaction.editReply('Setup stopped: '+e.message);}
      }
      if (interaction.commandName === 'solara') {
        return interaction.reply({content:'☀️ Solara is online for Red Sun Rising! Commands: /verify, /profile, /solara. Additional features are in development.',flags:MessageFlags.Ephemeral});
      }
      if (interaction.commandName === 'verify') {
        if (!staffChannelId) return interaction.reply({content:'Verification is not configured yet. Staff must set VERIFICATION_CHANNEL_ID.',flags:MessageFlags.Ephemeral});
        if (memberRoleId && interaction.member.roles.cache.has(memberRoleId)) return interaction.reply({content:'You are already verified.',flags:MessageFlags.Ephemeral});
        const modal = new ModalBuilder().setCustomId('verify_form').setTitle('Red Sun Rising Verification');
        const name = new TextInputBuilder().setCustomId('character').setLabel('Your WoW character name').setStyle(TextInputStyle.Short).setMaxLength(60).setRequired(true);
        modal.addComponents(new ActionRowBuilder().addComponents(name));
        return interaction.showModal(modal);
      }
      if (interaction.commandName === 'profile') {
        if (!memberRoleId || !interaction.member.roles.cache.has(memberRoleId)) return interaction.reply({content:'Please complete guild verification first.',flags:MessageFlags.Ephemeral});
        const fields = ['experience','role','class','interests','playstyle'].map(n=>[n,interaction.options.getString(n)]).filter(([,v])=>v);
        const embed = new EmbedBuilder().setColor(0xb83b32).setTitle('☀️ Guild Profile').setDescription('Member: <@'+interaction.user.id+'>').addFields(fields.map(([n,v])=>({name:n[0].toUpperCase()+n.slice(1),value:v.slice(0,1024)})));
        return interaction.reply({embeds:[embed],flags:MessageFlags.Ephemeral});
      }
    }
    if (interaction.isModalSubmit() && interaction.customId === 'verify_form') {
      await interaction.deferReply({flags:MessageFlags.Ephemeral});
      const channel = await client.channels.fetch(staffChannelId).catch(()=>null);
      if (!channel?.isTextBased()) return interaction.editReply('Verification channel is unavailable. Please contact staff.');
      const character = interaction.fields.getTextInputValue('character').trim();
      const embed = new EmbedBuilder().setColor(0xb83b32).setTitle('☀️ Guild Verification Request')
        .addFields({name:'Discord member',value:'<@'+interaction.user.id+'>'},{name:'Character name',value:character},{name:'Status',value:'Pending staff review'})
        .setTimestamp();
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('approve:'+interaction.user.id).setLabel('Approve').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('reject:'+interaction.user.id).setLabel('Reject').setStyle(ButtonStyle.Danger));
      await channel.send({embeds:[embed],components:[buttons],allowedMentions:{parse:[]}});
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
      const original = interaction.message.embeds[0];
      const updated = EmbedBuilder.from(original).setFields(
        ...original.fields.filter(f=>f.name!=='Status'),
        {name:'Status',value:(action==='approve'?'Approved':'Rejected')+' by <@'+interaction.user.id+'>'});
      await interaction.message.edit({embeds:[updated],components:[]});
      return interaction.editReply(action==='approve'?'Member verified.':'Request rejected.');
    }
  } catch (error) {
    console.error('Interaction error:',error);
    const msg='Something went wrong. Please notify staff.';
    if (interaction.deferred || interaction.replied) await interaction.followUp({content:msg,flags:MessageFlags.Ephemeral}).catch(()=>{});
    else await interaction.reply({content:msg,flags:MessageFlags.Ephemeral}).catch(()=>{});
  }
});
client.login(token).catch(error=>{console.error('Discord login failed:',error.message);process.exit(1);});
