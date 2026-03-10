# Premium V3 Wave 94 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave94/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected top estimated-value uncovered P1 leads from `outreach_queue.jsonl` where no existing premium-v3 folder matched business slug, prioritizing urgent roofing intent and verified contact readiness.

## Pages
1. `twin-city-roofing-construction-specialists-inc-st-paul-minneapolis-mn` (Lead: gpass-us-462 | Twin City Roofing Construction Specialists, Inc. | St. Paul / Minneapolis, MN | Roofing | est $1150)
2. `louisville-roofing-louisville-ky` (Lead: gpass-us-478 | Louisville Roofing | Louisville, KY | Roofing | est $1150)
3. `denver-roof-pros-denver-co` (Lead: gpass-us-306 | Denver Roof Pros | Denver, CO | Roofing | est $1150)
4. `fw-walton-roofing-dallas-tx` (Lead: gpass-us-268 | FW Walton Roofing | Dallas, TX | Roofing | est $1120)
5. `t-rock-roofing-contracting-dallas-tx` (Lead: gpass-us-470 | T Rock Roofing & Contracting | Dallas, TX | Roofing | est $1120)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.