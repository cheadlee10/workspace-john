# NorthStar Synergy — Site Demo Package Plan
*Concise production blueprint for services page*

---

## 1. HERO SECTION

### Headline Options (Pick One)
```
A) "Stop Consulting. Start Building."
B) "Enterprise Results. Startup Speed."
C) "We Build What Others Only Plan."
```

### Subhead
```
Automation, websites, and data systems that actually work — 
built by operators who run real businesses.
```

### CTA Pair
```
[Get Your Free Demo] (Gold button, primary)
[See Our Work →] (Text link, secondary)
```

### Visual Direction
- Navy (#0F2340) background with gold (#D4A574) accents
- Geometric star logo (★) top-left
- Optional: subtle grid pattern or animated data visualization
- Hero image: clean dashboard screenshot or code snippet (not stock photos)

---

## 2. OFFER BLOCKS (Service Tiers)

### Block Structure (Repeat per service)
```html
<div class="offer-card">
  <span class="tier-badge">MOST POPULAR</span>
  <h3>[Service Name]</h3>
  <p class="price">$X<span>/month</span></p>
  <p class="tagline">[One-line benefit]</p>
  <ul class="features">
    <li>✓ Feature 1</li>
    <li>✓ Feature 2</li>
    <li>✓ Feature 3</li>
  </ul>
  <a href="#contact" class="cta-btn">Start Now</a>
</div>
```

### Service Cards Content

| Service | Price | Tagline | Top 3 Features |
|---------|-------|---------|----------------|
| **Website + Hosting** | $199/mo | "Your business online, maintained forever" | Custom design, SEO, monthly updates |
| **Excel Automation** | $299/mo | "Save 15+ hours every week" | VBA scripts, dashboards, support |
| **Data Pipeline** | $399/mo | "Clean data, on time, always" | ETL, reporting, monitoring |
| **Custom Bot** | $499/mo | "Your workflow, automated" | Discord/Telegram/custom, 24/7 uptime |

### Visual Treatment
- 3-4 cards in a row (responsive grid)
- Middle card slightly elevated (shadow + scale) = "Most Popular"
- Gold border on featured tier
- Hover: subtle lift + shadow increase

---

## 3. PROOF ELEMENTS

### A) Social Proof Bar (Above Fold)
```
"Trusted by 50+ small businesses across Seattle"
[Star icons] 4.9/5 average rating
```

### B) Results Strip (Numbers Section)
```
[ 15+ ]        [ 200+ ]        [ $2M+ ]
Hours saved    Projects        Revenue unlocked
per client     delivered       for clients
```

### C) Testimonial Cards
```html
<blockquote class="testimonial">
  <p>"They built our site in a week. We've gotten 12 new customers from it already."</p>
  <cite>— Kevin M., Landscaping Business Owner</cite>
</blockquote>
```

### D) Logo Strip (When Available)
```
"Companies we've helped:"
[Client Logo 1] [Client Logo 2] [Client Logo 3]
```

### E) Trust Badges
```
✓ No upfront cost   ✓ Cancel anytime after 12 months   ✓ Built in USA
```

---

## 4. FAST IMPLEMENTATION CHECKLIST

### Phase 1: Core Structure (30 min)
- [ ] Create `index.html` with semantic sections
- [ ] Add CSS variables for brand colors
- [ ] Build responsive nav with logo + CTA
- [ ] Implement hero section with headline/sub/CTA

### Phase 2: Offer Section (20 min)
- [ ] Create pricing card component
- [ ] Add 3-4 service cards with content
- [ ] Style "Most Popular" badge/elevation
- [ ] Add hover states

### Phase 3: Proof Elements (15 min)
- [ ] Add social proof bar
- [ ] Create results/metrics strip
- [ ] Add 2-3 testimonial cards
- [ ] Include trust badges

### Phase 4: Contact + Footer (15 min)
- [ ] Contact form (name, email, message)
- [ ] Footer with links + copyright
- [ ] Add Calendly embed or booking link

### Phase 5: Polish (20 min)
- [ ] Mobile responsive passes
- [ ] Add smooth scroll behavior
- [ ] Optimize images (WebP)
- [ ] Test all links/CTAs

**Total Build Time: ~2 hours**

---

## 5. REUSABLE SNIPPETS

### CSS Variables (Brand Colors)
```css
:root {
  --navy: #0F2340;
  --gold: #D4A574;
  --light-gray: #F8F9FA;
  --dark-gray: #2C3E50;
  --accent-beige: #E8D4B8;
  --white: #FFFFFF;
  --shadow: 0 4px 20px rgba(15, 35, 64, 0.15);
  --radius: 8px;
}
```

### Hero Section HTML
```html
<section class="hero">
  <div class="container">
    <h1>Stop Consulting. Start Building.</h1>
    <p class="subhead">Automation, websites, and data systems that actually work — built by operators who run real businesses.</p>
    <div class="cta-group">
      <a href="#contact" class="btn btn-primary">Get Your Free Demo</a>
      <a href="#work" class="btn btn-text">See Our Work →</a>
    </div>
  </div>
</section>
```

### Hero CSS
```css
.hero {
  background: var(--navy);
  color: var(--white);
  padding: 120px 0;
  text-align: center;
}
.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.hero .subhead {
  font-size: 1.25rem;
  color: var(--accent-beige);
  max-width: 600px;
  margin: 0 auto 2rem;
}
.btn-primary {
  background: var(--gold);
  color: var(--navy);
  padding: 16px 32px;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
.btn-text {
  color: var(--gold);
  text-decoration: none;
  margin-left: 1rem;
}
```

### Pricing Card HTML
```html
<div class="offer-card featured">
  <span class="badge">MOST POPULAR</span>
  <h3>Website + Hosting</h3>
  <p class="price">$199<span>/month</span></p>
  <p class="tagline">Your business online, maintained forever</p>
  <ul>
    <li>✓ Custom responsive design</li>
    <li>✓ SEO optimization</li>
    <li>✓ Monthly updates included</li>
    <li>✓ Hosting & SSL</li>
  </ul>
  <a href="#contact" class="btn btn-primary">Start Now</a>
</div>
```

### Pricing Card CSS
```css
.offer-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.2s;
}
.offer-card:hover {
  transform: translateY(-4px);
}
.offer-card.featured {
  border: 2px solid var(--gold);
  transform: scale(1.05);
}
.offer-card .badge {
  background: var(--gold);
  color: var(--navy);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.offer-card .price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--navy);
  margin: 1rem 0;
}
.offer-card .price span {
  font-size: 1rem;
  color: var(--dark-gray);
}
.offer-card ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
}
.offer-card li {
  padding: 0.5rem 0;
  color: var(--dark-gray);
}
```

### Testimonial HTML
```html
<section class="testimonials">
  <div class="container">
    <h2>What Our Clients Say</h2>
    <div class="testimonial-grid">
      <blockquote>
        <p>"They built our site in a week. We've gotten 12 new customers from it already."</p>
        <cite>— Kevin M., Landscaping</cite>
      </blockquote>
      <blockquote>
        <p>"The Excel automation saves me 20 hours a month. Paid for itself day one."</p>
        <cite>— Sarah T., Operations Manager</cite>
      </blockquote>
    </div>
  </div>
</section>
```

### Testimonial CSS
```css
.testimonials {
  background: var(--light-gray);
  padding: 80px 0;
}
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
blockquote {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius);
  border-left: 4px solid var(--gold);
  box-shadow: var(--shadow);
}
blockquote p {
  font-style: italic;
  color: var(--dark-gray);
  margin-bottom: 1rem;
}
blockquote cite {
  color: var(--navy);
  font-weight: 600;
}
```

### Results Strip HTML
```html
<section class="results-strip">
  <div class="container">
    <div class="stat">
      <span class="number">15+</span>
      <span class="label">Hours saved per client</span>
    </div>
    <div class="stat">
      <span class="number">200+</span>
      <span class="label">Projects delivered</span>
    </div>
    <div class="stat">
      <span class="number">$2M+</span>
      <span class="label">Revenue unlocked</span>
    </div>
  </div>
</section>
```

### Results Strip CSS
```css
.results-strip {
  background: var(--navy);
  padding: 60px 0;
}
.results-strip .container {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.stat .number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--gold);
}
.stat .label {
  color: var(--accent-beige);
  font-size: 1rem;
}
```

### Contact Form HTML
```html
<section id="contact" class="contact">
  <div class="container">
    <div class="contact-content">
      <h2>Let's Build Something Great</h2>
      <p>No upfront cost. No commitment to start.</p>
    </div>
    <form class="contact-form">
      <input type="text" placeholder="Your Name" required>
      <input type="email" placeholder="Your Email" required>
      <textarea placeholder="Tell us about your project" rows="4"></textarea>
      <button type="submit" class="btn btn-primary">Get Started</button>
    </form>
  </div>
</section>
```

### Contact Form CSS
```css
.contact {
  padding: 80px 0;
  background: var(--light-gray);
}
.contact .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.contact-form {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--radius);
  font-size: 1rem;
}
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--gold);
}
```

---

## 6. FILE STRUCTURE

```
website/
├── index.html              # Main services page
├── styles.css              # All CSS (use snippets above)
├── logo.svg                # Star logo
├── images/
│   ├── hero-bg.webp        # Optional hero background
│   └── client-logos/       # Proof section
└── SITE_DEMO_PACKAGE.md    # This file
```

---

## 7. COPY BANK (Ready to Use)

### Headlines
- "Stop Consulting. Start Building."
- "Enterprise Results. Startup Speed."
- "We Build What Others Only Plan."
- "Your Business, Automated."
- "Results You Can Measure. Speed You Can Feel."

### Subheads
- "Built by operators who run real businesses."
- "No upfront cost. Cancel anytime after 12 months."
- "The tools and systems your competitors wish they had."

### CTAs
- "Get Your Free Demo"
- "Start Now"
- "See What We Built for You"
- "Schedule a Call"
- "Let's Talk"

### Value Props
- "Save 15+ hours every week"
- "Your business online, maintained forever"
- "Clean data, on time, always"
- "Your workflow, automated 24/7"

### Trust Statements
- "Trusted by 50+ small businesses across Seattle"
- "No upfront cost"
- "Cancel anytime after 12 months"
- "Built in USA"
- "4.9/5 average rating"

---

## QUICK START

1. Copy CSS variables into stylesheet
2. Build hero with headline A
3. Add 4 pricing cards (website, excel, data, bot)
4. Drop in results strip + 2 testimonials
5. Add contact form
6. Deploy to Vercel

**Time to live site: 2 hours.**
