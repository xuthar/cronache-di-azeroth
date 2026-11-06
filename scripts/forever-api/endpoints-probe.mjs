/**
 * Read-only Forever EU subendpoint capability diagnostic.
 * Never logs payload values, account data, tokens or credentials.
 * Records only response status, recognized top-level sections and array counts.
 * Does NOT update or publish quest history or character data.
 */
const env=process.env;
const id=env.BLIZZARD_CLIENT_ID?.trim();
const secret=env.BLIZZARD_CLIENT_SECRET?.trim();
const namespace=env.FOREVER_PROFILE_NAMESPACE?.trim();
const slug=env.FOREVER_XUTHAR_SLUG?.trim();
const sections=[
  "quests",
  "quests/completed",
  "professions",
  "equipment",
  "reputations",
  "achievements",
  "specializations",
  "statistics"
];
const allowKeys=new Set([
  "quests","completed","in_progress","completed_quests","completed_quests_count",
  "primary","secondary","primaries","secondaries","professions","equipment",
  "equipped_items","reputations","factions","achievements","achievements_completed",
  "specializations","statistics","categories","_links","character","total_quantity",
  "total_points","total","summary","statistics"
]);
const result=(code)=>{console.log("DIAGNOSTIC_RESULT: "+code);process.exitCode=1;};
const parse=async(response)=>{try{return await response.json();}catch{return null;}};
const localized=(v)=>typeof v==="string"?v:String(v?.en_GB||v?.en_US||"");
function safeShape(section,data){
  if(!data||typeof data!=="object")return;
  const keys=Object.keys(data).filter(x=>allowKeys.has(x));
  console.log("SHAPE_"+section.toUpperCase()+": "+(keys.join(",")||"no-recognized-fields"));
  const candidates={
    quests:["completed","in_progress","quests","completed_quests"],
    "quests/completed":["quests","completed_quests","completed"],
    professions:["primary","secondary","primaries","secondaries","professions"],
    equipment:["equipped_items","equipment"],
    reputations:["reputations","factions"],
    achievements:["achievements","achievements_completed"],
    specializations:["specializations"],
    statistics:["categories","statistics"]
  }[section]||[];
  for(const key of candidates){
    const val=data[key];
    if(Array.isArray(val))console.log("COUNT_"+section.toUpperCase()+"_"+key.toUpperCase()+": "+val.length);
    else if(val&&typeof val==="object"){
      for(const child of ["quests","achievements","items","factions","professions"]){
        if(Array.isArray(val[child])){
          console.log("COUNT_"+section.toUpperCase()+"_"+key.toUpperCase()+"_"+child.toUpperCase()+": "+val[child].length);
        }
      }
    }
  }
}
async function main(){
  console.log("SCOPE: FOREVER_EU_READ_ONLY_SUBENDPOINTS");
  console.log("CHARACTER: Xuthar Morvayne");
  console.log("PUBLISH: DISABLED");
  if(!id||!secret)return result("CREDENTIALS_MISSING");
  if(namespace!=="profile-forever-eu"||slug!=="xuthar-morvayne")return result("NAMESPACE_OR_SLUG_UNVERIFIED");
  const credentials=Buffer.from(id+":"+secret).toString("base64");
  const authResponse=await fetch("https://eu.battle.net/oauth/token",{
    method:"POST",
    headers:{"Authorization":"Basic "+credentials,"Content-Type":"application/x-www-form-urlencoded"},
    body:"grant_type=client_credentials",
    signal:AbortSignal.timeout(20000)
  });
  console.log("OAUTH_HTTP: "+authResponse.status);
  if(!authResponse.ok)return result("OAUTH_FAILURE");
  const auth=await parse(authResponse);
  if(typeof auth?.access_token!=="string")return result("TOKEN_MISSING");
  const base="https://eu.api.blizzard.com/profile/wow/character/xuthar-morvayne";
  const url=(segment)=>{
    const u=new URL(base+segment);
    u.searchParams.set("namespace",namespace);
    u.searchParams.set("locale","en_GB");
    return u;
  };
  const get=async(path)=>fetch(url(path),{
    headers:{Authorization:"Bearer "+auth.access_token,Accept:"application/json"},
    signal:AbortSignal.timeout(20000)
  });
  const profile=await get("");
  console.log("PROFILE_HTTP: "+profile.status);
  if(!profile.ok)return result("PROFILE_FAILURE");
  const identity=await parse(profile);
  const match=localized(identity?.name).toLowerCase()==="xuthar" &&
    localized(identity?.surname).toLowerCase()==="morvayne" &&
    Number.isInteger(identity?.level) && identity.level>=10;
  if(!match)return result("CHARACTER_IDENTITY_MISMATCH");
  console.log("PROFILE_IDENTITY: MATCHED");
  for(const section of sections){
    try{
      const response=await get("/"+section);
      console.log("HTTP_"+section.toUpperCase()+": "+response.status);
      if(response.ok){
        const body=await parse(response);
        safeShape(section,body);
      }
    }catch{
      console.log("HTTP_"+section.toUpperCase()+": NETWORK_OR_TIMEOUT");
    }
  }
  console.log("DIAGNOSTIC_RESULT: COMPLETED_READ_ONLY");
}
main().catch(()=>result("AUTH_OR_NETWORK_FAILURE"));
