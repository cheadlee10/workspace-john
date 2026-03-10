# Premium V3 Wave 8 ? Deployment Notes + Outreach Hooks

## New Highest-Priority Demos Not Previously Covered
1. `sites/premium-v3-wave8/canyon-roofing-llc-tucson/index.html`
   - Lead: gpass-us-254 ? Canyon Roofing, LLC (Priority 88 / P1)
   - Contact: (520) 288-8282
   - Hook: "Built a storm-ready roofing funnel with emergency-call and financing CTAs to increase Tucson conversion volume."

2. `sites/premium-v3-wave8/frontier-landscaping-vancouver/index.html`
   - Lead: gpass-wa-203 ? Frontier Landscaping (Priority 87 / P1)
   - Contact: (360) 574-8979
   - Hook: "Created a design-build landscaping concept focused on faster quote requests and recurring maintenance upsell."

3. `sites/premium-v3-wave8/20-20-exteriors-spokane/index.html`
   - Lead: gpass-pnw-238 ? 20/20 Exteriors (Priority 86 / P1)
   - Contact: (509) 688-4480
   - Hook: "Designed an exterior-upgrade page that routes traffic into roof/siding inspection bookings and higher-ticket projects."

4. `sites/premium-v3-wave8/valley-landscape-spokane-inc/index.html`
   - Lead: gpass-pnw-242 ? Valley Landscape Spokane Inc. (Priority 86 / P1)
   - Contact: (509) 922-5632
   - Hook: "Built a recurring-service-first landscape funnel with clear seasonal cleanup and install service packaging."

5. `sites/premium-v3-wave8/salvador-roofing-tucson/index.html`
   - Lead: gpass-us-253 ? Salvador Roofing (Priority 86 / P1)
   - Contact: (520) 274-9255
   - Hook: "Created a trust-forward Tucson roofing concept emphasizing heat-ready materials and urgent leak response CTA."

## Immediate Deploy Commands
```bash
cd sites/premium-v3-wave8/canyon-roofing-llc-tucson && vercel --prod
cd ../frontier-landscaping-vancouver && vercel --prod
cd ../20-20-exteriors-spokane && vercel --prod
cd ../valley-landscape-spokane-inc && vercel --prod
cd ../salvador-roofing-tucson && vercel --prod
```

## Blockers / TODO Before Live Send
1. **Form endpoint unknown**: all forms currently use `{{form_endpoint}}` placeholder and need Formspree/webhook URL.
2. Brand assets not yet confirmed (logos, real project photos, review quotes) ? demos currently structured for fast replacement.
3. Need final legal-name/style confirmation for punctuation-heavy names (`20/20 Exteriors`, `Canyon Roofing, LLC`).
4. Run pre-send QA on mobile form flow, click-to-call behavior, and event tracking before production outreach.
