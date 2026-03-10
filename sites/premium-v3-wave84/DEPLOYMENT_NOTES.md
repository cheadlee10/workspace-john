# Deployment Notes - Premium V3 Wave 84

Created 5 premium demo pages for highest-intent uncovered leads from the wave6 queue.
All pages include two CTA forms posting to `/contact` with `method="post"` and hidden `business` + `source` fields.

## Included Leads
- wave6-078 | Queen City Roof Leak Response | Charlotte, NC | Roofing | `/queen-city-roof-leak-response-charlotte-nc/`
- wave6-011 | Detroit 24-7 Furnace & AC Repair | Detroit, MI | HVAC | `/detroit-24-7-furnace-and-ac-repair-detroit-mi/`
- wave6-029 | Philly Emergency Electric Panel | Philadelphia, PA | Electrical | `/philly-emergency-electric-panel-philadelphia-pa/`
- wave6-035 | San Jose Emergency Electric Panel | San Jose, CA | Electrical | `/san-jose-emergency-electric-panel-san-jose-ca/`
- wave6-041 | Nashville Emergency Electric Panel | Nashville, TN | Electrical | `/nashville-emergency-electric-panel-nashville-tn/`

## Folder
- `sites/premium-v3-wave84/`

## Post-Deploy Checks
- Verify each route serves `index.html` over HTTPS.
- Submit both forms per page and confirm backend receives `business` + `source` fields.
- Confirm `/contact` handler returns success response and logs lead source correctly.
