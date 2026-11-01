# Blizzard official API bridge · WoW Forever

**Status on 1 November 2026: official Forever character-profile support UNCONFIRMED.**
The Retail and Classic APIs must never be misrepresented as Forever progress.

This is a prepared, **disabled** integration. Every 6 hours GitHub Actions checks the configuration. While disabled, it makes no Blizzard requests and publishes no gameplay data. When verified, it fetches the official EU character profile via Blizzard OAuth, validates the character names and levels, and writes only verified fields to the isolated \`live-blizzard\` branch. No local game addon is needed.

## Activation prerequisites

1. Verify Blizzard has documented or enabled a *Forever-specific* character profile endpoint and namespace, including support for two-part names and the right authentication flow. The namespace and character slugs are **not known yet**.
2. Create an API client in the official developer portal: https://develop.battle.net/
3. Set GitHub repository **Actions Secrets** \`BLIZZARD_CLIENT_ID\` and \`BLIZZARD_CLIENT_SECRET\`. Never paste these in chat, scripts or committed files.
4. Set **Actions Variables**, using ONLY confirmed Forever identifiers:
   - \`FOREVER_API_ENABLED=true\`
   - \`FOREVER_NAMESPACE_VERIFIED=true\` (manual confirmation gate)
   - \`FOREVER_PROFILE_NAMESPACE\` (confirmed profile namespace for Forever, EU)
   - \`FOREVER_REALM_SLUG\` (real realm identifier required by Blizzard API)
   - \`FOREVER_XUTHAR_SLUG\`, \`FOREVER_THORGAR_SLUG\`, \`FOREVER_AELYNDRA_SLUG\` (actual API character slugs; set only those known)
5. Run workflow "Forever official Blizzard API sync" manually and verify the result. If no verified profile is returned, it publishes nothing.

This importer currently uses Blizzard's OAuth client-credentials flow. If Forever requires a different official account authorization, it must be changed to the supported consent flow: do not circumvent permissions.

## Privacy and limits

Published: profile character names, realm, level, race, class and the API check date. **Not collected:** BattleTag, account info, chat, inventory, authentication secrets. Experience, zones explored, completed quest counts and achievements are left unavailable because the basic profile endpoint may not provide them.

The new site feed remains empty until support is proven; it displays an explicit "waiting for Blizzard" message. The old addon is not required.
