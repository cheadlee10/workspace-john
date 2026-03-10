# Premium V3 Wave 38 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave38

## Built Pages (highest-priority uncovered leads)
1. roto-rooter-plumbing-and-water-cleanup-seattle-seattle-wa (est. $1020, outreach ID: gpass-us-390, tier: P1, score: 88, service: Plumbing)
2. langer-roofing-and-sheet-metal-milwaukee-wi (est. $1150, outreach ID: gpass-us-285, tier: P1, score: 86, service: Roofing)
3. valley-landscape-spokane-inc-spokane-wa (est. $900, outreach ID: gpass-pnw-242, tier: P1, score: 86, service: Landscaping)
4. any-hour-services-orem-ut (est. $1060, outreach ID: gpass-us-408, tier: P1, score: 85, service: Plumbing/HVAC/Electrical)
5. radiant-plumbing-and-air-conditioning-austin-tx (est. $1010, outreach ID: gpass-us-398, tier: P1, score: 85, service: Plumbing/HVAC)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1), highest available scores, and slugs not already present in prior premium-v3 wave folders.
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
1. Public email is unavailable for 3/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave38 production domain/path wiring and deploy aliases remain pending deployment config.
5. Multi-location brand naming can create slug duplication risk (example: city repeated in business name + location); keep outreach ID linkage authoritative for this wave.
