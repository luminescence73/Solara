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

const deepDive={
'class-intel':[
['🛡️ TANK — PRACTICAL PLAYBOOK','**Opening:** Confirm the pull and establish threat on every enemy. Face dangerous frontal attacks away from the group.\n\n**During combat:** Maintain active mitigation, rotate defensives around predictable damage, and use interrupts or stuns to stop dangerous casts.\n\n**Positioning:** Keep enemies grouped without dragging hazards into allies. Move deliberately so melee teammates can stay in range.\n\n**Recovery:** If an add escapes, taunt it and regain control; if a defensive is unavailable, call for support.\n\n**Common mistakes:** Pulling before the healer is ready, turning cleaves toward allies, and saving every cooldown until too late.'],
['💚 HEALER — PRACTICAL PLAYBOOK','**Before combat:** Identify dispels, emergency cooldowns, and the most dangerous incoming damage.\n\n**During combat:** Prioritize survival over damage. Prepare for predictable group-wide hits and keep yourself positioned safely.\n\n**Resource management:** Use efficient heals for manageable damage and reserve stronger tools for emergencies.\n\n**Teamwork:** Coordinate major healing cooldowns and ask players to use personal defensives when appropriate.\n\n**Common mistakes:** Tunnel-visioning health bars, standing in hazards, and overlapping every cooldown.'],
['⚔️ DAMAGE — PRACTICAL PLAYBOOK','**Opening:** Identify priority enemies and wait for the tank to establish control.\n\n**Rotation:** Maintain essential effects, spend resources without excessive waste, and align burst windows with encounter requirements.\n\n**Utility:** Interrupt assigned casts, control dangerous enemies, and use personal defensives proactively.\n\n**Movement:** Plan instant casts and movement abilities around mechanics rather than ignoring hazards for damage.\n\n**Common mistakes:** Focusing meters over mechanics, attacking the wrong target, and missing interrupts.'],
['📖 CLASS-SPECIFIC BUILDS','Talent trees, abilities, stat priorities and rotations differ between Retail, Classic and private-server versions. This archive will not invent a universal build. Once the guild version is confirmed, Solara can publish one detailed message per specialization with its exact build, rotation and gear priorities.']
],
'dungeon-intel':[
['🏰 BEFORE THE FIRST PULL','**Group check:** Confirm tank, healer and damage roles; check that everyone is ready.\n\n**Route:** Agree on the intended route, priority packs, optional skips and any special objectives.\n\n**Interrupts:** Assign dangerous casts before engaging.\n\n**Recovery:** Explain how the group will handle deaths, resets and unexpected extra pulls.'],
['⚔️ TRASH PACKS','**Tank:** Gather enemies, establish threat, position frontals safely and stagger mitigation.\n\n**Healer:** Anticipate burst damage, keep safe line of sight and communicate resource limitations.\n\n**DPS:** Focus priority targets, interrupt assigned spells, avoid ground hazards and use crowd control when needed.'],
['🔥 BOSS FIGHT CHECKLIST','**Before pull:** Know the dangerous cast, movement mechanic, adds and phase changes.\n\n**During fight:** Handle assigned mechanics first; use defensives before predictable damage.\n\n**After wipe:** Identify the specific failed mechanic and change one thing for the next attempt.\n\nBoss names and exact mechanics will be added only for the confirmed game version.']
],
'raid-intel':[
['📋 RAID LEADER CHECKLIST','Confirm difficulty, group composition, role assignments, positioning, pull timing and communication expectations. Explain the encounter’s win condition and each phase before pulling.'],
['🛡️ ROLE RESPONSIBILITIES','**Tanks:** Coordinate boss positioning, taunt swaps and mitigation.\n\n**Healers:** Assign cooldown coverage, dispels and recovery tools.\n\n**DPS:** Respect priority targets, interrupt assignments, spread/stack calls and phase timings.'],
['🔁 BETWEEN ATTEMPTS','Review what caused the wipe, update assignments, and communicate one clear adjustment. Keep feedback specific and constructive. Exact encounter timelines depend on the confirmed game version.']
],
'gear-intel':[
['⚔️ CLASS PRIMARY STATS','**Death Knight:** Strength for all specializations.\n\n**Demon Hunter:** Agility for all specializations.\n\n**Druid:** Balance and Restoration use Intellect; Feral and Guardian use Agility.\n\n**Evoker:** Intellect for all specializations.\n\n**Hunter:** Agility for all specializations.\n\n**Mage:** Intellect for all specializations.\n\n**Monk:** Brewmaster and Windwalker use Agility; Mistweaver uses Intellect.\n\n**Paladin:** Holy uses Intellect; Protection and Retribution use Strength.\n\n**Priest:** Intellect for all specializations.\n\n**Rogue:** Agility for all specializations.\n\n**Shaman:** Elemental and Restoration use Intellect; Enhancement uses Agility.\n\n**Warlock:** Intellect for all specializations.\n\n**Warrior:** Strength for all specializations.\n\n*These are modern Retail-style primary stat associations. Classic and private-server mechanics may differ. Exact secondary-stat rankings require the game version, specialization, and current build.*'],
['📊 SECONDARY STATS EXPLAINED','**Critical Strike:** Chance for stronger critical hits or heals.\n\n**Haste:** Commonly speeds casts and attacks and may change resource generation or cooldown timings.\n\n**Mastery:** Improves an effect unique to your specialization.\n\n**Versatility:** Increases damage and healing and reduces damage taken.\n\n**Important:** There is no reliable universal Crit > Haste > Mastery > Versatility ordering for an entire class. Specializations, talents, gear levels, and patches change priorities.\n\n**Practical approach:** Pick your specialization first, then compare gear with an up-to-date guide for that exact game version.'],
['🛡️ ROLE-BASED GEAR PRIORITIES','**Tanks:** Look at mitigation, survivability, and consistent threat or damage. Defensive value changes by encounter and specialization.\n\n**Healers:** Balance healing throughput, mana efficiency, haste or cast timing, and emergency tools according to the specialization.\n\n**DPS:** Evaluate sustained output, burst windows, target count, and special effects.\n\n**All roles:** A stronger weapon, useful trinket, or set bonus can outweigh a simple secondary-stat comparison.'],
['⚙️ GEAR, GEMS & ENCHANTS','**Item level:** Often useful as a starting point, not the only deciding factor.\n\n**Weapons:** Confirm the correct weapon type, primary stat, and any relevant effects.\n\n**Trinkets:** Compare passive effects against activated effects; plan when to use on-use trinkets.\n\n**Set bonuses:** Check whether replacing a piece breaks a valuable bonus.\n\n**Gems and enchants:** Choose enhancements for your current specialization and game version. Do not spend scarce materials before confirming the item is worth keeping.'],
['🔥 SMART UPGRADE CHECKLIST','**1.** Select your exact class, specialization, and content goal.\n\n**2.** Identify weak slots, missing enhancements, and useful set bonuses.\n\n**3.** Compare candidate equipment using relevant primary stats, effects, and secondary stats.\n\n**4.** Check available dungeon, raid, crafting, quest, or reputation rewards.\n\n**5.** Save limited upgrade currency for meaningful improvements.\n\n**6.** Recheck your build and enhancements after major gear changes.']
],
'world-intel':[
['🗺️ ZONES & TRAVEL','**Progression:** Check the campaign, quest log, and map for available zones and objectives. Some routes require prerequisites.\n\n**Travel:** Unlock flight paths and identify safe hubs.\n\n**Efficiency:** Group nearby objectives to reduce travel.\n\n**Safety:** Check enemy difficulty and party requirements before entering unfamiliar areas.'],
['📜 QUESTS & CAMPAIGNS','**Main quests:** Prioritize story objectives that unlock features or zones.\n\n**Side quests:** Complete them for exploration, story, and additional rewards.\n\n**Group objectives:** Coordinate with guildmates for difficult encounters.\n\n**If stuck:** Check prerequisites, phasing, and quest tracking.'],
['🌍 WORLD ACTIVITIES & REPUTATION','**World activities:** Compare rewards such as gear, currency, and reputation.\n\n**Factions:** Review reputation unlocks before committing time or resources.\n\n**Events:** Verify current availability and reward requirements in-game.\n\n**Planning:** Prioritize objectives that advance multiple goals together.'],
['🧭 GUILD EXPLORATION','Before heading out, confirm the destination, group size, travel requirements, and goals.\n\nCheck access requirements and identify a safe meeting point.\n\nSpecific routes and unlocks must match the guild’s WoW version.']
],
'collectibles-intel':[
['🐉 MOUNT HUNTING','**Sources:** Quests, vendors, reputation, achievements, events, rare enemies, and boss drops.\n\n**Before farming:** Check prerequisites, eligibility, lockouts, and whether the reward is guaranteed or chance-based.\n\n**Group farms:** Coordinate runs for group-only sources.'],
['🐾 PETS, TOYS & APPEARANCES','**Pets:** Check battles, vendors, quests, events, and drops.\n\n**Toys:** Review event, vendor, reputation, and achievement requirements.\n\n**Appearances:** Check armor, weapon, class, and character restrictions.\n\n**Before buying:** Verify whether you already own the collectible.'],
['🏆 ACHIEVEMENTS','Read every criterion before starting. Separate solo tasks from group objectives.\n\nFor timed achievements, assign responsibilities and confirm the conditions before the attempt.\n\nUse in-game tracking to record incomplete criteria. Some achievements vary by game version.'],
['📅 COLLECTION ROUTINE','**Daily:** Check repeatable targets relevant to your goals.\n\n**Weekly:** Review eligible lockouts and organize group attempts.\n\n**Seasonal:** Verify events are active before farming.\n\n**Long-term:** Keep a short priority list and track completed unlocks.']
]
};
function renderDeepDive(name){
 const items=deepDive[name]||[];
 return items.map(([heading,body])=>['## '+heading,'',body,'','—',''].join('\n'));
}

function render(title,sections){
 return ['## '+title,'','*Red Sun Rising • Solara Archives*','',
 ...sections.flatMap(([heading,summary,url])=>['**'+heading.toUpperCase()+'**',summary,'🔗 Full guide: '+url,'']),
 '—','*Quick reference only. Follow linked guides for detailed, version-specific instructions.*'].join('\n');
}
export async function ensureIntelGuides(guild){
 await guild.channels.fetch();
 for(const [name,title,sections] of guides){
  const ch=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());if(!ch)continue;
  const isGear=name==='gear-intel';
  const body=isGear
   ? ['## '+title,'','*Red Sun Rising • Solara Archives*','','**Start with the class primary-stat guide below, then review secondary stats, role-specific gearing, enhancements, and upgrade planning.**','','*Detailed resources are collected at the end of the channel guides.*'].join('\\n').replaceAll('\\n','\n')
   : render(title,sections);
  try{
   const recent=await ch.messages.fetch({limit:100});
   const previous=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith('## '+title));
   if(previous){if(previous.content!==body||previous.embeds.length)await previous.edit({content:body,embeds:[],components:[],allowedMentions:{parse:[]}});}
   else await ch.send({content:body,allowedMentions:{parse:[]}});
   const details=renderDeepDive(name);
   for(const detail of details){
     const heading=detail.split('\n')[0];
     const match=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith(heading));
     if(match){if(match.content!==detail||match.embeds.length)await match.edit({content:detail,embeds:[],components:[],allowedMentions:{parse:[]}});}
     else await ch.send({content:detail,allowedMentions:{parse:[]}});
   }
   if(isGear){
     const resources=['## 🔗 FURTHER GEAR READING','','*Use these only after the in-Discord guide above.*','','**Specialization builds, stat priorities and gear:**','https://www.icy-veins.com/wow/class-guides','','**Equipment and class guides:**','https://www.wowhead.com/guides/classes','','*Check that each guide matches your exact WoW version and patch.*'].join('\n');
     const old=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith('## 🔗 FURTHER GEAR READING'));
     if(old){if(old.content!==resources||old.embeds.length)await old.edit({content:resources,embeds:[],components:[],allowedMentions:{parse:[]}});}
     else await ch.send({content:resources,allowedMentions:{parse:[]}});
   }
  }catch(error){console.error('Intel guide update failed:',name,error);}
 }
}
