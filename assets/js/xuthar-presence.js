/* Xuthar's manually reported in-game presence. Never uses GPS or guesses a position. */
(() => {
  "use strict";
  const banner=document.getElementById("xuthar-presence");
  if(!banner)return;
  const $=id=>document.getElementById(id);
  const state=$("xuthar-presence-state"),headline=$("xuthar-presence-headline"),
    place=$("xuthar-presence-location"),task=$("xuthar-presence-activity"),
    updated=$("xuthar-presence-updated");
  const safe=value=>typeof value==="string"?value.trim().slice(0,240):"";
  const fmtDate=day=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(day||""))return "";
    const date=new Date(day+"T12:00:00Z");
    return Number.isNaN(date.getTime())?"":new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(date);
  };
  function apply(data){
    if(!data||data.version!==1||data.character!=="Xuthar Morvayne")throw Error("Unexpected status data");
    if(!["live","offline"].includes(data.status))throw Error("Unknown status");
    const live=data.status==="live",confirmed=data.statusConfirmed===true;
    banner.classList.toggle("is-live",live);
    banner.classList.toggle("is-offline",!live);
    state.textContent=live?"LIVE NOW":"OFFLINE";
    headline.textContent=live?"Xuthar is exploring Azeroth!":confirmed?
      "Xuthar is currently offline":"No live session announced";
    const location=[safe(data.location),safe(data.zone)].filter(Boolean).join(" · ");
    const position=data.coordinates,valid=position&&Number.isFinite(position.x)&&Number.isFinite(position.y)&&
      position.x>=0&&position.x<=100&&position.y>=0&&position.y<=100;
    const coords=valid?" · X: "+position.x+" · Y: "+position.y:" · Coordinates not reported";
    place.textContent=(live?"Current location: ":"Last reported location: ")+(location||"Not yet reported")+coords;
    const activity=safe(data.activity);
    task.textContent=(live?"What Xuthar is doing: ":"Last reported activity: ")+(activity||"Awaiting the next report");
    const day=fmtDate(data.reportedOn),at=safe(data.updatedAt);
    let stamp=day?"Last report · "+day:"Awaiting first report";
    if(at && /^\d{4}-\d{2}-\d{2}T/.test(at)){
      const time=new Date(at);
      if(!Number.isNaN(time.getTime()))stamp="Updated · "+new Intl.DateTimeFormat("en-GB",{
        day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"Europe/Rome",timeZoneName:"short"
      }).format(time);
    }
    updated.textContent=stamp+" · Updated manually from Xuthar's reports";
  }
  async function refresh(){
    try{
      const url="assets/data/xuthar-live-status.json?minute="+Math.floor(Date.now()/60000);
      const response=await fetch(url,{cache:"no-store"});
      if(!response.ok)throw Error("Status temporarily unavailable");
      apply(await response.json());
    }catch(error){
      // Keep the last displayed valid state; an unavailable file cannot imply LIVE.
      if(!banner.dataset.loaded)updated.textContent="Manual status feed unavailable · Last known report shown";
    }
  }
  refresh().then(()=>{banner.dataset.loaded="1";});
  setInterval(refresh,60000);
})();
