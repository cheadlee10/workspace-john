# Deployment Notes - premium-v3-wave85

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- reno-emergency-electric-panel-reno-nv
- kansas-city-furnace-repair-now-kansas-city-mo
- raleigh-ac-breakdown-response-raleigh-nc
- austin-emergency-electrical-response-austin-tx
- jersey-shore-emergency-electric-newark-nj

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads not already represented by existing `sites/premium-v3-wave*` slugs. Prioritized the highest estimated-value emergency-intent opportunities (scores: 890, 890, 880, 880, 870).

## Form Routing
All pages include:
- Hero quote CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug) and `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified all five pages render with unique lead metadata and vertical-specific copy
- Verified both forms on every page use `method="post"` and `action="/contact"`
- Verified hidden routing fields are present in each form
- Verified label/input mappings and required form fields
- Verified responsive layout collapses to one column at <=860px
