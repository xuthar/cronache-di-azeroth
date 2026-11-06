/* Read-only probe for official WoW Forever static quest descriptions.
   Logs only public, short game-data labels and allowed field names, never OAuth secrets. */
const id=process.env.BLIZZARD_CLIENT_ID,secret=process.env.BLIZZARD_CLIENT_SECRET;
async function main(){
  if(!id||!secret){console.log('RESULT: CREDS_MISSING');process.exitCode=1;return}
  const tokenRes=await fetch('https://eu.battle.net/oauth/token',{
    method:'POST',headers:{Authorization:'Basic '+Buffer.from(id+':'+secret).toString('base64'),
      'Content-Type':'application/x-www-form-urlencoded'},
    body:'grant_type=client_credentials',signal:AbortSignal.timeout(20000)});
  console.log('OAUTH_HTTP: '+tokenRes.status);
  if(!tokenRes.ok){process.exitCode=1;return}
  const token=(await tokenRes.json()).access_token;
  for(const questId of [54,61,5261,3903,97917]){
    const url=new URL('https://eu.api.blizzard.com/data/wow/quest/'+questId);
    url.searchParams.set('namespace','static-forever-eu');url.searchParams.set('locale','en_GB');
    try{
      const response=await fetch(url,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(12000)});
      console.log('QUEST_ID_'+questId+'_HTTP: '+response.status);
      if(!response.ok)continue;
      const d=await response.json();
      const keys=Object.keys(d).filter(k=>['id','title','name','description','requirements','objectives','rewards','area','zone','level','category','completion_text','suggested_players','is_repeatable'].includes(k));
      console.log('QUEST_ID_'+questId+'_FIELDS: '+keys.join(','));
      for(const field of ['requirements','rewards','area','category']){
        const val=d[field];
        if(!val||typeof val!=='object')continue;
        const fields=Object.keys(val).slice(0,18);
        console.log('QUEST_ID_'+questId+'_'+field.toUpperCase()+'_KEYS: '+fields.join(','));
        for(const key of ['description','text','objective','objectives','complete','completion_text']){
          const v=val[key];
          if(typeof v==='string')console.log('QUEST_ID_'+questId+'_'+field.toUpperCase()+'_'+key.toUpperCase()+': '+v.slice(0,150).replace(/\\s+/g,' '));
        }
      }
      for(const key of ['title','name','description','requirements','objectives','completion_text']){
        const v=d[key];
        const text=typeof v==='string'?v:typeof v==='object'?(v?.en_GB||v?.en_US||''):'';
        if(text)console.log('QUEST_ID_'+questId+'_'+key.toUpperCase()+': '+text.slice(0,180).replace(/\s+/g,' '));
      }
    }catch{console.log('QUEST_ID_'+questId+'_ERROR: NETWORK_OR_TIMEOUT')}
  }
  console.log('RESULT: COMPLETED_READ_ONLY');
}
main().catch(()=>{console.log('RESULT: GENERAL_ERROR');process.exitCode=1});
