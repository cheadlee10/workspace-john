# QA Enforcement Report — Sales Assets
**Version:** v21  
**Date:** 2026-03-04  
**Scope:** Current sales/outreach assets + memory guidance consistency, compliance, and quality enforcement.

---

## Executive Verdict
**Overall status: FAIL (blocking policy and compliance gaps remain).**

### Delta vs v20
- ✅ Core template family now version-aligned at `v20` (`email_outreach_pack_v20.md`, `site_demo_pack_v20.md`, `send_ops_queue_v20.md`).
- ❌ Canonical cold-email enforcement still not embedded in first-touch templates.
- ❌ SMS legal/compliance controls still not hardcoded in queue ops.
- ❌ Legacy conflicting outreach assets still active and not deprecated.
- ❌ Pricing governance still lacks single source of truth.
- ❌ Guidance contradiction remains: HTML branded email rule vs canonical plain-text cold email rule.

---

## Assets Reviewed (v21 pass)
- `templates/email_outreach_pack_v20.md`
- `templates/site_demo_pack_v20.md`
- `templates/send_ops_queue_v20.md`
- `templates/email_outreach_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `templates/pricing-decision-tree.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v20.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical cold-email rules still not enforced in send-ready pack (HIGH)
**File:** `templates/email_outreach_pack_v20.md`

**Evidence**
- First-touch templates are mostly >100 words.
- “Keep under 140 words when possible” conflicts with canonical `<100 words` hard requirement.
- No mandatory visual proof link requirement in first touch.
- CTA frequently asks for calls in first touch (higher-friction vs soft-question standard).
- Cadence in file is 7 touches (`Day 1/3/5/8/12/16/21`) vs canonical `Day 0/3/10 (+17 optional breakup)`.

**Risk**
- Lower response quality, drift from proven standard, inconsistent operator behavior.

**Required fix**
- Add hard send gate at top of file and rewrite first-touch set to canonical format.

---

### 2) No-site playbook remains in direct policy conflict (HIGH)
**File:** `playbooks/nosite-outreach-playbook.md`

**Evidence**
- First-touch template includes pricing (`$0 down + $99/mo`) in initial email.
- Follow cadence listed as Day 1 / Day 5 / Day 10.

**Risk**
- Conflicting instructions create noncompliant sends and execution variance.

**Required fix**
- Add canonical inheritance header.
- Remove first-touch pricing from default email.
- Lock cadence to Day 0 / Day 3 / Day 10 (+Day 17 optional breakup).

---

### 3) Legacy conflicting templates still active (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `templates/email_outreach_pack.md` (unversioned legacy)

**Evidence**
- Legacy files contain first-touch pricing, call-heavy CTAs, and non-canonical cadences.
- No deprecation warning in-file.
- Files remain in active `templates/` root.

**Risk**
- Operators can accidentally send from invalid assets.

**Required fix**
- Add `DEPRECATED — DO NOT SEND` banner immediately.
- Move to `templates/archive/` after mapping to approved replacements.

---

### 4) SMS compliance controls are still under-specified (HIGH)
**File:** `templates/send_ops_queue_v20.md`

**Evidence**
- Queue sequencing exists, but no hard legal block requiring sender identification.
- No mandatory opt-out string on every SMS.
- No explicit local-time legal send-window rule.
- No suppression log schema for STOP/revocation/complaint events.

**Risk**
- TCPA/compliance exposure, deliverability degradation, and audit failure risk.

**Required fix**
- Insert immutable SMS compliance block with stop conditions and suppression schema.

---

### 5) Pricing governance remains fragmented (HIGH)
**Files:**
- `memory/KNOWLEDGE.md` (subscription website pricing)
- `MEMORY.md` / `memory/active_projects.md` (legacy one-time and mixed pricing tables)
- `templates/pricing-decision-tree.md` (hourly model for other services)
- Missing: `templates/pricing_source_of_truth.md`

**Evidence**
- Multiple valid-but-conflicting pricing models with no precedence statement.
- Outreach/proposal templates do not reference one quoting authority.

**Risk**
- Quote inconsistency, margin drift, and trust loss.

**Required fix**
- Create `templates/pricing_source_of_truth.md` with precedence hierarchy and effective date.
- Mark legacy pricing blocks as historical/deprecated context.

---

### 6) Memory guidance contradiction: HTML vs plain-text cold email (MEDIUM)
**Files:**
- `memory/KNOWLEDGE.md` (“All client communications must use branded email template HTML”)
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (plain-text cold email non-negotiable)

**Evidence**
- Both are framed as mandatory, but conflict for cold outreach execution.

**Risk**
- Operator uncertainty and mixed-format sends.

**Required fix**
- Clarify policy split:
  - Cold outbound first-touch = plain text only.
  - Branded HTML = proposals, nurtures, post-reply communications.

---

### 7) Governance artifacts still missing (MEDIUM)
**Missing files:**
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`

**Risk**
- No single approved asset bundle; drift persists.

**Required fix**
- Publish release manifest with approved/deprecated lists + QA stamp.

---

### 8) Quality note: site demo pack still contains unresolved placeholders (LOW)
**File:** `templates/site_demo_pack_v20.md`

**Evidence**
- Placeholder tokens remain (`[XX+]`, `[X,XXX+]`, `[Name, Role, Company]`, `[LOGO]`, etc.).

**Risk**
- If pasted directly without replacement, credibility and trust drop.

**Required fix**
- Add “DO NOT PUBLISH WITH PLACEHOLDERS” preflight gate.

---

## Positive Findings (PASS)
- `site_demo_pack_v20.md` structure remains strong and conversion-ready once placeholders are replaced.
- Core template version parity exists at v20.
- Canonical cold-email standard remains clearly documented in playbook.
- `memory/CRITICAL_RULES.md` still provides strong operational guardrails.

---

## Fix Pack (Ready-to-Apply)

### A) Insert into `templates/email_outreach_pack_v20.md`
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

### C) Add deprecation header to legacy files
```md
# DEPRECATED — DO NOT SEND
This template is retained for history only.
Use approved assets listed in `templates/release_manifest.md`.
```

### D) Insert into `templates/send_ops_queue_v20.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender/company.
- Every SMS must include opt-out text: "Reply STOP to opt out."
- Send only within recipient-local legal send window.
- On STOP/complaint/revoke: immediate suppression + log event.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### E) Policy clarification patch for `memory/KNOWLEDGE.md`
```md
### Email Format Policy Split (Effective Immediately)
- Cold outbound first-touch: plain text only.
- Branded HTML template: proposals, follow-up after positive reply, onboarding/client communications.
```

### F) New governance files to create
- `templates/release_manifest.md` (approved vs deprecated assets + effective date + QA stamp)
- `templates/pricing_source_of_truth.md` (pricing precedence + service-specific ranges + quote rules)

---

## Immediate Enforcement Actions
1. Block first-touch cold sends from `email_outreach_pack_v20.md` until send gate and cadence rewrite are complete.
2. Block no-site playbook sends until pricing/cadence conflicts are corrected.
3. Mark legacy templates deprecated today; archive next pass.
4. Restrict scaled SMS until compliance block is embedded in send ops template.
5. Freeze discretionary quoting until pricing SOT is published.
6. Publish release manifest before next outbound cycle.

---

## Pass/Fail Checklist (v21)

### A) Cold Email Structure
- [ ] **FAIL** First-touch templates strictly <100 words
- [ ] **FAIL** Mandatory specific observation enforced
- [ ] **FAIL** Mandatory visual proof URL enforced
- [ ] **FAIL** Soft CTA-only in first touch enforced
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
- [x] **PASS** Core template version parity maintained (v20/v20/v20)
- [x] **PASS** QA lineage continuity maintained (v20 → v21)

### E) Guidance Consistency
- [ ] **FAIL** HTML vs plain-text policy contradiction resolved in memory guidance

### F) Quality Signals
- [x] **PASS** Site demo pack messaging quality remains strong
- [ ] **FAIL** All send-ready outreach assets aligned to canonical cold-email standard

**Current score:** **FAIL** (blocking issues in Cold Email policy enforcement, SMS compliance, pricing governance, and asset governance)

---

## Final QA Decision
**v21 Enforcement Result: FAIL — remediation required before high-volume outbound and scaled SMS execution.**
