/* Forever: first player-reported adventure; literary narration is labelled. */
(() => {
  'use strict';
  const page=document.body.dataset.page;
  const book='book.html?character=xuthar#x-rain-over-goldshire';
  function westfallArrivalPanel(){
    const section=document.createElement('section');
    section.id='xuthar-westfall-arrival';
    section.className='day-two-panel wrap';
    section.setAttribute('aria-labelledby','westfall-arrival-title');
    section.innerHTML=`
      <div class="day-two-signal">NEW JOURNEY · 7 NOVEMBER 2026 · THE RIVERSIDE AFTER DARK</div>
      <div class="day-two-layout">
        <div>
          <h2 id="westfall-arrival-title">Beyond Eastvale.<br><em>The river keeps its names.</em></h2>
          <p>From the bustling square of Goldshire, Xuthar followed Elwynn's quiet western road to the lion-guarded Alliance bridge. Beyond its blue banners, the forests ended and the sunlit fields of Westfall spread out before him. His first passage into the region is now part of The Last Witness.</p>
          <div class="first-night-steps" aria-label="Four moments from the first Westfall crossing">
            <div><b>10:56</b><span>Goldshire square · travellers and village life</span></div>
            <div><b>10:56</b><span>Western Elwynn · the forest road</span></div>
            <div><b>12:00</b><span>The border bridge · lions and Alliance banners</span></div>
            <div><b>12:08</b><span>Westfall · first farms and golden fields</span></div>
          </div>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-westfall-first-crossing">Read Chapter XXXI · The Golden Country ↗</a>
            <a href="xuthar.html#xuthar-quests">View the living quest record ↗</a>
          </div>
          <p><strong>A return to Stormwind.</strong> After his first crossing into Westfall, Xuthar travelled back to Stormwind on errands, learned how to wield staves and obtained a new, as-yet-unnamed staff. His visit to Gryan Stoutmantle remains ahead.</p>
          <div class="day-two-links"><a href="book.html?character=xuthar#x-stormwind-return-first-staff">Read Chapter XXXII · The Staff and the City ↗</a></div>
          <p><strong>13:41 · The Furlbrows' requests.</strong> At their wagon Xuthar discovered two family burdens: a stew recipe to deliver and a missing pocket watch. Both the Furlbrows and the unfinished report to Gryan belong to the new Westfall journey.</p>
          <p><strong>14:09 · Westfall's Harvest Watchers.</strong> After crafting bags with Tailoring and finishing his Stormwind visit, Xuthar returned to the pumpkin fields, where dangerous level-14 Harvest Watchers guard the golden farmland. This is a sighting, not a recorded victory.</p>
          <p><strong>14:11 · Nine open quests.</strong> A new stage of Westfall Stew calls for ingredients (Okra 3/3); Goretusk Liver Pie stands at 2/8; The Killing Fields asks for 20 Harvest Watchers, with none yet slain. Gryan's report and the missing Furlbrow heirloom are still unfinished.</p>
          <div class="day-two-links">
            <a href="xuthar.html#xuthar-latest-quests">See the 9 active Westfall quests ↗</a>
            <a href="book.html?character=xuthar#x-westfall-hunger-harvest-tasks">Read Chapter XXXIV · The Hunger Beneath the Gold ↗</a>
            <a href="book.html?character=xuthar#x-westfall-fields-harvest-watchers">Earlier: Chapter XXXIII · The Watchers in the Wheat ↗</a>
          </div>
          <p><strong>The Eleventh Threshold.</strong> Xuthar has reached level 11, confirmed by the official Blizzard EU character profile. As the fields of Westfall demand patience and compassion, his latest transformation enters The Last Witness as a chapter of an unfolding life, not a list of game statistics.</p>
          <div class="day-two-links"><a href="book.html?character=xuthar#x-westfall-eleventh-threshold">Read Chapter XXXV · The Weight of Another Dawn ↗</a><a href="xuthar.html#xuthar-level-eleven">See the level 11 milestone ↗</a></div>
          <p><strong>16:43 · Nearly enough for Westfall Stew.</strong> Xuthar has all the vulture meat, snouts and okra, and two of three murloc eyes. The last eye is still missing; Liver Pie remains at 2/8 and The Killing Fields at 0/20. The day has been exhausting, his handmade bags are crowded and the outstanding quests must wait.</p>
          <p><strong>Homeward by Hearthstone.</strong> Xuthar returned from Westfall to Goldshire to gather his strength and prepare for Stormwind. Clearing out his bags, resting, purchasing a wand and tending to his professions are his next intentions, not actions already completed.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-hearthstone-goldshire-return">Read Chapter XXXVI · The Weight of What Remains ↗</a>
            <a href="xuthar.html#xuthar-hearthstone-return">Hearthstone and quest status ↗</a>
          </div>
                    <p><strong>7 November · Enchanting's first threshold.</strong> Xuthar has completed Camping 101: Enchanting, reaching the skill-20 objective. Its completion is confirmed by the traveller, while the older Blizzard snapshot has not yet caught up. New understanding has grown in his hands as well as his magic; the wand and other errands are still unconfirmed.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-enchanting-first-threshold">Read Chapter XXXVII · What the Ordinary Things Remember ↗</a>
            <a href="xuthar.html#xuthar-enchanting-completed">Enchanting quest completion ↗</a>
          </div>
          <p><strong>18:18 · The eastern road.</strong> Xuthar is now in the woods of eastern Elwynn (74.0, 55.0), in the Eastvale questing region. Eleven quests are visible: an inquiry into Rolf's fate, the dangers of frontier prowlers and bears, lost waterlogged tools, mining supplies, wood, red linen goods and five unfinished Westfall obligations. Reaching the logging camp building itself has not been established.</p>
          <p><strong>Westfall Stew · All ingredients gathered.</strong> The last Murloc Eye has been found: 3/3 vulture meat, 3/3 murloc eyes, 3/3 snouts and 3/3 okra. Xuthar still needs to deliver the ingredients to Salma Saldean; no quest reward is claimed.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-eastvale-woods-and-rolf">Read Chapter XXXVIII · The Wood That Kept Its Secrets ↗</a>
            <a href="xuthar.html#xuthar-latest-quests">View the 11 eastern-forest objectives ↗</a>
          </div>
          <p><strong>18:39 · The price of a safer road.</strong> Protect the Frontier, Good Steel and Red Linen Goods now all show Ready for turn-in. The frontier has been made safer and the requested materials gathered, but the quests still await their formal return. Rolf remains missing, the waterlogged tools and bundles of wood are uncollected, and the obligations in Westfall remain unfinished.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-eastvale-frontier-unfinished-return">Read Chapter XXXIX · The Price of a Safer Road ↗</a>
            <a href="xuthar.html#xuthar-eastvale-ready">Three quests ready for turn-in ↗</a>
          </div>
          <p><strong>18:38 · Among the sawmills.</strong> In the warm evening light Xuthar passed through Eastvale's logging camp, among cut trunks, a well, wooden workshops and enormous forest trees. The camp itself is now part of the witnessed journey, not simply an intended destination.</p>
          <p><strong>20:55 · The murloc riverside.</strong> At 76.2, 84.2 in eastern Elwynn, Xuthar is visibly level 12. Murloc huts burn with torchlight beside the water, and other travellers move through the woods. Downstream is ready for turn-in after recovery of the waterlogged tools, while Deliver Thomas' Report calls him back to Marshal Dughan in Goldshire. No hand-in of the earlier three Eastvale quests is inferred.</p>
          <p><strong>Westfall Stew · A changing inventory count.</strong> Earlier tracker snapshots showed 3/3 Murloc Eyes; the 20:55 image shows 2/3. The conflicting counts are preserved without inventing an explanation. All other ingredients remain at 3/3 and the quest is still active.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-eastvale-camp-sawdust-and-roads">Read Chapter XL · Where Timber Met the Dusk ↗</a>
            <a href="book.html?character=xuthar#x-eastvale-murloc-river-level-twelve">Read Chapter XLI · The Fires Across the Water ↗</a>
            <a href="xuthar.html#xuthar-level-twelve">See the level 12 milestone ↗</a>
          </div>
          <p class="day-two-evidence">The first Westfall entry is visible. Reaching Sentinel Hill or handing in the report to Gryan Stoutmantle has not yet been established.</p>
        </div>
        <aside class="day-two-status" aria-label="Newly confirmed region">
          <span>THE LAST WITNESS · CHAPTER XLI</span>
          <strong>THE EASTERN RIVER</strong>
          <p>MURLOC SETTLEMENT · NIGHT ON THE WATER</p>
          <b>Level 12 · 7 November · 20:55</b>
          <small>Downstream ready for hand-in; Thomas report active. Westfall Stew shows 2/3 Murloc Eyes in the newest screenshot.</small>
        </aside>
      </div>`;
    return section;
  }
  function hoggerMilestonePanel(){
    const section=document.createElement('section');
    section.id='xuthar-hogger-20261107';
    section.className='day-two-panel wrap';
    section.setAttribute('aria-labelledby','hogger-milestone-title');
    section.innerHTML=`
      <div class="day-two-signal">NEW CHAPTER · 7 NOVEMBER 2026 · THE LAST WITNESS</div>
      <div class="day-two-layout">
        <div>
          <h2 id="hogger-milestone-title">Five against one.<br><em>Hogger has fallen.</em></h2>
          <p>On the western road from Elwynn, Xuthar joined four other adventurers to face Hogger. The gnoll fell to their combined strength. Their names may yet be learned; the story remembers every member of the company, not a solitary hero.</p>
          <p class="day-two-evidence">The victory is recorded. Xuthar is returning to deliver WANTED: “Hogger”; the quest hand-in remains pending until the official Blizzard quest archive confirms it.</p>
          <p><strong>Riverpaw Gnoll Bounty completed.</strong> The long hunt south of Westbrook is over: Xuthar has gathered all eight Painted Gnoll Armbands. The achievement is part of his journey toward Westfall, while Blizzard's published quest status will update on its own schedule.</p>
          <div class="day-two-links">
            <a href="book.html?character=xuthar#x-hogger-five-against-one">Read Chapter XXIX · The Fall of Hogger ↗</a>
            <a href="xuthar.html#hogger-party-five">Battle and quest status ↗</a>
            <a href="book.html?character=xuthar#x-riverpaw-painted-armbands">Read Chapter XXX · The Painted Proof ↗</a>
            <a href="xuthar.html#riverpaw-completion-status">Riverpaw quest completed · 8/8 ↗</a>
          </div>
        </div>
        <aside class="day-two-status">
          <span>THE LAST WITNESS · NEW MILESTONE</span>
          <strong>5 / 5</strong>
          <p>ADVENTURERS STOOD TOGETHER</p>
          <b>Hogger defeated</b>
          <small>Hogger fell to five adventurers · Riverpaw Gnoll Bounty completed (8/8).</small>
        </aside>
      </div>`;
    return section;
  }
  function dayTwoPanel(){
    const section=document.createElement('section');
    section.id='xuthar-day-two';
    section.className='day-two-panel wrap';
    section.setAttribute('aria-labelledby','xuthar-day-two-title');
    section.innerHTML=`
      <div class="day-two-signal"><span class="day-two-indicator" aria-hidden="true"></span> DAY TWO IS OPEN · 6 NOVEMBER 2026</div>
      <div class="day-two-layout">
        <div>
          <h2 id="xuthar-day-two-title">Day Two.<br><em>Beyond the water.</em></h2>
          <p>After a rainy night at the Lion's Pride Inn, Xuthar's road continued through Crystal Lake, the waterways of Stormwind and the depths of Jasperlode. Near Guard Thomas in Elwynn, he reached level 10. Tailoring, Enchanting and Fishing shape his travels; Herbalism has been left behind.</p>
          <p class="day-two-evidence">The latest full quest record at 20:59 shows seven active missions, including Riverpaw Gnoll Bounty, WANTED: Hogger, Stormpike's Delivery and Report to Gryan Stoutmantle. Further Concerns is completed at Guard Thomas. Jasperlode's scouting objective was ready to report earlier; its hand-in is not established. A later night crossing closes the day's photographic record.</p>
          <div class="day-two-links"><a href="book.html?character=xuthar#x-level-ten-armory">Read the tenth threshold ↗</a><a href="journal.html#xuthar-day-two-enticing-offer-river">Forest journey journal ↗</a><a href="gallery.html#xuthar-day-two-photos">View 33 original photographs ↗</a><a href="missions.html">Completed quest archive ↗</a><a href="https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne" target="_blank" rel="noopener noreferrer">Xuthar · Official EU Armory ↗</a></div>
        </div>
        <aside class="day-two-status" aria-label="Confirmed starting facts">
          <span>THE LAST WITNESS · SESSION 02</span>
          <strong>LVL 10</strong>
          <p>LATEST PHOTOGRAPHED AREA</p>
          <b>Woodland · Elwynn Forest</b>
          <small>Level 10 at Guard Thomas · 6 November, 20:59. Seven active quests in the latest visible tracker.</small>
        </aside>
      </div>
      <div class="day-two-photostory" aria-label="Selected photographs from day two">
        <div class="story-photo-heading">
          <div><span>ORIGINAL PHOTOGRAPHS · 6 NOVEMBER</span><h3>The waterways and roads of Elwynn</h3></div>
          <a href="gallery.html#xuthar-day-two-photos">See all seven photographs ↗</a>
        </div>
        <div class="story-photo-grid story-photo-grid--two">
          <figure class="story-photo">
            <a href="assets/images/forever-screenshots/day-02/155448.jpg" target="_blank" rel="noopener" aria-label="Open original 15:54 river screenshot"><img src="assets/images/forever-screenshots/day-02/155448.jpg" width="1920" height="1080" loading="lazy" decoding="async" alt="Xuthar crossing the stream in Elwynn Forest in the warm afternoon light"></a>
            <figcaption><span>15:54 · ELWYNN FOREST</span><strong>Crossing the river</strong></figcaption>
          </figure>
          <figure class="story-photo">
            <a href="assets/images/forever-screenshots/day-02/163117.jpg" target="_blank" rel="noopener" aria-label="Open original 16:31 forest screenshot"><img src="assets/images/forever-screenshots/day-02/163117.jpg" width="1920" height="1080" loading="lazy" decoding="async" alt="Xuthar walking beneath tall trees with a Forest Spider visible ahead"></a>
            <figcaption><span>16:31 · THE WOODLAND</span><strong>Among the old trees</strong></figcaption>
          </figure>
        </div>
      </div>`;
    return section;
  }
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
          <p class="first-night-lead">The gates yielded to a sea of travellers. Xuthar Morvayne entered Northshire, faced wolves and kobolds, and walked into the shadowed fields of the Defias. During his first day he reached level eight, confirmed by in-game chat, and completed Bounty on Garrick Padfoot, Garments of the Light and Shipment to Stormwind. Beyond the stone lion of Northshire, he has reached Goldshire and entered the Lion’s Pride Inn. There he stood beside Innkeeper Farley, found Tomas the Cook, and finally sat down by the glowing hearth. His road has continued past Guard Roberts, two defeats in Fargodeep Mine, and the stone walls and canals of Stormwind. After several reported Stormwind quest hand-ins, he has learned Tailoring, Enchanting and Fishing, abandoning Herbalism. At nightfall he returned through the rain to Goldshire and lay down in an upstairs room at Lion’s Pride Inn. The living chronicle continues tomorrow.</p>
          <blockquote class="first-night-quote">“He had come to remember those whom the world would forget. He did not yet know that the world had begun to remember him.”</blockquote>
          <div class="first-night-steps" aria-label="First session milestones">
            <div><b>Level 10</b><span>Human Priest · Verified by Blizzard API</span></div>
            <div><b>New trades</b><span>Tailoring · Enchanting · Fishing</span></div>
            <div><b>Goldshire</b><span>Rainy night · Resting at Lion’s Pride Inn</span></div>
          </div>
          <div class="first-night-links"><a href="book.html?character=xuthar#x-rain-over-goldshire">Read Chapter XX · The Rain →</a><a class="secondary" href="journal.html#xuthar-day-two-enticing-offer-river">Latest travel journal →</a><a class="secondary" href="xuthar.html#xuthar-quests">Quest record · Level 10 ↗</a><a class="secondary" href="missions.html">Completed deeds ↗</a><a class="secondary" href="https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne" target="_blank" rel="noopener noreferrer">Official Armory ↗</a></div>
          <p class="first-night-fine">Screenshots confirm levels seven and eight, Garments of the Light (270 XP and Friar’s Robes of the Light), and Shipment to Stormwind (800 XP). Two deaths in Fargodeep Mine and Stormwind arrival are documented. Some later Stormwind quest deliveries are player-reported but their exact titles and rewards remain unknown; the 20:24 quest tracker is historical. The final photographs show rain outside Goldshire and Xuthar resting in a bed. Literary imagery remains original fiction.</p>
        </div>
        <aside class="first-night-archive" aria-labelledby="first-night-archive-title">
          <span class="first-night-archive-kicker">THE LAST WITNESS · PHOTO RECORDS</span>
          <h3 id="first-night-archive-title">Every journey leaves a trace.</h3>
          <p>A few selected moments accompany the story below. All 33 original files remain in a chronological archive, each available in full resolution.</p>
          <div class="first-night-archive-counters" aria-label="Archive collections">
            <a href="gallery.html#xuthar-day-one-photos"><strong>18</strong><span>Day One · 5 November</span></a>
            <a href="gallery.html#xuthar-day-two-photos"><strong>7</strong><span>Day Two · 6 November</span></a>
            <a href="gallery.html#xuthar-diary-evidence"><strong>8</strong><span>In-game diary & quests</span></a>
          </div>
          <a class="first-night-archive-open" href="gallery.html#xuthar-day-one-photos">Explore the original archive ↗</a>
          <small>33 original files · Select a photograph to open its full-size original.</small>
        </aside>
      </div>
      <div class="first-night-photostory" aria-label="Selected original photographs from day one">
        <div class="story-photo-heading">
          <div><span>ORIGINAL PHOTOGRAPHS · 5 NOVEMBER</span><h3>The first night in Azeroth</h3></div>
          <a href="gallery.html#xuthar-day-one-photos">Browse Day One ↗</a>
        </div>
        <div class="story-photo-grid story-photo-grid--three">
          <figure class="story-photo">
            <a href="assets/images/forever-screenshots/day-01/202433.jpg" target="_blank" rel="noopener" aria-label="Open original Stormwind canal photo"><img src="assets/images/forever-screenshots/day-01/202433.jpg" width="1920" height="1080" loading="lazy" decoding="async" alt="Xuthar at the wooden canal dock in Stormwind"></a>
            <figcaption><span>20:24 · STORMWIND</span><strong>By the canal</strong></figcaption>
          </figure>
          <figure class="story-photo">
            <a href="assets/images/forever-screenshots/day-01/213316.jpg" target="_blank" rel="noopener" aria-label="Open original Goldshire rain photo"><img src="assets/images/forever-screenshots/day-01/213316.jpg" width="1920" height="1080" loading="lazy" decoding="async" alt="Rain over the buildings and cobbled road in Goldshire"></a>
            <figcaption><span>21:33 · GOLDSHIRE</span><strong>The rain returns</strong></figcaption>
          </figure>
          <figure class="story-photo">
            <a href="assets/images/forever-screenshots/day-01/213455.jpg" target="_blank" rel="noopener" aria-label="Open original Lion's Pride Inn sleeping photo"><img src="assets/images/forever-screenshots/day-01/213455.jpg" width="1920" height="1080" loading="lazy" decoding="async" alt="Xuthar resting on an upstairs bed inside the Lion's Pride Inn"></a>
            <figcaption><span>21:34 · LION'S PRIDE INN</span><strong>The end of the first day</strong></figcaption>
          </figure>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend',section);
    section.insertAdjacentElement('beforebegin',dayTwoPanel());
    hero.insertAdjacentElement('afterend',hoggerMilestonePanel());
    hero.insertAdjacentElement('afterend',westfallArrivalPanel());
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
      <h2 id="xu-first-session-title">Back to Goldshire: the rain and the quiet room.</h2>
      <p>Earlier screenshots confirm level 8 on 5 November, Garments of the Light completed and Shipment to Stormwind handed in. The player has since confirmed level 10 on 6 November. After crossing Elwynn and enduring two defeats in Fargodeep Mine, Xuthar reached Stormwind, delivered several quests and learned Tailoring, Enchanting and Fishing, leaving Herbalism behind. Six distinct new photographs show his rainy journey home and his rest in a bed at Goldshire’s Lion’s Pride Inn. Named quests not separately documented remain unconfirmed.</p>
      <div class="first-night-links"><a href="book.html?character=xuthar#x-rain-over-goldshire">Read Chapter XX · The Last Light Before Sleep →</a><a href="journal.html#xuthar-rainy-goldshire-rest">Read tonight’s Goldshire journal →</a><a href="#xuthar-quests">View last documented quest tracker ↗</a></div>
    `;
    opening.parentNode.insertBefore(panel,opening);
    panel.insertAdjacentElement('beforebegin',hoggerMilestonePanel());
    panel.insertAdjacentElement('beforebegin',dayTwoPanel());
    document.getElementById('xuthar-hogger-20261107')?.insertAdjacentElement('beforebegin',westfallArrivalPanel());
  }
})();
