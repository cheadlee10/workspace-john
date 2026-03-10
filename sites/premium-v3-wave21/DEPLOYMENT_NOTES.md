# Premium V3 Wave 21 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave21`

## Built Pages (highest-priority uncovered leads selected this sprint)
1. `environment-west-landscape-services-spokane-wa` (outreach ID: `wa-google-005`, tier: `P1`, score: 89, est. $1,000)
2. `a1-handyman-boise-id` (outreach ID: `gpass-pnw-223`, tier: `P1`, score: 84, est. $700)
3. `donley-a-c-and-plumbing-phoenix-az` (outreach ID: `gpass-us-331`, tier: `P1`, score: 83, est. $1,120)
4. `bob-jenson-air-conditioning-heating-san-diego-ca` (outreach ID: `gpass-us-299`, tier: `P1`, score: 83, est. $1,080)
5. `alliance-plumbing-phoenix-az` (outreach ID: `gpass-us-320`, tier: `P1`, score: 83, est. $1,020)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Filter: `priority_tier = P1`
- Excluded leads already represented in prior premium-wave folders by matching/near-matching business slugs.
- Used current slug convention: `client-city-state` (normalized lowercase/hyphenated).

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section with 4 service bullets
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call and email fallback when available

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend routing is still not wired to final CRM destination.
2. Conversion tracking (GA4/Meta/CAPI) remains uninstalled across wave21 pages.
3. Domain alias mapping and DNS cutover are pending for all 5 demo slugs.
4. Coverage reconciliation still needed for historic slug variants to prevent accidental duplicate demos.
