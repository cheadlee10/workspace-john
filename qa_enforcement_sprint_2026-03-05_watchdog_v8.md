# QA Enforcement Sprint — Quality Gate + Rubric + Correction Workflow (v8)
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent  
**Scope:** Proposal and outreach assets prior to queue/send

## 1) Practical Quality Gate Checklist (operator-use)

### A. Clarity (0-5)
- Outreach reason is explicit in opening lines.
- Offer states concrete deliverable (what gets built/sent/launched).
- Single primary CTA.
- Plain-language, skimmable structure.
- Length fits channel (email/DM/SMS/call script).

### B. Offer Fit (0-5)
- Segment/vertical match is correct.
- Personalization is based on verified facts only.
- Problem-to-offer mapping is specific (lead intake, callbacks, trust proof).
- Scope/price terms are internally consistent.
- Correct template variant used for lead type.

### C. Risk Checks (0-5)
- No fabricated stats, guarantees, or unverifiable superiority claims.
- No deceptive urgency or misleading framing.
- No placeholder/token leakage in send-ready artifacts.
- No wrong contact details, broken links, or invalid identifiers.
- No business/service/location mismatches.

### D. Formatting & Send Readiness (0-5)
- Subject/greeting/signature present where required.
- Clean plain-text rendering and safe punctuation.
- Lead ID / batch / queue traceability included.
- Naming/labels consistent across files.
- No unresolved TODO markers in send-ready copy.

---
## 2) Pass/Fail Rubric
- **PASS:** total >=16, no domain <4, and zero Critical flags.
- **CONDITIONAL PASS:** total 13-15, zero Critical flags; must fix and re-check same day.
- **FAIL:** total <=12, any domain <=2, or any Critical flag.

### Critical flags (auto-fail)
- **C1:** Unverifiable performance claim presented as fact.
- **C2:** Identity mismatch (wrong business/service/location).
- **C3:** Placeholder/token leakage in send-ready copy.
- **C4:** Missing operational traceability metadata.

---
## 3) Applied QA (this sprint)

| Asset | Clarity | Offer Fit | Risk | Formatting | Total | Result | Key Notes |
|---|---:|---:|---:|---:|---:|---|---|
| `email-templates/next-queued-email-assets-2026-03-03-batch116.md` | 5 | 5 | 4 | 5 | 19 | PASS | Template-safe placeholders intentionally present; must be replaced at send stage. |
| `pitches/evergreen-pitch.md` | 5 | 5 | 5 | 5 | 20 | PASS | Prior risky claims removed; copy is now factual and compliant. |
| `KEVIN_EMAIL_READY_TO_SEND.txt` | 5 | 4 | 5 | 5 | 19 | PASS | Absolutist/ranking language softened; CTA and pricing clarity strong. |

---
## 4) Correction Workflow (enforcement standard)
1. **Intake:** tag file `draft` or `send-ready`.
2. **Score:** run A/B/C/D rubric and assign defects (`C`, `M`, `m`).
3. **Gate:** if any Critical, force `qa_hold` (no queue/send allowed).
4. **Fix order:** Critical -> Major fit/clarity -> Minor format polish.
5. **Re-score:** record before/after scores in QA note.
6. **Ops sync:** verify queue row + lead ID + batch metadata alignment.
7. **Release:** mark `ready_to_send` only on PASS criteria.
8. **Pattern log:** recurrent defects to template-maintenance backlog.

### Defect classes
- **Critical (C):** compliance or send-integrity risk; blocks send.
- **Major (M):** conversion-risk issue (fit, unclear offer, weak CTA); fix before release.
- **Minor (m):** readability/format polish; fix unless urgent send exception approved.

---
## 5) Exit Criteria for any outbound asset
Asset may enter live queue only if all are true:
1. PASS recorded using rubric.
2. Zero Critical flags.
3. Placeholders resolved for send-ready output.
4. Traceability fields present and consistent with queue/tracker.

This gives a practical, repeatable QA gate that protects credibility, reduces compliance risk, and keeps send operations clean.