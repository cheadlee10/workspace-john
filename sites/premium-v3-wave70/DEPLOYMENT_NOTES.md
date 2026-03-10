# Deployment Notes - premium-v3-wave70

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- valley-roof-leak-rapid-repair-phoenix-az
- valley-leak-and-roof-repair-phoenix-az
- raleigh-slab-leak-specialists-raleigh-nc
- bayou-leak-detection-and-pipe-repair-houston-tx
- central-fl-slab-leak-specialists-orlando-fl

## Lead Selection Basis
Selected from uncovered `status=new` leads with top estimated values and explicit high-intent emergency leak/slab-leak notes. Confirmed each slug had no existing coverage under `sites/`.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified hero quote CTA links to `#quote`
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each page renders dual-column desktop and collapses to single-column mobile
