(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const data = window.CHRONICLES;
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeImage = value => /^(assets\/images\/)[\w./ -]+\.(png|jpe?g|webp|avif|gif)$/i.test(value) && !value.includes('..') ? value : '';
  const page = document.body.dataset.page;
  const pages = [['home','Home','index.html'],['retail','Retail Characters','retail.html'],['lore','The Lore','lore.html'],['forever','WoW Forever','forever.html'],['xuthar','Xuthar Morvayne','xuthar.html'],['thorgar','Thorgar','thorgar.html'],['aelyndra','Aelyndra','aelyndra.html'],['book','Character Books','book.html'],['missions','Completed Quests','missions.html'],['journal','Travel Journal','journal.html'],['campsites','Campsites','campsites.html'],['stories','Stories & Lore','stories.html'],['gallery','Gallery','gallery.html'],['calendar','Calendar & Events','calendar.html'],['chronicle','Live Chronicle','chronicle.html']];
  const nav = document.querySelector('#navigation');
  nav.innerHTML = pages.map(([id,label,path]) => `<a href="${path}" ${page===id?'aria-current="page"':''}>${label}</a>`).join('');

  const contacts = data.contacts;
  if (page === 'home') {
    // The homepage prioritizes live in-game presence over contact links.
    // Realm clocks are prepended by realm-clocks.js into the same strip.
    nav.insertAdjacentHTML('afterend', '<div class="contact-strip contact-strip--presence" aria-label="Realm clocks and Xuthar live status"></div>');
    const presence = document.getElementById('xuthar-presence');
    if (presence) document.querySelector('.contact-strip--presence').appendChild(presence);
  } else if (contacts) {
    const telegramName = /^[a-zA-Z0-9_]+$/.test(contacts.telegram) ? contacts.telegram : '';
    nav.insertAdjacentHTML('afterend', `<div class="contact-strip" aria-label="Contact Xuthar"><span class="contact-label">Get in touch</span>${telegramName ? `<a class="contact-item" href="https://t.me/${telegramName}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10l7 3 3 7 8-17Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m10 13 6-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>Telegram <strong>@${escape(telegramName)}</strong></span></a>` : ''}<button class="contact-item" type="button" id="copy-battletag" aria-label="Copy BattleTag ${escape(contacts.battleTag)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 3c5 0 9 4 9 9M21 12c0 5-4 9-9 9M12 21c-5 0-9-4-9-9M3 12c0-5 4-9 9-9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m12 3 3 3m6 6-3 3m-6 6-3-3m-6-6 3-3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>Battle.net <strong>${escape(contacts.battleTag)}</strong></span><span class="contact-copy-hint" aria-hidden="true">Copy</span></button><span class="contact-status" role="status" aria-live="polite"></span></div>`);
    document.querySelector('#copy-battletag').addEventListener('click', async () => {
      const status = document.querySelector('.contact-status');
      try {
        await navigator.clipboard.writeText(contacts.battleTag);
        status.textContent = 'BattleTag copied';
      } catch {
        status.textContent = 'Your BattleTag: ' + contacts.battleTag;
      }
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);toggle.textContent=open?'Close':'Menu';});
  document.addEventListener('keydown', e => {if(e.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){toggle.click();toggle.focus();}});
  const placeholder = (label, kind='', image='', alt='') => safeImage(image) ? `<div class="${kind}"><img class="gallery-image" src="${escape(image)}" alt="${escape(alt||label)}" loading="lazy"></div>` : `<div class="placeholder ${kind}"><span class="mark" aria-hidden="true">◇</span><span>${escape(label)}</span><small>Image to be added</small></div>`;
  const demo = '<p class="demo-note">Sample journal: the places, stops, and stories are original narrative placeholders for your own adventures. They do not represent actual gameplay progress or official lore.</p>';
  const header = (eyebrow,title,description) => `<header class="page-header"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></header>`;
  const route = `<ol class="route-list"><li><strong>The Oak Inn</strong><span>01 · The starting point</span></li><li><strong>Ford Trail</strong><span>02 · On the road</span></li><li><strong>Pine Glade</strong><span>03 · The latest stop</span></li></ol>`;
  const paragraphs = list => list.map(p=>`<p>${escape(p)}</p>`).join('');
  const facts = entries => `<dl class="facts">${entries.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('')}</dl>`;
  const renderers = {
    home: () => `
      <section class="hero">
        <div class="wrap hero-content">
          <span class="eyebrow">World of Warcraft Forever · Launch day · 5 November 2026</span>
          <h1>Azeroth has awakened.<br><em>The legend begins.</em></h1>
          <p>The gates have opened. Xuthar Morvayne has entered Northshire, reached level 3 and followed the first shadows towards Echo Ridge. His story has begun.</p>
          <div class="buttons">
            <a class="button primary" href="book.html?character=xuthar#x-live-1">Read Xuthar’s first chapter</a>
            <a class="button" href="forever.html#forever-roster">Meet our adventurers</a>
          </div>
          <div class="hero-note">The Forever chronicle of ${escape(data.author)}</div>
        </div>
      </section>
      <div class="wrap">
        <section class="section home-forever-news" aria-labelledby="editorial-updates-title">
          <div class="section-head">
            <div><span class="eyebrow">Launch day · 5 November 2026</span><h2 id="editorial-updates-title">The gates of Azeroth are open.</h2></div>
            <a class="text-link" href="forever.html#forever-news">All Forever updates →</a>
          </div>
          <div class="two-worlds">
            <article class="world-card"><span class="eyebrow">The launch is here</span><h3>One new world. Countless stories.</h3><p>Forever has begun. Relive the opening night and the first footsteps of our Human Priest.</p><a class="text-link" href="forever.html">Explore the Forever era →</a></article>
            <article class="world-card"><span class="eyebrow">Our heroes</span><h3>Three names to remember.</h3><p>Xuthar Morvayne has begun his journey. Thorgar Ironbeard and Aelyndra Zephyrveil await their first recorded adventures.</p><a class="text-link" href="forever.html#forever-roster">Meet the Forever roster →</a></article>
          </div>
        </section>
        <section class="section home-forever-focus" aria-labelledby="home-forever-focus-title">
          <div class="section-head">
            <div><span class="eyebrow">How we play Forever</span><h2 id="home-forever-focus-title">There is no need to hurry.</h2></div>
            <a class="text-link" href="forever.html#forever-journey">The personal journey →</a>
          </div>
          <div class="forever-home-pillars">
            <article class="world-card">
              <span class="eyebrow">01 · The world</span><h3>Explore every corner.</h3>
              <p>Follow forgotten paths, rediscover the old lands and let the landscape tell its own stories.</p>
              <a class="text-link" href="gallery.html">Scenes from Azeroth →</a>
            </article>
            <article class="world-card">
              <span class="eyebrow">02 · The characters</span><h3>Grow at your own pace.</h3>
              <p>Take the time for quests, professions and character stories instead of racing toward the finish line.</p>
              <a class="text-link" href="forever.html#forever-roster">Our three travellers →</a>
            </article>
            <article class="world-card">
              <span class="eyebrow">03 · The journey</span><h3>Remember the small moments.</h3>
              <p>Make camp, share a story, collect memories and write the next page of the journal.</p>
              <a class="text-link" href="journal.html">Read the travel journal →</a>
            </article>
          </div>
        </section>
        <section class="section home-lore" aria-labelledby="home-forever-lore-title">
          <div class="section-head">
            <div><span class="eyebrow">The legacy of Azeroth</span><h2 id="home-forever-lore-title">The world behind Forever.</h2></div>
            <a class="text-link" href="lore.html">Explore Warcraft history →</a>
          </div>
          <article class="world-card">
            <span class="eyebrow">Azeroth · Lore & memory</span>
            <h3>Every new journey begins with an old legend.</h3>
            <p>Meet the places, peoples and stories that shaped the world we are about to explore. The lore archive is a companion to the new Forever experience.</p>
            <a class="button" href="lore.html">Discover the lore</a>
          </article>
        </section>
        <section class="section home-forever-journal" aria-labelledby="home-forever-journal-title">
          <div class="section-head">
            <div><span class="eyebrow">The chronicle has begun</span><h2 id="home-forever-journal-title">The first pages of Forever.</h2></div>
            <a class="text-link" href="journal.html">Open the travel journal →</a>
          </div>
          <div class="two-worlds">
            <article class="world-card">
              <span class="eyebrow">The traveller's notebook</span><h3>Not every adventure needs a battle.</h3>
              <p>One day it might be an unexplored road. Another, a quiet clearing. Our first session begins at Northshire Abbey and leads to Echo Ridge. Read the lived events, then enter the novelised book.</p>
              <a class="text-link" href="journal.html">The journal →</a>
            </article>
            <article class="world-card">
              <span class="eyebrow">Stories beside the fire</span><h3>Some tales deserve to be remembered.</h3>
              <p>Read original fiction, fragments of lore and atmospheric stories inspired by the world awaiting our adventurers.</p>
              <a class="text-link" href="stories.html">Stories & Lore →</a>
            </article>
          </div>
        </section>
        <div class="quote"><blockquote>«Not every road leads to a battle.<br>Some lead only to a good place to light a fire.»</blockquote><cite>From the journal of ${escape(data.character)} · Original fiction</cite></div>
      </div>`,
    retail: () => `<div class="wrap body-space">${header('I · The heroes','Retail Characters','A collection of faces, stories, and adventures. Every character has a place here, between who they have been and who they have yet to become.')}<p class="demo-note">Character details from the linked Armory profiles. Legends retold from their personal histories.</p><div class="grid">${data.characters.map(c=>`<article class="content-card" id="${escape(c.id)}">${placeholder('Character portrait','portrait',c.image,c.name)}<div class="card-body"><span class="badge">Retail</span><h2>${escape(c.name)}</h2><p class="meta">${escape(c.role)}</p>${c.legend?`<section class="character-legend" aria-label="The legend of ${escape(c.name)}"><h3>${escape(c.legend.title)}</h3><blockquote>${escape(c.legend.quote)}</blockquote><p>${escape(c.bio)}</p></section>`:''}${facts([['Race',c.race],['Class',c.className],['Realm',c.realm],['Specialisation',c.spec],['Professions',c.professions],...(c.extraFacts||[])])}${c.legend?'':`<details><summary>Character story</summary><p>${escape(c.bio)}</p></details>`}${c.armoryUrl && /^https:\/\/wowarmory\.gg\//.test(c.armoryUrl)?`<p class="meta">Armory snapshot · ${escape(c.armoryDate)}</p><a class="text-link" href="${escape(c.armoryUrl)}" target="_blank" rel="noopener noreferrer">View Armory profile</a>`:''} </div></article>`).join('')}</div></div>`,
    forever: () => `<div class="wrap body-space">${header('II · The traveller','WoW Forever','Discover World of Warcraft: Forever first. Then follow the quiet roads, campsites and stories of a traveller finding his place in Azeroth.')}<div id="forever-overview"></div><section id="forever-journey"><header class="forever-journey-head"><span class="eyebrow">Beyond the guide · The personal journal</span><h2>Now, the road becomes our own.</h2></header>${demo}<div class="forever-layout"><div><div class="feature-banner"><p>«As long as there is a road,<br>I will have a story to tell.»</p></div><article class="paper"><span class="eyebrow">The journal of ${escape(data.character)}</span><h2>A quiet departure</h2><div class="prose" style="margin-top:24px"><p>I carry little with me. A cloak that has seen better days, a map covered in corrections, and this journal. I write to remember places without monuments and people whose names no one will sing.</p><p>Each evening, before sleep, I add a line. Sometimes it is a story. Other times, only the way the light fell across the trees.</p></div><a class="text-link" href="journal.html">Open the travel journal</a></article></div><aside><div class="portrait-panel">${placeholder('Portrait of '+data.character)}<h2>${escape(data.character)}</h2><p class="meta">Main character · Human Shadow Priest · Forever roleplay</p>${facts([['Race / class','Human · Shadow Priest'],['Role','Main character'],['Personal history','To be written during the journey']])}<span class="eyebrow">The story’s stops</span>${route}<a class="text-link" href="campsites.html">Places along the journey</a></div></aside></div><section class="section"><div class="two-worlds"><article class="world-card"><span class="eyebrow">Beside the embers</span><h3>Campsites</h3><p>Shelters, rest stops, and small rituals that make a place feel like home, even far from everything.</p><a class="text-link" href="campsites.html">Explore the rest stops</a></article><article class="world-card retail"><span class="eyebrow">Beyond the trail</span><h3>Stories & Lore</h3><p>Letters never sent, rumours heard at an inn, and stories to carry along the road.</p><a class="text-link" href="stories.html">Read the stories</a></article></div></section></section></div>`,
    journal: () => {
      const records = data.journal.filter(j=>j.id!=='luce-tra-i-pini'&&j.id!=='vecchio-ponte'&&j.id!=='ultima-locanda');
      const bucket = date => records.filter(j=>j.chapter.includes(date)).sort((a,b)=>{
        const dayOrder = x => {
          const match=x.chapter.match(/([0-9]{1,2}):([0-9]{2})/);
          if(match)return Number(match[1])*60+Number(match[2]);
          return Number.parseInt(String(x.day),10)||0;
        };
        return dayOrder(a)-dayOrder(b);
      });
      const plans=[
        {date:'2026-11-04',day:'Wednesday, 4 November',title:'The Gates Open',place:'Northshire Valley',level:'The first steps',summary:'The Forever journey began with the creation of Xuthar Morvayne on the Roleplay realm. His first paths led into Northshire and the crowded world beyond the abbey.',stops:[
          {time:'Late evening',title:'Azeroth awakens',description:'A new human priest enters the world. This is the first page of a journey that will grow into The Last Witness.'}
        ],photos:null},
        {date:'2026-11-05',day:'Thursday, 5 November',title:'From Northshire to Stormwind',place:'Northshire · Goldshire · Elwynn · Stormwind',level:'Levels 5–8',summary:'Kobolds, Defias, the first steps in Tailoring and Enchanting, quiet visits to the inn, and two painful defeats in Fargodeep Mine shaped Xuthar’s early travels.',stops:[
          {time:'11:36–12:18',title:'On the road to Goldshire',description:'The forest opens beyond Northshire. Xuthar approaches Goldshire and its busy inn.'},
          {time:'12:32–12:38',title:'The hearth at Lion’s Pride',description:'A pause among travellers. The slow journey matters as much as the quests.'},
          {time:'13:49–18:46',title:'Mercy and peril in Elwynn',description:'Class duties, lakeside encounters, learning and exploration.'},
          {time:'19:04–19:07',title:'Two falls in Fargodeep Mine',description:'A harsh lesson in caution and survival.'},
          {time:'19:24–20:24',title:'Stormwind and level eight',description:'A first important visit to the capital: new trades, markets and the canals.'},
          {time:'20:24–21:34',title:'The rain and the return to Goldshire',description:'Evening travel ends at a familiar inn, where Xuthar finds a bed.'}
        ]},
        {date:'2026-11-06',day:'Friday, 6 November',title:'Water, Books and a Tenth Level',place:'Elwynn Forest · Crystal Lake · Stormwind',level:'Levels 9–10',summary:'Fishing by Crystal Lake, encounters with murlocs, errands between the forest and the city, and the milestone of level ten.',stops:[
          {time:'15:05–15:27',title:'Crystal Lake',description:'Fishing and dangerous encounters by the water.'},
          {time:'15:36–16:31',title:'The river and the wooded track',description:'A winding errand near the river: a quieter route with uncertain dangers.'},
          {time:'18:41',title:'Ten quests, level nine',description:'A quest tracker preserves the many open roads still calling Xuthar.'},
          {time:'Evening',title:'The tenth threshold',description:'Xuthar reaches level ten; further concerns are addressed and the early quest archive grows.'}
        ]},
        {date:'2026-11-07',day:'Saturday, 7 November',title:'Friends, Hogger and the Western Road',place:'Elwynn Forest · Tower of Azora · Westfall',level:'Levels 11–13',summary:'Hogger falls to a group of five. Xuthar encounters new companions, completes professional errands, continues toward Westfall and takes time to explore the Tower of Azora.',stops:[
          {time:'Time not recorded',title:'The fall of Hogger',description:'A hard-fought group victory in Elwynn and an early lesson in fellowship.'},
          {time:'Time not recorded',title:'The Tower of Azora',description:'A quieter visit among books, magic and the mysteries of the old tower.'},
          {time:'Later that day',title:'Westfall and preparation',description:'Bags fill, supplies run low and Xuthar returns for repairs, a wand and professional errands before heading west again.'}
        ]},
        {date:'2026-11-08',day:'Sunday, 8 November',title:'The Golden Fields and the Gilded Rose',place:'Westfall · Goldshire · Stormwind',level:'Level 15',summary:'Difficult Westfall missions and fellow adventurers carry Xuthar to level fifteen. Later, an ale and a walk with Carro Steelcave bring the day to a gentle close.',stops:[
          {time:'Daytime',title:'The trials of Westfall',description:'Defias enemies, demanding quests and new allies transform a difficult day into real progress.'},
          {time:'Evening',title:'A familiar friend',description:'Xuthar meets Carro Steelcave in Goldshire; the two share a drink and walk through Stormwind.'},
          {time:'Late evening',title:'Rest at the Gilded Rose',description:'After a long day, Xuthar falls asleep in a Stormwind inn.'}
        ]},
        {date:'2026-11-09',day:'Monday, 9 November',title:'Rain Over Westfall',place:'Westfall · Sentinel Hill',level:'Level 15',summary:'A slow morning of fishing under rain gives way to demanding unfinished work. By evening, the weary priest chooses rest and lets tomorrow’s roads enter his dreams.',stops:[
          {time:'Morning',title:'Fishing beneath the rain',description:'Near Westfall’s water, Xuthar finds a moment of peace and a reason to travel slowly.'},
          {time:'Later',title:'The hills demand their due',description:'Further difficult quests and threats test his patience before nightfall.'},
          {time:'Evening',title:'Sentinel Hill — an exhausted vigil',description:'Xuthar rests and dreams of adventures yet to come.'}
        ]},
        {date:'2026-11-10',day:'Tuesday, 10 November',title:'The Road of Ashes — An Epic Friendship',place:'Redridge · Duskwood · Booty Bay · The Barrens · Stonetalon · Loch Modan · Thoradin’s Wall',level:'Level 15 → 17',summary:'Xuthar and Carro Steelcave complete the six-part trail of “...And That Note You Found”, travelling across two continents to find the Cozy Sleeping Bag. A great evening of exploration becomes the story of two friends.',stops:[
          {time:'Before 19:52',title:'The rendezvous at the crossroads',description:'Xuthar and Carro plan their meeting where Redridge gives way to Duskwood. The exact meeting time was not recorded.'},
          {time:'19:52–20:14',title:'The haunted roads and the southern harbour',description:'The earliest photographs trace the expedition through Duskwood, Darkshire and the southern route to the coast.'},
          {time:'20:15–20:39',title:'Across the sea and into the Barrens',description:'Kalimdor opens into wide red plains; the burned-note mystery points onward.'},
          {time:'20:42–21:06',title:'The heights of Stonetalon',description:'Ridges, narrow tracks and dangerous ledges demand patient steps and steady companionship.'},
          {time:'21:09–21:29',title:'The northern lands and the great dam',description:'The journey returns toward Loch Modan and the massive Stonewrought Dam.'},
          {time:'21:35–21:43',title:'Thoradin’s Wall — the final ascent',description:'At the old frontier, the final climb gives the quest chain its ending. Xuthar reaches level seventeen during this epic night.'}
        ],photos:'road-of-ashes-gallery/'},
        {date:'2026-11-11',day:'Wednesday, 11 November',title:'The Defias Brotherhood — Three on the Western Road',place:'Westfall · questing in the western fields',level:'Level 17',summary:'Back in Westfall, Xuthar fights alongside Irlav Manaspark, a level-20 mage, and Tooker Iskald, a level-19 warrior. The quest tracker marks The Defias Brotherhood and The People’s Militia as complete. Other mining and Defias assignments remain on his active list; he is still live and questing.',stops:[
          {time:'During the day · exact hour unrecorded',title:'The company of a mage and a warrior',description:'Irlav Manaspark (level 20 Mage) and Tooker Iskald (level 19 Warrior) join Xuthar for questing in Westfall. These two companions are identified in the Recent Allies record.'},
          {time:'Time not recorded',title:'The Defias Brotherhood — quest completed',description:'The quest tracker displays “Quest Complete!” for The Defias Brotherhood. This records the completed assignment seen today, not the completion of every chapter of the wider Defias chain.'},
          {time:'Time not recorded',title:'The People’s Militia — quest completed',description:'The quest tracker also shows “Quest Complete!” for The People’s Militia. The western road still holds unfinished work.'},
          {time:'Latest reported status',title:'Live · Questing at Westfall',description:'The State of the Mines, Recollecting Memories, Oh Brother… and Underground Assault remain visible as ongoing quests. Xuthar continues the journey at level seventeen.'}
        ]},
        {date:'2026-11-12',day:'Thursday, 12 November',title:'Stormwind — The City of Unfinished Promises',place:'Westfall → Stormwind City',level:'Level 17',summary:'Xuthar returns from Westfall to Stormwind for quest hand-ins and practical errands. The new Questie screen shows three assignments complete and four active; no reward or hand-in time is invented. The city provides the setting for new chapters of The Last Witness.',stops:[
          {time:'Evening · exact travel time not recorded',title:'Leaving the golden fields',description:'Xuthar travels from Westfall toward Stormwind after the recent western adventures.'},
          {time:'20:21 · reported status (Italy)',title:'Live in Stormwind',description:'The priest is in the capital to complete quests and take care of commissions. Three Questie entries are now marked complete: Business in Auberdine, Detonation at a Distance and The Defias Brotherhood. Four Deadmines/Westfall assignments remain in progress.'},
          {time:'Questie screenshot · exact time not established',title:'Three completed tasks, four unfinished',description:'Business in Auberdine, Detonation at a Distance and The Defias Brotherhood show Quest Complete! Collecting Memories (0/4), Oh Brother... (0/1), Underground Assault (0/1) and A Dynamite Plan (0/10) are still active.'},
          {time:'Roleplay interlude · fictional',title:'Unclaimed letters and the canal whisper',description:'In the novel Xuthar encounters a keeper of forgotten letters and contemplates the voices of the Shadow while walking between his errands.'}
        ]}
      ];
      const timeline=plans.map(day=>{
        const key=day.date==='2026-11-05'?'5 November 2026':day.date==='2026-11-06'?'6 November 2026':'';
        const evidence=key?bucket(key):[];
        const unique=[...new Map(evidence.map(j=>[j.id,j])).values()];
        const entries=unique.length?'<details class="cj-archive"><summary>Historical records and extended notes ('+unique.length+')</summary><div class="cj-historical">'+unique.map(j=>'<article id="'+escape(j.id)+'"><span class="cj-meta">'+escape(j.chapter)+'</span><h4>'+escape(j.title)+'</h4><p>'+escape(j.excerpt)+'</p><details><summary>Read the original entry</summary><div class="cj-original">'+paragraphs(j.text)+'</div></details></article>').join('')+'</div></details>':'';
        const photo=day.photos?'<div class="cj-links"><a href="'+day.photos+'">View all 88 original screenshots →</a><a href="book.html?character=xuthar#x-nov10-epic-1">Read the epic novel chapters →</a></div>':'';
        return '<section class="cj-day" id="day-'+day.date+'"><div class="cj-heading"><div><span class="cj-date">'+day.day+'</span><h2>'+day.title+'</h2><span class="cj-place">'+day.place+'</span></div><strong class="cj-level">'+day.level+'</strong></div><p class="cj-summary">'+day.summary+'</p><ol class="cj-stops">'+day.stops.map(e=>'<li><time>'+e.time+'</time><div><h3>'+e.title+'</h3><p>'+e.description+'</p></div></li>').join('')+'</ol>'+photo+entries+'</section>';
      }).join('');
      return '<div class="cj-journal wrap" id="chronological-travel-journal"><header class="cj-intro"><span class="cj-kicker">THE LAST WITNESS · TRAVEL ARCHIVE</span><h1>Xuthar’s Travel Journal</h1><p>Eight days of discovery, from the first steps in Northshire through the Defias struggle in Westfall, with the great expedition alongside Carro Steelcave. Dates and clocks are shown when documented; other events are placed in their known sequence without fabricated timestamps.</p><nav class="cj-nav" aria-label="Jump to a day">'+plans.map(x=>'<a href="#day-'+x.date+'">'+x.date.slice(8) +' Nov</a>').join('')+'</nav></header>'+timeline+'<footer class="cj-end"><a href="road-of-ashes-gallery/">The Road of Ashes · 88 photographs →</a><a href="book.html?character=xuthar">The Last Witness · The novel →</a></footer></div>';
    },
    campsites: () => `<div class="wrap body-space">${header('IV · Places to rest','Campsites','A shelter is more than a place on a map. It is where you set down your pack, listen to the woods, and decide which road to take tomorrow.')}${demo}<div class="grid">${data.camps.map(c=>`<article class="content-card" id="${escape(c.id)}">${placeholder('A view of the place','',c.image,c.name)}<div class="card-body"><span class="badge">${escape(c.status)}</span><h2>${escape(c.name)}</h2><p>${escape(c.subtitle)}</p>${facts([['Shelter',c.shelter],['Water',c.water]])}<h3>Camp notes</h3><p>${escape(c.notes)}</p>${c.id==='radura'?'<a class="text-link" href="journal.html#luce-tra-i-pini">The night in the journal</a>':c.id==='locanda'?'<a class="text-link" href="journal.html#ultima-locanda">The day of departure</a>':'<a class="text-link" href="journal.html#vecchio-ponte">Notes from the ford</a>'}</div></article>`).join('')}</div></div>`,
    stories: () => `<div class="wrap body-space">${header('V · Stories to carry with you','Stories & Lore','From the lanterns of Duskwood to the snows of Northrend: mysteries, small kindnesses, and tales gathered along the road.')}<p class="demo-note">Original short fiction inspired by Warcraft’s landscapes. These characters and events are invented; the tales are not official lore or records of actual gameplay. For the history of the game, visit <a href="lore.html">The Road to Loremaster</a>.</p><div class="story-library"><span class="eyebrow">Choose a corner of the world</span><div class="story-filters" role="group" aria-label="Filter stories by region">${['All tales',...new Set(data.stories.map(s=>s.region))].map((region,i)=>`<button type="button" data-story-region="${escape(region)}" aria-pressed="${i===0}">${escape(region)}</button>`).join('')}</div><p class="story-count" role="status" aria-live="polite">${data.stories.length} tales in the collection</p></div><div class="lore-grid">${data.stories.map(s=>`<article class="lore-card story-card" id="${escape(s.id)}" data-region="${escape(s.region)}"><span class="story-zone">◇ ${escape(s.zone)}</span><span class="eyebrow">${escape(s.kind)}</span><h2>${escape(s.title)}</h2><p class="story-excerpt">${escape(s.excerpt)}</p><details><summary>Open the story</summary><div class="prose">${paragraphs(s.text)}<a class="text-link story-permalink" href="#${escape(s.id)}">Link to this tale</a></div></details></article>`).join('')}</div><div class="quote"><blockquote>«The best stories come quietly, when the fire is low and no one is in a hurry to leave.»</blockquote><cite>A note in the margin · original fiction</cite></div></div>`,
    calendar: () => `<div class="wrap body-space">${header('VII · The living world','Calendar & Events','A day-by-day companion to your Retail adventures. Discover festivals, bonus events, Timewalking, and PvP brawls.')}<p class="demo-note">Public Retail schedule, not a direct connection to your character or guild calendar. Times are displayed in Europe/Rome; the source does not identify a server region, so EU and US reset dates may differ. Check the in-game calendar before planning around an exact start or end time.</p><div id="retail-calendar"><p class="meta">Loading the public event calendar…</p></div><div class="calendar-sources"><span class="eyebrow">Follow the source</span><p>Schedule from <a class="text-link" href="https://tools.wowlazymacros.com/world-events" target="_blank" rel="noopener noreferrer">WoW Lazy Tools</a> · Event guides on <a class="text-link" href="https://www.wowhead.com/events" target="_blank" rel="noopener noreferrer">Wowhead</a>.</p><a class="button" href="https://tools.wowlazymacros.com/api/world-events.ics">Download the public calendar (.ics)</a><p class="meta">Coverage follows the public feed. Personal raid invitations, guild events, and realm-specific activities are not included.</p></div></div>`,
    gallery: () => `<div class="wrap body-space">${header('VI · Memories of Azeroth','Gallery','Faces, landscapes, and moments worth keeping. An album for the things words alone cannot capture.')}<p class="demo-note">A personal album of gameplay screenshots and enhanced memories. Select a frame to see the complete image.</p><div class="grid">${data.gallery.map((g,i)=>`<figure class="content-card gallery-card" style="margin:0">${safeImage(g.image)?`<button class="gallery-button" data-gallery="${i}" aria-label="Enlarge: ${escape(g.title)}"><img class="gallery-image" src="${escape(g.image)}" alt="${escape(g.alt)}" loading="lazy"></button>`:placeholder(g.category)}<figcaption class="card-body"><span class="badge">${escape(g.category)}</span><h2>${escape(g.title)}</h2><span class="meta">${safeImage(g.image)?'Open the image to enlarge it':'Waiting for a memory'}</span></figcaption></figure>`).join('')}</div><dialog id="lightbox" aria-label="Enlarged image"><button type="button" autofocus>Close</button><img alt=""><p></p></dialog></div>`
  };
  const main = document.querySelector('#main');
  if (renderers[page]) main.innerHTML = renderers[page]();
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const fallback=document.createElement('div');fallback.className='placeholder';fallback.textContent='Image unavailable';img.replaceWith(fallback);},{once:true}));
  const showStories = region => {
    const cards = [...document.querySelectorAll('.story-card')];
    cards.forEach(card => {card.hidden = region !== 'All tales' && card.dataset.region !== region;});
    document.querySelectorAll('[data-story-region]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.storyRegion === region)));
    const count = cards.filter(card => !card.hidden).length;
    const status = document.querySelector('.story-count');
    if (status) status.textContent = region === 'All tales' ? count + ' tales in the collection' : count + ' tales · ' + region;
  };
  document.querySelectorAll('[data-story-region]').forEach(button => button.addEventListener('click', () => showStories(button.dataset.storyRegion)));
  const openAnchor = () => {let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(!target)return;if(target.matches('.story-card') && target.hidden)showStories('All tales');const details=target.querySelector('details');if(details)details.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));};
  openAnchor();window.addEventListener('hashchange',openAnchor);
  const dialog=document.querySelector('#lightbox');
  if(dialog){document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{const item=data.gallery[Number(button.dataset.gallery)];dialog.querySelector('img').src=safeImage(item.image);dialog.querySelector('img').alt=item.alt;dialog.querySelector('p').textContent=item.title;dialog.showModal();}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});}
})();
