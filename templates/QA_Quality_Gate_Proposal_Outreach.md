# QA Enforcement Sprint — Proposal & Outreach Quality Gate

## Purpose
A fast, repeatable gate to prevent low-quality proposals/outreach from being sent.

**Applies to:**
- Proposal docs/PDFs
- Fiverr/Upwork cover letters
- Cold/warm outreach emails/DMs
- Follow-up messages

---

## 1) Practical Quality Gate Checklist (Send/No-Send)

### A. Clarity (0–5)
- [ ] Opening states **who we help + what outcome** in 1 sentence.
- [ ] Problem statement is specific (not generic fluff).
- [ ] Scope is concrete: deliverables, timeline, assumptions.
- [ ] CTA is explicit (book call / reply with file / approve milestone).
- [ ] Message length is tight (no rambling; skimmable).

### B. Offer Fit (0–5)
- [ ] Offer maps to stated client need (or best-known proxy).
- [ ] Tier/pricing logic is coherent (Good/Better/Best or single clear option).
- [ ] Value is quantified where possible (time saved, error reduction, speed).
- [ ] Includes proof signal (relevant past result/process confidence marker).
- [ ] Next step friction is low (easy yes-path).

### C. Risk & Trust Checks (0–5)
- [ ] No unverifiable claims (no fake metrics/testimonials).
- [ ] No policy violations (platform-safe language, no off-platform push if restricted).
- [ ] Data/privacy language present when relevant.
- [ ] Commercial terms are clear (revision count, payment trigger, timeline guardrails).
- [ ] Tone is professional and non-desperate/non-pushy.

### D. Formatting & Delivery Hygiene (0–5)
- [ ] Correct recipient name/company/platform context.
- [ ] Grammar/spelling clean; no broken links/placeholders.
- [ ] Structure uses short paragraphs/bullets for readability.
- [ ] Subject line / opener matches body intent.
- [ ] File naming/versioning clean (e.g., `Client_Proposal_v3_2026-03-05.pdf`).

---

## 2) Pass/Fail Rubric

Score each section 0–5.

- **Hard-fail triggers (automatic NO-SEND):**
  1. Wrong recipient/client context
  2. Policy/compliance violation risk
  3. Unverifiable or misleading claim
  4. Missing CTA or missing price/scope when proposal requires it
  5. Broken links/placeholder text (`[CLIENT]`, `TBD`, etc.)

- **Thresholds:**
  - **PASS (Ready to send):** Total ≥ 16/20 and no hard-fails
  - **REVISE (Quick fix):** Total 12–15/20 and no hard-fails
  - **FAIL (Rewrite):** Total ≤ 11/20 or any hard-fail

- **Confidence tags:**
  - 18–20: High confidence
  - 16–17: Acceptable, send now
  - 12–15: Needs one revision loop
  - ≤11: Rebuild from template

---

## 3) Correction Workflow (Fast Loop)

### Step 0 — Gate Owner
Assign one owner (sender) and one checker (self-check acceptable when time-limited).

### Step 1 — Triage (2 minutes)
- Run hard-fail scan first.
- If any hard-fail: mark **FAIL** and jump to Step 3.

### Step 2 — Score (3 minutes)
- Score 4 categories (0–5 each).
- Record weak categories (anything ≤3).

### Step 3 — Correct by Priority (5–10 minutes)
Fix in this order:
1. **Risk/compliance**
2. **Offer fit**
3. **Clarity**
4. **Formatting**

### Step 4 — Re-score (2 minutes)
- Re-run checklist.
- If ≥16 and no hard-fail → **SEND**.
- If still <16 after 2 loops → escalate/rewrite from proven template.

### Step 5 — Log Learning (1 minute)
Capture recurring defects:
- "generic opener"
- "weak quantified value"
- "missing next-step CTA"
Use to improve base templates.

---

## 4) Defect Codes (for quick QA comments)
- **C1** unclear opener
- **C2** vague scope
- **C3** weak/no CTA
- **F1** poor offer-need match
- **F2** no quantified value
- **R1** unverifiable claim
- **R2** compliance/platform risk
- **R3** unclear commercial terms
- **D1** personalization error
- **D2** grammar/format/link issue

Use format: `FAIL: R2, C3, F2` or `REVISE: C1, D2`.

---

## 5) Application Templates (copy/paste)

### A) Proposal QA Record
```text
Asset: [client/proposal name]
Date: [YYYY-MM-DD]
Owner: [name]

Hard-fail check:
- Wrong recipient/context? [Y/N]
- Compliance risk? [Y/N]
- Unverifiable claim? [Y/N]
- Missing CTA/scope/price? [Y/N]
- Placeholder/broken link? [Y/N]

Scores:
- Clarity: [0-5]
- Offer Fit: [0-5]
- Risk & Trust: [0-5]
- Formatting: [0-5]
Total: [/20]
Decision: [PASS / REVISE / FAIL]
Defect codes: [e.g., C2, F2]
Fix owner + ETA: [name, time]
```

### B) Outreach Message QA Record
```text
Asset: [platform + prospect]
Hard-fail: [none / list]
Scores: C[ ] F[ ] R[ ] D[ ] = [ ]/20
Decision: [PASS/REVISE/FAIL]
Required edits (max 3):
1)
2)
3)
```

---

## 6) Example Application (Practical)

### Example outreach draft (before)
"Hi, I do automation and can help your business. I have many years of experience. Let me know."

### Gate result
- Clarity: 1 (no specific outcome)
- Offer Fit: 1 (no tie to need)
- Risk: 4 (safe but vague)
- Formatting: 4
- Total: 10/20 → **FAIL** (rewrite)
- Defects: C1, F1, F2, C3

### Corrected version (after)
"Hi Sarah — noticed your team is manually reconciling weekly sales CSVs. We can automate that into a 1-click Excel workflow that cuts processing time from ~3 hours to ~20 minutes/week and reduces formula errors. Fixed-price setup: $299, delivered in 3 business days, with 1 revision included. If useful, reply with a sample file and I’ll send a concrete implementation outline today."

Re-score:
- Clarity: 5
- Offer Fit: 5
- Risk: 5
- Formatting: 5
- Total: 20/20 → **PASS**

---

## 7) Operational Rule
**No proposal/outreach is sent without a QA record and PASS status (or explicit manager override).**
