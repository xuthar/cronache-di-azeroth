/* Xuthar's original image archive. Original gameplay captures and documentary screenshots, preserving true image dimensions. */
(() => {
  "use strict";
  if (document.body.dataset.page !== "gallery") return;
  const photos = [{"src":"assets/images/forever-screenshots/day-02/150517.jpg","title":"A camp outside Goldshire","desc":"A canvas tent and a fire beside the forest road.","time":"15:05","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/150619.jpg","title":"Xuthar Camera in action","desc":"The minimap camera button and successful screenshot message.","time":"15:06","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/151253.jpg","title":"The fishing dock","desc":"Lee Brown and the crowd of anglers at Crystal Lake.","time":"15:12","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/151346.jpg","title":"Casting the line","desc":"Xuthar practising Fishing at the lakeshore.","time":"15:13","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/152750.jpg","title":"Murloc on the shore","desc":"The priest faces a level-seven Murloc.","time":"15:27","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/155448.jpg","title":"The river keeps no footprints","desc":"Sunlight reflected across the water during the crossing.","time":"15:54","group":"day2"},{"src":"assets/images/forever-screenshots/day-02/163117.jpg","title":"Into the Elwynn woods","desc":"A Forest Spider waits among the trees.","time":"16:31","group":"day2"},{"time":"00:17","src":"assets/images/forever-screenshots/day-01/001736.jpg","title":"The crowd at Northshire Abbey","desc":"Adventurers gather outside the abbey during the first night of WoW Forever.","anchor":"xuthar-northshire-crowd","group":"day1"},{"time":"00:30","src":"assets/images/forever-screenshots/day-01/003032.jpg","title":"The Northshire gathering","desc":"A quieter view of the night-time gathering and the path beyond Northshire Abbey.","anchor":"xuthar-northshire-night-gathering","group":"day1"},{"time":"00:42","src":"assets/images/forever-screenshots/day-01/004250.jpg","title":"A spark in the woods","desc":"Xuthar fights among the wolves and kobolds in Northshire's dark forest.","anchor":"xuthar-northshire-first-fights","group":"day1"},{"time":"00:42","src":"assets/images/forever-screenshots/day-01/004254.jpg","title":"Silence after the spell","desc":"Night deep in the wooded hills beyond the abbey.","anchor":"xuthar-northshire-forest-night","group":"day1"},{"time":"01:34","src":"assets/images/forever-screenshots/day-01/013403.jpg","title":"The fourth threshold","desc":"Xuthar reaches level four while fighting kobolds among the trees.","anchor":"xuthar-northshire-level-four","group":"day1"},{"time":"01:56","src":"assets/images/forever-screenshots/day-01/015649.jpg","title":"Deeper into Northshire","desc":"The forest path and troubled woodland beyond the abbey.","anchor":"xuthar-northshire-woodland","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/134935.jpg","title":"The Elwynn campfire","desc":"A gathering of adventurers along a cobbled forest road.","time":"13:49","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/134948.jpg","title":"Travellers beside the fire","desc":"The same quiet meeting seen from the other side.","time":"13:49","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/140058.jpg","title":"Crystal Lake and Guard Roberts","desc":"A still moment near the water during the priest's early journey.","time":"14:00","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/184652.jpg","title":"Level seven","desc":"The reward for Garments of the Light and Xuthar's seventh level.","time":"18:46","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/190449.jpg","title":"Fargodeep Mine · First setback","desc":"Danger among Kobold Miners and a Rumbler.","time":"19:04","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/190746.jpg","title":"Fargodeep Mine · Second setback","desc":"Another hard encounter in the mine.","time":"19:07","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192459.jpg","title":"The stone passage","desc":"Torchlit walls on the route into Stormwind.","time":"19:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192520.jpg","title":"Stormwind's trade streets","desc":"Timbered houses and cobbles in the capital.","time":"19:25","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192624.jpg","title":"Level eight","desc":"Shipment to Stormwind completed beside Morgan Pestle.","time":"19:26","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/192634.jpg","title":"Morgan Pestle","desc":"A quiet moment in the Stormwind shop.","time":"19:26","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202423.jpg","title":"Stormwind canal","desc":"A view from the wooden dock at dusk.","time":"20:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202433.jpg","title":"The canal dock","desc":"Xuthar facing the water and anglers beyond.","time":"20:24","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/202853.jpg","title":"Through the torchlit tunnel","desc":"Beginning the return journey from the city.","time":"20:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212811.jpg","title":"Under the evening lamps","desc":"The road leading away from Stormwind.","time":"21:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212845.jpg","title":"The monumental bridge","desc":"The statues guarding the route to the capital.","time":"21:28","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/212958.jpg","title":"Rain over Elwynn","desc":"Wet cobblestones on the night road.","time":"21:29","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/213316.jpg","title":"Goldshire in the rain","desc":"The familiar blue roof and travellers at dusk.","time":"21:33","group":"day1"},{"src":"assets/images/forever-screenshots/day-01/213455.jpg","title":"At rest in the Lion's Pride Inn","desc":"Xuthar lying down after the first day.","time":"21:34","group":"day1"}];
  const groups = [
    {id:"xuthar-day-one-photos",label:"DAY ONE · 5 NOVEMBER 2026",heading:"From Northshire to Stormwind and Home",kind:"day1",note:"Twenty-four original Full HD screenshots"},
    {id:"xuthar-day-two-photos",label:"DAY TWO · 6 NOVEMBER 2026",heading:"Crystal Lake, the River & the Woods",kind:"day2",note:"Seven original Full HD screenshots"}
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
  for(const [number,label] of [[photos.length,"Gameplay photographs"],[groups.length,"Travel collections"]]){
    const stat=make("span","");
    stat.append(make("b","",String(number)),document.createTextNode(label));
    stats.append(stat);
  }
  header.append(stats);
  const nav=make("nav","xg-tabs");
  nav.setAttribute("aria-label","Photo collections");
  for(const [anchor,label] of [
    ["#xuthar-day-one-photos","Day One · 5 Nov"],
    ["#xuthar-day-two-photos","Day Two · 6 Nov"]
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
      if(p.anchor)card.id=p.anchor;
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
        group.kind==="day2"?"6 Nov · "+p.time:(p.time||"Diary / quest evidence");
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
    "Only original in-world gameplay photographs are published here. Quest trackers and journal screenshots are kept for writing the novel, not displayed in the gallery. Photographs retain their original proportions and are available at full size."
  ));
  main.append(wrap);
  const hash=location.hash.slice(1);
  if(hash){
    const target=document.getElementById(hash);
    if(target)requestAnimationFrame(()=>target.scrollIntoView({block:"start"}));
  }
})();
