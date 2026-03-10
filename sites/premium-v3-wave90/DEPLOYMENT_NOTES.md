# Premium V3 Wave 90 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave90/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields for `business` slug and form `source`

## Pages
1. `regal-roofing-contracting-seattle-wa-98113` (Lead: nosite-037)
2. `quality-construction-roofing-houston-tx-77041` (Lead: nosite-068)
3. `rapid-city-roof-leak-emergency-tarp-rapid-city-sd` (Lead: sprint-20260303-056)
4. `biloxi-storm-roof-leak-tarp-service-biloxi-ms` (Lead: sprint-20260303-045)
5. `st-pete-slab-leak-specialists-st-petersburg-fl` (Lead: sprint-20260303-018)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
