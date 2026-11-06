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

On **6 November 2026**, the player confirmed **Xuthar Morvayne is level 10** and supplied the direct official EU Forever Armory URL:

https://worldofwarcraft.blizzard.com/en-us/forever/eu/armory/character/xuthar-morvayne

This URL is stored in the site as an official character reference, **not** as proof of a successful API read. The page could not be independently fetched during the update. A 404 from the Forever EU profile API may reflect propagation delay or issues in Blizzard's evolving endpoint, not necessarily that the character does not exist.

**Importer status:** a GitHub Actions run at 19:29 UTC on 6 Nov returned: `Forever API not verified/enabled; no Blizzard requests, no publication.` The required workflow variables `FOREVER_API_ENABLED` and `FOREVER_NAMESPACE_VERIFIED` were empty at the time. The importer is intentionally still disabled. No gear, quest, profession or achievement data has been synchronized. The existing quest ledger remains a manual, screenshot-based source of truth.

**Next check:** after Xuthar logs out, view the Armory URL and try a read-only profile request using a Blizzard developer client stored in GitHub Secrets. The provisional URL is `GET https://eu.api.blizzard.com/profile/wow/character/xuthar-morvayne?namespace=profile-forever-eu&locale=en_GB`. Only enable the two workflow gates after the request is authenticated, the namespace is verified and the returned profile matches Xuthar Morvayne. Never paste client secrets into chat or commit them to source files.

## Privacy and limitations

Published after verification: first and last character name, ruleset, level, race, class and timestamp. **Never collected:** BattleTag, account details, chat or authentication secrets. The importer does not currently synchronize completed-quest history, movement or explored areas, although some further official profile endpoints are reported to exist.

The legacy addon is not necessary for official public profile reads.
