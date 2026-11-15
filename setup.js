import { ChannelType, PermissionFlagsBits } from 'discord.js';

const roleGroups = {
  membership:['Pending Verification','Guild Member','Rules Accepted','Onboarding Complete'],
  gameplay:['Tank','Healer','DPS','Flexible','Still Learning','New Player','Returning Player','Experienced Player','Veteran','Casual','Semi-Competitive','Competitive','Mixed','Social','Raiding','Dungeons','Questing','Professions','Collecting'],
  notifications:['Raid Pings','Dungeon Pings','Guild Event Pings','Game Update Pings'],
  classes:['Warrior','Paladin','Hunter','Rogue','Priest','Shaman','Mage','Warlock','Druid','Monk','Death Knight','Demon Hunter','Evoker']
};
const sections = [
  {name:'☀・THE DAWNING',channels:['welcome','rules','announcements','roles-and-pings','onboarding']},
  {name:'⚔・WAR COUNCIL',channels:['guild-information','guild-events','raid-signups','group-finder']},
  {name:'✦・THE ARCHIVES',channels:['class-intel','profession-intel','dungeon-intel','raid-intel','gear-intel','world-intel','collectibles-intel','beginner-guides','addon-intel']},
  {name:'✧・THE HORIZON',channels:['weekly-intel','patch-notes','game-news','maintenance-alerts']},
  {name:'🔥・THE HEARTH',channels:['general','introductions','screenshots-and-clips','memes','achievements','off-topic','help-and-requests','suggestions','community-highlights']},
  {name:'♫・FIRESIDE VOICE',voice:['General Lounge','Raid Group 1','Raid Group 2','Dungeon Party','Grinding & Farming','Questing & Leveling','AFK Lounge']},
  {name:'♛・INNER CIRCLE',private:true,channels:['staff-chat','staff-announcements','staff-requests','verification-queue','bot-logs','intel-review','event-planning'],voice:['Staff Meeting','Officer Lounge']}
];
const staffNames=['Guild Leader','Administrator','Officer'];
const oldCategoryNames={"☀・THE DAWNING":"✦ WELCOME & INFORMATION","⚔・WAR COUNCIL":"⚔ GUILD OPERATIONS","✦・THE ARCHIVES":"✧ WOW INTEL","✧・THE HORIZON":"⌛ LIVE UPDATES","🔥・THE HEARTH":"✦ SOCIAL COMMONS","♫・FIRESIDE VOICE":"♫ VOICE LOUNGE","♛・INNER CIRCLE":"♛ STAFF HEADQUARTERS"};
const roleColors = {
  'Guild Leader':0xffc247, 'Administrator':0xe06b56, 'Officer':0xe89b48,
  'Pending Verification':0x77727e, 'Guild Member':0xe5a34a,
  'Rules Accepted':0xdda769, 'Onboarding Complete':0xf4cf7d,
  'Tank':0x6689cf, 'Healer':0x65b995, 'DPS':0xd87979,
  'Flexible':0x9b86c9, 'Still Learning':0x9da5b1,
  'New Player':0x87b8d6, 'Returning Player':0x86b2a0,
  'Experienced Player':0xb69ad9, 'Veteran':0xd2a75d,
  'Casual':0x7cb9a5, 'Semi-Competitive':0xd0a46b,
  'Competitive':0xd7756d, 'Mixed':0xa79bc9, 'Social':0xe5a1b0,
  'Raiding':0xd47a60, 'Dungeons':0x8e9dd8, 'Questing':0x7eaf83,
  'Professions':0xc6a268, 'Collecting':0xc998b5,
  'Raid Pings':0xe07a50, 'Dungeon Pings':0x8e99dd,
  'Guild Event Pings':0xf0b85b, 'Game Update Pings':0x76b9cf,
  'Warrior':0xc69b6d, 'Paladin':0xf0a7c5, 'Hunter':0xa5b981,
  'Rogue':0xe6d77a, 'Priest':0xe7e9ed, 'Shaman':0x4c8fda,
  'Mage':0x7dc5d7, 'Warlock':0x9d79c5, 'Druid':0xd7a05e,
  'Monk':0x65bca1, 'Death Knight':0xc76a79,
  'Demon Hunter':0x9e75d0, 'Evoker':0x579b96
};
const hearthTopics = {
  'general':'The main gathering place for Red Sun Rising. Chat about WoW Forever, guild life, and your adventures.',
  'introductions':'Meet your fellow guildmates. Solara maintains introduction cards after onboarding.',
  'screenshots-and-clips':'Share your favorite WoW Forever screenshots, gameplay clips, character looks, and memorable moments.',
  'memes':'Guild jokes, funny game moments, and memes. Keep content friendly and follow the Guild Code.',
  'achievements':'Celebrate level milestones, rare drops, raid victories, profession progress, and personal accomplishments.',
  'off-topic':'Conversations beyond WoW: hobbies, music, shows, and everyday life.',
  'help-and-requests':'Ask questions, request guild assistance, and get help from fellow members or staff. Do not share private details publicly.',
  'suggestions':'Share ideas for improving Red Sun Rising, its events, channels, and Solara. Explain what you would change and why.',
  'community-highlights':'A curated showcase of memorable guild moments, achievements, and community contributions.'
};
const readOnly = new Set(['welcome','rules','announcements','roles-and-pings','guild-information','class-intel','profession-intel','dungeon-intel','raid-intel','gear-intel','world-intel','collectibles-intel','beginner-guides','addon-intel','weekly-intel','patch-notes','game-news','maintenance-alerts','community-highlights']);

export async function setupGuild(guild) {
  const me = await guild.members.fetchMe();
  if (!me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles))
    throw new Error('Solara needs Manage Channels and Manage Roles permissions.');
  await guild.roles.fetch();
  await guild.channels.fetch();
  const made={roles:0,categories:0,channels:0};
  const getRole=async name=>{
    let role=guild.roles.cache.find(r=>r.name===name && !r.managed);
    if (!role) {role=await guild.roles.create({name,color:roleColors[name]||undefined,reason:'Solara initial guild setup'});made.roles++;}
    return role;
  };
  // Create leadership roles without granting privileges or assigning them to members.
  // Existing role permissions, membership and hierarchy are preserved.
  const roles={};
  for (const names of Object.values(roleGroups)) {
    for (const name of names) roles[name]=await getRole(name);
  }
  for (const name of staffNames) await getRole(name);
  // Retire the two unused staff roles; never touch unrelated roles.
  for (const name of ['Moderator','Raid Leader']) {
    const obsolete=guild.roles.cache.find(r=>r.name===name && !r.managed);
    if (obsolete && obsolete.editable) {
      await obsolete.delete('Retired Red Sun Rising staff role')
        .catch(error=>console.warn('Could not remove retired role:',name,error.message));
    }
  }
  // Keep role colors in sync on future startups without changing permissions.
  for (const [name,color] of Object.entries(roleColors)) {
    const role=guild.roles.cache.find(r=>r.name===name && !r.managed);
    if (!role || role.color===color) continue;
    if (!role.editable) { console.warn('Cannot recolor role above Solara:',name); continue; }
    await role.setColor(color,'Sync Red Sun Rising role colors')
      .catch(error=>console.warn('Role color update skipped:',name,error.message));
  }
  const staffRoles=staffNames.map(n=>guild.roles.cache.find(r=>r.name===n)).filter(Boolean);
  // The server owner retains access to private staff channels even without a named staff role.
  for (const section of sections) {
    let category=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory && c.name===section.name);
    if(!category){
      category=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory&&c.name===oldCategoryNames[section.name]);
      if(category)await category.setName(section.name,'Solara sunfire visual refresh');
    }
    // The entire Dawning is public. Every other non-staff category requires onboarding.
    const dawning=section.name==='☀・THE DAWNING';
    const staffAccess=staffRoles.map(role=>({id:role.id,allow:[PermissionFlagsBits.ViewChannel]}));
    const overwrites=section.private
      ? [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},...staffAccess]
      : dawning
      ? [{id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel]},...staffAccess]
      : [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},
         {id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel]},
         ...staffAccess];
    if(!category){
      category=await guild.channels.create({name:section.name,type:ChannelType.GuildCategory,permissionOverwrites:overwrites,reason:'Solara guild setup'});
      made.categories++;
    } else {
      await category.permissionOverwrites.set(overwrites,'Require completed onboarding for guild access');
    }
    for (const name of section.channels||[]) {
      const existing=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id && c.type===ChannelType.GuildText);
      if(existing){
        const perms=section.private
          ? overwrites
          : dawning
          ? [{id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel],...(readOnly.has(name)?{deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]}:{})},...staffAccess]
          : [...overwrites.filter(o=>o.id!==roles['Onboarding Complete'].id),
             {id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],...(readOnly.has(name)?{deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]}:{})}];
        await existing.permissionOverwrites.set(perms,'Dawning public; guild locked until onboarding complete');
        if(hearthTopics[name]&&existing.topic!==hearthTopics[name])await existing.setTopic(hearthTopics[name],'Clarify Hearth channel purpose');
        continue;
      }
      const legacy=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id && c.type===ChannelType.GuildForum);
      if (legacy) {
        await legacy.setName(('archive-'+name).slice(0,100),'Preserve previous forum content while migrating to text channel');
        console.log('Archived legacy forum',name);
      }
      const isForum=false;
      const channelOverwrites=overwrites.filter(o=>o.id!==roles['Onboarding Complete'].id).map(o=>({...o}));
      if(!section.private&&!dawning){
        channelOverwrites.push({id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],...(readOnly.has(name)?{deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]}:{})});
      }else if(dawning&&readOnly.has(name)){
        channelOverwrites[0]={id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]};
      }
      const permissionOverwrites=channelOverwrites;
      await guild.channels.create({name,type:isForum?ChannelType.GuildForum:ChannelType.GuildText,parent:category.id,permissionOverwrites,...(hearthTopics[name]?{topic:hearthTopics[name]}:{}),reason:'Solara guild setup'});
      made.channels++;
    }
    for (const name of section.voice||[]) {
      const existingVoice=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id);
      if(existingVoice){await existingVoice.permissionOverwrites.set(overwrites,'Lock voice until onboarding complete');continue;}
      await guild.channels.create({name,type:ChannelType.GuildVoice,parent:category.id,permissionOverwrites:overwrites,reason:'Solara guild setup'});
      made.channels++;
    }
  }
  // Remove the two channels explicitly retired by the guild owner.
  for(const name of ['server-guide','moderation-logs']){
    const old=guild.channels.cache.find(c=>c.name===name&&c.type===ChannelType.GuildText);
    if(old)await old.delete('Guild owner requested removal of '+name)
      .catch(error=>console.warn('Could not remove channel',name,error.message));
  }
  // Recruitment was removed from War Council at the guild owner's request.
  // Only target the exact text channel inside the War Council category.
  const warCouncil=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory&&c.name==='⚔・WAR COUNCIL');
  const recruitment=guild.channels.cache.find(c=>c.name==='recruitment'&&c.parentId===warCouncil?.id&&c.type===ChannelType.GuildText);
  if(recruitment){
    await recruitment.delete('Guild owner removed recruitment from War Council')
      .catch(error=>console.warn('Could not remove recruitment channel:',error.message));
  }
  // User explicitly requested removal of superseded, empty forum channels.
  // Never delete a forum containing posts: keep it for manual review to prevent data loss.
  for (const ch of guild.channels.cache.values()) {
    if (ch.type!==ChannelType.GuildForum || !/^archive-(class|profession|dungeon|raid|addon)-intel$/.test(ch.name)) continue;
    try {
      const posts=await ch.threads.fetchActive();
      const archived=await ch.threads.fetchArchived({limit:1});
      if (posts.threads.size || archived.threads.size) {
        console.warn('Forum contains posts; keeping for manual review:',ch.name);
        continue;
      }
      await ch.delete('Replace empty legacy intel forum with text channel');
      console.log('Removed empty forum:',ch.name);
    } catch(err){console.warn('Could not safely remove forum',ch.name,err.message);}
  }
  const verification=guild.channels.cache.find(c=>c.name==='verification-queue');
  return {made,verificationChannelId:verification?.id||null,memberRoleId:roles['Guild Member'].id,pendingRoleId:roles['Pending Verification'].id};
}
