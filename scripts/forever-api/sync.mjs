/**
 * Read only officially verified EU Forever profiles.
 * OFF by default; NEVER fall back to Retail or Classic namespaces.
 * Nothing is published unless all configured profiles are valid.
 */
import {writeFile} from 'node:fs/promises';
const env=process.env;
const roster=[
  ['xuthar','Xuthar Morvayne','FOREVER_XUTHAR_SLUG'],
  ['thorgar','Thorgar Ironbeard','FOREVER_THORGAR_SLUG'],
  ['aelyndra','Aelyndra Zephyrveil','FOREVER_AELYNDRA_SLUG']
];
function slug(s,key){
  s=String(s||'').trim().toLowerCase();
  if(!/^[a-z0-9][a-z0-9-]{0,100}$/.test(s)) throw Error('Unverified or invalid '+key);
  return s;
}
function name(v){
  if(typeof v==='string') return v.slice(0,120);
  return String(v?.en_GB||v?.en_US||'').slice(0,120);
}
async function json(url,opts={}){
  const r=await fetch(url,{...opts,signal:AbortSignal.timeout(20000)});
  if(!r.ok)throw Error('Official API returned HTTP '+r.status+'. No data published.');
  return r.json();
}
async function main(){
  const out=process.argv[2];
  if(!out)throw Error('Output path is missing.');
  if(env.FOREVER_API_ENABLED!=='true'||env.FOREVER_NAMESPACE_VERIFIED!=='true'){
    console.log('Forever API not verified/enabled; no Blizzard requests, no publication.');return;
  }
  const namespace=slug(env.FOREVER_PROFILE_NAMESPACE,'FOREVER_PROFILE_NAMESPACE');
  if(!namespace.startsWith('profile-')||!namespace.endsWith('-eu'))throw Error('Not a valid EU profile namespace.');
  const realm=slug(env.FOREVER_REALM_SLUG,'FOREVER_REALM_SLUG');
  const characters=roster.filter(x=>env[x[2]]).map(([id,displayName,key])=>({id,displayName,slug:slug(env[key],key)}));
  if(!characters.length){console.log('No character identifiers configured. No publication.');return;}
  if(!env.BLIZZARD_CLIENT_ID||!env.BLIZZARD_CLIENT_SECRET){
    console.log('Blizzard OAuth secrets missing. No requests or publication.');return;
  }
  const credentials=Buffer.from(env.BLIZZARD_CLIENT_ID+':'+env.BLIZZARD_CLIENT_SECRET).toString('base64');
  const auth=await json('https://eu.battle.net/oauth/token',{
    method:'POST',
    headers:{Authorization:'Basic '+credentials,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'client_credentials'})
  });
  if(typeof auth.access_token!=='string') throw Error('Missing Blizzard access token.');
  const timestamp=Math.floor(Date.now()/1000),profiles=[];
  for(const c of characters){
    const url=new URL('https://eu.api.blizzard.com/profile/wow/character/'+encodeURIComponent(realm)+'/'+encodeURIComponent(c.slug));
    url.searchParams.set('namespace',namespace);
    url.searchParams.set('locale','en_GB');
    const p=await json(url,{
      headers:{Authorization:'Bearer '+auth.access_token,Accept:'application/json'}
    });
    const level=Number(p?.level);
    const returnedName=name(p?.name);
    if(!Number.isInteger(level)||level<1||level>100||!returnedName||
       returnedName.toLowerCase().split(/\s+/)[0]!==c.displayName.toLowerCase().split(' ')[0]){
      throw Error('Official API returned an incomplete or mismatched character. No publication.');
    }
    profiles.push({
      id:c.id,name:c.displayName,gameName:returnedName,
      realm:name(p.realm?.name)||realm,race:name(p.race?.name),
      className:name(p.character_class?.name),level,
      zone:'',subzone:'',xp:null,xpMax:null,questsCompleted:null,zones:null,
      professions:[],firstSeenAt:null,lastSeenAt:null,checkedAt:timestamp
    });
  }
  await writeFile(out,JSON.stringify({
    schemaVersion:1,source:'BlizzardOfficialAPI',status:'active',
    apiRegion:'eu',exportedAt:timestamp,characters:profiles,events:[]
  },null,2)+'\n',{encoding:'utf8'});
  console.log('Validated '+profiles.length+' official profile(s). Ready for publication.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
