# QA Enforcement Report — Sales Assets
**Version:** v38  
**Date:** 2026-03-04  
**Scope:** QA enforcement across latest sales templates + memory guidance for consistency, compliance, and quality

## Assets Reviewed
- `templates/email_outreach_pack_v37.md`
- `templates/site_demo_pack_v37.md`
- `templates/send_ops_queue_v37.md`
- `memory/qa_enforcement_report_2026-03-04_v37.md` (baseline)
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`

---

## Executive Verdict
**Overall status: FAIL** (release sync improved, but unresolved high-severity policy/compliance contradictions remain).

### Delta vs v37
- ✅ **Version sync fixed:** email/site/send-ops are all now on `v37`.
- ✅ **Release-integrity partial recovery:** mixed-version drift from prior cycle removed.
- ❌ **Cadence conflict still unresolved** across authority docs/templates.
- ❌ **First-touch policy conflict still unresolved** (pricing in pitch formula vs no-pricing rule).
- ❌ **SMS compliance block still missing** in send-ops queue template.
- ❌ **Placeholder publish blocker still missing** in site demo pack.
- ❌ **Legacy pricing language still active in `MEMORY.md`** and conflicts with current pricing source of truth.

---

## Findings

### 1) Outreach cadence contradiction (HIGH)
**Evidence**
- `STANDING_ORDERS.md` (Section E): Follow-up = **Day 1 / Day 5 / Day 10**.
- `memory/KNOWLEDGE.md`: Cold email standard = **Day 0 / Day 3 / Day 10 (+ optional Day 17)**.
- `templates/email_outreach_pack_v37.md`: A/B suggestion = **Day 2 / Day 5 / Day 9 / Day 14 / Day 21**.

**Risk**
- Operators run different cadences in the same campaign; performance attribution and QA comparability break.

**Required fix**
- Publish one canonical cadence block and embed it in both authority docs and template headers.

---

### 2) First-touch pricing rule conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` Pitch Formula: body includes “value prop + one stat + **pricing** + CTA.”

**Risk**
- Direct contradiction between governance and execution instructions; copywriters can be “compliant” with one doc while violating another.

**Required fix**
- Amend `STANDING_ORDERS.md` pitch formula to: value prop + one proof point + CTA (pricing only after interest).

---

### 3) SMS/TCPA operational safeguards missing (HIGH)
**Evidence**
- `templates/send_ops_queue_v37.md` defines call/SMS fallback timing but has no explicit mandatory rules for:
  - sender identification,
  - opt-out handling,
  - suppression-list logging,
  - immediate halt on complaint/revocation.

**Risk**
- Legal/compliance exposure and poor list hygiene.

**Required fix**
- Add a mandatory “SMS compliance block” at template top with suppression schema and halt conditions.

---

### 4) Placeholder leakage risk in site assets (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v37.md` still contains unresolved placeholders:
  - Demo price placeholders (`$___`)
  - testimonial identity placeholders (`[Client Name]`, etc.)
  - proof metric placeholders (`XX%`, `X hrs/week`)
- No explicit hard gate: “Do not publish/send if placeholders remain.”

**Risk**
- Accidental client-facing placeholder claims; credibility damage.

**Required fix**
- Add pre-publish blocker checklist to template and make it required before demo send.

---

### 5) Pricing source-of-truth drift persists (HIGH)
**Evidence**
- `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md` align on active model: **$0 down + $99/$199/$299 monthly**.
- `MEMORY.md` still includes active-sounding legacy references (e.g., **$250**, **$250 + $10/mo**) without deprecated labeling.

**Risk**
- Quote inconsistency in outreach and handoff.

**Required fix**
- Mark legacy pricing in `MEMORY.md` as historical/archive only and add explicit active pricing source-of-truth banner.

---

### 6) Email pack quality: strong base, weak enforcement gates (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v37.md` is structurally strong (clear CTAs, multiple variants).
- But no hard send-gate requiring:
  - first touch <=100 words,
  - one verifiable business-specific observation,
  - canonical cadence compliance,
  - no unresolved placeholders.

**Risk**
- Quality drift at send time despite good templates.

**Required fix**
- Add explicit “SEND GATE — NON-NEGOTIABLE” block at top.

---

## What Passed
- ✅ Bundle version consistency: `email/site/send_ops` all at `v37`.
- ✅ Site demo pack retains coherent conversion structure and clear CTA hierarchy.
- ✅ Send-ops queue has concrete prioritying + follow-up trigger logic.
- ✅ Email templates avoid first-touch price drops in body copy.

---

## Fix Pack (Ready to Apply)

### A) Canonical cadence block
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates/queues must match this exactly.
```

### B) STANDING_ORDERS pitch formula patch
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — We built you a website"
- Hero: Full-width screenshot of their live demo site
- Body: 4-5 sentences MAX. Value prop + one proof point + CTA.
- Pricing: Do not include in first touch; include only after reply/interest.
- Button: "See Your Website Live →" (links to real URL)
- Sender: john@northstarsynergy.com
```

### C) Email send gate block
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

### E) Site pre-publish blocker
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace all proof stats/testimonials with verified values, or remove them.
- Replace demo price placeholders with approved offer values, or hide pricing.
- If any placeholder remains, do not send/publish.
```

### F) MEMORY.md pricing harmonization note
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If docs conflict, STANDING_ORDERS.md + memory/KNOWLEDGE.md govern.
```

---

## Pass/Fail Checklist (v38)

### Release Integrity
- [x] **PASS** Bundle versions aligned (email/site/send_ops all v37)
- [ ] **FAIL** Release manifest block not explicitly present in templates

### Cadence / Policy Consistency
- [ ] **FAIL** One canonical cadence enforced across all governing docs/templates
- [ ] **FAIL** STANDING_ORDERS pitch formula aligned with no-first-touch-pricing rule

### Cold Email Compliance
- [x] **PASS** No explicit first-touch pricing in email template bodies
- [ ] **FAIL** Hard send-gate embedded in email pack
- [ ] **FAIL** <=100-word first-touch constraint explicitly enforced
- [ ] **FAIL** Verifiable business-observation rule explicitly enforced

### SMS/TCPA Controls
- [ ] **FAIL** Sender ID + opt-out rules embedded in send-ops template
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Complaint/revocation immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** Structure, CTA flow, and packaging quality
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded

### Pricing Consistency
- [ ] **FAIL** Legacy $250-era language formally marked deprecated in MEMORY.md
- [x] **PASS** STANDING_ORDERS and KNOWLEDGE currently align on $0-down monthly tiers

---

## Final QA Decision
**v38 Enforcement Result: FAIL**  
Do not treat outbound as fully compliance-safe until the six required fixes are applied and re-verified in the next report cycle.