# Premium V3 Wave 34 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave34

## Built Pages (highest-priority uncovered leads)
1. michael-son-services-alexandria-va (est. $1080, outreach ID: gpass-us-423, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)
2. horizon-services-wilmington-de (est. $1060, outreach ID: gpass-us-422, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
3. service-champions-brea-ca (est. $1050, outreach ID: gpass-us-429, tier: P1, score: 85, service: HVAC/Plumbing/Electrical)
4. len-the-plumber-heating-air-baltimore-md (est. $1040, outreach ID: gpass-us-424, tier: P1, score: 85, service: Plumbing/HVAC)
5. r-s-andrews-atlanta-ga (est. $1040, outreach ID: gpass-us-419, tier: P1, score: 85, service: Plumbing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) + top available priority scores among uncovered national home-service leads, excluding leads already covered in prior premium-v3 wave folders.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with clear primary CTA (Get My Quote) and secondary call CTA
- Above-the-fold quick callback form
- Service-specific core services section by trade vertical
- Detailed quote form with project-details textarea
- Contact reinforcement row with no fabricated email data

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public emails are missing/unverified for all five selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend still needs final CRM ingest mapping + owner routing confirmation.
3. CTA click and form-submit analytics events are not embedded yet.
4. Production domain/route wiring for wave34 pages is pending deployment configuration.
5. Pre-send QA should include final dedupe check against any ad-hoc non-wave site slugs before attaching links in outreach.
