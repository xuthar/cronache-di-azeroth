/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-live-9';
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
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. Now level five, his Brotherhood of Thieves objective complete, the young priest has returned to the abbey to rest. His story is no longer a promise: it is being written.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 5</b><span>Human Priest · Roleplay journey</span></div>
            <div><b>Defias</b><span>Brotherhood of Thieves · Objective complete</span></div>
            <div><b>Northshire</b><span>Back at the abbey · Resting</span></div>
          </div>
          <div class="first-night-links"><a href="${book}">Read Book I · Defias & the Abbey →</a><a class="secondary" href="journal.html#northshire-abbey-rest">Read the latest field journal →</a></div>
          <p class="first-night-fine">Player-reported: level 5, Brotherhood of Thieves objective complete, resting at Northshire Abbey. Narrative imagery is original roleplay fiction; quest hand-in and rewards remain unconfirmed.</p>
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
      <h2 id="xu-first-session-title">From the Defias fields to the abbey's silence.</h2>
      <p>Now level 5, Xuthar has crossed the launch-night crowds of Northshire, fought wolves and kobolds, faced the Defias and completed the Brotherhood of Thieves objective. He has returned to Northshire Abbey to rest. The living novel now includes Chapters VIII–IX, a victory and the silence that follows.</p>
      <div class="first-night-links"><a href="${book}">Open the latest chapters →</a><a href="journal.html#northshire-abbey-rest">Read the latest session record →</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
