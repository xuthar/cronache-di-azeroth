#requires -Version 5.1
<#
First-run Windows setup. Does not touch Retail or store GitHub credentials.
Invoked by INSTALLA-CHRONICLE.bat from the extracted repository.
#>
[CmdletBinding()]
param([string]$ClientPath = 'C:\Program Files (x86)\World of Warcraft\_forever_')
$ErrorActionPreference = 'Stop'
Write-Host ''
Write-Host '=== AZEROTH CHRONICLE SYNC - FIRST INSTALL ===' -ForegroundColor Cyan
Write-Host "Forever game directory: $ClientPath" -ForegroundColor Yellow
Write-Host 'Retail is not touched. Only selected in-game progress will be made PUBLIC after sync.' -ForegroundColor Yellow
if (-not (Test-Path -LiteralPath $ClientPath -PathType Container)) {
  throw "Cannot find $ClientPath. Confirm that World of Warcraft Forever is installed there."
}
$addonInstall = Join-Path $PSScriptRoot 'install-addon.ps1'
try {
  & $addonInstall -ClientPath $ClientPath
} catch {
  Write-Warning $_.Exception.Message
  Write-Host 'Windows may require administrator permission to write inside Program Files.'
  $reply = Read-Host 'Retry addon installation with a Windows UAC prompt? [y/N]'
  if ($reply -notmatch '^[Yy]$') { throw 'Addon not installed. Installation stopped.' }
  $args = '-NoProfile -ExecutionPolicy Bypass -File "' + $addonInstall + '" -ClientPath "' + $ClientPath + '"'
  $elevated = Start-Process -FilePath 'powershell.exe' -ArgumentList $args -Verb RunAs -Wait -PassThru
  if ($elevated.ExitCode -ne 0) { throw 'Elevated addon installation did not complete successfully.' }
}
$destination = Join-Path $env:LOCALAPPDATA 'AzerothChronicleSync'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
foreach ($name in @('sync.ps1','start-on-login.ps1')) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination (Join-Path $destination $name) -Force
}
Write-Host "Synchronizer scripts copied into your Windows profile: $destination" -ForegroundColor Green
$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
  Write-Warning 'GitHub CLI is not installed or is not visible in the current PATH.'
  Write-Host 'Install it from https://cli.github.com/ (or run: winget install --id GitHub.cli --exact).'
  Write-Host 'After installation, run this installer again to finish GitHub sign-in.'
  return
}
& gh auth status *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Next: log into your own GitHub account in the browser, using GitHub CLI.'
  $answer = Read-Host 'Open GitHub authentication now? [y/N]'
  if ($answer -match '^[Yy]$') {
    & gh auth login
    if ($LASTEXITCODE -ne 0) { throw 'GitHub authentication was not completed.' }
  } else {
    Write-Host 'Addon is ready. Complete GitHub sign-in later with: gh auth login'
    return
  }
}
$account = (& gh api user --jq '.login' | Select-Object -First 1)
if ($LASTEXITCODE -ne 0 -or $account -ne 'xuthar') {
  Write-Warning "GitHub CLI is signed in as '$account'. This project requires the xuthar account."
  Write-Host 'Use: gh auth login --hostname github.com'
  return
}
Write-Host 'GitHub account verified: xuthar' -ForegroundColor Green
Write-Host ''
Write-Host 'The addon is installed, and the publisher is ready.'
Write-Host 'To test: launch Forever, use /acs status, then /reload or log out.'
Write-Host 'After the first game save, double-click AVVIA-SYNC.bat from this folder.'
Write-Host ''
$enable = Read-Host 'Also start the sync monitor automatically at future Windows logins? [y/N]'
if ($enable -match '^[Yy]$') {
  & (Join-Path $destination 'start-on-login.ps1') -ClientPath $ClientPath
  Write-Host 'Automatic startup is enabled. It will watch saved game data when you sign into Windows.' -ForegroundColor Green
} else {
  Write-Host 'Automatic startup is off. You can enable it later with start-on-login.ps1.'
}
