/* Current chapter · Duskwood arrival, 21 November 2026. */
(() => {
  'use strict';
  if (!['forever','gallery'].includes(document.body.dataset.page)) return;
  const main = document.getElementById('main');
  if (!main || document.getElementById('current-duskwood-chapter')) return;
  const section = document.createElement('section');
  section.className = 'wrap';
  section.id = 'current-duskwood-chapter';
  section.style.cssText = 'padding:26px clamp(18px,3vw,32px);margin-block:20px;border:1px solid #587789;border-radius:12px;background:linear-gradient(110deg,#183640,#101a29);color:#f5e6ca;font-size:1rem';
  section.innerHTML = `<p class="eyebrow">21 NOVEMBER 2026 · DUSKWOOD BEGINS · LEVEL 24</p>
<h2 style="font-family:Georgia,serif;color:#f2cf99">Darkshire · Where the Lanterns Hold</h2>
<p style="line-height:1.8;max-width:82ch">Xuthar arrives beneath Darkshire’s clock tower. Eleven new commissions open Duskwood: the Night Watch, Stalvan’s first clues and the Valor family’s forgotten history. The official profile confirms 248 completed quest IDs and 17 active quests. The introductory Stalvan errand #66 is complete; the next stage remains active.</p>
<p style="line-height:1.8"><a href="duskwood.html" style="color:#ffe0a8">Duskwood: history, places and new quests</a> · <a href="book.html?character=xuthar#x-nov21-darkshire-arrival" style="color:#ffe0a8">The Last Witness · Chapters 171–178</a> · <a href="gallery.html#duskwood-arrival-photos" style="color:#ffe0a8">The original Full HD photograph</a></p>`;
  main.prepend(section);
})();
