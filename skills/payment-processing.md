# Payment Processing Skill
*Secure, compliant payment acceptance via Stripe and PayPal.*

## Integration Targets
- **Stripe:** Payment links, Checkout, Billing for recurring
- **PayPal:** Express Checkout, Smart Buttons
- **Fallback:** Manual invoicing with due-date tracking

## Implementation Pattern
1. Client selects service tier on website
2. Frontend calls `/api/create-checkout` with service ID
3. Backend creates Stripe session or PayPal link
4. Redirect to payment URL
5. Webhook listener on `POST /webhooks/stripe` updates order status
6. Send confirmation email + invoice
7. Log to jobs.jsonl with payment metadata

## Security Checklist
- PCI-DSS compliance (never handle raw card data)
- Webhook signature verification
- HTTPS only
- Rate limiting on payment endpoints
- Fraud detection enabled
- Idempotency keys for retry safety

## Pricing Structure Format
```json
{
  "service": "Excel Audit",
  "tiers": [
    {"name": "Good", "price": 150, "features": ["..."]},
    {"name": "Better", "price": 300, "features": ["..."]},
    {"name": "Best", "price": 500, "features": ["..."]}
  ]
}
```

## Testing
- Stripe test mode first
- Use test card numbers (4242...)
- Verify webhooks fire correctly
- Test failure scenarios (declined cards, etc.)
