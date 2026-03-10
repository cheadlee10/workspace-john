# Idempotency Mapping (Payments -> jobs.jsonl)

Goal: ensure each paid Stripe event writes to `jobs.jsonl` exactly once.

## 1) Keys and Scope

Primary dedupe key hierarchy:
1. `provider_event_id` (`event.id`, e.g., `evt_...`)  **global unique per Stripe event**
2. fallback composite: `checkout_session_id + event_type`
3. final guard: `job_id + paid_date + amount`

Recommendation: persist all three where possible for defense in depth.

## 2) Idempotency Store Contract

File: `payment-automation/idempotency_keys.jsonl`

One line per processed event:

```json
{
  "provider": "stripe",
  "provider_event_id": "evt_123",
  "event_type": "checkout.session.completed",
  "checkout_session_id": "cs_test_123",
  "job_id": "job_2026_03_02_001",
  "amount": 299,
  "currency": "usd",
  "processed_at": "2026-03-02T07:11:00.000Z",
  "jobs_jsonl_write": "success"
}
```

## 3) Decision Table

| Condition | Action |
|---|---|
| Signature invalid | reject `400`, do not record key |
| Signature valid + event key unseen | process event, append job record, append idempotency key |
| Signature valid + event key already seen | return `200` no-op (duplicate retry) |
| Event key unseen but session+type seen | return `200` no-op, append warning log |
| Event paid=false | return `200` no-op (not payable state) |

## 4) Mapping from Event -> jobs.jsonl fields

| Stripe source | jobs.jsonl target | Notes |
|---|---|---|
| `metadata.job_id` or `client_reference_id` | `id` | Required; generate deterministic fallback if absent |
| `created` | `date` | format `YYYY-MM-DD` |
| `customer_details.name` or `metadata.client` | `client` | fallback `Unknown Client` |
| `metadata.service` | `service` | fallback `Service Purchase` |
| `amount_total` | `amount` | divide by 100 for USD-like currencies |
| `payment_status == paid` | `paid=true` + `paid_date` | `paid_date` as `YYYY-MM-DD` |
| successful event | `status=completed` | business rule for now |
| `id`, `session id`, `tier` | `notes` | audit trace |

## 5) Pseudocode (Implementation Guardrails)

```ts
if (!verifyStripeSignature(rawBody, stripeSignature)) return 400;
const event = parse(rawBody);
if (!SUPPORTED_TYPES.includes(event.type)) return 200;

const normalized = normalize(event);
if (normalized.payment_status !== 'paid') return 200;

if (idempotencyStore.has(normalized.provider_event_id)) return 200; // duplicate
if (idempotencyStore.hasComposite(normalized.checkout_session_id, normalized.event_type)) return 200;

appendJobsJsonl(mapToJob(normalized));
appendIdempotencyKey(normalized);
return 200;
```

## 6) Failure Recovery

If `jobs.jsonl` append fails after event accepted:
- Write incident to `payment-automation/payment_incidents.jsonl`
- Do **not** append idempotency key until job write succeeds
- Return `500` so Stripe retries

If job write succeeded but idempotency write fails:
- Return `500` and mark warning incident
- On retry, protect with additional guard by scanning recent `jobs.jsonl` notes for `evt_<id>` before appending duplicate

## 7) Next-Step Checklist

- [ ] Create idempotency reader/writer helper module
- [ ] Add in-memory + file-backed lookup by `provider_event_id`
- [ ] Add composite lookup by `checkout_session_id + event_type`
- [ ] Enforce "write job first, idempotency second" ordering
- [ ] Add startup integrity check for malformed idempotency lines
