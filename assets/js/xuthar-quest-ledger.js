/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261106-api-level10-verified';
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
    const title=make('h2','','Ten roads still calling.');
   title.id='xql-heading';
    const lead=make('p','','The latest tracker at 18:41 on 6 November shows TEN active missions. Five newly seen titles include The Escape, Elmore\'s Task, Report to Gryan Stoutmantle, Goldtooth and Princess Must Die!. Xuthar has now reached LEVEL 10, confirmed directly by the player after this quest screenshot. Neither the character level nor the zone appears in this cropped tracker, and a Westfall quest destination does not prove travel there. Previous lake quests absent from the crop are unverified.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
    for(const [value,label] of [[data.confirmedCompleted?.length||0,'Earlier confirmed completions'],[data.active?.length||0,'Active quests in latest tracker'],[data.unverifiedAfterLatestCrop?.length||0,'Earlier quests unverified']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
    const status=make('p','xql-level-note','Xuthar Morvayne · Day Two · 6 November 2026 · LEVEL '+(data.characterLevel||'unconfirmed')+' (Blizzard API + player confirmed) · Last quest screenshot 59.6, 69.4 · 18:41');
   head.append(status);
   head.append(metrics);root.append(head);
   if(Array.isArray(data.confirmedCompleted)&&data.confirmedCompleted.length){
     const completed=make('div','xql-confirmed');
     completed.append(make('h3','xql-group-heading','Confirmed via game chat or player report'));
     data.confirmedCompleted.forEach(q=>{
       const item=make('p','xql-confirmed-item','✓ '+q.name+(Number.isFinite(q.experience)?' · '+q.experience+' XP':''));
       completed.append(item);
     });
     root.append(completed);
   }
   const board=make('div','xql-board');
   for(const [items,label,cls,ready] of [
     [data.readyForTurnIn,'Ready for turn-in · current cropped tracker','xql-group-ready',true],
     [data.active,'Ongoing quests · 18:41 tracker','xql-group-active',false]
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
    const foot=make('p','xql-provenance','Source: player quest screenshot image(20261106-184152).png showing ten active missions, coordinates 59.6, 69.4. Xuthar\'s level 10 has been verified through Blizzard's official EU Forever profile API (OAuth 200, profile 200), but is not visible in the cropped quest screenshot. An Enticing Offer, Bottles and Baubles, A Net Disaster and Camping 101: Fishing are absent; their outcomes are unverified. Manual transcription only, no official API synchronization claimed.');
   root.append(foot);
   const book=make('a','xql-book-link','Read the field notes in Xuthar’s book ↗');
    book.href='book.html?character=xuthar#x-day-two-ten-quests-field-record';root.append(book);
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
 }
 const mount=document.querySelector('#main');
 if(!mount)return;
 fetch(source,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('Quest ledger not available');return r.json()}).then(render).catch(()=>{
   const msg=make('p','xql-error','The manual quest board is temporarily unavailable. Its field record can still be read in Xuthar’s book.');
   const target=page==='xuthar'?document.querySelector('.xu-first-night'):document.querySelector('#main .body-space');
   target?.append(msg);
 });
})();