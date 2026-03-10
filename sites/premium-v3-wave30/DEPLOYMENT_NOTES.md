# Premium V3 Wave 30 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave30

## Built Pages (highest-priority uncovered leads)
1. parker-sons-phoenix-az (est. $1080, outreach ID: gpass-us-400, tier: P1, score: 88, service: Plumbing/HVAC/Electrical)
2. mighty-dog-roofing-of-south-austin-austin-tx (est. $1120, outreach ID: gpass-us-397, tier: P1, score: 86, service: Roofing)
3. brothers-plumbing-heating-and-electric-denver-co (est. $1090, outreach ID: gpass-us-402, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
4. mr-electric-of-austin-austin-tx (est. $960, outreach ID: gpass-us-386, tier: P1, score: 86, service: Electrical)
5. valle-landscaping-phoenix-az (est. $900, outreach ID: nosite-103, tier: P1, score: 86, service: Landscaping)

## Selection Notes
- Source files: outreach_queue.jsonl (+ carryover nosite-* records present in queue).
- Selection criteria: highest-priority P1 leads not already represented in prior premium wave deployment notes.
- Slug convention used: client-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with dual CTA (Call + Get My Quote)
- Above-the-fold quick callback form
- Core services section tailored by service vertical
- Detailed quote capture form with project-details textarea
- Contact reinforcement row with click-to-call and verified-email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: /contact
- Hidden metadata fields on every form:
  - business = site slug
  - source = quick_callback or detailed_quote

## Known Blockers / Follow-ups
1. /contact backend handler still needs final CRM ingest mapping and owner routing.
2. CTA click + form-submit analytics events are not embedded yet.
3. Production host aliases/routes for wave30 are not yet wired.
4. 5 selected leads do not expose a verified public email in queue; pages use Email not publicly listed to avoid fabricated placeholders.
