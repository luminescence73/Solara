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
function format(items,max=5){
 return items.slice(0,max).map(x=>'**'+x.title.replace(/[*_\`]/g,'').slice(0,160)+'**\n'+
  '<t:'+Math.floor(x.date.getTime()/1000)+':D> · <'+x.url+'>').join('\n\n');
}
function contentFor(name,items){
 const live=recent(items,14),news=live.filter(forever);
 let title,body;
 if(name==='weekly-intel'){
  title='✧  THE HORIZON / WEEKLY INTEL';
  const week=recent(news,7);
  body='**☀️ THIS WEEK IN WOW FOREVER**\n'+
   (week.length?format(week,6):'No verified WoW Forever articles found for the past seven days.')+
   '\n\n**✦ WEEKLY RESET & ACTIVITIES**\nReset details and limited-time activities are not automatically confirmed by this news feed. Check official in-game information before planning.';
 }else if(name==='patch-notes'){
  title='✧  THE HORIZON / PATCH NOTES';
  const found=news.filter(patch);
  body='**⚙️ RECENT FOREVER PATCHES & HOTFIXES**\n'+
   (found.length?format(found,7):'No recent verified WoW Forever patch articles found.');
 }else if(name==='game-news'){
  title='✧  THE HORIZON / GAME NEWS';
  body='**📣 LATEST WOW FOREVER NEWS**\n'+
   (news.length?format(news,7):'No recent verified WoW Forever news articles found.');
 }else{
  title='✧  THE HORIZON / MAINTENANCE ALERTS';
  const found=recent(news.filter(maintenance),3);
  body='**🛠️ RECENT MAINTENANCE REPORTS**\n'+
   (found.length?format(found,4):'No recent WoW Forever maintenance report was found in the monitored feed. **This does not confirm that servers are online.**')+
   '\n\n*Maintenance timing and restoration must be confirmed through the linked notice or official service status.*';
 }
 return '## '+title+'\n\n'+body+'\n\n**Source:** <'+FEED+'>\n-# '+marker(name);
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
  if(!items.length)throw Error('News feed returned no readable entries; existing posts preserved');
  for(const name of channels){
   const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());
   if(!channel)continue;
   try{
    const content=contentFor(name,items);
    if(content.length>2000){log('warning','Horizon post too long',name);continue;}
    const messages=await channel.messages.fetch({limit:100});
    const existing=messages.find(m=>m.author.id===guild.client.user.id&&m.content.includes(marker(name)));
    if(existing){
     if(existing.content!==content||existing.embeds.length)await existing.edit({content,embeds:[],allowedMentions:{parse:[]}});
    }else await channel.send({content,allowedMentions:{parse:[]}});
   }catch(error){log('error','Horizon channel update failed',name+': '+error.message);}
  }
 }catch(error){log('warning','Horizon source unavailable',error.message);console.warn('Horizon update skipped:',error.message);}
 finally{active=false;}
}
export const HORIZON_INTERVAL=INTERVAL;
