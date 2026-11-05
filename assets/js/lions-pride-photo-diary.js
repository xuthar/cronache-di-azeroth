/* Lion's Pride Inn — real gameplay photo diary. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  if(!['gallery','home','xuthar'].includes(page))return;
  const galleryId='lions-pride-inn-gallery';
  const atlas='assets/data/xuthar-lions-pride-four-atlas.b64?v=20261105-inn-four-01';
  const pics=[
    ['The Hearth of Goldshire','12:32 · THE INN','Xuthar enters the Lion’s Pride Inn. The great brick hearth, candlelit tables and Melika Isenstrider appear in the common room.'],
    ['At the Innkeeper’s Side','12:33 · FARLEY','Xuthar stands beside Innkeeper Farley. Barkeep Dobbins and Brog Hamfist are visible beyond the counter. Quest turn-in is not confirmed.'],
    ['The Cook and the Butcher','12:35 · THE KITCHEN','Tomas the Cook and Toddrick the Butcher are visible. The image confirms the visit, but not learning Cooking.'],
    ['The Last Witness Rests','12:38 · THE QUIET HOUR','Xuthar sits on a chair near the bar, taking a genuine pause after his journey from Northshire.']
  ];
  const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const frame=(i,cls='')=>{const e=node('span','fn-photo-frame lpi-photo-frame '+cls);e.style.backgroundPosition=(i%2*100)+'% '+(Math.floor(i/2)*100)+'%';e.setAttribute('role','img');e.setAttribute('aria-label',pics[i][2]);return e;};
  async function imageUrl(){const r=await fetch(atlas,{cache:'force-cache'});if(!r.ok)throw Error('Inn photo atlas unavailable');const s=(await r.text()).trim();if(s.length!==14236||!/^[A-Za-z0-9+/]+={0,2}$/.test(s))throw Error('Invalid inn photo atlas');return 'data:image/avif;base64,'+s;}
  function gallery(url){
    const root=document.querySelector('#main .body-space');
    if(!root||document.getElementById(galleryId))return;
    const section=node('section','fn-gallery lpi-gallery');
    section.id=galleryId;section.setAttribute('aria-labelledby','lpi-title');
    section.style.setProperty('--fn-atlas','url("'+url+'")');
    const head=node('div','fn-gallery-heading'), copy=node('div','');
    copy.append(node('span','fn-overline','5 NOVEMBER 2026 · FOUR ACTUAL GAMEPLAY PHOTOGRAPHS'));
    const title=node('h2','','The Hearth of Goldshire');title.id='lpi-title';copy.append(title);
    copy.append(node('p','','The first true moment of rest in Xuthar’s journey: the Lion’s Pride Inn, its keeper, its kitchen and its warmth.'));
    const book=node('a','fn-gallery-link','Read Chapter XVI ↗');book.href='book.html?character=xuthar#x-lions-pride-hearth';head.append(copy,book);section.append(head);
    const grid=node('div','fn-gallery-grid');
    const dialog=node('dialog','fn-photo-dialog');dialog.setAttribute('aria-label','Lion’s Pride Inn photo viewer');
    const panel=node('div','fn-dialog-inner');
    const close=node('button','fn-dialog-close','Close ×');close.type='button';
    const full=frame(0,'fn-dialog-frame'),caption=node('p','fn-dialog-caption',''), nav=node('div','fn-dialog-navigation');
    const prev=node('button','','← Previous'),next=node('button','','Next →');prev.type=next.type='button';nav.append(prev,next);panel.append(close,full,caption,nav);dialog.append(panel);
    let active=0;
    function update(i){active=(i+pics.length)%pics.length;full.style.backgroundPosition=(active%2*100)+'% '+(Math.floor(active/2)*100)+'%';full.setAttribute('aria-label',pics[active][2]);caption.textContent=(active+1)+' / 4 — '+pics[active][0]+'. '+pics[active][2];}
    function open(i){update(i);dialog.showModal();}
    close.addEventListener('click',()=>dialog.close());prev.addEventListener('click',()=>update(active-1));next.addEventListener('click',()=>update(active+1));
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();update(active-1)}else if(e.key==='ArrowRight'){e.preventDefault();update(active+1)}});
    pics.forEach((p,i)=>{
      const card=node('article','fn-shot-card'),button=node('button','fn-shot-button');button.type='button';
      button.setAttribute('aria-label','View photograph '+(i+1)+': '+p[0]);
      button.append(frame(i));button.addEventListener('click',()=>open(i));
      const text=node('div','fn-shot-caption');text.append(node('span','fn-shot-number',(i+1)+' / 4 · '+p[1]));text.append(node('h3','',p[0]));text.append(node('p','',p[2]));card.append(button,text);grid.append(card);
    });
    section.append(grid,dialog,node('p','fn-shot-footnote','Player-supplied screenshots, 5 November 2026. Compressed 480×270 pixel previews; original gameplay files remain separate. Being near Farley or Tomas does not prove completing their quests or learning professions.'));
    root.prepend(section);
    if(location.hash==='#'+galleryId)requestAnimationFrame(()=>section.scrollIntoView({block:'start'}));
  }
  function links(){
    const target=page==='home'?document.querySelector('.first-night-links'):document.querySelector('.xu-first-night .first-night-links');
    if(target&&!target.querySelector('.lpi-gallery-link')){
      const a=node('a','lpi-gallery-link','Four photos inside the inn ↗');a.href='gallery.html#'+galleryId;target.append(a);
    }
  }
  if(page==='gallery')imageUrl().then(u=>requestAnimationFrame(()=>gallery(u))).catch(e=>console.warn('Inn photos: '+e.message));
  else if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(links),{once:true});
  else requestAnimationFrame(links);
})();