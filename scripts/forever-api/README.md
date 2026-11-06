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

**Production sync status:** still disabled. The separate, pre-existing `Forever official Blizzard API sync` workflow requires `FOREVER_API_ENABLED=true` and `FOREVER_NAMESPACE_VERIFIED=true` to fetch and publish. Do not enable it until deliberate approval to start recurring synchronization. The `live-blizzard` branch already exists for the isolated output. The last screenshot-based quest record (ten ongoing quests at 18:41) remains unchanged by the level-ten API verification.

## Privacy and limitations

Published after verification: first and last character name, ruleset, level, race, class and timestamp. **Never collected:** BattleTag, account details, chat or authentication secrets. The importer does not currently synchronize completed-quest history, movement or explored areas, although some further official profile endpoints are reported to exist.

The legacy addon is not necessary for official public profile reads.
