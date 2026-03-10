# QA Enforcement Report — Sales Assets
**Version:** v16  
**Date:** 2026-03-04  
**Scope:** QA enforcement across latest outreach templates + memory guidance for consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance + standards drift still present).**

v16 improves site/demo packaging quality, but outbound email/SMS governance remains non-canonical and legally under-specified.

---

## Assets Reviewed (this pass)
- `templates/email_outreach_pack_v16.md`
- `templates/site_demo_pack_v16.md`
- `templates/send_ops_queue_v15.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v15.md` (baseline)

---

## Findings (Gaps / Contradictions / Compliance)

### 1) v16 email pack still conflicts with canonical first-touch standard (HIGH)
**File:** `templates/email_outreach_pack_v16.md`

**Evidence**
- Guidance says “under 140 words” (canonical requires `<100` on first touch).
- First-touch templates do not require both **specific verifiable observation** and **visual proof link**.
- Multiple first-touch CTAs are high-friction (“15-minute call this week”) vs canonical soft CTA preference.
- No hard “do not send if placeholders remain” gate.

**Risk**
- Lower cold reply rate, operator inconsistency, and drift from the adopted playbook.

**Required fix**
Add a mandatory **First-Touch Send Gate** at top of file:
1. `<100 words`
2. One specific verifiable observation
3. One visual link (demo/screenshot/live preview)
4. Soft CTA only (ask permission to send breakdown/walkthrough)
5. No placeholders allowed; `DO NOT SEND` if any token remains
6. Cadence lock: Day 0 / 3 / 10 (+17 optional breakup)

---

### 2) No-site playbook remains in direct conflict with canonical outreach policy (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- Includes first-touch pricing in the core template (`$0 down, $99/mo`).
- Cadence listed as Day 1 / 5 / 10 (not Day 0 / 3 / 10).

**Risk**
- Two “source-of-truth” playbooks give contradictory operator instructions.

**Required fix**
- Add explicit inheritance header: no-site outreach follows canonical cold-email rules.
- Remove first-touch price mention from primary outbound touch.
- Align cadence to Day 0 / 3 / 10 (+17 optional breakup).

---

### 3) Legacy send-usable templates still un-deprecated (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

**Evidence**
- Both contain first-touch pricing and/or hard-ask patterns contrary to canonical rules.
- Neither file has a deprecation banner; both remain operationally easy to use.

**Risk**
- Reintroduction of noncompliant messaging into live sends.

**Required fix**
- Add top-line banner: `DEPRECATED — DO NOT SEND`.
- Move to `templates/archive/` after replacement links are added.

---

### 4) SMS/send-ops queue still lacks mandatory legal controls (HIGH)
**File:** `templates/send_ops_queue_v15.md`

**Evidence**
- No mandatory first-SMS sender/business identity standard.
- No mandatory opt-out line (`Reply STOP to opt out`).
- No suppression handling schema (STOP/revocation/legal complaint events).
- Local-time windows exist but are operational guidance, not explicit legal hard gates.

**Risk**
- TCPA/carrier filtering and suppression handling failures.

**Required fix**
Embed immutable **SMS Compliance Block**:
- Identity required in first SMS thread message
- Opt-out language in every SMS
- Hard recipient-local send windows (legal gate)
- Required suppression fields: `lead_id`, `channel`, `event_type`, `source`, `timestamp_local`, `operator`

---

### 5) Pricing source-of-truth remains fragmented across memory + templates (HIGH)
**Files:**
- `memory/KNOWLEDGE.md` (subscription pricing model)
- `MEMORY.md` + `memory/active_projects.md` (legacy one-time/tier tables still appear active)
- `templates/pricing_source_of_truth.md` (**missing**)

**Evidence**
- Active docs present conflicting models: subscription ($99/$199/$299) vs one-time service matrix ($500/$1000/$2000 and other legacy tiers).
- No canonical pricing file to reconcile quoting behavior.

**Risk**
- Inconsistent quotes, margin confusion, and client trust damage.

**Required fix**
- Create `templates/pricing_source_of_truth.md` as single approved pricing policy.
- Mark legacy pricing blocks as `DEPRECATED — historical context only`.
- Require outbound/proposal templates to reference pricing SOT.

---

### 6) Release governance still missing (MEDIUM)
**Evidence**
- `site_demo_pack` advanced to v16 while `send_ops_queue` is v15.
- No `templates/release_manifest.md` exists to define approved mixed-version bundle.

**Risk**
- Operators assume version parity and send from unaligned assets.

**Required fix**
- Publish `templates/release_manifest.md` with approved production bundle and enforcement status.

---

### 7) Positive quality findings (PASS)
- `templates/site_demo_pack_v16.md` is clear, coherent, and conversion-usable.
- `memory/CRITICAL_RULES.md` remains strong on personal-info protection and targeting controls.
- QA continuity remains intact (v15 → v16).

---

## Immediate Enforcement Actions
1. **Block scaled cold-email sends** from `email_outreach_pack_v16.md` until canonical first-touch gate is embedded.
2. **Block no-site playbook first-touch sends** until first-touch pricing/cadence conflicts are removed.
3. **Block legacy template usage** (`email-variations.md`, `outreach-nosite-template-pack.md`) until deprecated + archived.
4. **Block scaled SMS sends** from `send_ops_queue_v15.md` until identity/STOP/suppression gates are hardcoded.
5. **Freeze discretionary quoting** until pricing SOT exists and legacy memory pricing is labeled deprecated.
6. **Publish release manifest** to prevent mixed-version operational drift.

---

## Pass/Fail Checklist (v16)

### A) Cold Email Structure
- [ ] **FAIL** — First-touch templates strictly <100 words
- [ ] **FAIL** — Mandatory specific observation in first touch
- [ ] **FAIL** — Mandatory visual proof link in first touch
- [ ] **FAIL** — Soft CTA-only policy enforced in first touch
- [ ] **FAIL** — Cadence aligned to Day 0/3/10/17
- [ ] **FAIL** — Placeholder-block send gate enforced

### B) Pricing Consistency
- [ ] **FAIL** — `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** — Legacy pricing blocks marked deprecated in memory docs
- [ ] **FAIL** — Send-ready assets reference pricing SOT

### C) SMS / Legal Compliance
- [ ] **FAIL** — Sender identity standardized in first SMS
- [ ] **FAIL** — STOP opt-out required in every SMS
- [ ] **FAIL** — Recipient-local legal send window hard-gated
- [ ] **FAIL** — Suppression logging policy embedded in send ops template

### D) Governance / Drift Prevention
- [ ] **FAIL** — No-site playbook explicitly inherits canonical cold-email rules
- [ ] **FAIL** — Legacy outbound files marked deprecated/archived
- [ ] **FAIL** — Release manifest defines approved mixed-version bundle
- [x] **PASS** — QA reporting/version continuity maintained

### E) Quality Signals
- [x] **PASS** — Site demo pack quality remains strong
- [ ] **FAIL** — All send-ready outreach assets aligned to one canonical standard

**Current score:** **FAIL** (blocking issues across A/B/C/D)

---

## Final QA Decision
**v16 Enforcement Result: FAIL — remediate before high-volume outbound/send ops.**