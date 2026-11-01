# Azeroth Chronicle Sync — setup for Windows

**Status:** beta implementation ready for first real Forever login. The game API and TOC Interface value (`16001`) are provisional until tested in the release client. No real progress has been collected or uploaded yet.

**Preconfigured owner game directory:** `C:\Program Files (x86)\World of Warcraft\_forever_`. The installer uses this value by default. If your client moves, supply `-ClientPath` manually.

## Quick Windows installation (recommended)

1. Download the [complete project ZIP](https://github.com/xuthar/cronache-di-azeroth/archive/refs/heads/main.zip) and **extract all files** into a normal Windows directory.
2. Open `tools\chronicle-sync` inside the extracted directory and double-click **`INSTALLA-CHRONICLE.bat`**. The game path is already filled in.
3. If Program Files denies access, the installer can request UAC elevation *only for copying the addon*; do not run GitHub login as administrator.
4. GitHub CLI is required to publish. Install it from https://cli.github.com/ if missing, rerun the installer, and authenticate with your `xuthar` GitHub account on your own PC.
5. In the Forever game, use `/acs status` then `/reload` or log out. Double-click **`AVVIA-SYNC.bat`** in the same folder to start the watcher.
6. If you explicitly opt into automatic Windows startup in the installer, a shortcut is created for your own Windows account. You can choose **No** and enable it later.

The installed monitor lives in `%LOCALAPPDATA%\AzerothChronicleSync`, so it is not dependent on leaving the downloaded repository ZIP extracted in the same place. The two `.bat` launchers do not require administrator privileges for GitHub operations. `-ExecutionPolicy Bypass` is applied to the individual PowerShell process, not the system policy. Inspect the scripts before running them if desired.

## 1 · Install the addon manually (alternative)

Download the repository ZIP from GitHub or clone the repository. Open PowerShell and run:

```powershell
cd "C:\path\to\cronache-di-azeroth\tools\chronicle-sync"
.\install-addon.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_"
```

**Important:** This path was supplied by the owner but has not been inspected remotely. Replace it if your installation moved. You can also manually copy `addons/AzerothChronicleSync` into `<game>/Interface/AddOns/`.

Use in-game `/acs status`, `/acs note Explored a quiet trail tonight`, `/acs off`, `/acs on`. Only characters whose **game names** are Xuthar, Thorgar or Aelyndra are automatically tracked; the site's full roleplay names are display labels.

## 2 · Configure GitHub CLI

Install [GitHub CLI](https://cli.github.com/) and authenticate on **your own computer**:

```powershell
gh auth login
gh auth status
```

Select the GitHub account that can write to `xuthar/cronache-di-azeroth`. Do not send access tokens in ChatGPT, put tokens in the addon, or commit credentials to GitHub.

## 3 · Synchronize the progress

```powershell
.\sync.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_"
.\sync.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_" -Watch
```

The first command checks once. `-Watch` polls every 45 seconds **while PowerShell remains open**. It reads `WTF/Account/<account>/SavedVariables/AzerothChronicleSync.lua` and publishes newer exports to the `live-progress` branch only. For a specific account use `-SavedVariablesPath "C:\...\AzerothChronicleSync.lua"`.

**WoW writes SavedVariables to disk on logout or `/reload`**, not on every event. The site polls the published feed every five minutes. No combat capture, keylogger, game memory access, packet interception, or automatic journal fiction is involved.

## 4 · Start automatically with Windows (optional)

After you have tested `sync.ps1` once and authenticated with `gh auth login`, you can set up the monitor to start in a minimized PowerShell window on your **own Windows account** (no administrator permissions required):

```powershell
.\start-on-login.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_"
```

It will start after your next Windows login and watch for new saved exports. Remove the startup shortcut at any time:

```powershell
.\start-on-login.ps1 -Remove
```

The game is not controlled by this script; it only reads the file written by WoW. You can stop the watcher by closing its PowerShell process/window.

## Privacy and limitations

- **Public:** in-game character names, realm, race/class, level/XP, tracked zones, quest completions, profession levels, and personal notes entered with `/acs note`.
- **Never collected:** account name, passwords, chat logs, combat details, party/guild rosters, or other players' information.
- `/acs off` prevents future exports but **does not delete previously published public data**. Delete/overwrite the branch's `forever-progress.json` if you want to remove it.
- The addon tracks up to 48 events and 36 visited zones per character. Counts start when tracking first becomes active; they are **not lifetime statistics**.
- `QUEST_TURNED_IN` and profession API behavior may change with the release client, so run a test session before trusting those fields.
- If Windows policy blocks local scripts, unblock the local downloaded script or run PowerShell explicitly as allowed by your machine policies; do not change the system-wide execution policy.

## Troubleshooting

1. In Forever, open AddOns and verify the addon loads without error. If it appears as out of date, check the release build's interface number and adjust the .toc.
2. `/acs status` must print the addon status. Run `/reload` or log out.
3. Check the account-level SavedVariables file exists and has `ACS_ExportHex = "..."`.
4. Run `gh auth status`; then run `sync.ps1` without `-Watch` to read its console output.
5. Check `https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-progress/forever-progress.json`.
6. Open [The Living Chronicle](../../chronicle.html) to view the published progress.

Architecture: game addon → SavedVariables (local, at logout/reload) → PowerShell + GitHub CLI on the PC → `live-progress` JSON branch → static GitHub Pages UI. Does not require a paid server or hosted secrets.
