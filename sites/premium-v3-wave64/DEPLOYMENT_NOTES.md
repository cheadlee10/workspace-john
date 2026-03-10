# Deployment Notes - premium-v3-wave64

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- regal-roofing-and-contracting-seattle-wa
- quality-construction-and-roofing-houston-tx
- san-diego-heating-and-cooling-el-cajon-ca
- cedar-fencing-plus-portland-or
- ace-fencing-las-vegas-nv

## Lead Selection Basis
Selected from uncovered lead pool by highest-intent vertical signals (roofing, HVAC, fencing) and top estimated value tiers.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
