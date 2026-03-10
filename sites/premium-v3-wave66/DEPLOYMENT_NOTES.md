# Deployment Notes - premium-v3-wave66

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- denver-heating-and-air-conditioning-denver-co
- all-weather-hvac-seattle-wa
- dallas-emergency-plumbers-dallas-tx
- phoenix-24-hr-plumbing-phoenix-az
- mile-high-emergency-plumbing-denver-co

## Lead Selection Basis
Selected from currently uncovered, high-intent lead pool with strongest emergency-service buying signals (HVAC breakdown + emergency plumbing intent) and no existing premium-v3 page coverage.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
