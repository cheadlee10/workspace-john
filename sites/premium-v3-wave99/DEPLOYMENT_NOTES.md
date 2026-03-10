# Premium V3 Wave 99 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave99/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `village-plumbing-air-electric-houston-tx` (Lead: gpass-us-487 | Village Plumbing, Air & Electric | Houston, TX | Plumbing/HVAC/Electrical | priority 85 | est $1060)
2. `quick-s-hvac-raleigh-nc` (Lead: gpass-us-299 | Quick's HVAC | Raleigh, NC | HVAC | priority 85 | est $1040)
3. `local-roots-ac-and-plumbing-llc-phoenix-az` (Lead: gpass-us-474 | Local Roots AC and Plumbing LLC | Phoenix, AZ | Plumbing/HVAC | priority 85 | est $1020)
4. `radiant-plumbing-air-conditioning-austin-tx` (Lead: gpass-us-398 | Radiant Plumbing & Air Conditioning | Austin, TX | Plumbing/HVAC | priority 85 | est $1010)
5. `ozburn-electrical-contractors-inc-covington-atlanta-ga` (Lead: gpass-us-479 | Ozburn Electrical Contractors, Inc. | Covington/Atlanta, GA | Electrical | priority 85 | est $980)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.