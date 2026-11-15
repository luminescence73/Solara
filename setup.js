import { ChannelType, PermissionFlagsBits } from 'discord.js';

const roleGroups = {
  membership:['Pending Verification','Guild Member','Onboarding Complete'],
  gameplay:['Tank','Healer','DPS','Flexible','Still Learning','New Player','Returning Player','Experienced Player','Veteran','Casual','Semi-Competitive','Competitive','Mixed','Social','Raiding','Dungeons','Questing','Professions','Collecting'],
  notifications:['Raid Pings','Dungeon Pings','Guild Event Pings','Game Update Pings'],
  classes:['Warrior','Paladin','Hunter','Rogue','Priest','Shaman','Mage','Warlock','Druid','Monk','Death Knight','Demon Hunter','Evoker']
};
const sections = [
  {name:'✦ WELCOME & INFORMATION',channels:['welcome','rules','announcements','server-guide','roles-and-pings','onboarding']},
  {name:'⚔ GUILD OPERATIONS',channels:['guild-information','guild-events','raid-signups','group-finder','recruitment']},
  {name:'✧ WOW INTEL',channels:['class-intel','profession-intel','dungeon-intel','raid-intel','gear-intel','world-intel','collectibles-intel','beginner-guides','addon-intel']},
  {name:'⌛ LIVE UPDATES',channels:['weekly-intel','patch-notes','game-news','maintenance-alerts']},
  {name:'✦ SOCIAL COMMONS',channels:['general','introductions','screenshots-and-clips','memes','achievements','off-topic','questions-and-help','suggestions','community-highlights']},
  {name:'♫ VOICE LOUNGE',voice:['General Lounge','Raid Group 1','Raid Group 2','Dungeon Party','Grinding & Farming','Questing & Leveling','AFK Lounge']},
  {name:'♛ STAFF HEADQUARTERS',private:true,channels:['staff-chat','staff-announcements','verification-queue','moderation-logs','bot-logs','intel-review','event-planning'],voice:['Staff Meeting','Officer Lounge']}
];
const staffNames=['Guild Leader','Administrator','Officer','Moderator','Raid Leader'];
const readOnly = new Set(['welcome','rules','announcements','server-guide','roles-and-pings','guild-information','class-intel','profession-intel','dungeon-intel','raid-intel','gear-intel','world-intel','collectibles-intel','beginner-guides','addon-intel','weekly-intel','patch-notes','game-news','maintenance-alerts','community-highlights']);

export async function setupGuild(guild) {
  const me = await guild.members.fetchMe();
  if (!me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles))
    throw new Error('Solara needs Manage Channels and Manage Roles permissions.');
  await guild.roles.fetch();
  await guild.channels.fetch();
  const made={roles:0,categories:0,channels:0};
  const getRole=async name=>{
    let role=guild.roles.cache.find(r=>r.name===name && !r.managed);
    if (!role) {role=await guild.roles.create({name,reason:'Solara initial guild setup'});made.roles++;}
    return role;
  };
  // Staff roles are intentionally NOT auto-created or auto-assigned: existing leadership remains authoritative.
  const roles={};
  for (const names of Object.values(roleGroups)) for (const name of names) roles[name]=await getRole(name);
  const staffRoles=staffNames.map(n=>guild.roles.cache.find(r=>r.name===n)).filter(Boolean);
  // The server owner retains access to private staff channels even without a named staff role.
  for (const section of sections) {
    let category=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory && c.name===section.name);
    const overwrites=section.private
      ? [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},...staffRoles.map(r=>({id:r.id,allow:[PermissionFlagsBits.ViewChannel]})),{id:guild.ownerId,allow:[PermissionFlagsBits.ViewChannel]}]
      : [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},{id:roles['Guild Member'].id,allow:[PermissionFlagsBits.ViewChannel]}];
    if (section.name==='✦ WELCOME & INFORMATION') {
      overwrites.push({id:roles['Pending Verification'].id,allow:[PermissionFlagsBits.ViewChannel]});
    }
    if (!category) {
      category=await guild.channels.create({name:section.name,type:ChannelType.GuildCategory,permissionOverwrites:overwrites,reason:'Solara guild setup'});
      made.categories++;
    }
    for (const name of section.channels||[]) {
      const existing=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id);
      if (existing) continue;
      const isForum=['class-intel','profession-intel','dungeon-intel','raid-intel','addon-intel','questions-and-help'].includes(name);
      const overrides=[];
      if (readOnly.has(name) || isForum) overrides.push({id:roles['Guild Member'].id,deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]});
      // Staff can publish reference posts; questions forum is open to verified members.
      if (name==='questions-and-help') overrides.length=0;
      else if (isForum) for (const staff of staffRoles) overrides.push({id:staff.id,allow:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]});
      if (section.name==='✦ WELCOME & INFORMATION') {
        overrides.push({id:roles['Pending Verification'].id,deny:[PermissionFlagsBits.SendMessages]});
        if (['welcome','rules','onboarding'].includes(name)) overrides.push({id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]});
      }
      await guild.channels.create({name,type:isForum?ChannelType.GuildForum:ChannelType.GuildText,parent:category.id,permissionOverwrites:overrides,reason:'Solara guild setup'});
      made.channels++;
    }
    for (const name of section.voice||[]) {
      if (guild.channels.cache.some(c=>c.name===name && c.parentId===category.id)) continue;
      await guild.channels.create({name,type:ChannelType.GuildVoice,parent:category.id,reason:'Solara guild setup'});
      made.channels++;
    }
  }
  const verification=guild.channels.cache.find(c=>c.name==='verification-queue');
  return {made,verificationChannelId:verification?.id||null,memberRoleId:roles['Guild Member'].id,pendingRoleId:roles['Pending Verification'].id};
}
