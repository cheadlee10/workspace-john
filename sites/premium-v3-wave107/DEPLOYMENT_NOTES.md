# Premium V3 Wave 107 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave107/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `shift-exteriors-columbus-oh` (Lead: gpass-us-308 | Shift Exteriors | Columbus, OH | Roofing | priority 83 | est $1090)
2. `bob-jenson-air-conditioning-and-heating-san-diego-ca` (Lead: gpass-us-299 | Bob Jenson Air Conditioning & Heating | San Diego, CA | HVAC | priority 83 | est $1080)
3. `bert-roofing-inc-dallas-tx` (Lead: gpass-us-471 | Bert Roofing, Inc. | Dallas, TX | Roofing | priority 83 | est $1080)
4. `priority-roofing-dallas-tx` (Lead: gpass-us-472 | Priority Roofing | Dallas, TX | Roofing | priority 83 | est $1060)
5. `brothers-air-heat-and-plumbing-charlotte-nc` (Lead: gpass-us-372 | Brothers Air, Heat & Plumbing | Charlotte, NC | HVAC/Plumbing | priority 83 | est $1040)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
