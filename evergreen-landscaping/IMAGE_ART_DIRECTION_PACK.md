# Ever-Green Landscaping — Image & Art Direction Pack (v1)

## 1) Visual Direction (Look + Mood)

**Brand tone:** premium, local, trustworthy, clean craftsmanship.

**Image style rules**
- Natural-light, real residential properties in Pacific Northwest conditions (overcast/soft sun is fine).
- Show *finished results* and *in-progress professionalism* (clean edging, straight lines, uniform plant spacing, tidy crews).
- Color profile should support existing palette: deep greens, warm neutrals, subtle gold highlights.
- Prefer authentic photos over stock; if stock is needed, avoid generic tropical/desert landscaping.
- Composition: 60–70% environmental context, 30–40% detail/craft closeups.

**Do not use**
- Oversaturated greens, fake HDR, heavy vignettes.
- Obvious stock photos with non-PNW plants/palm trees.
- Cluttered scenes, visible brand conflicts (other company logos), low-resolution before/after memes.

---

## 2) Section-by-Section Image Plan (Mapped to current page structure)

## Hero (`.hero`)
**Goal:** immediate premium trust + local credibility.
- **Image type:** wide residential hero (front yard + hardscape + clean lawn + mature trees).
- **Placement:** full-bleed background behind hero content with dark-green gradient overlay.
- **Crop:** 16:9 desktop, 4:5 mobile-safe crop.
- **Safe area:** leave left-center negative space for headline/CTA.
- **Overlay:** `linear-gradient(100deg, rgba(16,28,20,.70) 0%, rgba(16,28,20,.52) 45%, rgba(16,28,20,.30) 100%)`.

## Stats (`.stats`)
**Goal:** proof + momentum.
- Optional subtle texture image (very low contrast grass/stone texture) behind cards.
- Keep cards as primary visual; texture should be decorative only.

## Services (`#services`)
**Goal:** make each service tangible.
- **Approach A (best):** one icon + one thumbnail per service card.
- **Approach B (lighter):** alternating 2–3 shared section images above grid.
- **Service image prompts:**
  1. Landscape design/install: curated planting bed + paver edge lines.
  2. Lawn care: stripe-pattern mow lines and edged walkway.
  3. Tree pruning/removal: arborist with proper PPE + clean canopy line.
  4. Irrigation: sprinkler head tuning, irrigation control box, healthy turf.
  5. Deck building: finished cedar/composite deck with evening ambient light.
  6. Fence design/construction: straight cedar privacy fence with clean posts.

## About (`#about`, dark section)
**Goal:** humanize team + local trust.
- **Image type:** team-in-action or owner portrait at job site (not stiff headshots).
- **Placement:** image block opposite copy or behind the aside panel at low opacity.
- **Overlay:** lighter dark overlay to preserve text contrast.

## Testimonials (`#testimonials`)
**Goal:** social proof with realism.
- Optional supporting image strip above review cards: 3 project snapshots (before/after not required but useful).
- Keep testimonial text dominant; images should not compete for attention.

## CTA (`#contact`)
**Goal:** drive calls.
- Use a reassuring close-up (clean entry path, trimmed border, warm home exterior).
- Could be background image inside `.cta-box` with stronger dark overlay for button contrast.

---

## 3) Overlay + Readability Standards

**Minimum contrast targets**
- Text over image: WCAG AA minimum (4.5:1 for body, 3:1 for large type).
- Buttons over image: preserve current gold button legibility with dark backing.

**Recommended overlay presets**
- **Hero:** 60–70% dark at text edge, tapering to 25–35% opposite side.
- **Dark sections with image:** 35–50% dark uniform overlay.
- **CTA image background:** 55–65% dark overlay.

---

## 4) Fallback Placeholder System (if client assets are missing)

## Priority fallback order
1. Real project photos from client (preferred).
2. Licensed local-looking stock set (single visual style, same color grade).
3. Branded placeholders (generated gradients + subtle pattern + service labels).

## Placeholder specs
- **Hero placeholder:** abstract aerial lawn texture + soft diagonal gradient in brand greens.
- **Service placeholders (6):** muted duotone backgrounds with small line illustration per service.
- **About placeholder:** team silhouette / tools-on-site abstract pattern.
- **CTA placeholder:** warm home exterior gradient texture.

**Naming convention**
- `/public/images/hero/hero-main-1920.webp`
- `/public/images/services/service-lawncare-800.webp`
- `/public/images/placeholders/hero-fallback-1920.webp`
- `/public/images/placeholders/service-fallback-landscape-800.webp`

---

## 5) Compression + Performance Settings (Next.js)

## Format + quality
- **Primary:** WebP (`q=72–78`) for photos.
- **Optional AVIF:** only for very large hero images if build pipeline supports it smoothly.
- **JPEG fallback:** `q=76` for legacy workflows.

## Size targets (important)
- Hero desktop: **<= 280 KB** ideal, hard cap 400 KB.
- Hero mobile: **<= 140 KB**.
- Service images: **<= 90 KB each**.
- About/CTA images: **<= 120 KB each**.
- Total image payload on first load: target **< 900 KB**.

## Responsive source set widths
- Hero: `640, 960, 1280, 1600, 1920`
- Section images: `480, 768, 1024, 1280`
- Thumbnails/cards: `320, 480, 640`

## Loading strategy
- Hero image: `priority` + eager.
- Above-the-fold decorative images: lazy if not core to first paint.
- All below-the-fold section images: lazy with blur placeholder.

## Suggested Next/Image usage
- Use `fill` with parent aspect-ratio containers.
- Set accurate `sizes` to avoid oversized downloads.
- Add `placeholder="blur"` with tiny blurDataURL.

Example sizing guidance:
- Hero `sizes="100vw"`
- 2-column section image `sizes="(max-width: 760px) 100vw, 50vw"`
- 3-up review strip `sizes="(max-width: 760px) 100vw, 33vw"`

---

## 6) Alt Text Plan (SEO + Accessibility)

## Rules
- Describe what is visually present + business context.
- Keep most alt text between 80–140 chars.
- Avoid keyword stuffing and avoid starting every alt with “Image of…”.
- Decorative textures/backgrounds should use empty alt (`alt=""`) when non-informative.

## Core alt text templates
- **Hero:**
  “Finished residential landscape in Everett featuring manicured lawn, layered plantings, and clean stone borders by Ever-Green Landscaping.”
- **Landscape design/install card:**
  “New front-yard landscape installation with structured plant beds and paver edging at an Everett home.”
- **Lawn care card:**
  “Freshly mowed lawn with crisp edging and healthy green turf maintained weekly.”
- **Tree service card:**
  “Certified crew pruning mature trees to improve safety and canopy shape on a residential lot.”
- **Irrigation card:**
  “Technician adjusting sprinkler system for efficient watering and uniform lawn coverage.”
- **Deck card:**
  “Custom backyard deck build with premium materials and clean rail detailing.”
- **Fence card:**
  “Straight-line cedar privacy fence installation with finished posts and gates.”
- **About/team image:**
  “Ever-Green Landscaping team on-site in Snohomish County preparing a residential outdoor renovation.”
- **CTA image:**
  “Well-kept home entry landscape with trimmed borders and seasonal plant color.”

---

## 7) Quick Implementation Checklist

- Create `/public/images/{hero,services,about,cta,placeholders}` structure.
- Add 1 hero, 6 service, 1 about, 1 cta images + fallback set.
- Apply section-specific overlays (hero/cta strongest).
- Implement responsive `next/image` with proper `sizes`.
- Run Lighthouse and verify image payload + LCP.
- Validate alt text coverage and decorative-empty alt usage.

---

## 8) Asset Request List for Client (send as one ask)

Request these in one batch to avoid delays:
- 3–5 high-res finished project photos (front + backyard mixed).
- 1–2 team-at-work photos.
- 1 deck project photo, 1 fence project photo, 1 irrigation/service-in-action photo.
- Permission confirmation for website use.

If not available in 48 hours, proceed with curated stock + placeholders and swap later.
