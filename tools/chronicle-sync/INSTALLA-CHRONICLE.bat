@echo off
title Azeroth Chronicle Sync - Installazione
cd /d "%~dp0"
echo.
echo Installing Azeroth Chronicle Sync for WoW Forever...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-local.ps1" -ClientPath "C:\Program Files (x86)\World of Warcraft\_forever_"
if errorlevel 1 (
  echo.
  echo Installation could not finish. Read the error shown above.
)
echo.
pause
