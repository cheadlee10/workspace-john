# Premium V3 Wave 101 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave101/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `goettl-air-conditioning-plumbing-las-vegas-nv` (Lead: gpass-us-425 | Goettl Air Conditioning & Plumbing | Las Vegas, NV | HVAC/Plumbing | priority 84 | est $1030)
2. `george-brazil-plumbing-electrical-phoenix-az` (Lead: gpass-us-401 | George Brazil Plumbing & Electrical | Phoenix, AZ | Plumbing/Electrical | priority 84 | est $1020)
3. `a-1-air-inc-phoenix-az` (Lead: gpass-us-406 | A#1 Air, Inc. | Phoenix, AZ | HVAC | priority 84 | est $1020)
4. `roto-rooter-plumbing-water-cleanup-atlanta-ga` (Lead: gpass-us-432 | Roto-Rooter Plumbing & Water Cleanup | Atlanta, GA | Plumbing/Drain/Sewer | priority 84 | est $1020)
5. `barker-sons-plumbing-rooter-anaheim-ca` (Lead: gpass-us-426 | Barker & Sons Plumbing & Rooter | Anaheim, CA | Plumbing | priority 84 | est $1010)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
