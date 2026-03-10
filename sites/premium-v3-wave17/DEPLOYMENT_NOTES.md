# Premium V3 Wave 17 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave17`

## Built Pages (highest-priority uncovered leads)
1. `a-abel-family-of-companies-columbus-oh` (est. $1100, outreach ID: `gpass-us-306`, tier: P1)
2. `ncwaterheaters-com-raleigh-nc` (est. $980, outreach ID: `gpass-us-327`, tier: P1)
3. `acura-roofing-inc-austin-tx` (est. $1080, outreach ID: `gpass-us-333`, tier: P1)
4. `charlotte-heating-air-charlotte-nc` (est. $1060, outreach ID: `gpass-us-304`, tier: P1)
5. `denver-fence-company-llc-denver-co` (est. $990, outreach ID: `gpass-us-328`, tier: P1)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: `priority_tier = P1`, then highest `priority_score`, then `estimated_value`, excluding leads represented in prior premium waves.
- Excluded as already covered in earlier premium waves: Frontier Landscaping, Greenscape Landscaping, 20/20 Exteriors, Salvador Roofing, Handyman Rescue Team, Forever Roofing.

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 service bullets)
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call + email links

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is still not wired for production routing (submission destination unresolved).
2. Analytics/event instrumentation is not embedded in these static pages (GA4/Meta/CAPI pending).
3. No deploy alias/route mapping committed yet for wave17 pages.
4. Offer/financing disclaimers and license-number trust badges still need client-specific legal review before live launch.
