# QA Enforcement Report — Sales Assets
**Version:** v49  
**Date:** 2026-03-04  
**Scope:** QA enforcement across recent sales templates + memory/policy guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/site_demo_pack_v48.md`
- `templates/email_outreach_pack_v48.md`
- `templates/send_ops_queue_v48.md`
- `memory/qa_enforcement_report_2026-03-04_v48.md` (baseline)
- `memory/KNOWLEDGE.md`
- `STANDING_ORDERS.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`

---

## Executive Verdict
**Overall status: FAIL (improved from v48, but still blocked).**

### What improved vs v48
- ✅ **Version parity fixed:** site/email/send-ops are all now `v48`.
- ✅ Send-ops queue remains operationally specific (ordered priorities, retry windows, logging intent).
- ✅ Site demo copy is outcome-focused and avoids hard fake metrics.

### Why v49 still fails
- ❌ Core governance conflicts remain (cadence, first-touch pricing, email body format rules).
- ❌ Outreach pack still lacks a hard **blocking send gate**.
- ❌ SMS workflow still lacks explicit opt-out/suppression compliance controls.
- ❌ Placeholder leakage risk remains in site pack without publish blocker language.
- ❌ Memory still contains legacy pricing/branding directives that contradict active policy docs.

---

## Findings (Evidence → Risk → Fix)

### 1) Release parity now correct (PASS)
**Evidence:** `site_demo_pack_v48.md`, `email_outreach_pack_v48.md`, `send_ops_queue_v48.md` all aligned.  
**Risk:** Low (resolved for current release).  
**Fix:** Keep a release-lock block in each template to prevent future drift.

---

### 2) Cadence contradiction still unresolved (HIGH)
**Evidence:**
- `memory/KNOWLEDGE.md`: canonical **Day 0 / Day 3 / Day 10 (+ optional Day 17)**.
- `STANDING_ORDERS.md` Section E: **Day 1 / Day 5 / Day 10**.
- `email_outreach_pack_v48.md` best-practice block: **Day 2 / Day 5 / Day 9 / Day 14**.

**Risk:** Team executes multiple cadences; attribution and optimization become unreliable.  
**Fix:** Enforce one canonical cadence globally (recommended: 0/3/10/+17) and update both policy + template docs.

---

### 3) First-touch pricing conflict persists (HIGH)
**Evidence:**
- `memory/KNOWLEDGE.md`: “No first-touch pricing.”
- `STANDING_ORDERS.md` pitch formula currently includes pricing in first email body.

**Risk:** Reps receive contradictory instruction; cold email response quality drops.  
**Fix:** Patch `STANDING_ORDERS.md` pitch formula to remove first-touch pricing and defer pricing until reply/interest.

---

### 4) Email format rule conflict persists (MEDIUM-HIGH)
**Evidence:**
- `STANDING_ORDERS.md`: “Never add bullet lists inside the email body.”
- `email_outreach_pack_v48.md`: several templates include bullets in body.

**Risk:** Built-in noncompliance between policy and production template.  
**Fix:** Choose one rule set and enforce globally:
- Option A: remove bullets from outreach pack, or
- Option B: amend standing order to permit short bullets for specific template types.

---

### 5) Outreach quality gate still missing (HIGH)
**Evidence:** `email_outreach_pack_v48.md` has helpful best practices but no hard “DO NOT SEND” gate.  
**Risk:** Drift (length, personalization quality, unresolved tokens, CTA sprawl, unverifiable claims).  
**Fix:** Add blocking SEND GATE with checklist enforcement before outbound.

---

### 6) SMS compliance controls still insufficient (HIGH)
**Evidence:** `send_ops_queue_v48.md` defines call+SMS retries but does not explicitly enforce:
- sender identification standard,
- STOP/opt-out handling,
- suppression list schema,
- quiet-hours/legal guardrails.

**Risk:** TCPA/comms complaints, reputational and channel risk.  
**Fix:** Add mandatory compliance section + suppression logging fields to queue template.

---

### 7) Site placeholder leakage risk remains (MEDIUM)
**Evidence:** `site_demo_pack_v48.md` still includes unresolved placeholders (`[X]`, `[Client Name]`, etc.) without hard publish block.  
**Risk:** Placeholder text can leak into live pages, decks, or outbound collateral.  
**Fix:** Add explicit pre-publish blocker: “If any placeholder exists, do not send/publish.”

---

### 8) Memory/policy contradictions remain active (MEDIUM-HIGH)
**Evidence:**
- `MEMORY.md` includes legacy pricing references (`$250`, `$250 + $10/mo`) conflicting with active subscription model in `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md`.
- Typography conflict: `MEMORY.md` says Segoe UI default; `STANDING_ORDERS.md` forbids Arial/Inter/Roboto and requires distinctive display + clean body font.

**Risk:** Inconsistent quoting, inconsistent design outputs, operator confusion.  
**Fix:** Add deprecation banner in `MEMORY.md` and define one source-of-truth style standard.

---

## Fix Pack (ready to apply)

### A) Release Lock Block
```md
## RELEASE LOCK
This asset is part of release `{version}`.
Required companion files:
- `templates/site_demo_pack_{version}.md`
- `templates/email_outreach_pack_{version}.md`
- `templates/send_ops_queue_{version}.md`
If versions do not match exactly: DO NOT SEND.
```

### B) Canonical Cadence Block
```md
## Canonical Outreach Cadence
- Day 0: First touch
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
No alternate cadence in outbound templates.
```

### C) First-Touch Pricing Patch (`STANDING_ORDERS.md`)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — quick idea"
- Body: 4-5 short sentences; one observation + impact + proof.
- Visual: live preview/screenshot link when relevant.
- CTA: one soft question.
- Pricing: never in first touch; introduce only after interest.
```

### D) Blocking SEND GATE (`email_outreach_pack_v*.md`)
```md
## SEND GATE — BLOCKING
- Plain text
- <100 words for first touch
- Exactly 1 verifiable business-specific observation
- Exactly 1 CTA
- No first-touch pricing
- No unresolved placeholders/tokens
- Link proof click-tested (if link included)
If any item fails: DO NOT SEND.
```

### E) SMS Compliance Block (`send_ops_queue_v*.md`)
```md
## SMS COMPLIANCE — MANDATORY
- Identify sender/business in opening line.
- Include opt-out instruction where required ("Reply STOP to opt out").
- Respect recipient-local contact windows.
- On STOP/complaint: suppress immediately and halt outbound.

Suppression log fields:
lead_id, phone, event_type, source, timestamp_local, operator
```

### F) Pre-Publish Placeholder Block (`site_demo_pack_v*.md`)
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace all [X], [Client Name], [Industry], etc.
- If any placeholder remains: DO NOT PUBLISH / DO NOT SEND.
```

### G) Memory Deprecation Block (`MEMORY.md`)
```md
### Pricing Source of Truth (Effective Immediately)
- Active model: $0 down + monthly tiers ($99/$199/$299).
- Legacy "$250" and "$250 + $10/mo" notes are historical only.
- If conflict exists, `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` govern.
```

---

## Pass/Fail Checklist (v49)

### Release Integrity
- [x] **PASS** Site/email/send-ops files share same version tag (`v48`).
- [ ] **FAIL** Release-lock block embedded in each template.

### Policy Consistency
- [ ] **FAIL** One canonical cadence is used everywhere.
- [ ] **FAIL** First-touch pricing guidance is consistent across governing docs.
- [ ] **FAIL** Email body formatting rule is consistent between policy and templates.

### Outreach Quality Enforcement
- [ ] **FAIL** Outreach pack includes a blocking SEND GATE.
- [ ] **FAIL** First-touch templates are standardized to <100 words + single CTA gate.

### SMS Compliance
- [ ] **FAIL** Send-ops queue includes explicit opt-out/suppression protocol.
- [ ] **FAIL** Suppression logging schema is present and mandatory.

### Site Demo QA
- [x] **PASS** Copy quality is clear, practical, and low-hype.
- [ ] **FAIL** Placeholder blocker is embedded as a hard gate.

### Memory Governance
- [ ] **FAIL** Legacy pricing in `MEMORY.md` is formally deprecated.
- [ ] **FAIL** Typography standard is reconciled across memory + standing orders.

---

## Final QA Decision
**v49 Enforcement Result: FAIL**

Main improvement is release parity (fixed), but governance/compliance contradictions still block approval. Next pass should focus on policy unification (cadence + pricing + format), then hard QA gates (send + SMS + placeholder), then memory deprecation cleanup.