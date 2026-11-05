/* The sunlight road: seven real player-supplied WoW screenshots. No AI imagery. */
(() => {
 'use strict';
 const page=document.body.dataset.page;
 if(!['gallery','home','xuthar'].includes(page))return;
 const albumId='goldshire-travel-gallery';
 const atlas='assets/data/xuthar-goldshire-seven-atlas.b64?v=20261105-goldshire-seven-01';
 const pics=[
  {title:'The Sixth Step',label:'11:36 · THE RECORDED VICTORY',detail:'The game chat confirms Bounty on Garrick Padfoot completed, 340 XP awarded and Xuthar reaching level six. Grape Manifest appears among the quests.'},
  {title:'Sunlight over the Fields',label:'11:36 · NORTHSHIRE',detail:'The priest stands in the clearing outside the stone walls; the forest, once dark, glows in daylight.'},
  {title:'Beneath the Stone Lion',label:'11:54 · THE ABBEY GATE',detail:'Xuthar passes beneath Northshire’s stone archway, with the lion-headed fountain visible beyond it.'},
  {title:'The Road Beyond the Abbey',label:'11:54 · ELWYNN FOREST',detail:'A broad cobblestone road winds under massive trees, leading away from the starting valley.'},
  {title:'Blue Roofs ahead',label:'12:18 · GOLDSHIRE',detail:'Xuthar approaches one of the large blue-roofed buildings in Goldshire. The screenshot does not show him speaking with the innkeeper.'},
  {title:'The Village Crossing',label:'12:18 · GOLDSHIRE',detail:'A second view of the village square, its sunlit cobbled streets and passing adventurers.'},
  {title:'Houses on the Long Road',label:'12:18 · GOLDSHIRE',detail:'Xuthar walks through the village between blue-tiled houses, chimneys and stables.'}
 ];
 const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
 const crop=(index,cls='')=>{const v=el('span','fn-photo-frame '+cls);v.style.backgroundPosition=((index%2)*100)+'% '+(Math.floor(index/2)/3*100)+'%';v.setAttribute('role','img');v.setAttribute('aria-label',pics[index].detail);return v;};
 async function load(){const response=await fetch(atlas,{cache:'force-cache'});if(!response.ok)throw Error('Goldshire photo atlas unavailable');const text=(await response.text()).trim();if(text.length!==7724||!/^[A-Za-z0-9+/]+={0,2}$/.test(text))throw Error('Invalid photo atlas');return 'data:image/avif;base64,'+text;}
 function showAlbum(src){
  const root=document.querySelector('#main .body-space');if(!root||document.querySelector('#'+albumId))return;
  const section=el('section','fn-gallery goldshire-new-gallery');section.id=albumId;
  section.setAttribute('aria-labelledby','goldshire-travel-title');
  section.style.setProperty('--fn-atlas','url("'+src+'")');
  const heading=el('div','fn-gallery-heading');
  const info=el('div','');
  info.append(el('span','fn-overline','5 November 2026 · 7 authentic gameplay screenshots'));
  const title=el('h2','','The Sunlit Road to Goldshire');title.id='goldshire-travel-title';info.append(title);
  info.append(el('p','','A photographic chapter in Xuthar Morvayne’s story: the completed Garrick bounty, the lion of Northshire, Elwynn Forest and the first streets of Goldshire.'));
  const book=el('a','fn-gallery-link','Read Chapter XV ↗');book.href='book.html?character=xuthar#x-goldshire-road';
  heading.append(info,book);section.append(heading);
  const grid=el('div','fn-gallery-grid');
  const dialog=el('dialog','fn-photo-dialog');dialog.setAttribute('aria-label','Goldshire screenshot viewer');
  const panel=el('div','fn-dialog-inner');
  const close=el('button','fn-dialog-close','Close ×');close.type='button';
  const large=crop(0,'fn-dialog-frame');
  const caption=el('p','fn-dialog-caption','');
  const nav=el('div','fn-dialog-navigation');
  const prev=el('button','','← Previous');prev.type='button';
  const next=el('button','','Next →');next.type='button';
  nav.append(prev,next);panel.append(close,large,caption,nav);dialog.append(panel);section.append(dialog);
  let active=0;
  function update(i){active=(i+pics.length)%pics.length;large.style.backgroundPosition=((active%2)*100)+'% '+(Math.floor(active/2)/3*100)+'%';large.setAttribute('aria-label',pics[active].detail);caption.textContent=(active+1)+' / '+pics.length+' — '+pics[active].title+' · '+pics[active].detail;}
  function open(i){update(i);dialog.showModal();}
  close.addEventListener('click',()=>dialog.close());
  prev.addEventListener('click',()=>update(active-1));next.addEventListener('click',()=>update(active+1));
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();update(active+1)}else if(e.key==='ArrowLeft'){e.preventDefault();update(active-1)}});
  pics.forEach((p,i)=>{
    const card=el('article','fn-shot-card');
    const button=el('button','fn-shot-button');button.type='button';button.setAttribute('aria-label','View photograph '+(i+1)+': '+p.title);button.append(crop(i));button.addEventListener('click',()=>open(i));
    const detail=el('div','fn-shot-caption');detail.append(el('span','fn-shot-number',String(i+1).padStart(2,'0')+' / 07 · '+p.label));detail.append(el('h3','',p.title));detail.append(el('p','',p.detail));card.append(button,detail);grid.append(card);
  });
  section.insertBefore(grid,dialog);
  section.append(el('p','fn-shot-footnote','Authentic screenshots supplied by the player. Compressed previews (320 × 180 pixels each); no AI replacements. The quest log and chat describe historical snapshots, not automatic game synchronization. No hand-in to Goldshire NPCs is assumed.'));
  root.prepend(section);
  if(location.hash==='#'+albumId)requestAnimationFrame(()=>section.scrollIntoView({block:'start'}));
 }
 function links(){
  if(page==='home'){
    const links=document.querySelector('.first-night-links');
    if(links&&!links.querySelector('.goldshire-album-link')){const a=el('a','goldshire-album-link','7 Goldshire screenshots ↗');a.href='gallery.html#'+albumId;links.append(a)}
  }else if(page==='xuthar'){
    const links=document.querySelector('.xu-first-night .first-night-links');
    if(links&&!links.querySelector('.goldshire-album-link')){const a=el('a','goldshire-album-link','See 7 Goldshire photographs ↗');a.href='gallery.html#'+albumId;links.append(a)}
  }
 }
 if(page==='gallery') {
   load().then(src=>{if(document.querySelector('#main .body-space'))showAlbum(src);else window.addEventListener('DOMContentLoaded',()=>showAlbum(src),{once:true})}).catch(e=>console.warn('Goldshire gallery:',e.message));
 }else{
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',links,{once:true});
   else requestAnimationFrame(links);
 }
})();