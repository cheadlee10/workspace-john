# Premium V3 Wave 18 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave18`

## Built Pages (highest-priority uncovered leads)
1. `greenscape-landscaping-of-spokane-spokane-wa` (est. $850, outreach ID: `gpass-pnw-224`, tier: P1)
2. `nam-s-landscaping-llc-vancouver-wa` (est. $850, outreach ID: `gpass-wa-204`, tier: P1)
3. `charlotte-roofing-group-charlotte-nc` (est. $1180, outreach ID: `gpass-us-325`, tier: P1)
4. `crown-plumbing-greensboro-nc` (est. $990, outreach ID: `gpass-us-307`, tier: P1)
5. `pro-electric-kansas-city-ks` (est. $990, outreach ID: `gpass-us-336`, tier: P1)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: P1 leads not already represented in `covered_slugs.txt` and not present as exact slug folders in prior premium waves, then sorted by `priority_score` and `estimated_value`.
- Some high-score leads were excluded because they are already covered under earlier slug variants (city/state suffix differences).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section with 4 service bullets
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call + email (or verification placeholder)

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is not yet wired to final CRM routing.
2. Analytics/event instrumentation (GA4/Meta/CAPI) not yet embedded.
3. Deploy aliases / route mappings for wave18 not yet committed.
4. Charlotte Roofing Group contact email is missing in source data; email CTA left as verification placeholder.
5. Canonical slug reconciliation is still needed to avoid duplicate-coverage ambiguity across prior waves.