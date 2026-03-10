# Premium V3 Wave 23 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave23`

## Built Pages (highest-priority uncovered leads)
1. `you-columbus-roofing-team-columbus-oh` (est. $1100, outreach ID: `gpass-us-301`, tier: `P1`, score: 84)
2. `ryan-hall-handyman-and-construction-services-llc-greater-portland-or` (est. $800, outreach ID: `gpass-pnw-232`, tier: `P1`, score: 84)
3. `spokane-roofing-company-liberty-lake-wa` (est. $1250, outreach ID: `gpass-pnw-248`, tier: `P1`, score: 83)
4. `austin-roofing-company-austin-tx` (est. $1020, outreach ID: `gpass-us-334`, tier: `P1`, score: 83)
5. `summit-handyman-denver-co` (est. $820, outreach ID: `gpass-us-256`, tier: `P1`, score: 83)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: highest-priority P1 leads not covered in existing premium waves by outreach ID or exact slug; ranked by `priority_score` then `estimated_value`.
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
1. `/contact` backend handler is still not mapped to final CRM ingest and lead-owner routing.
2. Analytics + conversion events are not yet embedded for form submits and CTA clicks.
3. Deployment aliases/routes for wave23 are not yet committed in the host routing layer.
4. Canonical lead de-duplication remains partial; semantic business-name overlaps may still exist.
5. Several remaining high-score leads in queue have missing/blank emails and will need verified inbox enrichment before outreach send.