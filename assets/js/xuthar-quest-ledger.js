/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261111-state-mines-complete';
 const officialFeed='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
 const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el};
 function questCard(quest,ready){
   const card=make('article','xql-quest'+(ready?' xql-ready':' xql-active'));
   const head=make('div','xql-quest-head');
   const lvl=make('span','xql-level','LV '+quest.level);
   const title=make('h3','',quest.name);
   head.append(lvl,title);card.append(head);
   const state=make('p','xql-state'+(ready?' xql-state-ready':''),ready?'✓ Completed · Chronicle convention':'● In progress');
   card.append(state);
   const objective=make('p','xql-objective',quest.objective||quest.progress);
   card.append(objective);
   if(quest.current!==undefined&&quest.total>0){
      const progress=make('div','xql-meter');
      progress.setAttribute('role','progressbar');
      progress.setAttribute('aria-label',quest.name+' objective progress');
      progress.setAttribute('aria-valuemin','0');
      progress.setAttribute('aria-valuemax',String(quest.total));
      progress.setAttribute('aria-valuenow',String(quest.current));
      const fill=make('span','xql-meter-fill');fill.style.width=(100*quest.current/quest.total)+'%';
      progress.append(fill);
      const meta=make('span','xql-count',quest.current+' / '+quest.total);
      card.append(progress,meta);
   }else if(!ready){
      card.append(make('span','xql-count',quest.progress));
   }
   return card;
 }
 function render(data){
   if(data.schemaVersion!==1||!Array.isArray(data.readyForTurnIn)||!Array.isArray(data.active))throw Error('Invalid quest ledger');
   const root=make('section','xql-section');
   root.id='xuthar-quests';root.setAttribute('aria-labelledby','xql-heading');
   const head=make('div','xql-intro');
   const over=make('span','xql-overline','THE LIVING CHRONICLE · 11 NOVEMBER 2026 · LEVEL 17');
    const title=make('h2','','Three companions on the road through Westfall.');
   title.id='xql-heading';
    const lead=make('p','',"On 11 November Xuthar returned to the Defias struggle with two companions: Irlav Manaspark, a mage, and Tooker Iskald, a warrior. The Defias Brotherhood and The People’s Militia show Quest Complete! in the tracker. The priest is live, questing in Westfall.");
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.questCompletionByConvention?.count||0,'Completed by Chronicle convention'],[data.latestVisibleObjectives?.visibleQuests?.length||0,'Latest photographed quest list'],[data.active?.length||0,'Earlier quests · 6 Nov tracker']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · LEVEL '+(data.characterLevel||'unconfirmed')+' · latest Questie snapshot: 11 November, Westfall (6/40). LIVE · Questing in Westfall. Exact coordinates not supplied. The old November 9 snapshot remains historical.');
   head.append(status);
   head.append(metrics);root.append(head);
   if(data.characterLevel>=15 && data.priorVisibleObjectiveSnapshots?.some(p=>p.id==='2026-11-08-later-westfall-questie-level15')){
      const now=make('div','xql-confirmed');now.id='xuthar-level-fifteen';
      now.append(make('h3','xql-group-heading','8 November · Level 15 · Westfall to Stormwind'));
      now.append(make('p','xql-confirmed-item','✓ Level 15 reached at Longshore. Level 14 was reached earlier at Saldean\'s Farm. The Gilded Rose is Xuthar\'s end-of-day resting place.'));
      now.append(make('p','xql-confirmed-item','✓ Completed: Stormpike\'s Delivery · Continue to Stormwind · The Defias Brotherhood.'));
      now.append(make('p','xql-level-note','In progress: Murloc Gills 3/7; The People\'s Militia 3/15 Defias Pillagers and 2/15 Defias Looters; Patrolling Westfall 4/8 Gnoll Paws. These manual quest observations are independent of Blizzard API completion data.'));
      const link=make('a','xql-book-link','Read Chapter XLVIII · The Field of Borrowed Breaths ↗');
      link.href='book.html?character=xuthar#x-westfall-eighth-nov-bandit-rescue';now.append(link);root.append(now);
   }

   if(data.priorVisibleObjectiveSnapshots?.some(p=>p.id==='2026-11-09-westfall-questie-four-phase-two')){
      const now=make('div','xql-confirmed');now.id='xuthar-westfall-nine-quests';
      now.append(make('h3','xql-group-heading','9 November · Earlier Westfall patrols'));
      now.append(make('p','xql-confirmed-item','✓ COMPLETED · Patrolling Westfall — 8 Gnoll Paws for Captain Danuvin; user confirms the vanished mission was finished.'));
      now.append(make('p','xql-confirmed-item','✓ COMPLETED · The People\'s Militia, first assignment — 15 Defias Pillagers and 15 Defias Looters. This was difficult and is followed by a NEW, active militia assignment.'));
      now.append(make('p','xql-confirmed-item','✓ ALREADY COMPLETED · Continue to Stormwind. Still marked Quest Complete! · Stormpike\'s Delivery and The Defias Brotherhood.'));
      now.append(make('p','xql-level-note','● EARLIER PROGRESS · Murloc Gills: 3/7 Longshore Murloc Gills (subsequently counted completed when absent from the evening tracker).'));
      now.append(make('p','xql-level-note','● IN PROGRESS · The People\'s Militia (second assignment): 1/15 Defias Highwaymen; 0/5 Defias Pathstalkers; 0/5 Defias Knuckledusters.'));
      now.append(make('p','xql-level-note','Questie: 4/40 · Westfall 52.9,53.5. Personal Chronicle completion reports are separate from the official Blizzard API, which may lag behind actual gameplay.'));
      const read=make('a','xql-book-link','Read Chapter LI · What the Hills Demand ↗');
      read.href='book.html?character=xuthar#x-westfall-ninth-nov-eight-paws';now.append(read);
      root.append(now);
   }

   if(data.latestVisibleObjectives?.id==='2026-11-11-westfall-questie-six'){
      const current=make('div','xql-confirmed');current.id='xuthar-westfall-eleventh-quests';
      current.append(make('h3','xql-group-heading','11 November · LIVE · Questing in Westfall · Level 17'));
      current.append(make('p','xql-confirmed-item','✓ QUEST COMPLETE · The Defias Brotherhood · the visible assignment, not necessarily the entire quest chain.'));
      current.append(make('p','xql-confirmed-item','✓ QUEST COMPLETE · The People\'s Militia · second assignment.'));
      current.append(make('p','xql-level-note','● ACTIVE · Collecting Memories: 0/4 Miners\' Union Cards · Oh Brother...: 0/1 Thistlenettle\'s Badge · Underground Assault: 0/1 Gnoam Sprecklesprocket.'));
      current.append(make('p','xql-confirmed-item','✓ COMPLETED · The State of the Mines · Xuthar confirmed the quest finished on 11 November; not yet independently verified through the Blizzard API.'));
      current.append(make('p','xql-level-note','Travelling with Irlav Manaspark (level 20 Mage) and Tooker Iskald (level 19 Warrior). The Questie 6/40 screenshot is a player-reported observation; the official Blizzard API remains independent.'));
      const reading=make('a','xql-book-link','Read Chapters LX–LXI · Three Against the Dust ↗');
      reading.href='book.html?character=xuthar#x-nov11-defias-1';
      current.append(reading);root.append(current);
   }
   if(data.latestVisibleObjectives?.id==='2026-11-09-westfall-night-questie-five'){
      const now=make('div','xql-confirmed');now.id='xuthar-westfall-night-quests';
      now.append(make('h3','xql-group-heading','9 November · Night at Sentinel Hill · Level 15'));
      now.append(make('p','xql-confirmed-item','✓ COMPLETED · ... and that note you found (Quest Complete!) · Stormpike\'s Delivery and The Defias Brotherhood remain marked Quest Complete!.'));
      now.append(make('p','xql-confirmed-item','✓ COMPLETED by Xuthar\'s standing rule · Murloc Gills, absent from the previous quest tracker.'));
      now.append(make('p','xql-level-note','● IN PROGRESS · The State of the Mines: 0/4 Kobold Diggers and 0/6 Riverpaw Miners.'));
      now.append(make('p','xql-level-note','● IN PROGRESS · The People\'s Militia (second assignment): 1/15 Defias Highwaymen, 0/5 Pathstalkers, 0/5 Knuckledusters.'));
      now.append(make('p','xql-level-note','Questie 5/40 · Westfall (52.5,53.2). Final player-reported status: OFFLINE · Sentinel Hill, Westfall · Level 15. The screenshot coordinates are not the reported resting coordinates.'));
      now.append(make('p','xql-level-note','A tiring evening. Xuthar rests in bed and turns his thoughts to journeys yet to come. These manual statuses are separate from the delayed Blizzard API feed.'));
      const read=make('a','xql-book-link','Read Chapter LII · The Roads That Wait in Dreams ↗');
      read.href='book.html?character=xuthar#x-sentinel-hill-nov9-evening-bed';now.append(read);root.append(now);
   }
   const towerScenes=Array.isArray(data.latestPlayerMilestones)
      ?data.latestPlayerMilestones.filter(m=>['2026-11-07-azora-upper-library-212359','2026-11-07-elwynn-river-silence-213930','2026-11-07-azora-ground-floor-hamish-215141'].includes(m.id))
      :[];
   if(towerScenes.length===3){
      const panel=make('div','xql-confirmed');panel.id='xuthar-tower-azora';
      panel.append(make('h3','xql-group-heading','7 November · Tower of Azora · 21:23–21:51'));
      panel.append(make('p','xql-confirmed-item','21:23 · Upper tower gallery, Theocritus and the scholarly chambers · 21:39 · Quiet Elwynn riverbank · 21:51 · Lower tower chamber near Hamish Bergwort.'));
      panel.append(make('p','xql-level-note','Three exploration moments documented (upper gallery, riverbank, lower chamber). Chapter XLIII expands the same visit; level 13 was later reported separately. Last quest tracker remains the 20:55 level-12 screenshot.'));
      const link=make('a','xql-book-link','Read Chapter XLIII · The Silence Between the Stars ↗');
      link.href='book.html?character=xuthar#x-tower-of-azora-dedicated';
      panel.append(link);root.append(panel);
   }
      if(data.questCompletionByConvention?.count){
      const panel=make('div','xql-confirmed');panel.id='xuthar-completed-by-convention';
      panel.append(make('h3','xql-group-heading','Completed quests · Standing Chronicle convention'));
      panel.append(make('p','xql-confirmed-item',data.questCompletionByConvention.names.join(' · ')));
      panel.append(make('p','xql-level-note','Ready for turn-in counts as completed and delivered in the personal Chronicle, as requested by Xuthar. Raw screenshot wording is preserved in historical data; official Blizzard completion remains separate.'));
      root.append(panel);
   }
   const enchantingPhoto=Array.isArray(data.priorVisibleObjectiveSnapshots)?data.priorVisibleObjectiveSnapshots.find(p=>p.id==='2026-11-07-elwynn-collector-enchanting-ready-204536'):null;
   if(enchantingPhoto){
      const panel=make('div','xql-confirmed');panel.id='xuthar-enchanting-three';
      panel.append(make('h3','xql-group-heading','20:45 · Enchanting duties · Completed'));
      panel.append(make('p','xql-confirmed-item','An Enchanting Lesson · Delicate Instruments · Stolen Enchanting Supplies'));
      panel.append(make('p','xql-level-note','All three are considered delivered under the Chronicle rule. The Collector and Deliver Thomas Report remain open for Marshal Dughan in Goldshire. Westfall Stew shows Murloc Eye 2/3.'));
      const link=make('a','xql-book-link','Read the river night · Chapter XLI ↗');
      link.href='book.html?character=xuthar#x-eastvale-murloc-river-level-twelve';
      panel.append(link);root.append(panel);
   }
      if(data.characterLevel>=13){
      const latest=make('div','xql-confirmed');latest.id='xuthar-level-thirteen';
      latest.append(make('h3','xql-group-heading','Level 13 · Xuthar Morvayne'));
      latest.append(make('p','xql-confirmed-item','✓ Level 13 confirmed directly by Xuthar · exact level-up date, time and location not documented.'));
      latest.append(make('p','xql-level-note','The official Blizzard EU snapshot last checked was level 11. The 20:55 quest screenshot from 7 November still records level 12 at that earlier moment. No new quest completion is inferred.'));
      const chapterLink=make('a','xql-book-link','Read Chapter XLIV · A Measure of the Unseen ↗');
      chapterLink.href='book.html?character=xuthar#x-thirteenth-threshold';latest.append(chapterLink);
      root.append(latest);
   }
   if(data.latestPlayerMilestones?.some(m=>m.id==='2026-11-07-eastvale-murlocs-level-12-205511')){
      const milestone=make('div','xql-confirmed');milestone.id='xuthar-level-twelve';
      milestone.append(make('h3','xql-group-heading','7 November · Level 12 · By the murloc river'));
      milestone.append(make('p','xql-confirmed-item','✓ LEVEL 12 · shown at 20:55 · Elwynn Forest 76.2, 84.2. Last checked Blizzard EU snapshot showed level 11.'));
      milestone.append(make('p','xql-level-note','The exact level-up time and place are unknown. Verification is from the game screenshot, with official profile synchronization pending.'));
      const levelLink=make('a','xql-book-link','Read Chapter XLI · The Fires Across the Water ↗');
      levelLink.href='book.html?character=xuthar#x-eastvale-murloc-river-level-twelve';
      milestone.append(levelLink);root.append(milestone);
   }
      if(data.latestVisibleObjectives?.visibleQuests?.some(q=>q.readyForTurnIn)){
      const readyNames=data.latestVisibleObjectives.visibleQuests.filter(q=>q.readyForTurnIn).map(q=>q.name);
      const readyPanel=make('div','xql-confirmed');readyPanel.id='xuthar-eastvale-ready';
      readyPanel.append(make('h3','xql-group-heading','Downstream · Completed · 20:55'));
      readyPanel.append(make('p','xql-confirmed-item',readyNames.join(' · ')));
      readyPanel.append(make('p','xql-level-note','Downstream counts as completed and delivered by the Chronicle rule. The source screenshot reads Ready for turn-in; separate official API confirmation is not claimed.'));
      const link=make('a','xql-book-link','Read Chapter XLI · The Fires Across the Water ↗');
      link.href='book.html?character=xuthar#x-eastvale-murloc-river-level-twelve';
      readyPanel.append(link);root.append(readyPanel);
   }
   if(Array.isArray(data.plannedItinerary)){
      const eastvale=data.plannedItinerary.find(x=>x.id==='2026-11-07-next-destination-eastvale-logging-camp');
      if(eastvale){
         const plan=make('div','xql-confirmed');
         plan.id='xuthar-eastvale-next';
         plan.append(make('h3','xql-group-heading','Earlier in Eastvale · Three quests ready · 18:39'));
         plan.append(make('p','xql-confirmed-item','At 18:39 Protect the Frontier, Good Steel and Red Linen Goods showed Ready for turn-in, which means completed and delivered in this Chronicle.'));
         plan.append(make('p','xql-level-note','These three duties count as completed at 18:39. Later, three Enchanting-related duties and Downstream were also completed under the same rule. Thomas Report and The Collector remain active; Rolf and the wood-bundle quest cannot be inferred completed from their absence.'));
         const link=make('a','xql-book-link','Read Chapter XXXIX · The Price of a Safer Road ↗');
         link.href='book.html?character=xuthar#x-eastvale-frontier-unfinished-return';
         plan.append(link);
         root.append(plan);
      }
   }
      const enchanted=data.currentQuestUpdates?.camping101Enchanting;
   if(enchanted?.status==='completed-player-reported'){
      const completedPanel=make('div','xql-confirmed');
      completedPanel.id='xuthar-enchanting-completed';
      completedPanel.append(make('h3','xql-group-heading','7 November · Camping 101: Enchanting completed'));
      completedPanel.append(make('p','xql-confirmed-item','✓ QUEST COMPLETED · Camping 101: Enchanting · Skill target 20 achieved (player confirmed).'));
      const verify=make('p','xql-level-note','Blizzard quest archive verification is pending. The 15:56 official snapshot still listed the quest as active because it predates the completion report.');
      completedPanel.append(verify);
      const story=make('a','xql-book-link','Read Chapter XXXVII · What the Ordinary Things Remember ↗');
      story.href='book.html?character=xuthar#x-enchanting-first-threshold';
      completedPanel.append(story);
      root.append(completedPanel);
      fetch(officialFeed,{cache:'no-store',headers:{Accept:'application/json'}})
       .then(r=>{if(!r.ok)throw Error('Official snapshot unavailable');return r.json();})
       .then(feed=>{
         if(feed.source!=='BlizzardOfficialAPI'||feed.apiRegion!=='eu')return;
         const hero=Array.isArray(feed.characters)?feed.characters.find(c=>c.name==='Xuthar Morvayne'):null;
         const quests=hero?.officialDetails?.quests;
         if(Array.isArray(quests?.completedQuestIds)&&quests.completedQuestIds.includes(97917)){
           verify.textContent='✓ Official Blizzard EU quest archive confirms completion of quest ID 97917.';
         }else if(Array.isArray(quests?.inProgress)&&quests.inProgress.some(q=>q.id===97917)){
           verify.textContent='Completed per Xuthar; Blizzard EU snapshot still lists the quest active while awaiting the next update.';
         }
       }).catch(()=>{});
   }
      const returnHome=Array.isArray(data.latestPlayerMilestones)
     ?data.latestPlayerMilestones.find(m=>m.id==='2026-11-07-hearthstone-return-goldshire'):null;
   if(returnHome){
     const panel=make('div','xql-confirmed');panel.id='xuthar-hearthstone-return';
     panel.append(make('h3','xql-group-heading','7 November · Hearthstone to Goldshire'));
     panel.append(make('p','xql-confirmed-item','✓ Returned to Goldshire by Hearthstone after a difficult day in Westfall. The stew showed 3/3 Murloc Eyes at 18:18 and 18:39 but 2/3 in the 20:55 screenshot. The reason for this difference is unknown.'));
     panel.append(make('p','xql-level-note','Rest, clearing bags, buying a wand and profession errands are planned. Reaching Stormwind or completing those tasks has not yet been reported.'));
     const link=make('a','xql-book-link','Read Chapter XXXVI · The Weight of What Remains ↗');
     link.href='book.html?character=xuthar#x-hearthstone-goldshire-return';panel.append(link);
     root.append(panel);
   }
   if(data.lastLevelMilestone?.level===11){
      const levelPanel=make('div','xql-confirmed');
      levelPanel.id='xuthar-level-eleven';
      levelPanel.append(make('h3','xql-group-heading','7 November · The Eleventh Threshold'));
      levelPanel.append(make('p','xql-confirmed-item','✓ LEVEL 11 · Xuthar Morvayne · verified by direct player confirmation and Blizzard EU official API.'));
      levelPanel.append(make('p','xql-level-note','Exact level-up time, location and earned experience are not assumed. Existing quest statuses remain unchanged.'));
      const link=make('a','xql-book-link','Read Chapter XXXV · The Weight of Another Dawn ↗');
      link.href='book.html?character=xuthar#x-westfall-eleventh-threshold';levelPanel.append(link);
      root.append(levelPanel);
   }
   // Today's new zone and crafting notes are separate from the older quest tracker.
   if(Array.isArray(data.latestPlayerMilestones)){
      const field=data.latestPlayerMilestones.find(m=>m.id==='2026-11-07-westfall-harvest-watchers-field');
      const bags=data.latestPlayerMilestones.find(m=>m.id==='2026-11-07-tailoring-crafted-bags');
      if(field||bags){
        const area=make('div','xql-confirmed');area.id='xuthar-westfall-harvest-watchers';
        area.append(make('h3','xql-group-heading','7 November · Return to Westfall · The golden fields'));
        if(field)area.append(make('p','xql-confirmed-item','14:09 · Xuthar stands among pumpkin fields and Harvest Watchers. A targeted Harvest Watcher is level 14; no combat or quest completion is established.'));
        if(bags)area.append(make('p','xql-confirmed-item','Tailoring · Xuthar crafted bags and gained inventory space. Bag quantity, capacity, recipes and exact Tailoring level are not established.'));
        const a=make('a','xql-book-link','Read Chapter XXXIII · The Watchers in the Wheat ↗');
        a.href='book.html?character=xuthar#x-westfall-fields-harvest-watchers';area.append(a);
        area.append(make('p','xql-level-note','The report to Gryan Stoutmantle still awaits a confirmed hand-in.'));
        root.append(area);
      }
   }
   // Latest visible screenshot is separate from the previous complete 6 Nov tracker.
   const visible=data.latestVisibleObjectives;
   if(visible && Array.isArray(visible.visibleQuests)){
     const recent=make('div','xql-confirmed');
     recent.id='xuthar-latest-quests';
     recent.append(make('h3','xql-group-heading',(visible.day||'Latest')+' · '+(visible.zone||'Quest tracker')+' · '+visible.visibleQuests.length+' visible quests'));
     const place=visible.coordinates?'Position '+visible.coordinates.x+', '+visible.coordinates.y+' · ':'Location coordinates not visible · ';
     const note=make('p','xql-level-note',place+visible.zone+' · '+(visible.interface||'Quest tracker')+'. Player-recorded Questie states, not automated Blizzard quest completion data.');
     recent.append(note);
     for(const q of visible.visibleQuests){
       const laterEnchantingDone=q.id===97917&&data.currentQuestUpdates?.camping101Enchanting?.status==='completed-player-reported';
       const stewIngredientsDone=q.name==='Westfall Stew'&&q.objectiveItemsComplete===true;
       const line=make('p','xql-confirmed-item','[Lv '+(q.level||'?')+'] '+q.name+(Number.isFinite(q.current)&&Number.isFinite(q.total)?' · '+q.current+'/'+q.total+' '+(q.objective||q.item||''):'')+(q.description?' · '+q.description:'')+(q.rawStatus?' · '+q.rawStatus:'')+(q.status==='completed-by-user-convention'?' · ✓ COMPLETED (Chronicle convention)':'')+(laterEnchantingDone?' · ✓ completed after earlier screenshot':'')+(q.readyForTurnIn?' · ✓ COMPLETED (Chronicle convention)':'')+(stewIngredientsDone?' · ✓ ingredients ready':''));
       recent.append(line);
       if(Array.isArray(q.objectives))for(const o of q.objectives){
         recent.append(make('p','xql-level-note','   '+(o.current===o.total?'✓ ':'· ')+o.name+': '+o.current+' / '+o.total));
       }
     }
     recent.append(make('p','xql-level-note','Latest Questie screenshot is the evening five-quest list. Earlier Eastvale and Westfall screenshots remain historical records; missing quests are handled under Xuthar\'s standing reporting rule.'));
     const completed=data.currentQuestUpdates?.riverpawGnollBounty?.status==='completed-player-reported';
     if(completed){
       const state=make('p','xql-confirmed-item','✓ Riverpaw Gnoll Bounty — COMPLETED · 8/8 Painted Gnoll Armbands · 7 Nov (player confirmed).');
       state.id='riverpaw-completion-status';
       recent.append(state);
       const link=make('a','xql-book-link','Read Chapter XXX · What the Gnolls Leave Behind ↗');
       link.href='book.html?character=xuthar#x-riverpaw-painted-armbands';
       recent.append(link);
       fetch(officialFeed,{cache:'no-store',headers:{Accept:'application/json'}})
         .then(r=>{if(!r.ok)throw Error('Official feed unavailable');return r.json();})
         .then(feed=>{
           const char=Array.isArray(feed.characters)?feed.characters.find(c=>c.name==='Xuthar Morvayne'):null;
           if(feed.source!=='BlizzardOfficialAPI'||feed.apiRegion!=='eu'||!char)return;
           const ids=char.officialDetails?.quests?.completedQuestIds;
           if(Array.isArray(ids)&&ids.includes(11))state.textContent='✓ Riverpaw Gnoll Bounty — COMPLETED · 8/8 · confirmed by Blizzard official quest ID 11.';
         }).catch(()=>{});
     }
     root.append(recent);
   }
   // An equipment milestone is independent of completed quest records and the Blizzard feed.
   if(Array.isArray(data.latestPlayerMilestones)){
     const staff=data.latestPlayerMilestones.find(m=>m.id==='2026-11-07-stormwind-errands-staves-training');
     if(staff){
       const entry=make('div','xql-confirmed');
       entry.id='xuthar-staves-training';
       entry.append(make('h3','xql-group-heading','7 November · Back to Stormwind · A new staff'));
       entry.append(make('p','xql-confirmed-item','Xuthar returned to Stormwind on errands, learned to wield staves and acquired a new staff.'));
       entry.append(make('p','xql-level-note','The staff\'s name, source, attributes and equipped status are not yet recorded. No quest delivery or additional character level is inferred.'));
       const link=make('a','xql-book-link','Read Chapter XXXII · The Staff and the City ↗');
       link.href='book.html?character=xuthar#x-stormwind-return-first-staff';
       entry.append(link);root.append(entry);
     }
   }
   // New gameplay reports are separated from the historical 6 Nov quest-tracker snapshot.
   if(Array.isArray(data.latestPlayerMilestones)){
     data.latestPlayerMilestones.forEach(m=>{
       if(m.id!=='2026-11-07-hogger-party-of-five')return;
       const entry=make('div','xql-confirmed');
       entry.id='hogger-party-five';
       entry.append(make('h3','xql-group-heading','7 November · Hogger falls to five adventurers'));
       entry.append(make('p','xql-confirmed-item','Xuthar Morvayne and four other adventurers defeated Hogger together. The companions’ names remain unknown.'));
       const questState=make('p','xql-level-note','Quest hand-in: being delivered; not yet confirmed by the official Blizzard quest snapshot.');
       questState.id='hogger-handin-status';
       entry.append(questState);
       const story=make('a','xql-book-link','Read Chapter XXIX · The Fall of Hogger ↗');
       story.href='book.html?character=xuthar#x-hogger-five-against-one';
       entry.append(story);
       root.append(entry);
       fetch(officialFeed,{cache:'no-store',headers:{Accept:'application/json'}})
         .then(r=>{if(!r.ok)throw Error('Official snapshot unavailable');return r.json();})
         .then(feed=>{
           const hero=Array.isArray(feed.characters)?feed.characters.find(c=>c.name==='Xuthar Morvayne'):null;
           if(feed.source!=='BlizzardOfficialAPI'||feed.apiRegion!=='eu'||!hero)return;
           const quests=hero.officialDetails?.quests;
           if(!quests)return;
           const taken=Array.isArray(quests.completedQuestIds)&&quests.completedQuestIds.includes(176);
           if(taken)questState.textContent='✓ Quest WANTED: “Hogger” completed · confirmed by the latest official Blizzard API snapshot (quest ID 176).';
           else questState.textContent='Hogger defeated with a five-person party; quest hand-in is not yet confirmed by the official Blizzard snapshot.';
         }).catch(()=>{questState.textContent='Hogger defeated with a five-person party; official quest hand-in confirmation still pending.';});
     });
   }
   if(Array.isArray(data.confirmedCompleted)&&data.confirmedCompleted.length){
     const completed=make('div','xql-confirmed');
     completed.append(make('h3','xql-group-heading','Verified completed missions'));
     data.confirmedCompleted.forEach(q=>{
       const item=make('p','xql-confirmed-item','✓ '+q.name+(Number.isFinite(q.experience)?' · '+q.experience+' XP':''));
       completed.append(item);
     });
     root.append(completed);
   }
   const board=make('div','xql-board');
   for(const [items,label,cls,ready] of [
     [data.readyForTurnIn,'Completed · historical 6 Nov Ready list','xql-group-ready',true],
     [data.active,'Earlier in-progress quests · 6 Nov 20:59','xql-group-active',false]
   ]){
     const group=make('div','xql-group '+cls);group.append(make('h3','xql-group-heading',label));
     const grid=make('div','xql-list');
      if(items.length===0)grid.append(make('p','xql-empty','No quest marked ready for turn-in in this screenshot; other quest states are not verified.'));
     items.forEach(q=>grid.append(questCard(q,ready)));
     group.append(grid);board.append(group);
   }
   root.append(board);
    if(Array.isArray(data.unverifiedAfterLatestCrop)&&data.unverifiedAfterLatestCrop.length){
      const box=make('div','xql-unverified');
      box.append(make('h3','xql-group-heading','Earlier missions · outcome not yet verified'));
      box.append(make('p','xql-empty','Missing from this cropped tracker does not mean completed, delivered or abandoned.'));
      const ul=make('ul','xql-unverified-list');
      data.unverifiedAfterLatestCrop.forEach(q=>{
        const li=make('li','');
        li.append(make('strong','',q.name),document.createTextNode(' · '+q.lastSeen));
        ul.append(li);
      });
      box.append(ul);root.append(box);
    }
    const foot=make('p','xql-provenance','Evidence: WoWScrnShot_110626_205922.jpg shows the level-ten milestone, completed Further Concerns, seven active missions and the Guard Thomas location in Elwynn. WoWScrnShot_110626_203303.jpg independently shows The Jasperlode Mine ready to report. Historical missions omitted from the latest objective list are not automatically marked complete or abandoned. The manual field ledger remains separate from the automated Blizzard completed-quest archive.');
   root.append(foot);
   const book=make('a','xql-book-link','Continue The Last Witness ↗');
    book.href='book.html?character=xuthar#x-westfall-eleventh-threshold';root.append(book);
    const armory=make('a','xql-chapter-link','Official EU Forever Armory · Xuthar Morvayne ↗');
    armory.href='https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne';
    armory.target='_blank';armory.rel='noopener noreferrer';
    root.append(armory);
   const anchor=page==='xuthar'?document.querySelector('.xu-first-night'):document.querySelector('#main .body-space header');
   if(page==='xuthar'){
     if(anchor)anchor.insertAdjacentElement('afterend',root);
     else document.querySelector('#main')?.prepend(root);
   }else{
     const wrap=document.querySelector('#main .body-space');
     if(wrap)wrap.insertBefore(root,wrap.querySelector('.home-journal')||null);
   }
   if(location.hash==='#xuthar-quests')requestAnimationFrame(()=>root.scrollIntoView({block:'start'}));
   if(location.hash==='#xuthar-enchanting-three')requestAnimationFrame(()=>document.getElementById('xuthar-enchanting-three')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-completed-by-convention')requestAnimationFrame(()=>document.getElementById('xuthar-completed-by-convention')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-tower-azora')requestAnimationFrame(()=>document.getElementById('xuthar-tower-azora')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-level-thirteen')requestAnimationFrame(()=>document.getElementById('xuthar-level-thirteen')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-level-twelve')requestAnimationFrame(()=>document.getElementById('xuthar-level-twelve')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-eastvale-ready')requestAnimationFrame(()=>document.getElementById('xuthar-eastvale-ready')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-eastvale-next')requestAnimationFrame(()=>document.getElementById('xuthar-eastvale-next')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-enchanting-completed')requestAnimationFrame(()=>document.getElementById('xuthar-enchanting-completed')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-hearthstone-return')requestAnimationFrame(()=>document.getElementById('xuthar-hearthstone-return')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-level-eleven')requestAnimationFrame(()=>document.getElementById('xuthar-level-eleven')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-westfall-harvest-watchers')requestAnimationFrame(()=>document.getElementById('xuthar-westfall-harvest-watchers')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-staves-training')requestAnimationFrame(()=>document.getElementById('xuthar-staves-training')?.scrollIntoView({block:'center'}));
   if(location.hash==='#riverpaw-completion-status')requestAnimationFrame(()=>document.getElementById('riverpaw-completion-status')?.scrollIntoView({block:'center'}));
   if(location.hash==='#xuthar-latest-quests')requestAnimationFrame(()=>document.getElementById('xuthar-latest-quests')?.scrollIntoView({block:'start'}));
   if(location.hash==='#hogger-party-five')requestAnimationFrame(()=>document.getElementById('hogger-party-five')?.scrollIntoView({block:'start'}));
 }
 const mount=document.querySelector('#main');
 if(!mount)return;
 fetch(source,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('Quest ledger not available');return r.json()}).then(render).catch(()=>{
   const msg=make('p','xql-error','The manual quest board is temporarily unavailable. Its field record can still be read in Xuthar’s book.');
   const target=page==='xuthar'?document.querySelector('.xu-first-night'):document.querySelector('#main .body-space');
   target?.append(msg);
 });
})();