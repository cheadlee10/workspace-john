# QA Enforcement Sprint — Proposals & Outreach Assets
Date: 2026-03-05
Owner: John BD QA

## 1) Practical Quality Gate Checklist (Go/No-Go)
Use this before any proposal/outreach is sent.

### A. Clarity Gate (0–5)
- [ ] Target + context is explicit in first 2 lines (who this is for and why now)
- [ ] Problem/opportunity is specific (not generic "you need a website" phrasing)
- [ ] Offer is concrete (deliverables, timeline, revisions, and what is NOT included)
- [ ] CTA is singular and low-friction (one next step only)
- [ ] Reading level is simple and scannable (short paragraphs/bullets)

### B. Offer-Fit Gate (0–5)
- [ ] Asset is personalized with at least 2 true client/job-specific details
- [ ] Price is anchored to value (ROI or outcome, not only discount framing)
- [ ] Package/tier choice maps to buyer stage (cold outreach ≠ full 3-tier dump unless requested)
- [ ] Delivery promise matches actual capacity (timeline realistic)
- [ ] Evidence/credibility included (proof, prior result, niche focus)

### C. Risk/Compliance Gate (0–5)
- [ ] No unverifiable claims, fake urgency, or inflated stats
- [ ] Contact details are consistent and non-conflicting
- [ ] No sensitive/internal info leakage (tokens, ops details, internal process jargon)
- [ ] No legal/commercial ambiguity (payment trigger, revision boundary, ownership/hosting boundaries)
- [ ] Tone is professional and non-spammy (no manipulative pressure)

### D. Formatting/Deliverability Gate (0–5)
- [ ] Subject line is clear and specific (for emails)
- [ ] Structure follows: Hook → Relevance → Offer → Proof → CTA
- [ ] Mobile-friendly formatting (short lines, bullets, no wall of text)
- [ ] Grammar/spelling clean; punctuation consistent
- [ ] Link/attachment plan is explicit and minimal

## 2) Pass/Fail Rubric
### Scoring
- Each gate scored 0–5, total /20.
- Critical-fail items (auto-fail regardless of score):
  1) Unverifiable/deceptive claims
  2) Conflicting or wrong contact/payment details
  3) Missing clear CTA
  4) Scope/price ambiguity likely to cause dispute

### Decision Bands
- **PASS (Send):** 17–20 and no critical fails
- **PASS WITH MINOR FIXES:** 14–16 and no critical fails; fixes <10 minutes
- **FAIL (Rewrite required):** ≤13 or any critical fail

## 3) Correction Workflow (Fast QA Loop)
1. **Intake**: Tag asset as `draft` and classify type (`cold_email`, `proposal`, `followup`).
2. **Score**: Run gates A–D and mark critical-fail checks.
3. **Diagnose**: Record top 3 blockers only (avoid over-editing).
4. **Patch**:
   - Clarity issue → rewrite first 3 lines + CTA
   - Offer-fit issue → add 2 specific details + 1 proof/ROI anchor
   - Risk issue → remove/qualify risky claims, align contacts/pricing terms
   - Formatting issue → convert to short blocks + bullet structure
5. **Re-score**: Must hit 17+ with zero critical fails.
6. **Release**: Mark `ready_to_send`; store final in template library.
7. **Post-send feedback** (optional): log response outcomes to improve thresholds.

## 4) Application to Current Assets

## Asset A: `templates/upwork-proposal.md`
### Score
- Clarity: 4/5
- Offer-fit: 3/5
- Risk: 4/5
- Formatting: 5/5
- **Total: 16/20 → PASS WITH MINOR FIXES**

### Findings
- Good structure and scannability.
- Too generic for competitive Upwork contexts; lacks proof snippets/results.
- Could reduce friction by stronger CTA (time-boxed call or quick scope question).

### Required Fixes
1. Add one metric proof placeholder (e.g., turnaround/result).
2. Add personalization prompt block requiring 2 job-post specifics.
3. Upgrade CTA to a single action: "Send me your file + deadline and I’ll return exact scope/price in X hours."

## Asset B: `email-templates/proposal-email.md`
### Score
- Clarity: 5/5
- Offer-fit: 4/5
- Risk: 3/5
- Formatting: 5/5
- **Total: 17/20 → PASS**

### Findings
- Strong proposal skeleton and tiering clarity.
- Missing explicit boundary language (what happens after included revisions; hosting/ownership where relevant).
- Could add one proof line for trust.

### Required Fixes
1. Add "Out of Scope" and revision overage sentence.
2. Add 1-line credibility proof before close.
3. Keep attachment section but cap to max 2 attachments.

## Asset C: `pitches/evergreen-pitch.md`
### Score
- Clarity: 4/5
- Offer-fit: 4/5
- Risk: 2/5
- Formatting: 4/5
- **Total: 14/20 → PASS WITH MINOR FIXES (borderline)**

### Findings
- Personalization is solid and value proposition is clear.
- Risk issue: comparative pricing claim ("Most web designers charge $2,000-5,000") is broad/unverified in-message.
- Slightly long for cold outreach; can tighten body and sharpen CTA.

### Required Fixes
1. Replace broad market-price claim with outcome framing or qualified wording.
2. Add clear boundaries: what $250 includes and excludes.
3. Shorten to ~120–170 words for better response odds.

## 5) Enforcement Standard Going Forward
- Do not send any outreach/proposal under 14/20.
- Any critical-fail item = immediate rewrite.
- Target operational baseline: **17+/20** for all outbound assets.
- Keep edits constrained: one pass, top-3 blockers, re-score, ship.

## 6) Quick Correction Snippets (Drop-in)
### Scope Boundary Line
"Includes up to 2 revision rounds; additional changes are quoted separately before work begins."

### Proof Line
"Recent similar builds: local-service sites delivered in 3–5 days with conversion-focused contact flow."

### Safer Value Anchor (replace broad pricing claims)
"For many local businesses, one additional booked job can cover this build cost."

### Single CTA Pattern
"Reply with your top priority (more calls, quote requests, or visibility), and I’ll send a one-page plan within 24 hours."
