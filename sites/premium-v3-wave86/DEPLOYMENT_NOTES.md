# Deployment Notes - premium-v3-wave86

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- cream-city-sewer-and-rooter-hotline-milwaukee-wi
- indianapolis-emergency-plumbing-dispatch-indianapolis-in
- jacksonville-emergency-electrician-now-jacksonville-fl
- motor-city-emergency-electric-detroit-mi
- lakeview-water-heater-pros-chicago-il

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads not already represented by existing `sites/premium-v3-wave*` slugs. Prioritized highest estimated-value emergency-intent opportunities (estimated values: 930, 920, 870, 860, 850).

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
