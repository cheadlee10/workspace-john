# QA Gates Checklist (Pass/Fail)

Severity levels:
- **P0** = launch blocker
- **P1** = must fix before final handoff
- **P2** = improvement backlog

## Gate 1: Brand + Visual Quality
- [ ] Typography consistent with design kit (P1)
- [ ] Color contrast meets WCAG AA (P0)
- [ ] Spacing/alignment consistent across sections (P1)
- [ ] No stock-image mismatch with local brand story (P2)

## Gate 2: Content Quality
- [ ] Value prop clear in first viewport (P0)
- [ ] City + service specificity on key pages (P1)
- [ ] Claims backed by proof (reviews, certs, case studies) (P1)
- [ ] No placeholder/lorem content left (P0)

## Gate 3: Conversion Path
- [ ] Primary CTA visible above fold desktop/mobile (P0)
- [ ] Click-to-call works on mobile (P0)
- [ ] Form submits successfully + confirmation shown (P0)
- [ ] Form lead delivered to destination inbox/CRM (P0)
- [ ] Thank-you state tracks conversion event (P1)

## Gate 4: SEO + Local Relevance
- [ ] Unique title/meta on every indexable page (P1)
- [ ] Valid H1 on each page (P1)
- [ ] LocalBusiness schema present and valid (P1)
- [ ] Sitemap + robots configured (P1)
- [ ] NAP consistency (name/address/phone) across site (P0)

## Gate 5: Performance + Accessibility
- [ ] Lighthouse targets met (mobile) (P1)
- [ ] LCP < 2.5s on representative pages (P1)
- [ ] CLS < 0.1 (P1)
- [ ] Keyboard navigation for forms/menu (P0)
- [ ] Alt text for non-decorative images (P1)

## Gate 6: Technical Integrity
- [ ] No 404s/500s in crawl (P0)
- [ ] SSL certificate valid (P0)
- [ ] Canonical tags set correctly (P1)
- [ ] Analytics events firing (P1)
- [ ] Favicon/OG image configured (P2)

## Release Rule
Launch permitted only when:
- 0 open P0 defects
- <= 3 open P1 defects with documented ETA (<72h)
- Client signoff recorded in `prelaunch-signoff-template.md`
