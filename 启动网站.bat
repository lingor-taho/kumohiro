@echo off
setlocal
title KOWA TRADING Website
cd /d "%~dp0"

set "PORT=14100"
set "NODE_OPTIONS=--max-old-space-size=2048"
set "WRANGLER_LOG_PATH=.wrangler\wrangler.log"

echo ========================================
echo KOWA TRADING Website Launcher
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 goto node_missing

where npm >nul 2>nul
if errorlevel 1 goto node_missing

if not exist "node_modules\vinext\dist\cli.js" goto install
goto build

:install
echo Installing required packages. Please wait...
call npm ci --no-audit --no-fund
if errorlevel 1 goto install_failed

:build
echo.
echo Building the production website. Please wait...
node "node_modules\vinext\dist\cli.js" build
if errorlevel 1 goto build_failed

if not exist "dist\server\index.js" goto build_failed

:launch
echo.
echo Production build completed successfully.
echo Website URL: http://localhost:%PORT%/
echo The browser will open automatically.
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the website.
echo.
start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:%PORT%/'"
node "node_modules\vinext\dist\cli.js" start --hostname 0.0.0.0 --port %PORT%
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
echo Production build failed. The website was not started.
echo Please take a screenshot of the error above and send it for diagnosis.
pause
exit /b 1

:stopped
echo.
echo The website has stopped.
pause
endlocal
