/* Chronicles of Azeroth · cinematic editorial layer.
   Runs after the existing feature modules; never replaces live feed or character data. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  const launch = Date.parse('2026-11-04T23:00:00Z');
  const reservationsEnd = Date.parse('2026-11-03T23:00:00Z');
  const now = Date.now();
  const isLive = now >= launch;
  const isFinalHours = !isLive && now >= reservationsEnd;
  const phase = isLive ? 3 : isFinalHours ? 2 : 1;
  const title = isLive ? 'The gates are open.' : (isFinalHours ? 'The last night before the dawn.' : 'Azeroth is holding its breath.');
  const tagline = isLive ? 'The journey has begun. The stories are yours to write.' :
    (isFinalHours ? 'The names are chosen. The roads await. Tomorrow we step into the unknown.' :
    'The beta is over. The names are being chosen. One world, three heroes, and a legend about to unfold.');
  const pathMarkup = '<div class="warfront-launch-path" aria-label="The road to launch">' +
    [
      ['23 OCT · COMPLETE','The beta closes','The testing chapter ends'],
      ['27 OCT – 3 NOV','The names are chosen','Early reservations for eligible accounts'],
      ['5 NOV · 00:00 CET','Forever begins','A new Azeroth opens in Europe']
    ].map((step,i) => '<div class="warfront-step ' + (i<phase?'is-done':i===phase?'is-active':'') +
      '"><small>' + step[0] + '</small><strong>' + step[1] + '</strong><span>' + step[2] + '</span></div>').join('') + '</div>';
  const liveLink = '<a href="https://worldofwarcraft.blizzard.com/it-it/news/24303866/prenota-i-nomi-dei-tuoi-personaggi-in-world-of-warcraft-forever" target="_blank" rel="noopener noreferrer">Blizzard’s official name reservation guide ↗</a>';

  /* The autumn decor expires; the core theme remains cinematic all year. */
  if (now >= Date.parse('2026-11-01T00:00:00Z')) {
    const seasonal = document.querySelector('.hallows-banner');
    if (seasonal) seasonal.remove();
  }

  if (page === 'home') {
    const hero = document.querySelector('.hero');
    if (hero) {
      const eyebrow = hero.querySelector('.eyebrow');
      const heading = hero.querySelector('h1');
      const paragraph = hero.querySelector('p');
      const note = hero.querySelector('.hero-note');
      if (eyebrow) eyebrow.outerHTML = '<span class="warfront-hero-kicker">' + (isLive?'The adventure has begun':'The road to 5 November · Beta closed') + '</span>';
      if (heading) heading.innerHTML = isLive ? 'Forever is here.<br><em>Make it legendary.</em>' : 'One final silence.<br><em>Then, Forever.</em>';
      if (paragraph) paragraph.innerHTML = isLive ?
        'Three travellers. Countless roads. Azeroth is ours to explore, one unforgettable journey at a time.' :
        'Before the first quest, before the first campfire, there is a moment when the whole world waits. On 5 November at 00:00 CET, the next chapter begins.';
      if (note) {
        note.textContent = 'From the personal chronicles of Xuthar';
        note.insertAdjacentHTML('afterend', '<div class="warfront-hero-footnote">The beta is history <span aria-hidden="true">✦</span> The legend is next</div>');
      }
      const firstButton = hero.querySelector('.buttons .button');
      if (firstButton) firstButton.textContent = isLive ? 'Enter the Forever chronicle' : 'Discover the road to Forever';
    }

    const countdown = document.querySelector('.home-live');
    if (countdown) {
      countdown.insertAdjacentHTML('afterend',
        '<aside class="warfront-newsbar" aria-label="Forever launch bulletin">' +
        '<span class="warfront-newsbar-label">✦ Launch bulletin</span>' +
        '<p>' + (isLive ? 'WoW Forever has launched. The chronicle is ready for its first real chapter.' :
          'Only one beginning. Three names: Xuthar Morvayne, Thorgar Ironbeard and Aelyndra Zephyrveil.') + '</p>' +
        '<a href="forever.html#forever-roster">Meet the adventurers →</a></aside>');
      const next = document.querySelector('.launch-next-step');
      if (next) next.innerHTML = isLive ? 'Forever is here. <a class="text-link" href="forever.html">Follow the new chronicle →</a>' :
        (isFinalHours ? 'Final preparations · Launch 5 November, 00:00 CET<br><a class="text-link" href="forever.html#forever-news">The final briefing →</a>' :
          'Early name reservations · 27 Oct–3 Nov<br><a class="text-link" href="forever.html#forever-news">Prepare for launch →</a>');
    }

    const editorial = document.getElementById('editorial-updates-title');
    if (editorial) {
      const section = editorial.closest('.section');
      editorial.textContent = isLive ? 'A new world. A new chronicle.' : 'The final chapters before the beginning';
      const eyebrow = section && section.querySelector('.section-head .eyebrow');
      if (eyebrow) eyebrow.textContent = 'The road to launch · Autumn 2026';
      const cards = section && section.querySelector('.two-worlds');
      if (cards) {
        cards.innerHTML = '<article class="world-card">' +
          '<span class="eyebrow">Official milestone · 27 October – 3 November</span>' +
          '<h3>Names become legends.</h3>' +
          '<p>Early name reservations are available to eligible players. Up to three names can be reserved across rulesets, subject to availability. The journeys of Xuthar, Thorgar and Aelyndra are waiting to begin.</p>' +
          '<a class="text-link" target="_blank" rel="noopener noreferrer" href="https://worldofwarcraft.blizzard.com/it-it/news/24303866/prenota-i-nomi-dei-tuoi-personaggi-in-world-of-warcraft-forever">Official reservation details ↗</a></article>' +
          '<article class="world-card retail">' +
          '<span class="eyebrow">5 November · 00:00 CET · Europe</span>' +
          '<h3>The gates of Azeroth reopen.</h3>' +
          '<p>The beta is behind us. New beginnings, familiar lands, campfires, exploration and roleplay are ahead. Our Forever page gathers the guide, the cast, and the launch dispatches.</p>' +
          '<a class="text-link" href="forever.html">Step into the Forever archive →</a></article>';
      }
      if (cards) cards.insertAdjacentHTML('afterend',pathMarkup);
    }

    const roster = document.querySelector('.forever-roster--home');
    if (roster) {
      roster.insertAdjacentHTML('afterend',
        '<section class="warfront-story-panel" aria-labelledby="warfront-omen-title">' +
          '<span class="eyebrow">A message from the road · Personal chronicle</span>' +
          '<h2 id="warfront-omen-title">' + title + '</h2>' +
          '<p>' + tagline + ' Xuthar Morvayne walks the line between light and shadow. Thorgar Ironbeard reads the paths no one else can see. Aelyndra Zephyrveil listens for the voice of the wild. What happens next will not be written in advance.</p>' +
          '<div class="buttons"><a class="button primary" href="forever.html#forever-roster">Read the character dossier</a>' +
          '<a class="button" href="stories.html">Stories by the campfire</a></div></section>');
    }
  }

  if (page === 'forever') {
    const pageHead = document.querySelector('.page-header');
    if (pageHead) {
      const eyebrow = pageHead.querySelector('.eyebrow');
      const intro = pageHead.querySelector('p');
      if (eyebrow) eyebrow.textContent = 'The next age · 5 November 2026';
      if (intro) intro.textContent = 'The beta is over. Three heroes are ready to begin again. Follow the countdown, the official launch guide, and the stories still unwritten.';
      pageHead.insertAdjacentHTML('afterend',
        '<section class="warfront-forever-banner" aria-labelledby="forever-signal-title">' +
        '<div class="warfront-forever-banner-inner"><span class="warfront-hero-kicker">' +
        (isLive ? 'The gates have opened' : 'The countdown is almost over') +
        '</span><h2 id="forever-signal-title">The world will<br><em>remember their names.</em></h2>' +
        '<p>Xuthar Morvayne. Thorgar Ironbeard. Aelyndra Zephyrveil. No race to the finish, no story rushed — just a living world and the freedom to explore it.</p>' +
        '<div class="buttons"><a class="button primary" href="#forever-roster">Meet the three heroes</a>' +
        '<a class="button" href="#forever-news">Official launch briefings</a></div></div></section>');
    }
    const overview = document.getElementById('forever-overview');
    if (overview) {
      const introHead = overview.querySelector('.forever-intro-head .eyebrow');
      if (introHead) introHead.textContent = isLive ? 'The adventure has begun' : 'The beta is closed · Forever approaches';
      const lead = overview.querySelector('.forever-lead');
      if (lead) lead.textContent = isLive ?
        'The waiting is over. Azeroth is alive with new stories; our journeys are just beginning.' :
        'There are only a few days between us and a new beginning. At 00:00 CET on 5 November, the world we have been waiting for opens its gates.';
      const callout = overview.querySelector('.forever-launch-callout');
      if (callout) {
        const p = callout.querySelector('p');
        if (p) p.textContent = isLive ? 'The global launch is here · Discover the journey and the latest official news.' :
          'Beta closed · Early name reservations 27 October–3 November · Europe launch 5 November at 00:00 CET';
      }
    }
  }

  /* Keep decorative movement quiet and accessible. */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.warfront-hero-kicker').forEach(el=>el.title='A new chapter for the Chronicles of Azeroth');
  }
})();
