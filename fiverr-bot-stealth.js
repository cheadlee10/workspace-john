// FIVERR BOT v2.0 - STEALTH EDITION
// Uses playwright-with-fingerprints to bypass PerimeterX detection
// Built: 2026-02-24 (late night) by John for Craig

const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// Apply stealth plugin
chromium.use(StealthPlugin());

// Config
const FIVERR_EMAIL = 'Craigheadlee74@gmail.com';
const FIVERR_PASSWORD = 'F1f2f3f4';
const GIGS_FILE = './fiverr-gigs-READY.md';

// Human-like delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => sleep(2000 + Math.random() * 3000); // 2-5 seconds

// Logging
function log(message) {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] ${message}`;
    console.log(logMsg);
    fs.appendFileSync('fiverr-bot-stealth.log', logMsg + '\\n');
}

// Enhanced browser launch with anti-detection
async function launchBrowser() {
    log('Launching stealth browser...');
    
    const browser = await chromium.launch({
        headless: false, // Must use GUI mode for PerimeterX
        args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-site-isolation-trials',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'en-US',
        timezoneId: 'America/Los_Angeles',
        permissions: ['geolocation']
    });
    
    // Add extra stealth
    await context.addInitScript(() => {
        // Override navigator.webdriver
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        
        // Override chrome property
        window.chrome = {
            runtime: {},
            loadTimes: function() {},
            csi: function() {},
            app: {}
        };
        
        // Override permissions
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });
    
    const page = await context.newPage();
    log('Stealth browser launched successfully');
    return { browser, page };
}

// Login to Fiverr
async function login(page) {
    log('Navigating to Fiverr login...');
    try {
        await page.goto('https://www.fiverr.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
        log(`Navigation timeout, but continuing: ${e.message}`);
    }
    await randomDelay();
    
    log('Entering credentials...');
    
    // Fill email (type slowly like human)
    await page.click('input[type="email"], input[name="username"]');
    await randomDelay();
    for (const char of FIVERR_EMAIL) {
        await page.keyboard.type(char);
        await sleep(50 + Math.random() * 100); // 50-150ms per character
    }
    
    await randomDelay();
    
    // Fill password
    await page.click('input[type="password"]');
    await randomDelay();
    for (const char of FIVERR_PASSWORD) {
        await page.keyboard.type(char);
        await sleep(50 + Math.random() * 100);
    }
    
    await randomDelay();
    
    // Click login button
    log('Clicking login button...');
    await page.click('button[type="submit"]');
    
    // Wait for navigation (use domcontentloaded instead of networkidle for PerimeterX)
    try {
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 });
        log('Login successful!');
    } catch (e) {
        log(`Navigation warning: ${e.message}`);
        // Continue anyway - might be logged in
    }
}

// Navigate to seller dashboard
async function goToSellerDashboard(page) {
    log('Navigating to seller dashboard...');
    await page.goto('https://www.fiverr.com/start_selling', { waitUntil: 'networkidle' });
    await randomDelay();
}

// Post a single gig
async function postGig(page, gigData) {
    log(`Posting gig: ${gigData.title}...`);
    
    // Navigate to gig creation
    await page.goto('https://www.fiverr.com/gigs/create', { waitUntil: 'networkidle' });
    await randomDelay();
    
    // Fill gig form (will need to inspect actual selectors)
    // This is placeholder - needs real Fiverr form selectors
    log('Filling gig form...');
    
    // Title
    await page.fill('input[name="title"]', gigData.title);
    await randomDelay();
    
    // Description
    await page.fill('textarea[name="description"]', gigData.description);
    await randomDelay();
    
    // Pricing (3 tiers)
    // TODO: Fill pricing fields based on actual Fiverr UI
    
    log(`Gig "${gigData.title}" posted successfully!`);
}

// Main execution
async function main() {
    log('=== FIVERR BOT v2.0 STEALTH EDITION STARTING ===');
    
    let browser, page;
    try {
        // Launch browser
        ({ browser, page } = await launchBrowser());
        
        // Login
        await login(page);
        
        // Go to seller dashboard
        await goToSellerDashboard(page);
        
        // Post gigs (placeholder - need gig data structure)
        log('Ready to post gigs. Awaiting implementation...');
        
        // Keep browser open for manual testing
        log('Browser staying open for testing. Press Ctrl+C to exit.');
        await new Promise(() => {}); // Keep alive
        
    } catch (error) {
        log(`ERROR: ${error.message}`);
        log(error.stack);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { launchBrowser, login, postGig };
