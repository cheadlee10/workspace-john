# Premium V3 Wave 24 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave24`

## Built Pages (highest-priority uncovered leads)
1. `premier-plumbers-of-texas-caddo-mills-tx` (est. $990, outreach ID: `gpass-us-350`, tier: `P1`, score: 85)
2. `legacy-plumbing-dallas-tx` (est. $1060, outreach ID: `gpass-us-349`, tier: `P1`, score: 84)
3. `dna-plumbing-heating-and-air-plano-tx` (est. $1020, outreach ID: `gpass-us-351`, tier: `P1`, score: 84)
4. `az-dc-electric-scottsdale-az` (est. $970, outreach ID: `gpass-us-356`, tier: `P1`, score: 83)
5. `handy-andy-the-handyman-llc-kirkland-wa` (est. $800, outreach ID: `gpass-pnw-246`, tier: `P1`, score: 83)

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
3. Deployment aliases/routes for wave24 are not yet committed in the host routing layer.
4. Canonical lead de-duplication remains partial; semantic business-name overlaps may still exist.
5. Three selected leads have missing verified emails in queue; placeholder service emails were used in demo contact blocks pending enrichment.