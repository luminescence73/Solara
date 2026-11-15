import {EmbedBuilder} from 'discord.js';

const SOURCES=new Set(['general','screenshots-and-clips','memes','achievements','off-topic','introductions']);
const MIN_REACTIONS=5;
const SCAN_MINUTES=10;
let running=false;
function reactionScore(message){
 return [...message.reactions.cache.values()].reduce((sum,r)=>sum+r.count,0);
}
async function syncHighlight(guild,message){
 if(!message?.guild||message.guild.id!==guild.id||!SOURCES.has(message.channel?.name)||message.author?.bot)return;
 const target=guild.channels.cache.find(c=>c.name==='community-highlights'&&c.isTextBased());
 if(!target)return;
 const id=message.id,marker='solara-highlight:'+id;
 const history=await target.messages.fetch({limit:100});
 const existing=history.find(m=>m.author.id===guild.client.user.id&&m.embeds.some(e=>e.footer?.text===marker));
 const score=reactionScore(message);
 if(score<MIN_REACTIONS){
  if(existing)await existing.delete().catch(e=>console.warn('Highlight removal failed:',e.message));
  return;
 }
 const text=message.content?.slice(0,1700)||'*Shared a memorable moment.*';
 const image=message.attachments.find(a=>a.contentType?.startsWith('image/'));
 const embed=new EmbedBuilder().setColor(0xE69B46).setAuthor({name:message.member?.displayName||message.author.username,iconURL:message.author.displayAvatarURL()})
  .setTitle('🔥  RED SUN RISING / COMMUNITY HIGHLIGHT')
  .setDescription(text)
  .addFields({name:'✦ Community reactions',value:String(score),inline:true},{name:'✦ From',value:'<#'+message.channel.id+'>',inline:true},{name:'Original moment',value:'[View message]('+message.url+')'})
  .setFooter({text:marker}).setTimestamp(message.createdAt);
 if(image)embed.setImage(image.url);
 const payload={embeds:[embed],allowedMentions:{parse:[]}};
 if(existing)await existing.edit(payload);
 else await target.send(payload);
}
export async function checkCommunityHighlights(guild){
 if(running)return;
 running=true;
 try{
  const target=guild.channels.cache.find(c=>c.name==='community-highlights'&&c.isTextBased());
  if(!target)return;
  const channels=guild.channels.cache.filter(c=>SOURCES.has(c.name)&&c.isTextBased());
  for(const channel of channels.values()){
   const messages=await channel.messages.fetch({limit:75});
   for(const message of messages.values()){
    if(message.author.bot)continue;
    if(reactionScore(message)>=MIN_REACTIONS)await syncHighlight(guild,message);
   }
  }
 }catch(e){console.error('Community highlight scan failed:',e);}
 finally{running=false;}
}
export async function onCommunityReaction(reaction){
 try{
  if(reaction.partial)reaction=await reaction.fetch();
  let message=reaction.message;
  if(message.partial)message=await message.fetch();
  if(!message.guild)return;
  await syncHighlight(message.guild,message);
 }catch(e){console.error('Community reaction highlight failed:',e);}
}
export {SCAN_MINUTES};
