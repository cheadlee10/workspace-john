# QA Enforcement Report — Sales Assets
**Version:** v10  
**Date:** 2026-03-04  
**Scope:** Recent templates + memory guidance consistency/compliance/quality review

---

## Executive Verdict
**Overall status: FAIL (still not approved for scaled outbound).**

v10 updates improved readability, but core blockers remain: cold-email structure drift from canonical playbook, SMS legal safeguards still missing, and pricing/cadence source-of-truth conflicts still unresolved.

---

## Assets Reviewed (v10 pass)
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `templates/email_outreach_pack_v10.md`
- `templates/send_ops_queue_v9.md`
- `templates/site_demo_pack_v10.md`
- `templates/email-variations.md` (legacy drift risk)
- `memory/KNOWLEDGE.md`
- `memory/CRM_playbook.md`
- `MEMORY.md`
- `memory/active_projects.md`
- Baseline delta: `memory/qa_enforcement_report_2026-03-04_v9.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) `email_outreach_pack_v10.md` still violates canonical cold-email standard (HIGH)
**Evidence**
- Guidance says first touch under `~120 words`, but canonical requires **<100 words**.
- Cadence in v10 is `2/4/7/10/14` follow-ups, not canonical `0/3/10 (+17 optional breakup)`.
- No required `{specific_observation}` line enforcement.
- No required `{visual_link}` line enforcement.
- Multiple templates are long and read like marketing copy, not short cold-email format.
- No explicit unresolved-placeholder block-send rule.
- No mandatory compliance footer elements from playbook pre-send checklist (physical address + opt-out).

**Risk**
- Lower reply rates, inconsistent execution, and direct conflict with adopted playbook.

**Fix required**
- Publish/patch to canonical-locked format (v11 or overwrite v10):
  1. Hard gate: first touch **<100 words**
  2. Mandatory lines: `{specific_observation}` + `{visual_link}`
  3. Cadence: Day 0 / Day 3 / Day 10 / Day 17
  4. Add compliance footer requirement: physical address + simple opt-out text
  5. Add `NO SEND if any placeholder remains`

---

### 2) `send_ops_queue_v9.md` still noncompliant for SMS legal hygiene (HIGH)
**Evidence**
- No mandatory sender identity line in first SMS.
- No mandatory opt-out text (`Reply STOP to opt out`) in templates/snippets.
- No explicit quiet-hours enforcement (recipient local 8:00 AM–8:00 PM).
- No hard suppression policy after STOP/disinterest/legal complaints.
- No required suppression logging fields in checklist.

**Risk**
- Carrier filtering and legal/compliance exposure; avoidable sender reputation damage.

**Fix required**
- Patch queue template with mandatory compliance block:
  1. Sender ID in first touch
  2. Opt-out line in every SMS
  3. Quiet-hours guardrail by recipient timezone
  4. Immediate suppression rules
  5. Suppression logging (reason + timestamp + source)

---

### 3) Pricing source-of-truth remains fragmented (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` defines canonical website model: `$0 down + $99/$199/$299 monthly (12-month minimum)`.
- `MEMORY.md` and `memory/active_projects.md` still include legacy one-time/tier pricing tables as active-looking guidance.
- `templates/pricing_source_of_truth.md` is missing (file not found).

**Risk**
- Inconsistent quoting, buyer confusion, and internal execution drift.

**Fix required**
- Create `templates/pricing_source_of_truth.md` and declare it canonical.
- Mark legacy pricing in `MEMORY.md` + `memory/active_projects.md` as `DEPRECATED (historical context only)`.
- Add one-line pointer in outreach templates: `Pricing source: templates/pricing_source_of_truth.md`.

---

### 4) Cadence contradiction in memory guidance persists (MEDIUM)
**Evidence**
- `memory/CRM_playbook.md` still prescribes Day `0/2/5/8/12/14` sequence.
- Canonical cold-email playbook requires Day `0/3/10 (+17 breakup)`.

**Risk**
- Operators execute conflicting sequences depending on which doc is open.

**Fix required**
- Add clear scope statement in `memory/CRM_playbook.md`:
  - Cold email = Day 0/3/10 (+17 optional breakup)
  - 14-day 6-touch sequence = multichannel nurture only

---

### 5) Legacy drift risk remains active (MEDIUM)
**Evidence**
- `templates/email-variations.md` still has first-touch pricing language (`$0 down, $99/mo`) that conflicts with no-pricing-first-touch rule.
- Multiple old packs remain in active root and are not clearly marked deprecated.
- No canonical index file (`templates/README_OUTREACH_CANONICAL.md`) found.

**Risk**
- Accidental sends from stale assets, reintroducing known failures.

**Fix required**
- Archive superseded files to `templates/archive/`.
- Add `templates/README_OUTREACH_CANONICAL.md` with approved-file list.
- Add banner to legacy files: `DEPRECATED — DO NOT SEND FROM THIS FILE`.

---

### 6) Positive quality findings (PASS)
- `templates/site_demo_pack_v10.md` is clear, structured, and usable for demo workflow.
- `memory/KNOWLEDGE.md` still captures core canonical cold-email rules.
- QA report versioning discipline is intact and improving.

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v10.md` until canonical hard rules are embedded.
2. **Block scaled SMS sends** from `send_ops_queue_v9.md` until legal safeguards are mandatory in-message.
3. **Freeze quoting model changes** until pricing source-of-truth file exists.
4. **Deprecate legacy outreach templates** to prevent accidental noncompliant sends.

---

## Pass/Fail Checklist (v10)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly under 100 words
- [ ] **FAIL** — Mandatory `{specific_observation}` line in first touch
- [ ] **FAIL** — Mandatory `{visual_link}` line in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Compliance footer requirement (address + opt-out) enforced
- [ ] **FAIL** — Unresolved-placeholder block-send rule enforced

### B) Personalization & QA Gates
- [ ] **FAIL** — Click-test gate for all links in execution checklist
- [ ] **FAIL** — Encoding artifact gate explicitly enforced in current send templates
- [ ] **FAIL** — `templates/outreach_preflight_checklist.md` exists and is operational

### C) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing in memory docs clearly marked deprecated
- [ ] **FAIL** — Outbound assets point to canonical pricing source

### D) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out line required in every SMS
- [ ] **FAIL** — Quiet-hours policy explicitly enforced
- [ ] **FAIL** — Suppression policy + suppression logging requirement enforced

### E) Governance / Operational Control
- [ ] **FAIL** — Canonical outreach README exists to prevent template drift
- [ ] **FAIL** — Legacy outbound files clearly marked DEPRECATED
- [x] **PASS** — QA enforcement reports are versioned and maintained

**Current score:** **FAIL** (blocking issues across A/B/C/D)

---

## Fast Remediation Plan (target PASS)
- **Patch 1 (30 min):** Canonical-lock `email_outreach_pack_v10.md` to playbook constraints (<100 words, observation, visual, cadence).
- **Patch 2 (20 min):** Add SMS legal block + suppression logging to `send_ops_queue_v9.md`.
- **Patch 3 (20 min):** Create `templates/pricing_source_of_truth.md`; mark legacy pricing deprecated.
- **Patch 4 (15 min):** Create `templates/outreach_preflight_checklist.md` and wire into send workflow.
- **Patch 5 (15 min):** Publish canonical outreach README + archive/deprecate legacy templates.

---

## Final QA Decision
**v10 Enforcement Result: FAIL (remediation required before high-volume outbound).**