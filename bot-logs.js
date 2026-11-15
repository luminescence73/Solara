// Operational logging for the private staff channel. Avoid sending secrets or
// entire Discord payloads. Keep the original console output on Railway.
let target=null;
let pending=[];
let draining=false;
const recent=new Map();
const safe=value=>String(value??'Unknown').replace(/(Bot\s+)[A-Za-z0-9._-]+/gi,'$1[redacted]').replace(/(DISCORD_TOKEN|TOKEN|PASSWORD|SECRET|API_KEY)\s*[:=]\s*\S+/gi,'$1=[redacted]').slice(0,900);
async function drain(){
 if(draining||!target)return;
 draining=true;
 try{
  while(pending.length){
   const next=pending[0];
   await target.send({content:next,allowedMentions:{parse:[]},flags:4096});
   pending.shift();
  }
 }catch(error){console.warn('Solara staff log delivery failed:',error?.message);}
 finally{draining=false;}
}
export function logBotEvent(level,subject,detail=''){
 const label=safe(subject).slice(0,140),info=safe(detail);
 const signature=level+'|'+label+'|'+info;
 const now=Date.now();
 if(now-(recent.get(signature)||0)<60000)return;
 recent.set(signature,now);
 if(recent.size>200)for(const [key,stamp] of recent)if(now-stamp>120000)recent.delete(key);
 const icon=level==='error'?'🔴':level==='warning'?'🟠':'🟢';
 pending.push(icon+' **SOLARA / '+safe(level).toUpperCase()+'**\n**'+label+'**'+(info?'\n'+info:'')+'\n-# <t:'+Math.floor(now/1000)+':F>');
 if(pending.length>50)pending=pending.slice(-50);
 void drain();
}
export function initializeBotLogs(guild){
 target=guild.channels.cache.find(c=>c.name==='bot-logs'&&c.isTextBased())||null;
 logBotEvent('info','Solara online','Operational logging initialized.');
}
