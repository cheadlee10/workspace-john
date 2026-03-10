# Premium V3 Wave 97 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave97/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `leads.jsonl` (`wave6-*` segment) sorted by `estimated_value`, then excluded any slug already present in `sites/premium-v3-wave*/`.

## Pages
1. `east-valley-water-heater-emergency-mesa-az` (Lead: wave6-100 | East Valley Water Heater Emergency | Mesa, AZ | Water Heater Repair | est $960)
2. `alamo-city-emergency-plumbing-dispatch-san-antonio-tx` (Lead: wave6-097 | Alamo City Emergency Plumbing Dispatch | San Antonio, TX | Plumbing | est $940)
3. `san-antonio-sewer-backup-rescue-san-antonio-tx` (Lead: wave6-098 | San Antonio Sewer Backup Rescue | San Antonio, TX | Drain Cleaning | est $930)
4. `mesa-no-cool-ac-repair-hotline-mesa-az` (Lead: wave6-099 | Mesa No-Cool AC Repair Hotline | Mesa, AZ | HVAC | est $910)
5. `louisville-emergency-electric-panel-louisville-ky` (Lead: wave6-103 | Louisville Emergency Electric Panel | Louisville, KY | Electrical | est $900)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
