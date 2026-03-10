# QA Enforcement Report — Sales Assets
**Version:** v13  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates + memory guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (high-risk contradictions remain).**

v13 review confirms the same core blockers are still active in current files (now v12 assets):
1) cold-email standards are fragmented across templates/playbooks,  
2) SMS legal safeguards are not hard-gated in execution templates,  
3) pricing/cadence source-of-truth is still inconsistent across memory + outreach assets.

---

## Assets Reviewed (current pass)
- `templates/email_outreach_pack_v12.md`
- `templates/send_ops_queue_v12.md`
- `templates/site_demo_pack_v12.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `memory/CRITICAL_RULES.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/qa_enforcement_report_2026-03-04_v12.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical cold-email standard still violated in active outreach pack (HIGH)
**File:** `templates/email_outreach_pack_v12.md`

**Evidence**
- Encourages CTA to a **10–15 minute call** in first touch, while canonical playbook prefers softer low-friction CTA first.
- Sequence in pack is **Day 1/3/6/9/12** (optional), conflicting with canonical **Day 0/3/10 (+17 optional breakup)**.
- No hard requirement that first touch include both:
  - one verifiable business-specific observation
  - one visual proof link (live preview/screenshot)
- No explicit hard stop for unresolved placeholders before send.

**Risk**
- Performance degradation, inconsistent operator behavior, drift from adopted standard in `memory/KNOWLEDGE.md`.

**Required fix**
- Add immutable “First-touch hard rules” block at top of `email_outreach_pack_v12.md`:
  1. `<100 words`
  2. includes `{specific_observation}` + `{visual_link}`
  3. no pricing in first touch
  4. cadence = `0/3/10 (+17 optional)`
  5. `DO NOT SEND if any placeholder remains`

---

### 2) Direct contradiction between no-site playbook and canonical cold-email rules (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- Includes first-touch pricing (`$0 down + $99/mo`) directly in pitch template.
- Uses different cadence (`Day 1, Day 5, Day 10`) than canonical.
- Uses “We built you a website” framing as default first touch (higher risk if no personalized context + consent-safe sequence).

**Risk**
- Operators choose conflicting standards; QA cannot enforce one repeatable outreach protocol.

**Required fix**
- Add scope note at top: “No-site playbook must inherit canonical cold-email rules for first-touch format and cadence.”
- Move pricing to follow-up touch after engagement.

---

### 3) Legacy templates still live and send-usable despite conflicting guidance (HIGH)
**Files:** `templates/email-variations.md`, `templates/outreach-nosite-template-pack.md`

**Evidence**
- Legacy cadence and pricing logic differ from canonical standards and `memory/KNOWLEDGE.md` non-negotiables.
- Files are not marked deprecated, so they are still operationally selectable.

**Risk**
- Ongoing outbound inconsistency and accidental noncompliant messaging.

**Required fix**
- Add header banner: `DEPRECATED — DO NOT SEND`.
- Move both files to `templates/archive/` after approved replacements are linked.

---

### 4) SMS queue still lacks hard legal/compliance controls (HIGH)
**File:** `templates/send_ops_queue_v12.md`

**Evidence**
- Message snippets do not enforce mandatory sender identity format.
- No mandatory opt-out line (`Reply STOP to opt out`) in SMS templates.
- No explicit recipient-local legal quiet-hour hard gate in checklist language.
- No suppression workflow schema (STOP/no-contact/legal complaint).

**Risk**
- Carrier filtering, TCPA risk, suppression violations, reputation damage.

**Required fix**
- Add immutable “SMS Compliance Block” with:
  - identity line requirement,
  - STOP opt-out requirement,
  - recipient-local send window hard gate,
  - suppression logging fields (`lead_id`, `channel`, `reason`, `timestamp_local`, `source`).

---

### 5) Pricing source-of-truth still fragmented across memory docs (HIGH)
**Files:** `memory/KNOWLEDGE.md`, `MEMORY.md`, `memory/active_projects.md`

**Evidence**
- `memory/KNOWLEDGE.md` defines subscription-first web offer ($99/$199/$299 monthly).
- `MEMORY.md` and `memory/active_projects.md` still present legacy one-time/tier pricing as active guidance.

**Risk**
- Quote inconsistency and trust loss during sales conversations.

**Required fix**
- Create `templates/pricing_source_of_truth.md` and link from all send-ready assets.
- Mark legacy pricing tables in memory docs as `DEPRECATED — historical context only`.

---

### 6) Positive quality findings (PASS)
- `templates/site_demo_pack_v12.md` is strong, structured, and usable for proof-driven delivery.
- `memory/CRITICAL_RULES.md` clearly enforces key no-website + personal-data constraints.
- QA versioning discipline remains intact (`v10`→`v13` chain).

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v12.md` until canonical first-touch/cadence constraints are hardcoded.
2. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated/archived.
3. **Block scaled SMS sends** from `send_ops_queue_v12.md` until legal hard gates + suppression logic are embedded.
4. **Freeze discretionary pricing edits/quotes** until a single pricing SOT file is published and linked.
5. **Require preflight checklist pass** before any outbound batch release.

---

## Pass/Fail Checklist (v13)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly under 100 words
- [ ] **FAIL** — Mandatory specific-observation line in first touch
- [ ] **FAIL** — Mandatory visual/demo link line in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Unresolved-placeholder block-send rule enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing in memory docs marked deprecated
- [ ] **FAIL** — Send-ready assets point to canonical pricing source

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out line required in every SMS
- [ ] **FAIL** — Recipient-local legal send window hard-gated
- [ ] **FAIL** — Suppression policy + suppression logging required in template

### D) Governance / Drift Prevention
- [ ] **FAIL** — Canonical outreach README exists and maps send-approved assets
- [ ] **FAIL** — Outreach preflight checklist exists and is mandatory
- [ ] **FAIL** — Legacy outbound files marked deprecated/archived
- [x] **PASS** — QA reporting/versioning chain maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack quality remains high
- [ ] **FAIL** — All send-ready outreach assets align to one canonical standard

**Current score:** **FAIL** (blocking issues in A/B/C/D)

---

## Final QA Decision
**v13 Enforcement Result: FAIL — remediation required before high-volume outbound.**
