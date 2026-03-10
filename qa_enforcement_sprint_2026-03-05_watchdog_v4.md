# QA Enforcement Sprint — Quality Gate + Rubric + Correction Workflow
**Date:** 2026-03-05  
**Owner:** watchdog-qa-enforcement subagent  
**Scope:** Proposal + outreach assets (clarity, offer fit, risk, formatting)

---

## 1) Practical Quality Gate Checklist (Pre-Send)
Score each domain from 0–5.

### A. Clarity
- [ ] First 1–2 lines explain why recipient is being contacted.
- [ ] Offer states concrete deliverable(s), not vague capability claims.
- [ ] Exactly one primary CTA (single next action).
- [ ] Language is short/plain (owner-operator readable).
- [ ] Outcomes are specific and realistic.

### B. Offer Fit
- [ ] Service aligns to verified business type/use case.
- [ ] Personalization is based on factual observations only.
- [ ] Offer maps to likely bottleneck (response speed, follow-up, booking, conversion).
- [ ] Scope/price/timeline are internally consistent.
- [ ] Asset depth fits stage (cold outreach vs proposal).

### C. Risk Checks
- [ ] No fabricated/unverifiable stats or guarantees.
- [ ] No deceptive urgency/manipulative framing.
- [ ] No placeholder leakage in send-ready assets.
- [ ] No business/service/location mismatch.
- [ ] No contradictory operational claims.

### D. Formatting & Send Readiness
- [ ] Subject line intent matches body.
- [ ] Greeting/signoff/company identity present (as applicable).
- [ ] Bullets/spacing render cleanly in plain text.
- [ ] Encoding/punctuation channel-safe.
- [ ] File includes traceability (name/version/queue linkage).

---

## 2) Pass/Fail Rubric
- **Max score:** 20

### Decision Rules
- **PASS:** >=16, no domain <4, zero critical flags
- **CONDITIONAL PASS:** 13–15, zero critical flags, same-session fixes required
- **FAIL:** <=12, any domain <=2, or any critical flag

### Critical Flags (Auto-Fail)
- **C1:** Unverifiable claim presented as fact
- **C2:** Wrong business/service identity
- **C3:** Placeholder leak in send-ready copy
- **C4:** Contradictory/missing operational details that risk mis-send

---

## 3) Correction Workflow (Enforcement Loop)
1. **Tag status:** `draft` / `qa_hold` / `ready_to_send`
2. **Score gate:** A/B/C/D + defect codes
3. **Block criticals:** any C1–C4 => immediate `qa_hold`
4. **Fix order:** Critical -> Major (fit/clarity) -> Minor (format/style)
5. **Re-score:** must meet PASS rule
6. **Release:** only PASS assets may queue/send
7. **Log pattern:** defect type + fix pattern for future prevention

### Defect Codes
- **C1:** Truth/compliance risk
- **C2:** Identity mismatch
- **C3:** Placeholder leak
- **C4:** Operational contradiction
- **M1:** Weak offer fit
- **M2:** Unclear value/CTA
- **M3:** Formatting/readability friction

---

## 4) Applied QA (Completed)

### Asset 1 — `templates/upwork-proposal.md`
- Clarity: **4/5**
- Offer Fit: **4/5**
- Risk: **4/5**
- Formatting: **5/5**
- **Total: 17/20 — PASS (template-stage)**
- Notes:
  - Strong structure and singular CTA.
  - Contains template placeholders (`[Name]`, `[X]`, `[amount]`), acceptable at template-stage.
  - Must convert placeholders to verified specifics before submission (C3 prevention).

### Asset 2 — `templates/email_outreach_pack_v55.md`
- Clarity: **5/5**
- Offer Fit: **4/5**
- Risk: **4/5**
- Formatting: **5/5**
- **Total: 18/20 — PASS (template-stage)**
- Notes:
  - High-quality outreach variants and concise CTA patterns.
  - Placeholder tokens (`{result}%`, `{metric}` etc.) are expected in template.
  - Auto-fail if unresolved tokens appear in send-ready output (C3).

### Asset 3 — `outbound_send_queue_2026-03-05.md`
- Clarity: **5/5**
- Offer Fit: **5/5**
- Risk: **5/5**
- Formatting: **5/5**
- **Total: 20/20 — PASS**
- Notes:
  - Clean queue summary, clear send windows, and explicit logging fields.
  - Traceability to `outbound_send_queue_2026-03-05.csv` is present.

---

## 5) Immediate Enforcement Actions
1. Add pre-send placeholder scan check: block on `{...}`, `[...]`, `{{...}}` in any `ready_to_send` asset.
2. Require one-line evidence check for any quantitative claim before release.
3. Keep PASS log alongside queue files for auditability.

---

## 6) Release Standard (Effective Immediately)
No proposal/outreach asset may move to send queue unless all are true:
1. Rubric score logged,
2. PASS decision recorded,
3. Zero critical flags,
4. Placeholder scan clear (for send-ready files),
5. Queue/tracker traceability confirmed.
