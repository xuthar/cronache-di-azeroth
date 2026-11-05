/* Chronicles of Azeroth — evolving interactive character book.
 * Data lives in assets/data/character-books.json. Only published entries are rendered.
 * Every fictional chapter is labelled; no event is inferred from in-game stats.
 */
(() => {
  'use strict';
  if(document.body.dataset.page !== 'book') return;
  const $ = s => document.querySelector(s);
  const spread=$('#book-spread'),shell=$('#book-shell'),previous=$('#book-previous'),next=$('#book-next');
  const chapters=$('#book-chapters'), counter=$('#book-page-count'),progress=$('#book-progress');
  const printRoot=$('#book-print-pages'),title=$('#book-reader-heading'),subtitle=$('#book-subheading');
  const mobile=window.matchMedia('(max-width: 710px)');
  const select=new URLSearchParams(location.search).get('character');
  const requested=['xuthar','thorgar','aelyndra'].includes(select) ? select : 'xuthar';
  const safeImage=raw => /^assets\/images\/gallery\/[a-zA-Z0-9._-]+\.(?:jpg|webp|png)$/.test(String(raw||'')) ? raw : '';
  const make=(tag,className,text)=>{
    const el=document.createElement(tag);
    if(className)el.className=className;
    if(text!==undefined)el.textContent=text;
    return el;
  };
  let leaves=[],current=0,volume=null;
  function makeImage(path,alt){
    const safe=safeImage(path);
    if(!safe)return null;
    const img=make('img','book-art');
    img.src=safe;img.alt=alt||'Illustrative scene from the Chronicles of Azeroth gallery';
    img.decoding='async';img.loading='lazy';return img;
  }
  function kindLabel(kind){
    return kind==='pending' ? 'NEXT CHAPTER · NOT YET PLAYED'
      : kind==='verified' ? 'VERIFIED GAMEPLAY' : kind==='reported' ? 'PLAYER-REPORTED ADVENTURE'
      : 'ORIGINAL ROLEPLAY FICTION';
  }
  function bookPage(page,index,printMode=false){
    const outer=make('article','book-page book-kind-'+(page.type||page.kind));
    outer.dataset.leaf=page.id;
    const inside=make('div','book-page-inner');
    outer.append(inside);
    if(page.type==='cover'){
      outer.classList.add('book-cover');
      const image=makeImage(volume.cover,'Fantasy landscape illustrating '+volume.name);
      if(image) inside.append(image);
      inside.append(make('div','book-cover-vignette'));
      const content=make('div','book-cover-ink');
      content.append(make('small','book-cover-collection','CHRONICLES OF AZEROTH · '+(volume.priority==='main'?'VOLUME I':volume.id==='thorgar'?'VOLUME II':'VOLUME III')));
      content.append(make('span','book-cover-sigil',volume.symbol));
      content.append(make('h2','book-cover-title',volume.title));
      content.append(make('p','book-cover-subtitle',volume.subtitle));
      content.append(make('div','book-cover-rule'));
      content.append(make('span','book-cover-character',volume.name));
      content.append(make('small','book-cover-status',volume.priority==='main'?'The first story unfolds':'Reserved for future play'));
      inside.append(content);
    } else if(page.type==='contents') {
      inside.append(make('span','book-page-kicker','THE TABLE OF CONTENTS'));
      inside.append(make('h2','book-toc-title','Within these pages'));
      inside.append(make('p','book-toc-intro','The story begins in imagined memory. Every adventure recorded after launch will be distinguished from the fictional prologue.'));
      const toc=make('ol','book-toc-list');
      const seen=new Set();
      volume.pages.forEach((p,i)=>{
        if(seen.has(p.chapter))return;
        seen.add(p.chapter);
        const li=make('li');
        if(printMode) li.append(make('span','book-toc-item',p.chapter));
        else {
          const btn=make('button','book-toc-item',p.chapter);
          btn.type='button';btn.addEventListener('click',()=>goto(i+2));
          li.append(btn);
        }
        li.append(make('span','book-toc-page',String(i+3).padStart(2,'0')));
        toc.append(li);
      });
      inside.append(toc);
      inside.append(make('div','book-toc-note','A book that grows only when its traveller has taken another step.'));
    } else if(page.type==='endpaper'){
      outer.classList.add('book-endpaper');
      inside.append(make('span','book-endmark',volume.symbol));
      inside.append(make('h2','','The story continues.'));
      inside.append(make('p','','The next page is waiting for a real journey.'));
    } else {
      inside.append(make('span','book-page-kicker',page.chapter||'THE CHRONICLE'));
      inside.append(make('h2','book-page-title',page.title||'Untitled'));
      inside.append(make('div','book-page-type',kindLabel(page.kind)));
      if(page.image) {
        const frame=make('figure','book-figure');
        const img=makeImage(page.image,page.caption||'Illustrative archive image');
        if(img) frame.append(img);
        if(page.caption)frame.append(make('figcaption','',page.caption));
        inside.append(frame);
      }
      const body=make('div','book-prose');
      for(const paragraph of page.paragraphs||[]) body.append(make('p','',paragraph));
      inside.append(body);
      if(page.kind==='pending'){
        const link=make('a','book-next-writing-link','View the character dossier →');
        link.href=volume.dossier;
        inside.append(link);
      }
      if(page.signed)inside.append(make('p','book-signature','— '+page.signed));
    }
    inside.append(make('span','book-leaf-number',index===0?'THE COVER':index===1?'CONTENTS':String(index-1).padStart(2,'0')));
    if(printMode)outer.querySelectorAll('img').forEach(img=>img.loading='eager');
    return outer;
  }
  function getSpreadIndex(i){
    if(mobile.matches)return Math.max(0,Math.min(i,leaves.length-1));
    return Math.max(0,Math.min(Math.floor(i/2)*2,Math.max(0,Math.ceil(leaves.length/2)*2-2)));
  }
  function status(){
    const last=Math.min(current+(mobile.matches?1:2),leaves.length);
    return 'Pages '+(current+1)+(last>current+1?'–'+last:'')+' of '+leaves.length;
  }
  function updateUrl(index){
    const page=leaves[index];if(!page)return;
    try{
      const url=new URL(location.href);
      url.hash=page.id;
      history.replaceState(null,'',url.toString());
      localStorage.setItem('azeroth-book-'+volume.id,page.id);
    }catch{}
  }
  function render(direction=''){
    if(!volume)return;
    current=getSpreadIndex(current);
    spread.replaceChildren();
    const count=mobile.matches?1:2;
    for(let i=current;i<current+count;i++){
      if(i<leaves.length){const leaf=bookPage(leaves[i],i);leaf.classList.add(i===current?'book-page--left':'book-page--right');spread.append(leaf);}
      else spread.append(make('div','book-page book-empty-page'));
    }
    shell.classList.remove('book-turn-forward','book-turn-back');
    void shell.offsetWidth;
    if(direction) shell.classList.add(direction==='next'?'book-turn-forward':'book-turn-back');
    previous.disabled=current===0;
    next.disabled=current+count>=leaves.length;
    counter.textContent=status();progress.textContent=status();
    const active=leaves[current];
    const selected=active.type==='chapter'?active.chapter:'';
    if(selected && [...chapters.options].some(x=>x.value===selected))chapters.value=selected;
    else chapters.value='';
    updateUrl(current);
  }
  function goto(i){
    const target=getSpreadIndex(i);
    const direction=target>current?'next':target<current?'prev':'';
    current=target;
    render(direction);
  }
  function currentFromHash(){
    let id='';
    try{id=decodeURIComponent(location.hash.slice(1));}catch{}
    const idx=leaves.findIndex(x=>x.id===id);
    if(idx>=0)return idx;
    try{
      const previousId=localStorage.getItem('azeroth-book-'+volume.id);
      const saved=leaves.findIndex(x=>x.id===previousId);
      if(saved>=0)return saved;
    }catch{}
    return 0;
  }
  function makeVolumeBooks(data){
    volume=data.volumes.find(x=>x.id===requested)||data.volumes[0];
    leaves=[{id:volume.id+'-cover',type:'cover'},{id:volume.id+'-contents',type:'contents'},...volume.pages.map(p=>({...p,type:'chapter'}))];
    if(leaves.length%2) leaves.push({id:volume.id+'-end',type:'endpaper'});
    title.textContent=volume.title;
    subtitle.textContent=volume.name+' · '+volume.subtitle;
    $('#book-dossier-link').href=volume.dossier;
    $('#book-volume-list').querySelectorAll('a').forEach(a=>{
      const yes=new URL(a.href).searchParams.get('character')===volume.id;
      a.classList.toggle('is-selected',yes);
      if(yes)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    chapters.replaceChildren();
    const selectPlaceholder=make('option','','Select a chapter…');selectPlaceholder.value='';chapters.append(selectPlaceholder);
    const seen=new Set();
    volume.pages.forEach(p=>{
      if(seen.has(p.chapter))return;seen.add(p.chapter);
      const option=make('option','',p.chapter);
      option.value=p.chapter;chapters.append(option);
    });
    chapters.addEventListener('change',()=>{
      const idx=leaves.findIndex(p=>p.chapter===chapters.value);
      if(idx>=0)goto(idx);
    });
    printRoot.replaceChildren();
    const header=make('div','book-print-cover-heading','CHRONICLES OF AZEROTH  ·  '+volume.name);
    printRoot.append(header);
    leaves.forEach((p,i)=>printRoot.append(bookPage(p,i,true)));
    current=currentFromHash();render();
    document.title=volume.title+' | The Books of Azeroth';
  }
  previous.addEventListener('click',()=>goto(current-(mobile.matches?1:2)));
  next.addEventListener('click',()=>goto(current+(mobile.matches?1:2)));
  $('#book-print').addEventListener('click',()=>window.print());
  document.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented||!volume)return;
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||''))return;
    if(e.key==='ArrowRight'){e.preventDefault();if(!next.disabled)next.click();}
    if(e.key==='ArrowLeft'){e.preventDefault();if(!previous.disabled)previous.click();}
  });
  let touchX=null,touchY=null;
  spread.addEventListener('touchstart',e=>{
    if(e.touches.length===1){touchX=e.touches[0].clientX;touchY=e.touches[0].clientY;}
  },{passive:true});
  spread.addEventListener('touchend',e=>{
    if(touchX===null||!e.changedTouches.length)return;
    const dx=e.changedTouches[0].clientX-touchX;
    const dy=e.changedTouches[0].clientY-touchY;
    touchX=null;touchY=null;
    if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.4)return;
    if(dx<0&&!next.disabled)next.click();
    if(dx>0&&!previous.disabled)previous.click();
  },{passive:true});
  mobile.addEventListener('change',()=>render());
  const menu=$('.menu-toggle'),nav=$('#navigation');
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=menu.getAttribute('aria-expanded')!=='true';
      menu.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('is-open',open);
      menu.textContent=open?'Close':'Menu';
    });
  }
  fetch('assets/data/character-books.json?v=20261105-eight-screenshots-02',{cache:'no-cache'})
    .then(res=>{if(!res.ok)throw Error('Cannot load book data');return res.json();})
    .then(data=>{
      if(data.schemaVersion!==1||!Array.isArray(data.volumes))throw Error('Unsupported book catalogue');
      makeVolumeBooks(data);
    })
    .catch(()=>{
      spread.replaceChildren(make('p','book-error','The book archive is temporarily unavailable. You can still read the characters’ full biographies through the links above.'));
      counter.textContent='Archive unavailable';progress.textContent='Unable to load';
      previous.disabled=true;next.disabled=true;
    });
})();
