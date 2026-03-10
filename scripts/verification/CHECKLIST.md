# Automation Claims Verification Checklist

Use this before declaring automation "working" in production.

## 1) Lead Qualification Logic
- [ ] Qualification rule is explicit (required channel, threshold, DNC exclusion).
- [ ] Borderline threshold cases tested (just below/just above threshold).
- [ ] DNC leads always fail qualification, regardless of score.
- [ ] Missing contact channel leads always fail qualification.
- [ ] Evidence stored in proof log with input + expected + actual.

## 2) Deduplication Correctness
- [ ] Duplicate detection covers email (case-insensitive).
- [ ] Duplicate detection covers phone (format-insensitive normalization).
- [ ] Fallback dedupe key for no-email/no-phone records (name+company normalization).
- [ ] Collision policy validated (which record is retained and why).
- [ ] Unique count in output matches expected count.

## 3) Outreach Queue Generation
- [ ] Queue excludes ineligible statuses (contacted/proposal_sent/closed/lost).
- [ ] Queue excludes already queued records.
- [ ] Queue excludes unqualified and DNC records.
- [ ] Queue ordering validated (score/value priority).
- [ ] Daily cap enforced exactly.

## 4) Webhook Idempotency
- [ ] Duplicate deliveries with same idempotency_key are ignored.
- [ ] Duplicate deliveries with same event_id are ignored.
- [ ] First event with unique key is processed.
- [ ] Fallback hash key behavior tested when no explicit key exists.
- [ ] Log includes accepted vs ignored counts.

## 5) Proof Log Quality Gate
- [ ] Every test includes reproducible input payload.
- [ ] Expected output/state is explicitly documented.
- [ ] Actual output/state captured from run artifact.
- [ ] PASS/FAIL status and reason recorded.
- [ ] Timestamp and test version/script path included.

## Run Command
```bash
python scripts/verification/verify_automation_claims.py
```

Output artifacts:
- `scripts/verification/output/proof_log_YYYYMMDD_HHMMSS.json`
- `scripts/verification/output/proof_log_YYYYMMDD_HHMMSS.md`
