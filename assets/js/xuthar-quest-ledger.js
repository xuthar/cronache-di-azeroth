/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261107-hogger-party-five';
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
   const over=make('span','xql-overline','THE LIVING CHRONICLE · QUEST LEDGER · 6 NOVEMBER 2026');
    const title=make('h2','','Seven roads and a tenth threshold.');
   title.id='xql-heading';
    const lead=make('p','','The 20:59 character screenshot confirms level 10 next to Guard Thomas in Elwynn Forest and completion of Further Concerns. The latest visible objective list has seven active missions, including Riverpaw Gnoll Bounty, WANTED: Hogger, Stormpike\'s Delivery and Report to Gryan Stoutmantle. The Jasperlode Mine was ready for turn-in at 20:33, but its subsequent delivery is not established. Rare Books shows Arcane Explainer found while Geomancy remains missing. Quest destinations in Loch Modan and Westfall do not establish travel there.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.active?.length||0,'Active quests in latest tracker'],[data.unverifiedAfterLatestCrop?.length||0,'Earlier quests unverified']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · Day Two · 6 November 2026 · LEVEL '+(data.characterLevel||'unconfirmed')+' (20:59 screenshot + official profile) · Guard Thomas, Elwynn Forest · 73.9, 72.2');
   head.append(status);
   head.append(metrics);root.append(head);
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
     [data.readyForTurnIn,'Ready for turn-in · latest visible list','xql-group-ready',true],
     [data.active,'Ongoing quests · 20:59 tracker','xql-group-active',false]
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
    book.href='book.html?character=xuthar#x-hogger-five-against-one';root.append(book);
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