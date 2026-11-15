import { ChannelType, PermissionFlagsBits } from 'discord.js';

const roleGroups = {
  membership:['Pending Verification','Guild Member','Rules Accepted','Onboarding Complete'],
  gameplay:['Tank','Healer','DPS','Flexible','Still Learning','New Player','Returning Player','Experienced Player','Veteran','Casual','Semi-Competitive','Competitive','Mixed','Social','Raiding','Dungeons','Questing','Professions','Collecting'],
  notifications:['Raid Pings','Dungeon Pings','Guild Event Pings','Game Update Pings'],
  classes:['Warrior','Paladin','Hunter','Rogue','Priest','Shaman','Mage','Warlock','Druid','Monk','Death Knight','Demon Hunter','Evoker']
};
const sections = [
  {name:'☀・THE DAWNING',channels:['welcome','rules','announcements','server-guide','roles-and-pings','onboarding']},
  {name:'⚔・WAR COUNCIL',channels:['guild-information','guild-events','raid-signups','group-finder','recruitment']},
  {name:'✦・THE ARCHIVES',channels:['class-intel','profession-intel','dungeon-intel','raid-intel','gear-intel','world-intel','collectibles-intel','beginner-guides','addon-intel']},
  {name:'✧・THE HORIZON',channels:['weekly-intel','patch-notes','game-news','maintenance-alerts']},
  {name:'🔥・THE HEARTH',channels:['general','introductions','screenshots-and-clips','memes','achievements','off-topic','help-and-requests','suggestions','community-highlights']},
  {name:'♫・FIRESIDE VOICE',voice:['General Lounge','Raid Group 1','Raid Group 2','Dungeon Party','Grinding & Farming','Questing & Leveling','AFK Lounge']},
  {name:'♛・INNER CIRCLE',private:true,channels:['staff-chat','staff-announcements','verification-queue','moderation-logs','bot-logs','intel-review','event-planning'],voice:['Staff Meeting','Officer Lounge']}
];
const staffNames=['Guild Leader','Administrator','Officer','Moderator','Raid Leader'];
const oldCategoryNames={"☀・THE DAWNING":"✦ WELCOME & INFORMATION","⚔・WAR COUNCIL":"⚔ GUILD OPERATIONS","✦・THE ARCHIVES":"✧ WOW INTEL","✧・THE HORIZON":"⌛ LIVE UPDATES","🔥・THE HEARTH":"✦ SOCIAL COMMONS","♫・FIRESIDE VOICE":"♫ VOICE LOUNGE","♛・INNER CIRCLE":"♛ STAFF HEADQUARTERS"};
const roleColors={'Guild Member':0xe9a33d,'Pending Verification':0x7b6558,'Onboarding Complete':0xf2c66d,'Rules Accepted':0xd99449,'Tank':0x9d644e,'Healer':0x77a879,'DPS':0xd16a4f,'Raid Pings':0xd55b35,'Guild Event Pings':0xf1ae55};
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
    if (!role) {role=await guild.roles.create({name,color:roleColors[name]||undefined,reason:'Solara initial guild setup'});made.roles++;}
    return role;
  };
  // Staff roles are intentionally NOT auto-created or auto-assigned: existing leadership remains authoritative.
  const roles={};
  for (const names of Object.values(roleGroups)) for (const name of names) roles[name]=await getRole(name);
  const staffRoles=staffNames.map(n=>guild.roles.cache.find(r=>r.name===n)).filter(Boolean);
  // The server owner retains access to private staff channels even without a named staff role.
  for (const section of sections) {
    let category=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory && c.name===section.name);
    if(!category){
      category=guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory&&c.name===oldCategoryNames[section.name]);
      if(category)await category.setName(section.name,'Solara sunfire visual refresh');
    }
    // Guild content is unlocked ONLY by completing onboarding, not merely by staff verification.
    const entryNames=new Set(['welcome','rules','onboarding']);
    const staffAccess=staffRoles.map(role=>({id:role.id,allow:[PermissionFlagsBits.ViewChannel]}));
    const overwrites=section.private
      ? [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},...staffAccess]
      : [{id:guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},
         {id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel]},
         {id:roles['Guild Member'].id,deny:[PermissionFlagsBits.ViewChannel]},
         {id:roles['Pending Verification'].id,deny:[PermissionFlagsBits.ViewChannel]},
         ...staffAccess];
    if(section.name==='☀・THE DAWNING'){
      // Entry channels are explicitly visible even before verification.
      // Per-channel overrides below control the rest of this category.
    }
    if(!category){
      category=await guild.channels.create({name:section.name,type:ChannelType.GuildCategory,permissionOverwrites:overwrites,reason:'Solara guild setup'});
      made.categories++;
    } else {
      await category.permissionOverwrites.set(overwrites,'Require completed onboarding for guild access');
    }
    for (const name of section.channels||[]) {
      const existing=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id && c.type===ChannelType.GuildText);
      if (existing) {
        const entry=section.name==='☀・THE DAWNING'&&['welcome','rules','onboarding'].includes(name);
        const perms=entry
          ? [{id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},{id:roles['Guild Member'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},{id:roles['Pending Verification'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},{id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},...staffRoles.map(role=>({id:role.id,allow:[PermissionFlagsBits.ViewChannel]}))]
          : [...overwrites.filter(o=>o.id!==roles['Onboarding Complete'].id),{id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],...(readOnly.has(name)?{deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]}:{})}];
        await existing.permissionOverwrites.set(perms,'Apply onboarding access gate to existing channel');
        continue;
      }
      const legacy=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id && c.type===ChannelType.GuildForum);
      if (legacy) {
        await legacy.setName(('archive-'+name).slice(0,100),'Preserve previous forum content while migrating to text channel');
        console.log('Archived legacy forum',name);
      }
      const isForum=false;
      const channelOverwrites=overwrites.map(o=>({...o}));
      if(readOnly.has(name)||isForum){
        channelOverwrites.push({id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.CreatePublicThreads,PermissionFlagsBits.CreatePrivateThreads]});
      }
      if(section.name==='☀・THE DAWNING' && entryNames.has(name)){
        // A member can see onboarding before completion, but cannot see guild content.
        channelOverwrites.splice(0,channelOverwrites.length,
          {id:guild.roles.everyone.id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},
          {id:roles['Guild Member'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},
          {id:roles['Pending Verification'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},
          {id:roles['Onboarding Complete'].id,allow:[PermissionFlagsBits.ViewChannel],deny:[PermissionFlagsBits.SendMessages]},
          ...staffAccess);
      }
      if(section.name==='☀・THE DAWNING' && !entryNames.has(name)){
        // Other Dawning channels remain locked until onboarding is complete.
      }
      const permissionOverwrites=channelOverwrites;
      await guild.channels.create({name,type:isForum?ChannelType.GuildForum:ChannelType.GuildText,parent:category.id,permissionOverwrites,reason:'Solara guild setup'});
      made.channels++;
    }
    for (const name of section.voice||[]) {
      const existingVoice=guild.channels.cache.find(c=>c.name===name && c.parentId===category.id);
      if(existingVoice){await existingVoice.permissionOverwrites.set(overwrites,'Lock voice until onboarding complete');continue;}
      await guild.channels.create({name,type:ChannelType.GuildVoice,parent:category.id,permissionOverwrites:overwrites,reason:'Solara guild setup'});
      made.channels++;
    }
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
