(() => {
  'use strict';
  if(document.body.dataset.page!=='lore')return;
  const data=window.AZEROTH_ATLAS;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root=document.createElement('section');root.id='azeroth-atlas';root.className='azeroth-atlas';root.setAttribute('aria-labelledby','atlas-title');
  const regional=data.places.filter(p=>p.region!=='other').length;
  root.innerHTML=`<header class="atlas-heading"><div><span class="eyebrow">The cartographer’s desk</span><h2 id="atlas-title">The Atlas of Azeroth</h2><p>Follow the continents, find a familiar road, and look closer. Explore the game’s maps, from the old kingdoms to worlds beyond the Dark Portal.</p></div><span class="atlas-badge">16 regions · ${regional} regional places</span></header><div class="atlas-layout"><aside class="atlas-controls" aria-label="Choose a map"><div><label for="atlas-region">Region or world</label><select id="atlas-region"><option value="all">All places & instances</option>${data.regions.map(r=>`<option value="${r.id}">${esc(r.name)}${r.world==='Beyond Azeroth'?' · Other world':''}</option>`).join('')}</select></div><div><label for="atlas-search">Find a zone or place</label><input id="atlas-search" type="search" placeholder="Duskwood, Stormwind, Nagrand…" autocomplete="off"></div><p class="atlas-result-count" aria-live="polite"></p><div class="atlas-results" aria-label="Map results"></div></aside><div class="atlas-view"><div class="atlas-toolbar" aria-label="Map controls"><button type="button" data-atlas="out" aria-label="Zoom out">−</button><span class="atlas-zoom" aria-live="polite">100%</span><button type="button" data-atlas="in" aria-label="Zoom in">+</button><button type="button" data-atlas="reset">Fit map</button><button type="button" data-atlas="world">Azeroth</button><button type="button" data-atlas="wide" aria-pressed="false">Expand map</button></div><div class="atlas-frame" tabindex="0" role="group" aria-label="Interactive map. Arrow keys pan; plus and minus zoom. Click to mark a location."><div class="atlas-layer"><img alt="" draggable="false"><div class="atlas-markers"></div><span class="atlas-pin" hidden aria-hidden="true">◆</span></div><div class="atlas-map-error" hidden><h3>This map is not available in the atlas.</h3><p>Use the reference link below to explore this place on Wowhead.</p></div></div><div class="atlas-panning" aria-label="Pan map"><button type="button" data-atlas="left" aria-label="Pan left">←</button><button type="button" data-atlas="up" aria-label="Pan up">↑</button><button type="button" data-atlas="down" aria-label="Pan down">↓</button><button type="button" data-atlas="right" aria-label="Pan right">→</button><button type="button" data-atlas="clear">Clear marker</button></div><p class="atlas-help">Drag to explore · Use + / − to zoom · Pinch on touchscreens · Ctrl + mouse wheel to zoom · Select a region marker or choose a place from the list.</p><p class="atlas-coordinate" role="status" aria-live="polite"></p><div class="atlas-selected" aria-live="polite"></div></div></div><p class="atlas-credit">Map artwork © Blizzard Entertainment, served by <a href="https://www.wowhead.com/maps" target="_blank" rel="noopener noreferrer">Wowhead Maps</a>. Names and geography follow the selected game map; historical phases may differ. The regional index covers outdoor zones and major hubs; <strong>All places & instances</strong> searches ${data.places.length.toLocaleString('en-US')} database entries, including instances and alternate phases. Some entries have no map image. Reviewed ${esc(data.reviewed)}. Markers are local to this page and do not track a character or calculate routes.</p>`;
  document.querySelector('#contents').before(root);
  document.querySelector('.lore-cover .buttons').insertAdjacentHTML('beforeend','<a class="button" href="#azeroth-atlas">Explore the atlas</a>');
  const regionInput=root.querySelector('#atlas-region'),search=root.querySelector('#atlas-search'),results=root.querySelector('.atlas-results'),frame=root.querySelector('.atlas-frame'),layer=root.querySelector('.atlas-layer'),image=layer.querySelector('img'),error=root.querySelector('.atlas-map-error'),pin=root.querySelector('.atlas-pin');
  let chosen=null,z=1,x=0,y=0,pointer=null,moved=false,pinchStart=null;
  const pointers=new Map();
  const byRegion=id=>data.regions.find(r=>r.id===id);
  const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'');
  function renderResults(){
    const q=normal(search.value.trim()),r=regionInput.value;
    let entries=[];
    if(!q && (r==='r-1'||r==='all'))entries.push(...data.regions.map(g=>({...g,key:g.id,kind:'region'})));
    else if(r!=='all'&&!q){const g=byRegion(r);if(g&&g.map!==null)entries.push({...g,key:g.id,kind:'region'});}
    let found=data.places.filter(p=>(q?(r==='all'||r==='r-1'||p.region===r):r==='all'||p.region===r)&&(!q||normal(p.name).includes(q)));
    // World overview offers regional maps first; use All places or search for the full index.
    if(!q&&r==='r-1')found=[];
    entries.push(...found.map(p=>({...p,key:'p'+p.id,kind:'place'})));
    root.querySelector('.atlas-result-count').textContent=entries.length+' results'+(entries.length>80?' · First 80 shown; narrow your search':'');
    results.innerHTML=entries.slice(0,80).map(p=>`<button type="button" data-map="${esc(p.key)}" aria-pressed="${chosen?.key===p.key}">${esc(p.name)}<small>${p.kind==='region'?esc(p.world)+' · Region map':esc(byRegion(p.region)?.name||'Instance, phase or other place')}</small></button>`).join('')||'<p class="atlas-empty">No places found. Try another name or select All places & instances.</p>';
  }
  function transform(){const maxX=(z-1)*frame.clientWidth/2,maxY=(z-1)*frame.clientHeight/2;x=Math.max(-maxX,Math.min(maxX,x));y=Math.max(-maxY,Math.min(maxY,y));layer.style.transform=`translate(${x}px,${y}px) scale(${z})`;root.querySelector('.atlas-zoom').textContent=Math.round(z*100)+'%';}
  function zoom(value){z=Math.max(1,Math.min(6,value));transform();}
  function reset(){z=1;x=0;y=0;transform();}
  function clear(){pin.hidden=true;root.querySelector('.atlas-coordinate').textContent='';}
  function select(key,updateHash=false){
    const item=key.startsWith('p')?data.places.find(p=>p.id===Number(key.slice(1))):byRegion(key);if(!item)return;
    chosen={...item,key};const region=key.startsWith('p')?byRegion(item.region):item,map=key.startsWith('p')?item.id:item.map;
    if(map===null){const first=data.places.find(p=>p.region===item.id);if(first)return select('p'+first.id,updateHash);return;}
    reset();clear();error.hidden=true;image.hidden=false;image.alt=item.name+' — World of Warcraft game map';image.src=`https://wow.zamimg.com/images/wow/maps/enus/zoom/${map}${item.floor?'-'+item.floor:''}.jpg`;
    const isWorld=key==='r-1';root.querySelector('.atlas-markers').innerHTML=isWorld?data.regions.filter(r=>r.spot).map(r=>`<button class="atlas-marker" type="button" style="left:${r.spot[0]}%;top:${r.spot[1]}%" data-map="${r.id}" aria-label="Explore ${esc(r.name)}" title="${esc(r.name)}">◇</button>`).join(''):'';
    const source=`https://www.wowhead.com/maps?data=${map}${item.floor?'.'+item.floor:''}`;
    root.querySelector('.atlas-selected').innerHTML=`<span class="eyebrow">${key.startsWith('p')?'Zone / place':'World / region'}</span><h3>${esc(item.name)}</h3><p>${esc(region?.name||'A place in the Warcraft database')}${(item.world||region?.world)==='Beyond Azeroth'?' · A world beyond Azeroth':''}. Read the names on the map to find roads, settlements and landmarks.</p><div class="buttons"><a class="button" href="${source}" target="_blank" rel="noopener noreferrer">Explore on Wowhead ↗</a>${item.href?`<a class="button" href="${esc(item.href)}" target="_blank" rel="noopener noreferrer">Place details ↗</a>`:''}${region?.chapter?`<a class="button" href="#${region.chapter}">Read the related lore</a>`:''}<a class="button" href="#atlas-${esc(key)}">Link to this map</a></div>`;
    renderResults();if(updateHash)history.replaceState(null,'','#atlas-'+key);
  }
  image.addEventListener('error',()=>{image.hidden=true;error.hidden=false;});
  image.addEventListener('load',()=>{image.hidden=false;error.hidden=true;});
  root.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;const key=b.dataset.map;if(key.startsWith('r')){regionInput.value=key;search.value='';}select(key,true);});
  regionInput.value='r-1';
  regionInput.addEventListener('change',()=>{search.value='';renderResults();if(regionInput.value!=='all')select(regionInput.value,true);});
  search.addEventListener('input',renderResults);
  root.querySelectorAll('[data-atlas]').forEach(button=>button.addEventListener('click',()=>{
    const action=button.dataset.atlas;
    if(action==='in')zoom(z*1.3);if(action==='out')zoom(z/1.3);if(action==='reset')reset();if(action==='clear')clear();
    if(action==='world'){regionInput.value='r-1';search.value='';select('r-1',true);}
    if(action==='wide'){const expanded=root.classList.toggle('atlas-wide');button.setAttribute('aria-pressed',String(expanded));button.textContent=expanded?'Close expanded map':'Expand map';transform();}
    if(['left','right','up','down'].includes(action)){x+=action==='left'?60:action==='right'?-60:0;y+=action==='up'?60:action==='down'?-60:0;transform();}
  }));
  frame.addEventListener('keydown',e=>{const moves={ArrowLeft:[50,0],ArrowRight:[-50,0],ArrowUp:[0,50],ArrowDown:[0,-50]};if(moves[e.key]){e.preventDefault();x+=moves[e.key][0];y+=moves[e.key][1];transform();}if(['+','=','-'].includes(e.key)){e.preventDefault();zoom(e.key==='-'?z/1.3:z*1.3);}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('atlas-wide'))root.querySelector('[data-atlas="wide"]').click();});
  frame.addEventListener('wheel',e=>{if(!e.ctrlKey)return;e.preventDefault();zoom(z*(e.deltaY<0?1.15:1/1.15));},{passive:false});
  frame.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;if(e.pointerType==='mouse'&&e.button!==0)return;frame.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);pointer={id:e.pointerId,sx:e.clientX,sy:e.clientY,x,y};moved=false;frame.classList.add('is-dragging');if(pointers.size===2){const a=[...pointers.values()];pinchStart={distance:Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]),z};moved=true;}});
  frame.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===2&&pinchStart){const a=[...pointers.values()];zoom(pinchStart.z*Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])/Math.max(1,pinchStart.distance));moved=true;}else if(pointer?.id===e.pointerId){const dx=e.clientX-pointer.sx,dy=e.clientY-pointer.sy;if(Math.hypot(dx,dy)>6)moved=true;x=pointer.x+dx;y=pointer.y+dy;transform();}});
  const end=e=>{if(!pointers.has(e.pointerId))return;const wasPinch=!!pinchStart;pointers.delete(e.pointerId);if(!moved&&!wasPinch&&e.type==='pointerup'&&error.hidden){const r=layer.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*100,py=(e.clientY-r.top)/r.height*100;pin.style.left=px+'%';pin.style.top=py+'%';pin.hidden=false;root.querySelector('.atlas-coordinate').textContent=`Marked on ${chosen.name}: ${px.toFixed(1)}%, ${py.toFixed(1)}% · Map-relative coordinates`; }pinchStart=null;pointer=null;frame.classList.remove('is-dragging');};
  frame.addEventListener('pointerup',end);frame.addEventListener('pointercancel',end);window.addEventListener('resize',transform);
  function readHash(){const key=location.hash.startsWith('#atlas-')?location.hash.slice(7):'';if(key){select(key);requestAnimationFrame(()=>root.scrollIntoView({block:'start',behavior:'instant'}));}else if(root.classList.contains('atlas-wide'))root.querySelector('[data-atlas="wide"]').click();}
  root.addEventListener('keydown',e=>{if(e.key!=='Tab'||!root.classList.contains('atlas-wide'))return;const controls=[...root.querySelectorAll('a[href],button,input,select,[tabindex="0"]')].filter(el=>el.getBoundingClientRect().width>0);const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
  select('r-1');readHash();window.addEventListener('hashchange',readHash);
})();
