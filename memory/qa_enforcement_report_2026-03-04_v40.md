# QA Enforcement Report — Sales Assets
**Version:** v40  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates and memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/email_outreach_pack_v39.md`
- `templates/send_ops_queue_v39.md`
- `templates/site_demo_pack_v39.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v39.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL**

Template quality is usable, but core governance contradictions and compliance gaps remain unresolved. This blocks a full pass for production-safe enforcement.

### Delta vs v39
- ✅ Version sync still clean across template bundle (`v39` for email/site/send ops).
- ✅ First-touch email pack still avoids explicit pricing in body copy.
- ❌ Cadence conflict still unresolved across policy layers.
- ❌ Pitch formula still requires first-touch pricing (contradicts outreach standard).
- ❌ SMS compliance controls still missing from send-ops queue.
- ❌ Site placeholder hard-stop gate still missing.
- ❌ `MEMORY.md` still contains active-sounding legacy pricing without deprecation banner.

---

## Findings

### 1) Outreach cadence contradiction (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “3-7-7 follow-up cadence (Day 0 / Day 3 / Day 10, optional Day 17).”
- `STANDING_ORDERS.md` Section E: “Day 1, Day 5, Day 10.”
- `templates/email_outreach_pack_v39.md`: “Day 1, Day 3, Day 6, Day 10, Day 14, Day 21.”

**Risk**
- Inconsistent sequencing, noisy conversion data, and non-comparable campaign performance.

**Required fix**
- Enforce one canonical cadence in all governing docs + all templates.

---

### 2) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` Pitch Formula: “Value prop + one stat + pricing + CTA.”

**Risk**
- Team can be simultaneously compliant and non-compliant depending on which doc is followed.

**Required fix**
- Remove first-touch pricing requirement from pitch formula and defer pricing to post-interest reply.

---

### 3) SMS/TCPA safeguards missing in ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v39.md` defines call/SMS cadences but does not include mandatory sender identification, opt-out handling, suppression logging, or complaint/revocation halt rule.

**Risk**
- Regulatory exposure and operational list-hygiene failures.

**Required fix**
- Add mandatory compliance block + suppression workflow/schema to top of send-ops template.

---

### 4) Site proof placeholders without hard publish blocker (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v39.md` includes unresolved placeholders in proof sections (`[XX]`, `[Client Name]`, `[placeholder]`).
- No explicit “do not publish/send while placeholders exist” gate.

**Risk**
- Placeholder leakage to prospects/clients, credibility damage.

**Required fix**
- Add pre-publish blocker checklist with mandatory placeholder scan.

---

### 5) Pricing source-of-truth drift in memory layer (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` and `STANDING_ORDERS.md` reflect active subscription model ($0 down + $99/$199/$299 website tiers).
- `MEMORY.md` still has active-sounding legacy references (e.g., “OUR PRICE: $250”, “close at $250 + $10/mo”, “Pending: First deal closed ($250 + $10/mo)”).

**Risk**
- Quoting inconsistency during outreach and handoff.

**Required fix**
- Add explicit pricing source-of-truth banner in `MEMORY.md` and label all legacy pricing as historical/archive-only.

---

### 6) Email template quality is solid, but enforcement gate is absent (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v39.md` is strong structurally (clear CTA variants and personalization snippets).
- Missing explicit non-negotiable send gate for: plain-text first touch, <100 words, one verifiable observation, one CTA, no placeholders, cadence compliance.

**Risk**
- Quality drift during execution despite strong template content.

**Required fix**
- Add mandatory send-gate checklist at top of email pack.

---

## Fix Pack (Ready-to-Apply)

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

### C) Email send-gate block
```md
## SEND GATE — NON-NEGOTIABLE
- First-touch body <100 words
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
- Replace all placeholder case-study fields with verified content, or remove section.
- If any placeholder remains, do not send/publish.
```

### F) MEMORY pricing harmonization note
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299) for websites.
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If docs conflict, STANDING_ORDERS.md + memory/KNOWLEDGE.md govern.
```

---

## Pass/Fail Checklist (v40)

### Release Integrity
- [x] **PASS** Latest template versions aligned (`email/site/send_ops` at v39)
- [ ] **FAIL** Embedded release-manifest block present in template headers

### Cadence & Policy Consistency
- [ ] **FAIL** Single canonical cadence enforced across all governing docs/templates
- [ ] **FAIL** Pitch formula aligned with no-first-touch-pricing policy

### Cold Email Enforcement
- [x] **PASS** No first-touch pricing in current email template body copy
- [ ] **FAIL** Hard send-gate embedded in email pack
- [ ] **FAIL** <100-word first-touch rule embedded in template
- [ ] **FAIL** One-verifiable-observation rule embedded in template

### SMS Compliance Enforcement
- [ ] **FAIL** Sender ID + opt-out policy embedded in send-ops queue
- [ ] **FAIL** Suppression log schema embedded
- [ ] **FAIL** Complaint/revocation immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** Conversion-oriented structure and CTA flow are coherent
- [ ] **FAIL** Placeholder pre-publish blocker embedded

### Pricing Consistency
- [x] **PASS** `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` align on active website subscription tiers
- [ ] **FAIL** `MEMORY.md` legacy pricing formally deprecated/labeled historical

---

## Final QA Decision
**v40 Enforcement Result: FAIL**  
Do not mark enforcement green until all six fixes are applied and re-validated in-file.