# Premium V3 Wave 15 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave15`

## Built Pages (highest-priority uncovered leads)
1. `h-s-roofing-and-gutters-charlotte-nc` (est. $1140, outreach ID: `gpass-us-317`, tier: P1)
2. `frank-gay-services-orlando-fl` (est. $1120, outreach ID: `gpass-us-315`, tier: P1)
3. `community-electric-llc-atlanta-ga` (est. $960, outreach ID: `gpass-us-279`, tier: P1)
4. `america-fence-company-lawrenceville-ga` (est. $980, outreach ID: `gpass-us-263`, tier: P1)
5. `texas-electric-and-light-austin-tx` (est. $940, outreach ID: `gpass-us-281`, tier: P1)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: `priority_tier = P1`, then higher `priority_score`, with tie-breaker on `estimated_value`.
- Excluded previously-covered wave slugs and clients already represented in recent premium waves.

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 service bullets)
- Detailed quote capture form with project details textarea
- Contact reinforcement with click-to-call (+ email where available)

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is still not wired for production (submission destination unresolved).
2. No analytics/event instrumentation bundled in these static pages (GA4/Meta/CAPI absent).
3. No deploy alias/route mapping committed yet for this wave.
4. `outreach_queue.jsonl` contains duplicate IDs in later rows (example: `gpass-us-304`, `gpass-us-306`), which can cause ambiguous sorting/selection if ID uniqueness is assumed.
