// Staff-only channel guides. Edit the existing Solara guide on startup; never
// overwrite staff discussions, moderation entries, or event records.
const GUIDES=[
 ['staff-chat','♛  INNER CIRCLE / STAFF CHAMBER',[
  '*Behind every rising sun stands a united council.*',
  '**✦  STAFF DISCUSSION**',
  'Coordinate daily guild matters, member questions, staffing coverage, and decisions that need input from leadership.',
  '**✦  KEEP DISCUSSIONS ORGANIZED**',
  'Use message replies or threads for longer conversations. Summarize decisions and next steps so other staff can follow along.',
  '**✦  WHERE TO TAKE ACTION**',
  'Important staff notices belong in #staff-announcements. Member conduct belongs in #moderation-logs. Upcoming activities belong in #event-planning.',
  '*Private to authorized guild staff. Keep member information confidential.*'
 ]],
 ['staff-announcements','☀️  INNER CIRCLE / COUNCIL DECREES',[
  '*The council speaks with one voice.*',
  '**✦  OFFICIAL STAFF UPDATES**',
  'Use this channel for leadership decisions, staff responsibilities, policy changes, urgent notices, and operational updates.',
  '**✦  ANNOUNCEMENT FORMAT**',
  '**Subject:** What changed\n**Effective:** When it takes effect\n**Action:** Who needs to do what\n**Contact:** Who can answer questions',
  '**✦  FOLLOW-UP**',
  'Discuss questions in #staff-chat so important announcements remain easy to find.',
  '*Staff-only information should not be forwarded outside the Inner Circle.*'
 ]],
 ['moderation-logs','🛡️  INNER CIRCLE / GUARDIAN RECORDS',[
  '*Protect the guild. Record the facts.*',
  '**✦  MODERATION RECORDS**',
  'Use this channel to document warnings, timeouts, removed messages, escalated reports, and the outcome of staff reviews.',
  '**✦  RECOMMENDED FORMAT**',
  '**Member:** Discord mention or ID\n**Date / time:** Include timezone\n**Issue:** Objective summary of what occurred\n**Evidence:** Message link or relevant context\n**Action:** What staff did\n**Follow-up:** Owner and next step, if needed',
  '**✦  PRIVACY & CONSISTENCY**',
  'Record only necessary information. Avoid speculation and do not post sensitive personal details. Discuss complex decisions in #staff-chat.',
  '*This guide is not an automated moderation log; bot-generated records depend on configured moderation features.*'
 ]],
 ['bot-logs','⚙️  INNER CIRCLE / SOLARA OPERATIONS',[
  '*Every signal matters.*',
  '**✦  BOT OPERATIONS**',
  'Use this channel to review Solara errors, failed updates, scheduled-event reminders, onboarding problems, and other operational alerts.',
  '**✦  WHEN REPORTING AN ISSUE**',
  'Include the feature, approximate time, affected channel, what you expected, and what happened. Share screenshots or relevant error excerpts when useful.',
  '**✦  ESCALATION**',
  'Discuss fixes in #staff-chat and record any important changes in #staff-announcements.',
  '*This is a staff reference message. Automated log delivery must be implemented separately for each event type.*'
 ]],
 ['intel-review','📚  INNER CIRCLE / INTEL REVIEW',[
  '*Knowledge is another weapon in the guild arsenal.*',
  '**✦  REVIEW THE ARCHIVES**',
  'Check class, specialization, profession, dungeon, raid, gear, world, collectible, beginner, and addon information for accuracy.',
  '**✦  REPORT AN INTEL CHANGE**',
  '**Topic:** Which guide or class\n**What changed:** New information or correction\n**Source:** Prefer a direct WoW Forever reference\n**Priority:** Routine, time-sensitive, or urgent',
  '**✦  PUBLISHING STANDARDS**',
  'Prioritize WoW Forever information, keep direct links with their topics, and update existing guide messages rather than creating duplicates.',
  '*Use this channel for review and source discussion; not every suggested change is automatically published.*'
 ]],
 ['event-planning','⚔️  INNER CIRCLE / BATTLE PLANNING',[
  '*Great victories begin long before the first pull.*',
  '**✦  PLAN GUILD ACTIVITIES**',
  'Coordinate raid nights, dungeon runs, leveling parties, community gatherings, and special guild events.',
  '**✦  EVENT PLANNING TEMPLATE**',
  '**Activity:** Raid, dungeon, or gathering\n**Leader:** Staff organizer\n**Start:** Date, time, and timezone\n**Requirements:** Level, gear, or preparation\n**Capacity:** Group size and needed roles\n**Next step:** Where members sign up',
  '**✦  GO LIVE**',
  'Publish raid signups in #raid-signups and dungeon listings in #group-finder. The live raid overview appears in #guild-events.',
  '*Use this space for staff coordination; public scheduling and notifications happen through the member-facing event tools.*'
 ]]
];
const MARKER='solara-staff-guide-v1';
function linkify(guild,body){
 return body.replace(/#([a-z][a-z0-9-]+)/g,(label,name)=>{
  const channel=guild.channels.cache.find(c=>c.name===name);
  return channel?'<#'+channel.id+'>':label;
 });
}
export async function ensureStaffGuides(guild){
 for(const [name,title,sections] of GUIDES){
  try{
   const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());
   if(!channel)continue;
   const messages=await channel.messages.fetch({limit:100});
   const content=['## '+title,'',...sections].join('\n\n')+'\n\n-# '+MARKER+':'+name;
   const payload={content:linkify(guild,content),embeds:[],components:[],allowedMentions:{parse:[]}};
   if(payload.content.length>2000){console.warn('Staff guide exceeds message limit:',name);continue;}
   const existing=messages.find(m=>m.author.id===guild.client.user.id&&m.content.includes(MARKER+':'+name));
   if(existing){
    if(existing.content!==payload.content||existing.embeds.length||existing.components.length)await existing.edit(payload);
   }else await channel.send(payload);
  }catch(error){console.error('Staff guide update failed for '+name,error);}
 }
}
