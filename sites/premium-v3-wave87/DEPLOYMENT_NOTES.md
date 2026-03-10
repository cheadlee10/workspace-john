# Deployment Notes - premium-v3-wave87

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- houston-24-7-water-damage-response-houston-tx
- sacramento-emergency-mold-leak-team-sacramento-ca
- atlanta-emergency-roof-tarp-repair-atlanta-ga
- columbus-burst-pipe-cleanup-co-columbus-oh
- toledo-basement-flood-pump-out-toledo-oh

## Lead Selection Basis
Selected uncovered `status=new` leads not already represented by existing `sites/premium-v3-wave*` slugs. Prioritized top emergency-intent opportunities by estimated value (1800, 1700, 1600, 1400, 1240) and urgency signals in notes.

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
