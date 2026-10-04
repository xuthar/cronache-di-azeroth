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

Xuthar Morvayne comes from the project context. Race, class, origins, and real gameplay progress are still to be supplied. Retail profiles are placeholders. The Oak Inn → Ford Trail → Pine Glade route, journal entries, and stories are original examples, not official lore or records of actual adventures. Update the sample-content notices when adding real content.

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

The library includes 16 new English short stories plus the two existing travel fragments. Duskwood, Westfall, Durotar and Tanaris each have two tales; Outland and Northrend each have four. Edit `stories` in `assets/js/content.js`: each item has an ID, title, zone, region, kind, excerpt and text paragraph array. Region filters are generated from the content. New IDs must be unique. Links such as `stories.html#duskwood-third-lantern` open the matching tale; navigating to a hidden tale clears the active filter. These invented characters and events are distinct from the official history in The Lore and the personal gameplay journal.
