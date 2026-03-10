# QA Enforcement Sprint v9 — Quality Gate, Rubric, and Corrections
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent

## 1) Practical Quality Gate Checklist (Proposals + Outreach)

### A. Clarity (0-5)
- Contact reason is explicit in first 1-2 lines.
- Offer states concrete deliverable(s), timeline, and expected next step.
- Single CTA (one action, one path).
- Language is plain, short, and skimmable.
- Value claims are specific but not inflated.

### B. Offer Fit (0-5)
- Message fits recipient type/industry and known facts.
- Personalization uses verifiable data only.
- Offer scope + price match actual fulfillment capability.
- Pain-to-solution mapping is direct (lead flow, booking, credibility, etc.).
- Channel fit is appropriate (email/SMS/call/DM).

### C. Risk Checks (0-5)
- No fabricated stats/guarantees/unverified benchmarks.
- No deceptive urgency or pressure framing.
- No placeholder leaks (`{{...}}`, TODO text, dummy links/phones).
- No identity mismatch (wrong business name/service/location).
- Claims can be defended if prospect asks for proof.

### D. Formatting & Send-Readiness (0-5)
- Subject/body alignment.
- Greeting/signature/contact present.
- Clean bullets and spacing (plain-text safe).
- Typos/grammar pass.
- Queue traceability included (lead ID/list linkage where applicable).

---

## 2) Pass/Fail Rubric

### Scoring
- 4 domains × 5 points = **20 max**.

### Decision Rules
- **PASS:** Total >=16, no domain <4, no critical flags.
- **CONDITIONAL PASS:** 13-15, no critical flags, fix-and-recheck required same day.
- **FAIL:** <=12, or any domain <=2, or any critical flag.

### Critical Flags (Auto-Fail)
1. Unverifiable performance claim stated as fact.
2. Wrong recipient identity/offer mismatch.
3. Placeholder or dummy data in send-ready asset.
4. Missing operational traceability for queued sends.

---

## 3) Applied QA (This Sprint)

## Asset 1: `KEVIN_EMAIL_READY_TO_SEND.txt`
**Scores:**
- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk Checks: **4/5**
- Formatting: **5/5**
- **Total: 19/20 — PASS**

**Findings:**
- Strong: clear reason, clear offer, simple CTA, specific deliverable already built.
- Risk note: “SEO-optimized for Google ranking” can imply guaranteed rank. Better to soften.

**Recommended micro-fix:**
- Replace: “SEO-optimized for Google ranking”
- With: “Built with local SEO best practices to improve discoverability.”

---

## Asset 2: `LOCAL_BUSINESS_OUTREACH.md`
**Scores:**
- Clarity: **4/5**
- Offer Fit: **4/5**
- Risk Checks: **1/5**
- Formatting: **4/5**
- **Total: 13/20 — FAIL (Critical)**

**Critical defects:**
- Multiple unsupported market stats (e.g., “60%/70% have no site”).
- Multiple guaranteed uplift claims (“20-30% more customers in first month”).
- Aggressive certainty framing (“This is how you quit your job”) unsuitable for compliance-safe outreach collateral.

**Correction direction:**
- Convert hard numeric claims to either sourced claims or non-numeric benefit language.
- Remove/replace guaranteed outcome statements.
- Keep framework, but shift to evidence-safe phrasing.

---

## Asset 3: `send_ops_queue_2026-03-05_ready.md`
**Scores:**
- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk Checks: **5/5**
- Formatting: **5/5**
- **Total: 20/20 — PASS**

**Findings:**
- Operationally clean: clear batching, channel split, send windows, taxonomy, required tracking fields.
- No risky claims; very strong traceability and execution readiness.

---

## 4) Correction Workflow (Enforcement Standard)

1. **Intake**
   - Label asset: `draft` / `qa_hold` / `ready_to_send`.

2. **First-Pass Gate**
   - Score A/B/C/D and mark defects as Critical/Major/Minor.

3. **Blocker Rule**
   - Any Critical defect => immediate `qa_hold` (cannot send).

4. **Fix Sequence**
   - Critical (truth/identity/placeholders) → Major (offer fit/CTA) → Minor (format).

5. **Re-score**
   - Re-run rubric after edits; compare old/new totals.

6. **Proof Snippets**
   - Save exact before/after line replacements for audit trail.

7. **Release Gate**
   - Only mark `ready_to_send` after PASS threshold met.

8. **Pattern Logging**
   - Log repeated defect types to improve templates and reduce future QA cycles.

---

## 5) Fast Correction Pack for Failed Asset (`LOCAL_BUSINESS_OUTREACH.md`)

Use these replacement patterns globally:

- “Most clients see 20-30% more customers...”  
  → “Clients typically use the site to increase visibility, credibility, and inquiry volume.”

- “Businesses WITHOUT websites in 2026: [percent list]”  
  → “Many local businesses still rely only on directories/social profiles and have no dedicated website.”

- “This is how you quit your job.”  
  → “This can become a durable recurring-revenue channel when executed consistently.”

- “SEO-optimized for Google ranking”  
  → “Set up with local SEO best practices (metadata, structure, mobile performance).”

**Expected post-fix outcome:** Risk score rises from 1/5 to 4-5/5; document moves from FAIL to PASS/Conditional PASS depending on final edits.

---

## 6) Enforcement Outcome
- Defined a practical gate (clarity, fit, risk, format).
- Applied it to live assets.
- Identified one high-risk collateral doc and provided correction pack.
- Confirmed two send-adjacent assets are pass-ready (with one minor wording hardening suggestion).
