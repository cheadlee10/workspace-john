# Premium V3 Wave 36 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave36

## Built Pages (highest-priority uncovered leads)
1. baker-brothers-plumbing-air-and-electrical-dallas-tx (est. $1080, outreach ID: gpass-us-431, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)
2. h-and-s-roofing-and-gutters-charlotte-nc (est. $1140, outreach ID: gpass-us-317, tier: P1, score: 86, service: Roofing/Gutters)
3. beacon-plumbing-heating-and-mechanical-seattle-wa (est. $1080, outreach ID: gpass-us-391, tier: P1, score: 86, service: Plumbing/HVAC)
4. lee-company-nashville-tn (est. $1050, outreach ID: gpass-us-430, tier: P1, score: 86, service: HVAC/Plumbing/Electrical)
5. handyman-rescue-team-seattle-wa (est. $900, outreach ID: gpass-pnw-213, tier: P1, score: 86, service: Handyman/Remodeling)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) and top available priority scores among uncovered leads, excluding outreach IDs already listed in prior premium-v3 wave deployment notes.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and secondary click-to-call CTA
- Above-the-fold quick callback form
- Service-specific core services section for each vertical
- Detailed quote form with project details capture
- Contact reinforcement row with verified phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public email is unavailable for 3/5 leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave36 production domain/path wiring and deploy aliases still pending deployment config.
5. Seattle market has existing similar-brand entries in prior waves; keep outreach linkage pinned to wave36 outreach IDs to avoid duplicate-send confusion.
