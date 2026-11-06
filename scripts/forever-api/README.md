# Blizzard official API bridge · WoW Forever

**Status: ACTIVE from 6 November 2026.** The official Forever EU character profile was verified through Blizzard OAuth and the first read-only production export succeeded. Xuthar's public profile data is refreshed **once daily at 08:21 UTC** (09:21 Italian winter time / 10:21 summer time, subject to GitHub scheduling delays). This integration uses only officially verified API responses; the quest log remains manually documented.

## Observed Forever API conventions (provisional)

- Region: EU; character namespace: `profile-forever-eu`.
- Static data: `static-forever-eu`; dynamic ruleset data: `dynamic-forever-eu`.
- Characters are **realmless**: use `GET https://eu.api.blizzard.com/profile/wow/character/xuthar-morvayne?namespace=profile-forever-eu&locale=en_GB`. There is **no realm path component**.
- Character names have two parts; the profile returns `name`, `surname` and `ruleset`. Characters appear in public profile tests **at level 10 or higher, after logout**. A 404 below that threshold is expected and is not evidence that the API is unavailable.
- Equipment, achievements, professions, quests, reputation, talents and other character subresources have reportedly responded to the same profile namespace. The importer now also reads validated quest, profession, equipment, reputation and achievement summaries. Quest names and IDs from Blizzard remain isolated from the manually documented Chronicle.
- Auction house and commodity support has not been verified as functioning. None is consumed.
- Forum findings: https://us.forums.blizzard.com/en/blizzard/t/wow-forever-api-what-works-so-far-plus-a-ts-client/60334 . Treat this as **third-party test evidence published on Blizzard's forum**, not official Blizzard API documentation.

## Active synchronization configuration

- Workflow: `.github/workflows/forever-official-api.yml`.
- Schedule: `21 8 * * *` (daily at 08:21 UTC, 24-hour interval).
- Activation: production read-only import was explicitly authorized by the player after the OAuth and profile probe passed. This workflow sets its two internal verification gates to `true` based on that approved test. The Node importer continues validating credentials, EU namespace, exact full character name and minimum level before publication.
- Inputs: Blizzard `BLIZZARD_CLIENT_ID` and `BLIZZARD_CLIENT_SECRET` in GitHub Actions Secrets; `FOREVER_PROFILE_NAMESPACE=profile-forever-eu` and `FOREVER_XUTHAR_SLUG=xuthar-morvayne` in repository Actions Variables.
- Safety scope: **Xuthar Morvayne only**. Thorgar and Aelyndra are intentionally excluded until their profiles are separately verified and approved.
- Output: `forever-progress.json` in the `live-blizzard` branch, containing level, race, class, ruleset, check timestamp, active quest IDs/names, completed quest IDs, and summary counts for professions, equipment, reputations and achievements. It does not contain tokens, credentials, full inventories or chat.
- Site: `assets/js/xuthar-blizzard-live.js` reads the isolated public JSON snapshot and displays profile details, available quest counts and names, and progress summaries on the Home and Xuthar character page. It never modifies the manual quest ledger.
- Failure behavior: HTTP/authentication/profile mismatch stops publication. The website does not invent data if the feed cannot be loaded.

**First production test:** [Forever official Blizzard API sync run 42291652489](https://github.com/xuthar/cronache-di-azeroth/actions/runs/42291652489) succeeded on 6 Nov 2026. The [extended endpoint test](https://github.com/xuthar/cronache-di-azeroth/actions/runs/42292917767) returned HTTP 200 for quests, completed quests, professions, equipment, reputations, achievements, specializations and statistics. The [extended production import](https://github.com/xuthar/cronache-di-azeroth/actions/runs/42293197523) succeeded: **Xuthar Morvayne, Roleplay, Human Priest, Level 10**, eight active quest IDs/names, 87 completed quest IDs, two primary and three secondary professions, seven equipped items, four reputations, and seven achievement entries. These values are a snapshot, not inferred hand-ins.

To pause scheduled synchronization, remove or comment the daily `schedule` trigger in the workflow, or disable that workflow in the GitHub Actions interface. A `workflow_dispatch` manual run remains available.


## Completed and in-progress quest interpretation

The `/quests` and `/quests/completed` Forever EU profile endpoints returned HTTP 200 on 6 November 2026. The first extended snapshot shows **8 in-progress quests** and **87 completed quest IDs**. The completed endpoint may include invisible/internal quests; the interface intentionally reports them as *completed quest IDs* rather than 87 narrative milestones.

A missing entry from the current quest log does not prove it was turned in: it may have been abandoned, superseded or delayed in the API. No automatic reconciliation is performed against the historical **18:41 screenshot showing ten active quests**. The narrative book and manually confirmed quest turn-ins remain the authoritative records for story chapters.

Individual completion timestamps and precise objective progress are not supplied by these summary reads. Future expansions should verify any richer quest fields separately before displaying them.

## Verified Xuthar API connection · 6 November 2026

The first **read-only authenticated test passed** using Blizzard client credentials stored privately in GitHub Actions Secrets. The test ran on 6 November 2026 at approximately 20:40 UTC.

- Test workflow: [Probe Blizzard Forever EU profile (read only)](https://github.com/xuthar/cronache-di-azeroth/actions/runs/42290259280).
- Credentials: both secrets present; neither value or OAuth access token was printed.
- Official EU Blizzard OAuth endpoint: **HTTP 200**.
- Character profile `/profile/wow/character/xuthar-morvayne?namespace=profile-forever-eu&locale=en_GB`: **HTTP 200**.
- Character name and surname matched **Xuthar Morvayne**.
- Character level returned by Blizzard: **10**.
- Probe result: `VERIFIED_READ_ONLY_PROFILE`.
- No profile export or automatic sync was performed; only the verification status was recorded in the manually maintained site files.

Player-supplied official Armory URL:
https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne

The permanent diagnostic consists of `scripts/forever-api/probe.mjs` and the manually runnable GitHub Action `.github/workflows/forever-api-connection-test.yml`. The probe has only `contents: read` permission and **never publishes, writes sync data, prints credentials or logs tokens**.

**Production sync status:** enabled with explicit player approval at one run per day. The first full production import completed successfully and published one verified Xuthar snapshot to `live-blizzard`. The last screenshot-based quest record (ten ongoing quests at 18:41) remains separate and unchanged. No mission completion is inferred from a level-up.

## Privacy and limitations

Published after verification: first and last character name, ruleset, level, race, class, timestamp, active quest names/IDs, completed quest ID set and public summary counts. **Never collected:** BattleTag, account details, chat or authentication secrets. The importer does not reconstruct individual quest completion dates, movement or explored areas. A Blizzard quest ID listed as completed is not automatically rewritten into the manual screenshot-based story.

The legacy addon is not necessary for official public profile reads.
