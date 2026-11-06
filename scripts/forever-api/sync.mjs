/**
 * Publish validated official EU Forever character profile + supported summaries.
 * Read only. Never fall back to Retail/Classic or rewrite manual quest records.
 * Secrets and OAuth tokens must never be logged or exported.
 */
import {readFile,writeFile} from 'node:fs/promises';
const env=process.env;
const roster=[
  ['xuthar','Xuthar Morvayne','FOREVER_XUTHAR_SLUG'],
  ['thorgar','Thorgar Ironbeard','FOREVER_THORGAR_SLUG'],
  ['aelyndra','Aelyndra Zephyrveil','FOREVER_AELYNDRA_SLUG']
];
function slug(value,key){
  const s=String(value||'').trim().toLowerCase();
  if(!/^[a-z0-9][a-z0-9-]{0,100}$/.test(s))throw Error('Unverified or invalid '+key);
  return s;
}
function localized(v){
  if(typeof v==='string')return v.slice(0,120);
  return String(v?.en_GB||v?.en_US||'').slice(0,120);
}
async function json(url,opts={}){
  const response=await fetch(url,{...opts,signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error('Official Blizzard endpoint returned HTTP '+response.status+'.');
  return response.json();
}
function count(data,key){return Array.isArray(data?.[key])?data[key].length:null;}
function refId(obj){
  const n=Number(obj?.id);
  return Number.isInteger(n)&&n>0&&n<100000000?n:null;
}
function sanitizedQuest(entry){
  const quest=entry?.quest&&typeof entry.quest==='object'?entry.quest:entry;
  const id=refId(quest);
  const name=localized(quest?.name);
  if(!id)return null;
  return {id,name:name||null};
}

function editorialExcerpt(text){
  const clean=String(text||'').replace(/<[^>]*>/g,' ').replace(/\{name\}/gi,'Xuthar')
    .replace(/\{class\}/gi,'priest').replace(/\s+/g,' ').trim();
  if(!clean)return null;
  const words=clean.split(' ').slice(0,24).join(' ');
  return words.length>170?words.slice(0,167).trimEnd()+'…':(words.length<clean.length?words+'…':words);
}
async function questStaticCatalog(ids,token,previousById){
  if(!Array.isArray(ids))return null;
  const entries=new Array(ids.length);
  let next=0,verified=0,unavailable=0;
  async function worker(){
    while(next<ids.length){
      const index=next++;
      const id=ids[index];
      const existing=previousById.get(id)||null;
      const url=new URL('https://eu.api.blizzard.com/data/wow/quest/'+id);
      url.searchParams.set('namespace','static-forever-eu');
      url.searchParams.set('locale','en_GB');
      try{
        const response=await fetch(url,{
          headers:{Authorization:'Bearer '+token,Accept:'application/json'},
          signal:AbortSignal.timeout(12000)
        });
        if(!response.ok)throw Error('Static quest metadata unavailable');
        const q=await response.json();
        if(Number(q?.id)!==id)throw Error('Static quest ID mismatch');
        const title=localized(q?.title)||localized(q?.name);
        if(!title)throw Error('Static quest name missing');
        const area=localized(q?.area?.name)||localized(q?.category?.name)||null;
        entries[index]={
          id,title:title.slice(0,140),area,briefing:editorialExcerpt(q?.description),
          objective:null,objectiveSource:null,
          metadataSource:'BlizzardStaticForeverEU'
        };
        verified++;
      }catch{
        if(existing&&typeof existing.title==='string'&&existing.title){
          entries[index]={id,title:existing.title,area:existing.area||null,
            briefing:existing.briefing||null,objective:null,objectiveSource:null,
            metadataSource:'PreviouslyVerifiedBlizzardStaticForeverEU'};
        }else{
          entries[index]={id,title:null,area:null,briefing:null,
            objective:null,objectiveSource:null,metadataSource:'Unresolved'};
        }
        unavailable++;
      }
    }
  }
  await Promise.all(Array.from({length:Math.min(4,ids.length)},()=>worker()));
  console.log('Static quest catalog: '+verified+' resolved; '+unavailable+' unavailable or reused from previous.');
  return entries;
}
async function previousSnapshot(path){
  if(!path)return null;
  try{
    const data=JSON.parse(await readFile(path,'utf8'));
    return data?.source==='BlizzardOfficialAPI'&&data?.apiRegion==='eu' ? data : null;
  }catch{return null}
}

async function main(){
  const output=process.argv[2];
  if(!output)throw Error('Output path missing.');
  if(env.FOREVER_API_ENABLED!=='true'||env.FOREVER_NAMESPACE_VERIFIED!=='true'){
    console.log('Forever API disabled or not verified. No requests or publication.');return;
  }
  const namespace=slug(env.FOREVER_PROFILE_NAMESPACE,'FOREVER_PROFILE_NAMESPACE');
  if(namespace!=='profile-forever-eu')throw Error('Forever EU namespace must match verified namespace.');
  const characters=roster.filter(row=>env[row[2]])
    .map(([id,displayName,key])=>({id,displayName,slug:slug(env[key],key)}));
  if(!characters.length){console.log('No configured character profiles.');return;}
  if(!env.BLIZZARD_CLIENT_ID||!env.BLIZZARD_CLIENT_SECRET){
    throw Error('Missing secure Blizzard OAuth credentials.');
  }
  const credentials=Buffer.from(env.BLIZZARD_CLIENT_ID+':'+env.BLIZZARD_CLIENT_SECRET).toString('base64');
  const auth=await json('https://eu.battle.net/oauth/token',{
    method:'POST',
    headers:{Authorization:'Basic '+credentials,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'client_credentials'})
  });
  if(typeof auth.access_token!=='string')throw Error('OAuth token missing.');
  const checkedAt=Math.floor(Date.now()/1000),profiles=[];
  const previous=await previousSnapshot(process.argv[3]);
  const get=async(characterSlug,path='')=>{
    const url=new URL('https://eu.api.blizzard.com/profile/wow/character/'+encodeURIComponent(characterSlug)+path);
    url.searchParams.set('namespace',namespace);
    url.searchParams.set('locale','en_GB');
    return json(url,{headers:{Authorization:'Bearer '+auth.access_token,Accept:'application/json'}});
  };
  for(const c of characters){
    const profile=await get(c.slug);
    const level=Number(profile?.level);
    const first=localized(profile?.name);
    const surname=localized(profile?.surname);
    const [expectedFirst,...expectedLast]=c.displayName.split(/\s+/);
    if(!Number.isInteger(level)||level<10||level>100||
       first.toLowerCase()!==expectedFirst.toLowerCase()||
       surname.toLowerCase()!==expectedLast.join(' ').toLowerCase()){
      throw Error('Official character identity or level mismatch. No publication.');
    }
    // Only optional, verified public profile subendpoints are queried.
    const request=async(segment)=>{
      try {
        const data=await get(c.slug+'/'+segment);
        return data&&typeof data==='object'?data:null;
      } catch {
        console.log('OPTIONAL_'+segment.replaceAll('/','_').toUpperCase()+': unavailable. Keeping manual data separate.');
        return null;
      }
    };
    const [quests,completed,professions,equipment,reputations,achievements]=await Promise.all([
      request('quests'),
      request('quests/completed'),
      request('professions'),
      request('equipment'),
      request('reputations'),
      request('achievements')
    ]);
    // A failed endpoint is unknown, NEVER zero.
    const activeArray=Array.isArray(quests?.in_progress)?quests.in_progress:null;
    const completedArray=Array.isArray(completed?.quests)?completed.quests:null;
    const primaryCount=count(professions,'primaries');
    const secondaryCount=count(professions,'secondaries');
    const gearCount=count(equipment,'equipped_items');
    const reputationCount=count(reputations,'reputations');
    const achievementCount=count(achievements,'achievements');
    const completedQuestIds=completedArray?Array.from(new Set(completedArray.map(q=>
      refId(q?.quest||q)||(Number.isInteger(q)&&q>0?q:null)
    ).filter(Number.isInteger))).sort((a,b)=>a-b):null;
    const previousProfile=previous?.characters?.find(p=>p?.id===c.id);
    const prevQuest=previousProfile?.officialDetails?.quests;
    const oldIds=Array.isArray(prevQuest?.completedQuestIds)?
      new Set(prevQuest.completedQuestIds.filter(Number.isInteger)):null;
    const previousById=new Map(
      (prevQuest?.completedQuestDetails||[]).filter(q=>Number.isInteger(q?.id))
        .map(q=>[q.id,q])
    );
    const completedQuestDetails=completedQuestIds ?
      await questStaticCatalog(completedQuestIds,auth.access_token,previousById):null;
    const newlyObservedCompletedIds=oldIds&&completedQuestIds?
      completedQuestIds.filter(id=>!oldIds.has(id)):null;
    const questSummary={
      source:'BlizzardOfficialAPI',
      snapshotAt:checkedAt,
      inProgressCount:activeArray?activeArray.length:null,
      completedCount:completedArray?completedArray.length:null,
      inProgress:activeArray?activeArray.map(sanitizedQuest).filter(Boolean):null,
      completedQuestIds,
      completedQuestDetails,
      newlyObservedCompletedIds,
      comparedWithSnapshotAt:oldIds?previous.exportedAt:null,
      interpretation:'Snapshot only. A missing quest is not evidence of completion, abandonment or delivery. Manual quest journal is never overwritten.'
    };
    const officialDetails={
      quests:questSummary,
      professions:{primaryCount,secondaryCount},
      equipment:{equippedCount:gearCount},
      reputations:{trackedCount:reputationCount},
      achievements:{trackedCount:achievementCount},
      profileCheckedAt:checkedAt
    };
    profiles.push({
      id:c.id,name:c.displayName,gameName:first+' '+surname,
      ruleset:localized(profile.ruleset?.name)||null,
      race:localized(profile.race?.name),
      className:localized(profile.character_class?.name),level,
      zone:'',subzone:'',xp:null,xpMax:null,
      questsCompleted:completedArray?completedArray.length:null,zones:null,
      professions:[],firstSeenAt:null,lastSeenAt:null,checkedAt,officialDetails
    });
    console.log('Verified '+c.displayName+' level '+level+
      '; quests active '+(questSummary.inProgressCount??'unknown')+
      ', completed '+(questSummary.completedCount??'unknown')+
      '; professions '+(primaryCount??'?')+'/'+(secondaryCount??'?')+
      '; gear '+(gearCount??'?')+'.');
  }
  await writeFile(output,JSON.stringify({
    schemaVersion:1,source:'BlizzardOfficialAPI',status:'active',
    apiRegion:'eu',exportedAt:checkedAt,characters:profiles,events:[]
  },null,2)+'\n',{encoding:'utf8'});
  console.log('Validated '+profiles.length+' official profile(s); isolated branch publication permitted.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
