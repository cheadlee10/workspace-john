# Premium V3 Wave 96 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave96/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `done-right-works-tacoma-wa-98407` (Lead: gpass-wa-201 | Done Right Works | Tacoma, WA 98407 | Handyman | est $700)
2. `environment-west-landscape-services-spokane-wa-99217` (Lead: wa-google-005 | Environment West Landscape Services | Spokane, WA 99217 | Landscaping | est $1000)
3. `baker-brothers-plumbing-air-electrical-dallas-tx` (Lead: gpass-us-431 | Baker Brothers Plumbing, Air & Electrical | Dallas, TX | Plumbing/HVAC/Electrical | est $1080)
4. `frontier-landscaping-vancouver-wa-98686` (Lead: gpass-wa-203 | Frontier Landscaping | Vancouver, WA 98686 | Landscaping | est $900)
5. `greenscape-landscaping-of-spokane-spokane-wa-99224` (Lead: gpass-pnw-224 | Greenscape Landscaping of Spokane | Spokane, WA 99224 | Landscaping | est $850)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.