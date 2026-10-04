(() => {
  'use strict';
  if (document.body.dataset.page !== 'home') return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const liveUrl = 'https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-news/home-live.json';
  let launchAt = Date.parse('2026-11-04T23:00:00.000Z');
  let fetching = false;
  let latestSnapshot = 0;
  hero.insertAdjacentHTML('afterend', `<div class="wrap"><section class="home-live" aria-label="The next adventure and WoW headlines"><article class="launch-card"><span class="eyebrow"><span class="live-spark" aria-hidden="true"></span>The next chapter</span><h2>WoW Forever</h2><p class="launch-intro">A new road through Azeroth is almost here.</p><div class="launch-timer" role="timer" aria-label="Time until the global launch of WoW Forever" aria-live="off">${['Days','Hours','Minutes','Seconds'].map((label,i)=>`<div><strong id="launch-${i}">00</strong><span>${label}</span></div>`).join('')}</div><p id="launch-state" class="launch-state">Until the journey begins</p><p id="launch-date" class="meta">5 November 2026 · 00:00 CET (Rome)</p><p id="launch-local" class="launch-local"></p><a class="text-link" id="launch-source" href="https://worldofwarcraft.blizzard.com/it-it/news/24302093/" target="_blank" rel="noopener noreferrer">Official launch details</a></article><aside class="news-card" aria-labelledby="wow-news-heading"><div class="news-head"><div><span class="eyebrow">From Wowhead</span><h2 id="wow-news-heading">Around Azeroth</h2></div><span class="news-auto">Auto-updated</span></div><ul id="wow-news-list" class="wow-news-list"><li class="meta">Loading the latest WoW headlines…</li></ul><div class="news-bottom"><a class="text-link" href="https://www.wowhead.com/news" target="_blank" rel="noopener noreferrer">All Wowhead news</a><a class="text-link" href="calendar.html">Retail calendar &amp; daily events →</a><small id="news-update" class="meta">Automatic feed checks every 15 minutes</small></div></aside></section></div>`);
  const units = [0,1,2,3].map(i=>document.querySelector('#launch-'+i));
  const source = document.querySelector('#launch-source');
  function tick() {
    const total = Math.max(0,Math.ceil((launchAt - Date.now())/1000));
    const parts = [Math.floor(total/86400),Math.floor(total/3600)%24,Math.floor(total/60)%60,total%60];
    parts.forEach((value,i)=>{const text=String(value).padStart(2,'0');if(units[i].textContent!==text)units[i].textContent=text;});
    document.querySelector('#launch-state').textContent = total ? 'Until the journey begins' : 'WoW Forever is live. Your journey awaits.';
  }
  const validNewsUrl = value => {try {const url=new URL(value);return url.protocol==='https:' && ['wowhead.com','www.wowhead.com'].includes(url.hostname) && url.pathname.startsWith('/news');} catch {return false;}};
  function apply(snapshot) {
    const stamp = Date.parse(snapshot.generatedAt);
    if (!Number.isFinite(stamp) || stamp < latestSnapshot) return;
    const launch = Date.parse(snapshot.forever?.launchAt);
    if (Number.isFinite(launch)) {
      launchAt = launch;
      const date = new Date(launch);
      const rome = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZoneName:'short'}).format(date);
      document.querySelector('#launch-date').textContent = rome+' (Rome)';
      document.querySelector('#launch-local').textContent = 'Your time: '+new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short'}).format(date);
      const expected = 'https://worldofwarcraft.blizzard.com/it-it/news/24302093/';
      if (snapshot.forever.sourceUrl === expected) source.href = expected;
      tick();
    }
    const news = (Array.isArray(snapshot.news) ? snapshot.news : []).filter(n=>typeof n.title==='string' && validNewsUrl(n.url) && Number.isFinite(Date.parse(n.publishedAt))).slice(0,4);
    if (news.length) {
      document.querySelector('#wow-news-list').innerHTML = news.map(n=>`<li><span class="news-meta">${escape(n.category)} · <time datetime="${escape(n.publishedAt)}">${escape(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short'}).format(new Date(n.publishedAt)))}</time></span><a href="${escape(n.url)}" target="_blank" rel="noopener noreferrer">${escape(n.title)}<span aria-hidden="true"> ↗</span></a></li>`).join('');
      const last = Date.parse(snapshot.newsUpdatedAt);
      const outdated = snapshot.newsFetchError || !Number.isFinite(last) || Date.now()-last>7200000;
      document.querySelector('#news-update').textContent = Number.isFinite(last) ? `${outdated?'Last successful update':'Feed checked'}: ${new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(last))} · auto-refresh` : 'Automatic feed checks every 15 minutes';
    }
    latestSnapshot = stamp;
  }
  async function read(url) {
    const response = await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('Feed unavailable');
    return response.json();
  }
  async function refresh() {
    if (fetching) return;
    fetching = true;
    try { apply(await read(liveUrl+'?t='+Math.floor(Date.now()/60000))); }
    catch {
      try { apply(await read('assets/data/home-live.json?t='+Math.floor(Date.now()/60000))); }
      catch { if (!latestSnapshot) { document.querySelector('#wow-news-list').innerHTML='<li class="meta">Headlines are temporarily unavailable. Visit Wowhead for the latest news.</li>'; } }
    }
    finally { fetching = false; }
  }
  tick();
  setInterval(tick,1000);
  refresh();
  setInterval(()=>{if(!document.hidden)refresh();},60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();refresh();}});
})();
