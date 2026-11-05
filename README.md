# Chronicles of Azeroth

A personal World of Warcraft website featuring Retail characters and a WoW Forever roleplay travel journal. All visitor-facing content is in English. Static HTML, CSS, and JavaScript; no dependencies, database, paid services, or visitor accounts.

## Public website

- Website: https://xuthar.github.io/cronache-di-azeroth/
- Repository: https://github.com/xuthar/cronache-di-azeroth
- Hosting: GitHub Pages, `main` branch, `/(root)` directory, HTTPS enabled.

First published on 3 October 2026. Translated into English on 4 October 2026. The repository name and public address remain the same. Updates committed to `main` trigger the next GitHub Pages deployment.

## Open locally

Open `index.html` in a browser with JavaScript enabled. All assets are local. No installation or build step is required. The custom error page is configured for the public GitHub Pages address.

## Files and editing

The seven pages are `index.html`, `retail.html`, `forever.html`, `journal.html`, `campsites.html`, `stories.html`, and `gallery.html`. The page-not-found screen is `404.html`; `.nojekyll` disables Jekyll processing.

Edit `assets/js/content.js` in a UTF-8 text editor. Each record is an object in an array; duplicate a record of the same type, separate it with a comma, and use a unique ID. Text is displayed as plain text, not HTML. Use English for new content.

- `characters`: name, race, class, realm, specialisation, professions, portrait, and biography.
- `journal`: newest entries first; `text` is an array of paragraphs. The optional `camp` must match a campsite ID.
- `camps`: place names, shelters, water, status, and field notes.
- `stories`: titles, story types, excerpts, and paragraphs in `text`.
- `gallery`: image paths, categories, titles, and English alternative descriptions in `alt`.

`assets/js/app.js` handles rendering, the mobile menu, expandable content, and the image viewer. Introductions, quotations, the route, and the featured Home entry are curated there: update them and their links when changing the journey. Headers, footers, titles, metadata, and `lang="en"` are in each HTML file. Styling and responsive layout are in `assets/css/style.css`.

Internal IDs such as `luce-tra-i-pini` and `radura` were retained during translation so shared links keep working. They are not displayed as visitor-facing text. Before changing an ID, update every link using it.

## Images

Copy portraits and screenshots into `assets/images/`, then set a record’s `image` to a relative path such as `assets/images/xuthar.webp`. Leave `image: ""` for a placeholder. Supported formats: PNG, JPG, JPEG, WebP, AVIF, GIF. Use simple filenames without accents. Suggested proportions: portraits 4:5, screenshots 4:3 or 16:9. Gallery images can be enlarged and closed with Close or Escape.

`assets/images/hero.webp` is the original, optimised fantasy opening landscape. It is generated artwork, not a game screenshot. The website loads no external fonts, libraries, trackers, or cookies.

## Sample content

The planned WoW Forever roster was announced on 27 October 2026: Xuthar Morvayne (main; Human Shadow Priest), Thorgar Ironbeard (Dwarf Hunter) and Aelyndra Zephyrveil (female Skyborne Druid). The planned character biographies are fictional; Xuthar's first player-reported gameplay session is now recorded separately (5 November 2026). Thorgar and Aelyndra have no recorded played sessions here. Retail profiles remain separate from Forever plans. The Oak Inn → Ford Trail → Pine Glade route, journal entries, and stories are original examples, not official lore or records of actual adventures. Update the sample-content notices when adding real content.

## Verification and publication

After editing, open all pages and test mobile navigation, expandable stories, and image links. `journal.html#luce-tra-i-pini` opens its entry automatically. `404.html` uses base `/cronache-di-azeroth/`, keeping navigation working for nested missing URLs; update that base if the repository is renamed. Other pages use relative paths.

The existing repository is already published. For a separate copy, create a public repository, upload this directory’s contents with `index.html` at its root, then choose **Settings → Pages → Deploy from a branch → main → /(root)**. Keep `.nojekyll`. No domain purchase is required.

Official documentation:

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

World of Warcraft is a trademark of Blizzard Entertainment. This is an unofficial fan project.

## Retail event calendar
calendar.html displays the public ICS schedule exported by WoW Lazy Tools. This is not a Blizzard character/guild calendar integration. The source has no regional identifier; Europe/Rome is a display timezone, not an EU server schedule guarantee. Dates are never shifted to guess regional reset times. The dedicated retail-events workflow fetches the source every 6 hours and publishes retail-events.json on the retail-events branch. Source failure leaves the last successful data untouched. The browser refreshes every 5 minutes and marks data older than 24 hours. Local fallback is assets/data/retail-events.json. Event end times are exclusive. Unsupported recurrence rules or unverified timezone identifiers stop publication instead of producing guessed dates.


## The Lore — The Road to Loremaster

`lore.html` is an English narrative archive covering Classic and the eleven released expansions through Midnight. The main campaigns and major patch arcs are original summaries with per-chapter links to Blizzard’s official timeline. The newest account includes Curse of Ula’tek, reviewed 4 October 2026; it is editorial content, not an automatic live lore feed. It does not claim exhaustive coverage of every quest or book.

Update chapters, people, places, events, release years and source chapter numbers in `assets/js/lore-content.js`. The reader and verified official YouTube cinematic IDs are in `assets/js/lore.js`; the dedicated responsive design is in `assets/css/lore.css`. The small W medallions are original inline SVGs with two colors per expansion. All chapters can be linked directly, for example `lore.html#wrath`. Chapters are navigable through the table of contents, sidebar, and previous/next links. The cinematic links open the official videos on YouTube.


## Forever introduction and useful resource directory

`assets/js/resources-content.js` contains the curated directory of 26 useful websites, purpose labels and game-version labels. `site-resources.js` renders the searchable category-filtered homepage collection and the Forever introduction before the personal roleplay journal. `resources.css` provides the dedicated responsive styles. Official information is reviewed 4 October 2026 and should be updated editorially when Blizzard changes its announcements; this introduction is not an automatic news feed. Launch UTC is 2026-11-04T23:00:00Z (5 November 00:00 CET). Base access is included in WoW subscription/Game Time; Skyborne and Zephras Isle require Heroic Pack or higher. Official trailers: cinematic xXaXYxcbA6A, gameplay uQuKE0KDgiM. The cinematic player loads from youtube-nocookie.com only when the visitor presses Play; external YouTube links remain available. Retail tools are not labelled as Forever-compatible.


## Stories & Lore — Original short fiction

The library contains 32 English tales, including the two original travel fragments. On 11 October 2026, ten new stories were added at the front of the collection, set in remote corners of Winterspring, Desolace, Azshara, Feralas, Silithus, the Hinterlands, the Swamp of Sorrows, the Badlands, the Storm Peaks and Townlong Steppes. The previous 22 entries retain their text and IDs. Edit `stories` in `assets/js/content.js`: each item has an ID, title, zone, region, kind, excerpt and text paragraph array. Region filters are generated from the content. New IDs must be unique. Links such as `stories.html#duskwood-third-lantern` open the matching tale; navigating to a hidden tale clears the active filter. These invented characters and events are distinct from the official history in The Lore and the personal gameplay journal.


## Interactive lore atlas

The Atlas of Azeroth in lore.html uses atlas-data.js (16 region/world entries and the Wowhead zone index reviewed 4 October 2026), atlas.js and atlas.css. The game map images are loaded directly from Wowhead’s public image CDN; artwork is attributed to Blizzard. Region/world selection, full-index search, zoom, drag/pinch, keyboard panning, expanded view and one temporary coordinate marker are supported without a map library. Links #atlas-r-1 or #atlas-p10 share a selected map. Markers are map-relative and never game/GPS tracking or routing. Regional outdoor maps are curated; the full index also contains alternate phases/instances, some without an image. Failed images show a reference link rather than invented geography. Remote image availability may change. The Forever personal travel map is separate and remains planned.


## Contacts and October news review

The shared contact strip provides Telegram and Battle.net.

Editorial selection reviewed 11 October 2026: Forever beta notes dated 8 October (City of Dalaran, dungeon XP and interface changes), Blizzard's WoW Weekly dated 9 October (podcast episode 3 and class features), and the Retail 12.1.5 notes. The previous upcoming PAX notice has been removed after its date passed. Sources are linked next to the summaries; these are dated editorial snapshots, separate from the automatic Wowhead feed. The checked-in homepage fallback has been refreshed from the successful live-news snapshot of 11 October.


## WoW Forever character announcement — 27 October 2026

`assets/js/forever-roster.js` defines the three planned Forever characters and renders the launch announcement both on the homepage and at `forever.html#forever-roster`; it also exposes the entries via `window.CHRONICLES.foreverCharacters` when the main content object is available. `assets/css/forever-roster.css` contains the custom illustrations, class colors and mobile layout. The site distinguishes planned roleplay biographies from confirmed gameplay progress. Do not place these characters in the Retail roster.


## The first night of Forever — 5 November 2026

The owner's screenshots and conversation establish Xuthar Morvayne's first Roleplay session: login queue position 524; arrival at Northshire Abbey; fighting wolves at level 2; reaching level 3; meeting Marshal McBride and finding the Priest trainer; and exploring Echo Ridge. The last shared quest tracker showed 5/8 Stolen Books, 5/10 Kobold Workers, and 0/12 Red Burlap Bandanas. These were still **in progress**; no automatic character sync or later quest completion is implied.

- `assets/data/character-books.json`: Book I now includes the first nine player-reported and literary pages after the fictional prologue, with an explicit factual field record. The last page still awaits future play.
- `assets/js/content.js`: first `journal` entry is a dated first-session report. Older journal stops are still fictional examples.
- `assets/js/first-adventure.js` + `assets/css/first-adventure.css`: editorial first-night feature on the homepage and Xuthar dossier, with links to the interactive book and journal.
- `assets/js/app.js`: separates the real journal entry from older samples. `book.html?character=xuthar#x-live-1` deep-links into the new chapter.

Narrative metaphors, inner thoughts, scenery descriptions and dialogue are roleplay fiction. Player-reported events are not independently verified through a Blizzard API. Existing archive artwork is clearly labelled as illustrative, not as an actual first-session screenshot.

### Further first-night update — Level 5, Defias and the Abbey

The owner subsequently reported Xuthar Morvayne at level **5**, confirmed the **Brotherhood of Thieves** objective had been completed (twelve Red Burlap Bandanas), and stated that Xuthar returned to **Northshire Abbey to rest**. A screenshot also showed Defias Thugs in the Northshire fields. Quest turn-in, reward and other active-quest status were not supplied; no completion is inferred for the older Echo Ridge or Rascally Rodents objectives.

The book now contains Chapters VIII–IX (five new pages including a factual field record) immediately before the future-story placeholder, and the travel journal begins with the latest reported event at `journal.html#northshire-abbey-rest`. The first-night homepage feature and Xuthar dossier reflect level 5. Deep link to the latest fictionalised episode: `book.html?character=xuthar#x-live-9`. The prose is a literary interpretation, clearly distinct from confirmed player reports. This manual editorial update does not claim official Blizzard API synchronisation.

### Eight user-provided WoW Forever screenshots — 5 November 2026

An eight-frame, player-supplied Northshire screenshot album is available at `gallery.html#forever-first-night-gallery`. The screenshots show a launch-night crowd near the abbey; Deputy Willem and other adventurers; Xuthar's level 2 Wolf quest; level 3 after Kobold Camp Cleanup; level 4 with 9/10 Kobold Workers and 6/8 Stolen Books; Defias fields; and level 5 with the Militia Hammer reward, new quest options, and Brotherhood of Thieves **Ready for turn-in**. See the factual screenshot notes added to Xuthar's book. The latest player's written report subsequently places Xuthar resting at the abbey. No subsequent hand-in is inferred.

The eight real screenshots are stored in a single optimized, lightly brightened 2-column × 4-row AVIF preview sheet, base64 text at `assets/data/forever-first-night-atlas.b64`. `assets/js/forever-first-night-photos.js` retrieves that file locally, validates its expected format and length, displays each cropped frame without remote storage, and offers a keyboard-operable gallery view. `assets/css/forever-first-night-photos.css` supplies responsive styling. The homepage replaces its previous archive illustration with an authentic cropped screenshot. The gallery keeps other historical images unchanged. Preview frames are 440×248; original uploaded files are not represented as full-resolution downloads. The site makes **no claim of automatic gameplay synchronization**.

### The first road to Goldshire — 5 November 2026 (seven new screenshots)

The latest real gameplay images record Xuthar Morvayne's level 6 milestone and **Bounty on Garrick Padfoot completed**. Game chat explicitly reports **340 XP** for the completed bounty; it also shows receiving a **Grape Manifest**, which the screenshot's tracker directs to Brother Neals in Northshire Abbey. The Adventurer, Report to Goldshire and In Favor of the Light are active in the same screenshot.

Six subsequent images show the sunlit grounds outside Northshire, the lion-headed fountain and Abbey archway, the forest road, and the blue-roofed village buildings and streets of **Goldshire**. These establish travel to the village area but **do not** confirm talking with Innkeeper Farley, Marshal Dughan or other NPCs. Earlier Camping 101 objectives have not been silently completed or removed from historical records.

- Book I: **Chapter XV · The Sun beyond the Abbey**, plus a new field record, at `book.html?character=xuthar#x-goldshire-road`.
- Travel Journal: `journal.html#xuthar-first-steps-goldshire`.
- Gallery: `gallery.html#goldshire-travel-gallery`, an interactive seven-photo gallery with captions, keyboard navigation and player-supplied images.
- Image previews are a single compact 2×4 AVIF contact sheet at `assets/data/xuthar-goldshire-seven-atlas.b64` (seven populated frames, one unused cell). The site decodes the base64 locally; **the full-size screenshots remain user-provided originals outside the published website**. Preview resolution is 320×180 pixels per frame, so no full-resolution claim is made. Source files include `WoWScrnShot_110526_113639.jpg`, `113644`, `115408`, `115434`, `121800`, `121805` and `121809`.
- Script: `assets/js/goldshire-photo-diary.js`. This presentation has no in-game addon or Blizzard API access; quest observations remain manual.

The previous journal/quest screenshots are historical snapshots. Only Garrick's bounty has a confirmed screenshot-based final hand-in in the new material.

### Inside the Lion's Pride Inn — 5 November 2026 (four screenshots)

Xuthar's arrival at the Lion's Pride Inn in Goldshire is **visually confirmed** by four player-supplied gameplay screenshots taken at 12:32, 12:33, 12:35 and 12:38. They show the fire-lit main room, the priest standing next to **Innkeeper Farley**, the kitchen area with **Tomas (Cook)** and **Toddrick (Butcher)**, and the priest **sitting in a chair** near the bar. Melika Isenstrider, Barkeep Dobbins and Brog Hamfist appear as named inhabitants.

These photographs **do not confirm** an actual quest hand-in to Farley, an inn hearthstone binding, learning Cooking from Tomas, resting XP, an additional level, or any new reward. The four screenshots are preserved at `gallery.html#lions-pride-inn-gallery` as a responsive, keyboard-navigable gallery with an optimized 2×2 AVIF preview atlas. The contact sheet is stored as base64 in `assets/data/xuthar-lions-pride-four-atlas.b64`, with 400×225 previews from the original images `WoWScrnShot_110526_123214.jpg`, `123317.jpg`, `123507.jpg`, and `123823.jpg`. The full-resolution user files remain outside the published website.

- Book: `book.html?character=xuthar#x-lions-pride-hearth` (Chapter XVI, **The Quiet Mercy of Fire**), followed by a separate factual field record.
- Journal: `journal.html#xuthar-inside-lions-pride-inn`.
- Homepage: latest photographic cover of Xuthar seated in the inn.
- Galleries and links: `assets/js/lions-pride-photo-diary.js`. No automatic gameplay or Blizzard API tracking is implied.
