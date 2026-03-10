# Premium V3 Wave 2 — Deployment Notes

## Draft Variants Produced (Top Outreach Targets)
1. **Landscaping:** `sites/premium-v3-wave2/pnw-lawncare/index.html`
   - Target: PNW Lawncare (gpass-wa-202, P1, score 88)
   - Phone: (509) 868-9559
   - Email: pnwlawncarellc@gmail.com

2. **Roofing:** `sites/premium-v3-wave2/forever-roofing/index.html`
   - Target: Forever Roofing (gpass-pnw-214, P1, score 84)
   - Phone: (206) 261-3683
   - Email: info@foreverroofing.net

3. **Handyman:** `sites/premium-v3-wave2/handyman-rescue-team/index.html`
   - Target: Handyman Rescue Team (gpass-pnw-213, P1, score 86)
   - Phone: (206) 736-3060
   - Email: sos@handymanrescue.team

---

## Why these are launch-ready
- Built from V3 premium factory pattern (proof-heavy hero, fast callback, final detailed quote section)
- Mobile-friendly layouts with horizontally scannable service cards
- Vertical-specific copy/tone and offer blocks
- Direct contact details prefilled to shorten turnaround from draft to outreach demo

## 10-Minute Pre-Launch QA (per site)
1. Replace any placeholder KPI values with known-safe estimates or remove metric claims.
2. Connect both forms to real endpoint (Formspree/Webhook/CRM).
3. Validate click-to-call links on mobile.
4. Confirm meta title/description in browser tab and page source.
5. Run Lighthouse mobile pass (target >90 perf where possible).
6. Quick legal pass on guarantees/warranty language.

## Fast Deploy (Vercel CLI static)
Run per folder:
```bash
cd sites/premium-v3-wave2/pnw-lawncare
vercel --prod

cd ../forever-roofing
vercel --prod

cd ../handyman-rescue-team
vercel --prod
```

If project linking is needed first run:
```bash
vercel
```
and accept static defaults.

## Outreach Demo Hook (recommended)
Use these as "live makeover previews" in first-touch outreach:
- Subject: `Quick preview site for {{business_name}}`
- CTA: "If you like this direction, we can ship your branded live version in 48 hours."
