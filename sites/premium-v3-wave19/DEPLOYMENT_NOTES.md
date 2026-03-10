# Premium V3 Wave 19 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave19`

## Built Pages (highest-priority uncovered leads)
1. `hd-roofing-and-repairs-austin-tx` (est. $1150, outreach ID: `gpass-us-289`, tier: `P1`, score: 87)
2. `elrod-fence-company-phoenix-az` (est. $980, outreach ID: `gpass-us-255`, tier: `P1`, score: 84)
3. `dallas-plumbing-pros-dallas-tx` (est. $980, outreach ID: `gpass-us-277`, tier: `P1`, score: 84)
4. `hometown-plumbing-pros-phoenix-az` (est. $970, outreach ID: `gpass-us-319`, tier: `P1`, score: 84)
5. `first-call-hvac-nashville-tn` (est. $970, outreach ID: `gpass-us-346`, tier: `P1`, score: 84)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: P1 leads not listed in `covered_slugs.txt` and not present as exact slug folders in prior premium waves, sorted by `priority_score` then `estimated_value`.
- Slug convention used: `client-city-state` (normalized, lowercase, hyphenated).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section with 4 service bullets
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call + email (or verification placeholder)

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is not yet wired to final CRM routing.
2. Analytics/event instrumentation (GA4/Meta/CAPI) not yet embedded.
3. Deploy aliases / route mappings for wave19 are not yet committed.
4. Dallas Plumbing Pros and Hometown Plumbing Pros are missing verified email addresses; email CTA left as verification placeholder.
5. Canonical slug reconciliation is still needed to prevent duplicate-coverage across older slug variants.