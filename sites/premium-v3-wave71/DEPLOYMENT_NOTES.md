# Deployment Notes - premium-v3-wave71

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- vegas-24-7-flood-cleanup-las-vegas-nv
- philly-roof-leak-rapid-repair-philadelphia-pa
- valley-emergency-water-heater-phoenix-az
- austin-burst-pipe-and-leak-repair-austin-tx
- puget-sound-burst-pipe-repair-seattle-wa

## Lead Selection Basis
Selected from uncovered `status=new` leads with top estimated values and explicit high-intent emergency notes (flood cleanup, roof leaks, burst pipes, same-day water-heater demand). Confirmed each slug had no existing coverage under `sites/`.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified hero quote CTA links to `#quote`
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each page renders dual-column desktop and collapses to single-column mobile
