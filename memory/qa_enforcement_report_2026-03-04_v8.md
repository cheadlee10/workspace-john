# QA Enforcement Report — Sales Assets
**Version:** v8  
**Date:** 2026-03-04  
**Scope reviewed:** current sales templates + memory guidance for consistency, compliance, and quality

---

## Executive Verdict
**Overall status: FAIL (not approved for scaled outbound).**

v8 includes progress in queue structure and operational clarity, but core compliance gaps remain in cold email standards, SMS legal safeguards, and pricing source-of-truth consistency.

---

## Assets Reviewed (v8 pass)
- `templates/email_outreach_pack_v8.md`
- `templates/send_ops_queue_v8.md`
- `templates/site_demo_pack_v7.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- Baseline delta: `memory/qa_enforcement_report_2026-03-04_v7.md`

---

## QA Findings (Gaps / Contradictions / Compliance)

## 1) `email_outreach_pack_v8.md` is still noncompliant with canonical cold-email playbook (HIGH)
**Evidence**
- Canonical rules require first-touch emails **under 100 words**; v8 says “under ~120 words.”
- Canonical rules require a **visual proof link in every first touch**; v8 templates do not include mandatory `{visual_link}` structure.
- Canonical rules require one **specific, verifiable observation** line; v8 treats personalization as optional guidance, not required template architecture.
- Canonical cadence in playbook: **Day 0 / Day 3 / Day 10 (+ Day 17 breakup)**; v8 uses Day 1/3/6/10/14 with five follow-ups.
- Canonical signature/compliance hygiene (professional sender identity + opt-out handling) is not enforced in v8 template structure.

**Risk**
- Lower response rates, inconsistent execution quality, and drift from proven process.

**Fix required**
- Publish a strict playbook-aligned pack (v9 recommended) with:
  - hard `<100 words` first-touch gate
  - required `{specific_observation}` sentence
  - required `{visual_link}` sentence
  - required signature block scaffold
  - cadence reset to Day 0/3/10/17
  - explicit “Do not send if any placeholder unresolved” rule

---

## 2) `send_ops_queue_v8.md` still lacks SMS compliance/legal guardrails (HIGH)
**Evidence**
- No standardized sender identity line in first SMS (e.g., “This is John at NorthStar Synergy”).
- No required opt-out line (e.g., “Reply STOP to opt out”).
- No explicit quiet-hours policy by recipient local timezone.
- No hard suppression policy after STOP, disinterest, or legal complaint.
- No documented opt-out honoring SLA/log procedure in the checklist.

**Risk**
- Carrier filtering risk, TCPA/CAN-SPAM-style exposure, and sender reputation damage.

**Fix required**
- Add mandatory compliance block to queue template:
  1. Sender ID required in first touch
  2. Opt-out text required on each SMS
  3. Quiet hours: only 8:00 AM–8:00 PM recipient local time
  4. Immediate suppression after STOP / not interested / legal threat
  5. Log suppression + reason in lead notes

---

## 3) Pricing source-of-truth conflict remains unresolved (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` sets website model as canonical: **$0 down + $99/$199/$299 monthly (12-month minimum)**.
- `MEMORY.md` still contains active legacy pricing references (e.g., **$250 + $10/mo**, one-time service grids).
- `memory/active_projects.md` still lists one-time tier pricing by service.
- Missing required canonical file: `templates/pricing_source_of_truth.md`.

**Risk**
- Offer confusion in outreach, inconsistent quoting, lower trust at close.

**Fix required**
- Create `templates/pricing_source_of_truth.md` as sole reference.
- Mark legacy pricing in `MEMORY.md` and `memory/active_projects.md` as **DEPRECATED** (historical only).
- Add a one-line pointer in outreach templates: “Pricing source: templates/pricing_source_of_truth.md”.

---

## 4) Preflight QA control is still missing (MEDIUM)
**Evidence**
- `templates/outreach_preflight_checklist.md` does not exist.
- Send queue checklist does not enforce hard pre-send gates for:
  - verifiable observation completed
  - visual link click-tested
  - encoding check completed
  - compliance line(s) present
  - unresolved tokens blocked

**Risk**
- Broken links, unresolved placeholders, low-quality sends, and repeat errors at scale.

**Fix required**
- Create `templates/outreach_preflight_checklist.md` from playbook Section 10.
- Add hard “GO/NO-GO” step to queue: do not send until all checks pass.

---

## 5) Quality positives (PASS)
- `site_demo_pack_v7.md` remains strong, clear, and conversion-oriented.
- `send_ops_queue_v8.md` improved prioritization logic and execution discipline.
- Timezone batching, touch caps, and follow-up triggers are operationally useful.
- `memory/KNOWLEDGE.md` correctly references canonical outreach standard.

---

## Enforcement Actions (Immediate)
1. **Block scaled cold-email sending** from current `email_outreach_pack_v8.md` until strict playbook structure is enforced.
2. **Block scaled SMS sending** from `send_ops_queue_v8.md` until sender ID, opt-out, quiet-hours, and suppression rules are embedded.
3. **Freeze pricing usage** to a single canonical pricing document once created.
4. **Require preflight checklist PASS** before any outbound batch launch.

---

## Pass/Fail Checklist (v8)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly under 100 words
- [ ] **FAIL** — Mandatory visual proof link in every first touch
- [x] **PASS** — No first-touch pricing language in primary templates
- [x] **PASS** — Soft CTA style generally present
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17

### B) Personalization & Quality
- [ ] **FAIL** — Verifiable business-specific observation required by template structure
- [ ] **FAIL** — Unresolved placeholder blocking rule enforced
- [ ] **FAIL** — Encoding QA gate embedded in send workflow
- [ ] **FAIL** — Link validation required pre-send

### C) Offer Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing explicitly deprecated in memory files
- [ ] **FAIL** — Outreach assets point to canonical pricing source

### D) SMS/Call Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — Opt-out line required (“Reply STOP to opt out”)
- [ ] **FAIL** — Quiet-hours rule explicitly enforced
- [ ] **FAIL** — Suppression policy explicit after STOP/disinterest/legal signal

### E) Operational Readiness
- [ ] **FAIL** — `templates/outreach_preflight_checklist.md` exists and is enforced
- [x] **PASS** — Follow-up triggers defined per lead
- [x] **PASS** — Touch cap present (max 2 per 24h)
- [ ] **FAIL** — QA logging/suppression fields enforced per lead

**Current score:** **FAIL** (blocking issues in A, C, D, E)

---

## Fast Remediation Plan (to reach PASS)
- **Patch 1 (30 min):** release strict playbook-compliant `email_outreach_pack_v9.md`.
- **Patch 2 (20 min):** patch queue into `send_ops_queue_v9.md` with SMS legal/deliverability controls.
- **Patch 3 (20 min):** create `templates/pricing_source_of_truth.md`; mark legacy pricing as deprecated in memory files.
- **Patch 4 (15 min):** create `templates/outreach_preflight_checklist.md` and wire GO/NO-GO gate into queue execution.

---

## Final QA Decision
**v8 Enforcement Result: FAIL (remediation required before high-volume outbound).**

Next enforcement should only PASS if all blocking checks clear and required control files exist.