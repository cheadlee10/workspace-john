# Premium V3 Wave 6 — Deployment Notes + Outreach Hooks

## New Highest-Priority Premium Demos (Not Previously Covered)
1. sites/premium-v3-wave6/quality-pacific-roofing-seattle/index.html
   - Lead: gpass-pnw-220 — Quality Pacific Roofing (Priority P1)
   - Contact: (206) 264-0955 · Info@QualityPacificRoofing.com
   - Hook: "Built a storm-response roofing concept that pushes free inspections and converts emergency calls faster."

2. sites/premium-v3-wave6/done-right-works-tacoma/index.html
   - Lead: gpass-wa-201 — Done Right Works (Priority P1)
   - Contact: (253) 324-2311 · info@donerightworks.com
   - Hook: "Created a premium handyman page that pre-qualifies higher-value projects before callback."

3. sites/premium-v3-wave6/neighborly-fencing-seattle/index.html
   - Lead: gpass-pnw-230 — Neighborly Fencing (Priority P1)
   - Contact: (425) 472-5777 · quote@neighborlyfencing.com
   - Hook: "Drafted a quote-first fence demo built to turn local search clicks into scheduled site measures."

4. sites/premium-v3-wave6/a-better-roofing-company-seattle/index.html
   - Lead: gpass-pnw-219 — A Better Roofing Company (Priority P1)
   - Contact: (206) 935-1575 · abr@abetterroofing.com
   - Hook: "Built a trust-led roofing concept centered on inspections, warranty confidence, and replacement conversion."

5. sites/premium-v3-wave6/greenscape-landscaping-spokane/index.html
   - Lead: gpass-pnw-224 — Greenscape Landscaping of Spokane (Priority P1)
   - Contact: (509) 461-0525 · contact@spokanegreenscape.com
   - Hook: "Created a premium landscaping funnel that bundles install + recurring maintenance for bigger average ticket."

## Immediate Deploy Commands
`ash
cd sites/premium-v3-wave6/quality-pacific-roofing-seattle && vercel --prod
cd ../done-right-works-tacoma && vercel --prod
cd ../neighborly-fencing-seattle && vercel --prod
cd ../a-better-roofing-company-seattle && vercel --prod
cd ../greenscape-landscaping-spokane && vercel --prod
`

## Blockers / TODO Before Live Send
1. **Form endpoint unknown**: all forms still use {{form_endpoint}} placeholder and need Formspree/webhook replacement.
2. Confirm brand assets (logos, project photos, testimonials) for each business to avoid stock-only feel.
3. Validate legal business naming preference for "A Better Roofing Company" in page H1/title.
4. Final QA: mobile tap targets, submit behavior post-endpoint wiring, and call tracking numbers (if enabled).
