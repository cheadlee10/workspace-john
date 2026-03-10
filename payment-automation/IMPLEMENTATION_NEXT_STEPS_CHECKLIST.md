# Payment Automation - Execution-Ready Checklist

## Phase 1: Contracts Locked (Completed)
- [x] Webhook inbound contract documented (`WEBHOOK_CONTRACTS.md`)
- [x] Event normalization contract documented (`WEBHOOK_CONTRACTS.md`)
- [x] Idempotency key strategy documented (`IDEMPOTENCY_MAPPING.md`)
- [x] Test cases documented (`TEST_CASES_JOBS_LOGGING.md`)

## Phase 2: Build Assets (Now in Repo)
- [x] Fixture payloads created under `payment-automation/fixtures/`
  - [x] `stripe_checkout_completed_paid.json`
  - [x] `stripe_checkout_completed_unpaid.json`
  - [x] `stripe_unsupported_event.json`
- [x] Normalizer helper added: `payment-automation/scripts/webhook_normalizer.js`
- [x] Idempotency helper added: `payment-automation/scripts/idempotency_store.js`
- [x] Local simulation script added: `payment-automation/scripts/simulate_webhook.js`
- [x] Test runner added: `payment-automation/run_webhook_tests.ps1`

## Phase 3: Integrate into API Endpoint (Pending)
- [ ] Implement `/api/webhooks/stripe` raw-body route in production API
- [ ] Add Stripe signature verification using `STRIPE_WEBHOOK_SECRET`
- [ ] Wire normalizer + idempotency helpers into endpoint flow
- [ ] Add dead-letter logging to `payment-automation/dead_letter_events.jsonl`
- [ ] Add incident logging to `payment-automation/payment_incidents.jsonl`

## Phase 4: Verify Locally (Command-Ready)
- [ ] Run:
  - `./payment-automation/run_webhook_tests.ps1`
- [ ] Confirm expected outputs:
  - `jobs.jsonl` contains exactly 1 row after duplicate replay
  - `payment-automation/idempotency_keys.jsonl` contains exactly 1 row
  - `payment-automation/test_runs/YYYY-MM-DD.md` created
- [ ] Execute full TC-001..TC-015 once API endpoint is wired

## Phase 5: Launch Readiness
- [ ] Set Stripe production webhook endpoint: `/api/webhooks/stripe`
- [ ] Configure production `STRIPE_WEBHOOK_SECRET`
- [ ] Send small live payment smoke test
- [ ] Confirm `jobs.jsonl` notes include `evt_...` and `cs_...`

## Definition of Done (DoD)
- [ ] Duplicate webhook retries never create duplicate `jobs.jsonl` rows
- [ ] Invalid signatures always return `400` with zero file writes
- [ ] Paid events write `jobs.jsonl` first, then idempotency key second
- [ ] Failure path logs incidents and safely supports Stripe retries
