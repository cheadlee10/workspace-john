# Premium V3 Wave 100 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave100/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `mister-sparky-houston-houston-tx` (Lead: gpass-us-505 | Mister Sparky Houston | Houston, TX | Electrical | priority 85 | est $980)
2. `phoenix-roofing-and-renovations-nashville-tn` (Lead: gpass-us-492 | Phoenix Roofing and Renovations | Nashville, TN | Roofing | priority 84 | est $1110)
3. `evergreen-refrigeration-commercial-hvac-seattle-wa` (Lead: gpass-us-476 | Evergreen Refrigeration & Commercial HVAC | Seattle, WA | HVAC | priority 84 | est $1080)
4. `mission-plumbing-heating-cooling-kansas-city-ks` (Lead: gpass-us-503 | Mission Plumbing, Heating & Cooling | Kansas City, KS | Plumbing/HVAC | priority 84 | est $1050)
5. `mister-quik-home-services-indianapolis-in` (Lead: gpass-us-404 | Mister Quik Home Services | Indianapolis, IN | Electrical/Plumbing/HVAC | priority 84 | est $1040)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
