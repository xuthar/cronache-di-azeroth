#requires -Version 5.1
<#
Install the addon from this downloaded repository ZIP, offline.
By default, target the actual Forever folder supplied by the site owner.
#>
[CmdletBinding()]
param([string]$ClientPath = 'C:\Program Files (x86)\World of Warcraft\_forever_')
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath $ClientPath -PathType Container)) {
  throw "Forever game folder not found: $ClientPath"
}
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\addons\AzerothChronicleSync'))
if (-not (Test-Path -LiteralPath $sourceRoot -PathType Container)) {
  throw "Addon source is missing. Extract the complete repository ZIP before running setup."
}
$addonRoot = Join-Path $ClientPath 'Interface\AddOns\AzerothChronicleSync'
try {
  New-Item -Path $addonRoot -ItemType Directory -Force | Out-Null
  foreach ($file in @('AzerothChronicleSync.toc','AzerothChronicleSync.lua')) {
    $from = Join-Path $sourceRoot $file
    if (-not (Test-Path -LiteralPath $from -PathType Leaf)) { throw "Missing addon file: $from" }
    Copy-Item -LiteralPath $from -Destination (Join-Path $addonRoot $file) -Force
  }
} catch {
  throw "Failed to install addon under Program Files: $($_.Exception.Message)"
}
Write-Host "Addon successfully installed in: $addonRoot" -ForegroundColor Green
Write-Host "Enable 'Azeroth Chronicle Sync' in Forever AddOns, then type /acs status." -ForegroundColor Cyan
Write-Host "Game data is saved on logout or /reload, not continuously during play." -ForegroundColor Yellow
