# Deployment Notes - premium-v3-wave67

Date: 2026-03-03
Batch size: 5 premium demos

## Deployed pages
- regal-roofing-and-contracting-seattle-wa
- quality-construction-and-roofing-houston-tx
- san-diego-heating-and-cooling-el-cajon-ca
- envision-landscaping-bellevue-wa
- valle-landscaping-phoenix-az

## Selection rationale
Picked from uncovered high-intent leads with top estimated value and immediate-service demand signals (roofing/HVAC/landscaping), excluding already covered slugs in prior waves.

## CTA + form routing compliance
Each page includes:
- Primary quote CTA linking to `#quote`
- Quick callback form (`action="/contact"`, `method="post"`)
- Detailed quote form (`action="/contact"`, `method="post"`)
- Hidden fields in both forms: `business` and `source`

## QA spot-check completed
- Verified all 5 folders contain `index.html`
- Verified both forms per page post to `/contact`
- Verified no template placeholders (`{...}`) or lorem/todo markers
- Avoided fabricated phone number display text in hero/footer
