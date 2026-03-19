# NorthStar Synergy - Restaurant Website Platform

## What This Is
SaaS restaurant website engine built by Craig (NorthStar Synergy). Turnkey restaurant websites with online ordering, SEO, reviews, contact forms — sold at $99-249/month per restaurant.

## Live & Deployed — READ CAREFULLY
- **WORKING URL**: https://northstar-restaurant-platform.vercel.app (THIS is the live site)
- **Demo restaurant**: "Sakura Kitchen" (Japanese, Woodinville WA) — visible at the URL above
- **Admin**: https://northstar-restaurant-platform.vercel.app/admin/login (credentials in Vercel env vars)
- **GitHub**: https://github.com/cheadlee10/northstar-restaurant-platform.git (master)
- **Git email for commits**: craigheadlee74@gmail.com
- **IMPORTANT**: northstarsynergy.org is NOT connected yet. The domain is referenced throughout the codebase as the future production URL, but it is NOT live and will return a 502 or error. The only working URL is the Vercel one above. Do NOT send Craig to northstarsynergy.org.

## Tech Stack
Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, jose (JWT), Square (payments), Stripe (billing), Resend (email), Twilio (SMS), Supabase (DB, with in-memory fallback)

## Craig's Rules
- Quality over speed. Compliance is paramount. "We cannot fuck this up."
- Automation is critical — Craig can't take CS calls
- Keep optimizing, keep improving
- Always commit with: Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

## Current Status (March 2026)
All 9 build phases complete. Security hardened (CSP, account lockout, 24hr sessions, HSTS). Accessibility audited. SEO optimized. See memory files for detailed architecture and audit status.

## Supabase — LIVE
- **Project ref**: huqqrxdkvikbjozotous (region: us-west-2)
- **All 12 tables created** (March 2026) — app auto-uses Supabase, no more in-memory resets
- Craig's Supabase login: GitHub OAuth via chead@me.com
- Schema: `schema.sql`, migration script: `scripts/setup-db.js`

## Other Remaining Items
1. Connect domain northstarsynergy.org to Vercel
2. Craig: LLC, EIN, bank, insurance, DMCA agent registration
3. Set `NEXT_PUBLIC_GA_ID` on Vercel when GA4 property is ready
