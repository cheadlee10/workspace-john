# QA Enforcement Report — Sales Assets
**Version:** v29  
**Date:** 2026-03-04  
**Scope:** Recent templates + memory/standing guidance consistency, compliance, and quality gates.

---

## Executive Verdict
**Overall status: FAIL (blocking policy/compliance contradictions remain).**

### Delta vs v28
- ✅ `templates/email_outreach_pack_v29.md` and `templates/site_demo_pack_v29.md` are published and readable.
- ❌ Release bundle is now **version-skewed**: no `send_ops_queue_v29.md` (latest queue remains `v28`).
- ❌ Prior blocker set (cadence conflict, first-touch pricing conflict, SMS compliance gate absence, placeholder publish gate absence) remains unresolved.
- ❌ Queued email output format still conflicts with standing email constraints.

---

## Assets Reviewed (v29 pass)
- `templates/email_outreach_pack_v29.md`
- `templates/site_demo_pack_v29.md`
- `templates/send_ops_queue_v28.md` (latest available send ops queue)
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `STANDING_ORDERS.md`
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md`
- Baseline comparison: `memory/qa_enforcement_report_2026-03-04_v28.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical follow-up cadence still contradictory across authority docs (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: 3-7-7 (Day 0 / Day 3 / Day 10, optional Day 17).
- `STANDING_ORDERS.md`: Day 1 / Day 5 / Day 10 (three touches max).
- `templates/email_outreach_pack_v29.md`: +2 / +5 / +9 / +14 days.

**Risk**
- Execution drift, broken testing/attribution, operator inconsistency.

**Required fix**
- Publish one canonical cadence in one authority file and force all templates/queues to inherit it verbatim.

---

### 2) First-touch pricing rule conflict is still unresolved (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: no first-touch pricing.
- `STANDING_ORDERS.md` pitch formula: body includes pricing.

**Risk**
- Non-deterministic messaging standards by sender/channel.

**Required fix**
- Split policy by stage/channel: cold first touch (no pricing) vs post-interest/demo follow-up (pricing allowed).

---

### 3) Email outreach pack v29 still missing hard send-gate section (HIGH)
**Evidence**
- `templates/email_outreach_pack_v29.md` has guidance but no mandatory blocker section (no explicit fail-send gate, no mandatory proof/placeholder checks).

**Risk**
- Placeholder leakage, multi-rule violations, non-compliant sends during volume execution.

**Required fix**
- Add top-of-file `SEND GATE — NON-NEGOTIABLE` with pass/fail conditions.

---

### 4) SMS queue still lacks compliance controls (HIGH)
**Evidence**
- Latest queue file `templates/send_ops_queue_v28.md` is SMS-first but has no explicit sender ID rule, opt-out language rule, suppression schema, or recipient-local legal send-window guardrail.

**Risk**
- TCPA/state exposure, complaint escalation, deliverability/account risk.

**Required fix**
- Add mandatory SMS compliance block + suppression workflow to active queue template.

---

### 5) Pricing source-of-truth mismatch persists in memory layer (MEDIUM)
**Evidence**
- `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md`: active $0-down subscription tiers.
- `MEMORY.md`: still includes active-strategy language for legacy `$250` / `$250 + $10/mo` close model.

**Risk**
- Quoting inconsistency and trust erosion in outbound conversations.

**Required fix**
- Mark legacy model historical/deprecated; add explicit active pricing source-of-truth callout in `MEMORY.md`.

---

### 6) Site demo pack v29 still has placeholders without publish blocker (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v29.md` still contains placeholder tokens (`[XX]`, `[Client Name]`, etc.) and no mandatory pre-publish gate.

**Risk**
- Client-facing placeholder leakage.

**Required fix**
- Add `PRE-PUBLISH QA GATE (BLOCKER)` section forbidding send/publish if placeholders remain.

---

### 7) Queued email assets still violate standing email format (MEDIUM)
**Evidence**
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md` uses in-body bullet lines for links and gives 3 CTA options per lead.
- `STANDING_ORDERS.md` requires one CTA and no bullet lists in email body.

**Risk**
- Production output deviates from standing policy and weakens consistency.

**Required fix**
- Enforce generator output standard: single CTA, no body bullets, concise sentence cap.

---

### 8) Release integrity regression: version skew in current template set (MEDIUM)
**Evidence**
- v29 exists for email + site demo, but no `send_ops_queue_v29.md`; latest queue remains v28.

**Risk**
- Operators may mix versions and execute stale queue logic.

**Required fix**
- Publish synchronized trio per wave (`email_outreach_pack_v29`, `site_demo_pack_v29`, `send_ops_queue_v29`) with timestamped manifest.

---

## Positive Findings (PASS)
- Copy quality remains strong in `email_outreach_pack_v29.md` and `site_demo_pack_v29.md`.
- Structure/readability of assets is execution-friendly.
- Send ops queue prioritization logic is practical (despite compliance/control gaps).

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v29.md`
```md
## SEND GATE — NON-NEGOTIABLE (First Touch)
- Body must be <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No placeholders at send time
- Cadence lock: [CANONICAL_CADENCE]
- For web/no-site outreach: include 1 visual proof URL (live preview or screenshot)
- If any gate fails: do not send
```

### B) Add to top of `templates/send_ops_queue_v29.md` (or current active queue)
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS identifies sender + company
- Include opt-out instruction where required (e.g., "Reply STOP to opt out")
- Send only within recipient-local legal contact windows
- On STOP/revocation/complaint: immediate suppression and halt all outbound
- Log suppression before next send block

Suppression schema:
lead_id, channel, event_type, source, timestamp_local, operator
```

### C) Add to `MEMORY.md` near pricing strategy sections
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound pricing: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" models are historical/deprecated for new outbound.
- If docs conflict, use `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` pricing sections.
```

### D) Add to `templates/site_demo_pack_v29.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in any client-facing output ([XX], [Client Name], etc.)
- Replace all placeholder proof stats with verified values or remove section
- If any placeholder remains, do not send or publish
```

### E) Add generator standard for `email-templates/*`
```md
## STANDING-ORDERS SAFE EMAIL FORMAT
- No bullet lists inside body
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
- Include generated timestamp + owner + status (draft/send-ready)
- If any file version is missing/misaligned, mark bundle HOLD
```

---

## Pass/Fail Checklist (v29)

### A) Release Integrity
- [ ] **FAIL** Template trio version-aligned (`email/site/send_ops` all v29)
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

**Current score:** **FAIL** (blocking: cadence + first-touch policy conflicts + missing SMS compliance gates)

---

## Final QA Decision
**v29 Enforcement Result: FAIL — hold scale-up until Fix Pack A–G is implemented and re-verified.**