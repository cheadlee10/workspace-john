#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { normalizeStripeEvent, mapToJobRow } = require("./webhook_normalizer");
const { IdempotencyStore } = require("./idempotency_store");

function appendJsonl(filePath, row) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, JSON.stringify(row) + "\n", "utf8");
}

function nowIso() {
  return new Date().toISOString();
}

function main() {
  const fixturePath = process.argv[2];
  if (!fixturePath) {
    console.error("Usage: node payment-automation/scripts/simulate_webhook.js <fixture.json>");
    process.exit(1);
  }

  const workspaceRoot = path.resolve(__dirname, "..", "..");
  const jobsPath = path.join(workspaceRoot, "jobs.jsonl");
  const idempotencyPath = path.resolve(__dirname, "..", "idempotency_keys.jsonl");
  const deadLetterPath = path.resolve(__dirname, "..", "dead_letter_events.jsonl");
  const incidentsPath = path.resolve(__dirname, "..", "payment_incidents.jsonl");

  const payload = JSON.parse(fs.readFileSync(path.resolve(fixturePath), "utf8"));
  const normalized = normalizeStripeEvent(payload);

  if (!normalized.supported) {
    console.log("200 no-op unsupported event");
    return;
  }

  const store = new IdempotencyStore(idempotencyPath);
  if (store.hasEvent(normalized.provider_event_id)) {
    console.log("200 duplicate provider_event_id");
    return;
  }

  if (store.hasComposite(normalized.checkout_session_id, normalized.event_type)) {
    console.log("200 duplicate composite checkout_session_id+event_type");
    return;
  }

  if (normalized.payment_status !== "paid") {
    console.log("200 no-op unpaid state");
    return;
  }

  if (!normalized.job_ref) {
    appendJsonl(deadLetterPath, {
      received_at: nowIso(),
      provider: "stripe",
      provider_event_id: normalized.provider_event_id,
      reason: "missing_job_ref",
      event_type: normalized.event_type,
    });
    console.log("200 dead-letter missing job_ref");
    return;
  }

  try {
    const jobRow = mapToJobRow(normalized);
    appendJsonl(jobsPath, jobRow);

    store.append({
      provider: "stripe",
      provider_event_id: normalized.provider_event_id,
      event_type: normalized.event_type,
      checkout_session_id: normalized.checkout_session_id,
      job_id: normalized.job_ref,
      amount: normalized.amount,
      currency: normalized.currency,
      processed_at: nowIso(),
      jobs_jsonl_write: "success",
    });

    console.log("200 processed");
  } catch (err) {
    appendJsonl(incidentsPath, {
      occurred_at: nowIso(),
      provider: "stripe",
      provider_event_id: normalized.provider_event_id,
      reason: "write_failure",
      error: String(err.message || err),
    });
    console.error("500 transient failure");
    process.exit(2);
  }
}

main();
