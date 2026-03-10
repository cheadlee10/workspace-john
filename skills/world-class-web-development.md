---
name: world-class-web-development
description: Elite web development - modern animations, video backgrounds, smooth interactions, conversion optimization, and professional design patterns used by top SaaS companies. Study the best, build better.
---

# World-Class Web Development

## Core Principles (Top 1% Sites)

### Visual Hierarchy
1. **Hero section** - Full viewport height, video background or animated gradient
2. **Clear value proposition** - 10 words or less, above the fold
3. **Social proof immediately** - Logos, numbers, testimonials in first screen
4. **Smooth scroll experience** - Parallax, fade-ins, stagger animations
5. **White space** - Generous padding, never cramped

### Animation Patterns (Stripe, Linear, Vercel)
- **Fade in on scroll** - Elements appear as you scroll down
- **Stagger animations** - Cards/items appear one by one, not all at once
- **Smooth page transitions** - No jarring jumps between sections
- **Hover effects** - Subtle lift, glow, or color shift on interaction
- **Micro-interactions** - Buttons pulse, inputs have smooth focus states

### Typography (Best Practices)
- **Headings:** 48-72px for H1, bold weight (700-900)
- **Body:** 16-18px, line-height 1.6-1.8 for readability
- **Font pairing:** Sans-serif headline + sans-serif body (modern)
  - Inter, SF Pro, Geist for tech/SaaS
  - Work Sans, DM Sans for friendly professionalism
- **Contrast:** Dark text on light bg = 4.5:1 minimum (WCAG AA)

### Color Psychology (Proven Converters)
**Blue** - Trust, stability, professional (banks, enterprise SaaS)
- Primary: #2563eb (blue-600)
- Accent: #06b6d4 (cyan-600)
- Use: CTA buttons, headers, highlights

**Green** - Growth, success, money (fintech, productivity)
- Primary: #10b981 (emerald-500)
- Use: Success states, positive metrics

**Purple** - Innovation, creativity, premium (AI, design tools)
- Primary: #8b5cf6 (violet-500)
- Use: Premium tiers, featured content

**Red/Orange** - Urgency, action, excitement (limited offers, alerts)
- Use sparingly for CTAs in high-stakes moments

**Best combo for automation/B2B:**
- Background: Dark slate (#0f172a, #1e293b)
- Primary: Blue gradient (#3b82f6 → #06b6d4)
- Accent: Cyan (#22d3ee)
- Text: White (#ffffff) + Slate-300 (#cbd5e1)

### Layout Patterns (Proven)
1. **Hero + 3-Column Benefits** (Stripe, Vercel)
2. **Pricing with "Most Popular" badge** (Linear, Notion)
3. **Testimonial carousel** (Figma, Webflow)
4. **Feature grid with icons** (Airtable, Zapier)
5. **CTA every 2-3 sections** (Intercom, HubSpot)

---

## Advanced Features (Top Sites Use These)

### Video Backgrounds
```jsx
<video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
  <source src="/hero-bg.mp4" type="video/mp4" />
</video>
```

**Best practices:**
- Keep under 5MB (compress heavily)
- Use WebM format (smaller than MP4)
- Fallback to gradient if video fails
- Opacity 30-50% so text remains readable

### Scroll-Triggered Animations
```jsx
'use client'
import { useEffect, useRef } from 'react'

function AnimateOnScroll({ children }) {
  const ref = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return <div ref={ref} className="opacity-0">{children}</div>
}
```

### Smooth Parallax (Linear, Apple)
```jsx
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  return (
    <motion.div style={{ y }}>
      {/* Content moves slower than scroll */}
    </motion.div>
  )
}
```

### Interactive Pricing Calculator
```jsx
'use client'
import { useState } from 'react'

function PricingCalculator() {
  const [users, setUsers] = useState(10)
  const price = Math.floor(users * 15 * 0.9) // Volume discount
  
  return (
    <div>
      <input type="range" min="1" max="100" value={users} onChange={(e) => setUsers(e.target.value)} />
      <div className="text-5xl font-bold">${price}/month</div>
    </div>
  )
}
```

### Live Demo / Preview
```jsx
// Embed CodeSandbox or show live product screenshots
<iframe src="https://codesandbox.io/embed/..." />
```

### Chatbot / Live Chat
```jsx
// Use Tawk.to (free), Intercom, or custom
<script src="https://embed.tawk.to/..." />
```

---

## Site Research - Best Automation/Service Sites

### Tier 1 (Industry Leaders)
1. **Stripe.com** - Payment processing
   - Gradient backgrounds, smooth animations
   - Clear pricing, interactive demos
   - Dark mode with blue accents

2. **Vercel.com** - Deployment platform
   - Minimal, fast, elegant
   - Black background, sharp typography
   - Animated code snippets

3. **Linear.app** - Project management
   - Best animations in the industry
   - Purple/blue gradients, smooth transitions
   - Feature showcase with videos

4. **Notion.so** - Productivity tool
   - Clean, approachable design
   - Lots of white space, simple CTAs
   - Use case-driven layout

5. **Webflow.com** - Website builder
   - Interactive demos, visual examples
   - Bold typography, clear hierarchy
   - Showcase real customer sites

### Tier 2 (Automation Specific)
6. **Zapier.com** - Workflow automation
   - Feature grid with icons
   - "How it works" flowchart
   - Integration logos (social proof)

7. **Make.com** (Integromat) - Automation
   - Visual workflow builder preview
   - Pricing tiers with feature comparison
   - Video tutorials embedded

8. **Airtable.com** - Database/automation
   - Interactive product tour
   - Use case templates
   - Clean, colorful design

9. **ClickUp.com** - Productivity automation
   - Feature-heavy but organized
   - Pricing comparison table
   - Testimonials with photos

10. **Monday.com** - Workflow platform
    - Bright, friendly colors
    - Animated product screenshots
    - Clear industry-specific pages

### Common Patterns Across All
✅ **Video in hero section** (30% of top sites)
✅ **Animated elements on scroll** (80%)
✅ **Dark mode with gradients** (60% of tech sites)
✅ **"Most Popular" badge on pricing** (90%)
✅ **Customer logos above fold** (70%)
✅ **CTA in nav bar** (100%)
✅ **Testimonials with photos** (85%)
✅ **Feature comparison table** (pricing pages)
✅ **Live chat widget** (65%)
✅ **Mobile-first responsive** (100%)

---

## Rebuild Strategy

### Phase 1: Hero Section (10/10 Impact)
- Full-viewport height
- Animated gradient background OR video
- Large, bold headline (60-80px)
- Subheadline (20-24px, max 20 words)
- 2 CTAs (primary + secondary)
- Scroll indicator or subtle animation

### Phase 2: Social Proof (Immediately After Hero)
- Customer logos (6-8 recognizable brands)
- OR stat counters ("10,000+ businesses automated")
- OR testimonial marquee (auto-scroll)

### Phase 3: How It Works (Visual Pipeline)
- 3-step process with icons
- Flowchart or animated diagram
- Short, punchy copy per step

### Phase 4: Services/Features Grid
- 6 cards, 2 rows of 3
- Icon + title + 1-sentence description
- Hover effect (lift + glow)
- Link to detailed service pages

### Phase 5: Pricing (Clear, Clickable)
- 3 tiers (Good/Better/Best)
- "Most Popular" badge on middle tier
- Large price numbers (48-60px)
- Feature bullets with checkmarks
- CTA button per tier
- Monthly vs Annual toggle

### Phase 6: Testimonials
- 3 cards with photos
- Quote + name + company + role
- Star rating or logo

### Phase 7: CTA Section
- Dark background
- Large headline
- 2 buttons (Start Free Trial / Contact Sales)

### Phase 8: Footer
- Links (Services, Pricing, About, Contact)
- Social media icons
- Email address
- Copyright

---

## Technical Stack (Modern, Fast)

### Framework
- **Next.js 14+** (App Router)
- TypeScript for type safety
- Tailwind CSS for styling

### Animation Libraries
- **Framer Motion** - Smooth, declarative animations
- **GSAP** - Advanced scroll animations (alternative)
- **Lottie** - JSON animations (illustrations)

### Performance
- **next/image** - Automatic image optimization
- **WebP/AVIF** - Modern image formats
- **Lazy loading** - Images below fold
- **Code splitting** - Only load what's needed
- **Font optimization** - next/font with Google Fonts

### Hosting
- **Vercel** - Automatic edge caching, CDN
- **Cloudflare** - DNS + DDoS protection

---

## Conversion Optimization

### A/B Test These
1. **Hero headline** - Feature vs Benefit focused
2. **CTA copy** - "Get Started" vs "Start Free Trial" vs "Book Demo"
3. **Pricing display** - Show prices vs "Contact Us"
4. **Social proof type** - Logos vs testimonials vs numbers
5. **Button colors** - Blue vs Green vs Orange

### Heatmap / Analytics
- **Hotjar** - See where users click, scroll
- **Google Analytics 4** - Track conversions
- **Vercel Analytics** - Page performance

### Key Metrics
- **Time to Interactive** - Under 3 seconds
- **Largest Contentful Paint** - Under 2.5s
- **Cumulative Layout Shift** - Under 0.1
- **Bounce rate** - Under 40%
- **Conversion rate** - 2-5% for B2B SaaS

---

## Example Sites to Study

### Animations
- linear.app (best in class)
- stripe.com (smooth gradients)
- apple.com (parallax mastery)

### Pricing Pages
- notion.so (clear tiers)
- figma.com (feature comparison)
- airtable.com (interactive calculator)

### Hero Sections
- vercel.com (minimal, sharp)
- superhuman.com (bold, confident)
- webflow.com (visual showcase)

### Dark Mode
- github.com (professional)
- discord.com (gaming aesthetic)
- linear.app (purple/blue)

### B2B SaaS
- hubspot.com (comprehensive)
- salesforce.com (enterprise)
- intercom.com (friendly, approachable)

---

## Quick Wins (Implement Today)

1. **Add video background to hero** (instant wow factor)
2. **Animate elements on scroll** (makes site feel alive)
3. **Bigger, bolder typography** (improves readability)
4. **Add gradient overlays** (modern, professional)
5. **Smooth hover effects** (buttons lift, cards glow)
6. **Add customer logos** (instant credibility)
7. **Make pricing cards clickable** (clear CTA)
8. **Add live chat widget** (increase conversions 20%+)
9. **Mobile-optimize everything** (60%+ traffic is mobile)
10. **Speed test + optimize** (every 100ms faster = 1% more conversions)

---

## Tools for Design Inspiration

- **Awwwards.com** - Award-winning web design
- **Dribbble.com** - UI/UX inspiration
- **SaaS landing page collection** - saaslandingpage.com
- **Really Good Emails** - Email design patterns
- **Land-book.com** - Landing page gallery

---

## Deployment Checklist

- [ ] Lighthouse score 90+ (all categories)
- [ ] Mobile responsive (test on real devices)
- [ ] Fast load time (<3s)
- [ ] All images optimized (WebP)
- [ ] SEO meta tags (title, description, OG)
- [ ] Analytics installed (GA4)
- [ ] Live chat widget (Tawk.to)
- [ ] SSL certificate (HTTPS)
- [ ] Custom domain configured
- [ ] Error pages styled (404, 500)

---

## Success Metrics (Top Sites)

| Metric | Target | Best in Class |
|--------|--------|---------------|
| Load time | <3s | <1.5s |
| Bounce rate | <50% | <30% |
| Time on site | >2min | >5min |
| Pages/session | >3 | >5 |
| Conversion | 2-5% | 10%+ |

**Goal:** Build a site that looks like a $10M company, converts like a $100M company.
