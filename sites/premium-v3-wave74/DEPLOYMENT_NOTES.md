# Deployment Notes - premium-v3-wave74

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- boise-emergency-plumbing-response-boise-id
- portland-emergency-water-heater-portland-or
- madison-emergency-water-heater-madison-wi
- cleveland-emergency-water-heater-cleveland-oh
- omaha-emergency-water-heater-omaha-ne

## Lead Selection Basis
Selected uncovered `status=new` leads with highest urgency-intent signals and top estimated values. Prioritized emergency plumbing and emergency water-heater demand terms (emergency, same-day, leak, water heater), then excluded any slug already present in existing premium-v3 waves.

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
