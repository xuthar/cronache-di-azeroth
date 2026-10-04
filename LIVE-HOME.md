# Live homepage

The Forever countdown updates every second from an absolute UTC launch timestamp. The current verified launch is 5 November 2026 at 00:00 CET (4 November at 23:00 UTC), from Blizzard's Italian launch announcement.

The workflow `.github/workflows/live-home.yml` reads Wowhead's public RSS feed and the official Blizzard announcement every 15 minutes, and after a push to main. GitHub scheduling can be delayed; RSS publication itself may be cached. This is automatic polling, not instant push notifications.

The updater publishes `home-live.json` to the dedicated `live-news` branch. The website checks the raw public JSON once per minute while the homepage is visible, and immediately when returning to it. It does not require a paid service, third-party RSS proxy, login, or API key. The main branch's JSON is a first-load and outage fallback.

Only the latest four WoW headlines, dates, categories and direct Wowhead article links are shown. Full articles and images are not copied. Source text is treated as untrusted and external links are validated.

If a feed request fails, the updater retains the previous valid items and their successful-update timestamp. If Blizzard's announcement changes its release date using the supported Italian date format, the timestamp updates automatically. A changed page format retains the last verified date instead of guessing.

GitHub may disable scheduled workflows in public repositories after 60 days without repository activity. If the displayed update date stops advancing, re-enable the workflow under Actions. The separate feed branch should not be edited manually. Character details and stories remain manually maintained in `assets/js/content.js`.

Update once locally with: `node scripts/update-home-live.mjs assets/data/home-live.json`.
