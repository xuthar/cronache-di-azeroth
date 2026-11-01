/* WoW Forever professions field guide · 2026-11-01.
   Source basis: Blizzard Forever Camping & Legacy announcements and Icy Veins
   Forever profession overviews. Fast-level steps are editorial strategies,
   NOT claimed tested 1–300 ingredient shopping lists. */
(() => {
  'use strict';
  if (document.body.dataset.page !== 'forever') return;
  const root = document.getElementById('forever-overview');
  if (!root || document.getElementById('forever-professions')) return;

  const professions = [
    {id:'alchemy',name:'Alchemy',symbol:'⚗',type:'crafting',color:'violet',pair:'Herbalism',role:'Potions, elixirs, flasks and alchemical reagents.',benefit:'Consistent consumables for solo play and groups.',camp:'Mana Well',mats:'Herbs, vials and reagents',steps:['Learn basic elixirs; gather starter herbs before shopping for vials.','Shift to yellow/orange potions and elixirs that use your current herb tier.','Use higher-tier herb mixtures; bank herbs in advance and avoid green recipes.','Focus on high-demand endgame consumables and train Artisan early.']},
    {id:'blacksmithing',name:'Blacksmithing',symbol:'⚒',type:'crafting',color:'amber',pair:'Mining',role:'Mail/plate armor, weapons, sharpening stones and metal tools.',benefit:'Useful for heavy-armored characters and guild crafting.',camp:'Sharpening Wheel',mats:'Ore, smelted bars, stones and trade supplies',steps:['Use copper bars for the cheapest trainer recipes.','Move through bronze/iron crafts; keep stones from Mining.','Work with iron, steel and mithril patterns as their skill colours change.','Save thorium and rare reagents for efficient high-skill recipes.']},
    {id:'enchanting',name:'Enchanting',symbol:'✧',type:'crafting',color:'violet',pair:'Tailoring',role:'Disenchants magic items and enchants equipment.',benefit:'Tailored cloth pieces become enchanting materials.',camp:'Enchanted Lute',mats:'Dusts, essences, shards and enchanting rods',steps:['Disenchant spare green-quality items; craft easy early enchants.','Feed Enchanting with self-made Tailoring gear, not every expensive auction listing.','Use orange/yellow enchants and wands when materials are economical.','Hold higher-tier shards and essences for useful endgame enchants.']},
    {id:'engineering',name:'Engineering',symbol:'⚙',type:'crafting',color:'teal',pair:'Mining',role:'Gadgets, goggles, scopes, explosives and utility tools.',benefit:'Strong utility for Hunters, exploration and PvP.',camp:'Reagent Bot',mats:'Bars, stone, cloth and engineering components',steps:['Convert copper/stone into low-cost parts and tools.','Use bronze, iron and common components; craft parts you will reuse.','Move to mithril-style components; compare material prices before each batch.','Spend thorium and rarer metals on utility recipes with reliable skill-ups.']},
    {id:'leatherworking',name:'Leatherworking',symbol:'⬡',type:'crafting',color:'green',pair:'Skinning',role:'Leather/mail armor, armor kits and utility bags.',benefit:'Useful leveling gear for leather/mail users.',camp:'Camp Tent',mats:'Light, medium, heavy and higher-tier leather/hides',steps:['Skin beasts and turn light leather into economical early patterns.','Combine medium leather with trainer recipes and armor kits.','Move to heavy/thick leather; save hides for recipes that need them.','Use rugged leather and late trainer/vendor patterns for final skill gains.']},
    {id:'tailoring',name:'Tailoring',symbol:'✂',type:'crafting',color:'violet',pair:'Enchanting',role:'Cloth armor, bags, shirts and specialty gear.',benefit:'Ideal for cloth users; pairs naturally with disenchanting.',camp:'Faction Banner',mats:'Linen, wool, silk, mageweave, runecloth and thread',steps:['Keep linen from humanoids; make bolts and simple cloth items.','Collect wool then silk; turn cloth into bolts before choosing the cheapest craft.','Farm higher-level humanoids for mageweave; make bags/gear with good skill colours.','Use runecloth and high-tier recipes, then disenchant spare green gear.']},
    {id:'herbalism',name:'Herbalism',symbol:'❀',type:'gathering',color:'green',pair:'Alchemy',role:'Collects herbs for alchemists and useful market sales.',benefit:'Self-supply potions while exploring the world.',camp:'Incense Candle',mats:'Herb nodes found in the world',steps:['Train Herbalism early and turn on Find Herbs.','Make short loops in low-level zones until herb nodes turn green.','Advance into mid-level zones as herb skill allows; gather every useful node.','Follow higher-level herb routes and bank scarce reagents for future crafts.']},
    {id:'mining',name:'Mining',symbol:'⛏',type:'gathering',color:'amber',pair:'Blacksmithing / Engineering',role:'Mines ore, stone and some gems; can smelt bars.',benefit:'Feeds two major crafting paths and provides valuable raw materials.',camp:'Lodestone',mats:'Copper → tin/iron → mithril → thorium routes',steps:['Train Find Minerals, carry a mining pick and collect copper.','Mine tin/iron in suitable zones; smelt ore when it still grants points.','Work through higher-skill ore and useful stone nodes.','Move to mithril/thorium areas only once your skill meets the nodes.']},
    {id:'skinning',name:'Skinning',symbol:'♧',type:'gathering',color:'green',pair:'Leatherworking',role:'Skins defeated beasts for leather and hides.',benefit:'Very convenient while leveling through beast-heavy zones.',camp:'Camp Chair',mats:'Beast corpses across progressively higher-level zones',steps:['Carry a skinning knife if required and skin eligible beasts you defeat.','Choose quest routes with many beasts to gather without a separate grind.','Move naturally to harder beasts when current skins stop giving points.','Use higher-level beast areas while avoiding mobs that slow your leveling.']},
    {id:'cooking',name:'Cooking',symbol:'♨',type:'secondary',color:'amber',pair:'Fishing',role:'Makes food and useful Well Fed effects.',benefit:'Crafted foods help character leveling and camp-based play.',camp:'Basic Campfire',mats:'Meat, fish, spices and recipes',steps:['Cook meat and fish from your starting zones.','Buy inexpensive vendor recipes for ingredients you already have.','Keep Fishing close to Cooking; save mid-tier fish/meat.','Use high-tier recipes learned through trainers, vendors and activities.']},
    {id:'fishing',name:'Fishing',symbol:'♒',type:'secondary',color:'teal',pair:'Cooking',role:'Catches fish for cooking and other recipes.',benefit:'Relaxed gathering with excellent synergy for food.',camp:'Fishing Bowl',mats:'Fishing pole, suitable water and optional lures',steps:['Fish close to towns and keep your catch for Cooking.','Visit new waters as your character travels; train new ranks.','Use lures to reduce failed casts in more difficult fishing zones.','Fish higher-level waters for valuable cooking ingredients.']},
    {id:'first-aid',name:'First Aid',symbol:'✚',type:'secondary',color:'red',pair:'All characters',role:'Makes bandages and survival supplies, including healing items.',benefit:'Excellent independent healing utility while questing.',camp:'First Aid Kit',mats:'Cloth drops and relevant trade supplies',steps:['Keep excess linen for bandages and early patterns.','Continue with wool and silk while advancing profession ranks.','Switch to mageweave as low-level bandages turn green/grey.','Use runecloth and higher-tier patterns for later points.']}
  ];
  const chosen = [
    {name:'Xuthar Morvayne',role:'Human Shadow Priest',icon:'☽',pair:'Tailoring + Enchanting',motive:'Craft cloth gear and bags, then disenchant surplus items for materials. A natural fit for a Shadow Priest.',alt:'Alternative: Herbalism + Alchemy for self-sufficient potions.'},
    {name:'Thorgar Ironbeard',role:'Dwarf Hunter',icon:'✦',pair:'Mining + Engineering',motive:'Craft useful gadgets, scopes and ranged utility. Mining supplies the metal you will need.',alt:'Alternative: Skinning + Leatherworking for equipment and low-cost materials.'},
    {name:'Aelyndra Zephyrveil',role:'Skyborn Druid',icon:'❧',pair:'Herbalism + Alchemy',motive:'Gather herbs while roaming the world, then prepare potions and other consumables.',alt:'Alternative: Skinning + Leatherworking for leather gear.'}
  ];
  const escape = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const typeLabel={crafting:'CRAFTING',gathering:'GATHERING',secondary:'SECONDARY'};
  const section=document.createElement('section');
  section.id='forever-professions';
  section.className='forever-professions-guide';
  section.setAttribute('aria-labelledby','prof-guide-title');
  section.innerHTML=[
    '<div class="prof-guide-hero">',
      '<div class="prof-guide-hero-copy"><span class="prof-kicker">THE FOREVER FIELD MANUAL  /  PROFESSIONS</span>',
      '<h2 id="prof-guide-title">Master your trade.<br><em>Forge your own path.</em></h2>',
      '<p>All 12 professions, practical skill-up routes from 1–300 and the best two-profession combinations for your adventures. Built around Forever’s new Camping and Legacy systems.</p>',
      '<div class="prof-guide-pills"><span><b>9</b> primary</span><span><b>3</b> secondary</span><span><b>300</b> skill cap</span><span><b>2</b> primary slots</span></div>',
      '<div class="prof-guide-hero-actions"><a href="#prof-all-professions" class="button primary">Browse professions ↓</a><a href="#prof-pairings" class="button">Choose your pairing ↓</a></div></div>',
      '<div class="prof-guide-art" role="img" aria-label="Night-time Azeroth campfire scene from our gallery"><span>THE ART OF THE TRADE</span><strong>Gather.<br>Create.<br>Explore.</strong></div>',
    '</div>',
    '<div class="prof-guide-basics"><article><span class="prof-basic-icon">01</span><h3>Choose two primary skills</h3><p>Gathering or crafting: mix two from nine professions. You may change them later, but unlearning loses existing progress.</p></article>',
    '<article><span class="prof-basic-icon">02</span><h3>Learn every secondary skill</h3><p>Cooking, Fishing and First Aid do not consume either of your primary profession slots.</p></article>',
    '<article><span class="prof-basic-icon">03</span><h3>Open the Professions panel</h3><p>Press <strong>K</strong>, check recipe colours and required materials, and revisit trainers before reaching a skill cap.</p></article></div>',
    '<div class="prof-guide-subhead"><span class="prof-kicker">FAST LEVELLING  /  APPRENTICE TO ARTISAN</span><h3>The efficient road to 300</h3><p>These are progression milestones, not guaranteed shopping lists: new Forever recipes and server prices can change the cheapest craft.</p></div>',
    '<div class="prof-milestones">',
      '<div><span>01</span><strong>1–75</strong><small>Apprentice</small><p>Train early, gather on your quest routes and craft orange items first.</p></div>',
      '<div><span>02</span><strong>75–150</strong><small>Journeyman</small><p>Unlock at 50 skill when eligible; bank the next tier of materials.</p></div>',
      '<div><span>03</span><strong>150–225</strong><small>Expert</small><p>Unlock at 125 skill when eligible; choose yellow/orange crafts.</p></div>',
      '<div><span>04</span><strong>225–300</strong><small>Artisan</small><p>Unlock at 200 skill when eligible; plan expensive late materials.</p></div>',
    '</div>',
    '<p class="prof-colour-note"><span class="pc-orange">● Orange = guaranteed skill-up</span><span class="pc-yellow">● Yellow = good chance</span><span class="pc-green">● Green = lower chance</span><span class="pc-grey">● Grey = no skill-up</span></p>',
    '<div id="prof-all-professions" class="prof-guide-subhead"><span class="prof-kicker">BROWSE THE TRADES  /  ALL 12</span><h3>Every profession, explained.</h3><p>Select a category and open a profession for its 1–300 strategy, ingredients and recommended pairing.</p></div>',
    '<div class="prof-filters" role="group" aria-label="Filter profession categories"><button type="button" data-prof-filter="all" aria-pressed="true">All 12</button><button type="button" data-prof-filter="crafting" aria-pressed="false">Crafting · 6</button><button type="button" data-prof-filter="gathering" aria-pressed="false">Gathering · 3</button><button type="button" data-prof-filter="secondary" aria-pressed="false">Secondary · 3</button></div>',
    '<div class="prof-cards" id="prof-cards"></div>',
    '<div id="prof-pairings" class="prof-guide-subhead"><span class="prof-kicker">SMART PAIRINGS  /  CLASS & PLAYSTYLE</span><h3>Two skills that belong together.</h3><p>Good profession pairs save money and strengthen your character. There is no mandatory “best” pairing.</p></div>',
    '<div class="prof-pairing-grid" id="prof-pairing-grid"></div>',
    '<div class="prof-pairing-tool"><div><span class="prof-kicker">QUICK RECOMMENDATION TOOL</span><h4>What is your main priority?</h4></div><label for="prof-goal">Choose your playstyle</label><select id="prof-goal"><option value="self">Self-sufficient levelling</option><option value="gold">Make gold on a fresh realm</option><option value="priest">Cloth caster or priest</option><option value="hunter">Hunter and useful gadgets</option><option value="druid">Druid and consumables</option><option value="armor">Craft my own armor</option></select><p id="prof-goal-answer" aria-live="polite"></p></div>',
    '<div class="prof-forever-features"><div class="prof-guide-subhead"><span class="prof-kicker">FOREVER-SPECIFIC  /  WHY IT MATTERS</span><h3>More than bags and potions.</h3></div>',
    '<div class="prof-feature-list"><article><span>♨</span><div><h4>Camping begins early</h4><p>Profession-related camp features can start at skill 20. Later blueprints and stations support the group; each camp can hold up to three features contributed by nearby players.</p></div></article>',
    '<article><span>✦</span><div><h4>Legacy profession perks</h4><p>Working Overtime improves skill-up chances, Bountiful Harvest improves scarce gathering yields, and Dedicated Study helps raise profession skill. Check your Legacy tree as you progress.</p></div></article>',
    '<article><span>◈</span><div><h4>Plan around your alts</h4><p>Use a gatherer to supply a crafter, save reusable materials and avoid expensive Auction House purchases during the first days of a fresh realm.</p></div></article></div></div>',
    '<div class="prof-guide-sources"><strong>Sources & verification</strong><p>Blizzard’s official Forever professions/Camping and Legacy information, plus practical Icy Veins guides. Individual recipes, exact materials and trainer availability can change with launch patches; check the colour and trainer in game.</p>',
    '<a href="https://worldofwarcraft.blizzard.com/en-us/news/24301516" target="_blank" rel="noopener noreferrer">Blizzard: Camping & professions ↗</a>',
    '<a href="https://worldofwarcraft.blizzard.com/en-us/news/24307383" target="_blank" rel="noopener noreferrer">Blizzard: Legacy system ↗</a>',
    '<a href="https://www.icy-veins.com/wow-forever/professions-overview" target="_blank" rel="noopener noreferrer">Icy Veins: Forever professions overview ↗</a>',
    '<a href="https://www.icy-veins.com/wow-forever/professions-overview" target="_blank" rel="noopener noreferrer">Profession-specific guides ↗</a></div>'
  ].join('');

  const cardRoot=section.querySelector('#prof-cards');
  professions.forEach(p=>{
    const card=document.createElement('article');
    card.className='prof-card prof-'+p.color;
    card.dataset.type=p.type;
    card.id='prof-'+p.id;
    const steps=p.steps.map((s,i)=>'<li><b>'+['1–75','75–150','150–225','225–300'][i]+'</b><span>'+escape(s)+'</span></li>').join('');
    card.innerHTML='<div class="prof-card-top"><span class="prof-icon" aria-hidden="true">'+p.symbol+'</span><span class="prof-kind">'+typeLabel[p.type]+'</span></div>'+
      '<h4>'+p.name+'</h4><p class="prof-card-description">'+escape(p.role)+'</p>'+
      '<div class="prof-card-pair"><small>BEST WITH</small><strong>'+escape(p.pair)+'</strong></div>'+
      '<details><summary>View fast-levelling guide <span aria-hidden="true">＋</span></summary>'+
      '<div class="prof-card-details"><p><strong>Why choose it:</strong> '+escape(p.benefit)+'</p>'+
      '<p><strong>Gather / prepare:</strong> '+escape(p.mats)+'</p>'+
      '<p><strong>First campsite feature:</strong> '+escape(p.camp)+'</p>'+
      '<ol class="prof-route">'+steps+'</ol>'+
      '<a href="https://www.icy-veins.com/wow-forever/'+p.id+'" target="_blank" rel="noopener noreferrer">Check detailed trainers & recipes ↗</a></div></details>';
    cardRoot.append(card);
  });

  const pairRoot=section.querySelector('#prof-pairing-grid');
  chosen.forEach(x=>{
    const card=document.createElement('article');card.className='prof-hero-pair';
    card.innerHTML='<div class="prof-pair-avatar" aria-hidden="true">'+x.icon+'</div><span class="prof-kicker">'+escape(x.role)+'</span>'+
      '<h4>'+escape(x.name)+'</h4><div class="prof-pair-choice">'+escape(x.pair)+'</div>'+
      '<p>'+escape(x.motive)+'</p><small>'+escape(x.alt)+'</small>';
    pairRoot.append(card);
  });

  const filterBtns=[...section.querySelectorAll('[data-prof-filter]')];
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    const type=btn.dataset.profFilter;
    filterBtns.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    [...cardRoot.children].forEach(card=>{card.hidden=type!=='all'&&card.dataset.type!==type;});
  }));
  const choices={
    self:['Herbalism + Alchemy','Gather while questing and create your own consumables.'],
    gold:['Mining + Herbalism','Two gathering skills avoid crafting costs and let you sell useful raw materials. Consider Skinning if you mostly fight beasts.'],
    priest:['Tailoring + Enchanting','Cloth gear and bags support Enchanting through disenchanting. This is Xuthar’s planned combination.'],
    hunter:['Mining + Engineering','Mining supplies gadget components; excellent utility for Thorgar’s Hunter playstyle.'],
    druid:['Herbalism + Alchemy','Gather along the route and make consumables. A balanced choice for Aelyndra.'],
    armor:['Skinning + Leatherworking, or Mining + Blacksmithing','Choose the pair matching your preferred armor type: leather/mail vs metal-heavy gear.']
  };
  const select=section.querySelector('#prof-goal'),answer=section.querySelector('#prof-goal-answer');
  function showChoice(){const data=choices[select.value]||choices.self;answer.innerHTML='<strong>'+escape(data[0])+'</strong><span>'+escape(data[1])+'</span>';}
  select.addEventListener('change',showChoice);showChoice();

  root.insertAdjacentElement('afterend',section);
  const quick=section.ownerDocument.querySelector('.forever-launch-callout .buttons');
  if(quick){
    const a=document.createElement('a');a.className='button';a.href='#forever-professions';a.textContent='Profession guide · 1–300 ↓';quick.append(a);
  }
  const header=section.ownerDocument.querySelector('.forever-journey-head');
  if(header){
    const a=document.createElement('a');a.href='#forever-professions';a.className='text-link';a.textContent='Return to the profession field guide ↑';header.append(a);
  }
  if(location.hash==='#forever-professions' || location.hash.startsWith('#prof-')){
    requestAnimationFrame(()=>{const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el)el.scrollIntoView({block:'start'});});
  }
})();
