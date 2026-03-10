# Premium V3 Wave 5 - Deployment Notes + Outreach Hooks

## New Top-Priority Recovery Demos
1. `sites/premium-v3-wave5/houston-roofing-repair-experts/index.html`
   - Lead: **Houston Roofing Repair Experts**
   - Contact: 832-300-9947
   - Outreach hook: "Built a conversion-first Houston roofing draft focused on urgent repair calls and inspection bookings."

2. `sites/premium-v3-wave5/austin-auto-doctor-mobile-mechanic/index.html`
   - Lead: **Austin Auto Doctor Mobile Mechanic**
   - Contact: 512-502-4698
   - Outreach hook: "Created a premium mobile-mechanic demo that drives quote calls from stranded and busy car owners."

3. `sites/premium-v3-wave5/asap-auto-repair-austin/index.html`
   - Lead: **ASAP Auto Repair Austin**
   - Contact: 512-832-5800
   - Outreach hook: "Built a high-trust auto repair concept that positions ASAP as the fast-response option for Austin drivers."

4. `sites/premium-v3-wave5/lawn-care-landscape-port-orange/index.html`
   - Lead: **Lawn Care & Landscape Port Orange**
   - Contact: 888-270-8355
   - Outreach hook: "Put together a premium landscaping demo tailored for multi-city dispatch and recurring lawn-plan signups."

5. `sites/premium-v3-wave5/orlando-lawn-mowing-today/index.html`
   - Lead: **Orlando Lawn Mowing Today**
   - Contact: 407-600-6881
   - Outreach hook: "Built a same-day lawn service draft that captures urgent mowing requests and turns them into repeat customers."

## Immediate Deploy Commands
```bash
cd sites/premium-v3-wave5/houston-roofing-repair-experts && vercel --prod
cd ../austin-auto-doctor-mobile-mechanic && vercel --prod
cd ../asap-auto-repair-austin && vercel --prod
cd ../lawn-care-landscape-port-orange && vercel --prod
cd ../orlando-lawn-mowing-today && vercel --prod
```

## QA before sending preview links
1. Confirm click-to-call opens dialer on mobile.
2. Replace placeholder quote module with live Formspree/webhook endpoint.
3. Add business-specific photos/logo before final production handoff.
4. Validate title/meta contain service + city.
5. Run 390px mobile pass for hero + CTA stack.

## Subject + CTA snippet
- Subject: `Quick live preview for {{business_name}}`
- CTA: `If this direction looks right, I can launch your branded live version in 48 hours with your exact services and intake flow.`