# Stripe Payment Setup — NorthStar Synergy

## Current Status
⚠️ **Test mode only** — Placeholder keys in `.env.local`

## What's Needed

### 1. Stripe Account
- Sign up at https://stripe.com
- Business name: **NorthStar Synergy**
- Business type: LLC or Sole Proprietorship
- Tax ID (EIN or SSN)
- Bank account for payouts

### 2. API Keys (Test Mode First)
Once Stripe account created:

1. Go to Stripe Dashboard → Developers → API Keys
2. Copy **Publishable key** (starts with `pk_test_`)
3. Copy **Secret key** (starts with `sk_test_`)
4. Update `.env.local`:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### 3. Test Payment Flow
```bash
cd website
npm install
npm run dev
```

Visit http://localhost:3000:
- Click "Get Started" on any service
- Enter email
- Click "Continue to Payment"
- Use test card: **4242 4242 4242 4242**
- Any future date, any CVC
- Should redirect to success page

Check `jobs.jsonl` — payment should be logged.

### 4. Webhook Setup (Critical for Production)
Webhooks notify our server when payments complete.

**Local Testing:**
```bash
# Install Stripe CLI
npm install -g stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (starts with `whsec_`) → add to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Production:**
1. Deploy site to Vercel
2. In Stripe Dashboard → Developers → Webhooks → Add endpoint
3. Endpoint URL: `https://northstar-synergy.dev/api/webhooks/stripe`
4. Events to listen for: `checkout.session.completed`
5. Copy signing secret → add to Vercel environment variables

### 5. Go Live (After Testing)
Once test mode works:

1. Stripe Dashboard → top-right toggle → Switch to **Live mode**
2. Copy **live** API keys (start with `pk_live_` and `sk_live_`)
3. Update production `.env` in Vercel:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_... (from production webhook)
   NEXT_PUBLIC_SITE_URL=https://northstar-synergy.dev
   ```
4. Redeploy site
5. Test with real card (yours)
6. Confirm payment shows in Stripe Dashboard → Payments

---

## Payment Flow (How It Works)

1. **User clicks "Get Started"** → `/checkout?service=excel&tier=pro`
2. **Frontend calls API** → `POST /api/checkout` with service + tier
3. **Backend creates Stripe session** → Returns session ID
4. **Frontend redirects** → Stripe Checkout (hosted by Stripe)
5. **User enters card** → Stripe processes payment
6. **Stripe fires webhook** → `POST /api/webhooks/stripe`
7. **Webhook logs job** → Appends to `jobs.jsonl`
8. **Redirect to success** → `/success?session_id=...`

Entire flow is automated. No manual invoicing.

---

## Security Checklist

✅ API keys stored in `.env` (never in code)
✅ Webhook signature verified (prevents fake events)
✅ HTTPS enforced (Vercel does this automatically)
✅ No raw card data stored (Stripe handles PCI compliance)
✅ Rate limiting on checkout API (prevent abuse)

---

## Cost Structure

| Item | Cost |
|------|------|
| Stripe account | Free |
| Transaction fee | 2.9% + $0.30 per charge |
| Monthly fee | $0 (pay-as-you-go) |

Example: $500 sale = $15.20 fee → $484.80 net

---

## Testing Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Card declined |
| 4000 0000 0000 9995 | ❌ Insufficient funds |
| 4000 0025 0000 3155 | 🔐 Requires authentication |

Use any future expiry date + any 3-digit CVC.

---

## Current Gaps

❌ No live Stripe account yet
❌ No webhook configured
❌ No production API keys
❌ No email confirmations on payment (SendGrid needed)

**Next steps:**
1. Create Stripe account
2. Get test API keys
3. Test full payment flow locally
4. Set up webhook
5. Deploy to production with live keys
