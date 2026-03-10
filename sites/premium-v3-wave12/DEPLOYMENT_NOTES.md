# Premium V3 Wave 12 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave12

## Built Pages (highest-priority uncovered leads)
1. `regal-roofing-and-contracting-seattle-wa` (est. $1500, outreach ID: nosite-037)
2. `arrington-roofing-dallas-tx` (est. $1200, outreach ID: gpass-us-269)
3. `elite-metal-roofing-llc-vancouver-wa` (est. $1200, outreach ID: gpass-pnw-210)
4. `klaus-roofing-systems-of-ohio-westerville-oh` (est. $1180, outreach ID: gpass-us-301)
5. `rainier-roofing-llc-tampa-fl` (est. $1180, outreach ID: gpass-us-280)

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
4. **Lead queue quality gap:** several top-value records appear in mixed source pools without explicit normalized `priority` field, so ranking used estimated value + uncovered status.
