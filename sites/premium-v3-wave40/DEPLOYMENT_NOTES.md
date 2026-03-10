# Premium V3 Wave 40 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave40

## Built Pages (highest-priority uncovered leads)
1. gene-johnson-plumbing-seattle-wa (est. $1010, outreach ID: gpass-us-414, tier: P1, score: 85, service: Plumbing)
2. mister-sparky-of-denver-denver-co (est. $970, outreach ID: gpass-us-387, tier: P1, score: 85, service: Electrical)
3. las-vegas-electrician-pros-las-vegas-nv (est. $950, outreach ID: gpass-us-306, tier: P1, score: 85, service: Electrical)
4. weather-roofing-charlotte-nc (est. $950, outreach ID: gpass-us-460, tier: P1, score: 85, service: Roofing)
5. 512-plumbing-austin-tx (est. $930, outreach ID: gpass-us-454, tier: P1, score: 85, service: Plumbing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1), highest available scores/value, and slugs not already present in prior premium-v3 wave folders.
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
1. Public email is unavailable for 4/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave40 production domain/path wiring and deploy aliases remain pending deployment config.
5. Some selected brands have strong existing sites (e.g., franchise/multi-location operators); demo pages remain valid as conversion-focused alternate landing concepts, but offer positioning should emphasize speed-to-lead gains over "new website" replacement.
