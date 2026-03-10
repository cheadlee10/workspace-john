# Premium V3 Wave 16 - Deployment Notes

Date: 2026-03-02
Wave Folder: `sites/premium-v3-wave16`

## Built Pages (highest-priority uncovered leads)
1. `cj-north-west-roofing-shoreline-wa` (est. $1100, outreach ID: `gpass-pnw-244`, tier: P1)
2. `bluefrog-plumbing-drain-of-north-dallas-dallas-tx` (est. $1010, outreach ID: `gpass-us-308`, tier: P1)
3. `atlanta-plumbing-drain-atlanta-ga` (est. $990, outreach ID: `gpass-us-321`, tier: P1)
4. `rc-roofing-denver-denver-co` (est. $1120, outreach ID: `gpass-us-282`, tier: P1)
5. `degeorge-plumbing-hvac-phoenix-az` (est. $1080, outreach ID: `gpass-us-309`, tier: P1)

## Selection Notes
- Source file: `outreach_queue.jsonl`
- Selection criteria: `priority_tier = P1`, then highest `priority_score`, then `estimated_value`, excluding leads represented in previous premium waves.
- Tie handling: where `priority_score` tied at 85/84, selected highest remaining estimated values first.

## Conversion Structure Included
- Hero section with dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 service bullets)
- Detailed quote capture form with project-details textarea
- Contact reinforcement with click-to-call (+ email where available)

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. `/contact` backend handler is still not wired for production routing (submission destination unresolved).
2. Analytics/event instrumentation not bundled in these static pages (GA4/Meta/CAPI absent).
3. No deploy alias/route mapping committed yet for wave16 pages.
4. Missing verified emails in source data for `gpass-us-321` and `gpass-us-309`; pages use call-first contact reinforcement for those leads.
