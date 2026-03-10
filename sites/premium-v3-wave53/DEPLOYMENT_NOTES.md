# Premium V3 Wave 53 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave53`
Pages built: 5

## Included demos
1. `drain-pros-phoenix-az` (wave4-057)
2. `plumbing-response-team-phoenix-az` (wave4-060)
3. `plumber-of-phoenix-phoenix-az` (wave4-058)
4. `az-emergency-plumbing-san-tan-valley-az` (wave4-061)
5. `the-plumber-phoenix-az` (wave4-063)

## Selection rationale
- Chosen as highest-intent uncovered leads from latest `leads.jsonl` additions marked as high-intent plumbing/emergency service opportunities.
- Prioritized strongest estimated value and emergency-response intent where fast callback/quote funnels convert best.

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm lead routing/notification maps new business slugs to outreach records.
- Smoke test both forms per page after deploy.

## Blockers / risks
- Static artifacts only; no live endpoint integration test performed in this build pass.
