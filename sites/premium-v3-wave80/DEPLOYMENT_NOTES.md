# Deployment Notes - premium-v3-wave80

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- houston-emergency-sewer-line-repair-houston-tx
- duval-burst-pipe-and-leak-response-jacksonville-fl
- liberty-leak-detection-rapid-response-philadelphia-pa
- music-city-burst-pipe-hotline-nashville-tn
- okc-burst-pipe-hotline-oklahoma-city-ok

## Lead Selection Basis
Selected uncovered `status=new` wave6 leads with emergency-intent language and highest remaining estimated values not already represented by existing premium-v3 slugs. Prioritized sewer line failures, burst-pipe events, and active leak scenarios where conversion speed is critical.

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
