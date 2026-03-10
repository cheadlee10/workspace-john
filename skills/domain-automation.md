---
name: domain-automation
description: Automate domain registration, DNS configuration, and SSL setup via APIs. Use when programmatically managing domains for deployments without manual portal clicking.
---

# Domain Registration Automation

## API-Based Domain Registration

### Option 1: Vercel Domains API (Easiest)
Vercel provides domain registration + DNS + SSL in one API.

**Prerequisites:**
- Vercel account + API token
- Payment method on file

**Register Domain via API:**
```bash
curl -X POST "https://api.vercel.com/v5/domains" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy.dev"
  }'
```

**Check Availability First:**
```bash
curl "https://api.vercel.com/v4/domains/status?name=northstar-synergy.dev" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}"
```

Response:
```json
{
  "available": true,
  "price": 1500  // cents ($15)
}
```

**Purchase Domain:**
```bash
curl -X POST "https://api.vercel.com/v5/domains/buy" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy.dev",
    "expectedPrice": 1500
  }'
```

✅ **Result:** Domain registered + DNS auto-configured + SSL ready

---

### Option 2: Namecheap API
**Prerequisites:**
- Namecheap account
- API access enabled (requires 50+ domains or $50+ balance)
- Whitelist your IP

**Check Availability:**
```bash
curl "https://api.namecheap.com/xml.response?ApiUser=${USER}&ApiKey=${KEY}&UserName=${USER}&Command=namecheap.domains.check&ClientIp=${IP}&DomainList=northstar-synergy.dev"
```

**Register Domain:**
```bash
curl "https://api.namecheap.com/xml.response?ApiUser=${USER}&ApiKey=${KEY}&UserName=${USER}&Command=namecheap.domains.create&ClientIp=${IP}&DomainName=northstar-synergy.dev&Years=1"
```

⚠️ **Limitation:** Requires API access (not available to new accounts)

---

### Option 3: GoDaddy API
**Prerequisites:**
- GoDaddy account
- API key from developer.godaddy.com

**Check Availability:**
```bash
curl "https://api.godaddy.com/v1/domains/available?domain=northstar-synergy.dev" \
  -H "Authorization: sso-key ${KEY}:${SECRET}"
```

**Purchase Domain:**
```bash
curl -X POST "https://api.godaddy.com/v1/domains/purchase" \
  -H "Authorization: sso-key ${KEY}:${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "northstar-synergy.dev",
    "consent": {
      "agreedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
      "agreedBy": "198.51.100.0"
    },
    "contactAdmin": {...},
    "contactBilling": {...}
  }'
```

---

### Option 4: Cloudflare Registrar API
**Prerequisites:**
- Cloudflare account
- API token with Domain Registration permissions

**Check Availability:**
```bash
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/registrar/domains/northstar-synergy.dev/availability" \
  -H "Authorization: Bearer ${CF_TOKEN}"
```

**Register Domain:**
```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/registrar/domains" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "northstar-synergy.dev",
    "years": 1
  }'
```

✅ **Benefit:** At-cost pricing (no markup)

---

## DNS Configuration Automation

### Vercel DNS (if using Vercel Domains)
Auto-configured. No action needed.

### Cloudflare DNS API
```bash
# Add A record
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "A",
    "name": "@",
    "content": "76.76.21.21",  // Vercel IP
    "ttl": 1,
    "proxied": true
  }'

# Add CNAME for www
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "www",
    "content": "cname.vercel-dns.com",
    "ttl": 1,
    "proxied": true
  }'
```

---

## SSL Certificate Automation

### Vercel (Auto)
Vercel provisions SSL automatically via Let's Encrypt when domain is added.

### Manual via Certbot (if needed)
```bash
# Install certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --manual --preferred-challenges dns -d northstar-synergy.dev -d www.northstar-synergy.dev

# Add TXT record when prompted
# Certbot provides: _acme-challenge.northstar-synergy.dev TXT "randomstring"

# Certificate saved to:
# /etc/letsencrypt/live/northstar-synergy.dev/fullchain.pem
# /etc/letsorcrypt/live/northstar-synergy.dev/privkey.pem
```

---

## Complete Automation Script

```bash
#!/bin/bash
# Domain registration + DNS + SSL automation

DOMAIN="northstar-synergy.dev"
VERCEL_TOKEN="your-vercel-token"

# 1. Check availability
echo "Checking domain availability..."
AVAILABLE=$(curl -s "https://api.vercel.com/v4/domains/status?name=${DOMAIN}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" | jq -r '.available')

if [ "$AVAILABLE" != "true" ]; then
  echo "Domain not available"
  exit 1
fi

# 2. Purchase domain
echo "Purchasing domain..."
curl -X POST "https://api.vercel.com/v5/domains/buy" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"${DOMAIN}\", \"expectedPrice\": 1500}"

# 3. Wait for domain to be ready
sleep 30

# 4. Add domain to Vercel project
echo "Adding domain to project..."
PROJECT_ID="your-project-id"
curl -X POST "https://api.vercel.com/v9/projects/${PROJECT_ID}/domains" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"${DOMAIN}\"}"

# 5. Verify SSL provisioned
echo "Verifying SSL..."
curl -I "https://${DOMAIN}" | grep "HTTP/2 200"

echo "Domain setup complete: https://${DOMAIN}"
```

---

## Environment Variables Setup

Add to `.env.local`:
```bash
VERCEL_TOKEN=xxx
VERCEL_PROJECT_ID=xxx
VERCEL_TEAM_ID=xxx  # if using team
```

Get Vercel token:
1. Go to https://vercel.com/account/tokens
2. Create new token
3. Copy and save securely

---

## Integration with Deployment

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "vercel --prod",
    "setup-domain": "node scripts/setup-domain.js"
  }
}
```

Create `scripts/setup-domain.js`:
```javascript
const fetch = require('node-fetch')

const DOMAIN = 'northstar-synergy.dev'
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const PROJECT_ID = process.env.VERCEL_PROJECT_ID

async function setupDomain() {
  // Check availability
  const checkRes = await fetch(
    `https://api.vercel.com/v4/domains/status?name=${DOMAIN}`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  )
  const { available } = await checkRes.json()
  
  if (!available) {
    console.log('Domain not available')
    return
  }

  // Purchase
  await fetch('https://api.vercel.com/v5/domains/buy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: DOMAIN, expectedPrice: 1500 }),
  })

  console.log('Domain purchased:', DOMAIN)

  // Wait for DNS propagation
  await new Promise(resolve => setTimeout(resolve, 30000))

  // Add to project
  await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/domains`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: DOMAIN }),
  })

  console.log('Domain added to project')
  console.log('SSL will be provisioned in 5-10 minutes')
  console.log(`Visit: https://${DOMAIN}`)
}

setupDomain().catch(console.error)
```

Run:
```bash
npm run setup-domain
```

---

## Troubleshooting

**"Domain not available"**
- Check if already registered: `whois northstar-synergy.dev`
- Try alternative: northstarsynergy.com, northstar.services

**"Payment method required"**
- Add payment method to Vercel account
- Ensure sufficient funds for domain purchase

**"SSL not provisioning"**
- Wait 10-15 minutes for Let's Encrypt
- Check DNS propagation: `nslookup northstar-synergy.dev`
- Verify domain points to Vercel: should show cname.vercel-dns.com

**"API rate limit"**
- Vercel: 20 requests/10 seconds
- Wait and retry

---

## Cost Summary

| Registrar | .dev Domain | API Access | Renewal |
|-----------|-------------|------------|---------|
| Vercel | $15/year | Free | Auto |
| Namecheap | $12/year | $50 min balance | Manual |
| GoDaddy | $12/year | Free | Manual |
| Cloudflare | $9.15/year | Free | Auto |

**Recommended:** Vercel Domains ($15/year) for simplicity + auto-renewal + integrated SSL

---

## Security Best Practices

- Store API tokens in environment variables (never commit)
- Use scoped tokens (domain registration only, not full account)
- Enable 2FA on registrar account
- Set up domain lock (prevent unauthorized transfers)
- Configure DNSSEC (Cloudflare supports this)
- Monitor domain expiry (set calendar reminder)
