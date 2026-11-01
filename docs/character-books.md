# The Books of Azeroth — editorial workflow

The interactive living library is published at `book.html` and uses one version-controlled JSON file: `assets/data/character-books.json`.

## Present volumes

- **Vol. I — Xuthar Morvayne: The Last Witness** (main; fictional backstory and prologue already readable)
- **Vol. II — Thorgar Ironbeard: The Keeper of Unmarked Trails** (reserved for actual play)
- **Vol. III — Aelyndra Zephyrveil: The Listener Between Winds** (reserved for actual play)

The page does not read a WoW account, quest logs or user device data. Progress data is a separate concern handled by `chronicle.html`. The book is storytelling, not an Armory clone. All volumes start with a `pending` page. A finished chapter is not auto-inserted merely because a level, zone or achievement changes.

## Adding the next chapter after a real session

1. Ask the user to upload the actual session notes, a SavedVariables file or a reliable gameplay summary. Avoid collecting account credentials. When only the user's summary is available, describe events as *player-reported*, not independently verified.
2. Distinguish facts from roleplay embellishment. Do not invent quest completions, achievements, levels, encounters, places, pets, faction choice or relationships. Preserve the chronology and unresolved family mysteries from the matching dossier.
3. Open `assets/data/character-books.json` and choose `volumes[].id`. Insert the next narrative leaf **before** the existing final `kind: "pending"` page.
4. Each added leaf has a unique `id`, a `chapter` (can repeat across multiple leaves), a `title`, `kind: "reported"` (user's game report) or `kind: "verified"` (genuinely verified), and an array of prose `paragraphs`. Always cite source/observed context in the editorial process; optional `sessionDate`, `sources`, `place` can be added for provenance. A fictional internal monologue must not imply an external in-game event happened.
5. `image` is optional, and only local curated archive gallery files may be used. Its `caption` should say **illustrative archive scene** unless genuinely taken during that exact session.
6. Keep the `pending` leaf at the end to signal the next unplayed chapter. Do not add phantom empty quests.
7. Commit the updated JSON to `main`. GitHub Pages automatically publishes a new version; if needed update its `?v=` cache key in `assets/js/character-book.js` to ensure browser cache freshness.

`assets/js/character-book.js` automatically derives the table of contents, pagination, character selection, reading position (on the visitor's local device), keyboard/swipe navigation and the print/PDF representation from the JSON. The book works on desktop and mobile, and does not send reading-position data to any server.

## Invariants

- Main narrative priority: **Xuthar**. Thorgar and Aelyndra grow only when their real sessions begin.
- The Skyborne character's in-game faction remains undecided until the user chooses in Forever.
- Every volume is *original fan fiction* based on the site characters, not Blizzard canon or a record of verified gameplay before first login.
- The `status` field describes publication stage, not actual leveling: `prologue` or `reserved`.
- Visitors may use **Print / Save PDF** in the book. Browser print includes all leaf pages of the currently selected volume, not only the visible spread.
