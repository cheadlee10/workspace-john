# QA Enforcement Report — Sales Assets
**Version:** v48  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates and memory guidance for consistency, compliance, and quality.

## Assets Reviewed (current focus)
- `templates/site_demo_pack_v48.md`
- `templates/email_outreach_pack_v47.md`
- `templates/send_ops_queue_v47.md`
- `memory/KNOWLEDGE.md`
- `STANDING_ORDERS.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v47.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL**

### What improved since v47
- ✅ Latest triad files now exist for outreach/send-ops at v47 (previously missing in v47 report baseline).
- ✅ `site_demo_pack_v48.md` tightened language and reduced hard numerical overclaims vs earlier packs.
- ✅ Send ops queue remains execution-oriented and specific on retry timing.

### Why v48 still fails
- ❌ Release parity mismatch: site pack is **v48**, outreach/send-ops are **v47**.
- ❌ Cadence and first-touch standards still conflict across policy docs and templates.
- ❌ SMS/TCPA controls remain insufficient in queue template.
- ❌ Memory/policy contradictions persist (pricing history, typography, pitch formula).
- ❌ Placeholder leakage risk remains in site pack without explicit hard publish gate.

---

## Findings (Evidence → Risk → Fix)

### 1) Version-lock mismatch remains (HIGH)
**Evidence:** `site_demo_pack_v48.md` while `email_outreach_pack_v47.md` + `send_ops_queue_v47.md` are prior version.

**Risk:** Operators combine incompatible releases; QA traceability breaks.

**Fix:** Enforce release lock requiring exact same version across site/email/send-ops before use.

---

### 2) Cadence contradiction still unresolved (HIGH)
**Evidence:**
- `memory/KNOWLEDGE.md`: canonical **Day 0 / Day 3 / Day 10 (+ optional Day 17)**.
- `STANDING_ORDERS.md` Section E: **Day 1 / Day 5 / Day 10**.
- `templates/email_outreach_pack_v47.md`: **Day 1 / 3 / 6 / 9 / 12** sequence.

**Risk:** Inconsistent attribution, erratic execution, and training drift.

**Fix:** Standardize every sales doc/template to one canonical cadence (0/3/10/+17).

---

### 3) First-touch pricing conflict still active (HIGH)
**Evidence:**
- `memory/KNOWLEDGE.md`: no first-touch pricing in outreach copy.
- `STANDING_ORDERS.md` Pitch Formula: first email body includes “value prop + one stat + pricing + CTA.”

**Risk:** Contradictory outbound behavior; rep confusion; lower reply rates from premature pricing.

**Fix:** Patch `STANDING_ORDERS.md` pitch formula: first touch = observation + impact + proof + soft CTA; pricing only after reply.

---

### 4) Outreach quality gate not enforced (HIGH)
**Evidence:** `email_outreach_pack_v47.md` is reusable but does not include a blocking SEND GATE (<100 words, one observation, one CTA, visual proof link checks, no unresolved tokens).

**Risk:** Style drift, lower deliverability, inconsistent quality control.

**Fix:** Append mandatory SEND GATE block and mark as blocking.

---

### 5) SMS compliance controls insufficient (HIGH)
**Evidence:** `send_ops_queue_v47.md` includes call+SMS sequences and retries, but no explicit opt-out language policy, suppression schema, or quiet-hours legal/compliance block.

**Risk:** TCPA/comms complaints and sender reputation risk.

**Fix:** Add mandatory SMS compliance section (sender identification, STOP handling, suppression log fields, local-time constraints).

---

### 6) Placeholder publication risk in site pack (MEDIUM)
**Evidence:** `site_demo_pack_v48.md` still includes unresolved placeholders in trust/proof/testimonials/guarantee sections.

**Risk:** Placeholder content can leak to live/outbound assets.

**Fix:** Add hard pre-publish blocker: no placeholders allowed in client-facing output.

---

### 7) Memory guidance contradictions (MEDIUM-HIGH)
**Evidence:**
- `MEMORY.md` contains legacy active-sounding pricing (`OUR PRICE: $250`, `close at $250 + $10/mo`) conflicting with subscription model in `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md`.
- Typography contradiction: `MEMORY.md` says default font is Segoe UI; `STANDING_ORDERS.md` says never Arial/Inter/Roboto and requires a distinctive display + clean body font.

**Risk:** Inconsistent quoting and design output; operator confusion.

**Fix:** Add deprecation/source-of-truth banner in `MEMORY.md`; reconcile typography standard in one canonical doc.

---

### 8) Email-body format rule conflict (MEDIUM)
**Evidence:** `STANDING_ORDERS.md` Email Quality Rules say “Never add bullet lists inside the email body,” while multiple templates in `email_outreach_pack_v47.md` use bullet lists.

**Risk:** Direct non-compliance with standing policy during execution.

**Fix:** Either remove bullets from templates or revise standing rule to allow short bullets for certain template types; pick one rule and enforce globally.

---

## Fix Pack (ready-to-apply snippets)

### A) Release Lock block
```md
## RELEASE LOCK
This asset is part of release `{version}`.
Required companion files:
- `templates/site_demo_pack_{version}.md`
- `templates/email_outreach_pack_{version}.md`
- `templates/send_ops_queue_{version}.md`
If versions do not match exactly: do not send.
```

### B) Canonical cadence block
```md
## Canonical Outreach Cadence
- Day 0: First touch
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
No alternate cadence allowed in outbound templates.
```

### C) First-touch pricing patch (for STANDING_ORDERS)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — quick idea"
- Body: 4-5 short sentences; one specific observation + impact + proof.
- Visual: one live preview/screenshot link.
- CTA: one soft question.
- Pricing: never in first touch; introduce only after reply/interest.
```

### D) Outreach SEND GATE (blocking)
```md
## SEND GATE — BLOCKING
- Plain text only
- Body <100 words
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA
- Visual proof link included + click-tested (web-design outreach)
- No first-touch pricing
- No unresolved placeholders/tokens
If any item fails: DO NOT SEND.
```

### E) SMS compliance gate
```md
## SMS COMPLIANCE — MANDATORY
- Identify sender/business in opening message.
- Include opt-out language when required ("Reply STOP to opt out").
- Respect recipient local contact windows.
- On STOP/opt-out/complaint: immediate suppression and halt all outbound.
- Log suppression before any future attempt.

Suppression log fields:
lead_id, phone, event_type, source, timestamp_local, operator
```

### F) Memory deprecation banner
```md
### Pricing Source of Truth (Effective Immediately)
- Active offer model: $0 down + monthly tiers ($99/$199/$299).
- Legacy "$250" and "$250 + $10/mo" notes are historical context only.
- If conflict exists, `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` govern.
```

### G) No-placeholder publish blocker
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder values/tokens in any client-facing output.
- Replace all [X], [Client Name], [Industry], and similar placeholders before send.
- If any placeholder remains: do not publish or send.
```

---

## Pass/Fail Checklist (v48)

### Release Integrity
- [ ] **FAIL** Site/email/send-ops files share same version tag.
- [ ] **FAIL** Release lock block exists in each template.

### Policy Consistency
- [ ] **FAIL** One canonical cadence (0/3/10/+17) is used across all governing docs and templates.
- [ ] **FAIL** First-touch pricing rule is consistent across `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`.
- [ ] **FAIL** Email bullet-format rule is consistent between policy and templates.

### Outreach Quality Enforcement
- [ ] **FAIL** Outreach pack includes blocking SEND GATE.
- [ ] **FAIL** Outreach templates conform to canonical cadence.

### SMS Compliance
- [ ] **FAIL** Send ops queue includes explicit STOP/opt-out and suppression workflow.
- [ ] **FAIL** Compliance logging schema is present in queue template.

### Site Demo QA
- [x] **PASS** Site demo pack language quality improved (clear outcomes, practical positioning).
- [ ] **FAIL** Placeholder blocker is embedded in site pack.

### Memory Governance
- [ ] **FAIL** Legacy pricing in `MEMORY.md` is formally deprecated.
- [ ] **FAIL** Typography guidance is reconciled across memory + standing orders.

---

## Final QA Decision
**v48 Enforcement Result: FAIL**

Primary blockers are governance contradictions (version lock, cadence, first-touch pricing), missing hard send/compliance gates, and unresolved memory policy conflicts. Applying the fix pack above should allow the next aligned release to pass.
