# Premium V3 Wave 45 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave45`
Pages built: 5

## Included demos
1. `hydroforce-cleaning-restoration-chicago-il`
2. `shelby-roofing-exteriors-arnold-mo`
3. `joes-roofing-reno-nv`
4. `mp-plumbing-co-clackamas-or`
5. `u-s-plumbing-clayton-nc`

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
- Contact emails were unavailable for this lead set; phone-first CTA used on all pages.
