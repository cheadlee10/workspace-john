# Deployment Notes - premium-v3-wave78

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- baltimore-roof-tarp-leak-repair-baltimore-md
- jax-roof-tarp-leak-response-jacksonville-fl
- treasure-valley-ac-repair-now-boise-id
- bayou-city-furnace-ac-rescue-houston-tx
- south-bay-ac-breakdown-response-san-jose-ca

## Lead Selection Basis
Selected uncovered status=new wave6 leads with highest remaining estimated values and strong emergency-intent language (roof leak/tarp response + AC outage urgency), excluding slugs already present in prior premium-v3 waves.

## Form Routing
All pages include:
- Quick callback form posting to /contact
- Detailed quote form posting to /contact
- Hidden fields per form: usiness (page slug), source (quick_callback or detailed_quote)

## QA Spot Check
- Verified primary CTA links to #quote on each page
- Verified both forms use method="post" and ction="/contact"
- Verified each form includes hidden usiness and source fields
- Verified <label for> mappings match input id values
- Verified responsive single-column behavior under 860px breakpoint
