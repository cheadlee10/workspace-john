# QA Enforcement Report v3 — Sales Assets
**Date:** 2026-03-04  
**Owner:** John QA Enforcement (subagent)  
**Scope:** Recent sales templates + memory guidance consistency/compliance/quality check with corrective actions.

---

## Executive Decision
**Overall: FAIL (P0 blockers remain).**  
v2 assets improved structure, but enforcement-critical conflicts still exist between `memory/KNOWLEDGE.md`, `MEMORY.md`, and active outreach templates (`templates/*.md`).

---

## Files Reviewed (this pass)
- `memory/qa_enforcement_report_2026-03-04_v2.md`
- `memory/KNOWLEDGE.md`
- `memory/CRITICAL_RULES.md`
- `MEMORY.md`
- `templates/email_outreach_pack_v2.md`
- `templates/send_ops_queue_v2.md`
- `templates/site_demo_pack_v2.md`
- `templates/email_outreach_pack.md`
- `templates/send_ops_queue.md`
- `templates/site_demo_pack.md`
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`

---

## Findings and Required Fixes

## P0 — Blockers

### 1) First-touch pricing still present in active outbound templates
**Policy:** `memory/KNOWLEDGE.md` says no first-touch pricing.  
**Violations:**
- `templates/email-variations.md` ($0 down, $99/mo in first touch)
- `templates/outreach-nosite-template-pack.md` ($500/$1,000/$2,000 in early-stage outreach)
- `templates/send_ops_queue.md` snippets include first-touch "website + quote" framing and pricing-adjacent language

**Risk:** Policy non-compliance, reduced reply rate, premature price objection.

**Fix:**
- Remove all numeric pricing from first-touch templates.
- Add top banner in affected files: `FIRST TOUCH RULE: NO PRICING`.
- Move pricing to proposal/post-interest sections only.

---

### 2) Plain-text outreach rule conflicts with branded HTML mandate
**Conflict:**
- `MEMORY.md`: all client communications must use `website/EMAIL_TEMPLATE.html`
- `memory/KNOWLEDGE.md`: cold outreach must be plain-text

**Risk:** Team sends formatted/HTML cold email, hurting deliverability and violating adopted playbook.

**Fix (precedence):**
1. Cold outbound first touch + follow-ups = plain text only.
2. Post-reply nurture, proposals, delivery comms = branded HTML allowed.
3. Add this precedence block to both `MEMORY.md` and `memory/KNOWLEDGE.md`.

---

### 3) Visual proof enforcement still incomplete for website outreach
**Policy:** Web-design outreach must include proof (`live preview`/`screenshot`).  
**Gap:**
- `templates/outreach-nosite-template-pack.md` does not enforce `{{VISUAL_PROOF_URL}}`.
- `templates/send_ops_queue.md`/`send_ops_queue_v2.md` snippets are often idea-only without proof-link requirement.

**Risk:** Lower trust and response rate; inconsistent execution.

**Fix:**
- Add mandatory token: `{{VISUAL_PROOF_URL}}` for web-design first touch.
- Add send blocker: `DO NOT SEND if proof URL is empty/unverified`.

---

## P1 — High Priority

### 4) Cadence drift across packs (not standardized to 3-7-7)
**Standard:** Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup).  
**Drift:**
- `templates/email_outreach_pack.md` uses Day 1/3/6/10/14
- `templates/email_outreach_pack_v2.md` says "3 follow-ups minimum" and labels first follow-up "2 days later"

**Fix:**
- Standardize all packs to canonical 3-7-7 timeline.
- Mark extra variants as optional swaps, not extra mandatory touches.

---

### 5) Word-count policy drift in v2 cold emails
**Standard:** <100 words first touch.  
**Drift:** `templates/email_outreach_pack_v2.md` says keep under ~130 and includes several >100-word variants.

**Fix:**
- Relabel sections:
  - `Cold First Touch (strict <100 words)`
  - `Warm/Follow-up` variants
- Add lint check before send (word count).

---

### 6) Compliance checklist not embedded in outreach packs
**Missing controls in template files:**
- opt-out sentence
- sender identity/full signature consistency
- link verification
- encoding/smart-quote scrub
- placeholder cleanup

**Fix:**
Append `Pre-Send Compliance Checklist` to:
- `templates/email_outreach_pack.md`
- `templates/email_outreach_pack_v2.md`
- `templates/outreach-nosite-template-pack.md`

---

### 7) Placeholder leakage risk remains in demo/template assets
**At risk:** `templates/site_demo_pack.md`, `templates/site_demo_pack_v2.md`, and token-heavy outreach templates.

**Fix:**
- Add SEND BLOCKER to each file:
  - `No send/publish if placeholders remain ([...], {{...}}, ___).`
- Add quick regex check note: `\[[^\]]+\]|\{\{[^}]+\}\}|___+`

---

## P2 — Quality Improvements

### 8) Unsubstantiated quantitative claims
**Issue:** Stats/impact statements appear without source tagging.

**Fix:**
- Require internal source token for each numeric claim: `{{CLAIM_SOURCE}}` (internal only).
- Ban unsourced numeric claims in cold first touch.

### 9) Channel mismatch risk in send queues
**Issue:** Queue snippets mix website-first language with automation/offer positioning from other packs.

**Fix:**
- Add per-queue `Offer Family` field (`Website Offer` vs `Ops Automation Offer`) and enforce one family per batch.

---

## Pass/Fail Checklist

| Control | Status | Notes |
|---|---|---|
| No pricing in first-touch outreach | **FAIL** | Violations remain in `email-variations.md`, `outreach-nosite-template-pack.md` |
| Plain-text cold email precedence documented clearly | **FAIL** | `MEMORY.md` conflicts with `KNOWLEDGE.md` |
| Visual proof required for website outreach | **FAIL** | Not enforced by required token/blocker |
| Canonical 3-7-7 cadence applied | **FAIL** | Cadence drift across v1/v2 packs |
| First-touch <100 words enforced | **FAIL** | v2 allows ~130 words |
| Pre-send compliance checklist embedded | **FAIL** | Missing in active outreach packs |
| Placeholder send/publish blocker included | **FAIL** | Placeholder leakage still possible |
| Claim substantiation control present | **FAIL** | No consistent claim-source mechanism |
| v2 readability/scannability | **PASS** | Strong structure and usable sections |
| Send queue prioritization quality | **PASS** | Clear prioritization and follow-up triggers |
| Contact-info safety alignment with CRITICAL_RULES | **PASS** | No direct contradiction detected in reviewed templates |

**Score:** **3 PASS / 8 FAIL**

---

## Remediation Order (enforcement sequence)
1. Remove first-touch pricing + add explicit no-pricing headers (P0).  
2. Resolve plain-text vs HTML precedence in `MEMORY.md` + `memory/KNOWLEDGE.md` (P0).  
3. Add mandatory visual proof token + send blocker for website outreach (P0).  
4. Standardize cadence to 3-7-7 and relabel optional follow-up variants (P1).  
5. Add pre-send compliance checklist and placeholder blocker across all outreach packs (P1).  
6. Enforce <100-word cold touch and claim-source tagging (P1/P2).  
7. Split send queues by offer family to prevent mixed messaging (P2).

---

## Final Enforcement Decision
**Not approved for full-scale sends until all P0 items are remediated.**  
After P0 fixes, run a quick re-audit and allow controlled scale with checklist gating.
