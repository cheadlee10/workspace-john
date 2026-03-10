# Deployment Notes - Premium V3 Wave 83

Created 5 premium demo pages for highest-intent uncovered leads from the wave6 queue.
All pages include two CTA forms posting to `/contact` with `method="post"` and hidden `business` + `source` fields.

## Included Leads
- wave6-032 | Charm City Drain Clog Emergency | Baltimore, MD | Drain Cleaning | `/charm-city-drain-clog-emergency-baltimore-md/`
- wave6-034 | Gaslamp Drain & Sewer Rescue | San Diego, CA | Drain Cleaning | `/gaslamp-drain-and-sewer-rescue-san-diego-ca/`
- wave6-058 | Capital Drain Unclog Express | Sacramento, CA | Drain Cleaning | `/capital-drain-unclog-express-sacramento-ca/`
- wave6-018 | LoDo Drain & Sewer Rescue | Denver, CO | Drain Cleaning | `/lodo-drain-and-sewer-rescue-denver-co/`
- wave6-010 | Circle City Sewer & Drain Rescue | Indianapolis, IN | Drain Cleaning | `/circle-city-sewer-and-drain-rescue-indianapolis-in/`

## Folder
- `sites/premium-v3-wave83/`

## Post-Deploy Checks
- Verify each route serves `index.html` over HTTPS.
- Submit both forms per page and confirm backend receives `business` + `source` fields.
- Confirm `/contact` handler returns success response and logs lead source correctly.
