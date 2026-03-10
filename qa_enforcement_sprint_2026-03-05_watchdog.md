# QA Enforcement Sprint — Proposals & Outreach Assets
**Date:** 2026-03-05
**Owner:** watchdog-qa-enforcement

## 1) Practical Quality Gate Checklist
Use this gate before any proposal/outreach asset is marked send-ready.

### A. Clarity (0–5)
- [ ] Opening explains why recipient is contacted (1–2 lines)
- [ ] Offer is concrete (what is delivered)
- [ ] One clear CTA (single next step)
- [ ] No jargon/run-ons/ambiguous claims
- [ ] Readability fits busy operators (short blocks/bullets)

### B. Offer Fit (0–5)
- [ ] Offer matches verified lead service/category
- [ ] Personalization uses verified facts only
- [ ] Offer maps to pain/workflow (intake, callbacks, missed leads)
- [ ] Pricing/scope internally consistent
- [ ] Required placeholders/tokens included only where expected

### C. Risk Checks (0–5)
- [ ] No fabricated stats, rankings, guarantees, superiority claims
- [ ] No deceptive urgency framing
- [ ] No leaked placeholders in final-send assets (`{{...}}`)
- [ ] No dummy contacts/broken links
- [ ] No business/location/service mismatches

### D. Formatting (0–5)
- [ ] Subject line aligns with body
- [ ] Greeting + signature present
- [ ] Channel-safe punctuation/encoding
- [ ] Bullets/lists render cleanly in plain text
- [ ] Traceability fields/IDs present

---

## 2) Pass/Fail Rubric
- Score each domain 0–5 (max 20)
- **PASS:** >=16 total, no domain <4, no critical flags
- **CONDITIONAL PASS:** 13–15, no critical flags, same-day fixes required
- **FAIL:** <=12, any domain <=2, or any critical flag

### Critical Flags (auto-fail)
1. Fabricated/unverifiable performance claims as fact
2. Wrong business/service identity
3. Placeholder leak in send-ready asset
4. Missing operational identifiers required for execution/tracking

---

## 3) Correction Workflow
1. **Label:** `draft` / `qa_hold` / `ready_to_send`
2. **Score:** A/B/C/D + defect list (Critical/Major/Minor)
3. **Block:** Any Critical => `qa_hold`
4. **Fix Priority:** Critical -> Major -> Minor
5. **Proof Pass:** Re-score and compare before/after
6. **Ops Sync:** Confirm queue/tracker/lead IDs
7. **Release:** Mark `ready_to_send` only if PASS
8. **Log Pattern:** Record recurring defects for prevention

Defect taxonomy:
- **C1** truth/compliance
- **C2** identity mismatch
- **C3** placeholder leak
- **M1** weak fit
- **M2** unclear value/CTA
- **M3** formatting/readability friction

---

## 4) Applied QA Results (This Sprint)

### Asset A — `email-templates/next-queued-email-assets-2026-03-03-batch116.md`
- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk: **4/5** (template placeholders intentionally present)
- Formatting: **5/5**
- Total: **19/20**
- Decision: **PASS (template-stage)**
- Note: Must enforce C3 check at merge-to-send step to ensure token replacement.

### Asset B — `pitches/evergreen-pitch.md` (pre-fix)
- Clarity: **4/5**
- Offer Fit: **4/5**
- Risk: **2/5**
- Formatting: **5/5**
- Total: **15/20**
- Decision: **FAIL** (critical risk posture)
- Critical defects:
  - **C1:** Unverified statistic ("80% of customers search on their phones")
  - **C1:** Broad market-price claim ("Most web designers charge $2,000-5,000")
  - **Major:** ROI phrasing read as near-guarantee

### Asset B — `pitches/evergreen-pitch.md` (post-fix applied)
Applied corrections:
- Replaced phone-usage statistic with capability statement
- Replaced comparative pricing claim with positioning statement
- Softened ROI line to non-guaranteed outcome framing

Rescore:
- Clarity: **5/5**
- Offer Fit: **4/5**
- Risk: **5/5**
- Formatting: **5/5**
- Total: **19/20**
- Decision: **PASS**

---

## 5) Enforcement Standard (effective now)
No proposal/outreach asset advances to send queue without:
1. Logged QA score,
2. PASS decision,
3. Zero critical flags,
4. Traceable lead/queue linkage.
