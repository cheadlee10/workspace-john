const SUPPORTED_TYPES = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
]);

function unixToIso(unixTs) {
  return new Date(unixTs * 1000).toISOString();
}

function unixToDate(unixTs) {
  return new Date(unixTs * 1000).toISOString().slice(0, 10);
}

function amountToMajor(amountMinor, currency = "usd") {
  // Basic default for USD-like 2-decimal currencies.
  if (typeof amountMinor !== "number") return 0;
  return amountMinor / 100;
}

function normalizeStripeEvent(event) {
  if (!event || !event.id || !event.type || !event.data?.object) {
    throw new Error("invalid_event_shape");
  }

  if (!SUPPORTED_TYPES.has(event.type)) {
    return { supported: false, provider_event_id: event.id, event_type: event.type };
  }

  const o = event.data.object;
  return {
    supported: true,
    provider: "stripe",
    provider_event_id: event.id,
    event_type: event.type,
    occurred_at: unixToIso(o.created || Math.floor(Date.now() / 1000)),
    checkout_session_id: o.id,
    payment_status: o.payment_status || "unknown",
    amount: amountToMajor(o.amount_total, o.currency),
    currency: o.currency || "usd",
    job_ref: o.client_reference_id || o.metadata?.job_id || null,
    client: {
      email: o.customer_details?.email || null,
      name: o.customer_details?.name || o.metadata?.client || "Unknown Client",
    },
    metadata: o.metadata || {},
    source_created_unix: o.created || null,
  };
}

function mapToJobRow(normalized) {
  const createdUnix = normalized.source_created_unix || Math.floor(Date.now() / 1000);
  return {
    id: normalized.job_ref,
    date: unixToDate(createdUnix),
    client: normalized.client?.name || "Unknown Client",
    service: normalized.metadata?.service || "Service Purchase",
    status: "completed",
    amount: normalized.amount,
    paid: true,
    paid_date: unixToDate(createdUnix),
    notes: `stripe:${normalized.checkout_session_id} | evt:${normalized.provider_event_id} | tier:${normalized.metadata?.tier || "Unknown"}`,
  };
}

module.exports = {
  SUPPORTED_TYPES,
  normalizeStripeEvent,
  mapToJobRow,
};
