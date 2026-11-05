/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261105-elwynn-1916';
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
   const over=make('span','xql-overline','THE LIVING CHRONICLE · QUEST LEDGER · 5 NOVEMBER 2026');
   const title=make('h2','','The roads still calling.');
   title.id='xql-heading';
   const lead=make('p','','Xuthar is still at his last-confirmed character level 6. The latest screenshot shows four quests ready for turn-in and two quests in progress at Elwynn Forest 42.5, 67.4. Garments of the Light is confirmed completed by the player; quests marked ready still require turn-in.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
   for(const [value,label] of [[data.confirmedCompleted?.length||0,'Confirmed completions'],[data.active.length,'Visible active']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
   const status=make('p','xql-level-note','Xuthar Morvayne · Character level '+(data.characterLevel||'unconfirmed')+' (last confirmed earlier) · New Elwynn quest-tracker snapshot');
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
     [data.readyForTurnIn,'Ready to report','xql-group-ready',true],
     [data.active,'On the quest log','xql-group-active',false]
   ]){
     const group=make('div','xql-group '+cls);group.append(make('h3','xql-group-heading',label));
     const grid=make('div','xql-list');
     if(items.length===0)grid.append(make('p','xql-empty','No quest marked ready for turn-in in this screenshot. Older quest states remain archived.'));
     items.forEach(q=>grid.append(questCard(q,ready)));
     group.append(grid);board.append(group);
   }
   root.append(board);
   const foot=make('p','xql-provenance','The latest screenshot records six quests at Elwynn Forest (42.5, 67.4): four ready for turn-in and two active. Game chat confirms Bounty on Garrick Padfoot completed (340 XP) and the level 6 milestone. Earlier Herbalism, Cooking, Rest and Relaxation, and kobold-tracking objectives remain historical: their absence from the new tracker does not establish delivery. No Blizzard API synchronization is claimed.');
   root.append(foot);
   const book=make('a','xql-book-link','Read the field notes in Xuthar’s book ↗');
   book.href='book.html?character=xuthar#x-goldshire-road-notes';root.append(book);
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