# Premium V3 Wave 4 — Deployment Notes + Outreach Hooks

## New Recovery-Wave Premium Demos
1. `sites/premium-v3-wave4/valle-landscaping-phx/index.html`
   - Lead: NS001 — Valle Landscaping (Priority 1)
   - Contact: (480) 806-9550
   - Hook: "Built a premium Phoenix landscaping draft to turn local listing traffic into fast quote requests."

2. `sites/premium-v3-wave4/one-pro-handyman-houston/index.html`
   - Lead: NS050 — One Pro Handyman 40 Years Exp (Priority 1)
   - Contact: placeholder used in draft
   - Hook: "Created a trust-first concept that showcases your 40-year reputation and pre-qualifies bigger handyman jobs."

3. `sites/premium-v3-wave4/license-dfw-pest-control/index.html`
   - Lead: NS041 — License DFW Pest Control (Priority 2)
   - Contact: 214-430-4504
   - Hook: "Built a premium pest-control draft focused on urgent call conversion and recurring plan signups."

4. `sites/premium-v3-wave4/dunn-rite-roofing-houston/index.html`
   - Lead: NS044 — Dunn-Rite Roofing Houston (Priority 2)
   - Contact: (877) 537-3317
   - Hook: "Put together a warranty-first roofing demo to attract higher-ticket inspections and replacement jobs."

5. `sites/premium-v3-wave4/american-residential-hvac-lv/index.html`
   - Lead: NS031 — American Residential HVAC (Priority 2)
   - Contact: (702) 600-3291
   - Hook: "Built a premium HVAC concept that captures emergency requests and converts customers into maintenance plans."

## Immediate Deploy Commands
```bash
cd sites/premium-v3-wave4/valle-landscaping-phx && vercel --prod
cd ../one-pro-handyman-houston && vercel --prod
cd ../license-dfw-pest-control && vercel --prod
cd ../dunn-rite-roofing-houston && vercel --prod
cd ../american-residential-hvac-lv && vercel --prod
```

## Rapid QA Before Send
1. Replace One Pro placeholder phone with verified number.
2. Wire forms to webhook/Formspree endpoint.
3. Verify click-to-call + mobile hero layout.
4. Confirm each title/meta has city + service.
5. Test submit flow once forms are connected.

## Rapid Send Snippet
- Subject: `Quick live preview for {{business_name}}`
- CTA: `If this direction looks good, I can launch your branded live version in 48 hours with your exact services, photos, and intake flow.`
