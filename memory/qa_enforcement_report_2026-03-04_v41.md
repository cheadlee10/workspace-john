# QA Enforcement Report — Sales Assets
**Version:** v41  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates and memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/email_outreach_pack_v41.md`
- `templates/site_demo_pack_v41.md`
- `templates/send_ops_queue_v41.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v40.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL**

Core template quality is usable, but governance contradictions and compliance controls are still not fully enforced in-file. Enforcement cannot be marked green.

### Delta vs v40
- ✅ Template release sync is clean (`email/site/send_ops` all at `v41`).
- ✅ First-touch templates still avoid explicit pricing in body copy.
- ❌ Cadence conflict remains unresolved across policy docs vs template guidance.
- ❌ `STANDING_ORDERS.md` pitch formula still requires first-touch pricing (policy conflict).
- ❌ SMS/TCPA safeguards still missing from send-ops queue.
- ❌ Site placeholder hard-blocker still missing.
- ❌ Legacy pricing in `MEMORY.md` still appears active without deprecation banner.

---

## Findings

### 1) Outreach cadence contradiction (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: canonical “3-7-7” cadence (Day 0 / Day 3 / Day 10, optional Day 17).
- `STANDING_ORDERS.md` Section E: “Day 1, Day 5, Day 10.”
- `templates/email_outreach_pack_v41.md`: “days 2, 4, 7, 12, 20.”

**Risk**
- Inconsistent sequencing, noisy attribution, and non-comparable conversion data.

**Required fix**
- Enforce one canonical cadence block in all governing docs and templates.

---

### 2) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: no first-touch pricing.
- `STANDING_ORDERS.md` pitch formula: requires “value prop + one stat + pricing + CTA.”

**Risk**
- Simultaneous compliant/non-compliant behavior depending on which doc is followed.

**Required fix**
- Remove pricing requirement from first-touch pitch formula; defer pricing until post-interest.

---

### 3) SMS/TCPA controls absent in send ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v41.md` defines call/SMS actions but lacks mandatory opt-out language, suppression workflow, complaint halt rule, and explicit legal-contact-window guardrails.

**Risk**
- Regulatory exposure + list hygiene failures.

**Required fix**
- Add mandatory compliance block and suppression schema directly in template header.

---

### 4) Placeholder leakage risk in site demo pack (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v41.md` still includes unresolved placeholder tokens (`[XX]`, `[Client Name]`, `[Logo]`).
- No explicit “do not publish/send with placeholders” blocker.

**Risk**
- Placeholder content shipped externally, credibility damage.

**Required fix**
- Add a pre-publish blocker checklist requiring placeholder scan/removal before send.

---

### 5) Pricing source-of-truth drift in memory layer (HIGH)
**Evidence**
- Active pricing in `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md`: website subscription tiers $99/$199/$299.
- `MEMORY.md` still contains active-sounding legacy pricing references (`$250`, `$250 + $10/mo`) without archive/deprecation labeling.

**Risk**
- Quote inconsistency and avoidable pricing confusion during outreach/closing.

**Required fix**
- Add explicit source-of-truth banner in `MEMORY.md`; label legacy pricing as historical only.

---

### 6) Email pack quality strong, but enforcement gate missing (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v41.md` is structurally strong and personalization-ready.
- Missing explicit hard send-gate for policy requirements: first-touch plain text, <100 words, one verifiable observation, one CTA, no placeholders, cadence compliance.

**Risk**
- Quality drift during execution despite good template copy.

**Required fix**
- Add mandatory send-gate checklist at top of email pack.

---

### 7) Token-style inconsistency across templates (LOW)
**Evidence**
- Email/site templates use `{token}` style.
- Send ops snippets use `{{client}}`, `{{industry}}`.

**Risk**
- Execution errors in manual copy/paste or automation merge steps.

**Required fix**
- Standardize one token format across all sales assets.

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

### G) Token format standard
```md
## Personalization Token Standard
- Use `{token_name}` format across all templates.
- Disallow mixed `{{token}}` style in sales assets.
```

---

## Pass/Fail Checklist (v41)

### Release Integrity
- [x] **PASS** Latest template versions aligned (`email/site/send_ops` at v41)
- [ ] **FAIL** Embedded release-manifest block present in template headers

### Cadence & Policy Consistency
- [ ] **FAIL** Single canonical cadence enforced across governing docs/templates
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

### Template Hygiene
- [ ] **FAIL** Unified personalization token format enforced across all assets

---

## Final QA Decision
**v41 Enforcement Result: FAIL**  
Do not mark enforcement green until all required fixes are applied and re-validated in-file.