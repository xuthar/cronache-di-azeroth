/* Shared current adventure notice; historical entries retain their dates. */
(() => {
'use strict';
const page=document.body.dataset.page;
if(!['forever','missions','book','chronicle'].includes(page))return;
const main=document.getElementById('main');
if(!main||document.getElementById('redridge-current-campaign'))return;
main.insertAdjacentHTML('afterbegin',"<section id=\"redridge-current-campaign\" class=\"wrap\" style=\"padding-block:30px;border-bottom:1px solid #b38f5c\"><p class=\"eyebrow\">CURRENT ADVENTURE · 17 NOVEMBER 2026 · LEVEL 23</p><h2>Together Again in Redridge</h2><p>Xuthar Morvayne and Carro Steelcave have reunited. The two companions return to Redridge to tackle its hardest unfinished quests, with Yowler, Incinerator Gar’im and Gath’Ilzogg still ahead of them.</p><p><a href=\"xuthar.html#redridge-reunited-2026-11-17\">Read the reunion story →</a> · <a href=\"book.html?character=xuthar#x-nov17-redridge-reunion\">The Last Witness · Chapters 127–129 →</a> · <a href=\"journal.html#day-2026-11-17\">Today’s Travel Journal →</a></p></section>");
})();
