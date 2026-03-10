# Deployment Notes - premium-v3-wave81

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- circle-city-sump-pump-24-7-indianapolis-in
- gateway-city-water-heater-now-st-louis-mo
- dfw-emergency-panel-and-wiring-dallas-tx
- st-louis-burst-pipe-hotline-st-louis-mo
- twin-cities-emergency-plumbing-dispatch-minneapolis-mn

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads not already represented by existing premium-v3 slugs. Prioritized highest estimated-value emergency intent across sump pump failure, no-hot-water outages, electrical panel risk, and burst-pipe plumbing response.

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
