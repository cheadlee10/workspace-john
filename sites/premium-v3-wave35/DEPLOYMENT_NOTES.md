# Premium V3 Wave 35 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave35

## Built Pages (highest-priority uncovered leads)
1. quality-construction-and-roofing-houston-tx (est. $1500, outreach ID: nosite-068, tier: P1, score: 92, service: General Contractor/Roofing)
2. minuteman-plumbing-heating-and-cooling-cambridge-ma (est. $1150, outreach ID: gpass-us-381, tier: P1, score: 90, service: Plumbing/HVAC)
3. dilling-heating-cooling-plumbing-and-electrical-charlotte-nc (est. $1080, outreach ID: gpass-us-368, tier: P1, score: 88, service: HVAC/Plumbing/Electrical)
4. roto-rooter-plumbing-and-water-cleanup-seattle-wa (est. $1020, outreach ID: gpass-us-390, tier: P1, score: 88, service: Plumbing)
5. gene-johnson-plumbing-heating-cooling-and-electrical-seattle-wa (est. $1120, outreach ID: gpass-us-392, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) + top available priority scores among uncovered leads, excluding outreach IDs already listed in prior premium-v3 wave deployment notes.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with clear primary CTA (Get My Quote) and secondary call CTA
- Above-the-fold quick callback form
- Service-specific core services section by trade vertical
- Detailed quote form with project-details textarea
- Contact reinforcement row with verified phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public emails are missing/unverified for 4 of 5 selected leads; those pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend still needs final CRM ingest mapping + owner routing confirmation.
3. CTA click and form-submit analytics events are not embedded yet.
4. Production domain/route wiring for wave35 pages is pending deployment configuration.
5. Duplicate-brand risk: Gene Johnson appears in multiple lead variants in outreach data; keep outreach link assignment locked to specific wave35 slug to avoid cross-send confusion.
