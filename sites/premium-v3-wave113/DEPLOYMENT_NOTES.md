# Premium V3 Wave 113 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave113/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `rapid-roof-repair-dallas-tx` (Lead: gpass-us-261 | Rapid Roof Repair | Dallas, TX | Roofing | priority 82 | est $1100)
2. `falcon-roofing-reno-nv` (Lead: gpass-us-358 | Falcon Roofing | Reno, NV | Roofing | priority 82 | est $1100)
3. `integrity-ac-and-heating-phoenix-az` (Lead: gpass-us-278 | Integrity AC & Heating | Phoenix, AZ | HVAC | priority 82 | est $1080)
4. `roof-repair-and-inspection-specialist-llc-charlotte-nc` (Lead: gpass-us-318 | Roof Repair and Inspection Specialist LLC | Charlotte, NC | Roofing | priority 82 | est $1080)
5. `guthrie-and-sons-san-diego-ca` (Lead: gpass-us-300 | Guthrie & Sons | San Diego, CA | HVAC | priority 82 | est $1060)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
