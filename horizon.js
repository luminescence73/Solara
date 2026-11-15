// WoW Forever news watcher. Uses Wowhead RSS, filters out other WoW versions,
// and edits one managed post per channel. No speculative reset or outage claims.
const FEED='https://www.wowhead.com/news/rss/all';
const INTERVAL=30*60*1000;
const channels=['weekly-intel','patch-notes','game-news','maintenance-alerts'];
const marker=name=>'solara-horizon-v1:'+name;
const decode=s=>String(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
const tag=(xml,name)=>xml.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'))?.[1]||'';
function parseFeed(xml){
 return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([,item])=>({
  title:decode(tag(item,'title')),url:decode(tag(item,'link')),
  date:new Date(decode(tag(item,'pubDate'))),
  description:decode(tag(item,'description'))
 })).filter(x=>/^https:\/\/(?:www\.)?wowhead\.com\//.test(x.url)&&x.title&&Number.isFinite(x.date.getTime()));
}
const forever=x=>/\b(?:wow(?:\s|:|-)*forever|world of warcraft:\s*forever)\b/i.test(x.title+' '+x.description);
const patch=x=>/\b(?:hotfix|patch notes?|class tuning|balance changes?|bug fixes?|development notes?)\b/i.test(x.title);
const maintenance=x=>/\b(?:maintenance|downtime|outage|server(?:s)? (?:down|offline|restart)|realm(?:s)? (?:down|offline|restart)|emergency restart)\b/i.test(x.title);
const age=x=>Date.now()-x.date.getTime();
const recent=(items,days)=>items.filter(x=>age(x)>=0&&age(x)<days*86400000);
// Short, scannable headlines; links collected at the bottom instead of
// repeating long URLs between every item.
function unique(items){
 const seen=new Set();
 return items.filter(item=>{
  const key=item.title.toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\\b(?:now|new|in|wow|forever)\\b/g,'').trim();
  if(seen.has(key))return false;
  seen.add(key);return true;
 });
}
function format(items,max=4){
 const selected=unique(items).slice(0,max);
 if(!selected.length)return {headlines:'No verified updates in the monitored feed for this period.',sources:''};
 return {
  headlines:selected.map((x,i)=>'**'+(i+1)+'. '+x.title.replace(/[*_`]/g,'').slice(0,125)+'**\n'+
    '<t:'+Math.floor(x.date.getTime()/1000)+':D>').join('\n\n'),
  sources:selected.map((x,i)=>'['+(i+1)+'. Read article]('+x.url+')').join(' · ')
 };
}
function contentFor(name,items){
 const news=unique(recent(items,14).filter(forever));
 let title,section,selection,foot='';
 if(name==='weekly-intel'){
  title='WEEKLY INTEL';section='☀️ THIS WEEK IN WOW FOREVER';
  selection=format(recent(news,7),4);
  foot='**✦ WEEKLY ACTIVITIES**\nFor resets and limited-time activities, confirm details in-game; the news feed does not verify schedules.';
 }else if(name==='patch-notes'){
  title='PATCH NOTES';section='⚙️ PATCHES & HOTFIXES';
  selection=format(news.filter(patch),4);
 }else if(name==='game-news'){
  title='GAME NEWS';section='📣 LATEST WOW FOREVER NEWS';
  selection=format(news,4);
 }else{
  title='MAINTENANCE ALERTS';section='🛠️ MAINTENANCE REPORTS';
  selection=format(recent(news.filter(maintenance),3),3);
  foot='*No article does not mean the servers are online. Confirm maintenance and restoration through official notices.*';
 }
 const parts=['## ✧ THE HORIZON / '+title,'**'+section+'**',selection.headlines];
 if(foot)parts.push(foot);
 if(selection.sources)parts.push('**✦ ARTICLE LINKS**\n'+selection.sources);
 parts.push('-# '+marker(name));
 return parts.join('\n\n');
}

let active=false;
export async function updateHorizon(guild,log=()=>{}){
 if(active)return;
 active=true;
 try{
  const response=await fetch(FEED,{headers:{'User-Agent':'Solara-WoWForever-GuildBot/1.0','Accept':'application/rss+xml, application/xml, text/xml'},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error('News source HTTP '+response.status);
  const xml=await response.text();
  const items=parseFeed(xml);
  if(!items.length)throw Error('News feed returned no readable entries');
  for(const name of channels){
   const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());
   if(!channel)continue;
   try{
    let content=contentFor(name,items);
    if(content.length>2000)content=content.slice(0,1850)+'\n\n-# '+marker(name);
    if(content.length>2000){log('warning','Horizon post too long',name);continue;}
    const messages=await channel.messages.fetch({limit:100});
    const existing=messages.find(m=>m.author.id===guild.client.user.id&&m.content.includes(marker(name)));
    if(existing){
     if(existing.content!==content||existing.embeds.length||existing.content.includes(String.raw`\n`))await existing.edit({content,embeds:[],allowedMentions:{parse:[]}});
    }else await channel.send({content,allowedMentions:{parse:[]}});
   }catch(error){log('error','Horizon channel update failed',name+': '+error.message);}
  }
 }catch(error){
  log('warning','Horizon source unavailable',error.message);
  console.warn('Horizon feed unavailable:',error.message);
  // Create transparent initial boards even when the external feed fails.
  // Never replace a previously successful board with an outage placeholder.
  for(const name of channels){
   const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());
   if(!channel)continue;
   try{
    const messages=await channel.messages.fetch({limit:100});
    if(messages.some(m=>m.author.id===guild.client.user.id&&m.content.includes(marker(name))))continue;
    const title=({'weekly-intel':'WEEKLY INTEL','patch-notes':'PATCH NOTES','game-news':'GAME NEWS','maintenance-alerts':'MAINTENANCE ALERTS'})[name];
    await channel.send({content:'## ✧  THE HORIZON / '+title+'\n\n**WoW Forever updates**\nAutomatic monitoring is enabled, but the news source could not be verified during this check. No update or server status is being assumed. Solara will retry automatically.\n\n-# '+marker(name),allowedMentions:{parse:[]}});
   }catch(postError){log('error','Horizon initial board failed',name+': '+postError.message);}
  }
 }
 finally{active=false;}
}
export const HORIZON_INTERVAL=INTERVAL;
