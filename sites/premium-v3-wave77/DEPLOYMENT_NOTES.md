# Deployment Notes - premium-v3-wave77

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- three-rivers-water-damage-rapid-response-pittsburgh-pa
- first-coast-emergency-electricians-jacksonville-fl
- indy-no-heat-furnace-rescue-indianapolis-in
- d-town-ac-not-cooling-hotline-detroit-mi
- motor-city-furnace-repair-now-detroit-mi

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads with the highest remaining estimated values and emergency-intent language not already represented by existing premium-v3 slugs. Prioritized outage/urgent categories (water damage, emergency electrical, no-heat furnace, AC outage).

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields per form: `business` (slug), `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each form includes hidden `business` and `source` fields
- Verified `<label for>` mappings match input `id` values
- Verified responsive single-column behavior under 860px breakpoint
