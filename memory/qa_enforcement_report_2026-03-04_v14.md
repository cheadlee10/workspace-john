# QA Enforcement Report — Sales Assets
**Version:** v14  
**Date:** 2026-03-04  
**Scope:** QA enforcement on latest sales assets and memory guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance + governance issues remain).**

Compared to v13, core drift problems are still unresolved in current v13 templates/guidance:
1. cold-email standards are still split across canonical playbook vs active template packs,
2. SMS queue still lacks legal hard gates,
3. pricing source-of-truth is still fragmented across memory files,
4. legacy conflicting templates remain active (not deprecated/archived).

---

## Assets Reviewed (this pass)
- `templates/email_outreach_pack_v13.md`
- `templates/send_ops_queue_v13.md`
- `templates/site_demo_pack_v13.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v13.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Active outreach pack still conflicts with canonical cold-email standard (HIGH)
**File:** `templates/email_outreach_pack_v13.md`

**Evidence**
- First-touch templates regularly exceed canonical “<100 words” guidance.
- Pack encourages broad 5-follow-up cadence every 2–4 business days, not canonical Day 0/3/10 (+17 optional).
- First-touch templates do not hard-require both:
  - one verifiable business-specific observation,
  - one visual proof link (live preview/screenshot).
- Includes stronger call asks in first touch (“quick call”, “working session”) vs canonical low-friction soft CTA standard.

**Risk**
- Lower reply quality, outreach inconsistency, and operator drift from proven playbook.

**Fix required (template-level hard gates)**
Add a non-optional header block in `email_outreach_pack_v13.md`:
1. First touch must be `<100 words`.
2. Must include `{specific_observation}` + `{visual_link}`.
3. No pricing in first touch.
4. Cadence locked to `Day 0 / Day 3 / Day 10 / Day 17 optional`.
5. `DO NOT SEND` if any placeholder remains.

---

### 2) No-site playbook still contradicts canonical first-touch rules (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- First-touch template includes pricing token (`{{PRICING}}`, with `$0 down + $99/mo` example).
- Follow cadence still shown as Day 1/5/10 instead of canonical 0/3/10/17.

**Risk**
- Conflicting execution standards inside two “authoritative” playbooks.

**Fix required**
- Add inheritance statement at top: “No-site outreach must follow canonical cold-email first-touch and cadence rules.”
- Remove pricing from first touch and shift pricing to engaged follow-up.
- Align cadence language to canonical standard.

---

### 3) Legacy conflicting templates still send-usable (HIGH)
**Files:** `templates/email-variations.md`, `templates/outreach-nosite-template-pack.md`

**Evidence**
- Both contain first-touch pricing and/or non-canonical cadence/call asks.
- Neither file is marked `DEPRECATED`.

**Risk**
- Reintroduction of noncompliant outreach by operators selecting old files.

**Fix required**
- Add top banner on both files: `DEPRECATED — DO NOT SEND`.
- Move to `templates/archive/` after replacements are linked.

---

### 4) SMS queue lacks mandatory legal controls (HIGH)
**File:** `templates/send_ops_queue_v13.md`

**Evidence**
- SMS snippets do not enforce sender identity format in first message.
- No mandatory opt-out line (e.g., `Reply STOP to opt out`).
- Quiet-hour/legal send-window gate is implied by best-time windows, but not hard-enforced as a compliance block.
- No explicit suppression workflow fields for STOP/revocation/legal complaint events.

**Risk**
- TCPA/carrier-filter exposure and suppression process failures.

**Fix required**
Add immutable `SMS Compliance Block`:
- First outbound SMS must include business identity.
- Every SMS template includes opt-out instruction.
- Hard send-window guard by recipient local time.
- Suppression logging schema required: `lead_id`, `channel`, `event_type`, `source`, `timestamp_local`, `operator`.

---

### 5) Pricing source-of-truth still fragmented (HIGH)
**Files:** `memory/KNOWLEDGE.md`, `MEMORY.md`, `memory/active_projects.md`

**Evidence**
- `memory/KNOWLEDGE.md` positions subscription website pricing (`$99/$199/$299`).
- `MEMORY.md` and `memory/active_projects.md` still include active-looking one-time/tier tables for web/dev services.
- `templates/pricing_source_of_truth.md` still does not exist.

**Risk**
- Quote inconsistency and credibility loss during live sales conversations.

**Fix required**
- Create `templates/pricing_source_of_truth.md`.
- In memory docs, label legacy pricing blocks as `DEPRECATED — historical context only`.
- Link all send-ready assets back to the pricing SOT.

---

### 6) Positive quality findings (PASS)
- `templates/site_demo_pack_v13.md` remains high-quality, structured, and usable for proof-led selling.
- `memory/CRITICAL_RULES.md` remains clear on data/contact protection.
- QA version chain continuity is intact (v10→v14 progression).

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v13.md` until canonical hard gates are embedded.
2. **Block no-site playbook first-touch sends** until first-touch pricing is removed and cadence aligned.
3. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated/archived.
4. **Block scaled SMS sends** from `send_ops_queue_v13.md` until legal/suppression controls are hardcoded.
5. **Freeze discretionary pricing edits/quotes** until pricing SOT file is published and linked.

---

## Pass/Fail Checklist (v14)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates are strictly <100 words
- [ ] **FAIL** — Mandatory specific-observation line in first touch
- [ ] **FAIL** — Mandatory visual proof link in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Placeholder-block send gate enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing in memory docs marked deprecated
- [ ] **FAIL** — Send-ready assets reference canonical pricing source

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out required in every SMS template
- [ ] **FAIL** — Recipient-local legal send window hard-gated
- [ ] **FAIL** — Suppression logging policy embedded in template

### D) Governance / Drift Prevention
- [ ] **FAIL** — No-site playbook explicitly inherits canonical cold-email rules
- [ ] **FAIL** — Legacy outbound files marked deprecated/archived
- [x] **PASS** — QA reporting/versioning continuity maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack quality remains strong
- [ ] **FAIL** — All send-ready outreach assets aligned to one canonical standard

**Current score:** **FAIL** (blocking issues in A/B/C/D)

---

## Final QA Decision
**v14 Enforcement Result: FAIL — remediation required before high-volume outbound.**
