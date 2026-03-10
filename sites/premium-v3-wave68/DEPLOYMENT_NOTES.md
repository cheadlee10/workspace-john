# Deployment Notes - premium-v3-wave68

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- perez-landscaping-seattle-wa
- ligaya-landscaping-seattle-wa
- greenscapes-landscaping-seattle-wa
- northwest-landscape-and-patio-bellevue-bellevue-wa
- a-a-landscaping-bothell-wa

## Lead Selection Basis
Selected from remaining uncovered, outreach-usable `status=new` leads with the highest estimated value ($800 tier) and no existing premium-v3 page coverage for these city-targeted slugs.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
