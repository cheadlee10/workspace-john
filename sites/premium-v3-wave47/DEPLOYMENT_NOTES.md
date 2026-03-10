# Premium V3 Wave 47 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave47`
Pages built: 5

## Included demos
1. `san-diego-heating-and-cooling-el-cajon-ca` (nosite-109)
2. `cedar-fencing-plus-portland-or` (nosite-101)
3. `austin-s-custom-fencing-portland-or` (nosite-102)
4. `ace-fencing-las-vegas-nv` (nosite-115)
5. `bachman-lawn-care-kansas-city-mo` (nosite-116)

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
- CRM/back-end slug mapping for new leads is not validated here; requires integration check post-deploy.
- Phone formatting may need normalization for strict downstream validation rules.
