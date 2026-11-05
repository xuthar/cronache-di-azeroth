/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-rain-over-goldshire';
  if(page==='home'){
    const hero=document.querySelector('#main .hero');
    if(!hero||document.querySelector('.first-night'))return;
    const section=document.createElement('section');
    section.className='first-night wrap';
    section.id='xuthar-first-night';
    section.setAttribute('aria-labelledby','first-night-title');
    section.innerHTML=`
      <div class="first-night-body">
        <div class="first-night-copy">
          <span class="first-night-overline">5 November 2026 · Xuthar Morvayne's living chronicle</span>
          <h2 id="first-night-title">The world awoke.<br><em>The Last Witness endures.</em></h2>
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. Now level eight, confirmed by in-game chat, Xuthar has completed Bounty on Garrick Padfoot, Garments of the Light and Shipment to Stormwind. Beyond the stone lion of Northshire, he has reached Goldshire and entered the Lion’s Pride Inn. There he stood beside Innkeeper Farley, found Tomas the Cook, and finally sat down by the glowing hearth. His road has continued past Guard Roberts, two defeats in Fargodeep Mine, and the stone walls and canals of Stormwind. After several reported Stormwind quest hand-ins, he has learned Tailoring, Enchanting and Fishing, abandoning Herbalism. At nightfall he returned through the rain to Goldshire and lay down in an upstairs room at Lion’s Pride Inn. The living chronicle continues tomorrow.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 8</b><span>Human Priest · Confirmed in game chat</span></div>
            <div><b>New trades</b><span>Tailoring · Enchanting · Fishing</span></div>
            <div><b>Goldshire</b><span>Rainy night · Resting at Lion’s Pride Inn</span></div>
          </div>
          <div class="first-night-links"><a href="book.html?character=xuthar#x-rain-over-goldshire">Read Chapter XX · The Rain →</a><a class="secondary" href="journal.html#xuthar-rainy-goldshire-rest">Latest travel journal →</a><a class="secondary" href="xuthar.html#xuthar-quests">Quest record · Level 8 ↗</a></div>
          <p class="first-night-fine">Screenshots confirm levels seven and eight, Garments of the Light (270 XP and Friar’s Robes of the Light), and Shipment to Stormwind (800 XP). Two deaths in Fargodeep Mine and Stormwind arrival are documented. Some later Stormwind quest deliveries are player-reported but their exact titles and rewards remain unknown; the 20:24 quest tracker is historical. The final photographs show rain outside Goldshire and Xuthar resting in a bed. Literary imagery remains original fiction.</p>
        </div>
        <figure class="first-night-figure"><img src="assets/images/gallery/stormwind-midnight.jpg" alt="Moody fantasy city under a dark sky, illustrative cover art" loading="lazy"><figcaption>Atmospheric archive artwork · Not a screenshot from this session</figcaption></figure>
      </div>`;
    hero.insertAdjacentElement('afterend',section);
  }
  if(page==='xuthar'){
    const opening=document.querySelector('.xu-opening');
    if(!opening||document.querySelector('.xu-first-night'))return;
    const panel=document.createElement('section');
    panel.className='xu-first-night wrap';
    panel.id='xu-first-session';
    panel.setAttribute('aria-labelledby','xu-first-session-title');
    panel.innerHTML=`
      <span class="first-night-overline">NEW · 5 NOVEMBER 2026 · THE FIRST PLAYED ADVENTURE</span>
      <h2 id="xu-first-session-title">Back to Goldshire: the rain and the quiet room.</h2>
      <p>The player screenshots now confirm level 8, Garments of the Light completed and Shipment to Stormwind handed in. After crossing Elwynn and enduring two defeats in Fargodeep Mine, Xuthar reached Stormwind, delivered several quests and learned Tailoring, Enchanting and Fishing, leaving Herbalism behind. Seven new photographs show his rainy journey home and his rest in a bed at Goldshire’s Lion’s Pride Inn. Named quests not separately documented remain unconfirmed.</p>
      <div class="first-night-links"><a href="book.html?character=xuthar#x-rain-over-goldshire">Read Chapter XX · The Last Light Before Sleep →</a><a href="journal.html#xuthar-rainy-goldshire-rest">Read tonight’s Goldshire journal →</a><a href="#xuthar-quests">View current quest tracker ↗</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
