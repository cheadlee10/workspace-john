# NorthStar Synergy — Deployment Guide

## Quick Deploy Checklist

### 1. Supabase (Database)
- [ ] Create project at supabase.com
- [ ] Go to SQL Editor, paste contents of `supabase/schema.sql`, run it
- [ ] Copy Project URL and service_role key from Settings > API

### 2. Vercel (Hosting)
- [ ] Push repo to GitHub (private)
- [ ] Import project at vercel.com/new
- [ ] Framework: Next.js (auto-detected)
- [ ] Set all environment variables from `.env.example`
- [ ] Deploy

### 3. Domain
- [ ] Add custom domain in Vercel dashboard
- [ ] Update DNS: CNAME to `cname.vercel-dns.com`
- [ ] SSL auto-provisions

### 4. Square (Payment Processing)
- [ ] Create app at developer.squareup.com
- [ ] Get Application ID, Access Token, Location ID
- [ ] Add webhook endpoint: `https://yourdomain.com/api/webhooks/square`
- [ ] Subscribe to: `order.updated`, `payment.completed`

### 5. Stripe (SaaS Billing)
- [ ] Create account at stripe.com
- [ ] Create 3 products/prices: Starter ($99/mo), Growth ($149/mo), Pro ($249/mo)
- [ ] Copy price IDs to STRIPE_PRICE_STARTER/GROWTH/PRO
- [ ] Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Subscribe to: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

### 6. Resend (Email)
- [ ] Create account at resend.com
- [ ] Verify domain (northstarsynergy.com)
- [ ] Copy API key

### 7. Twilio (SMS — optional)
- [ ] Create account at twilio.com
- [ ] Get phone number, Account SID, Auth Token

### 8. Post-Deploy
- [ ] Change ADMIN_PASSWORD from default
- [ ] Set AUTH_SECRET to a random 32-char string
- [ ] Set CRON_SECRET for automated jobs
- [ ] Set DIGEST_RECIPIENT_EMAIL to your email
- [ ] Test login at yourdomain.com/admin/login
- [ ] Verify cron jobs run (check Vercel dashboard > Cron Jobs)

## Automated Jobs (via Vercel Cron)
- **Email sequences**: Daily at 9am UTC — processes pending outreach emails
- **Weekly digest**: Monday 9am UTC — generates business summary, emails it to you

## Architecture
- All features work without external services (in-memory + demo mode)
- Add env vars incrementally — each service activates when its vars are set
- No service is required to run the platform locally
