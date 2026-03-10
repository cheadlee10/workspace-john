# Premium V3 Wave 37 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave37

## Built Pages (highest-priority uncovered leads)
1. parker-and-sons-phoenix-az (est. $1080, outreach ID: gpass-us-400, tier: P1, score: 88, service: Plumbing/HVAC/Electrical)
2. michael-and-son-services-alexandria-va (est. $1080, outreach ID: gpass-us-423, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)
3. hiller-plumbing-heating-cooling-and-electrical-nashville-tn (est. $1120, outreach ID: gpass-us-374, tier: P1, score: 86, service: HVAC/Plumbing/Electrical)
4. bonney-plumbing-electrical-heating-and-air-sacramento-ca (est. $1090, outreach ID: gpass-us-409, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
5. len-the-plumber-heating-and-air-baltimore-md (est. $1040, outreach ID: gpass-us-424, tier: P1, score: 85, service: Plumbing/HVAC)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) and highest available scores not yet present in prior premium-v3 wave folders.
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
1. Public email is unavailable for 5/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave37 production domain/path wiring and deploy aliases remain pending deployment config.
5. Large-brand multi-location entities can create duplicate-variant risk in outreach queue; keep outreach linkage pinned to listed wave37 IDs.
