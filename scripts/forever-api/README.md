# Blizzard official API bridge · WoW Forever

**Status checked 5 November 2026:** Community tests on the Blizzard API Discussion forum report functioning Forever-specific endpoints, including EU character profiles. Blizzard has **not yet published Forever-specific API documentation**. This integration remains **disabled** until credentials, character identifiers and verification gates are explicitly configured.

## Observed Forever API conventions (provisional)

- Region: EU; character namespace: `profile-forever-eu`.
- Static data: `static-forever-eu`; dynamic ruleset data: `dynamic-forever-eu`.
- Characters are **realmless**: use `GET https://eu.api.blizzard.com/profile/wow/character/xuthar-morvayne?namespace=profile-forever-eu&locale=en_GB`. There is **no realm path component**.
- Character names have two parts; the profile returns `name`, `surname` and `ruleset`. Characters appear in public profile tests **at level 10 or higher, after logout**. A 404 below that threshold is expected and is not evidence that the API is unavailable.
- Equipment, achievements, professions, quests, reputation, talents and other character subresources have reportedly responded to the same profile namespace. The importer currently reads only the summary fields: level, race, class, ruleset and check time.
- Auction house and commodity support has not been verified as functioning. None is consumed.
- Forum findings: https://us.forums.blizzard.com/en/blizzard/t/wow-forever-api-what-works-so-far-plus-a-ts-client/60334 . Treat this as **third-party test evidence published on Blizzard's forum**, not official Blizzard API documentation.

## Safe activation prerequisites

1. Confirm the Forever character profile behavior from Blizzard's API using your own authorized developer credentials, then configure the two manual gates below.
2. Create an API client in the **official** developer portal: https://develop.battle.net/ .
3. Store `BLIZZARD_CLIENT_ID` and `BLIZZARD_CLIENT_SECRET` in **GitHub Actions Secrets** (never in source code, website files or chat).
4. Set the following GitHub Actions **Variables** on `xuthar/cronache-di-azeroth`:
   - `FOREVER_API_ENABLED=true`
   - `FOREVER_NAMESPACE_VERIFIED=true`
   - `FOREVER_PROFILE_NAMESPACE=profile-forever-eu`
   - `FOREVER_XUTHAR_SLUG=xuthar-morvayne` (only once the public character profile is confirmed)
   - `FOREVER_THORGAR_SLUG=thorgar-ironbeard` and `FOREVER_AELYNDRA_SLUG=aelyndra-zephyrveil` only once their public profiles are available.
5. Run the `Forever official Blizzard API sync` GitHub Action and verify the result.

The job remains disabled by default and runs every 6 hours when configured. It authenticates via Blizzard client credentials and uses **read-only profile requests**. Each response must match both the exact expected first name and surname, with a valid level (at least 10); if any configured profile is unavailable or fails validation, **nothing is published**. When successful, it writes to the isolated `live-blizzard` branch. It never falls back to Retail, Classic or unofficial third-party sources.

## Current Xuthar limitation

At his player-confirmed **level 6 on 5 November 2026**, Xuthar is expected to remain absent from the public profile API, even if the namespace already works for higher-level characters. Manual progress records and screenshot evidence remain separate until the API can read his own profile. No unconfirmed quest completions or new levels are invented.

## Privacy and limitations

Published after verification: first and last character name, ruleset, level, race, class and timestamp. **Never collected:** BattleTag, account details, chat or authentication secrets. The importer does not currently synchronize completed-quest history, movement or explored areas, although some further official profile endpoints are reported to exist.

The legacy addon is not necessary for official public profile reads.
