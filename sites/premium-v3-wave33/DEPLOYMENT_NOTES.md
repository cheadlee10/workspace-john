# Premium V3 Wave 33 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave33

## Built Pages (highest-priority uncovered leads)
1. morris-jenkins-charlotte-nc (est. $1100, outreach ID: gpass-us-407, tier: P1, score: 88, service: Plumbing/HVAC/Electrical)
2. ars-rescue-rooter-dallas-dallas-tx (est. $1080, outreach ID: gpass-us-405, tier: P1, score: 87, service: Plumbing/HVAC)
3. bonney-plumbing-electrical-heating-air-sacramento-ca (est. $1090, outreach ID: gpass-us-409, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
4. schick-roofing-orlando-fl (est. $1060, outreach ID: gpass-us-415, tier: P1, score: 86, service: Roofing)
5. roofing-experts-denver-co (est. $1090, outreach ID: gpass-us-396, tier: P1, score: 85, service: Roofing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest priority tier (P1), then descending priority_score, excluding leads already covered by prior premium-v3 wave folders.
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
1. Public email addresses were unavailable/unverified for all five selected leads; pages show `Email not publicly listed`.
2. `/contact` intake backend still needs final CRM ingest mapping + owner routing confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Production domain/route wiring for wave33 pages is pending deployment configuration.
5. If strict duplicate suppression requires outreach-ID-level dedupe (not slug-level), run cross-check before bulk outreach attach.
