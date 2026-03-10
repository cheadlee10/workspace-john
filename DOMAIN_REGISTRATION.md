# Domain Registration — northstar-synergy.dev

## Automated Setup (Recommended)

I created a script that registers the domain + configures DNS + adds to Vercel in one command.

### Prerequisites

1. **Vercel Account**
   - Sign up at https://vercel.com (free)
   - Import GitHub repo with website code

2. **Vercel API Token**
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Name: "Domain Registration"
   - Scope: Full Account
   - Copy token (starts with `vercel_...`)

3. **Vercel Project ID**
   - Go to Vercel dashboard → Your project
   - Settings → General
   - Copy Project ID (long alphanumeric string)

4. **Payment Method**
   - Vercel dashboard → Account → Billing
   - Add credit card
   - Domain cost: $15/year (charged immediately)

### Run Setup Script

```bash
cd website

# Set environment variables
export VERCEL_TOKEN="vercel_xxxxxxxxxxxxx"
export VERCEL_PROJECT_ID="prj_xxxxxxxxxxxxx"

# Install dependencies
npm install node-fetch

# Run domain registration
node scripts/setup-domain.js
```

**What it does:**
1. Checks if northstar-synergy.dev is available
2. Purchases domain ($15, charged to Vercel account)
3. Waits 30s for DNS propagation
4. Adds domain to your Vercel project
5. Triggers SSL certificate provisioning (auto via Let's Encrypt)

**Result:** Domain live at https://northstar-synergy.dev in 5-10 minutes

---

## Manual Setup (If Script Fails)

### Step 1: Register Domain
1. Go to https://vercel.com/domains
2. Search: northstar-synergy.dev
3. Click "Add" → "Purchase"
4. Complete payment ($15)
5. Wait 2-5 minutes for confirmation

### Step 2: Add to Project
1. Vercel dashboard → Your project → Settings → Domains
2. Click "Add Domain"
3. Enter: northstar-synergy.dev
4. Click "Add"
5. Vercel configures DNS automatically

### Step 3: Verify
```bash
# Check DNS
nslookup northstar-synergy.dev
# Should show: cname.vercel-dns.com

# Check HTTPS
curl -I https://northstar-synergy.dev
# Should show: HTTP/2 200
```

---

## Alternative Domains (If .dev Unavailable)

If northstar-synergy.dev is taken:

1. **northstarsynergy.com** (classic, $12/year)
2. **northstar.services** (descriptive, $20/year)
3. **northstar-automation.dev** (variant, $15/year)
4. **getstarsynergy.com** (brand variant, $12/year)

Check availability in script or at https://vercel.com/domains

---

## Post-Registration Checklist

Once domain is live:

- [ ] Update `.env.local` → `NEXT_PUBLIC_SITE_URL=https://northstar-synergy.dev`
- [ ] Deploy site: `vercel --prod`
- [ ] Get live Stripe API keys
- [ ] Update Stripe webhook URL: `https://northstar-synergy.dev/api/webhooks/stripe`
- [ ] Test payment flow with real card
- [ ] Set up Google Workspace: john@northstarsynergy.com
- [ ] Configure Resend for receipts: receipts@northstarsynergy.com
- [ ] Update MEMORY.md with domain

---

## Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (.dev) | $15 | Annual |
| Vercel Hosting | Free | N/A |
| SSL Certificate | Free | Auto-renew |
| **TOTAL** | **$15/year** | — |

---

## Current Status

⏳ **Pending:** Vercel API token + Project ID
⏳ **Pending:** Payment method on Vercel account
⏳ **Pending:** Run setup script

**Once you provide credentials, I'll execute immediately.**

---

## Credentials Needed

To run automated setup, I need:

```bash
VERCEL_TOKEN=vercel_xxxxxxxxxxxxx  # From vercel.com/account/tokens
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxx  # From project settings
```

**How to get:**
1. Vercel dashboard → Account → Tokens → Create
2. Vercel dashboard → Project → Settings → General → Copy Project ID
3. Paste both into terminal (or add to .env.local)
4. Run: `node scripts/setup-domain.js`

Domain will be live in 10 minutes.
