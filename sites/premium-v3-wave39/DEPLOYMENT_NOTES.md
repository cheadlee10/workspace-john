# Premium V3 Wave 39 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave39

## Built Pages (highest-priority uncovered leads)
1. abco-roofing-nashville-tn (est. $1150, outreach ID: gpass-us-295, tier: P1, score: 86, service: Roofing)
2. courtesy-plumbing-san-diego-ca (est. $980, outreach ID: gpass-us-300, tier: P1, score: 86, service: Plumbing)
3. quicks-hvac-raleigh-nc (est. $1040, outreach ID: gpass-us-299, tier: P1, score: 85, service: HVAC)
4. acme-electrical-services-tampa-fl (est. $990, outreach ID: gpass-us-383, tier: P1, score: 85, service: Electrical)
5. atlanta-plumbing-and-drain-atlanta-ga (est. $990, outreach ID: gpass-us-321, tier: P1, score: 85, service: Plumbing)

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
1. Public email is unavailable for 2/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave39 production domain/path wiring and deploy aliases remain pending deployment config.
5. Multi-location/variant brand records in outreach queue may still produce near-duplicate targets; maintain outreach ID linkage as source of truth.
