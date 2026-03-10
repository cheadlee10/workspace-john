# NOSITE OUTREACH PLAYBOOK v1.0
## NorthStar Synergy — Autonomous Website Sales Engine

### Pipeline Stages
1. DISCOVER (Google Places API → businesses without websites)
2. BUILD (Template engine → custom demo site in 90 min)
3. PITCH (Short visual email → live demo link)
4. FOLLOW (Day 1, Day 5, Day 10 → 3 touches max)
5. CLOSE ($0 down + $99-299/mo hosting)

### Email Template (TIER 2 — DO IT AND NOTIFY)
```
Subject: {{BUSINESS_NAME}} — We built you a website

[Hero: screenshot of their live demo]

Hi {{OWNER_NAME}},

{{ONE_SENTENCE_WHAT_WE_BUILT}}

{{ONE_SENTENCE_KEY_FEATURE}}

{{DATA_POINT}} (e.g., 76% of consumers look up businesses online first)

{{PRICING}} ($0 down, $99/mo hosting)

[CTA: See Your Website Live → {{LIVE_URL}}]

—
John | NorthStar Synergy
```

### Pricing Tiers
- Starter: $0 down + $99/mo (5-page site + updates)
- Professional: $0 down + $199/mo (full site + SEO + GBP)
- Premium: $0 down + $299/mo (everything + dashboard + priority)

### Log Format (leads.jsonl)
{"id":"lead-XXX","date":"YYYY-MM-DD","source":"GooglePlaces","business":"{{NAME}}","service":"Website + Hosting","mrr_potential":99,"status":"demo_sent","demo_url":"{{URL}}"}

### Lead Criteria
- Local service business (landscaping, cleaning, contractor, home services)
- No website OR outdated website (pre-2020 design)
- Phone number available
- Operating 2+ years (established)

### Execution Notes
- Build demo site FIRST, then send email (not vice versa)
- Hero screenshot MUST be real (not placeholder)
- Message ID required on every email claim
- 3 touches max per lead, then move on
