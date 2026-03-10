# QA Enforcement Report — Sales Assets
**Version:** v46  
**Date:** 2026-03-04  
**Scope:** QA enforcement across latest sales templates + policy/memory guidance for consistency, compliance, and quality.

## Assets Reviewed
- `templates/site_demo_pack_v46.md`
- `templates/site_demo_pack_v45.md`
- `templates/email_outreach_pack_v45.md`
- `templates/send_ops_queue_v45.md`
- `memory/qa_enforcement_report_2026-03-04_v45.md` (baseline)
- `STANDING_ORDERS.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`

---

## Executive Verdict
**Overall status: FAIL (quality progress in site copy, but enforcement and compliance blockers remain).**

### Improvements vs v45
- ✅ `site_demo_pack_v46.md` improves clarity, positioning, and modular structure.
- ✅ Demo script remains practical and client-facing quality is strong.
- ✅ Pricing teaser is non-committal and avoids hard first-touch pricing language.

### Blocking issues still active
- ❌ Version parity broken: only site pack moved to v46 while outreach/send-ops remain v45.
- ❌ Cadence conflict persists across policy + templates + playbook.
- ❌ First-touch outreach rules from playbook still not hard-enforced in outreach pack.
- ❌ SMS/TCPA operational controls still missing from send-ops queue.
- ❌ Legacy pricing in `MEMORY.md` still conflicts with active subscription model.
- ❌ Placeholder publishing risk still present in site demo pack.
- ❌ Token format inconsistency still unresolved.

---

## Findings (Evidence → Risk → Required Fix)

### 1) Release/version integrity regression (HIGH)
**Evidence**
- `templates/site_demo_pack_v46.md` exists.
- Outreach and ops files are still `templates/email_outreach_pack_v45.md` and `templates/send_ops_queue_v45.md`.

**Risk**
Mixed-version releases cause accidental use of stale templates and break QA traceability.

**Required fix**
Release triad together each cycle (`site/email/send_ops` same version tag) with a header-level release lock.

---

### 2) Cadence contradiction remains unresolved (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E: Day 1 / Day 5 / Day 10.
- `email_outreach_pack_v45.md`: Day 1 / Day 3 / Day 6 / Day 9 / Day 12.
- `memory/KNOWLEDGE.md` + cold email playbook: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup).

**Risk**
Execution drift, invalid A/B attribution, and operator confusion on sequence timing.

**Required fix**
Set one canonical cadence everywhere: **Day 0 / Day 3 / Day 10 (+ optional Day 17)**.

---

### 3) First-touch standards not enforced in outreach template (HIGH)
**Evidence**
- Playbook non-negotiables require: plain text, <100 words, one specific observation, visual link, no pricing, soft CTA.
- `email_outreach_pack_v45.md` says “under 120 words where possible” and includes templates that are generally longer; no in-file blocking gate.

**Risk**
Lower deliverability/reply rates and direct non-compliance with adopted outreach standard.

**Required fix**
Add blocking SEND GATE in outreach pack with explicit pass/fail checks before send.

---

### 4) STANDING_ORDERS pitch formula conflicts with no-first-touch-pricing policy (HIGH)
**Evidence**
- Section E pitch formula includes “Value prop + one stat + pricing + CTA.”
- `memory/KNOWLEDGE.md` + playbook explicitly prohibit first-touch pricing.

**Risk**
Two “authoritative” documents can instruct opposite behavior.

**Required fix**
Patch Section E to: observation + impact + proof + visual + soft CTA; pricing only after reply/interest.

---

### 5) SMS compliance gap in send ops queue (HIGH)
**Evidence**
- `send_ops_queue_v45.md` includes call + SMS snippets and cadence, but lacks: STOP language, suppression workflow, quiet-hours enforcement, and compliance logging fields.

**Risk**
Regulatory exposure (TCPA/CAN-SPAM analog SMS expectations), complaint risk, and sender reputation damage.

**Required fix**
Embed mandatory SMS compliance block + suppression process directly in queue template.

---

### 6) Legacy pricing contradiction in MEMORY (HIGH)
**Evidence**
- `MEMORY.md` still contains active-sounding legacy model entries (“OUR PRICE: $250”, “close at $250 + $10/mo”).
- Active current model in `STANDING_ORDERS.md` and `memory/KNOWLEDGE.md` is `$0 down + $99/$199/$299` monthly tiers.

**Risk**
Quote inconsistency and trust erosion in active sales conversations.

**Required fix**
Add deprecation banner in `MEMORY.md` and declare pricing source-of-truth precedence.

---

### 7) Site demo placeholder leakage risk persists (MEDIUM)
**Evidence**
- `site_demo_pack_v46.md` still contains placeholders for metric/testimonial/logo blocks.
- No explicit “do not publish/send with placeholders” gate.

**Risk**
Client-facing credibility damage if placeholders leak into live demos or outbound material.

**Required fix**
Add pre-publish blocker checklist to site pack.

---

### 8) Personalization token syntax inconsistency (LOW)
**Evidence**
- Outreach pack: `[FirstName]` style.
- Send-ops SMS snippets: `{{client}}` style.

**Risk**
Substitution/merge errors and ops mistakes during rapid sends.

**Required fix**
Standardize token format across sales assets (recommend `{token_name}`).

---

## Fix Pack (Ready to Apply)

### A) Release Lock Block (add to all three templates)
```md
## RELEASE LOCK
This asset is part of release `{version}`.
Required companion files:
- `templates/site_demo_pack_{version}.md`
- `templates/email_outreach_pack_{version}.md`
- `templates/send_ops_queue_{version}.md`
If versions do not match exactly: do not send.
```

### B) Canonical Cadence Block (add to STANDING_ORDERS + outreach pack)
```md
## Canonical Outreach Cadence (Single Source of Truth)
- Day 0: First touch
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
No alternate cadence allowed in sales templates.
```

### C) STANDING_ORDERS Pitch Formula Patch (Section E)
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — quick idea"
- Body: 4-5 short sentences. One specific observation + one impact line + one proof line.
- Visual: One live preview/screenshot link.
- CTA: One soft question.
- Pricing: Do NOT include in first touch; share only after interest/reply.
```

### D) Outreach SEND GATE (add to `email_outreach_pack_v46.md`)
```md
## SEND GATE — BLOCKING
- Plain text only
- Body <100 words
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA
- Visual proof link included and click-tested
- No first-touch pricing
- No unresolved placeholders
- Follow-ups pre-written: Day 3, Day 10, optional Day 17
If any check fails: DO NOT SEND.
```

### E) SMS Compliance Block (add to `send_ops_queue_v46.md`)
```md
## SMS COMPLIANCE (MANDATORY)
- Identify sender/business in first SMS.
- Include opt-out instruction where required: "Reply STOP to opt out."
- Respect recipient-local legal contact windows.
- On STOP/opt-out/revocation/complaint: immediate suppression + halt outbound.
- Log suppression event before any future attempt.

Suppression log fields:
lead_id, phone, channel, event_type, source, timestamp_local, operator
```

### F) Site Placeholder Publish Gate (add to `site_demo_pack_v46.md`)
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace all placeholder metrics/testimonials/logos before send.
- If any placeholder remains: do not publish or send.
```

### G) Pricing Deprecation Banner (add near top of `MEMORY.md`)
```md
### Pricing Source of Truth (Effective Immediately)
- Active website model: $0 down + monthly tiers ($99/$199/$299).
- Legacy "$250" and "$250 + $10/mo" references are historical only.
- If conflict exists, `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` govern.
```

### H) Token Standard Block (add to outreach + send-ops)
```md
## Personalization Token Standard
Use `{token_name}` only across all sales assets.
Disallow mixed `[token]` and `{{token}}` formats.
```

---

## Pass/Fail Checklist (v46)

### Release Integrity
- [ ] **FAIL** All current sales templates share same version tag (`site/email/send_ops`).
- [ ] **FAIL** Release lock blocker embedded in each template.

### Policy & Cadence Consistency
- [ ] **FAIL** Single Day 0/3/10(+17) cadence enforced across `STANDING_ORDERS`, `KNOWLEDGE`, playbook, and outreach pack.
- [ ] **FAIL** `STANDING_ORDERS` pitch formula aligned with no-first-touch-pricing rule.

### Cold Email Quality Enforcement
- [ ] **FAIL** Outreach pack hard-enforces plain text + <100 words + one observation + soft CTA + visual link + no first-touch pricing.
- [ ] **FAIL** Outreach sequence aligns to Day 0/3/10(+17).

### SMS Compliance Enforcement
- [ ] **FAIL** STOP/opt-out and suppression rules embedded in send-ops queue.
- [ ] **FAIL** Legal-window/quiet-hours enforcement defined.
- [ ] **FAIL** Compliance logging schema embedded.

### Site Demo QA
- [x] **PASS** Site messaging quality and structure improved in v46.
- [ ] **FAIL** Pre-publish placeholder blocker embedded in template.

### Pricing Consistency
- [x] **PASS** Current monthly subscription model is clearly present in policy/knowledge files.
- [ ] **FAIL** Legacy pricing in `MEMORY.md` formally deprecated.

### Template Hygiene
- [ ] **FAIL** Single token syntax enforced across outreach + send-ops assets.

---

## Final QA Decision
**v46 Enforcement Result: FAIL**  
Primary blockers are still cross-file policy conflicts (cadence + pricing), missing outbound enforcement gates, and SMS compliance controls. Fix pack above is implementation-ready.
