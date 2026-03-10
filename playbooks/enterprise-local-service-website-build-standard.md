# Enterprise Website Build Standard — Local Service Businesses

**Version:** 1.0  
**Owner:** NorthStar Synergy  
**Applies to:** New builds, redesigns, and migration projects for local service companies (landscaping, roofing, plumbing, HVAC, cleaning, detailing, etc.)

---

## 1) Build Standard (Non-Negotiables)

## 1.1 Business + Conversion Outcomes
- Primary KPI: qualified leads per month (calls + form submissions + booked appointments)
- Secondary KPIs: conversion rate, call click-through, map direction clicks, form completion rate
- Each page must have one **Primary CTA** and one **Secondary CTA**
- Phone number + service area must be visible in header and footer
- Every service page must include proof (reviews, photos, guarantees, badges)

## 1.2 Technical Stack Requirements
- Framework: modern static/hybrid rendering stack (e.g., Next.js/Astro)
- Styling: componentized CSS system (Tailwind/CSS Modules)
- Analytics: GA4 + Google Search Console + call/form event tracking
- Forms: spam protection + server-side validation + notification workflow
- Hosting: CDN-backed, HTTPS enforced, daily backup, rollback support

## 1.3 Core Page Architecture (Minimum)
1. Home
2. Service Area(s)
3. Individual Service Pages (one per core service)
4. About / Team
5. Reviews / Case Studies
6. Contact / Booking
7. Legal: Privacy Policy + Terms

---

## 2) Design System Standard

Use `templates/website-blueprint/local-service-design-system.tokens.json`.

Required rules:
- **Color roles only** (no random hex in components)
- **4px spacing scale** and max content width tokens
- **Type scale** with min body size 16px
- **Button variants:** primary, secondary, ghost
- **States:** default, hover, focus-visible, disabled, loading
- **Accessibility:** color contrast >= WCAG AA (normal text 4.5:1, large text 3:1)

Component set (minimum):
- Header + sticky CTA bar (mobile)
- Hero section
- Trust badge row
- Service cards grid
- Process/timeline block
- Before/after gallery
- Review/testimonial cards
- FAQ accordion
- Contact form + click-to-call module
- Footer with NAP + legal links

---

## 3) High-Converting Section Blueprint (Per Primary Page)

Use `templates/website-blueprint/local-service-page-blueprint.md`.

Order:
1. Hero (clear value prop + local geo modifier)
2. Social proof strip (ratings, review count, certifications)
3. Core services with outcomes (not features only)
4. Why choose us (differentiators)
5. Process (3–5 steps)
6. Portfolio/results section (images + measurable impact)
7. Offer/guarantee/risk reversal
8. FAQ (objection handling)
9. Final CTA block + contact methods

Copy standards:
- Reading level: grade 6–8
- Headline formula: Outcome + Audience + Geography + Speed/Trust signal
- Every section must answer: “Why this company over alternatives?”
- Every 1–2 sections include a CTA entry point

---

## 4) Performance + Accessibility Targets

### 4.1 Core Web Vitals (Mobile, p75)
- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.10

### 4.2 Lighthouse Budgets (Production)
- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

### 4.3 Resource Budgets (initial route)
- JS <= 180KB gzipped
- CSS <= 70KB gzipped
- Hero image <= 180KB (AVIF/WebP)
- Total requests <= 75
- Critical path fonts <= 2 families, <= 4 files

### 4.4 Accessibility Hard Requirements
- Semantic heading hierarchy (single H1)
- Keyboard navigation for all interactive elements
- Visible focus states
- Form labels + error messages tied by aria-describedby
- Alt text for informative images; decorative images marked accordingly
- Skip link on every page

---

## 5) QA Gates (Ship/No-Ship)

Use `templates/website-blueprint/local-service-qa-gates-checklist.md`.

Gate 1 — Content & Messaging
- Offers, guarantees, CTAs, geo terms, and service claims approved

Gate 2 — UX & Design
- Responsive checks passed (320/375/768/1024/1440)
- No overflow, broken layout, or unreadable contrast

Gate 3 — Functional
- Forms, call links, map links, booking flows, thank-you page, and tracking events pass

Gate 4 — Performance
- Core Web Vitals and budget thresholds met

Gate 5 — Accessibility
- Automated (axe/Lighthouse) + manual keyboard and screen-reader smoke tests pass

Gate 6 — SEO + Indexing
- Metadata, schema, sitemap, robots, canonicals verified

Gate 7 — Security + Reliability
- HTTPS, headers, backups, 404/redirect behavior, incident contact path validated

No production launch unless all gates are green or explicitly waived in writing.

---

## 6) Delivery Artifact Checklist

Use `templates/website-blueprint/local-service-delivery-artifacts-checklist.md`.

Required handoff package:
- Source code + deployment instructions
- Design system token file + component inventory
- Content map and final approved copy deck
- Analytics/event map and dashboard links
- SEO assets: sitemap, redirects, metadata export, schema list
- QA evidence (screenshots/reports)
- Credentials and ownership transfer checklist
- 30-day post-launch support plan

---

## 7) Implementation Workflow (Execution Sequence)
1. Discovery + KPI definition
2. Site architecture + content map
3. Wireframe + design system token lock
4. Build + instrumentation
5. QA gate run
6. Stakeholder UAT signoff
7. Launch + monitoring
8. 7-day and 30-day optimization pass

---

## 8) Acceptance Criteria Summary
A project is considered enterprise-grade only when:
- Design system is tokenized and reusable
- Conversion architecture is complete and evidence-backed
- Performance/accessibility targets are met
- QA gates are documented with pass/fail evidence
- Delivery artifacts are complete and client-operable
