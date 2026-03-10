# QA Enforcement Sprint - Practical Quality Gate
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent  
**Scope:** Proposals + outreach assets (clarity, offer fit, risk checks, formatting)

---

## 1) Practical Quality Gate Checklist (Use Before Any Send)

### A. Clarity (0-5)
- [ ] Opening states why recipient is being contacted in 1-2 lines.
- [ ] Offer is explained in plain language (what is delivered, not vague hype).
- [ ] CTA is singular and explicit (one next action).
- [ ] Message avoids jargon, run-ons, and ambiguous claims.
- [ ] Reading level suitable for busy owner/operator (short paragraphs + bullets).

### B. Offer Fit (0-5)
- [ ] Service matches lead's known category (e.g., painting lead gets painting-site pitch).
- [ ] Personalization is based on verified facts only (no guessing).
- [ ] Offer maps to recipient's likely workflow/pain (quote intake, callbacks, missed leads).
- [ ] Price/scope (if mentioned) is internally consistent.
- [ ] Asset includes required operational placeholders/tokens where needed.

### C. Risk & Compliance (0-5)
- [ ] No fabricated metrics, rankings, guarantees, or unverifiable superiority claims.
- [ ] No false urgency or deceptive framing.
- [ ] No placeholder leakage (`{{...}}`) in final-send versions.
- [ ] No dummy contact info, broken links, or invalid identifiers.
- [ ] No contradictory facts (service/location/business name mismatch).

### D. Formatting & Delivery Readiness (0-5)
- [ ] Subject lines are usable and aligned to body.
- [ ] Greeting, signature, and company identity are present.
- [ ] ASCII-safe punctuation if channel requires it.
- [ ] Bullet/list formatting renders cleanly in plain email.
- [ ] File includes lead IDs / queue linkage for traceability.

---

## 2) Pass/Fail Rubric

### Scoring
- Score each domain 0-5.
- **Total possible:** 20.

### Rules
- **PASS:** Total >= 16 **and** no domain < 4 **and** no Critical risk flags.
- **CONDITIONAL PASS:** Total 13-15, no Critical risk flags (requires same-day fixes + re-check).
- **FAIL:** Total <= 12, or any domain <= 2, or any Critical risk flag.

### Critical Risk Flags (auto-fail)
1. Fabricated or unverifiable performance claims presented as fact.
2. Wrong business/service identity in offer.
3. Placeholder tokens left in a send-ready asset.
4. Missing required legal/operational identifiers for queue/send workflow.

---

## 3) Correction Workflow (Fast, Repeatable)

1. **Intake & Label**
   - Tag asset status: `draft`, `qa_hold`, `ready_to_send`.
2. **Run Gate**
   - Score A/B/C/D and list defects by severity: Critical, Major, Minor.
3. **Block on Criticals**
   - Any Critical => immediate `qa_hold`; do not queue/send.
4. **Fix by Priority**
   - Critical first, then Major (fit/clarity), then Minor (style/format).
5. **Proof Pass**
   - Re-run checklist; compare before/after scores.
6. **Operational Sync**
   - Confirm queue/tracker/lead ID consistency.
7. **Release**
   - Mark `ready_to_send` only after PASS threshold met.
8. **Log**
   - Record defect pattern and fix pattern for future prevention.

### Defect Taxonomy (for consistent triage)
- **C1:** Truth/compliance risk
- **C2:** Identity mismatch
- **C3:** Placeholder/send artifact leak
- **M1:** Weak offer fit
- **M2:** Unclear CTA/value statement
- **M3:** Formatting/readability friction

---

## 4) Applied QA (This Sprint)

### Asset A: `email-templates/next-queued-email-assets-2026-03-03-batch116.md`
- **Clarity:** 5/5
- **Offer Fit:** 5/5
- **Risk & Compliance:** 4/5 (tokens present intentionally in template file; acceptable pre-send)
- **Formatting:** 5/5
- **Total:** 19/20
- **Status:** **PASS**
- **Notes:** Strong structure and consistent CTA options. Must ensure token replacement at final send step to prevent C3 auto-fail.

### Asset B: `pitches/evergreen-pitch.md`
- **Clarity:** 4/5
- **Offer Fit:** 4/5
- **Risk & Compliance:** 2/5
- **Formatting:** 5/5
- **Total:** 15/20
- **Status:** **FAIL** (Critical risk posture)
- **Defects found:**
  - **C1 (Critical):** "80% of customers search on their phones" stated as fact without source.
  - **C1 (Critical):** "Most web designers charge $2,000-5,000" broad comparative claim likely unverifiable in-context.
  - **M2:** Multiple value claims in one block reduce precision; CTA remains good.

---

## 5) Immediate Fix Guidance for Failed Asset (`evergreen-pitch.md`)

### Replace risky lines
- Replace: "Mobile-optimized (80% of customers search on their phones)"
- With: "Mobile-optimized so it works cleanly on phones, tablets, and desktops."

- Replace: "Most web designers charge $2,000-5,000..."
- With: "My package is priced for local service businesses that want a straightforward launch without agency overhead."

### Post-fix expected score
- Clarity 5, Offer Fit 4-5, Risk 5, Formatting 5 => **19-20 (PASS)**

---

## 6) Operational Standard Going Forward
- No asset can move to send queue unless it has:
  1. Rubric score logged,
  2. PASS status,
  3. Zero critical flags,
  4. Queue/tracker traceability confirmed.

This establishes a practical, repeatable QA gate that protects conversion quality while reducing compliance and credibility risk.