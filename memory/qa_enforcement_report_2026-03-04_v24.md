# QA Enforcement Report — Sales Assets
**Version:** v24  
**Date:** 2026-03-04  
**Scope:** Current sales templates + memory guidance consistency, compliance, and quality enforcement.

---

## Executive Verdict
**Overall status: FAIL (material compliance/governance contradictions still active).**

### Delta vs v23
- ✅ **Version parity fixed**: `templates/send_ops_queue_v23.md` now exists.
- ✅ Queue messaging remains short, problem-first, no first-touch pricing.
- ❌ Cold-email canonical rules still not fully enforced inside send-ready template packs.
- ❌ SMS compliance language still missing in active queue/templates.
- ❌ Legacy outbound templates remain active without deprecation banners.
- ❌ Pricing + format governance still fragmented across `MEMORY.md`, `memory/KNOWLEDGE.md`, and playbooks.

---

## Assets Reviewed (v24 pass)
- `templates/email_outreach_pack_v23.md`
- `templates/site_demo_pack_v23.md`
- `templates/send_ops_queue_v23.md`
- `templates/email_outreach_pack.md` (legacy)
- `templates/email-variations.md` (legacy)
- `templates/outreach-nosite-template-pack.md` (legacy)
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `playbooks/nosite-outreach-playbook.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v23.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Canonical cold-email standard still not hard-gated in active outreach pack (HIGH)
**Files:** `templates/email_outreach_pack_v23.md` vs canonical playbook

**Evidence**
- v23 pack cadence states `Day 2 / 4 / 7 / 10 / 14`.
- Canonical playbook requires `Day 0 / 3 / 10` (+ optional breakup day 17).
- v23 pack does not enforce mandatory visual-proof URL for web-design/no-site outreach context.
- v23 includes harder CTAs (calendar/time selection) in first touch variants.

**Risk**
- Reply quality and deliverability drift from proven canonical framework.

**Required fix**
- Add immutable send-gate block to v23 pack.
- Replace cadence with canonical cadence.
- Restrict first-touch CTA to one soft question.

---

### 2) SMS legal/compliance controls still missing in active send queue (HIGH)
**File:** `templates/send_ops_queue_v23.md`

**Evidence**
- No mandatory sender-identification standard for first SMS.
- No required opt-out language (e.g., “Reply STOP to opt out.”).
- No explicit recipient-local legal send-window guardrail text.
- No suppression protocol/schema in queue instructions.

**Risk**
- TCPA/compliance exposure + number reputation degradation.

**Required fix**
- Insert mandatory SMS compliance block and suppression logging process.

---

### 3) Legacy templates still sendable and contradictory (HIGH)
**Files:**
- `templates/email_outreach_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/nosite-outreach-playbook.md`

**Evidence**
- Legacy packs contain first-touch pricing, hard CTA patterns, and non-canonical cadence.
- No `DEPRECATED — DO NOT SEND` headers.

**Risk**
- Operators may accidentally deploy noncompliant copy at scale.

**Required fix**
- Add deprecation headers immediately.
- Move superseded assets to `templates/archive/` after replacement map is published.

---

### 4) Pricing governance remains fragmented (HIGH)
**Files:** `MEMORY.md`, `memory/KNOWLEDGE.md`, template ecosystem

**Evidence**
- `MEMORY.md` still includes one-time “Good/Better/Best” pricing table.
- `memory/KNOWLEDGE.md` positions website subscription as primary ($0 down + monthly).
- Active templates currently mix automation-service positioning and website-subscription references across files.
- `templates/pricing_source_of_truth.md` missing.

**Risk**
- Inconsistent quoting and offer framing by channel/session.

**Required fix**
- Create pricing SOT with precedence and channel-stage eligibility.

---

### 5) Email format policy contradiction still open (MEDIUM)
**Files:** `memory/KNOWLEDGE.md` vs canonical playbook

**Evidence**
- `KNOWLEDGE.md` says all client communications must use branded email template.
- Canonical cold-email playbook mandates plain text for first-touch cold outreach.

**Risk**
- Deliverability regression and inconsistent outbound format.

**Required fix**
- Add explicit policy split: plain text for cold first touch; branded template only post-reply/proposal/onboarding/client comms.

---

### 6) Governance scaffolding still missing (MEDIUM)
**Missing files (verified):**
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`
- `memory/qa_report_schema.md`

**Risk**
- No single approved bundle, repeated drift every version cycle.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v23.md` remains coherent, high-quality, and conversion-oriented.
- `templates/send_ops_queue_v23.md` now aligns version with other v23 core assets.
- `templates/email_outreach_pack_v23.md` avoids explicit first-touch pricing in core cold templates.
- QA report lineage is stable and auditable (v22 → v23 → v24).

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v23.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No send if placeholders remain
- Cadence lock: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
- For website/no-site outreach: include 1 visual proof URL
```

### B) Replace cadence section in `templates/email_outreach_pack_v23.md`
```md
## Recommended Sending Cadence (Canonical)
- Day 0: Cold email
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
```

### C) Insert near top of `templates/send_ops_queue_v23.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender + company.
- Every SMS must include: "Reply STOP to opt out."
- Send only within recipient-local legal send windows.
- On STOP/complaint/revoke: immediate suppression and no further contact.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### D) Add header to each legacy outbound template
```md
# DEPRECATED — DO NOT SEND
This asset is retained for historical reference only.
Use approved files listed in `templates/release_manifest.md`.
```

### E) Add to `memory/KNOWLEDGE.md`
```md
### Email Format Policy Split (Effective Immediately)
- Cold outbound first-touch: plain text only.
- Branded HTML template: post-reply follow-up, proposal, onboarding, and active client communications.
```

### F) Create missing governance files
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`
- `memory/qa_report_schema.md`

---

## Pass/Fail Checklist (v24)

### A) Cold Email Standardization
- [ ] **FAIL** First-touch hard-gated to <100 words + single observation + single soft CTA
- [ ] **FAIL** Canonical cadence (0/3/10 + optional 17) enforced in active outreach pack
- [ ] **FAIL** Visual-proof requirement explicitly enforced where applicable
- [ ] **FAIL** Placeholder send-block gate embedded

### B) Version & Release Governance
- [x] **PASS** Core bundle version parity (email/site/send-ops all v23)
- [ ] **FAIL** `templates/release_manifest.md` exists and defines approved set

### C) Pricing Governance
- [ ] **FAIL** `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** Active templates reference one pricing precedence model
- [ ] **FAIL** Legacy conflicting pricing guidance is deprecated/labeled

### D) SMS / Legal Compliance
- [ ] **FAIL** First SMS sender identity standard embedded
- [ ] **FAIL** STOP opt-out line required on every SMS
- [ ] **FAIL** Recipient-local legal send windows hard-gated
- [ ] **FAIL** Suppression protocol/schema embedded in send ops

### E) Guidance Consistency
- [ ] **FAIL** Plain-text vs branded-email policy contradiction resolved
- [ ] **FAIL** No-site playbook aligned to canonical no-pricing + cadence rules

### F) Quality Signals
- [x] **PASS** Site demo pack quality/conversion coherence remains strong
- [x] **PASS** v23 outreach pack avoids explicit first-touch pricing in core cold emails
- [ ] **FAIL** Entire send-ready stack aligned to one canonical compliance standard

**Current score:** **FAIL** (blocking issues: cold-email enforcement, SMS compliance, governance artifacts, pricing/format consistency)

---

## Final QA Decision
**v24 Enforcement Result: FAIL — remediation required before scaled outbound and any SMS volume expansion.**
