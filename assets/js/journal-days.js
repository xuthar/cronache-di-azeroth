'use strict';
window.CHRONICLE_JOURNAL_DAYS = (() => {
const plans=[
        {date:'2026-11-04',day:'Wednesday, 4 November',title:'The Gates Open',place:'Northshire Valley',level:'The first steps',summary:'The Forever journey began with the creation of Xuthar Morvayne on the Roleplay realm. His first paths led into Northshire and the crowded world beyond the abbey.',stops:[
          {time:'Late evening',title:'Azeroth awakens',description:'A new human priest enters the world. This is the first page of a journey that will grow into The Last Witness.'}
        ],photos:null},
        {date:'2026-11-05',day:'Thursday, 5 November',title:'From Northshire to Stormwind',place:'Northshire · Goldshire · Elwynn · Stormwind',level:'Levels 5–8',summary:'Kobolds, Defias, the first steps in Tailoring and Enchanting, quiet visits to the inn, and two painful defeats in Fargodeep Mine shaped Xuthar’s early travels.',stops:[
          {time:'11:36–12:18',title:'On the road to Goldshire',description:'The forest opens beyond Northshire. Xuthar approaches Goldshire and its busy inn.'},
          {time:'12:32–12:38',title:'The hearth at Lion’s Pride',description:'A pause among travellers. The slow journey matters as much as the quests.'},
          {time:'13:49–18:46',title:'Mercy and peril in Elwynn',description:'Class duties, lakeside encounters, learning and exploration.'},
          {time:'19:04–19:07',title:'Two falls in Fargodeep Mine',description:'A harsh lesson in caution and survival.'},
          {time:'19:24–20:24',title:'Stormwind and level eight',description:'A first important visit to the capital: new trades, markets and the canals.'},
          {time:'20:24–21:34',title:'The rain and the return to Goldshire',description:'Evening travel ends at a familiar inn, where Xuthar finds a bed.'}
        ]},
        {date:'2026-11-06',day:'Friday, 6 November',title:'Water, Books and a Tenth Level',place:'Elwynn Forest · Crystal Lake · Stormwind',level:'Levels 9–10',summary:'Fishing by Crystal Lake, encounters with murlocs, errands between the forest and the city, and the milestone of level ten.',stops:[
          {time:'15:05–15:27',title:'Crystal Lake',description:'Fishing and dangerous encounters by the water.'},
          {time:'15:36–16:31',title:'The river and the wooded track',description:'A winding errand near the river: a quieter route with uncertain dangers.'},
          {time:'18:41',title:'Ten quests, level nine',description:'A quest tracker preserves the many open roads still calling Xuthar.'},
          {time:'Evening',title:'The tenth threshold',description:'Xuthar reaches level ten; further concerns are addressed and the early quest archive grows.'}
        ]},
        {date:'2026-11-07',day:'Saturday, 7 November',title:'Friends, Hogger and the Western Road',place:'Elwynn Forest · Tower of Azora · Westfall',level:'Levels 11–13',summary:'Hogger falls to a group of five. Xuthar encounters new companions, completes professional errands, continues toward Westfall and takes time to explore the Tower of Azora.',stops:[
          {time:'Time not recorded',title:'The fall of Hogger',description:'A hard-fought group victory in Elwynn and an early lesson in fellowship.'},
          {time:'Time not recorded',title:'The Tower of Azora',description:'A quieter visit among books, magic and the mysteries of the old tower.'},
          {time:'Later that day',title:'Westfall and preparation',description:'Bags fill, supplies run low and Xuthar returns for repairs, a wand and professional errands before heading west again.'}
        ]},
        {date:'2026-11-08',day:'Sunday, 8 November',title:'The Golden Fields and the Gilded Rose',place:'Westfall · Goldshire · Stormwind',level:'Level 15',summary:'Difficult Westfall missions and fellow adventurers carry Xuthar to level fifteen. Later, an ale and a walk with Carro Steelcave bring the day to a gentle close.',stops:[
          {time:'Daytime',title:'The trials of Westfall',description:'Defias enemies, demanding quests and new allies transform a difficult day into real progress.'},
          {time:'Evening',title:'A familiar friend',description:'Xuthar meets Carro Steelcave in Goldshire; the two share a drink and walk through Stormwind.'},
          {time:'Late evening',title:'Rest at the Gilded Rose',description:'After a long day, Xuthar falls asleep in a Stormwind inn.'}
        ]},
        {date:'2026-11-09',day:'Monday, 9 November',title:'Rain Over Westfall',place:'Westfall · Sentinel Hill',level:'Level 15',summary:'A slow morning of fishing under rain gives way to demanding unfinished work. By evening, the weary priest chooses rest and lets tomorrow’s roads enter his dreams.',stops:[
          {time:'Morning',title:'Fishing beneath the rain',description:'Near Westfall’s water, Xuthar finds a moment of peace and a reason to travel slowly.'},
          {time:'Later',title:'The hills demand their due',description:'Further difficult quests and threats test his patience before nightfall.'},
          {time:'Evening',title:'Sentinel Hill — an exhausted vigil',description:'Xuthar rests and dreams of adventures yet to come.'}
        ]},
        {date:'2026-11-10',day:'Tuesday, 10 November',title:'The Road of Ashes — An Epic Friendship',place:'Redridge · Duskwood · Booty Bay · The Barrens · Stonetalon · Loch Modan · Thoradin’s Wall',level:'Level 15 → 17',summary:'Xuthar and Carro Steelcave complete the six-part trail of “...And That Note You Found”, travelling across two continents to find the Cozy Sleeping Bag. A great evening of exploration becomes the story of two friends.',stops:[
          {time:'Before 19:52',title:'The rendezvous at the crossroads',description:'Xuthar and Carro plan their meeting where Redridge gives way to Duskwood. The exact meeting time was not recorded.'},
          {time:'19:52–20:14',title:'The haunted roads and the southern harbour',description:'The earliest photographs trace the expedition through Duskwood, Darkshire and the southern route to the coast.'},
          {time:'20:15–20:39',title:'Across the sea and into the Barrens',description:'Kalimdor opens into wide red plains; the burned-note mystery points onward.'},
          {time:'20:42–21:06',title:'The heights of Stonetalon',description:'Ridges, narrow tracks and dangerous ledges demand patient steps and steady companionship.'},
          {time:'21:09–21:29',title:'The northern lands and the great dam',description:'The journey returns toward Loch Modan and the massive Stonewrought Dam.'},
          {time:'21:35–21:43',title:'Thoradin’s Wall — the final ascent',description:'At the old frontier, the final climb gives the quest chain its ending. Xuthar reaches level seventeen during this epic night.'}
        ],photos:'road-of-ashes-gallery/'},
        {date:'2026-11-11',day:'Wednesday, 11 November',title:'The Defias Brotherhood — Three on the Western Road',place:'Westfall · questing in the western fields',level:'Level 17',summary:'Back in Westfall, Xuthar fights alongside Irlav Manaspark, a level-20 mage, and Tooker Iskald, a level-19 warrior. The quest tracker marks The Defias Brotherhood and The People’s Militia as complete. Other mining and Defias assignments remain on his active list; he is still live and questing.',stops:[
          {time:'During the day · exact hour unrecorded',title:'The company of a mage and a warrior',description:'Irlav Manaspark (level 20 Mage) and Tooker Iskald (level 19 Warrior) join Xuthar for questing in Westfall. These two companions are identified in the Recent Allies record.'},
          {time:'Time not recorded',title:'The Defias Brotherhood — quest completed',description:'The quest tracker displays “Quest Complete!” for The Defias Brotherhood. This records the completed assignment seen today, not the completion of every chapter of the wider Defias chain.'},
          {time:'Time not recorded',title:'The People’s Militia — quest completed',description:'The quest tracker also shows “Quest Complete!” for The People’s Militia. The western road still holds unfinished work.'},
          {time:'Latest reported status',title:'Live · Questing at Westfall',description:'The State of the Mines, Recollecting Memories, Oh Brother… and Underground Assault remain visible as ongoing quests. Xuthar continues the journey at level seventeen.'}
        ]},
        {date:'2026-11-12',day:'Thursday, 12 November',title:'The Road to the Deadmines — Level 18',place:'Stormwind → Lakeshire → Westfall → Stormwind → Westfall → Moonbrook · Deadmines',level:'Level 18',summary:'An epic evening across Stormwind, Lakeshire and Westfall ends at level 18. After the Defias Messenger and a Horde guild sighting, Xuthar successfully escorts the Defias Traitor to Moonbrook and finds VanCleef’s hidden entrance. The Deadmines expedition is announced for 13 November; VanCleef has not been defeated.',stops:[
          {time:'Evening · exact travel time not recorded',title:'Leaving the golden fields',description:'Xuthar travels from Westfall toward Stormwind after the recent western adventures.'},
          {time:'20:21 · reported status (Italy)',title:'Live in Stormwind',description:'The priest is in the capital to complete quests and take care of commissions. Three Questie entries are now marked complete: Business in Auberdine, Detonation at a Distance and The Defias Brotherhood. Four Deadmines/Westfall assignments remain in progress.'},
          {time:'Questie screenshot · exact time not established',title:'Three completed tasks, four unfinished',description:'Business in Auberdine, Detonation at a Distance and The Defias Brotherhood show Quest Complete! Collecting Memories (0/4), Oh Brother... (0/1), Underground Assault (0/1) and A Dynamite Plan (0/10) are still active.'},
          {time:'Before 20:55 · exact departure time unknown',title:'Eastward to Redridge — a road of travellers',description:'From Stormwind, Xuthar travels toward Redridge to pursue the next Defias Brotherhood stage. Along the road he meets adventurers, wayfarers and bards.'},
          {time:'20:55',title:'Lakeshire — across the bridge',description:'The first photograph records the red banks, Lakeshire clock tower and stone bridge. Xuthar reaches Redridge Mountains.'},
          {time:'20:57',title:'The docks of Lakeshire',description:'Two photographs show the boardwalks and waterside buildings, with tradesfolk and the route back to the bridge. This stage of The Defias Brotherhood is reported completed.'},
          {time:'After 20:57 · exact arrival hour not recorded',title:'Back in Westfall',description:'After completing the Redridge mission stage, Xuthar returns successfully to Westfall. He cannot remain: another part of the Defias affair draws him toward Stormwind.'},
          {time:'21:07 · screenshot',title:'Stormwind — rain over the canal bridge',description:'Xuthar arrives in Stormwind in heavy rain, seen standing on a stone bridge over the dark canals.'},
          {time:'After 21:07 · exact hour unrecorded',title:'Mathias Shaw — the letter is delivered',description:'Xuthar meets Mathias Shaw and hands over the letter, as confirmed by the player. No quest ID or reward is inferred.'},
          {time:'After Mathias Shaw · precise hour not reported',title:'Mage Tower — Bewitchments and Glamours delivered',description:'Xuthar hands the recovered magical book to Garion Wendell in Stormwind. The player confirms completion; the reward and exact hour remain unreported.'},
          {time:'After the book delivery · journey in progress',title:'Westward again — A Mysterious Message',description:'With the letter and book delivered, Xuthar heads for Westfall to find a Defias Messenger travelling between Moonbrook, Gold Coast Quarry and Jangolode Mine. His objective is to obtain A Mysterious Message for Gryan Stoutmantle. Later that evening Xuthar finds the messenger and recovers the message (1/1). The return to Gryan Stoutmantle is not yet confirmed.'},
          {time:'Evening · exact hour not reported',title:'The courier intercepted — A Mysterious Message recovered',description:'Xuthar finds the Defias Messenger in Westfall and takes possession of A Mysterious Message (1/1). His next step is Gryan Stoutmantle at Sentinel Hill; hand-in is not confirmed.'},
          {time:'21:24–21:25 · three screenshots',title:'An entire Horde guild on the western fields',description:'While returning with A Mysterious Message to Sentinel Hill, Xuthar encounters a large group of Horde players moving together through Westfall. The crowd is documented in three photographs; no clash or guild identity is established.'},
          {time:'After 21:25 · exact hour of level-up not reported',title:'The eighteenth threshold',description:'Xuthar reaches level 18 during the Westfall campaign. The precise level-up moment is not recorded, but the milestone is player-confirmed.'},
          {time:'21:31 · Moonbrook screenshot',title:'The Defias Traitor reveals the hidden mines',description:'Xuthar completes the escort of the Defias Traitor and discovers the secret entrance to the Deadmines, where Edwin VanCleef hides. The screenshot shows the traitor beside the mining buildings. The dungeon itself has not yet been entered.'},
          {time:'Night · plans for Friday 13 November',title:'Tomorrow: The Deadmines — the first dungeon expedition',description:'A five-player dungeon expedition into the Deadmines is announced for Friday 13 November. The latest tracker shows 0/1 Head of VanCleef and six other open dungeon-related tasks. This is a plan, not a completed run.'},
          {time:'Roleplay interlude · fictional',title:'Unclaimed letters and the canal whisper',description:'In the novel Xuthar encounters a keeper of forgotten letters and contemplates the voices of the Shadow while walking between his errands.'}
        ],photos:'westfall-horde-gallery/'}
      ];
      plans.push(
        {date:'2026-11-13',day:'Friday, 13 November',title:'The Triumph Beneath Westfall',place:'The Deadmines · Sentinel Hill',level:'Level 19',summary:'Xuthar and Carro Steelcave conquer the Deadmines and return victorious. The shared descent becomes a lasting chapter of their friendship.',stops:[
          {time:'20:42–21:34 · expedition photographs',title:'From Moonbrook to VanCleef',description:'Through the tunnels, timber works, furnace and hidden ship, the companions reach VanCleef and return to Sentinel Hill. The complete expedition is preserved in the dungeon chronicle.'}
        ]},
        {date:'2026-11-14',day:'Saturday, 14 November · player update',title:'Two Roads, One Enduring Friendship',place:'Westfall → Redridge Mountains',level:'Level 19 · last confirmed',summary:'After the Deadmines victory, Xuthar and Carro part temporarily. His Westfall journey complete, Xuthar returns to Redridge for new adventures. This follows his earlier Lakeshire visit during the Defias pursuit.',stops:[
          {time:'After the Deadmines · exact hour unreported',title:'A temporary parting',description:'Xuthar and Carro follow their own paths for a time; their friendship continues beyond the shared victory.'},
          {time:'Next stage · reported 14 November',title:'Westfall complete — onward to Redridge',description:'Xuthar resumes his journey in Redridge Mountains and ventures into new adventures. The later completed assignments are recorded below.'}
        ]}
      );
      const latestDay=plans.find(day=>day.date==='2026-11-14');
      latestDay.level='Level 20 · player confirmed';
      latestDay.title='From Redridge Errands to the Twentieth Threshold';
      latestDay.place='Redridge Mountains · Stormwind';
      latestDay.summary+=' Later, Xuthar reaches level 20. The evening tracker records seven completed assignments, alongside unfinished work in Redridge and Gnomeregan-related preparations.';
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ Business in Auberdine", "description": "The Auberdine assignment is marked complete again in the tracker; it remains an earlier completion, not a second newly completed quest."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ Tinkmaster Overspark", "description": "Answer the referral to Tinkmaster Overspark in Ironforge’s Tinker Town. This completes the introduction, not the Gnomeregan dungeon."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ Messenger to Stormwind", "description": "Carry the Lakeshire appeal along the Stormwind messenger route. This visible assignment is complete; later stages of the reinforcement chain are separate quests."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ A Free Lunch", "description": "Bring the meal prepared in Lakeshire to Guard Parker, a small act of support for the guards watching the roads."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ Hilary’s Necklace", "description": "Recover Hilary’s lost necklace from Lake Everstill and return it to her in Lakeshire."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ The Lost Tools", "description": "Recover Foreman Oslow’s missing toolbox from the lake so work at Lakeshire can continue."});
      latestDay.stops.push({"time": "14 November · completed in evening tracker", "title": "✓ The Price of Shoes", "description": "Take Verner Osgood’s request to Smith Argus in Goldshire concerning the price of horseshoes. Return to Verner belongs to the next assignment."});
      latestDay.stops.push({time:'Later that evening · player-confirmed',title:'Level 20 · a new milestone',description:'Xuthar reaches level 20. His reunion with Carro brings the Stockade victory, the Seal of Wrynn, and their later Sewer Beast encounter. The precise level-up moment is not documented.'});
      latestDay.place='Redridge · Stormwind · Goldshire → Northshire';
      latestDay.summary+=' After the adventures, quieter errands take him to Goldshire and onward toward Northshire beneath pouring rain. Cooking supplies and a transmog visit in Stormwind are next on his list.';
      latestDay.stops.push({time:'Latest update · journey in progress',title:'Goldshire behind him, Northshire ahead',description:'Xuthar visits Goldshire while attending to errands and completing quest business. He is now travelling toward Northshire in pouring rain, with water drumming against his cloak and the familiar road darkened beneath his steps. No additional named quest completion is recorded in this update.'});
      latestDay.stops.push({time:'Planned next · not yet completed',title:'Stormwind · provisions and a new look',description:'After Northshire, Xuthar plans to buy ingredients for Cooking in Stormwind and visit the transmog elf. The shopping and visit are still ahead; no specific ingredients, NPC name or appearance changes have been reported.'});
      latestDay.place='Redridge · Stormwind · Elwynn · return to Redridge';
      latestDay.summary+=' The day ends back in Redridge: a few quest deliveries, soup and a beer at the inn, and sleep at last.';
      latestDay.stops.push({time:'End of the day · exact hour unreported',title:'Redridge · soup, ale and sleep',description:'Xuthar returns to Redridge and hands in some quests, whose individual names have not been supplied. At the inn he rests over a warm bowl of soup and a beer, until the long day finally carries him into sleep. OFFLINE · Level 20. Read the closing scene in The Last Witness, Chapter 99.'});
      plans.push({"date": "2026-11-15", "day": "Sunday, 15 November", "title": "The Road After Farewell", "place": "Lakeshire · Lake Everstill · Redridge Mountains", "level": "Level 21", "summary": "After a restless night filled with yesterday’s excitement and thoughts of Carro, Xuthar eats a quick breakfast, greets the other adventurers and resumes his Redridge adventures. A quiet fishing interlude opens the new day.", "stops": [{"time": "Morning · exact time unreported", "title": "Until the next fire, Carro", "description": "A restless awakening, the memory of a farewell and the hope of meeting his friend again. Breakfast and greetings at the inn come before the return to the road."}, {"time": "Morning · quest tracker", "title": "Redridge work resumes", "description": "Completed: Messenger to Westfall, Murloc Poachers and Selling Fish. Goulash: snouts 5/5, condor meat 0/5, spider meat 5/5. Bridge: iron pikes 3/5, iron rivets 1/5. Gnolls: brutes 0/10, mystics 3/8."}, {"time": "11:23 · photograph filename", "title": "A line cast into Lake Everstill", "description": "Fishing beneath the red hills. Open the original photograph below, or read Chapter 100 of The Last Witness."}]});
      const caveDay=plans.find(day=>day.date==='2026-11-15');
      caveDay.summary+=' Later, despite his dislike of caves, Xuthar completes an underground adventure with two new friends and returns to the open hillside.';
      caveDay.stops.push({time:'11:43–12:11 · original photograph filenames',title:'Beneath the red hills · two new friends',description:'Xuthar enters the cavern, crosses the mushroom-lined passages and completes the underground adventure with help from two new friends. A farewell at the entrance precedes his return to the hillside. Their names and the exact quest title have not been supplied. Read Chapters 101–105 in The Last Witness.'});
      caveDay.stops.push({time:'Latest tracker · partial view',title:'The Everstill Bridge completed',description:'The Everstill Bridge is complete. Dry Times now includes Sweet Rum 1/1; Underbelly Scales 1/6; A Baying of Gnolls: Brutes 3/10, Mystics 8/8. The gnoll quest remains unfinished.'});
      caveDay.stops.push({time:'After the cavern adventure · Lakeshire pause',title:'Patient hands · professions advanced',description:'Xuthar stops in Lakeshire to practise his crafts. Tailoring 91/150 (+14), Enchanting 106/150 (+16), Cooking 108/150 (+24), Fishing 75/150 (unchanged), First Aid 79/150 (+6), compared with the 13 November record. All five retain the Journeyman rank and 150 cap. Read Chapter 106 of The Last Witness.'});
      caveDay.title='The Companions of the Red Hills';
      caveDay.level='Level 21 → 22';
      caveDay.place='Lakeshire · Lake Everstill · the cavern · Alther’s Mill · Shadowhide camps';
      caveDay.summary='A restless awakening and a quiet cast at the lake lead into a day of unlikely friendships. Xuthar faces a cavern with two new companions, practises his crafts at Lakeshire, clears Alther’s Mill and joins Dusty Rune, Euphos Galewind and Lanai Skystar against the Shadowhides. By the afternoon he is level 22; the road ends, for now, at a bedroll beneath the branches.';
      caveDay.stops[2].time='11:23 · Lake Everstill';
      caveDay.stops.push({time:'16:03–16:17 · Alther’s Mill',title:'The mill that had fallen silent',description:'Foreman Oslow needs the lumber route made safe: twelve Greater Tarantulas and six egg clusters must be cleared. Xuthar fights between the white stumps and surveys the infested mill from a rise. Alther’s Mill is completed; the timber needed by Lakeshire has a chance to move again.'});
      caveDay.stops.push({time:'16:30 · the eastern road',title:'Where the broken fences led',description:'The road opens beneath the trees. Blackrock Menace stands at 5/10 axes; the blockade supplies remain uncollected. Redridge Goulash needs only one more portion of condor meat. These unfinished errands remain part of the journey.'});
      caveDay.stops.push({time:'16:59–17:03 · Shadowhide camps',title:'The people who chose to stay',description:'With Dusty Rune, hunter Euphos Galewind and druid Lanai Skystar, Xuthar advances through the gnoll camps. Solomon’s Law calls for ten pendants as proof against Morganth’s servants. The tenth is recovered by 17:03:43 in game chat; level 22 is visible at 17:03:56.'});
      caveDay.stops.push({time:'During the Shadowhide campaign',title:'The voice inside the spoils',description:'Theocritus’ Retrieval is complete in the tracker. A pendant links the gnolls to Morganth and carries a message from the mage of Tower Azora. The chronicle records completion under Xuthar’s usual convention; no separate journey to the tower is added.'});
      caveDay.stops.push({time:'17:08 · beside the campfire',title:'A word of thanks',description:'A simple thank-you closes the shared fighting. The company’s courage earns a place in Xuthar’s story, alongside the older friendship he carries with Carro.'});
      caveDay.stops.push({time:'17:23 · the countryside',title:'A bed beneath the branches',description:'Xuthar takes a quiet outdoor pause beside the broken fences. The bedroll photograph closes this afternoon’s account. His next road and the unfinished hunts for Bellygrub and Yowler remain ahead.'});
      caveDay.place+=' · Stonewatch';
      caveDay.summary+=' Later, a long assault on Stonewatch with Azdaha Silvernet, Honkisen Honkzilla and Nethir Rath ends in defeat. Gath’Ilzogg remains alive; another attempt is planned today.';
      caveDay.stops.push({time:'18:51 · Stonewatch entrance',title:'A new company at the gate',description:'Xuthar joins Azdaha Silvernet, Honkisen Honkzilla and Nethir Rath, with the bear Björn, in the advance on Stonewatch. Blackrock Menace is complete in the visible tracker.'});
      caveDay.stops.push({time:'18:55 · inside Stonewatch',title:'The house of narrow footsteps',description:'The company pushes through dark timbered rooms and narrow stairs during a prolonged attempt to reach and kill Gath’Ilzogg.'});
      caveDay.stops.push({time:'19:08–19:17 · hills and road below Stonewatch',title:'Defeated, with the page still open',description:'The heroes regroup outside. The player confirms that the long attempt ended in defeat; Gath’Ilzogg was not killed. Their effort and their companions are honoured in Chapters 115–118.'});
      caveDay.stops.push({time:'Next attempt · planned today',title:'We will return',description:'A renewed attempt against Gath’Ilzogg is planned for later today. WANTED: Gath’Ilzogg remains active at 0/1 Head of Gath’Ilzogg; no success is recorded in advance.'});
      caveDay.summary+=' After the Stonewatch setback, Xuthar earns a solo triumph: Bellygrub defeated and An Unwelcome Guest completed alone.';
      caveDay.stops.push({time:'Later · player report; exact time not supplied',title:'A solo triumph · An Unwelcome Guest',description:'Xuthar faces Bellygrub alone and completes An Unwelcome Guest without a group. This personal victory follows the Stonewatch setback; Gath’Ilzogg remains undefeated. Read Chapter 119 · The Strength to Stand Alone.'});
      caveDay.place+=' · Elwynn Forest · Stormwind';
      caveDay.summary+=' The evening brings him back through Elwynn to Stormwind for quest business, a bank visit and errands.';
      caveDay.stops.push({time:'Evening · exact time not reported',title:'Elwynn Forest → Stormwind',description:'After the Redridge adventures, Xuthar returns through Elwynn Forest and continues into Stormwind. He completes some mission business, visits the bank and attends to evening errands. A Watchful Eye is marked complete in the latest tracker; specific bank transactions and purchases are not reported.'});
      caveDay.summary+=' With the errands finished, he walks the rain-soaked canals and harbour, then settles into a tavern to drink quietly, rest and reflect.';
      caveDay.stops.push({time:'21:32–21:34 · canals and harbour',title:'The city beyond the rain',description:'With his evening commissions finished, Xuthar walks through cold rain along the canal, looks down over Stormwind harbour, then pauses among the ships and wet piers.'});
      caveDay.stops.push({time:'21:41 · sheltered at a tavern table',title:'A cup with nothing left to prove',description:'Tired, Xuthar finds shelter from the rain and cold. A quiet drink, a place to rest and time to think close the day. He is resting in-game; no logout or sleep is reported. Read Chapters 121–122.'});
      plans.push({"date":"2026-11-16","day":"Monday, 16 November","title":"A Day Without Urgency","place":"A quiet day of rest · last recorded location: Stormwind","level":"Level 22","summary":"Xuthar lets the day unfold slowly and chooses rest after the stress and work of recent days. The journey pauses while he recovers his strength.","stops":[{"time":"During the day","title":"The witness at rest","description":"No expedition today: a deliberate pause, quiet reflection and time to recover. Read The Last Witness, Chapter 123."}]});
const today=plans.find(day=>day.date==='2026-11-16');
today.title='Rest, Then the Road Again';
today.level='Level 22 → 23';
today.place='A quiet pause, then a completed assignment · current location not reported';
today.summary+=' Later, he resumes his adventures, completes Harvesting the Harvesters and reaches level 23.';
today.stops[0].description='Xuthar dedicates the earlier part of the day to rest after the strain of recent days. Read Chapter 123.';
today.stops.push({time:'Later · exact time unreported',title:'Harvesting the Harvesters · Level 23',description:'Harvesting the Harvesters is completed. Xuthar reaches level 23. Read Chapter 124 in The Last Witness.'});
const evening=plans.find(day=>day.date==='2026-11-16');
evening.summary+=' The evening quest record marks Dry Times, A Watchful Eye and The Corruption Abroad complete; Redridge Goulash still needs one Tough Condor Meat.';
evening.stops.push({time:'Evening · exact time unreported',title:'One ingredient short',description:'Dry Times, A Watchful Eye and The Corruption Abroad are complete. Redridge Goulash: snouts 5/5, condor meat 4/5, spider meat 5/5. Blackrock assignments and the hunts for Yowler, Gar’im and Gath’Ilzogg remain open. Retrieval for Mauren: scales 0/8. Stockade assignments: Targorr 0/1; prisoners 0/10, convicts 0/8, insurgents 0/8; bandanas 0/10. Read Chapter 125.'});
const closing=plans.find(day=>day.date==='2026-11-16');
closing.title='Rest, the Road, and the Last Mug';
closing.summary+=' At the end of the day, one mug of beer is enough: exhausted, Xuthar falls asleep.';
closing.stops.push({time:'End of the day · exact time unreported',title:'The last mug, then dreams',description:'Xuthar has done all he can today. After a mug of beer, he falls asleep. Day closed at level 23; sleeping location not reported. Read Chapter 126.'});
plans.push({"date":"2026-11-17","day":"Tuesday, 17 November","title":"The Road Remembers Two","place":"Redridge Mountains · with Carro Steelcave","level":"Level 23","summary":"Xuthar and Carro Steelcave reunite and return to adventure together in Redridge, determined to face the most difficult unfinished quests. Stonewatch and the remaining threats await; the reunion opens Chapters 127–129 of The Last Witness.","stops":[{"time":"The reunion · time not recorded","title":"Together on the road again","description":"After Xuthar’s day of rest, Carro Steelcave returns to his side. Their temporary parting ends, and the two companions resume their shared adventure."},{"time":"The unfinished work","title":"Redridge’s hardest promises","description":"Yowler, Incinerator Gar’im and Gath’Ilzogg remain outstanding objectives in the latest quest record. Xuthar and Carro return to face the danger together; no new victory or quest completion has yet been reported."},{"time":"The next pages","title":"The Road Remembers Two","description":"Read the fictionalized reunion on Xuthar’s page and in The Last Witness, Chapters 127–129. The next battles are still ahead."}]});
const triumphDay=plans.find(day=>day.date==='2026-11-17');
Object.assign(triumphDay,{"title":"The Night Redridge Answered","place":"Redridge Mountains · Lakeshire · Render’s Valley · Stonewatch · Tower of Ilgalar · Keeshan’s escape","level":"Level 23","summary":"Xuthar and Carro’s reunion becomes an epic triumph: nine Redridge quests complete, Gar’im, Gath’Ilzogg and Morganth defeated, fifteen Blackrock Champions overcome, and Corporal Keeshan escorted out of captivity. Nineteen original Full HD photographs preserve the evening. Chapters 130–139 continue The Last Witness; twelve completed lines in the visible tracker include earlier obligations.","reportUrl":"redridge-triumph-2026-11-17/","stops":[{"time":"Reunion · before the photographs","title":"The road remembers two","description":"Xuthar and Carro Steelcave reunite in Redridge. The preparations remain in Chapters 127–129; the completed expedition continues in Chapters 130–139."},{"time":"20:35:52 · photograph","title":"The Lakeshire cooking fire","description":"Xuthar, Carro and Broken Tooth pause by the table and kettle. Redridge Goulash is now complete: five snouts, five condor meat and five spider meat."},{"time":"20:40:49–20:45:15 · photographs","title":"Gar’im and the camps below Stonewatch","description":"Incinerator Gar’im and his Shadowcasters are seen at the cave. The final tracker confirms his wanted objective complete, along with Blackrock Blockade: eight stolen weapons and ten supplies."},{"time":"20:47:58 · photograph","title":"Stonewatch: the old defeat answered","description":"The companions return to the keep’s ruined walls. WANTED: Gath’Ilzogg is complete in the supplied tracker, resolving the failed attempt of 15 November. No exact killing blow or hand-in time is claimed."},{"time":"20:56:56–20:58:39 · photographs","title":"The lion statue and the Tower of Ilgalar","description":"The company visits the Old Lion Statue, then faces Morganth and his followers within the tower. Morganth is complete; the Pendant of Shadow answers Theocritus’ inquiry. No recovery of the Scythe of Elune is claimed."},{"time":"21:02:59–21:05:32 · photographs","title":"Blackrock Champions and the cave","description":"The northern camp and cavern approach lead into the next stage. Blackrock Bounty is complete: fifteen Champions defeated. Xuthar and Carro enter the blue-green passages together."},{"time":"21:10:32–21:10:42 · photographs","title":"Corporal Keeshan found","description":"Badly wounded, Keeshan asks Xuthar’s forgiveness for his slow pace. Carro and Broken Tooth stand nearby as the rescue begins."},{"time":"21:11:40–21:17:00 · photographs","title":"No one left in the dark","description":"The photographs follow Keeshan beside the cavern pool, beyond the entrance and along the enemy-held road. Missing In Action is complete in the supplied tracker."},{"time":"21:20:55 · photograph","title":"The later hillside road","description":"The companions continue through Redridge wildlife. Howling in the Hills is also complete: Yowler’s Paw obtained. The wolves in this photograph are not identified as Yowler."},{"time":"21:23:51–21:24:01 · photographs","title":"Honour to the heroes above Lakeshire","description":"Xuthar, Carro and Broken Tooth stand together overlooking the red-roofed settlement. Nine Redridge assignments now appear complete, including Messenger to Darkshire. Level 23 remains the latest confirmed level."},{"time":"Supplied Questie report · exact hand-in times not recorded","title":"Twelve complete lines, two visible tasks still open","description":"Fourteen of seventeen tracked quests are readable. Twelve are complete, including older Business in Auberdine and The Corruption Abroad entries and the Tinkmaster Overspark introduction. Gyrodrillmatic Excavationators remains 0/24; Retrieval for Mauren remains 0/8. Other off-crop tasks are not closed by inference."}]});
plans.push({
  "date": "2026-11-18",
  "day": "Wednesday, 18 November",
  "title": "When the Iron Fell Silent",
  "place": "Stormwind · The Stockade · with Carro Steelcave",
  "level": "Level 24",
  "summary": "Xuthar Morvayne and Carro Steelcave bring their last expedition into the Stockade to a triumphant close. Targorr falls, the Defias uprising is quelled, and all ten red wool bandanas are accounted for. Xuthar confirms he has reached level 24.",
  "reportUrl": "dungeons/stockades.html#stockades-finale-2026-11-18",
  "bookUrl": "book.html?character=xuthar#x-nov18-targorr-last-stand",
  "stops": [
    {
      "time": "Return · exact time unrecorded",
      "title": "Back beneath Stormwind",
      "description": "Xuthar and Carro return together to the prison where they previously defeated Bazil Thredd."
    },
    {
      "time": "Inside the Stockade",
      "title": "What Comes Around…",
      "description": "Targorr is defeated and his head is accounted for."
    },
    {
      "time": "Inside the Stockade",
      "title": "Quell the Uprising",
      "description": "The Defias uprising is quelled. Objectives complete: 10 prisoners, 8 convicts and 8 insurgents."
    },
    {
      "time": "Expedition finale",
      "title": "The Color of Blood",
      "description": "All 10 Red Wool Bandanas collected. The three Stockade quests read Quest Complete! in the 18 November Questie tracker, and Xuthar confirms the run is finished."
    }
  ]
});
const hearthDay=plans.find(day=>day.date==='2026-11-18');
if(hearthDay){
  hearthDay.title='When the Iron Fell Silent · The Hearth in Lakeshire';
  hearthDay.place='Stormwind · The Stockade → Lakeshire Inn · Redridge Mountains';
  hearthDay.summary+=' Later that evening, the level-24 priest reaches the inn at Lakeshire and rests beside the fireplace, warming his weary bones before the adventures of the coming days. No further quest completion is claimed.';
  hearthDay.bookUrl='book.html?character=xuthar#x-nov18-lakeshire-hearth';
  hearthDay.stops.push({time:'Later that evening · precise hour unreported',title:'The Hearth at the End of the Day · Lakeshire Inn',description:'After his final Stockade triumph with Carro, Xuthar stops at the Lakeshire inn. Beside the fireplace, he rests his aching bones and gathers his strength for the adventures awaiting him in the days ahead. Level 24; resting location reported by Xuthar, no coordinates or log-off time reported. Read The Last Witness, Chapters 146–147.'});
}
plans.push({
  "date": "2026-11-19",
  "day": "Thursday, 19 November",
  "title": "A Day Without Swords · The Books and the Blade",
  "place": "Lakeshire Inn · Redridge Mountains (resting all day)",
  "level": "Level 24 · unchanged",
  "summary": "A full day of rest at Lakeshire. Long-standing aches and exhaustion keep Xuthar from adventure. He reads five in-game histories of Azeroth and reflects on the cost of power, the meaning of quiet, and his friend Carro Steelcave, who is spending these days in Maraudon searching for the rare epic Blade of Eternal Darkness. No new battles, travel, quests, loot, or level-up are claimed for Xuthar; Carro’s dagger is not confirmed acquired.",
  "reportUrl": "book.html?character=xuthar#x-nov19-old-wounds",
  "bookUrl": "book.html?character=xuthar#x-nov19-old-wounds",
  "stops": [
    {
      "time": "Morning · no exact time recorded",
      "title": "The old wounds speak",
      "description": "Still at Lakeshire Inn, Xuthar wakes tired and sore, choosing a day of complete rest instead of travel or combat."
    },
    {
      "time": "During the day",
      "title": "The Well and the Sundering",
      "description": "He reads The Kaldorei and the Well of Eternity and The War of the Ancients, considering the costs of ambition and the names history overlooks."
    },
    {
      "time": "During the day",
      "title": "Guardians, shadows and the Emerald Dream",
      "description": "The Guardians of Tirisfal, The Last Guardian and The World Tree and the Emerald Dream bring thoughts of responsibility, doubt and healing."
    },
    {
      "time": "Afternoon thoughts · Carro elsewhere",
      "title": "Maraudon · the unclaimed blade",
      "description": "Carro Steelcave is spending these days in Maraudon seeking the rare epic Blade of Eternal Darkness, associated with Princess Theradras. The search continues; no drop, boss kill or acquisition is claimed."
    },
    {
      "time": "Evening · hour not reported",
      "title": "A candle for another road",
      "description": "Xuthar stays by the Lakeshire hearth, writing of friendship and rest before retiring. Level 24; no adventuring or quest completion today."
    }
  ]
});
return plans;
})();
