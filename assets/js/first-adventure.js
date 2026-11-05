/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-live-1';
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
          <span class="first-night-overline">5 November 2026 · The first night in Forever</span>
          <h2 id="first-night-title">The world awoke.<br><em>So did the Last Witness.</em></h2>
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne crossed the threshold, found Northshire alive with a thousand voices, and carried his unanswered prayers into the forests of Echo Ridge. The first true pages of his story have now been written.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Northshire</b><span>Human Priest · Roleplay arrival</span></div>
            <div><b>Level 3</b><span>Marshal McBride · Priest trainer found</span></div>
            <div><b>Echo Ridge</b><span>Kobold Workers 5/10 · Quest in progress</span></div>
          </div>
          <div class="first-night-links"><a href="${book}">Read Book I · The first night →</a><a class="secondary" href="journal.html#forever-first-night">Read the field journal →</a></div>
          <p class="first-night-fine">Inspired by the player's 5 November session and screenshots. Literary details are original fiction; quest progress is reported, not automatically verified.</p>
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
      <h2 id="xu-first-session-title">Northshire welcomed its Last Witness.</h2>
      <p>The fictional origins have become a living story. At level 3, Xuthar has passed through the launch-night crowds, fought wolves, met his Priest trainer and begun the unfinished work at Echo Ridge. The first full, novelised chapters of his journey are now part of the interactive book.</p>
      <div class="first-night-links"><a href="${book}">Open the first-night chapters →</a><a href="journal.html#forever-first-night">Read the factual session notes →</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
