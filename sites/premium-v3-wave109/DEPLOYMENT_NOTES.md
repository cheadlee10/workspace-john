# Premium V3 Wave 109 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave109/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `mr-rooter-plumbing-of-tampa-tampa-fl` (Lead: gpass-us-433 | Mr. Rooter Plumbing of Tampa | Tampa, FL | Plumbing | priority 83 | est $1000)
2. `rite-plumbing-nyc-new-york-ny` (Lead: gpass-us-498 | Rite Plumbing NYC | New York, NY | Plumbing | priority 83 | est $1000)
3. `american-home-water-and-air-phoenix-az` (Lead: gpass-us-393 | American Home Water & Air | Phoenix, AZ | HVAC/Plumbing | priority 83 | est $990)
4. `serviceone-air-conditioning-and-plumbing-orlando-fl` (Lead: gpass-us-467 | ServiceOne Air Conditioning & Plumbing | Orlando, FL | Plumbing/HVAC | priority 83 | est $990)
5. `will-s-plumbing-and-testing-service-san-antonio-tx` (Lead: gpass-us-289 | Will's Plumbing & Testing Service | San Antonio, TX | Plumbing | priority 83 | est $980)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
