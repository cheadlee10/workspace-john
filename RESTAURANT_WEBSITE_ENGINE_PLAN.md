# RESTAURANT & FOOD TRUCK WEBSITE ENGINE — MASTER PLAN
## NorthStar Synergy — New Vertical
### Compiled March 5, 2026

---

## EXECUTIVE SUMMARY

Expand John's proven "build first, pitch second" model from landscaping to restaurants, food trucks, and pop-up food stands. The restaurant vertical is significantly larger (750K+ establishments, $1.55T industry) with a more painful problem (77% of diners check a restaurant's website before visiting, 68% have been turned away by bad/missing sites). The key differentiator: **stunning interactive menus + optional online ordering that saves restaurants 25-30% vs DoorDash/UberEats**.

**Why this is better than landscaping:**
- Larger market (750K restaurants vs ~500K landscapers)
- Stronger pain point (everyone hates PDF menus and missing menus)
- Clear ROI story (online ordering = 18% more revenue, 23% higher order values)
- Recurring revenue potential is higher (menu updates, ordering, marketing)
- More visual = easier to demo = faster close
- Food trucks are completely underserved (92K+ businesses, no dominant platform)

---

## SECTION 1: THE OPPORTUNITY (BY THE NUMBERS)

### Market Size
- 750,000+ US restaurants, 7 in 10 are independent single-unit operations
- 142,500 - 232,500 restaurants have NO website (19-31%)
- ~50% of restaurants still don't have their menu online in a usable format
- 92,000+ food trucks, estimated 40-60% lack dedicated websites
- Pop-up restaurant market: $6.2B, growing 8.4% CAGR
- 58% of businesses without sites plan to get one in 2026

### Revenue Impact (The Sales Pitch)
- 77% of diners check a restaurant website before visiting
- 68% have been DISCOURAGED from visiting by a bad/missing website
- Online ordering increases revenue by 18% on average
- Digital order values are 23% higher than in-person
- Restaurants lose 25-30% per order to DoorDash/UberEats/Grubhub
- 67% of consumers PREFER ordering direct from the restaurant
- Restaurants with websites grow 2x faster than those without

### Competitor Pricing (Our Opening)
| Competitor | Price | Weakness |
|-----------|-------|----------|
| BentoBox | $199-479/mo | No mobile app, add-on fees, limited customization |
| Popmenu | $179-499/mo | Ordering extra ($50/mo + $1/order), $1,300+ onboarding |
| Owner.com | $499/mo + 5% surcharge | Expensive, bugs, POS issues, lock-in |
| ChowNow | $119-298/mo + setup fees | No API, delivery surcharges, weak design |
| Wix/Squarespace | $16-49/mo | Not restaurant-optimized, no POS, no ordering |

**THE GAP: $49-$149/month for a restaurant-specific solution with online ordering included.**

---

## SECTION 2: WHAT WE BUILD

### Tier 1: "Menu Showcase" — $99/month (or $250 one-time + $29/mo)
For restaurants that just need a beautiful web presence with their menu online.

**Includes:**
- Stunning, mobile-first website (Next.js + Tailwind + animations)
- Interactive HTML menu (searchable, filterable by category/dietary)
- High-quality food photography display (AVIF/WebP optimized)
- Google Reviews + Yelp reviews widget (auto-updating)
- Google Maps embed with directions
- Click-to-call, hours, location above the fold
- Basic SEO (local schema markup, Google Business Profile optimization)
- Contact/catering inquiry form
- Social media integration (Instagram feed embed)
- Mobile-optimized (70%+ of restaurant traffic is mobile)
- Hosted on Vercel (fast, reliable, global CDN)

### Tier 2: "Order Direct" — $149/month (or $500 one-time + $49/mo)
Everything in Tier 1 PLUS online ordering.

**Additional features:**
- Online ordering system (Square API integration or Stripe checkout)
- Menu with "Add to Cart" functionality
- Order management dashboard
- SMS/email order confirmations
- Pickup time selection
- Basic loyalty program (order 10, get 1 free)
- Weekly specials / limited-time offers section
- Email capture for marketing list
- Enhanced SEO (menu items indexed by Google, rich snippets)

### Tier 3: "Full Restaurant Platform" — $249/month
Everything in Tier 2 PLUS advanced features.

**Additional features:**
- POS integration via middleware (Omnivore/Deliverect for Toast, Clover, etc.)
- Reservation system (OpenTable widget or custom)
- Gift card / merchandise sales
- Email/SMS marketing (weekly specials, promotions)
- Advanced analytics dashboard
- Multi-location support
- Catering portal with custom menus
- QR code table ordering
- Customer accounts with order history

### Food Truck Add-On: +$29/month (any tier)
- Real-time location map (Google Maps API / Mapbox)
- Weekly schedule calendar with location pins
- iCal export for customer calendars
- Pre-ordering system with pickup time windows
- "Where are we today?" homepage widget
- Social media location auto-posting
- Event/festival schedule integration

---

## SECTION 3: TECH STACK & SKILLS JOHN NEEDS

### Core Framework
```
Framework:       Next.js 14+ (App Router, React Server Components)
Styling:         Tailwind CSS 3.4+
Components:      shadcn/ui (accessible, customizable, copy-paste)
Animation:       Framer Motion (UI transitions) + GSAP (scroll effects, parallax)
                 Lottie (micro-interactions, loading states)
CMS:             Sanity (headless, real-time preview, menu management)
                 Alternative: Contentful or Strapi
```

### Image & Media
```
Optimization:    Next.js Image component (automatic AVIF/WebP)
CDN:             Cloudinary or imgix (food photo transformations)
Formats:         AVIF primary, WebP fallback, JPEG legacy
Targets:         Hero: <200KB, Menu items: <50KB thumbnails
Photography:     Blur placeholders (blurDataURL), lazy loading
Gallery:         Framer Motion drag/swipe carousels
```

### Online Ordering & Payments
```
Primary:         Square API (free, full REST, SDKs in 7+ languages)
                 - Catalog API (menu sync)
                 - Orders API (create/manage orders)
                 - Payments API (process payments)
                 - Webhooks (order status updates)
Alternative:     Stripe (if no POS needed)
Middleware:       Omnivore (by Olo) — unified API for Toast, Clover, Aloha, etc.
                 Deliverect — 200+ POS integrations, menu sync
```

### Maps & Location (Food Trucks)
```
Maps:            Google Maps API or Mapbox GL JS
Location:        GPS integration for auto-updates
Schedule:        PostgreSQL (via Supabase) for location/schedule data
Real-time:       WebSockets or webhook-based location push
```

### Reviews & Social Proof
```
Widget:          EmbedSocial (free tier, auto-pull from Google/Yelp/Facebook)
                 Alternative: Trustmary (multi-source aggregation)
Google:          Google Places API (~$17/1K requests, $200/mo free credit)
Yelp:            Yelp Fusion API ($7.99-14.99/1K calls, max 3 excerpts)
Recommendation:  Use EmbedSocial widget — handles TOS, rate limits, looks polished
```

### Reservations
```
Primary:         OpenTable embed widget (free, broad compatibility)
Alternative:     Resy booking button widget
Custom:          resOS or custom Supabase-backed booking system
```

### Hosting & Infrastructure
```
Frontend:        Vercel (optimal for Next.js, global CDN, edge functions)
Database:        Supabase (PostgreSQL, auth, real-time, free tier)
Auth:            Clerk or NextAuth.js (customer accounts, loyalty)
Email:           SendGrid or Resend (order confirmations, marketing)
SMS:             Twilio (order notifications, marketing)
Domain:          Client purchases ($12/yr) or we include at wholesale
```

### SEO & Marketing Tools
```
Schema:          Restaurant schema markup (JSON-LD)
                 Menu schema (each item indexed separately)
                 LocalBusiness schema
                 FoodEstablishment schema
                 Review aggregate schema
Google:          Google Business Profile optimization
                 Google Search Console integration
                 Google Analytics 4
Local SEO:       "Near me" keyword targeting
                 City/neighborhood landing pages
                 Menu items as searchable content (not PDF!)
Rich Snippets:   Menu items, hours, reviews in search results
Social:          Open Graph meta tags for food photo sharing
                 Instagram feed integration
```

### Design System (Restaurant-Specific)
```
Color Psychology:
  - Red/Orange/Yellow:    Stimulate appetite (fast-casual, BBQ, food trucks)
  - Green:                Freshness (farm-to-table, vegan, health-focused)
  - Dark/Black:           Luxury (fine dining, cocktail bars)
  - Warm neutrals:        Comfort (bakeries, coffee shops, rustic)
  - RULE: Warm colors for food, cool colors suppress appetite — avoid blue

Layout Patterns:
  - Hero: Full-bleed food photography or video with clear CTA
  - Sticky nav: Menu, Order, Reserve always accessible
  - Break the grid: Asymmetric photo placement, editorial pacing
  - Mobile: Floating "Order Now" / "Reserve" buttons
  - Menu: Category tabs + grid/list toggle + dietary filters

Typography:
  - Headlines: Bold serif or display font (personality)
  - Body: Clean sans-serif (readability)
  - Menu items: Slightly larger, scannable
  - Prices: Without dollar signs (increases spending per Popmenu research)
```

---

## SECTION 4: INTERACTIVE MENU SYSTEM (THE KILLER FEATURE)

This is the #1 differentiator. Most restaurant websites either have NO menu or a terrible PDF. Our menus will be world-class.

### Menu Features
1. **Category navigation** — Tabs or sidebar: Appetizers, Mains, Desserts, Drinks, Specials
2. **Dietary filters** — Toggle: Vegetarian, Vegan, Gluten-Free, Nut-Free, Spicy, Halal, Kosher
3. **Search** — Type "chicken" and see all chicken dishes
4. **High-res photos** — Optional per item, lazy-loaded, AVIF optimized
5. **Hover/tap preview** — Quick view with photo, description, allergens
6. **"Popular" / "Chef's Pick" badges** — Social proof per item
7. **Add to cart** — Direct ordering from menu (Tier 2+)
8. **Price display** — Clean, no dollar signs (psychological pricing)
9. **Daily specials section** — Auto-rotating, highlighted
10. **Seasonal menu support** — Easy swap between summer/winter/holiday menus

### Menu Management (For Restaurant Owners)
- Sanity CMS dashboard — owners can update menu items, prices, photos, availability
- Takes 5 minutes to update
- Changes go live immediately (no developer needed)
- Drag-and-drop menu item reordering
- Mark items as "sold out" in real-time
- Duplicate menus for different dayparts (lunch vs dinner)

### Menu SEO
- Each menu item is indexable HTML text (not an image or PDF)
- Schema markup: MenuItem, NutritionInformation, offers
- Google can show individual dishes in search results
- "Best pad thai near me" -> our client's pad thai shows up with photo + price

---

## SECTION 5: ONLINE ORDERING & POS INTEGRATION

### Phase 1: Square API (Launch)
Square is the best starting point because:
- Free API access, no per-call charges
- Most popular POS among small restaurants and food trucks
- Full REST API with SDKs in 7+ languages
- Sandbox for testing
- Complete flow: Catalog API (menu) -> Orders API (create order) -> Payments API (charge)

**Implementation:**
1. Restaurant connects their Square account (OAuth 2.0)
2. We sync their menu via Catalog API
3. Customer browses menu on our site, adds items to cart
4. Order submitted via Orders API
5. Payment processed via Payments API (2.9% + 30c)
6. Order appears on restaurant's Square POS terminal
7. Customer gets SMS/email confirmation
8. Webhooks update order status in real-time

### Phase 2: Stripe Standalone (For restaurants without a POS)
For food trucks and small operations that just need to accept payments:
- Stripe Checkout for simple ordering
- No POS integration needed
- Orders come in via email/SMS notification to owner
- 2.9% + 30c per transaction

### Phase 3: Multi-POS via Middleware (Scale)
For restaurants on Toast, Clover, Aloha, etc.:
- Integrate Omnivore (by Olo) — unified API across all major POS systems
- Or Deliverect — 200+ POS integrations with menu sync
- Single integration on our side, works with ANY POS
- Per-location monthly fee (pass through to restaurant)

### Delivery Integration (Future)
- DoorDash Drive API (use DoorDash drivers for delivery without DoorDash marketplace)
- Uber Direct (same concept — their drivers, your brand)
- This lets restaurants offer delivery WITHOUT paying 25-30% marketplace commission

---

## SECTION 6: DISCOVERY & OUTREACH (ADAPTED FROM LANDSCAPING)

### Finding Targets (Google Scrape + Enhanced Filtering)

**Search Queries:**
```
Google Maps: "restaurants near [city]" / "food trucks [city]" / "[cuisine] restaurant [neighborhood]"
Yelp: restaurants in [city] sorted by newest / most reviewed without website
Google: "[restaurant name] menu" -> if only result is a PDF or Yelp listing = target
Facebook: local food groups, food truck events, pop-up announcements
Instagram: #[city]foodtruck, #[city]eats, #[city]popupdinner
Event sites: local food truck rallies, farmers markets, night markets
```

**Filtering Criteria (in priority order):**
1. **No website at all** — Google Maps listing with no website link (hottest leads)
2. **Facebook-only** — Website link goes to Facebook page (warm leads)
3. **PDF menu** — Has website but menu is a photo/PDF (warm leads, bigger market)
4. **Outdated/broken site** — Website exists but looks terrible, broken on mobile (warm leads)
5. **No online ordering** — Good website but no ordering capability (upsell opportunity)

**Why PDF menus are a goldmine:**
- 30% of visitors bounce immediately when they see a PDF menu
- PDFs are invisible to Google (no SEO value)
- PDFs are unusable on mobile (pinch-to-zoom hell)
- This is the MOST common problem — more restaurants have bad menus than no website
- Easy pitch: "Your menu is turning away customers. Let me fix it."

### Outreach Process (Build First, Pitch Second)
1. **Find target** — Google Maps scrape, filter for no website / PDF menu / Facebook-only
2. **Research** — Check their Google reviews, Yelp, Instagram, existing web presence
3. **Build their website** — Using our template system, customized with their actual menu, photos (from Google/Yelp/Instagram), branding, reviews
4. **Find contact** — Email from Google Business Profile, Yelp, Facebook, or website contact page
5. **Send pitch email** — With live preview link to THEIR site already built
6. **Handle responses** — Autonomous objection handling
7. **Close** — Payment link, site goes live

### Email Template: Restaurant Cold Outreach

**Subject:** I built [Restaurant Name] a website — take a look

**Body:**
```
Hi [Owner Name],

I was checking out [Restaurant Name] on Google and noticed you don't have
your menu online [OR: your menu is a PDF that's hard to read on phones].

So I went ahead and built you a site: [preview-link]

It has your full menu (searchable, works great on phones), your Google reviews,
hours, location — everything a customer needs to decide to come eat with you.

Here's why it matters: 77% of diners check a restaurant's website before
visiting. 68% have been turned away by a bad or missing site. You're
leaving customers on the table.

The site is $[price]. If you like it, it's yours — takes 30 minutes to go
live. If not, no worries at all.

Want to take a look?

[Your name]
NorthStar Synergy
```

**Follow-up (Day 3):**
```
Subject: Re: I built [Restaurant Name] a website

Hey [Owner Name],

Just circling back — the preview site I built for [Restaurant Name] is
still live at [link].

Quick question: are you getting customers who can't find your menu online?
Because that's what's happening — 77% of people Google your menu before
they come in.

Happy to walk you through it in 5 minutes. What works better, a quick
call or text?
```

**Follow-up (Day 7, for PDF menu targets):**
```
Subject: Your menu is turning away customers

Hi [Owner Name],

I noticed [Restaurant Name]'s menu is a PDF on your website. Here's the
problem: 30% of people leave immediately when they see a PDF menu on
their phone. It's impossible to read without zooming.

I rebuilt it as a real menu page: [preview-link]

It's searchable, works perfectly on phones, and Google can actually find
your dishes when people search "best [cuisine] near me."

Takes 30 minutes to swap in. Want to take a look?
```

### Food Truck Outreach (Slightly Different)

**Subject:** I built [Truck Name] a website with your schedule + menu

**Body:**
```
Hey [Owner Name],

I found [Truck Name] on Instagram and noticed you don't have a website —
just social media. That works for your regulars, but you're invisible to
everyone else.

So I built you one: [preview-link]

It shows your menu, your weekly schedule with a map of where you'll be,
your reviews, and customers can even pre-order. All from their phone.

Pre-ordering alone increases food truck revenue 35-50% — less wait time
for customers, less waste for you.

The site is $[price]. Want to check it out?
```

---

## SECTION 7: OBJECTION PLAYBOOK (RESTAURANT-SPECIFIC)

| Objection | Response |
|-----------|----------|
| "I'm too busy" | "That's exactly why we handle everything. 30 minutes of your time for setup. After that, we maintain it. You update your menu from your phone in 5 minutes." |
| "It's too expensive" | "How much are you paying DoorDash right now? 25-30% of every order. Our service pays for itself by shifting just 1-2 orders per day to your own site. That's $200-300/month you keep." |
| "Social media is enough" | "Social media is great for your regulars. But 77% of NEW customers check your website before coming in. And Instagram doesn't let people order food or see your full menu." |
| "I already have a website" | "I saw it — your menu is a PDF. 30% of people leave immediately when they see that on their phone. I rebuilt it as a real menu page that works on mobile and shows up in Google searches." |
| "My nephew/friend will do it" | "No problem. If they can get it done in 2 weeks, great. If not, your site is already built and ready to go live in 30 minutes." |
| "I don't need online ordering" | "Totally fine — Tier 1 is just the website and menu, no ordering. But for reference: restaurants with online ordering see 18% more revenue and digital orders are 23% higher than walk-in. Something to consider down the road." |
| "DoorDash/UberEats is fine" | "DoorDash takes 25-30% of every order. On a $30 order, that's $7.50-$9 going to DoorDash. Direct ordering through your own site? You keep all of it minus 2.9% payment processing. That's saving $7+ per order." |
| "How do I update the menu?" | "From your phone or computer. It's a simple dashboard — change a price, add a dish, mark something sold out. Takes 5 minutes. We also do it for you if you prefer." |
| "I need to think about it" | "Totally understand. The preview site stays live for 7 days. Every day without it, 77% of potential new customers can't find your menu online. What's holding you back?" |
| "Do you have references?" | "We build the site first so you can see exactly what you're getting. Zero risk — if you don't like it, you don't pay. How many agencies do that?" |

---

## SECTION 8: SEO & LOCAL MARKETING STRATEGY

### Local SEO (The Free Traffic Engine)

**Google Business Profile Optimization:**
- Ensure all info is complete and accurate (hours, phone, address, website URL)
- Add menu items directly to GBP (shows up in Google search)
- Post weekly updates (specials, events, new dishes)
- Respond to all reviews (positive and negative)
- Add high-quality photos weekly
- Use Google Posts for promotions

**Schema Markup (Structured Data):**
```json
{
  "@type": "Restaurant",
  "name": "...",
  "servesCuisine": "...",
  "menu": "https://...",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": [{
      "@type": "MenuSection",
      "name": "Appetizers",
      "hasMenuItem": [{
        "@type": "MenuItem",
        "name": "Pad Thai",
        "description": "...",
        "offers": { "@type": "Offer", "price": "14.99" }
      }]
    }]
  },
  "aggregateRating": { ... },
  "address": { ... },
  "openingHoursSpecification": [ ... ]
}
```

This makes menu items appear directly in Google search results with prices and photos.

**Target Keywords:**
- "[cuisine] restaurant [city/neighborhood]"
- "best [dish] near me"
- "[restaurant name] menu"
- "food delivery [neighborhood]"
- "food trucks near me today"
- "[cuisine] takeout [city]"

**Content Strategy:**
- Each menu item is a piece of indexable content
- Blog-style "specials" page for seasonal keywords
- Location pages for multi-location or food trucks (each stop = a page)
- Menu item pages with detailed descriptions (long-tail SEO gold)

### Social Media Integration
- Instagram feed auto-embedded on website (food photos)
- Open Graph meta tags so menu items look great when shared
- "Share this dish" buttons on menu items
- Auto-post website specials to social media

### Email/SMS Marketing (Tier 3)
- Capture email/phone at checkout
- Weekly specials newsletter
- "We're nearby!" SMS for food trucks (location-triggered)
- Birthday/anniversary promotions
- Re-engagement campaigns for inactive customers
- Order-ahead reminders

---

## SECTION 9: WEBSITE TEMPLATE SYSTEM

### Template Architecture
Build a template system that generates a stunning site in under 60 minutes per restaurant.

**Template Variants:**
1. **Casual Dining** — Warm colors, photo-forward, family-friendly feel
2. **Fine Dining** — Dark/elegant, minimal, typography-focused
3. **Fast Casual** — Bright, energetic, ordering-forward
4. **Food Truck** — Bold, street-art inspired, location-prominent, mobile-first
5. **Pop-Up / Event** — Countdown timers, limited-time urgency, ticket/RSVP
6. **Cafe/Bakery** — Warm neutrals, cozy, pastry photography
7. **Bar/Brewery** — Dark with accent colors, tap list, events calendar
8. **Pizza/BBQ** — Red/orange energy, large food photos, comfort feel

**Customization Per Restaurant:**
- Logo / brand colors (auto-detected from existing materials)
- Menu items (pulled from Google, Yelp, or manually entered)
- Photos (from Google Business Profile, Yelp, Instagram, or stock)
- Reviews (auto-pulled via EmbedSocial)
- Hours, location, contact (from Google Maps data)
- Cuisine-appropriate color scheme applied automatically

### Build Speed Target
- Template selection: 5 minutes
- Content population (menu, photos, info): 30 minutes
- Customization (colors, layout tweaks): 15 minutes
- Review & deploy: 10 minutes
- **Total: ~60 minutes per restaurant** (down from landscaping's 90-120 min)

---

## SECTION 10: PRICING STRATEGY

### Recommended Pricing

| Tier | One-Time | Monthly | Target Customer |
|------|----------|---------|----------------|
| Menu Showcase | $250 | $99/mo | Restaurants with no site or PDF menus |
| Order Direct | $500 | $149/mo | Restaurants wanting to escape DoorDash fees |
| Full Platform | $750 | $249/mo | Established restaurants wanting everything |
| Food Truck Add-On | -- | +$29/mo | Any food truck on any tier |

**Why this pricing works:**
- Undercuts all restaurant-specific competitors ($179-499/mo)
- Includes features they charge extra for (ordering in Tier 2)
- Low one-time setup fee removes barrier to entry
- Monthly recurring creates predictable revenue
- Food truck add-on is cheap enough to be a no-brainer

**ROI Pitch by Tier:**
- Tier 1 ($99/mo): "77% of diners check your website. Even 2 extra customers/month from Google pays for it."
- Tier 2 ($149/mo): "Shift 2 orders/day from DoorDash to direct = save $400+/month. Net savings: $250+/month PLUS you keep the customer data."
- Tier 3 ($249/mo): "Full marketing + ordering + loyalty. Restaurants on this tier see 18% revenue increase = $90K+/year on $500K revenue."

### Revenue Projections

**Conservative (Month 1-3):**
- 5 restaurants/month at average $149/mo = $745/mo MRR
- Plus one-time setup fees: $2,500/mo
- Month 3 MRR: $2,235/mo

**Growth (Month 4-6):**
- 10 restaurants/month at average $149/mo
- Month 6 MRR: $6,705/mo
- Plus one-time fees: $5,000/mo

**Scale (Month 7-12):**
- 15-20 restaurants/month
- Month 12 MRR: $20,000+/mo
- Annual run rate: $240,000+

---

## SECTION 11: IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
- [ ] Build Next.js restaurant template system (3-4 base templates)
- [ ] Implement interactive menu component (categories, filters, search, photos)
- [ ] Set up Sanity CMS for menu management
- [ ] Implement review widget integration (EmbedSocial)
- [ ] Build Google Maps embed component
- [ ] Create restaurant-specific schema markup generator
- [ ] Set up image pipeline (Cloudinary/Next.js Image optimization)
- [ ] Design system: color palettes, typography, component library

### Phase 2: Ordering System (Week 3-4)
- [ ] Square API integration (OAuth, Catalog sync, Orders, Payments)
- [ ] Cart/checkout flow (mobile-optimized, 3 steps max)
- [ ] Order confirmation (SMS via Twilio + email via SendGrid)
- [ ] Order management dashboard (simple owner view)
- [ ] Stripe standalone checkout (for non-Square restaurants)
- [ ] Test with sandbox accounts

### Phase 3: Food Truck Features (Week 3-4, parallel)
- [ ] Location map component (Google Maps API / Mapbox)
- [ ] Weekly schedule calendar with map pins
- [ ] Pre-ordering system with pickup time selection
- [ ] Social media feed embed (Instagram)
- [ ] Mobile-first layout optimization (90%+ mobile traffic)

### Phase 4: Discovery & Outreach (Week 2, start in parallel)
- [ ] Build Google Maps scraper for restaurants without websites
- [ ] Build PDF menu detector (check if menu link is a .pdf)
- [ ] Build email finder pipeline (Google Business Profile, Yelp, Facebook)
- [ ] Create outreach email templates (restaurant, food truck, PDF-upgrade)
- [ ] Set up email sending system (SendGrid / Gmail SMTP)
- [ ] Start building prospect list: 50 restaurants, 20 food trucks

### Phase 5: Launch & Iterate (Week 5+)
- [ ] Build 5 demo restaurant sites (different cuisines/types)
- [ ] Send first 50 outreach emails
- [ ] Handle responses with objection playbook
- [ ] Close first 3 deals
- [ ] Collect feedback, iterate on templates
- [ ] Build portfolio / case studies from first clients
- [ ] Add Tier 3 features based on demand

### Phase 6: Scale (Month 2-3)
- [ ] Multi-POS middleware integration (Omnivore/Deliverect)
- [ ] Email/SMS marketing automation
- [ ] Loyalty program system
- [ ] QR code table ordering
- [ ] Delivery integration (DoorDash Drive / Uber Direct)
- [ ] Referral program (restaurants refer restaurants)

---

## SECTION 12: SKILLS JOHN NEEDS (NEW)

John's existing skills from the landscaping vertical transfer directly. These are the NEW skills needed:

### Must Learn Immediately
1. **Square API** — Catalog, Orders, Payments, Webhooks, OAuth flow
2. **Interactive menu UX** — Category filtering, dietary icons, hover previews, search
3. **Sanity CMS** — Content modeling for menus, real-time preview, owner dashboard
4. **Restaurant schema markup** — JSON-LD for Restaurant, Menu, MenuItem, FoodEstablishment
5. **Food photography optimization** — AVIF/WebP, Cloudinary transforms, blur placeholders
6. **Color psychology for food** — Warm vs cool, cuisine-appropriate palettes

### Learn in Phase 2-3
7. **Mapbox/Google Maps API** — Interactive maps, real-time location, route calculation
8. **Framer Motion + GSAP** — Menu animations, scroll effects, page transitions
9. **EmbedSocial API** — Review widget configuration, multi-source aggregation
10. **Twilio for order notifications** — SMS confirmations, delivery updates
11. **Restaurant industry knowledge** — Margins, pain points, seasonal patterns, cuisine trends

### Learn for Scale
12. **Omnivore/Deliverect middleware** — Multi-POS unified integration
13. **DoorDash Drive API** — White-label delivery
14. **Email marketing automation** — Drip campaigns, segmentation, A/B testing
15. **Loyalty program design** — Points systems, rewards, retention mechanics

---

## SECTION 13: THINGS CRAIG MENTIONED HE MIGHT BE FORGETTING (GAPS FILLED)

### Additional Revenue Streams
1. **Menu photography service** — Offer to photograph dishes for $200-500 (45% of diners look for food photos, most small restaurants have terrible ones)
2. **Google Business Profile management** — $49/mo add-on to keep their GBP updated, respond to reviews, post weekly
3. **QR code menus for dine-in** — Physical QR codes that link to the interactive menu (saves printing costs, always up-to-date)
4. **Catering pages** — Dedicated catering menu/inquiry system, common upsell for restaurants
5. **Gift cards** — Digital gift card system, easy add-on, pure profit for restaurants
6. **Event booking** — Private dining, food truck booking for events, corporate catering
7. **Merchandise** — T-shirts, hats, sauce bottles — e-commerce for restaurant brands

### Operational Considerations
8. **Menu updates** — Restaurants change menus frequently (seasonal, daily specials, 86'd items). The CMS must make this trivially easy or they'll churn.
9. **Multi-language menus** — In diverse areas, offering Spanish/Chinese/etc. menu translations is a differentiator
10. **ADA/WCAG compliance** — Restaurant websites are increasingly targeted by ADA lawsuits. Our HTML menus (vs PDFs) are inherently more accessible. This is a selling point.
11. **Print menu generation** — Bonus feature: export the online menu as a printable PDF (ironic, but useful for dine-in physical menus)
12. **Third-party listing sync** — Update menu on the website, and it auto-syncs to Google Business Profile, Yelp, etc.
13. **Analytics that matter** — Don't give them Google Analytics. Give them: "42 people viewed your menu this week, 12 placed orders, your most popular item is the Pad Thai." Simple.

### Competitive Moats
14. **Speed of delivery** — We build the site BEFORE the pitch. No competitor does this at our price point.
15. **No lock-in** — If they leave, they keep their domain. Competitors hold domains hostage.
16. **Local knowledge** — Start in one metro area, become THE restaurant website provider for that market.
17. **Referral network** — Restaurants talk to each other. First 5 clients in a neighborhood = the rest follow.

### Risk Mitigation
18. **Churn prevention** — Monthly check-ins, menu updates, analytics reports. Restaurants that see value don't cancel.
19. **Photo quality** — If the restaurant has terrible photos, the site will look bad. Solution: offer photography service or use high-quality stock as placeholders until they get real photos.
20. **Owner tech literacy** — Many restaurant owners are not tech-savvy. The CMS must be DEAD SIMPLE. Think "can they update a price from their phone in 30 seconds?"
21. **Seasonal businesses** — Some restaurants are seasonal. Offer pause/resume on subscriptions rather than cancellation.

---

## APPENDIX: KEY STATISTICS FOR SALES CONVERSATIONS

Keep these loaded for any prospect conversation:

- 77% of diners check a restaurant's website before visiting
- 68% have been turned away by a bad/missing website
- 30% bounce immediately when they see a PDF menu
- Online ordering increases revenue by 18%
- Digital orders are 23% higher than in-person
- DoorDash takes 25-30% per order (up to 40% with all fees)
- 67% of consumers prefer ordering direct from the restaurant
- Restaurants with websites grow 2x faster
- 45% of visitors look specifically for food photos
- 70%+ of restaurant website traffic is mobile
- Food trucks with pre-ordering see 35-50% higher revenue
- 58% of businesses without websites plan to get one this year

---

## NEXT STEP

Craig approves this plan -> John begins Phase 1 (template system + menu component) and Phase 4 (discovery/prospect list) in parallel.

Target: First 5 restaurant demo sites built within 2 weeks. First outreach batch of 50 emails within 3 weeks. First closed deal within 4 weeks.
