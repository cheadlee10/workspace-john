# Premium V3 Wave 11 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave11

## Built Pages (highest-value uncovered leads from current gpass queue)
1. `spokane-roofing-company-spokane-wa` (est. $1250, outreach ID: gpass-pnw-248)
2. `valley-roofing-services-salem-or` (est. $1200, outreach ID: gpass-pnw-235)
3. `legacy-roofing-spokane-valley-wa` (est. $1200, outreach ID: gpass-pnw-240)
4. `509-roofs-spokane-valley-wa` (est. $1200, outreach ID: gpass-pnw-247)
5. `best-roofing-waterproofing-eugene-or` (est. $1100, outreach ID: gpass-pnw-236)

## Conversion Structure Included
- Hero with immediate dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 offer blocks)
- Detailed quote form with project detail capture
- Contact reinforcement with click-to-call in conversion section

## Form Endpoint Convention
- Current endpoint convention preserved: all forms post to `/contact`
- Hidden form metadata included on all forms:
  - `business` (site slug)
  - `source` (`quick_callback` / `detailed_quote`)

## Known Blockers / Follow-ups
1. **`/contact` backend handler still unbound** in production environment (needs webhook/API route).
2. **No analytics instrumentation present** (GA4/Meta events not configured on these static demos).
3. **No per-site deploy alias mapping committed** yet for this wave.
4. **Lead prioritization metadata gap:** queue file does not include explicit `priority` fields for these records; ranking used estimated value + uncovered status.
