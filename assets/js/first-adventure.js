/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-kobold-tracks-ready-inn-ready-inn';
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
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. Now level six by his traveller’s latest report, Xuthar has followed the six kobold traces and may report his findings. A new quest points him to Innkeeper Farley at the Lion’s Pride Inn, while Goldshire’s other calls remain unanswered. His story is no longer a promise: it is being written.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 6</b><span>Human Priest · Player-reported milestone</span></div>
            <div><b>Kobold trail</b><span>Six tracks found · Ready to report</span></div>
            <div><b>Goldshire</b><span>Lion’s Pride Inn · New destination</span></div>
          </div>
          <div class="first-night-links"><a href="${book}">Read Chapter XIII · Six Signs →</a><a class="secondary" href="journal.html#xuthar-kobold-tracks-ready-inn">Latest quest journal →</a><a class="secondary" href="xuthar.html#xuthar-quests">Quest log · 1 ready / 4 active ↗</a></div>
          <p class="first-night-fine">Player-reported character level 6. Latest screenshot: Shhh! We’re Hunting Kobolds is ready for turn-in; Rest and Relaxation and three other quests remain active. The inn visit, quest delivery and rewards are not yet shown. Narrative imagery is original roleplay fiction.</p>
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
      <h2 id="xu-first-session-title">Six signs found. A lantern on the horizon.</h2>
      <p>Xuthar has reached character level 6 according to the player's latest report. After the wolves, kobolds, Defias and a quiet rest at Northshire Abbey, new assignments point toward Goldshire. The latest screenshot shows the kobold-tracking quest ready for turn-in and four active assignments, including Rest and Relaxation at the Lion’s Pride Inn. Chapter XIII imagines the promise of the inn without inventing Xuthar’s arrival.</p>
      <div class="first-night-links"><a href="book.html?character=xuthar#x-kobold-tracks-ready-inn">Read Chapter XIII · Six signs and a distant lantern →</a><a href="journal.html#xuthar-kobold-tracks-ready-inn">Read the latest quest update →</a><a href="#xuthar-quests">View five visible quests ↗</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
