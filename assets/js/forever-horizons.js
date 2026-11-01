/* Chronicles of Azeroth · Forever Horizons / 1 November 2026
   Progressive enhancement on top of the existing rendering, live data and roster. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  const launchAt = Date.parse('2026-11-04T23:00:00Z'); // 5 Nov, 00:00 CET
  const launched = Date.now() >= launchAt;
  const masthead = document.querySelector('.masthead');
  // A compact signal on every page connects the original archive to the new era.
  if (masthead && !document.querySelector('.forever-signal')) {
    const signal = document.createElement('aside');
    signal.className = 'forever-signal';
    signal.setAttribute('aria-label','World of Warcraft Forever launch');
    signal.innerHTML = '<div class="wrap forever-signal-inner">' +
      '<div class="forever-signal-copy"><span class="forever-signal-mark" aria-hidden="true"></span>' +
      '<strong>' + (launched ? 'FOREVER IS HERE' : 'THE ROAD TO FOREVER') + '</strong>' +
      '<span>' + (launched ? 'Our next chapter begins now.' : 'Europe · 5 November 2026 · 00:00 CET') + '</span></div>' +
      '<a href="forever.html">Explore Forever <span aria-hidden="true">↗</span></a></div>';
    masthead.insertAdjacentElement('afterend',signal);
  }
  // Seasonal decoration is retired everywhere, including old cached pages.
  document.querySelectorAll('.hallows-banner').forEach(el => el.remove());

  if (page === 'home') {
    const hero = document.querySelector('.hero');
    if (hero) {
      const title = hero.querySelector('h1');
      const lead = hero.querySelector('p');
      const kicker = hero.querySelector('.warfront-hero-kicker');
      const note = hero.querySelector('.hero-note');
      const first = hero.querySelector('.buttons .button');
      if (title) title.innerHTML = launched ?
        'A world to explore.<br><em>A lifetime to remember.</em>' :
        'Return to the beginning.<br><em>Stay for Forever.</em>';
      if (lead) lead.textContent = launched ?
        'No rush to the endgame. Just quests, distant horizons, hidden stories and three travellers ready to discover the world at their own pace.' :
        'The gates open on 5 November. The best part is not the destination — it is every quest, every quiet road and every story along the way.';
      if (kicker) kicker.textContent = launched ? 'The Forever era · A new adventure' :
        'WoW Forever · 5 November 2026';
      if (first) first.textContent = launched ? 'Enter the Forever journey' : 'Discover the Forever journey';
      if (note) note.textContent = 'An independent Azeroth journal · By Xuthar';
      const oldFootnote = hero.querySelector('.warfront-hero-footnote');
      if (oldFootnote) oldFootnote.remove();
      if (!hero.querySelector('.evergreen-hero-caption')) {
        hero.querySelector('.hero-content')?.insertAdjacentHTML('beforeend',
          '<div class="evergreen-hero-caption"><span>Exploration</span><span>Stories</span><span>Azeroth at our pace</span></div>');
      }
    }
    const anchor = document.querySelector('.warfront-newsbar') || document.querySelector('.home-live');
    if (anchor && !document.querySelector('.evergreen-compass')) {
      anchor.insertAdjacentHTML('afterend',
        '<section class="evergreen-compass" aria-labelledby="evergreen-compass-title">' +
        '<div class="evergreen-compass-header"><div><span class="eyebrow">Choose your next road</span>' +
        '<h2 id="evergreen-compass-title">Your paths through Azeroth</h2></div>' +
        '<p>One world, many ways to wander. Pick a trail and make the journey your own.</p></div>' +
        '<div class="evergreen-paths">' +
        '<a class="evergreen-path" href="forever.html"><small>01 · The beginning</small><strong>WoW Forever</strong><span>Launch, guides and our new adventurers ↗</span></a>' +
        '<a class="evergreen-path" href="journal.html"><small>02 · The journey</small><strong>Travel journal</strong><span>Quiet roads and pages yet to be written ↗</span></a>' +
        '<a class="evergreen-path" href="stories.html"><small>03 · The fireside</small><strong>Stories & Lore</strong><span>Tales from the wider world of Azeroth ↗</span></a>' +
        '<a class="evergreen-path" href="gallery.html"><small>04 · The horizon</small><strong>The gallery</strong><span>Moments, landscapes and memories ↗</span></a>' +
        '</div></section>');
    }
  }
  if (page === 'forever') {
    const header = document.querySelector('.page-header');
    if (header) {
      const intro = header.querySelector('p');
      if (intro) intro.textContent = launched ?
        'Azeroth is open again. Explore our characters, the official resources and the journeys beginning in this new world.' :
        'The beta has ended. The new world opens on 5 November at 00:00 CET in Europe. Meet our heroes, discover the launch resources and prepare for the first journey.';
    }
    const banner = document.querySelector('.warfront-forever-banner');
    if (banner && !document.querySelector('.evergreen-manifesto')) {
      banner.insertAdjacentHTML('afterend',
        '<section class="evergreen-manifesto" aria-labelledby="evergreen-manifesto-title">' +
        '<span class="eyebrow">The philosophy of this personal chronicle</span>' +
        '<h2 id="evergreen-manifesto-title">The world matters more than the race.</h2>' +
        '<div class="evergreen-manifesto-grid">' +
        '<article><strong>Go slowly.</strong><p>Take the long route. Read the quests. Let every zone tell its own story.</p></article>' +
        '<article><strong>Make it personal.</strong><p>Xuthar, Thorgar and Aelyndra will write their histories through the places they visit.</p></article>' +
        '<article><strong>Keep exploring.</strong><p>Campfires, professions, secrets, friendships — there is more to Azeroth than a level cap.</p></article>' +
        '</div></section>');
    }
  }
})();