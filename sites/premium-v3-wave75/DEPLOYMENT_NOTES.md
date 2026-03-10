# Deployment Notes - premium-v3-wave75

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- birmingham-emergency-roof-leak-repair-birmingham-al
- river-city-emergency-hvac-repair-sacramento-ca
- truckee-meadows-water-heater-rescue-reno-nv
- austin-burst-pipe-leak-repair-austin-tx
- circle-city-water-heater-pros-indianapolis-in

## Lead Selection Basis
Selected uncovered `status=new` leads with highest urgency-intent signals and top estimated values. Prioritized emergency intent terms (emergency, burst pipe, leak repair, water heater outage, no-heat/no-cool), then excluded slugs already present in existing premium-v3 waves.

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
