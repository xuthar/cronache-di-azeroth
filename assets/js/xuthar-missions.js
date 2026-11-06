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
  const fullLink='https://github.com/xuthar/cronache-di-azeroth/blob/live-blizzard/forever-progress.json';
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
  const describeNote=(src)=>{
    if(String(src).includes('player-screenshot'))return 'Objective from player-supplied in-game evidence, paraphrased.';
    if(src==='quest-briefing')return 'Objective paraphrased from the official Blizzard quest briefing.';
    return 'Objective summarized from documented quest context.';
  };
  function missionCard(group,notesById,storiesByQuest,newIds){
    const first=group.entries[0],ids=group.entries.map(x=>x.id);
    const card=make('article','qm-mission');card.id='quest-'+first.id;
    card.dataset.search=(group.title+' '+group.area+' '+ids.join(' ')+' '+group.entries.map(x=>x.briefing||'').join(' ')).toLowerCase();
    card.dataset.region=group.area;
    const note=ids.map(id=>notesById.get(id)).find(Boolean)||null;
    card.dataset.hasObjective=String(!!note);
    const head=make('header','qm-mission-head'),left=make('div','');
    text(left,'span','qm-mission-area',group.area);
    text(left,'h3','',group.title);
    head.append(left,text(make('span','qm-verified'),'span','', '✓ BLIZZARD VERIFIED'));
    card.append(head);
    const meta=make('div','qm-mission-description');
    meta.textContent=ids.length===1?'Quest ID '+ids[0]+' · Officially completed; completion time not supplied.':
      ids.length+' separate completed IDs share this title: '+ids.join(', ')+'. These may represent variants, not separate story events.';
    card.append(meta);
    const goal=make('div','qm-mission-goal');
    text(goal,'strong','','Objective / achieved outcome');
    text(goal,'p','',note?.objective||'Blizzard marks this mission as completed. Its precise task checklist is not available from this verified API snapshot.');
    text(goal,'small','',note?describeNote(note.source):
      'Verified completion status; specific objective not independently verified.');
    card.append(goal);
    const actions=make('div','qm-mission-links');
    const story=ids.map(id=>storiesByQuest.get(id)).find(Boolean);
    if(story)actions.append(link('Read the related adventure ↗','book.html?character=xuthar#'+story.bookAnchor));
    const questLink='https://www.wowhead.com/forever/quest='+first.id;
    actions.append(link('Quest reference ↗',questLink,'',true));
    if(newIds.some(id=>ids.includes(id)))actions.append(text(make('span','','New since previous verified snapshot'),'span',''));
    card.append(actions);
    const details=make('details',''),summary=make('summary','','Source notes & quest context');
    const more=make('div','qm-mission-extra');
    const sample=group.entries.find(x=>typeof x.briefing==='string'&&x.briefing)||null;
    if(sample)text(more,'p','','Official quest briefing (brief extract): '+sample.briefing);
    else text(more,'p','','Blizzard confirms the completion ID, but public quest-description metadata is unavailable.');
    text(more,'small','','Primary source: EU Forever /quests/completed. Title, area and briefing: Blizzard static-forever-eu. The exact completion timestamp, objective counters and rewards actually received are not supplied here.');
    details.append(summary,more);card.append(details);
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
    const newIds=(quests.newlyObservedCompletedIds||[]).filter(x=>completed.has(x));
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
    for(const [value,name] of [[completed.size,'Completed quest IDs'],[groups.length,'Distinct quest titles'],
      [episodeList.filter(e=>e.questIds.some(id=>completed.has(id))).length,'Original quest adventures'],
      [Number.isInteger(quests?.inProgressCount)?quests.inProgressCount:'—','Current active quests']]){
      const stat=make('div','qm-stat');
      text(stat,'strong','',String(value));text(stat,'span','',name);stats.append(stat);
    }
    mount.append(stats);
    const note=make('p','qm-note');
    note.textContent='Official Blizzard snapshot: '+timeLabel(feedData.exportedAt)+
      '. Several Camping quests have multiple completed variant IDs, grouped by title. Historical completion dates and exact objective counters are unavailable. A story fragment is creative interpretation, not an in-game combat log.';
    mount.append(note,storyCards(episodeList,completed));
    const section=make('section','qm-section');section.id='mission-record';
    const sectionHead=make('div','qm-section-header'),heading=make('div','');
    text(heading,'span','qm-eyebrow','THE LAST WITNESS / OFFICIAL QUEST LEDGER');
    text(heading,'h2','','The record of completed deeds');
    const description=newIds.length?
      newIds.length+' additional completed IDs were first observed compared with the preceding official snapshot. This does not identify their exact completion times.':
      'All records shown are confirmed in the latest Blizzard snapshot. No new completion time is inferred from a missing quest.';
    sectionHead.append(heading,make('p','',description));section.append(sectionHead);
    const controls=make('div','qm-controls');
    const search=make('div','qm-control'),searchLabel=text(search,'label','','Search missions, regions or quest IDs');
    const searchInput=make('input','');searchInput.type='search';searchInput.placeholder='Search the completed archive…';searchInput.id='qm-search';searchLabel.htmlFor=searchInput.id;search.append(searchInput);
    const zoneFilter=make('div','qm-control'),zoneLabel=text(zoneFilter,'label','','Choose a region / category');
    const select=make('select','');select.id='qm-region';zoneLabel.htmlFor=select.id;
    for(const z of ['All regions',...new Set(groups.map(x=>x.area))]){
      const opt=make('option','',z);opt.value=z;select.append(opt);
    }
    zoneFilter.append(select);
    const onlyNotes=make('label','qm-filter-check');
    const checkbox=make('input','');checkbox.type='checkbox';onlyNotes.append(checkbox,document.createTextNode('Documented objectives only'));
    controls.append(search,zoneFilter,onlyNotes);section.append(controls);
    const resultCount=make('p','qm-results-note');resultCount.setAttribute('role','status');
    section.append(resultCount);
    const list=make('div','qm-mission-grid');
    const cards=groups.map(x=>missionCard(x,notesById,storyByQuest,newIds));
    list.append(...cards);section.append(list);
    const apply=()=>{
      const needle=searchInput.value.trim().toLowerCase();
      let visible=0;
      for(const card of cards){
        const matchText=!needle||card.dataset.search.includes(needle);
        const matchRegion=select.value==='All regions'||card.dataset.region===select.value;
        const matchGoal=!checkbox.checked||card.dataset.hasObjective==='true';
        card.hidden=!(matchText&&matchRegion&&matchGoal);
        if(!card.hidden)visible++;
      }
      resultCount.textContent='Showing '+visible+' of '+groups.length+' distinct missions · '+completed.size+' verified completed IDs.';
    };
    searchInput.addEventListener('input',apply);
    select.addEventListener('change',apply);
    checkbox.addEventListener('change',apply);
    apply();
    mount.append(section);
    const footer=make('p','qm-source');
    footer.append(document.createTextNode('Completed flags: official Blizzard EU Forever profile API · Titles and story context: official static quest catalog · Objective summaries: attributed player evidence or editorial paraphrases. '));
    footer.append(link('View official snapshot ↗',fullLink,'',true),document.createTextNode(' · '));
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
