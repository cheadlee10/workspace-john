# Premium V3 Wave 32 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave32

## Built Pages (highest-priority uncovered leads)
1. bennett-homes-renton-wa (est. $1500, outreach ID: nosite-017, priority signal: highest estimated value in uncovered set, service: General Contractor)
2. roofers4u-houston-tx (est. $1500, outreach ID: nosite-067, priority signal: highest estimated value in uncovered set, service: Roofing)
3. houston-roofing-contractor-houston-tx (est. $1500, outreach ID: nosite-070, priority signal: highest estimated value in uncovered set, service: Roofing)
4. jp-roofing-n-gutters-houston-tx (est. $1500, outreach ID: nosite-071, priority signal: highest estimated value in uncovered set, service: Roofing/Gutters)
5. j-r-jones-roofing-houston-tx (est. $1500, outreach ID: nosite-072, priority signal: highest estimated value in uncovered set, service: Roofing)

## Selection Notes
- Source: leads.jsonl (nosite records), filtered for highest estimated_value and checked against existing `sites/premium-v3-wave*` slugs to avoid already-covered leads.
- Previous waves already covered the legacy `nosite_top20_leads.jsonl` shortlist; this wave advances additional high-value uncovered records.
- Slug convention used: business-name-city-state (lowercase, hyphenated).

## Conversion Structure Included
- Hero section with clear CTA (Call when verified, otherwise quote-first CTA)
- Quick callback form above the fold
- Service-specific core services section
- Detailed quote form with project-detail capture
- Contact reinforcement row with no fabricated email/phone data

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. 5/5 selected leads have missing/unverified public phone values in `leads.jsonl`; pages intentionally show `Phone verification pending` and quote-first CTA.
2. No public email addresses available; pages correctly display `Email not publicly listed`.
3. `/contact` intake backend still requires final CRM mapping and owner routing verification for production use.
4. Event instrumentation for CTA click + form submit is still not embedded.
5. Domain/route wiring for wave32 pages is pending deployment configuration.
