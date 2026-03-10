# Enterprise Website Production Factory (Local Services)

Purpose: produce premium, conversion-focused websites for landscaping, roofing, and HVAC in 24–48 hours using a standardized system.

## Factory Outputs
- `kits/design-system.md` — brand tokens, typography, spacing, UI rules
- `kits/section-library.md` — modular section variants by page type
- `kits/niche-playbooks.md` — landscaping/roofing/HVAC messaging and offer rules
- `kits/image-requirements.md` — shot list, technical specs, and asset QA
- `briefs/client-intake-template.md` — intake form for fast kickoff
- `sops/production-sop.md` — end-to-end build and launch SOP
- `qa/qa-gates-checklist.md` — release gates with pass/fail criteria
- `qa/prelaunch-signoff-template.md` — approval format before go-live

## Delivery Targets
- Day 0 (intake): 60–90 min
- Day 1 (build): 6–10 hrs
- Day 2 (revisions + launch): 3–5 hrs

## KPI Baseline
- Lighthouse mobile: 85+ Performance / 95+ Accessibility / 95+ Best Practices / 90+ SEO
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Above-the-fold CTA visibility at 100% on mobile
- Contact conversion path (call/form/schedule) reachable in <= 2 taps/clicks

## Standard Tech Stack
- Frontend: Next.js or Astro static output
- Styling: Tailwind + design tokens
- CMS: Sanity/Contentful or markdown data files
- Forms: native + webhook/Zapier + CRM push
- Analytics: GA4 + call tracking + form event tracking
- Hosting: Vercel/Netlify/Cloudflare Pages + managed DNS
