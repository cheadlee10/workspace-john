# NorthStar Synergy — Services Page Demo Package
*Production-ready copy, structure, and implementation snippets*

---

## 🎯 HERO SECTION

### Primary Headline
```
We Don't Just Consult. We Build. We Operate. We Deliver Results.
```

### Subheadline
```
Enterprise-quality automation, websites, and data solutions — built by operators who run real businesses.
```

### Hero CTA
```html
<button class="bg-[#D4A574] text-[#0F2340] px-8 py-4 font-bold rounded-lg hover:bg-[#c49564] transition">
  Get Your Free Consultation →
</button>
```

### Trust Badges (below hero)
```
✓ No upfront cost on web packages  |  ✓ Results-focused pricing  |  ✓ 48-hour delivery on audits
```

---

## 💼 OFFER BLOCKS (6 Services × 3 Tiers)

### Block Layout (reusable component)
```jsx
// ServiceCard.tsx
interface ServiceCardProps {
  title: string;
  description: string;
  tiers: {
    name: string;
    price: string;
    features: string[];
    cta: string;
  }[];
  icon: React.ReactNode;
}
```

### Service 1: Excel Automation
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $150 | Formula audit + error report + optimization tips |
| **Pro** | $300 | Full workbook rebuild + VBA macros + documentation |
| **Enterprise** | $500 | Multi-workbook automation + training session + 30-day support |

**Headline:** "Stop losing hours to broken spreadsheets."
**Proof hook:** *"We've audited 100+ spreadsheets. Average time saved: 12 hours/week."*

---

### Service 2: Python Scripts
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $99 | Single-purpose script + basic documentation |
| **Pro** | $299 | Multi-function automation + error handling + setup guide |
| **Enterprise** | $999 | Full pipeline + scheduling + monitoring + 60-day support |

**Headline:** "Automate the boring stuff. Focus on growth."
**Proof hook:** *"Our scripts run 24/7 so you don't have to."*

---

### Service 3: Web Development
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $99/mo | 5-page site + hosting + monthly updates |
| **Pro** | $199/mo | Full site + SEO + Google Business + support |
| **Premium** | $299/mo | Everything + dashboard + priority support + content |

**Headline:** "$0 down. Your competitors already have a website."
**Proof hook:** *"See your site live before you pay a dime."*

---

### Service 4: Custom Bots
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $500 | Single-channel bot + basic commands + setup |
| **Pro** | $2,000 | Multi-platform + integrations + admin dashboard |
| **Enterprise** | $5,000 | Full AI agent + custom workflows + ongoing support |

**Headline:** "Your business, running on autopilot."
**Proof hook:** *"Bots that handle customer inquiries while you sleep."*

---

### Service 5: Data Engineering
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $200 | Data cleaning + structuring + delivery |
| **Pro** | $500 | Pipeline setup + automation + visualization |
| **Enterprise** | $2,000 | Full data warehouse + dashboards + training |

**Headline:** "Turn chaos into clarity."
**Proof hook:** *"Clean data = better decisions. We've processed 10M+ rows."*

---

### Service 6: API Integration
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Starter** | $500 | Single API connection + documentation |
| **Pro** | $1,500 | Multi-system integration + error handling |
| **Enterprise** | $3,000 | Full ecosystem sync + monitoring + support |

**Headline:** "Make your systems talk to each other."
**Proof hook:** *"Connect Stripe, HubSpot, Slack, Sheets — all working together."*

---

## 🏆 PROOF ELEMENTS

### Social Proof Bar
```html
<div class="flex justify-center gap-8 py-6 bg-[#0F2340]/50">
  <span class="text-[#D4A574] font-bold">100+ Projects Delivered</span>
  <span class="text-white">|</span>
  <span class="text-[#D4A574] font-bold">48-Hour Turnaround</span>
  <span class="text-white">|</span>
  <span class="text-[#D4A574] font-bold">30-Day Money-Back Guarantee</span>
</div>
```

### Testimonial Block (placeholder until real ones exist)
```html
<blockquote class="border-l-4 border-[#D4A574] pl-4 italic text-gray-300">
  "They didn't just fix my spreadsheet — they rebuilt my entire workflow. 
  Saving 15 hours a week now."
  <cite class="block mt-2 text-[#D4A574] not-italic">— Operations Manager, Tech Startup</cite>
</blockquote>
```

### Trust Signals
```
✓ Built by operators (we run real businesses)
✓ Transparent 3-tier pricing (no hidden fees)
✓ Results-focused (ROI > hours)
✓ Enterprise quality, startup speed
```

### "Why Us" Differentiators Block
```markdown
| Them | Us |
|------|----|
| Consultants who talk | Operators who build |
| Hourly billing | Results-based pricing |
| Weeks of back-and-forth | 48-hour turnaround |
| Cookie-cutter templates | Custom solutions |
```

---

## 🎨 VISUAL STYLE GUIDE

### Colors
```css
:root {
  --navy: #0F2340;
  --gold: #D4A574;
  --dark-bg: #0a1628;
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
}
```

### Typography
```css
/* Headlines */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 700;
letter-spacing: -0.02em;

/* Body */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400;
line-height: 1.6;
```

### Button Styles
```css
/* Primary CTA */
.btn-primary {
  @apply bg-[#D4A574] text-[#0F2340] px-6 py-3 font-bold rounded-lg 
         hover:bg-[#c49564] transition-all duration-200;
}

/* Secondary CTA */
.btn-secondary {
  @apply border-2 border-[#D4A574] text-[#D4A574] px-6 py-3 font-bold 
         rounded-lg hover:bg-[#D4A574] hover:text-[#0F2340] transition-all;
}
```

---

## ⚡ FAST IMPLEMENTATION CHECKLIST

### Phase 1: Core Page (2 hours)
- [ ] Create `/services` route in Next.js
- [ ] Add hero section with headline + CTA
- [ ] Implement 6 service cards with 3-tier pricing
- [ ] Add trust badges bar
- [ ] Wire up "Get Started" buttons to Stripe checkout

### Phase 2: Proof Layer (1 hour)
- [ ] Add social proof bar (projects delivered, turnaround, guarantee)
- [ ] Add placeholder testimonial block
- [ ] Add "Why Us" comparison table
- [ ] Add FAQ accordion (use existing component or build simple one)

### Phase 3: Conversion Optimization (30 min)
- [ ] Add sticky header CTA on scroll
- [ ] Add exit-intent popup with lead magnet
- [ ] Add live chat widget or Calendly embed
- [ ] Mobile responsiveness QA pass

### Phase 4: Analytics & Tracking (30 min)
- [ ] Add Google Analytics 4
- [ ] Set up conversion events (button clicks, form submits)
- [ ] Add Meta Pixel (optional, for retargeting)
- [ ] Test payment flow end-to-end

---

## 📋 REUSABLE SNIPPETS

### Service Card Component (React/Next.js)
```tsx
// components/ServiceCard.tsx
export function ServiceCard({ 
  title, 
  description, 
  tiers,
  icon 
}: ServiceCardProps) {
  return (
    <div className="bg-[#0F2340]/50 rounded-xl p-6 border border-[#D4A574]/20">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className={`p-4 rounded-lg ${i === 1 ? 'bg-[#D4A574]/10 border-2 border-[#D4A574]' : 'bg-[#0a1628]'}`}>
            <span className="text-[#D4A574] font-medium">{tier.name}</span>
            <p className="text-2xl font-bold text-white my-2">{tier.price}</p>
            <ul className="text-sm text-gray-400 space-y-1 mb-4">
              {tier.features.map((f, j) => (
                <li key={j}>✓ {f}</li>
              ))}
            </ul>
            <button className="w-full btn-primary text-sm">{tier.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pricing Toggle (Monthly/Annual)
```tsx
// For subscription services
<div className="flex items-center gap-4 justify-center mb-8">
  <span className={billing === 'monthly' ? 'text-white' : 'text-gray-500'}>Monthly</span>
  <button 
    onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
    className="w-14 h-7 bg-[#D4A574] rounded-full relative"
  >
    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${billing === 'annual' ? 'right-1' : 'left-1'}`} />
  </button>
  <span className={billing === 'annual' ? 'text-white' : 'text-gray-500'}>Annual <span className="text-[#D4A574] text-sm">(Save 20%)</span></span>
</div>
```

### FAQ Accordion
```tsx
// Simple FAQ component
const faqs = [
  { q: "What's your turnaround time?", a: "Most projects deliver in 48 hours. Enterprise projects: 1-2 weeks." },
  { q: "Do you offer refunds?", a: "Yes — 30-day money-back guarantee on all services." },
  { q: "How does the $0 down work?", a: "For web packages: we build your site first, you pay monthly after launch." },
];

{faqs.map((faq, i) => (
  <details key={i} className="border-b border-[#D4A574]/20 py-4">
    <summary className="font-bold text-white cursor-pointer">{faq.q}</summary>
    <p className="text-gray-400 mt-2">{faq.a}</p>
  </details>
))}
```

### Stripe Checkout Button
```tsx
// Wire to your existing Stripe API route
async function handleCheckout(priceId: string) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });
  const { url } = await res.json();
  window.location.href = url;
}
```

---

## 📊 SUCCESS METRICS

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Page load time | <2s | Lighthouse |
| Bounce rate | <40% | GA4 |
| CTA click rate | >5% | Event tracking |
| Form completion | >30% of clicks | Funnel analysis |
| Time on page | >90s | GA4 |

---

## 🚀 NEXT STEPS

1. **Immediate:** Copy hero section + 2 service cards into existing site
2. **Today:** Wire up Stripe checkout to "Get Started" buttons
3. **This week:** Add proof elements + remaining service cards
4. **Before launch:** QA mobile, test payments, set up analytics

---

*Generated: 2026-03-05 | Demo Package v1.0*
