/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261107-hearthstone-goldshire';
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
    const title=make('h2','','The long road home, with Westfall unfinished.');
   title.id='xql-heading';
    const lead=make('p','','After a demanding afternoon in Westfall, Xuthar gathered eleven of twelve ingredients for Westfall Stew, but the last Murloc Eye eluded him. With his bags crowded and rest overdue, he used a Hearthstone to return to Goldshire. Stormwind is the intended next stop for supplies, profession errands and a wand; none of those purchases or errands has yet been confirmed. All nine 16:43 quest statuses remain recorded below.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.latestVisibleObjectives?.visibleQuests?.length||0,'Active quests · 7 Nov 16:43'],[data.active?.length||0,'Earlier quests · 6 Nov tracker']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · LEVEL '+(data.characterLevel||'unconfirmed')+' · 7 November 2026 · Verified by player and official Blizzard EU profile snapshot. The quest tracker below records Westfall at 16:43, before the reported Hearthstone return to Goldshire; exact coordinates are not shown in that screenshot.');
   head.append(status);
   head.append(metrics);root.append(head);
   const returnHome=Array.isArray(data.latestPlayerMilestones)
     ?data.latestPlayerMilestones.find(m=>m.id==='2026-11-07-hearthstone-return-goldshire'):null;
   if(returnHome){
     const panel=make('div','xql-confirmed');panel.id='xuthar-hearthstone-return';
     panel.append(make('h3','xql-group-heading','7 November · Hearthstone to Goldshire'));
     panel.append(make('p','xql-confirmed-item','✓ Returned to Goldshire by Hearthstone after a difficult day collecting items in Westfall. The last stew ingredient still missing is 1 Murloc Eye.'));
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
     recent.append(make('h3','xql-group-heading','7 November · Westfall · Nine active quests · 16:43'));
     const place=visible.coordinates?'Position '+visible.coordinates.x+', '+visible.coordinates.y+' · ':'Location coordinates not visible · ';
     const note=make('p','xql-level-note',place+visible.zone+' · '+visible.visibleQuests.length+' active quests at 16:43, before Xuthar returned to Goldshire. Missing quests are not automatically marked complete.');
     recent.append(note);
     for(const q of visible.visibleQuests){
       const line=make('p','xql-confirmed-item','[Lv '+q.level+'] '+q.name+(Number.isFinite(q.current)&&Number.isFinite(q.total)?' · '+q.current+'/'+q.total+' '+(q.item||''):'')+' · '+q.description);
       recent.append(line);
       if(Array.isArray(q.objectives))for(const o of q.objectives){
         recent.append(make('p','xql-level-note','   '+(o.current===o.total?'✓ ':'· ')+o.name+': '+o.current+' / '+o.total));
       }
     }
     recent.append(make('p','xql-level-note','The earlier Furlbrow recipe-delivery quest has given way to a new ingredient-gathering objective. Its exact turn-in and rewards are not independently confirmed. Tailoring and Enchanting training goals still appear in progress despite the bags Xuthar crafted.'));
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