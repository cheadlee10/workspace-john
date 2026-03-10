# Premium V3 Wave 92 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave92/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Picked highest estimated-value uncovered leads not already present in prior premium-v3 deployment notes, with urgency-weighted services (water damage / emergency).

## Pages
1. `houston-24-7-water-damage-response-houston-tx` (Lead: wave4-106 | Houston 24/7 Water Damage Response | Houston, TX | Water Damage Restoration | est $1800)
2. `three-rivers-water-damage-rapid-response-pittsburgh-pa` (Lead: wave6-064 | Three Rivers Water Damage Rapid Response | Pittsburgh, PA | Water Damage Restoration | est $1490)
3. `central-valley-flood-cleanup-24-7-fresno-ca` (Lead: wave6-102 | Central Valley Flood Cleanup 24-7 | Fresno, CA | Water Damage Restoration | est $1460)
4. `vegas-24-7-flood-cleanup-las-vegas-nv` (Lead: wave6-024 | Vegas 24-7 Flood Cleanup | Las Vegas, NV | Water Damage Restoration | est $1460)
5. `magic-city-flood-cleanup-24-7-birmingham-al` (Lead: wave6-056 | Magic City Flood Cleanup 24-7 | Birmingham, AL | Water Damage Restoration | est $1450)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.