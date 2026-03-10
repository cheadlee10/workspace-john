# NorthStar Synergy — Services Page Demo Package v2
*Production Sprint Package — Last Updated: 2026-03-05*

---

## 🎯 HERO SECTION

### Primary Copy
```
HEADLINE: "We Don't Consult. We Build. We Deliver Results."
SUBHEAD: "$0 down. We build your solution first — you pay only when it works."
```

### CTA Buttons
| Button | Label | Action |
|--------|-------|--------|
| Primary | "See What We'd Build For You" | → Lead capture modal |
| Secondary | "View Our Work" | → Scroll to proof section |

### Hero Visual Spec
- **Background:** Navy gradient (`linear-gradient(135deg, #0F2340 0%, #1a3a5c 100%)`)
- **Accent:** Gold (#D4A574) underline on headline
- **Layout:** Centered text, CTA stack on mobile, inline on desktop

---

## 💰 OFFER BLOCKS (3 Services)

### 1. Website Development
**Hook:** *"Your competitors have websites getting the customers you're missing."*

| Tier | Monthly | What's Included |
|------|---------|-----------------|
| Starter | $99 | 5-page site + hosting + monthly updates |
| **Professional** | $199 | Full site + SEO + Google Business + support |
| Premium | $299 | + Dashboard + priority support + content updates |

**Proof line:** *"Most clients see new leads within 30 days."*
**CTA:** "Get Your Free Preview"

---

### 2. Automation & Scripts
**Hook:** *"Stop doing manually what a script can do in seconds."*

| Tier | One-Time | What's Included |
|------|----------|-----------------|
| Quick Fix | $99 | Single script + 1 revision |
| **Full Auto** | $299 | Multi-step workflow + docs |
| Enterprise | $999+ | Custom pipeline + support |

**Proof line:** *"Average client saves 10+ hours/week."*
**CTA:** "Describe Your Workflow"

---

### 3. Excel & Data Services
**Hook:** *"Find the error before your VP does."*

| Service | Price Range | Deliverable |
|---------|-------------|-------------|
| Formula Audit | $150–$500 | Error report + recommendations |
| Template | $39–$99 | Pre-built, customizable, ready |
| Custom Build | $500–$3,000 | Database, dashboard, or pipeline |

**Proof line:** *"We've caught six-figure mistakes hiding in spreadsheets."*
**CTA:** "Send Your File"

---

## ✅ PROOF ELEMENTS

### Stats Bar (Above Fold)
```html
<div class="stats-bar">
  <span>✓ $XX,XXX+ Value Delivered</span>
  <span>✓ XX Projects Completed</span>
  <span>✓ 48hr Avg Turnaround</span>
</div>
```
*Update numbers weekly from jobs.jsonl*

### Testimonial Framework
```
"[Specific result achieved in their words]"
— Name, Role, Company
```

**Placeholder examples (mark as such until real):**
> "They built our site in 3 days. We got 4 new leads the first week."
> — *Example Testimonial*

> "The script saves my team 8 hours every Monday morning."
> — *Example Testimonial*

> "Found a formula error that would have cost us $40K."
> — *Example Testimonial*

### Trust Badges
- **"Built by Operators"** — we run real businesses
- **"Your Data Never Leaves Your Control"** — security badge
- Platform badges (add when earned): Fiverr/Upwork ratings

---

## ⚡ FAST IMPLEMENTATION CHECKLIST

### Day 1: Scaffold
- [ ] Create `/services` route or `services.html`
- [ ] Hero section with headline + CTAs
- [ ] 3 empty offer block containers
- [ ] Proof section skeleton
- [ ] Nav link added

### Day 2: Content
- [ ] Populate offer blocks with pricing tables
- [ ] Add stats bar (use placeholders if needed)
- [ ] Insert 3 testimonial cards
- [ ] Wire CTAs to lead form / Calendly

### Day 3: Polish
- [ ] Apply brand colors (see CSS below)
- [ ] Hover states on offer blocks
- [ ] Mobile responsive pass
- [ ] Scroll animations (fade-in)
- [ ] Test all links

### Day 4: Launch
- [ ] Final copy review
- [ ] Test lead capture
- [ ] Add tracking (GA4 / Plausible)
- [ ] Deploy to production
- [ ] Update outreach templates with link

---

## 🧩 REUSABLE SNIPPETS

### CSS Variables
```css
:root {
  --navy: #0F2340;
  --gold: #D4A574;
  --white: #FFFFFF;
  --gray-light: #F5F5F5;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Hero HTML
```html
<section class="hero" style="background: linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%); padding: 80px 20px; text-align: center;">
  <h1 style="color: var(--gold); font-size: 2.5rem; margin-bottom: 16px;">
    We Don't Consult. We Build. We Deliver Results.
  </h1>
  <p style="color: var(--white); font-size: 1.25rem; margin-bottom: 32px;">
    $0 down. We build your solution first — you pay only when it works.
  </p>
  <div>
    <a href="#lead-form" class="btn-primary">See What We'd Build For You</a>
    <a href="#proof" class="btn-secondary">View Our Work</a>
  </div>
</section>
```

### Offer Block HTML
```html
<div class="offer-block">
  <h3>Website Development</h3>
  <p class="hook">Your competitors have websites getting the customers you're missing.</p>
  
  <div class="tiers">
    <div class="tier"><strong>Starter</strong> $99/mo<br><small>5-page site + hosting + updates</small></div>
    <div class="tier featured"><strong>Professional</strong> $199/mo<br><small>Full site + SEO + Google Business</small></div>
    <div class="tier"><strong>Premium</strong> $299/mo<br><small>Everything + dashboard + priority</small></div>
  </div>
  
  <p class="proof-line">Most clients see new leads within 30 days.</p>
  <a href="#contact" class="btn-gold">Get Your Free Preview</a>
</div>
```

### Button Styles
```css
.btn-primary {
  background: var(--gold);
  color: var(--navy);
  padding: 14px 28px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212,165,116,0.4);
}
.btn-secondary {
  background: transparent;
  color: var(--gold);
  border: 2px solid var(--gold);
  padding: 12px 26px;
  border-radius: 6px;
  margin-left: 12px;
}
```

### Offer Block Styles
```css
.offer-block {
  background: var(--white);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(15,35,64,0.08);
  transition: transform 0.3s;
  max-width: 360px;
}
.offer-block:hover { transform: translateY(-4px); }
.offer-block .hook { color: #666; font-style: italic; margin-bottom: 20px; }
.offer-block .tier { padding: 12px; border-radius: 8px; margin-bottom: 8px; background: var(--gray-light); }
.offer-block .tier.featured { border: 2px solid var(--gold); background: #fffaf5; }
.offer-block .proof-line { font-size: 0.9rem; color: var(--navy); margin-top: 16px; }
.btn-gold { background: var(--gold); color: var(--navy); padding: 10px 20px; border-radius: 6px; font-weight: 600; display: inline-block; margin-top: 16px; }
```

### Testimonial Card
```html
<div class="testimonial">
  <blockquote>"They built our site in 3 days. We got 4 new leads the first week."</blockquote>
  <cite>— Name, Company</cite>
</div>
```

### Stats Bar
```html
<div style="background: var(--navy); color: var(--gold); padding: 16px; display: flex; justify-content: center; gap: 40px; font-weight: 500;">
  <span>✓ $XX,XXX+ Value Delivered</span>
  <span>✓ XX Projects</span>
  <span>✓ 48hr Turnaround</span>
</div>
```

---

## 📝 COPY VOICE RULES

| ✅ Do | ❌ Don't |
|-------|---------|
| "We build it before you pay" | "Flexible payment options available" |
| "Find the error before your VP does" | "Comprehensive auditing services" |
| "10 hours saved per week" | "Increased operational efficiency" |
| Short, specific, result-focused | Long, vague, feature-focused |

**Tone:** Confident expert. Warm but direct. Results > process.

---

## 🚀 NEXT ACTIONS

1. **Cliff/Dev:** Build page using snippets above
2. **John:** Collect real testimonials as jobs close
3. **Post-launch:** A/B test hero headline, track CTA clicks
4. **Weekly:** Update stats bar from jobs.jsonl

---

*Owner: John | Status: Ready to Build | Sprint: Day 1-4*
