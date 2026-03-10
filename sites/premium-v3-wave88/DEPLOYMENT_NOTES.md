# Premium V3 Wave 88 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for uncovered high-intent leads.
Each page includes:
- Hero CTA to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` slug + `source` attribution

## Pages
1. `denver-same-day-drain-sewer-pros-denver-co` (wave4-108)
2. `orlando-no-cool-ac-rescue-orlando-fl` (wave4-109)
3. `nashville-break-in-board-up-glass-nashville-tn` (wave4-110)
4. `charlotte-weekend-garage-door-rescue-charlotte-nc` (wave4-111)
5. `boise-emergency-plumber-now-boise-id` (wave5-057)

## Suggested deploy check
- Verify each `index.html` renders and both forms POST to `/contact`.
- Confirm hidden `business` slug aligns with folder name for tracking.
- Smoke test CTA jump link to `#quote` on mobile + desktop.
