# Premium V3 Wave 114 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave114/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `best-termite-pest-control-tampa-fl` (Lead: gpass-us-458 | Best Termite & Pest Control | Tampa, FL | Pest Control | priority 84 | est $920)
2. `american-home-water-air-phoenix-az` (Lead: gpass-us-393 | American Home Water & Air | Phoenix, AZ | HVAC/Plumbing | priority 83 | est $990)
3. `serviceone-air-conditioning-plumbing-orlando-fl` (Lead: gpass-us-467 | ServiceOne Air Conditioning & Plumbing | Orlando, FL | Plumbing/HVAC | priority 83 | est $990)
4. `will-s-plumbing-testing-service-san-antonio-tx` (Lead: gpass-us-289 | Will's Plumbing & Testing Service | San Antonio, TX | Plumbing | priority 83 | est $980)
5. `cooper-heating-cooling-denver-co` (Lead: gpass-us-403 | Cooper Heating & Cooling | Denver, CO | HVAC | priority 83 | est $970)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
