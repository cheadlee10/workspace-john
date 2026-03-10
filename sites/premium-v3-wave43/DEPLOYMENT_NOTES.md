# Premium V3 Wave 43 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave43

## Built Pages (highest-priority uncovered leads)
1. regal-roofing-contracting-seattle-wa (est. $1500, outreach ID: nosite-037, tier: P2, score: 78, service: Roofing & Exterior Contracting)
2. tt-t-general-contractor-renton-wa (est. $1200, outreach ID: nosite-016, tier: P2, score: 76, service: General Contracting)
3. ou-construction-kirkland-wa (est. $1000, outreach ID: nosite-011, tier: P2, score: 74, service: Construction & Handyman)
4. seattle-remodeling-handyman-pro-s-seattle-wa (est. $1000, outreach ID: nosite-047, tier: P2, score: 73, service: Remodeling & Handyman)
5. abc-nursery-and-landscaping-auburn-wa (est. $900, outreach ID: nosite-029, tier: P2, score: 72, service: Landscaping & Nursery)

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
5. Production deployment aliases and DNS/path mapping for wave43 are pending deploy config.
