# Gmail API Setup Skill

**Purpose:** Guide users through enabling Gmail API and obtaining OAuth credentials for CRM email scanning.

**Reality Check:** I cannot directly access Google Cloud Console (requires human login). But I can guide you step-by-step and handle everything after credentials are obtained.

---

## What I Can Do

✅ **Guide you through Google Cloud Console setup** (detailed instructions)  
✅ **Verify credentials file is correct** (check JSON structure)  
✅ **Run OAuth flow** (opens browser, you click "Allow")  
✅ **Test Gmail connection** (scan emails, verify access)  
✅ **Automate everything after** (daily scans, contact discovery)  

❌ **Cannot do:** Login to your Google account, click buttons in Cloud Console

---

## Step-by-Step Guide (I'll Walk You Through)

### Step 1: Create Google Cloud Project (2 min)

**URL:** https://console.cloud.google.com/

**Instructions:**
1. Click **"Select a project"** dropdown (top left, says "My First Project" or similar)
2. Click **"NEW PROJECT"** (top right of modal)
3. Project name: **"Personal CRM"** (or anything you want)
4. Organization: Leave as "No organization"
5. Click **"CREATE"**
6. Wait 10-15 seconds for project creation
7. You'll see a notification: "Project 'Personal CRM' created"

**Tell me when done:** "Project created"

---

### Step 2: Enable Gmail API (1 min)

**Make sure your new project is selected** (top left shows "Personal CRM")

**Instructions:**
1. Click hamburger menu (☰ three lines, top left)
2. Hover over **"APIs & Services"**
3. Click **"Library"** (or go to: https://console.cloud.google.com/apis/library)
4. In the search bar, type: **"Gmail API"**
5. Click on **"Gmail API"** (blue icon with envelope)
6. Click **"ENABLE"** (big blue button)
7. Wait 5 seconds, you'll see "API enabled"

**Tell me when done:** "Gmail API enabled"

---

### Step 3: Configure OAuth Consent Screen (3 min)

**This is required before creating credentials**

**Instructions:**
1. Click hamburger menu (☰) → "APIs & Services" → **"OAuth consent screen"**
   - Or go to: https://console.cloud.google.com/apis/credentials/consent
2. Select **"External"** (unless you have Google Workspace)
3. Click **"CREATE"**

**Fill out the form:**
- **App name:** "Personal CRM" (or "My CRM")
- **User support email:** Select your email (chead@me.com)
- **App logo:** (optional, skip)
- **Application home page:** (optional, skip)
- **Authorized domains:** (skip)
- **Developer contact information:** chead@me.com

4. Click **"SAVE AND CONTINUE"**

**Scopes page:**
- Don't add any scopes yet
- Click **"SAVE AND CONTINUE"**

**Test users page:**
- Click **"+ ADD USERS"**
- Enter your email: **chead@me.com**
- Click **"ADD"**
- Click **"SAVE AND CONTINUE"**

**Summary page:**
- Review and click **"BACK TO DASHBOARD"**

**Tell me when done:** "OAuth consent screen configured"

---

### Step 4: Create OAuth Credentials (2 min)

**Instructions:**
1. Click hamburger menu (☰) → "APIs & Services" → **"Credentials"**
   - Or go to: https://console.cloud.google.com/apis/credentials
2. Click **"+ CREATE CREDENTIALS"** (top center, blue button)
3. Select **"OAuth client ID"**

**Configure OAuth client:**
- **Application type:** Select **"Desktop app"** (from dropdown)
- **Name:** "Personal CRM Desktop" (or "CRM Client")
- Click **"CREATE"**

**Download credentials:**
- A popup appears: "OAuth client created"
- Click **"DOWNLOAD JSON"** (or click the download icon ⬇️)
- File will download as: `client_secret_XXXXX.json`
- **IMPORTANT:** Remember where you saved it

**Tell me when done and paste the file path:** 
Example: "Downloaded to: C:\Users\chead\Downloads\client_secret_123456.json"

---

### Step 5: I Take Over (Automated)

**Once you give me the file path, I will:**

1. **Copy credentials to CRM directory**
2. **Verify JSON structure** (make sure it's valid)
3. **Run OAuth flow** (opens browser, you click "Allow")
4. **Save token** (for future automated access)
5. **Test connection** (scan 10 recent emails)
6. **Report results** (contacts found, interactions logged)

**After this one-time setup:**
- ✅ Daily email scans (automated)
- ✅ Contact discovery (automated)
- ✅ Interaction logging (automated)
- ✅ No more manual steps (ever)

---

## Common Issues & Solutions

### "I don't see 'NEW PROJECT' button"
- You might already have a project selected
- Click the project dropdown (top left)
- The "NEW PROJECT" button is in the top-right of the popup

### "Gmail API is already enabled"
- Perfect! Skip to Step 3 (OAuth consent screen)

### "OAuth consent screen asks for verification"
- You'll see a warning: "App not verified"
- This is NORMAL for personal use
- You can click "Advanced" → "Go to [App Name] (unsafe)" during OAuth flow
- Google doesn't require verification for personal apps with <100 users

### "I see 'App blocked' during OAuth flow"
- This means you didn't add yourself as a test user
- Go back to Step 3 → Test users → Add your email

### "Download JSON button is grayed out"
- Click the ⬇️ download icon next to your OAuth client in the credentials list
- Or click the OAuth client name → Copy the JSON from the page

### "Can I use an existing Google Cloud project?"
- Yes! Just make sure Gmail API is enabled
- Skip to Step 2 or Step 3 as needed

---

## Security Notes

**What access does this grant?**
- **Read-only access** to your Gmail (no sending, no deleting)
- **Scopes requested:** `https://www.googleapis.com/auth/gmail.readonly`
- **You can revoke access anytime:** https://myaccount.google.com/permissions

**Where are credentials stored?**
- `credentials.json` - OAuth client credentials (identifies the app)
- `token.json` - Refresh token (proves you authorized the app)
- Both stored locally in `crm/` directory
- **Never shared externally** (all CRM operations are local)

**Best practices:**
- Add both files to `.gitignore` (don't commit to GitHub)
- Keep backups in a secure location
- Revoke access if you stop using the CRM

---

## After Setup

**Test the integration:**
```bash
cd C:\Users\chead\.openclaw\workspace-john\crm
python -c "from gmail_scanner import GmailScanner; from db import CRMDB; scanner = GmailScanner(CRMDB()); scanner.authenticate(); stats = scanner.scan_recent_emails(days=7); print(stats)"
```

**Expected output:**
```
{'contacts_added': 15, 'interactions_added': 87, 'skipped': 23, 'errors': 0}
```

**Daily automation:**
```bash
# Add to cron (runs at 8 AM daily)
0 8 * * * cd /path/to/crm && python openclaw_integration.py --daily-sync
```

**Discord integration:**
```
/crm sync email
```

---

## Troubleshooting

### "Authentication failed"
- Check `credentials.json` is in `crm/` directory
- Verify file is valid JSON (not corrupted)
- Make sure you added yourself as test user in OAuth consent screen

### "Invalid grant" error
- Delete `token.json`
- Re-run authentication
- Browser will open again for fresh consent

### "Access blocked: This app's request is invalid"
- OAuth consent screen not configured properly
- Go back to Step 3, verify:
  - User support email is set
  - Developer contact email is set
  - You're added as a test user

### "The app is not verified"
- **This is normal for personal apps**
- Click "Advanced" → "Go to [App Name] (unsafe)"
- You're the developer, so it's safe

---

## Alternative: Manual Email Export (No API)

**If Gmail API setup is too complex:**

1. Export emails from Gmail:
   - Go to https://takeout.google.com/
   - Select "Mail" only
   - Download as .mbox file

2. Import to CRM:
   ```python
   from email_importer import MboxImporter
   importer = MboxImporter('gmail.mbox')
   importer.import_all()
   ```

**Pros:** No API setup, one-time download  
**Cons:** Not real-time, need to re-export periodically

---

## Summary

**What I need from you:**
1. Create Google Cloud project (2 min)
2. Enable Gmail API (1 min)
3. Configure OAuth consent screen (3 min)
4. Create OAuth client (2 min)
5. Download credentials.json (10 seconds)
6. Give me the file path (copy-paste)

**What I do automatically:**
1. Copy credentials to CRM directory
2. Run OAuth flow (you click "Allow" in browser once)
3. Save token for future use
4. Test connection
5. Scan emails and discover contacts
6. Set up daily automation

**After this 10-minute setup:**
- ✅ Fully automated email scanning
- ✅ Contact discovery
- ✅ Relationship intelligence
- ✅ Never need to touch Google Cloud Console again

---

## Ready to Start?

**Tell me:**
1. "Start" - I'll guide you through Step 1
2. "Already have credentials" - Give me the file path
3. "Need help" - Ask any questions

Let's get your CRM connected to Gmail! 🚀
