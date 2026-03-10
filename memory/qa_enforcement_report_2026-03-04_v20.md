# QA Enforcement Report — Sales Assets
**Version:** v20  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates + memory/playbook guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking issues remain).**

### Snapshot
- **Improved:** Core packs are version-aligned at `v17` and remain operationally usable.
- **Still blocking:** Canonical cold-email policy is not enforced in first-touch templates, legacy conflicting assets remain active, SMS compliance controls are still incomplete, and pricing governance remains fragmented.

---

## Assets Reviewed (this pass)
- `templates/email_outreach_pack_v17.md`
- `templates/send_ops_queue_v17.md`
- `templates/site_demo_pack_v17.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical standard)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v17.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) First-touch email pack still violates canonical standard (HIGH)
**File:** `templates/email_outreach_pack_v17.md`

**Evidence**
- Many first-touch templates exceed `<100 words` requirement.
- Templates are generic and do not enforce one **verifiable business-specific observation**.
- No hard requirement for **visual proof link** in first touch.
- Several CTAs are medium/high-friction (call booking asks) instead of soft CTA-first.
- Cadence guidance says every 2–4 business days + optional 7-touch flow, conflicting with canonical Day 0 / 3 / 10 (+17 breakup).

**Risk**
- Lower reply quality, execution drift, inconsistent operator behavior.

**Required fix**
Add a non-negotiable send gate at top of file:
1. First touch body `<100 words`
2. One verifiable observation
3. One visual proof URL required
4. One soft CTA only
5. No pricing in first touch
6. Cadence locked to Day 0 / Day 3 / Day 10 (+Day 17 breakup optional)
7. Hard stop if placeholders remain

---

### 2) No-site playbook remains in policy conflict (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- First-touch email template includes pricing (`$0 down, $99/mo`).
- Follow cadence listed as Day 1 / 5 / 10, conflicting with canonical Day 0 / 3 / 10 (+17 optional).

**Risk**
- Conflicting operator instructions and noncompliant sends.

**Required fix**
- Add inheritance header: “This playbook follows canonical cold-email rules in `COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`.”
- Remove pricing from first-touch default.
- Align follow cadence to Day 0 / 3 / 10 (+17 optional breakup).

---

### 3) Legacy outbound templates are still active and conflicting (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

**Evidence**
- `email-variations.md` uses first-touch pricing and hard sales framing.
- `outreach-nosite-template-pack.md` includes direct meeting asks + first-touch pricing references.
- Neither file is marked deprecated.

**Risk**
- Accidental reuse of invalid messaging in production sends.

**Required fix**
- Add top banner in both files: `DEPRECATED — DO NOT SEND`.
- Move both into `templates/archive/` once replacement mapping is documented.

---

### 4) SMS legal controls are still under-specified (HIGH)
**File:** `templates/send_ops_queue_v17.md`

**Evidence**
- Operational sequencing exists, but no hard legal block requiring sender identity in first SMS.
- No explicit requirement that each SMS include opt-out language.
- No suppression/audit schema defined for STOP/revocation/legal complaint events.

**Risk**
- TCPA/compliance exposure + carrier filtering risk.

**Required fix**
Add immutable `SMS Compliance Block`:
- First SMS identifies sender/company.
- Every SMS includes opt-out text (`Reply STOP to opt out`).
- Recipient-local legal send windows are hard-gated.
- Suppression logging required with fields: `lead_id, channel, event_type, source, timestamp_local, operator`.

---

### 5) Pricing governance still fragmented (HIGH)
**Files:**
- `memory/KNOWLEDGE.md` (subscription web model)
- `MEMORY.md` and `memory/active_projects.md` (legacy one-time/tiered tables still appear active)
- Missing canonical file: `templates/pricing_source_of_truth.md`

**Evidence**
- Multiple overlapping pricing systems with no declared precedence.
- No single quoting source for outreach/proposals.

**Risk**
- Inconsistent quotes, margin leakage, trust erosion.

**Required fix**
- Create `templates/pricing_source_of_truth.md` as sole quoting authority.
- Mark legacy pricing blocks in memory docs as historical/deprecated context.
- Require templates/proposals to reference pricing SOT.

---

### 6) Release governance artifact still missing (MEDIUM)
**Evidence**
- No `templates/release_manifest.md` to define approved vs blocked assets.

**Risk**
- Template drift and accidental use of stale materials.

**Required fix**
Create `templates/release_manifest.md` with:
- Approved send-ready files
- Deprecated/blocked files
- Effective date + last QA stamp

---

### 7) QA lineage quality issue in prior report (LOW)
**File:** `memory/qa_enforcement_report_2026-03-04_v17.md`

**Evidence**
- Report is labeled v17 but its reviewed file list references v16 core template set.

**Risk**
- Audit-trail ambiguity.

**Required fix**
- Future QA reports must include exact reviewed filenames and versions that match the report label.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v17.md` remains coherent, clear, and conversion-usable.
- `memory/CRITICAL_RULES.md` still provides strong operational safety guardrails.
- Core template family version parity currently exists at v17.

---

## Fix Pack (Ready-to-Apply)

### A) Mandatory Header for `email_outreach_pack_v17.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body must be <100 words (excluding signature)
- Include exactly 1 verifiable business-specific observation
- Include exactly 1 visual proof URL (live demo or screenshot)
- Soft CTA only (question format)
- No pricing in first touch
- Do not send if any placeholder token remains
- Cadence: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
```

### B) Mandatory Header for `playbooks/nosite-outreach-playbook.md`
```md
## CANONICAL INHERITANCE (REQUIRED)
This playbook inherits all first-touch rules from:
`playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`
If there is a conflict, canonical playbook wins.

No first-touch pricing.
Cadence is locked to Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup).
```

### C) Deprecation Banner for legacy files
```md
# DEPRECATED — DO NOT SEND
This file is retained for historical reference only.
Use current approved templates listed in `templates/release_manifest.md`.
```

### D) SMS Compliance Block for `send_ops_queue_v17.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender/company.
- Every SMS must include opt-out text: "Reply STOP to opt out."
- Send only within recipient-local legal window.
- On STOP/complaint/revoke: immediate suppression + log event.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

---

## Immediate Enforcement Actions
1. Block high-volume cold sends from `email_outreach_pack_v17.md` until send gate is embedded.
2. Block no-site playbook usage until first-touch pricing and cadence conflicts are fixed.
3. Block legacy template usage (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated/archived.
4. Block scaled SMS operations from `send_ops_queue_v17.md` until legal controls are hardcoded.
5. Freeze discretionary quoting until pricing SOT is published.
6. Publish release manifest before next outbound batch.

---

## Pass/Fail Checklist (v20)

### A) Cold Email Structure
- [ ] **FAIL** First-touch templates are strictly <100 words
- [ ] **FAIL** Mandatory specific observation enforced
- [ ] **FAIL** Mandatory visual proof link enforced
- [ ] **FAIL** Soft CTA-only in first touch enforced
- [ ] **FAIL** Cadence aligned to Day 0 / 3 / 10 / 17
- [ ] **FAIL** Placeholder-block send gate enforced

### B) Pricing Consistency
- [ ] **FAIL** `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** Legacy pricing references labeled deprecated/historical
- [ ] **FAIL** Send-ready assets reference pricing SOT

### C) SMS / Legal Compliance
- [ ] **FAIL** Sender identity standardized in first SMS
- [ ] **FAIL** STOP opt-out required in every SMS
- [ ] **FAIL** Recipient-local legal send windows hard-gated
- [ ] **FAIL** Suppression logging policy embedded in send ops template

### D) Governance / Drift Prevention
- [ ] **FAIL** No-site playbook explicitly inherits canonical rules
- [ ] **FAIL** Legacy outbound files marked deprecated/archived
- [ ] **FAIL** Release manifest defines approved bundle
- [x] **PASS** Core template version parity (v17/v17/v17)
- [x] **PASS** QA report continuity maintained

### E) Quality Signals
- [x] **PASS** Site demo pack quality remains strong
- [ ] **FAIL** All send-ready outreach assets aligned to single canonical standard

**Current score:** **FAIL** (blocking issues across Cold Email, Pricing, SMS Compliance, and Governance)

---

## Final QA Decision
**v20 Enforcement Result: FAIL — remediation required before high-volume outbound and scaled SMS execution.**
