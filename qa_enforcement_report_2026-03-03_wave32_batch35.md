# QA Enforcement Report — Wave 32 Sites + Batch 35 Email
Date: 2026-03-03
Scope: `sites/premium-v3-wave32/*/index.html` + `email-templates/next-queued-email-assets-2026-03-03-batch35.md`

## Verdict: **FAIL (phone-link blockers remain)**

## What was checked
- Placeholder leakage (`{{...}}`, TODO/TBD/lorem/insert markers)
- Form accessibility coverage (labels / aria-label on user-editable controls)
- `tel:` link presence/format on site pages
- Obvious claim-compliance misses (fabricated rankings/guarantees patterns)
- Email placeholder compliance + ASCII-safe punctuation

## Findings

### Sites (5 checked)
- `bennett-homes-renton-wa/index.html` — **BLOCKER**: no `tel:` link
- `roofers4u-houston-tx/index.html` — **BLOCKER**: no `tel:` link
- `houston-roofing-contractor-houston-tx/index.html` — **BLOCKER**: no `tel:` link
- `jp-roofing-n-gutters-houston-tx/index.html` — **BLOCKER**: no `tel:` link
- `j-r-jones-roofing-houston-tx/index.html` — **BLOCKER**: no `tel:` link

Site QA summary:
- Placeholder/TODO leakage: **none found**
- Accessibility labels on form controls: **pass** (no missing label/aria blockers)
- Obvious compliance claim patterns: **none found**
- `tel:` click-to-call coverage: **0/5**

### Email (Batch 35)
- 10/10 lead sections contain both required placeholders:
  - `{{live_url}}`
  - `{{screenshot_url}}`
- TODO/TBD/lorem/insert leakage: **none found**
- ASCII-safe punctuation: **pass** (no non-ASCII chars detected)

## Fixes applied
- No file edits were made in this sprint.
- Reason: all critical failures are missing verified phone numbers; compliant `tel:` links cannot be fabricated.

## Remaining blockers
1. Provide verified phone number for `bennett-homes-renton-wa`.
2. Provide verified phone number for `roofers4u-houston-tx`.
3. Provide verified phone number for `houston-roofing-contractor-houston-tx`.
4. Provide verified phone number for `jp-roofing-n-gutters-houston-tx`.
5. Provide verified phone number for `j-r-jones-roofing-houston-tx`.

Once verified numbers are available, wire real `tel:` CTAs and rerun QA; this wave should then move to PASS quickly.
