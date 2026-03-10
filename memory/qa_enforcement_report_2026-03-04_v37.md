# QA Enforcement Report — Sales Assets
**Version:** v37  
**Date:** 2026-03-04  
**Scope:** Consistency, compliance, and quality QA across latest sales templates + memory guidance

## Assets Reviewed
- `templates/email_outreach_pack_v36.md`
- `templates/send_ops_queue_v36.md`
- `templates/site_demo_pack_v37.md`
- `memory/KNOWLEDGE.md`
- `memory/CRITICAL_RULES.md`
- `MEMORY.md`
- `STANDING_ORDERS.md`
- Baseline reference: `memory/qa_enforcement_report_2026-03-04_v32.md`

---

## Executive Verdict
**Overall status: FAIL** (improved asset quality, but policy contradictions + compliance gaps still block full send-safe status).

### Delta vs v32
- ✅ `send_ops_queue` now aligned to v36 (version gap from v32 resolved at that point).
- ❌ Bundle drift reintroduced: `site_demo_pack` moved to **v37** while `email_outreach_pack` and `send_ops_queue` remain **v36**.
- ❌ Cadence conflicts remain unresolved across authority docs/templates.
- ❌ SMS legal/compliance block still absent from `send_ops_queue_v36.md`.
- ❌ Placeholder/publish blocker still missing in `site_demo_pack_v37.md`.
- ❌ Pricing guidance conflicts remain between `MEMORY.md`, `KNOWLEDGE.md`, and `STANDING_ORDERS.md`.

---

## Findings

### 1) Canonical cadence conflict (HIGH)
**Evidence**
- `STANDING_ORDERS.md` Section E: **Day 1 / Day 5 / Day 10**
- `memory/KNOWLEDGE.md`: **Day 0 / Day 3 / Day 10 (+ optional Day 17)**
- `templates/email_outreach_pack_v36.md`: follow-ups every **2–4 business days**

**Risk**
- Execution drift, weak comparability, inconsistent follow-up behavior.

**Required fix**
- Publish one canonical cadence and enforce exact wording in all sales templates.

---

### 2) First-touch policy conflict (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` standard: first-touch plain-text, **<100 words**, one business-specific observation, no first-touch pricing.
- `templates/email_outreach_pack_v36.md` says **80–140 words** and does not enforce one verifiable business observation per first-touch.

**Risk**
- Non-compliant outbound and lower response quality due to generic messaging.

**Required fix**
- Hard gate in email pack: first-touch <=100 words, one verifiable observation, one CTA, no pricing.

---

### 3) Pricing guidance contradiction (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md`: current website offer = **$0 down + $99/$199/$299 monthly**.
- `STANDING_ORDERS.md` pitch formula includes pricing in first touch (conflicts with no first-touch pricing guidance).
- `MEMORY.md` still contains active pipeline/pricing language with **$250 + $10/mo** and $250 close framing.

**Risk**
- Quote inconsistency, trust erosion, operator confusion.

**Required fix**
- Mark $250 model as historical/deprecated; define one active pricing source of truth and one first-touch pricing rule.

---

### 4) SMS/TCPA controls missing in send-ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v36.md` includes call/SMS fallback actions but lacks explicit:
  - sender identification requirement,
  - opt-out/STOP handling,
  - suppression list schema,
  - immediate-halt protocol on complaint/revocation.

**Risk**
- Legal/compliance exposure and sender reputation damage.

**Required fix**
- Add mandatory SMS compliance block + suppression logging schema at top of queue template.

---

### 5) Release integrity drift (MEDIUM)
**Evidence**
- `site_demo_pack_v37.md` exists, but email/send-ops remain at `v36`.

**Risk**
- Mixed policy generations in one outbound cycle.

**Required fix**
- Keep bundle versions synchronized or publish a release manifest that explicitly pins approved mixed versions.

---

### 6) Site demo placeholder and proof-risk controls missing (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v37.md` still has placeholder stats/testimonials (`XX%`, `X hrs/week`, `[Client Name]`).
- No hard “do not publish/send if placeholders remain” gate.

**Risk**
- Placeholder leakage or unverified proof claims in client-facing assets.

**Required fix**
- Add pre-publish blocker requiring all placeholders replaced with verified values or removed.

---

### 7) Quality checks that PASS
- ✅ `email_outreach_pack_v36.md`: no first-touch pricing language in templates.
- ✅ Email templates generally maintain single-CTA structure.
- ✅ `send_ops_queue_v36.md` has clear prioritization and trigger-based follow-up logic.
- ✅ `site_demo_pack_v37.md` has coherent conversion-oriented structure and usable microcopy.

---

## Fix Pack (copy/paste)

### A) Canonical cadence block (add to authority docs + template headers)
```md
## Canonical Outreach Cadence (Single Source)
- First touch: Day 0
- Follow-up 1: Day 3
- Follow-up 2: Day 10
- Optional breakup: Day 17
- All templates/queues must match this exactly.
```

### B) Email send gate (add to top of `templates/email_outreach_pack_v36.md` or next version)
```md
## SEND GATE — NON-NEGOTIABLE
- First-touch body <=100 words
- Plain-text first touch
- Exactly 1 verifiable business-specific observation
- Exactly 1 CTA
- No first-touch pricing
- No unresolved placeholders
- Cadence must match canonical policy
- If any check fails: DO NOT SEND
```

### C) SMS compliance block (add to top of `templates/send_ops_queue_v36.md` or next version)
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

### D) Site pre-publish blocker (add to `templates/site_demo_pack_v37.md` or next version)
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens in client-facing output.
- Replace all proof stats/testimonials with verified values, or remove them.
- If any placeholder remains, do not send/publish.
```

### E) Pricing harmonization patch (`MEMORY.md`)
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound model: $0 down + monthly tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250" and "$250 + $10/mo" references are historical only, not for new outbound.
- If pricing docs conflict, `memory/KNOWLEDGE.md` + `STANDING_ORDERS.md` (post-harmonization) govern.
```

### F) Release manifest requirement
```md
## Release Manifest (Required Per Cycle)
- Bundle version: email/site/send_ops versions listed together
- Owner + timestamp + status (draft/send-ready)
- If mismatch/missing approval: HOLD outbound
```

---

## Pass/Fail Checklist (v37)

### Release Integrity
- [ ] **FAIL** Version-aligned trio exists (site v37 vs email/send-ops v36)
- [ ] **FAIL** Release manifest exists for active bundle

### Cold Email Compliance
- [x] **PASS** No first-touch pricing in current email templates
- [x] **PASS** Single-CTA structure generally present
- [ ] **FAIL** Hard send-gate criteria embedded in template
- [ ] **FAIL** <=100-word first-touch rule enforced
- [ ] **FAIL** One verifiable business observation rule enforced
- [ ] **FAIL** Canonical cadence aligned to authority docs

### SMS/TCPA Controls
- [ ] **FAIL** Sender ID + opt-out rules embedded
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Complaint/revocation immediate-halt rule embedded

### Policy Consistency
- [ ] **FAIL** Pricing source-of-truth harmonized (`MEMORY.md` conflict remains)
- [ ] **FAIL** Cadence source-of-truth harmonized

### Site QA
- [x] **PASS** Core offer/copy structure quality is strong
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded

---

## Final QA Decision
**v37 Enforcement Result: FAIL**  
Do not run scaled outbound until the required fixes above are implemented and re-verified in a synchronized release bundle.