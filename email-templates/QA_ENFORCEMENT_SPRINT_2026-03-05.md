# QA Enforcement Sprint — Proposals & Outreach Assets

Date: 2026-03-05
Owner: John (BD)
Status: Implemented

---

## 1) Quality Gate Checklist (Pre-Send)

Score every outbound asset on 4 sections.

### A. Clarity (0–25)
- [ ] Sender identity and context are clear in first 2 lines
- [ ] Reason for outreach is specific (not generic)
- [ ] Value proposition is understandable in <15 seconds
- [ ] Exactly one primary CTA
- [ ] No unresolved placeholders ([...])

### B. Offer Fit (0–25)
- [ ] Offer matches recipient type and pain
- [ ] Deliverables are concrete
- [ ] Timeline is specific and realistic
- [ ] Pricing is coherent (single option or clean tiers)
- [ ] Includes recommended option or rationale

### C. Risk Checks (0–30)
- [ ] No fabricated claims, stats, or social proof
- [ ] No contradictory numbers/details
- [ ] No guaranteed outcomes presented as certainty
- [ ] Contact info/links are valid
- [ ] Sensitive data is minimized

### D. Formatting & Channel Fit (0–20)
- [ ] Subject line is specific and non-spammy
- [ ] Short paragraphs + bullets for scanability
- [ ] Mobile readable
- [ ] Professional signature
- [ ] Tone/length fit channel (email vs SMS)

---

## 2) Pass/Fail Rubric

**Total score:** 100

### Hard-Fail (auto fail regardless of score)
1. Any false or inconsistent factual claim
2. Missing CTA
3. Broken/invalid link
4. Pricing/scope contradiction
5. Unresolved placeholders in send-ready asset

### Decision Bands
- **PASS:** 85–100 and no hard-fail
- **CONDITIONAL PASS:** 70–84 and no hard-fail
- **FAIL:** <70 or any hard-fail

---

## 3) Correction Workflow (Enforced)

1. Draft asset
2. Score with checklist
3. Check hard-fails first
4. If Conditional/Fail, open Fix Ticket:
   - Asset
   - Defect type (clarity / fit / risk / formatting)
   - Severity (H/M/L)
   - Current line
   - Replacement line
   - Owner + due time
5. Apply minimal required edits
6. Re-score
7. If PASS, mark header: `QA:PASS YYYY-MM-DD initials`
8. If still not PASS, escalate to manual review (no send)

---

## 4) Applied Audit + Remediation Results

### Asset: `email-templates/initial-inquiry.md`
- Before: 82/100 (Conditional)
- Fixes made:
  - Added one primary CTA + one fallback CTA
  - Added proof-safe credibility line
  - Added explicit placeholder replacement rule
- After: **90/100 PASS**

### Asset: `email-templates/proposal-email.md`
- Before: 83/100 (Conditional)
- Fixes made:
  - Added recommended option line
  - Added explicit acceptance mechanism
  - Added placeholder and consistency QA rules
- After: **91/100 PASS**

### Asset: `eagle-landscaping/PITCH.md`
- Before: 73/100 (Fail, hard-fail)
- Hard-fail resolved:
  - Standardized Yelp reviews to 11 across file
  - Replaced guarantee-style SEO line with best-practices wording
  - Removed unsupported mobile stat framing
- After: **88/100 PASS**

### Asset: `kevins-yard-work/EMAIL_PITCH.md`
- Before: 68/100 (Fail, hard-fail)
- Hard-fail resolved:
  - Removed unsupported quantitative claims and ranking guarantees
  - Replaced unresolved contact placeholder with real contact details
  - Reduced first-touch email length + enforced one primary CTA
  - Moved operational notes to internal-only section
- After: **89/100 PASS**

---

## 5) Operational Rule Going Forward

No proposal/outreach copy enters send queue unless:
- Score >= 85
- No hard-fail present
- Header includes `QA:PASS` marker
