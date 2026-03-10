---
name: vercel-credentials
description: Retrieve Vercel API tokens and project IDs via browser automation or CLI. Use when setting up deployments and need programmatic access to Vercel resources.
---

# Vercel Credential Retrieval

## Method 1: Browser Automation (Easiest)

Use OpenClaw browser tool to navigate Vercel dashboard and extract credentials.

### Get API Token

```javascript
// Navigate to token creation page
browser.open('https://vercel.com/account/tokens')

// User must be logged in (if not, prompt to login)
// Click "Create Token"
browser.click('button:has-text("Create")')

// Enter token name
browser.type('input[name="name"]', 'NorthStar Automation')

// Select scope (Full Account recommended for domain operations)
browser.click('label:has-text("Full Account")')

// Create token
browser.click('button:has-text("Create Token")')

// Copy token (shown once only)
const token = await browser.textContent('[data-testid="token-value"]')

// Save to environment
console.log('VERCEL_TOKEN=' + token)
```

### Get Project ID

```javascript
// Navigate to project
browser.open('https://vercel.com/dashboard')

// Click on project (or search)
browser.click('a:has-text("northstar-synergy")')  // or your project name

// Go to Settings
browser.click('a:has-text("Settings")')

// Project ID is displayed
const projectId = await browser.textContent('[data-label="Project ID"]')

console.log('VERCEL_PROJECT_ID=' + projectId)
```

---

## Method 2: Vercel CLI (If Logged In)

If Vercel CLI is already authenticated:

```bash
# Get current user info (includes token location)
vercel whoami

# Token is stored at:
# ~/.vercel/auth.json (Linux/Mac)
# %USERPROFILE%\.vercel\auth.json (Windows)

# Extract token
cat ~/.vercel/auth.json | jq -r '.token'

# Get project ID
cd website
vercel inspect | grep "id:" | awk '{print $2}'
```

---

## Method 3: Manual UI Navigation (Step-by-Step)

### Get API Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "NorthStar Automation"
4. Scope: "Full Account"
5. Expiration: "No Expiration" (or set date)
6. Click "Create Token"
7. **IMPORTANT:** Copy token immediately (shown once only)
8. Store in `.env.local`:
   ```
   VERCEL_TOKEN=vercel_xxxxxxxxxxxxxxxxxxxxxx
   ```

### Get Project ID

1. Go to https://vercel.com/dashboard
2. Click your project (northstar-synergy or current name)
3. Click "Settings" tab
4. Scroll to "General" section
5. Copy "Project ID" (starts with `prj_`)
6. Store in `.env.local`:
   ```
   VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxxxxxxxxxxx
   ```

---

## Method 4: Vercel API (Requires Existing Token)

If you already have a personal access token:

### List Projects
```bash
curl "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  | jq -r '.projects[] | "\(.name): \(.id)"'
```

### Get Team ID (if using team)
```bash
curl "https://api.vercel.com/v2/teams" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  | jq -r '.teams[] | "\(.name): \(.id)"'
```

---

## Browser Automation Script (Full Flow)

```javascript
// scripts/get-vercel-creds.js
const { chromium } = require('playwright')

async function getVercelCredentials() {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  // Check if logged in
  await page.goto('https://vercel.com/account/tokens')
  
  const isLoggedIn = await page.locator('button:has-text("Create")').isVisible()
  
  if (!isLoggedIn) {
    console.log('⚠️  Please log in to Vercel in the browser window')
    console.log('   Waiting 60 seconds...')
    await page.waitForTimeout(60000)
  }

  // Create token
  console.log('Creating API token...')
  await page.click('button:has-text("Create")')
  await page.fill('input[name="name"]', 'NorthStar Automation')
  await page.click('label:has-text("Full Account")')
  await page.click('button:has-text("Create Token")')
  
  // Extract token
  const token = await page.locator('[data-testid="token-value"]').textContent()
  console.log('✓ Token:', token)

  // Navigate to projects
  await page.goto('https://vercel.com/dashboard')
  
  // Find project (assumes it's the first one, or search)
  await page.click('a[href*="/"]') // Click first project link
  
  // Go to settings
  await page.click('a:has-text("Settings")')
  
  // Extract Project ID
  const projectId = await page.locator('text=/prj_[a-zA-Z0-9]+/').textContent()
  console.log('✓ Project ID:', projectId)

  await browser.close()

  return { token, projectId }
}

// Run
getVercelCredentials()
  .then(({ token, projectId }) => {
    console.log('\n✅ Credentials retrieved!\n')
    console.log('Add to .env.local:')
    console.log(`VERCEL_TOKEN=${token}`)
    console.log(`VERCEL_PROJECT_ID=${projectId}`)
  })
  .catch(console.error)
```

---

## Using OpenClaw Browser Tool

```bash
# Start browser session
browser.open('https://vercel.com/account/tokens')

# If not logged in, wait for user
# Then proceed with automation

browser.click('button[text="Create"]')
browser.type('input[name="name"]', 'NorthStar Automation')
browser.click('button[text="Create Token"]')

# Snapshot to extract token
const snapshot = browser.snapshot()
const token = snapshot.find('token-value').text

# Navigate to project
browser.open('https://vercel.com/dashboard')
browser.click('a[href*="northstar"]')
browser.click('a[text="Settings"]')

const snapshot2 = browser.snapshot()
const projectId = snapshot2.find('prj_').text
```

---

## Security Best Practices

### Token Storage
- **Never commit tokens to git**
- Store in `.env.local` (already in .gitignore)
- Use environment variables in production
- Rotate tokens regularly (every 90 days)

### Token Scopes
- Use minimum required scope
- For domain operations: "Full Account" needed
- For deployments only: "Deploy" scope sufficient

### Token Revocation
If token is compromised:
1. Go to https://vercel.com/account/tokens
2. Click "Revoke" next to compromised token
3. Create new token immediately
4. Update all systems using old token

---

## Troubleshooting

**"Unauthorized" Error**
- Token expired or revoked
- Wrong scope (need "Full Account" for domains)
- Token not in Authorization header correctly

**"Project Not Found"**
- Wrong Project ID
- Project belongs to team (need team ID in API calls)
- Check: `curl "https://api.vercel.com/v9/projects" -H "Authorization: Bearer ${TOKEN}"`

**"Rate Limited"**
- Vercel API: 20 requests/10 seconds
- Wait 10 seconds, retry
- Use exponential backoff in scripts

---

## Automated Retrieval Flow

1. Launch browser (OpenClaw browser tool)
2. Navigate to Vercel login (if needed)
3. Wait for user authentication
4. Programmatically navigate to token creation
5. Extract token from UI
6. Navigate to project settings
7. Extract Project ID
8. Save to `.env.local`
9. Close browser
10. Proceed with domain registration

**Estimated time:** 2-3 minutes (including login)

---

## Integration with Domain Setup

Once credentials retrieved, immediately run:

```bash
export VERCEL_TOKEN="..."
export VERCEL_PROJECT_ID="..."
npm run setup-domain
```

Domain will be registered and configured automatically.
