// FIVERR BOT v3.0 - CAMOUFOX EDITION (PERIMETERX BYPASS)
// Uses Camoufox REST API to bypass PerimeterX detection
// Built: 2026-02-25 2:00 AM by John for Craig

// Using native fetch (Node 18+) instead of axios

// Camoufox REST API endpoint (local server)
const CAMOFOX_BASE_URL = 'http://localhost:9377';
const FIVERR_EMAIL = 'Craigheadlee74@gmail.com';
const FIVERR_PASSWORD = 'F1f2f3f4';

// Session management
let sessionId = null;
let tabId = null;

// Helper functions
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create Camoufox session
async function createSession() {
    log('Creating Camoufox session...');
    try {
        const response = await fetch(`${CAMOFOX_BASE_URL}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'fiverr-craig',
                persistent: true
            })
        });
        const data = await response.json();
        sessionId = data.sessionId;
        log(`Session created: ${sessionId}`);
        return sessionId;
    } catch (error) {
        log(`ERROR creating session: ${error.message}`);
        throw error;
    }
}

// Open new tab
async function openTab(url) {
    log(`Opening tab: ${url}`);
    try {
        const response = await fetch(
            `${CAMOFOX_BASE_URL}/sessions/${sessionId}/tabs`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            }
        );
        const data = await response.json();
        tabId = data.tabId;
        log(`Tab opened: ${tabId}`);
        await sleep(3000); // Wait for page load
        return tabId;
    } catch (error) {
        log(`ERROR opening tab: ${error.message}`);
        throw error;
    }
}

// Get page snapshot
async function snapshot() {
    log('Taking snapshot...');
    try {
        const response = await fetch(
            `${CAMOFOX_BASE_URL}/sessions/${sessionId}/tabs/${tabId}/snapshot`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        log(`ERROR taking snapshot: ${error.message}`);
        throw error;
    }
}

// Click element
async function click(ref) {
    log(`Clicking element: ${ref}`);
    try {
        await fetch(
            `${CAMOFOX_BASE_URL}/sessions/${sessionId}/tabs/${tabId}/click`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ref })
            }
        );
        await sleep(1000);
    } catch (error) {
        log(`ERROR clicking: ${error.message}`);
        throw error;
    }
}

// Type text
async function type(ref, text) {
    log(`Typing into ${ref}: ${text.slice(0, 20)}...`);
    try {
        await fetch(
            `${CAMOFOX_BASE_URL}/sessions/${sessionId}/tabs/${tabId}/type`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ref, text })
            }
        );
        await sleep(500);
    } catch (error) {
        log(`ERROR typing: ${error.message}`);
        throw error;
    }
}

// Login to Fiverr
async function loginToFiverr() {
    log('=== LOGGING IN TO FIVERR ===');
    
    // Open login page
    await openTab('https://www.fiverr.com/login');
    await sleep(5000); // Wait for React form
    
    // Snapshot to find form elements
    const snap = await snapshot();
    log(`Page title: ${snap.title}`);
    log(`Found ${snap.elements ? snap.elements.length : 0} elements`);
    
    // Check if PerimeterX blocked us
    if (snap.title && snap.title.includes('human touch')) {
        log('❌ PERIMETERX STILL BLOCKING - Need residential proxy');
        return false;
    }
    
    // Find email and password fields
    const emailField = snap.elements?.find(e => 
        e.type === 'textbox' && (
            e.name?.includes('email') || 
            e.name?.includes('username') ||
            e.placeholder?.includes('email')
        )
    );
    
    const passwordField = snap.elements?.find(e => 
        e.type === 'textbox' && e.name?.includes('password')
    );
    
    if (!emailField || !passwordField) {
        log(`❌ Cannot find login fields`);
        log(`Email field: ${emailField ? 'found' : 'NOT FOUND'}`);
        log(`Password field: ${passwordField ? 'found' : 'NOT FOUND'}`);
        return false;
    }
    
    log(`✅ Found email field: ${emailField.ref}`);
    log(`✅ Found password field: ${passwordField.ref}`);
    
    // Fill email
    await click(emailField.ref);
    await type(emailField.ref, FIVERR_EMAIL);
    
    // Fill password
    await click(passwordField.ref);
    await type(passwordField.ref, FIVERR_PASSWORD);
    
    // Find and click login button
    const loginButton = snap.elements?.find(e => 
        e.type === 'button' && (
            e.name?.toLowerCase().includes('login') ||
            e.name?.toLowerCase().includes('continue')
        )
    );
    
    if (!loginButton) {
        log('❌ Cannot find login button');
        return false;
    }
    
    log(`✅ Found login button: ${loginButton.ref}`);
    await click(loginButton.ref);
    await sleep(5000); // Wait for login
    
    // Check if logged in
    const afterLogin = await snapshot();
    log(`After login - Title: ${afterLogin.title}`);
    
    if (afterLogin.url?.includes('/login')) {
        log('❌ Still on login page - login failed');
        return false;
    }
    
    log('✅ LOGIN SUCCESSFUL!');
    return true;
}

// Main execution
async function main() {
    log('=== FIVERR BOT v3.0 - CAMOUFOX EDITION ===');
    
    try {
        // Create session
        await createSession();
        
        // Login
        const loginSuccess = await loginToFiverr();
        
        if (loginSuccess) {
            log('✅✅✅ PERIMETERX BYPASSED! LOGIN WORKED!');
            log('Ready to post gigs!');
        } else {
            log('❌ Login failed or still blocked');
            log('Next step: Add residential proxy ($30/mo)');
        }
        
        // Keep session alive for inspection
        log('Session kept alive. Press Ctrl+C to exit.');
        await new Promise(() => {});
        
    } catch (error) {
        log(`FATAL ERROR: ${error.message}`);
        log(error.stack);
    }
}

// Run
if (require.main === module) {
    main();
}

module.exports = { createSession, loginToFiverr };
