# Premium V3 Wave 93 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave93/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Picked highest estimated-value uncovered leads not already present in prior premium-v3 deployments, with urgency-weighted services (flood, roof leak, sewer backup).

## Pages
1. `capital-city-flood-extraction-24-7-baton-rouge-la` (Lead: wave7-112 | Capital City Flood Extraction 24-7 | Baton Rouge, LA | Water Damage Restoration | est $1420)
2. `baton-rouge-roof-leak-tarp-team-baton-rouge-la` (Lead: wave7-111 | Baton Rouge Roof Leak Tarp Team | Baton Rouge, LA | Roof Repair | est $1290)
3. `fresno-emergency-roof-leak-crew-fresno-ca` (Lead: wave6-101 | Fresno Emergency Roof Leak Crew | Fresno, CA | Roof Repair | est $1280)
4. `little-rock-sewer-backup-cleanup-team-little-rock-ar` (Lead: sprint-20260303-043 | Little Rock Sewer Backup Cleanup Team | Little Rock, AR | Sewer Line Repair | est $1210)
5. `billings-sewer-backup-cleanup-team-billings-mt` (Lead: sprint-20260303-050 | Billings Sewer Backup Cleanup Team | Billings, MT | Sewer Line Repair | est $1190)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
