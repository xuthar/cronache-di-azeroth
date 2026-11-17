/* Chronicles of Azeroth · focused editorial homepage. */
(() => {
'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);menu.textContent=open?'Close':'Menu';});
if(document.body.dataset.page!=='home-editorial')return;
const grid=document.getElementById('news-grid'),updated=document.getElementById('news-update');
const filters=[...document.querySelectorAll('[data-news-filter]')];
let articles=[],filter='all',latest=0,busy=false;
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
const validUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&['wowhead.com','www.wowhead.com'].includes(u.hostname)&&u.pathname.startsWith('/news')}catch{return false}};
const dateFormat=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short'});
const stampFormat=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
function render(){
const selected=articles.filter(n=>filter==='all'||/forever/i.test(n.title+' '+n.category)).slice(0,4);
grid.replaceChildren();grid.classList.toggle('single-story',selected.length===1);grid.classList.toggle('compact-news',selected.length<=2);
if(!selected.length){const empty=make('div','news-empty');empty.append(make('h3','',filter==='forever'?'No Forever headlines in this edition.':'The news feed is taking a short break.'),make('p','',filter==='forever'?'Choose All WoW for the latest Warcraft reports, or visit the official Blizzard news.':'Read the latest reports directly on Wowhead.'));grid.append(empty);return;}
selected.forEach((n,index)=>{
const a=make('a',index===0?'news-feature':'news-item');a.href=n.url;a.target='_blank';a.rel='noopener noreferrer';
if(index>0)a.append(make('span','news-number',String(index+1).padStart(2,'0')));
const body=make('div','news-content'),meta=make('div','news-meta');
meta.append(make('span','',n.category||'Warcraft'));const time=make('time','',dateFormat.format(new Date(n.publishedAt)));time.dateTime=n.publishedAt;meta.append(time);
body.append(meta,make('h3','',n.title));
if(index===0)body.append(make('span','news-arrow','Read the report ↗'));
a.append(body);if(index>0)a.append(make('span','news-arrow','↗'));grid.append(a);
});
}
function apply(snapshot){
const stamp=Date.parse(snapshot?.generatedAt||snapshot?.newsUpdatedAt);
if(!Number.isFinite(stamp)||stamp<latest)return;
const seen=new Set();
const news=(Array.isArray(snapshot.news)?snapshot.news:[]).filter(n=>{
if(typeof n.title!=='string'||!validUrl(n.url)||!Number.isFinite(Date.parse(n.publishedAt))||seen.has(n.url))return false;
seen.add(n.url);return true;
}).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
if(!news.length)return;
latest=stamp;articles=news;render();
const checked=Date.parse(snapshot.newsUpdatedAt),stale=snapshot.newsFetchError||!Number.isFinite(checked)||Date.now()-checked>7200000;
updated.textContent=Number.isFinite(checked)?(stale?'Last successful update · ':'Feed updated · ')+stampFormat.format(new Date(checked))+' CET':'Saved news edition';
}
async function read(url){const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error('Feed unavailable');apply(await response.json());}
async function refresh(){
if(busy)return;busy=true;
try{
const results=await Promise.allSettled([read('assets/data/home-live.json?v='+Math.floor(Date.now()/60000)),read('https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-news/home-live.json?v='+Math.floor(Date.now()/60000))]);
if(!latest&&results.every(r=>r.status==='rejected')){updated.textContent='Feed temporarily unavailable';articles=[];render();}
}finally{busy=false;}
}
filters.forEach(button=>button.addEventListener('click',()=>{
filter=button.dataset.newsFilter;filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();
}));
refresh();setInterval(()=>{if(!document.hidden)refresh();},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
document.getElementById('video-play')?.addEventListener('click',()=>{
const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/n2Wg46fwmb0?autoplay=1';frame.title='Featured World of Warcraft video';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';frame.allowFullscreen=true;document.getElementById('featured-video').replaceChildren(frame);
});
})();

