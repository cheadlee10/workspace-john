# QA Enforcement Report v2 — Sales Assets
**Date:** 2026-03-04  
**Owner:** John (QA enforcement subagent)  
**Scope:** Recent templates + memory guidance consistency/compliance/quality audit with fix directives.

---

## Executive Result
**Overall status: FAIL (remediation required before scale sends).**

Compared to the prior QA pass, new v2 packs improved structure and readability, but **policy-level contradictions still exist** between `playbooks/`, `memory/`, and active outreach templates. These conflicts can cause non-compliant first touches, inconsistent pricing signals, and deliverability/legal risk.

---

## Files Reviewed (this enforcement pass)

### Memory / policy guidance
- `memory/KNOWLEDGE.md`
- `memory/observations.md`
- `MEMORY.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`

### Active sales templates
- `templates/email_outreach_pack_v2.md`
- `templates/site_demo_pack_v2.md`
- `templates/send_ops_queue.md`
- `templates/email_outreach_pack.md`
- `templates/site_demo_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

---

## Critical Findings + Fixes

## P0 (Blockers)

### F1) First-touch pricing prohibition still violated in active templates
**Policy source:**
- `memory/KNOWLEDGE.md` + Cold Email Playbook: **no pricing in first touch**.

**Violations found:**
- `templates/email-variations.md` (`$0 down, $99/mo` in first-touch templates)
- `templates/outreach-nosite-template-pack.md` (`$500/$1,000/$2,000` mentioned in first-touch)

**Risk:** Immediate policy drift + lower reply quality + pre-qualification rejection.

**Fix directive:**
- Remove all price mentions from first-touch templates.
- Restrict pricing to follow-up/proposal stages only.
- Add header to both files: `FIRST TOUCH RULE: NO PRICING`.

---

### F2) Visual-proof requirement not enforced across outreach assets
**Policy source:**
- Playbook Rule 2 + KNOWLEDGE standard: every web-design outreach must include visual proof.

**Violations found:**
- `templates/outreach-nosite-template-pack.md` first-touch templates do not require preview/screenshot URL.
- `templates/send_ops_queue.md` message snippets are website-pitch oriented but not proof-linked.

**Risk:** Lower conversion and direct policy non-compliance.

**Fix directive:**
- Add mandatory token `{{VISUAL_PROOF_URL}}` to web-design first-touch templates.
- Add send blocker: `DO NOT SEND if visual proof token is empty or unverified`.

---

### F3) Cold-email format conflict: HTML branding rule vs plain-text outreach rule
**Conflict source:**
- `MEMORY.md`: “All client communications must use branded email template (`website/EMAIL_TEMPLATE.html`)”
- Playbook/KNOWLEDGE: cold outreach must be plain-text.

**Risk:** Team executes wrong format, hurting deliverability and violating adopted playbook.

**Fix directive (policy precedence):**
1. **Cold outbound first touch + follow-up outreach:** plain-text only.
2. **Post-response nurture/proposals/client delivery:** branded HTML allowed.
3. Add this precedence block to `MEMORY.md` and `memory/KNOWLEDGE.md`.

---

## P1 (High-impact consistency gaps)

### F4) Follow-up cadence drift across templates
**Reference standard:** 3-7-7 (+ optional breakup Day 17).

**Drift found:**
- `templates/email_outreach_pack.md` suggests Day 1/3/6/10/14.
- `templates/email_outreach_pack_v2.md` says “3 follow-ups minimum” and includes 5 variants without explicit 3-7-7 mapping.

**Risk:** inconsistent execution analytics; harder QA enforcement.

**Fix directive:**
- Add canonical cadence block to both packs:
  - Day 0 first touch
  - Day 3 follow-up #1
  - Day 10 follow-up #2
  - Day 17 breakup (optional)
- Mark extra variants as alternatives, not additional mandatory sends.

---

### F5) Compliance checklist missing in most send templates
**Playbook requirements present but not template-embedded:**
- opt-out language
- physical address requirement (email compliance)
- encoding lint / smart-quote scrub
- link verification

**Risk:** CAN-SPAM/process failures, poor deliverability hygiene.

**Fix directive:**
- Append `Pre-Send Compliance Checklist` section to:
  - `templates/email_outreach_pack_v2.md`
  - `templates/email_outreach_pack.md`
  - `templates/outreach-nosite-template-pack.md`
- Include mandatory checks: personalization fact, link test, encoding clean, opt-out line, sender identity.

---

### F6) Placeholder leakage risk still present in demo/copy assets
**Found in:**
- `templates/site_demo_pack.md` (`[XX]`, `[Client Name]`, etc.)
- `templates/site_demo_pack_v2.md` placeholder-heavy trust blocks.

**Risk:** accidental outbound with unresolved placeholders.

**Fix directive:**
- Add top-of-file SEND BLOCKER:
  - `No send/publish allowed if bracket or token placeholders remain.`
- Add quick regex check note (e.g., `\[[^\]]+\]|\{\{[^}]+\}\}`).

---

## P2 (Quality improvements)

### F7) Word-count and CTA discipline not encoded in v2 pack
**Policy says:** first-touch <100 words, soft CTA.

**Observed:**
- Several `email_outreach_pack_v2.md` first-touch templates run long and request direct booking calls.

**Fix directive:**
- Mark templates as either:
  - `Cold First Touch (strict <100 words, soft CTA)` or
  - `Warm/Follow-up variant`.
- Add word-count lint step before send.

---

### F8) Stats/claims not consistently source-tagged
**Observed:**
- Outcome claims appear in several templates without evidence field.

**Fix directive:**
- Add token requirement for any quantitative claim: `{{CLAIM_SOURCE}}` (internal note, not necessarily sent).
- Prohibit unsourced numeric claims in first-touch.

---

## Pass/Fail Enforcement Checklist

| Control | Status | Notes |
|---|---|---|
| No pricing in first-touch outreach | **FAIL** | Violated in `email-variations.md` and `outreach-nosite-template-pack.md` |
| Mandatory visual proof in web-design outreach | **FAIL** | Not enforced in key web-design templates/queue snippets |
| Plain-text cold-email precedence documented | **FAIL** | `MEMORY.md` HTML mandate conflicts with playbook |
| Canonical 3-7-7 cadence standardized | **FAIL** | Multiple cadence variants active |
| Pre-send compliance checklist embedded in templates | **FAIL** | Missing in most active templates |
| Placeholder send-blockers included | **FAIL** | Demo packs still placeholder-leak prone |
| First-touch word-count + soft CTA enforcement | **FAIL** | v2 includes long/direct-booking variants without labeling |
| Claim substantiation mechanism present | **FAIL** | No consistent source-token enforcement |
| v2 template readability/scannability | **PASS** | Improved structure and usability |
| Send-ops prioritization logic quality | **PASS** | Queue is clear, prioritized, and executable |

**Summary:** **2 PASS / 8 FAIL**

---

## Remediation Order (Do in sequence)
1. Patch first-touch pricing violations (P0).  
2. Add mandatory visual-proof token + send blocker (P0).  
3. Resolve policy precedence conflict (plain-text outbound vs HTML nurture) in `MEMORY.md` + `KNOWLEDGE.md` (P0).  
4. Standardize cadence to 3-7-7 across outreach packs (P1).  
5. Embed compliance checklist + placeholder blocker in all outbound/demo packs (P1).  
6. Split v2 templates into cold-first-touch vs warm-follow-up classes; enforce word-count lint (P2).

---

## Final Enforcement Decision
**Not approved for fully scaled outreach until P0 items are remediated.**  
After P0 patches, rerun QA and allow controlled scale-up with checklist gating.