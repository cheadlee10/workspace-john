# QA Enforcement Report — Sales Assets
**Version:** v31  
**Date:** 2026-03-04  
**Scope:** Current production sales assets (`v30` template set + active memory/standing guidance + latest queued email batch).

---

## Executive Verdict
**Overall status: FAIL (blocking policy contradictions + missing compliance gates remain).**

### Delta vs v30
- ✅ Version alignment improved: active trio exists at `v30` (`email_outreach_pack_v30.md`, `site_demo_pack_v30.md`, `send_ops_queue_v30.md`).
- ❌ Canonical outreach cadence is still contradictory across authority docs and templates.
- ❌ First-touch pricing policy is still contradictory (`STANDING_ORDERS.md` vs `memory/KNOWLEDGE.md`).
- ❌ Active outreach pack still lacks a hard send gate and still includes rule-breaking body patterns (bullets in body templates).
- ❌ Active send-ops queue still lacks explicit SMS legal/compliance controls (sender ID + opt-out + suppression protocol).
- ❌ Site demo pack still contains client-facing placeholders without a pre-publish blocker section.
- ❌ Latest queued email asset format still violates standing email body rules (body bullets + multi-CTA options).

---

## Assets Reviewed (v31)
- `templates/email_outreach_pack_v30.md`
- `templates/site_demo_pack_v30.md`
- `templates/send_ops_queue_v30.md`
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- Baseline: `memory/qa_enforcement_report_2026-03-04_v30.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Cadence policy conflict still unresolved (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E: Day 1 / Day 5 / Day 10.
- `memory/KNOWLEDGE.md` cold email standard: Day 0 / Day 3 / Day 10 (+ optional Day 17).
- `templates/email_outreach_pack_v30.md` cadence: Day 1 / Day 3 / Day 6 / Day 10 / Day 14.

**Risk**
- Inconsistent execution, noisy attribution, and uneven follow-up pressure by operator.

**Required fix**
- Publish one canonical cadence in one authority section and force templates + generators to inherit exactly.

---

### 2) First-touch pricing contradiction still unresolved (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` Pitch Formula: includes “pricing” in short email body.

**Risk**
- Operator inconsistency on first outreach touch; lower trust and poorer testing discipline.

**Required fix**
- Split policy by stage: first-touch cold outreach (no pricing) vs post-interest/demo follow-up (pricing allowed).

---

### 3) Active email outreach pack missing hard fail-stop gate (HIGH)
**Evidence**
- `templates/email_outreach_pack_v30.md` has a light QA checklist but no mandatory blocker gate with fail condition.

**Risk**
- Preventable sends with placeholders, wrong cadence, or off-policy structure.

**Required fix**
- Add top-of-file `SEND GATE — NON-NEGOTIABLE` with explicit “If any fail: DO NOT SEND.”

---

### 4) Email body-format noncompliance in active assets (HIGH)
**Evidence**
- `STANDING_ORDERS.md`: “Never add bullet lists inside the email body.”
- `templates/email_outreach_pack_v30.md` and `email-templates/next-queued-email-assets-2026-03-03-batch117.md` include body bullets (e.g., link bullets and “Typical outcomes” bullets).
- Batch file includes “CTA options (pick one)” with multiple choices instead of one enforced CTA.

**Risk**
- Direct noncompliance with standing rules; inconsistent output quality and operator decisions.

**Required fix**
- Enforce generator format: no body bullets, exactly one CTA, max sentence cap.

---

### 5) SMS compliance controls still absent in send queue template (HIGH)
**Evidence**
- `templates/send_ops_queue_v30.md` includes send windows and triggers but does not define required sender identification language, STOP/opt-out handling, suppression schema, or complaint workflow.

**Risk**
- TCPA/state-law exposure, complaint risk, sender reputation and account risk.

**Required fix**
- Add immutable SMS compliance block + suppression event log requirements.

---

### 6) Historical pricing still appears active in memory layer (MEDIUM)
**Evidence**
- `MEMORY.md` still contains strategy language for `$250` and `$250 + $10/mo` model.
- `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` define current `$0 down + monthly tiers` model.

**Risk**
- Quote inconsistency and internal confusion during outreach/closing.

**Required fix**
- Mark legacy pricing in `MEMORY.md` as deprecated/historical and point to current source-of-truth files.

---

### 7) Site demo pack still lacks placeholder-blocking publish gate (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v30.md` contains unresolved placeholders (`[XX%]`, `[Client Name]`, etc.) and no mandatory pre-publish blocker.

**Risk**
- Client-facing placeholder leakage.

**Required fix**
- Add `PRE-PUBLISH QA GATE (BLOCKER)` section with strict no-placeholder condition.

---

### 8) Release governance artifact still missing (MEDIUM)
**Evidence**
- No release manifest found in `templates/` or `memory/` that marks bundle version, owner, timestamp, and send-ready status.

**Risk**
- Stale/mixed files can still be used in production.

**Required fix**
- Add required release manifest per outbound cycle.

---

## Positive Findings (PASS)
- `v30` trio is present and version-aligned (`email/site/send_ops`).
- Core offer language remains clear and outcome-focused.
- Queue prioritization logic is strong operationally (channel/value/time-window based).

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v30.md`
```md
## SEND GATE — NON-NEGOTIABLE (First Touch)
- Body <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No unresolved placeholders
- Cadence lock: [CANONICAL_CADENCE]
- For web/no-site outreach: include 1 visual proof URL (live preview or screenshot)
- No bullet lists in the body
- If any gate fails: DO NOT SEND
```

### B) Add to top of `templates/send_ops_queue_v30.md`
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

### C) Add to `templates/site_demo_pack_v30.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output ([XX], [Client Name], etc.)
- Replace all placeholder proof stats with verified values or remove those lines
- If any placeholder remains, do not send or publish
```

### D) Add policy patch to `MEMORY.md`
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound pricing: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" models are historical/deprecated for new outbound.
- If docs conflict, use `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` pricing sections.
```

### E) Add export standard for `email-templates/*`
```md
## STANDING-ORDERS SAFE EMAIL FORMAT
- No bullet lists in body
- Exactly one CTA line
- Max 7 body sentences
- Visual proof links must be inline sentence links
```

### F) Resolve cadence once in authority docs (`memory/KNOWLEDGE.md` + `STANDING_ORDERS.md`)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates and queue logic must inherit this cadence
```
*(If leadership chooses a different cadence, publish once and enforce globally.)*

### G) Add release manifest requirement
```md
## Release Manifest (Required)
- Bundle versions must match (email pack / site pack / send ops queue)
- Include timestamp + owner + status (draft/send-ready)
- If any file is missing/misaligned, mark bundle HOLD
```

---

## Pass/Fail Checklist (v31)

### A) Release Integrity
- [x] **PASS** Template trio exists and is version-aligned at `v30`
- [ ] **FAIL** Send-ready release manifest exists for current bundle

### B) Cold Email Compliance
- [ ] **FAIL** Mandatory hard send gate present in active outreach pack
- [ ] **FAIL** Canonical cadence enforced across authority docs/templates
- [ ] **FAIL** First-touch pricing conflict resolved
- [ ] **FAIL** Body-format rules enforced (no bullets, one CTA)
- [ ] **FAIL** Visual-proof requirement hard-gated for web/no-site outreach

### C) SMS/TCPA Controls
- [ ] **FAIL** Sender ID + opt-out handling embedded in active queue
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Complaint/revocation halt rule embedded

### D) Policy Consistency
- [ ] **FAIL** Pricing source-of-truth conflict resolved across memory layers
- [ ] **FAIL** Queued email generator format aligned to standing orders

### E) Quality Gates
- [x] **PASS** Copy quality/readability remains strong in v30 assets
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded in site/demo pack

**Current score:** **FAIL** (blocking: cadence + pricing contradictions, missing send/SMS gates, format noncompliance)

---

## Final QA Decision
**v31 Enforcement Result: FAIL — hold scaled outbound until Fix Pack A–G is implemented and re-verified.**
