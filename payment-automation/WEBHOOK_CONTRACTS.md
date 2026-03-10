# Webhook Contracts (Stripe -> NorthStar)

Purpose: define exact webhook payload expectations and normalized internal event contract before touching production.

## 1) Inbound Endpoint Contract

- **Method:** `POST`
- **Route:** `/api/webhooks/stripe`
- **Headers (required):**
  - `stripe-signature`
  - `content-type: application/json`
- **Body:** raw Stripe event JSON (must verify signature against `STRIPE_WEBHOOK_SECRET`)
- **Success response:**
  - `200` with body `{ "received": true }` for verified + handled + idempotent duplicates
- **Error response:**
  - `400` on bad signature or malformed body
  - `500` on transient server errors (Stripe retries)

## 2) Stripe Event Types We Handle First

### `checkout.session.completed` (primary)
Use to create/update a job in `jobs.jsonl` when payment is captured.

Required fields from Stripe payload:
- `id` (event id) -> dedupe key source
- `type` = `checkout.session.completed`
- `data.object.id` (checkout session id)
- `data.object.payment_status` (must be `paid`)
- `data.object.amount_total` (minor units)
- `data.object.currency`
- `data.object.created` (unix ts)
- `data.object.client_reference_id` OR `metadata.job_id`
- `data.object.customer_details.email` (if present)
- `data.object.metadata` (service, tier, notes, source)

### `checkout.session.async_payment_succeeded` (optional early support)
If asynchronous methods are enabled later, treat as paid confirmation.

### `checkout.session.async_payment_failed` (optional)
Log but do not mark paid.

## 3) Normalized Internal Event Contract

Convert Stripe payload -> internal canonical shape before business logic.

```json
{
  "provider": "stripe",
  "provider_event_id": "evt_...",
  "event_type": "checkout.session.completed",
  "occurred_at": "2026-03-02T07:00:00.000Z",
  "checkout_session_id": "cs_...",
  "payment_status": "paid",
  "amount": 299,
  "currency": "usd",
  "job_ref": "job_2026_03_02_001",
  "client": {
    "email": "client@example.com",
    "name": "Client Name"
  },
  "metadata": {
    "service": "Excel Audit",
    "tier": "Better",
    "source": "website_checkout"
  },
  "raw": "<original payload stored only if needed>"
}
```

## 4) jobs.jsonl Write Contract on Paid Event

Append exactly one line per successful payment event:

```json
{
  "id": "job_2026_03_02_001",
  "date": "2026-03-02",
  "client": "Client Name",
  "service": "Excel Audit",
  "status": "completed",
  "amount": 299,
  "paid": true,
  "paid_date": "2026-03-02",
  "notes": "stripe:cs_test_123 | evt:evt_123 | tier:Better"
}
```

Rules:
- `amount` must be normalized to major units (e.g., cents -> dollars)
- `status` defaults to `completed` only when payment success is confirmed
- `notes` must include at minimum session + event trace ids for auditability

## 5) Rejection / No-Op Rules

Do **not** write to `jobs.jsonl` when:
- signature verification fails
- event type unsupported
- payment status not `paid`
- required job reference fields are missing (send to dead-letter log)

## 6) Dead-Letter Contract (recommended)

File: `payment-automation/dead_letter_events.jsonl`

```json
{
  "received_at": "2026-03-02T07:10:10.000Z",
  "provider": "stripe",
  "provider_event_id": "evt_...",
  "reason": "missing_job_ref",
  "event_type": "checkout.session.completed"
}
```

## 7) Immediate Build Tasks

- [ ] Implement signature verify using raw body + `STRIPE_WEBHOOK_SECRET`
- [ ] Build normalizer from Stripe payload to internal contract
- [ ] Gate job logging behind `payment_status === "paid"`
- [ ] Add dead-letter fallback for malformed-but-verified events
- [ ] Add explicit `200` idempotent duplicate response path
