# QA Enforcement Sprint — Practical Quality Gate (v5)
**Date:** 2026-03-05
**Owner:** watchdog-qa-enforcement subagent
**Scope:** Proposal + outreach assets (clarity, offer fit, risk checks, formatting)

---

## 1) Practical Quality Gate Checklist (Pre-Send)

### A. Clarity (0–5)
- [ ] Who/why contact is explicit in first 1–2 lines.
- [ ] Offer is concrete (deliverable + outcome), not vague.
- [ ] Single CTA (one next action).
- [ ] No jargon/run-ons; easy skim in <30 seconds.
- [ ] Channel-appropriate brevity (SMS concise, email structured).

### B. Offer Fit (0–5)
- [ ] Vertical/service matches lead profile.
- [ ] Personalization uses verified facts only.
- [ ] Offer aligns to likely pain (missed calls, quote friction, no web presence).
- [ ] Pricing/scope language is internally consistent.
- [ ] Message variant correctly mapped to lead vertical.

### C. Risk & Compliance (0–5)
- [ ] No fabricated stats/benchmarks/guarantees.
- [ ] No deceptive urgency or fake scarcity.
- [ ] No placeholder leakage (`{{...}}`, `[Business]`) in send-ready assets.
- [ ] Contact details/links/identifiers are valid.
- [ ] No identity mismatch (wrong business, service, location).

### D. Formatting & Delivery Readiness (0–5)
- [ ] Subject/greeting/signature present where required.
- [ ] Plain-text rendering is clean (bullets, spacing, punctuation).
- [ ] Queue metadata present (lead_id/batch/window/template).
- [ ] Terminology and labels are consistent across sections.
- [ ] Asset is traceable to execution file (CSV/JSONL/queue).

---

## 2) Pass/Fail Rubric

### Score Model
- 4 domains x 5 points = **20 max**.

### Decision Rules
- **PASS**: total >= 16, no domain < 4, and no Critical flags.
- **CONDITIONAL PASS**: total 13–15, no Critical flags, fix + recheck same day.
- **FAIL**: total <= 12, any domain <= 2, or any Critical flag.

### Critical Flags (auto-fail)
1. Fabricated or unverifiable performance claims stated as fact.
2. Wrong business/service identity in a send-ready asset.
3. Placeholder/token leakage in send-ready content.
4. Missing/invalid operational identifiers that break send execution.

---

## 3) Applied QA Results (Sprint Sample)

## Asset A — `pitches/evergreen-pitch.md`
- **Clarity:** 5/5
- **Offer Fit:** 5/5
- **Risk & Compliance:** 5/5
- **Formatting:** 5/5
- **Total:** **20/20**
- **Status:** **PASS**
- **Notes:** Prior risky benchmark language appears removed; clear CTA and clean structure.

## Asset B — `send_ops_queue_2026-03-05.md`
- **Clarity:** 4/5
- **Offer Fit:** 4/5
- **Risk & Compliance:** 5/5
- **Formatting:** 3/5
- **Total:** **16/20**
- **Status:** **CONDITIONAL PASS**
- **Defects:**
  - **M3 Formatting/consistency:** Vertical mix counts listed (8+6+4+2+1+1+1) do not reconcile with stated total queued (20).
  - **M1 Offer-fit mapping:** Header says "OR/NV + HVAC" while one listed lead is "San Diego Heating and Cooling" (label mismatch risk).
- **Fix needed before final ops lock:** Reconcile totals and relabel batch geography/vertical tags.

## Asset C — `outbound_send_queue_2026-03-05.md`
- **Clarity:** 5/5
- **Offer Fit:** 4/5
- **Risk & Compliance:** 5/5
- **Formatting:** 5/5
- **Total:** **19/20**
- **Status:** **PASS**
- **Notes:** Strong operational readiness and traceability; maintain strict template-to-vertical mapping during execution.

---

## 4) Correction Workflow (Rapid)

1. **Intake + Status Tag**
   - Mark each asset: `draft`, `qa_hold`, `ready_to_send`.
2. **Score All 4 Domains**
   - Log score + defects with severity tags.
3. **Block Criticals**
   - Any critical => immediate `qa_hold` and send-block.
4. **Fix Order**
   - Critical -> Major fit/clarity -> Minor formatting.
5. **Re-Run Gate**
   - Confirm score threshold and zero criticals.
6. **Ops Reconciliation**
   - Verify queue totals, lead IDs, batch labels, and template mapping.
7. **Release**
   - Set `ready_to_send` only on PASS.
8. **Pattern Logging**
   - Record recurring defects to harden templates/playbooks.

### Defect Codes
- **C1:** Truth/compliance claim risk
- **C2:** Identity mismatch
- **C3:** Placeholder leak in send-ready asset
- **C4:** Missing operational IDs
- **M1:** Offer-fit mismatch
- **M2:** CTA/value ambiguity
- **M3:** Formatting/consistency issue

---

## 5) Immediate Remediation Queue

1. **`send_ops_queue_2026-03-05.md`**
   - Recalculate and correct vertical totals to exactly match queued count.
   - Update Batch C header so geography/vertical labels match actual records.
2. **Pre-send hard stop rule**
   - Any queue doc with arithmetic/label mismatch is `qa_hold` until corrected.
3. **Execution guardrail**
   - Before each send window: quick 60-second check for `total queued = sum(batch rows)` and template/vertical coherence.

This quality gate is practical, reusable, and enforceable at send speed while preventing credibility and execution errors.