/* Xuthar · official completed quest archive + clearly labelled literary episodes.
   Reads public verified Blizzard snapshots only; no secret credentials, no game automation.
   A completed ID does not establish exact completion time, XP or objective progress. */
(() => {
  'use strict';
  if(document.body.dataset.page!=='missions')return;
  const mount=document.getElementById('quests-archive');
  if(!mount)return;
  const feed='https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-blizzard/forever-progress.json';
  const editorialPath='assets/data/xuthar-quest-editorial.json?v=20261106-first-archive';
  const sourceLink='https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne';
  const make=(tag,cls,value)=>{
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(value!==undefined)el.textContent=value;
    return el;
  };
  const text=(parent,tag,cls,value)=>{
    const child=make(tag,cls,value);parent.append(child);return child;
  };
  const link=(label,href,cls,external=false)=>{
    const el=make('a',cls,label);el.href=href;
    if(external){el.target='_blank';el.rel='noopener noreferrer';}
    return el;
  };
  const safeTitle=(title,id)=>typeof title==='string'&&title.trim()?title.trim():'Unresolved quest #'+id;
  const zone=(entry)=>typeof entry.area==='string'&&entry.area?entry.area:'Uncategorized';
  const timeLabel=(unix)=>{
    if(!Number.isInteger(unix)||unix<1)return 'unknown time';
    return new Intl.DateTimeFormat('en-GB',{
      timeZone:'Europe/Rome',day:'2-digit',month:'long',year:'numeric',
      hour:'2-digit',minute:'2-digit'
    }).format(unix*1000)+' (Italy)';
  };
  // Keep every Blizzard completion ID for verification and search, but display one
  // readable card per quest title/region; variant IDs stay out of the public UI.
  function missionCard(group,notesById,storiesByQuest){
    const first=group.entries[0],ids=group.entries.map(x=>x.id);
    const note=ids.map(id=>notesById.get(id)).find(Boolean)||null;
    const briefing=group.entries.find(x=>typeof x.briefing==='string'&&x.briefing.trim())?.briefing;
    const description=note?.objective||briefing||
      'This quest is confirmed completed by Blizzard; its description is not yet available.';
    const card=make('article','qm-mission');
    card.id='quest-'+first.id;
    card.dataset.search=(group.title+' '+group.area+' '+ids.join(' ')+' '+description).toLowerCase();
    card.dataset.region=group.area;
    const head=make('header','qm-mission-head'),left=make('div','');
    text(left,'span','qm-mission-area',group.area);
    text(left,'h3','',group.title);
    head.append(left,make('span','qm-verified','✓ Completed'));
    card.append(head);
    text(card,'p','qm-mission-description',description);
    text(card,'span','qm-mission-id','Quest ID '+first.id);
    const story=ids.map(id=>storiesByQuest.get(id)).find(Boolean);
    if(story){
      const actions=make('div','qm-mission-links');
      actions.append(link('Read the related adventure ↗','book.html?character=xuthar#'+story.bookAnchor));
      card.append(actions);
    }
    return card;
  }
  function storyCards(episodes,completed){
    const section=make('section','qm-section');section.id='story-chapters';
    const head=make('div','qm-section-header'),title=make('div','');
    text(title,'span','qm-eyebrow','CHRONICLES / THE LIVING BOOK');
    text(title,'h2','','Adventures between the quest lines');
    head.append(title,make('p','','Original fiction inspired by quest premises that Blizzard marks complete. The imagined conversations and scenes are not claims about gameplay.'));
    section.append(head);
    const grid=make('div','qm-episodes');
    for(const e of episodes){
      if(!e.questIds.some(id=>completed.has(id)))continue;
      const card=make('article','qm-episode');
      text(card,'span','','ORIGINAL ROLEPLAY FICTION · '+e.subtitle.toUpperCase());
      text(card,'h3','',e.title);
      text(card,'p','',e.teaser);
      card.append(link('Read this chapter in the Living Book ↗','book.html?character=xuthar#'+e.bookAnchor));
      text(card,'small','','Inspired by completed quest IDs: '+e.questIds.filter(id=>completed.has(id)).join(', '));
      grid.append(card);
    }
    section.append(grid);
    return section;
  }
  // Official active quests are listed directly from the verified EU snapshot.
  // Questie's historical "Quest Complete!" is not an official hand-in confirmation.
  function activeQuestSection(quests){
    const section=make('section','qm-section');section.id='active-quests';
    const header=make('div','qm-section-header'),heading=make('div','');
    text(heading,'span','qm-eyebrow','BLIZZARD EU / CURRENT QUEST LOG');
    text(heading,'h2','','Quests in progress');
    header.append(heading,make('p','','The latest official snapshot lists these quests as active. Progress counters and completed objectives are not supplied by this API feed.'));
    section.append(header);
    if(!Array.isArray(quests?.inProgress)){
      section.append(make('p','qm-note','The official API did not provide the list of active quests for this snapshot.'));
      return section;
    }
    const seen=new Set();
    const active=quests.inProgress.filter(q=>{
      if(!Number.isInteger(q?.id)||seen.has(q.id))return false;
      seen.add(q.id);return true;
    });
    const grid=make('div','qm-mission-grid qm-active-grid');
    for(const quest of active){
      const card=make('article','qm-mission qm-mission-active');
      const head=make('header','qm-mission-head'),left=make('div','');
      text(left,'span','qm-mission-area','CURRENT QUEST LOG');
      text(left,'h3','',safeTitle(quest.name,quest.id));
      head.append(left,make('span','qm-in-progress','● In progress'));
      card.append(head);
      text(card,'span','qm-mission-id','Quest ID '+quest.id);
      grid.append(card);
    }
    if(active.length) section.append(grid);
    else section.append(make('p','qm-note','No active quests were returned in this official snapshot.'));
    section.append(make('p','qm-active-caveat','A Questie screenshot may show a task as "Quest Complete!" before Blizzard registers its hand-in. These are official API statuses; the personal Chronicle keeps its own historical completion convention separately.'));
    return section;
  }
  function render(feedData,editorial){
    const profile=feedData?.characters?.find(x=>x?.id==='xuthar');
    const quests=profile?.officialDetails?.quests;
    const sourceValid=feedData?.schemaVersion===1 &&
      feedData?.source==='BlizzardOfficialAPI' &&
      feedData?.apiRegion==='eu' && feedData?.status==='active' &&
      profile?.name==='Xuthar Morvayne' && Number.isInteger(profile?.level)&&profile.level>=10 &&
      Array.isArray(quests?.completedQuestIds)&&Array.isArray(quests?.completedQuestDetails);
    if(!sourceValid)throw Error('Official completed quest archive is not yet available.');
    const completed=new Set(quests.completedQuestIds.filter(Number.isInteger));
    const notesById=new Map((editorial?.objectives||[]).filter(x=>Number.isInteger(x.id)).map(x=>[x.id,x]));
    const episodeList=Array.isArray(editorial?.episodes)?editorial.episodes:[];
    const storyByQuest=new Map;
    for(const episode of episodeList)for(const id of episode.questIds||[])storyByQuest.set(id,episode);
    const rows=quests.completedQuestDetails.filter(x=>Number.isInteger(x?.id)&&completed.has(x.id));
    const groupMap=new Map;
    for(const entry of rows){
      const title=safeTitle(entry.title,entry.id),area=zone(entry);
      const key=title.toLowerCase()+'|'+area.toLowerCase();
      if(!groupMap.has(key))groupMap.set(key,{title,area,entries:[]});
      groupMap.get(key).entries.push(entry);
    }
    const groups=[...groupMap.values()].sort((a,b)=>
      a.area.localeCompare(b.area,'en')||a.title.localeCompare(b.title,'en'));
    mount.replaceChildren();
    const stats=make('div','qm-stats');
    for(const [value,name] of [
      [Number.isInteger(quests?.completedCount)?quests.completedCount:completed.size,'Completed quest IDs'],
      [episodeList.filter(e=>e.questIds.some(id=>completed.has(id))).length,'Related adventures'],
      [Number.isInteger(quests?.inProgressCount)?quests.inProgressCount:'—','Active quests']
    ]){
      const stat=make('div','qm-stat');
      text(stat,'strong','',String(value));text(stat,'span','',name);stats.append(stat);
    }
    mount.append(stats);
    const note=make('p','qm-note');
    note.textContent='Official Blizzard record updated '+timeLabel(feedData.exportedAt)+
      '. Completed quest IDs are grouped into readable mission cards by title and region. Blizzard does not provide the exact time each quest was finished.';
    mount.append(note,activeQuestSection(quests),storyCards(episodeList,completed));
    const section=make('section','qm-section');section.id='mission-record';
    const sectionHead=make('div','qm-section-header'),heading=make('div','');
    text(heading,'span','qm-eyebrow','THE LAST WITNESS / OFFICIAL QUEST LEDGER');
    text(heading,'h2','','The record of completed deeds');
    sectionHead.append(heading,make('p','',
      'Each quest appears as a simple completed record: title, description and reference ID.'));
    section.append(sectionHead);
    const controls=make('div','qm-controls');
    const search=make('div','qm-control'),searchLabel=text(search,'label','','Search missions, regions or quest IDs');
    const searchInput=make('input','');searchInput.type='search';searchInput.placeholder='Search the completed archive…';searchInput.id='qm-search';searchLabel.htmlFor=searchInput.id;search.append(searchInput);
    const zoneFilter=make('div','qm-control'),zoneLabel=text(zoneFilter,'label','','Choose a region / category');
    const select=make('select','');select.id='qm-region';zoneLabel.htmlFor=select.id;
    for(const z of ['All regions',...new Set(groups.map(x=>x.area))]){
      const opt=make('option','',z);opt.value=z;select.append(opt);
    }
    zoneFilter.append(select);
    controls.append(search,zoneFilter);section.append(controls);
    const resultCount=make('p','qm-results-note');resultCount.setAttribute('role','status');
    section.append(resultCount);
    const list=make('div','qm-mission-grid');
    const cards=groups.map(x=>missionCard(x,notesById,storyByQuest));
    list.append(...cards);section.append(list);
    const apply=()=>{
      const needle=searchInput.value.trim().toLowerCase();
      let visible=0;
      for(const card of cards){
        const matchText=!needle||card.dataset.search.includes(needle);
        const matchRegion=select.value==='All regions'||card.dataset.region===select.value;
        card.hidden=!(matchText&&matchRegion);
        if(!card.hidden)visible++;
      }
      resultCount.textContent='Showing '+visible+' of '+groups.length+' completed missions.';
    };
    searchInput.addEventListener('input',apply);
    select.addEventListener('change',apply);
    apply();
    mount.append(section);
    const footer=make('p','qm-source');
    footer.append(document.createTextNode('Completion status: official Blizzard EU Forever API. Mission summaries: Blizzard quest information and documented gameplay. Story chapters are original fiction. '));
    footer.append(link('Xuthar on Blizzard Armory ↗',sourceLink,'',true));
    mount.append(footer);
    const hash=location.hash.slice(1);
    if(hash){const target=document.getElementById(hash);if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
  }
  Promise.all([
    fetch(feed,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Official feed unavailable');return r.json();}),
    fetch(editorialPath,{cache:'no-cache'}).then(r=>r.ok?r.json():null).catch(()=>null)
  ]).then(([data,editorial])=>render(data,editorial))
    .catch(()=>{mount.replaceChildren(
      make('p','qm-error','The verified Blizzard quest archive is temporarily unavailable. Previous manually recorded adventures remain in the Living Book.')
    );mount.append(link('Visit Xuthar’s manual quest record ↗','xuthar.html#xuthar-quests'));});
})();
