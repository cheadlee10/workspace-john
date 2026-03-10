# Premium V3 Wave 42 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave42

## Built Pages (highest-priority uncovered leads)
1. houston-roofing-repairs-houston-tx (est. $1500, outreach ID: nosite-069, tier: P2, score: 79, service: Roofing)
2. mba-general-contracting-renton-wa (est. $1200, outreach ID: nosite-013, tier: P2, score: 76, service: General Contractor)
3. first-quality-builds-renton-wa (est. $1200, outreach ID: nosite-014, tier: P2, score: 75, service: Contractor)
4. vav-construction-services-renton-wa (est. $1200, outreach ID: nosite-015, tier: P2, score: 75, service: General Contractor)
5. aaa-contractors-kent-wa (est. $1200, outreach ID: nosite-030, tier: P2, score: 74, service: General Contractor)

## Selection Notes
- Source file: leads.jsonl (`nosite-*` segment)
- Selection criteria: highest estimated value uncovered leads not already present in existing `sites/` slugs.
- Slug convention used: `business-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and fallback secondary CTA handling
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project detail capture field
- Contact reinforcement row with non-fabricated contact handling

## Form Endpoint Convention
- All forms post to the current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = page slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Direct phone numbers are unavailable on 4 of 5 selected leads; pages intentionally show `Phone not publicly listed`.
2. Public email unavailable for all 5 selected leads; pages intentionally show `Email not publicly listed`.
3. `/contact` intake backend routing (CRM owner assignment + notifications) is still pending final confirmation.
4. Analytics events for CTA clicks/form submits are not yet embedded on-page.
5. Production deployment aliases and DNS/path mapping for wave42 are pending deploy config.
