/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261107-eastvale-ready-quests';
 const officialFeed='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
 const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el};
 function questCard(quest,ready){
   const card=make('article','xql-quest'+(ready?' xql-ready':' xql-active'));
   const head=make('div','xql-quest-head');
   const lvl=make('span','xql-level','LV '+quest.level);
   const title=make('h3','',quest.name);
   head.append(lvl,title);card.append(head);
   const state=make('p','xql-state'+(ready?' xql-state-ready':''),ready?'✓ Ready for turn-in':'● In progress');
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
    const title=make('h2','','The eastern frontier: three duties nearly fulfilled.');
   title.id='xql-heading';
    const lead=make('p','','Three missions now show Ready for turn-in at Eastvale: Protect the Frontier, Good Steel and Red Linen Goods. Their tasks are done, but the quest hand-ins have not been confirmed. The search for Rolf, the waterlogged tools and the wood bundles remain unfinished. Westfall Stew has all twelve ingredients, waiting to be delivered. Camping 101: Enchanting remains separately confirmed complete.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.latestVisibleObjectives?.visibleQuests?.length||0,'Visible quests · 18:39'],[data.active?.length||0,'Earlier quests · 6 Nov tracker']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · LEVEL '+(data.characterLevel||'unconfirmed')+' · 7 November 2026 · Verified by player and official Blizzard EU profile snapshot. Latest quest screenshot: eastern Elwynn, 18:39. Eleven quests are visible; three are ready for turn-in. Precise coordinates are cropped in this image.');
   head.append(status);
   head.append(metrics);root.append(head);
   if(data.latestVisibleObjectives?.visibleQuests?.some(q=>q.readyForTurnIn)){
      const readyNames=data.latestVisibleObjectives.visibleQuests.filter(q=>q.readyForTurnIn).map(q=>q.name);
      const readyPanel=make('div','xql-confirmed');readyPanel.id='xuthar-eastvale-ready';
      readyPanel.append(make('h3','xql-group-heading','Eastvale · Ready for turn-in · Not yet delivered'));
      readyPanel.append(make('p','xql-confirmed-item',readyNames.join(' · ')));
      readyPanel.append(make('p','xql-level-note','Objectives are done but quest givers have not confirmed hand-ins. This is not yet a completed-quest archive entry.'));
      const link=make('a','xql-book-link','Read Chapter XXXIX · The Price of a Safer Road ↗');
      link.href='book.html?character=xuthar#x-eastvale-frontier-unfinished-return';
      readyPanel.append(link);root.append(readyPanel);
   }
   if(Array.isArray(data.plannedItinerary)){
      const eastvale=data.plannedItinerary.find(x=>x.id==='2026-11-07-next-destination-eastvale-logging-camp');
      if(eastvale){
         const plan=make('div','xql-confirmed');
         plan.id='xuthar-eastvale-next';
         plan.append(make('h3','xql-group-heading','Eastvale · Three quests ready · 18:39'));
         plan.append(make('p','xql-confirmed-item','Xuthar has finished field objectives for Protect the Frontier, Good Steel and Red Linen Goods. All three are ready for turn-in, not yet handed in.'));
         plan.append(make('p','xql-level-note','Eastvale questing area, latest coordinates partly cropped. Rolf remains missing; the three waterlogged tools and eight wood bundles remain outstanding. Westfall Stew is also awaiting delivery.'));
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
     panel.append(make('p','xql-confirmed-item','✓ Returned to Goldshire by Hearthstone after a difficult day in Westfall. At that moment one Murloc Eye was missing; by the later 18:18 screenshot all ingredients have been gathered.'));
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
     recent.append(make('h3','xql-group-heading','7 November · Eastern Elwynn · Eleven visible quests · 18:39'));
     const place=visible.coordinates?'Position '+visible.coordinates.x+', '+visible.coordinates.y+' · ':'Location coordinates not visible · ';
     const note=make('p','xql-level-note',place+visible.zone+' · '+visible.visibleQuests.length+' missions visible at 18:39. Three are ready for turn-in; no hand-in is confirmed. Missing missions are not assumed completed.');
     recent.append(note);
     for(const q of visible.visibleQuests){
       const laterEnchantingDone=q.id===97917&&data.currentQuestUpdates?.camping101Enchanting?.status==='completed-player-reported';
       const stewIngredientsDone=q.name==='Westfall Stew'&&q.objectiveItemsComplete===true;
       const line=make('p','xql-confirmed-item','[Lv '+q.level+'] '+q.name+(Number.isFinite(q.current)&&Number.isFinite(q.total)?' · '+q.current+'/'+q.total+' '+(q.item||''):'')+' · '+q.description+(laterEnchantingDone?' · ✓ completed after this screenshot (player confirmed)':'')+(q.readyForTurnIn?' · ✓ READY FOR TURN-IN (not handed in)':'')+(stewIngredientsDone?' · ✓ 12/12 ingredients ready; return to Salma still pending':''));
       recent.append(line);
       if(Array.isArray(q.objectives))for(const o of q.objectives){
         recent.append(make('p','xql-level-note','   '+(o.current===o.total?'✓ ':'· ')+o.name+': '+o.current+' / '+o.total));
       }
     }
     recent.append(make('p','xql-level-note','Protect the Frontier, Good Steel and Red Linen Goods have their objectives finished but still await delivery. Westfall Stew has its ingredients ready for delivery. Earlier screenshots remain preserved, and unseen missions are not assumed completed.'));
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
     [data.readyForTurnIn,'Ready for turn-in · historical 6 Nov list','xql-group-ready',true],
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