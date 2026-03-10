# Deployment Notes - premium-v3-wave73

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- triangle-same-day-water-heater-repair-raleigh-nc
- rose-city-water-heater-now-portland-or
- sacramento-burst-pipe-pros-sacramento-ca
- cincy-burst-pipe-hotline-cincinnati-oh
- nashville-burst-pipe-response-nashville-tn

## Lead Selection Basis
Selected uncovered `status=new` leads with highest urgency-intent signals and strong estimated value. Prioritized emergency plumbing and same-day water-heater terms (same-day, emergency, burst pipe, leak, water heater) and verified no existing premium-v3 demo folder for each slug.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields per form: `business` (slug), `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each form includes required hidden `business` and `source` fields
- Verified accessible `<label for>` / input `id` mappings for all fields
- Verified responsive layout collapses to single column on mobile
