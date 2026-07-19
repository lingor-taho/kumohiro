@echo off
setlocal
title KUMOHIRO Website
cd /d "%~dp0"

set "PORT=14100"
set "HOST=0.0.0.0"
set "DEPENDENCY_MARKER=node_modules\.kumohiro-static-v1"

echo ========================================
echo KUMOHIRO Static Website Launcher
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 goto node_missing

where npm >nul 2>nul
if errorlevel 1 goto node_missing

if not exist "%DEPENDENCY_MARKER%" goto install
if not exist "node_modules\vite\bin\vite.js" goto install
goto build

:install
echo Installing website packages. Please wait...
call npm ci --no-audit --no-fund
if errorlevel 1 goto install_failed
type nul > "%DEPENDENCY_MARKER%"

:build
echo.
echo Building the static website. Please wait...
node "node_modules\vite\bin\vite.js" build
if errorlevel 1 goto build_failed

if not exist "dist\index.html" goto build_failed

:launch
echo.
echo Static build completed successfully.
echo Website URL: http://localhost:%PORT%/
echo The browser will open automatically.
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the website.
echo.
start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:%PORT%/'"
node "server.mjs"
goto stopped

:node_missing
echo.
echo Node.js was not found. Install Node.js 22 or newer, then run this file again.
pause
exit /b 1

:install_failed
echo.
echo Installation failed. Make sure Node.js and internet access are available.
pause
exit /b 1

:build_failed
echo.
echo Static website build failed. The website was not started.
echo Please take a screenshot of the error above and send it for diagnosis.
pause
exit /b 1

:stopped
echo.
echo The website has stopped.
pause
endlocal
