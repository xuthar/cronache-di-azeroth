#requires -Version 5.1
<#
Azeroth Chronicle Sync — Windows, no Python or token file required.
Install GitHub CLI from https://cli.github.com/ and run "gh auth login" locally.
Then: .\sync.ps1 -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_" -Watch
Writes public character progress only to branch live-progress, never to main.
#>
[CmdletBinding()]
param(
  [string]$ClientPath = 'C:\Program Files (x86)\World of Warcraft\_forever_',
  [string]$SavedVariablesPath = "",
  [switch]$Watch,
  [ValidateRange(15,3600)][int]$IntervalSeconds = 45,
  [string]$Repository = "xuthar/cronache-di-azeroth"
)
$ErrorActionPreference = "Stop"
$branch = "live-progress"
$file = "forever-progress.json"
$sourceName = "AzerothChronicleSync"
$allowed = @("xuthar", "thorgar", "aelyndra")
if ($Repository -ne "xuthar/cronache-di-azeroth") {
  throw "Repository changed: this script is intentionally restricted to the Chronicle site."
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) is required. Install from https://cli.github.com/ then run: gh auth login"
}
& gh auth status *> $null
if ($LASTEXITCODE -ne 0) {
  throw "Not logged into GitHub CLI. Run: gh auth login"
}
function Get-ExportFile {
  if ($SavedVariablesPath) {
    if (-not (Test-Path -LiteralPath $SavedVariablesPath -PathType Leaf)) { throw "SavedVariables not found: $SavedVariablesPath" }
    return (Get-Item -LiteralPath $SavedVariablesPath)
  }
  $accounts = Join-Path $ClientPath "WTF\Account"
  if (-not (Test-Path -LiteralPath $accounts -PathType Container)) {
    throw "Game WTF folder not found: $accounts. Supply -ClientPath for the correct Forever game folder."
  }
  $filesFound = @(Get-ChildItem -Path $accounts -Filter "AzerothChronicleSync.lua" -File -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -match '[\\/]SavedVariables[\\/]AzerothChronicleSync\.lua$' } |
    Sort-Object LastWriteTimeUtc -Descending)
  if ($filesFound.Count -eq 0) { return $null }
  return $filesFound[0]
}
function Read-Snapshot([string]$path) {
  $lua = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  $match = [regex]::Match($lua, '(?m)^\s*ACS_ExportHex\s*=\s*"([A-Fa-f0-9]*)"')
  if (-not $match.Success -or -not $match.Groups[1].Value) {
    Write-Host "No export yet. In Forever, log out or use /reload. Check /acs status." -ForegroundColor Yellow
    return $null
  }
  $hex = $match.Groups[1].Value
  if ($hex.Length -gt 2000000 -or ($hex.Length % 2 -ne 0)) { throw "Invalid or oversized SavedVariables export." }
  $bytes = New-Object byte[] ($hex.Length / 2)
  for ($i=0; $i -lt $bytes.Length; $i++) {
    $bytes[$i] = [Convert]::ToByte($hex.Substring($i * 2, 2), 16)
  }
  $json = [Text.Encoding]::UTF8.GetString($bytes)
  $data = $json | ConvertFrom-Json
  if ($data.schemaVersion -ne 1 -or $data.source -ne $sourceName) { throw "Unrecognized Chronicle payload." }
  if (-not ($data.characters -is [Array]) -or -not ($data.events -is [Array])) { throw "Malformed character or event list." }
  if ($data.characters.Count -gt 3 -or $data.events.Count -gt 150) { throw "Unexpected character/event count." }
  foreach ($c in $data.characters) {
    if ($allowed -notcontains [string]$c.id) { throw "Character not on the allowed list: $($c.id)" }
    if ([int]$c.level -lt 1 -or [int]$c.level -gt 100) { throw "Invalid character level." }
  }
  foreach ($e in $data.events) {
    if ($allowed -notcontains [string]$e.characterId) { throw "Unknown event owner." }
    if (@("level","quest","exploration","note") -notcontains [string]$e.type) { throw "Unknown event type." }
  }
  # All exported fields are gameplay data about the three selected characters;
  # names, realm, quests, notes and locations will be visible to the public.
  return ($data | ConvertTo-Json -Depth 30)
}
function Publish-Snapshot([string]$json) {
  $api = "repos/$Repository/contents/$file"
  $existingJson = & gh api "$($api)?ref=$branch" 2>$null
  if ($LASTEXITCODE -ne 0) { throw "Could not read live-progress branch. Verify gh auth and branch existence." }
  $existing = ($existingJson | Out-String | ConvertFrom-Json)
  $existingText = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(($existing.content -replace '\s', '')))
  $previous = $existingText | ConvertFrom-Json
  if ($null -ne $previous.exportedAt -and ([long]$previous.exportedAt -ge [long](($json | ConvertFrom-Json).exportedAt))) {
    Write-Host "No newer in-game save to upload." -ForegroundColor DarkGray
    return
  }
  $body = @{
    message = "Update personal Forever character progress"
    branch = $branch
    sha = [string]$existing.sha
    content = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($json + [Environment]::NewLine))
  } | ConvertTo-Json -Depth 6
  $temporary = [IO.Path]::GetTempFileName()
  try {
    [IO.File]::WriteAllText($temporary, $body, (New-Object System.Text.UTF8Encoding($false)))
    $result = & gh api $api -X PUT -H "Accept: application/vnd.github+json" --input $temporary 2>&1
    if ($LASTEXITCODE -ne 0) { throw "GitHub upload failed: $($result | Out-String)" }
    Write-Host "Chronicle published successfully to live-progress at $(Get-Date -Format 'HH:mm:ss')." -ForegroundColor Green
  } finally {
    Remove-Item -LiteralPath $temporary -ErrorAction SilentlyContinue
  }
}
Write-Host "Azeroth Chronicle Sync | $Repository | branch $branch" -ForegroundColor Cyan
Write-Host "The exporter publishes personal character data to a PUBLIC website." -ForegroundColor Yellow
$lastDigest = ""
do {
  try {
    $saved = Get-ExportFile
    if ($null -eq $saved) {
      Write-Host "No SavedVariables file yet. Log into Forever with the addon enabled, then /reload or logout." -ForegroundColor Yellow
    } else {
      $json = Read-Snapshot $saved.FullName
      if ($null -ne $json) {
        $digest = [Convert]::ToBase64String([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($json)))
        if ($digest -ne $lastDigest) {
          Publish-Snapshot $json
          $lastDigest = $digest
        }
      }
    }
  } catch {
    Write-Warning $_.Exception.Message
  }
  if ($Watch) { Start-Sleep -Seconds $IntervalSeconds }
} while ($Watch)
