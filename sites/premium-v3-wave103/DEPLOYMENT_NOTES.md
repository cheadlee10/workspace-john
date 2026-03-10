# Premium V3 Wave 103 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave103/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `plumb-works-inc-atlanta-ga` (Lead: gpass-us-418 | Plumb Works Inc. | Atlanta, GA | Plumbing | priority 84 | est $1000)
2. `mr-rooter-plumbing-of-san-antonio-san-antonio-tx` (Lead: gpass-us-412 | Mr. Rooter Plumbing of San Antonio | San Antonio, TX | Plumbing | priority 84 | est $990)
3. `elrod-fence-company-cave-creek-phoenix-az` (Lead: gpass-us-255 | Elrod Fence Company | Cave Creek / Phoenix, AZ | Fencing | priority 84 | est $980)
4. `aire-serv-of-houston-houston-tx` (Lead: gpass-us-438 | Aire Serv of Houston | Houston, TX | HVAC | priority 84 | est $980)
5. `benjamin-franklin-plumbing-of-orlando-orlando-fl` (Lead: gpass-us-466 | Benjamin Franklin Plumbing of Orlando | Orlando, FL | Plumbing | priority 84 | est $980)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
