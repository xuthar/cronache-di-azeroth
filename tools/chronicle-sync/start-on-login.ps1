#requires -Version 5.1
<#
Optional per-user auto-start for Azeroth Chronicle Sync.
No administrator privileges or system-wide changes.
Install: .\start-on-login.ps1 -ClientPath "C:\...\World of Warcraft\_forever_"
Remove:  .\start-on-login.ps1 -Remove
#>
[CmdletBinding()]
param([string]$ClientPath = "", [switch]$Remove)
$ErrorActionPreference = 'Stop'
$startup = [Environment]::GetFolderPath([Environment+SpecialFolder]::Startup)
$shortcutPath = Join-Path $startup 'Azeroth Chronicle Sync.lnk'
if ($Remove) {
  if (Test-Path -LiteralPath $shortcutPath) {
    Remove-Item -LiteralPath $shortcutPath -Force
    Write-Host "Removed Chronicle Sync from Windows startup." -ForegroundColor Green
  } else { Write-Host "Chronicle Sync was not registered at startup." }
  return
}
if (-not $ClientPath) { throw "Supply -ClientPath pointing to your WoW Forever game directory." }
if (-not (Test-Path -LiteralPath $ClientPath -PathType Container)) { throw "Game folder not found: $ClientPath" }
$script = Join-Path $PSScriptRoot 'sync.ps1'
if (-not (Test-Path -LiteralPath $script -PathType Leaf)) { throw "sync.ps1 must be in the same directory as this helper." }
$exe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$shortcut = (New-Object -ComObject WScript.Shell).CreateShortcut($shortcutPath)
$shortcut.TargetPath = $exe
$shortcut.Arguments = '-NoProfile -WindowStyle Minimized -File "' + $script + '" -ClientPath "' + $ClientPath + '" -Watch'
$shortcut.WorkingDirectory = $PSScriptRoot
$shortcut.Description = 'Sync WoW Forever SavedVariables to personal public Chronicle page'
$shortcut.WindowStyle = 7
$shortcut.Save()
Write-Host "Chronicle Sync will start minimized at your next Windows login." -ForegroundColor Green
Write-Host "You must first run 'gh auth login' once on this Windows account." -ForegroundColor Cyan
Write-Host "To remove it: .\start-on-login.ps1 -Remove" -ForegroundColor Yellow
