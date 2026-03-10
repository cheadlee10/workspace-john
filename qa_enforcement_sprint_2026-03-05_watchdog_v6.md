# QA Enforcement Sprint — Practical Quality Gate (v6)
**Date:** 2026-03-05
**Owner:** watchdog-qa-enforcement subagent
**Scope:** Proposal + outreach assets (clarity, offer fit, risk checks, formatting)

---

## 1) Practical Quality Gate Checklist (Pre-Send)

### A. Clarity (0-5)
- [ ] First 1-2 lines state why recipient is being contacted.
- [ ] Offer is concrete (what gets built/delivered + benefit).
- [ ] One primary CTA only (single next action).
- [ ] Language is plain and skimmable (no hype/run-ons).
- [ ] Message length fits channel (email structured; SMS concise).

### B. Offer Fit (0-5)
- [ ] Vertical/service aligns with lead record.
- [ ] Personalization is based only on verified facts.
- [ ] Offer maps to likely pain (quote friction, missed calls, no web presence).
- [ ] Price/scope claims are internally consistent.
- [ ] Template variant matches lead category.

### C. Risk & Compliance (0-5)
- [ ] No fabricated stats, guarantees, or unverifiable superiority claims.
- [ ] No deceptive urgency/scarcity framing.
- [ ] No placeholder leakage in send-ready files (`{{...}}`, `[Business]`).
- [ ] Contact info/URLs/identifiers are valid.
- [ ] No identity mismatch (business/service/location).

### D. Formatting & Delivery Readiness (0-5)
- [ ] Subject, greeting, and signature are present (where required).
- [ ] Plain-text formatting is clean and readable.
- [ ] Queue traceability exists (lead id / batch / source file link).
- [ ] Labels and terminology are consistent across docs.
- [ ] Asset is execution-ready (no unresolved notes).

---

## 2) Pass/Fail Rubric

### Score Model
- 4 domains x 5 points = **20 max**.

### Decision Rules
- **PASS:** total >= 16, no domain < 4, and no Critical flags.
- **CONDITIONAL PASS:** total 13-15, no Critical flags, fix + recheck same day.
- **FAIL:** total <= 12, any domain <= 2, or any Critical flag.

### Critical Flags (auto-fail)
1. Fabricated/unverifiable performance claim stated as fact.
2. Wrong business/service identity in send-ready copy.
3. Placeholder/token leak in send-ready copy.
4. Missing operational identifiers needed to execute send.

---

## 3) Correction Workflow (Enforced)

1. **Intake + Tag**
   - Set status: `draft` -> `qa_hold` -> `ready_to_send`.
2. **Score + Defect Log**
   - Score A/B/C/D and log issues with severity codes.
3. **Hard Block on Criticals**
   - Any Critical => immediate `qa_hold` and send stop.
4. **Fix in Priority Order**
   - Critical -> Major fit/clarity -> Minor formatting.
5. **Re-Run Gate**
   - Re-score after edits; compare before/after totals.
6. **Ops Reconciliation**
   - Validate queue totals, lead IDs, batch labels, and template mapping.
7. **Release Rule**
   - Promote to `ready_to_send` only on PASS.
8. **Pattern Capture**
   - Log recurring defect types to prevent repeats in templates.

### Defect Codes
- **C1:** Truth/compliance claim risk
- **C2:** Identity mismatch
- **C3:** Placeholder leakage
- **C4:** Missing execution metadata
- **M1:** Offer-fit mismatch
- **M2:** Clarity/CTA weakness
- **M3:** Formatting/consistency defect

---

## 4) Applied QA (Current Sprint)

### Asset A — `email-templates/next-queued-email-assets-2026-03-03-batch116.md`
- **Clarity:** 5/5
- **Offer Fit:** 5/5
- **Risk & Compliance:** 4/5 (template placeholders intentional pre-send)
- **Formatting:** 5/5
- **Total:** **19/20**
- **Status:** **PASS**
- **Key note:** Must enforce token replacement at final send step to avoid C3 auto-fail.

### Asset B — `pitches/evergreen-pitch.md`
- **Clarity:** 5/5
- **Offer Fit:** 5/5
- **Risk & Compliance:** 5/5
- **Formatting:** 5/5
- **Total:** **20/20**
- **Status:** **PASS**
- **Key note:** Prior risky benchmark language is removed; now clean and send-ready.

### Asset C — `KEVIN_EMAIL_READY_TO_SEND.txt`
- **Clarity:** 4/5
- **Offer Fit:** 4/5
- **Risk & Compliance:** 2/5
- **Formatting:** 5/5
- **Total:** **15/20**
- **Status:** **FAIL** (Critical risk present)
- **Defects:**
  - **C1:** "That means you're invisible..." is absolute and unverifiable as stated.
  - **C1:** "we can have you ranking on Google by end of week" is an implied ranking guarantee.
  - **M2:** ROI statement implies likely gain without qualification.

---

## 5) Required Fixes for Failed Asset (`KEVIN_EMAIL_READY_TO_SEND.txt`)

### Replace high-risk lines
- Replace: "That means you're invisible when people search..."
- With: "Without a website, it is harder for new customers to evaluate your business online when they compare options."

- Replace: "we can have you ranking on Google by end of week"
- With: "we can launch quickly so your business has a professional web presence this week."

- Replace: "If you get just 1 extra customer per month..."
- With: "If it helps generate additional inquiries, it can cover its cost quickly."

### Expected post-fix outcome
- Risk score rises to 4-5; projected total **18-19 (PASS)** after recheck.

---

## 6) Enforcement Standard
No outreach/proposal asset moves to live send unless all are true:
1. Rubric score recorded,
2. PASS status,
3. Zero Critical flags,
4. Queue/lead traceability confirmed.

This gate is practical at send speed and blocks avoidable credibility/compliance failures.