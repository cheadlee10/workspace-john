# Premium V3 Wave 7 — Deployment Notes + Outreach Hooks

## New Highest-Priority Demos Not Previously Covered
1. `sites/premium-v3-wave7/tams-cleaning-solutions-chicago/index.html`
   - Lead: NS011 — Tams Cleaning Solutions (Priority 2)
   - Contact: (708) 295-6401
   - Hook: "Built a recurring-cleaning focused concept to convert Chicago households and office leads into weekly plans."

2. `sites/premium-v3-wave7/affordable-lawn-care-orlando/index.html`
   - Lead: NS070 — Affordable Lawn Care Orlando (Priority 2)
   - Contact: (407) 951-0206
   - Hook: "Created a same-week lawn booking funnel with clear recurring-plan upsell for Orlando routes."

3. `sites/premium-v3-wave7/affordable-fence-repair-portland/index.html`
   - Lead: NS024 — Affordable Fence Repair Portland (Priority 2)
   - Contact: (971) 708-3671
   - Hook: "Built a trust-led fence repair/replacement page emphasizing CCB license and urgent-call conversion."

4. `sites/premium-v3-wave7/2-kids-and-a-dad-landscaping-orlando/index.html`
   - Lead: NS073 — 2 KIDS & A DAD Landscaping Orlando (Priority 2)
   - Contact: (954) 857-7598
   - Hook: "Designed a family-story landscaping concept with text-photo estimate CTA to increase response rate."

5. `sites/premium-v3-wave7/lorena-house-cleaner-san-diego/index.html`
   - Lead: NS052 — Lorena House Cleaner San Diego (Priority 2)
   - Contact: (619) 908-0056
   - Hook: "Created a bilingual cleaning funnel concept positioned for fast text quotes across San Diego."

## Immediate Deploy Commands
```bash
cd sites/premium-v3-wave7/tams-cleaning-solutions-chicago && vercel --prod
cd ../affordable-lawn-care-orlando && vercel --prod
cd ../affordable-fence-repair-portland && vercel --prod
cd ../2-kids-and-a-dad-landscaping-orlando && vercel --prod
cd ../lorena-house-cleaner-san-diego && vercel --prod
```

## Blockers / TODO Before Live Send
1. **Form endpoint unknown**: all forms currently use `{{form_endpoint}}` placeholder and need Formspree/webhook URL.
2. Need verified brand assets (logos, real project photos, testimonials) for each business to reduce stock-demo feel.
3. Need legal business-name confirmation for use in `<title>`, H1, and outreach copy (especially punctuation-heavy names).
4. Final QA before send: mobile form usability, CTA anchor behavior, and call tracking/forwarding number readiness.
