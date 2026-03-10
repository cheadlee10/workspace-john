# QA Enforcement Sprint — Proposals & Outreach Assets (V3)
Date: 2026-03-05
Owner: John BD QA

## 1) Practical Quality Gate Checklist (Use before every send)
Score each item Pass/Fail, then total by domain.

### A) Clarity (0–5)
1. First line is prospect-specific (not generic opener)
2. Offer is explicit by line 3
3. Single primary CTA (one action only)
4. Message length fits channel (email 80–140 words for first-touch)
5. Plain language, no jargon/filler

### B) Offer Fit (0–5)
1. Includes at least 2 verified personalization facts
2. Offer matches likely buyer stage (cold vs warm vs proposal)
3. Outcome is concrete (calls/leads/time saved), not just features
4. Scope/timeline realistic for service promised
5. Proof is relevant and specific (result + context)

### C) Risk Checks (0–5)
1. No fabricated stats, claims, or case studies
2. No pricing in first-touch cold outreach
3. No conflicting scope/timeline/price terms
4. No placeholders unresolved ([Name], {{company}}, etc.)
5. No sensitive/confidential data in outbound copy

### D) Formatting & Readiness (0–5)
1. Names/company/location accurate
2. Grammar/spelling clean
3. Signature complete and consistent
4. Links/attachments verified
5. Subject line and body aligned with CTA

---

## 2) Pass/Fail Rubric
**Total possible:** 20

### Critical auto-fail triggers
- Wrong recipient/company/location
- Unresolved placeholder text
- Fabricated/deceptive claim
- Missing CTA
- First-touch message includes pricing
- Contradictory terms likely to cause dispute

### Decision bands
- **PASS:** 17–20 and no critical trigger
- **PASS WITH FIXES:** 14–16 and no critical trigger (must patch before send)
- **FAIL:** 0–13 or any critical trigger

---

## 3) Correction Workflow (Enforcement Loop)
1. **Classify asset:** `first_touch`, `follow_up`, or `proposal`
2. **Run critical-trigger scan first** (instant block if any trigger)
3. **Score A/B/C/D domains**
4. **Fix in priority order:**
   - Risk/compliance blockers
   - Offer-fit gaps
   - CTA/clarity
   - Formatting polish
5. **Re-score** after edits
6. **Release gate:** only send if score >= 17 and no critical trigger
7. **Log result:** file + score + blocker codes

### Blocker codes (for repeat failure tracking)
- `R1` pricing in cold first-touch
- `R2` unresolved placeholders
- `R3` unverifiable claim
- `F1` wrong recipient/company details
- `C1` missing or multi-CTA confusion
- `O1` weak personalization (<2 facts)

---

## 4) Applied QA Audit + Remediation

### Asset 1 — `templates/upwork-proposal.md`
- Previous: 14/20 (PASS WITH FIXES)
- Issues: generic personalization, weak proof format
- Fixes applied:
  - Added mandatory 2-detail job-specific block
  - Added mandatory proof line format (`result + timeframe + context`)
- Current score: **18/20 (PASS)**

### Asset 2 — `email-templates/proposal-email.md`
- Current score: **17/20 (PASS)**
- Notes:
  - Structure is clean for warm/proposal stage
  - Placeholder discipline still mandatory pre-send
- Status: **No edits required for gate compliance**

### Asset 3 — `pitches/evergreen-pitch.md`
- Previous: 13/20 + critical trigger (FAIL)
- Critical trigger: pricing included in first-touch email
- Fixes applied:
  - Removed all pricing/hosting terms
  - Compressed to short personalized hook + single demo CTA
  - Kept one clear reply action (“send demo”)
- Current score: **17/20 (PASS)**

---

## 5) Operational Enforcement Rule
- No outbound proposal/outreach may be sent without a QA score line in-file or in send log.
- Any **FAIL** blocks send until corrected and rescored.
- If same blocker code repeats 3x in a week, update template and playbook same day.
