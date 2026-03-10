# Premium V3 Wave 95 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave95/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest estimated-value uncovered roofing leads from `outreach_queue.jsonl` by checking slug coverage against existing `sites/premium-v3-wave*/` folders, then prioritizing high-intent/P1-ready records.

## Pages
1. `spokane-roofing-company-spokane-liberty-lake-wa` (Lead: gpass-pnw-248 | Spokane Roofing Company | Spokane / Liberty Lake, WA | Roofing | est $1250)
2. `lobo-roofing-llc-tacoma-wa-98404` (Lead: gpass-pnw-208 | Lobo Roofing LLC | Tacoma, WA 98404 | Roofing | est $1200)
3. `elite-metal-roofing-llc-sw-washington-metro-vancouver-area-wa` (Lead: gpass-pnw-210 | Elite Metal Roofing LLC | SW Washington Metro (Vancouver area), WA | Roofing | est $1200)
4. `a-better-roofing-company-seattle-wa` (Lead: gpass-pnw-219 | A Better Roofing Company | Seattle, WA | Residential Roofing | est $1200)
5. `quality-pacific-roofing-seattle-wa-98122` (Lead: gpass-pnw-220 | Quality Pacific Roofing | Seattle, WA 98122 | Residential Roofing | est $1200)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.