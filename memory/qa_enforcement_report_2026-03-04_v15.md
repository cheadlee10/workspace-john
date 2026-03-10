# QA Enforcement Report — Sales Assets
**Version:** v15  
**Date:** 2026-03-04  
**Scope:** QA enforcement across recent templates + memory guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance/governance issues still unresolved).**

v15 introduces a refreshed site demo pack, but core outbound compliance drift remains in active email/SMS assets and memory pricing governance.

---

## Assets Reviewed (this pass)
- `templates/site_demo_pack_v15.md`
- `templates/email_outreach_pack_v14.md`
- `templates/send_ops_queue_v14.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v14.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Active cold-email pack still violates canonical first-touch rules (HIGH)
**File:** `templates/email_outreach_pack_v14.md`

**Evidence**
- First-touch emails are generally above canonical `<100 words`.
- First-touch templates do **not** require both `{specific_observation}` + `{visual_link}`.
- Cadence remains Day 1/3/5/8/12 vs canonical Day 0/3/10 (+17 optional).
- Includes harder first-touch ask patterns (calls/walkthroughs) instead of strict low-friction soft CTA.

**Risk**
- Lower deliverability/reply quality and execution drift from proven standard.

**Required fix**
Add non-optional “Send Gate” at top of file:
1. First touch `<100 words`
2. Must include one specific verifiable observation
3. Must include one visual proof link
4. No first-touch pricing
5. Cadence locked to 0/3/10/17
6. `DO NOT SEND` if placeholders remain

---

### 2) No-site playbook still conflicts with canonical outreach governance (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- First-touch template includes pricing token and explicit `$0 down + $99/mo` in touch #1.
- Follow cadence listed Day 1/5/10.

**Risk**
- Two “authoritative” playbooks in direct conflict.

**Required fix**
- Add inheritance statement: no-site outbound must follow canonical cold-email standard.
- Remove first-touch pricing language from the primary email template.
- Align sequence to Day 0/3/10 (+17 optional breakup).

---

### 3) Legacy conflicting templates remain active/send-usable (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

**Evidence**
- Both include non-canonical pricing/cadence/hard-ask patterns.
- Neither is marked deprecated; still easy for operators to use accidentally.

**Risk**
- Noncompliant copy re-enters production.

**Required fix**
- Add top banner: `DEPRECATED — DO NOT SEND`.
- Move to `templates/archive/` after replacement links are inserted.

---

### 4) SMS queue still lacks mandatory legal controls (HIGH)
**File:** `templates/send_ops_queue_v14.md`

**Evidence**
- No hard requirement that first SMS includes sender/business identity.
- No mandatory opt-out line (`Reply STOP to opt out`).
- Local-time windows exist, but no legal hard gate language.
- No suppression schema/process in template for STOP/revocation/legal complaints.

**Risk**
- TCPA/carrier filtering and suppression-failure exposure.

**Required fix**
Add immutable `SMS Compliance Block`:
- Identity in first SMS.
- Opt-out instruction in every SMS.
- Hard legal send window per recipient local timezone.
- Suppression log fields required: `lead_id`, `channel`, `event_type`, `source`, `timestamp_local`, `operator`.

---

### 5) Pricing source-of-truth still fragmented (HIGH)
**Files:**
- `memory/KNOWLEDGE.md` (subscription model $99/$199/$299)
- `MEMORY.md` and `memory/active_projects.md` (legacy one-time tier tables still presented as active)
- `templates/pricing_source_of_truth.md` (**missing**)

**Risk**
- Quote inconsistency, margin confusion, and credibility loss in sales calls.

**Required fix**
- Create `templates/pricing_source_of_truth.md` (single canonical pricing policy).
- Mark legacy pricing blocks in memory docs as `DEPRECATED — historical context only`.
- Link all send-ready assets to pricing SOT.

---

### 6) Version alignment drift in current release set (MEDIUM)
**Files:** `site_demo_pack_v15.md` vs `email_outreach_pack_v14.md` + `send_ops_queue_v14.md`

**Evidence**
- Site/demo pack advanced to v15; outbound packs remain v14.
- No release manifest stating mixed-version compatibility.

**Risk**
- Operators assume all packs are same enforcement generation when they are not.

**Required fix**
- Add `templates/release_manifest.md` with “current approved bundle” and enforcement state.
- Pin outbound execution to one approved bundle version.

---

### 7) Positive quality findings (PASS)
- `templates/site_demo_pack_v15.md` is clear, structured, and conversion-usable.
- `memory/CRITICAL_RULES.md` remains strong on contact-data protection and target qualification.
- QA version continuity remains intact (v14 → v15).

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v14.md` until canonical send gates are hardcoded.
2. **Block no-site playbook first-touch sends** until pricing/cadence are canon-aligned.
3. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated/archived.
4. **Block scaled SMS sends** from `send_ops_queue_v14.md` until legal/suppression controls are embedded.
5. **Freeze discretionary pricing edits/quotes** until pricing SOT is created and referenced.
6. **Publish release manifest** to prevent mixed-version operational drift.

---

## Pass/Fail Checklist (v15)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly <100 words
- [ ] **FAIL** — Mandatory business-specific observation in first touch
- [ ] **FAIL** — Mandatory visual proof link in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Placeholder-block send gate enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing blocks in memory docs marked deprecated
- [ ] **FAIL** — Send-ready assets reference pricing SOT

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out required in every SMS
- [ ] **FAIL** — Recipient-local legal send window hard-gated
- [ ] **FAIL** — Suppression logging policy embedded in template

### D) Governance / Drift Prevention
- [ ] **FAIL** — No-site playbook explicitly inherits canonical cold-email rules
- [ ] **FAIL** — Legacy outbound files marked deprecated/archived
- [ ] **FAIL** — Release manifest defines approved mixed-version bundle
- [x] **PASS** — QA reporting/version continuity maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack quality remains strong
- [ ] **FAIL** — All send-ready outreach assets aligned to one canonical standard

**Current score:** **FAIL** (blocking issues in A/B/C/D)

---

## Final QA Decision
**v15 Enforcement Result: FAIL — remediation required before high-volume outbound.**