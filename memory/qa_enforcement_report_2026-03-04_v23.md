# QA Enforcement Report — Sales Assets
**Version:** v23  
**Date:** 2026-03-04  
**Scope:** Latest sales templates + memory/playbook guidance consistency, compliance, and quality.

---

## Executive Verdict
**Overall status: FAIL (blocking alignment/compliance issues remain).**

### Delta vs v22
- ✅ New template versions now exist for **email + site** (`email_outreach_pack_v23.md`, `site_demo_pack_v23.md`).
- ❌ Version parity is broken: no `send_ops_queue_v23.md` (latest is v22).
- ❌ Cold-email pack v23 still conflicts with canonical outreach standard (cadence mismatch, no visual-proof requirement, hard CTA variants).
- ❌ SMS queue still missing explicit legal compliance block (sender ID + STOP language + suppression protocol).
- ❌ Legacy outbound templates are still active without deprecation banners.
- ❌ Pricing governance and format governance remain fragmented across MEMORY/KNOWLEDGE/playbooks/templates.

---

## Assets Reviewed (v23 pass)
- `templates/email_outreach_pack_v23.md`
- `templates/site_demo_pack_v23.md`
- `templates/send_ops_queue_v22.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `templates/email_outreach_pack.md` (legacy)
- `templates/email-variations.md` (legacy)
- `templates/outreach-nosite-template-pack.md` (legacy)
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v22.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical cold-email rules still not enforced in latest send-ready outreach pack (HIGH)
**File:** `templates/email_outreach_pack_v23.md`

**Evidence**
- Suggested cadence is `Day 2 / 4 / 7 / 10 / 14`, conflicting with canonical `Day 0 / 3 / 10 (+17 optional breakup)`.
- No explicit mandatory visual-proof URL rule in first touch.
- Several templates include harder commitment asks (calendar/time selection), not strictly soft-question-only.

**Risk**
- Execution drift from proven playbook; reduced deliverability and reply quality.

**Required fix**
- Add canonical send-gate block at top of v23 pack.
- Replace cadence section with canonical cadence.
- Restrict first touch CTA style to single soft question.

---

### 2) Template version parity broken (MEDIUM)
**Files:** `email_outreach_pack_v23.md`, `site_demo_pack_v23.md`, `send_ops_queue_v22.md`

**Evidence**
- Email/site packs are v23; send-ops queue remains v22.

**Risk**
- Operators may mix incompatible guidance in the same execution cycle.

**Required fix**
- Publish `templates/send_ops_queue_v23.md` with synchronized metadata and policy block references.

---

### 3) SMS compliance controls still missing in active send-ops queue (HIGH)
**File:** `templates/send_ops_queue_v22.md`

**Evidence**
- No mandatory sender identification language standard.
- No required “Reply STOP to opt out.” line on SMS templates.
- No explicit recipient-local legal send window gate text.
- No suppression log schema/process for STOP/revocation/complaints.

**Risk**
- TCPA/legal exposure + reputational and deliverability risk.

**Required fix**
- Insert immutable compliance section with required message footer and suppression workflow.

---

### 4) Legacy outbound templates remain sendable and contradictory (HIGH)
**Files:**
- `templates/email_outreach_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/nosite-outreach-playbook.md`

**Evidence**
- Include first-touch pricing in some templates.
- Use non-canonical cadence patterns.
- No `DEPRECATED — DO NOT SEND` headers.

**Risk**
- Accidental deployment of noncompliant outreach copy.

**Required fix**
- Add deprecation banners immediately and move legacy assets to `templates/archive/` after replacement map is finalized.

---

### 5) Positioning and pricing governance still fragmented (HIGH)
**Files:** `memory/KNOWLEDGE.md`, `MEMORY.md`, no pricing SOT file

**Evidence**
- `KNOWLEDGE.md` emphasizes website subscription model ($0 down + monthly tiers) and branded-email requirement.
- Current v23 outreach pack is automation-service focused and does not anchor pricing governance or offer eligibility rules.
- `MEMORY.md` still contains legacy one-time tier tables mixed with newer subscription narrative.
- `templates/pricing_source_of_truth.md` does not exist.

**Risk**
- Inconsistent quoting and offer positioning by operator/session.

**Required fix**
- Create `templates/pricing_source_of_truth.md` with precedence, allowed offers by channel/stage, and effective date.

---

### 6) Email format policy contradiction remains unresolved (MEDIUM)
**Files:** `memory/KNOWLEDGE.md` vs canonical cold-email playbook

**Evidence**
- `KNOWLEDGE.md`: “All client communications must use branded email template.”
- Canonical cold-email playbook: first-touch cold email should be plain text.

**Risk**
- Mixed-format outbound; deliverability regression.

**Required fix**
- Explicit policy split: cold first-touch = plain text; branded HTML only after engagement/proposals/onboarding.

---

### 7) Governance scaffolding still missing (MEDIUM)
**Missing files:**
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`
- `memory/qa_report_schema.md`

**Risk**
- No single approved bundle; recurring policy drift.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v23.md` quality is strong, coherent, and conversion-oriented.
- `templates/email_outreach_pack_v23.md` removed explicit first-touch pricing from core cold email body templates.
- Prior QA cadence has produced consistent report lineage (v22 → v23), improving audit continuity.

---

## Fix Pack (Copy/Paste Ready)

### A) Insert at top of `templates/email_outreach_pack_v23.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body must be <100 words (excluding signature)
- Include exactly 1 verifiable business-specific observation
- Include exactly 1 visual proof URL when outreach is website/design related
- Soft CTA only (single question)
- No pricing in first touch
- Do not send if placeholders remain
- Cadence locked: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
```

### B) Replace cadence section in `templates/email_outreach_pack_v23.md`
```md
## Recommended Sending Cadence (Canonical)
- Day 0: Cold email
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
```

### C) Insert into `templates/send_ops_queue_v23.md` (new file)
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender/company.
- Every SMS must include: "Reply STOP to opt out."
- Send only within recipient-local legal send window.
- On STOP/complaint/revoke: immediate suppression + log event.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### D) Add to each legacy template header
```md
# DEPRECATED — DO NOT SEND
This template is retained for historical reference only.
Use approved assets listed in `templates/release_manifest.md`.
```

### E) Add to `memory/KNOWLEDGE.md`
```md
### Email Format Policy Split (Effective Immediately)
- Cold outbound first-touch: plain text only.
- Branded HTML template: post-reply follow-up, proposals, onboarding, and active-client communications.
```

### F) New governance files to create
- `templates/release_manifest.md` — approved/deprecated assets, effective date, QA approver.
- `templates/pricing_source_of_truth.md` — pricing precedence + quoting rules by channel/stage.
- `memory/qa_report_schema.md` — required QA fields (version, reviewed files, evidence, checklist score).

---

## Immediate Enforcement Actions
1. Block scaled cold sends from non-canonical templates until send-gate + cadence lock are embedded.
2. Publish `send_ops_queue_v23.md` before next batch run; block SMS scale sends without compliance section.
3. Mark legacy outreach templates deprecated today; archive next pass.
4. Freeze discretionary quoting until pricing SOT file is published and referenced.
5. Resolve plain-text vs branded-email policy conflict in `KNOWLEDGE.md` immediately.

---

## Pass/Fail Checklist (v23)

### A) Cold Email Structure
- [ ] **FAIL** First-touch templates strictly <100 words
- [ ] **FAIL** Mandatory specific observation enforced
- [ ] **FAIL** Visual-proof rule explicitly enforced where required
- [ ] **FAIL** Soft CTA-only first touch enforced
- [ ] **FAIL** Cadence aligned to Day 0 / 3 / 10 / (17 optional)
- [ ] **FAIL** Placeholder send-block gate enforced

### B) Version Governance
- [ ] **FAIL** Core template version parity maintained (email/site/send-ops all v23)
- [ ] **FAIL** Release manifest exists and names approved send-ready set

### C) Pricing Consistency
- [ ] **FAIL** `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** Send-ready assets reference pricing SOT
- [ ] **FAIL** Legacy pricing references are deprecated/labeled historical

### D) SMS / Legal Compliance
- [ ] **FAIL** Sender identity standardized in first SMS
- [ ] **FAIL** STOP opt-out required in every SMS
- [ ] **FAIL** Recipient-local legal send windows hard-gated
- [ ] **FAIL** Suppression logging schema embedded in send ops template

### E) Guidance Consistency
- [ ] **FAIL** HTML vs plain-text policy contradiction resolved
- [ ] **FAIL** No-site playbook fully inherits canonical cadence and no-pricing-first-touch rule

### F) Quality Signals
- [x] **PASS** Site demo pack messaging quality remains strong (v23)
- [x] **PASS** Core outreach pack avoids explicit first-touch pricing in primary cold templates
- [ ] **FAIL** Entire send-ready stack aligned to one canonical standard

**Current score:** **FAIL** (blocking issues remain in cold-email enforcement, SMS compliance, version governance, and pricing governance)

---

## Final QA Decision
**v23 Enforcement Result: FAIL — remediation required before high-volume outbound and scaled SMS operations.**
