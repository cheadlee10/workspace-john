# Deployment Notes - premium-v3-wave76

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- steel-city-sewer-backup-hotline-pittsburgh-pa
- jax-roof-tarp-and-leak-response-jacksonville-fl
- magic-city-flood-cleanup-24-7-birmingham-al
- buckeye-emergency-plumbing-co-columbus-oh
- portland-burst-pipe-hotline-portland-or

## Lead Selection Basis
Selected uncovered `status=new` leads with strongest urgency intent and high estimated value from latest wave6 intake. Prioritized emergency service language (sewer backup, roof leak, flood cleanup, emergency plumbing, burst pipe) and excluded any slugs already present in existing premium-v3 wave folders.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields per form: `business` (slug), `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each form includes hidden `business` and `source` fields
- Verified `<label for>` mappings match input `id` values
- Verified responsive single-column behavior under 860px breakpoint
