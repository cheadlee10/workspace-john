# QA Enforcement Report — Sales Assets
**Version:** v43  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates + memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/email_outreach_pack_v43.md`
- `templates/site_demo_pack_v43.md`
- `templates/send_ops_queue_v43.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v42.md` (baseline)

---

## Executive Verdict
**Overall status: FAIL**

v43 fixed release-version skew (all three templates are now v43), but high-risk policy contradictions and compliance controls are still unresolved in-file.

### Delta vs v42
- ✅ Version alignment improved: `email/site/send_ops` all on `v43`.
- ❌ Cadence contradiction still unresolved (`STANDING_ORDERS` vs `KNOWLEDGE` vs email sequence).
- ❌ First-touch pricing policy contradiction still unresolved.
- ❌ SMS/TCPA enforcement block still absent in send ops queue.
- ❌ Site placeholder pre-publish blocker still absent.
- ❌ Legacy `$250` pricing references still not explicitly deprecated in `MEMORY.md`.
- ❌ Token format mismatch still present (`{token}` vs `{{token}}`).

---

## Findings

### 1) Outreach cadence contradiction (HIGH)
**Evidence**
- `STANDING_ORDERS.md`: “Follow-up: Day 1, Day 5, Day 10.”
- `memory/KNOWLEDGE.md`: “Use 3-7-7 follow-up cadence (Day 0 / Day 3 / Day 10, optional breakup Day 17).”
- `templates/email_outreach_pack_v43.md`: sequence uses Day 1 / Day 3 / Day 6 / Day 9 / Day 13.

**Risk**
Non-comparable campaign performance and operator drift.

**Required fix**
Pick one canonical cadence and enforce across policy + templates.

---

### 2) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` Pitch Formula: “Value prop + one stat + pricing + CTA.”

**Risk**
Reps can be compliant with one file while violating another.

**Required fix**
Patch Pitch Formula to remove first-touch pricing requirement; pricing appears after interest.

---

### 3) SMS/TCPA controls absent in send ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v43.md` includes outbound call/SMS flow and snippets but no mandatory opt-out language, suppression workflow, or STOP/revocation handling rule.
- Snippets still use `{{client}}`/`{{industry}}` and include no compliance line.

**Risk**
Regulatory exposure and suppression failures.

**Required fix**
Embed mandatory SMS compliance block and suppression schema directly in template header and snippets.

---

### 4) Placeholder leakage risk in site demo pack (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v43.md` still includes placeholder stats/logos (`[XX]`, `[Client Logo N]`, bracketed testimonial fields).
- No hard pre-publish blocker section present.

**Risk**
Client-facing credibility damage if placeholders leak.

**Required fix**
Add pre-publish QA gate: unresolved placeholder token = do not send/publish.

---

### 5) Legacy pricing drift in memory layer (HIGH)
**Evidence**
- `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md` align on active website tiers: `$0 down + $99/$199/$299` monthly.
- `MEMORY.md` still has active-sounding legacy pricing: “OUR PRICE: $250” and “close at $250 + $10/mo”.

**Risk**
Quote inconsistency in outreach/closing.

**Required fix**
Add explicit deprecation banner in `MEMORY.md` marking $250-era pricing as historical/archive only.

---

### 6) Email enforcement gate missing (MEDIUM)
**Evidence**
- `templates/email_outreach_pack_v43.md` says “Keep first touch under 120 words when possible.”
- `memory/KNOWLEDGE.md` requires `<100 words` first-touch + one verifiable observation.
- No hard send-gate checklist embedded in email pack.

**Risk**
Policy drift despite solid copy quality.

**Required fix**
Add SEND GATE block with blocking checks (word count, observation, CTA count, no pricing, no placeholders, cadence compliance).

---

### 7) Token standard inconsistency (LOW)
**Evidence**
- Email/site assets use `{token}` style.
- Send ops uses `{{token}}` style.

**Risk**
Merge/paste errors and inconsistent automation substitution.

**Required fix**
Standardize all sales assets to `{token_name}`.

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

### B) Pitch Formula patch (`STANDING_ORDERS.md`)
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

### D) SMS compliance block (send ops)
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
- Replace all placeholder case-study/logo fields with verified content, or remove section.
- If any placeholder remains, do not send/publish.
```

### F) Memory pricing harmonization note (`MEMORY.md`)
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

## Pass/Fail Checklist (v43)

### Release Integrity
- [x] **PASS** Sales template set is version-aligned (`email/site/send_ops` all `v43`)
- [ ] **FAIL** Release-manifest/header enforcement block present in each template

### Cadence & Policy Consistency
- [ ] **FAIL** Single canonical cadence enforced across policy + templates
- [ ] **FAIL** Pitch formula aligned with no-first-touch-pricing rule

### Cold Email Enforcement
- [x] **PASS** Current first-touch templates avoid explicit pricing in body copy
- [ ] **FAIL** Hard SEND GATE embedded in email pack
- [ ] **FAIL** `<100 words` requirement enforced in template (currently “<120 when possible”)
- [ ] **FAIL** One-verifiable-observation rule embedded as blocker

### SMS Compliance Enforcement
- [ ] **FAIL** Sender ID + opt-out rule embedded in send ops template
- [ ] **FAIL** Suppression log schema embedded
- [ ] **FAIL** STOP/revocation/complaint immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** v43 site demo copy remains coherent and conversion-oriented
- [ ] **FAIL** Pre-publish placeholder blocker embedded

### Pricing Consistency
- [x] **PASS** Active pricing aligns between `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Legacy pricing in `MEMORY.md` formally deprecated/labeled historical

### Template Hygiene
- [ ] **FAIL** Unified token format enforced across all sales assets

---

## Final QA Decision
**v43 Enforcement Result: FAIL**  
Do not mark enforcement green until required in-file fixes are applied and checklist is re-run.