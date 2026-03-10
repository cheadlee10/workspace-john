# QA Enforcement Report — Sales Assets
**Version:** v11  
**Date:** 2026-03-04  
**Scope:** Recent templates + memory guidance consistency, compliance, and quality review

---

## Executive Verdict
**Overall status: FAIL (not approved for scaled outbound).**

Compared to v10, drift is still active across core outreach files. Canonical cold-email standards remain inconsistently applied, SMS/call queue compliance is still under-specified, and pricing/cadence guidance conflicts remain unresolved.

---

## Assets Reviewed (v11 pass)
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `templates/email_outreach_pack_v10.md`
- `templates/send_ops_queue_v10.md`
- `templates/site_demo_pack_v10.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `memory/KNOWLEDGE.md`
- `memory/CRM_playbook.md`
- `MEMORY.md`
- `memory/active_projects.md`
- Baseline delta: `memory/qa_enforcement_report_2026-03-04_v10.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Cold-email pack remains out of canonical spec (HIGH)
**Files:** `templates/email_outreach_pack_v10.md`, `templates/outreach-nosite-template-pack.md`, `templates/email-variations.md`  
**Evidence**
- First touch guidance allows `~120 words`; canonical requires **<100 words**.
- Cadence listed as `2/4/7/10/14` in v10 pack vs canonical Day `0/3/10 (+17 optional breakup)`.
- No hard requirement for `{specific_observation}` and `{visual_link}` in first touch.
- Multiple first-touch templates include pricing language (`$0 down`, `$99/mo`, `$500/$1000/$2000`) despite canonical “no pricing in email #1”.
- No explicit “do not send if placeholders remain” enforcement in active pack.

**Risk**
- Response suppression, inconsistent operator execution, and direct playbook noncompliance.

**Required fix**
- Canonical-lock primary email pack to:
  1. First touch `<100 words`
  2. Required lines: one verifiable observation + one visual/demo link
  3. Cadence `0/3/10 (+17 breakup optional)`
  4. No first-touch pricing
  5. `NO SEND` if any placeholder token remains

---

### 2) Send-ops queue still lacks mandatory SMS/legal safety gates (HIGH)
**File:** `templates/send_ops_queue_v10.md`  
**Evidence**
- No mandatory sender identification template in first SMS body.
- No explicit “Reply STOP to opt out” requirement in SMS snippets.
- Quiet-hours policy is implied by morning windows but not codified as a hard legal gate.
- No documented suppression workflow after STOP/disinterest/legal complaint.
- No required suppression log fields in checklist.

**Risk**
- Legal exposure, carrier filtering, and avoidable deliverability/reputation damage.

**Required fix**
- Add immutable compliance block in queue template:
  - First-touch SMS includes sender identity + company
  - Every SMS includes opt-out language
  - Enforce recipient-local send window (8:00 AM–8:00 PM)
  - Immediate suppression rules (STOP, no-contact request, complaint)
  - Required suppression logging fields: `lead_id`, `channel`, `reason`, `timestamp_local`, `source`

---

### 3) Pricing source-of-truth still fragmented (HIGH)
**Files:** `memory/KNOWLEDGE.md`, `MEMORY.md`, `memory/active_projects.md`  
**Evidence**
- `memory/KNOWLEDGE.md` defines current website model: `$0 down + $99/$199/$299 monthly` with 12-month minimum.
- `MEMORY.md` and `memory/active_projects.md` still present one-time Good/Better/Best tables as active guidance.
- Missing canonical pricing file: `templates/pricing_source_of_truth.md` (not found).

**Risk**
- Quote inconsistency and preventable confusion in outbound + closing.

**Required fix**
- Create `templates/pricing_source_of_truth.md` as canonical pricing doc.
- Mark legacy one-time tables in `MEMORY.md` and `memory/active_projects.md` as `DEPRECATED — historical`.
- Add one-line pointer in outreach assets: `Pricing source: templates/pricing_source_of_truth.md`.

---

### 4) Cadence contradiction persists in memory guidance (MEDIUM)
**File:** `memory/CRM_playbook.md`  
**Evidence**
- CRM playbook still enforces Day `0/2/5/8/12/14` cadence.
- Canonical cold-email playbook uses Day `0/3/10 (+17 breakup)`.

**Risk**
- Team executes conflicting cadence based on whichever doc is open.

**Required fix**
- Add clear scope split to CRM playbook:
  - **Cold email standard:** 0/3/10 (+17)
  - **Multichannel nurture sequence:** 0/2/5/8/12/14

---

### 5) Governance controls for template drift still missing (MEDIUM)
**Evidence**
- Missing `templates/README_OUTREACH_CANONICAL.md`.
- Missing `templates/outreach_preflight_checklist.md`.
- Legacy/alternate templates remain send-ready with no `DEPRECATED` banner.

**Risk**
- Operators can accidentally send stale noncompliant copy.

**Required fix**
- Publish canonical index + preflight checklist.
- Add top-of-file banner in legacy files: `DEPRECATED — DO NOT SEND`.
- Move superseded assets into `templates/archive/`.

---

### 6) Positive quality findings (PASS)
- `templates/site_demo_pack_v10.md` is structured, coherent, and reusable for delivery demos.
- `memory/KNOWLEDGE.md` still preserves canonical cold-email standards.
- QA versioning cadence is healthy (`v2`→`v11` continuity).

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v10.md`, `email-variations.md`, and `outreach-nosite-template-pack.md` until canonical constraints are embedded.
2. **Block scaled SMS sends** from `send_ops_queue_v10.md` until legal text + suppression mechanics are mandatory.
3. **Freeze pricing edits/quotes** until canonical pricing source file exists.
4. **Lock operator routing** to a canonical outreach README + preflight checklist.

---

## Pass/Fail Checklist (v11)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly under 100 words
- [ ] **FAIL** — Mandatory specific-observation line in first touch
- [ ] **FAIL** — Mandatory visual/demo link line in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — No first-touch pricing across active templates
- [ ] **FAIL** — Unresolved-placeholder block-send rule enforced

### B) Personalization & QA Gates
- [ ] **FAIL** — Click-test gate for all links in active send workflow
- [ ] **FAIL** — Encoding artifact gate (smart quote/garble prevention) in preflight
- [ ] **FAIL** — `templates/outreach_preflight_checklist.md` exists and is used

### C) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing in memory docs marked deprecated
- [ ] **FAIL** — Outbound assets point to canonical pricing source

### D) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out line required in every SMS
- [ ] **FAIL** — Quiet-hours policy explicitly enforced as hard gate
- [ ] **FAIL** — Suppression policy + suppression logging requirements enforced

### E) Governance / Operational Control
- [ ] **FAIL** — Canonical outreach README exists to prevent drift
- [ ] **FAIL** — Legacy outbound files marked DEPRECATED or archived
- [x] **PASS** — QA enforcement reports are versioned and maintained

**Current score:** **FAIL** (blocking issues in A/B/C/D/E)

---

## Fix Pack (ready to apply)

### 1) Add canonical pricing file
Create: `templates/pricing_source_of_truth.md`
- Canonical website offer
- Explicit deprecation note for historical one-time tables
- Effective date + owner

### 2) Add canonical outreach index
Create: `templates/README_OUTREACH_CANONICAL.md`
- Approved files list (send-allowed)
- Deprecated files list (send-blocked)
- Mandatory preflight path

### 3) Add preflight checklist
Create: `templates/outreach_preflight_checklist.md`
- Word-count gate, placeholder gate, observation/visual gate
- Link click-test + encoding check
- Compliance footer requirements
- SMS quiet-hours + STOP + suppression checks

### 4) Patch email pack and nosite variants
- Enforce <100 words first touch
- Remove all first-touch pricing mentions
- Require observation + visual line in every first touch
- Update follow-up cadence to 0/3/10(+17)

### 5) Patch send ops queue
- Insert compliant SMS starter + opt-out text
- Add suppression + do-not-contact logging checklist

---

## Final QA Decision
**v11 Enforcement Result: FAIL (remediation required before high-volume outbound).**