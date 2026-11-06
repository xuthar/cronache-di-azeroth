/* Verified Blizzard API profile feed · live-blizzard branch · display only.
   Never substitute third-party stats or infer quest completions. */
(() => {
  'use strict';
  const feed='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
  const armory='https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne';
  const dataLink='https://github.com/xuthar/cronache-di-azeroth/blob/live-blizzard/forever-progress.json';
  const page=document.body.dataset.page;
  if(!['home','xuthar'].includes(page))return;

  function elem(tag,css,text){
    const e=document.createElement(tag);
    if(css)e.className=css;
    if(text!==undefined)e.textContent=text;
    return e;
  }
  function formattedTime(unix){
    if(!Number.isFinite(unix)||unix<=0)return 'unavailable';
    try {
      return new Intl.DateTimeFormat('en-GB',{
        timeZone:'Europe/Rome',day:'2-digit',month:'short',year:'numeric',
        hour:'2-digit',minute:'2-digit',hour12:false
      }).format(new Date(unix*1000))+' (Italy)';
    } catch {return 'unavailable';}
  }
  function makePanel(){
    const section=elem('section','blizz-live wrap');
    section.id='blizzard-official-profile';
    section.setAttribute('aria-labelledby','blizz-live-title');
    const top=elem('div','blizz-live-top');
    const label=elem('span','blizz-live-overline','OFFICIAL BLIZZARD PROFILE · FOREVER EU');
    const title=elem('h2','','Xuthar, recorded by Azeroth.');
    title.id='blizz-live-title';
    const intro=elem('p','','Daily, read-only profile synchronization. Character stats come from Blizzard; the quest journal remains independently documented from gameplay.');
    const text=elem('div','blizz-live-copy');
    text.append(label,title,intro);
    const tag=elem('span','blizz-live-state','Loading official data…');
    tag.setAttribute('role','status');
    tag.setAttribute('aria-live','polite');
    top.append(text,tag);
    const stats=elem('div','blizz-live-stats');
    const fields=[
      ['LEVEL','level'],
      ['RACE','race'],
      ['CLASS','className'],
      ['RULESET','ruleset']
    ];
    const values={};
    for(const [name,key] of fields){
      const item=elem('div','blizz-live-stat');
      item.append(elem('span','',name));
      const value=elem('strong','','—');
      item.append(value);
      values[key]=value;stats.append(item);
    }
    const detail=elem('p','blizz-live-meta','Data source: verified Blizzard EU API · daily around 08:21 UTC. Waiting for published profile.');
    const links=elem('div','blizz-live-links');
    for(const [href,caption] of [[armory,'Official character Armory ↗'],[dataLink,'View published API snapshot ↗']]){
      const a=elem('a','',caption);
      a.href=href;a.target='_blank';a.rel='noopener noreferrer';links.append(a);
    }
    section.append(top,stats,detail,links);
    return {section,tag,values,detail};
  }
  function run(){
    const anchor=page==='home'?document.querySelector('#xuthar-day-two'):document.querySelector('#main .xu-hero');
    if(!anchor || document.querySelector('#blizzard-official-profile'))return;
    const ui=makePanel();
    anchor.insertAdjacentElement('afterend',ui.section);
    fetch(feed,{cache:'no-store',headers:{Accept:'application/json'}})
      .then(response=>{if(!response.ok)throw new Error('Feed unavailable');return response.json();})
      .then(data=>{
        const profile=data?.characters?.find(c=>c?.id==='xuthar');
        const valid=data?.schemaVersion===1&&data?.source==='BlizzardOfficialAPI'&&
          data?.status==='active'&&data?.apiRegion==='eu'&&profile?.name==='Xuthar Morvayne'&&
          Number.isInteger(profile.level)&&profile.level>=10&&profile.level<=100&&
          typeof profile.race==='string'&&typeof profile.className==='string';
        if(!valid)throw new Error('Invalid or pending official feed');
        ui.values.level.textContent=String(profile.level);
        ui.values.race.textContent=profile.race||'—';
        ui.values.className.textContent=profile.className||'—';
        ui.values.ruleset.textContent=profile.ruleset||'—';
        ui.tag.textContent='Official profile verified';
        ui.tag.classList.add('blizz-live-ok');
        ui.detail.textContent='Last published Blizzard check: '+formattedTime(data.exportedAt||profile.checkedAt)+
          ' · Runs once daily at 08:21 UTC (09:21 winter / 10:21 summer in Italy).';
      })
      .catch(()=>{
        ui.tag.textContent='Live feed temporarily unavailable';
        ui.tag.classList.add('blizz-live-pending');
        ui.detail.textContent='The latest published profile could not be loaded. Use the official Armory link below; no stats have been guessed or replaced.';
      });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
