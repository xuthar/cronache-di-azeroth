/* Manual WoW character presence, refreshed from the published JSON (not GPS). */
(() => {
 "use strict";
 const banner=document.getElementById("xuthar-presence");
 if(!banner)return;
 const state=document.getElementById("xuthar-presence-state");
 const location=document.getElementById("xuthar-presence-location");
 const activity=document.getElementById("xuthar-presence-activity");
 if(!state||!location||!activity)return;
 const safe=x=>typeof x==="string"?x.trim().slice(0,160):"";
 function render(data){
  if(data?.version!==1||data.character!=="Xuthar Morvayne"||!["live","offline"].includes(data.status))
   throw Error("Unverified presence");
  const live=data.status==="live",p=data.coordinates,
    valid=p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100;
  banner.classList.toggle("is-live",live);
  banner.classList.toggle("is-offline",!live);
  state.textContent=live?"LIVE":"OFFLINE";
  const where=[safe(data.zone),safe(data.location)].filter(Boolean).join(" · ");
  location.textContent=(live?"":"Last seen · ")+(where||"Location not reported")+
   (valid?" · "+p.x+", "+p.y:"");
  activity.textContent=safe(data.activity)||"Activity not reported";
  banner.title="Status reported manually by Xuthar"+(safe(data.reportedOn)?" · "+safe(data.reportedOn):"");
 }
 async function refresh(){
  try{
   const response=await fetch("assets/data/xuthar-live-status.json?v="+Math.floor(Date.now()/60000),{cache:"no-store"});
   if(!response.ok)throw Error("Cannot load status");
   render(await response.json());
  }catch(e){banner.title="Status refresh unavailable; last published state shown"}
 }
 refresh();setInterval(refresh,60000);
})();
