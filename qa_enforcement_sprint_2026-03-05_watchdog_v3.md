# QA Enforcement Sprint — Practical Quality Gate (Proposals + Outreach)
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent

## 1) Practical Quality Gate Checklist (Pre-Send)
Score each domain 0–5.

### A) Clarity
- [ ] First 1–2 lines explain why this recipient is being contacted
- [ ] Offer states concrete deliverables (what gets built/done)
- [ ] Single primary CTA (one next action)
- [ ] Short, plain-language copy (no jargon/run-ons)
- [ ] Outcome framing is specific and realistic

### B) Offer Fit
- [ ] Service matches verified business type/use case
- [ ] Personalization uses verified facts only
- [ ] Offer maps to likely bottleneck (speed, follow-up, booking, conversion)
- [ ] Price/scope/timeline are internally consistent
- [ ] Depth matches stage (cold outreach vs formal proposal)

### C) Risk Checks
- [ ] No fabricated/unverifiable stats, rankings, guarantees
- [ ] No deceptive urgency/manipulative framing
- [ ] No placeholder leakage in send-ready assets
- [ ] No business/contact/location mismatch
- [ ] No contradictory or impossible claims

### D) Formatting & Send Readiness
- [ ] Subject line aligns to body intent
- [ ] Greeting/signoff/company identity present
- [ ] Bullets/spacing render cleanly in plain text
- [ ] Channel-safe punctuation/encoding used
- [ ] Traceability present (asset name/version/queue link)

---

## 2) Pass/Fail Rubric
- Max score: **20**
- **PASS:** >=16, no domain <4, zero critical flags
- **CONDITIONAL PASS:** 13–15, zero critical flags, same-session fixes required
- **FAIL:** <=12, any domain <=2, or any critical flag

### Critical Flags (Auto-Fail)
1. C1 — Unverifiable performance claim stated as fact
2. C2 — Wrong service/business identity
3. C3 — Placeholder leak in send-ready file
4. C4 — Missing/contradictory operational details likely to cause mis-send

---

## 3) Correction Workflow (Enforcement Loop)
1. **Tag:** `draft` / `qa_hold` / `ready_to_send`
2. **Score:** A/B/C/D + defect codes (Critical/Major/Minor)
3. **Block:** any Critical => `qa_hold` immediately
4. **Fix order:** Critical -> Major (fit/clarity) -> Minor (format/style)
5. **Re-score:** require PASS threshold
6. **Release:** only PASS assets move to queue/send
7. **Log:** defect pattern + fix pattern for prevention

Defect codes:
- **C1** truth/compliance risk
- **C2** identity mismatch
- **C3** placeholder leak
- **C4** operational contradiction
- **M1** weak offer fit
- **M2** unclear value/CTA
- **M3** formatting/readability friction

---

## 4) Applied QA (This Sprint)

### Asset A — `templates/upwork-proposal.md`
- Clarity: **4/5**
- Offer Fit: **4/5**
- Risk Checks: **4/5**
- Formatting: **5/5**
- **Total: 17/20**
- **Decision: PASS (template-stage)**
- Findings:
  - Strong skeleton and clean CTA flow.
  - Placeholder fields are expected at template-stage; must be replaced before send.
  - Minor improvement: replace generic proof placeholders (`[X similar projects]`) with verifiable proof before live submission.

### Asset B — `templates/email_outreach_pack_v55.md`
- Clarity: **5/5**
- Offer Fit: **4/5**
- Risk Checks: **4/5**
- Formatting: **5/5**
- **Total: 18/20**
- **Decision: PASS (template-stage)**
- Findings:
  - Excellent structure, concise CTAs, and strong sequence logic.
  - Risk note: "Results-Driven" template contains `{result}%` placeholder; safe as template, auto-fail if left unresolved in send-ready copy.

### Asset C — `outbound_send_queue_2026-03-05.md`
- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk Checks: **5/5**
- Formatting: **3/5**
- **Total: 18/20**
- **Decision: CONDITIONAL PASS**
- Findings:
  - Operationally strong queue summary.
  - Formatting defect **M3**: title contains encoding artifact (`?`) which can cause copy/render confusion in downstream docs.
  - Required fix: normalize title to ASCII-safe dash before handoff.

---

## 5) Immediate Fix Queue
1. **C3 prevention gate:** Add explicit pre-send check in send workflow: "No `{}` / `[]` / `{{}}` placeholders remain."
2. **Proof hygiene:** Replace unverifiable placeholders with factual, sourceable evidence in all send-ready assets.
3. **Formatting hardening:** Enforce ASCII-safe headers for queue docs to avoid transport/render artifacts.

---

## 6) Active Enforcement Standard
No proposal/outreach asset moves to send queue unless it has:
1. Logged rubric score,
2. PASS decision,
3. Zero critical flags,
4. Placeholder-scan clear,
5. Traceable linkage to queue/tracker.
