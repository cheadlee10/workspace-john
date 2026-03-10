# Premium V3 Wave 102 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave102/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `quality-construction-and-roofing-houston-tx-77041` (Lead: nosite-068 | Quality Construction & Roofing | Houston, TX 77041 | General Contractor/Roofing | priority 92 | est $1500)
2. `hydroforce-cleaning-and-restoration-chicago-il` (Lead: gpass-us-501 | HydroForce Cleaning & Restoration | Chicago, IL | Water/Fire/Mold Restoration | priority 88 | est $1140)
3. `shelby-roofing-and-exteriors-arnold-mo` (Lead: gpass-us-499 | Shelby Roofing & Exteriors | Arnold, MO | Roofing & Exterior Renovation | priority 87 | est $1120)
4. `village-plumbing-air-and-electric-houston-tx` (Lead: gpass-us-487 | Village Plumbing, Air & Electric | Houston, TX | Plumbing/HVAC/Electrical | priority 85 | est $1060)
5. `degeorge-plumbing-and-hvac-phoenix-az` (Lead: gpass-us-309 | DeGeorge Plumbing & HVAC | Phoenix, AZ | Plumbing/HVAC | priority 84 | est $1080)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
