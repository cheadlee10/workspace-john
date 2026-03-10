# Verification Harness (Automation Claims)

This harness validates four critical automation claims:

1. Lead qualification logic
2. Deduplication correctness
3. Outreach queue generation
4. Webhook idempotency

## Run
```bash
python scripts/verification/verify_automation_claims.py
```

## Output
Each run generates:
- `scripts/verification/output/proof_log_YYYYMMDD_HHMMSS.json`
- `scripts/verification/output/proof_log_YYYYMMDD_HHMMSS.md`

The proof logs include test input, expected result, actual result, and pass/fail evidence.

## Files
- `verify_automation_claims.py` — executable harness
- `CHECKLIST.md` — manual verification checklist
- `PROOF_LOG_TEMPLATE.md` — reusable evidence format for audits/handoffs
- `output/` — generated run artifacts

## Notes
- Scoring and qualification thresholds are deterministic so claims are reproducible.
- Dedupe logic tests case/format normalization and collision retention policy.
- Idempotency tests verify duplicate webhook suppression by key/event ID.
