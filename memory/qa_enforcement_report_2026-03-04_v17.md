# QA Enforcement Report — Sales Assets
**Version:** v17  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current outreach templates and memory/playbook guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance + policy drift remain).**

**What improved vs v16:** version parity across core template set now exists (`email_outreach_pack_v16`, `site_demo_pack_v16`, `send_ops_queue_v16`).  
**What still blocks approval:** canonical cold-email standard is still not fully enforced in send-ready templates, legacy conflicting templates are still active, SMS legal controls remain under-specified, and pricing source-of-truth is still fragmented.

---

## Assets Reviewed (v17 pass)
- `templates/email_outreach_pack_v16.md`
- `templates/site_demo_pack_v16.md`
- `templates/send_ops_queue_v16.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v16.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Email outreach pack still non-canonical for first-touch enforcement (HIGH)
**File:** `templates/email_outreach_pack_v16.md`

**Evidence**
- Uses “under 140 words” guidance; canonical playbook requires `<100 words` for cold first touch.
- Does not hard-require **visual proof link** in first touch.
- Allows hard CTAs (e.g., direct call ask) instead of enforcing soft CTA-first.
- No hard “do not send if placeholders remain” gate.

**Risk**
- Reply-rate drag, inconsistent execution, drift from adopted standard.

**Required fix**
Add a top-of-file immutable block:
1. `<100 words` first-touch body
2. One verifiable observation
3. One visual proof URL (live demo/screenshot)
4. Soft CTA only in first touch
5. `DO NOT SEND` if placeholders exist
6. Day 0 / 3 / 10 (+17 optional breakup)

---

### 2) No-site playbook conflicts with canonical first-touch policy (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- Includes first-touch pricing in base template (`$0 down, $99/mo`).
- Uses Day 1 / 5 / 10 cadence, conflicting with canonical Day 0 / 3 / 10 (+17 optional).

**Risk**
- Competing playbook logic creates operator confusion and noncompliant sends.

**Required fix**
- Add inheritance header: no-site outreach follows canonical cold-email rules.
- Remove first-touch pricing from default touch.
- Align cadence to Day 0 / 3 / 10 (+17 optional breakup).

---

### 3) Legacy conflicting templates still active and send-usable (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

**Evidence**
- Include first-touch pricing and hard-ask patterns conflicting with canonical.
- No deprecation banner; easy to use accidentally.

**Risk**
- Reintroduction of invalid messaging into live outreach.

**Required fix**
- Add header to both files: `DEPRECATED — DO NOT SEND`.
- Move to `templates/archive/` after replacement mapping is documented.

---

### 4) SMS queue still missing explicit legal/compliance gates (HIGH)
**File:** `templates/send_ops_queue_v16.md`

**Evidence**
- No immutable requirement for sender identity in first SMS.
- No explicit opt-out line requirement (`Reply STOP to opt out`).
- No suppression event schema (STOP/revoke/legal complaint).
- Time windows are present operationally, but not framed as hard legal gate + enforcement action.

**Risk**
- TCPA/carrier filtering risk and suppression-handling failures.

**Required fix**
Insert mandatory `SMS Compliance Block`:
- First SMS must identify sender/company.
- Every SMS includes opt-out text.
- Hard recipient-local send windows + no-send handling.
- Suppression schema fields: `lead_id`, `channel`, `event_type`, `source`, `timestamp_local`, `operator`.

---

### 5) Pricing source-of-truth still fragmented across memory/docs (HIGH)
**Files:**
- `memory/KNOWLEDGE.md` (subscription model)
- `MEMORY.md` and `memory/active_projects.md` (legacy one-time/tiered tables still look active)
- Missing: `templates/pricing_source_of_truth.md`

**Evidence**
- Co-existing pricing models without explicit deprecation/precedence.
- No canonical pricing file for quoting behavior.

**Risk**
- Inconsistent quotes, margin errors, client trust damage.

**Required fix**
- Create `templates/pricing_source_of_truth.md` as sole active quoting policy.
- Mark legacy pricing blocks as `DEPRECATED — historical context only` where applicable.
- Require outreach/proposal templates to reference this SOT.

---

### 6) Release governance artifact still missing (MEDIUM)
**Evidence**
- Core assets now share v16 labels (improvement), but no release manifest defines approved production bundle and deprecated files.
- `templates/release_manifest.md` does not exist.

**Risk**
- Future drift and accidental use of stale templates.

**Required fix**
- Publish `templates/release_manifest.md` with:
  - approved send-ready files,
  - blocked/deprecated files,
  - enforcement status + last QA date.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v16.md` remains clear, coherent, and conversion-usable.
- `memory/CRITICAL_RULES.md` still enforces strong safety controls (PII/contact handling + targeting rule).
- Core template version parity improved (all major packs now at v16).

---

## Immediate Enforcement Actions
1. **Block high-volume cold sends** from `email_outreach_pack_v16.md` until first-touch send gate is embedded.
2. **Block no-site playbook sends** until pricing/cadence conflicts are removed.
3. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated/archived.
4. **Block scaled SMS execution** from `send_ops_queue_v16.md` until identity/STOP/suppression legal controls are hardcoded.
5. **Freeze discretionary quoting** until pricing SOT exists and legacy pricing references are labeled.
6. **Publish release manifest** to lock approved production bundle.

---

## Pass/Fail Checklist (v17)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates are strictly <100 words
- [ ] **FAIL** — Mandatory specific observation in first touch
- [ ] **FAIL** — Mandatory visual proof link in first touch
- [ ] **FAIL** — Soft CTA-only policy enforced in first touch
- [ ] **FAIL** — Cadence aligned to Day 0 / 3 / 10 / 17
- [ ] **FAIL** — Placeholder-block send gate enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing blocks are explicitly marked deprecated
- [ ] **FAIL** — Send-ready assets reference pricing SOT

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out required in every SMS
- [ ] **FAIL** — Recipient-local legal send windows hard-gated
- [ ] **FAIL** — Suppression logging policy embedded in send ops template

### D) Governance / Drift Prevention
- [ ] **FAIL** — No-site playbook explicitly inherits canonical rules
- [ ] **FAIL** — Legacy outbound files marked deprecated/archived
- [ ] **FAIL** — Release manifest defines approved bundle
- [x] **PASS** — Core template version parity (v16/v16/v16)
- [x] **PASS** — QA reporting/version continuity maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack quality remains strong
- [ ] **FAIL** — All send-ready outreach assets aligned to one canonical standard

**Current score:** **FAIL** (blocking issues remain across A/B/C/D)

---

## Final QA Decision
**v17 Enforcement Result: FAIL — remediation required before high-volume outbound and SMS operations.**
