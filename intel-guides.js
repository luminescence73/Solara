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
  "WoW Forever features nine original classes with reworked talents. Select a class below for role and specialization guidance; follow its class link to explore current Forever-specific information. These links lead to class-topic pages and may not have a published dedicated guide yet."
 ],
 [
  "WARRIOR — Arms / Fury / Protection",
  "**Playstyle:** Melee fighter using rage, weapons and armor. Arms emphasizes deliberate weapon strikes; Fury focuses sustained aggression; Protection tanks with a shield.\n\n**Specializations:** Arms, Fury, Protection.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Warrior class reference](<https://www.wowhead.com/forever/guides/classes/warrior>)"
 ],
 [
  "PALADIN — Holy / Protection / Retribution",
  "**Playstyle:** Plate-wearing hybrid using mana and holy abilities. Holy heals; Protection tanks; Retribution deals melee damage. Manage blessings, auras and emergency support.\n\n**Specializations:** Holy, Protection, Retribution.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Paladin class reference](<https://www.wowhead.com/forever/guides/classes/paladin>)"
 ],
 [
  "HUNTER — Beast Mastery / Marksmanship / Survival",
  "**Playstyle:** Ranged physical damage with a pet. Manage pet control, ranged positioning, traps and ammunition or resources as applicable to Forever.\n\n**Specializations:** Beast Mastery, Marksmanship, Survival.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Hunter class reference](<https://www.wowhead.com/forever/guides/classes/hunter>)"
 ],
 [
  "ROGUE — Assassination / Combat / Subtlety",
  "**Playstyle:** Stealth melee damage built around energy and combo points. Use interrupts, crowd control, positioning and finishers.\n\n**Specializations:** Assassination, Combat, Subtlety.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Rogue class reference](<https://www.wowhead.com/forever/guides/classes/rogue>)"
 ],
 [
  "PRIEST — Discipline / Holy / Shadow",
  "**Playstyle:** Cloth caster supporting allies through healing and shields or dealing shadow damage. Manage mana, dispels and threat.\n\n**Specializations:** Discipline, Holy, Shadow.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Priest class reference](<https://www.wowhead.com/forever/guides/classes/priest>)"
 ],
 [
  "SHAMAN — Elemental Combat / Enhancement / Restoration",
  "**Playstyle:** Totem-based hybrid offering elemental damage, melee combat or healing. Plan totem placement and party utility.\n\n**Specializations:** Elemental Combat, Enhancement, Restoration.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Shaman class reference](<https://www.wowhead.com/forever/guides/classes/shaman>)"
 ],
 [
  "MAGE — Arcane / Fire / Frost",
  "**Playstyle:** Ranged spellcaster using mana, crowd control and powerful burst or sustained magic. Prepare food/water and use defensives to survive.\n\n**Specializations:** Arcane, Fire, Frost.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Mage class reference](<https://www.wowhead.com/forever/guides/classes/mage>)"
 ],
 [
  "WARLOCK — Affliction / Demonology / Destruction",
  "**Playstyle:** Damage-over-time and direct-damage caster with demons, curses and utility. Manage soul-related resources and pet abilities.\n\n**Specializations:** Affliction, Demonology, Destruction.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Warlock class reference](<https://www.wowhead.com/forever/guides/classes/warlock>)"
 ],
 [
  "DRUID — Balance / Feral Combat / Restoration",
  "**Playstyle:** Shape-shifting hybrid with ranged magic, melee forms, tanking and healing options. Choose talents and gear for your intended form.\n\n**Specializations:** Balance, Feral Combat, Restoration.\n\n**Before choosing gear or talents:** Confirm your role, available abilities, current level and Forever-specific changes. Avoid copying Retail/Midnight builds.\n\n[Druid class reference](<https://www.wowhead.com/forever/guides/classes/druid>)"
 ],
 [
  "🛡️ ROLES & TALENT PLANNING",
  "**Tanks:** Warrior, Paladin and Druid. **Healers:** Paladin, Priest, Shaman and Druid. **Damage:** All nine classes.\n\nDual Specialization becomes available at level 40. Practice defensives, interrupts, resource management and group utility. See #gear-intel for class-by-class equipment guidance."
 ]
],
 "profession-intel": [
 [
  "🛠️ PROFESSIONS IN FOREVER",
  "Learn up to two primary professions and all three secondary professions. Gathering: Mining, Herbalism and Skinning. Crafting: Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking and Tailoring. Secondary: Cooking, First Aid and Fishing. Individual links below are topic-specific references; verify Forever availability and recipes before spending materials."
 ],
 [
  "MINING — PROFESSION GUIDE",
  "Gather ore and stone from mineral veins; pairs well with Blacksmithing or Engineering.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Mining profession reference](<https://www.wowhead.com/forever/guides/professions/mining>)"
 ],
 [
  "HERBALISM — PROFESSION GUIDE",
  "Collect herbs for potions and elixirs; commonly paired with Alchemy.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Herbalism profession reference](<https://www.wowhead.com/forever/guides/professions/herbalism>)"
 ],
 [
  "SKINNING — PROFESSION GUIDE",
  "Harvest leather and hides from eligible beasts; commonly paired with Leatherworking.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Skinning profession reference](<https://www.wowhead.com/forever/guides/professions/skinning>)"
 ],
 [
  "ALCHEMY — PROFESSION GUIDE",
  "Turn herbs and reagents into potions, elixirs and other consumables; check recipes and cooldowns.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Alchemy profession reference](<https://www.wowhead.com/forever/guides/professions/alchemy>)"
 ],
 [
  "BLACKSMITHING — PROFESSION GUIDE",
  "Craft metal weapons, armor and other smithing goods from ores and bars.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Blacksmithing profession reference](<https://www.wowhead.com/forever/guides/professions/blacksmithing>)"
 ],
 [
  "ENCHANTING — PROFESSION GUIDE",
  "Disenchant eligible gear and apply equipment enhancements; check material cost before crafting.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Enchanting profession reference](<https://www.wowhead.com/forever/guides/professions/enchanting>)"
 ],
 [
  "ENGINEERING — PROFESSION GUIDE",
  "Craft devices, tools and gadgets from metal and other components; verify usage requirements.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Engineering profession reference](<https://www.wowhead.com/forever/guides/professions/engineering>)"
 ],
 [
  "LEATHERWORKING — PROFESSION GUIDE",
  "Craft leather and mail equipment using hides, leather and other materials.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Leatherworking profession reference](<https://www.wowhead.com/forever/guides/professions/leatherworking>)"
 ],
 [
  "TAILORING — PROFESSION GUIDE",
  "Craft cloth equipment and bags using dropped cloth and other reagents.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Tailoring profession reference](<https://www.wowhead.com/forever/guides/professions/tailoring>)"
 ],
 [
  "COOKING — PROFESSION GUIDE",
  "Prepare food and buffs from gathered or purchased ingredients.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Cooking profession reference](<https://www.wowhead.com/forever/guides/professions/cooking>)"
 ],
 [
  "FIRST AID — PROFESSION GUIDE",
  "Craft bandages for recovery using cloth; check Forever trainer and recipe rules.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[First Aid profession reference](<https://www.wowhead.com/forever/guides/professions/first-aid>)"
 ],
 [
  "FISHING — PROFESSION GUIDE",
  "Catch fish for Cooking, trade and occasional special rewards.\n\n**Progression:** Visit trainers, check new recipes and required materials, and compare vendor, quest and auction sources. Confirm the recipe exists in Forever.\n\n[Fishing profession reference](<https://www.wowhead.com/forever/guides/professions/fishing>)"
 ],
 [
  "🔄 PAIRINGS & MATERIALS",
  "**Mining + Blacksmithing/Engineering**, **Herbalism + Alchemy**, **Skinning + Leatherworking** are common pairings. Tailoring uses cloth; Enchanting can use materials obtained by disenchanting eligible gear. Two gathering professions can support gold-making."
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
  "Choose gear for your **class, specialization and role**, not Midnight item-level systems. Compare weapons, armor, stats, on-use effects and set bonuses. The class links below are targeted reference starting points; confirm each page actually covers Forever before following its recommendations."
 ],
 [
  "WARRIOR — GEAR & STATS",
  "**Specs:** Arms, Fury, Protection.\n\n**Gear decisions:** Compare melee weapon damage and survivability for Protection; DPS and tank sets serve different purposes.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Warrior class and equipment reference](<https://www.wowhead.com/forever/guides/classes/warrior>)"
 ],
 [
  "PALADIN — GEAR & STATS",
  "**Specs:** Holy, Protection, Retribution.\n\n**Gear decisions:** Separate Holy healing gear, Protection tank gear and Retribution melee gear.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Paladin class and equipment reference](<https://www.wowhead.com/forever/guides/classes/paladin>)"
 ],
 [
  "HUNTER — GEAR & STATS",
  "**Specs:** Beast Mastery, Marksmanship, Survival.\n\n**Gear decisions:** Prioritize suitable ranged weapons and relevant physical-damage stats; consider pet and survival utility.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Hunter class and equipment reference](<https://www.wowhead.com/forever/guides/classes/hunter>)"
 ],
 [
  "ROGUE — GEAR & STATS",
  "**Specs:** Assassination, Combat, Subtlety.\n\n**Gear decisions:** Evaluate weapon speed/type, melee damage and stats appropriate to the chosen build.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Rogue class and equipment reference](<https://www.wowhead.com/forever/guides/classes/rogue>)"
 ],
 [
  "PRIEST — GEAR & STATS",
  "**Specs:** Discipline, Holy, Shadow.\n\n**Gear decisions:** Separate healing/mana-sustain gear from Shadow damage gear.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Priest class and equipment reference](<https://www.wowhead.com/forever/guides/classes/priest>)"
 ],
 [
  "SHAMAN — GEAR & STATS",
  "**Specs:** Elemental Combat, Enhancement, Restoration.\n\n**Gear decisions:** Elemental, Enhancement and Restoration require different weapon, stat and spell-effect choices.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Shaman class and equipment reference](<https://www.wowhead.com/forever/guides/classes/shaman>)"
 ],
 [
  "MAGE — GEAR & STATS",
  "**Specs:** Arcane, Fire, Frost.\n\n**Gear decisions:** Compare spell effects, mana sustain and survivability for the chosen school/build.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Mage class and equipment reference](<https://www.wowhead.com/forever/guides/classes/mage>)"
 ],
 [
  "WARLOCK — GEAR & STATS",
  "**Specs:** Affliction, Demonology, Destruction.\n\n**Gear decisions:** Compare spell damage, mana management and survivability for your demon and spell build.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Warlock class and equipment reference](<https://www.wowhead.com/forever/guides/classes/warlock>)"
 ],
 [
  "DRUID — GEAR & STATS",
  "**Specs:** Balance, Feral Combat, Restoration.\n\n**Gear decisions:** Balance, Feral and Restoration use different gear; Feral tanking and damage may need separate equipment.\n\n**Check:** Item requirements, hit or spell effects where relevant, enchants, consumables and actual Forever balance.\n\n[Druid class and equipment reference](<https://www.wowhead.com/forever/guides/classes/druid>)"
 ],
 [
  "🧰 GEAR SOURCES & ENHANCEMENTS",
  "Dungeon rewards, raids when available, quests, professions, vendors and other Forever sources can provide upgrades. Compare crafted equipment and enchants in #profession-intel; find groups in #group-finder."
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
   "**Questie** — Quest markers, objective locations and tracking; Forever quest data may be incomplete.\n[Addon page](<https://www.curseforge.com/wow/addons/questie>)\n\n**RestedXP Guide** — Step-by-step leveling routes; some guide packs are paid.\n[Addon page](<https://www.curseforge.com/wow/addons/restedxp-guide>)\n\n**TomTom** — Map coordinates, waypoints and directional arrow.\n[Addon page](<https://www.curseforge.com/wow/addons/tomtom>)\n\n**HandyNotes** — Map pins for points of interest; modules vary.\n[Addon page](<https://www.curseforge.com/wow/addons/handynotes>)\n\n**Leatrix Maps** — Improves map display and navigation.\n[Addon page](<https://www.curseforge.com/wow/addons/leatrix-maps>)\n\n**Mapster** — Map customization; older Forever file, check errors.\n[Addon page](<https://www.curseforge.com/wow/addons/mapster>)\n\n**RareScanner** — Alerts for nearby rare creatures and collectibles.\n[Addon page](<https://www.curseforge.com/wow/addons/rarescanner>)\n\n**SilverDragon** — Tracks rare mobs and sightings.\n[Addon page](<https://www.curseforge.com/wow/addons/silver-dragon>)\n\n**GatherMate2** — Remembers herb and mining node locations.\n[Addon page](<https://www.curseforge.com/wow/addons/gathermate2>)"
  ],
  [
   "⚔️ DUNGEONS, COMBAT & PERFORMANCE",
   "**Deadly Boss Mods (DBM)** — Boss timers and alerts; Forever dungeon boss warnings are still incomplete.\n[Addon page](<https://www.curseforge.com/wow/addons/deadly-boss-mods>)\n\n**BigWigs** — Boss-alert framework; Forever boss modules not yet available (partial support).\n[Addon page](<https://www.curseforge.com/wow/addons/big-wigs>)\n\n**GTFO** — Audible warning when standing in harmful effects.\n[Addon page](<https://www.curseforge.com/wow/addons/gtfo>)\n\n**Details!** — Damage/healing meter with combat breakdowns.\n[Addon page](<https://www.curseforge.com/wow/addons/details>)\n\n**Skada** — Alternative damage and healing meter.\n[Addon page](<https://www.curseforge.com/wow/addons/skada-damage-meter>)\n\n**Threat Plates** — Nameplates that highlight threat and enemies.\n[Addon page](<https://www.curseforge.com/wow/addons/tidy-plates-threat-plates>)\n\n**Plater** — Highly customizable enemy nameplates.\n[Addon page](<https://www.curseforge.com/wow/addons/plater-nameplates>)\n\n**TellMeWhen** — Custom icons for cooldowns, buffs and debuffs.\n[Addon page](<https://www.curseforge.com/wow/addons/tellmewhen>)\n\n**Decursive** — Helps identify and remove dispellable harmful effects.\n[Addon page](<https://www.curseforge.com/wow/addons/decursive>)\n\n**Pawn** — Compares item stats using configured weights; presets may not fit Forever.\n[Addon page](<https://www.curseforge.com/wow/addons/pawn>)"
  ],
  [
   "🖥️ INTERFACE, ACTION BARS & CHAT",
   "**ElvUI** — Broad UI replacement with configurable frames and panels.\n[Addon page](<https://www.tukui.org/>)\n\n**Bartender4** — Move, resize and configure action bars.\n[Addon page](<https://www.curseforge.com/wow/addons/bartender4>)\n\n**Dominos** — Alternative action-bar layout; disables itself with gamepad UI enabled.\n[Addon page](<https://www.curseforge.com/wow/addons/dominos>)\n\n**Leatrix Plus** — Quality-of-life interface options; some Forever features restricted.\n[Addon page](<https://www.curseforge.com/wow/addons/leatrix-plus>)\n\n**Prat 3.0** — Chat window formatting and customization.\n[Addon page](<https://www.curseforge.com/wow/addons/prat-3-0>)\n\n**VuhDo** — Configurable healing/raid frames; some advanced features unavailable.\n[Addon page](<https://www.curseforge.com/wow/addons/vuhdo>)\n\n**Grid2** — Compact, configurable raid and party frames.\n[Addon page](<https://www.curseforge.com/wow/addons/grid2>)\n\n**Clique** — Mouseover and click-casting bindings.\n[Addon page](<https://www.curseforge.com/wow/addons/clique>)\n\n**Baganator** — Combined or categorized bags with search.\n[Addon page](<https://www.curseforge.com/wow/addons/baganator>)\n\n**Bagnon** — Combines inventory bags into one window.\n[Addon page](<https://www.curseforge.com/wow/addons/bagnon>)\n\n**SexyMap** — Minimap appearance and customization.\n[Addon page](<https://www.curseforge.com/wow/addons/sexymap>)\n\n**Titan Panel** — Information bars for gold, durability and more.\n[Addon page](<https://www.curseforge.com/wow/addons/titan-panel>)"
  ],
  [
   "💰 AUCTION HOUSE, PROFESSIONS & COLLECTIONS",
   "**Auctionator** — Auction House shopping, pricing and quick posting.\n[Addon page](<https://www.curseforge.com/wow/addons/auctionator>)\n\n**GatherMate2** — Tracks gathering-node locations for farming routes.\n[Addon page](<https://www.curseforge.com/wow/addons/gathermate2>)\n\n**Altoholic** — Tracks alts, inventories and account information.\n[Addon page](<https://www.curseforge.com/wow/addons/altoholic>)\n\n**ALL THE THINGS** — Collectible and completion tracking; verify Forever data.\n[Addon page](<https://www.curseforge.com/wow/addons/all-the-things>)\n\n**Scrap** — Helps sell junk items automatically.\n[Addon page](<https://www.curseforge.com/wow/addons/scrap>)\n\n**Syndicator** — Inventory and item information across characters.\n[Addon page](<https://www.curseforge.com/wow/addons/syndicator>)"
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
     // EDIT ONLY. Never send or delete messages in these channels.
     if(!owned.length){
       console.warn('Cannot update intel without existing Solara messages:',name);
       continue;
     }
     const MAX=1950;
     const chunks=[];
     // Preserve every section; split only at paragraph boundaries when needed.
     for(const original of desired){
       const paragraphs=original.split(/\n\n/);
       let chunk='';
       for(const paragraph of paragraphs){
         const candidate=chunk?chunk+'\n\n'+paragraph:paragraph;
         if(candidate.length<=MAX){chunk=candidate;continue;}
         if(chunk){chunks.push(chunk);chunk='';}
         if(paragraph.length<=MAX){chunk=paragraph;continue;}
         // Extremely long paragraphs are split on whitespace, never exceeding Discord's limit.
         let remaining=paragraph;
         while(remaining.length>MAX){
           let cut=remaining.lastIndexOf(' ',MAX);
           if(cut<MAX/2)cut=MAX;
           chunks.push(remaining.slice(0,cut));
           remaining=remaining.slice(cut).trimStart();
         }
         chunk=remaining;
       }
       if(chunk)chunks.push(chunk);
     }
     if(chunks.length>owned.length){
       console.error('Existing messages insufficient for full Forever intel update',name,
         'required',chunks.length,'available',owned.length);
       // Do not post more messages or silently discard any of the guide.
       continue;
     }
     for(let i=0;i<chunks.length;i++){
       const target=owned[i];
       if(target.content!==chunks[i]||target.embeds.length||target.components.length)
         await target.edit({content:chunks[i],embeds:[],components:[],allowedMentions:{parse:[]}});
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
  }catch(error){console.error('Intel guide update failed:',name,error);}
 }
}
