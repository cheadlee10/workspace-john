# Deployment Notes - premium-v3-wave72

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- tampa-24-7-flood-cleanup-team-tampa-fl
- tampa-emergency-roof-leak-repair-tampa-fl
- baltimore-roof-tarp-and-leak-repair-baltimore-md
- san-diego-emergency-water-heater-san-diego-ca
- dfw-same-day-water-heater-repair-dallas-tx

## Lead Selection Basis
Selected uncovered `status=new` leads with highest estimated values and explicit emergency-intent signals (24/7 flood cleanup, roof leak/tarp response, and same-day water-heater demand). Confirmed no existing premium demo directories for these slugs.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each page includes required hidden `business` and `source` fields
- Verified responsive two-column layout collapses to single-column on mobile
