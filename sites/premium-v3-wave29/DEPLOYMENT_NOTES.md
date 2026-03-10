# Premium V3 Wave 29 - Deployment Notes

Date: 2026-03-03
Wave Folder: `sites/premium-v3-wave29`

## Built Pages (highest-priority uncovered leads)
1. `roto-rooter-plumbing-water-cleanup-seattle-seattle-wa` (est. $1020, outreach ID: `gpass-us-390`, tier: `P1`, score: 88, service: Plumbing)
2. `gene-johnson-plumbing-heating-cooling-electrical-seattle-wa` (est. $1120, outreach ID: `gpass-us-392`, tier: `P1`, score: 87, service: Plumbing/HVAC/Electrical)
3. `20-20-exteriors-spokane-wa` (est. $1200, outreach ID: `gpass-pnw-238`, tier: `P1`, score: 86, service: Roofing/Exteriors)
4. `salvador-roofing-tucson-az` (est. $1150, outreach ID: `gpass-us-253`, tier: `P1`, score: 86, service: Roofing)
5. `beacon-plumbing-heating-mechanical-seattle-wa` (est. $1080, outreach ID: `gpass-us-391`, tier: `P1`, score: 86, service: Plumbing/HVAC)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: highest-priority P1 leads not already covered in existing premium wave folders/slugs.
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
3. Production host aliases/routes for wave29 are not yet wired.
4. 3 selected lead(s) do not expose a public email in queue; page contact row uses `Email not publicly listed` to avoid fabricated placeholders.
