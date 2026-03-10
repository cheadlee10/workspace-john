# Premium V3 Wave 50 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave50`
Pages built: 5

## Included demos
1. `valle-landscaping-phoenix-az` (NS001)
2. `jose-s-landscaping-phoenix-az` (NS005)
3. `masterazscapes-phoenix-az` (NS004)
4. `divine-design-landscaping-phoenix-phoenix-az` (NS110)
5. `colorado-s-best-fence-company-denver-co` (NS064)

## Selection rationale
- Chosen from uncovered highest-intent records in `nosite_top20_leads.jsonl` (priority=1 cohort).
- Focused on service categories with strong quote intent (landscaping and fence installation).

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm lead routing/notification maps new business slugs to outreach records.
- Smoke test both forms per page after deploy.

## Blockers / risks
- No live endpoint verification was performed in this build pass (static artifact only).
- Public listing-based placeholders are used where direct business phone numbers were unavailable.
