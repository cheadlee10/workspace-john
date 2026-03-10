# QA Enforcement Report — Sales Assets
**Version:** v42  
**Date:** 2026-03-04  
**Scope:** QA enforcement across recent sales templates + memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/email_outreach_pack_v41.md`
- `templates/site_demo_pack_v42.md`
- `templates/send_ops_queue_v41.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/CRITICAL_RULES.md`
- `memory/qa_enforcement_report_2026-03-04_v41.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL**

Content quality is strong, but enforcement-level compliance is still not in-file. A policy contradiction and SMS compliance gaps remain high risk.

### Delta vs v41
- ✅ `site_demo_pack` advanced to `v42` with usable conversion copy.
- ❌ Version skew introduced (`site=v42`, `email/send_ops=v41`) with no release manifest.
- ❌ Cadence contradiction still unresolved (`STANDING_ORDERS` vs `KNOWLEDGE` vs email template cadence).
- ❌ First-touch pricing conflict in policy still unresolved.
- ❌ SMS/TCPA enforcement block still absent in `send_ops` template.
- ❌ Placeholder publish blocker still absent in `site_demo_pack_v42`.
- ❌ Legacy pricing in `MEMORY.md` still not explicitly deprecated.

---

## Findings

### 1) Outreach cadence contradiction (HIGH)
**Evidence**
- `STANDING_ORDERS.md` line 172: “Day 1, Day 5, Day 10.”
- `memory/KNOWLEDGE.md` line 88: “3-7-7 cadence (Day 0 / Day 3 / Day 10, optional Day 17).”
- `templates/email_outreach_pack_v41.md` deployment notes: “days 2, 4, 7, 12, 20.”

**Risk**
Non-comparable experiments, noisy metrics, and execution drift.

**Required fix**
Choose one canonical cadence (recommended: Day 0 / 3 / 10 / optional 17) and enforce it in all policy + template files.

---

### 2) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` line 87: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` line 178: pitch body requires “value prop + one stat + pricing + CTA.”

**Risk**
Mutually incompatible operating rules; reps can be compliant with one doc and non-compliant with another.

**Required fix**
Patch pitch formula to remove first-touch pricing requirement; pricing moves post-interest.

---

### 3) SMS/TCPA controls absent in send ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v41.md` contains call/SMS sequences and snippets but no mandatory opt-out language, suppression workflow, or complaint/revocation halt instructions.
- Snippets use direct outreach copy without compliance footer.

**Risk**
Regulatory exposure and list hygiene failures.

**Required fix**
Embed a mandatory SMS compliance block + suppression schema in template header and require use before outbound.

---

### 4) Placeholder leakage risk remains (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v42.md` still includes unresolved placeholders (`[XX+]`, `[XXX+]`, `[XX%]`, testimonial placeholders, logo placeholders).
- No explicit pre-publish blocker section present.

**Risk**
Client-facing placeholder leakage and credibility damage.

**Required fix**
Add hard pre-publish gate: placeholder scan required; if unresolved tokens exist, do not send/publish.

---

### 5) Pricing source-of-truth drift in memory layer (HIGH)
**Evidence**
- Active website tiers in `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`: $99/$199/$299 monthly.
- `MEMORY.md` still includes active-sounding legacy references: “OUR PRICE: $250”, “$250 + $10/mo”.

**Risk**
Quote inconsistency and avoidable confusion in outbound/closing.

**Required fix**
Add a deprecation banner in `MEMORY.md` marking $250-era pricing as historical/archive only.

---

### 6) Email quality is solid, but enforcement gate still missing (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v41.md` copy quality is strong and mostly policy-aligned.
- Missing hard send-gate checklist for mandatory constraints.

**Risk**
Execution drift despite strong base copy.

**Required fix**
Add top-of-file send-gate block: <100 words first touch, one verifiable observation, one CTA, no first-touch pricing, no placeholders, cadence compliance.

---

### 7) Token format inconsistency (LOW)
**Evidence**
- Email/site assets use `{token}` style.
- Send ops snippets use `{{client}}`, `{{industry}}`.

**Risk**
Manual paste errors and automation merge failures.

**Required fix**
Standardize all sales templates on `{token_name}` format.

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

### B) Pitch formula patch (`STANDING_ORDERS.md`)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — We built you a website"
- Hero: Full-width screenshot of their live demo site
- Body: 4-5 sentences MAX. Value prop + one proof point + CTA.
- Pricing: Do not include in first touch; include after reply/interest.
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

### E) Site pre-publish blocker
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

### G) Token standard
```md
## Personalization Token Standard
- Use `{token_name}` format across all templates.
- Disallow mixed `{{token}}` style in sales assets.
```

---

## Pass/Fail Checklist (v42)

### Release Integrity
- [ ] **FAIL** Current sales template set version-aligned (email/site/send_ops all same rev)
- [ ] **FAIL** Release-manifest block present in each template header

### Cadence & Policy Consistency
- [ ] **FAIL** Single canonical cadence enforced across policy + templates
- [ ] **FAIL** Pitch formula aligned with no-first-touch-pricing rule

### Cold Email Enforcement
- [x] **PASS** First-touch email body avoids explicit pricing in current template copy
- [ ] **FAIL** Hard send-gate embedded in email pack
- [ ] **FAIL** <100-word requirement embedded as blocker
- [ ] **FAIL** One-verifiable-observation rule embedded as blocker

### SMS Compliance Enforcement
- [ ] **FAIL** Sender ID + opt-out rule embedded in send-ops queue
- [ ] **FAIL** Suppression log schema embedded
- [ ] **FAIL** Complaint/revocation immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** v42 demo/site structure remains clear and conversion-oriented
- [ ] **FAIL** Pre-publish placeholder blocker embedded

### Pricing Consistency
- [x] **PASS** Active pricing aligns between `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Legacy pricing in `MEMORY.md` formally deprecated/labeled historical

### Template Hygiene
- [ ] **FAIL** Unified token format enforced across all assets

---

## Final QA Decision
**v42 Enforcement Result: FAIL**  
Do not mark enforcement green until required fixes are applied in-file and checklist is re-run.