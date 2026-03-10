# Restaurant & Food Truck Website Research: Comprehensive Findings
## Online Ordering, POS Integration, Design, and Technology (2025-2026)

---

## 1. ONLINE ORDERING POS INTEGRATION

### Major Restaurant POS Systems

| POS System | Monthly Cost | Transaction Fees | Hardware | API Available | Online Ordering |
|------------|-------------|-----------------|----------|---------------|-----------------|
| **Square** | Free - $149/mo | 2.6% + 15c (in-person), 2.9-3.3% + 30c (online) | iPad-based, card readers, kiosks | YES - Full REST API, free access | Yes (native + API) |
| **Toast** | $69-$189+/mo | 2.49-2.99% + 15-30c | Proprietary Android (~$799+ min) | YES - Full REST API | Yes (add-on) |
| **Clover** | $59-$129/mo | 2.3-2.6% + 10c | Proprietary (~$1,400 upfront) | YES - REST API | Via marketplace apps |
| **Lightspeed** | ~$69+/mo | 2.6% + 10c | iPad-optimized, flexible | YES - REST API | Via integrations |
| **Otter** | $99-$149/mo | 2.39% + 15c (present), 2.99% + 30c (not present) | Leased (~$50-85/mo) | 400+ integrations | Yes (native) |
| **Revel** | Custom pricing | Varies | iPad-based | YES - REST API | Yes |
| **EPOS Now** | $39-$69/mo | 2.5-2.9% + 10c | $349+ bundles | Yes | Via integrations |

### API Details by POS System

#### Square API (BEST for Custom Integration)
- **Developer Portal**: developer.squareup.com
- **Key APIs**: Orders API, Catalog API, Payments API, Inventory API, Locations API
- **Auth**: OAuth 2.0
- **Rate Limits**: 1,000 calls/second for most endpoints
- **Cost**: FREE API access, no fees for API calls
- **Online Ordering Flow**: Use Catalog API to pull menu items -> Orders API to create/manage orders -> Payments API to process payment
- **Webhooks**: Available for order status updates, payment events
- **SDKs**: JavaScript, Python, Ruby, PHP, Java, .NET, Go
- **Best For**: Independent restaurants, food trucks, custom website builds
- **Square Online Tiers**: Free ($0/mo, 3.3%+30c), Plus ($49/mo, 2.9%+30c), Premium ($149/mo, 2.9%+30c)

#### Toast API
- **Developer Portal**: doc.toasttab.com
- **Key APIs**: Orders API, Menus API, Restaurant API, Configuration API, Labor API
- **Auth**: OAuth 2.0 with partner approval
- **Integration Process**: Must apply as Toast Integration Partner, sandbox testing required
- **Online Ordering Integration**: Retrieve menu via Menus API -> submit orders via Orders API -> must call /prices endpoint before charging
- **Limitation**: Requires Toast POS hardware; cannot use Toast API without Toast POS subscription
- **Best For**: Full-service restaurants already using Toast

#### Clover API
- **Developer Portal**: docs.clover.com
- **Key APIs**: Orders API, Inventory API, Payments API, Merchants API
- **Auth**: OAuth 2.0
- **Menu/Inventory**: GET /v3/merchants/{mId}/items for inventory/menu items
- **Online Ordering**: Build custom SPA (React/Vue) pulling inventory via REST API, submit orders via Orders API
- **Hosted Checkout**: Available for payment processing without handling card data
- **Limitation**: Tighter ecosystem than Square; marketplace app model

### Middleware / Aggregator APIs (Connect to Multiple POS Systems)

These are CRITICAL for building a platform that works across POS systems:

| Middleware | POS Systems Supported | Pricing Model | Key Feature |
|-----------|----------------------|---------------|-------------|
| **Omnivore (by Olo)** | Toast, Aloha, Micros, CAKE, Revel, others | Per-location/month | Unified REST API across all POS systems |
| **Deliverect** | Toast, Square, Clover, Lightspeed, Revel, TouchBistro, 200+ | Monthly per location | Menu sync + order routing + analytics |
| **Chowly** | 150+ POS systems + delivery apps | Monthly per location | Menu syncing, no manual entry |
| **Cuboh** | Multiple POS + delivery platforms | Monthly subscription | Single tablet consolidation |
| **KitchenHub** | Multiple POS via Olo/Omnivore | Per-location fee | Advanced POS integration for resellers |
| **Checkmate** | Toast, Square, Aloha, Micros, others | Custom pricing | Enterprise-grade integration |

**Recommendation**: For a platform that needs to connect to ANY restaurant's POS, **Omnivore (Olo)** provides the most comprehensive unified API. For simpler needs, **Deliverect** offers the broadest integration coverage with easier setup.

---

## 2. RESTAURANT WEBSITE BEST PRACTICES (2025-2026)

### Critical Statistics
- 77% of diners visit a restaurant's website before deciding to dine
- 70% of restaurant website visitors use mobile devices
- 45% of diners specifically look for food photography on the site
- 30% of guests immediately leave if they see a PDF menu
- Guests stay 2x longer on dynamic menu pages vs. static/PDF menus
- 98% of consumers read online reviews for local businesses
- On-site reviews increase conversions by 74%

### Must-Have Features (Priority Order)
1. **Mobile-responsive design** (non-negotiable, 70%+ mobile traffic)
2. **Interactive text-based menu** (never PDFs -- kills SEO and engagement)
3. **Online ordering / reservation buttons** (fixed in navigation, always visible)
4. **High-quality food photography** (45% of visitors look for this specifically)
5. **Location, hours, contact info** (immediately visible, above fold)
6. **Google Maps embed** with directions
7. **Social proof** (Google Reviews, Yelp ratings displayed)
8. **Social media links** (Instagram especially)
9. **Story/About section** (chef story, sourcing, brand narrative)
10. **Catering/event inquiry forms**
11. **Loyalty program** (feature prominently, not buried)
12. **Gift card / merchandise sales** (additional revenue stream)
13. **Digital accessibility** (WCAG/ADA compliance to avoid lawsuits)

### Design Patterns That Work

#### Layout Structure
- **Hero section**: Full-bleed food photography or video background with clear CTA
- **Sticky navigation**: Menu, Order, Reservations always accessible
- **Break the grid**: Avoid the standard hero-then-text-blocks pattern; use asymmetric photo placement, mixed backgrounds, editorial pacing
- **Quick-action mobile buttons**: Floating "Order Now" / "Reserve" buttons on mobile

#### Color Psychology for Restaurants
| Color | Effect | Best For |
|-------|--------|----------|
| **Red** | Stimulates appetite, creates urgency, encourages eating more | Fast-casual, burgers, BBQ, high-energy dining |
| **Orange** | Warm, inviting, appetite-stimulating | Casual dining, food trucks, family restaurants |
| **Yellow** | Cheerful, attention-grabbing, pairs with red for appetite | Quick-service, breakfast spots |
| **Green** | Freshness, health, organic association | Farm-to-table, vegan/vegetarian, health-focused |
| **Dark/Black** | Luxury, sophistication, high-end feel | Fine dining, upscale cocktail bars |
| **Warm neutrals (cream, brown)** | Comfort, earthiness, artisanal feel | Bakeries, coffee shops, rustic concepts |

**Key Rule**: Warm colors (red, orange, yellow) stimulate appetite and increase turnover. Cool colors (blue, purple) suppress appetite -- avoid as primary colors for food-focused sites.

#### 7 Design Principles (BentoBox Framework)
1. **Contrast** - Use color and shape to guide users through content
2. **Repetition** - Repeat design elements to reinforce brand identity
3. **Unity** - All elements work harmoniously together
4. **Balance** - Alternate between full-width and contained sections
5. **Hierarchy** - Larger fonts, bold colors guide attention to key info
6. **Scale** - Vary element sizes dramatically for visual interest
7. **Emphasis** - Highlight CTAs with oversized headings and contrasting backgrounds

### Conversion Optimization
- Essential info (menu, hours, location, contact) findable within SECONDS
- Keep website copy short, punchy, and easy to digest
- Position reservation/ordering in fixed nav bar
- Use descriptive, appetizing menu language
- Show dietary labels (vegan, GF, spicy) for menu filtering
- Feature loyalty program front and center, not buried at bottom

---

## 3. MENU DESIGN FOR WEB

### Critical Rules
- **NEVER use PDF menus** (30% immediate bounce rate, kills SEO, not accessible)
- **Always use text-based HTML menus** (searchable, editable, SEO-friendly, accessible)
- **Menu reachable in 1-2 clicks** from any page
- **Clear navigation labels**: "Menu" or "Order Now" (not clever/cute names)

### Photo-Forward vs. Text-Based

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| **Photo-forward** | Higher engagement, appetite appeal, social sharing | Slower load, expensive photography, harder to update | Casual dining, food trucks, Instagram-heavy brands |
| **Text-based with selective photos** | Fast loading, easy updates, better SEO | Less visual appeal | Fine dining, large menus, frequently changing menus |
| **Hybrid (recommended)** | Best of both, category photos + text items | Moderate effort | Most restaurants |

### Interactive Menu Features That Drive Sales
- **Category filtering** (Appetizers, Mains, Desserts, Drinks + dietary filters)
- **Hover/tap previews** with dish photos
- **Favorite/like buttons** on menu items (Popmenu-style)
- **Individual dish reviews/comments** (social proof per item)
- **Social sharing** per dish (share to Instagram/Facebook)
- **Price display without dollar signs** (Popmenu research: guests spend more)
- **Allergen/dietary icons** (GF, V, VG, Spicy, Nut-free)
- **"Popular" or "Chef's Pick" badges**
- **Add-to-cart directly from menu** for ordering-enabled sites

### Popmenu: Purpose-Built Interactive Menu Platform
- Dynamic online menu builder with social-media-style interaction
- Real-time diner reviews per dish
- Automatic SEO feeding to Google from menu content
- Mobile-optimized interactive menus
- Pricing: Custom (contact for quote)
- Integrates with major POS systems
- Website: get.popmenu.com

### Best Menu Display Frameworks/Approaches
1. **Custom React/Next.js components** with Framer Motion animations (most control)
2. **Popmenu embed** for turnkey interactive menus
3. **Headless CMS** (Sanity, Contentful, Strapi) + custom frontend for easy menu management
4. **shadcn/ui components** + Tailwind CSS for beautiful, accessible menu cards

---

## 4. FOOD TRUCK / POP-UP SPECIFIC NEEDS

### How Food Trucks Differ from Brick-and-Mortar

| Feature | Brick-and-Mortar | Food Truck / Pop-up |
|---------|-----------------|-------------------|
| Location | Fixed, static | Dynamic, changes daily/weekly |
| Hours | Generally consistent | Varies by location/event |
| Menu | Stable, large | Smaller, may rotate |
| Discovery | Google Maps, Yelp | Social media, tracker apps, website |
| Pre-ordering | Nice to have | Critical (reduces wait times 35-50%) |
| Mobile traffic | 70%+ | 90%+ (almost entirely mobile) |

### Must-Have Features for Food Truck Websites

1. **Real-Time Location Tracking**
   - Interactive map showing current location (Google Maps API or Mapbox GL JS)
   - GPS integration for automatic location updates
   - Distance calculations from user's location
   - Navigation/directions link

2. **Weekly Schedule Display**
   - Dynamic event calendar with filtering by day
   - Location-specific landing pages for regular stops
   - iCal export for customer calendars
   - Upcoming events listing

3. **Pre-Ordering System** (35-50% higher revenue with online ordering)
   - Mobile-optimized checkout (3 steps or fewer)
   - Order-ahead with pickup time selection
   - Secure payment processing (Stripe/Square)
   - SMS/email order confirmation

4. **Social Media Integration**
   - Twitter/X feed for real-time location announcements
   - Instagram feed embed for food photos
   - Facebook Live / Instagram Stories for location updates
   - **Truckily**: Free app that auto-updates Facebook, Twitter, Foursquare with location

5. **Mobile-First Design** (90%+ traffic from phones)
   - Sub-3-second load times on 4G
   - Touch targets minimum 44x44 pixels
   - Sticky navigation with location info always visible
   - One-tap calling and directions

### Food Truck Platform Ecosystem

| Platform | Features | Use Case |
|----------|----------|----------|
| **Truckfindr** | 7-day location updates, custom web page, pre-ordering | Truck finder + basic web presence |
| **Where's The Foodtruck** | Live tracking, order ahead, truck discovery | Customer discovery |
| **Truckster (GoTruckster)** | Live location tracking, schedule filtering | Local truck discovery |
| **Roaming Hunger** | Booking platform for events, catering | Event/catering connections |
| **StreetFoodFinder** | Location listing, schedule management | Market/event aggregation |
| **Truckily** | Auto social media location updates | Social media automation |

### Technical Recommendations for Food Truck Sites
- **Frontend**: React/Next.js or Vue/Nuxt.js for SEO + dynamic content
- **Maps**: Google Maps API or Mapbox GL JS
- **Database**: PostgreSQL for relational schedule/location data
- **Real-time updates**: WebSockets or webhook-based location push
- **Hosting**: Vercel/Netlify (frontend) + serverless functions
- **Performance targets**: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 5. ONLINE ORDERING PLATFORMS / APIs

### Comprehensive Platform Comparison

| Platform | Pricing | Commission | White-Label | API | POS Integration | Best For |
|----------|---------|-----------|-------------|-----|-----------------|----------|
| **Square Online** | Free - $149/mo | 0% (transaction fees only) | Limited | YES (full REST) | Square POS | Small restaurants, food trucks |
| **ChowNow** | $119-$298/mo | 0% | YES (branded website + app) | NO | Multiple POS | Independent restaurants wanting branded ordering |
| **Toast Online Ordering** | Included with Toast POS | 0% on 1st-party | Within Toast | YES (Toast API) | Toast only | Toast POS customers |
| **Olo** | Custom/enterprise | 0% on direct orders | YES | YES (API-first) | 400+ integrations | Enterprise, multi-location chains |
| **Owner.com** | $499/mo flat | 0% (5% charged to customer) | YES (full branded) | Integrations available | Toast, Clover, Square | Independents wanting full-service platform |
| **BentoBox** | $119-$479/mo | Varies by plan | YES (high-end design) | Limited | Multiple | Upscale/fine dining |
| **Popmenu** | Custom pricing | Varies | YES | Limited | Multiple POS | Restaurants wanting interactive menus |
| **Menufy** | Free setup | $1.75/order (customer-paid) | YES | Limited | Clover, others | Budget-conscious operators |
| **Restolabs** | $69-$199/mo | 0% | YES | 50+ payment gateways | Multiple | Multi-location |
| **UpMenu** | Tiered monthly | 0% | YES (branded app) | Limited | Multiple | All-in-one platform seekers |
| **DoorDash Storefront** | Free setup | 0% on pickup, delivery fees | Partial | Via partnerships | Via middleware | DoorDash driver access |
| **OrderEm** | $25+/mo | Varies | YES (branded app) | Limited | Clover | Clover POS users |

### Detailed Platform Profiles

#### Square Online + Square API (RECOMMENDED for Custom Builds)
- Free API access with no per-call charges
- Full control over UX with Orders API + Catalog API + Payments API
- SDKs in 7+ languages
- Sandbox environment for testing
- Can build completely custom ordering experience
- Transaction fees: 2.9% + 30c online (Plus plan)

#### Owner.com (RECOMMENDED for Turnkey Solution)
- $499/mo flat fee, all features included
- AI-powered website builder optimized for restaurant conversion
- Branded mobile app included
- Loyalty program, email/SMS marketing included
- Integrates with Toast, Clover, Square POS
- 24/7 support
- Trade-off: 5% service fee charged to customer

#### BentoBox (RECOMMENDED for Upscale Restaurants)
- Core website: $119/mo
- Takeout & Delivery add-on: $49/mo
- Online Catering: $79/mo
- Foundations Plan: $279/mo (bundled)
- Signature Plan: $479/mo (full suite)
- White-glove onboarding and migration support
- Integrates with Instagram, Facebook, Google, Mailchimp

#### ChowNow (RECOMMENDED for Zero-Commission Branded Ordering)
- 3 tiers: $119/mo, $199/mo, $298/mo
- Zero commission on all orders
- Custom-branded website and mobile app
- No API available (limitation for custom builds)
- Good for restaurants wanting set-and-forget branded ordering

---

## 6. REVIEW INTEGRATION

### Google Reviews

#### Method 1: Google Places API (Most Control)
- **Endpoint**: Place Details (New) API
- **Cost**: ~$17 per 1,000 requests; $200/mo free credit (~11,700 free requests/mo)
- **Limitation**: Returns up to 5 reviews per request by default
- **Rate Limit**: 100,000 requests/day (standard)
- **Field Masks**: Use to request only review data (reduces cost)
- **How**: Call Place Details with place_id, request reviews field, render in custom UI
- **March 2025 pricing changes**: New tiered SKU pricing based on fields requested

#### Method 2: Third-Party Review Widgets (Easiest)

| Widget Tool | Free Tier | Paid Pricing | Features |
|-------------|-----------|-------------|----------|
| **EmbedSocial** | Yes (forever free) | From ~$29/mo | Auto-pull from Google Business Profile, customizable, no API key needed |
| **Elfsight** | Limited free | From ~$5/mo | No-code, drag-and-drop, multiple layouts |
| **Tagembed** | Yes (basic) | From $15/mo | Multi-source (Google, Yelp, Facebook, TripAdvisor) |
| **Shapo** | Yes (10 reviews, unlimited widgets) | Paid plans available | Free includes unlimited widgets |
| **Trustmary** | Free tier | Paid plans available | Import from Yelp, Facebook, G2, Capterra, TripAdvisor in one widget |
| **SociableKit** | Free option | Paid plans | Easy embed for multiple platforms |

**Recommendation**: For restaurants, **EmbedSocial** or **Trustmary** provide the best balance of features and cost, pulling from multiple review sources into one widget with no coding required.

### Yelp Reviews

#### Yelp Fusion API (Now "Places API")
- **Pricing** (2025-2026): Tiered paid model
  - Starter: $7.99 per 1,000 API calls
  - Plus: $9.99 per 1,000 calls
  - Enterprise: $14.99 per 1,000 calls (or contact for 150K+/month volume)
- **Limitation**: Public API returns only UP TO 3 review excerpts per business
- **Private Reviews API**: Full reviews available, but disabled by default -- requires partner access approval
- **Terms**: Free trial is for non-public evaluation only; cannot publicly launch during trial
- **Rate Limiting**: QPS limits apply; HTTP 429 errors if exceeded

#### Yelp Display Alternatives
- Third-party widgets (Tagembed, EmbedSocial, Trustmary) can aggregate Yelp reviews
- SociableKit offers free Yelp review embedding for Google Sites and other platforms

### TripAdvisor
- Widget available for embedding ratings
- API access requires partnership agreement

### Actionable Recommendation
For most restaurant websites, use a **multi-source widget** (EmbedSocial or Trustmary) that aggregates Google + Yelp + Facebook reviews into one display. This avoids API complexity, handles rate limits automatically, and provides a polished UI. Budget: $0-29/month.

---

## 7. TECH STACK RECOMMENDATIONS

### Framework Comparison for Restaurant Sites

| Framework | Best For | Performance | Dynamic Content | SEO | Learning Curve |
|-----------|----------|------------|-----------------|-----|---------------|
| **Next.js** | Full-featured sites with ordering, reservations, dynamic menus | Excellent (SSR/SSG/ISR) | Excellent | Excellent | Moderate |
| **Astro** | Content-focused, photography-heavy, mostly static sites | Best (zero JS by default) | Limited (islands) | Excellent | Low-Moderate |
| **Nuxt.js** | Vue.js ecosystem, similar capabilities to Next.js | Excellent | Excellent | Excellent | Moderate |
| **Remix** | Form-heavy, interactive ordering experiences | Excellent | Excellent | Good | Moderate |
| **SvelteKit** | Maximum performance with minimal bundle size | Excellent | Good | Good | Low |

### Recommended Stack: Full-Featured Restaurant Site

```
Framework:      Next.js 14+ (App Router with React Server Components)
Styling:        Tailwind CSS + shadcn/ui components
Animation:      Framer Motion (UI transitions) + GSAP (scroll/timeline effects)
CMS:            Sanity or Contentful (headless, for menu management)
Image Hosting:  Cloudinary or imgix (food photography optimization)
Maps:           Google Maps API or Mapbox GL JS
Payments:       Square API or Stripe
Reviews:        EmbedSocial widget or Google Places API
Hosting:        Vercel (optimal for Next.js)
Database:       PostgreSQL (via Supabase or PlanetScale)
Auth:           Clerk or NextAuth.js (if needed for loyalty/accounts)
```

### Recommended Stack: Static/Brochure Restaurant Site

```
Framework:      Astro 4+
Styling:        Tailwind CSS
Animation:      CSS View Transitions + minimal GSAP
CMS:            Sanity or markdown files
Image Hosting:  Astro built-in optimization (Sharp)
Maps:           Google Maps embed or Mapbox
Hosting:        Netlify or Vercel
```

### Image Optimization for Food Photography

#### Formats
- **AVIF**: Best compression (50-80% smaller than JPEG), HDR support -- use as primary format with fallbacks
- **WebP**: Excellent compression (25-50% smaller than JPEG), universal browser support -- use as fallback
- **JPEG**: Legacy fallback only

#### Next.js Image Component Features
- Automatic format conversion (AVIF/WebP)
- Responsive resizing (serves exact needed size)
- Lazy loading by default (off-screen images not loaded)
- Layout shift prevention (requires width/height or fill)
- Edge caching via Sharp compression
- Quality setting: Use 75-85 for food photos (balance of quality and size)

#### Best Practices for Food Photography
- Hero images: Use `priority` attribute (no lazy loading for above-fold)
- Menu item photos: Lazy load, serve at exact display size
- Use Cloudinary or imgix for on-the-fly transformations (crop, resize, format)
- Implement blur placeholder (blurDataURL) for progressive loading
- Target: < 200KB per hero image, < 50KB per menu item thumbnail

### Animation Libraries

| Library | Size | Best For | Performance |
|---------|------|----------|-------------|
| **Framer Motion** | ~30KB | React UI transitions, menu reveals, page transitions, layout animations | Excellent for React |
| **GSAP** | ~23KB core | Complex timelines, scroll-driven animations, SVG morphs, parallax | Up to 20x faster than CSS transitions |
| **Lottie** | ~50KB player | Pre-made food/restaurant animations, loading states, micro-interactions | Good (vector-based, resolution independent) |
| **CSS View Transitions** | 0KB | Page transitions, simple reveals | Native browser, best performance |
| **Auto Animate** | ~2KB | Simple list/menu transitions | Minimal overhead |

#### Restaurant-Specific Animation Patterns
- **Menu category transitions**: Framer Motion `AnimatePresence` + `layout` animations
- **Scroll-triggered reveals**: GSAP ScrollTrigger for menu sections appearing on scroll
- **Food photo galleries**: Framer Motion for drag/swipe carousels
- **Hero parallax**: GSAP ScrollTrigger with parallax layers
- **Loading/ordering states**: Lottie food animations (free on LottieFiles)
- **Page transitions**: Next.js + Framer Motion or CSS View Transitions
- **Menu item hover effects**: CSS transforms + Framer Motion for smooth scaling

### Component Libraries

| Library | Approach | Styling | Accessibility |
|---------|----------|---------|---------------|
| **shadcn/ui** | Copy-paste components, full ownership | Tailwind CSS + Radix primitives | WAI-ARIA compliant |
| **Radix UI** | Unstyled primitives | Bring your own | Excellent |
| **Magic UI** | 50+ animated components | Tailwind + Framer Motion | Good |
| **Aceternity UI** | Animated components for marketing sites | Tailwind + Framer Motion | Good |

### Reservation Integration

| Platform | Integration Method | API Access | Cost |
|----------|-------------------|------------|------|
| **OpenTable** | Embed widget (iframe) or API (partner approval required) | Partner API (3-4 week approval) | Free widget; API requires partnership |
| **Resy** | Booking button widget | Limited API | Free widget embed |
| **resOS** | Embed booking widget | Widget-based | Varies |
| **Yelp Reservations** | Via Yelp platform | Through Yelp API | Included with Yelp |

---

## STRATEGIC RECOMMENDATIONS

### For Building a Restaurant Website Platform/Builder

1. **Use Square API as the primary POS/ordering backbone** -- it is free, well-documented, has the broadest market penetration among small restaurants and food trucks, and provides a complete ordering + payments flow.

2. **Add Omnivore/Deliverect middleware** for restaurants using non-Square POS systems (Toast, Clover, Aloha, etc.) to provide universal POS compatibility.

3. **Build on Next.js + Tailwind CSS + shadcn/ui** for the best balance of performance, developer experience, and visual quality. Use Astro only for purely static brochure sites.

4. **Implement interactive HTML menus** with category filtering, dietary icons, and optional dish photos. Never generate PDFs. Consider Popmenu's interaction model (favorites, per-dish reviews) as inspiration.

5. **Use Framer Motion + GSAP** for animations -- Framer Motion for all UI state transitions and GSAP for scroll-driven effects and complex timelines.

6. **Optimize food photography aggressively** -- AVIF primary, WebP fallback, Cloudinary/imgix for transformations, Next.js Image component for automatic optimization.

7. **Aggregate reviews via EmbedSocial or Trustmary** rather than building custom API integrations to Google/Yelp -- it is faster, cheaper, and handles rate limits/TOS issues.

8. **For food trucks, prioritize**: real-time location map, weekly schedule calendar, mobile-first pre-ordering, and social media feed integration (especially Instagram).

9. **For reservation integration**, use OpenTable's embed widget for broad compatibility, or build custom with a booking engine like resOS.

10. **Design with warm colors** (reds, oranges, earthy tones) to stimulate appetite, and always lead with high-quality food photography in the hero section.

---

## Sources

### POS Systems & APIs
- [Best POS Systems for Restaurants (Otter)](https://www.tryotter.com/blog/restaurant-tips/best-pos-systems-for-restaurants)
- [Square API Reference](https://developer.squareup.com/reference/square)
- [Square Orders API](https://developer.squareup.com/docs/orders-api/how-it-works)
- [Square Developer Documentation](https://developer.squareup.com/docs)
- [Square Payments Pricing with APIs](https://developer.squareup.com/docs/payments-pricing)
- [Toast API Overview](https://doc.toasttab.com/doc/devguide/apiOverview.html)
- [Toast Orders API](https://doc.toasttab.com/doc/devguide/portalOrdersApiOverview.html)
- [Building Toast Online Ordering Integration](https://doc.toasttab.com/doc/cookbook/apiIntegrationChecklistOrdering.html)
- [Clover API Reference](https://docs.clover.com/dev/reference/api-reference-overview)
- [Clover REST API Basics](https://docs.clover.com/dev/docs/clover-development-basics-web-app)
- [Restaurant POS Systems List & Delivery Integrations](https://www.favorpos.com/guides/restaurant-pos-systems-list-delivery-integrations.html)
- [Top Restaurant POS Delivery Integrations Guide](https://www.favorpos.com/guides/top-restaurant-pos-delivery-integrations.html)
- [Best Restaurant POS Systems Compared](https://www.tmasmallbusinessaccounting.com/blog/restaurant-pos-systems-compared)
- [10 Best Restaurant POS Systems 2026](https://restaurant.eatapp.co/blog/best-restaurant-pos-systems-for-small-business)
- [Square Fees & Pricing 2026](https://www.posusa.com/square-fees-pricing/)
- [Square Online Ordering Pricing (Sauce)](https://www.getsauce.com/post/square-online-ordering-pricing-and-fees)

### Middleware & Aggregators
- [Omnivore API (Olo)](https://www.olo.com/omnivoreapi)
- [Deliverect Integrations](https://www.deliverect.com/en-us/integrations)
- [Deliverect POS Integrations](https://www.deliverect.com/en-us/integrations/pos-systems)
- [Chowly Platform Key Features](https://chowly.com/solutions/order-integration/)
- [KitchenHub: Stream Orders Alternatives](https://www.trykitchenhub.com/post/stream-orders-alternatives-exploring-your-options-for-seamless-pos-integration)
- [DoorDash Preferred Integration Partners (FSR)](https://www.fsrmagazine.com/industry-news/doordash-introduces-program-to-help-restaurants-choose-pos-and-middleware-partners/)

### Restaurant Website Design
- [Top 10 Restaurant Website Examples 2026](https://startdesignsblog.wordpress.com/2026/02/26/top-10-restaurant-website-examples-for-2026-designs-that-delight-convert/)
- [Restaurant Website Must-Have Features (RestaurantTimes)](https://www.restauranttimes.com/blogs/technology/restaurant-website-must-have-features/)
- [Best Restaurant Website Design Examples 2026 (POSUSA)](https://www.posusa.com/examples-of-best-restaurant-website-design/)
- [10 Essential Elements of a Restaurant Website (BentoBox)](https://www.getbento.com/blog/the-10-essential-elements-of-a-restaurant-website/)
- [Restaurant Website Guide 2026 (DoorDash)](https://merchants.doordash.com/en-us/blog/building-restaurant-website)
- [Restaurant Website Design Ideas (Network Solutions)](https://www.networksolutions.com/blog/best-restaurant-website-designs/)
- [25 Best Restaurant Websites (UpMenu)](https://www.upmenu.com/blog/best-restaurant-websites-design/)

### Color Psychology
- [Restaurant Color Psychology (Kezner)](https://www.keznerconsulting.com/restaurant-color-psychology/)
- [Color Psychology for Restaurant Design (Wasserstrom)](https://www.wasserstrom.com/blog/2022/12/07/color-psychology-for-restaurant-design/)
- [Restaurant Branding with Colors (RestaurantTimes)](https://www.restauranttimes.com/blogs/marketing/restaurant-branding-with-colors/)
- [Color Psychology Restaurant (GloriaFood)](https://www.gloriafood.com/restaurant-color-psychology)

### Menu Design
- [Best Practices for Food Menu Design (Popmenu)](https://get.popmenu.com/post/food-menu-design)
- [5 Menu Design Ideas for Digital-First (Popmenu)](https://get.popmenu.com/post/menu-design-ideas)
- [Popmenu Dynamic Menu Tech](https://get.popmenu.com/dynamic-menu-tech)
- [30 Best Restaurant Websites (MenuTiger)](https://www.menutiger.com/blog/restaurant-website)
- [12 Best Restaurant Website Designs (Toast)](https://pos.toasttab.com/blog/on-the-line/examples-restaurant-websites)

### Food Truck
- [Food Truck Website Examples & Technical Guide](https://isitdownorjustme.net/web/food-truck-website-examples/)
- [Best Food Truck Apps 2025 (Toast)](https://pos.toasttab.com/blog/on-the-line/best-food-truck-apps)
- [Top Food Truck Apps 2025 (DevTechnoSys)](https://devtechnosys.com/top-platforms/best-food-truck-apps.php)
- [Food Truck Website Builder (Snapps.ai)](https://www.snapps.ai/best-website-builder-food-truck/)
- [Best Food Truck Websites (UpMenu)](https://www.upmenu.com/blog/best-food-truck-websites/)
- [Food Truck Websites on Wix](https://www.wix.com/blog/food-truck-websites)
- [Food Truck Social Media Strategy (Toast)](https://pos.toasttab.com/blog/on-the-line/food-truck-social-media)
- [Social Media Trends for Food Trucks 2025](https://fusionserveb2b.com/brand-builder-s-blog/brand-builders-blog-social-media-marketing-trends-for-food-trucks-in-2025)
- [Truckfindr](https://truckfindr.com/)
- [GoTruckster](https://gotruckster.com/)

### Online Ordering Platforms
- [Top 15 Online Ordering Software 2026 (KitchenHub)](https://www.trykitchenhub.com/post/top-10-online-ordering-software)
- [ChowNow Pricing](https://get.chownow.com/pricing/)
- [ChowNow Reviews 2026 (SelectHub)](https://www.selecthub.com/p/online-ordering-systems/chownow/)
- [Olo Online Ordering](https://www.olo.com/ordering)
- [Olo Enterprise](https://www.olo.com/enterprise)
- [Owner.com Pricing](https://www.owner.com/pricing)
- [Owner.com Reviews (G2)](https://www.g2.com/products/owner-com/reviews)
- [BentoBox Pricing](https://www.getbento.com/pricing/)
- [BentoBox Platform](https://www.getbento.com/)

### Reviews Integration
- [Embed Google Reviews (SocialPilot)](https://www.socialpilot.co/reviews/blogs/embed-google-reviews)
- [Google Reviews Widgets 2026 (Localo)](https://localo.com/blog/how-to-embed-google-reviews-on-website)
- [EmbedSocial Google Reviews Widget](https://embedsocial.com/google-reviews-widget/)
- [Google Places API Pricing (SafeGraph)](https://www.safegraph.com/guides/google-places-api-pricing)
- [Google Places API Billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
- [Yelp Fusion API Pricing](https://business.yelp.com/data/resources/pricing/)
- [Yelp API Terms of Use](https://terms.yelp.com/developers/api_terms/20250113_en_us/)
- [Yelp Reviews API](https://docs.developer.yelp.com/reference/v3_business_reviews)
- [Yelp API Capabilities & Limitations](https://docs.developer.yelp.com/docs/current-capabilities-limitations)

### Tech Stack
- [Astro vs Next.js 2026 (Pagepro)](https://pagepro.co/blog/astro-nextjs/)
- [The 2026 Website Stack (BentEnterprise)](https://www.bententerprise.com/the-2026-website-stack-what-to-use-and-what-to-avoid/)
- [Image Optimization 2025 (FrontendTools)](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025)
- [Next.js Image Optimization (Strapi)](https://strapi.io/blog/nextjs-image-optimization-developers-guide)
- [Next.js Image Optimization (DebugBear)](https://www.debugbear.com/blog/nextjs-image-optimization)
- [shadcn/ui](https://ui.shadcn.com/)
- [GSAP](https://gsap.com/)
- [Framer Motion](https://motion.dev)
- [Framer Motion vs GSAP (Semaphore)](https://semaphore.io/blog/react-framer-motion-gsap)
- [Lottie Restaurant Menu Animations](https://lottiefiles.com/free-animations/restaurant-menu)

### Reservations
- [OpenTable Widget Installation](https://support.opentable.com/s/article/How-do-I-install-the-reservation-widget-to-take-reservations-on-my-website-and-Facebook)
- [OpenTable API Partners](https://www.opentable.com/restaurant-solutions/api-partners/)
- [OpenTable Integrations](https://www.opentable.com/restaurant-solutions/integrations/)
- [Resy Widget Installation](https://helpdesk.resy.com/en_us/booking-button-installation-Skx_7ueNo)
