# Premium V3 Wave 28 - Deployment Notes

Date: 2026-03-03
Wave Folder: `sites/premium-v3-wave28`

## Built Pages (highest-priority uncovered leads)
1. `minuteman-plumbing-heating-cooling-cambridge-ma` (est. $1150, outreach ID: `gpass-us-381`, tier: `P1`, score: 90, service: Plumbing/HVAC)
2. `boston-roofing-natick-boston-ma` (est. $1180, outreach ID: `gpass-us-365`, tier: `P1`, score: 87, service: Roofing)
3. `small-jobs-electric-tampa-fl` (est. $980, outreach ID: `gpass-us-382`, tier: `P1`, score: 87, service: Electrical)
4. `frontier-landscaping-vancouver-wa` (est. $900, outreach ID: `gpass-wa-203`, tier: `P1`, score: 87, service: Landscaping)
5. `masterazscapes-phoenix-az` (est. $900, outreach ID: `nosite-106`, tier: `P1`, score: 87, service: Landscaping)

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
3. Production host aliases/routes for wave28 are not yet wired.
4. 3 selected lead(s) do not expose a public email in queue; page contact row uses `Email not publicly listed` to avoid fabricated placeholders.
