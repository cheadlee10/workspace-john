# Premium V3 Wave 108 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave108/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `greenwood-heating-and-home-services-seattle-wa` (Lead: gpass-us-477 | Greenwood Heating and Home Services | Seattle, WA | HVAC/Plumbing | priority 83 | est $1040)
2. `cfl-roofing-inc-orlando-fl` (Lead: gpass-us-416 | CFL Roofing, Inc. | Orlando, FL | Roofing | priority 83 | est $1030)
3. `bluefrog-plumbing-drain-nw-houston-houston-tx` (Lead: gpass-us-388 | bluefrog Plumbing + Drain (NW Houston) | Houston, TX | Plumbing | priority 83 | est $1020)
4. `risk-free-serv-san-diego-ca` (Lead: gpass-us-420 | Risk Free Serv | San Diego, CA | Water Damage Restoration | priority 83 | est $1020)
5. `mister-sparky-electrician-houston-houston-tx` (Lead: gpass-us-428 | Mister Sparky Electrician Houston | Houston, TX | Electrical | priority 83 | est $1000)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
