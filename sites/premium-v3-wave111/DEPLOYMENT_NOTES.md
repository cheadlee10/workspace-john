# Premium V3 Wave 111 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave111/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `bee-s-plumbing-and-heating-seattle-wa` (Lead: gpass-us-440 | Bee's Plumbing & Heating | Seattle, WA | Plumbing/Heating | priority 83 | est $960)
2. `good-shepherd-fence-company-indianapolis-in` (Lead: gpass-us-302 | Good Shepherd Fence Company | Indianapolis, IN | Fencing | priority 83 | est $940)
3. `21-roofing-group-charlotte-nc` (Lead: gpass-us-461 | 21 Roofing Group | Charlotte, NC | Roofing | priority 83 | est $930)
4. `lightning-bug-electric-atlanta-ga` (Lead: gpass-us-308 | Lightning Bug Electric | Atlanta, GA | Electrical | priority 83 | est $930)
5. `valley-landscaping-phoenix-az-85003` (Lead: nosite-050 | Valley Landscaping | Phoenix, AZ 85003 | Landscaping | priority 83 | est $800)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
