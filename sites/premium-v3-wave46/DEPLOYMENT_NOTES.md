# Premium V3 Wave 46 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave46`
Pages built: 5

## Included demos
1. `colorados-best-fence-company-denver-co` (NS064)
2. `joe-s-appliance-repair-lv-las-vegas-nv` (NS033)
3. `dunn-rite-roofing-houston-houston-tx` (NS044)
4. `houston-roofing-repair-experts-houston-tx` (NS045)
5. `austin-auto-doctor-mobile-mechanic-austin-tx` (NS018)

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
- Some sourced leads are phone-first and may require phone normalization at intake.
