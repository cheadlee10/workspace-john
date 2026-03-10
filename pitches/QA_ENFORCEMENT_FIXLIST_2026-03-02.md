# QA Enforcement Audit — Outreach + Site Assets (2026-03-02)

## Scope Audited
- Outreach assets:
  - `email-templates/top-queued-email-assets-2026-03-02.md`
  - `email-templates/next-queued-email-assets-2026-03-02-batch2.md`
  - `email-templates/next-queued-email-assets-2026-03-02-batch3.md`
  - `email-templates/next-queued-email-assets-2026-03-02-batch4.md`
  - `email-templates/send-queue-2026-03-02-next-batches.jsonl`
- Site assets:
  - `sites/premium-v3-wave2/pnw-lawncare/index.html`
  - `sites/premium-v3-wave2/forever-roofing/index.html`
  - `sites/premium-v3-wave2/handyman-rescue-team/index.html`
  - `sites/premium-v3-wave2/DEPLOYMENT_NOTES.md`

## Executive Verdict
- **Overall:** Good production velocity, but **not first-class locked yet**.
- **Blockers found:** 3
- **High-priority fixes:** 6
- **Medium-priority fixes:** 4

---

## BLOCKERS (Fix before send/deploy)

### B1) Site KPI/rating claims are likely unverified and legally risky
**Where:** all 3 `sites/premium-v3-wave2/*/index.html`
- Examples: `+47% curb appeal score`, `-42% leak callbacks`, `2,100+ jobs completed`, `4.9★ client rating`, etc.
- Queue/source data does not provide evidence for these exact metrics.

**Risk:** Credibility/legal exposure + mismatch with outreach guardrail (“no unverified claims”).

**Auto-fix action:**
- Replace hard numeric outcomes with non-numeric proof language:
  - "Trusted by local homeowners and property managers"
  - "Fast response and clear written scope"
  - "Photo-documented work and transparent updates"
- Keep only claims that can be substantiated from source notes.

---

### B2) Forms are non-functional (no `action` endpoint)
**Where:** all forms in all 3 site files.

**Risk:** Lead loss (demo looks complete, but conversion path is dead).

**Auto-fix action:**
- Add `action="{{form_endpoint}}" method="post"` to each form.
- Add hidden metadata fields (`business`, `source`, `page`) for CRM routing.

---

### B3) Accessibility baseline failure (inputs rely on placeholders only)
**Where:** all form inputs/textarea in all 3 site files.

**Risk:** ADA/accessibility miss + lower usability.

**Auto-fix action:**
- Add `<label for=...>` elements and matching `id` attributes.
- Keep placeholders as helper text, not primary labels.

---

## HIGH PRIORITY

### H1) Outreach files contain leading stray sentence
**Where:** first line of batch files (`top-queued...`, `batch2`, `batch3`).
- `I built a website preview for {{business_name}} to increase direct quote requests.`

**Risk:** Looks like accidental template artifact if copied directly.

**Fix:** remove the standalone opening sentence from each file.

### H2) Outreach personalization can be tightened for named contacts
**Where:** batch2 `Elite Metal Roofing LLC` uses `Hi Robert,` (good), but most others are generic team salutations.

**Risk:** Slight reply-rate loss.

**Fix:** where `contact_name` is empty, keep team greeting; where present, require contact-first variant by default.

### H3) Add compliance footer in all outreach templates
**Where:** all outreach batch files.

**Risk:** Deliverability/compliance pressure over time.

**Fix snippet:**
- "If this is not relevant, reply STOP and I won’t follow up again."
- Business address/signature normalization.

### H4) Subject lines occasionally overstate ownership intent
**Where:** batch4 subjects: "We built your website preview..."

**Risk:** Can read as presumptive for some recipients.

**Fix:** A/B safer variant:
- "We built a website preview for {{business_name}}"

### H5) Missing canonical/open graph metadata
**Where:** all 3 site files.

**Risk:** weaker share previews + SEO hygiene.

**Fix:** add `<link rel="canonical">`, `og:title`, `og:description`, `og:type`, `og:url`.

### H6) Guarantee language should be softened unless policy-backed
**Where:** offer blocks on all 3 pages (service credit guarantee).

**Risk:** implied contractual promise without published terms.

**Fix:** add qualifier:
- "Ask about current service-credit policy and eligibility by project type."

---

## MEDIUM PRIORITY

### M1) Add trust anchors that are verifiable from source notes
- Replace synthetic metrics with:
  - "Licensed & insured"
  - "Verified contact channels"
  - "Local service area"

### M2) Add simple spam-risk lint for outreach copy
- Flag all-caps CTA keywords and excessive punctuation.
- Keep one primary CTA and one fallback CTA.

### M3) Add preflight gate in send queue
**Where:** `send-queue-2026-03-02-next-batches.jsonl`
- Introduce required booleans before send:
  - `live_url_resolved`
  - `screenshot_url_resolved`
  - `qa_enforcement_passed`

### M4) Add explicit source-of-truth tag on each site draft
- Include HTML comment header:
  - lead id
  - verified facts timestamp
  - claim policy version

---

## Fast Implementation Order (under 45 min)
1. Strip unverified KPI/rating metrics from all 3 site pages.  
2. Wire forms to `{{form_endpoint}}` placeholders + hidden source fields.  
3. Add labels/ids for every input/textarea.  
4. Remove stray opening line from 3 outreach batch docs.  
5. Add compliance footer line in all outreach templates.  
6. Add queue gating fields (`live_url_resolved`, `screenshot_url_resolved`, `qa_enforcement_passed`).

---

## Release Gate (First-Class Locked)
Do not approve send/deploy unless all are true:
- [ ] No unverified quantitative claims on preview sites
- [ ] Form submissions functional (tested post)
- [ ] Accessibility labels present on form controls
- [ ] Outreach copy has clean header/body (no template artifacts)
- [ ] Live/screenshot links resolved per queued send record
- [ ] QA enforcement pass marked true
