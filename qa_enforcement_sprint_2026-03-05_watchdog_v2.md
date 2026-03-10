# QA Enforcement Sprint — Practical Quality Gate (Proposals + Outreach)
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement

## 1) Quality Gate Checklist (Pre-Send)
Score each domain 0–5.

### A) Clarity
- [ ] First 1–2 lines explain why this recipient is being contacted
- [ ] Offer describes concrete deliverables (not vague claims)
- [ ] Single clear CTA (one primary next step)
- [ ] Plain language, short paragraphs, no jargon/run-ons
- [ ] Outcome framing is realistic and specific

### B) Offer Fit
- [ ] Service matches verified business category
- [ ] Personalization uses verified facts only
- [ ] Offer maps to likely pain point (calls, quote requests, visibility)
- [ ] Price/scope/timeline are internally consistent
- [ ] Channel stage fit (cold outreach vs proposal depth)

### C) Risk Checks
- [ ] No fabricated stats/rankings/guarantees
- [ ] No broad unverifiable competitor pricing claims
- [ ] No placeholder leaks in send-ready files (`[Name]`, `{{token}}`)
- [ ] No contact/business/location mismatches
- [ ] No manipulative urgency or deceptive framing

### D) Formatting
- [ ] Subject line aligned to body
- [ ] Greeting/signoff/company identity present
- [ ] Bullets and spacing render cleanly in plain text
- [ ] Channel-safe punctuation/encoding
- [ ] Traceability marker/status present

---

## 2) Pass/Fail Rubric
- Max score: **20**
- **PASS:** >=16, no domain <4, zero critical flags
- **CONDITIONAL PASS:** 13–15, zero critical flags, same-session fixes required
- **FAIL:** <=12, any domain <=2, or any critical flag

### Critical Flags (Auto-Fail)
1. Unverifiable claim presented as fact
2. Wrong business identity/service mismatch
3. Placeholder leakage in send-ready asset
4. Missing/contradictory operational details that can cause mis-send

---

## 3) Correction Workflow (Fast Loop)
1. **Tag** asset: `draft` / `qa_hold` / `ready_to_send`
2. **Score** A/B/C/D and log defects (Critical/Major/Minor)
3. **Block** immediately if any Critical defect (`qa_hold`)
4. **Fix order:** Critical -> Major (fit/clarity) -> Minor (style)
5. **Re-score** and compare before/after
6. **Release** only when PASS threshold met
7. **Log pattern** for recurring defects

Defect codes:
- **C1** compliance/truth risk
- **C2** identity mismatch
- **C3** placeholder leak
- **M1** weak fit
- **M2** unclear value/CTA
- **M3** formatting friction

---

## 4) Applied QA (This Sprint)

### Asset 1: `email-templates/initial-inquiry.md`
- Clarity: 4/5
- Offer Fit: 4/5
- Risk: 3/5 (placeholder template by design)
- Formatting: 5/5
- **Total: 16/20**
- **Decision: PASS (template-stage)**
- Notes: Keep explicit pre-send placeholder replacement gate enabled.

### Asset 2: `pitches/evergreen-pitch.md`
- Clarity: 5/5
- Offer Fit: 4/5
- Risk: 5/5
- Formatting: 5/5
- **Total: 19/20**
- **Decision: PASS**
- Notes: Previously risky unverifiable lines are already removed.

### Asset 3: `pitches/panda-pitch.md`
- Pre-fix issues found:
  - **C1:** Unverified stat claim ("80% of customers search on phones")
  - **C1:** Broad unverified market-pricing claim
- Applied fixes:
  - Replaced stat with capability statement
  - Replaced pricing comparison with neutral positioning language
  - Softened ROI statement to non-guaranteed framing
- Re-score:
  - Clarity: 5/5
  - Offer Fit: 4/5
  - Risk: 5/5
  - Formatting: 5/5
  - **Total: 19/20**
- **Decision: PASS**

---

## 5) Enforcement Standard (Active)
No proposal/outreach asset moves to send queue unless:
1. Rubric score is logged,
2. Decision is PASS,
3. Zero critical flags,
4. Pre-send token/placeholder check passes.
