// Curated PvE reference messages. Short original summaries with links to full third-party guides.
const guides=[
['beginner-guides','🌅 BEGINNER FIELD GUIDE',[
['Start here','Choose a combat role (tank, healer, damage), learn your core abilities, and practice in easier group content before progressing. Ask guildmates when mechanics are unclear.','https://warcraft.wiki.gg/wiki/Guides'],
['Group etiquette','Read the encounter goal, follow the leader’s route, avoid pulling extra enemies, and communicate when you need a break.','https://www.wowhead.com/guides']
]],
['class-intel','⚔️ CLASS & SPECIALIZATION INTEL',[
['Choose your calling','Tanks control enemies and protect the group. Healers keep allies alive and handle dangerous damage patterns. Damage dealers focus targets, interrupt casts, and avoid hazards. Every class has distinct specializations.','https://www.icy-veins.com/wow/class-guides'],
['Build and rotation reference','Check your exact class and specialization for talents, priority abilities, defensives, utility, and recommended stats. Guides change with patches; verify the game version first.','https://www.wowhead.com/guides/classes']
]],
['profession-intel','🛠️ PROFESSIONS & CRAFTING',[
['Gathering and crafting','Gathering professions collect materials; crafting professions turn materials into equipment, consumables, and other useful items. Check recipe requirements, trainers, and expansion-specific progression before committing materials.','https://www.wowhead.com/guides/professions'],
['Planning upgrades','Prioritize recipes useful to your character or guild and confirm any specialization or knowledge-point decisions before spending limited resources.','https://www.method.gg/guides']
]],
['dungeon-intel','🏰 DUNGEON FIELD NOTES',[
['Before entering','Confirm difficulty, group roles, route, and whether everyone knows the key mechanics. Interrupt dangerous casts, watch ground effects, and save defensive abilities for heavy damage.','https://www.wowhead.com/guides/dungeons'],
['Boss checklist','Identify what must be interrupted, avoided, soaked, dispelled, or focused first. Mechanics and dungeon pools vary by season and game version.','https://www.method.gg/guides']
]],
['raid-intel','🔥 RAID WAR TABLE',[
['Before the pull','Confirm raid difficulty, role assignments, consumables, positioning, and voice comms. Read the specific boss strategy before the run.','https://www.wowhead.com/guides/raids'],
['During encounters','Follow phase transitions, priority targets, personal responsibilities, and group cooldown calls. Report mistakes constructively and adjust after wipes.','https://www.method.gg/guides']
]],
['gear-intel','🛡️ GEAR & CHARACTER POWER',[
['Upgrade priorities','Item level alone is not always the best choice. Compare the stats, effects, and set bonuses for your specialization. Keep useful defensive or utility options for encounters.','https://www.icy-veins.com/wow/class-guides'],
['Evaluate equipment','Use specialization guides for stat priorities, enchants, gems, and best-in-slot suggestions; confirm that they apply to your game version.','https://www.wowhead.com/guides']
]],
['world-intel','🗺️ AZEROTH EXPLORER',[
['World activities','Use the map and quest log to find campaigns, world activities, reputations, and travel hubs. Some activities unlock only after prerequisite quests or progression.','https://warcraft.wiki.gg/wiki/Guides'],
['Where to go next','Check expansion-specific zones, travel routes, and quest requirements rather than assuming every guide applies to your current version.','https://www.wowhead.com/guides']
]],
['collectibles-intel','✨ COLLECTIBLES & ACHIEVEMENTS',[
['Collection hunting','Mounts, pets, appearances, toys, and achievements may require quests, bosses, reputation, events, or repeat attempts. Check unlock conditions before farming.','https://www.wowhead.com/guides'],
['Track the goal','Pick one collectible, check prerequisites and availability, then coordinate group requirements with guildmates.','https://warcraft.wiki.gg/wiki/Guides']
]],
['addon-intel','🧩 ADDONS & QUALITY OF LIFE',[
['Useful addon categories','Consider interface customization, boss warnings, inventory organization, gathering assistance, and accessibility improvements. Install only what you need.','https://www.curseforge.com/wow'],
['Compatibility and safety','Check the addon’s supported game flavor and patch, update date, dependencies, and author notes before installing. Retail and WoW Forever compatibility must not be assumed to match.','https://www.curseforge.com/wow/addons/oneui'],
['WoW Forever option','OneUI lists support for both Retail and WoW Forever and offers UI and quality-of-life options. Verify the current supported version on its page.','https://www.curseforge.com/wow/addons/oneui']
]]
];
function render(title,sections){
 return ['## '+title,'','*Red Sun Rising • Solara Archives*','',
 ...sections.flatMap(([heading,summary,url])=>['**'+heading.toUpperCase()+'**',summary,'🔗 Full guide: '+url,'']),
 '—','*Quick reference only. Follow linked guides for detailed, version-specific instructions.*'].join('\n');
}
export async function ensureIntelGuides(guild){
 await guild.channels.fetch();
 for(const [name,title,sections] of guides){
  const ch=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());if(!ch)continue;
  const body=render(title,sections);
  try{
   const recent=await ch.messages.fetch({limit:100});
   const previous=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith('## '+title));
   if(previous){if(previous.content!==body||previous.embeds.length)await previous.edit({content:body,embeds:[],components:[],allowedMentions:{parse:[]}});}
   else await ch.send({content:body,allowedMentions:{parse:[]}});
  }catch(error){console.error('Intel guide update failed:',name,error);}
 }
}
