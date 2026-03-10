# Premium V3 Wave 44 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave44

## Built Pages (highest-priority uncovered leads)
1. garcia-s-landscaping-services-phoenix-az (est. $900, outreach ID: nosite-051, tier: P2, score: 72, service: Landscaping/Tree Services/Irrigation)
2. miami-cooling-miami-fl (est. $900, outreach ID: nosite-093, tier: P2, score: 72, service: HVAC/Air Duct Cleaning)
3. all-county-service-and-repair-miami-fl (est. $900, outreach ID: nosite-094, tier: P2, score: 71, service: HVAC)
4. hvac-denver-denver-co (est. $900, outreach ID: nosite-095, tier: P2, score: 70, service: HVAC)
5. enersave-hvac-denver-co (est. $900, outreach ID: nosite-096, tier: P2, score: 69, service: HVAC)

## Selection Notes
- Source files: leads.jsonl (`nosite-*` segment) cross-checked against existing `sites/` slugs.
- Queue file (`outreach_queue.jsonl`) currently has no uncovered candidates; all entries there are already represented in existing site folders.
- Selection criteria: highest estimated value uncovered leads remaining after wave43.
- Slug convention used: `business-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and secondary call action fallback handling
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project detail capture field
- Contact reinforcement row with non-fabricated contact handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = page slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Direct phone numbers are unavailable on all 5 selected leads; pages intentionally show `Phone not publicly listed`.
2. Public email unavailable for all 5 selected leads; pages intentionally show `Email not publicly listed`.
3. `/contact` intake backend routing (CRM owner assignment + notifications) remains pending final confirmation.
4. Analytics events for CTA clicks/form submits are still not embedded on-page.
5. Production deployment aliases and DNS/path mapping for wave44 are pending deploy config.
