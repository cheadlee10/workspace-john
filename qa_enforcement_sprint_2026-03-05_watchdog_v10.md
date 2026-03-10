# QA Enforcement Sprint v10 — Practical Gate + Rubric + Correction Workflow
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent  
**Scope:** proposals + outreach assets before send/queue

---

## 1) Practical Quality Gate Checklist (Operator-Friendly)

### A) Clarity (0–5)
- [ ] Why this recipient is being contacted is explicit in first 1–2 lines.
- [ ] Offer states concrete deliverable(s), timeline, and next step.
- [ ] Single primary CTA (one action path).
- [ ] Copy is skimmable (short paragraphs/bullets).
- [ ] No vague hype language.

### B) Offer Fit (0–5)
- [ ] Asset matches recipient type/industry/location.
- [ ] Personalization uses verified facts only.
- [ ] Pain-to-solution mapping is explicit.
- [ ] Price/scope is internally consistent and fulfillable.
- [ ] Channel fit is correct (email/call/SMS/DM).

### C) Risk Checks (0–5)
- [ ] No fabricated or unsourced stats as fact.
- [ ] No guarantees/deceptive certainty framing.
- [ ] No placeholder leakage (`{{...}}`, TODOs, dummy fields).
- [ ] No identity mismatches (name/service/location/contact).
- [ ] Claims are defensible if challenged.

### D) Formatting & Send Readiness (0–5)
- [ ] Subject/body alignment (if email).
- [ ] Greeting + signature + valid contact details present.
- [ ] Plain-text friendly formatting.
- [ ] Spelling/grammar pass.
- [ ] Traceability present (lead ID, queue linkage, or send tracking context).

---

## 2) Pass/Fail Rubric

### Score Model
- 4 domains × 5 points = **20 max**.

### Decision Thresholds
- **PASS:** total >= 16, no domain < 4, and no critical flags.
- **CONDITIONAL PASS:** total 13–15, no critical flags; same-day fixes required.
- **FAIL:** total <= 12, or any domain <= 2, or any critical flag.

### Critical Flags (Auto-Fail)
1. Unsourced/unverifiable performance claim presented as fact.
2. Wrong identity or offer-to-recipient mismatch.
3. Placeholder/dummy data in send-ready artifact.
4. Missing operational traceability for queued sends.

---

## 3) Correction Workflow (Fast Enforcement)

1. **Intake + Status Tag**
   - Mark asset: `draft` / `qa_hold` / `ready_to_send`.
2. **First Pass Scoring**
   - Score A/B/C/D; tag defects as Critical/Major/Minor.
3. **Blocker Rule**
   - Any Critical => immediate `qa_hold` (no send).
4. **Fix Order**
   - Critical first (truth/identity/placeholders) → Major (fit/CTA) → Minor (style/format).
5. **Proof Edit Log**
   - Save before/after lines for every Critical and Major fix.
6. **Re-Score**
   - Re-run rubric and confirm threshold.
7. **Release Gate**
   - Promote to `ready_to_send` only if PASS conditions met.
8. **Pattern Capture**
   - Log repeated failure patterns for template hardening.

### SLA Targets
- Critical defects: fix within same working block (<=2 hours).
- Major defects: same day.
- Minor defects: before batch close.

---

## 4) Applied QA (This Sprint)

## Asset A — Proposal/Outbound Email
**File:** `KEVIN_EMAIL_READY_TO_SEND.txt`

- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk Checks: **4/5**
- Formatting: **5/5**
- **Total: 19/20 — PASS**

**Issue found (Major-risk wording hardening):**
- “SEO-optimized for Google ranking” can read as implicit rank promise.

**Fix recommendation:**
- Replace with: “Built with local SEO best practices to improve discoverability.”

---

## Asset B — Outreach Playbook
**File:** `LOCAL_BUSINESS_OUTREACH.md`

- Clarity: **4/5**
- Offer Fit: **4/5**
- Risk Checks: **1/5**
- Formatting: **4/5**
- **Total: 13/20 — FAIL (Critical)**

**Critical defects:**
- Unsourced market percentages presented as facts.
- Guaranteed outcome language (“20-30% more customers…”).
- High-certainty persuasion framing unsuitable for compliance-safe collateral.

**Required correction set:**
- Convert numeric claims to sourced citations or non-numeric benefit language.
- Replace guarantees with probability/intent language.
- Remove “quit your job” certainty framing.

---

## Asset C — Operational Send Queue
**File:** `send_ops_queue_2026-03-05_ready.md`

- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk Checks: **5/5**
- Formatting: **5/5**
- **Total: 20/20 — PASS**

**Result:**
- Clean execution language, complete tracking fields, and strong queue traceability.

---

## 5) Correction Pack (Ready-to-Apply Replacements)

Use globally in outreach assets:

- “Most clients see 20-30% more customers within the first month.”
  → “Clients use this to improve visibility, credibility, and inquiry volume.”

- “Businesses WITHOUT websites in 2026: [percent list]”
  → “Many local businesses still rely on directories/social profiles without a dedicated website.”

- “This is how you quit your job.”
  → “This can become a reliable recurring-revenue channel when executed consistently.”

- “SEO-optimized for Google ranking”
  → “Built with local SEO best practices (metadata, structure, mobile performance).”

---

## 6) Enforcement Standard Going Forward
No proposal/outreach asset moves to send queue unless all are true:
1. Rubric scored and logged.
2. PASS achieved.
3. Zero critical flags.
4. Traceability confirmed (lead/queue linkage).

This defines the practical gate, applies it to live assets, and enforces a repeatable correction loop.