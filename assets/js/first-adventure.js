/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-camping-101';
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
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. Now level six by his traveller’s latest report, Xuthar has followed the six kobold traces and may report his findings. New lessons now beckon: learn Cooking from Tomas in Goldshire and raise Herbalism skill to twenty, while Innkeeper Farley and other contacts still await him. His story is no longer a promise: it is being written.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 6</b><span>Human Priest · Player-reported milestone</span></div>
            <div><b>Herbalism</b><span>New training goal · Skill 20</span></div>
            <div><b>Cooking</b><span>Learn from Tomas · Goldshire</span></div>
          </div>
          <div class="first-night-links"><a href="${book}">Read Chapter XIV · Herbs & Hearth →</a><a class="secondary" href="journal.html#xuthar-camping-101-professions">Latest quest journal →</a><a class="secondary" href="xuthar.html#xuthar-quests">Quest log · 1 ready / 5 active ↗</a></div>
          <p class="first-night-fine">Player-reported character level 6. Latest screenshot: the kobold-tracking quest is ready to turn in, and five other quests are active. Camping 101 adds Herbalism and Cooking lessons; neither profession is yet confirmed learned or trained. Narrative imagery is original roleplay fiction.</p>
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
      <h2 id="xu-first-session-title">Leaves, embers and the road to Goldshire.</h2>
      <p>Xuthar has reached character level 6 according to the player's latest report. After the wolves, kobolds, Defias and a quiet rest at Northshire Abbey, new assignments point toward Goldshire. The latest screenshot shows the kobold-tracking quest ready for turn-in and five active assignments. Two new Camping 101 lessons invite Xuthar to learn Herbalism and Cooking. Chapter XIV explores this quieter side of adventure without inventing profession progress.</p>
      <div class="first-night-links"><a href="book.html?character=xuthar#x-camping-101">Read Chapter XIV · Leaves and embers →</a><a href="journal.html#xuthar-camping-101-professions">Read the latest quest update →</a><a href="#xuthar-quests">View six visible quests ↗</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
