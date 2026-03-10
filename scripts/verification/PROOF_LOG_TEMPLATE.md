# Proof Log Template — Automation Verification

Use this format for audits and handoff evidence.

---

## Header
- Run Timestamp:
- Environment (local/staging/prod):
- Script Version / Commit:
- Operator:

## Summary
- Total tests:
- Passed:
- Failed:
- Pass rate:

## Test Matrix
| Area | Test Name | Status | Notes |
|---|---|---|---|
| lead_qualification | ... | PASS/FAIL | ... |
| dedupe | ... | PASS/FAIL | ... |
| outreach_queue | ... | PASS/FAIL | ... |
| webhook_idempotency | ... | PASS/FAIL | ... |

## Detailed Evidence (repeat per test)
### [Area] — [Test Name]
**Status:** PASS/FAIL  
**Timestamp:**

**Input**
```json
{ "sample": true }
```

**Expected**
```json
{ "result": "..." }
```

**Actual**
```json
{ "result": "..." }
```

**Pass/Fail Evidence**
- Assertion / rule checked:
- Why this passed/failed:
- Related IDs (lead IDs, event IDs, dedupe keys):

## Sign-off
- Reviewer:
- Decision: APPROVED / BLOCKED
- Follow-up actions:
