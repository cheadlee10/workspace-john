# QA Enforcement Report — Sales Assets
**Version:** v39  
**Date:** 2026-03-04  
**Scope:** Latest sales templates + governing memory/docs for consistency, compliance, and quality

## Assets Reviewed
- `templates/email_outreach_pack_v39.md`
- `templates/site_demo_pack_v39.md`
- `templates/send_ops_queue_v39.md`
- `memory/KNOWLEDGE.md`
- `STANDING_ORDERS.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v38.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL** (version sync is good; high-severity policy/compliance conflicts still unresolved).

### Delta vs v38
- ✅ Template bundle version sync remains clean at `v39`.
- ✅ No first-touch pricing language appears in `email_outreach_pack_v39.md` body copy.
- ❌ Cadence contradiction still active across governing docs and templates.
- ❌ Pitch formula still conflicts with no-first-touch-pricing rule.
- ❌ SMS/TCPA safeguards still missing from send-ops template.
- ❌ Site placeholder pre-publish blocker still missing.
- ❌ `MEMORY.md` still contains active-sounding legacy pricing without deprecation banner.

---

## Findings

### 1) Cadence contradiction (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: canonical standard says **Day 0 / Day 3 / Day 10 (+ optional Day 17)**.
- `STANDING_ORDERS.md` Section E: says **Day 1 / Day 5 / Day 10**.
- `templates/email_outreach_pack_v39.md`: suggested cadence is **Day 1 / Day 3 / Day 6 / Day 10 / Day 14 / Day 21**.

**Risk**
- Campaign execution drifts by operator; attribution, QA comparisons, and follow-up discipline break.

**Required fix**
- Publish one canonical cadence block and enforce in all docs/templates.

---

### 2) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: explicitly says **no first-touch pricing**.
- `STANDING_ORDERS.md` Pitch Formula: requires “value prop + one stat + **pricing** + CTA.”

**Risk**
- Copywriters can follow one authority while violating another; creates QA ambiguity.

**Required fix**
- Patch Pitch Formula to remove first-touch pricing requirement.

---

### 3) SMS compliance controls missing (HIGH)
**Evidence**
- `templates/send_ops_queue_v39.md` includes call/SMS cadence but no mandatory: sender identification, opt-out language/process, suppression logging, or complaint/revocation immediate halt.

**Risk**
- Regulatory exposure (TCPA/state rules), list hygiene failures, and reputational risk.

**Required fix**
- Add mandatory SMS compliance block + suppression schema at top of queue template.

---

### 4) Placeholder leakage risk in site demo assets (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v39.md` still includes placeholders (`[XX]`, `[Client Name]`, `[placeholder]`) in proof/testimonial/case-study sections.
- No explicit hard gate saying do not send/publish while placeholders remain.

**Risk**
- Placeholder content can ship client-facing and damage credibility.

**Required fix**
- Add mandatory pre-publish QA blocker checklist.

---

### 5) Pricing source-of-truth drift in memory layer (HIGH)
**Evidence**
- `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md` align on active model: **$0 down + $99/$199/$299 monthly**.
- `MEMORY.md` still contains legacy active-sounding references (e.g., `$250`, `$250 + $10/mo`) without explicit archival/deprecated labeling.

**Risk**
- Quoting inconsistency during outreach and handoff.

**Required fix**
- Insert explicit “Pricing Source of Truth” banner in `MEMORY.md` and label legacy pricing as historical only.

---

### 6) Email pack quality good, enforcement gate absent (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v39.md` has strong breadth and CTA structure.
- Missing hard send gate (plain-text first touch, <=100 words, one verifiable observation, one CTA, no placeholders, cadence compliance).

**Risk**
- Operational drift at send time despite quality templates.

**Required fix**
- Add non-negotiable send gate block at template top.

---

## What Passed
- ✅ Version alignment across latest template set (`email/site/send_ops` all v39).
- ✅ Email templates maintain clear CTA structure and avoid first-touch pricing in body copy.
- ✅ Send-ops queue has practical prioritization and timing discipline.
- ✅ Site demo pack has coherent conversion structure and clear CTA hierarchy.

---

## Fix Pack (Ready-to-Apply Snippets)

### A) Canonical cadence block (single source)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates/queues must match this exactly.
```

### B) STANDING_ORDERS Pitch Formula patch
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — We built you a website"
- Hero: Full-width screenshot of their live demo site
- Body: 4-5 sentences MAX. Value prop + one proof point + CTA.
- Pricing: Do not include in first touch; include only after reply/interest.
- Button: "See Your Website Live →" (links to real URL)
- Sender: john@northstarsynergy.com
```

### C) Email send-gate block
```md
## SEND GATE — NON-NEGOTIABLE
- First-touch body <=100 words
- Plain-text first touch
- Exactly 1 verifiable business-specific observation
- Exactly 1 CTA
- No first-touch pricing
- No unresolved placeholders
- Cadence matches canonical policy
- If any check fails: DO NOT SEND
```

### D) SMS compliance block
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- Identify sender/business in first SMS.
- Include opt-out language where required ("Reply STOP to opt out").
- Respect recipient-local legal contact windows.
- On STOP/revocation/complaint: immediate suppression + halt all outbound.
- Log suppression event before any future attempt.

Suppression log schema:
lead_id, channel, event_type, source, timestamp_local, operator
```

### E) Site pre-publish QA blocker
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace all proof stats/testimonials with verified values, or remove them.
- Replace demo price placeholders with approved values, or hide pricing.
- If any placeholder remains, do not send/publish.
```

### F) MEMORY pricing harmonization note
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If docs conflict, STANDING_ORDERS.md + memory/KNOWLEDGE.md govern.
```

---

## Pass/Fail Checklist (v39)

### Release Integrity
- [x] **PASS** Template versions aligned at v39
- [ ] **FAIL** Explicit release-manifest block not embedded in templates

### Cadence / Policy Consistency
- [ ] **FAIL** One canonical cadence enforced across governing docs/templates
- [ ] **FAIL** Pitch Formula aligned with no-first-touch-pricing policy

### Cold Email Compliance
- [x] **PASS** No first-touch pricing in v39 email body copy
- [ ] **FAIL** Hard send-gate embedded in email pack
- [ ] **FAIL** <=100-word first-touch limit explicitly enforced in template
- [ ] **FAIL** Verifiable business-observation rule explicitly enforced

### SMS/TCPA Controls
- [ ] **FAIL** Sender-ID + opt-out rules embedded in send-ops template
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Complaint/revocation immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** Structure and CTA flow quality
- [ ] **FAIL** Placeholder pre-publish blocker embedded

### Pricing Consistency
- [x] **PASS** `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` align on active pricing model
- [ ] **FAIL** `MEMORY.md` legacy pricing formally marked deprecated

---

## Final QA Decision
**v39 Enforcement Result: FAIL**  
Template quality is improving, but policy/compliance contradictions still block full pass. Apply the six fixes above, then re-run enforcement for v40.
