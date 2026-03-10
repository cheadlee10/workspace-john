# Deployment Notes - premium-v3-wave79

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- raleigh-crawl-space-waterproofing-raleigh-nc
- sacramento-roof-leak-rapid-repair-sacramento-ca
- san-diego-sewer-backup-team-san-diego-ca
- bayou-city-furnace-and-ac-rescue-houston-tx
- houston-slab-leak-response-houston-tx

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads with the highest remaining estimated values and emergency-intent language not already represented by existing premium-v3 slugs. Prioritized categories with urgent homeowner pain (water intrusion, roof leak, sewer backup, HVAC outage, slab leak).

## Form Routing
All pages include:
- Hero quote CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug) and `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified all five pages render with unique lead metadata and service copy
- Verified both forms use `method="post"` and `action="/contact"`
- Verified hidden routing fields present in each form
- Verified label/input ID mappings and required attributes
- Verified responsive collapse to one column at <=860px
