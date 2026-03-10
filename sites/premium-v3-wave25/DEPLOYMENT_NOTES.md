# Premium V3 Wave 25 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave25`

## Built Pages (highest-priority uncovered leads)
1. `swift-fencing-co-birmingham-al` (est. $940, outreach ID: `gpass-us-361`, tier: `P1`, score: 87, service: Fencing)
2. `plumbing-today-llc-omaha-ne` (est. $980, outreach ID: `gpass-us-359`, tier: `P1`, score: 85, service: Plumbing)
3. `nevada-roofing-reno-nv` (est. $1120, outreach ID: `gpass-us-357`, tier: `P1`, score: 84, service: Roofing)
4. `local-electrician-pros-richmond-va` (est. $960, outreach ID: `gpass-us-363`, tier: `P1`, score: 84, service: Electrical)
5. `south-gate-fence-company-birmingham-al` (est. $930, outreach ID: `gpass-us-360`, tier: `P1`, score: 83, service: Fencing)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: top P1 leads not already represented in existing premium wave slugs/IDs, ranked by `priority_score` then `estimated_value`.
- Slug convention used: `client-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold quick callback form
- Core services section tailored by service vertical
- Detailed quote capture form with project-details textarea
- Contact reinforcement row with click-to-call + email

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler still needs final CRM ingest mapping and owner routing.
2. CTA click + form-submit analytics events are not embedded yet.
3. Production host aliases/routes for wave25 are not yet wired.
4. Two selected leads have no verified email in queue; fallback `service@<slug>.example` was used in demo contact block.
