/* Chronicles of Azeroth · WoW Forever character announcement · 27 October 2026.
   This is the owner's planned launch roster, not an Armory or in-game progress feed. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  if (page !== 'home' && page !== 'forever') return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));

  const cast = [
    {
      id: 'xuthar-morvayne',
      name: 'Xuthar Morvayne',
      race: 'Human',
      className: 'Priest',
      specialisation: 'Shadow',
      role: 'MAIN CHARACTER',
      symbol: 'priest',
      epithet: 'The Last Witness',
      introduction: 'The Last Witness: an ex-student of the Holy Light and keeper of forgotten names, drawn into the dangerous questions of the Shadow and his family’s missing records.',
      chronicle: 'Once a student of the Holy Light, Xuthar now records the lives history forgets. A strange family ledger, a dying stranger’s final request and the whispers of the Void have drawn him onto the road. His full roleplay dossier is ready to read.'
    },
    {
      id: 'thorgar-ironbeard',
      name: 'Thorgar Ironbeard',
      race: 'Dwarf',
      className: 'Hunter',
      specialisation: '',
      role: 'THE TRACKER',
      symbol: 'hunter',
      epithet: 'The Keeper of Unmarked Trails',
      introduction: 'A patient Dwarf Hunter from Ironforge, with an unreliable brass compass and a mystery hidden in his family survey records.',
      chronicle: 'The Keeper of Unmarked Trails: a hunter and cartographer following the mystery of the Seventh Cairn. His backstory is ready, but his actual journey in Forever is yet to begin.'
    },
    {
      id: 'aelyndra-zephyrveil',
      name: 'Aelyndra Zephyrveil',
      race: 'Skyborne',
      className: 'Druid',
      specialisation: '',
      role: 'THE WILDS',
      symbol: 'druid',
      epithet: 'The Listener Between Winds',
      introduction: 'A Skyborne Druid of Zephras Isle, caught between preserving her home and letting it change. Her family wind chime has fallen silent.',
      chronicle: 'The Listener Between Winds: a Skyborne Druid whose loyalty to Zephras Isle is tested by a changing world and a silent family chime. Her chosen faction and future adventures are not yet recorded.'
    }
  ];
  if (window.CHRONICLES) window.CHRONICLES.foreverCharacters = cast;

  const symbols = {
    priest: '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" opacity=".32"/><path d="M65 17c-27 12-37 33-31 55s26 32 45 27c-20-1-34-18-31-39 2-16 8-30 17-43Z" fill="currentColor" opacity=".75"/><path d="M84 24l3 11 11 3-11 4-3 10-4-10-10-4 10-3Z" fill="currentColor"/><path d="M87 70l2 7 7 2-7 2-2 7-3-7-7-2 7-2Z" fill="currentColor"/></svg>',
    hunter: '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" opacity=".38"/><circle cx="60" cy="60" r="22" fill="none" stroke="currentColor" stroke-width="2"/><path d="M60 8v29M60 83v29M8 60h29M83 60h29" stroke="currentColor" stroke-width="3"/><path d="M37 81 81 37m-15-3 18 1-1 18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    druid: '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" opacity=".3"/><path d="M91 25C55 26 29 44 29 69c0 18 14 27 28 26 26-2 40-35 34-70Z" fill="currentColor" opacity=".64"/><path d="M24 104c12-24 31-43 59-65" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M47 73 45 48M66 57l19 2" fill="none" stroke="currentColor" stroke-width="3" opacity=".85"/></svg>'
  };

  const full = page === 'forever';
  const card = character => {
    const kind = character.symbol;
    const copy = full ? character.chronicle : character.introduction;
    const dossier = {
      'xuthar-morvayne': ['xuthar.html','Read the main chronicle · The Last Witness'],
      'thorgar-ironbeard': ['thorgar.html','Read the reserved character dossier'],
      'aelyndra-zephyrveil': ['aelyndra.html','Read the reserved character dossier']
    }[character.id];
    const link = dossier ? '<a class="forever-roster-card-link" href="' + dossier[0] + '">' + dossier[1] + ' <span aria-hidden="true">→</span></a>' : '';
    return '<article class="forever-roster-card forever-roster-card--' + kind + '"' +
      (full ? ' id="forever-' + esc(character.id) + '"' : '') + '>' +
      '<div class="forever-roster-visual"><span class="forever-roster-halo" aria-hidden="true"></span>' +
      '<span class="forever-roster-sigil">' + symbols[kind] + '</span>' +
      '<span class="forever-roster-crest-label">' + esc(character.role) + '</span></div>' +
      '<div class="forever-roster-card-body"><span class="forever-roster-eyebrow">' + esc(character.epithet) + '</span>' +
      '<h3>' + esc(character.name) + '</h3>' +
      '<p class="forever-roster-class">' + esc(character.race) + ' <span aria-hidden="true">✦</span> ' +
      esc(character.specialisation ? character.specialisation + ' ' : '') + esc(character.className) + '</p>' +
      '<p class="forever-roster-biography">' + esc(copy) + '</p>' +
      link + '</div></article>';
  };

  const section = document.createElement('section');
  section.className = 'section forever-roster-section forever-roster--' + page;
  section.id = 'forever-roster';
  section.setAttribute('aria-labelledby', 'forever-roster-title');
  section.innerHTML =
    '<div class="forever-roster-topline"><span class="forever-roster-spark" aria-hidden="true">✦</span> ' +
    'CHRONICLES OF AZEROTH <span aria-hidden="true">/</span> CHARACTER REVEAL <span aria-hidden="true">/</span> 27 OCTOBER 2026</div>' +
    '<div class="forever-roster-heading"><div><span class="eyebrow">A new chapter in World of Warcraft: Forever</span>' +
    '<h2 id="forever-roster-title">Three names. <em>One new beginning.</em></h2>' +
    '<p>Xuthar’s next adventure has its heroes. The names are chosen; their stories have yet to be written.</p></div>' +
    '<span class="forever-roster-seal" aria-hidden="true">III <small>THE NEW<br>CHRONICLE</small></span></div>' +
    '<div class="forever-roster-grid">' + cast.map(card).join('') + '</div>' +
    '<div class="forever-roster-footer"><p>Xuthar’s chronicle comes first. Thorgar and Aelyndra have fictional backstories prepared for future play; no gameplay progress is claimed for either.</p>' +
    (full ? '<a class="text-link" href="book.html?character=xuthar">Open the living character books →</a>' :
      '<a class="button primary" href="forever.html#forever-roster">Meet the Forever roster →</a>') + '</div>';

  if (page === 'home') {
    const heroes = document.querySelector('.home-forever-focus');
    if (heroes) heroes.insertAdjacentElement('beforebegin', section);
  } else {
    const overview = document.getElementById('forever-overview');
    if (overview) overview.insertAdjacentElement('beforebegin', section);
    window.addEventListener('load', () => {
      const hash = location.hash.slice(1);
      if (!hash || !['forever-roster', ...cast.map(c => 'forever-' + c.id)].includes(hash)) return;
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({block:'start'});
    }, {once:true});
  }
})();