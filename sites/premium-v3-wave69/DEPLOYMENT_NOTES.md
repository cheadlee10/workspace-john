# Deployment Notes - premium-v3-wave69

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- milwaukee-24-7-flood-cleanup-milwaukee-wi
- knoxville-roof-leak-hotline-knoxville-tn
- cleveland-emergency-roof-leak-repair-cleveland-oh
- nashville-roof-leak-rapid-repair-nashville-tn
- volunteer-state-storm-roof-repair-knoxville-tn

## Lead Selection Basis
Selected from uncovered `status=new` high-intent emergency home-service leads with top estimated values and no existing premium-v3 coverage for city-targeted slugs.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
