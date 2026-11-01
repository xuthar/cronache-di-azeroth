#requires -Version 5.1
<#
Download the Chronicle addon into an explicitly selected WoW Forever client directory.
Example:
.\install-addon.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_"
#>
[CmdletBinding()]
param([Parameter(Mandatory = $true)][string]$ClientPath)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath $ClientPath -PathType Container)) {
  throw "Forever client directory not found: $ClientPath. Select the directory containing Interface and WTF."
}
$addonRoot = Join-Path $ClientPath "Interface\AddOns\AzerothChronicleSync"
New-Item -Path $addonRoot -ItemType Directory -Force | Out-Null
$base = "https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/main/addons/AzerothChronicleSync"
foreach ($file in @("AzerothChronicleSync.toc","AzerothChronicleSync.lua")) {
  Invoke-WebRequest -Uri "$base/$file" -OutFile (Join-Path $addonRoot $file) -UseBasicParsing
}
Write-Host "Addon installed: $addonRoot" -ForegroundColor Green
Write-Host "Start Forever, enable 'Azeroth Chronicle Sync' in AddOns, and run /acs status." -ForegroundColor Cyan
Write-Host "The exporter saves data only when you /reload or log out. It cannot upload by itself." -ForegroundColor Yellow
