# Premium V3 Wave 91 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave91/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields for `business` slug and form `source`

## Pages
1. `sacramento-emergency-mold-and-leak-team-sacramento-ca` (Lead: wave4-112)
2. `atlanta-emergency-roof-tarp-and-repair-atlanta-ga` (Lead: wave4-107)
3. `columbus-burst-pipe-and-cleanup-co-columbus-oh` (Lead: wave4-113)
4. `eugene-basement-flood-pump-out-pros-eugene-or` (Lead: sprint-20260303-047)
5. `fargo-basement-flood-pump-out-pros-fargo-nd` (Lead: sprint-20260303-055)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
