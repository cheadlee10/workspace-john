# V2 Local Service WOW Variant Package

Enterprise-grade website variant for local service niches (landscaping, roofing, HVAC, pool, pest, handyman).

## Goal
Ship a visually premium, mobile-first lead engine with a two-tap conversion path and implementation-ready starter assets.

## Package Contents
- `variant-spec.md` — section choreography, conversion architecture, and niche mapping
- `implementation/tokens.v2.json` — design tokens for a high-contrast premium visual system
- `implementation/content-model.v2.json` — CMS/data model for rapid site-factory generation
- `implementation/index.v2.html` — production-ready single-page starter template (responsive + mobile CTA)
- `implementation/qa-mobile-wow-checklist.md` — mobile polish and conversion QA gates

## Quick Start
1. Duplicate `implementation/index.v2.html` into new client folder.
2. Replace placeholder business/location/copy data.
3. Apply niche color overrides from `tokens.v2.json`.
4. Load content using `content-model.v2.json` keys.
5. Run QA using `qa-mobile-wow-checklist.md` before launch.

## Conversion Principles Embedded
- Primary CTA always visible on mobile (`sticky-bottom`)
- Hero trust cluster above the fold
- Proof before pitch (reviews/results precede long copy)
- Frictionless lead form (4 required fields)
- Repeat CTA after each major proof section
