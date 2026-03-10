# QA Enforcement Report — Sales Assets
**Version:** v45  
**Date:** 2026-03-04  
**Scope:** QA enforcement across recent sales templates + memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/email_outreach_pack_v44.md`
- `templates/site_demo_pack_v44.md`
- `templates/send_ops_queue_v44.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`
- `memory/KNOWLEDGE.md`
- `STANDING_ORDERS.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v44.md` (prior baseline)

---

## Executive Verdict
**Overall status: FAIL (improved from v44, but still blocked).**

### What improved vs v44
- ✅ Version alignment regression fixed: `email/site/send_ops` are now all `v44`.
- ✅ First-touch templates still avoid explicit pricing in `email_outreach_pack_v44.md`.

### What remains blocking
- ❌ Core cadence still contradictory across policy/template layers.
- ❌ First-touch standards from cold-email playbook are not enforced in v44 outreach pack.
- ❌ SMS compliance controls still missing from send ops queue.
- ❌ Legacy pricing in `MEMORY.md` still conflicts with active pricing model.
- ❌ Placeholder publishing risk remains in site demo pack.

---

## Findings (with Evidence, Risk, Required Fix)

### 1) Cadence contradiction across authoritative docs (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E: follow-up = **Day 1 / Day 5 / Day 10**.
- `memory/KNOWLEDGE.md`: canonical = **Day 0 / Day 3 / Day 10 (optional Day 17)**.
- `email_outreach_pack_v44.md`: suggested = **Day 1 / Day 3 / Day 6 / Day 10 / Day 14**.
- Cold email playbook Section 8: **3-7-7 (Day 0 / Day 3 / Day 10 + breakup Day 17)**.

**Risk**
Execution drift, unreliable performance attribution, and team-level confusion.

**Required fix**
Adopt a single canonical cadence in policy + templates: **Day 0 / Day 3 / Day 10 (+ Day 17 breakup optional)**.

---

### 2) First-touch outreach pack does not enforce playbook hard rules (HIGH)
**Evidence**
- Playbook Rule 2 requires every web-design outreach include a visual link.
- Playbook Rule 7 requires `<100 words` first touch.
- Playbook Rule 10 requires pre-written follow-up sequence.
- `email_outreach_pack_v44.md` has broad templates, many likely >100 words, and no in-file hard send gate.

**Risk**
Quality collapse under volume; lower reply rates; non-compliance with adopted outreach standard.

**Required fix**
Embed a blocking **SEND GATE** inside the outreach pack:
- First-touch `<100 words`
- One specific verifiable observation
- One soft CTA
- No first-touch pricing
- Visual proof link required for web-design outreach
- Day 0/3/10(+17) sequence pre-scheduled

---

### 3) STANDING_ORDERS pitch formula still conflicts with no-first-touch-pricing rule (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E Pitch Formula: “Value prop + one stat + **pricing** + CTA.”
- `memory/KNOWLEDGE.md` and playbook: no first-touch pricing.

**Risk**
Operators can follow one “official” file while violating another.

**Required fix**
Patch pitch formula text to remove first-touch pricing and move pricing to post-interest touch.

---

### 4) SMS/TCPA control gap in send ops queue (HIGH)
**Evidence**
- `send_ops_queue_v44.md` includes call+SMS execution and fallback snippets.
- Missing explicit opt-out language, STOP suppression handling, quiet-hours/legal-window rule, and suppression logging schema.

**Risk**
Regulatory exposure, complaint risk, and sender reputation damage.

**Required fix**
Add mandatory SMS compliance block and suppression process to queue template.

---

### 5) Legacy pricing contradiction remains active in MEMORY layer (HIGH)
**Evidence**
- `MEMORY.md` still contains active-sounding historical model: “OUR PRICE: $250” and “close at $250 + $10/mo.”
- Active current model elsewhere: `$0 down + $99/$199/$299` monthly tiers.

**Risk**
Quote inconsistency, margin drift, and trust damage in sales conversations.

**Required fix**
Add deprecation banner in `MEMORY.md` marking $250 model as historical only; define source-of-truth files.

---

### 6) Site demo pack placeholder leakage risk (MEDIUM)
**Evidence**
- `site_demo_pack_v44.md` retains unresolved placeholders (`[XX%]`, logo placeholders, testimonial placeholders).
- No explicit pre-publish blocker in-file.

**Risk**
Client-facing credibility loss if placeholders are shipped.

**Required fix**
Add “placeholder unresolved = do not send/publish” gate.

---

### 7) Token syntax inconsistency across assets (LOW)
**Evidence**
- Outreach pack uses square-bracket tokens (`[FirstName]`).
- Send ops snippets use moustache tokens (`{{client}}`).

**Risk**
Merge substitution errors and operational mistakes.

**Required fix**
Standardize one token format across all sales assets (recommend `{token_name}`).

---

## Fix Pack (Ready-to-Apply Snippets)

### A) Canonical Cadence Block (add to `STANDING_ORDERS.md` + `email_outreach_pack_v44.md`)
```md
## Canonical Outreach Cadence (Single Source of Truth)
- Day 0: First touch
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
No alternate cadences allowed in sales templates.
```

### B) Pitch Formula Patch (`STANDING_ORDERS.md`, Section E)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — We built you a website"
- Hero: Full-width screenshot of their live demo site
- Body: 4-5 sentences MAX. One specific observation + one stat + one soft CTA.
- Pricing: Do NOT include in first touch. Share only after interest/reply.
- Button: "See Your Website Live →" (links to real URL)
- Sender: john@northstarsynergy.com
```

### C) Outreach SEND GATE (add to `email_outreach_pack_v44.md`)
```md
## SEND GATE — BLOCKING
- First-touch body <100 words
- Plain-text first touch
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA
- No first-touch pricing
- Visual proof link included for web-design outreach
- No unresolved placeholders
- Follow-ups pre-written: Day 3, Day 10, optional Day 17
If any check fails: DO NOT SEND.
```

### D) SMS Compliance Block (add to `send_ops_queue_v44.md`)
```md
## SMS COMPLIANCE (MANDATORY)
- Identify sender/business in first SMS.
- Include opt-out instruction where required: "Reply STOP to opt out."
- Respect recipient-local legal contact windows.
- On STOP/opt-out/revocation/complaint: immediate suppression + halt all outbound.
- Log suppression event before any future attempt.

Suppression log fields:
lead_id, phone, channel, event_type, source, timestamp_local, operator
```

### E) Site Placeholder Gate (add to `site_demo_pack_v44.md`)
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in any client-facing asset.
- Replace all placeholder logos/metrics/testimonials/case-study slots.
- If any placeholder remains, do not send or publish.
```

### F) Pricing Harmonization Banner (`MEMORY.md`)
```md
### Pricing Source of Truth (Effective Immediately)
- Active model: $0 down + monthly tiers ($99/$199/$299) for websites.
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If conflict exists: STANDING_ORDERS.md + memory/KNOWLEDGE.md govern.
```

### G) Token Standard Block (add to outreach + send ops templates)
```md
## Personalization Token Standard
Use `{token_name}` only across all sales assets.
Disallow mixed `[token]` and `{{token}}` formats.
```

---

## Pass/Fail Checklist (v45)

### Release Integrity
- [x] **PASS** `email/site/send_ops` versions aligned at v44.
- [ ] **FAIL** Release integrity rule embedded as in-file blocker.

### Cadence & Policy Consistency
- [ ] **FAIL** Single cadence enforced across `STANDING_ORDERS`, `KNOWLEDGE`, playbook, and template pack.
- [ ] **FAIL** `STANDING_ORDERS` pitch formula aligned with no-first-touch-pricing standard.

### Cold Email Quality Enforcement
- [x] **PASS** No explicit first-touch pricing in `email_outreach_pack_v44.md` templates.
- [ ] **FAIL** Hard `<100 words` gate embedded in outreach pack.
- [ ] **FAIL** Mandatory visual proof rule embedded in outreach pack.
- [ ] **FAIL** One-verifiable-observation requirement embedded as blocker.

### SMS Compliance Enforcement
- [ ] **FAIL** STOP/opt-out handling embedded in send ops queue.
- [ ] **FAIL** Suppression workflow/schema embedded.
- [ ] **FAIL** Legal-window/contact-hours rule embedded.

### Site Demo QA
- [x] **PASS** Site copy remains coherent and conversion-oriented.
- [ ] **FAIL** Pre-publish placeholder blocker embedded.

### Pricing Consistency
- [x] **PASS** Current pricing model present in `STANDING_ORDERS` and `memory/KNOWLEDGE`.
- [ ] **FAIL** Legacy `$250` model formally deprecated in `MEMORY.md`.

### Template Hygiene
- [ ] **FAIL** Single token syntax enforced across outreach + send ops templates.

---

## Final QA Decision
**v45 Enforcement Result: FAIL**  
Primary blocker cluster remains policy contradiction + compliance enforcement gap. Fix pack above is ready for immediate application.