# QA Enforcement Report — Sales Assets
**Version:** v5  
**Date:** 2026-03-04  
**Scope reviewed:** recent outreach templates + memory guidance + playbook alignment

---

## Executive Verdict
**Overall status: FAIL (needs remediation before scaled sends).**

Core issue: the canonical standard in `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` is not consistently enforced across newer template/ops assets, and pricing/model guidance is internally inconsistent across memory files.

---

## Assets Reviewed
- `templates/email_outreach_pack_v4.md`
- `templates/send_ops_queue_v4.md`
- `templates/site_demo_pack_v4.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/observations.md`

---

## QA Findings (Gaps / Contradictions / Compliance)

## 1) Cold-email standard drift (HIGH)
**Evidence**
- Playbook non-negotiables require: plain text, visual proof in every send, no pricing in first touch, soft CTA, under 100 words, 3-7-7 cadence.
- `email_outreach_pack_v4.md` has multiple templates over 100 words and does not require a visual proof link in each template.
- `email_outreach_pack_v4.md` sends notes recommend cadence: Day 2, 5, 9, 14, 21 (conflicts with 3-7-7(+17 breakup)).

**Risk**
- Lower reply rates, inconsistent execution, no single-source-of-truth behavior, higher operator error.

**Fix required**
- Refactor `email_outreach_pack_v4.md` into playbook-compliant variants only:
  - hard cap <100 words (first touch)
  - required `{visual_link}` token in every first-touch template
  - cadence changed to Day 0 / Day 3 / Day 10 / optional Day 17 breakup
  - add explicit “no pricing in touch #1” banner at top

---

## 2) Business model/pricing contradiction across memory (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` sets primary model to **$0 down + $99/$199/$299 monthly** (12-month minimum).
- `MEMORY.md` contains active pipeline language around **$250 + $10/mo** and also legacy one-time pricing tables.
- `memory/active_projects.md` lists separate starter/pro/enterprise one-time project pricing for web dev and other services.

**Risk**
- Incoherent offers in outbound, lost trust, negotiation friction, poor close consistency.

**Fix required**
- Declare one canonical offer model in a single file (`memory/KNOWLEDGE.md` already most current).
- Add deprecation notes in `MEMORY.md` and `memory/active_projects.md` for legacy price blocks.
- Create `templates/pricing_source_of_truth.md` and require all template references to inherit from it.

---

## 3) Channel-specific compliance gap for SMS/call queue (HIGH)
**Evidence**
- `send_ops_queue_v4.md` is operationally strong but lacks explicit opt-out/consent-safe language in first-touch snippets and no mandatory “STOP to opt out” SMS pattern.
- Prior observations indicate Twilio/A2P constraints; compliance pressure is already known.

**Risk**
- Carrier filtering, complaints, legal risk, reduced deliverability.

**Fix required**
- Add SMS compliance block to queue template:
  - initial ID (“This is John at NorthStar Synergy…”)
  - opt-out phrase (“Reply STOP to opt out”)
  - max touches/day + quiet hours by timezone
  - suppress-contact rule after opt-out or explicit disinterest

---

## 4) QA gate not embedded into send assets (MEDIUM)
**Evidence**
- Playbook has strong pre-send checklist, but `email_outreach_pack_v4.md` and `send_ops_queue_v4.md` do not include mandatory pass/fail gate fields per lead (e.g., visual link click-tested, encoding check, personalization proof).

**Risk**
- Human drift at scale; repeat of known “generic/encoding” failures.

**Fix required**
- Add a compact pre-send gate to each send queue row:
  - personalization proof
  - visual link verified
  - encoding clean
  - compliance line present
  - follow-up sequence scheduled

---

## 5) Positive quality signals (PASS)
- `site_demo_pack_v4.md` quality is high: clear value messaging, concise sectioning, measurable outcomes, objection handling, and builder notes.
- `send_ops_queue_v4.md` has clear prioritization logic, time-zone batching, and follow-up triggers.
- `memory/observations.md` captures mistakes/learning loops with useful operational detail.

---

## Enforcement Actions (Immediate)
1. **Freeze use of `email_outreach_pack_v4.md` for first-touch cold email** until playbook alignment patch is done.
2. **Enforce playbook as canonical outbound spec** for all cold-email sends.
3. **Patch `send_ops_queue_v4.md` with SMS compliance language** before next send window.
4. **Normalize pricing references** to single source of truth and mark legacy pricing as archived.

---

## Pass/Fail Checklist (v5)

### A) Cold Email Structure
- [ ] PASS / **FAIL** — First-touch templates under 100 words
- [ ] PASS / **FAIL** — Visual proof link required in every first touch
- [ ] PASS / **FAIL** — No pricing in first touch
- [ ] PASS / **FAIL** — Soft CTA only
- [ ] PASS / **FAIL** — Follow-up cadence = 3-7-7 (+ optional breakup)

### B) Personalization & Quality
- [ ] PASS / **FAIL** — One verifiable business-specific observation included
- [ ] PASS / **FAIL** — No placeholder tokens left unresolved
- [ ] PASS / **FAIL** — No encoding artifacts (smart-quote corruption)
- [ ] PASS / **FAIL** — Links tested and resolving

### C) Offer Consistency
- [ ] PASS / **FAIL** — One canonical pricing model across memory + templates
- [ ] PASS / **FAIL** — Legacy pricing explicitly deprecated/archived
- [ ] PASS / **FAIL** — Outreach templates pull from canonical offer doc

### D) SMS/Call Compliance
- [ ] PASS / **FAIL** — Sender identity clear in first touch
- [ ] PASS / **FAIL** — Opt-out language present (e.g., STOP)
- [ ] PASS / **FAIL** — Quiet hours + touch limits enforced
- [ ] PASS / **FAIL** — Opt-outs immediately suppressed

### E) Operational Readiness
- [ ] PASS / **FAIL** — Pre-send QA gate embedded in queue workflow
- [ ] PASS / **FAIL** — Follow-up triggers defined per lead
- [ ] PASS / **FAIL** — Logging fields complete in leads tracking

**Current score:** **FAIL** (blocking items in A, C, D)

---

## Suggested Patch Plan (Fast)
- **Patch 1 (30–45 min):** Update `templates/email_outreach_pack_v4.md` to strict playbook format (short templates + mandatory `{visual_link}` + corrected cadence).
- **Patch 2 (15 min):** Add SMS compliance mini-template and opt-out rules to `templates/send_ops_queue_v4.md`.
- **Patch 3 (20 min):** Add canonical pricing source file + deprecation notes in memory docs.
- **Patch 4 (10 min):** Add one-page `templates/outreach_preflight_checklist.md` and require completion before any send block.

---

## Final QA Decision
**v5 Enforcement Result: FAIL (remediation required before full-scale outbound).**  
After patches above are applied, rerun QA as `qa_enforcement_report_2026-03-04_v6.md`.
