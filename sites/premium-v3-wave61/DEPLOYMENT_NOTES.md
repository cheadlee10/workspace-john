# Deployment Notes - premium-v3-wave61

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- regal-roofing-and-contracting-seattle-wa
- quality-construction-and-roofing-houston-tx
- san-diego-heating-and-cooling-el-cajon-ca
- jv-pool-services-dallas-tx
- american-termite-and-pest-elimination-atlanta-ga

## Lead Selection Basis
Selected from uncovered high-intent lead pool using highest estimated value + urgent-service search intent signals.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has a primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
