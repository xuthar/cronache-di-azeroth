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
  if(!main)return;
  main.className="xg-main";
  main.replaceChildren();
  const make=(tag,className,text)=>{
    const el=document.createElement(tag);
    if(className)el.className=className;
    if(text!==undefined)el.textContent=text;
    return el;
  };
  const wrap=make("div","wrap xg-wrap");
  const header=make("header","xg-heading");
  header.append(
    make("p","xg-eyebrow","CHRONICLES OF AZEROTH · XUTHAR MORVAYNE"),
    make("h1","","The Photographic Chronicle"),
    make("p","xg-intro","Real moments, preserved in full. Every thumbnail comes from a separate original screenshot — never from a stretched collage. Open any image for the complete file.")
  );
  const stats=make("div","xg-summary");
  for(const [number,label] of [[25,"Gameplay photographs"],[8,"In-game records"],[33,"Original files"]]){
    const stat=make("span","");
    stat.append(make("b","",String(number)),document.createTextNode(label));
    stats.append(stat);
  }
  header.append(stats);
  const nav=make("nav","xg-tabs");
  nav.setAttribute("aria-label","Photo collections");
  for(const [anchor,label] of [
    ["#xuthar-day-two-photos","Day Two · 6 Nov"],
    ["#xuthar-day-one-photos","Day One · 5 Nov"],
    ["#xuthar-diary-evidence","Diaries & missions"]
  ]){
    const link=make("a","",label);link.href=anchor;nav.append(link);
  }
  wrap.append(header,nav);
  for(const group of groups){
    const section=make("section","xg-section");section.id=group.id;
    const sectionHead=make("div","xg-section-head");
    const titles=make("div","");
    titles.append(make("span","xg-eyebrow",group.label),make("h2","",group.heading));
    sectionHead.append(titles,make("p","",group.note));
    const grid=make("div","xg-photo-grid"+(group.kind==="evidence"?" xg-photo-grid--evidence":""));
    for(const [i,p] of photos.filter(x=>x.group===group.kind).entries()){
      const card=make("figure","xg-photo-card");
      const anchor=make("a","xg-photo-view");
      anchor.href=p.src;
      anchor.target="_blank";anchor.rel="noopener noreferrer";
      anchor.setAttribute("aria-label","View original photograph: "+p.title);
      const frame=make("span","xg-photo-frame");
      const img=make("img","xg-photo-img");
      img.src=p.src;img.alt=p.title+". "+p.desc;
      img.loading="lazy";img.decoding="async";
      if(group.kind!=="evidence"){img.width=1920;img.height=1080}
      img.addEventListener("error",()=>{
        frame.classList.add("xg-photo-error");
        img.remove();
        frame.append(make("span","xg-photo-error-message","Preview unavailable · open original file"));
      });
      frame.append(img);anchor.append(frame);
      const caption=make("figcaption","xg-photo-details");
      const meta=group.kind==="day1"?"5 Nov · "+p.time:
        group.kind==="day2"?"6 Nov · "+p.time:"Diary / quest evidence";
      caption.append(
        make("span","xg-photo-meta",String(i+1).padStart(2,"0")+" · "+meta),
        make("h3","",p.title),
        make("p","",p.desc)
      );
      const actions=make("div","xg-photo-actions");
      const full=make("a","xg-original-link","View full size ↗");
      full.href=p.src;full.target="_blank";full.rel="noopener noreferrer";
      const save=make("a","xg-save-link","Save original");
      save.href=p.src;save.download=p.src.split("/").pop();
      actions.append(full,save);caption.append(actions);
      card.append(anchor,caption);grid.append(card);
    }
    section.append(sectionHead,grid);wrap.append(section);
  }
  // Legacy deep links continue to reach Day One, with no legacy photo atlas.
  const historic=wrap.querySelector("#xuthar-day-one-photos");
  for(const oldId of ["forever-first-night-gallery","goldshire-travel-gallery","lions-pride-inn-gallery"]){
    const marker=make("span","xg-legacy-anchor");marker.id=oldId;historic.prepend(marker);
  }
  wrap.append(make("p","xg-provenance",
    "Original in-game captures and documentary screenshots. The interface preserves the image proportions, does not crop the originals, and does not infer undocumented quest completions or achievements."
  ));
  main.append(wrap);
  const hash=location.hash.slice(1);
  if(hash){
    const target=document.getElementById(hash);
    if(target)requestAnimationFrame(()=>target.scrollIntoView({block:"start"}));
  }
})();
