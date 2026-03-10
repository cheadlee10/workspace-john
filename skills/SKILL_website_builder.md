# 🌐 SKILL: World-Class Website Builder

## Purpose
You build production-grade, professional websites that look like a $15K agency built them. Not templates. Not Bootstrap defaults. Not generic AI slop. Real sites that convert visitors into customers.

---

## PHASE 1: DISCOVERY (Before Writing Any Code)

### Mandatory Questions (Ask ONCE, Then Execute)
Before building anything, you need these answers. If Craig already provided them, skip ahead.

1. **What does the business do?** (1 sentence)
2. **Who is the target customer?** (demographics, pain points)
3. **What is the #1 action a visitor should take?** (buy, call, sign up, book)
4. **What pages are needed?** (default: Home, About, Services, Contact)
5. **Brand colors?** (if none: pick a palette that fits the industry)
6. **Do they have a logo?** (if no: create a text-based logo mark)
7. **Domain name?** (if none: suggest 3 options)
8. **Hosting preference?** (default: Cloudflare Pages — free, fast, global CDN)

### If Craig Says "Just Build It"
Use these defaults and proceed:
- Single-page scrolling site with anchor navigation
- Dark/light professional palette based on industry
- Mobile-first responsive design
- Deployed to Cloudflare Pages
- Contact form via Formspree or Web3Forms (free tier)

---

## PHASE 2: DESIGN SYSTEM (Establish Before Coding)

### Typography Rules
- **Headlines:** Use a bold sans-serif. Inter, Outfit, Plus Jakarta Sans, or Satoshi (Google Fonts or Fontsource).
- **Body:** 16px minimum on mobile, 18px on desktop. Line-height 1.6. Max 70 characters per line.
- **Hierarchy:** H1 (48-72px), H2 (32-40px), H3 (24-28px), body (16-18px). Only ONE H1 per page.
- **Weight contrast:** Headlines 700-900, body 400. Never use 300 for body text.
- **Letter-spacing:** Slightly negative (-0.02em) for large headlines. Default for body.

### Color System
Build a 5-color system minimum:
```
--color-primary:      Main brand color (buttons, links, accents)
--color-primary-dark:  Hover states, emphasis
--color-primary-light: Backgrounds, subtle highlights
--color-neutral-900:   Text (never use pure #000000)
--color-neutral-700:   Secondary text
--color-neutral-400:   Borders, dividers
--color-neutral-100:   Backgrounds, cards
--color-neutral-50:    Page background
--color-accent:        CTAs, badges, notifications (contrasting)
--color-success:       #10B981
--color-error:         #EF4444
```

**Rules:**
- WCAG AA contrast minimum (4.5:1 for text, 3:1 for large text)
- Never place colored text on colored backgrounds without checking contrast
- Use opacity/transparency for hover states, not new colors
- Dark mode: don't just invert. Reduce contrast slightly, use dark grays (#111827) not black

### Spacing System (8px Grid)
All spacing uses multiples of 8:
```
--space-1:   8px    (tight)
--space-2:   16px   (default element gap)
--space-3:   24px   (card padding)
--space-4:   32px   (section inner padding)
--space-6:   48px   (between content blocks)
--space-8:   64px   (between sections mobile)
--space-12:  96px   (between sections tablet)
--space-16:  128px  (between sections desktop)
```

### Layout Rules
- **Max content width:** 1200px (1400px for dashboards/wide layouts)
- **Grid:** 12-column on desktop, 4-column mobile
- **Gutters:** 24px mobile, 32px desktop
- **Side padding:** 16px mobile, 24px tablet, 0 desktop (centered with max-width)
- **Cards:** 16-24px padding, 8-12px border-radius, subtle shadow `0 1px 3px rgba(0,0,0,0.1)`
- **Never stretch images or text to full bleed unless intentional hero section**

---

## PHASE 3: COMPONENT LIBRARY (Build These First)

### Must-Have Components

**1. Navigation Bar**
```
Requirements:
- Sticky on scroll (not fixed from start — show after 100px scroll)
- Logo left, nav links center or right
- Mobile: hamburger menu with smooth slide-in
- Current page indicator (underline or color change)
- CTA button in nav (different style from links)
- Backdrop blur on scroll: background: rgba(255,255,255,0.8); backdrop-filter: blur(12px)
- Height: 64-80px
- Z-index: 1000
```

**2. Hero Section**
```
Requirements:
- Takes up 80-100vh on desktop
- Clear headline (6-10 words max, benefit-focused)
- Subheadline (1-2 sentences, supporting the headline)
- Primary CTA button (high contrast, large, action verb)
- Secondary CTA (text link or ghost button)
- Visual: hero image, video, gradient mesh, or animated element
- NO sliders/carousels (they kill conversion)
- Text over image: use gradient overlay rgba(0,0,0,0.4) minimum
```

**3. Social Proof Section**
```
Options (use at least 2):
- Client logos (grayscale, consistent sizing)
- Testimonial cards with photo, name, title, company
- Stats bar: "500+ clients | 99.9% uptime | $2M+ saved"
- Trust badges: certifications, awards, press mentions
- Star ratings with review count
```

**4. Features/Services Grid**
```
Requirements:
- 3 or 4 column on desktop, single column mobile
- Icon + headline + 2-line description per card
- Icons: use Lucide, Phosphor, or Heroicons (consistent style)
- Equal height cards (CSS Grid, not flexbox hacks)
- Hover state: subtle lift (transform: translateY(-2px)) + shadow increase
```

**5. CTA Section (Conversion Block)**
```
Requirements:
- Appears at least twice on homepage (middle + bottom)
- High contrast background (primary color or dark)
- Compelling headline (urgency or value)
- Single action: button, form, or phone number
- Remove all other navigation/distraction
- "Above the fold" urgency: limit offer, social proof nearby
```

**6. Footer**
```
Requirements:
- 3-4 column layout: About, Quick Links, Services, Contact
- Business info: address, phone, email
- Social media icons (subtle, not rainbow colored)
- Copyright with current year (dynamic)
- Privacy Policy + Terms links
- Newsletter signup (optional)
- Dark background preferred (separates from content)
```

**7. Contact Form**
```
Requirements:
- Maximum 4-5 fields (Name, Email, Phone optional, Message, Submit)
- Inline validation (not just on submit)
- Loading state on submit button
- Success/error states (don't redirect to a new page)
- Honeypot field for spam (hidden field, reject if filled)
- Backend: Formspree, Web3Forms, or Cloudflare Workers
- NEVER rely solely on mailto: links
```

---

## PHASE 4: CODE ARCHITECTURE

### Tech Stack Decision Tree

**Simple business/portfolio site (1-5 pages):**
```
HTML + CSS + minimal JS
Deploy: Cloudflare Pages (free)
Forms: Web3Forms or Formspree
No framework needed. Ship fast.
```

**Content-heavy site (blog, docs, 10+ pages):**
```
Astro (static site generator)
Markdown for content
Deploy: Cloudflare Pages or Vercel
CMS: Decap CMS (free) or Contentful (free tier)
```

**Interactive app/dashboard:**
```
Next.js or SvelteKit
Tailwind CSS
Deploy: Vercel or Cloudflare Pages
Database: Supabase or PlanetScale (free tiers)
Auth: Clerk or Supabase Auth
```

**E-commerce:**
```
Shopify (if Craig wants managed)
or Medusa.js + Next.js (if self-hosted)
Payments: Stripe
Deploy: Vercel
```

### File Structure (Simple Site)
```
project/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/
│   ├── reset.css          (normalize browser defaults)
│   ├── variables.css      (design tokens)
│   ├── base.css           (typography, global styles)
│   ├── components.css     (buttons, cards, forms)
│   └── layout.css         (grid, sections, responsive)
├── js/
│   ├── main.js            (nav toggle, scroll effects, form handling)
│   └── animations.js      (intersection observer, scroll reveals)
├── images/
│   ├── logo.svg
│   ├── hero.webp          (ALWAYS webp, not jpg/png)
│   └── og-image.jpg       (1200x630 for social sharing)
├── favicon.ico
├── site.webmanifest
└── robots.txt
```

### CSS Architecture Rules
```css
/* 1. Use CSS custom properties for EVERYTHING configurable */
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Outfit', var(--font-sans);
  --color-primary: #2563EB;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12);
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}

/* 2. Mobile-first breakpoints (min-width only, never max-width) */
/* Mobile: default styles */
/* Tablet: @media (min-width: 768px) */
/* Desktop: @media (min-width: 1024px) */
/* Wide: @media (min-width: 1280px) */

/* 3. Use clamp() for responsive typography */
h1 { font-size: clamp(2rem, 5vw, 4.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); }

/* 4. Use logical properties for spacing */
.section { padding-block: var(--space-8); }
.container { margin-inline: auto; max-inline-size: 1200px; }

/* 5. Smooth scrolling + reduced motion respect */
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

### JavaScript Rules
```
- NO jQuery. Ever. It's 2026.
- Vanilla JS for simple sites. No framework overhead for 5 pages.
- Intersection Observer for scroll animations (not scroll event listeners)
- Lazy load all images below the fold: loading="lazy"
- Defer all non-critical JS: <script defer src="main.js">
- No inline onclick handlers. Use addEventListener.
- Event delegation for repeated elements (cards, list items)
- Debounce scroll/resize handlers (100-200ms)
```

### Scroll Reveal Animation Pattern
```javascript
// Lightweight scroll reveal — no library needed
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

## PHASE 5: IMAGES & MEDIA

### Image Rules
- **Format:** WebP for everything. AVIF if browser support isn't a concern. JPEG as fallback only.
- **Hero images:** Max 400KB. Use `<picture>` with multiple srcsets.
- **Thumbnails/cards:** Max 80KB. 400-600px wide.
- **Icons:** SVG only. Inline for small counts, sprite for 10+.
- **Logo:** SVG (scales perfectly, tiny file).
- **Lazy loading:** All images below the fold get `loading="lazy"` and `decoding="async"`.
- **Aspect ratios:** Set explicit `width` and `height` attributes to prevent layout shift.
- **Alt text:** Descriptive for content images. Empty `alt=""` for decorative.

### Image Optimization Pipeline
```bash
# Convert to WebP (install: npm install -g sharp-cli or use squoosh.app)
# Target: 80% quality for photos, lossless for graphics
# Resize hero: 1920px wide max
# Resize cards: 600px wide max
# Resize thumbnails: 300px wide max
```

### Free Image Sources
- **Unsplash** (unsplash.com) — high quality photos, free for commercial
- **Pexels** (pexels.com) — similar to Unsplash
- **unDraw** (undraw.co) — SVG illustrations, customizable colors
- **Humaaans** (humaaans.com) — mix-and-match people illustrations
- **Heroicons** (heroicons.com) — Tailwind-compatible SVG icons
- **Lucide** (lucide.dev) — clean, consistent icon set

---

## PHASE 6: SEO (Non-Negotiable On Every Page)

### Technical SEO Checklist
```html
<!-- Every page MUST have: -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Unique per page -->
  <title>Primary Keyword - Brand Name</title>
  <meta name="description" content="Compelling 150-160 char description with target keyword.">
  
  <!-- Canonical (prevent duplicate content) -->
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Compelling description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="https://example.com/og-image.jpg">
  
  <!-- Favicon set -->
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Preconnect to external resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

### Content SEO Rules
- One H1 per page (the primary keyword target)
- H2s for major sections (secondary keywords)
- H3s for subsections (long-tail keywords)
- First 100 words of body must contain the primary keyword naturally
- Internal links between pages (3-5 per page minimum)
- External links to authoritative sources (1-2 per page)
- Image alt text contains keywords naturally (not stuffed)
- URL structure: `/services/web-design` not `/page?id=42`
- 301 redirects for any changed URLs

### Schema Markup (Structured Data)
```html
<!-- Local Business (for service businesses) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "What you do",
  "url": "https://example.com",
  "telephone": "+1-425-555-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Bothell",
    "addressRegion": "WA",
    "postalCode": "98011",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": [
    "https://www.facebook.com/business",
    "https://www.linkedin.com/company/business"
  ]
}
</script>
```

### Required Files
```
robots.txt:
  User-agent: *
  Allow: /
  Sitemap: https://example.com/sitemap.xml

sitemap.xml:
  List all public URLs with <lastmod> dates
  Submit to Google Search Console after launch

.htaccess or _redirects:
  Force HTTPS
  Force www or non-www (pick one, redirect the other)
  Custom 404 page
```

---

## PHASE 7: PERFORMANCE (Target: 95+ Lighthouse Score)

### Performance Budget
```
Total page weight: < 500KB (ideal), < 1MB (acceptable)
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
Time to Interactive: < 3.5s
```

### Critical Optimizations
1. **Critical CSS inlined** in `<head>` for above-the-fold content
2. **Fonts:** Use `font-display: swap`. Preload the primary font. Max 2 font families.
3. **Images:** WebP, lazy-loaded, explicit dimensions, responsive srcsets
4. **JS:** Defer everything. No render-blocking scripts. Bundle < 50KB.
5. **CSS:** Single file < 30KB or split critical/non-critical
6. **Caching:** Set `Cache-Control: public, max-age=31536000` for static assets (with hashed filenames)
7. **Compression:** Ensure hosting serves Brotli or Gzip
8. **Preload:** Hero image, primary font file
9. **DNS prefetch:** External domains (analytics, fonts, CDN)
10. **No unused CSS/JS.** Audit with Chrome DevTools Coverage tab.

### Font Loading Pattern
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
```

---

## PHASE 8: DEPLOYMENT

### Cloudflare Pages (Default — Free)
```bash
# 1. Push code to GitHub repo
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/user/repo.git
git push -u origin main

# 2. In Cloudflare Dashboard:
#    Pages → Create a project → Connect to Git
#    Select repo → Framework: None (for static HTML)
#    Build command: (leave empty for static)
#    Build output: / (or /dist for build tools)
#    Deploy

# 3. Custom domain:
#    Pages project → Custom domains → Add
#    Add CNAME record in DNS: www → your-project.pages.dev
#    Add CNAME record: @ → your-project.pages.dev (or use redirect rule)
```

### Domain Setup Checklist
```
□ Domain registered (Cloudflare Registrar, Namecheap, or Google Domains)
□ DNS pointed to hosting (CNAME or A record)
□ SSL/HTTPS active (automatic on Cloudflare)
□ www → non-www redirect (or vice versa) configured
□ Force HTTPS redirect active
□ Email forwarding set up if needed (ImprovMX free or Cloudflare Email Routing)
```

### Pre-Launch Checklist
```
□ All links work (no 404s)
□ Forms submit correctly and send to correct email
□ Mobile responsive on real devices (not just DevTools)
□ Favicon shows in browser tab
□ OG image shows when sharing on social media (use opengraph.xyz to test)
□ Analytics installed (Plausible, Umami, or Cloudflare Web Analytics — all free)
□ Google Search Console connected + sitemap submitted
□ Page speed: run Lighthouse, score 90+ on all metrics
□ Accessibility: run axe DevTools audit, fix all critical issues
□ Cross-browser tested (Chrome, Firefox, Safari minimum)
□ 404 page exists and is styled
□ Contact info is correct
□ Legal pages exist (Privacy Policy, Terms — use free generators)
□ Print stylesheet or at minimum print doesn't break layout
```

---

## PHASE 9: CONVERSION OPTIMIZATION

### Psychology Principles to Apply
1. **F-Pattern:** Place key content along the F-shaped reading path (top, left side)
2. **Visual hierarchy:** Biggest/boldest = most important. Users scan before reading.
3. **Hick's Law:** Fewer choices = more action. One CTA per section maximum.
4. **Social proof proximity:** Place testimonials near CTA buttons.
5. **Loss aversion:** "Don't miss out" > "Sign up now"
6. **Anchoring:** Show premium option first, then standard seems like a deal.
7. **Reciprocity:** Offer something free (guide, consultation, audit) before asking for sale.

### CTA Button Rules
```
- Use action verbs: "Get Started" not "Submit"
- Include value: "Get My Free Quote" not "Click Here"
- High contrast against background (test with squint test)
- Minimum 44px touch target (48px preferred)
- Padding: 12-16px vertical, 24-32px horizontal
- Hover state: darken 10%, slight scale(1.02)
- Active state: darken 15%, slight scale(0.98)
- Arrow or icon reinforces direction: →
- Only ONE primary CTA style per page. Everything else is secondary/ghost.
```

### Above The Fold Must Include
1. What you do (headline)
2. Who it's for (subheadline)
3. What to do next (CTA button)
4. Why trust you (social proof nugget)
5. What it looks like (visual)

All five. No exceptions. If a visitor can't answer "What does this company do and how do I buy?" in 5 seconds, the hero failed.

---

## PHASE 10: MAINTENANCE & ANALYTICS

### Post-Launch Weekly Tasks
- Check Google Search Console for crawl errors
- Monitor Core Web Vitals in Search Console
- Check form submissions are delivering
- Update content/blog if applicable
- Check uptime (use UptimeRobot free tier)

### Analytics Setup (Choose One — All Free)
```
Cloudflare Web Analytics: Zero JS, privacy-first, add one script tag
Plausible: Lightweight (<1KB), GDPR compliant, self-host option
Umami: Open source, self-host on Vercel + Supabase for free
```

### Track These Metrics
- Unique visitors / month
- Bounce rate (target: < 50% for service sites)
- Average session duration (target: > 1.5 minutes)
- Top pages (what content works)
- Traffic sources (where visitors come from)
- CTA click rate (are people taking action)
- Form completion rate (are people finishing the form)

---

## ANTI-PATTERNS (Never Do These)

```
❌ Carousels/sliders (nobody reads past slide 1)
❌ Auto-playing video with sound
❌ Stock photos of handshakes or people pointing at screens
❌ "Welcome to our website" as a headline
❌ Hamburger menu on desktop
❌ Infinite scroll on a business site
❌ Pop-ups before the user has read anything
❌ Gray text on white background (contrast fail)
❌ Centered body text for paragraphs (left-align body text)
❌ More than 3 font families
❌ Animations that delay content from appearing
❌ "Click here" or "Read more" as link text
❌ PDF links without warning the user it's a PDF
❌ Missing hover states on interactive elements
❌ Logo that doesn't link to homepage
❌ No way to get back to top on long pages
❌ Contact page with only an email address
❌ Using px for font sizes (use rem/em)
❌ Fixed-width layouts that don't respond to screen size
❌ Loading 20 unused Google Fonts weights
```

---

## QUICK REFERENCE: Build a Site in 30 Minutes

For when Craig says "just make it":

1. **Minute 0-2:** Pick colors + font from system above
2. **Minute 2-5:** Write headline, subheadline, CTA text, 3 service descriptions
3. **Minute 5-15:** Build single HTML file: nav → hero → social proof → services → CTA → testimonials → CTA → footer
4. **Minute 15-22:** Style with CSS (use the variables system above)
5. **Minute 22-25:** Add scroll reveals, mobile nav toggle, form handler
6. **Minute 25-28:** Optimize: compress images, add meta tags, test responsive
7. **Minute 28-30:** Deploy to Cloudflare Pages, verify live

**The site ships. Then iterate. A live imperfect site beats a perfect local file every time.**
