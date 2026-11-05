/* Chronicles of Azeroth — visual records of Xuthar's first night.
   Eight user-supplied screenshots are displayed from a high-quality 2x4 WebP atlas,
   with 1400x788 pixels per photograph (source photographs 1920x1080). Frames retain their chronological order.
   No client, addon, Blizzard authentication or external tracking is involved. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  if(!['home','gallery','xuthar'].includes(page))return;
  const frames=[
    {title:'Here We Are',tag:'THE GATES OPEN',detail:'A sea of players gathers around Northshire Abbey. The crowd calls out: “HERE WE ARE”.'},
    {title:'A World Full of Names',tag:'NORTHSHIRE GATHERING',detail:'Adventurers gather by the abbey road near Deputy Willem. The opening night feels alive.'},
    {title:'The First Level',tag:'LEVEL 2 · WOLVES',detail:'Xuthar reaches level 2 while fighting wolves. Wolves Across the Border shows 5 of 8 Tough Wolf Meat.'},
    {title:'In the Timberwood',tag:'THE FOREST',detail:'Young Wolves and Timber Wolves beneath Northshire’s dark canopy.'},
    {title:'The Marshal’s Orders',tag:'LEVEL 3 · QUEST REWARD',detail:'Kobold Camp Cleanup completed. Marshal McBride offers Hallowed Letter and Investigate Echo Ridge.'},
    {title:'The Ridge Answers',tag:'LEVEL 4 · ECHO RIDGE',detail:'The quest log shows 9/10 Kobold Workers and 6/8 Stolen Books as Xuthar fights in the woods.'},
    {title:'Red Cloth among the Fields',tag:'THE DEFIAS',detail:'Xuthar approaches the Defias Thugs in the fenced fields beyond the forest.'},
    {title:'A Hammer and New Roads',tag:'LEVEL 5 · NEW ASSIGNMENTS',detail:'Deputy Willem, the Militia Hammer reward, Mining Consultant and Skirmish at Echo Ridge; Brotherhood of Thieves is ready for turn-in.'}
  ];
  const escaped=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const locate=i=>({x:(i%2)*100,y:(Math.floor(i/2)/3)*100});
  const frame=(i,cl='')=>{
    const pos=locate(i);
    const node=document.createElement('span');
    node.className='fn-photo-frame '+cl;
    node.style.backgroundPosition=pos.x+'% '+pos.y+'%';
    node.setAttribute('role','img');
    node.setAttribute('aria-label',frames[i].detail);
    return node;
  };
  const atlasUrl='assets/img/xuthar-northshire-hd.webp?v=20261105-hd-01';
  function loadAtlas(){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.onload=()=>img.naturalWidth===2800&&img.naturalHeight===3152
        ? resolve(atlasUrl) : reject(new Error('Unexpected Northshire image dimensions'));
      img.onerror=()=>reject(new Error('Northshire high-quality images could not be loaded'));
      img.src=atlasUrl;
    });
  }
  function gallery(atlas){
    const root=document.querySelector('#main .body-space');
    if(!root||document.querySelector('#forever-first-night-gallery'))return;
    const sec=document.createElement('section');
    sec.id='forever-first-night-gallery';
    sec.className='fn-gallery';
    sec.setAttribute('aria-labelledby','fn-gallery-title');
    sec.style.setProperty('--fn-atlas','url("'+atlas+'")');
    sec.innerHTML='<div class="fn-gallery-heading"><div><span class="fn-overline">5 November 2026 · Eight actual gameplay screenshots</span><h2 id="fn-gallery-title">The Night Azeroth Awoke</h2><p>From a thousand voices outside Northshire Abbey to the first wolves, cobolds, Defias and level five. Eight moments from Xuthar Morvayne’s first journey, preserved in chronological order.</p></div><a href="book.html?character=xuthar#x-live-1" class="fn-gallery-link">Read the living book ↗</a></div>';
    const grid=document.createElement('div');grid.className='fn-gallery-grid';
    frames.forEach((f,i)=>{
      const card=document.createElement('article');card.className='fn-shot-card';
      const button=document.createElement('button');button.type='button';button.className='fn-shot-button';button.setAttribute('aria-label','View screenshot '+(i+1)+': '+f.title);
      button.append(frame(i));
      const caption=document.createElement('div');caption.className='fn-shot-caption';
      caption.innerHTML='<span class="fn-shot-number">0'+(i+1)+' / 08 · '+escaped(f.tag)+'</span><h3>'+escaped(f.title)+'</h3><p>'+escaped(f.detail)+'</p>';
      card.append(button,caption);grid.append(card);
      button.addEventListener('click',()=>show(i));
    });
    sec.append(grid);
    const foot=document.createElement('p');foot.className='fn-shot-footnote';foot.textContent='Source: original player-provided 1920×1080 screenshots, 5 November 2026. High-quality WebP previews: 1400×788 pixels each, retaining fine text and scenery. Quest counters are historical snapshots, not proof of later completion. No automatic Blizzard API sync.';
    sec.append(foot);
    const dialog=document.createElement('dialog');dialog.className='fn-photo-dialog';dialog.setAttribute('aria-label','Northshire first-night screenshots');
    const panel=document.createElement('div');panel.className='fn-dialog-inner';
    const close=document.createElement('button');close.type='button';close.className='fn-dialog-close';close.textContent='Close ×';close.addEventListener('click',()=>dialog.close());
    const large=frame(0,'fn-dialog-frame');
    const label=document.createElement('p');label.className='fn-dialog-caption';
    const nav=document.createElement('div');nav.className='fn-dialog-navigation';
    const prev=document.createElement('button');prev.type='button';prev.textContent='← Previous';
    const next=document.createElement('button');next.type='button';next.textContent='Next →';
    nav.append(prev,next);panel.append(close,large,label,nav);dialog.append(panel);sec.append(dialog);
    let active=0;
    function update(i){active=(i+frames.length)%frames.length;const pos=locate(active);large.style.backgroundPosition=pos.x+'% '+pos.y+'%';large.setAttribute('aria-label',frames[active].detail);label.textContent=(active+1)+'/8 — '+frames[active].title+' · '+frames[active].detail;}
    function show(i){update(i);dialog.showModal();}
    prev.addEventListener('click',()=>update(active-1));next.addEventListener('click',()=>update(active+1));
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();update(active-1)}else if(e.key==='ArrowRight'){e.preventDefault();update(active+1)}});
    root.prepend(sec);
    if(location.hash==='#forever-first-night-gallery')requestAnimationFrame(()=>sec.scrollIntoView({block:'start'}));
  }
  function home(atlas){
    const figure=document.querySelector('.first-night-figure');
    if(!figure||figure.dataset.featuredAlbum==='inn')return;
    figure.classList.add('fn-with-photo');
    figure.style.setProperty('--fn-atlas','url("'+atlas+'")');
    const a=document.createElement('a');a.href='gallery.html#forever-first-night-gallery';a.className='fn-hero-photo-link';
    a.setAttribute('aria-label','View eight screenshots from Xuthar’s first night');
    a.append(frame(0,'fn-hero-photo'));
    const caption=document.createElement('span');caption.className='fn-hero-photo-caption';caption.textContent='REAL SCREENSHOT · NORTHSHIRE ABBEY · 5 NOVEMBER 2026 · VIEW THE PHOTO DIARY ↗';
    a.append(caption);figure.replaceChildren(a);
    const links=document.querySelector('.first-night-links');
    if(links&&!links.querySelector('.fn-see-photos')){
      const b=document.createElement('a');b.className='fn-see-photos';b.href='gallery.html#forever-first-night-gallery';b.textContent='Eight real screenshots ↗';links.append(b);
    }
  }
  function dossier(){
    const links=document.querySelector('.xu-first-night .first-night-links');
    if(links&&!links.querySelector('.fn-see-photos')){
      const a=document.createElement('a');a.href='gallery.html#forever-first-night-gallery';a.textContent='Eight screenshots from launch night ↗';a.className='fn-see-photos';links.append(a);
    }
  }
  if(page==='xuthar'){dossier();return}
  loadAtlas().then(a=>{if(page==='gallery')gallery(a);else if(page==='home')home(a)}).catch(e=>{
    // Keep existing illustrative cover and album links intact if previews fail.
    if(page==='gallery'){
      const root=document.querySelector('#main .body-space');if(root){
        const message=document.createElement('p');message.className='fn-shot-footnote';message.textContent='The first-night screenshot previews could not be loaded. The session is still recorded in the book and Travel Journal.';root.prepend(message);
      }
    }
    console.warn(e.message);
  });
})();