// FIVERR BOT v3.1 - CAMOUFOX EDITION (CORRECT API)
// Uses Camoufox REST API to bypass PerimeterX detection
// Built: 2026-02-25 2:30 AM by John for Craig

const CAMOFOX_BASE_URL = 'http://localhost:9377';
const FIVERR_EMAIL = 'Craigheadlee74@gmail.com';
const FIVERR_PASSWORD = 'F1f2f3f4';
const USER_ID = 'fiverr-craig';

let tabId = null;

function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create tab (session is created implicitly)
async function createTab(url) {
    log(`Creating tab with URL: ${url}`);
    try {
        const response = await fetch(`${CAMOFOX_BASE_URL}/tabs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: USER_ID,
                url: url
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        const data = await response.json();
        tabId = data.tabId;
        log(`Tab created: ${tabId}`);
        await sleep(5000); // Wait for page load
        return tabId;
    } catch (error) {
        log(`ERROR creating tab: ${error.message}`);
        throw error;
    }
}

// Get page snapshot
async function snapshot() {
    log('Taking snapshot...');
    try {
        const response = await fetch(`${CAMOFOX_BASE_URL}/tabs/${tabId}/snapshot`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
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
        const response = await fetch(`${CAMOFOX_BASE_URL}/tabs/${tabId}/click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ref })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
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
        const response = await fetch(`${CAMOFOX_BASE_URL}/tabs/${tabId}/type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ref, text })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        await sleep(500);
    } catch (error) {
        log(`ERROR typing: ${error.message}`);
        throw error;
    }
}

// Login to Fiverr
async function loginToFiverr() {
    log('=== LOGGING IN TO FIVERR ===');
    
    // Create tab with Fiverr login page
    await createTab('https://www.fiverr.com/login');
    
    // Snapshot to find form elements
    const snap = await snapshot();
    log(`Page title: ${snap.title}`);
    log(`Page URL: ${snap.url}`);
    
    // Check if PerimeterX blocked us
    if (snap.title && snap.title.includes('human touch')) {
        log('❌ PERIMETERX STILL BLOCKING');
        log('Need residential proxy ($30/mo) to bypass');
        return false;
    }
    
    log(`✅ PERIMETERX BYPASSED! Page loaded successfully!`);
    log(`Found ${snap.refs ? snap.refs.length : 0} interactive elements`);
    
    // Find email and password fields
    const emailField = snap.refs?.find(r => 
        r.role === 'textbox' && (
            r.name?.toLowerCase().includes('email') || 
            r.name?.toLowerCase().includes('username')
        )
    );
    
    const passwordField = snap.refs?.find(r => 
        r.role === 'textbox' && r.name?.toLowerCase().includes('password')
    );
    
    if (!emailField || !passwordField) {
        log(`❌ Cannot find login fields`);
        log(`Email field: ${emailField ? JSON.stringify(emailField) : 'NOT FOUND'}`);
        log(`Password field: ${passwordField ? JSON.stringify(passwordField) : 'NOT FOUND'}`);
        log('\nAll refs:');
        snap.refs?.forEach((r, i) => {
            if (r.role === 'textbox') {
                log(`  ${i}: ${r.role} - ${r.name}`);
            }
        });
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
    const loginButton = snap.refs?.find(r => 
        r.role === 'button' && (
            r.name?.toLowerCase().includes('login') ||
            r.name?.toLowerCase().includes('continue') ||
            r.name?.toLowerCase().includes('sign in')
        )
    );
    
    if (!loginButton) {
        log('❌ Cannot find login button');
        log('\nAll buttons:');
        snap.refs?.forEach((r, i) => {
            if (r.role === 'button') {
                log(`  ${i}: ${r.role} - ${r.name}`);
            }
        });
        return false;
    }
    
    log(`✅ Found login button: ${loginButton.ref}`);
    await click(loginButton.ref);
    await sleep(5000); // Wait for login
    
    // Check if logged in
    const afterLogin = await snapshot();
    log(`After login - Title: ${afterLogin.title}`);
    log(`After login - URL: ${afterLogin.url}`);
    
    if (afterLogin.url?.includes('/login')) {
        log('❌ Still on login page - login failed');
        return false;
    }
    
    log('✅✅✅ LOGIN SUCCESSFUL!');
    return true;
}

// Main execution
async function main() {
    log('=== FIVERR BOT v3.1 - CAMOUFOX EDITION ===');
    
    try {
        const loginSuccess = await loginToFiverr();
        
        if (loginSuccess) {
            log('');
            log('🎉🎉🎉 SUCCESS! PERIMETERX BYPASSED!');
            log('Fiverr login WORKED with Camoufox!');
            log('Ready to post gigs!');
            log('');
        } else {
            log('');
            log('❌ Login failed or still blocked');
            log('Next step: Add residential proxy ($30/mo)');
            log('');
        }
        
        // Keep session alive for inspection
        log('Tab kept alive. Press Ctrl+C to exit.');
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
