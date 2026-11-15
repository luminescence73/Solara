// Raid reminder timestamps are stored on each Discord raid embed, surviving restarts.
const TZ_OFFSETS={UTC:0,GMT:0,EST:-5,EDT:-4,CST:-6,CDT:-5,MST:-7,MDT:-6,PST:-8,PDT:-7};
function centralOffset(utcMs){
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',timeZoneName:'shortOffset'}).formatToParts(new Date(utcMs));
 const value=parts.find(p=>p.type==='timeZoneName')?.value||'GMT-6';
 return Number(value.match(/GMT([+-]\d+)/)?.[1]||-6);
}
export function parseEventTime(input,now=Date.now()){
 const match=/^\s*(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\s+(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*(UTC|GMT|EST|EDT|CST|CDT|CT|ET|MT|PT|MST|MDT|PST|PDT)\s*$/i.exec(input);
 if(!match)return null;
 const [,mo,da,yr,hr,min,ap,tz]=match;
 const month=Number(mo),day=Number(da),hour=Number(hr),minute=Number(min||0);
 if(month<1||month>12||day<1||day>31||hour<1||hour>12||minute>59)return null;
 const h=(hour%12)+(ap.toUpperCase()==='PM'?12:0),zone=tz.toUpperCase();
 const year=yr?(Number(yr)<100?2000+Number(yr):Number(yr)):new Date(now).getUTCFullYear();
 function calculate(y){
  const local=Date.UTC(y,month-1,day,h,minute);
  if(new Date(local).getUTCMonth()!==month-1||new Date(local).getUTCDate()!==day)return null;
  let offset=TZ_OFFSETS[zone];
  if(offset===undefined){
   const candidate=local+6*3600000;
   offset=centralOffset(candidate);
   if(zone!=='CT')return null; // Explicitly require CST/CDT for other zones.
  }
  return local-offset*3600000;
 }
 let timestamp=calculate(year);
 if(timestamp===null)return null;
 if(!yr&&timestamp<now-86400000)timestamp=calculate(year+1);
 return timestamp;
}
const EVENT_TYPES={
 raid:{channel:'raid-signups',prefix:'⚔️ Raid: ',field:'Raid Start',role:'Raid Pings',heading:'⚔️ **RAID STARTING NOW**'},
 dungeon:{channel:'group-finder',prefix:'🏰 Dungeon: ',field:'Dungeon Start',role:'Dungeon Pings',heading:'🏰 **DUNGEON STARTING NOW**'}
};
const running=new Set();
async function checkScheduled(guild,kind){
 const config=EVENT_TYPES[kind],key=guild.id+':'+kind;
 if(running.has(key))return;
 running.add(key);
 try{
  const channel=guild.channels.cache.find(c=>c.name===config.channel&&c.isTextBased());
  if(!channel)return;
  let before;
  for(let page=0;page<5;page++){
   const batch=await channel.messages.fetch({limit:100,...(before?{before}:{})});
   if(!batch.size)break;
   for(const message of batch.values()){
    if(message.author.id!==guild.client.user.id)continue;
    const embed=message.embeds[0];
    if(!embed?.title?.startsWith(config.prefix)||embed.title.includes(' — CLOSED'))continue;
    const field=embed.fields.find(f=>f.name===config.field);
    const stamp=Number(field?.value.match(/<t:(\d+):/)?.[1]);
    if(!stamp||embed.fields.some(f=>f.name==='Reminder Sent'))continue;
    const now=Date.now(),due=stamp*1000;
    if(due>now||now-due>6*3600000)continue;
    const {EmbedBuilder}=await import('discord.js');
    await message.edit({embeds:[EmbedBuilder.from(embed).addFields({name:'Reminder Sent',value:'<t:'+Math.floor(now/1000)+':f>'})]});
    const role=guild.roles.cache.find(r=>r.name===config.role);
    await channel.send({
     content:(role?'<@&'+role.id+'>\n':'')+config.heading+
      '\n**'+embed.title.slice(config.prefix.length)+'**\nScheduled: <t:'+stamp+':F>\nJoin your guildmates: '+message.url,
     allowedMentions:{parse:[],roles:role?[role.id]:[]}
    });
   }
   before=batch.last().id;
   if(batch.size<100)break;
  }
 }catch(error){console.error(kind+' reminder check failed:',error);}
 finally{running.delete(key);}
}
export async function checkRaidReminders(guild){await checkScheduled(guild,'raid');}
export async function checkDungeonReminders(guild){await checkScheduled(guild,'dungeon');}
