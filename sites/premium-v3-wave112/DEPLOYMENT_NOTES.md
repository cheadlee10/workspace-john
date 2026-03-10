# Premium V3 Wave 112 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave112/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `pnw-landscaping-and-services-seattle-wa-98146` (Lead: wa-google-001 | PNW Landscaping & Services | Seattle, WA 98146 | Landscaping | priority 83 | est $800)
2. `cc-landscaping-phoenix-az-85036` (Lead: nosite-052 | CC Landscaping | Phoenix, AZ 85036 | Landscaping | priority 83 | est $800)
3. `berwald-roofing-and-sheet-metal-st-paul-mn` (Lead: gpass-us-463 | Berwald Roofing & Sheet Metal | St. Paul, MN | Roofing | priority 82 | est $1120)
4. `precision-roofing-lee-s-summit-kansas-city-mo` (Lead: gpass-us-480 | Precision Roofing | Lee's Summit / Kansas City, MO | Roofing | priority 82 | est $1120)
5. `idaho-roofing-idaho-falls-id-83401` (Lead: gpass-pnw-227 | Idaho Roofing | Idaho Falls, ID 83401 | Roofing | priority 82 | est $1100)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
