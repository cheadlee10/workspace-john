# Premium V3 Wave 106 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave106/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `precision-garage-door-of-austin-austin-tx` (Lead: gpass-us-385 | Precision Garage Door of Austin | Austin, TX | Garage Door Repair | priority 84 | est $900)
2. `ryan-hall-handyman-and-construction-services-llc-sandy-greater-portland-or` (Lead: gpass-pnw-232 | Ryan Hall Handyman and Construction Services, LLC | Sandy / Greater Portland, OR | Handyman/Remodeling | priority 84 | est $800)
3. `a1-handyman-boise-id-83706` (Lead: gpass-pnw-223 | A1 Handyman | Boise, ID 83706 | Handyman | priority 84 | est $700)
4. `midsouth-construction-nashville-tn` (Lead: gpass-us-297 | MidSouth Construction | Nashville, TN | Roofing | priority 83 | est $1110)
5. `mlk-construction-stl-roofing-company-st-louis-mo` (Lead: gpass-us-507 | MLK Construction (STL Roofing Company) | St. Louis, MO | Roofing | priority 83 | est $1100)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
