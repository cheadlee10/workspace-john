# Premium V3 Wave 98 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave98/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `pmc-general-contractor-bellevue-wa-98005` (Lead: wa-google-002 | PMC General Contractor | Bellevue, WA 98005 | General Contractor | priority 92 | est $1200)
2. `joe-s-roofing-reno-nv` (Lead: gpass-us-500 | Joe's Roofing | Reno, NV | Roofing | priority 86 | est $1080)
3. `blackmon-fence-company-columbus-ga` (Lead: gpass-us-502 | Blackmon Fence Company | Columbus, GA | Fencing | priority 86 | est $980)
4. `san-diego-heating-and-cooling-el-cajon-ca-92021` (Lead: nosite-111 | San Diego Heating and Cooling | El Cajon, CA 92021 | HVAC | priority 86 | est $900)
5. `cj-north-west-roofing-shoreline-wa-98155` (Lead: gpass-pnw-244 | CJ North West Roofing | Shoreline, WA 98155 | Roofing | priority 85 | est $1100)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
