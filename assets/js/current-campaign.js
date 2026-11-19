/* Latest personal campaign; official Blizzard API data remains separate from the literary record. */
(()=>{'use strict';if(!['forever','missions','book','chronicle','gallery'].includes(document.body.dataset.page))return;
const main=document.getElementById('main');
if(main&&!document.getElementById('rest-nov19-update'))main.insertAdjacentHTML('afterbegin',
`<section class="wrap" id="rest-nov19-update" style="padding:26px clamp(18px,3vw,32px);margin-block:20px;border:1px solid rgba(219,184,127,.45);border-radius:12px;background:linear-gradient(120deg,#2f241d,#111c2b);color:#f5e6ca" aria-labelledby="rest-nov19-heading">
<p class="eyebrow">19 NOVEMBER 2026 · LAKESHIRE · LEVEL 24 · RESTING</p>
<h2 id="rest-nov19-heading" style="font-family:Georgia,serif;color:#f2cf99">A Day Without Swords</h2>
<p style="line-height:1.8;max-width:80ch">Exhausted and troubled by old pains, Xuthar leaves the roads to others today. Beside the Lakeshire hearth, he reads of the Kaldorei, Tirisfal and the Emerald Dream, while his thoughts follow Carro Steelcave into Maraudon in pursuit of the rare Blade of Eternal Darkness. No adventuring or quest completions for Xuthar today; the blade has not been confirmed found.</p>
<p><a href="book.html?character=xuthar#x-nov19-old-wounds" style="color:#ffe0a8">The Last Witness · Chapters 148–153 →</a> · <a href="journal.html#day-2026-11-19" style="color:#ffe0a8">Travel Journal →</a></p></section>`);
})();
