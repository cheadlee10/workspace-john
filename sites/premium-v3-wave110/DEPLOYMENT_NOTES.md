# Premium V3 Wave 110 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave110/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `larson-plumbing-tampa-fl` (Lead: gpass-us-304 | Larson Plumbing | Tampa, FL | Plumbing | priority 83 | est $980)
2. `bumble-bee-plumbing-phoenix-az` (Lead: gpass-us-410 | Bumble Bee Plumbing | Phoenix, AZ | Plumbing | priority 83 | est $980)
3. `aaa-auger-plumbing-services-austin-tx` (Lead: gpass-us-302 | AAA Auger Plumbing Services | Austin, TX | Plumbing | priority 83 | est $980)
4. `graham-plumbing-services-houston-tx` (Lead: gpass-us-486 | Graham Plumbing Services | Houston, TX | Plumbing | priority 83 | est $980)
5. `cooper-heating-and-cooling-denver-co` (Lead: gpass-us-403 | Cooper Heating & Cooling | Denver, CO | HVAC | priority 83 | est $970)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
