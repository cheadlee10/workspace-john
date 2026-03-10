# Premium V3 Wave 27 - Deployment Notes

Date: 2026-03-03
Wave Folder: `sites/premium-v3-wave27`

## Built Pages (highest-priority uncovered leads)
1. `hiller-plumbing-heating-cooling-electrical-nashville-tn` (est. $1120, outreach ID: `gpass-us-374`, tier: `P1`, score: 86, service: HVAC/Plumbing/Electrical)
2. `avidus-roofing-boston-ma` (est. $1160, outreach ID: `gpass-us-377`, tier: `P1`, score: 85, service: Roofing)
3. `fenwick-home-services-jacksonville-fl` (est. $1100, outreach ID: `gpass-us-379`, tier: `P1`, score: 84, service: HVAC/Plumbing/Electrical)
4. `precision-garage-door-of-san-antonio-san-antonio-tx` (est. $910, outreach ID: `gpass-us-373`, tier: `P1`, score: 84, service: Garage Door Repair)
5. `the-roof-clinic-charlotte-nc` (est. $1130, outreach ID: `gpass-us-380`, tier: `P1`, score: 83, service: Roofing)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: top P1 leads not already represented in prior premium waves, ranked by `priority_score` then `estimated_value`.
- Slug convention used: `client-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold quick callback form
- Core services section tailored by service vertical
- Detailed quote capture form with project-details textarea
- Contact reinforcement row with click-to-call and verified-email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler still needs final CRM ingest mapping and owner routing.
2. CTA click + form-submit analytics events are not embedded yet.
3. Production host aliases/routes for wave27 are not yet wired.
4. All five selected leads do not expose a public email in queue; page contact row uses `Email not publicly listed` to avoid fabricated placeholders.
