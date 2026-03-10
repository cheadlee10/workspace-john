# QA Enforcement Sprint — Practical Quality Gate (v7)
**Date:** 2026-03-05
**Owner:** watchdog-qa-enforcement subagent
**Scope:** Proposals + outreach assets

## 1) Quality Gate Checklist
### A) Clarity (0-5)
- Reason for outreach is explicit in first 1-2 lines.
- Offer states concrete deliverable + benefit.
- One clear CTA.
- Plain language; short, skimmable structure.
- Channel-appropriate length.

### B) Offer Fit (0-5)
- Offer matches lead vertical and known facts.
- Personalization is verified, not guessed.
- Pain-point alignment is specific (lead flow, trust, responsiveness).
- Scope/price consistency.
- Correct template variant for segment.

### C) Risk Checks (0-5)
- No fabricated stats/guarantees/ranking promises.
- No deceptive urgency.
- No placeholder leakage in send-ready copy.
- No broken/invalid contact details or links.
- No business/service/location mismatch.

### D) Formatting & Readiness (0-5)
- Subject/greeting/signature present (where required).
- Clean plain-text rendering.
- Queue + lead traceability present.
- Consistent naming/labels across queue files.
- Send-ready state has no unresolved TODOs.

---
## 2) Pass/Fail Rubric
- **PASS:** >=16 total, no domain <4, no Critical flags.
- **CONDITIONAL PASS:** 13-15, no Critical flags, fix same-day + recheck.
- **FAIL:** <=12, any domain <=2, or any Critical flag.

### Critical Flags (auto-fail)
- C1: Unverifiable performance claim as fact
- C2: Identity mismatch (wrong business/service/location)
- C3: Placeholder/token leak in send-ready copy
- C4: Missing execution metadata (lead/batch traceability)

---
## 3) Correction Workflow
1. Tag status: `draft` -> `qa_hold` -> `ready_to_send`.
2. Score A/B/C/D; log defects by C/M severity.
3. Block send on any Critical.
4. Fix in order: Critical -> Major (fit/clarity) -> Minor (format).
5. Re-score and record delta.
6. Reconcile queue/tracker/lead IDs.
7. Release only on PASS.
8. Log recurrent defect patterns into template maintenance backlog.

---
## 4) Applied QA Results
### Asset A: `email-templates/next-queued-email-assets-2026-03-03-batch116.md`
- Scores: Clarity 5 / Fit 5 / Risk 4 / Formatting 5 = **19/20**
- Status: **PASS**
- Note: token replacement required at final send step.

### Asset B: `pitches/evergreen-pitch.md`
- Scores: Clarity 5 / Fit 5 / Risk 5 / Formatting 5 = **20/20**
- Status: **PASS**

### Asset C: `KEVIN_EMAIL_READY_TO_SEND.txt` (revised)
- Pre-fix: 15/20, **FAIL** (C1 claims)
- Fixes applied:
  - Removed “invisible” absolutist phrasing
  - Removed implied ranking guarantee
  - Softened ROI claim to conditional language
- Post-fix scores: Clarity 5 / Fit 4 / Risk 5 / Formatting 5 = **19/20**
- Status: **PASS**

---
## 5) Enforcement Standard
No proposal/outreach asset can enter live send queue unless all are true:
1. Rubric score logged,
2. PASS outcome,
3. Zero Critical flags,
4. Queue/lead traceability validated.
