# QA Enforcement Report — Wave 25 Sites + Batch 28 Emails
Date: 2026-03-02 (PST)
Scope: `sites/premium-v3-wave25/*/index.html` (5 pages) and `email-templates/next-queued-email-assets-2026-03-02-batch28.md` (10 lead emails)

## Result: **PASS (with non-blocking follow-ups)**

## What was checked
- Placeholder/compliance tokens (`{{...}}`, `REPLACE_ME`, `TODO/TBD`, `.example`) in newest site assets
- Accessibility basics on forms (label + control association, non-hidden control coverage)
- Click-to-call link presence/validity (`tel:`)
- Obvious outreach-email compliance (required `{{live_url}}` + `{{screenshot_url}}`, no fabricated ranking/guarantee claims)

## Critical fixes made
1. Removed fake placeholder email addresses from 3 wave25 sites:
   - `nevada-roofing-reno-nv/index.html`
   - `plumbing-today-llc-omaha-ne/index.html`
   - `south-gate-fence-company-birmingham-al/index.html`
2. Replaced `.example` mailto links with neutral non-fabricated text (`Email not publicly listed`).

## Verification summary
- Wave25 pages scanned: 5/5
- `tel:` links: present and valid on 5/5 pages
- Form controls: labels present/associated for all visible inputs/textareas on 5/5 pages
- Unresolved templating placeholders in site files: none
- Batch28 emails checked: 10/10 lead sections
- Required placeholders in each email (`{{live_url}}`, `{{screenshot_url}}`): 10/10 present

## Remaining blockers (not QA content failures)
- `/contact` backend mapping/routing still pending
- CTA/form analytics events not yet embedded
- Production host alias/routing for wave25 not wired

These are deployment/instrumentation blockers, not content/compliance blockers for this QA sprint.