# QA Enforcement Report — Sales Assets
**Date:** 2026-03-04  
**Owner:** John (QA enforcement subagent)  
**Scope:** Recent templates + memory guidance consistency, compliance, and quality checks.

---

## 1) Files Reviewed

### Memory guidance
- `memory/KNOWLEDGE.md`
- `memory/observations.md`

### Sales/outreach assets
- `templates/outreach-nosite-template-pack.md`
- `templates/email-variations.md`
- `templates/site_demo_pack.md`

### Website production/QA assets
- `templates/enterprise-site-factory/README.md`
- `templates/enterprise-site-factory/sops/production-sop.md`
- `templates/enterprise-site-factory/qa/qa-gates-checklist.md`
- `templates/enterprise-site-factory/qa/prelaunch-signoff-template.md`
- `templates/enterprise-site-factory/variants/v2-local-service-wow/*`
- `templates/enterprise-site-factory/variants/v3-local-service-wow/*`
- `templates/website-blueprint/*`

---

## 2) Executive QA Result

**Overall status: FAIL (needs remediation before scale use).**

Primary reason: **cross-asset contradictions** in pricing, first-touch outreach rules, and QA thresholds create operational drift and compliance risk.

---

## 3) Critical Findings (with fixes)

## P0 — Policy/Playbook Contradictions

### F1) First-touch pricing contradiction (hard conflict)
- **Where:**
  - `memory/KNOWLEDGE.md` (Cold Email Outreach Standard): “No first-touch pricing in outreach copy.”
  - `templates/outreach-nosite-template-pack.md` includes first-touch pricing (`$500/$1,000/$2,000`) in “Cold Email — Facebook-Only”.
  - `templates/email-variations.md` includes first-touch pricing (`$0 down, $99/mo`) in all templates.
- **Risk:** Playbook non-compliance, lower reply quality, inconsistent training signals.
- **Fix:** Enforce single rule: first touch = no pricing. Move pricing to follow-up/proposal only.

### F2) Business model pricing contradiction (one-time vs subscription)
- **Where:**
  - `memory/KNOWLEDGE.md` sets primary model to subscription tiers ($99/$199/$299 monthly, 12-month minimum).
  - `templates/outreach-nosite-template-pack.md` proposal shell uses one-time tiers ($500/$1,000/$2,000).
- **Risk:** Margin confusion, misquotes, trust damage when prospects see conflicting offers.
- **Fix:** Standardize to one pricing framework per campaign type and label explicitly:
  - **Option A:** subscription-first package
  - **Option B:** one-time build package
  - Add “pricing model selector” at top of every sales template.

### F3) Visual proof requirement is not consistently enforced
- **Where:**
  - `memory/KNOWLEDGE.md`: “Every web-design outreach includes visual proof (live preview or screenshot link).”
  - `templates/outreach-nosite-template-pack.md`: first-touch templates do **not** require demo/screenshot token.
- **Risk:** Lower conversion quality and drift from adopted standard.
- **Fix:** Add mandatory token to outreach pack: `{{VISUAL_PROOF_URL}}` and hard rule “do not send if blank.”

---

## P1 — QA/Operational Consistency Gaps

### F4) QA performance thresholds conflict across frameworks
- **Where:**
  - `website-blueprint/local-service-qa-gates-checklist.md`: mobile Lighthouse >= 90
  - `enterprise-site-factory/qa/qa-gates-checklist.md`: baseline implies >= 85 perf
  - V2 variant: >= 88
  - V3 variant: >= 90
- **Risk:** Teams can pass one checklist and fail another for same build.
- **Fix:** Define precedence rule:
  1. Variant-specific threshold overrides global baseline
  2. If no variant, default to global baseline
  3. Add a single canonical `QA_STANDARD_VERSION` note in all checklists

### F5) Lead form field definition mismatch (V2 docs)
- **Where:**
  - V2 spec states final form includes name/phone/email/service/details.
  - V2 checklist C says required fields are name + phone only (quick capture variant).
  - V2 README mentions frictionless lead form with 4 required fields.
- **Risk:** Implementation ambiguity and failed QA due to unclear intent.
- **Fix:** Split explicitly:
  - **Stage-1 quick capture:** name + phone only
  - **Stage-2 full quote:** name, phone, email, service, details
  - Update README/spec/checklist language to this exact model.

### F6) Placeholder leakage risk in demo/copy assets
- **Where:** `templates/site_demo_pack.md` includes many placeholders (`[XX]`, `[Client Name]`, etc.)
- **Risk:** Unprofessional outbound if placeholders are sent unchanged.
- **Fix:** Add top-of-file release gate: “SEND BLOCKER: replace all bracketed placeholders before use.”

---

## P2 — Compliance & Quality Improvements

### F7) Outreach compliance controls are missing from templates
- **Where:** outreach templates do not include QA checks for opt-out language, truthful claim validation, or link verification status.
- **Risk:** deliverability/legal risk, inconsistent quality.
- **Fix:** Add a `Pre-Send Compliance Checklist` section to outreach packs:
  - one verified personalization fact
  - no unverifiable claims
  - plain-text encoding check
  - valid link check
  - follow-up cadence tag

### F8) Claim substantiation not tied to evidence source
- **Where:** multiple templates use outcome claims/stats without source fields.
- **Risk:** credibility erosion, potential misrepresentation.
- **Fix:** Add `{{CLAIM_SOURCE}}` token for every stat/benchmark in outbound copy.

---

## 4) Pass/Fail Enforcement Checklist

| Control | Status | Notes |
|---|---|---|
| Single first-touch outreach policy (no pricing) | **FAIL** | Contradictory templates currently active |
| Single pricing model per campaign | **FAIL** | Subscription + one-time mixed without selector |
| Visual proof required in all web-design first touches | **FAIL** | Not mandatory in outreach-nosite pack |
| QA threshold precedence documented | **FAIL** | 85/88/90 standards coexist without rule |
| V2 form-stage definitions consistent across docs | **FAIL** | 2-field/4-field/full-form mismatch |
| Placeholder send-blockers in copy packs | **FAIL** | Missing in site demo pack |
| Pre-send compliance checklist present | **FAIL** | Missing in outreach templates |
| Claim evidence linkage tokenization | **FAIL** | Missing source tokens |
| Variant QA checklists technically coherent | **PASS** | V2/V3 each internally usable |
| Prelaunch signoff workflow exists | **PASS** | Template present and usable |

**Checklist summary:** 2 PASS / 8 FAIL

---

## 5) Immediate Remediation Plan (recommended order)

1. **Patch outreach templates first** (`outreach-nosite-template-pack.md`, `email-variations.md`) to enforce no first-touch pricing + mandatory visual proof.  
2. **Define pricing mode switch** (subscription vs one-time) and add to all proposal/outreach assets.  
3. **Normalize QA standards** with explicit precedence note across blueprint/factory/variant docs.  
4. **Resolve V2 form-field language** across README/spec/checklist.  
5. **Add send-blocker + compliance checklist** to `site_demo_pack.md` and outreach packs.  

---

## 6) Final QA Enforcement Decision

**Decision:** **Do not treat current sales asset set as fully compliant for scaled outreach until P0/P1 items are fixed.**  
The system is close, but contradictory guidance will cause execution drift and prevent reliable QA pass rates.