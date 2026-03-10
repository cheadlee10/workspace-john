# Premium V3 Wave 22 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave22`

## Built Pages (highest-priority uncovered leads)
1. `quality-construction-roofing-houston-tx` (est. $1500, outreach ID: `nosite-068`, tier: `P1`, score: 92)
2. `pmc-general-contractor-bellevue-wa` (est. $1200, outreach ID: `wa-google-002`, tier: `P1`, score: 92)
3. `divine-design-landscaping-phoenix-phoenix-az` (est. $920, outreach ID: `nosite-105`, tier: `P1`, score: 89)
4. `american-residential-hvac-las-vegas-nv` (est. $930, outreach ID: `nosite-108`, tier: `P1`, score: 88)
5. `jose-s-landscaping-phoenix-az` (est. $880, outreach ID: `nosite-104`, tier: `P1`, score: 85)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: P1 leads not represented by prior premium wave outreach IDs and not present as exact slug folders in prior premium waves, sorted by `priority_score` then `estimated_value`.
- Slug convention used: `client-city-state` (normalized, lowercase, hyphenated).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section with 4 service bullets
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call + email

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is not yet wired to final CRM routing.
2. Analytics/event instrumentation (GA4/Meta/CAPI) not yet embedded.
3. Deploy aliases / route mappings for wave22 are not yet committed.
4. Canonical slug reconciliation still needed; some top-score leads overlap semantically with earlier covered records but remain uncovered as exact slug IDs.
5. Several lead emails were unavailable in source data; placeholder role-based inboxes were used for demo contact rendering and should be replaced if verified.