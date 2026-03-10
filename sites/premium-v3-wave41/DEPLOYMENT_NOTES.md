# Premium V3 Wave 41 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave41

## Built Pages (highest-priority uncovered leads)
1. forever-roofing-seattle-wa (est. $1200, outreach ID: gpass-pnw-214, tier: P1, score: 84, service: Roofing)
2. t-rock-roofing-and-contracting-dallas-tx (est. $1120, outreach ID: gpass-us-470, tier: P1, score: 86, service: Roofing)
3. h-e-parmer-company-nashville-tn (est. $1120, outreach ID: gpass-us-296, tier: P1, score: 84, service: Roofing)
4. evergreen-refrigeration-and-commercial-hvac-seattle-wa (est. $1080, outreach ID: gpass-us-476, tier: P1, score: 84, service: HVAC)
5. garrico-plumbing-raleigh-nc (est. $920, outreach ID: gpass-us-452, tier: P1, score: 85, service: Plumbing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: uncovered P1 leads with highest available priority score and estimated value, filtered against existing `sites/` slugs from prior waves.
- Slug convention used: `business-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and click-to-call secondary CTA
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project detail capture field
- Contact reinforcement row with validated phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to the current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = page slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public email unavailable for 3 of 5 selected leads; pages intentionally show `Email not publicly listed`.
2. `/contact` intake backend routing (CRM owner assignment + notifications) is still pending final confirmation.
3. Analytics events for CTA clicks/form submits are not yet embedded on-page.
4. Production deployment aliases and DNS/path mapping for wave41 are pending deploy config.
5. Several targets already have established websites; outreach positioning should frame this as a conversion landing-page add-on, not a full replacement.
