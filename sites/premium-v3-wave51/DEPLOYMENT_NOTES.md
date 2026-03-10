# Premium V3 Wave 51 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave51`
Pages built: 5

## Included demos
1. `license-dfw-pest-control-dallas-tx` (NS041)
2. `dunn-rite-roofing-houston-houston-tx` (NS044)
3. `houston-roofing-repair-experts-houston-tx` (NS045)
4. `austin-auto-doctor-mobile-mechanic-austin-tx` (NS018)
5. `affordable-fence-repair-portland-portland-or` (NS024)

## Selection rationale
- Chosen from currently uncovered highest-intent records in `nosite_top20_leads.jsonl` not used in the latest wave set.
- Prioritized urgent-service categories with strong quote intent: pest control, roofing, mobile mechanic, and fence repair.

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
