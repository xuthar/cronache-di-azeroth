/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-lions-pride-hearth';
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
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. Now level six, confirmed by the game’s own record, Xuthar has completed Bounty on Garrick Padfoot and received 340 XP. Beyond the stone lion of Northshire, he has reached Goldshire and entered the Lion’s Pride Inn. There he stood beside Innkeeper Farley, found Tomas the Cook, and finally sat down by the glowing hearth. Further conversations and lessons still await. His story is no longer a promise: it is being written.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 6</b><span>Human Priest · Confirmed in game chat</span></div>
            <div><b>Garrick</b><span>Bounty completed · 340 XP</span></div>
            <div><b>Lion’s Pride Inn</b><span>Farley · Tomas · A moment of rest</span></div>
          </div>
          <div class="first-night-links"><a href="${book}">Read Chapter XVI · The Quiet Hearth →</a><a class="secondary" href="journal.html#xuthar-inside-lions-pride-inn">Latest quest journal →</a><a class="secondary" href="xuthar.html#xuthar-quests">Quest record · 1 confirmed / 4 visible ↗</a></div>
          <p class="first-night-fine">Game-chat-confirmed level 6 and Bounty on Garrick Padfoot completed (340 XP). Four new screenshots confirm the inn visit and Xuthar seated at rest. No conversation reward, Cooking training or further quest turn-in is inferred. Literary imagery remains original fiction.</p>
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
      <h2 id="xu-first-session-title">At the Lion’s Pride Inn: the quiet after the road.</h2>
      <p>Level 6 and the completion of Bounty on Garrick Padfoot are now confirmed in a gameplay screenshot (340 XP). Seven earlier photos trace the road to Goldshire; four new photographs show Xuthar inside the Lion’s Pride Inn, close to Farley and Tomas, before he sits down to rest. Chapter XVI preserves the welcome of the hearth without claiming completed dialogues, profession training or other quest deliveries.</p>
      <div class="first-night-links"><a href="book.html?character=xuthar#x-lions-pride-hearth">Read Chapter XVI · The Inn Where Time Stood Still →</a><a href="journal.html#xuthar-inside-lions-pride-inn">Read the Goldshire travel diary →</a><a href="#xuthar-quests">View four visible quests ↗</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
  }
})();
