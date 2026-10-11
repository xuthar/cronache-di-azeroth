// Xuthar quest progress transcribed from the owner's screenshot received 11 October 2026.
// Manual snapshot: no live synchronisation or per-quest completion claims.
(() => {
  const main = document.querySelector('#main');
  if (!main || document.body.dataset.page !== 'retail') return;
  const categories = [["Allied Races",48,54],["Battle for Azeroth",1146,1595],["Battlegrounds",2,44],["Campaigns",71,213],["Cataclysm",43,51],["Classes",0,3],["Draenor",479,726],["Dragonflight",635,2216],["Dungeons",111,401],["Eastern Kingdoms",730,1119],["Garrison",143,274],["Kalimdor",753,1170],["Legion",881,1256],["Midnight",1019,1540],["Miscellaneous",117,334],["Northrend",622,1080],["Outland",506,806],["Pandaria",674,987],["Professions",141,790],["Raids",62,295],["Shadowlands",906,2277],["Uncategorized",0,18],["War Within",1154,1831],["World Events",161,161]];
  const number = value => value.toLocaleString('en-GB');
  const meter = (name, completed, total) => {
    const percent = (completed / total * 100).toFixed(1);
    return `<div class="quest-progress-item"><div class="quest-progress-label"><span>${name}</span><span>${number(completed)} / ${number(total)}</span></div><progress max="${total}" value="${completed}" aria-label="${name}: ${number(completed)} of ${number(total)} completed">${percent}%</progress><span class="quest-progress-percent">${percent}% complete</span></div>`;
  };
  const section = `<section class="quest-progress section" id="xuthar-quest-progress" aria-labelledby="quest-progress-title"><div class="section-head"><div><span class="eyebrow">Xuthar · Pozzo dell’Eternità (EU)</span><h2 id="quest-progress-title">A lifetime of quests</h2></div><a class="text-link" href="#retail-01">Meet Xuthar ↓</a></div><p>Across continents and expansions, every completed quest leaves another mark on Xuthar’s journey.</p><div class="quest-progress-overall">${meter('Overall progress',10776,19847)}<p>9,071 quests remaining in this Wowhead list.</p></div><details class="quest-progress-details"><summary>Explore all 24 quest categories</summary><div class="quest-progress-grid">${categories.map(row => meter(...row)).join('')}</div></details><p class="meta">Manual snapshot · Screenshot received <time datetime="2026-10-11">11 October 2026</time>. These are the counts shown in the supplied Wowhead quest list, not a live feed or a Loremaster achievement tracker. Category counts are reproduced as shown; they are not added together to calculate the overall total.</p><a class="text-link" href="https://www.wowhead.com/list=208806294/eu-pozzo-delleternit%C3%A0-xuthar#4-quests;compare:identical;0+1+2" target="_blank" rel="noopener noreferrer">Open Xuthar’s quest list on Wowhead ↗</a></section>`;
  const intro = main.querySelector('.demo-note');
  if (intro) intro.insertAdjacentHTML('afterend',section);
})();
