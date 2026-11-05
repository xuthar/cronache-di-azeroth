/* Chronicles of Azeroth · Forever launch edition.
 * After 5 November 2026 the old countdown is retired.
 * The existing live-news feed remains read-only and continues to refresh. */
(() => {
  'use strict';
  if(document.body.dataset.page!=='home') return;
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const liveUrl='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-news/home-live.json';
  let fetching=false,latestSnapshot=0;
  hero.insertAdjacentHTML('afterend',`<div class="wrap">
    <section class="home-live forever-command-center" aria-label="Latest World of Warcraft Forever news">
      <aside class="news-card" aria-labelledby="wow-news-heading">
        <div class="news-head">
          <div><span class="eyebrow">The world is open · WoW Forever</span><h2 id="wow-news-heading">News from Azeroth</h2></div>
          <span class="news-auto">Auto-updated</span>
        </div>
        <ul id="wow-news-list" class="wow-news-list"><li class="meta">Loading the latest Forever news…</li></ul>
        <div class="news-bottom">
          <a class="text-link" href="https://worldofwarcraft.blizzard.com/en-us/forever" target="_blank" rel="noopener noreferrer">Official Forever updates</a>
          <a class="text-link" href="forever.html#forever-news">Forever articles →</a>
          <small id="news-update" class="meta">Automatic feed checks every 15 minutes</small>
        </div>
      </aside>
    </section></div>`);
  const list=document.querySelector('#wow-news-list');
  const updated=document.querySelector('#news-update');
  const validNewsUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&['wowhead.com','www.wowhead.com'].includes(u.hostname)&&u.pathname.startsWith('/news')}catch{return false}};
  function apply(snapshot){
    const stamp=Date.parse(snapshot?.generatedAt);
    if(!Number.isFinite(stamp)||stamp<latestSnapshot)return;
    const news=(Array.isArray(snapshot.news)?snapshot.news:[])
      .filter(n=>typeof n.title==='string'&&validNewsUrl(n.url)&&Number.isFinite(Date.parse(n.publishedAt))&&/forever/i.test(n.title+' '+(n.category||''))).slice(0,3);
    if(news.length){
      list.innerHTML=news.map(n=>`<li><span class="news-meta">${escape(n.category)} · <time datetime="${escape(n.publishedAt)}">${escape(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short'}).format(new Date(n.publishedAt)))}</time></span><a href="${escape(n.url)}" target="_blank" rel="noopener noreferrer">${escape(n.title)}<span aria-hidden="true"> ↗</span></a></li>`).join('');
      const last=Date.parse(snapshot.newsUpdatedAt);
      const stale=snapshot.newsFetchError||!Number.isFinite(last)||Date.now()-last>7200000;
      updated.textContent=Number.isFinite(last)?`${stale?'Last successful update':'Feed checked'}: ${new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(last))} · auto-refresh`:'Automatic feed checks every 15 minutes';
    }else{
      list.innerHTML='<li class="meta">No new Forever-specific headlines in this update. Check the official news and articles below.</li>';
      updated.textContent='Forever headlines only · automatically checked';
    }
    latestSnapshot=stamp;
  }
  async function read(url){
    const res=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});
    if(!res.ok)throw Error('Feed unavailable');
    return res.json();
  }
  async function refresh(){
    if(fetching)return;fetching=true;
    try{apply(await read(liveUrl+'?t='+Math.floor(Date.now()/60000)))}
    catch{
      try{apply(await read('assets/data/home-live.json?t='+Math.floor(Date.now()/60000)))}
      catch{if(!latestSnapshot)list.innerHTML='<li class="meta">Forever news is temporarily unavailable. Follow the official Blizzard page for updates.</li>'}
    }finally{fetching=false}
  }
  refresh();
  setInterval(()=>{if(!document.hidden)refresh()},60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
})();
