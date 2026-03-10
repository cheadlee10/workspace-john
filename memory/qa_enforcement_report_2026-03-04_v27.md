# QA Enforcement Report — Sales Assets
**Version:** v27  
**Date:** 2026-03-04  
**Scope:** Recent templates + memory guidance consistency, compliance, and quality gates.

---

## Executive Verdict
**Overall status: FAIL (critical compliance and policy-consistency gaps still block scale).**

### Delta vs v26
- ✅ **Version sync fixed**: `site_demo_pack_v27.md`, `email_outreach_pack_v27.md`, `send_ops_queue_v27.md` are aligned.
- ✅ Prior unverified numeric social-proof claim removed from active outreach pack.
- ❌ Cold-email cadence conflicts remain across canonical sources.
- ❌ SMS compliance controls still missing in active send ops.
- ❌ Pricing source-of-truth conflict remains in memory guidance.
- ❌ Placeholder content in site/demo assets still lacks hard publish gate.

---

## Assets Reviewed (v27 pass)
- `templates/email_outreach_pack_v27.md`
- `templates/send_ops_queue_v27.md`
- `templates/site_demo_pack_v27.md`
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `STANDING_ORDERS.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Follow-up cadence contradiction across core guidance (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` mandates **3-7-7**: Day 0 / Day 3 / Day 10 (+ optional Day 17).
- `templates/email_outreach_pack_v27.md` defines Day 2 / Day 4 / Day 7 / Day 10 / Day 14.
- `STANDING_ORDERS.md` states Day 1 / Day 5 / Day 10 (three touches max).

**Risk**
- Team executes mixed cadences, inconsistent measurement, and broken QA comparability.

**Required fix**
- Publish one cadence as canonical and enforce it in templates + runbooks via send gate.

---

### 2) Cold-email non-negotiables not hard-gated in active outreach pack (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md` requires: first touch <100 words, one specific observation, one soft CTA, no first-touch pricing, visual proof for web-design outreach.
- `templates/email_outreach_pack_v27.md` has good copy but **no explicit mandatory send gate** block.

**Risk**
- Drift at volume (placeholder sends, extra CTAs, weak personalization, non-compliant first touch).

**Required fix**
- Add mandatory `SEND GATE — NON-NEGOTIABLE` section at top of active outreach template.

---

### 3) SMS legal/compliance controls absent from send ops queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v27.md` runs SMS-first execution but omits sender ID/opt-out/suppression/legal-window requirements.
- `MEMORY.md` claims TCPA compliance posture; active queue does not operationalize it.

**Risk**
- TCPA/state exposure, complaint risk, and messaging account/carrier penalties.

**Required fix**
- Add mandatory SMS compliance block + suppression log schema + STOP handling.

---

### 4) Pricing source-of-truth conflict remains unresolved (MEDIUM)
**Evidence**
- `memory/KNOWLEDGE.md`: $0 down subscription tiers with 12-month minimum.
- `MEMORY.md`: repeated legacy close model `$250 + $10/mo`.

**Risk**
- Inconsistent quotes, objection friction, and lower trust.

**Required fix**
- Mark legacy model deprecated in `MEMORY.md` and point to one pricing SOT.

---

### 5) Site/demo placeholders still lack release-blocking gate (MEDIUM)
**Evidence**
- `templates/site_demo_pack_v27.md` includes `[XX]/[YY]/[ZZ]`, testimonial placeholders, trust badge placeholders.
- File labels placeholders but does not include hard “do-not-publish” enforcement section.

**Risk**
- Placeholder leakage in client-facing assets.

**Required fix**
- Add `PRE-PUBLISH QA GATE` with explicit block condition.

---

### 6) Recent queued email batch format conflicts with standing email rules (MEDIUM)
**Evidence**
- `email-templates/next-queued-email-assets-2026-03-03-batch117.md` bodies include bullet link lines inside email body and multiple CTA options per lead.
- `STANDING_ORDERS.md` says one CTA and no bullet lists in email body.

**Risk**
- Sends violate standing format rules and reduce template governance consistency.

**Required fix**
- Add a “standing-orders-safe” export mode for queued batch files (single CTA line, no body bullets).

---

## Positive Findings (PASS)
- v27 release files are synchronized across the three core template assets.
- Outreach copy quality is generally clean, readable, and personalization-token ready.
- Site demo pack remains strong for positioning and demo flow clarity.

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v27.md`
```md
## SEND GATE — NON-NEGOTIABLE (First Touch)
- Body must be <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No placeholders at send time
- Cadence lock: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
- Web/no-site outreach must include 1 visual proof URL (live preview or screenshot)
- Any metric claim must include internal proof reference ID
```

### B) Add to top of `templates/send_ops_queue_v27.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender + company.
- Include opt-out instruction where required (e.g., "Reply STOP to opt out").
- Send only in recipient-local legal send windows.
- On STOP/revocation/complaint: immediate suppression, no further outbound.
- Log suppression events before next send block starts.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### C) Add to `memory/KNOWLEDGE.md` and `MEMORY.md`
```md
### Pricing Source of Truth (Effective Immediately)
- Active outbound pricing model: $0 down, subscription tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250 + $10/mo" model is deprecated for new outbound and retained for historical context only.
```

### D) Add to `templates/site_demo_pack_v27.md`
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder tokens allowed in client-facing deliverables ([XX], [YY], [ZZ], [Client Name], etc.).
- Replace all proof placeholders with verified metrics OR remove that section.
- If any placeholder remains, do not send or publish.
```

### E) Add to queued email asset generator spec (`email-templates/*` output standard)
```md
## STANDING-ORDERS SAFE EMAIL FORMAT
- No bullet lists inside body
- One CTA line only
- Max 7 body sentences
- If visual proof links are needed, include as plain inline sentence links
```

---

## Pass/Fail Checklist (v27)

### A) Release Integrity
- [x] **PASS** Core assets are version-aligned in one bundle (all v27)
- [ ] **FAIL** Release manifest explicitly naming approved send-ready bundle exists

### B) Cold Email Compliance
- [ ] **FAIL** Send-gate block present in active outreach pack
- [ ] **FAIL** Canonical cadence hard-enforced in templates
- [ ] **FAIL** Visual-proof requirement hard-enforced for web/no-site outreach
- [ ] **FAIL** Metric claims require proof ID or are removed by rule

### C) SMS/TCPA Compliance
- [ ] **FAIL** Sender-ID + opt-out handling embedded in send ops
- [ ] **FAIL** Suppression schema/process embedded in active ops template
- [ ] **FAIL** Recipient-local legal send-window guardrail embedded

### D) Policy Consistency
- [ ] **FAIL** Pricing SOT conflict resolved across `MEMORY.md` and `memory/KNOWLEDGE.md`
- [ ] **FAIL** Standing-orders-safe email body format enforced in queued assets

### E) Quality Gates
- [x] **PASS** Site demo narrative quality is strong
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded

**Current score:** **FAIL** (blocking issues: cadence conflict + missing send/SMS compliance gates + unresolved pricing SOT mismatch)

---

## Final QA Decision
**v27 Enforcement Result: FAIL — do not increase outreach scale until Fix Pack A–E is implemented and re-checked.**