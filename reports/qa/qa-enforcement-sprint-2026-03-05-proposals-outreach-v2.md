# QA Enforcement Sprint — Proposals & Outreach Assets (V2)
Date: 2026-03-05
Owner: John BD QA

## 1) Practical Quality Gate Checklist
Use before any outbound proposal/email/SMS/DM. Mark each item pass/fail.

### A. Clarity (0–5)
1. Opener is prospect-specific and credible
2. Offer is explicit in first 3 lines
3. Message has one primary objective
4. CTA is low-friction and singular
5. Length fits channel (cold email target 80–140 words)

### B. Offer Fit (0–5)
1. At least 2 verified personalization facts
2. Service aligns with prospect stage/problem
3. Outcome is concrete (not feature-dump)
4. Timeline/scope is realistic
5. Proof is relevant and verifiable

### C. Risk Checks (0–5)
1. No fabricated or unverifiable claims
2. No contradictory pricing/scope/timeline
3. No pricing in first-touch cold outreach
4. No sensitive/confidential data leakage
5. No deceptive/spammy language

### D. Formatting & Readiness (0–5)
1. All placeholders resolved
2. Names/company/location accurate
3. Grammar and punctuation clean
4. Links/attachments tested
5. Signature complete and consistent

---

## 2) Pass/Fail Rubric
- Score each domain out of 5 (total = 20)

### Auto-Fail (critical) triggers
- Fabricated/deceptive claim
- Wrong recipient name/company/location
- Missing CTA
- Pricing in first-touch cold email
- Placeholder text left in final outbound copy
- Conflicting scope/price/timeline likely to create dispute

### Decision bands
- **PASS:** 17–20 and no critical trigger
- **PASS WITH FIXES:** 14–16 and no critical trigger (must patch before send)
- **FAIL:** 0–13 or any critical trigger

---

## 3) Correction Workflow (fast loop)
1. Classify asset: `first_touch`, `followup`, `proposal`
2. Run critical-trigger scan first
3. Score A/B/C/D
4. Fix top blockers in this order:
   1) Risk/compliance issues
   2) Offer-fit mismatch
   3) CTA clarity
   4) Formatting polish
5. Re-score until **>=17/20** and no critical triggers
6. Mark asset `ready_to_send` and archive final revision

### 30-second fix playbook
- Placeholder left → search `[` / `{{` and resolve all
- Too generic → add 2 concrete prospect facts
- Weak CTA → replace with one explicit next step
- First-touch includes price → remove all pricing and keep demo CTA
- Long copy → cut to hook + value + CTA

---

## 4) Applied QA Results (Current Assets)

### Asset A — `templates/upwork-proposal.md`
- Clarity: 4/5
- Offer Fit: 3/5
- Risk: 4/5
- Formatting: 3/5
- **Total: 14/20 → PASS WITH FIXES**

Findings:
- Strong structure but overly generic for competitive jobs
- Placeholder-heavy template (safe only before personalization)
- Proof statements are vague and not role-specific

Required corrections:
1. Add mandatory “job-specific details” block (2 details minimum)
2. Add a proof line format: result + timeframe + context
3. Tighten CTA to one action: “Send file + deadline”

---

### Asset B — `email-templates/proposal-email.md`
- Clarity: 5/5
- Offer Fit: 4/5
- Risk: 4/5
- Formatting: 4/5
- **Total: 17/20 → PASS**

Findings:
- Clear scope/timeline/pricing framework and strong next-steps flow
- Still template-based: placeholder cleanup is mandatory at send time
- Could reduce delivery dispute risk with explicit out-of-scope line

Recommended improvements:
1. Add one “Out of scope” sentence
2. Add ownership/hosting responsibility line
3. Keep one acceptance path (already mostly compliant)

---

### Asset C — `pitches/evergreen-pitch.md`
- Clarity: 4/5
- Offer Fit: 4/5
- Risk: 1/5
- Formatting: 4/5
- **Raw total: 13/20 + critical trigger → FAIL**

Critical trigger:
- First-touch includes pricing ($250 one-time, $10/mo hosting)

Additional issues:
- Body length is high for first-touch cold outreach
- Contact trust can be improved by simplifying proof + contact path

Required corrections:
1. Remove all pricing from first-touch
2. Compress to short hook + one-value proof + demo CTA
3. Keep a single clean contact path in signature

---

## 5) Enforcement Rule
No proposal/outreach asset is sent unless QA score is logged.
- If FAIL or critical trigger: block send and rewrite
- Team send baseline: **17+/20**
- Repeat failures (same code 3x/week): update template + linter rule
