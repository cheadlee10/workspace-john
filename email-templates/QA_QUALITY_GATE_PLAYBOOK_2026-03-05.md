# QA Quality Gate Playbook — Proposals & Outreach

Date: 2026-03-05  
Owner: John (BD)

## 1) Practical Quality Gate Checklist (Pre-Send)

Score each asset on 100 points.

### A) Clarity (25)
- 5: Sender + context are clear in first 2 lines
- 5: Message states why this recipient was contacted (specific trigger)
- 5: Offer/value is understandable in <15 seconds
- 5: Exactly one primary CTA
- 5: No unresolved placeholders (`[Name]`, `[Project]`, etc.)

### B) Offer Fit (25)
- 5: Offer matches recipient type + likely pain
- 5: Deliverables are concrete (not vague)
- 5: Timeline is specific + believable
- 5: Pricing and scope are coherent
- 5: Recommended option or rationale is included

### C) Risk Checks (30)
- 10: No fabricated/exaggerated claims, stats, or social proof
- 5: No contradictions across the doc (pricing, timelines, counts)
- 5: No guaranteed outcomes presented as certainty
- 5: Links/contact details are valid
- 5: Sensitive data minimized; no unnecessary exposure

### D) Formatting & Channel Fit (20)
- 4: Subject line is specific and non-spammy
- 4: Short paragraphs/bullets for scanability
- 4: Mobile readability (no wall of text)
- 4: Professional signature/contact method
- 4: Tone and length fit channel (email/SMS/DM)

---

## 2) Pass/Fail Rubric

### Hard-Fail (auto fail regardless of score)
1. False/inconsistent factual claim
2. Missing primary CTA
3. Broken/invalid link
4. Pricing/scope contradiction
5. Unresolved placeholder in send-ready asset

### Decision Bands
- **PASS:** 85–100 and no hard-fail
- **CONDITIONAL PASS:** 70–84 and no hard-fail (must fix before queue)
- **FAIL:** <70 or any hard-fail

---

## 3) Correction Workflow (Enforced)

1. Draft asset
2. Score checklist (A/B/C/D)
3. Run hard-fail screen first
4. If Conditional/Fail, open a **Fix Ticket**:
   - Asset path
   - Defect type (clarity / fit / risk / formatting)
   - Severity (H/M/L)
   - Original line
   - Replacement line
   - Owner + due time
5. Apply minimal edits to remove blockers
6. Re-score
7. If PASS, add header: `QA:PASS YYYY-MM-DD initials`
8. If still not PASS, escalate to manual review (no send)

---

## 4) Applied QA Audit (This Sprint)

### Asset 1: `email-templates/initial-inquiry.md`
- Score: **90/100**
- Result: **PASS**
- Notes: Strong specificity + clear CTA + fallback CTA. Placeholder rule included.

### Asset 2: `email-templates/proposal-email.md`
- Score: **91/100**
- Result: **PASS**
- Notes: Clear scope/timeline/investment and recommended option; clean acceptance mechanism.

### Asset 3: `kevins-yard-work/EMAIL_PITCH.md`
- Score: **68/100**
- Result: **FAIL**
- Hard-fail triggers:
  - Unsupported quantitative claims in script (e.g., hard % behavior stats)
  - Contact placeholder unresolved (`[Your contact info - Craig to provide]`)
- Additional issues:
  - Too long for first-touch outreach email
  - Multiple CTAs across sections reduce conversion clarity

#### Required corrections before send
1. Remove unsupported hard stats unless sourced/verified.
2. Replace placeholder with real contact details.
3. Shorten first-touch email to ~120–180 words.
4. Keep one primary CTA (`Reply "yes" to claim the site`) and one optional fallback.
5. Move objection handling and scripts to internal-only doc (not in outbound email body).

---

## 5) Enforcement Rule

No proposal/outreach asset enters send queue unless:
- Score >= 85
- No hard-fail present
- `QA:PASS` marker is present in file header
