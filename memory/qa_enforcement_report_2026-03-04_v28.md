# QA Enforcement Report — Sales Assets
**Version:** v28  
**Date:** 2026-03-04  
**Scope:** Recent sales templates + memory guidance consistency, compliance, and quality gates.

---

## Executive Verdict
**Overall status: FAIL (blocking governance/compliance gaps still present).**

### Delta vs v27
- ✅ Core template versions are now aligned at **v28** (`email_outreach_pack_v28.md`, `site_demo_pack_v28.md`, `send_ops_queue_v28.md`).
- ✅ Send ops queue quality improved (clearer segmenting, cleaner snippets, stronger sequencing).
- ❌ Canonical cadence conflict remains unresolved across memory/policy/template sources.
- ❌ SMS compliance controls are still absent in active send ops.
- ❌ Pricing source-of-truth conflict remains unresolved in memory guidance.
- ❌ Site/demo placeholders still lack hard publish blocker.
- ❌ Queued email assets still violate standing email format constraints.

---

## Assets Reviewed (v28 pass)
- `templates/email_outreach_pack_v28.md`
- `templates/send_ops_queue_v28.md`
- `templates/site_demo_pack_v28.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `STANDING_ORDERS.md`
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md`
- Prior baseline: `memory/qa_enforcement_report_2026-03-04_v27.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Follow-up cadence contradiction across governing docs (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: mandates **3-7-7** (Day 0 / Day 3 / Day 10, optional Day 17).
- `STANDING_ORDERS.md`: mandates **Day 1 / Day 5 / Day 10** (three touches max).
- `templates/email_outreach_pack_v28.md`: recommends **Day 1 / 3 / 6 / 10 / 14**.

**Risk**
- Inconsistent outreach behavior, invalid A/B comparisons, and QA drift at scale.

**Required fix**
- Declare one canonical cadence in one authority file and force template inheritance from that source only.

---

### 2) First-touch rules conflict between memory guidance and standing orders (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: no first-touch pricing, short/problem-first, one soft CTA.
- `STANDING_ORDERS.md` pitch formula requires body to include pricing.

**Risk**
- Team cannot comply with both rules simultaneously; execution quality becomes operator-dependent.

**Required fix**
- Define separate standards by channel/stage (e.g., first-touch cold outreach = no pricing; post-interest/demo follow-up = pricing allowed).

---

### 3) Email pack missing hard send-gate enforcement (HIGH)
**Evidence**
- `templates/email_outreach_pack_v28.md` has helpful notes, but no mandatory `SEND GATE — NON-NEGOTIABLE` section.
- Cold templates include multiple first-touch variants likely above the <100-word non-negotiable target in `memory/KNOWLEDGE.md`.

**Risk**
- Placeholder leakage, multi-CTA drift, and non-compliant first-touch sends under volume pressure.

**Required fix**
- Add explicit pre-send blocker checklist at file top and fail-send rule when any gate is unmet.

---

### 4) SMS legal/compliance controls still not operationalized in active queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v28.md` is SMS-first but contains no sender ID rule, opt-out language rule, suppression handling schema, or legal send-window guardrail.

**Risk**
- TCPA/state risk, complaint escalation risk, and messaging deliverability/account penalties.

**Required fix**
- Add mandatory SMS compliance block and suppression log workflow to active send ops template.

---

### 5) Pricing source-of-truth mismatch remains in memory layer (MEDIUM)
**Evidence**
- `memory/KNOWLEDGE.md` and `STANDING_ORDERS.md`: $0 down + $99/$199/$299 monthly model.
- `MEMORY.md` still contains active strategy text for legacy close model (`$250 + $10/mo`).

**Risk**
- Quoting inconsistency and reduced trust during sales conversations.

**Required fix**
- Mark legacy pricing as historical/deprecated and insert explicit active pricing SOT callout in `MEMORY.md`.

---

### 6) Site/demo pack still has proof placeholders without hard publish blocker (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v28.md` still includes placeholders (`[XX]`, `[X,XXX]`, `[Client Name]`, etc.) with no blocker section.

**Risk**
- Placeholder content can leak to prospects/clients.

**Required fix**
- Add `PRE-PUBLISH QA GATE (BLOCKER)` that forbids send/publish if any placeholder token remains.

---

### 7) Queued email asset outputs still conflict with standing email format (MEDIUM)
**Evidence**
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md` uses in-body bullet links and offers 3 CTA options per lead.
- `STANDING_ORDERS.md` requires one CTA and no bullet lists inside email body.

**Risk**
- Production sends violate standing rules and reduce message consistency.

**Required fix**
- Enforce generator/export mode: one CTA only, no body bullets, max sentence cap.

---

## Positive Findings (PASS)
- v28 template version synchronization is clean.
- Copy quality/readability is solid across outreach and demo assets.
- Send ops prioritization framework is practical and execution-ready.

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v28.md`
```md
## SEND GATE — NON-NEGOTIABLE (First Touch)
- Body must be <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No placeholders at send time
- Cadence lock: [CANONICAL_CADENCE]
- For web/no-site outreach: include 1 visual proof URL (live preview or screenshot)
- Any metric claim must include an internal proof reference ID
- If any gate fails: do not send
```

### B) Add to top of `templates/send_ops_queue_v28.md`
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

### C) Add to `MEMORY.md` (near pricing sections)
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound pricing: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250 + $10/mo" model is historical and deprecated for new outbound.
- If docs conflict, use `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` pricing sections.
```

### D) Add to `templates/site_demo_pack_v28.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in any client-facing output ([XX], [Client Name], etc.)
- Replace all placeholder proof stats with verified values or remove section
- If any placeholder remains, do not send or publish
```

### E) Add to queued email generator output standard (`email-templates/*`)
```md
## STANDING-ORDERS SAFE EMAIL FORMAT
- No bullet lists inside body
- Exactly one CTA line
- Max 7 body sentences
- Visual proof links must be inline sentence links
```

### F) Resolve cadence conflict at authority level (`memory/KNOWLEDGE.md` + `STANDING_ORDERS.md`)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates and queue logic must inherit this cadence
```
*(If leadership prefers Day 1/5/10 instead, publish that once and enforce globally.)*

---

## Pass/Fail Checklist (v28)

### A) Release Integrity
- [x] **PASS** Core template versions are aligned (all v28)
- [ ] **FAIL** Approved release manifest for send-ready bundle exists

### B) Cold Email Compliance
- [ ] **FAIL** Mandatory send gate present in active outreach pack
- [ ] **FAIL** Canonical cadence enforced across all authority docs/templates
- [ ] **FAIL** First-touch pricing rule conflict resolved
- [ ] **FAIL** Visual-proof requirement hard-gated for web/no-site outreach

### C) SMS/TCPA Compliance
- [ ] **FAIL** Sender ID + opt-out handling embedded in active send ops
- [ ] **FAIL** Suppression schema/process embedded in send ops
- [ ] **FAIL** Recipient-local legal send window guardrail embedded

### D) Policy Consistency
- [ ] **FAIL** Pricing SOT conflict resolved across `MEMORY.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Standing-orders-safe queued email export format enforced

### E) Quality Gates
- [x] **PASS** Demo narrative quality remains strong
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded in site/demo pack

**Current score:** **FAIL** (blocking: cadence conflict + first-touch rule conflict + missing SMS compliance gates)

---

## Final QA Decision
**v28 Enforcement Result: FAIL — hold scale-up until Fix Pack A–F is implemented and re-verified.**