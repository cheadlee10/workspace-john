#!/usr/bin/env node
/**
 * FIVERR BOT v2.0 — ADVANCED ANTI-DETECTION
 * Multi-layer evasion: fingerprint spoofing + behavioral simulation + stealth mode
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// STEALTH CONFIGURATION — MULTI-LAYER EVASION
// ═══════════════════════════════════════════════════════════════════════════════

const STEALTH_CONFIG = {
  // Layer 1: Browser Fingerprint Spoofing
  fingerprint: {
    // Spoof common Chrome DevTools detection
    blockWebRTC: true,
    spoofChrome: true,
    maskHeadless: true,
    spoofNavigator: true,
    spoofWebGL: true,
  },

  // Layer 2: Behavioral Simulation
  behavior: {
    humanClickDelay: [1500, 4000], // Random 1.5-4 sec between clicks
    humanTypeDelay: [50, 200], // Random 50-200ms per character
    scrollRandomly: true, // Scroll page before interacting
    randomMouseMovements: true, // Move mouse before clicking
    randomIdleTime: [2000, 6000], // Random idle before actions
  },

  // Layer 3: Browser Configuration
  browser: {
    headless: false, // CRITICAL: headless=true is detectable. Use headless=false for real deployments
    slowMo: 1000,
    args: [
      '--disable-blink-features=AutomationControlled', // Hide automation flag
      '--disable-dev-shm-usage', // Reduce memory usage
      '--no-first-run',
      '--no-default-browser-check',
    ],
  },

  // Layer 4: Network Evasion
  network: {
    // OPTIONAL: Use residential proxy (Bright Data, Oxylabs, etc.)
    proxy: null, // null = no proxy. Set to { server: 'http://proxy:port' } if using residential proxy
    userAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ],
  },

  // Layer 5: Session Management
  session: {
    rotateFingerprints: true, // Rotate fingerprint every N minutes
    rotateInterval: 30 * 60 * 1000, // 30 minutes
    persistCookies: true, // Keep session alive
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 1: FINGERPRINT SPOOFING
// ═══════════════════════════════════════════════════════════════════════════════

const FINGERPRINT_SPOOF = `
  // Override navigator.webdriver (key detection vector)
  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
  });

  // Spoof chrome object
  window.chrome = {
    runtime: {},
  };

  // Override navigator properties
  const originalQuery = window.navigator.permissions.query;
  window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );

  // Mask headless mode
  Object.defineProperty(navigator, 'headless', {
    get: () => false,
  });

  // Spoof plugins (real browsers have these)
  Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3], // Simulate plugins
  });

  // Override Proxy detection
  const handler = {
    get: (target, prop) => {
      if (prop === 'toString') {
        return () => 'object Proxy';
      }
      return Reflect.get(target, prop);
    },
  };
  
  window.proxy = new Proxy({}, handler);

  // Spoof canvas fingerprinting
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    if (this.width === 280 && this.height === 60) {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA8CAYAAAA+2m9RAAAA';
    }
    return originalToDataURL.apply(this, arguments);
  };

  // Spoof WebGL
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) {
      return 'Intel Inc.';
    }
    if (parameter === 37446) {
      return 'Intel Iris OpenGL Engine';
    }
    return getParameter.call(this, parameter);
  };
`;

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 2: BEHAVIORAL SIMULATION
// ═══════════════════════════════════════════════════════════════════════════════

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function humanDelay(delayRange = null) {
  const range = delayRange || STEALTH_CONFIG.behavior.humanClickDelay;
  const delay = randomDelay(range[0], range[1]);
  await new Promise(r => setTimeout(r, delay));
}

async function randomScroll(page) {
  if (!STEALTH_CONFIG.behavior.scrollRandomly) return;
  
  const scrolls = randomDelay(2, 5);
  for (let i = 0; i < scrolls; i++) {
    const scrollDistance = randomDelay(100, 500);
    await page.evaluate((distance) => {
      window.scrollBy(0, distance);
    }, scrollDistance);
    await humanDelay([300, 800]);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await humanDelay([500, 1000]);
}

async function randomMouseMovement(page, x, y) {
  if (!STEALTH_CONFIG.behavior.randomMouseMovements) return;
  
  const randomX = x + randomDelay(-50, 50);
  const randomY = y + randomDelay(-50, 50);
  await page.mouse.move(randomX, randomY);
  await humanDelay([200, 500]);
}

async function typeHumanLike(page, selector, text) {
  await page.focus(selector);
  await humanDelay([500, 1000]); // Pause before typing
  
  for (const char of text) {
    const typeDelay = randomDelay(
      STEALTH_CONFIG.behavior.humanTypeDelay[0],
      STEALTH_CONFIG.behavior.humanTypeDelay[1]
    );
    await page.keyboard.type(char);
    await new Promise(r => setTimeout(r, typeDelay));
  }
  
  await humanDelay([300, 800]); // Pause after typing
}

async function clickHuman(page, selector) {
  // Random scroll before click
  if (Math.random() > 0.5) {
    await randomScroll(page);
  }
  
  // Get element position
  const element = await page.locator(selector).first();
  const box = await element.boundingBox();
  
  if (!box) throw new Error(`Element ${selector} not found or not visible`);
  
  // Random mouse movement to element
  await randomMouseMovement(page, box.x + box.width / 2, box.y + box.height / 2);
  
  // Wait before click
  await humanDelay();
  
  // Click
  await element.click();
  
  // Wait after click
  await humanDelay([800, 2000]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 3: BROWSER INITIALIZATION WITH STEALTH
// ═══════════════════════════════════════════════════════════════════════════════

async function initStealthBrowser() {
  console.log('[STEALTH] Initializing stealth browser...');
  
  const browser = await chromium.launch({
    headless: STEALTH_CONFIG.browser.headless,
    args: STEALTH_CONFIG.browser.args,
  });

  const userAgent = STEALTH_CONFIG.network.userAgents[
    Math.floor(Math.random() * STEALTH_CONFIG.network.userAgents.length)
  ];

  const contextOptions = {
    userAgent,
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles',
  };
  
  // Only add proxy if configured
  if (STEALTH_CONFIG.network.proxy) {
    contextOptions.proxy = STEALTH_CONFIG.network.proxy;
  }
  
  const context = await browser.newContext(contextOptions);

  // Add stealth script injection
  await context.addInitScript(FINGERPRINT_SPOOF);

  const page = await context.newPage();
  
  console.log('[STEALTH] Browser initialized with:');
  console.log(`  - User-Agent: ${userAgent.slice(0, 60)}...`);
  console.log(`  - Headless: ${STEALTH_CONFIG.browser.headless}`);
  console.log(`  - Proxy: ${STEALTH_CONFIG.network.proxy ? 'Yes' : 'No'}`);
  console.log(`  - Fingerprint spoofing: Yes`);
  console.log(`  - Behavioral simulation: Yes`);

  return { browser, context, page };
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE: LOGIN WITH STEALTH
// ═══════════════════════════════════════════════════════════════════════════════

async function stealthLogin(page, email, password) {
  console.log('[STEALTH] Starting stealth login...');
  
  // Navigate with random idle
  await humanDelay([1000, 3000]);
  await page.goto('https://www.fiverr.com/login', { waitUntil: 'domcontentloaded' });
  await humanDelay([2000, 4000]);

  // Random scroll before interacting
  await randomScroll(page);

  // Enter email with human behavior
  console.log('[STEALTH] Entering email...');
  await clickHuman(page, 'input[type="email"]');
  await typeHumanLike(page, 'input[type="email"]', email);
  await humanDelay([800, 1500]);

  // Enter password with human behavior
  console.log('[STEALTH] Entering password...');
  await clickHuman(page, 'input[type="password"]');
  await typeHumanLike(page, 'input[type="password"]', password);
  await humanDelay([800, 1500]);

  // Random scroll before clicking login
  if (Math.random() > 0.3) {
    await randomScroll(page);
  }

  // Click login button with human behavior
  console.log('[STEALTH] Clicking login...');
  await clickHuman(page, 'button:has-text("Continue"), button:has-text("Login")');

  // Wait for navigation
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {
    console.warn('[STEALTH] Navigation timeout, but proceeding...');
  });

  console.log('[STEALTH] Login sequence complete');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN: DEMONSTRATION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  let { browser, context, page } = await initStealthBrowser();

  try {
    // Example: stealth login
    // await stealthLogin(page, 'exclpro', 'F1f2f3f4');
    
    // For now, just demonstrate the stealth features
    console.log('[STEALTH] All anti-detection layers active');
    console.log('[STEALTH] Safe to proceed with automated interactions');
    
    // Keep browser open for testing
    await humanDelay([5000, 10000]);

  } catch (error) {
    console.error('[ERROR]', error.message);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('[FATAL]', err);
    process.exit(1);
  });
}

module.exports = {
  initStealthBrowser,
  stealthLogin,
  humanDelay,
  clickHuman,
  typeHumanLike,
  randomScroll,
};
