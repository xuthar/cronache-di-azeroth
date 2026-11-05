/* Xuthar's first-night manual quest ledger. No invented game data or live sync. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['xuthar','journal'].includes(page))return;
 const source='assets/data/xuthar-quest-log.json?v=20261105-kobold-tracks-01';
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
   const lead=make('p','','Xuthar is level 6 by player report. The latest screenshot shows four active quests, including Shhh! We’re Hunting Kobolds at 0/6 Followed Kobold Tracks. None is marked ready for turn-in in this view. Earlier snapshots remain part of the chronicle.');
   head.append(over,title,lead);
   const metrics=make('div','xql-metrics');
   for(const [value,label] of [[data.readyForTurnIn.length,'Ready for turn-in'],[data.active.length,'Still active']]){
      const stat=make('div','xql-metric');
      stat.append(make('strong','',String(value)),make('span','',label));metrics.append(stat);
   }
   const status=make('p','xql-level-note','Xuthar Morvayne · Character level '+(data.characterLevel||'unconfirmed')+' (player reported) · Quest list from latest screenshot');
   head.append(status);
   head.append(metrics);root.append(head);
   const board=make('div','xql-board');
   for(const [items,label,cls,ready] of [
     [data.readyForTurnIn,'Ready to report','xql-group-ready',true],
     [data.active,'On the quest log','xql-group-active',false]
   ]){
     const group=make('div','xql-group '+cls);group.append(make('h3','xql-group-heading',label));
     const grid=make('div','xql-list');
     if(items.length===0)grid.append(make('p','xql-empty','None marked ready for turn-in in this screenshot. Previous quest states are preserved in the archive.'));
     items.forEach(q=>grid.append(questCard(q,ready)));
     group.append(grid);board.append(group);
   }
   root.append(board);
   const foot=make('p','xql-provenance','Recorded from a player-provided quest screenshot on 5 November 2026, near Northshire (49.5, 41.6). The four quests shown are active; none is marked ready in this view. Milly’s Harvest and Bounty on Garrick Padfoot were ready in the previous screenshot. Their absence here does not prove they were delivered. Quest levels differ from Xuthar’s reported level 6. This is a manual archive, not Blizzard API synchronisation.');
   root.append(foot);
   const book=make('a','xql-book-link','Read the field notes in Xuthar’s book ↗');
   book.href='book.html?character=xuthar#x-kobold-tracks-notes';root.append(book);
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