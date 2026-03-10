# NorthStar Restaurant Platform — Complete Reference

## What It Is
SaaS restaurant website engine. Turnkey restaurant websites with online ordering, SEO, reviews, contact forms. Sold at $99-249/month per restaurant. This is the MAIN product Craig is building.

## Live URLs — CRITICAL
- **LIVE WORKING URL**: https://northstar-restaurant-platform.vercel.app (THIS works)
- **Demo restaurant**: "Sakura Kitchen" (Japanese, Woodinville WA) — visible at the URL above
- **Admin dashboard**: https://northstar-restaurant-platform.vercel.app/admin/login (credentials in Vercel env vars)
- **GitHub**: https://github.com/cheadlee10/northstar-restaurant-platform.git (master branch)
- **Git email for commits**: craigheadlee74@gmail.com
- **northstarsynergy.com is NOT connected yet** — domain not purchased/linked to Vercel. DO NOT tell Craig this URL works. The only working URL is the Vercel one above.

## Tech Stack
Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, jose (JWT), Square (payments), Stripe (billing), Resend (email), Twilio (SMS), Supabase (DB)

## Supabase — LIVE (as of March 2026)
- **Project ref**: huqqrxdkvikbjozotous (region: us-west-2)
- **All 12 tables created**: orders, leads, clients, restaurants, tickets, faqs, sops, sequences, enrollments, activities, expenses, revenues
- **Craig's Supabase login**: GitHub OAuth via chead@me.com
- **DB password**: NorthStar2026!db
- **Pooler host**: aws-0-us-west-2.pooler.supabase.com (port 6543 transaction, 5432 session)
- **Pooler user**: postgres.huqqrxdkvikbjozotous
- **Schema file**: `schema.sql` in project root
- **Migration script**: `scripts/setup-db.js` (usage: `node scripts/setup-db.js YOUR_DB_PASSWORD`)
- **All store files have graceful PGRST205 fallback**: if Supabase tables don't exist, app falls back to in-memory storage automatically

## What's Built (ALL complete and deployed)

### Customer-facing
- Restaurant homepage (hero, menu, reviews, about, contact, map)
- 19 individual dish SEO pages with JSON-LD schema + breadcrumbs
- Online ordering checkout flow (cart -> details -> payment -> confirmation)
- Order tracking page with live polling
- QR code dine-in ordering (/order-here?table=N)
- Help center with searchable FAQs + ticket submission
- Pricing page with 3 tiers + comparison table

### Admin dashboard (9 pages, all auth-protected)
- Business dashboard (MRR, pipeline, activity feed)
- CRM pipeline (6-stage Kanban board)
- Client portfolio (health monitoring, plan tracking)
- P&L / Finance (revenue by client, expenses, monthly trend)
- Order management (live order queue, status updates)
- Email outreach (sequences, enrollment processing)
- Customer support (tickets with auto-response, FAQ management)
- Site management (multi-tenant, create new restaurant sites)
- Weekly digest (generate + email business summary)

### Integrations
- **Square**: Web Payments SDK for ordering, webhook verification (HMAC-SHA256)
- **Stripe**: SaaS billing (checkout sessions, billing portal, webhooks for subscription lifecycle)
- **Resend**: Transactional email (order confirmations, support responses, digest)
- **Twilio**: SMS order notifications
- **Google Analytics**: Cookie-consent gated, lazy-loaded

## Auth & Security
- JWT via jose, httpOnly cookie "ns-session", 24-hour sessions, HS256
- Admin login: admin@northstarsynergy.com (password in Vercel env vars)
- Account lockout (5 failed attempts -> 15min lock)
- CSP headers, HSTS, rate limiting (auth 10/min, orders 10/min)
- Timing-safe password comparison, input sanitization, server-side price recalculation
- HMAC-SHA256 webhook verification (Square + Stripe)

## Compliance
- Privacy Policy (CCPA, GDPR) at /legal/privacy
- Terms of Service (arbitration, DMCA, data portability) at /legal/terms
- Cookie consent banner gates GA
- CAN-SPAM compliant (physical address, /unsubscribe/[id])
- robots.txt, sitemap.xml, structured data (Organization, FAQ, Restaurant, MenuItem, BreadcrumbList)

## Brand
- Color: Deep Teal #0f766e
- Hero: Dark gradient (gray-900 to teal-950) with white/teal text
- Headline: "We build websites that turn hungry visitors into paying customers"

## Key Architecture Details
- 22 API routes
- Middleware auth + security headers
- All 9 data stores support Supabase with in-memory fallback
- Idempotency protection on order creation (5-min TTL cache)
- Store files: order-store.ts, lead-store.ts, client-store.ts, ticket-store.ts, faq-store.ts, sequence-store.ts, activity-store.ts, restaurant-store.ts, pnl-store.ts

## Recently Completed (March 9, 2026)
- API hardening: auth on PATCH /api/orders/[id], input length limits on 6 routes, slug regex, Cache-Control on admin GETs, error logging
- Checkout inline validation: email, phone, address, custom tip with aria-invalid/aria-describedby
- Dashboard: Promise.all() parallelization (was 5 sequential awaits)
- Pipeline: search debounced 300ms
- Skeleton loading: 6 admin pages (orders, pipeline, clients, support, digest, finance)
- Font display: swap, Stripe webhook HMAC-SHA256, React.memo on MenuItemCard, hero logo priority
- Accessibility: aria-live on OrderTracker, role="alert" on form errors, replaced alert() with UI banner
- Code quality: 14 console.log → console.warn
- All committed (0053913) and deployed to Vercel

## Previously Completed (March 8, 2026)
- All 9 stores have PGRST205 graceful fallback (globalThis-based schema flag for Turbopack)
- Idempotency on order creation (5-min TTL cache, client sends crypto.randomUUID())
- Pricing table mobile responsiveness fixed (responsive padding, hidden columns on small screens)
- Admin orders page: dynamic restaurant selector from /api/sites (replaces hardcoded demo ID)
- Sitemap + menu SEO pages now use getAllRestaurants() for multi-tenant support
- Seed FK constraint fixed: seedFinancials uses real client IDs from createClient()
- Seed wrapped in try-catch so failures are non-fatal (won't crash builds)
- All changes committed (d51317f) and pushed to master → auto-deploys on Vercel

## Remaining Items
1. Connect domain northstarsynergy.com to Vercel (Craig must purchase/link)
2. Craig: LLC, EIN, bank, insurance, DMCA agent registration ($6)
3. Set NEXT_PUBLIC_GA_ID on Vercel when GA4 property is ready
4. Google Places API for restaurant lead scraping (needs Google Cloud API key with billing enabled)

## Craig's Rules
- Quality over speed. Compliance is paramount. "We cannot fuck this up."
- Automation is critical — Craig can't take CS calls
- Keep optimizing, keep improving
- Always commit with: Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
