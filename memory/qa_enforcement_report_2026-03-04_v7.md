# QA Enforcement Report — Sales Assets
**Version:** v7  
**Date:** 2026-03-04  
**Scope reviewed:** latest outreach templates, send queues, and memory guidance for consistency/compliance/quality

---

## Executive Verdict
**Overall status: FAIL (still blocked for scaled outbound).**

v7 artifacts exist, but they still violate the canonical outreach playbook and do not fully resolve offer/compliance drift.

---

## Assets Reviewed (v7 pass)
- `templates/email_outreach_pack_v7.md`
- `templates/send_ops_queue_v7.md`
- `templates/send_ops_queue_v6.md` (delta check)
- `templates/site_demo_pack_v7.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical standard)
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- Prior baseline: `memory/qa_enforcement_report_2026-03-04_v6.md`

---

## QA Findings (Gaps / Contradictions / Compliance)

## 1) Cold email pack v7 still noncompliant with canonical playbook (HIGH)
**Evidence**
- Playbook non-negotiables require: plain-text first touch, **<100 words**, one specific verifiable observation, required visual proof link, no pricing in email #1, soft CTA, cadence Day 0/3/10 (+17 breakup).
- `email_outreach_pack_v7.md` says “Keep first touch under 120 words when possible” (not strict <100).
- v7 templates do not require a mandatory visual link token in each first touch.
- v7 personalization token is optional/soft (“personalize one specific line”) instead of enforced template structure.
- v7 cadence is Day 1/3/6/9/13/17, not canonical 0/3/10(+17).

**Risk**
- Lower response quality + execution inconsistency at scale.

**Fix required**
- Replace with strict `email_outreach_pack_v8.md`:
  - hard word cap: `<100` first touch
  - required `{visual_link}` line in every first-touch template
  - required `{specific_observation}` line scaffold
  - cadence reset to `Day 0 / Day 3 / Day 10 / Day 17`
  - explicit compliance banner: “If any placeholder unresolved, do not send.”

---

## 2) SMS/call queue v7 still missing compliance guardrails (HIGH)
**Evidence**
- `send_ops_queue_v7.md` includes prioritization and touch controls, but no explicit SMS legal/deliverability block:
  - no standardized sender identity line
  - no mandatory opt-out text (“Reply STOP to opt out”)
  - no quiet-hours rule by recipient timezone
  - no hard suppression policy after STOP/disinterest

**Risk**
- Carrier filtering, legal exposure, and reputation damage.

**Fix required**
- Patch queue template to add required outbound SMS policy block:
  - sender ID first line ("This is John at NorthStar Synergy")
  - opt-out footer on each SMS
  - quiet-hours enforcement (e.g., 8:00 AM–8:00 PM recipient local)
  - suppress-contact rule for STOP, not interested, or legal threat

---

## 3) Pricing source-of-truth contradiction remains unresolved (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` defines canonical website model: **$0 down + $99/$199/$299 monthly (12-month minimum)**.
- `MEMORY.md` still contains live legacy pricing narratives (e.g., $250 + $10/mo and one-time/tier structures).
- `memory/active_projects.md` still lists one-time service tier pricing inconsistent with canonical subscription model.
- Required canonical file still missing: `templates/pricing_source_of_truth.md` (not found).

**Risk**
- Mixed offer framing, lower trust, and slower closes.

**Fix required**
- Create `templates/pricing_source_of_truth.md` as canonical reference.
- Add deprecation/archived labels to legacy pricing blocks in `MEMORY.md` and `memory/active_projects.md`.
- Add one-line pointer in outreach assets: “Pricing source: templates/pricing_source_of_truth.md”.

---

## 4) Preflight QA artifact still missing (MEDIUM)
**Evidence**
- Prior enforcement required `templates/outreach_preflight_checklist.md`; file is still missing.
- v7 queue does not enforce per-lead QA gates for:
  - specific observation verified
  - visual link tested
  - encoding check complete
  - compliance line present

**Risk**
- Repeatable operator drift, broken links, unresolved tokens, encoding errors.

**Fix required**
- Create `templates/outreach_preflight_checklist.md` from playbook Section 10.
- Add “Do not send until checklist PASS” gate to queue execution checklist.

---

## 5) Positive quality signals (PASS)
- `site_demo_pack_v7.md` is strong and conversion-oriented.
- Queue prioritization logic and timezone batching are operationally sound.
- `memory/KNOWLEDGE.md` still points to canonical cold-email playbook and key rules.
- Follow-up trigger discipline in queues improved from older drafts.

---

## Enforcement Actions (Immediate)
1. **Block scaled cold-email sends from `email_outreach_pack_v7.md`** until strict playbook-compliant v8 is published.
2. **Block scaled SMS sends from `send_ops_queue_v7.md`** until opt-out/quiet-hours/suppression rules are embedded.
3. **Freeze pricing references** to one canonical source file once created.
4. **Require preflight checklist PASS** before any outbound batch launch.

---

## Pass/Fail Checklist (v7)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates under 100 words (strict)
- [ ] **FAIL** — Visual proof link required in every first touch
- [x] **PASS** — No first-touch pricing language
- [x] **PASS** — Soft CTA style generally present
- [ ] **FAIL** — Cadence aligns to Day 0/3/10(+17)

### B) Personalization & Quality
- [ ] **FAIL** — One verifiable business-specific observation is mandatory by template structure
- [ ] **FAIL** — Unresolved placeholder prevention is enforced
- [ ] **FAIL** — Encoding QA step embedded as hard gate
- [ ] **FAIL** — Link validation required pre-send

### C) Offer Consistency
- [ ] **FAIL** — Canonical pricing doc exists (`templates/pricing_source_of_truth.md`)
- [ ] **FAIL** — Legacy pricing marked deprecated in memory files
- [ ] **FAIL** — Outreach assets point to canonical pricing source

### D) SMS/Call Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS touch
- [ ] **FAIL** — Opt-out line (STOP) required
- [ ] **FAIL** — Quiet-hours policy enforced
- [ ] **FAIL** — Suppression rules explicit after opt-out/disinterest

### E) Operational Readiness
- [ ] **FAIL** — Preflight checklist file exists and is enforced
- [x] **PASS** — Per-lead follow-up triggers defined
- [x] **PASS** — Touch cap present (max 2 per 24h)
- [ ] **FAIL** — QA logging fields enforced per lead

**Current score:** **FAIL** (blocking issues in A, C, D, E)

---

## Fast Remediation Plan (target: v8 green)
- **Patch 1 (30 min):** publish `templates/email_outreach_pack_v8.md` to strict playbook constraints.
- **Patch 2 (20 min):** patch `templates/send_ops_queue_v8.md` with SMS compliance policy + suppression logic.
- **Patch 3 (20 min):** create `templates/pricing_source_of_truth.md`; deprecate legacy pricing in memory docs.
- **Patch 4 (15 min):** create `templates/outreach_preflight_checklist.md` and wire it into queue “go/no-go”.

---

## Final QA Decision
**v7 Enforcement Result: FAIL (remediation required before high-volume outbound).**

Next enforcement should verify v8 artifacts and only pass if all blocking checks clear.