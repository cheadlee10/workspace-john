# NorthStar Synergy — Services Page Demo Package
*Concise, copy-ready, deploy-fast*

---

## 1. HERO SECTION

### Primary Headline (Test A)
```
We Build. We Operate. We Deliver Results.
```

### Primary Headline (Test B)
```
From Idea to Deployed — Enterprise Quality, Startup Speed
```

### Subheadline
```
Technical solutions that actually work. Excel automation, custom scripts, 
web apps, bots, and data pipelines — built by operators who run real businesses.
```

### CTA Button
```
Get a Free Quote → 
```

### Hero Code Snippet (Next.js + Tailwind)
```tsx
// components/Hero.tsx
export function Hero() {
  return (
    <section className="bg-[#0F2340] py-24 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        We Build. We Operate. <span className="text-[#D4A574]">We Deliver Results.</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
        Technical solutions that actually work. Excel automation, custom scripts, 
        web apps, bots, and data pipelines — built by operators who run real businesses.
      </p>
      <a
        href="#services"
        className="inline-block bg-[#D4A574] text-[#0F2340] font-semibold px-8 py-4 rounded-lg 
                   hover:bg-[#c49464] transition-colors text-lg"
      >
        Get a Free Quote →
      </a>
    </section>
  );
}
```

---

## 2. OFFER BLOCKS (Services Grid)

### Service Cards Data
```ts
// data/services.ts
export const services = [
  {
    id: 'excel',
    name: 'Excel Automation',
    description: 'Complex formulas, VBA macros, Power Query — fix errors before your VP does.',
    icon: '📊',
    tiers: [
      { name: 'Starter', price: 150, features: ['Formula audit', 'Basic cleanup', '1 revision'] },
      { name: 'Pro', price: 300, features: ['Full workbook audit', 'VBA automation', '3 revisions', '7-day support'] },
      { name: 'Enterprise', price: 500, features: ['Complete rebuild', 'Custom dashboards', 'Training doc', '30-day support'] }
    ]
  },
  {
    id: 'scripts',
    name: 'Python Scripts',
    description: 'Automate anything. Web scraping, data processing, API integrations.',
    icon: '🐍',
    tiers: [
      { name: 'Starter', price: 99, features: ['Simple script', 'Basic docs', '1 revision'] },
      { name: 'Pro', price: 299, features: ['Complex automation', 'Error handling', 'Full docs', '14-day support'] },
      { name: 'Enterprise', price: 999, features: ['Production-grade', 'Monitoring', 'Deployment', '60-day support'] }
    ]
  },
  {
    id: 'web',
    name: 'Web Development',
    description: 'Landing pages to full-stack apps. Modern, fast, conversion-optimized.',
    icon: '🌐',
    tiers: [
      { name: 'Starter', price: 1000, features: ['5-page site', 'Mobile responsive', 'Basic SEO'] },
      { name: 'Pro', price: 3000, features: ['Full site', 'CMS integration', 'Analytics', 'SEO optimization'] },
      { name: 'Enterprise', price: 5000, features: ['Custom app', 'User auth', 'Database', 'Admin panel', '90-day support'] }
    ]
  },
  {
    id: 'bots',
    name: 'Custom Bots',
    description: 'Discord, Telegram, Slack — automate notifications, commands, workflows.',
    icon: '🤖',
    tiers: [
      { name: 'Starter', price: 500, features: ['Basic bot', '5 commands', 'Self-hosted'] },
      { name: 'Pro', price: 2000, features: ['Advanced bot', 'Database', 'Hosting included', '30-day support'] },
      { name: 'Enterprise', price: 5000, features: ['Full platform', 'Multi-server', 'Analytics', 'White-label', '90-day support'] }
    ]
  },
  {
    id: 'data',
    name: 'Data Engineering',
    description: 'Clean, structure, visualize. Turn messy data into actionable insights.',
    icon: '📈',
    tiers: [
      { name: 'Starter', price: 200, features: ['Data cleaning', 'Basic analysis', 'CSV export'] },
      { name: 'Pro', price: 500, features: ['Pipeline setup', 'Visualization', 'Automated refresh'] },
      { name: 'Enterprise', price: 2000, features: ['Full warehouse', 'Real-time sync', 'Custom dashboards', '60-day support'] }
    ]
  },
  {
    id: 'api',
    name: 'API Integration',
    description: 'Connect your tools. Stripe, Salesforce, Zapier, custom — we wire it all.',
    icon: '🔌',
    tiers: [
      { name: 'Starter', price: 500, features: ['Single integration', 'Basic mapping', 'Docs'] },
      { name: 'Pro', price: 1500, features: ['Multi-system', 'Error handling', 'Monitoring'] },
      { name: 'Enterprise', price: 3000, features: ['Full ecosystem', 'Custom middleware', 'Real-time sync', '60-day support'] }
    ]
  }
];
```

### Service Card Component
```tsx
// components/ServiceCard.tsx
interface Tier {
  name: string;
  price: number;
  features: string[];
}

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  tiers: Tier[];
}

export function ServiceCard({ name, description, icon, tiers }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-[#0F2340] p-6 text-center">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-xl font-bold text-white mt-3">{name}</h3>
        <p className="text-gray-300 text-sm mt-2">{description}</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-2 text-center">
          {tiers.map((tier) => (
            <div key={tier.name} className="border rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase">{tier.name}</div>
              <div className="text-xl font-bold text-[#0F2340]">${tier.price}</div>
            </div>
          ))}
        </div>
        <a
          href={`/services/${name.toLowerCase().replace(' ', '-')}`}
          className="mt-4 block text-center bg-[#D4A574] text-[#0F2340] font-semibold py-2 rounded-lg hover:bg-[#c49464]"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
```

### Services Grid Section
```tsx
// components/ServicesGrid.tsx
import { services } from '@/data/services';
import { ServiceCard } from './ServiceCard';

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F2340] text-center mb-4">
          What We Build
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Six core services. Three pricing tiers each. Transparent pricing, no surprises.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 3. PROOF ELEMENTS

### A. Stats Bar
```tsx
// components/StatsBar.tsx
const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '<24h', label: 'Response Time' },
  { value: '$1M+', label: 'Client Revenue Generated' }
];

export function StatsBar() {
  return (
    <section className="bg-[#0F2340] py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl md:text-4xl font-bold text-[#D4A574]">{stat.value}</div>
            <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### B. Testimonials
```tsx
// components/Testimonials.tsx
const testimonials = [
  {
    quote: "They rebuilt our entire reporting pipeline in 3 days. What used to take 4 hours now runs automatically at 6am.",
    name: "Sarah K.",
    role: "Operations Director",
    company: "TechFlow Inc."
  },
  {
    quote: "Best decision we made. Our Excel nightmare is now a dashboard our whole team actually uses.",
    name: "Mike R.",
    role: "CFO",
    company: "GreenPath Landscaping"
  },
  {
    quote: "Fast, professional, and they actually understood our business. Rare combination.",
    name: "Jennifer L.",
    role: "Founder",
    company: "Boutique Events Co."
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F2340] text-center mb-12">
          What Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#D4A574]">
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <div className="font-semibold text-[#0F2340]">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}, {t.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### C. Trust Badges
```tsx
// components/TrustBadges.tsx
export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-8 bg-gray-100">
      <span className="flex items-center gap-2 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Money-Back Guarantee
      </span>
      <span className="flex items-center gap-2 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        24-Hour Turnaround Available
      </span>
      <span className="flex items-center gap-2 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        Direct Support (No Bots)
      </span>
    </div>
  );
}
```

### D. "Why Us" Differentiators
```tsx
// components/WhyUs.tsx
const differentiators = [
  {
    title: "Built by Operators",
    description: "We run real businesses. We know what works because we use it ourselves."
  },
  {
    title: "Results Over Hours",
    description: "We charge for outcomes, not time. You pay for the solution, not the meetings."
  },
  {
    title: "Enterprise Quality, Startup Speed",
    description: "Production-grade code delivered in days, not months."
  },
  {
    title: "Transparent Pricing",
    description: "Three tiers per service. Pick what fits. No hidden fees, no surprises."
  }
];

export function WhyUs() {
  return (
    <section className="py-20 px-6 bg-[#0F2340]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why NorthStar?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {differentiators.map((d, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-[#D4A574] rounded-full flex items-center justify-center text-[#0F2340] font-bold shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{d.title}</h3>
                <p className="text-gray-300">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 4. FAST IMPLEMENTATION CHECKLIST

### Phase 1: Core Pages (Day 1)
- [ ] Create `app/page.tsx` with Hero + ServicesGrid + StatsBar + WhyUs + Testimonials + TrustBadges + Footer
- [ ] Create `data/services.ts` with all service data
- [ ] Create all component files in `components/`
- [ ] Add Tailwind config with brand colors:
  ```js
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        navy: '#0F2340',
        gold: '#D4A574'
      }
    }
  }
  ```

### Phase 2: Service Detail Pages (Day 2)
- [ ] Create `app/services/[slug]/page.tsx` dynamic route
- [ ] Build PricingTable component (3-column, feature comparison)
- [ ] Add "Get Started" buttons linked to Stripe checkout
- [ ] Add FAQ accordion per service

### Phase 3: Checkout & Payment (Day 3)
- [ ] Create Stripe products for each tier (18 total: 6 services × 3 tiers)
- [ ] Build checkout API route `app/api/checkout/route.ts`
- [ ] Add success/cancel pages
- [ ] Set up webhook for payment confirmation
- [ ] Auto-log to `jobs.jsonl` on success

### Phase 4: Trust & Proof (Day 4)
- [ ] Add real testimonials as they come in (placeholder until then)
- [ ] Add case study section (template ready, content pending)
- [ ] Add Google Reviews embed (if applicable)
- [ ] Add "As Seen On" logo bar (Fiverr, Upwork, etc. if using)

### Phase 5: SEO & Deploy (Day 5)
- [ ] Add meta tags, OG images, structured data
- [ ] Connect Google Analytics
- [ ] Deploy to Vercel
- [ ] Point domain
- [ ] Test full flow: visit → browse → checkout → payment → confirmation

---

## 5. REUSABLE SNIPPETS

### Brand Colors (CSS Variables)
```css
:root {
  --color-navy: #0F2340;
  --color-gold: #D4A574;
  --color-gold-hover: #c49464;
}
```

### Button Styles
```tsx
// Primary CTA
<button className="bg-[#D4A574] text-[#0F2340] font-semibold px-6 py-3 rounded-lg hover:bg-[#c49464] transition-colors">
  Get Started
</button>

// Secondary CTA  
<button className="border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded-lg hover:bg-[#D4A574] hover:text-[#0F2340] transition-colors">
  Learn More
</button>
```

### Section Wrapper
```tsx
// Standard section padding
<section className="py-20 px-6 max-w-6xl mx-auto">
  {children}
</section>
```

### Heading Pattern
```tsx
// Section heading
<h2 className="text-3xl font-bold text-[#0F2340] text-center mb-4">{title}</h2>
<p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{subtitle}</p>
```

### Price Display
```tsx
<div className="text-center">
  <span className="text-4xl font-bold text-[#0F2340]">${price}</span>
  <span className="text-gray-500 text-sm ml-1">one-time</span>
</div>
```

### Feature List
```tsx
<ul className="space-y-2">
  {features.map((f) => (
    <li key={f} className="flex items-center gap-2 text-gray-700">
      <span className="text-[#D4A574]">✓</span> {f}
    </li>
  ))}
</ul>
```

---

## 6. QUICK COPY BANK

### Taglines
- "We don't just consult. We build."
- "Technical depth. Business results."
- "Enterprise quality. Startup speed."
- "From chaos to clarity."
- "The last spreadsheet fix you'll ever need."

### CTAs
- "Get a Free Quote"
- "Start Your Project"
- "See Pricing"
- "Book a Call"
- "Get Started Today"

### Objection Handlers
- **"Too expensive"** → "Our Pro tier clients average 40 hours saved in month one. What's that worth?"
- **"I can do it myself"** → "You could. But should you? Let's talk about your time ROI."
- **"Need to think about it"** → "Totally get it. I'll send over a case study that might help — what's your email?"

---

## DEPLOY PRIORITY

1. **Today**: Hero + Services Grid (proof of concept)
2. **Tomorrow**: Full page with all sections
3. **Day 3**: Stripe integration live
4. **Day 4**: Polish + testimonials
5. **Day 5**: SEO + analytics + go live

---

*Generated 2026-03-05 | NorthStar Synergy Site Demo Sprint*
