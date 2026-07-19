@echo off
setlocal
title KOWA TRADING Website
cd /d "%~dp0"

echo ========================================
echo KOWA TRADING Website Launcher
echo ========================================
echo.

if not exist "node_modules\vinext\dist\cli.js" goto install
goto launch

:install
echo Installing required packages. Please wait...
call npm install --ignore-scripts --no-audit --no-fund
if errorlevel 1 goto install_failed

:launch
echo Website URL: http://localhost:14100/
echo The browser will open automatically.
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the website.
echo.
set "WRANGLER_LOG_PATH=.wrangler\wrangler.log"
start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:14100/'"
node "node_modules\vinext\dist\cli.js" dev --host 127.0.0.1 --port 14100
goto stopped

:install_failed
echo.
echo Installation failed. Make sure Node.js and internet access are available.
pause
exit /b 1

:stopped
echo.
echo The website has stopped.
pause
endlocal
