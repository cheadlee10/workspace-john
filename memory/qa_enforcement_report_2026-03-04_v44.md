# QA Enforcement Report — Sales Assets
**Version:** v44  
**Date:** 2026-03-04  
**Scope:** QA enforcement across current sales templates + memory/policy guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/site_demo_pack_v44.md`
- `templates/email_outreach_pack_v43.md`
- `templates/send_ops_queue_v43.md`
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `memory/qa_enforcement_report_2026-03-04_v43.md` (prior baseline)

---

## Executive Verdict
**Overall status: FAIL**

v44 introduced a new version-skew regression (site pack bumped to v44 while email/send-ops remain v43), and prior high-risk contradictions/compliance gaps are still unresolved.

### Delta vs v43
- ❌ **Regression:** release set no longer version-aligned (`site v44` vs `email/send_ops v43`).
- ➖ No evidence of fixes for cadence contradiction.
- ➖ No evidence of fixes for first-touch pricing contradiction.
- ➖ No evidence of SMS/TCPA enforcement additions in send ops queue.
- ➖ No pre-publish placeholder blocker added to site pack.
- ➖ No formal deprecation banner for legacy `$250` pricing in `MEMORY.md`.
- ➖ Token format mismatch persists (`{token}` vs `{{token}}`).

---

## Findings

### 1) Release version skew (HIGH)
**Evidence**
- `site_demo_pack_v44.md`
- `email_outreach_pack_v43.md`
- `send_ops_queue_v43.md`

**Risk**
Operational confusion, stale copy use, and unverifiable QA state.

**Required fix**
Publish synchronized `email_outreach_pack_v44.md` and `send_ops_queue_v44.md` (or roll site back to v43) so one release train exists.

---

### 2) Outreach cadence contradiction (HIGH)
**Evidence**
- `STANDING_ORDERS.md` (Nosite pipeline): Day 1 / Day 5 / Day 10.
- `memory/KNOWLEDGE.md` (Cold Email standard): Day 0 / Day 3 / Day 10 (optional Day 17).
- `email_outreach_pack_v43.md` sequence: Day 1 / Day 3 / Day 6 / Day 9 / Day 13.

**Risk**
Split testing becomes meaningless; reps execute conflicting cadences.

**Required fix**
Declare one canonical cadence in policy and enforce the same cadence in template sequence.

---

### 3) First-touch pricing policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: “No first-touch pricing in outreach copy.”
- `STANDING_ORDERS.md` Pitch Formula: includes “pricing” in first-touch body.

**Risk**
Reps can follow one authoritative doc while violating another.

**Required fix**
Patch Pitch Formula to remove first-touch pricing requirement; pricing moves post-interest.

---

### 4) SMS/TCPA controls absent in send ops queue (HIGH)
**Evidence**
- `send_ops_queue_v43.md` includes call+SMS execution and snippets but no explicit opt-out handling, suppression workflow, or STOP revocation rule.
- No compliance footer in SMS snippets.

**Risk**
Regulatory and deliverability exposure.

**Required fix**
Embed mandatory SMS compliance block + suppression schema + STOP immediate-halt logic in template.

---

### 5) Placeholder leakage risk in site demo pack (MEDIUM)
**Evidence**
- `site_demo_pack_v44.md` still includes unresolved placeholders: `[XX%]`, `[Client Logo N]`, bracketed testimonial metadata.
- No hard pre-publish blocker section.

**Risk**
Client-facing credibility damage if placeholders ship.

**Required fix**
Add explicit “placeholder unresolved = do not send/publish” gate.

---

### 6) Email send-gate not enforced (MEDIUM)
**Evidence**
- `email_outreach_pack_v43.md`: “under 120 words when possible.”
- `memory/KNOWLEDGE.md`: requires `<100 words`, one verifiable business-specific observation, one soft CTA.
- No blocking QA gate embedded in email template file.

**Risk**
Quality drift and inconsistent execution under volume.

**Required fix**
Add send gate checklist directly in outreach pack and enforce as blocking.

---

### 7) Legacy pricing drift still active in memory layer (HIGH)
**Evidence**
- `MEMORY.md` still presents active-sounding legacy model: “OUR PRICE: $250” and “close at $250 + $10/mo”.
- Active model elsewhere: `$0 down + $99/$199/$299` monthly (in `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`).

**Risk**
Quote inconsistency and margin erosion.

**Required fix**
Add deprecation banner in `MEMORY.md` labeling `$250` references as historical only.

---

### 8) Token standard inconsistency (LOW)
**Evidence**
- Email templates use `{FirstName}` style.
- Send ops SMS snippets use `{{client}}`, `{{industry}}`.

**Risk**
Merge/paste substitution errors.

**Required fix**
Standardize personalization syntax to `{token_name}` across all sales assets.

---

## Fix Pack (Ready to Apply)

### A) Release Integrity Gate
```md
## RELEASE INTEGRITY (BLOCKER)
- Site/Email/SendOps versions must match exactly (same v##).
- If one asset is updated, all three are updated in the same release.
- If versions mismatch, release is FAIL and cannot be queued.
```

### B) Canonical Cadence Block
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All policy docs and templates must match exactly.
```

### C) Pitch Formula Patch (`STANDING_ORDERS.md`)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — We built you a website"
- Hero: Full-width screenshot of their live demo site
- Body: 4-5 sentences MAX. Value prop + one proof point + CTA.
- Pricing: Do not include in first touch; include only after reply/interest.
- Button: "See Your Website Live →" (links to real URL)
- Sender: john@northstarsynergy.com
```

### D) Email SEND GATE
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

### E) SMS Compliance Block (`send_ops_queue`)
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

### F) Site Pre-Publish Blocker (`site_demo_pack`)
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace/remove all placeholder stats, logos, testimonials, case-study slots.
- If any placeholder remains, do not send/publish.
```

### G) Pricing Harmonization Note (`MEMORY.md`)
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299) for websites.
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If docs conflict, STANDING_ORDERS.md + memory/KNOWLEDGE.md govern.
```

### H) Token Standard
```md
## Personalization Token Standard
- Use `{token_name}` format across all sales assets.
- Disallow mixed `{{token}}` style in sales templates.
```

---

## Pass/Fail Checklist (v44)

### Release Integrity
- [ ] **FAIL** Sales template set version-aligned (`email/site/send_ops`)
- [ ] **FAIL** Release integrity blocker embedded in sales templates

### Cadence & Policy Consistency
- [ ] **FAIL** Single canonical cadence enforced across policy + templates
- [ ] **FAIL** Pitch formula aligned with no-first-touch-pricing rule

### Cold Email Enforcement
- [x] **PASS** First-touch templates avoid explicit pricing language in current email copy
- [ ] **FAIL** Hard SEND GATE embedded in outreach pack
- [ ] **FAIL** `<100 words` requirement enforced (currently `<120 when possible`)
- [ ] **FAIL** One-verifiable-observation rule embedded as blocker

### SMS Compliance Enforcement
- [ ] **FAIL** Sender ID/opt-out handling embedded in send ops template
- [ ] **FAIL** Suppression schema embedded
- [ ] **FAIL** STOP/revocation/complaint immediate-halt rule embedded

### Site Demo QA
- [x] **PASS** Site v44 copy remains coherent and conversion-oriented
- [ ] **FAIL** Pre-publish placeholder blocker embedded

### Pricing Consistency
- [x] **PASS** Active pricing aligns between `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Legacy `$250` model formally deprecated in `MEMORY.md`

### Template Hygiene
- [ ] **FAIL** Unified token format enforced across all sales assets

---

## Final QA Decision
**v44 Enforcement Result: FAIL**  
Do not mark enforcement green until release-version alignment is restored and all blocker controls are embedded in-file.