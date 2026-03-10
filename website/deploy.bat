@echo off
echo Deploying NorthStar Synergy...
echo.

cd /d "%~dp0"

echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo Deploying to Vercel...
echo (Browser will open for login)
echo.

call vercel --prod --yes

echo.
echo ============================================
echo DEPLOYMENT COMPLETE!
echo ============================================
echo.
echo Next step: Add custom domain
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click: northstar-synergy project
echo 3. Click: Settings -^> Domains
echo 4. Enter: northstar-synergy.dev
echo 5. Click: Add (will prompt for payment)
echo.
echo Site is live at Vercel URL shown above.
echo.
pause
