const fs = require("fs");

class IdempotencyStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.byEvent = new Set();
    this.byComposite = new Set();
    this.loaded = false;
  }

  load() {
    this.byEvent.clear();
    this.byComposite.clear();
    if (!fs.existsSync(this.filePath)) {
      this.loaded = true;
      return;
    }

    const lines = fs.readFileSync(this.filePath, "utf8").split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const row = JSON.parse(line);
        if (row.provider_event_id) this.byEvent.add(row.provider_event_id);
        if (row.checkout_session_id && row.event_type) {
          this.byComposite.add(`${row.checkout_session_id}::${row.event_type}`);
        }
      } catch {
        // Ignore malformed line; startup integrity checks handled elsewhere.
      }
    }

    this.loaded = true;
  }

  ensureLoaded() {
    if (!this.loaded) this.load();
  }

  hasEvent(providerEventId) {
    this.ensureLoaded();
    return this.byEvent.has(providerEventId);
  }

  hasComposite(checkoutSessionId, eventType) {
    this.ensureLoaded();
    return this.byComposite.has(`${checkoutSessionId}::${eventType}`);
  }

  append(record) {
    this.ensureLoaded();
    fs.appendFileSync(this.filePath, JSON.stringify(record) + "\n", "utf8");
    if (record.provider_event_id) this.byEvent.add(record.provider_event_id);
    if (record.checkout_session_id && record.event_type) {
      this.byComposite.add(`${record.checkout_session_id}::${record.event_type}`);
    }
  }
}

module.exports = { IdempotencyStore };
