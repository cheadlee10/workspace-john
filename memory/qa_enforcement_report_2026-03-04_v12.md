# QA Enforcement Report — Sales Assets
**Version:** v12  
**Date:** 2026-03-04  
**Scope:** QA enforcement across latest outreach templates + memory guidance for consistency, compliance, and quality

---

## Executive Verdict
**Overall status: FAIL (still blocked for scaled outbound).**

v12 assets introduced copy refreshes, but core enforcement gaps remain unresolved: canonical cold-email rules are still violated, SMS legal controls are still not hard-gated, and pricing/cadence source-of-truth is still fragmented.

---

## Assets Reviewed (v12 pass)
- `templates/email_outreach_pack_v11.md`
- `templates/send_ops_queue_v11.md`
- `templates/site_demo_pack_v11.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `memory/KNOWLEDGE.md`
- `memory/CRM_playbook.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/qa_enforcement_report_2026-03-04_v11.md` (baseline)
- Canonical reference: `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (via `memory/KNOWLEDGE.md` non-negotiables)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Email outreach pack still violates canonical cold-email standard (HIGH)
**File:** `templates/email_outreach_pack_v11.md`

**Evidence**
- Quick-use rule says first touch should be **80–130 words** (canonical requires **<100 words**).
- Follow-up cadence shown as **Day 2/4/7/10/14** (canonical is **Day 0/3/10 (+17 optional breakup)**).
- No hard requirement that first-touch includes both:
  - one verifiable business-specific observation
  - one visual proof link (`live preview` or screenshot)
- Soft placeholder style (`[First Name]`, `[Company]`, etc.) exists with no explicit `NO SEND if token remains` gate.

**Risk**
- Lower response rates, operator inconsistency, and direct drift from adopted standard.

**Required fix**
- Replace quick-use section with canonical lock:
  1. First touch `<100 words`
  2. Must include `{specific_observation}` + `{visual_link}`
  3. Cadence fixed to `0/3/10 (+17 optional)`
  4. Hard send block if any placeholder remains

---

### 2) Legacy outreach templates still conflict on pricing + cadence + tone (HIGH)
**Files:** `templates/email-variations.md`, `templates/outreach-nosite-template-pack.md`

**Evidence**
- `email-variations.md` includes first-touch pricing (`$0 down`, `$99/mo`) and a hard claim (“76% of homeowners search online”) with no source annotation.
- `outreach-nosite-template-pack.md` uses one-time pricing ($500/$1,000/$2,000) and legacy cadence (`D+1/D+5/D+10`) conflicting with current cold-email standard and subscription model in `memory/KNOWLEDGE.md`.
- Both files remain operationally usable and are not marked deprecated.

**Risk**
- Sales reps can pull conflicting offers and outdated cadence from active templates.

**Required fix**
- Add top banner to both files immediately: `DEPRECATED — DO NOT SEND`.
- Move these to `templates/archive/` after replacement.
- Keep only one send-approved outreach pack and link it from canonical README.

---

### 3) Send ops queue still missing mandatory SMS legal/compliance gates (HIGH)
**File:** `templates/send_ops_queue_v11.md`

**Evidence**
- No mandatory sender identity line in first SMS copy.
- No required opt-out text (`Reply STOP to opt out`) in SMS snippets.
- Send windows are operationally present but not codified as legal hard gate.
- No suppression policy for STOP/no-contact/legal complaint.
- No suppression logging schema.

**Risk**
- TCPA/carrier compliance exposure, filtering risk, and reputational damage.

**Required fix**
- Add immutable “SMS Compliance Block” to queue template:
  - First message includes sender + company identity
  - Every SMS includes opt-out language
  - Recipient-local 8:00 AM–8:00 PM hard gate
  - Immediate suppression workflow (STOP, no-contact, complaint)
  - Required suppression fields: `lead_id`, `channel`, `reason`, `timestamp_local`, `source`

---

### 4) Pricing source-of-truth remains fragmented (HIGH)
**Files:** `memory/KNOWLEDGE.md`, `MEMORY.md`, `memory/active_projects.md`

**Evidence**
- `memory/KNOWLEDGE.md` defines primary website offer as subscription ($99/$199/$299 monthly, 12-month minimum).
- `MEMORY.md` and `memory/active_projects.md` still present legacy one-time/tier tables as active operating guidance.
- `templates/pricing_source_of_truth.md` is still missing.

**Risk**
- Quote inconsistency and avoidable pricing confusion in outbound and closing.

**Required fix**
- Create `templates/pricing_source_of_truth.md` as canonical file.
- Mark legacy tables in `MEMORY.md` and `memory/active_projects.md` as `DEPRECATED — historical context`.
- Add “Pricing source” pointer in all send-approved templates.

---

### 5) Cadence contradiction persists in CRM guidance (MEDIUM)
**File:** `memory/CRM_playbook.md`

**Evidence**
- CRM playbook enforces 6-touch Day `0/2/5/8/12/14` as global cadence.
- Canonical cold-email standard remains Day `0/3/10 (+17 optional)`.

**Risk**
- Teams execute whichever cadence appears first, reducing control and test validity.

**Required fix**
- Add scope split at top of CRM playbook:
  - **Cold email:** `0/3/10 (+17)`
  - **Multi-channel nurture:** `0/2/5/8/12/14`

---

### 6) Governance controls still absent (MEDIUM)
**Evidence**
- Missing: `templates/README_OUTREACH_CANONICAL.md`
- Missing: `templates/outreach_preflight_checklist.md`
- Missing: `templates/pricing_source_of_truth.md`
- No send-allowed vs send-blocked routing map.

**Risk**
- Ongoing template drift and accidental use of noncompliant assets.

**Required fix**
- Publish canonical README + preflight checklist + pricing SOT in one enforcement wave.

---

### 7) Positive quality findings (PASS)
- `templates/site_demo_pack_v11.md` remains high-quality and structurally strong for demo delivery.
- `memory/KNOWLEDGE.md` still documents canonical cold-email non-negotiables clearly.
- QA report version chain remains intact and auditable.

---

## Immediate Enforcement Actions (v12)
1. **Block scaled cold-email sends** from `email_outreach_pack_v11.md` until canonical constraints are hardcoded.
2. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) unless explicitly marked deprecated and archived.
3. **Block scaled SMS queue usage** from `send_ops_queue_v11.md` until legal text + suppression mechanics are embedded.
4. **Freeze discretionary pricing edits** until canonical pricing source file exists.
5. **Require preflight checklist pass** before any outbound batch release.

---

## Pass/Fail Checklist (v12)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly under 100 words
- [ ] **FAIL** — Mandatory specific-observation line in first touch
- [ ] **FAIL** — Mandatory visual/demo link line in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Unresolved-placeholder block-send rule enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing in memory docs marked deprecated
- [ ] **FAIL** — Outbound assets point to canonical pricing source

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out line required in every SMS
- [ ] **FAIL** — Quiet-hours policy explicitly enforced as legal hard gate
- [ ] **FAIL** — Suppression policy + suppression logging requirements enforced

### D) Governance / Drift Prevention
- [ ] **FAIL** — Canonical outreach README exists
- [ ] **FAIL** — Outreach preflight checklist exists and is required
- [ ] **FAIL** — Legacy outbound files marked DEPRECATED or archived
- [x] **PASS** — QA reporting/versioning discipline maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack copy quality and structure
- [ ] **FAIL** — All send-ready outreach assets align to one canonical standard

**Current score:** **FAIL** (blocking issues remain in A/B/C/D)

---

## Fix Pack (ready to apply)

### 1) Canonical governance files (create)
- `templates/README_OUTREACH_CANONICAL.md`
- `templates/outreach_preflight_checklist.md`
- `templates/pricing_source_of_truth.md`

### 2) Email pack patch (v11 → v12 content standard)
- Rewrite all first-touch templates to `<100 words`
- Require `{specific_observation}` + `{visual_link}` fields
- Replace cadence references with `0/3/10 (+17 optional)`
- Add explicit rule: `DO NOT SEND if any placeholder remains`

### 3) Send ops compliance patch
- Add compliant SMS starter line with sender identity
- Add opt-out text to every SMS template
- Add suppression policy and logging schema
- Add legal gate checkboxes before execution section

### 4) Legacy template control
- Apply `DEPRECATED — DO NOT SEND` banner to:
  - `templates/email-variations.md`
  - `templates/outreach-nosite-template-pack.md`
- Move to `templates/archive/` after canonical replacements are active

### 5) Memory guidance alignment
- Update `memory/CRM_playbook.md` with explicit cadence scope split
- Mark legacy pricing sections in `MEMORY.md` and `memory/active_projects.md` as historical/deprecated

---

## Final QA Decision
**v12 Enforcement Result: FAIL (remediation required before any high-volume outbound).**