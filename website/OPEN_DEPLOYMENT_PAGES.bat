@echo off
echo Opening deployment pages...

REM Open Vercel dashboard
start https://vercel.com/dashboard

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Open domains page (you'll need to select project first)
start https://vercel.com/domains

echo.
echo Opened:
echo 1. Vercel Dashboard
echo 2. Vercel Domains page
echo.
echo Steps:
echo 1. Login to Vercel (if needed)
echo 2. Import website project from: C:\Users\chead\.openclaw\workspace-john\website
echo    OR run: npx vercel
echo 3. Once project exists, go to Settings -^> Domains
echo 4. Add: northstar-synergy.dev
echo 5. Purchase for $15
echo.
pause
