(() => {
  'use strict';
  if (document.body.dataset.page !== 'calendar') return;
  const root = document.querySelector('#retail-calendar');
  const escape = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const timeZone = 'Europe/Rome';
  const key = date => new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  const today = () => key(new Date());
  const format = iso => new Intl.DateTimeFormat('en-GB',{timeZone,day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
  let selected = today(), month = selected.slice(0,7), filter = 'All', events = [], updatedAt = null, fetching = false;
  const cacheKey = 'chronicles-retail-calendar-v1';
  const categories = ['All','World events','Bonus events','Timewalking','PvP'];
  const valid = e => typeof e.title==='string' && Number.isFinite(Date.parse(e.startAt)) && Date.parse(e.endAt)>Date.parse(e.startAt) && /^https:\/\/(?:www\.)?wowhead\.com\/(?:event=\d+[^\s]*|events)$/.test(e.url);
  const startDay = e => e.allDay ? e.startAt.slice(0,10) : key(new Date(e.startAt));
  const endDay = e => e.allDay ? key(new Date(Date.parse(e.endAt)-86400000)) : key(new Date(Date.parse(e.endAt)-1));
  const forDay = day => events.filter(e=>startDay(e)<=day && endDay(e)>=day && (filter==='All'||e.category===filter));
  const eventCard = e => `<article class="calendar-event"><span class="badge">${escape(e.category)}</span><h3>${escape(e.title)}</h3><p class="meta">${e.allDay?`${escape(startDay(e))} — ${escape(endDay(e))} · all day`:`${escape(format(e.startAt))} — ${escape(format(e.endAt))} · Rome time`}</p><a class="text-link" href="${escape(e.url)}" target="_blank" rel="noopener noreferrer">Event details on Wowhead ↗</a></article>`;
  function render() {
    const [year,number] = month.split('-').map(Number);
    const first = new Date(Date.UTC(year,number-1,1));
    const offset = (first.getUTCDay()+6)%7;
    const days = new Date(Date.UTC(year,number,0)).getUTCDate();
    const label = new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',month:'long',year:'numeric'}).format(first);
    const cells = Array.from({length:offset},()=>'<span class="calendar-empty" aria-hidden="true"></span>');
    for(let day=1;day<=days;day++) {
      const date = `${month}-${String(day).padStart(2,'0')}`, entries = forDay(date);
      cells.push(`<button type="button" class="calendar-day ${date===selected?'is-selected':''} ${date===today()?'is-today':''}" data-day="${date}" aria-pressed="${date===selected}" aria-label="${date}, ${entries.length} events${date===today()?', today':''}"><span>${day}</span>${entries.length?`<span class="calendar-dots" aria-hidden="true">${entries.slice(0,3).map(()=>'<i></i>').join('')}</span><small>${entries.length} event${entries.length===1?'':'s'}</small>`:''}</button>`);
    }
    const active = forDay(selected);
    const upcoming = events.filter(e=>startDay(e)>selected&&(filter==='All'||e.category===filter)).sort((a,b)=>a.startAt.localeCompare(b.startAt)).slice(0,5);
    root.innerHTML = `<div class="calendar-toolbar"><div class="calendar-month-nav"><button type="button" data-month="-1" aria-label="Previous month">←</button><h2>${label}</h2><button type="button" data-month="1" aria-label="Next month">→</button></div><button class="button" type="button" id="calendar-today">Today</button></div><div class="calendar-filters" aria-label="Event categories">${categories.map(c=>`<button class="button ${filter===c?'primary':''}" type="button" data-filter="${c}" aria-pressed="${filter===c}">${c}</button>`).join('')}</div><div class="calendar-layout"><section class="calendar-board" aria-label="Monthly event calendar"><div class="calendar-weekdays">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<span>${d}</span>`).join('')}</div><div class="calendar-grid">${cells.join('')}</div><p class="meta calendar-key">Gold outline: today · Filled frame: selected day · Dots: scheduled events</p></section><aside class="calendar-agenda"><span class="eyebrow">${selected===today()?'Today in Retail':'Selected day'}</span><h2>${escape(new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long'}).format(new Date(selected+'T12:00:00Z')))}</h2><div class="calendar-events" aria-live="polite">${active.length?active.map(eventCard).join(''):`<p class="meta">${updatedAt?'No events are listed for this day in the public feed. Check the in-game calendar for regional and realm-specific events.':'The event feed is not available yet. Use the public source below while it loads.'}</p>`}</div></aside></div><section class="section"><div class="section-head"><div><span class="eyebrow">On the horizon</span><h2>Coming next</h2></div></div><div class="calendar-upcoming">${upcoming.length?upcoming.map(eventCard).join(''):'<p class="meta">No upcoming events are listed in the current feed.</p>'}</div></section><p class="meta" id="calendar-status">${updatedAt?`Last successful source update: ${escape(format(updatedAt))} (Rome)${Date.now()-Date.parse(updatedAt)>86400000?' · Feed may be out of date':''}.`:'Waiting for the first successful source update.'} Source checks are scheduled every 6 hours. The page checks for new data every 5 minutes.</p>`;
    root.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.day;render();}));
    root.querySelectorAll('[data-month]').forEach(b=>b.addEventListener('click',()=>{const d=new Date(Date.UTC(year,number-1+Number(b.dataset.month),1));month=d.toISOString().slice(0,7);selected=month+'-01';render();}));
    root.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render();}));
    root.querySelector('#calendar-today').addEventListener('click',()=>{selected=today();month=selected.slice(0,7);render();});
  }
  function apply(data) {
    if(!Array.isArray(data.events)||!Number.isFinite(Date.parse(data.updatedAt))) return;
    const clean = data.events.filter(valid);
    if(!clean.length) return;
    events=clean;updatedAt=data.updatedAt;render();
  }
  async function refresh() {
    if(fetching) return;
    fetching=true;
    try {
      const response=await fetch('https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/retail-events/retail-events.json?t='+Math.floor(Date.now()/300000),{cache:'no-store',signal:AbortSignal.timeout(15000)});
      if(!response.ok) throw Error('Feed unavailable');
      const data=await response.json();apply(data);
      try{localStorage.setItem(cacheKey,JSON.stringify(data));}catch{}
    }catch {
      if(!updatedAt) try{const r=await fetch('assets/data/retail-events.json',{cache:'no-store'});if(r.ok)apply(await r.json());}catch{}
      if(updatedAt) {render();const status=root.querySelector('#calendar-status');status.textContent+=' Latest check failed; showing the last saved schedule.';}
    }finally{fetching=false;}
  }
  try{apply(JSON.parse(localStorage.getItem(cacheKey)));}catch{}
  render();refresh();
  setInterval(()=>{if(!document.hidden)refresh();},300000);
  let currentDay=today();
  setInterval(()=>{const next=today();if(next!==currentDay){if(selected===currentDay){selected=next;month=next.slice(0,7);}currentDay=next;render();}},30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){const next=today();if(next!==currentDay&&selected===currentDay){selected=next;month=next.slice(0,7);}currentDay=next;render();refresh();}});
})();
