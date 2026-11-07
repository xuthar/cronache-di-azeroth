/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261107-azora-dedicated';
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
   const over=make('span','xql-overline','THE LIVING CHRONICLE · 7 NOVEMBER 2026 · NEW ROAD');
    const title=make('h2','','The Tower of Azora · Questions after dark.');
   title.id='xql-heading';
    const lead=make('p','','After reaching level 12 beside the eastern river, Xuthar visited the Tower of Azora at 21:23, paused beside a quieter riverbank at 21:39, then entered the tower’s lower chambers at 21:51. Theocritus and Hamish Bergwort were visible in the tower; no new quest interaction is confirmed. The latest quest-objective screenshot remains the earlier 20:55 record, with the Chronicle rule counting Ready for turn-in as completed and delivered.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.questCompletionByConvention?.count||0,'Completed by Chronicle convention'],[data.latestVisibleObjectives?.visibleQuests?.length||0,'Visible quests · 20:55'],[data.active?.length||0,'Earlier quests · 6 Nov tracker']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · LEVEL '+(data.characterLevel||'unconfirmed')+' · 7 November 2026 · Level 12 confirmed by the in-game portrait at 20:55. Blizzard EU API snapshot last checked at level 11. Latest quest screenshot: Elwynn Forest 76.2, 84.2.');
   head.append(status);
   head.append(metrics);root.append(head);
   const towerScenes=Array.isArray(data.latestPlayerMilestones)
      ?data.latestPlayerMilestones.filter(m=>['2026-11-07-azora-upper-library-212359','2026-11-07-elwynn-river-silence-213930','2026-11-07-azora-ground-floor-hamish-215141'].includes(m.id))
      :[];
   if(towerScenes.length===3){
      const panel=make('div','xql-confirmed');panel.id='xuthar-tower-azora';
      panel.append(make('h3','xql-group-heading','7 November · Tower of Azora · 21:23–21:51'));
      panel.append(make('p','xql-confirmed-item','21:23 · Upper tower gallery, Theocritus and the scholarly chambers · 21:39 · Quiet Elwynn riverbank · 21:51 · Lower tower chamber near Hamish Bergwort.'));
      panel.append(make('p','xql-level-note','Three exploration moments documented (upper gallery, riverbank, lower chamber). Chapter XLIII expands this same visit as a literary scene, not an additional quest or journey. Level 12 remains confirmed; last quest tracker shown at 20:55.'));
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
      if(data.characterLevel===12){
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
     recent.append(make('h3','xql-group-heading','7 November · Elwynn Riverbank · Nine visible quests · 20:55'));
     const place=visible.coordinates?'Position '+visible.coordinates.x+', '+visible.coordinates.y+' · ':'Location coordinates not visible · ';
     const note=make('p','xql-level-note',place+visible.zone+' · '+visible.visibleQuests.length+' quests visible at 20:55, after Eastvale camp and the 18:39 objectives. Downstream counts completed by user convention; only earlier missions explicitly showing Ready for turn-in count completed.');
     recent.append(note);
     for(const q of visible.visibleQuests){
       const laterEnchantingDone=q.id===97917&&data.currentQuestUpdates?.camping101Enchanting?.status==='completed-player-reported';
       const stewIngredientsDone=q.name==='Westfall Stew'&&q.objectiveItemsComplete===true;
       const line=make('p','xql-confirmed-item','[Lv '+q.level+'] '+q.name+(Number.isFinite(q.current)&&Number.isFinite(q.total)?' · '+q.current+'/'+q.total+' '+(q.item||''):'')+' · '+q.description+(laterEnchantingDone?' · ✓ completed after this screenshot (player confirmed)':'')+(q.readyForTurnIn?' · ✓ COMPLETED & DELIVERED (Chronicle convention)':'')+(stewIngredientsDone?' · ✓ 12/12 ingredients ready; return to Salma still pending':''));
       recent.append(line);
       if(Array.isArray(q.objectives))for(const o of q.objectives){
         recent.append(make('p','xql-level-note','   '+(o.current===o.total?'✓ ':'· ')+o.name+': '+o.current+' / '+o.total));
       }
     }
     recent.append(make('p','xql-level-note','Downstream is counted completed at 20:55. Deliver Thomas Report remains active, and Westfall Stew shows 2/3 Murloc Eyes despite earlier 3/3 records. The three Eastvale quests from 18:39 and three Enchanting duties from 20:45 are also counted completed by the standing player rule. Original UI snapshots are preserved.'));
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