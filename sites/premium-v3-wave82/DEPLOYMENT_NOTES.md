# Deployment Notes - Premium V3 Wave 82

Created 5 premium demo pages for highest-intent uncovered leads from the wave6 uncovered queue.
All pages include two CTA forms posting to `/contact` with `method="post"` and hidden `business` + `source` fields.

## Included Leads
- wave6-026 | Windy City Sewer Backup Pros | Chicago, IL | Drain Cleaning | `/windy-city-sewer-backup-pros-chicago-il/`
- wave6-038 | Queen City Sewer Backup Rescue | Cincinnati, OH | Drain Cleaning | `/queen-city-sewer-backup-rescue-cincinnati-oh/`
- wave6-054 | Sooner State Drain & Sewer Rescue | Oklahoma City, OK | Drain Cleaning | `/sooner-state-drain-and-sewer-rescue-oklahoma-city-ok/`
- wave6-002 | Capital City Drain & Sewer Jetting | Columbus, OH | Drain Cleaning | `/capital-city-drain-and-sewer-jetting-columbus-oh/`
- wave6-025 | Lakeview Sump Pump Rescue | Chicago, IL | Plumbing | `/lakeview-sump-pump-rescue-chicago-il/`

## Folder
- `sites/premium-v3-wave82/`

## Post-Deploy Checks
- Verify each route serves `index.html` over HTTPS.
- Submit both forms per page and confirm backend receives `business` + `source` fields.
- Confirm `/contact` handler returns success response and logs lead source correctly.
