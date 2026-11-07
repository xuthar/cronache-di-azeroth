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
  // One source chapter becomes several short reading leaves; the JSON narrative stays untouched.
  // Mobile deliberately shows shorter pages than the two-page desktop spread.
  const TOC_PER_LEAF=8;
  let leaves=[],current=0,focused=0,volume=null;
  function paginateChapter(chapter,compact=false){
    const paragraphs=Array.isArray(chapter.paragraphs)?chapter.paragraphs:[];
    if(!paragraphs.length)return [{...chapter,type:'chapter',sourceId:chapter.id,sourceParagraphStart:0,part:1,partTotal:1}];
    const maxCharacters=compact==='print'?1550:compact?570:820;
    const maxParagraphs=compact==='print'?4:2;
    const parts=[];let group=[],characters=0,start=0;
    for(let i=0;i<paragraphs.length;i++){
      const text=String(paragraphs[i]);
      const firstIllustrated=!!chapter.image&&parts.length===0;
      if(group.length && (group.length>=(firstIllustrated?1:maxParagraphs)||characters+text.length>maxCharacters)){
        parts.push({paragraphs:group,start});group=[];characters=0;
      }
      if(!group.length)start=i;
      group.push(text);characters+=text.length;
    }
    if(group.length)parts.push({paragraphs:group,start});
    return parts.map((piece,i)=>({
      ...chapter,type:'chapter',
      id:i===0?chapter.id:chapter.id+'--part-'+(i+1),
      sourceId:chapter.id,sourceParagraphStart:piece.start,
      part:i+1,partTotal:parts.length,continuation:i>0,
      paragraphs:piece.paragraphs,
      image:i===0?chapter.image:undefined,
      caption:i===0?chapter.caption:undefined,
      signed:i===parts.length-1?chapter.signed:undefined
    }));
  }
  function buildLeaves(compact=false){
    // Multiple named story sections may belong to one numbered chapter.
    // Preserve their original anchors, but display the chapter heading only once.
    const sectionTotals=new Map(),sectionPositions=new Map();
    for(const p of volume.pages)sectionTotals.set(p.chapter,(sectionTotals.get(p.chapter)||0)+1);
    const chapterLeaves=volume.pages.flatMap(p=>{
      const sectionIndex=(sectionPositions.get(p.chapter)||0)+1;
      sectionPositions.set(p.chapter,sectionIndex);
      return paginateChapter(p,compact).map(leaf=>({
        ...leaf,
        sectionIndex,
        sectionCount:sectionTotals.get(p.chapter),
        isChapterOpening:sectionIndex===1&&!leaf.continuation
      }));
    });
    const chapterList=[],seen=new Set();
    for(const p of volume.pages){
      if(seen.has(p.chapter))continue;
      seen.add(p.chapter);chapterList.push({chapter:p.chapter,sourceId:p.id});
    }
    const tocCount=Math.max(1,Math.ceil(chapterList.length/TOC_PER_LEAF));
    const contents=Array.from({length:tocCount},(_,i)=>({
      id:volume.id+'-contents'+(i?'-'+(i+1):''),type:'contents',
      tocPageNumber:i+1,tocPageCount:tocCount,
      tocItems:chapterList.slice(i*TOC_PER_LEAF,(i+1)*TOC_PER_LEAF).map(c=>{
        const index=chapterLeaves.findIndex(p=>p.id===c.sourceId);
        return {chapter:c.chapter,leafIndex:index+1+tocCount};
      })
    }));
    const result=[{id:volume.id+'-cover',type:'cover'},...contents,...chapterLeaves];
    if(result.length%2)result.push({id:volume.id+'-end',type:'endpaper'});
    return result;
  }
  function makeImage(path,alt){
    const safe=safeImage(path);
    if(!safe)return null;
    const img=make('img','book-art');
    img.src=safe;img.alt=alt||'Illustrative scene from the Chronicles of Azeroth gallery';
    img.decoding='async';img.loading='lazy';return img;
  }
  function kindLabel(kind){
    if(volume?.id==='xuthar')return kind==='pending' ? 'A LIFE STILL UNFOLDING' : 'THE BOOK OF FORGOTTEN NAMES';
    return kind==='pending' ? 'THE ROAD AHEAD' : 'A CHRONICLE OF AZEROTH';
  }
  function bookPage(page,index,printMode=false){
    const outer=make('article','book-page book-kind-'+(page.type||page.kind));
    outer.dataset.leaf=page.id;
    if(page.type==='chapter')outer.setAttribute('aria-label',(page.chapter||'Chapter')+(page.partTotal>1?' · reading page '+page.part+' of '+page.partTotal:''));
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
      inside.append(make('span','book-page-kicker','THE TABLE OF CONTENTS · '+page.tocPageNumber+' / '+page.tocPageCount));
      inside.append(make('h2','book-toc-title',page.tocPageNumber===1?'Within these pages':'Within these pages · Continued'));
      inside.append(make('p','book-toc-intro',page.tocPageNumber===1
        ?(volume.id==='xuthar'
          ?'From the forgotten names of a quiet childhood to the distant roads of Elwynn, the life of Xuthar Morvayne unfolds one chapter at a time.'
          :'An unfolding tale of memory, choice and the roads still waiting.')
        :'Another turn of the page; another chapter in the living chronicle.'));
      const toc=make('ol','book-toc-list');
      for(const item of page.tocItems||[]){
        const li=make('li');
        if(printMode)li.append(make('span','book-toc-item',item.chapter));
        else{
          const btn=make('button','book-toc-item',item.chapter);
          btn.type='button';btn.addEventListener('click',()=>goto(item.leafIndex));
          li.append(btn);
        }
        li.append(make('span','book-toc-page',String(item.leafIndex-page.tocPageCount).padStart(2,'0')));
        toc.append(li);
      }
      inside.append(toc);
      inside.append(make('div','book-toc-note','A life is never finished while another road remains.'));
    } else if(page.type==='endpaper'){
      outer.classList.add('book-endpaper');
      inside.append(make('span','book-endmark',volume.symbol));
      inside.append(make('h2','','The story continues.'));
      inside.append(make('p','','Beyond the last line, the road continues.'));
    } else {
      if(page.continuation){
        // Running continuation only: no reprinted chapter number or story title.
        outer.classList.add('book-page--continued');
        inside.append(make('span','book-page-kicker book-running-head','CONTINUED · '+page.part+' / '+page.partTotal));
      }else if(page.sectionIndex>1){
        // A genuine new section in the same chapter, not a second chapter opening.
        outer.classList.add('book-page--section');
        inside.append(make('span','book-page-kicker','SECTION '+page.sectionIndex+' OF '+page.sectionCount));
        inside.append(make('h2','book-section-heading',page.title||'Untitled'));
      }else{
        inside.append(make('span','book-page-kicker',page.chapter||'THE CHRONICLE'));
        inside.append(make('h2','book-page-title',page.title||'Untitled'));
        inside.append(make('div','book-page-type',kindLabel(page.kind)));
      }
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
      if(page.kind==='pending'&&(!page.partTotal||page.part===page.partTotal)){
        const link=make('a','book-next-writing-link','View the character dossier →');
        link.href=volume.dossier;
        inside.append(link);
      }
      if(page.signed)inside.append(make('p','book-signature','— '+page.signed));
      if(page.partTotal>1)inside.append(make('span','book-chapter-part','Page '+page.part+' of '+page.partTotal+(page.sectionCount>1?' · Section '+page.sectionIndex+'/'+page.sectionCount:'')));
    }
    inside.append(make('span','book-leaf-number',index===0?'THE COVER':page.type==='contents'?'CONTENTS '+page.tocPageNumber+'/'+page.tocPageCount:page.type==='endpaper'?'THE ROAD AHEAD':String(index-(leaves.filter(p=>p.type==='contents').length)).padStart(2,'0')));
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
  function render(direction='',preferredIndex=current){
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
    focused=Math.max(current,Math.min(preferredIndex,current+count-1,leaves.length-1));
    const active=leaves[focused];
    const selected=active.type==='chapter'?active.chapter:'';
    if(selected && [...chapters.options].some(x=>x.value===selected))chapters.value=selected;
    else chapters.value='';
    updateUrl(focused);
  }
  function goto(i){
    const target=getSpreadIndex(i);
    const direction=target>current?'next':target<current?'prev':'';
    current=target;
    render(direction,i);
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
    leaves=buildLeaves(mobile.matches);
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
    printRoot.append(make('div','book-print-cover-heading','CHRONICLES OF AZEROTH  ·  '+volume.name));
    // Fixed desktop-sized print pagination; changing screen size does not rewrite print pages.
    buildLeaves('print').forEach((p,i)=>printRoot.append(bookPage(p,i,true)));
    const requestedIndex=currentFromHash();
    current=getSpreadIndex(requestedIndex);
    render('',requestedIndex);
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
  mobile.addEventListener('change',()=>{
    if(!volume)return;
    const selected=leaves[focused]||leaves[current]||leaves[0];
    const sourceId=selected?.sourceId||selected?.id;
    const paragraph=selected?.sourceParagraphStart||0;
    leaves=buildLeaves(mobile.matches);
    let selectedIndex=leaves.findIndex(p=>p.id===sourceId);
    if(selectedIndex<0)selectedIndex=0;
    if(selected?.sourceId){
      const matches=leaves.map((p,i)=>({...p,leafIndex:i})).filter(p=>p.sourceId===sourceId&&p.sourceParagraphStart<=paragraph);
      if(matches.length)selectedIndex=matches.at(-1).leafIndex;
    }
    current=getSpreadIndex(selectedIndex);render('',selectedIndex);
  });
  const menu=$('.menu-toggle'),nav=$('#navigation');
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=menu.getAttribute('aria-expanded')!=='true';
      menu.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('is-open',open);
      menu.textContent=open?'Close':'Menu';
    });
  }
  fetch('assets/data/character-books.json?v=20261108-book-clean-headings',{cache:'no-cache'})
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
