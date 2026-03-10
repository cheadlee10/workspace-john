# QA Enforcement Report — Sales Assets
**Version:** v22  
**Date:** 2026-03-04  
**Scope:** Recent sales templates + memory/playbook guidance consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking inconsistencies still present).**

### Delta vs v21
- ✅ Latest template set is now versioned at **v21** (`email_outreach_pack_v21.md`, `site_demo_pack_v21.md`, `send_ops_queue_v21.md`).
- ❌ v21 outreach pack still violates canonical cold-email rules (<100 words, visual proof requirement, strict cadence).
- ❌ SMS queue still lacks mandatory legal language/process controls.
- ❌ Legacy sendable templates remain active without deprecation banners.
- ❌ Pricing and email-format policy remain fragmented across memory/playbooks/templates.
- ⚠️ Prior report (`qa_enforcement_report_2026-03-04_v21.md`) has stale references to v20 files in both “delta” and “assets reviewed,” indicating QA lineage drift.

---

## Assets Reviewed (v22 pass)
- `templates/email_outreach_pack_v21.md`
- `templates/site_demo_pack_v21.md`
- `templates/send_ops_queue_v21.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `templates/email_outreach_pack.md` (legacy)
- `templates/email-variations.md` (legacy)
- `templates/outreach-nosite-template-pack.md` (legacy)
- `templates/pricing-decision-tree.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v21.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical cold-email rules not enforced in current send-ready pack (HIGH)
**File:** `templates/email_outreach_pack_v21.md`

**Evidence**
- First-touch templates are substantially above canonical short-form standard.
- No mandatory visual proof URL in first touch.
- Cadence is `Day 1 / 3 / 5 / 8 / 11 / 15` vs canonical `Day 0 / 3 / 10 (+17 optional breakup)`.
- Multiple first-touch CTAs ask for immediate calls/booking instead of soft-question-only standard.

**Risk**
- Performance regression and operator drift from proven standard.

**Required fix**
- Add hard send gate and canonical cadence lock; provide canonical-compliant first-touch set.

---

### 2) No-site playbook remains in policy conflict (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- First-touch template includes pricing in initial outreach (`$0 down + $99-299/mo`).
- Follow cadence listed as `Day 1 / Day 5 / Day 10`.

**Risk**
- Conflicting execution standards across operators.

**Required fix**
- Add canonical inheritance clause; remove default first-touch pricing; lock cadence to Day 0/3/10 (+17 optional).

---

### 3) Legacy conflicting templates still active with no deprecation controls (HIGH)
**Files**
- `templates/email_outreach_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

**Evidence**
- Contain pricing-in-first-touch, non-canonical cadence, and call-heavy CTAs.
- No `DEPRECATED — DO NOT SEND` warning.

**Risk**
- Accidental usage of noncompliant copy in live outbound.

**Required fix**
- Add deprecation headers immediately and archive under `templates/archive/` after mapping replacements.

---

### 4) SMS compliance block still missing in active queue (HIGH)
**File:** `templates/send_ops_queue_v21.md`

**Evidence**
- No mandatory sender identification rule.
- No required opt-out phrase on every SMS.
- No explicit legal recipient-local send-window gate.
- No suppression logging schema for STOP/revocation/complaints.

**Risk**
- TCPA/legal exposure and deliverability risk.

**Required fix**
- Embed immutable compliance section and suppression schema in queue template.

---

### 5) Pricing governance remains fragmented (HIGH)
**Files**
- `memory/KNOWLEDGE.md` (website subscription model primary)
- `MEMORY.md` (legacy one-time + mixed pricing table)
- `templates/pricing-decision-tree.md` (hourly service quoting)
- Missing: `templates/pricing_source_of_truth.md`

**Risk**
- Inconsistent quotes, margin leakage, reduced trust.

**Required fix**
- Publish a single pricing source-of-truth with precedence and effective date.

---

### 6) Email format contradiction still unresolved (MEDIUM)
**Files**
- `memory/KNOWLEDGE.md` (all client communications use branded HTML)
- canonical cold-email playbook (plain text required for cold first-touch)

**Risk**
- Mixed-format sends and inconsistent outbound QA.

**Required fix**
- Clarify policy split: cold outbound first-touch plain text only; branded HTML for post-reply/proposal/onboarding.

---

### 7) Governance artifacts still missing (MEDIUM)
**Missing files**
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`

**Risk**
- No authoritative approved bundle; continuous drift.

---

### 8) QA metadata drift inside prior report (LOW but important)
**File:** `memory/qa_enforcement_report_2026-03-04_v21.md`

**Evidence**
- “Delta vs v20” and reviewed asset list still reference v20 core templates despite v21 assets existing.

**Risk**
- Audit trail reliability degradation.

**Required fix**
- Enforce report header schema with auto-validated version stamp and reviewed-file list.

---

## Positive Findings (PASS)
- `site_demo_pack_v21.md` remains high-quality and conversion-ready (if placeholders replaced).
- Canonical cold-email playbook remains explicit and actionable.
- Core template version parity exists at v21 (email/site/send-ops trio).

---

## Fix Pack (Copy/Paste Ready)

### A) Insert at top of `templates/email_outreach_pack_v21.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body must be <100 words (excluding signature)
- Include exactly 1 verifiable business-specific observation
- Include exactly 1 visual proof URL (live preview or screenshot)
- Soft CTA only (single question)
- No pricing in first touch
- Do not send if placeholders remain
- Cadence locked: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
```

### B) Insert into `playbooks/nosite-outreach-playbook.md`
```md
## CANONICAL INHERITANCE (REQUIRED)
This playbook inherits cold-email first-touch rules from:
`playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`
If conflict exists, canonical playbook wins.

No first-touch pricing.
Cadence: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup).
```

### C) Add to each legacy template header
```md
# DEPRECATED — DO NOT SEND
This template is retained for historical reference only.
Use approved assets listed in `templates/release_manifest.md`.
```

### D) Insert into `templates/send_ops_queue_v21.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender/company.
- Every SMS must include opt-out text: "Reply STOP to opt out."
- Send only within recipient-local legal send window.
- On STOP/complaint/revoke: immediate suppression + log event.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### E) Add to `memory/KNOWLEDGE.md`
```md
### Email Format Policy Split (Effective Immediately)
- Cold outbound first-touch: plain text only.
- Branded HTML template: proposals, follow-up after positive reply, onboarding/client communications.
```

### F) New governance files to create
- `templates/release_manifest.md` — approved/deprecated assets, effective date, QA approver.
- `templates/pricing_source_of_truth.md` — pricing precedence + quoting rules.
- `memory/qa_report_schema.md` — required fields for QA reports (version, reviewed files, evidence, checklist score).

---

## Immediate Enforcement Actions
1. Block high-volume cold sends from `email_outreach_pack_v21.md` until send gate + cadence rewrite is complete.
2. Block no-site first-touch sends from `playbooks/nosite-outreach-playbook.md` until canonical inheritance/pricing conflict is fixed.
3. Mark legacy templates deprecated today; archive next pass.
4. Restrict scaled SMS until compliance block is embedded in `send_ops_queue_v21.md`.
5. Freeze discretionary quoting until pricing SOT is published.
6. Standardize next QA report generation using explicit schema to prevent metadata drift.

---

## Pass/Fail Checklist (v22)

### A) Cold Email Structure
- [ ] **FAIL** First-touch templates strictly <100 words
- [ ] **FAIL** Mandatory specific observation enforced
- [ ] **FAIL** Mandatory visual proof URL enforced
- [ ] **FAIL** Soft CTA-only first touch enforced
- [ ] **FAIL** Cadence aligned to Day 0 / 3 / 10 / (17 optional)
- [ ] **FAIL** Placeholder send-block gate enforced

### B) Pricing Consistency
- [ ] **FAIL** `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** Legacy pricing references labeled historical/deprecated
- [ ] **FAIL** Send-ready assets reference pricing SOT

### C) SMS / Legal Compliance
- [ ] **FAIL** Sender identity standardized in first SMS
- [ ] **FAIL** STOP opt-out required in every SMS
- [ ] **FAIL** Recipient-local legal send windows hard-gated
- [ ] **FAIL** Suppression logging schema embedded in send ops template

### D) Governance / Drift Prevention
- [ ] **FAIL** No-site playbook explicitly inherits canonical rules
- [ ] **FAIL** Legacy outbound files marked deprecated/archived
- [ ] **FAIL** Release manifest defines approved send-ready bundle
- [ ] **FAIL** QA report schema exists and is used
- [x] **PASS** Core template version parity maintained (v21/v21/v21)

### E) Guidance Consistency
- [ ] **FAIL** HTML vs plain-text policy contradiction resolved

### F) Quality Signals
- [x] **PASS** Site demo pack messaging quality remains strong
- [ ] **FAIL** All send-ready outreach assets aligned to canonical cold-email standard

**Current score:** **FAIL** (blocking issues remain in cold-email enforcement, SMS compliance, pricing governance, and template governance)

---

## Final QA Decision
**v22 Enforcement Result: FAIL — remediation required before high-volume outbound and scaled SMS operations.**
