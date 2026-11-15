// One persistent, plain-text raid status board. Existing raid signups are the source of truth.
const HEADING='## ⚔️ RED SUN RISING / LIVE RAID BOARD';
const MAX_RAIDS=12;
async function raidListings(channel){
 const found=[];let before;
 for(let page=0;page<5;page++){
  const batch=await channel.messages.fetch({limit:100,...(before?{before}:{})});
  if(!batch.size)break;
  found.push(...batch.values());
  before=batch.last().id;
  if(batch.size<100)break;
 }
 return found.filter(m=>m.author.id===channel.client.user.id&&
  /^solara-event\|\d+\|\d+$/.test(m.embeds[0]?.footer?.text||'')&&
  m.embeds[0]?.title?.startsWith('⚔️ Raid:'));
}
export async function updateLiveRaidBoard(guild){
 const events=guild.channels.cache.find(c=>c.name==='guild-events'&&c.isTextBased());
 const signups=guild.channels.cache.find(c=>c.name==='raid-signups'&&c.isTextBased());
 if(!events||!signups)return;
 const raids=(await raidListings(signups)).sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
 const active=raids.filter(m=>!m.embeds[0].title.includes(' — CLOSED'));
 const lines=[HEADING,'','*Live roster information from '+signups.toString()+'. Updated when raid signups change.*',''];
 if(!active.length)lines.push('**No raids currently open for signups.**','Check '+signups.toString()+' for new schedules.');
 else for(const m of active.slice(0,MAX_RAIDS)){
  const e=m.embeds[0],members=e.fields.find(f=>f.name.startsWith('Members ('));
  const when=e.fields.find(f=>f.name==='When')?.value||'To be announced';
  const capacity=members?.name.match(/\((\d+\/\d+)\)/)?.[1]||'Unknown';
  const leader=e.fields.find(f=>f.name==='Organizer')?.value||'To be assigned';
  lines.push('**'+e.title.slice('⚔️ Raid: '.length).slice(0,90)+'**',
   'Schedule: '+when.slice(0,100),
   'Roster: **'+capacity+'** · Leader: '+leader,
   'Sign up: '+m.url,'');
 }
 if(active.length>MAX_RAIDS)lines.push('*+'+(active.length-MAX_RAIDS)+' more open raids in '+signups.toString()+'*','');
 lines.push('—','*Raid organizers manage signups in '+signups.toString()+'. This board updates automatically; no duplicate announcements.*');
 let content=lines.join('\n');
 // Discord's 2000-character message cap: omit lower-priority entries, not the header.
 while(content.length>1900&&active.length){
  const idx=lines.findIndex(x=>x.startsWith('**')&&x.endsWith('**')&&x!=='**No raids currently open for signups.**');
  if(idx<0)break;
  lines.splice(idx,5);
  content=lines.join('\n');
 }
 if(content.length>1900)content=content.slice(0,1890)+'…';
 const history=await events.messages.fetch({limit:100});
 const boards=[...history.values()].filter(m=>m.author.id===events.client.user.id&&m.content.startsWith(HEADING))
  .sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
 const payload={content,embeds:[],components:[],allowedMentions:{parse:[]}};
 if(boards.length){
  if(boards[0].content!==content||boards[0].embeds.length||boards[0].components.length)await boards[0].edit(payload);
  for(const extra of boards.slice(1))await extra.delete().catch(e=>console.warn('Raid board duplicate cleanup failed',e.message));
 }else await events.send(payload);
}
