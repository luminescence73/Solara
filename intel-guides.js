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
 "beginner-guides": [
  [
   "🌅 STARTING WOW FOREVER",
   "WoW: Forever is a permanent level 1–60 adventure through a reimagined original Azeroth, separate from Midnight. Follow starting quests, visit trainers, learn your abilities, discover flight paths and set your Hearthstone."
  ],
  [
   "⚔️ YOUR CLASS",
   "Forever has nine classes: Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock and Druid. Class and race combinations differ from original Classic and Midnight. Read #class-intel before choosing talents."
  ],
  [
   "🏕️ LEVELING & FOREVER SYSTEMS",
   "Explore the Eastern Kingdoms and Kalimdor, including new quests and zones. Forever includes Legacy account-wide progression and a Camping system. Do not follow Midnight expansion campaigns or Delves guides."
  ],
  [
   "🤝 GROUPS & CHECKLIST",
   "Prepare your gear, repair equipment and learn your group role. Five-player dungeons are opportunities to quest and practice. Use #group-finder for guildmates, #dungeon-intel for preparation and #help-and-requests for questions."
  ]
 ],
 "class-intel": [
  [
   "⚔️ THE NINE FOREVER CLASSES",
   "**Warrior:** Arms, Fury, Protection.\n\n**Paladin:** Holy, Protection, Retribution.\n\n**Hunter:** Beast Mastery, Marksmanship, Survival.\n\n**Rogue:** Assassination, Combat, Subtlety.\n\n**Priest:** Discipline, Holy, Shadow.\n\n**Shaman:** Elemental Combat, Enhancement, Restoration.\n\n**Mage:** Arcane, Fire, Frost.\n\n**Warlock:** Affliction, Demonology, Destruction.\n\n**Druid:** Balance, Feral Combat, Restoration.\n\nForever has nine classes, not Midnight's thirteen."
  ],
  [
   "🛡️ TANK, HEALER & DPS",
   "**Tanks:** Warriors, Paladins and Druids can control enemies and mitigate damage.\n\n**Healers:** Priests, Paladins, Shamans and Druids can restore health and manage resources.\n\n**DPS:** Every class has damage options. Learn ability priorities, positioning, interrupts and defensive tools."
  ],
  [
   "🌳 TALENTS & BUILDS",
   "Forever reworks the nine original classes and their talent trees. Dual Specialization becomes available at level 40. Use Forever-specific talent references, not Midnight Hero Talents, modern rotations or class rankings."
  ],
  [
   "📋 CLASS CHECKLIST",
   "Read ability tooltips and your current talent tree. Practice resource management, defensive abilities, interrupts and group mechanics. Compare gear for your Forever role; see #gear-intel."
  ]
 ],
 "profession-intel": [
  [
   "🛠️ FOREVER PROFESSIONS",
   "WoW: Forever has nine primary professions and three secondary professions. You can learn up to two primary professions and all three secondary professions.\n\n**Gathering:** Mining, Herbalism, Skinning.\n\n**Crafting:** Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring.\n\n**Secondary:** Cooking, First Aid, Fishing."
  ],
  [
   "🌿 PAIRINGS & MATERIALS",
   "Mining supports Blacksmithing and Engineering; Herbalism supports Alchemy; Skinning supports Leatherworking. Tailoring uses cloth, while Enchanting uses materials from disenchanting eligible equipment. Two gathering professions can help with selling raw materials."
  ],
  [
   "⚒️ RECIPES & PROGRESSION",
   "Visit trainers and look for recipes through vendors, quests and other Forever sources. Gather appropriate materials and compare crafting costs. Forever expands profession recipes and progression; do not assume Midnight knowledge-point trees, crafting orders or Archaeology apply."
  ],
  [
   "🍲 SECONDARY SKILLS & GOLD",
   "Cooking provides food, First Aid provides bandages, and Fishing supplies ingredients and trade goods. Check current auction prices before selling and coordinate crafting with guildmates."
  ]
 ],
 "dungeon-intel": [
 [
  "🏰 FOREVER DUNGEONS & PARTY RULES",
  "**WoW: Forever includes every Classic dungeon plus nine new dungeons.** There is no Midnight Mythic+ keystone or affix system.\n\nMost dungeon runs use **one tank, one healer and three DPS**. Some Classic dungeons permit larger groups, but quest completion can require a five-player party. Blackrock Depths, Stratholme and Scholomance are limited to five in the Forever dungeon overview. Upper Blackrock Spire supports ten.\n\nDungeon XP has been reduced compared with earlier versions, so questing alongside dungeons is useful."
 ],
 [
  "🗺️ NINE NEW DUNGEONS — LEVELS & LOCATIONS",
  "**13–18 · Hall of Thanes** — Beneath Ironforge; dwarven ruins and four listed bosses.\n\n**15–20 · Ruins of Lordaeron** — Above Undercity, Tirisfal Glades; undead encounters.\n\n**24–29 · Excavation Site: Wetlands** — Whelgar's Excavation Site; raptors and titan discoveries.\n\n**28–33 · City of Dalaran** — Alterac Mountains; unstable magic and Kirin Tor troubles.\n\n**35–40 · The Drowned City** — Underwater entrance off Stranglethorn Vale; ancient troll ruins.\n\n**40–45 · Krol'dok Stronghold** — Hills of Riverglades; ogre stronghold.\n\n**48–53 · Alcaz Prison** — Alcaz Island, northeast Dustwallow Marsh; Defias and naga.\n\n**55–60 · Blackmaw Hold** — Behind the furbolg gates in northern Azshara.\n\n**58–60 · Shaper's Terrace** — Titan facility near Marshal's Refuge, Un'Goro Crater.\n\nThese are suggested dungeon level ranges, not necessarily minimum entry levels."
 ],
 [
  "📜 CLASSIC DUNGEONS STILL AVAILABLE",
  "**Early:** Ragefire Chasm (13–18), Wailing Caverns (15–25), Deadmines (18–23), Shadowfang Keep (22–30), Stockade (22–30), Blackfathom Deeps (24–32).\n\n**Middle:** Scarlet Monastery wings (28–45), Gnomeregan (29–38), Razorfen Kraul (30–40), Razorfen Downs (40–50), Uldaman (42–52), Zul'Farrak (44–54), Maraudon wings (45–57).\n\n**Later:** Sunken Temple (50–60), Blackrock Depths (52–60), Lower Blackrock Spire (55–60), Upper Blackrock Spire (58–60), Dire Maul (58–60), Scholomance (58–60), Stratholme (58–60).\n\nSome entrances, keys, quests and faction travel routes require planning. Upper Blackrock Spire requires a Seal of Ascension in the group."
 ],
 [
  "⚔️ BOSS FIGHTS, QUESTS & PREPARATION",
  "**Tank:** Establish threat, face enemies away from allies and control pull size.\n\n**Healer:** Manage mana, positioning and dispels. Ask for a pause when needed.\n\n**DPS:** Focus priority enemies, use interrupts and crowd control where available, and avoid accidental pulls.\n\n**Before entering:** Collect relevant dungeon quests, check the entrance and level range, repair equipment and free bag space.\n\n**During the run:** Discuss dangerous casts, patrols and boss abilities. Do not assume a mechanic exists unless it is confirmed for that dungeon.\n\n**After a wipe:** Regroup, explain what happened and adjust the pull or assignment. Use #group-finder to organize and #gear-intel to compare rewards."
 ]
],
 "raid-intel": [
 [
  "🔥 WOW FOREVER RAIDS — WHAT TO EXPECT",
  "WoW: Forever raids are endgame group challenges built around coordinated boss fights, gear preparation and progression. They are **not** Midnight's raid system; do not assume Retail LFR, Normal, Heroic or Mythic tiers.\n\n**Release timing:** New Forever raid content is scheduled to begin unlocking on **December 9, 2026**. Confirm actual availability in-game before advertising a run. Older Classic raid content and its access requirements should be checked separately.\n\nThe Forever-specific Wowhead raid directory at the bottom is the starting point for encounter guides as they are published."
 ],
 [
  "📋 RAID ROSTER, ENTRY & LEADERSHIP",
  "**Before scheduling:** Confirm which raid is available, its supported group size, any required access or attunement, and the expected duration. Do not guess raid size or boss count.\n\n**Roster:** Organize tanks, healers and damage dealers for the actual encounter. Assign a leader for pull calls and a backup for absences.\n\n**Briefing:** Explain the route, target order, key boss abilities, safe positions and what each role must do.\n\n**Communication:** Set expectations for voice chat, breaks, learning runs and loot distribution. Sign up in #raid-signups; schedules belong in #guild-events."
 ],
 [
  "🛡️ TANKS, HEALERS & DAMAGE DEALERS",
  "**Tanks:** Build threat, position bosses, protect the group from frontal attacks and coordinate defensive abilities. Use tank swaps only if the specific boss requires them.\n\n**Healers:** Monitor tank and raid health, conserve mana, prepare for group damage and dispel effects that can be removed.\n\n**Damage dealers:** Follow target priority, interrupt when possible, avoid hazards and use personal survival abilities.\n\n**Everyone:** Know their assignments, watch for adds and phase changes, and report problems without blaming teammates."
 ],
 [
  "🎒 RAID PREPARATION, LOOT & PROGRESSION",
  "**Equipment:** Use Forever-relevant class gear, check durability and bring available consumables. Do not use Midnight item-level tracks or currencies as your reference.\n\n**Loot:** Confirm the guild's loot method and any class or role priorities before the first pull.\n\n**Progression:** After each attempt, identify whether threat, healing, positioning, interrupts or an encounter mechanic caused the wipe. Change the plan and try again.\n\n**Checklist:** Confirm availability and access; sign up; repair; bring supplies; learn verified boss tactics; understand assignments; arrive on time.\n\nFor gear questions, see #gear-intel and #class-intel."
 ]
],
 "gear-intel": [
  [
   "🛡️ GEAR IN WOW FOREVER",
   "Forever uses level 1–60 progression and its own class balance. Compare equipment for your actual Forever class, talents and role—not Midnight item-level guides or Hero Talents."
  ],
  [
   "📊 STATS & EQUIPMENT",
   "Consider Strength, Agility, Intellect, Stamina, Spirit, weapon damage and other item effects where relevant. Hit, critical chance and spell effects may matter depending on your build. Do not copy Midnight Mastery, Versatility or modern stat weights."
  ],
  [
   "⚔️ ROLE PRIORITIES",
   "Tanks need survival and threat; healers need healing effectiveness and mana sustain; damage dealers need suitable weapons, attributes and spell effects. Exact priorities require a Forever-specific build."
  ],
  [
   "🧰 CRAFTING & LOOT",
   "Look for available enchants, consumables, equipment and set bonuses. Check #profession-intel for crafting and compare loot with your current gear before replacing items."
  ]
 ],
 "world-intel": [
  [
   "🗺️ FOREVER AZEROTH",
   "WoW: Forever is set in a reimagined original level 1–60 Eastern Kingdoms and Kalimdor, not Midnight's expansion timeline. Blizzard describes more than 1,000 new quests and expanded areas."
  ],
  [
   "🌲 NEW PLACES",
   "Explore new or reimagined areas including Mount Hyjal, Riverglades, Shen’dralas and Zephras Isle. Check level ranges, quest prerequisites and any access conditions before traveling."
  ],
  [
   "🛫 TRAVEL & QUESTS",
   "Discover flight masters, use the Hearthstone and learn available ships, zeppelins and overland routes. Follow Forever questlines and explore new areas; do not rely on Midnight zone maps or world quest unlocks."
  ],
  [
   "🏕️ FOREVER SYSTEMS",
   "The Legacy system offers account-wide progression benefits and Camping adds a Forever-specific activity. Coordinate exploration and quest groups in #group-finder."
  ]
 ],
 "collectibles-intel": [
  [
   "🏆 COLLECTIBLES IN FOREVER",
   "Verify that each mount, pet, cosmetic, appearance or reward actually exists in WoW: Forever. Midnight collections and unlocks are not automatically applicable."
  ],
  [
   "🐎 MOUNTS & PETS",
   "Check each reward's source, training requirements, restrictions and availability. Some edition bonuses work in multiple versions; others are Forever-only."
  ],
  [
   "🎭 APPEARANCES & EXPLORATION",
   "Forever includes optional visual customization and transmog features. Look for rewards from quests, dungeons, vendors, events and exploration, but verify their specific Forever requirements."
  ],
  [
   "📋 COLLECTING CHECKLIST",
   "Confirm the reward exists in Forever, identify its source, check character restrictions and coordinate group farms in #group-finder."
  ]
 ],
 "addon-intel": [
 [
  "🧩 WOW FOREVER ADDON CATALOG",
  "**Compatibility snapshot: November 14, 2026.** These are popular addon options, not every addon ever published. Only use a file specifically marked **WoW Forever (1.60.1 / interface 16001)**. A Forever build does not guarantee every feature works.\n\nThe game already includes a damage meter, cooldown manager and UI editing, so you may not need extra addons for those features."
 ],
 [
  "🧭 QUESTING, MAPS & EXPLORATION",
  "**Questie** — Quest markers, objective locations and tracking; Forever quest data may be incomplete.\n\n**RestedXP Guide** — Step-by-step leveling routes; some guide packs are paid.\n\n**TomTom** — Map coordinates, waypoints and directional arrow.\n\n**HandyNotes** — Map pins for points of interest; modules vary.\n\n**Leatrix Maps** — Improves map display and navigation.\n\n**Mapster** — Map customization; older Forever file, check errors.\n\n**RareScanner** — Alerts for nearby rare creatures and collectibles.\n\n**SilverDragon** — Tracks rare mobs and sightings.\n\n**GatherMate2** — Remembers herb and mining node locations."
 ],
 [
  "⚔️ DUNGEONS, COMBAT & PERFORMANCE",
  "**Deadly Boss Mods (DBM)** — Boss timers and alerts; Forever dungeon boss warnings are still incomplete.\n\n**BigWigs** — Boss-alert framework; Forever boss modules not yet available (partial support).\n\n**GTFO** — Audible warning when standing in harmful effects.\n\n**Details!** — Damage/healing meter with combat breakdowns.\n\n**Skada** — Alternative damage and healing meter.\n\n**Threat Plates** — Nameplates that highlight threat and enemies.\n\n**Plater** — Highly customizable enemy nameplates.\n\n**TellMeWhen** — Custom icons for cooldowns, buffs and debuffs.\n\n**Decursive** — Helps identify and remove dispellable harmful effects.\n\n**Pawn** — Compares item stats using configured weights; presets may not fit Forever."
 ],
 [
  "🖥️ INTERFACE, ACTION BARS & CHAT",
  "**ElvUI** — Broad UI replacement with configurable frames and panels.\n\n**Bartender4** — Move, resize and configure action bars.\n\n**Dominos** — Alternative action-bar layout; disables itself with gamepad UI enabled.\n\n**Leatrix Plus** — Quality-of-life interface options; some Forever features restricted.\n\n**Prat 3.0** — Chat window formatting and customization.\n\n**VuhDo** — Configurable healing/raid frames; some advanced features unavailable.\n\n**Grid2** — Compact, configurable raid and party frames.\n\n**Clique** — Mouseover and click-casting bindings.\n\n**Baganator** — Combined or categorized bags with search.\n\n**Bagnon** — Combines inventory bags into one window.\n\n**SexyMap** — Minimap appearance and customization.\n\n**Titan Panel** — Information bars for gold, durability and more."
 ],
 [
  "💰 AUCTION HOUSE, PROFESSIONS & COLLECTIONS",
  "**Auctionator** — Auction House shopping, pricing and quick posting.\n\n**GatherMate2** — Tracks gathering-node locations for farming routes.\n\n**Altoholic** — Tracks alts, inventories and account information.\n\n**ALL THE THINGS** — Collectible and completion tracking; verify Forever data.\n\n**Scrap** — Helps sell junk items automatically.\n\n**Syndicator** — Inventory and item information across characters."
 ],
 [
  "⚠️ NOT READY OR LIMITED",
  "**No confirmed Forever file (Nov 14):** WeakAuras, OmniCC, Shadowed Unit Frames, AdiBags and Postal. Do not install a Retail or Classic version as a substitute.\n\n**Partial support:** BigWigs core is available, but Forever boss modules are missing. DBM has Forever dungeon files, but detailed boss-specific warnings are incomplete.\n\n**Important:** Some addons are affected by Forever's modern combat API limits. Check each author's latest changelog."
 ],
 [
  "📥 INSTALLATION & TROUBLESHOOTING",
  "**1.** Choose the **Forever** game version in your addon manager or download a Forever-specific release from its developer.\n\n**2.** For manual installation, use `World of Warcraft/_forever_/Interface/AddOns` and extract each addon folder directly inside AddOns.\n\n**3.** Enable addons from the character selection screen. Restart or reload the interface when required.\n\n**4.** If something breaks, disable the newest addon, check for an updated Forever file and test again. Back up your settings folder before major changes.\n\n**5.** Never run suspicious installers or share your account credentials."
 ]
]
};
function channelLink(guild,name){
 const channel=guild.channels.cache.find(c=>c.name===name&&c.isTextBased());
 return channel?`<#${channel.id}>`:`#${name} (channel unavailable)`;
}
function resolveChannelReferences(content,guild){
 return content.replace(/#(gear-intel|class-intel|world-intel|collectibles-intel|beginner-guides|help-and-requests|group-finder|raid-signups|guild-information)\b/g,(_,name)=>channelLink(guild,name));
}
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
  const isWorld=name==='world-intel';
  const isCollectibles=name==='collectibles-intel';
  const isBeginner=name==='beginner-guides';
  const isClass=name==='class-intel';
  const isProfession=name==='profession-intel';
  const isDungeon=name==='dungeon-intel';
  const isRaid=name==='raid-intel';
  const body=(isGear||isWorld||isCollectibles||isBeginner||isClass||isProfession||isDungeon||isRaid||name==='addon-intel')
   ? ['## '+title,'','*Red Sun Rising • Solara Archives*','','**Read the detailed in-Discord reference sections below first. External resources appear at the end.**','','*Detailed resources are collected at the end of the channel guides.*'].join('\\n').replaceAll('\\n','\n')
   : render(title,sections);
  try{
   const recent=await ch.messages.fetch({limit:100});

   // One managed set per intel channel. Edit existing Solara posts in place;
   // delete obsolete bot-authored guide posts instead of appending duplicates.
   const history=[];let before;
   for(let page=0;page<10;page++){
     const batch=await ch.messages.fetch({limit:100,...(before?{before}:{})});
     if(!batch.size)break;
     history.push(...batch.values());before=batch.last().id;
     if(batch.size<100)break;
   }
   const owned=history.filter(m=>m.author.id===guild.client.user.id)
     .sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
   const foreverUrl='https://worldofwarcraft.blizzard.com/en-us/forever/';
   const officialGuide='https://worldofwarcraft.blizzard.com/en-us/news/24315643/return-to-azeroth-in-world-of-warcraft-forever';
   const special={
     'class-intel':['https://www.icy-veins.com/wow-forever/all-class-guides'],
     'profession-intel':['https://www.wofwforever.com/en/guides/wow-forever-professions-guide/'],
     'dungeon-intel':['https://www.wowhead.com/forever/guide/dungeons-overview-locations-details'],
     'raid-intel':['https://www.wowhead.com/forever/guides/raids'],
     'beginner-guides':[officialGuide],
     'gear-intel':['https://www.wowforever.info/'],
     'world-intel':[officialGuide],
     'collectibles-intel':[foreverUrl],
     'addon-intel':['https://wowforeveraddons.com/compatibility','https://www.wofwforever.com/en/guides/wow-forever-addon-compatibility/','https://www.curseforge.com/wow','https://addons.wago.io/']
   };
   const navigation={
     'class-intel':['gear-intel','beginner-guides','group-finder'],
     'profession-intel':['gear-intel','help-and-requests'],
     'dungeon-intel':['gear-intel','group-finder','help-and-requests'],
     'raid-intel':['raid-signups','guild-events','gear-intel'],
     'gear-intel':['class-intel','profession-intel'],
     'world-intel':['beginner-guides','group-finder'],
     'collectibles-intel':['world-intel','group-finder'],
     'beginner-guides':['class-intel','world-intel','help-and-requests'],
     'addon-intel':['help-and-requests']
   };
   const links=['## 🔗 WOW FOREVER RESOURCES','','**Official World of Warcraft: Forever:**',foreverUrl,'',
     '**Forever-specific reading:**',...(special[name]||[officialGuide]),'',
     '**🔗 RED SUN RISING CHANNELS**',...(navigation[name]||[]).map(n=>n+': '+channelLink(guild,n)),
     '','*Do not substitute Midnight expansion mechanics for WoW: Forever.*'].join('\n');
   const desired=[...(name==='addon-intel'?[]:[body]),...renderDeepDive(name).map(d=>resolveChannelReferences(d,guild)),links];
   // Discord suppresses bulky website previews for links wrapped in angle brackets.
   if(name==='addon-intel')desired[desired.length-1]=desired[desired.length-1].replace(/https:\/\/[^\s<>]+/g,url=>'<'+url+'>');
   if(isDungeon||isRaid){
     // Strict edit-only mode for raid/dungeon intel: never send or delete messages.
     // Fit all content into the existing bot-authored message slots.
     if(!owned.length){console.warn('No existing intel posts to edit:',name);continue;}
     const slots=owned.length;
     const content=desired.slice();
     while(content.length>slots){
       // Merge adjacent guide sections into existing messages, keeping links last.
       const mergeAt=Math.max(1,content.length-3);
       content.splice(mergeAt-1,2,content[mergeAt-1]+'\\n\\n'+content[mergeAt]);
     }
     // Leave any additional historical posts untouched; never replace them with filler.
     for(let i=0;i<content.length;i++){
       const fixed=content[i].replaceAll('\\\\n','\\n');
       if(owned[i].content!==fixed||owned[i].embeds.length||owned[i].components.length)
         await owned[i].edit({content:fixed,embeds:[],components:[],allowedMentions:{parse:[]}});
     }
     continue;
   }
   for(let i=0;i<desired.length;i++){
     const m=owned[i];
     if(m){
       if(m.content!==desired[i]||m.embeds.length||m.components.length)
         await m.edit({content:desired[i],embeds:[],components:[],allowedMentions:{parse:[]}});
     }else await ch.send({content:desired[i],allowedMentions:{parse:[]}});
   }
   for(const m of owned.slice(desired.length))
     await m.delete().catch(e=>console.warn('Could not remove outdated intel',name,m.id,e.message));
   continue;

   if(isDungeon){
     // Dungeon intel is a managed set: reuse the oldest Solara messages, never append
     // on every startup, and delete extra bot-authored posts after reconciliation.
     const history=[];
     let before;
     for(let page=0;page<10;page++){
       const batch=await ch.messages.fetch({limit:100,...(before?{before}:{})});
       if(!batch.size)break;
       history.push(...batch.values());
       before=batch.last().id;
       if(batch.size<100)break;
     }
     const mine=history.filter(m=>m.author.id===guild.client.user.id)
       .sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
     const sections=renderDeepDive(name).map(d=>resolveChannelReferences(d,guild));
     const links=['## 🔗 FURTHER DUNGEON READING','','*Additional references; mechanics may differ from WoW Forever.*','','**Wowhead — general dungeon reference:**','https://www.wowhead.com/guides/dungeons','','**Icy Veins — general dungeon reference:**','https://www.icy-veins.com/wow/dungeons','','**Warcraft Wiki — instance reference:**','https://warcraft.wiki.gg/wiki/Instance','','**🔗 RED SUN RISING CHANNELS**','Class and role advice: '+channelLink(guild,'class-intel'),'Gear and upgrades: '+channelLink(guild,'gear-intel'),'Find a dungeon group: '+channelLink(guild,'group-finder'),'Ask for help: '+channelLink(guild,'help-and-requests')].join('\\n');
     const desired=[body,...sections,links];
     // Oldest posts retain their original message IDs. New posts are only needed
     // if there are fewer existing posts than sections.
     for(let i=0;i<desired.length;i++){
       const target=mine[i];
       if(target){
         if(target.content!==desired[i]||target.embeds.length||target.components.length)
           await target.edit({content:desired[i],embeds:[],components:[],allowedMentions:{parse:[]}});
       }else{
         await ch.send({content:desired[i],allowedMentions:{parse:[]}});
       }
     }
     for(const extra of mine.slice(desired.length)){
       await extra.delete().catch(err=>console.warn('Dungeon duplicate cleanup failed:',extra.id,err.message));
     }
     continue;
   }

   const previous=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith('## '+title));
   if(previous){if(previous.content!==body||previous.embeds.length)await previous.edit({content:body,embeds:[],components:[],allowedMentions:{parse:[]}});}
   else await ch.send({content:body,allowedMentions:{parse:[]}});
   if(isDungeon){
     // Reconcile existing Solara dungeon posts instead of appending another guide.
     // Keep unrelated/user messages untouched. Prefer editing the existing messages.
     const desired=[body,...renderDeepDive(name).map(detail=>resolveChannelReferences(detail,guild))];
     const owned=[...recent.values()].filter(m=>m.author.id===guild.client.user.id);
     const dungeonHeads=new Set([
       '🏰 BEFORE THE FIRST PULL','⚔️ TRASH PACKS','🔥 BOSS FIGHT CHECKLIST',
       '🏰 DUNGEON BASICS & DIFFICULTY','⏱️ MYTHIC+ & TIMED RUNS'
     ]);
     const isDungeonPost=m=>m.content.startsWith('## '+title)||
       m.content.startsWith('## 🔗 FURTHER DUNGEON READING')||
       renderDeepDive(name).some(d=>m.content.startsWith(d.split('\\n')[0]))||
       [...dungeonHeads].some(h=>m.content.startsWith('## '+h));
     const candidates=owned.filter(isDungeonPost).sort((a,b)=>Number(BigInt(a.id)>BigInt(b.id)?-1:1));
     const intro=candidates.find(m=>m.content.startsWith('## '+title));
     const detailCandidates=candidates.filter(m=>m!==intro&&!m.content.startsWith('## 🔗 FURTHER DUNGEON READING'));
     const desiredDetails=desired.slice(1);
     for(let i=0;i<desiredDetails.length;i++){
       const target=detailCandidates[i];
       if(target&&target.content!==desiredDetails[i])await target.edit({content:desiredDetails[i],embeds:[],components:[],allowedMentions:{parse:[]}});
       else if(!target)await ch.send({content:desiredDetails[i],allowedMentions:{parse:[]}});
     }
     for(const extra of detailCandidates.slice(desiredDetails.length))
       await extra.delete().catch(err=>console.warn('Could not remove superseded dungeon guide',extra.id,err.message));
   }
   const details=isDungeon?[]:renderDeepDive(name);
   for(const rawDetail of details){
     const detail=resolveChannelReferences(rawDetail,guild);
     const heading=detail.split('\n')[0];
     const match=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith(heading));
     if(match){if(match.content!==detail||match.embeds.length)await match.edit({content:detail,embeds:[],components:[],allowedMentions:{parse:[]}});}
     else await ch.send({content:detail,allowedMentions:{parse:[]}});
   }
   if(isGear||isWorld||isCollectibles||isBeginner||isClass||isProfession||isDungeon||isRaid){
     const resources=isRaid
      ? ['## 🔗 FURTHER RAID READING','','*Reference material after the in-Discord raid lessons:*','','**Warcraft Wiki — raid overview:**','https://warcraft.wiki.gg/wiki/Raid','','**Wowhead — raid guides (other versions may differ):**','https://www.wowhead.com/guides/raids','','**Icy Veins — raid guides (other versions may differ):**','https://www.icy-veins.com/wow/raids','','*These are general references, not verified WoW Forever boss strategies. Confirm every encounter against the server before using it.*'].join('\n')
      :isDungeon
      ? ['## 🔗 FURTHER DUNGEON READING','','*Use these after the in-Discord dungeon guides above:*','','**Wowhead — general dungeon reference (may not match WoW Forever):**','https://www.wowhead.com/guides/dungeons','','**Icy Veins — general dungeon reference (may not match WoW Forever):**','https://www.icy-veins.com/wow/dungeons','','**Warcraft Wiki — general dungeon reference:**','https://warcraft.wiki.gg/wiki/Instance','','*These external resources may describe Retail or other WoW versions. Verify encounter details against WoW Forever before following them.*'].join('\n')
      :isProfession
      ? ['## 🔗 FURTHER PROFESSION READING','','*Use these after the in-Discord profession reference above:*','','**Wowhead — profession guides:**','https://www.wowhead.com/guides/professions','','**Warcraft Wiki — professions:**','https://warcraft.wiki.gg/wiki/Profession','','**Icy Veins — profession guides:**','https://www.icy-veins.com/wow/professions-guides','','*Confirm the guide matches your game version and expansion.*'].join('\n')
      :isClass
      ? ['## 🔗 FURTHER CLASS READING','','*Use these after the class and role guides above for exact specialization builds, talent choices, and rotations.*','','**Icy Veins — specialization guides:**','https://www.icy-veins.com/wow/class-guides','','**Wowhead — class guides:**','https://www.wowhead.com/guides/classes','','**Warcraft Wiki — class reference:**','https://warcraft.wiki.gg/wiki/Class','','*Always match the guide to your WoW version, specialization, and current patch.*'].join('\n')
      :isBeginner
      ? ['## 🔗 FURTHER BEGINNER READING','','*More detailed guides after the in-Discord beginner lessons:*','','**Warcraft Wiki — guides and game systems:**','https://warcraft.wiki.gg/wiki/Guides','','**Wowhead — World of Warcraft guides:**','https://www.wowhead.com/guides','','**Icy Veins — class and specialization guides:**','https://www.icy-veins.com/wow/class-guides','','*Choose guides that match the version of WoW you play.*'].join('\n')
      :isCollectibles
      ? ['## 🔗 FURTHER COLLECTIBLES READING','','*Detailed databases and guides for specific rewards:*','','**Mounts:**','https://www.wowhead.com/mounts','','**Battle pets:**','https://www.wowhead.com/battle-pets','','**Toys:**','https://www.wowhead.com/toys','','**Achievements:**','https://www.wowhead.com/achievements','','**Transmog appearances:**','https://www.wowhead.com/transmog','','*Check game version, prerequisites, and current availability before farming.*'].join('\n')
      :isWorld
      ? ['## 🔗 FURTHER WORLD READING','','*Use these for detailed maps, quests, and expansion-specific unlocks after reading the guides above.*','','**Zone maps, quests and NPCs:**','https://www.wowhead.com/zones','','**World of Warcraft news and official information:**','https://worldofwarcraft.blizzard.com/','','**Quest and zone database:**','https://www.wowhead.com/quests','','*Verify that guides match your WoW version and expansion.*'].join('\n')
      :['## 🔗 FURTHER GEAR READING','','*Use these only after the in-Discord guide above.*','','**Specialization builds, stat priorities and gear:**','https://www.icy-veins.com/wow/class-guides','','**Equipment and class guides:**','https://www.wowhead.com/guides/classes','','*Check that each guide matches your exact WoW version and patch.*'].join('\n');
     const navigation={
       'world-intel':[['Beginner guide','beginner-guides'],['Collectibles and exploration rewards','collectibles-intel'],['Ask for help','help-and-requests']],
       'collectibles-intel':[['World exploration','world-intel'],['Group farming','group-finder'],['Ask for help','help-and-requests']],
       'beginner-guides':[['Class and specialization information','class-intel'],['Equipment and stat information','gear-intel'],['World exploration','world-intel'],['Find a group','group-finder'],['Ask for help','help-and-requests']],
       'class-intel':[['Gear and stat priorities','gear-intel'],['Beginner lessons','beginner-guides'],['Find a group','group-finder'],['Ask for help','help-and-requests']],
       'gear-intel':[['Class and specialization information','class-intel']],
       'profession-intel':[['Gear and enhancements','gear-intel'],['Beginner guide','beginner-guides'],['Find a group','group-finder'],['Ask for help','help-and-requests']],
       'dungeon-intel':[['Class and role advice','class-intel'],['Gear and upgrades','gear-intel'],['Find a dungeon group','group-finder'],['Ask for help','help-and-requests']],
       'raid-intel':[['Raid signups','raid-signups'],['Guild events','guild-events'],['Gear preparation','gear-intel'],['Class roles','class-intel'],['Ask for help','help-and-requests']]
     };
     const directLinks=(navigation[name]||[]).map(([label,channel])=>label+': '+channelLink(guild,channel));
     const finalResources=resources+(directLinks.length?'\n\n**🔗 RED SUN RISING CHANNELS**\n'+directLinks.join('\n'):'');
     const old=recent.find(m=>m.author.id===guild.client.user.id&&m.content.startsWith(isRaid?'## 🔗 FURTHER RAID READING':isDungeon?'## 🔗 FURTHER DUNGEON READING':isProfession?'## 🔗 FURTHER PROFESSION READING':isClass?'## 🔗 FURTHER CLASS READING':isBeginner?'## 🔗 FURTHER BEGINNER READING':isCollectibles?'## 🔗 FURTHER COLLECTIBLES READING':isWorld?'## 🔗 FURTHER WORLD READING':'## 🔗 FURTHER GEAR READING'));
     if(old){if(old.content!==finalResources||old.embeds.length)await old.edit({content:finalResources,embeds:[],components:[],allowedMentions:{parse:[]}});}
     else await ch.send({content:finalResources,allowedMentions:{parse:[]}});
   }
  }catch(error){console.error('Intel guide update failed:',name,error);}
 }
}
