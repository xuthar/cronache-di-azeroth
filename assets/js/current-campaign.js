/* Current chapter · Duskwood roads, level 25, 22 November 2026. */
(() => {
  'use strict';
  if (!['forever','gallery'].includes(document.body.dataset.page)) return;
  const main = document.getElementById('main');
  if (!main || document.getElementById('current-duskwood-chapter')) return;
  const section = document.createElement('section');
  section.className = 'wrap';
  section.id = 'current-duskwood-chapter';
  section.style.cssText = 'padding:26px clamp(18px,3vw,32px);margin-block:20px;border:1px solid #587789;border-radius:12px;background:linear-gradient(110deg,#183640,#101a29);color:#f5e6ca;font-size:1rem';
  section.innerHTML = `<p class="eyebrow">22 NOVEMBER 2026 · THE DUSKWOOD ROADS · LEVEL 25</p>
<h2 style="font-family:Georgia,serif;color:#f2cf99">The Roads Beyond Darkshire</h2>
<p style="line-height:1.8;max-width:82ch">Xuthar reaches level 25. Nine new Duskwood completions since arrival bring the record to 257 completed quest IDs and sixteen active quests. Seventeen original Full HD photographs follow Watcher Backus, the Lost Stalker, Raven Hill, Abercrombie and Sven’s camp.</p>
<p style="line-height:1.8"><a href="duskwood-roads-2026-11-22.html" style="color:#ffe0a8">Duskwood: history, places and new quests</a> · <a href="book.html?character=xuthar#x-nov21-late-watchers" style="color:#ffe0a8">The Last Witness · Chapters 179–186</a> · <a href="gallery.html#duskwood-roads-photos" style="color:#ffe0a8">All seventeen original Full HD photographs</a></p>`;
  main.prepend(section);
})();
