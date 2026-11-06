/* Verified Blizzard API profile feed · live-blizzard branch · display only.
   Never substitute third-party stats or infer quest completions. */
(() => {
  'use strict';
  const feed='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
  const armory='https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne';
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
  function showOfficialProgress(data, mount){
    if(!data||typeof data!=='object')return;
    const quests=data.quests;
    const summary=elem('div','blizz-live-activity-summary');
    summary.append(elem('h3','','Verified character progress'));
    const counts=elem('div','blizz-live-progress-counts');
    for(const [label,value] of [
      ['QUESTS IN PROGRESS',quests?.inProgressCount],
      ['COMPLETED QUEST IDS',quests?.completedCount],
      ['PRIMARY PROFESSIONS',data.professions?.primaryCount],
      ['SECONDARY PROFESSIONS',data.professions?.secondaryCount],
      ['EQUIPPED ITEMS',data.equipment?.equippedCount],
      ['REPUTATIONS',data.reputations?.trackedCount],
      ['ACHIEVEMENT ENTRIES',data.achievements?.trackedCount]
    ]){
      if(!Number.isInteger(value)||value<0)continue;
      const chip=elem('div','blizz-live-progress-chip');
      chip.append(elem('strong','',String(value)),elem('span','',label));
      counts.append(chip);
    }
    summary.append(counts);
    const items=Array.isArray(quests?.inProgress)?quests.inProgress:[];
    if(items.length){
      const title=elem('h4','','Current quests recorded by Blizzard');
      summary.append(title);
      const ul=elem('ul','blizz-live-quest-list');
      const visible=page==='home'?items.slice(0,4):items;
      for(const q of visible){
        if(!Number.isInteger(q?.id)||q.id<=0)continue;
        const li=elem('li','',typeof q.name==='string'&&q.name?q.name:'Quest #'+q.id);
        ul.append(li);
      }
      summary.append(ul);
      if(page==='home'&&items.length>4){
        const more=elem('a','blizz-live-more','View all '+items.length+' official active quests ↗');
        more.href='xuthar.html#blizzard-official-profile';
        summary.append(more);
      }
    }
    summary.append(elem('p','blizz-live-caution',
      'This is an official snapshot, not a quest hand-in history. Missing quests are not automatically marked completed or abandoned. The manually documented Chronicle remains separate.'));
    mount.replaceChildren(summary);
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
    const officialLink=elem('a','','Official character Armory ↗');
    officialLink.href=armory;
    officialLink.target='_blank';
    officialLink.rel='noopener noreferrer';
    links.append(officialLink);
    const activity=elem('div','blizz-live-activity');
    section.append(top,stats,activity,detail,links);
    return {section,tag,values,detail,activity};
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
        showOfficialProgress(profile.officialDetails,ui.activity);
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
