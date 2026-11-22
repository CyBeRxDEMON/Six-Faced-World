// Transcribed and lightly edited from the supplied Mushoku Tensei CYOA v1.1 sheets.
window.BOOK_ONE = {
  "rules": {
    "premise": "You will soon find yourself being reincarnated into the world of Mushoku Tensei. Known as the six-faced world, this realm is filled with magic, monsters, romance, and adventure. The world has entered an era of relative peace after the defeat of the Demon God Laplace over four-hundred years ago, though some believe it is only a matter of time before his resurrection. A Japanese shut-in by the name of Rudeus Greyrat has just been reborn into this world after dying in a traffic accident. In several years, he will be caught up in a massive teleportation calamity, drastically altering the fate of this world. You will soon be reborn into the six-sided world in much the same way, though your future is anyone's guess. By default you will be entering into this world in the year K407, the same year that Rudeus Greyrat is born to Paul and Zenith Greyrat. You may customize the specifics of your new life and abilities by spending points on the sections below.",
    "points": "Begin with 100 points. Spend them on ancestry, origin, innate gifts, and the talents you hope to develop.",
    "races": "Choose at least one ancestry. Pay the full price of every ancestry you combine in a hybrid. Its traits blend and each is less pronounced. Choose your own body, sex, and eventual appearance within that ancestry.",
    "origins": "Choose one origin. It determines how many boons and companion slots you receive. Spend boons on your birthplace, advantages, and additional languages.",
    "regions": "Choose one birthplace. Your homeland influences the people, threats, teachers, and opportunities you will encounter.",
    "advantages": "These advantages reach you at some point during childhood. Teacher, Gear, and Connections can each be bought more than once. A second purchase of Nobility makes you heir to a kingdom.",
    "languages": "You begin proficient in one language of your choice for free. Each additional language costs one boon.",
    "scenarios": "Combine any of these optional changes to the default circumstances of your reincarnation. Each scenario is free.",
    "mana": "Choose your upper limit for total mana capacity. Reaching that limit takes training. Your mana stops growing after ten years in this world, even if you fell short of your potential. You have the mana pool of an average person. Good enough for a few small spells or a swordfight before running out. You may need to find external sources of mana for anything major.",
    "magic": "Perhaps one in twenty individuals in this world are trained and capable enough to use magic. By reciting an incantation for a spell and visualizing the desired effect one can cause supernatural phenomena to occur like conjuring fireballs from nothing or healing injuries. Magic can also be cast through magic arrays made from specialized ink or materials. Once mana is input into a magic array, it will replicate a desired spell effect. Magic requires both mana and knowledge to use effectively, and not all casters are born equal.",
    "ranks": "Buy every earlier rank in the same track. For example, Saint costs 1 + 2 + 3 + 4 = 10 points in total. Each track is independent. Your magic ranks represent learning speed and mana control in the chosen field. Hard work and study, often for at least one or two decades, can carry you to your purchased rank and eventually beyond it. Your innate aptitude remains fixed. The sheet allows exceptional students to reach their selected ranks as teenagers.",
    "advancedMagic": "Buying an advanced style unlocks its basic mechanics. Your talent with a style is roughly on par with your talent in its applicable school. Specialties may be purchased repeatedly, each time raising that particular field by one rank. This edition also supports extended mastery above God.",
    "spirit": "About one in twenty people have the training and ability to use Fighting Spirit. Known as Touki, it is a technique warriors use unconsciously to circulate mana throughout the body. It raises physical ability, durability, stamina, resistances, and reaction speed to superhuman levels. It drains mana much more slowly than spells of similar rank. Higher levels still cost more mana, and most users can restrain their output to conserve it. You cannot turn mana into fighting spirit, no matter how hard you train. You can still purchase fighting styles below, but you may find yourself outclassed by proper warriors.",
    "martial": "Select your fighting spirit ceiling and one or more fighting styles. Reaching your purchased rank usually takes at least one or two decades of exercise and hard work. Your martial rank sets your learning speed and aptitude. Fighting spirit in particular is very difficult to raise beyond what you purchased. Practitioners typically have the advantage over mages in direct combat. You may combine styles to cover weaknesses and increase their effectiveness, or design your own style to reflect your ranks. Sword God contributes offense, Water God defense, and North God utility."
  },
  "races": [
    {
      "id": "human",
      "name": "Human",
      "cost": 0,
      "desc": "The most common and prosperous race found anywhere. Humans tend to inhabit the wealthiest and most civilized places in the world, and can overwhelm most threats through sheer numbers. Humans in this world come in a variety of shapes and sizes, but tend to be more attractive than normal. Non-human races may face discrimination."
    },
    {
      "id": "hobbit",
      "name": "Hobbit",
      "cost": 1,
      "desc": "A race of short humanoids located in the Great Forest in the country of Millis. Hobbits live to be up to a hundred and fifty years old, and gain a general boost to overall brain power. Additionally, Hobbits face less discrimination as compared to other races, as they can be harder to distinguish from short humans. They make for poor warriors."
    },
    {
      "id": "beast-race",
      "name": "Beast Race",
      "cost": 1,
      "desc": "A race of people with animal-like traits, including animal ears, tails, claws, and fur. Beast race members live an average of one hundred and fifty years. Members are able to speak with animals, and can use voice magic, a unique magic used to stun enemies with powerful sonic attacks. Members live in towns and forests all over the world."
    },
    {
      "id": "sea-race",
      "name": "Sea Race",
      "cost": 2,
      "desc": "A varied race of sentient humanoids with fish-like traits. The sea race is native to the oceans of the world, control all sea-based travel, and can live for up to two hundred years. Members of this race can speak to fish or animals, and can freely move or breathe underwater. The sea race also have an affinity for water-based elemental magic."
    },
    {
      "id": "migurd",
      "name": "Migurd",
      "cost": 2,
      "desc": "Natives of the Demon Continent. Migurds live to be over two hundred years old, and look like blue-haired children. They are capable of telepathy with each other, which can sometimes extend to other people or beasts. Migurd have a general affinity for magic, and learn and control magic slightly more easily."
    },
    {
      "id": "dwarf",
      "name": "Dwarf",
      "cost": 4,
      "desc": "A race of stout humanoids native to the Millis Continent. Dwarves can live for up to five hundred years, and have impressive physical power and durability, and a natural affinity for earth magic. Dwarven culture highly values smithing, and will often choose leaders based on their ability to craft weapons."
    },
    {
      "id": "elf",
      "name": "Elf",
      "cost": 5,
      "desc": "A race of slim, long-eared people native to the Great Forest in the Millis Continent. Elves can live for over seven hundred years and have a high level of dexterity, heightened perceptions, and an innate sense of direction. Elves tend to be quite reclusive and arrogant, and elven tribes put a great emphasis on magical knowledge."
    },
    {
      "id": "heavenly-race",
      "name": "Heavenly Race",
      "cost": 7,
      "desc": "A race of winged humanoids native to a continent bridging the Demon Continent and the Central Continent, which is only accessible through flight. The heavenly race can live for up to nine hundred years, has an affinity for elemental magic, and has the ability to fly using their wings. Few members of the heavenly race can be found outside their home."
    },
    {
      "id": "superd",
      "name": "Superd",
      "cost": 10,
      "desc": "A race of green-haired warriors able to live for up to a thousand years. Superd have a red gem in their foreheads which can be used to detect their surroundings, and grow a tail which will harden and fall off after adolescence to become a spear of unmatched quality. They are heavily feared and reviled due to a fading curse inflicted upon them."
    },
    {
      "id": "immortal-demon-tribe",
      "name": "Immortal Demon Tribe",
      "cost": 20,
      "desc": "A race capable of living forever and regenerating through all physical damage. You are not full-blooded, meaning you are not fully immortal. You can expect to live for millennia and can regenerate from absurd amounts of damage. You may appear either human-looking or demonic, but will likely look like a child for hundreds of years at a minimum."
    }
  ],
  "origins": [
    {
      "id": "poor",
      "name": "Poor",
      "cost": 0,
      "desc": "You are an orphan or a child from an ordinary, poor family.",
      "boons": 3,
      "slots": 1
    },
    {
      "id": "middle-class",
      "name": "Middle Class",
      "cost": 1,
      "desc": "You are from a well-off family, such as a family of laborers.",
      "boons": 6,
      "slots": 2
    },
    {
      "id": "comfortable",
      "name": "Comfortable",
      "cost": 2,
      "desc": "You are from a comfortably wealthy family, such as royal servants.",
      "boons": 9,
      "slots": 3
    },
    {
      "id": "wealthy",
      "name": "Wealthy",
      "cost": 3,
      "desc": "You are from a rich, privileged family, such as a wealthy merchant's family.",
      "boons": 12,
      "slots": 4
    }
  ],
  "regions": [
    {
      "id": "central-north",
      "name": "Central Continent, North",
      "cost": 2,
      "desc": "A lush, comfortable area and home to the Asura Kingdom, the wealthiest country in the world. Most monsters in the area are very weak or are managed by the Asuran royal knights, so enterprising adventurers will need to head north for proper jobs. Still, there are plenty of capable teachers in the area for both combat and magic. Also home to the Ranoa Royal Magic Academy, and the Holy Land of the Sword, some of the best places in the world to learn magic and swordplay."
    },
    {
      "id": "central-south",
      "name": "Central Continent, South",
      "cost": 1,
      "desc": "A section of land spanning a number of smaller kingdoms in the southern half of the Central Continent. This area includes the King Dragon Kingdom and the Shirone Kingdom. These are plentiful lands with plenty of work for adventurers, but are often the location of political strife between warring kingdoms."
    },
    {
      "id": "millis",
      "name": "Millis Continent",
      "cost": 1,
      "desc": "A large continent to the southeast. This area contains both the Holy Kingdom of Millis and the Great Forest. The Great Forest is home to elves, hobbits, and many Beast Race tribes while Millis is a primarily human country. Non-human races face discrimination in this area, and Blessed Ones are forced into service by the government. Monsters and political strife can make this area somewhat dangerous."
    },
    {
      "id": "begaritt",
      "name": "Begaritt Continent",
      "cost": 0,
      "desc": "A harsh desert country in the southwest. A lawless land filled with a large variety of warriors but very few mages. There are monsters all across the desert, but none of them are as strong as those on the Demon Continent. One of the best places in the world for adventuring work, owing to its many dungeons."
    },
    {
      "id": "demon",
      "name": "Demon Continent",
      "cost": 0,
      "desc": "The most dangerous country in the world. The Demon Continent is host to many powerful monsters and individuals, and has very little in the way of resources or food. Several long-lived experts in various fields live on this continent, which can be both a source of learning and a danger. There is plenty of work for high ranked adventurers in this region, but most of it is extremely dangerous."
    }
  ],
  "advantages": [
    {
      "id": "teacher",
      "name": "Teacher",
      "cost": 1,
      "desc": "Choose a teacher in any one of the sword styles or types of magic. Their instruction helps you learn that subject much faster than you could alone. You can buy this advantage more than once."
    },
    {
      "id": "gear",
      "name": "Gear",
      "cost": 1,
      "desc": "A piece of gear of significant quality, such as a staff, a top-tier weapon, an enchanted cloak, or magic armor. This option is repurchasable."
    },
    {
      "id": "connections",
      "name": "Connections",
      "cost": 1,
      "desc": "Each purchase lets you choose one extra companion."
    },
    {
      "id": "nobility",
      "name": "Nobility",
      "cost": 2,
      "desc": "You are a lesser noble, capable of climbing the ranks with some effort. If bought twice, you are a greater noble, the heir to an entire kingdom.",
      "max": 2
    }
  ],
  "languages": [
    {
      "id": "human-god",
      "name": "Human",
      "cost": 1,
      "desc": "The world's most common language, spoken by humans on the Central Continent and in Millis."
    },
    {
      "id": "beast-god",
      "name": "Beast God",
      "cost": 1,
      "desc": "Spoken in the Great Forest on the Millis Continent and by members of the Beast Race all over the world."
    },
    {
      "id": "demon-god",
      "name": "Demon God",
      "cost": 1,
      "desc": "The main language of the Demon Continent. Demon peoples speak it around the world."
    },
    {
      "id": "battle-god",
      "name": "Battle God",
      "cost": 1,
      "desc": "The primary language of the Begaritt Continent. Warriors across the world speak it."
    },
    {
      "id": "sea-god",
      "name": "Sea God",
      "cost": 1,
      "desc": "The sea race uses this language along coasts and throughout the ocean. It is especially useful for people who sail frequently."
    },
    {
      "id": "heaven-god",
      "name": "Heaven God",
      "cost": 1,
      "desc": "The language of the Heaven Continent. You will rarely hear it spoken elsewhere, though several magical texts and stories are written in it."
    },
    {
      "id": "dragon-god",
      "name": "Dragon God",
      "cost": 1,
      "desc": "Almost nobody speaks this language. Inscriptions in several hard-to-find ruins preserve secrets of history and esoteric magic."
    }
  ],
  "scenarios": [
    {
      "id": "alternate-era",
      "name": "Alternate Era",
      "cost": 0,
      "desc": "Choose the year you enter this world, from K330, when Orsted first became active, to K507, when Laplace is expected to revive.",
      "minYear": 330,
      "maxYear": 507
    },
    {
      "id": "quick-start",
      "name": "Quick Start",
      "cost": 0,
      "desc": "You will begin your adventure at an age of your choosing, with no family. You will still need to learn skills as normal, and cannot take 'Nobility'."
    },
    {
      "id": "safe-driving",
      "name": "Safe Driving",
      "cost": 0,
      "desc": "Rudeus Greyrat does not seem to exist here. By default, you are the only person in this world who came from Earth."
    },
    {
      "id": "multiplayer",
      "name": "Multiplayer",
      "cost": 0,
      "desc": "Other players of this CYOA enter the world alongside you. Gain one extra boon.",
      "boons": 1
    }
  ],
  "ranks": [
    {
      "id": "elementary",
      "name": "Elementary",
      "cost": 1,
      "desc": "The beginnings of a dedicated practice.",
      "mana": "A basic, average level of mana for a non-dedicated mage. Allows you to cast moderately large spells, but not for very long.",
      "spirit": "A thin layer of fighting spirit, used by lower level fighters the world over. Still, it's better than going without."
    },
    {
      "id": "intermediate",
      "name": "Intermediate",
      "cost": 2,
      "desc": "A sound practical grounding.",
      "mana": "A mana pool at the level of an average adventurer. You may risk running out of mana during long engagements.",
      "spirit": "A respectable amount of fighting spirit. Enough for a knight or similar job related to fighting. Reliant on effective technique."
    },
    {
      "id": "advanced",
      "name": "Advanced",
      "cost": 3,
      "desc": "A practiced adventurer's talent.",
      "mana": "A higher than average amount of mana. Enough for a veteran swordsman or an S-class adventurer mage.",
      "spirit": "Talent in using fighting spirit. Split boulders with wooden swords or slay monsters like any S-class adventurer."
    },
    {
      "id": "saint",
      "name": "Saint",
      "cost": 4,
      "desc": "An exceptional talent recognized by masters.",
      "mana": "An impressively large amount of magic power. Enough for a prodigy of magic or swordsmanship.",
      "spirit": "Exceptional talent. Move at super speed or fight with unreal dexterity and precision. Shrug off major blows like nothing."
    },
    {
      "id": "king",
      "name": "King",
      "cost": 5,
      "desc": "Mastery found in a select few.",
      "mana": "A massive mana supply. Enough to cast large area spells numerous times while also fighting as a high-level swordsman.",
      "spirit": "Fighting spirit on par with a talented veteran. Move faster than the eye can see or shatter the earth with your blows."
    },
    {
      "id": "emperor",
      "name": "Emperor",
      "cost": 6,
      "desc": "Power found in the pages of history.",
      "mana": "A massive mana supply. Enough to accomplish incredible feats of magic without risking running out of mana.",
      "spirit": "Fighting spirit on par with famous historical heroes. Crush trained champions or attack fortresses on your own."
    },
    {
      "id": "god",
      "name": "God",
      "cost": 7,
      "desc": "An aptitude of legendary proportions.",
      "mana": "An absolutely absurd, unheard of amount of magical power. On par with Rudeus Greyrat or the Demon God Laplace.",
      "spirit": "An absolutely absurd, unheard of ability to wield fighting spirit. Just scratching you would be an impressive feat."
    }
  ],
  "schools": [
    {
      "id": "elemental",
      "name": "Elemental Magic",
      "cost": 0,
      "desc": "Also known as Attack Magic, this magic is focused around creating and manipulating elements for combat or utility. Most commonly used with Fire, Water, Earth, and Air, but at higher levels can combine multiple elements together at once. This magic is a must for anyone looking to fight seriously as a mage, though without fast reaction times, the element of surprise, or a large enough mana pool, users may be overwhelmed in combat.",
      "kind": "magic",
      "ranks": [
        "Beginner's magic. Mainly used for utility and convenience. This magic can be used to create drinking water, clean areas, light fires, shape earth, or produce gusts of wind. Not especially effective in combat at this level.",
        "A basic level of magic. At this level you are able to cast basic attacks such as water balls, fire balls, stone cannons, and air blasts. These attacks can scale with your mana capacity. Most self-taught mages only ever reach this level.",
        "Area-of-effect magic. Allows users to blast a whole group of enemies, cause rain in an area, build structures from earth magic, create firestorms, or fly yourself around with air magic. Most educated mages only ever reach this level.",
        "Large area-of-effect magic. Allows a user to affect a large home, mansion or plain. With enough mana, can be used to change the weather, fire off huge explosions, or reshape terrain. The level of rare S-class mages and royal spellcasters.",
        "Massive area-of-effect magic. Spells in this category and beyond are typically fusions of different saint-rank spell effects. Call down flaming meteors, cover enemies with water before freezing it, or feed air into flames to cause massive explosions.",
        "Finely controlled magic on a massive scale, which allows the user to combine multiple saint or king class spell effects together at once. This magic is capable of demolishing armies or one-shotting anyone who isn't a total monster, if it hits.",
        "The absolute pinnacle of elemental magic. This magic can be spread across an entire continent, but requires enough mana to use that alternate sources of mana are almost always required. Also used for very pinpoint and efficient magic at every level."
      ]
    },
    {
      "id": "holy",
      "name": "Holy Magic",
      "cost": 0,
      "desc": "Typically called healing magic, this discipline is used by both priests and mages. Holy magic is split into four categories covering healing magic, barrier magic, detoxification magic, and divine attack magic. Healing magic is used to cure wounds, barrier magic is used to create defensive barriers, detoxification is used to remove poisons, diseases, and curses, and divine attack magic is combat magic designed for fighting demons and spirits, which is weaker against other targets.",
      "kind": "magic",
      "ranks": [
        "Beginner healing magic. Healing and detoxification magic on this level is mainly used for healing scratches or colds, and barrier magic or divine attacks are fairly simplistic or single-targeted. Not especially useful in high-stakes scenarios.",
        "A basic level of ability. Holy magic at this level can be used to heal injuries typical of combat, as well as major but mundane sicknesses and fevers. Barrier magic can be used to block attacks, and divine attacks can be used effectively to fight spirits.",
        "The level of skill of a dedicated priest. This level of holy magic can be used to heal larger injuries, detoxify weaker poisons, block similarly ranked physical and magical attacks, and divine attacks can now target non-spirit enemies at an elementary level.",
        "The level of skill of an average religious leader. Healing magic can heal bones and muscle. Detoxification can cure powerful poisons and venoms. Barriers can be wide area-of-effect. Divine attacks can affect normal enemies at an advanced level.",
        "An extremely rare level of healing magic. Healing magic can restore injured organs. Detoxification magic can be used to create poisons or medicines. Barrier magic can be extended to cover a city. Divine attacks will one-shot most spirits or devils.",
        "Highly powerful holy magic. At this level healing magic can regenerate missing limbs. Detoxification magic can remove most status effects. Barrier magic can block all but the strongest attacks, and divine attacks can fully kill immortal demons.",
        "The absolute pinnacle of holy magic. At this level literally anything short of death can be healed or detoxified. Barriers can block nearly any attack in the world, and divine attacks work as well as king class elemental magic against normal targets."
      ]
    },
    {
      "id": "arrays",
      "name": "Summoning & Magic Arrays",
      "cost": 0,
      "desc": "Summoning magic is a magic used to summon and control spirits and magical beasts or to teleport objects over long distances. Complicated enough to require magic arrays, which are a method of casting magic via diagram rather than invocations. This category also grants a bonus to magic array usage in general, allowing you to transfer any holy or elemental magic you know into spell circles at varying levels of efficiency. Magic arrays technically do not require any mana to design, only to use.",
      "kind": "magic",
      "ranks": [
        "The fundamentals of magic array usage. By taking this option you can apply any holy magic effects or elemental magic effects you know into magic arrays, though they will be less efficient than casting normally. Summon weak spirits for mana or labor.",
        "A solid grounding in use of magical arrays. Allows you to transfer any spells you know into magic array format without sacrificing quality. Allows for summoning basic familiars for scouting and combat, or teleporting objects small distances.",
        "Good knowledge of magic arrays. Allows users to create detailed arrays that increase the complexity of inscribed spells. Teleport large objects short distances, summon powerful spirits, or turn your arrays into long-lasting enchantments.",
        "Create exceptional magic arrays. Allows for enchanting of permanent magic items like prosthetic limbs, or enchanted swords and armor. Use teleportation magic to teleport people short distances, or objects over long distances.",
        "Highly advanced magic arrays. Enchant powerful magic items depending on what magics you know, like automated dolls or magical artillery. Summon spirits on the level of S-class adventurers. Teleport people over long distances.",
        "Magical arrays advanced enough that they can be tattooed onto people, granting unique effects that make use of their mana pool. Summon beings capable of fighting multiple S-class adventurers, or establish a teleportation network spanning the planet.",
        "Allows for absurdly condensed magical arrays which greatly multiply the effect of any magic. Apply arrays granting curses or blessings to targets' souls. Summon objects or beings from other worlds, or control a world-class team of powerful beings."
      ]
    },
    {
      "id": "sword",
      "name": "Sword God Style",
      "cost": 0,
      "desc": "The first of the three major sword styles and the one considered to be the strongest. Sword God style focuses heavily on offensive techniques and making the first strike, and will usually try to overwhelm enemies with speed and might. This style is dangerous for the practitioner, as it does not focus on defensive skills or self-preservation. It is especially good when used to overwhelm the techniques of North God style through force, but can be weak to counters from Water God style.",
      "kind": "martial",
      "ranks": [
        "The basics of offensive combat. With this option you know how to wield your weapon of choice and can use it effectively in combat. You know the basic forms of Sword God style and could get a job as a professional mercenary or soldier.",
        "A solid grounding in Sword God style. Your techniques are on the level of an average royal knight and you can expect to defeat most commonly found enemies. You are proficient in unarmed combat as well as a variety of different weapons.",
        "A level of skill equal to what an average person might achieve with a lifetime of effort. Equal to an S-class adventurer or the champion of a tribe. You can use extra fighting spirit for quick bursts of strength and speed above your normal limits.",
        "Enough skill to claim the title of a Sword Saint. You are skilled enough to overcome whole groups of dedicated warriors at once. You have amazing speed and balance which can allow you to move yourself through battlefields and terrain with ease.",
        "An exemplary level of skill. Users of Sword God style at this level are famous enough to meet with or work for royalty upon request. Your attacks can now produce shockwaves for clearing groups of enemies or knocking stronger foes off balance.",
        "A level of skill only achievable through intense dedication and talent. Perhaps fewer than ten people in the world are more skilled than you. You have an exceptional ability to overwhelm enemies with lower physical abilities than you, such as mages.",
        "Enough skill to compete with the Seven Great World Powers. You are skilled enough to compete on equal terms with an entire country. You can use several secret Sword God arts that can be used to cut through practically any defenses."
      ]
    },
    {
      "id": "water",
      "name": "Water God Style",
      "cost": 0,
      "desc": "Water God style focuses on defensive techniques and counterattacks. Typically users wait for their enemies to make the first blow. Water God style users can avoid injury and protect allies much more effectively in combat than any other style, though they may have trouble inflicting injuries themselves. Water God users are especially good at defending from Sword God attacks through counterattacks, but may have trouble defending against the unusual attacks used by North God style users.",
      "kind": "martial",
      "ranks": [
        "The basics of defensive combat. With this option you know how to wield your weapon of choice and can use it effectively in combat. You know the basic forms of Water God style and could get a job as a professional mercenary or guard.",
        "A solid grounding in Water God style. Your techniques are on the level of an average royal knight and can expect to defeat most monsters or people you meet. You are proficient in armored combat as well as a variety of different weapon styles.",
        "A level of skill equal to what an average person might achieve with a lifetime of effort. Equal to an S-class adventurer or the champion of a tribe. You are able to conserve your mana to a greater degree when using fighting spirit.",
        "Enough skill to claim the title of a Water Saint. You are skilled enough to overcome whole groups of dedicated warriors at once. Your defenses are refined enough to block or deflect most magical attacks sent at you without missing a step.",
        "An exemplary level of skill. Users of Water God style at this level are famous enough to meet with or work for royalty upon request. You are capable of suppressing a large area filled with multiple enemies at once by countering their every attack.",
        "A level of skill only achievable through intense dedication and talent. Perhaps fewer than ten people in the world are more skilled than you. You have an exceptional ability to mitigate the advantages of those stronger than you, such as magical beasts.",
        "Enough skill to compete with the Seven Great World Powers. You are skilled enough to compete on equal terms with an entire country. You can use several secret Water God arts that can be used to counter or defend against any attack you can react to."
      ]
    },
    {
      "id": "north",
      "name": "North God Style",
      "cost": 0,
      "desc": "A style that extends outside standard combat. North God style focuses on utility, sneak attacks, psychology, and escape as ways of achieving victory. Users often pick their battles carefully or make use of strange techniques like swordplay that shines light in an enemy's eyes, bluffing during combat, or coating weapons with poison. Users are quite effective at making it past the defenses of a Water God user, but can have trouble keeping up with the techniques of a Sword God style user.",
      "kind": "martial",
      "ranks": [
        "The basics of intelligent combat and ambush. With this option you know how to wield your weapon of choice and can use it effectively in combat. You know basic forms of North God style and could get a job as a professional mercenary or rogue.",
        "A solid grounding in North God style. Your techniques are on the level of a bandit chief. You can expect to beat any normal enemy with prep. You are capable of using both traps and ranged weapons, and can improvise weapons from the environment.",
        "A level of skill equal to what an average person might achieve with a lifetime of effort. Equal to a notorious criminal or an S-class adventurer. You have a finely tuned ability to sense those around you and their overall threat levels.",
        "Enough skill to claim the title of a North Saint. You are skilled enough to overcome whole groups of dedicated warriors at once. You can evade magical attacks in combat or lock down your enemies with bluffs, hostages, or stealth.",
        "An exemplary level of skill. Users of North God style at this level can be famous or feared among members of royalty. You are an expert in duels and assassination, and have exceptional talent in using abnormal equipment or strange gimmicks in combat.",
        "A level of skill only achievable through intense dedication and talent. Perhaps fewer than ten people in the world are more skilled than you. At this level you are a mastermind when it comes to tactics and decision making during conflict.",
        "Enough skill to compete with the Seven Great World Powers. Through bluffs and feints you can trick enemies into making idiotic decisions, and your presence and next moves are borderline undetectable. Your technique is honed to perfection."
      ]
    }
  ],
  "specialties": [
    {
      "id": "fire",
      "name": "Fire Specialty",
      "cost": 2,
      "desc": "You have a specialty with fire magic. Any fire magic you use will be a rank higher than the rest of your elemental magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "elemental"
    },
    {
      "id": "water-specialty",
      "name": "Water Specialty",
      "cost": 2,
      "desc": "You have a specialty with water magic. Any water magic you use will be a rank higher than the rest of your elemental magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "elemental"
    },
    {
      "id": "earth",
      "name": "Earth Specialty",
      "cost": 2,
      "desc": "You have a specialty with earth magic. Any earth magic you use will be a rank higher than the rest of your elemental magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "elemental"
    },
    {
      "id": "air",
      "name": "Air Specialty",
      "cost": 2,
      "desc": "You have a specialty with air magic. Any air magic you use will be a rank higher than the rest of your elemental magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "elemental"
    },
    {
      "id": "healing",
      "name": "Healing Specialty",
      "cost": 2,
      "desc": "You have a specialty with healing magic. Any healing magic you use will be a rank higher than the rest of your holy magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "holy"
    },
    {
      "id": "detox",
      "name": "Detox Specialty",
      "cost": 2,
      "desc": "You have a specialty with detoxification magic. Any detoxification magic you use will be a rank higher than the rest of your holy magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "holy"
    },
    {
      "id": "barrier",
      "name": "Barrier Specialty",
      "cost": 2,
      "desc": "You have a specialty with barrier magic. Any barrier magic you use will be a rank higher than the rest of your holy magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "holy"
    },
    {
      "id": "divine",
      "name": "Divine Specialty",
      "cost": 2,
      "desc": "You have a specialty with divine attack magic. Any divine attack magic you use will be a rank higher than the rest of your holy magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "holy"
    },
    {
      "id": "efficient-arrays",
      "name": "Efficient Arrays",
      "cost": 2,
      "desc": "You have a specialty in magic arrays using elemental or holy magic. Any of these magic arrays you use will be a rank higher than the rest of your array magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "arrays"
    },
    {
      "id": "teleporter",
      "name": "Teleporter",
      "cost": 2,
      "desc": "You have a specialty with teleportation magic. Any teleportation magic arrays you use will be a rank higher than the rest of your array magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "arrays"
    },
    {
      "id": "summoner",
      "name": "Summoner",
      "cost": 2,
      "desc": "You have a specialty with summoning magic. Any summoning magic you use will be a rank higher than the rest of your array magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "arrays"
    },
    {
      "id": "enchanter",
      "name": "Enchanter",
      "cost": 2,
      "desc": "You have a talent for applying your magic arrays to magic items or people. Enchanting magic you use will be a rank higher than the rest of your array magic. Each purchase adds one effective rank to this specialty, including ranks beyond God in this edition.",
      "school": "arrays"
    }
  ],
  "techniques": [
    {
      "id": "silent-elemental",
      "name": "Silent Casting · Elemental",
      "cost": 5,
      "desc": "Spells typically require chanted invocations to activate which can slow reaction times during a fight. While some experts can shorten invocations, you can forego them entirely, casting any elemental spells you learn quickly and silently. Casting spells in this way requires a moderate amount more concentration than normal.",
      "school": "elemental"
    },
    {
      "id": "lightning",
      "name": "Lightning Magic",
      "cost": 4,
      "desc": "An advanced application of elemental magic. Lightning magic is very powerful and useful against Fighting Spirit users, as it can paralyze them through their defenses regardless of how strong their resistances are. Difficult to aim and control, careless users can be shocked by their own attacks. Usable in magic arrays for mimicking certain effects of electronics.",
      "school": "elemental"
    },
    {
      "id": "gravity",
      "name": "Gravity Magic",
      "cost": 4,
      "desc": "A powerful style of elemental magic used to lift and throw objects or enemies. Can be used to enhance a user's mobility, render enemies floating and helpless, increase the weight of attacks, or to crush and throw pieces of the environment. An exceptionally strong magic when paired with martial capabilities.",
      "school": "elemental"
    },
    {
      "id": "silent-holy",
      "name": "Silent Casting · Holy",
      "cost": 5,
      "desc": "Spells typically require chanted invocations to activate which can slow reaction times during a fight. While some experts can shorten invocations, you can forego them entirely, casting any holy spells you learn quickly and silently. Casting spells in this way requires a moderate amount more concentration than usual.",
      "school": "holy"
    },
    {
      "id": "disturb",
      "name": "Disturb Magic",
      "cost": 4,
      "desc": "A magic designed to disrupt mana in an area to interfere with casting and other magical effects. Essentially an offensive use of barrier magic's ability to block magic. This magic has a short range and does not interfere with Fighting Spirit, but can be absolutely devastating when in combat with other mages or certain magical beasts.",
      "school": "holy"
    },
    {
      "id": "hypnosis",
      "name": "Hypnosis Magic",
      "cost": 4,
      "desc": "A type of tribal holy magic, hypnosis magic is used to affect a target's mental state. In its most basic form this magic can be used to harmlessly put enemies to sleep with a spell, but a clever user could induce visual hallucinations or other status effects. It is possible to combine this magic with the beast race's voice magic or the telepathy of the Migurd.",
      "school": "holy"
    },
    {
      "id": "resurrection",
      "name": "Resurrection Magic",
      "cost": 4,
      "desc": "A forgotten, taboo magic used by demons in ancient times. Resurrection magic is used to bind souls and animate corpses for use as servants. Follows the same principles as summoning magic, this can be extremely powerful when a user is able to collect the corpses of powerful monsters and people. Undead are weak to divine attack magic.",
      "school": "arrays"
    },
    {
      "id": "reincarnation",
      "name": "Reincarnation",
      "cost": 4,
      "desc": "An ancient magic used to send one's soul forward into a compatible body to reincarnate as a baby. Your new form will have an approximation of your appearance and abilities from this CYOA. Easier to cast for lesser races, with less time between resurrections. Activating this magic will kill you, though capable enchanters can ready it ahead of time.",
      "school": "arrays"
    },
    {
      "id": "time",
      "name": "Time Magic",
      "cost": 10,
      "desc": "The lost secrets of time magic, a branch of magic that can alter the flow of time via magic arrays. Complex enough to require arrays any time it is cast. Used to alter time in an area, send a target forward in time, or interfere with future sight. Attempting anything too ambitious or mana intensive with this magic could easily end up killing you.",
      "school": "arrays"
    }
  ]
};
