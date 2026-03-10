# Premium V3 Wave 26 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave26`

## Built Pages (highest-priority uncovered leads)
1. `dilling-heating-cooling-plumbing-electrical-charlotte-nc` (est. $1080, outreach ID: `gpass-us-368`, tier: `P1`, score: 88, service: HVAC/Plumbing/Electrical)
2. `boston-roofing-boston-ma` (est. $1180, outreach ID: `gpass-us-365`, tier: `P1`, score: 87, service: Roofing)
3. `greater-boston-roofing-boston-ma` (est. $1120, outreach ID: `gpass-us-366`, tier: `P1`, score: 85, service: Roofing)
4. `san-diego-pro-hadyman-services-san-diego-ca` (est. $860, outreach ID: `gpass-us-367`, tier: `P1`, score: 84, service: Handyman)
5. `brothers-air-heat-plumbing-charlotte-nc` (est. $1040, outreach ID: `gpass-us-372`, tier: `P1`, score: 83, service: HVAC/Plumbing)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: highest-priority P1 leads not already covered in prior premium wave folders, ranked by `priority_score` then `estimated_value`.
- Slug convention used: `client-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project-details textarea
- Contact reinforcement row with click-to-call + email

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler still needs final CRM ingest mapping and owner routing.
2. CTA click + form-submit analytics events are not embedded yet.
3. Production host aliases/routes for wave26 are not yet wired.
4. One selected lead has no verified email in queue (gpass-us-372); email CTA was intentionally omitted pending inbox enrichment.
