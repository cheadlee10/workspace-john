# Premium V3 Wave 31 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave31

## Built Pages (highest-priority uncovered leads)
1. colorados-best-fence-company-denver-co (est. $980, outreach ID: NS064, tier: P1, score: priority 1, service: Fencing)
2. joes-appliance-repair-lv-las-vegas-nv (est. $1020, outreach ID: NS033, tier: P1, score: priority 1, service: Appliance Repair)
3. one-pro-handyman-40-years-exp-houston-tx (est. $960, outreach ID: NS050, tier: P1, score: priority 1, service: Handyman/Roofing)
4. license-dfw-pest-control-dallas-tx (est. $890, outreach ID: NS041, tier: P2, score: priority 2, service: Pest Control)
5. dunn-rite-roofing-houston-tx (est. $940, outreach ID: NS044, tier: P2, score: priority 2, service: Roofing)

## Selection Notes
- Source file: nosite_top20_leads.jsonl (remaining highest-priority records not yet built with city-state slug convention).
- Selection criteria: priority value (1 then 2), then strongest longevity/value signals from notes.
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
1. Two leads have no published phone in source record; those pages intentionally show "Phone verification pending" and quote-first CTA.
2. /contact backend handler still needs final CRM ingest mapping and owner routing.
3. CTA click + form-submit analytics events are not embedded yet.
4. Production host aliases/routes for wave31 are not yet wired.
5. Public email addresses unavailable for all five leads; pages correctly show "Email not publicly listed" to avoid fabrication.
