# QA Gates Checklist — Local Service Enterprise Website

> Mark each item Pass/Fail with owner + evidence link.

## Gate 1 — Strategy & Content
- [ ] Service list and offer hierarchy approved
- [ ] Geo-target terms and service areas approved
- [ ] Claims fact-checked (licenses, years, guarantees)
- [ ] CTA language approved by stakeholder

## Gate 2 — Design & UX
- [ ] Design tokens used (no rogue values)
- [ ] Responsive breakpoints validated (320/375/768/1024/1440)
- [ ] Header/footer consistency across pages
- [ ] No visual defects (overflow, collisions, clipped text)
- [ ] Focus and hover states implemented for interactive controls

## Gate 3 — Functional QA
- [ ] All nav links resolve correctly
- [ ] Forms validate and submit correctly
- [ ] Form success/failure states render correctly
- [ ] Phone links clickable on mobile
- [ ] Booking/calendar integrations pass end-to-end
- [ ] Thank-you page and confirmation workflow functional

## Gate 4 — Tracking & Analytics
- [ ] GA4 installed on all routes
- [ ] Conversion events tracked: call click, form submit, booking click
- [ ] UTM handling and attribution test passed
- [ ] Search Console property verified

## Gate 5 — Performance
- [ ] Mobile Lighthouse performance >= 90
- [ ] LCP <= 2.5s (p75)
- [ ] INP <= 200ms (p75)
- [ ] CLS <= 0.10 (p75)
- [ ] JS/CSS/image budgets within limits

## Gate 6 — Accessibility
- [ ] Lighthouse accessibility >= 95
- [ ] Automated scan (axe) has no critical issues
- [ ] Keyboard-only navigation passes
- [ ] Skip link works
- [ ] Form labels/error messaging accessible
- [ ] Color contrast meets WCAG AA

## Gate 7 — SEO & Discoverability
- [ ] Unique titles/meta descriptions per page
- [ ] Correct heading structure (one H1/page)
- [ ] XML sitemap generated and reachable
- [ ] robots.txt configured correctly
- [ ] Canonical tags validated
- [ ] Local schema (Organization/LocalBusiness/Service) valid

## Gate 8 — Security & Launch Readiness
- [ ] HTTPS and cert validity confirmed
- [ ] Security headers configured (CSP, HSTS, X-Content-Type-Options)
- [ ] 404 and redirect behavior verified
- [ ] Backup + rollback tested
- [ ] DNS/cutover plan approved
- [ ] Monitoring and incident contact path active

---

## Final Signoff
- [ ] Product/Business signoff
- [ ] Technical signoff
- [ ] QA signoff
- [ ] Launch authorization granted
