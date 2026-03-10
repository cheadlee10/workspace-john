# Premium V3 Wave 13 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave13

## Built Pages (highest-priority uncovered leads)
1. `texas-certified-roofing-houston-tx` (est. $1150, outreach ID: gpass-us-293, tier: P1)
2. `langer-roofing-sheet-metal-milwaukee-wi` (est. $1150, outreach ID: gpass-us-285, tier: P1)
3. `martin-tomlinson-roofing-dallas-tx` (est. $1150, outreach ID: gpass-us-262, tier: P2)
4. `moss-roofing-houston-houston-tx` (est. $1120, outreach ID: gpass-us-294, tier: P1)
5. `walker-roofing-st-paul-minneapolis-mn` (est. $1120, outreach ID: gpass-us-288, tier: P1)

## Selection Notes
- Selected from uncovered queue records with highest `estimated_value` among IDs not represented in prior premium-v3 wave folders.
- Prior wave leads were excluded to avoid duplicate demo coverage.

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
4. **Queue quality caveat:** source mixes P1 and P2 tiers with no hard global rank field, so selection used uncovered status + estimated value.
