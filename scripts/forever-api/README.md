# Blizzard official API bridge · WoW Forever

**Status: ACTIVE from 6 November 2026.** The official Forever EU character profile was verified through Blizzard OAuth and the first read-only production export succeeded. Xuthar's public profile data is refreshed **once daily at 08:21 UTC** (09:21 Italian winter time / 10:21 summer time, subject to GitHub scheduling delays). This integration uses only officially verified API responses; the quest log remains manually documented.

## Observed Forever API conventions (provisional)

- Region: EU; character namespace: `profile-forever-eu`.
- Static data: `static-forever-eu`; dynamic ruleset data: `dynamic-forever-eu`.
- Characters are **realmless**: use `GET https://eu.api.blizzard.com/profile/wow/character/xuthar-morvayne?namespace=profile-forever-eu&locale=en_GB`. There is **no realm path component**.
- Character names have two parts; the profile returns `name`, `surname` and `ruleset`. Characters appear in public profile tests **at level 10 or higher, after logout**. A 404 below that threshold is expected and is not evidence that the API is unavailable.
- Equipment, achievements, professions, quests, reputation, talents and other character subresources have reportedly responded to the same profile namespace. The importer currently reads only the summary fields: level, race, class, ruleset and check time.
- Auction house and commodity support has not been verified as functioning. None is consumed.
- Forum findings: https://us.forums.blizzard.com/en/blizzard/t/wow-forever-api-what-works-so-far-plus-a-ts-client/60334 . Treat this as **third-party test evidence published on Blizzard's forum**, not official Blizzard API documentation.

## Active synchronization configuration

- Workflow: `.github/workflows/forever-official-api.yml`.
- Schedule: `21 8 * * *` (daily at 08:21 UTC, 24-hour interval).
- Activation: production read-only import was explicitly authorized by the player after the OAuth and profile probe passed. This workflow sets its two internal verification gates to `true` based on that approved test. The Node importer continues validating credentials, EU namespace, exact full character name and minimum level before publication.
- Inputs: Blizzard `BLIZZARD_CLIENT_ID` and `BLIZZARD_CLIENT_SECRET` in GitHub Actions Secrets; `FOREVER_PROFILE_NAMESPACE=profile-forever-eu` and `FOREVER_XUTHAR_SLUG=xuthar-morvayne` in repository Actions Variables.
- Safety scope: **Xuthar Morvayne only**. Thorgar and Aelyndra are intentionally excluded until their profiles are separately verified and approved.
- Output: `forever-progress.json` in the `live-blizzard` branch, containing level, race, class, ruleset and check timestamp; no account credentials, gear or quest history.
- Site: `assets/js/xuthar-blizzard-live.js` reads the isolated public JSON snapshot and displays the verified fields in a responsive card on the Home and Xuthar character page. It does not modify the manual quest ledger.
- Failure behavior: HTTP/authentication/profile mismatch stops publication. The website does not invent data if the feed cannot be loaded.

**First production test:** [Forever official Blizzard API sync run 42291652489](https://github.com/xuthar/cronache-di-azeroth/actions/runs/42291652489) succeeded on 6 Nov 2026. The isolated branch contains **Xuthar Morvayne, Roleplay, Human Priest, Level 10** from Blizzard API.

To pause scheduled synchronization, remove or comment the daily `schedule` trigger in the workflow, or disable that workflow in the GitHub Actions interface. A `workflow_dispatch` manual run remains available.

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

Published after verification: first and last character name, ruleset, level, race, class and timestamp. **Never collected:** BattleTag, account details, chat or authentication secrets. The importer does not currently synchronize completed-quest history, movement or explored areas, although some further official profile endpoints are reported to exist.

The legacy addon is not necessary for official public profile reads.
