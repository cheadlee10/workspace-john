# QA Enforcement Report — Sales Assets
**Version:** v32  
**Date:** 2026-03-04  
**Scope:** Latest sales assets and memory guidance consistency/compliance review

Reviewed:
- `templates/email_outreach_pack_v32.md`
- `templates/site_demo_pack_v32.md`
- `templates/send_ops_queue_v31.md` (latest available send-ops file)
- `memory/KNOWLEDGE.md`
- `STANDING_ORDERS.md`
- `MEMORY.md`
- Baseline reference: `memory/qa_enforcement_report_2026-03-04_v31.md`

---

## Executive Verdict
**Overall status: FAIL (policy-layer contradictions + missing compliance gates still block full send-safe status).**

### Delta vs v31
- ✅ `email_outreach_pack_v32.md` quality improved: single-CTA structure and no body bullet formatting violations.
- ✅ `site_demo_pack_v32.md` remains clear and conversion-oriented.
- ❌ Version bundle misalignment: no `send_ops_queue_v32.md` (latest is still `v31`).
- ❌ Canonical cadence conflict remains unresolved across authority docs.
- ❌ SMS compliance controls still absent in send-ops queue template.
- ❌ Placeholder-blocking publish gate still not explicit in site demo pack.
- ❌ Legacy pricing language remains active in `MEMORY.md` and conflicts with current outbound standard.

---

## Findings

## 1) Cadence conflict across source-of-truth docs (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E: Day 1 / Day 5 / Day 10.
- `memory/KNOWLEDGE.md`: Day 0 / Day 3 / Day 10 (+ optional Day 17).
- `templates/email_outreach_pack_v32.md`: “follow-ups every 2–4 business days” (non-specific band, not canonical).

**Risk**
- Inconsistent sequencing, weak A/B comparability, operator drift.

**Fix (required)**
- Publish one canonical cadence in a single authority section and force all templates to inherit it verbatim.

---

## 2) Pricing policy contradiction still active (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: active model is `$0 down + $99/$199/$299 monthly`.
- `MEMORY.md`: still includes active pipeline/history language for `$250 + $10/mo` and `$250` close targets.

**Risk**
- Quote inconsistency and reduced trust in outbound/closing conversations.

**Fix (required)**
- Mark all `$250` model references in `MEMORY.md` as **historical/deprecated** for new outbound.

---

## 3) Release integrity gap: version mismatch (MEDIUM)
**Evidence**
- `email_outreach_pack_v32.md` and `site_demo_pack_v32.md` exist.
- Latest queue file is `send_ops_queue_v31.md` (no `v32`).

**Risk**
- Mixed-bundle execution (operators sending from different policy generations).

**Fix (required)**
- Create `send_ops_queue_v32.md` or pin the entire bundle to v31 until synchronized.

---

## 4) SMS legal/compliance controls still missing in queue template (HIGH)
**Evidence**
- `templates/send_ops_queue_v31.md` defines priority/windows/triggers but omits:
  - Sender identification requirement
  - STOP/opt-out handling
  - Suppression list/event schema
  - Complaint/revocation immediate-halt protocol

**Risk**
- TCPA/state-law exposure + account reputation risk.

**Fix (required)**
- Add mandatory SMS compliance block and suppression logging schema to the top of queue template.

---

## 5) Site/demo pre-publish placeholder gate missing (MEDIUM)
**Evidence**
- `site_demo_pack_v32.md` still includes placeholders (`_X_`, `_Y_`, `Client Name`).
- Notes advise replacement, but no hard blocker language.

**Risk**
- Placeholder leakage in live/client-facing deliverables.

**Fix (required)**
- Add a strict pre-publish blocker section: if any placeholder remains, do not publish/send.

---

## 6) Email compliance status (PASS with minor governance gap)
**Evidence (passes)**
- `email_outreach_pack_v32.md` keeps body copy concise.
- One CTA per template.
- No first-touch pricing.
- No in-body bullet list formatting violations in core email bodies.

**Remaining gap**
- No hard “DO NOT SEND” gate section (still advisory, not enforced).

**Fix (recommended)**
- Add explicit hard gate criteria at top of file.

---

## Fix Pack (copy/paste ready)

### A) Canonical cadence patch (`STANDING_ORDERS.md` + `memory/KNOWLEDGE.md`)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates/queues must match this exactly.
```

### B) `MEMORY.md` deprecation patch
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" references are historical only, not for new outbound.
- If pricing docs conflict, `memory/KNOWLEDGE.md` and `STANDING_ORDERS.md` are authoritative.
```

### C) Add to top of `templates/send_ops_queue_v32.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- Identify sender/business in first SMS.
- Include opt-out language where required ("Reply STOP to opt out").
- Respect recipient-local legal contact windows.
- On STOP/revocation/complaint: immediate suppression + halt all outbound.
- Log suppression event before any future attempt.

Suppression log schema:
lead_id, channel, event_type, source, timestamp_local, operator
```

### D) Add to `templates/site_demo_pack_v32.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace placeholder proof stats with verified values or remove them.
- If any placeholder remains, do not send or publish.
```

### E) Add to top of `templates/email_outreach_pack_v32.md`
```md
## SEND GATE — NON-NEGOTIABLE
- Body <=100 words for first touch
- Exactly 1 business-specific observation
- Exactly 1 CTA
- No first-touch pricing
- No unresolved placeholders
- Cadence must match canonical policy
- If any check fails: DO NOT SEND
```

### F) Release manifest requirement (`memory/` or `templates/`)
```md
## Release Manifest (Required Per Cycle)
- Bundle version: email/site/send_ops must match
- Owner + timestamp + status (draft/send-ready)
- If mismatch/missing file: HOLD outbound
```

---

## Pass/Fail Checklist (v32)

### Release Integrity
- [ ] **FAIL** Version-aligned trio exists at v32 (send-ops file missing)
- [ ] **FAIL** Release manifest exists for active outbound bundle

### Cold Email Compliance
- [x] **PASS** No first-touch pricing in v32 outreach templates
- [x] **PASS** Single CTA pattern in body templates
- [x] **PASS** No in-body bullet-list formatting violations
- [ ] **FAIL** Hard non-negotiable send gate present
- [ ] **FAIL** Canonical cadence aligned with authority docs

### SMS/TCPA Controls
- [ ] **FAIL** Sender ID + opt-out rules embedded in queue template
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Complaint/revocation halt rule embedded

### Policy Consistency
- [ ] **FAIL** Pricing source-of-truth fully harmonized (`MEMORY.md` conflict remains)
- [ ] **FAIL** Cadence source-of-truth fully harmonized

### Site QA
- [ ] **FAIL** Placeholder-blocking publish gate embedded
- [x] **PASS** Core site copy quality and positioning clarity

---

## Final QA Decision
**v32 Enforcement Result: FAIL**  
Hold scaled outbound until the six required fixes above are implemented and re-verified in a version-aligned `v32` (or explicitly pinned `v31`) release bundle.
