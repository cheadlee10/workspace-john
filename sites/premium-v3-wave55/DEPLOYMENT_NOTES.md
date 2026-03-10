# Premium V3 Wave 55 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave55`
Pages built: 5

## Included demos
1. `pnw-landscaping-services-seattle-wa` (wa-google-001)
2. `joc-s-landscaping-everett-wa` (wa-google-003)
3. `keith-s-lawn-landscape-spokane-wa` (wa-google-006)
4. `family-lawn-services-everett-wa` (wa-google-004)
5. `the-honest-handyman-hauling-llc-vancouver-wa` (wa-google-007)

## Selection rationale
- Chosen as highest-intent uncovered leads remaining outside previously generated premium-v3 wave slug coverage.
- Prioritized local home-service categories with direct phone contact and immediate quote-ready demand.

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm notifier/CRM routing maps each new slug to its lead record ID.
- Smoke test quick callback + detailed quote submission for all five pages.

## Blockers / risks
- Static artifact build only; no live `/contact` endpoint integration test run in this task.
