/* Xuthar's original image archive. Each image references a real 1920x1080 screenshot or unaltered evidence PNG. */
(() => {
  "use strict";
  if (document.body.dataset.page !== "gallery") return;
  const photos = [{"src":"assets/images/forever-screenshots/day-02/150517.jpg","title":"A camp outside Goldshire","desc":"A canvas tent and a fire beside the forest road.","time":"15:05","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/150619.jpg","title":"Xuthar Camera in action","desc":"The minimap camera button and successful screenshot message.","time":"15:06","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/151253.jpg","title":"The fishing dock","desc":"Lee Brown and the crowd of anglers at Crystal Lake.","time":"15:12","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/151346.jpg","title":"Casting the line","desc":"Xuthar practising Fishing at the lakeshore.","time":"15:13","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/152750.jpg","title":"Murloc on the shore","desc":"The priest faces a level-seven Murloc.","time":"15:27","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/155448.jpg","title":"The river keeps no footprints","desc":"Sunlight reflected across the water during the crossing.","time":"15:54","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/163117.jpg","title":"Into the Elwynn woods","desc":"A Forest Spider waits among the trees.","time":"16:31","group":"day2"},{"src":"assets/images/forever-screenshots/day-01/134935.jpg","title":"The Elwynn campfire","desc":"A gathering of adventurers along a cobbled forest road.","time":"13:49","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/134948.jpg","title":"Travellers beside the fire","desc":"The same quiet meeting seen from the other side.","time":"13:49","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/140058.jpg","title":"Crystal Lake and Guard Roberts","desc":"A still moment near the water during the priest's early journey.","time":"14:00","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/184652.jpg","title":"Level seven","desc":"The reward for Garments of the Light and Xuthar's seventh level.","time":"18:46","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/190449.jpg","title":"Fargodeep Mine · First setback","desc":"Danger among Kobold Miners and a Rumbler.","time":"19:04","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/190746.jpg","title":"Fargodeep Mine · Second setback","desc":"Another hard encounter in the mine.","time":"19:07","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192459.jpg","title":"The stone passage","desc":"Torchlit walls on the route into Stormwind.","time":"19:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192520.jpg","title":"Stormwind's trade streets","desc":"Timbered houses and cobbles in the capital.","time":"19:25","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192624.jpg","title":"Level eight","desc":"Shipment to Stormwind completed beside Morgan Pestle.","time":"19:26","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192634.jpg","title":"Morgan Pestle","desc":"A quiet moment in the Stormwind shop.","time":"19:26","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202423.jpg","title":"Stormwind canal","desc":"A view from the wooden dock at dusk.","time":"20:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202433.jpg","title":"The canal dock","desc":"Xuthar facing the water and anglers beyond.","time":"20:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202853.jpg","title":"Through the torchlit tunnel","desc":"Beginning the return journey from the city.","time":"20:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212811.jpg","title":"Under the evening lamps","desc":"The road leading away from Stormwind.","time":"21:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212845.jpg","title":"The monumental bridge","desc":"The statues guarding the route to the capital.","time":"21:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212958.jpg","title":"Rain over Elwynn","desc":"Wet cobblestones on the night road.","time":"21:29","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/213316.jpg","title":"Goldshire in the rain","desc":"The familiar blue roof and travellers at dusk.","time":"21:33","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/213455.jpg","title":"At rest in the Lion's Pride Inn","desc":"Xuthar lying down after the first day.","time":"21:34","group":"day1"},{"src":"assets/images/forever-screenshots/evidence/diary-level-5.png","title":"Level 5 · Survival diary","desc":"A narrow escape from Defias attackers.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/diary-level-6.png","title":"Level 6 · Survival diary","desc":"Early journeys near Goldshire and the Sandriana encounter.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/diary-level-7.png","title":"Level 7 · Survival diary","desc":"First green robes and bag; dangerous Kobold encounters.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/diary-level-8.png","title":"Level 8 · Survival diary","desc":"Murloc close calls and the second day's notes.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/quest-level-early.png","title":"Quest tracker · Early adventures","desc":"A preserved earlier quest snapshot.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/quest-goldshire.png","title":"Quest tracker · Goldshire","desc":"The earlier record of objectives in Elwynn.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/quest-day2-opening.png","title":"Quest tracker · Day Two","desc":"Jasperlode Mine, Rare Books and Further Concerns.","time":"Journal record","group":"evidence"},{"src":"assets/images/forever-screenshots/evidence/quest-enticing-offer.png","title":"Quest tracker · An Enticing Offer","desc":"One blood vial collected and Duskweed still to gather.","time":"Journal record","group":"evidence"}];
  const groups = [
    {id:"xuthar-day-two-photos",label:"DAY TWO · 6 NOVEMBER 2026",heading:"Crystal Lake, the River & the Woods",kind:"day2",note:"Seven original Full HD screenshots"},
    {id:"xuthar-day-one-photos",label:"DAY ONE · 5 NOVEMBER 2026",heading:"From Elwynn to Stormwind and Home",kind:"day1",note:"Eighteen original Full HD screenshots"},
    {id:"xuthar-diary-evidence",label:"IN-GAME DOCUMENTATION",heading:"Diaries & Quest Records",kind:"evidence",note:"Eight original reference screenshots"}
  ];
  const main = document.querySelector("#main");
  if (!main) return;
  main.className="xg-main";
  main.innerHTML="";
  const esc = value => String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const wrap=document.createElement("div");
  wrap.className="wrap xg-wrap";
  wrap.innerHTML='<header class="xg-heading"><div class="xg-eyebrow">CHRONICLES OF AZEROTH · THE LAST WITNESS</div><h1>Xuthar’s <em>Photo Chronicle</em></h1><p>Real gameplay. Real memories. Every image is presented in its original proportions, with no stretched atlas crops. Select a photograph to inspect the full-resolution file.</p><div class="xg-summary"><span><b>33</b> original files</span><span><b>2</b> days recorded</span><span><b>1920 × 1080</b> landscape captures</span></div></header><nav class="xg-tabs" aria-label="Photo archive categories"><a href="#xuthar-day-two-photos">Day Two · 6 Nov</a><a href="#xuthar-day-one-photos">Day One · 5 Nov</a><a href="#xuthar-diary-evidence">Diary & missions</a></nav>';
  const bySource = new Map(photos.map((p,i)=>[p.src,i]));
  const make=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=content;return e};
  groups.forEach(g=>{
    const sec=make("section","xg-section");sec.id=g.id;
    const head=make("header","xg-section-head");
    head.innerHTML='<div><div class="xg-eyebrow">'+esc(g.label)+'</div><h2>'+esc(g.heading)+'</h2></div><p>'+esc(g.note)+'</p>';
    const cards=make("div","xg-grid");
    photos.filter(p=>p.group===g.kind).forEach(photo=>{
      const card=make("article","xg-card");
      if(photo.group==="evidence") card.classList.add("xg-evidence");
      const trigger=make("button","xg-photo-button");trigger.type="button";trigger.setAttribute("aria-label","View full image: "+photo.title);
      const img=make("img","xg-photo");img.src=photo.src;img.alt=photo.title+". "+photo.desc;img.loading="lazy";img.decoding="async";
      if(photo.group!=="evidence"){img.width=1920;img.height=1080}
      img.addEventListener("error",()=>{card.classList.add("xg-error");trigger.disabled=true;trigger.textContent="Image unavailable";});
      trigger.append(img);
      trigger.addEventListener("click",()=>openPhoto(bySource.get(photo.src)));
      const content=make("div","xg-copy");
      const meta=make("span","xg-meta",photo.group==="day1"?"5 November · "+photo.time:photo.group==="day2"?"6 November · "+photo.time:"Diary or quest record");
      const title=make("h3","",photo.title);
      const desc=make("p","",photo.desc);
      const link=make("a","xg-original","Open original image ↗");link.href=photo.src;link.target="_blank";link.rel="noopener";
      content.append(meta,title,desc,link);card.append(trigger,content);cards.append(card);
    });
    sec.append(head,cards);wrap.append(sec);
  });
  // Keep links from earlier site versions pointing to the correct day-one section.
  for(const old of ["forever-first-night-gallery","goldshire-travel-gallery","lions-pride-inn-gallery"]){
    const marker=make("span","xg-legacy-anchor");marker.id=old;document.getElementById("xuthar-day-one-photos").prepend(marker);
  }
  const note=make("p","xg-provenance","The archive shows the original files uploaded by the player. No new victories, rewards or quest hand-ins are inferred from images without an explicit in-game confirmation.");
  wrap.append(note);main.append(wrap);

  let selected=0;
  const dialog=make("dialog","xg-lightbox");dialog.setAttribute("aria-label","Full-screen photo viewer");
  const panel=make("div","xg-lightbox-panel");
  const top=make("div","xg-lightbox-top"),number=make("span","xg-count"),close=make("button","xg-close","Close ×");
  close.type="button";close.addEventListener("click",()=>dialog.close());top.append(number,close);
  const image=make("img","xg-large");image.alt="";
  const text=make("div","xg-lightbox-description");
  const actions=make("div","xg-lightbox-actions");
  const back=make("button","","← Previous"),next=make("button","","Next →");
  back.type=next.type="button";
  back.addEventListener("click",()=>show((selected+photos.length-1)%photos.length));
  next.addEventListener("click",()=>show((selected+1)%photos.length));
  const original=make("a","xg-full-link","View original file ↗");original.rel="noopener";original.target="_blank";
  actions.append(back,original,next);panel.append(top,image,text,actions);dialog.append(panel);document.body.append(dialog);
  function show(i){
    if(!Number.isInteger(i)||i<0||i>=photos.length)return;
    selected=i;const p=photos[i];
    image.src=p.src;image.alt=p.title+". "+p.desc;
    text.textContent=p.title+" — "+p.desc;
    original.href=p.src;
    number.textContent=(selected+1)+" / "+photos.length+" · "+(p.group==="evidence"?"DOCUMENT":"ORIGINAL SCREENSHOT");
  }
  function openPhoto(i){
    show(i);if(!dialog.open)dialog.showModal();
  }
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft"){event.preventDefault();show((selected+photos.length-1)%photos.length)}
    else if(event.key==="ArrowRight"){event.preventDefault();show((selected+1)%photos.length)}
  });
  // Deep links continue to work, including links to legacy gallery anchors.
  const hash=location.hash.slice(1);
  if(hash){const el=document.getElementById(hash);if(el)requestAnimationFrame(()=>el.scrollIntoView({block:"start"}))}
})();