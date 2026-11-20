/* Current literary campaign. Quest facts from 20 Nov official Blizzard snapshot are separate from unverified location/presence. */
(()=>{'use strict';
if(!['forever','gallery'].includes(document.body.dataset.page))return;
const main=document.getElementById('main');
if(main&&!document.getElementById('darkshire-nov20-update'))main.insertAdjacentHTML('afterbegin',
`<section class="wrap" id="darkshire-nov20-update" style="padding:26px clamp(18px,3vw,32px);margin-block:20px;border:1px solid rgba(215,171,108,.43);border-radius:12px;background:linear-gradient(110deg,#192a2b,#111a28);color:#f5e7cf">
<p class="eyebrow">20 NOVEMBER 2026 · TWO QUESTS COMPLETED · LEVEL 24</p>
<h2 style="font-family:Georgia,serif;color:#f3d49e">The Letter That Could Not Bring an Army</h2>
<p style="line-height:1.8;max-width:82ch">Two newly completed steps in <em>Messenger to Darkshire</em> lead from Magistrate Solomon in Lakeshire to Lord Ebonlocke in Duskwood and back. The Night Watch cannot leave its own threatened town. Blizzard now reports 245 completed quest IDs and eight in progress; precise travel times and the current location remain unknown.</p>
<p><a href="book.html?character=xuthar#x-nov20-the-plea" style="color:#ffe0a8">The Last Witness · Chapters 154–159 →</a> · <a href="journal.html#day-2026-11-20" style="color:#ffe0a8">Travel Journal →</a> · <a href="missions.html#nov20-verified-quests" style="color:#ffe0a8">Verified quests →</a></p></section>`);
})();
