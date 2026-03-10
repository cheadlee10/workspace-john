# Premium V3 Wave 48 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave48`
Pages built: 5

## Included demos
1. `valle-landscaping-phoenix-az` (NS001)
2. `jose-s-landscaping-phoenix-az` (NS005)
3. `divine-design-landscaping-phoenix-az` (NS110)
4. `masterazscapes-phoenix-az` (NS004)
5. `one-pro-handyman-40-years-exp-houston-tx` (NS050)

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
- NS050 source record had no phone in lead hunt data; placeholder phone was used and should be replaced before outreach.
