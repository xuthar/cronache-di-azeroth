/* Chronicles of Azeroth · launch-night visual experience, now in the Forever era.
 * Preserves live news, character roster, and the personal chronicle; no countdown. */
(() => {
  'use strict';
  document.documentElement.classList.add('azeroth-launcher');
  const page = document.body.dataset.page;
  const main = document.querySelector('#main');
  if (!main) return;
  const live = true; // The launch has happened; this is an editorial archive, not a server-state probe.
  const images = {
    hero:'assets/images/hero.webp',
    horizon:'assets/images/gallery/azure-crossroads.jpg',
    stormwind:'assets/images/gallery/stormwind-midnight.jpg',
    forest:'assets/images/gallery/moonlit-gathering.jpg',
    goldshire:'assets/images/gallery/goldshire-after-dark.jpg',
    ironforge:'assets/images/gallery/winter-veil-ironforge.jpg',
    orgrimmar:'assets/images/gallery/orgrimmar-snow-globe.jpg',
    collection:'assets/images/gallery/wow-010126_151126.jpg'
  };
  const official = [
    {category:'OFFICIAL · 29 OCT',name:'Forever is nearly here: return to Azeroth',description:'A world of new paths and stories is ready for its global debut. See Blizzard’s official launch guide.',url:'https://worldofwarcraft.blizzard.com/en-us/news/24315643/regresa-a-azeroth-en-world-of-warcraft-forever',image:images.stormwind},
    {category:'OFFICIAL · DUNGEONS',name:'Explore nine new Forever dungeons',description:'Nine new dungeons across the Eastern Kingdoms and Kalimdor are waiting to be discovered.',url:'https://worldofwarcraft.blizzard.com/en-us/news/24301455',image:images.horizon},
    {category:'OFFICIAL · CAMPING',name:'Gather around the campfire',description:'A closer look at the new Camping system, its crafted features and the joy of stopping along the road.',url:'https://worldofwarcraft.blizzard.com/en-us/news/24301516/gather-around-the-campfire-in-world-of-warcraft-forever',image:images.goldshire},
    {category:'OFFICIAL · RAID PREVIEW',name:'The first raids begin 9 December',description:'Barrow Deeps, Hyjal Summit and Onyxia’s Lair open a new chapter at level 60.',url:'https://worldofwarcraft.blizzard.com/en-us/news/24303009/world-of-warcraft-forever-raid-overview-locations-raid-sizes-and-attunement',image:images.ironforge}
  ];
  const nav = document.querySelector('#navigation');
  if (nav && !nav.querySelector('a[href="chronicle.html"]')) {
    const a=document.createElement('a');a.href='chronicle.html';a.textContent='Live Chronicle';nav.append(a);
  }
  if (page !== 'home') {
    if (page === 'chronicle') document.querySelector('.chronicle-hero')?.classList.add('launcher-interior-header');
    else document.querySelector('.page-header')?.classList.add('launcher-interior-header');
    return;
  }
  const hero = main.querySelector('.hero');
  if (!hero) return;
  // Create a cinematic copy + launch panel without destroying live hero modules.
  const heroContent = hero.querySelector('.hero-content');
  if (heroContent && !heroContent.querySelector('.launcher-hero-copy')) {
    const copy=document.createElement('div');
    copy.className='launcher-hero-copy';
    while(heroContent.firstChild)copy.appendChild(heroContent.firstChild);
    heroContent.appendChild(copy);
    const kicker=copy.querySelector('.warfront-hero-kicker,.eyebrow');
    if(kicker)kicker.textContent='CHRONICLES OF AZEROTH  /  THE FOREVER ERA';
    const title=copy.querySelector('h1');
    if(title)title.innerHTML='FOREVER HAS BEGUN.<br><em>A legend awakens.</em>';
    const lead=copy.querySelector('p');
    if(lead)lead.textContent="Forever is here. On 8 November Xuthar Morvayne reached level fifteen after difficult quests and close encounters in Westfall. He shared a beer with Carro Steelcave in Goldshire, walked through Stormwind and finally fell asleep at The Gilded Rose. The living book and photographs preserve each step.";
    const buttons=copy.querySelector('.buttons');
    if(buttons)buttons.innerHTML='<a class="button primary" href="book.html?character=xuthar#x-goldshire-eighth-nov-carro-beer">READ XUTHAR’S CHRONICLE ↗</a><a class="button" href="#xuthar-first-night">First night ↓</a><a class="button launcher-ghost" href="forever.html">Explore Forever ↗</a>';
    const panel=document.createElement('aside');
    panel.className='launcher-game-panel';
    panel.setAttribute('aria-label','World of Warcraft Forever game overview');
    panel.innerHTML='<span class="launcher-panel-label"><span class="launcher-pulse" aria-hidden="true"></span> THE FOREVER ERA · LAUNCHED</span>'+
      '<div class="launcher-game-name"><span class="launcher-game-crest" aria-hidden="true">✦</span><div><strong>WoW: Forever</strong><small>Azeroth · The adventure has begun</small></div></div>'+
      '<div class="launcher-game-status launcher-era-status"><small>HISTORIC LAUNCH · 5 NOVEMBER 2026</small><strong>THE GATES ARE OPEN</strong><span>Midnight CET · A new chapter in Azeroth</span></div>'+
      '<div class="launcher-panel-state"><strong>XUTHAR MORVAYNE</strong><br>DAY FOUR · Human Priest · Level 15<br>LIVE · Sentinel Hill, Westfall</div>'+
      '<a class="launcher-panel-button" href="book.html?character=xuthar#x-goldshire-eighth-nov-carro-beer">READ THE LATEST CHAPTER <span aria-hidden="true">↗</span></a>'+
      '<div class="launcher-panel-links"><a href="chronicle.html">Character progress</a><a href="forever.html#forever-news">Patch & news</a><a href="calendar.html">Calendar</a></div>';
    heroContent.appendChild(panel);
  }
  function heading(eyebrow,title,desc,href,label) {
    return '<div class="launcher-section-heading"><div><span class="launcher-eyebrow">'+eyebrow+'</span><h2>'+title+'</h2>'+(desc?'<p>'+desc+'</p>':'')+'</div>'+(href?'<a href="'+href+'" class="launcher-heading-link">'+label+' ↗</a>':'')+'</div>';
  }
  function imgCard(item,cls='') {
    const a=document.createElement('a');
    a.className='launcher-news-tile '+cls;
    a.href=item.url;
    if(/^https:/.test(item.url)) {a.target='_blank';a.rel='noopener noreferrer';}
    const image=document.createElement('img');image.src=item.image;image.alt='Illustrative Azeroth archive scene';image.loading='lazy';image.decoding='async';
    a.append(image);
    const overlay=document.createElement('div');overlay.className='launcher-news-caption';
    const cat=document.createElement('span');cat.className='launcher-tile-category';cat.textContent=item.category;overlay.append(cat);
    const title=document.createElement('h3');title.textContent=item.name;overlay.append(title);
    const summary=document.createElement('p');summary.textContent=item.description;overlay.append(summary);
    const link=document.createElement('span');link.className='launcher-tile-link';link.textContent='Read the article ↗';overlay.append(link);
    a.append(overlay);
    return a;
  }
  const featured=document.createElement('section');
  featured.className='launcher-section launcher-featured wrap';
  featured.id='launcher-featured';
  featured.setAttribute('aria-label','Featured World of Warcraft stories');
  featured.innerHTML=heading('01  /  LAUNCH EDITION','The legend begins here.','The world has opened; the first true chapter belongs to Xuthar Morvayne.','book.html?character=xuthar#x-goldshire-road','Read the chronicle');
  const featureGrid=document.createElement('div');featureGrid.className='launcher-feature-grid';
  featureGrid.append(imgCard({
    category:'THE LAST WITNESS · FIRST PLAYED ADVENTURE',
    name:'Xuthar Morvayne: Beyond the shining river.',
    description:'6 November: the priest walks through a sunlit stream, returns to the trees, and records An Enticing Offer. Chapter XXIII preserves the journey without inventing a victory.',
    url:'book.html?character=xuthar#x-goldshire-eighth-nov-carro-beer',image:images.stormwind
  },'launcher-news-lead'));
  const sides=document.createElement('div');sides.className='launcher-feature-side';
  sides.append(imgCard({category:'FOREVER · THE WORLD OPENS',name:'The age of Forever has arrived.',description:'The launch has happened. Discover the new era, its worlds and its official features.',url:'https://worldofwarcraft.blizzard.com/en-gb/news/24302093',image:images.hero},'launcher-news-secondary'),imgCard({category:'A CHRONICLE OF REAL ADVENTURES',name:'From battle to silence.',description:'Day Four: Westfall’s hardest roads, the fifteenth milestone, Carro Steelcave’s reunion and rest at The Gilded Rose.',url:'journal.html#xuthar-day-two-enticing-offer-river',image:images.forest},'launcher-news-secondary'));
  featureGrid.append(sides);featured.append(featureGrid);
  hero.insertAdjacentElement('afterend',featured);

  // Live dynamic feed: use the existing Wowhead verified links, preserving RSS module.
  const news=document.createElement('section');news.className='launcher-section launcher-latest wrap';news.id='launcher-news';
  news.innerHTML=heading('02  /  LATEST HEADLINES','News from Azeroth.','Illustrations are images from our gallery; headlines link to the original publishers.','https://worldofwarcraft.blizzard.com/en-us/news/','Official Blizzard news');
  const dynamicGrid=document.createElement('div');dynamicGrid.className='launcher-dynamic-grid';dynamicGrid.id='launcher-dynamic-grid';
  const sourceLabel=document.createElement('p');sourceLabel.className='launcher-news-source';sourceLabel.textContent='Latest Forever headlines · synchronized from the existing website news feed';
  news.append(dynamicGrid,sourceLabel);
  featured.insertAdjacentElement('afterend',news);
  const oldFeed=document.querySelector('#wow-news-list');
  const covers=[images.horizon,images.forest,images.orgrimmar];
  const updateNews=()=>{
    const items=oldFeed?[...oldFeed.querySelectorAll('li a[href]')].filter(a=>/^https:\/\/(www\.)?wowhead\.com\/news/.test(a.href)).slice(0,3):[];
    dynamicGrid.replaceChildren();
    if(items.length){
      items.forEach((a,i)=>{
        const label=a.closest('li')?.querySelector('.news-meta')?.textContent?.trim()||'FOREVER NEWS';
        dynamicGrid.append(imgCard({
          category:label.toUpperCase().slice(0,65),name:a.textContent.replace(/↗/g,'').trim(),
          description:'Read the latest Forever coverage at Wowhead. Image from the Chronicles gallery.',
          url:a.href,image:covers[i]
        },'launcher-news-feed'));
      });
      sourceLabel.textContent='Live feed: Wowhead · checked automatically · illustrative archive images';
    }else{
      [official[1],official[3],official[2]].forEach(x=>dynamicGrid.append(imgCard(x,'launcher-news-feed')));
      sourceLabel.textContent='Featured official Blizzard articles · live Forever headlines appear when available';
    }
  };
  updateNews();
  if(oldFeed){const obs=new MutationObserver(updateNews);obs.observe(oldFeed,{childList:true,subtree:true});}

  const command=document.createElement('section');
  command.className='launcher-section launcher-command wrap';command.id='launcher-command';
  command.innerHTML=heading('03  /  FOREVER BULLETIN','The living world.','The latest Forever headlines and official sources, still refreshed automatically.','forever.html','Forever guide');
  const liveNews=document.querySelector('.home-live.forever-command-center');
  if(liveNews){command.append(liveNews);command.classList.add('launcher-command--news-only');}
  news.insertAdjacentElement('afterend',command);

  const characters=document.createElement('section');
  characters.className='launcher-section launcher-adventurers wrap';
  characters.id='launcher-adventurers';
  characters.innerHTML=heading('04  /  OUR HEROES','Three travellers. One world.','Follow the personal paths of Xuthar, Thorgar and Aelyndra. Gameplay stats appear only when truly recorded.','chronicle.html','View progress');
  const existingRoster=document.querySelector('.forever-roster--home');
  if(existingRoster) {
    characters.append(existingRoster);
    existingRoster.classList.add('launcher-roster');
  }
  const teaser=document.querySelector('.chronicle-teaser');
  if(teaser){teaser.classList.add('launcher-chronicle-teaser');characters.append(teaser);}
  command.insertAdjacentElement('afterend',characters);

  const destinations=[
    ['FOREVER','A world reborn','Launch updates, gameplay systems and the adventure ahead.','forever.html',images.horizon],
    ['THE LIVING CHRONICLE','Our progress','Three characters and their real journeys through Azeroth.','chronicle.html',images.forest],
    ['THE LIVING BOOKS','A new chapter is written','Follow Xuthar from the abbey to Stormwind and back along the rainy road to Goldshire.','book.html?character=xuthar#x-goldshire-road',images.goldshire],
    ['THE GALLERY','Worlds in pictures','Moments, landscapes and memories from Azeroth.','gallery.html',images.stormwind],
    ['XUTHAR MORVAYNE','The Last Witness','A complete roleplay biography, family mystery and in-game character guide.','xuthar.html',images.goldshire],
    ['RETAIL ARCHIVE','The heroes before Forever','A lifetime of characters and the roads already travelled.','retail.html',images.orgrimmar],
    ['CALENDAR','Never miss the next chapter','Important events, schedules and milestones.','calendar.html',images.ironforge],
    ['STORIES & LORE','Tales from Azeroth','Original short fiction and Warcraft background.','stories.html',images.forest],
    ['TRAVEL JOURNAL','The road itself','From the opening night to the latest quests: personal notes from the journey.','journal.html',images.collection]
  ];
  const explore=document.createElement('section');explore.className='launcher-section launcher-explore wrap';explore.id='launcher-explore';
  explore.innerHTML=heading('05  /  EXPLORE AZEROTH','Choose your next adventure.','Every door opens onto another corner of the Chronicle.');
  const tiles=document.createElement('div');tiles.className='launcher-explore-grid';
  destinations.forEach(([tag,title,desc,url,img])=>{
    const a=document.createElement('a');a.className='launcher-destination';a.href=url;
    const image=document.createElement('img');image.src=img;image.alt='Azeroth landscape from our gallery';image.loading='lazy';image.decoding='async';a.append(image);
    const caption=document.createElement('span');caption.className='launcher-destination-copy';
    caption.innerHTML='<small>'+tag+'</small><strong>'+title+'</strong><span>'+desc+'</span><b aria-hidden="true">↗</b>';
    a.append(caption);tiles.append(a);
  });explore.append(tiles);characters.insertAdjacentElement('afterend',explore);

  const spotlight=document.createElement('section');spotlight.className='launcher-section launcher-media wrap';spotlight.id='launcher-media';
  spotlight.innerHTML=heading('06  /  MEDIA SPOTLIGHT','Scenes from the world.','A cinematic preview and snapshots from the archive.','gallery.html','Open gallery');
  const mediaGrid=document.createElement('div');mediaGrid.className='launcher-media-grid';
  [
    {eyebrow:'LAUNCH SPOTLIGHT',title:'The gates of Azeroth are open',desc:'Watch the featured launch video and celebrate the beginning of the Forever era.',url:'#forever-premiere',image:images.hero},
    {eyebrow:'PHOTO ARCHIVE',title:'Azeroth through our eyes',desc:'Explore the community gallery and moments on the road.',url:'gallery.html',image:images.collection}
  ].forEach(item=>{
    const a=document.createElement('a');a.href=item.url;a.className='launcher-media-tile';
    const im=document.createElement('img');im.src=item.image;im.alt='Illustrative game scene';im.loading='lazy';a.append(im);
    const t=document.createElement('div');t.className='launcher-media-copy';
    t.innerHTML='<small>'+item.eyebrow+'</small><h3>'+item.title+'</h3><p>'+item.desc+'</p><span>Explore ↗</span>';
    a.append(t);mediaGrid.append(a);
  });
  spotlight.append(mediaGrid);explore.insertAdjacentElement('afterend',spotlight);

  const directory=document.querySelector('#useful-sites');
  if(directory){
    const details=document.createElement('details');details.className='launcher-directory';
    const summary=document.createElement('summary');
    summary.textContent='Azeroth Toolkit · Open the full resource directory';
    details.append(summary,directory);
    spotlight.insertAdjacentElement('afterend',details);
  }
  // Legacy purely editorial duplicates remain in the DOM for backward-compatible scripts,
  // but the launcher presentation hides them. All functional components are moved intact.
  document.body.classList.add('launcher-home-ready');
})();
