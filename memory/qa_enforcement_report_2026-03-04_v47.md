# QA Enforcement Report — Sales Assets
**Version:** v47  
**Date:** 2026-03-04  
**Scope:** Recent sales templates + memory/policy guidance consistency, compliance, and quality audit.

## Assets Reviewed
- `templates/site_demo_pack_v47.md`
- `templates/site_demo_pack_v46.md`
- `templates/email_outreach_pack_v46.md`
- `templates/send_ops_queue_v46.md`
- `memory/qa_enforcement_report_2026-03-04_v46.md` (baseline)
- `STANDING_ORDERS.md` (Section E)
- `memory/KNOWLEDGE.md` (Cold Email Outreach Standard)
- `MEMORY.md` (legacy pricing/history content)
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`

---

## Executive Verdict
**Overall status: FAIL (v47 copy quality improved, but governance/compliance blockers remain unresolved).**

### What improved
- ✅ `site_demo_pack_v47.md` has stronger homepage/service framing vs v46.
- ✅ Demo script remains clear and client-usable.
- ✅ Messaging is generally outcome-oriented and avoids obvious hype.

### What still blocks pass
- ❌ Version parity still broken (site is v47 while outreach/send-ops are v46).
- ❌ Cadence conflict still exists across policy vs playbook/template.
- ❌ First-touch rules (<100 words, no pricing, strict gate) not enforced in outreach pack.
- ❌ SMS/TCPA controls still missing from send-ops queue.
- ❌ `STANDING_ORDERS.md` pitch formula still explicitly says include pricing in first email.
- ❌ `MEMORY.md` still contains active-looking legacy pricing/playbook language ($250 close model).
- ❌ Site pack still has publish-time placeholders with no hard pre-publish blocker.

---

## Findings (Evidence → Risk → Fix)

### 1) Release integrity mismatch (HIGH)
**Evidence:** `site_demo_pack_v47.md` exists; no `email_outreach_pack_v47.md` or `send_ops_queue_v47.md`.

**Risk:** Operators mix stale and current assets; QA traceability breaks.

**Fix:** Enforce release triad lock (`site/email/send_ops` must share exact version).

---

### 2) Cadence contradiction (HIGH)
**Evidence:**
- `STANDING_ORDERS.md`: Day 1 / Day 5 / Day 10
- `memory/KNOWLEDGE.md` + playbook: Day 0 / Day 3 / Day 10 (+ optional Day 17)
- `email_outreach_pack_v46.md`: Day 2 / 4 / 7 / 12 / 20

**Risk:** Inconsistent sequencing, bad attribution, execution drift.

**Fix:** Standardize to **Day 0 / Day 3 / Day 10 (+ optional Day 17)** in all sales-facing docs.

---

### 3) First-touch policy conflict in primary ops doc (HIGH)
**Evidence:** `STANDING_ORDERS.md` pitch formula: “Value prop + one stat + pricing + CTA.”

**Risk:** Direct contradiction with `KNOWLEDGE` + playbook no-first-touch-pricing rule.

**Fix:** Replace with observation + impact + proof + visual + soft CTA; pricing only after reply.

---

### 4) Outreach pack lacks hard send-gate enforcement (HIGH)
**Evidence:** `email_outreach_pack_v46.md` deployment notes say “under ~120 words when possible” and uses 5-touch cadence that conflicts with standard.

**Risk:** Lower deliverability/reply rates + non-compliance with adopted playbook.

**Fix:** Add blocking SEND GATE: plain text, <100 words, one verifiable observation, one soft CTA, visual proof link, no first-touch pricing, cadence 0/3/10(+17).

---

### 5) SMS compliance control gap (HIGH)
**Evidence:** `send_ops_queue_v46.md` has SMS snippets/windows but no mandatory STOP language/process, suppression rules, or compliance log schema.

**Risk:** TCPA/comms complaint exposure and sender reputation damage.

**Fix:** Add mandatory SMS compliance block + suppression workflow fields before next send wave.

---

### 6) Legacy pricing ambiguity in memory guidance (MEDIUM-HIGH)
**Evidence:** `MEMORY.md` still includes active-sounding lines like “OUR PRICE: $250” and “close at $250 + $10/mo,” while current pricing source is $0 down + $99/$199/$299 in standing orders/knowledge.

**Risk:** Quote inconsistency and trust damage in live sales conversations.

**Fix:** Add explicit deprecation banner and source-of-truth precedence note in `MEMORY.md`.

---

### 7) Placeholder leak risk in site pack (MEDIUM)
**Evidence:** `site_demo_pack_v47.md` includes unresolved placeholders for stats/case studies/testimonials/logos without blocker text.

**Risk:** Placeholder content can leak into client-facing materials.

**Fix:** Add pre-publish hard gate: “No placeholders in outbound/live pages.”

---

## Fix Pack (Ready to Paste)

### A) Release Lock (add to all three template files)
```md
## RELEASE LOCK
This asset is part of release `{version}`.
Required companion files:
- `templates/site_demo_pack_{version}.md`
- `templates/email_outreach_pack_{version}.md`
- `templates/send_ops_queue_{version}.md`
If versions do not match exactly: do not send.
```

### B) Canonical Cadence (replace conflicting cadence lines)
```md
## Canonical Outreach Cadence
- Day 0: First touch
- Day 3: Follow-up 1
- Day 10: Follow-up 2
- Day 17: Optional breakup
No alternate cadence allowed in outbound templates.
```

### C) STANDING_ORDERS Pitch Formula patch
```md
## The Pitch Formula (Email)
- Subject: "[Business Name] — quick idea"
- Body: 4-5 short sentences; one specific observation + impact + proof.
- Visual: one live preview/screenshot link.
- CTA: one soft question.
- Pricing: never in first touch; introduce only after reply/interest.
```

### D) Outreach SEND GATE (append to outreach pack)
```md
## SEND GATE — BLOCKING
- Plain text only
- Body <100 words
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA
- Visual proof link included + click-tested
- No first-touch pricing
- No unresolved placeholders/tokens
- Follow-ups pre-written on Day 3 and Day 10 (+ optional Day 17)
If any item fails: DO NOT SEND.
```

### E) SMS Compliance Gate (append to send ops queue)
```md
## SMS COMPLIANCE — MANDATORY
- Identify sender/business in opening message.
- Include opt-out language when required ("Reply STOP to opt out").
- Respect recipient local contact windows.
- On STOP/opt-out/complaint: immediate suppression and halt all outbound.
- Log suppression before any future attempt.

Suppression log fields:
lead_id, phone, event_type, source, timestamp_local, operator
```

### F) MEMORY deprecation header
```md
### Pricing Source of Truth (Effective Immediately)
- Active offer model: $0 down + monthly tiers ($99/$199/$299).
- Legacy "$250" and "$250 + $10/mo" notes are historical context only.
- If conflict exists, `STANDING_ORDERS.md` + `memory/KNOWLEDGE.md` govern.
```

### G) Site pre-publish blocker
```md
## PRE-PUBLISH QA GATE (BLOCKER)
- No placeholder values/tokens in any client-facing output.
- Replace all [XX], [Client Name], [Industry], and similar placeholders before send.
- If any placeholder remains: do not publish or send.
```

---

## Pass/Fail Checklist (v47)

### Release Integrity
- [ ] **FAIL** Site/email/send-ops files share same version tag.
- [ ] **FAIL** Release lock block exists in each template.

### Policy Consistency
- [ ] **FAIL** Single Day 0/3/10(+17) cadence is consistent across `STANDING_ORDERS`, `KNOWLEDGE`, playbook, outreach pack.
- [ ] **FAIL** `STANDING_ORDERS` first-touch formula aligns with no-first-touch-pricing rule.

### Outreach Quality Enforcement
- [ ] **FAIL** Outreach pack has hard SEND GATE enforcing <100 words and one-observation/one-CTA structure.
- [ ] **FAIL** Outreach follow-up schedule matches canonical cadence.

### SMS Compliance
- [ ] **FAIL** Send ops queue includes STOP/opt-out and suppression workflow.
- [ ] **FAIL** Quiet-hours/local-time rules are explicit.
- [ ] **FAIL** Compliance logging schema is present.

### Site Demo QA
- [x] **PASS** v47 site messaging quality/clarity improved vs v46.
- [ ] **FAIL** Pre-publish placeholder blocker is embedded.

### Pricing Governance
- [x] **PASS** Current monthly pricing model appears in primary policy/knowledge files.
- [ ] **FAIL** Legacy pricing in `MEMORY.md` is formally deprecated.

---

## Final QA Decision
**v47 Enforcement Result: FAIL**  
Core blockers are governance conflicts (cadence + first-touch pricing), missing outbound send gates, and missing SMS compliance controls. The fix pack above is implementation-ready and can bring next release to PASS if applied consistently.