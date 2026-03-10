# QA Enforcement Sprint — Proposals & Outreach Assets
Date: 2026-03-05
Owner: John BD QA

## 1) Practical Quality Gate Checklist (pre-send)

### A) Clarity (5 pts)
1. Purpose is obvious in first 2 lines
2. Prospect-specific hook is concrete and true
3. Offer is specific (deliverables + timeline)
4. One low-friction CTA
5. Copy is short/scannable (cold email target: 80–140 words)

### B) Offer Fit (5 pts)
1. At least 2 verified personalization details
2. Service matches the prospect’s likely need/stage
3. Value framing is outcome-led (not feature dump)
4. Promise/timeline is realistic for current capacity
5. Proof/credibility is present and relevant

### C) Risk Checks (5 pts)
1. No fabricated/unverifiable claims
2. No conflicting business/contact/payment details
3. No pricing in first-touch cold outreach (proposal-only allowed)
4. Scope boundaries are explicit (revisions, exclusions, ownership/hosting)
5. Tone is compliant/professional (no spammy pressure)

### D) Formatting (5 pts)
1. No placeholders/bracket tokens left
2. Correct names/company/location
3. Grammar + punctuation clean
4. Links/attachments are tested and minimal
5. Signature complete (name, company, phone)

## 2) Pass/Fail Rubric
- Score each category 0–5 (total /20).
- **Critical fail (auto-FAIL regardless of score):**
  - Fabricated/deceptive claim
  - Wrong recipient identity/company/location
  - Missing CTA
  - Pricing in first-touch cold email
  - Scope/price ambiguity likely to create dispute

### Decision bands
- **PASS:** 17–20 and zero critical fails
- **PASS W/ FIXES:** 14–16 and zero critical fails (quick patch allowed)
- **FAIL:** 0–13 or any critical fail

## 3) Correction Workflow (fast loop)
1. **Classify asset**: `cold_email`, `followup`, or `proposal`.
2. **Run critical-fail scan first**.
3. **Score A–D**.
4. **Patch only top 3 blockers**:
   - Clarity: rewrite opener + CTA
   - Offer fit: add 2 real specifics + 1 proof
   - Risk: remove risky claims/pricing; add scope boundaries
   - Formatting: remove placeholders, tighten structure, verify links
5. **Re-score** until >=17 with zero critical fails.
6. **Release** as `ready_to_send` and archive final version.

---

## 4) Applied QA to Current Assets

### Asset 1: `templates/upwork-proposal.md`
- Clarity: 4/5
- Offer fit: 3/5
- Risk: 4/5
- Formatting: 4/5
- **Total: 15/20 → PASS W/ FIXES**

**Issues found**
- Too generic for competitive Upwork jobs
- Weak proof language (no concrete outcomes)
- Contains placeholders; acceptable for template, not for live send

**Required fixes**
1. Add mandatory 2-job-detail personalization block
2. Add one evidence line template (result + timeframe)
3. Strengthen CTA to one action ("send file + deadline")

---

### Asset 2: `email-templates/proposal-email.md`
- Clarity: 5/5
- Offer fit: 4/5
- Risk: 4/5
- Formatting: 4/5
- **Total: 17/20 → PASS**

**Issues found**
- Strong structure and close
- Missing explicit ownership/hosting/revision-overage boundary language
- Placeholder usage means final QA still required before send

**Required fixes**
1. Add one "Out of Scope" line
2. Add ownership/hosting statement
3. Keep a single acceptance mechanism (already mostly compliant)

---

### Asset 3: `pitches/evergreen-pitch.md`
- Clarity: 4/5
- Offer fit: 4/5
- Risk: 1/5
- Formatting: 4/5
- **Raw total: 13/20 + critical fail → FAIL**

**Critical fail triggered**
- Includes pricing in first-touch cold outreach ("$250 one-time")

**Other issues**
- Email is long for first touch
- Risk of mixed contact trust (recipient sees two phone numbers in body/signature context)

**Required fixes**
1. Remove all pricing from first-touch
2. Shorten body to hook + relevance + demo CTA
3. Keep one trusted contact path in signature

---

## 5) Enforcement Standard (operational)
- No asset sends below 14/20.
- Any critical fail = immediate block + rewrite.
- Send target baseline: **17+/20**.
- Repeated fail code 3x/week triggers template update + linter rule update.
