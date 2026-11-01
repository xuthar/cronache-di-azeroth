@echo off
title Azeroth Chronicle Sync - Monitor
set "SCRIPT=%LOCALAPPDATA%\AzerothChronicleSync\sync.ps1"
if not exist "%SCRIPT%" (
  echo Sync is not installed on this Windows account.
  echo First open INSTALLA-CHRONICLE.bat from this same folder.
  pause
  exit /b 1
)
echo.
echo Checking Forever SavedVariables and syncing to your personal GitHub site.
echo Keep this window open. Press Ctrl+C to stop the monitor.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%" -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_" -Watch
echo.
pause
