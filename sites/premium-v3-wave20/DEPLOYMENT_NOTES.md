# Premium V3 Wave 20 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave20`

## Built Pages (highest-priority uncovered leads)
1. `aguilar-fence-inc-sacramento-ca` (est. $980, outreach ID: `gpass-us-286`, tier: `P1`, score: 84)
2. `xtreme-electric-kc-kansas-city-ks` (est. $970, outreach ID: `gpass-us-335`, tier: `P1`, score: 84)
3. `country-estate-fence-co-inc-anaheim-ca` (est. $960, outreach ID: `gpass-us-264`, tier: `P1`, score: 84)
4. `alpine-fence-co-seattle-wa` (est. $950, outreach ID: `gpass-pnw-243`, tier: `P1`, score: 84)
5. `green-leaf-landscaping-of-washington-battle-ground-wa` (est. $800, outreach ID: `gpass-pnw-207`, tier: `P1`, score: 84)

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
3. Deploy aliases / route mappings for wave20 are not yet committed.
4. Canonical slug reconciliation is still needed to prevent duplicate-coverage across older slug variants.