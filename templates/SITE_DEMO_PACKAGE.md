# NorthStar Synergy Services Page — Demo Package Plan
*Production-ready copy, blocks, and implementation checklist*

---

## 1. HERO SECTION

### Headline Options (pick one)
```
A: "We Build. We Automate. You Profit."
B: "Stop Hiring Consultants. Start Getting Results."
C: "Enterprise Quality. Startup Speed. Real ROI."
```

### Subheadline
```
Excel automation, custom scripts, websites, bots, and data pipelines — 
built by operators who run real businesses. No fluff. Just results.
```

### CTA Button
```
Primary: "See What We Can Build For You" → scrolls to services
Secondary: "Book a Free 15-Min Call" → Calendly embed
```

### Hero Code Snippet (Tailwind/Next.js)
```tsx
<section className="bg-[#0F2340] text-white py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      We Build. We Automate. <span className="text-[#D4A574]">You Profit.</span>
    </h1>
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Excel automation, custom scripts, websites, bots, and data pipelines — 
      built by operators who run real businesses.
    </p>
    <div className="flex gap-4 justify-center flex-wrap">
      <a href="#services" className="bg-[#D4A574] text-[#0F2340] px-8 py-4 rounded-lg font-semibold hover:bg-[#c4955f] transition">
        See Our Services
      </a>
      <a href="#contact" className="border border-[#D4A574] text-[#D4A574] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4A574] hover:text-[#0F2340] transition">
        Book a Free Call
      </a>
    </div>
  </div>
</section>
```

---

## 2. OFFER BLOCKS (6 Services, 3 Tiers Each)

### Service Card Template
```tsx
interface ServiceTier {
  name: string;
  price: string;
  features: string[];
  cta: string;
}

const ServiceCard = ({ title, description, tiers }: { 
  title: string; 
  description: string; 
  tiers: ServiceTier[] 
}) => (
  <div className="bg-[#1a2d4a] rounded-xl p-6 border border-[#D4A574]/20">
    <h3 className="text-2xl font-bold text-[#D4A574] mb-2">{title}</h3>
    <p className="text-gray-300 mb-6">{description}</p>
    <div className="grid md:grid-cols-3 gap-4">
      {tiers.map((tier, i) => (
        <div key={i} className={`p-4 rounded-lg ${i === 1 ? 'bg-[#D4A574]/10 border-2 border-[#D4A574]' : 'bg-[#0F2340]'}`}>
          <div className="text-sm text-gray-400">{tier.name}</div>
          <div className="text-3xl font-bold text-white my-2">{tier.price}</div>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            {tier.features.map((f, j) => <li key={j}>✓ {f}</li>)}
          </ul>
          <button className="w-full py-2 bg-[#D4A574] text-[#0F2340] rounded font-semibold">
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  </div>
);
```

### Service Data (Copy-Paste Ready)
```ts
const services = [
  {
    title: "Excel Automation",
    description: "Kill the busywork. Automate reports, fix broken formulas, build dashboards that update themselves.",
    tiers: [
      { name: "Starter", price: "$150", features: ["Formula audit", "1 automation", "48hr delivery"], cta: "Get Started" },
      { name: "Pro", price: "$300", features: ["Full workbook audit", "3 automations", "VBA macros", "24hr delivery"], cta: "Most Popular" },
      { name: "Enterprise", price: "$500", features: ["Unlimited scope", "Power Query", "Dashboard build", "Priority support"], cta: "Let's Talk" }
    ]
  },
  {
    title: "Python Scripts",
    description: "Web scrapers, data pipelines, API integrations, task automation — if Python can do it, we build it.",
    tiers: [
      { name: "Starter", price: "$99", features: ["Single-purpose script", "Documentation", "72hr delivery"], cta: "Get Started" },
      { name: "Pro", price: "$299", features: ["Multi-step automation", "Error handling", "Scheduling setup"], cta: "Most Popular" },
      { name: "Enterprise", price: "$999", features: ["Full pipeline", "API integrations", "Monitoring + alerts"], cta: "Let's Talk" }
    ]
  },
  {
    title: "Web Development",
    description: "Landing pages to full-stack apps. Modern, fast, mobile-first. Built to convert visitors into customers.",
    tiers: [
      { name: "Starter", price: "$1,000", features: ["5-page site", "Mobile responsive", "Basic SEO"], cta: "Get Started" },
      { name: "Pro", price: "$3,000", features: ["Custom design", "CMS integration", "Analytics + forms"], cta: "Most Popular" },
      { name: "Enterprise", price: "$5,000", features: ["Full-stack app", "User auth", "Database + API"], cta: "Let's Talk" }
    ]
  },
  {
    title: "Custom Bots",
    description: "Discord, Telegram, Slack, or custom platforms. Bots that work 24/7 so you don't have to.",
    tiers: [
      { name: "Starter", price: "$500", features: ["Single platform", "5 commands", "Basic hosting"], cta: "Get Started" },
      { name: "Pro", price: "$2,000", features: ["Multi-platform", "Database", "Admin dashboard"], cta: "Most Popular" },
      { name: "Enterprise", price: "$5,000", features: ["AI-powered", "Custom integrations", "SLA support"], cta: "Let's Talk" }
    ]
  },
  {
    title: "Data Engineering",
    description: "Messy data? We clean it. Need a database? We build it. Want insights? We deliver dashboards.",
    tiers: [
      { name: "Starter", price: "$200", features: ["Data cleaning", "Format conversion", "Quality report"], cta: "Get Started" },
      { name: "Pro", price: "$500", features: ["Database design", "ETL pipeline", "Basic visualization"], cta: "Most Popular" },
      { name: "Enterprise", price: "$2,000", features: ["Full data stack", "BI dashboard", "Ongoing support"], cta: "Let's Talk" }
    ]
  },
  {
    title: "API Integration",
    description: "Connect your tools. Sync your data. Automate the handoffs that slow your business down.",
    tiers: [
      { name: "Starter", price: "$500", features: ["2 systems connected", "One-way sync", "Documentation"], cta: "Get Started" },
      { name: "Pro", price: "$1,500", features: ["Multi-system", "Two-way sync", "Error handling"], cta: "Most Popular" },
      { name: "Enterprise", price: "$3,000", features: ["Full ecosystem", "Real-time sync", "Monitoring"], cta: "Let's Talk" }
    ]
  }
];
```

---

## 3. PROOF ELEMENTS

### Trust Badges Row
```tsx
<div className="flex justify-center gap-8 py-8 border-y border-[#D4A574]/20">
  <div className="text-center">
    <div className="text-3xl font-bold text-[#D4A574]">50+</div>
    <div className="text-sm text-gray-400">Projects Delivered</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-[#D4A574]">100%</div>
    <div className="text-sm text-gray-400">Satisfaction Rate</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-[#D4A574]">48hr</div>
    <div className="text-sm text-gray-400">Avg Turnaround</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-[#D4A574]">24/7</div>
    <div className="text-sm text-gray-400">Bot Uptime</div>
  </div>
</div>
```

### Testimonial Card (placeholder — swap with real ones)
```tsx
<div className="bg-[#1a2d4a] p-6 rounded-xl">
  <p className="text-gray-300 italic mb-4">
    "They found 3 formula errors in my budget spreadsheet that would've cost me $12K. 
    Paid for themselves 40x over."
  </p>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-[#D4A574] rounded-full flex items-center justify-center text-[#0F2340] font-bold">JD</div>
    <div>
      <div className="text-white font-semibold">Jane Doe</div>
      <div className="text-sm text-gray-400">CFO, Acme Corp</div>
    </div>
  </div>
</div>
```

### "Why Us" Section Copy
```
## Why Operators Choose NorthStar

**Built by people who run businesses, not agencies.**

We've automated our own companies. We've built our own dashboards. 
We've debugged our own spreadsheets at 2am. We know what breaks — 
and we build things that don't.

- **Results over hours** — We charge for outcomes, not timesheets
- **Enterprise quality, startup speed** — Fortune 500 standards, 48hr delivery
- **Technical depth** — Full-stack devs, not template jockeys
- **Transparent pricing** — 3 tiers, no surprises, no scope creep
```

---

## 4. FAST IMPLEMENTATION CHECKLIST

### Phase 1: Launch MVP (Day 1-2)
- [ ] Deploy hero section with primary CTA
- [ ] Add 3 highest-margin services (Excel, Python, Web Dev)
- [ ] Set up Stripe checkout for each tier
- [ ] Add trust badges with placeholder numbers
- [ ] Mobile-test all breakpoints
- [ ] Connect analytics (Vercel Analytics or GA4)

### Phase 2: Social Proof (Day 3-5)
- [ ] Add testimonial section (use placeholder if no real ones yet)
- [ ] Add "Why Us" section
- [ ] Create case study template page
- [ ] Add Calendly embed for free call CTA
- [ ] Set up email capture (newsletter or lead magnet)

### Phase 3: Full Services (Day 6-7)
- [ ] Add remaining 3 services (Bots, Data, API)
- [ ] Create individual service detail pages
- [ ] Add FAQ section
- [ ] Add footer with contact info + social links
- [ ] Set up Stripe webhooks for order notifications
- [ ] Test full purchase flow end-to-end

### Phase 4: Optimize (Week 2+)
- [ ] A/B test headlines
- [ ] Add real testimonials as they come in
- [ ] Build blog/content section
- [ ] Add chatbot for lead capture
- [ ] Set up retargeting pixels (Meta, Google)

---

## 5. REUSABLE SNIPPETS

### Color Variables (CSS)
```css
:root {
  --navy: #0F2340;
  --gold: #D4A574;
  --navy-light: #1a2d4a;
  --gold-muted: #c4955f;
}
```

### Tailwind Config Extension
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: '#0F2340',
        gold: '#D4A574',
        'navy-light': '#1a2d4a',
      }
    }
  }
}
```

### CTA Button Component
```tsx
const CTAButton = ({ 
  href, 
  variant = 'primary', 
  children 
}: { 
  href: string; 
  variant?: 'primary' | 'secondary'; 
  children: React.ReactNode 
}) => (
  <a 
    href={href} 
    className={`px-8 py-4 rounded-lg font-semibold transition ${
      variant === 'primary' 
        ? 'bg-[#D4A574] text-[#0F2340] hover:bg-[#c4955f]' 
        : 'border border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-[#0F2340]'
    }`}
  >
    {children}
  </a>
);
```

### Pricing Tier Highlight (middle tier)
```tsx
// Add to middle tier card
className={`relative ${isPro ? 'ring-2 ring-[#D4A574] scale-105' : ''}`}

// Badge for popular tier
{isPro && (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A574] text-[#0F2340] px-4 py-1 rounded-full text-sm font-bold">
    MOST POPULAR
  </div>
)}
```

### Stripe Checkout Link Generator (API route)
```ts
// app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { service, tier, price } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: `${service} - ${tier}` },
        unit_amount: price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/services`,
  });
  
  return NextResponse.json({ url: session.url });
}
```

---

## QUICK DEPLOY COMMANDS

```bash
# Clone and setup
git clone [repo] && cd northstar-site
npm install

# Environment
cp .env.example .env.local
# Add: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_URL

# Dev
npm run dev

# Deploy
vercel --prod
```

---

*Generated: 2026-03-05 | Ready for immediate implementation*
