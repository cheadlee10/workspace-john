# Premium V3 Wave 14 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave14

## Built Pages (highest-priority uncovered leads)
1. `done-right-works-tacoma-wa` (est. $700, outreach ID: gpass-wa-201, tier: P1)
2. `quality-pacific-roofing-seattle-wa` (est. $1200, outreach ID: gpass-pnw-220, tier: P1)
3. `canyon-roofing-llc-tucson-az` (est. $1200, outreach ID: gpass-us-254, tier: P1)
4. `neighborly-fencing-seattle-wa` (est. $950, outreach ID: gpass-pnw-230, tier: P1)
5. `pnw-lawncare-spokane-wa` (est. $800, outreach ID: gpass-wa-202, tier: P1)

## Selection Notes
- Selected from `outreach_queue.jsonl` where `priority_tier=P1`, excluding outreach IDs already represented in premium-v3 waves.
- Ranking heuristic used: priority tier, then `priority_score`, then `estimated_value`.

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
4. **Input source inconsistency:** some records use `priority_tier/priority_score`, while others only carry `estimated_value`; sorting currently depends on available fields.
