// Transcribed and lightly edited from the supplied Mushoku Tensei CYOA v1.1 sheets.
window.BOOK_TWO = {
  "rules": {
    "eyes": "Demon eyes are colorful, inborn magical eyes. Every eye requires mana, and you control when to use it. You may buy any number of eyes and use up to two at a time. Controlling a natural demon eye can be difficult. Some people wear eye patches to avoid distracting visions or wasted mana. Eyes you purchase here are easy for you to control. With luck, the Demon Empress Kishirika may grant another eye. Her gift might be unexpected or difficult to master.",
    "blessings": "Some people are born with unusual magical effects. A beneficial one is usually called a blessing, and a harmful one a curse. People who carry blessings are known as Blessed Ones, or Mikos. Once discovered, they can become political pawns or be taken from home and pressed into government service. You may take as many gifts as you can afford. Multiple blessings and curses may blend in minor ways.",
    "curses": "A curse is an inborn magical effect with a serious drawback. Each curse grants the points shown. A curse clings to the soul, even through reincarnation. Depending on its strength and your knowledge of magic, suppressing one could take decades or centuries. If you take no curses, add +25% to the strength of every field of fate, on top of your other choices.",
    "companions": "Your origin and Connections determine your companion slots. A named ally costs one slot. Depending on their age, home, and abilities, a companion might be a childhood friend, a mentor, or someone you first meet on the road. They are inclined to help you, share at least one of your languages, and can develop closer relationships over time. Companions have strong fates and can take care of themselves. Sharing a homeland makes it likely you will grow up together. You can learn from each other and exchange skills. Most companions are around your age, although long-lived allies may be much older. If you outlive a companion, a descendant can take their place, provided they have any.",
    "companionFate": "Each companion slot you leave unused grants +2% to a fate field of your choice.",
    "customCompanion": "Two slots create a companion with 50 character points. A third or fourth slot adds 25 points apiece. Your custom companion has a family, appearance and personality of your design, and cannot buy companions or take Multiplayer.",
    "fates": "Fate is the luck that follows your abilities, aspirations, and relationships. Strong fate can help you survive danger, influence another life, or encounter an opportunity. You start with average luck in every field. Fate can shift with your decisions. For example, a +100% Survival modifier makes you twice as likely to survive a dangerous encounter. Start with four boosts. Each purchased rank adds +50% to the chosen field. Successive ranks cost one boost, then two more, then three more, so three boosts buy +100% in one field. Each relevant point or boon spent elsewhere adds another +1%. Different fates may help or hinder one another in the same situation.",
    "weakFate": "Weaken a previously untouched fate field by 50% to gain one additional fate boost. A field can be weakened only once and cannot be both weakened and improved with bought ranks.",
    "childhood": "Regardless of your build, fate keeps you reasonably safe until at least age ten."
  },
  "eyes": [
    {
      "id": "magic-power-eye",
      "name": "Magic Power Eye",
      "cost": 2,
      "desc": "The most common type of demon eye. This eye will allow you to directly see mana. Useful for identifying magic traps, judging the remaining mana of a person, or identifying when a spell is being cast."
    },
    {
      "id": "x-ray-eye",
      "name": "X-Ray Eye",
      "cost": 2,
      "desc": "A magic eye which allows the user to look through solid objects. Useful for identifying hidden weapons, navigating labyrinths and secret passages, or for improving situational awareness in a fight. Can be blocked by dense mana."
    },
    {
      "id": "clairvoyance-eye",
      "name": "Clairvoyance Eye",
      "cost": 2,
      "desc": "An eye that allows the user to remotely view their surroundings with a range of several miles. Useful for spying, scouting, or aiming long-range abilities, but not much use in a close-up fight since the eye can be tricky to aim."
    },
    {
      "id": "identification-eye",
      "name": "Identification Eye",
      "cost": 2,
      "desc": "This eye lists the name and description of objects the user can see. Used for identifying resources, monsters, items, and materials. Can't identify everything, but will add more information as the user learns more."
    },
    {
      "id": "foresight-eye",
      "name": "Foresight Eye",
      "cost": 4,
      "desc": "An eye which can allow the user to see a few seconds into the future. Useful for improving reaction time during a fight or avoiding traps. This eye can be used with future sight for more detailed visions of the future."
    },
    {
      "id": "absolute-void-eye",
      "name": "Absolute Void Eye",
      "cost": 4,
      "desc": "A magic eye which allows users to cast complex barriers in a wide area around themselves, without need for magic arrays or spellcasting. Use of this eye is greatly improved based on the user's ability to cast advanced barrier magic."
    },
    {
      "id": "eye-of-affection",
      "name": "Eye of Affection",
      "cost": 4,
      "desc": "An eye which inspires feelings of love and affection in its targets. Repeated exposure can have long-lasting effects on a target. Useful for charming others, pacifying potential threats, or in keeping summoned beasts and spirits loyal."
    },
    {
      "id": "stasis-eye",
      "name": "Stasis Eye",
      "cost": 4,
      "desc": "By making eye contact with a target, the user of this eye renders them immobile. This ability needs sustained eye contact to use, and stronger targets will require more mana to immobilize. Can be used to leave enemies vulnerable to attack."
    },
    {
      "id": "absorption-eye",
      "name": "Absorption Eye",
      "cost": 8,
      "desc": "A powerful but dangerous demon eye which can be used to drain magic power. This eye will negate spells and disable enchanted items, but use of the eye will also drain magic power from the wielder. Devastating against mages."
    },
    {
      "id": "blinking-eye",
      "name": "Blinking Eye",
      "cost": 8,
      "desc": "This eye grants the user the ability to teleport themselves anywhere they can see without use of magic arrays. Longer distances cost more mana, and you can't teleport inside mana dense spaces or through objects."
    },
    {
      "id": "all-seeing-eye",
      "name": "All-seeing Eye",
      "cost": 8,
      "desc": "A version of the clairvoyance eye with less precision and global range. This eye can be used to instantly hone in on the location of anyone in the world. Costs a great deal of mana to use, and can be blocked by high concentrations of mana."
    },
    {
      "id": "curse-eye",
      "name": "Curse Eye",
      "cost": 8,
      "desc": "A magic eye which curses anyone in sight of the user. Cursed targets are seriously weakened and take damage over time. Devastating and unavoidable, but affects all possible targets in the user's field of vision without distinction."
    }
  ],
  "blessings": [
    {
      "id": "blurry",
      "name": "Blurry",
      "cost": 6,
      "desc": "Your mana is difficult for others to perceive. Demon eyes and certain magical effects like telepathy or future sight cannot be used to detect you. This can be both a blessing and a curse, as you will not be able to directly view your own future or voluntarily transmit information via these methods. Indirect methods can still see you."
    },
    {
      "id": "necrosis",
      "name": "Necrosis",
      "cost": 7,
      "desc": "Your mana has an edge to it. When using Fighting Spirit or offensive magic, damage you inflict will take more time to heal, and casting holy magic on wounds you cause will be more difficult and mana intensive. Useful versus both immortals and priests. As a side effect, enchanted items you use will break down over time from exposure to your mana."
    },
    {
      "id": "blessing-of-trust",
      "name": "Blessing of Trust",
      "cost": 8,
      "desc": "Members of your own race will like and trust you to an absurd degree. This favor is not all powerful, and strong ties or obvious facts can overcome its effects, but this will allow you to get away with a lot before that happens. This blessing affects all of your races if you are a hybrid, but doesn't affect people from Earth."
    },
    {
      "id": "lightwalker",
      "name": "Lightwalker",
      "cost": 9,
      "desc": "A power which allows you to teleport anywhere on the planet where light is shining brightly. This ability requires about an hour to activate, but you can cut months or years of travel down to nothing through its use. You can carry other people or loose objects with you when travelling. Your arrival in an area will be very noticeable."
    },
    {
      "id": "unaging",
      "name": "Unaging",
      "cost": 10,
      "desc": "Select an age of your choice. Your 'time' at this age will stop, and you will no longer grow older. This extends to some bodily functions like hair or nail growth, for which you will need to use healing magic to revert them if they are cut. This blessing means you could quite possibly live forever, assuming you avoid death via injury or disease."
    },
    {
      "id": "telepathy",
      "name": "Telepathy",
      "cost": 11,
      "desc": "You gain the ability to read the surface memories of anyone you make eye contact with. This power can be used to detect lies, learn secrets, or to identify what people are thinking in a given moment. It can also be used to predict an opponent's moves in a fight, but it can be difficult to make the eye contact required in order to do so."
    },
    {
      "id": "crystalized-mana",
      "name": "Crystalized Mana",
      "cost": 12,
      "desc": "Your body has an odd way of processing mana. When your mana pool is full, any excess processed mana will crystallize within your body, and will be coughed up in the form of magic stones. While a little gross, these stones are valuable and highly sought after, and can be sold, used to power magic arrays, or carried around as mana batteries."
    },
    {
      "id": "titan",
      "name": "Titan",
      "cost": 13,
      "desc": "You are able to increase your entire body's size until you are 100 meters tall. This increase in size comes with a corresponding strength increase, but spreading fighting spirit over your enlarged form will require an exponentially larger supply of mana. This transformation can be done part-way or reversed, but you must grow your entire body uniformly."
    },
    {
      "id": "time-skip",
      "name": "Time Skip",
      "cost": 14,
      "desc": "This power grants you the ability to stop the time of objects or people you touch for up to 24 hours at a time. Frozen objects will not age and cannot be altered in any way, though they can be moved around. This can be used to preserve an object, put a person into stasis, make a magic item unusable, or to make an object unbreakable."
    },
    {
      "id": "future-sight",
      "name": "Future Sight",
      "cost": 15,
      "desc": "An incredible power which allows you to read the lines of fate and the future. You can read the fates of those around you to determine their likely futures, weaknesses, and best options. Your accuracy grows better the closer you are to an event, but through practices like astronomy or divination you can try to look into important events ahead of time."
    }
  ],
  "curses": [
    {
      "id": "brute",
      "name": "Brute",
      "cost": 5,
      "desc": "You have trouble controlling the mana inside your body. If you have fighting spirit, you are unable to turn it off or turn it down, making fine control of your movement extremely difficult. This also applies to any magic which requires fine control, such as crafting fine details onto an earth construct or turning off a demon eye."
    },
    {
      "id": "mana-sensitive",
      "name": "Mana Sensitive",
      "cost": 6,
      "desc": "Mana is everywhere in the Six-Faced World, and most living beings will normally process it into their own mana pool or expel it as waste. You are no longer able to expel excess mana and will need to avoid mana dense foods and areas, or find some way to cleanse yourself of mana you can't process. Failure to do so will lead to sickness or mutations."
    },
    {
      "id": "agoraphobic",
      "name": "Agoraphobic",
      "cost": 7,
      "desc": "Something about the environment outside of your homeland is toxic to you. Leaving the continent you selected in the Origin section will cause your health to quickly decline to dangerous levels. Even imported foods or materials may cause fits of sneezing or an upset stomach. You'll need to stay in your homeland for the duration of your adventures."
    },
    {
      "id": "curse-of-promiscuity",
      "name": "Curse of Promiscuity",
      "cost": 8,
      "desc": "In adulthood, this curse ties your health to regular consensual intimacy with an adult partner. More than two weeks apart puts your life at risk, making isolation and long solo journeys dangerous."
    },
    {
      "id": "asthmagic",
      "name": "Asthmagic",
      "cost": 9,
      "desc": "Similar to the drain incurred by the legendary fighting god armor, use of your mana now drains your life force as well. Casting minor spells may lead to physical exhaustion, and making use of high level touki can leave you sickly and bedridden for days afterwards. God-rank spells will kill you on the spot unless you receive immediate healing."
    },
    {
      "id": "curse-of-hatred",
      "name": "Curse of Hatred",
      "cost": 10,
      "desc": "A brutally effective curse which will cause people of all races different from yours to hate and fear you, to the point strangers will try to kill you on sight if they feel they can get away with it. People of your own race(s) and anyone from Earth will not be affected. With this curse, you cannot take any companions of a race different from your own."
    },
    {
      "id": "magic-stone-syndrome",
      "name": "Magic Stone Syndrome",
      "cost": 15,
      "desc": "A rare condition which causes the victim to slowly crystallize into magic stone. If allowed to continue, this disease will kill you in a matter of several years, and it will hinder your mobility as it progresses. The effects can be reversed through God-rank detoxification magic or reset with reincarnation magic, but it will return as long as this curse exists."
    },
    {
      "id": "dreamlike",
      "name": "Dreamlike",
      "cost": 20,
      "desc": "The world around you appears strange and dreamlike. Making out precise details, such as the contents of what other people are saying or the details of your current location will be difficult for you. Without an indirect way of interpreting the world around you, like telepathy, a demon eye, or future sight, you will be unable to trust in your senses."
    },
    {
      "id": "mana-recovery",
      "name": "Mana Recovery",
      "cost": 25,
      "desc": "The speed of your mana recovery has been severely slowed. It will now take you 200 times as long to regain your full mana pool once it is spent. For reference, normally a mana pool would take 10 days to fully replenish after use. You will need to be very conservative with the small supply of mana you have available."
    },
    {
      "id": "split",
      "name": "Split",
      "cost": 30,
      "desc": "It seems your reincarnation was flawed. You have been left with only your memories, and the origin, curses and skills you purchased. All your inborn traits, blessings, mana capacity, and fighting spirit have gone to another, hostile version of yourself. You will need to hunt down and capture your other half to even begin trying to fix the curse."
    }
  ],
  "companions": [
    {
      "id": "hawk-eye-helen",
      "name": "‘Hawk Eye’ Helen",
      "cost": 1,
      "role": "Sword King",
      "race": "human",
      "desc": "A student of the Holy Land of the Sword located in the Northwest of the Central Continent. Helen was originally an orphan before being taken in by the Sword-God as a pupil. Helen is straightforward, possesses a strong sense of warrior's pride, and spends most of her time training. She can find herself overwhelmed when exposed to complicated situations or politics, and works best when serving under a capable leader. A talented Sword-King, Helen is a swift and brutal combatant. She possesses a demon eye of foresight, which she uses to enhance her ability to react to danger or identify openings during combat.",
      "hook": "Despite her strength, Helen does little more than train. She will gladly assist anyone who can provide her with new challenges or worthy enemies."
    },
    {
      "id": "enzo-yellowsnake",
      "name": "Enzo Yellowsnake",
      "cost": 1,
      "role": "Knight of Asura",
      "race": "human",
      "desc": "A human noble of the Asura Kingdom in the North Central Continent. Enzo is both well-connected and wealthy thanks to his family ties. The very picture of a chivalrous knight, Enzo is hard working, honest to a fault, and kind. He is someone who garners the support of those around him, and often unintentionally captures the hearts of those around him. He is well-versed in warfare and tactics, and is himself a saint-class warrior in both Water God and Sword God swordsmanship. He also has an affinity for animal taming, and is proficient in mounted combat and use of animals for scouting.",
      "hook": "A loyal knight of the Asura Kingdom, Enzo plans to spend his life as a knight or lesser noble in service to the kingdom or its allies."
    },
    {
      "id": "ruby-corvus",
      "name": "Ruby Corvus",
      "cost": 1,
      "role": "Winged spellcaster",
      "race": "heavenly-race",
      "desc": "The child of an exiled prince from the Heaven Continent, Ruby grew up living in the Northeastern Biheiril Kingdom on the Central Continent. Ruby is naive, cheery, and optimistic. She tends to be carefree, and does not have much motivation to grow stronger or develop her skills. Despite this, she has quite a bit of untapped potential. Ruby has a larger than average mana pool. While she is only advanced-rank in elemental spells, and intermediate in both holy and summoning magic, her large mana pool and long lifespan mean she has a great deal of potential for growth. She can also fly, allowing her to rain spells down on her targets.",
      "hook": "After a period of unrest, Ruby will be scouted out by the kingdom her father was exiled from, with the intention of using her as a political pawn."
    },
    {
      "id": "aurora-kingdragon",
      "name": "Aurora Kingdragon",
      "cost": 1,
      "role": "Royal diplomat",
      "race": "human",
      "desc": "The human granddaughter of the current lord of the King Dragon Kingdom, located in the southern Central Continent. Aurora is currently tenth in line for the throne, but is unlikely to take it barring a significant political upset. She is demure and soft-spoken, with a strong sense of responsibility towards her friends and subjects. Joining her retinue or offering her your support is a good way to earn her fierce loyalty in return. She lacks anything beyond a basic education in magic and combat, but instead makes up for it with her excellent ability to organize and manage others, as well as her outstanding head for diplomacy.",
      "hook": "On her own, Aurora will likely be married either to a capable individual or a political figure in order to expand the influence of the King Dragon Kingdom."
    },
    {
      "id": "leon-freed",
      "name": "Leon Freed",
      "cost": 1,
      "role": "Keeper of the grove",
      "race": "sea-race",
      "desc": "A rare example of a person from the sea race who has left the ocean, Leon guards a forest sanctuary inside the forest at the southwest of the Central Continent. Brash, sharp-tongued, and dutiful. Leon has a soft side that he will not admit to, and will often display affection or care that does not line up to his words. He has detailed knowledge of plants and animals. Leon is a magic spearman who uses a combination of both water magic and north god style at saint rank to impede and wear down his enemies during combat.",
      "hook": "Leon has dedicated himself to protecting his grove from those who would look to cut it down. He would owe a great debt of gratitude to anyone who could provide it with lasting safety."
    },
    {
      "id": "erin-cote",
      "name": "Erin Cote",
      "cost": 1,
      "role": "Wandering hedge knight",
      "race": "human",
      "desc": "The illegitimate child of a lesser country's king, Erin was raised in the Southern Central Continent as a squire before eventually running away from home to become a wandering hedge knight, pledging her services to whichever causes struck her fancy. She is upbeat and good-humored, with an easy-going attitude towards her friends. She enjoys drinking with strangers and unique adventures, and tends to avoid serious danger when possible. Erin is an expert in Water God style swordplay, and with the right amount of effort could reach the level of water-emperor. She has a good sense for danger, and can keep those around her safe from harm.",
      "hook": "Typically Erin will shy away from perilous or arduous conflict, and will be content to wander the world. She is, however, usually willing to lend friends a hand."
    },
    {
      "id": "audrey-birnkrant",
      "name": "Audrey Birnkrant",
      "cost": 1,
      "role": "Pilgrim healer",
      "race": "human",
      "desc": "A member of a minor noble family in the country of Millis. Audrey was raised among the priests and followers of the church, and has since left home on a pilgrimage to better educate herself and hone her already impressive skills. Audrey is kind and motherly, to the point of sometimes being coddling. She has little patience for troublemakers and politics, and can become quite flustered when things don't go her way. Audrey is extremely capable in holy magic, having quickly reached king-class in both healing and detoxification. She also knows divine attack, elemental, and barrier magics up to advanced rank.",
      "hook": "She longs to spread the church of Millis's teachings to distant places, with a long-term goal of opening and running her church outside Millis."
    },
    {
      "id": "norah-bouldia",
      "name": "Norah Bouldia",
      "cost": 1,
      "role": "Soul-seeing enchanter",
      "race": "hobbit",
      "desc": "A hobbit girl from the Great Forest of the Millis Continent. Norah has left the woods to become a travelling purveyor of enchanted goods and potions. Brainy, arrogant, and short-tempered, Norah is a constant source of chatter and strong opinions. She also has comically bad luck with romance, which has led to her developing a complex about it. Norah is a blessed one with the ability to see the souls of others. While not especially useful, this can allow her to identify reincarnated people or to study the blessings and curses of other people. She has used the insights from her studies to become a well regarded enchanter and creator of magic items.",
      "hook": "Norah hopes to one day attend Ranoa Magic Academy in the Northwest, to develop her skills in enchanting and join an upper-class mage guild."
    },
    {
      "id": "pascal-dedoldia",
      "name": "Pascal Dedoldia",
      "cost": 1,
      "role": "Cursed court butler",
      "race": "beast-race",
      "desc": "A highly experienced upper-class butler located on the Millis Continent. Pascal has left his tribe in the great forest to live in the Holy City of Millis. Pascal's curse usually keeps him silent. He maintains a refined, dutiful manner. He is willing to obey orders from his employer without question, which often involves acts of subterfuge or assassination. He is a king-rank user of North God style combat, though he tends to avoid direct combat in favor of assassination. When he speaks, his words will lull all those who hear him to sleep, including himself if he does not cover his own ears. He uses this ability to aid in infiltration and escape during jobs.",
      "hook": "Pascal is currently working for a cardinal of the Millis religious order, but is open to working for anyone who can outbid his current employer."
    },
    {
      "id": "brigitte-grovestone",
      "name": "Brigitte Grovestone",
      "cost": 1,
      "role": "Spirit summoner",
      "race": "elf",
      "desc": "An elven woman from the Great Forest on the Millis Continent. Brigitte has been tasked with hunting down and returning several members of her tribe who were captured as slaves. Introverted and insecure, Brigitte is prone to overthinking and overpreparing. She feels out of place outside of her home, and relishes the times she can return home and take breaks from work. Saint-rank in both elemental magic and summoning spirits, Brigitte will summon elementals to assist her in combat. These spirits must be pre-prepared, but can autonomously target enemies and assist in fights. She is also quite good at gathering information.",
      "hook": "Brigitte is currently hoping to complete her work and be done with the outside world, though since slavers are an ongoing threat it seems unlikely."
    },
    {
      "id": "rita-malik",
      "name": "Rita Malik",
      "cost": 1,
      "role": "Labyrinth guide",
      "race": "human",
      "desc": "A human woman and a famous adventurer from the Begaritt Continent. Rita has made a lifestyle of delving into labyrinths and hunting desert beasts. Worldly, tactful, and practical, Rita is a steady pair of hands and a stabilizing element for any group. She tends to favor down-to-earth solutions and mindsets, and finds eccentric characters exhausting. She is a talented adventurer and jack of all trades, with knowledge ranging from intermediate holy magic and elemental magic, to cooking, trading, orienteering, and saint-rank North God style. Rita is one of the best guides on the continent when it comes to monsters, ruins, and labyrinths.",
      "hook": "Rita plans to conquer dungeons and write stories of her adventures. Her long-term goal is to earn enough money so she can retire as a merchant."
    },
    {
      "id": "santino-the-protector",
      "name": "Santino the Protector",
      "cost": 1,
      "role": "Dwarven guardian",
      "race": "dwarf",
      "desc": "A dwarven adventurer, Santino's travels have taken him to the Begaritt Continent, where his protective and earth magic abilities are in high demand. Rough, fun, and irresponsible. Santino can typically be found gambling his money away or outdrinking those brave enough to challenge him. He puts little thought into his future, but always repays debts and favors. Santino is a saint ranked user of water god style and divine and barrier magic. He is also intermediate rank in healing, detoxification, and earth magic. In a party he takes on the role of a hybrid healer and vanguard, and has a very good success rate keeping his allies alive and healthy.",
      "hook": "Santino tends to cycle through accumulating and repaying debts to other people, and tends to take all sorts of jobs while travelling the world."
    },
    {
      "id": "oma-the-swiftblade",
      "name": "Oma the Swiftblade",
      "cost": 1,
      "role": "Beastfolk Sword Saint",
      "race": "beast-race",
      "desc": "A member of the beast race raised in a village on the Begaritt Continent. Oma was trained from a young age in a diverse environment. Her priorities are quite warped, and she values her missions, honor, and strength higher than friends, family, or the lives of herself and others. This can make her seem highly cold and brutish to those from outside the Begaritt Continent. Oma is a veteran of Sword God style, on the level of a sword saint. She has a great deal of potential, and with time may be able to reach the heights of a sword emperor. Still, she often has trouble avoiding attacks or recovering from serious wounds.",
      "hook": "On her own, Oma will likely live as a warrior in the Begaritt Continent until she grows old, dies, or retires to raise children for her village."
    },
    {
      "id": "kara-migurdia",
      "name": "Kara Migurdia",
      "cost": 1,
      "role": "Migurd beast herder",
      "race": "migurd",
      "desc": "A young girl from the Migurd tribe. Kara is from a family of beast herders, and now travels the Demon Continent in search of rare and powerful beasts to tame and sell. Being used to telepathic conversation, Kara is quiet and often difficult to read. In reality, she is extremely excitable when it comes to the world outside of her home, and spends a great deal of time obsessing over the arts, foods, and magics of foreign lands. Kara specializes in summoning magic, which she will use to bring forth powerful beasts and spirits when combat is required. She is not well versed in other types of magic, but has a solid amount of potential.",
      "hook": "Most of Kara's time is spent on the Demon Continent searching for magical beasts, but she will occasionally travel great distances to sell them elsewhere."
    },
    {
      "id": "marion-superdia",
      "name": "Marion Superdia",
      "cost": 1,
      "role": "Superd wanderer",
      "race": "superd",
      "desc": "A Superd girl wandering the Demon Continent, Marion has been hunting down and challenging the various Demon Lords of the land in a poorly conceived effort to restore the Superd's reputation. Marion is naive and easily flustered, but tries to stay optimistic and hard working. She is quite lonely due to the Superd's poor reputation, which keeps potential friends and allies at a distance. Marion is a very capable warrior, with decades of experience in fighting and excellent situational awareness owing to her 'third eye'. She is on-par with a king-class warrior, but is not formally trained in any specific fighting style.",
      "hook": "Without interference, Marion is likely to get in over her head when dealing with Demon Lords. She will need to be helped or dissuaded for her to survive."
    },
    {
      "id": "akotarakrab-raibaku",
      "name": "Akotarakrab Raibaku",
      "cost": 1,
      "role": "Immortal troublemaker",
      "race": "immortal-demon-tribe",
      "desc": "A member of the immortal demon tribe from the Demon Continent. Akota, as he is typically known, has been around for millennia and has been involved in all sorts of historical events. An unrepentant idiot, Akota does not seem to have realized the last human-demon war ended hundreds of years ago. He spends his time making a nuisance of himself in various regions, both picking fights with and building up promising enemies. He gives off the sense that he is mostly just screwing around. Akota's strength is difficult to gauge. He seems to be very familiar with most magics and fighting styles, but usually throws fights or lets his enemies escape him.",
      "hook": "Akota is simply killing time before Demon God Laplace reincarnates. He mainly does so by causing problems, or empowering others to do so."
    },
    {
      "id": "custom-companion",
      "name": "Custom Companion",
      "cost": 2,
      "role": "An ally of your design",
      "race": "custom",
      "minSlots": 2,
      "maxSlots": 4,
      "basePoints": 50,
      "pointsPerExtraSlot": 25,
      "desc": "Design your own companion, including a family that fits their circumstances, their personality, and their appearance. Spend two companion slots to give them 50 points for their own potential. A third slot increases their pool to 75 points, and a fourth increases it to 100. They cannot take Multiplayer or recruit companions of their own.",
      "hook": "Choose what brought you together and the one ambition your ally would pursue even if you had never met."
    }
  ],
  "fates": [
    {
      "id": "comfort",
      "name": "Comfort",
      "cost": 1,
      "desc": "The slice-of-life option. This area of fate will cause your daily life to be more enjoyable and flavorful. You may be more likely to meet interesting people, engage in fun hijinks, eat foods you enjoy, or live in a nice home. This option also protects you from threats that might seek to interfere with your daily life. Improved by the points/boons spent on your race, origin options, and companions."
    },
    {
      "id": "challenge",
      "name": "Challenge",
      "cost": 1,
      "desc": "For those interested in adventure. This area of fate determines the number of 'plot hooks' and inciting incidents you are likely to run into. You are more likely to meet interesting people, be present at world shaking events, or receive exciting opportunities to adventure. You can avoid involving yourself in these adventures, but they can be quite rewarding. This area of fate is improved by taking curses."
    },
    {
      "id": "romance",
      "name": "Romance",
      "cost": 1,
      "desc": "An area that governs a person's romantic success. A stronger fate in this area means you will have more luck attracting romantic partners and keeping them happy. Also improves the fates of any love interests or children you have, as well as your own, when working together with them. This area of fate is improved by taking inborn and hereditary abilities like demon eyes or blessings."
    },
    {
      "id": "influence",
      "name": "Influence",
      "cost": 1,
      "desc": "Those with strong fates are more able to influence the lives of others. Having a strong fate in this area will cancel out the benefits of other people's fates. If you want to kill someone, alter a person's outlook on life, or change someone's destiny, this option will assist you in doing so. This branch of fate is improved by offensive abilities like elemental magic or sword god style."
    },
    {
      "id": "survival",
      "name": "Survival",
      "cost": 1,
      "desc": "A strong fate in this area means it is difficult to kill you. You can expect allies to be more likely to arrive in the nick of time, enemies to be less likely to finish you off, and ambushes to be revealed before you walk into them. This doesn't improve your actual odds of winning fights or accomplishing goals, unfortunately. This branch of fate is improved by defensive abilities like holy magic or water god style."
    },
    {
      "id": "sense",
      "name": "Sense",
      "cost": 1,
      "desc": "This area of fate improves your likelihood of receiving valuable information. Enemies are more likely to monologue, you may come across important journals or rumors, and you will have an easier time finding out what your enemies are up to. Doesn't improve your actual odds of dealing with these things. This option is improved by utility abilities like summoning & array magic or north god style."
    },
    {
      "id": "martial-growth",
      "name": "Martial Growth",
      "cost": 1,
      "desc": "Some people are fated to become stronger over time. With this option you will be more likely to find opportunities to train yourself. Usually this means you will be more likely to discover unique techniques, meet teachers, or face worthy opponents. This only applies to martial pursuits or physical growth. Has no impact on your actual potential. This type of fate is improved by fighting spirit."
    },
    {
      "id": "magical-growth",
      "name": "Magical Growth",
      "cost": 1,
      "desc": "Some people are fated to become more magically powerful over time. With this option you will be more likely to find opportunities to educate yourself in all things magical. Typically this means you will be more likely to discover magical secrets, meet teachers, or collaborate on magical projects with other experts. Has no impact on your potential. This type of fate is improved by your mana pool."
    },
    {
      "id": "quest",
      "name": "Quest",
      "cost": 1,
      "desc": "You have a specific goal or task which you are fated to complete, like killing an enemy or becoming a world power. If taken with 'Weak Fate' you can select an ill-fated quest on the level of conquering a major dungeon or defeating a God-rank opponent. This option grants double the boosts and weaknesses from all sources, but once completed the bonus will disappear. Available with any fate bonus."
    }
  ]
};
