---
name: vercel-full-deployment
description: Complete Vercel deployment automation - create project, deploy site, register domain, configure DNS, set up SSL using Vercel API. Use when deploying Next.js apps to production with custom domains.
---

# Complete Vercel Deployment Automation

## Full Stack Deployment Flow

Given a Vercel API token, this skill automates:
1. Create Vercel project
2. Deploy website code
3. Register custom domain
4. Configure DNS automatically
5. Provision SSL certificate
6. Verify live site

**Prerequisites:**
- Vercel API token with Full Account scope
- Website code ready in `website/` directory
- Payment method on Vercel account (for domain)

---

## Step 1: Create Project via API

```bash
curl -X POST "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy",
    "framework": "nextjs",
    "environmentVariables": [
      {
        "key": "STRIPE_PUBLISHABLE_KEY",
        "value": "pk_test_...",
        "type": "encrypted",
        "target": ["production"]
      },
      {
        "key": "STRIPE_SECRET_KEY",
        "value": "sk_test_...",
        "type": "encrypted",
        "target": ["production"]
      }
    ]
  }'
```

Response includes `id` (Project ID) and `accountId`.

---

## Step 2: Deploy Code

### Option A: Deploy via Git Integration
```bash
# Push code to GitHub
git init
git add .
git commit -m "Initial NorthStar Synergy site"
git remote add origin https://github.com/yourusername/northstar-synergy.git
git push -u origin main

# Link project to GitHub repo
curl -X POST "https://api.vercel.com/v9/projects/${PROJECT_ID}/link" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "github",
    "repo": "yourusername/northstar-synergy"
  }'
```

### Option B: Deploy via File Upload (No Git Needed)
```bash
# Create deployment tarball
cd website
tar -czf deployment.tar.gz .

# Upload and deploy
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy",
    "project": "'${PROJECT_ID}'",
    "target": "production",
    "files": [
      {
        "file": "package.json",
        "data": "'$(base64 < package.json)'"
      }
    ]
  }'
```

**Easier:** Use Vercel CLI for deployment:
```bash
cd website
npx vercel --token ${VERCEL_TOKEN} --prod --yes
```

---

## Step 3: Register Domain

```bash
# Check availability
curl "https://api.vercel.com/v4/domains/status?name=northstar-synergy.dev" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}"

# Response: {"available": true, "price": 1500}

# Purchase domain
curl -X POST "https://api.vercel.com/v5/domains/buy" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy.dev",
    "expectedPrice": 1500
  }'
```

---

## Step 4: Add Domain to Project

```bash
curl -X POST "https://api.vercel.com/v9/projects/${PROJECT_ID}/domains" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy.dev"
  }'
```

DNS configured automatically. SSL provisioned in 5-10 minutes.

---

## Step 5: Verify Deployment

```bash
# Check project status
curl "https://api.vercel.com/v9/projects/${PROJECT_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}"

# Check latest deployment
curl "https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=1" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}"

# Verify domain
curl -I "https://northstar-synergy.dev"
```

---

## Complete Automation Script

```bash
#!/bin/bash
# deploy-northstar.sh - Complete deployment automation

set -e  # Exit on error

VERCEL_TOKEN="${VERCEL_TOKEN}"
DOMAIN="northstar-synergy.dev"

echo "🚀 Starting NorthStar Synergy deployment..."

# 1. Create project
echo "📦 Creating Vercel project..."
PROJECT_RESPONSE=$(curl -s -X POST "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy",
    "framework": "nextjs"
  }')

PROJECT_ID=$(echo $PROJECT_RESPONSE | jq -r '.id')
echo "✓ Project created: $PROJECT_ID"

# 2. Deploy code via CLI (simplest for first deploy)
echo "📤 Deploying website..."
cd website
npx vercel --token ${VERCEL_TOKEN} --prod --yes

echo "✓ Website deployed"

# 3. Check domain availability
echo "🔍 Checking domain availability..."
DOMAIN_CHECK=$(curl -s "https://api.vercel.com/v4/domains/status?name=${DOMAIN}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}")

AVAILABLE=$(echo $DOMAIN_CHECK | jq -r '.available')

if [ "$AVAILABLE" != "true" ]; then
  echo "❌ Domain ${DOMAIN} not available"
  echo "Trying alternatives..."
  DOMAIN="northstarsynergy.com"
fi

# 4. Purchase domain
echo "💳 Purchasing domain: ${DOMAIN}..."
PRICE=$(echo $DOMAIN_CHECK | jq -r '.price')

curl -s -X POST "https://api.vercel.com/v5/domains/buy" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"${DOMAIN}\", \"expectedPrice\": ${PRICE}}"

echo "✓ Domain purchased: ${DOMAIN}"

# 5. Wait for DNS
echo "⏳ Waiting 30s for DNS propagation..."
sleep 30

# 6. Add domain to project
echo "🔗 Adding domain to project..."
curl -s -X POST "https://api.vercel.com/v9/projects/${PROJECT_ID}/domains" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"${DOMAIN}\"}"

echo "✓ Domain added to project"

# 7. Verify
echo "🔐 SSL certificate will be provisioned in 5-10 minutes"
echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site: https://${DOMAIN}"
echo "📊 Dashboard: https://vercel.com/dashboard"
echo ""
echo "Next steps:"
echo "  1. Add live Stripe keys to project environment variables"
echo "  2. Configure Stripe webhook: https://${DOMAIN}/api/webhooks/stripe"
echo "  3. Test payment flow"
echo "  4. Set up email (Google Workspace + Resend)"
```

Save as `deploy-northstar.sh`, then run:
```bash
export VERCEL_TOKEN="vcp_..."
bash deploy-northstar.sh
```

---

## Node.js Version (Cross-Platform)

```javascript
// deploy-northstar.js
const fetch = require('node-fetch')
const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const DOMAIN = 'northstar-synergy.dev'

async function deploy() {
  console.log('🚀 Starting NorthStar Synergy deployment...')

  // 1. Create project
  console.log('📦 Creating Vercel project...')
  const projectRes = await fetch('https://api.vercel.com/v9/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'northstar-synergy',
      framework: 'nextjs',
    }),
  })
  const project = await projectRes.json()
  const projectId = project.id
  console.log('✓ Project created:', projectId)

  // 2. Deploy via CLI
  console.log('📤 Deploying website...')
  await execPromise(`cd website && npx vercel --token ${VERCEL_TOKEN} --prod --yes`)
  console.log('✓ Website deployed')

  // 3. Check domain availability
  console.log('🔍 Checking domain availability...')
  const domainCheckRes = await fetch(
    `https://api.vercel.com/v4/domains/status?name=${DOMAIN}`,
    { headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` } }
  )
  const domainCheck = await domainCheckRes.json()

  if (!domainCheck.available) {
    console.log('❌ Domain not available:', DOMAIN)
    return
  }

  // 4. Purchase domain
  console.log('💳 Purchasing domain...')
  await fetch('https://api.vercel.com/v5/domains/buy', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: DOMAIN,
      expectedPrice: domainCheck.price,
    }),
  })
  console.log('✓ Domain purchased:', DOMAIN)

  // 5. Wait for DNS
  console.log('⏳ Waiting 30s for DNS...')
  await new Promise(resolve => setTimeout(resolve, 30000))

  // 6. Add domain to project
  console.log('🔗 Adding domain to project...')
  await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: DOMAIN }),
  })
  console.log('✓ Domain configured')

  console.log('\n✅ Deployment complete!')
  console.log(`\n🌐 Your site: https://${DOMAIN}`)
  console.log('\nNext: Add Stripe keys + test payments')
}

deploy().catch(console.error)
```

---

## Environment Variables Setup

After deployment, add Stripe keys:

```bash
# Add to Vercel project
curl -X POST "https://api.vercel.com/v9/projects/${PROJECT_ID}/env" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "STRIPE_SECRET_KEY",
    "value": "sk_live_...",
    "type": "encrypted",
    "target": ["production"]
  }'
```

Or via UI: Vercel Dashboard → Project → Settings → Environment Variables

---

## Troubleshooting

**"Payment method required"**
- Add credit card: https://vercel.com/account/billing
- Domain costs $15, charged immediately

**"Deployment failed"**
- Check build logs: `vercel logs`
- Verify Next.js config: `next.config.js`
- Check dependencies: `npm install`

**"Domain not available"**
- Try alternatives: northstarsynergy.com, northstar.services
- Script will suggest alternatives automatically

**"SSL not provisioning"**
- Wait 10-15 minutes (Let's Encrypt takes time)
- Verify DNS: `nslookup northstar-synergy.dev`
- Check Vercel dashboard for errors

---

## Post-Deployment Checklist

- [ ] Site live at https://northstar-synergy.dev
- [ ] SSL certificate active (green lock in browser)
- [ ] Add live Stripe API keys
- [ ] Configure Stripe webhook URL
- [ ] Test payment flow with real card
- [ ] Set up Google Workspace (john@northstarsynergy.com)
- [ ] Configure Resend for receipts
- [ ] Update MEMORY.md with domain
- [ ] Start prospecting for first client

---

## Cost Summary

| Item | Cost | When Charged |
|------|------|--------------|
| Domain (.dev) | $15 | Immediately |
| Vercel hosting | Free | N/A |
| SSL certificate | Free | Auto |
| Bandwidth | Free | First 100GB |
| **TOTAL** | **$15** | **One-time** |

Annual renewal: $15/year (auto-renews)
