# Premium V3 Wave 3 — Deployment Notes + Outreach Hooks

## New Highest-Priority Draft Demos Built
1. `sites/premium-v3-wave3/joses-landscaping-phx/index.html`
   - Lead: **NS005 — Jose's Landscaping** (Phoenix, AZ, P1)
   - Contact: (623) 396-8694
   - Outreach hook: "I mocked up a conversion-first Phoenix landscaping site for Jose's Landscaping that can turn photo browsers into quote requests in under 2 clicks."

2. `sites/premium-v3-wave3/divine-design-landscaping-phx/index.html`
   - Lead: **NS110 — Divine Design Landscaping Phoenix** (Phoenix, AZ, P1)
   - Contact: (602) 769-4564
   - Outreach hook: "Built a premium draft that showcases your reputation and funnels high-ticket design/build inquiries with a fast callback promise."

3. `sites/premium-v3-wave3/masterazscapes/index.html`
   - Lead: **NS004 — MasterAZScapes** (Phoenix, AZ, P1)
   - Contact: (602) 975-3648
   - Outreach hook: "Created a mobile-first quote funnel concept that pre-qualifies Phoenix landscaping leads before they call your team."

4. `sites/premium-v3-wave3/colorados-best-fence-company/index.html`
   - Lead: **NS064 — Colorado's Best Fence Company** (Denver, CO, P1)
   - Contact: no verified phone in lead file (phone CTA removed; quote CTA retained)
   - Outreach hook: "Made a trust-first fence contractor demo that highlights 25+ years in business and warranty value to command better jobs."

5. `sites/premium-v3-wave3/joes-appliance-repair-lv/index.html`
   - Lead: **NS033 — Joe's Appliance Repair LV** (Las Vegas, NV, P1)
   - Contact: 702-801-4525
   - Outreach hook: "Put together a veteran-tech appliance repair draft focused on same-day booking and clear diagnostic-to-repair conversion."

## Immediate Deploy Commands
```bash
cd sites/premium-v3-wave3/joses-landscaping-phx && vercel --prod
cd ../divine-design-landscaping-phx && vercel --prod
cd ../masterazscapes && vercel --prod
cd ../colorados-best-fence-company && vercel --prod
cd ../joes-appliance-repair-lv && vercel --prod
```

## 7-Minute QA Before Sending Prospect Link
1. Verify business phone/email on-page (Colorado fence currently has placeholder phone).
2. Connect both forms to temporary webhook/Formspree endpoint.
3. Mobile check: hero CTA and click-to-call visible without scrolling.
4. Confirm title/meta description are vertical + city specific.
5. Test page load + no layout breaks at 390px width.

## Copy/Paste Outreach Subject + CTA
- Subject: `Quick live preview for {{business_name}}`
- Body CTA: `If this direction looks good, I can publish your branded live version in 48 hours with your exact services, photos, and intake flow.`
