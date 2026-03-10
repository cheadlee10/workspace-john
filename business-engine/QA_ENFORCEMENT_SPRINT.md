# QA Enforcement Sprint — Proposals/Outreach Quality Gate

## 1) Practical Quality Gate Checklist (Pre-Send)
Use this for every proposal, cold email, follow-up, and pitch body.

### A. Clarity (must pass all)
- [ ] Message states **what was done** (e.g., preview built) in first 2 lines.
- [ ] One primary CTA only (reply, book call, or buy) with direct link.
- [ ] Reading level is simple; no jargon or duplicate phrases.
- [ ] Contact path is correct (real phone/email, not placeholder).
- [ ] Timeline/urgency is explicit and non-contradictory.

### B. Offer Fit (must pass all)
- [ ] Offer matches target segment (industry + location + likely budget).
- [ ] Price and terms are internally consistent across subject/body/PS/follow-up.
- [ ] What is included vs excluded is explicit.
- [ ] Claims tie to prospect context (competitor count, local market, preview URL).
- [ ] Personalization tokens resolved (no raw placeholders).

### C. Risk Checks (must pass all)
- [ ] No fabricated guarantees or unverifiable legal/compliance claims.
- [ ] Scarcity language is truthful and non-deceptive.
- [ ] Stats are sourced/defensible or clearly framed as estimates.
- [ ] No broken links (preview/payment/booking).
- [ ] No undefined variables/templating errors in automated sequences.

### D. Formatting & Deliverability (must pass all)
- [ ] Subject is <= 60 chars and not spammy.
- [ ] Body is skimmable (short paragraphs, bullets, clear sections).
- [ ] UTF/emoji render cleanly; no encoding artifacts.
- [ ] Placeholder scan clean (`[PAYMENT_LINK]`, `{name}`, etc.).
- [ ] Signature, business name, and contact details are complete.

---

## 2) Pass/Fail Rubric

### Scoring model
- 16 checks total (4 categories × 4–5 checks).
- Each check: **Pass = 1**, **Fail = 0**.

### Hard-stop failures (auto-fail regardless of score)
1. Any unresolved placeholder/token.
2. Broken CTA link.
3. Placeholder contact info (e.g., `(555) 123-4567`).
4. Contradictory pricing/terms.
5. High-risk claim (guarantee/deceptive scarcity/unverified compliance).

### Decision bands
- **PASS (Send-ready):** 15–16 and no hard-stop failures.
- **CONDITIONAL PASS (Fix then send):** 12–14 and no hard-stop failures.
- **FAIL (Block send):** <=11 or any hard-stop failure.

---

## 3) Applied QA Audit (Current Asset)
Target audited:
- `business-engine/pitch_engine.py`
- `business-engine/pipeline_output/biz_1.json` (generated pitch sample)

### Audit Result: **FAIL (Blocked)**

#### A. Clarity — 3/5
- ✅ States what was done early.
- ✅ Has clear preview context.
- ❌ Duplicate wording in trust stat line: "research online first research businesses online..."
- ❌ Contact path uses placeholder fallback `(555) 123-4567` in sample output.
- ✅ Urgency window stated (7 days).

#### B. Offer Fit — 3/5
- ✅ Segment and local context present.
- ✅ Price and recurring fee are clear.
- ✅ Included/excluded maintenance clarified.
- ❌ Primary CTA in body shows unresolved `[PAYMENT_LINK]` token.
- ❌ Personalization is partial (generic greeting "Hi there" despite owner_name capability).

#### C. Risk Checks — 2/5
- ✅ No explicit fake guarantee language.
- ❌ Scarcity language requires process-level proof policy ("remove in 7 days" should be enforced operationally).
- ❌ Stats not attributed to a source in message/attachment.
- ❌ Follow-up template code has undefined variables (`website_url`, `payment_link`) causing automation risk.
- ✅ No sensitive data leakage observed.

#### D. Formatting — 4/5
- ✅ Subject concise and non-spammy.
- ✅ Body is scannable.
- ✅ Signature included.
- ❌ Placeholder token remains in body (`[PAYMENT_LINK]`).
- ✅ Unicode/emoji appears valid in sample JSON.

**Total:** 12/20 equivalent (category-weighted) + hard-stop failures present -> **FAIL**

Hard-stop triggers found:
- Unresolved placeholder token `[PAYMENT_LINK]`
- Placeholder/fallback contact number in output
- Templating/runtime variable defects in follow-up generator

---

## 4) Correction Workflow (Operational)

### Stage 0 — Preflight lint (automated)
- Run checks before send:
  - Placeholder regex: `\[[A-Z_]+\]|\{[a-zA-Z_]+\}`
  - Phone/email placeholder detection (`555`, `example.com`, etc.)
  - URL validation for preview/payment/booking
  - Duplicate phrase detector (n-gram repetition)
- If any hard-stop triggers, asset auto-blocked.

### Stage 1 — Copy fixes (owner: outreach writer)
- Replace all unresolved CTA tokens with generated links.
- Replace placeholder phone fallback with verified company line.
- Remove duplicate sentence fragments.
- Upgrade greeting when owner_name known.

### Stage 2 — Offer/risk verification (owner: QA reviewer)
- Confirm terms consistency across initial + follow-ups.
- Add source note for stats (or rephrase to "industry estimates").
- Confirm urgency policy can be honored in operations.

### Stage 3 — Automation integrity (owner: engineer)
- Fix undefined follow-up vars:
  - `website_url` -> `business['website']['preview_url']` or passed arg.
  - `payment_link` -> `self.generate_payment_link(business)` or passed arg.
- Add unit tests for token resolution and runtime variable coverage.

### Stage 4 — Final gate + release
- Re-score checklist.
- Require PASS band and zero hard-stop failures.
- Log decision in audit trail (`asset_id`, score, failures, approver, timestamp).

---

## 5) Minimum Implementation Snippet (for rapid enforcement)

Suggested gate object per asset:

```json
{
  "asset_id": "biz_1_pitch",
  "score": 12,
  "band": "FAIL",
  "hard_stop_failures": [
    "unresolved_placeholder",
    "placeholder_contact",
    "followup_runtime_variable_error"
  ],
  "required_actions": [
    "inject_payment_link",
    "replace_phone_with_verified_number",
    "fix_followup_template_variables",
    "add_stats_source_or_estimate_label"
  ]
}
```

This format is ready to plug into pipeline gating (block send when `band != PASS`).
