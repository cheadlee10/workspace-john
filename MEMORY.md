# MEMORY.md — John's Long-Term Memory (Compact)
*High-signal summary to prevent context overflow. Detailed history archived in `memory/MEMORY_ARCHIVE_2026-03-06.md` and daily logs in `memory/*.md`.*

## Core Goal
- Company target: **$4,000/week profit**
- John target: **$1,000+/month net revenue**, scaling aggressively

## Team + Roles
- Craig: CEO (final authority)
- Cliff: Ops/Delivery (`agent:main:main`)
- Scalper: Trading (`agent:scalper:main`)
- John: BizDev/Sales (`agent:john:main`)

## Brand Non-Negotiables
- Name: **NorthStar Synergy**
- Tagline: **Building Business Growth Through Intelligent Automation**
- Palette: Navy `#0F2340`, Gold `#D4A574`, Light Gray `#F8F9FA`, Dark Gray `#2C3E50`, White `#FFFFFF`
- Visual tone: enterprise-clean, confident, warm professional
- Assets: `website/logo.svg`, `website/BRAND_GUIDE.md`, `website/PITCH_DECK.md`

## Proven Business Learnings
- Speed to response is a major conversion lever (<2h strongly preferred)
- 3-tier pricing (Good/Better/Best) improves close rates
- Follow-ups drive a large share of closes
- Fiverr posting automation is not viable due to anti-bot controls; manual posting is the reliable path
- Show-don’t-tell outreach (custom demo site for prospect) is high-conversion

## Current Sales Motion
- Primary offer: website + automation services for small businesses
- Standard website offer seen in pipeline: **$250 one-time + $10/mo**
- Focus niche used recently: landscaping/home services without strong web presence

## Active Dependencies / Blockers (historical pattern)
- SMS outreach depends on compliant sender registration (Twilio/A2P + EIN workflow)
- Email automation depends on valid SMTP/app-password setup

## Operating Rules (Memory-Level)
- Prioritize revenue actions over analysis
- Log all pipeline changes in `leads.jsonl` and `jobs.jsonl`
- Keep client data local; never expose secrets in plaintext
- Record significant events in `memory/observations.md`

## Restaurant Platform (MAIN PRODUCT — LIVE)
The restaurant SaaS platform is the primary product. Full details: [memory/restaurant_platform.md](memory/restaurant_platform.md)
- **Live URL**: https://northstar-restaurant-platform.vercel.app (northstarsynergy.com NOT connected yet)
- **GitHub**: https://github.com/cheadlee10/northstar-restaurant-platform.git (master)
- **Tech**: Next.js 16+, React 19, TypeScript, Tailwind, Supabase, Square, Stripe
- **Supabase**: LIVE — project ref huqqrxdkvikbjozotous (us-west-2), all 12 tables created, DB password: NorthStar2026!db
- **Demo**: "Sakura Kitchen" (Japanese, Woodinville WA)
- **Admin**: /admin/login (admin@northstarsynergy.com, password in Vercel env vars)
- **Status**: All 9 build phases complete. Security hardened. Accessibility audited. SEO optimized.
- **Recent (March 8)**: Supabase integration, idempotency, mobile pricing fix, multi-tenant fixes, seed FK fix — all committed (d51317f) and deployed
- **Pricing**: $99-249/month per restaurant (3 tiers: starter/growth/pro)
- **Craig's rules**: Quality over speed, compliance paramount, always commit with Co-Authored-By: Claude Opus 4.6

## Where Full History Lives
- Archive snapshot: `memory/MEMORY_ARCHIVE_2026-03-06.md`
- Detailed day logs: `memory/2026-02-24.md`, `memory/2026-02-25.md`, `memory/2026-02-26.md`, etc.
- Strategy + patterns: `memory/KNOWLEDGE.md`, `memory/active_projects.md`, `memory/reflections.md`
- Restaurant platform details: `memory/restaurant_platform.md`
