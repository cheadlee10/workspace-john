---
name: domain-registration-dns
description: Register custom domains and configure DNS for Vercel deployments. Use when deploying websites to production and need custom branded URLs with HTTPS.
---

# Domain Registration & DNS Configuration

## Quick Start (5 min)

1. **Register domain** at Vercel Domains or Namecheap ($10-15/year)
2. **Configure Vercel DNS** (point domain → Vercel)
3. **Deploy website** (git push)
4. **Verify HTTPS** (auto via Vercel)

Done. Domain live in 5-30 minutes.

---

## Step 1: Register Domain

### Option A: Vercel Domains (Easiest)
- In Vercel dashboard: Project → Settings → Domains
- Click "Add Domain"
- Enter desired domain (e.g., john-services.dev)
- Vercel checks availability + handles registration + DNS automatically
- Cost: $12.99/year (renewal)
- Time to live: 5-10 minutes

✅ **Recommended** if budget allows (simplest, fast)

### Option B: Namecheap (Cheapest)
- Go to namecheap.com
- Search domain (e.g., john-services.dev)
- $8-12/year (find coupon for cheaper)
- Add to cart, checkout
- Get domain in email within minutes

### Option C: GoDaddy (Most Popular)
- godaddy.com → search domain
- $12-15/year (introductory)
- Add to cart, checkout
- Domain ready immediately

### Domain Name Tips
- `.dev` = professional, tech-focused ($15/yr, good for John Services)
- `.io` = startup vibes ($40/yr, overkill)
- `.com` = classic, trusted ($12/yr, if available)
- Avoid weird extensions (`.biz`, `.info` look spammy)

**For John Services:** Recommend `john-services.dev` (professional, memorable, matches brand)

---

## Step 2: Configure DNS (Point to Vercel)

### If Using Vercel Domains
- Vercel handles everything automatically
- Skip to Step 3

### If Using Namecheap / GoDaddy
1. Log into domain registrar (Namecheap / GoDaddy)
2. Go to DNS settings for your domain
3. Look for "Nameservers" or "DNS Management"
4. Replace with Vercel nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
5. Save changes
6. Wait 24-48 hours for DNS propagation (usually 10-30 min in practice)

### Alternative: CNAME Record (Faster, No Nameserver Change)
If you want to keep existing DNS registrar:
1. In Vercel dashboard: Project → Settings → Domains → Add Domain
2. Vercel gives you a CNAME record to add:
   ```
   CNAME:  your-domain.com  →  cname.vercel-dns.com
   ```
3. Go to domain registrar, add CNAME record
4. DNS live in 5-10 minutes (no 24hr wait)

✅ **Faster option** if nameserver change feels risky

---

## Step 3: Deploy Website to Vercel

### If Not Yet Deployed
1. Create GitHub repo: `john-services`
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git push origin main
   ```
3. In Vercel dashboard: "New Project" → Select repo
4. Vercel auto-detects Next.js
5. Click "Deploy"
6. Site live at `[project].vercel.app`

### Link Domain to Vercel Deployment
1. Vercel dashboard → Project → Settings → Domains
2. Enter domain name (e.g., john-services.dev)
3. Paste CNAME or confirm nameserver change
4. Click "Add"
5. Vercel auto-provisions HTTPS certificate

Done. Site now at https://john-services.dev (with green lock).

---

## Step 4: Verify HTTPS & DNS

```bash
# Check domain points to Vercel
nslookup john-services.dev

# Should show something like:
# Non-authoritative answer:
# john-services.dev  canonical name = cname.vercel-dns.com

# Check HTTPS is working
curl -I https://john-services.dev
# Should show: HTTP/2 200 and "Strict-Transport-Security" header
```

---

## Troubleshooting

### Domain Shows "Invalid Configuration"
**Cause:** DNS nameservers/CNAME not propagated yet
**Fix:** Wait 10-30 minutes, then refresh

### Domain Points to Old Site
**Cause:** Cached DNS records
**Fix:** 
- Clear browser cache (Ctrl+Shift+Del)
- Try incognito mode
- Or wait 15 minutes for DNS TTL to expire

### HTTPS Certificate Not Provisioning
**Cause:** DNS not fully configured yet
**Fix:** Wait 5-10 minutes after adding domain to Vercel

### Domain Works, But Www Subdomain Doesn't
**Cause:** Need separate DNS record for www
**Fix:** In Vercel → Add Domain again as `www.john-services.dev`

---

## Email Configuration (Optional, Post-Launch)

If you want email at your domain (john@john-services.dev):
1. Use free tier: Vercel + Mailgun (send-only)
2. Or paid: Google Workspace ($6/mo per user)
3. Configure MX records in DNS:
   ```
   MX: 10 smtp.google.com  (if using Google Workspace)
   ```

Not critical for initial launch.

---

## Cost Breakdown

| Item | Cost | Annual |
|------|------|--------|
| Domain (.dev) | $15 | $15 |
| Vercel Hosting | Free | Free* |
| HTTPS/SSL | Free (Vercel) | Free |
| Email (optional) | Free-$6/mo | $0-72 |
| **TOTAL** | **~$15** | **$15** |

*Vercel free tier: 100 deployments/month, unlimited bandwidth. More than enough for this site.

---

## Checklist Before Launch

- [ ] Domain registered (Vercel Domains or Namecheap)
- [ ] DNS configured (nameservers or CNAME pointing to Vercel)
- [ ] Website code pushed to GitHub
- [ ] Vercel project created + auto-deployed
- [ ] Domain added to Vercel dashboard
- [ ] HTTPS working (https://domain shows green lock)
- [ ] Environment variables configured (.env.local with Stripe keys)
- [ ] Stripe webhook URL updated (https://domain/api/webhooks/stripe)
- [ ] Test checkout flow with test card (4242 4242 4242 4242)
- [ ] Success page shows after payment

Once all checked, domain is live and payments are working.

---

## Automation (Optional)

Once domain is registered + deployed, you can automate DNS updates:
- GitHub Actions for auto-deploy on push (already done by Vercel)
- Cloudflare for additional DNS optimization (optional, can do later)
- MonitoringTools like Uptime Robot to ping domain (optional)

Not needed for MVP launch.
