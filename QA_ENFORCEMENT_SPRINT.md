# QA Enforcement Sprint — Proposals & Outreach Assets

## Scope Applied
Audited in `AUTONOMOUS_OUTREACH_ENGINE.md`:
- Cold Email Template 1 (Direct)
- Cold Email Template 2 (Problem-Solution)
- Cold Email Template 3 (Numbers Play)
- Objection Handling snippets (1–7)

---

## 1) Practical Quality Gate Checklist (Pre-Send)

Use this before any proposal/outreach message is sent.

### A. Clarity (0–25)
- [ ] Target and context are specific (industry, city, pain point)
- [ ] One primary CTA only (reply/schedule/demo)
- [ ] Offer is understandable in under 20 seconds
- [ ] Claims are concrete and not vague hype
- [ ] Reading level is simple (short lines, plain language)

### B. Offer Fit (0–25)
- [ ] Message aligns with recipient type (SMB owner vs freelancer partner)
- [ ] Value proposition matches likely pain (missed leads, slow ops, etc.)
- [ ] Price and scope match stated package
- [ ] Timeline is realistic and consistent with delivery capability
- [ ] Includes relevant proof/examples for this niche

### C. Risk & Compliance Checks (0–30)
- [ ] No unverifiable stats presented as fact (or they are cited)
- [ ] No guaranteed outcomes/revenue promises
- [ ] No manipulative pressure language (“you’re losing X/day” unless supportable)
- [ ] No contradictory commitments (price, timeline, terms)
- [ ] Contact/legal details are complete (identity, contact channel)
- [ ] No platform-policy red flags (spammy claims, misleading urgency)

### D. Formatting & Deliverability (0–20)
- [ ] Subject line is specific and non-clickbait
- [ ] Total length fits cold outreach norms (roughly 90–180 words)
- [ ] Bullets/scannable structure used where needed
- [ ] Personalization tokens are all filled (no [Owner Name] leaks)
- [ ] Signature block complete and consistent

---

## 2) Pass/Fail Rubric

### Scoring
- **Pass (Green):** 85–100 and no blocker
- **Conditional Pass (Yellow):** 70–84 and no blocker (can send after minor edits)
- **Fail (Red):** <70 OR any blocker present

### Blocker Conditions (Auto-Fail)
1. Unverified numerical claims used as factual proof (e.g., precise conversion percentages) with no source.
2. Explicit/implicit guaranteed revenue outcome.
3. Missing sender identity/contact channel.
4. Unresolved token placeholders in final message.
5. Offer/timeline contradiction that could cause delivery failure.

---

## 3) Applied Audit Results

| Asset | Clarity (25) | Offer Fit (25) | Risk (30) | Formatting (20) | Total | Result | Key Reason |
|---|---:|---:|---:|---:|---:|---|---|
| Template 1 (Direct) | 22 | 21 | 14 | 16 | 73 | **Conditional Pass** | Strong structure; risk hit from unsupported stats (81%, 3-5x, seasonal claim). |
| Template 2 (Problem-Solution) | 23 | 22 | 15 | 17 | 77 | **Conditional Pass** | Clear pain/ROI; includes unsourced claims and hard-loss framing. |
| Template 3 (Numbers Play) | 21 | 18 | 8 | 16 | 63 | **Fail** | Multiple precise revenue-loss claims without evidence; reads as over-assertive. |
| Objection Responses 1–7 | 19 | 20 | 10 | 15 | 64 | **Fail** | Contains aggressive certainty (“add $2-5K/mo”, “lose 7 out of 10”) without substantiation. |

### Overall QA Status: **FAIL**
Reason: Two core assets fail; all assets require risk-language correction before scaled send.

---

## 4) Correction Workflow (Enforcement)

### Step 1 — Intake Tagging
- Tag each draft as: `cold_email`, `proposal`, `objection_reply`, `follow_up`.

### Step 2 — First-Pass QA (Author)
- Run checklist A–D.
- Self-score and mark blockers.

### Step 3 — Risk Rewrite (Mandatory if any risk item missed)
- Replace hard claims with either:
  - Evidence-backed claim + source, or
  - Softened language (“many owners report…”, “often”, “can help”).
- Remove deterministic revenue promises.

### Step 4 — Format Normalization
- Ensure one CTA.
- Keep length concise.
- Fill all personalization fields.

### Step 5 — Gate Decision
- Apply rubric.
- If **Fail**, do not send.
- If **Conditional Pass**, one quick revision loop then re-score.

### Step 6 — Release & Log
- Send only assets with Pass/Conditional Pass.
- Log score and issues in outreach tracker (`leads.jsonl` notes field or QA log).

### Step 7 — Weekly Defect Review
- Count repeat failures by category (clarity/fit/risk/format).
- Create one preventive template update per top defect.

---

## 5) Immediate Fixes Required (Highest Priority)

1. **Remove/soften unsourced statistics** across templates and objections.
2. **Replace guaranteed ROI language** with probability framing and “results vary”.
3. **Standardize signature** with working email/phone in every template.
4. **Add proof slot** (“example relevant to your trade”) rather than generic promise.
5. **Set send threshold:** nothing ships below 85 unless explicitly approved as test.

---

## 6) Quick Safe-Language Swaps (Drop-in)

- “You’re losing $2,000–4,000/month” → “You may be missing inbound calls from people who search online first.”
- “One extra job pays for it” → “For many businesses, one additional booked job can cover most or all of the build cost.”
- “Landscapers with websites get 3–5x more calls” → “Businesses with clear, mobile-friendly web presence often convert more search traffic into calls.”
- “Worth 30 minutes to add $2-5K/month?” → “If helpful, we can do a quick 30-minute kickoff and I handle the rest.”

---

## Enforcement Rule
If any blocker appears, asset is **Not Sendable** until corrected and re-scored.
