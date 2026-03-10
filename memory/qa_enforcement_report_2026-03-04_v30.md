# QA Enforcement Report — Sales Assets
**Version:** v30  
**Date:** 2026-03-04  
**Scope:** Current production-facing sales templates + memory guidance consistency/compliance audit.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance/governance contradictions still active).**

### Delta vs v29
- ✅ `templates/send_ops_queue_v29.md` now exists (version-skew issue from v29 is resolved).
- ❌ Canonical cadence conflict still unresolved across authority docs vs template usage.
- ❌ First-touch pricing policy still contradictory (`STANDING_ORDERS.md` vs `memory/KNOWLEDGE.md`).
- ❌ Mandatory send/compliance gates are still not embedded in active packs (`email_outreach_pack_v29.md`, `send_ops_queue_v29.md`, `site_demo_pack_v29.md`).
- ❌ Queued email format still violates standing rules (body bullets + multi-CTA options).

---

## Assets Reviewed (v30)
- `templates/email_outreach_pack_v29.md`
- `templates/send_ops_queue_v29.md`
- `templates/site_demo_pack_v29.md`
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- Baseline comparison: `memory/qa_enforcement_report_2026-03-04_v29.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Cadence policy conflict remains (HIGH)
**Evidence**
- `STANDING_ORDERS.md`: Day 1 / Day 5 / Day 10.
- `memory/KNOWLEDGE.md`: 3-7-7 (Day 0 / Day 3 / Day 10, optional Day 17).
- `templates/email_outreach_pack_v29.md`: +2 / +5 / +9 / +14.

**Risk**
- Inconsistent follow-up execution and invalid A/B attribution.

**Required fix**
- Publish one canonical cadence in one authority section; force all packs/queues to inherit verbatim.

---

### 2) First-touch pricing conflict remains (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: no first-touch pricing.
- `STANDING_ORDERS.md` pitch formula includes pricing in short email body.

**Risk**
- Reps will send inconsistent first-touch copy by channel/operator.

**Required fix**
- Explicit stage split: first-touch cold outreach (no pricing) vs post-interest/demo follow-up (pricing allowed).

---

### 3) Missing hard send gate in active email pack (HIGH)
**Evidence**
- `templates/email_outreach_pack_v29.md` has guidance but no mandatory blocker gate section.

**Risk**
- Preventable non-compliant sends (placeholder leaks, non-canonical sequencing).

**Required fix**
- Add top-of-file mandatory `SEND GATE — NON-NEGOTIABLE` with fail-stop behavior.

---

### 4) SMS compliance controls still missing in active queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v29.md` does not define required sender-ID language, STOP/opt-out handling, suppression schema, or recipient-local legal send window constraints.

**Risk**
- TCPA/state-law risk, complaint risk, sender reputation/account risk.

**Required fix**
- Add immutable SMS compliance block + suppression workflow to queue template.

---

### 5) Memory-layer pricing source of truth still conflicted (MEDIUM)
**Evidence**
- `memory/KNOWLEDGE.md` and `STANDING_ORDERS.md`: active $0-down monthly tiers.
- `MEMORY.md` still contains active-strategy wording for legacy `$250` and `$250 + $10/mo` model.

**Risk**
- Quote inconsistency and reduced trust in outbound/sales calls.

**Required fix**
- Mark legacy pricing explicitly historical/deprecated in `MEMORY.md`; point to active SOT docs.

---

### 6) Site demo pack has placeholders without a publish blocker (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v29.md` includes unresolved placeholders (`[XX]`, `[Client Name]`, etc.) but no hard pre-publish gate.

**Risk**
- Client-facing placeholder leakage.

**Required fix**
- Add `PRE-PUBLISH QA GATE (BLOCKER)` section with strict fail condition.

---

### 7) Queued email output format conflicts with standing email rules (MEDIUM)
**Evidence**
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md` includes in-body bullet lines for links and offers 3 CTA options per lead.
- `STANDING_ORDERS.md` requires one CTA and no bullet lists in email body.

**Risk**
- Production output deviates from standard and weakens consistency.

**Required fix**
- Enforce generator standard: no body bullets, exactly one CTA, sentence cap.

---

### 8) Governance artifact still missing: release manifest (MEDIUM)
**Evidence**
- No current send-ready bundle manifest naming approved files, owner, timestamp, and state.

**Risk**
- Operators can still run stale/mixed files despite v29 alignment.

**Required fix**
- Add mandatory release manifest per outbound batch.

---

## Positive Findings (PASS)
- `email_outreach_pack_v29.md`, `send_ops_queue_v29.md`, and `site_demo_pack_v29.md` now exist as a version-aligned trio.
- Core copy quality remains strong and practical.
- Queue sequencing/priority logic is execution-friendly.

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v29.md`
```md
## SEND GATE — NON-NEGOTIABLE (First Touch)
- Body <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No unresolved placeholders
- Cadence lock: [CANONICAL_CADENCE]
- For web/no-site outreach: include 1 visual proof URL (live preview or screenshot)
- If any gate fails: DO NOT SEND
```

### B) Add to top of `templates/send_ops_queue_v29.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS identifies sender + company
- Include opt-out language where required (e.g., "Reply STOP to opt out")
- Send only in recipient-local legal contact windows
- On STOP/revocation/complaint: immediate suppression + halt all outbound
- Log suppression event before next send window

Suppression schema:
lead_id, channel, event_type, source, timestamp_local, operator
```

### C) Add to `MEMORY.md`
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound pricing: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" models are historical/deprecated for new outbound.
- If docs conflict, use `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` pricing sections.
```

### D) Add to `templates/site_demo_pack_v29.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output ([XX], [Client Name], etc.)
- Replace all placeholder proof stats with verified values or remove the section
- If any placeholder remains, do not send or publish
```

### E) Add generator standard for `email-templates/*`
```md
## STANDING-ORDERS SAFE EMAIL FORMAT
- No bullet lists in body
- Exactly one CTA line
- Max 7 body sentences
- Visual proof links must be inline sentence links
```

### F) Resolve cadence in authority docs (`memory/KNOWLEDGE.md` + `STANDING_ORDERS.md`)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates and queue logic must inherit this cadence
```
*(If leadership chooses Day 1/5/10 instead, publish once and enforce globally.)*

### G) Add release manifest requirement
```md
## Release Manifest (Required)
- Bundle versions must match (email pack / site pack / send ops queue)
- Include timestamp + owner + status (draft/send-ready)
- If any file is missing/misaligned, mark bundle HOLD
```

---

## Pass/Fail Checklist (v30)

### A) Release Integrity
- [x] **PASS** Template trio version-aligned (`email/site/send_ops` all v29)
- [ ] **FAIL** Send-ready release manifest exists for current bundle

### B) Cold Email Compliance
- [ ] **FAIL** Mandatory send gate present in active outreach pack
- [ ] **FAIL** Canonical cadence enforced across authority docs/templates
- [ ] **FAIL** First-touch pricing rule conflict resolved
- [ ] **FAIL** Visual-proof requirement hard-gated for web/no-site outreach

### C) SMS/TCPA Controls
- [ ] **FAIL** Sender ID + opt-out handling embedded in active queue
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Recipient-local legal send-window guardrail embedded

### D) Policy Consistency
- [ ] **FAIL** Pricing SOT conflict resolved across `MEMORY.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Standing-orders-safe queued email export format enforced

### E) Quality Gates
- [x] **PASS** Copy quality/readability remains strong in v29 assets
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded in site/demo pack

**Current score:** **FAIL** (blocking: cadence conflict + first-touch pricing conflict + missing send/SMS hard gates)

---

## Final QA Decision
**v30 Enforcement Result: FAIL — hold scaled outbound until Fix Pack A–G is implemented and re-verified.**
