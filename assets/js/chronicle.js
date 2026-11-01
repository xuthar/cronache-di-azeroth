/* Chronicles of Azeroth · The Living Chronicle
   Prefers verified official Blizzard API data from live-blizzard; legacy addon is optional.
   Static fallback contains NO invented gameplay progress. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  if (page !== 'chronicle' && page !== 'home') return;
  const cast = [
    {id:'xuthar',name:'Xuthar Morvayne',descriptor:'Human · Shadow Priest',symbol:'☽',dossier:'xuthar.html'},
    {id:'thorgar',name:'Thorgar Ironbeard',descriptor:'Dwarf · Hunter',symbol:'✦',dossier:'thorgar.html'},
    {id:'aelyndra',name:'Aelyndra Zephyrveil',descriptor:'Skyborne · Druid',symbol:'❧',dossier:'aelyndra.html'}
  ];
  const officialFeed = 'https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
  const legacyFeed = 'https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-progress/forever-progress.json';
  const fallback = 'assets/data/forever-progress.json';
  const create = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const when = n => {
    const num = Number(n);
    if (!Number.isFinite(num) || num <= 0) return 'Not yet recorded';
    return new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(num*1000))+' Rome';
  };
  const safeNumber = n => Number.isFinite(Number(n)) ? Math.max(0, Math.floor(Number(n))) : 0;
  function add(parent,tag,cls,text) { const node=create(tag,cls,text);parent.append(node);return node; }
  const menu = document.querySelector('.menu-toggle');
  if (page === 'chronicle' && menu) menu.addEventListener('click',() => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(open));
    document.querySelector('#navigation').classList.toggle('is-open',open);
    menu.textContent = open ? 'Close' : 'Menu';
  });
  if (page === 'home') {
    const live = document.querySelector('.home-live');
    const anchor = live ? live.parentElement : document.querySelector('.hero');
    if (anchor) {
      const root = create('section','chronicle-teaser wrap');
      root.id = 'home-chronicle-preview';
      const intro = add(root,'div','chronicle-teaser-intro');
      add(intro,'span','eyebrow','Official Blizzard API · Forever');
      add(intro,'h2','','The Living Chronicle');
      add(intro,'p','','Official character profiles when Blizzard makes Forever API data available.');
      const status = add(root,'div','chronicle-teaser-status','No gameplay data uploaded yet.');
      status.id='chronicle-teaser-status';
      const link=add(root,'a','button','Explore the live progress →');
      link.href='chronicle.html';
      anchor.insertAdjacentElement('afterend',root);
    }
  }
  const grid = document.getElementById('chronicle-character-grid');
  const timeline = document.getElementById('chronicle-timeline-list');
  const updated = document.getElementById('chronicle-last-sync');
  const state = document.getElementById('chronicle-sync-state');
  async function read(url) {
    const res = await fetch(url+'?t='+Math.floor(Date.now()/300000),{cache:'no-store'});
    if (!res.ok) throw Error('HTTP '+res.status);
    const data = await res.json();
    if (data.schemaVersion !== 1 || !['AzerothChronicleSync','BlizzardOfficialAPI'].includes(data.source) || !Array.isArray(data.characters) || !Array.isArray(data.events)) {
      throw Error('Unsupported snapshot');
    }
    return data;
  }
  async function getSnapshot() {
    let official = null;
    try { official=await read(officialFeed); } catch {}
    if(official && official.source==='BlizzardOfficialAPI' && official.characters.length && official.exportedAt) {
      return {data:official,fallback:false};
    }
    // Legacy data is read only if a real game session has already produced it.
    // The owner does NOT need to use the addon for the official API approach.
    try {
      const legacy=await read(legacyFeed);
      if(legacy.characters.length && legacy.exportedAt) return {data:legacy,fallback:false};
    } catch {}
    if(official && official.source==='BlizzardOfficialAPI') return {data:official,fallback:false};
    return {data:await read(fallback),fallback:true};
  }
  function renderCharacter(place, hero, data) {
    const c = (data.characters || []).find(item => item && item.id === hero.id);
    const official = data.source === 'BlizzardOfficialAPI';
    const card = add(place,'article','chronicle-character');
    const head = add(card,'div','chronicle-character-head');
    const sigil = add(head,'span','chronicle-sigil',hero.symbol);
    sigil.setAttribute('aria-hidden','true');
    const namebox=add(head,'div','');
    add(namebox,'h3','',hero.name);
    add(namebox,'p','chronicle-muted',hero.descriptor);
    if (!c) {
      add(card,'p','chronicle-untracked','Awaiting the first in-game sync.');
      add(card,'p','chronicle-small','No progress has been recorded for this character.');
      if(hero.dossier){const profile=add(card,'a','chronicle-xuthar-link',hero.id==='xuthar'?'Main story · The Last Witness →':'Reserved lore dossier →');profile.href=hero.dossier;}const book=add(card,'a','chronicle-xuthar-link','Open the character’s book →');book.href='book.html?character='+encodeURIComponent(hero.id);
      return;
    }
    const stats=add(card,'div','chronicle-stats');
    const level=add(stats,'div','chronicle-stat');
    level.append(create('strong','',String(safeNumber(c.level))),create('span','','Level'));
    const quests=add(stats,'div','chronicle-stat');
    quests.append(create('strong','',c.questsCompleted==null?'—':String(safeNumber(c.questsCompleted))),create('span','','Quests tracked'));
    const areas=add(stats,'div','chronicle-stat');
    areas.append(create('strong','',Array.isArray(c.zones)?String(c.zones.length):'—'),create('span','','Zones seen'));
    const xp=safeNumber(c.xp),max=safeNumber(c.xpMax);
    if(max>0) {
      const cap=add(card,'div','chronicle-xp-caption','Experience toward next level');
      add(cap,'span','',xp.toLocaleString('en-GB')+' / '+max.toLocaleString('en-GB'));
      const track=add(card,'div','chronicle-xp-track');
      const bar=add(track,'div','chronicle-xp-bar');
      bar.style.width=Math.min(100,100*xp/max)+'%';
    }
    const location=add(card,'p','chronicle-character-location');
    add(location,'span','chronicle-label','Last location ');
    add(location,'strong','',c.zone?String(c.zone):(official?'Not provided by API':'Unrecorded'));
    if (c.subzone && c.subzone!==c.zone) add(location,'small','',' · '+String(c.subzone));
    if(Array.isArray(c.professions)&&c.professions.length){
      const line=add(card,'p','chronicle-small','Professions: ');
      line.append(c.professions.map(p=>String(p.name||'')+' '+safeNumber(p.rank)).join(' · '));
    }
    add(card,'p','chronicle-last-played',official?'Official API checked: '+when(c.checkedAt||data.exportedAt):'Last seen: '+when(c.lastSeenAt));
    if(hero.dossier){const profile=add(card,'a','chronicle-xuthar-link',hero.id==='xuthar'?'Main story · The Last Witness →':'Reserved lore dossier →');profile.href=hero.dossier;}const book=add(card,'a','chronicle-xuthar-link','Open the character’s book →');book.href='book.html?character='+encodeURIComponent(hero.id);
  }
  function renderTimeline(data) {
    if (!timeline) return;
    timeline.replaceChildren();
    const events=data.events.filter(e=>e&&cast.some(c=>c.id===e.characterId)&&['quest','level','exploration','note'].includes(e.type))
      .sort((a,b)=>safeNumber(b.at)-safeNumber(a.at)).slice(0,24);
    if(!events.length) {
      add(timeline,'div','chronicle-empty','The journal is empty for now. Logged events will appear here after the first sync.');
      return;
    }
    for(const e of events){
      const item=add(timeline,'article','chronicle-event');
      add(item,'span','chronicle-event-icon',({quest:'◇',level:'✧',exploration:'⌖',note:'✎'})[e.type]||'◇').setAttribute('aria-hidden','true');
      const body=add(item,'div','chronicle-event-body');
      const match=cast.find(c=>c.id===e.characterId);
      add(body,'span','chronicle-event-meta',(match?match.name:e.characterId)+' · '+String(e.type).toUpperCase()+' · '+when(e.at));
      add(body,'p','',String(e.title||'Milestone recorded'));
      if(e.zone) add(body,'small','chronicle-muted',String(e.zone));
    }
  }
  function render(data,isFallback) {
    const hasData=data.characters.length>0 && data.exportedAt;
    const official=data.source==='BlizzardOfficialAPI';
    const message=hasData
      ? (official?'Official Blizzard API · ':'')+data.characters.length+' adventurer'+(data.characters.length===1?'':'s')+' tracked · Last check: '+when(data.exportedAt)
      : official?'Official Blizzard API support for Forever is not confirmed yet. No character data available.'
                :'Awaiting a real progress source. No invented statistics are displayed.';
    const teaser=document.getElementById('chronicle-teaser-status');
    if(teaser) teaser.textContent=message;
    if (state) state.textContent=hasData?(official?'Official Blizzard API active':'Character data received'):(official?'Blizzard Forever API pending':'Not yet connected');
    if (updated) updated.textContent=(hasData?(official?'Last official API check: ':'Latest export: ')+when(data.exportedAt):'Waiting for verified Forever profile support')+(isFallback?' · Local fallback shown':'');
    if(grid){
      grid.replaceChildren();
      for(const hero of cast) renderCharacter(grid,hero,data);
    }
    renderTimeline(data);
  }
  async function refresh() {
    try { const {data,fallback:isFallback}=await getSnapshot(); render(data,isFallback); }
    catch {
      if(state) state.textContent='Unable to read Chronicle data';
      if(updated) updated.textContent='Check network connectivity and GitHub feed.';
      if(grid) render({schemaVersion:1,source:'BlizzardOfficialAPI',exportedAt:null,characters:[],events:[]},true);
    }
  }
  refresh();
  setInterval(() => { if(!document.hidden) refresh(); }, 300000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
})();
