#!/usr/bin/env node
/**
 * FIVERR BOT DIAGNOSTICS
 * Rapid diagnosis of failures + auto-fixes
 * Run: node fiverr-bot-diagnostics.js --test [login|gig|order|all]
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CREDS = {
  username: 'exclpro',
  email: 'Craigheadlee74@gmail.com',
  password: 'F1f2f3f4',
  baseUrl: 'https://www.fiverr.com',
};

async function testPlaywright() {
  console.log('\n[TEST] Playwright Installation...');
  try {
    const { chromium: test } = require('playwright');
    console.log('✅ Playwright installed correctly');
    return true;
  } catch (error) {
    console.log('❌ Playwright not installed');
    console.log('FIX: Run: npm install playwright && npx playwright install chromium');
    return false;
  }
}

async function testBrowserLaunch() {
  console.log('\n[TEST] Browser Launch...');
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    console.log('✅ Browser launches successfully');
    await browser.close();
    return true;
  } catch (error) {
    console.log('❌ Browser launch failed:', error.message);
    console.log('FIX: Verify Chromium downloaded: npx playwright install chromium');
    return false;
  }
}

async function testFiverrConnection() {
  console.log('\n[TEST] Fiverr Connection...');
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto(CREDS.baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const title = await page.title();
    
    console.log(`✅ Connected to Fiverr (title: ${title.slice(0, 30)}...)`);
    await browser.close();
    return true;
  } catch (error) {
    console.log('❌ Cannot reach Fiverr:', error.message);
    console.log('FIX: Check internet connection, try: curl https://www.fiverr.com');
    return false;
  }
}

async function testLoginForm() {
  console.log('\n[TEST] Login Form Analysis...');
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto(`${CREDS.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    
    // Check for form fields
    const emailField = await page.locator('input[type="email"]').first().isVisible().catch(() => false);
    const passwordField = await page.locator('input[type="password"]').first().isVisible().catch(() => false);
    const loginBtn = await page.locator('button').filter({ hasText: /Login|Continue|Sign In/ }).first().isVisible().catch(() => false);
    
    console.log(`  Email field: ${emailField ? '✅' : '❌'}`);
    console.log(`  Password field: ${passwordField ? '✅' : '❌'}`);
    console.log(`  Login button: ${loginBtn ? '✅' : '❌'}`);
    
    if (emailField && passwordField && loginBtn) {
      console.log('✅ Login form structure correct');
      await browser.close();
      return true;
    } else {
      console.log('❌ Login form structure changed');
      console.log('DEBUG: Inspect login page manually in browser (page still open)');
      console.log('FIX: Update form selectors in fiverr-bot.js');
      return false;
    }
  } catch (error) {
    console.log('❌ Login form test failed:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n[TEST] Actual Login...');
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    console.log('  → Navigating to login...');
    await page.goto(`${CREDS.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    
    console.log('  → Entering email...');
    const emailField = await page.locator('input[type="email"]').first();
    await emailField.fill(CREDS.email);
    
    console.log('  → Entering password...');
    const passwordField = await page.locator('input[type="password"]').first();
    await passwordField.fill(CREDS.password);
    
    console.log('  → Clicking login...');
    const loginBtn = await page.locator('button').filter({ hasText: /Login|Continue|Sign In/ }).first();
    await loginBtn.click();
    
    console.log('  → Waiting for navigation...');
    await page.waitForNavigation({ timeout: 15000 }).catch(() => {
      console.log('  ⚠️  No navigation detected (might be OK)');
    });
    
    // Check if we're logged in
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    const isLoggedIn = !currentUrl.includes('login');
    
    if (isLoggedIn) {
      console.log(`✅ Login successful (url: ${currentUrl.slice(0, 50)}...)`);
      await browser.close();
      return true;
    } else {
      console.log('❌ Login failed (still on login page)');
      console.log('FIX: Check credentials, browser still open for debugging');
      return false;
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
    return false;
  }
}

async function testGigPosting() {
  console.log('\n[TEST] Gig Posting Form...');
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Login first
    console.log('  → Logging in...');
    await page.goto(`${CREDS.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    await page.locator('input[type="email"]').first().fill(CREDS.email);
    await page.locator('input[type="password"]').first().fill(CREDS.password);
    await page.locator('button').filter({ hasText: /Login|Continue/ }).first().click();
    await page.waitForNavigation({ timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);
    
    // Navigate to gig creation
    console.log('  → Navigating to gig creation...');
    await page.goto(`${CREDS.baseUrl}/gigs`, { waitUntil: 'domcontentloaded' });
    
    // Look for create button
    const createBtn = await page.locator('button, a').filter({ hasText: /Create|create/ }).first().isVisible().catch(() => false);
    
    if (!createBtn) {
      console.log('❌ Create gig button not found');
      console.log('  → Browser open for manual inspection');
      return false;
    }
    
    console.log('  → Clicking create button...');
    await page.locator('button, a').filter({ hasText: /Create|create/ }).first().click();
    
    await page.waitForNavigation({ timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Check for form fields
    const titleField = await page.locator('input[placeholder*="title"], input[name*="title"]').first().isVisible().catch(() => false);
    const descField = await page.locator('textarea').first().isVisible().catch(() => false);
    
    console.log(`  Title field: ${titleField ? '✅' : '❌'}`);
    console.log(`  Description field: ${descField ? '✅' : '❌'}`);
    
    if (titleField && descField) {
      console.log('✅ Gig posting form found');
      await browser.close();
      return true;
    } else {
      console.log('❌ Gig posting form structure changed');
      console.log('  → Browser open for manual inspection');
      return false;
    }
  } catch (error) {
    console.log('❌ Gig posting test failed:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('FIVERR BOT DIAGNOSTICS');
  console.log('═══════════════════════════════════════════════════════════');
  
  const results = {
    playwright: await testPlaywright(),
    browserLaunch: await testBrowserLaunch(),
    fiverrConnection: await testFiverrConnection(),
    loginForm: await testLoginForm(),
    login: await testLogin(),
    gigPosting: await testGigPosting(),
  };
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('DIAGNOSTIC SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;
  
  console.log(`\n✅ Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🚀 ALL TESTS PASSED — Bot is ready to post gigs!');
    console.log('\nNext: node fiverr-bot.js --action post');
  } else {
    console.log('\n⚠️  Some tests failed — Review fixes above');
  }
}

async function main() {
  const args = process.argv.slice(2);
  const test = args[0] === '--test' ? args[1] : 'all';
  
  try {
    switch(test) {
      case 'playwright':
        await testPlaywright();
        break;
      case 'launch':
        await testBrowserLaunch();
        break;
      case 'connection':
        await testFiverrConnection();
        break;
      case 'form':
        await testLoginForm();
        break;
      case 'login':
        await testLogin();
        break;
      case 'gig':
        await testGigPosting();
        break;
      default:
        await runAllTests();
    }
  } catch (error) {
    console.error('[FATAL]', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
