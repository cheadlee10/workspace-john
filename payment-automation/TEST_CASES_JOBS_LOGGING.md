# Test Cases: Payment Webhooks -> jobs.jsonl Logging

Scope: verify contract, idempotency, and logging correctness.

## A) Happy Path

### TC-001 Paid checkout writes one job row
- **Given:** valid signed `checkout.session.completed` with `payment_status=paid`
- **When:** webhook received first time
- **Then:**
  - returns `200`
  - appends exactly one line to `jobs.jsonl`
  - appends exactly one line to `idempotency_keys.jsonl`
  - job line includes `notes` containing `evt_` and `cs_` ids

### TC-002 Metadata mapping correctness
- Validate `service`, `tier`, `client`, `amount`, `paid_date` map as defined.

## B) Idempotency / Retry

### TC-003 Duplicate same event id
- Send same signed payload twice.
- Expect only first call writes job; second returns `200` no-op.

### TC-004 Different event id, same checkout session + type
- Simulate replay edge case.
- Expect no second `jobs.jsonl` write.

### TC-005 Stripe retry after transient `500`
- Force first attempt to fail before write, second succeeds.
- Expect exactly one final job row.

## C) Validation / Security

### TC-006 Invalid signature
- Expect `400`, no writes to jobs/idempotency stores.

### TC-007 Unsupported event type
- Signed `payment_intent.created`.
- Expect `200`, no writes.

### TC-008 Missing required job reference
- Signed paid event without `metadata.job_id` and without `client_reference_id`.
- Expect no `jobs.jsonl` write; dead-letter log created.

## D) Data Integrity

### TC-009 Amount normalization
- `amount_total=29900`, currency `usd` -> `amount=299` in jobs.

### TC-010 Date normalization
- Unix timestamp correctly transformed to local `YYYY-MM-DD`.

### TC-011 Notes audit trace
- Ensure notes include `stripe:cs_...` and `evt:evt_...`.

### TC-012 File append integrity
- Simulate concurrent webhook deliveries.
- Confirm each line is valid JSON, newline-delimited, no partial lines.

## E) Negative / Operational

### TC-013 jobs.jsonl write permission error
- Expect `500`, incident logged, no idempotency key persisted.

### TC-014 Idempotency file temporarily unavailable
- If job write succeeds and idempotency write fails, retry must not duplicate jobs.

### TC-015 Malformed JSON body
- Expect `400`, no writes.

---

## Minimal Test Payload Fixture (example)

```json
{
  "id": "evt_test_001",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_001",
      "payment_status": "paid",
      "amount_total": 29900,
      "currency": "usd",
      "created": 1772448000,
      "client_reference_id": "job_2026_03_02_001",
      "customer_details": {
        "name": "Acme Co",
        "email": "ops@acme.co"
      },
      "metadata": {
        "service": "Excel Audit",
        "tier": "Better",
        "source": "website_checkout"
      }
    }
  }
}
```

## Execution Checklist (Concrete Next Steps)

- [ ] Add fixture files under `payment-automation/fixtures/`:
  - [ ] `stripe_checkout_completed_paid.json`
  - [ ] `stripe_checkout_completed_unpaid.json`
  - [ ] `stripe_unsupported_event.json`
- [ ] Build test runner script `payment-automation/run_webhook_tests.ps1`
- [ ] Add assertions script to validate `jobs.jsonl` delta count
- [ ] Add CI/local command to execute all 15 tests in sequence
- [ ] Record test run output to `payment-automation/test_runs/YYYY-MM-DD.md`
