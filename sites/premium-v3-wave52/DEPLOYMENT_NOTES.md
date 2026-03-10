# Premium V3 Wave 52 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave52`
Pages built: 5

## Included demos
1. `asap-auto-repair-austin-austin-tx` (NS016)
2. `orlando-lawn-mowing-today-orlando-fl` (NS069)
3. `affordable-lawn-care-orlando-orlando-fl` (NS070)
4. `tams-cleaning-solutions-chicago-il` (NS011)
5. `lorena-house-cleaner-san-diego-san-diego-ca` (NS052)

## Selection rationale
- Chosen from highest-intent uncovered records remaining in `nosite_top20_leads.jsonl` after prior premium wave builds.
- Prioritized urgent/mobile service categories with strong quote intent: auto repair, lawn care, and cleaning.

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
- No live endpoint verification was performed in this build pass (static artifact only).
