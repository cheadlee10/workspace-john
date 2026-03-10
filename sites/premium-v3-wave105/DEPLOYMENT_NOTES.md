# Premium V3 Wave 105 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave105/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already in `sites/premium-v3-wave*/`.

## Pages
1. `bates-electric-charlotte-nc` (Lead: gpass-us-484 | Bates Electric | Charlotte, NC | Electrical | priority 84 | est $960)
2. `the-pipe-doctor-seattle-wa` (Lead: gpass-us-389 | The Pipe Doctor | Seattle, WA | Plumbing | priority 84 | est $950)
3. `reliant-plumbing-austin-tx` (Lead: gpass-us-455 | Reliant Plumbing | Austin, TX | Plumbing | priority 84 | est $940)
4. `best-termite-and-pest-control-tampa-fl` (Lead: gpass-us-458 | Best Termite & Pest Control | Tampa, FL | Pest Control | priority 84 | est $920)
5. `dazco-plumbing-raleigh-nc` (Lead: gpass-us-453 | Dazco Plumbing | Raleigh, NC | Plumbing | priority 84 | est $910)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
