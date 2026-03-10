# Proposal + Outreach Quality Gate (QA Enforcement Sprint)

**Purpose:** Prevent low-converting or risky proposal/outreach assets from being sent.

**Applies to:**
- Job proposals (Upwork/Fiverr/email)
- First-touch outreach (SMS/email/DM)
- Follow-ups and call scripts

---

## 1) Practical Quality Gate Checklist

Use this as a pre-send gate. Mark each item ✅ / ⚠️ / ❌.

### A. Clarity (0–5)
1. **Audience-specific opener** (references client/job context, not generic).
2. **Single core offer/outcome** is obvious in first 2–3 lines.
3. **Plain language** (no jargon-heavy or vague claims).
4. **Concrete next step CTA** (reply/book call/send mockup).
5. **Length discipline** (proposal: skimmable; outreach: short enough for channel).

### B. Offer Fit (0–5)
1. **Pain ↔ offer match** is explicit.
2. **Proof relevance** (example/credential tied to same service type).
3. **Scope realism** (timeline/pricing/effort plausible, no overpromise).
4. **Client benefit quantified or specific** (time saved, faster response, etc.).
5. **Objection handling** (low-friction start, risk reversal, or clarity on what happens next).

### C. Risk Checks (0–5)
1. **No fabricated proof** (all claims verifiable).
2. **No prohibited promises** (e.g., guaranteed rankings/revenue without caveat).
3. **Compliance-safe language** (no spammy/manipulative or deceptive wording).
4. **No sensitive data leakage** (PII, secrets, keys, internal notes).
5. **No contradictory terms** (timeline, price, deliverables aligned).

### D. Formatting + Delivery Readiness (0–5)
1. **Template placeholders resolved** (`[Name]`, `[X]`, etc.).
2. **Grammar/spelling clean** and punctuation consistent.
3. **Channel formatting fit** (SMS short lines, proposal sections, bullets).
4. **Scannable structure** (header, bullets, CTA).
5. **Tracking hooks present** (lead ID/touchpoint/follow-up trigger where applicable).

---

## 2) Pass/Fail Rubric

## Scoring
- Score each domain out of 5 (max total 20).
- Also enforce **hard-fail rules** below.

## Decision Bands
- **PASS (Send-ready):** 17–20 total, and no domain below 4, and no hard-fail triggered.
- **CONDITIONAL PASS (Needs quick edits):** 14–16 total, no hard-fail triggered. Must fix flagged items before send.
- **FAIL (Do not send):** ≤13 total, or any hard-fail triggered.

## Hard-Fail Rules (automatic FAIL)
1. Unresolved placeholders in outbound copy.
2. Any unverified/fabricated results claim.
3. Contradictory price/timeline/deliverables.
4. Missing CTA (no clear next action).
5. Policy/safety breach (sensitive data, deceptive language).

---

## 3) Correction Workflow (Fast Loop)

1. **Gate Review (2–4 min)**
   - Score all 4 domains.
   - Mark hard-fail checks first.

2. **Issue Classification**
   - **Critical:** hard-fail or risk/compliance issue.
   - **Major:** weak offer fit/unclear CTA.
   - **Minor:** wording/format polish.

3. **Fix Order (highest impact first)**
   1) Risk/compliance problems
   2) Offer-message mismatch
   3) CTA clarity
   4) Formatting/grammar

4. **Rewrite Rules**
   - Keep one primary outcome.
   - Add one proof point tied to client context.
   - Add one explicit next step.
   - Remove vague superlatives.

5. **Re-score + Release**
   - Re-run checklist.
   - Send only at PASS or corrected CONDITIONAL PASS.
   - Log key failure pattern for future templates.

---

## 4) Applied QA (Current Assets)

Assets reviewed:
1. `templates/upwork-proposal.md`
2. `templates/site_demo_pack.md`
3. `templates/send_ops_queue_v55.md`

### A) `upwork-proposal.md`
- **Clarity:** 3/5
- **Offer Fit:** 2/5
- **Risk Checks:** 4/5
- **Formatting:** 2/5
- **Total:** 11/20 → **FAIL**

**Why:**
- Heavy placeholder dependency (`[Name]`, `[X]`, `[amount]`) = hard-fail if unswapped.
- Generic “Why Hire Me” with weak job-specific proof.
- CTA exists but low specificity on next step options.

**Required corrections before use:**
1. Force placeholder resolution checklist before send.
2. Replace generic bullets with role-specific evidence (same industry/tool stack).
3. Add a tighter CTA: “Share access + key constraints, I’ll return fixed scope in 24h.”

### B) `site_demo_pack.md`
- **Clarity:** 4/5
- **Offer Fit:** 4/5
- **Risk Checks:** 3/5
- **Formatting:** 3/5
- **Total:** 14/20 → **CONDITIONAL PASS**

**Why:**
- Strong structure and outcomes language.
- Multiple proof placeholders (`[XX]%`, testimonials) risk accidental unsourced claims if shipped raw.
- Good CTA coverage but needs “do/don’t publish placeholder proof” guardrail.

**Required corrections before external use:**
1. Replace all metric/testimonial placeholders with verified references OR remove them.
2. Add a “proof status” line per section (Verified / Placeholder).
3. Add version/date stamp to prevent stale drafts being used.

### C) `send_ops_queue_v55.md`
- **Clarity:** 5/5
- **Offer Fit:** 4/5
- **Risk Checks:** 4/5
- **Formatting:** 5/5
- **Total:** 18/20 → **PASS**

**Why:**
- Clear sequencing, channel-specific brevity, explicit follow-up triggers.
- Strong message pattern and execution checklist.
- Minor improvement: add compliance note on outreach consent/quiet hours by locale.

**Recommended enhancement (non-blocking):**
- Add one line: “Respect local SMS consent/time-of-day rules before send.”

---

## 5) Lightweight QA Log Template

Use before any outbound send:

```md
Asset:
Date:
Reviewer:

Clarity: _/5
Offer Fit: _/5
Risk: _/5
Formatting: _/5
Total: _/20
Decision: PASS | CONDITIONAL PASS | FAIL
Hard-fail triggered? Y/N

Top fixes:
1)
2)
3)

Re-score after fixes: _/20
Final release status:
```

---

## 6) Enforcement Rule (Operational)

**No outbound proposals/outreach are sent without a QA gate score recorded.**
If score is FAIL or hard-fail triggered, asset is blocked until corrected and re-scored.
