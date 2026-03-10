# QA Enforcement Report — Sales Assets
**Version:** v26  
**Date:** 2026-03-04  
**Scope:** Recent sales templates + memory guidance consistency, compliance, and quality enforcement.

---

## Executive Verdict
**Overall status: FAIL (blocking compliance + governance gaps remain).**

### Delta vs v25
- ✅ New `templates/site_demo_pack_v26.md` is high quality and structurally usable.
- ❌ Active pack is now **version-misaligned** (`site_demo_pack_v26.md` + `email_outreach_pack_v25.md` + `send_ops_queue_v25.md`).
- ❌ Cold-email/SMS compliance gates are still not embedded in active send assets.
- ❌ Policy contradictions remain across `MEMORY.md`, `memory/KNOWLEDGE.md`, and active templates.

---

## Assets Reviewed (v26 pass)
- `templates/site_demo_pack_v26.md`
- `templates/email_outreach_pack_v25.md`
- `templates/send_ops_queue_v25.md`
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- `STANDING_ORDERS.md`
- `memory/CRITICAL_RULES.md`
- `TOOLS.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Active send bundle version mismatch (HIGH)
**Evidence**
- `templates/site_demo_pack_v26.md` updated
- `templates/email_outreach_pack_v25.md` and `templates/send_ops_queue_v25.md` still on v25

**Risk**
- Operators pull mixed guidance; QA signoff cannot cleanly map to one release.

**Required fix**
- Ship synchronized `email_outreach_pack_v26.md` + `send_ops_queue_v26.md` in same release window.

---

### 2) Canonical cold-email rules still not hard-gated in active outreach file (HIGH)
**Evidence**
- `memory/KNOWLEDGE.md:86-88` enforces visual proof + no first-touch pricing + 3-7-7 cadence.
- `templates/email_outreach_pack_v25.md` does not contain a mandatory send-gate block that enforces those rules.

**Risk**
- Non-canonical sends at scale (cadence drift, missing proof, placeholder sends).

**Required fix**
- Add explicit non-negotiable send-gate at top of active outreach pack.

---

### 3) SMS compliance controls missing in send queue (HIGH)
**Evidence**
- `templates/send_ops_queue_v25.md:10` sets `SMS first -> call fallback...` but includes no sender-ID/STOP/suppression requirements.
- `MEMORY.md:365` claims TCPA compliance and opt-out respect, but operational template lacks enforcement.
- `TOOLS.md:11-12` says Twilio is trial/verified-number constrained; queue assumes broad outbound capability.

**Risk**
- Legal exposure (TCPA/state rules), complaint risk, and possible carrier/account enforcement action.

**Required fix**
- Add mandatory SMS compliance block + suppression process + trial-account constraint warning at top of send queue.

---

### 4) Unverified social-proof claim in active email templates (HIGH)
**Evidence**
- `templates/email_outreach_pack_v25.md:94,100` includes `+22% response rate` claim.
- `STANDING_ORDERS.md` requires proof-based reporting and evidence discipline.

**Risk**
- Trust/compliance risk if claim cannot be substantiated by case evidence.

**Required fix**
- Replace with placeholder token requiring proof link, or remove numeric claim entirely.

---

### 5) Email body format conflict with standing rules (MEDIUM)
**Evidence**
- `STANDING_ORDERS.md:99,101,105` requires max 7 sentences, one CTA button, no bullet lists in email body.
- `templates/email_outreach_pack_v25.md` includes first-touch body bullets (`Typical outcomes:` + bullet list).

**Risk**
- Team sends copy that violates active operating rules.

**Required fix**
- Provide a “STANDING_ORDERS-safe” variant pack (plain sentence format, one CTA line).

---

### 6) Pricing strategy contradiction in memory guidance (MEDIUM)
**Evidence**
- `memory/KNOWLEDGE.md:33,43` = $0 down subscription with 12-month minimum.
- `MEMORY.md:466,556` still references close target `$250 + $10/mo`.

**Risk**
- Inconsistent quoting and avoidable objection loops.

**Required fix**
- Establish one pricing source of truth and mark legacy model as deprecated.

---

### 7) Site demo pack still contains unguarded placeholders (LOW)
**Evidence**
- `templates/site_demo_pack_v26.md` includes `[XX]` metrics and placeholder logos/testimonials.

**Risk**
- If published without replacement, credibility drops.

**Required fix**
- Add pre-publish block: `No placeholders allowed in production-facing deliverables`.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v26.md` narrative quality is strong and sales-usable.
- `templates/send_ops_queue_v25.md` prioritization and execution sequencing are operationally clear.
- `memory/KNOWLEDGE.md` correctly captures key canonical cold-email standards.

---

## Fix Pack (Copy/Paste Ready)

### A) Add to top of `templates/email_outreach_pack_v26.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No send if placeholders remain
- Cadence lock: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
- For website/no-site outreach: include 1 visual proof URL
- Any metric claim must include internal proof reference ID
```

### B) Replace unverified claim in `templates/email_outreach_pack_v26.md`
```md
Result: [insert verified metric + proof ID] and faster deal cycles in under 30 days.
```
(If no proof exists, remove numeric claim.)

### C) Add to top of `templates/send_ops_queue_v26.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First message must identify sender + company.
- Include opt-out language where required (e.g., "Reply STOP to opt out").
- Send only in recipient-local legal send windows.
- On STOP/complaint/revocation: immediate suppression, no further sends.
- Twilio trial guardrail: only send to verified numbers until account upgrade/approval.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### D) Add to `memory/KNOWLEDGE.md`
```md
### Pricing Source of Truth (Effective Immediately)
- Primary outbound offer model: $0 down, subscription tiers ($99/$199/$299), 12-month minimum.
- Legacy "$250 + $10/mo" model is deprecated and not used in new outbound.
```

### E) Add to `templates/site_demo_pack_v26.md`
```md
## PRE-PUBLISH QA GATE
- No [XX], [Client Name], or placeholder tokens allowed in production.
- Replace all proof placeholders with verified metrics or remove section.
```

### F) Governance file to create
- `templates/release_manifest.md` with one approved bundle:
  - `site_demo_pack_v26.md`
  - `email_outreach_pack_v26.md`
  - `send_ops_queue_v26.md`

---

## Pass/Fail Checklist (v26)

### A) Release Integrity
- [ ] **FAIL** Core assets are version-aligned in one bundle (all v26)
- [ ] **FAIL** Release manifest exists and names approved send-ready files

### B) Cold Email Compliance
- [ ] **FAIL** Send-gate block present in active outreach pack
- [ ] **FAIL** Canonical cadence (0/3/10 + optional 17) hard-enforced
- [ ] **FAIL** Visual-proof requirement hard-enforced for web/no-site outreach
- [ ] **FAIL** Metric claims require proof ID or are removed

### C) SMS/TCPA Compliance
- [ ] **FAIL** Sender-ID + STOP handling embedded in send ops
- [ ] **FAIL** Suppression schema/process embedded
- [ ] **FAIL** Recipient-local send-window guardrail embedded
- [ ] **FAIL** Twilio trial/verified-recipient constraint embedded

### D) Policy Consistency
- [ ] **FAIL** Pricing SOT resolves `$250 + $10/mo` vs subscription model conflict
- [ ] **FAIL** Standing-orders-safe email variants exist (no bullet list body conflicts)

### E) Quality Gates
- [x] **PASS** Site demo pack quality remains high
- [ ] **FAIL** Placeholder-blocking pre-publish gate embedded

**Current score:** **FAIL** (blocking issues: compliance enforcement missing, version drift, policy contradictions)

---

## Final QA Decision
**v26 Enforcement Result: FAIL — do not scale outbound volume until fixes A–F are implemented and version-synced.**
