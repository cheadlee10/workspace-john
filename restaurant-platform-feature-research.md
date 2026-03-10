# Restaurant Website Platform: Comprehensive Feature Research Report
## Beyond-the-Obvious Features, Tools, and Capabilities (2025-2026)

---

## EXECUTIVE SUMMARY: BUILD NOW vs BUILD LATER

### TIER 1 - BUILD NOW (High impact, proven demand, competitive table stakes)
- AI-generated menu descriptions & social media posts
- Google Business Profile integration (Order with Google, Reserve with Google, schema markup)
- DoorDash Drive / Uber Direct white-label delivery integration
- 86'd item management (real-time sold-out sync)
- WCAG 2.1 AA accessibility (baked into the platform from day one)
- Abandoned cart recovery (SMS + email)
- Reputation management (review monitoring + AI-assisted responses)
- Apple Pay / Google Pay / digital wallet support
- Structured data / schema markup (Restaurant, Menu, FAQ, LocalBusiness)
- Birthday/anniversary automated campaigns
- Customer data platform (CDP) basics: order history, visit frequency, preferences

### TIER 2 - BUILD SOON (Growing demand, strong differentiation)
- AI phone answering / voice ordering integration
- Catering/large-order module (deposits, scheduling, invoicing)
- Waitlist/queue management integration
- Multi-channel order aggregation (DoorDash + UberEats + Grubhub in one dashboard)
- Push notifications (PWA or native wrapper)
- Review generation (post-visit NPS surveys that route happy customers to Google/Yelp)
- Hiring/careers page builder
- Analytics dashboard (menu profitability, peak hours, customer lifetime value)
- Win-back campaigns for lapsed customers
- BNPL for catering orders

### TIER 3 - BUILD LATER (Emerging, niche, or low current ROI)
- AI chatbot ordering (website + WhatsApp + Instagram DM)
- AR menu visualization
- Crypto payments
- NFT/token-based loyalty
- TikTok direct ordering integration
- Kitchen display system (KDS) integration
- Full shift scheduling / tip management
- Biometric payments
- Dynamic pricing engine

---

## 1. AI-POWERED FEATURES

### What's Real and Working Now

**AI Menu Description Generation**
- Use case: Restaurant owners upload dish name + ingredients; AI generates compelling, SEO-friendly descriptions with dietary tags
- Implementation: OpenAI API or Claude API; cost per description is fractions of a cent
- ROI: Saves hours of copywriting; improves online ordering conversion
- RECOMMENDATION: Build NOW. This is a killer onboarding feature.

**AI Photo Enhancement**
- Tools: Let's Enhance API, ClipDrop API, Photoroom API
- Use case: Owners upload phone photos; AI removes backgrounds, enhances lighting, creates consistent look
- Reality check: Most restaurant photos are terrible. This solves a real pain point.
- RECOMMENDATION: Build NOW. Low engineering cost, massive perceived value.

**AI Review Responses**
- Use case: Draft personalized responses to Google/Yelp reviews maintaining brand voice
- Players: Birdeye (BirdAI), Momos (Alfie), FeedbackRobot
- Implementation: Template system + LLM that references specific review content
- RECOMMENDATION: Build NOW. 93% of consumers read reviews before visiting.

**AI Social Media Post Generation**
- Use case: Generate Instagram captions, Facebook posts, promotional content from menu items/events
- 28% of restaurants already using AI for marketing automation (Toast survey)
- RECOMMENDATION: Build NOW. Pairs naturally with the website platform.

**AI Phone Answering / Voice Ordering**
- Major players and pricing:
  - **SoundHound**: Enterprise-focused, ~$1,323/month for medium volume. 100M+ interactions processed. Best for large chains.
  - **ConverseNow**: Integrates with major POS systems, focuses on takeout/delivery calls
  - **ReachifyAI**: Restaurant-specific, most accurate for guest Q&A + ordering
  - **Slang AI**: ~$748/month medium volume
  - **Hostie AI**: Transparent pricing, no setup fees, multilingual (20+ languages)
- Reality: Restaurants miss 30-40% of phone calls. This is massive revenue leakage.
- RECOMMENDATION: Build integration SOON. Offer as premium add-on or partner integration.

**AI Demand Forecasting**
- Predicts busy periods for staffing and inventory
- Players: Fourth (AI scheduling), Restaurant365
- Use case: Analyze historical sales + weather + local events to predict demand
- RECOMMENDATION: Build LATER. Requires significant historical data to be useful.

**AI Chatbot Ordering**
- KFC India, Domino's, Pizza Hut all running WhatsApp ordering
- WhatsApp: 98% open rate, 3B+ users, no download barrier
- Projected $8B in savings for F&B businesses through chatbot automation
- RECOMMENDATION: Build LATER (Tier 3). Complex, but watch closely.

---

## 2. GOOGLE INTEGRATION

### Order with Google (Critical)
- Customers order food directly from Google Search and Google Maps
- **How it works**: Restaurant appears in search results with "Order Online" button that either:
  - Redirects to restaurant's own ordering page (Ordering Redirect)
  - Completes order entirely within Google (End-to-End, requires approved partner)
- **Integration partners**: ChowNow, Olo, Chowly, Zuppler are approved Google partners
- **Commission**: Google takes NO commission. Partners may charge:
  - ChowNow: flat monthly fee (no per-order commission)
  - Chowly: ~5% per order
  - Some third-party platforms: ~10% per order
- **Integration timeline**: 12-16 weeks for end-to-end integration
- **Requirements**: Text-based menus (not image PDFs), daily menu updates, structured data feeds
- RECOMMENDATION: Build NOW. This is free traffic. Becoming a Google ordering partner yourself is the ultimate goal.

### Reserve with Google
- Customers book tables directly from Google Search
- Partners: OpenTable, Resy, Yelp, Eatapp
- RECOMMENDATION: Build integration hooks NOW.

### Google Business Profile Optimization
- Menu data via FoodMenus API
- Hours, photos, posts, Q&A management
- Booking/ordering links management
- RECOMMENDATION: Build management tools NOW.

### Schema Markup (Technical SEO)
- **Restaurant schema**: name, address, cuisine, hours, price range, geo coordinates
- **Menu schema**: individual dishes + prices appear in search results
- **FAQ schema**: structured answers for voice assistants (Alexa, Google Assistant)
- **Review schema**: star ratings as rich snippets (builds trust, increases CTR)
- **Event schema**: special events, wine dinners, live music
- Best practice: One Restaurant object per location page with unique @id values
- RECOMMENDATION: Auto-generate schema markup for every restaurant site. This is a HUGE differentiator that most competitors miss.

---

## 3. SOCIAL MEDIA COMMERCE

### Current State
- 78% of diners discover restaurants through social media
- 41% of Gen Z use TikTok for restaurant discovery
- 61% of diners say TikTok food content directly influences where they eat
- 55% visit a restaurant after seeing its menu on TikTok

### Instagram
- Instagram Shopping supports product tags but food ordering is not native
- Workaround: Link-in-bio to ordering page, story links to order page
- Meta AI chatbots emerging (Pizza Hut's "Hutty")
- RECOMMENDATION: Build "Order Now" link tools + social content generation. Direct ordering through Instagram is NOT yet practical for most restaurants.

### TikTok
- TikTok Shop exists but food ordering is not a core feature
- Primary value is discovery and traffic driving
- RECOMMENDATION: Focus on helping restaurants create TikTok-friendly content (vertical video, menu shots). Don't build TikTok ordering integration yet.

### Facebook
- Facebook ordering buttons can link to restaurant's ordering page
- Facebook Shops not widely used for restaurants
- RECOMMENDATION: Ensure easy "Order Food" button linking from Facebook pages.

### WhatsApp Ordering
- 98% message open rate
- No app download required
- KFC India, Domino's already doing this
- Tools: ChatMaxima, Gallabox, OlaClick for WhatsApp chatbot ordering
- RECOMMENDATION: Build LATER but monitor closely. Huge in international markets.

---

## 4. WAITLIST / QUEUE MANAGEMENT

### Key Players & Pricing
| Platform | Price | Key Feature |
|----------|-------|-------------|
| Yelp Guest Manager | $249/month | Integrated with Yelp search, kiosk mode, 11K+ restaurant partners |
| Waitwhile | $23-49/month | Cross-industry, Slack/Mailchimp/Facebook integrations |
| Eatapp | Varies | Combined reservations + waitlist |
| TablesReady | Varies | QSR/food truck focused, order-ready notifications |

### Integration Value
- Guests can view live wait times on Yelp/Google and join remotely
- SMS notifications when table is ready
- Data: average wait times, no-show rates, peak capacity times
- RECOMMENDATION: Build integration API for Yelp Guest Manager and Waitwhile SOON. Don't build our own waitlist system -- integrate with leaders.

---

## 5. DELIVERY LOGISTICS (White-Label Delivery)

### DoorDash Drive
- **What it is**: Use DoorDash's fleet to deliver orders from YOUR website (not DoorDash marketplace)
- **Pricing**: $9.75 base for deliveries within 5 miles + $0.75/mile beyond (up to 15 miles). Legacy: flat $7.00/delivery
- **Fees**: No signup, subscription, or termination fees
- **Delivery radius**: Up to 10 miles
- **API**: REST API at `openapi.doordash.com/drive/v2/deliveries`
- **Auth**: JWT-based
- **Languages**: Node.js, Python, PHP, Java, Kotlin, C#
- **Note**: Production access currently restricted; sandbox available for testing
- **Tips**: 100% pass-through to Dashers

### Uber Direct
- **Delivery radius**: Up to 8 miles
- **API**: REST API at developer.uber.com
- **Notable**: Toast switched default white-label partner FROM DoorDash TO Uber Direct
- **Pricing**: Contact-based; competitive with DoorDash Drive

### KitchenHub
- Unified API connecting to DoorDash, Uber Eats, Grubhub simultaneously
- Single integration point for multiple delivery networks
- Also handles order aggregation

### RECOMMENDATION: Build DoorDash Drive + Uber Direct integration NOW. This is a PRIMARY value proposition -- restaurants offering delivery through their own website without paying 15-30% marketplace commissions. Let restaurants choose their delivery partner.

---

## 6. KITCHEN OPERATIONS

### Kitchen Display Systems (KDS)
- 60% of new restaurants in North America now use KDS
- Market growing from $487M (2024) to $1.024B (2033)
- Cloud-based: runs on iPad, Android tablet, or ruggedized devices
- Key players: Toast KDS, Square KDS, SpotOn, Oracle, Fresh KDS

### 86'd Item Management (Real-Time Sold-Out Sync)
- **Critical feature**: When a POS marks an item as sold out, it must INSTANTLY disappear from:
  - Restaurant's own website ordering menu
  - DoorDash listing
  - UberEats listing
  - Grubhub listing
  - Google ordering
- **How it works**: POS fires webhook -> middleware updates all channels
- **Players with this**: Checkmate, ChowNow (Square sync), Toast
- **Pain point**: Without this, restaurants get orders they can't fulfill -> refunds + bad reviews

### Order Routing
- Route orders to appropriate kitchen stations (grill, fryer, prep, etc.)
- Display modifications, special requests, dietary flags
- Prioritize by complexity and cooking duration

### RECOMMENDATION:
- 86'd item sync: Build NOW. This is essential for any online ordering platform.
- KDS integration: Build LATER. Most restaurants already have a KDS; we just need to send orders to it.

---

## 7. STAFF / LABOR

### What Restaurant Websites Need

**Hiring/Careers Page**
- Restaurants have ~75% annual turnover
- Simple job posting page with application form
- Integration with Indeed, Poached Jobs, Culinary Agents
- RECOMMENDATION: Build a simple careers page builder NOW. Low effort, high value.

**Shift Scheduling**
- Major platforms: 7shifts, Homebase, HotSchedules, When I Work
- 7shifts: restaurant-first, integrates with 50+ POS systems, automated tip pooling
- Homebase: Free tier available, paid from $30/month/location
- RECOMMENDATION: Don't build this. Integrate with 7shifts via embed/link. LATER tier.

**Tip Management**
- Digital tip suggestions (18%, 20%, 25%) on online orders increase tips by ~10%
- Tip pooling/distribution is complex and legally sensitive
- RECOMMENDATION: Build tip selection on online ordering checkout NOW. Leave tip distribution to payroll platforms.

---

## 8. DATA & ANALYTICS

### What Restaurant Owners Actually Want (Priority Order)

1. **Sales dashboard**: Revenue by day/week/month, comparison to prior periods
2. **Popular items**: What sells, what doesn't, what gets modified
3. **Peak hours**: When are we busiest? (for staffing and promotions)
4. **Online ordering metrics**: Conversion rate, average order value, cart abandonment rate
5. **Customer frequency**: How often do customers return? (Repeat rate)
6. **Menu profitability**: Food cost per dish vs. selling price (requires ingredient cost input)
7. **Customer lifetime value**:
   - One-time visitors: avg $26 LTV
   - Repeat guests (avg 6.93 visits): $685 LTV (26x higher!)
   - Super guests (top 2.5%, 11+ visits): avg 36.5 total visits
8. **Marketing ROI**: Which campaigns drive orders?
9. **Channel mix**: Direct orders vs marketplace vs dine-in

### Key Insight
Digital channels projected to generate 70% of restaurant sales. The platform that owns the data wins.

### RECOMMENDATION: Build sales + popular items + peak hours + online ordering metrics NOW. Build CLV and menu profitability SOON. Build marketing attribution LATER.

---

## 9. ACCESSIBILITY & COMPLIANCE

### The Lawsuit Landscape (CRITICAL)

**2025 Statistics:**
- 8,667 ADA website lawsuits filed
- 37% increase year-over-year
- **Restaurants/food/beverage = 30.49% of ALL ADA website lawsuits** (the #1 targeted industry!)
- 40% increase in pro se complaints (individuals using AI to draft and file complaints)

**2026 Predictions:**
- Expected to exceed 5,500 federal filings
- April 24, 2026: Title II compliance deadline for public entities with 50,000+ population
- Illinois filings up 746% year-over-year
- AI tools enabling more individual filers

**What Gets Restaurants Sued:**
- Image-only menus (PDFs of printed menus) -- no screen reader support
- Missing alt text on food photos
- Non-keyboard-navigable ordering forms
- Poor color contrast
- Inaccessible reservation/ordering widgets
- PDF menus without proper tagging

**What DOES NOT Work:**
- Accessibility overlay widgets (accessiBe, UserWay overlays)
- 22.64% of lawsuits targeted sites WITH widgets installed
- Widgets solve only a small portion of issues
- Courts have ruled widgets insufficient

**What DOES Work:**
- WCAG 2.1 AA conformance baked into the platform
- Manual accessibility audits (not just automated scans)
- Accessibility statement with contact info
- HTML menus (not PDF)
- Proper alt text, ARIA labels, keyboard navigation
- Color contrast ratios meeting 4.5:1 for text

### RECOMMENDATION: BUILD ACCESSIBILITY INTO THE PLATFORM FROM DAY ONE. This is non-negotiable. If every site we build is WCAG 2.1 AA compliant by default, it becomes a massive selling point AND protects our clients. Auto-generate alt text for menu images using AI. Never use image-only menus. Include accessibility statement template.

---

## 10. EMERGING TECH

### AR Menus
- Customers scan QR codes to see 3D visualizations of dishes
- Cool but early stage; no dominant platform
- Hardware/software barrier still high
- RECOMMENDATION: LATER. Monitor but don't invest.

### Virtual Restaurant Tours
- Google Street View / 360 photos of restaurant interiors
- Nice for upscale venues; low demand from casual restaurants
- RECOMMENDATION: LATER. Maybe offer as premium photography add-on.

### NFT / Token Loyalty
- KFC piloting in Southeast Asia
- FAT Brands exploring crypto loyalty
- NFT Paris 2026 was cancelled
- Market crashed in late 2025
- RECOMMENDATION: SKIP for now. Market is cooling, complexity is high, customer demand is minimal.

### Crypto Payments
- FAT Brands accepting Bitcoin for royalty payments
- ~17% annual growth in crypto payment adoption
- Lower transaction fees than credit cards
- Volatility and security remain concerns
- RECOMMENDATION: LATER. Stripe already supports crypto checkout if needed.

### Biometric Payments
- CaliExpress using facial recognition via PopID
- Fingerprint and iris scanning emerging
- RECOMMENDATION: SKIP. Too niche, privacy concerns.

---

## 11. CUSTOMER RETENTION

### Birthday/Anniversary Campaigns
- Members who redeem personalized rewards spend 4.3x more annually
- Free dessert/drink/appetizer on birthday = high perceived value, low cost
- Implementation: Collect DOB at signup, automated email/SMS triggers
- RECOMMENDATION: Build NOW. Simple automation with proven massive ROI.

### Win-Back Campaigns
- Target customers who haven't visited in 45+ days
- At-risk guest recovery rate: 38% with early intervention
- Annual churn rate: 78.8% (industry average)
- Annual cost of churn per location: ~$375,380
- RECOMMENDATION: Build SOON. Requires visit tracking data.

### Abandoned Cart Recovery
- Average cart abandonment rate: 70-79%
- Mobile abandonment: 85.2%
- Recovery rate: Up to 20% of abandoned carts can be recovered
- 3 recovery emails recover 37% more carts than 1 email
- 45% of recoveries happen within first 2 hours
- Top abandonment reason: 39% surprised by extra fees at checkout
- RECOMMENDATION: Build NOW. Email + SMS recovery sequence. Show total price (including fees/tax) EARLY in the flow.

### Push Notifications
- Rich push notifications increase app open rates by 56%
- Best restaurant timing: 11:00 AM - 12:30 PM for lunch promos
- PWA limitation: iOS requires Home Screen install before push works
- RECOMMENDATION: Build SOON. PWA push for Android; need native wrapper or SMS fallback for iOS.

### Loyalty Programs / CDP
- **Fishbowl**: All-in-one GRM/CDP; email + SMS + offers; restaurant-specific
- **PAR Punchh**: AI-driven personalization; enterprise-focused for multi-location chains
- **Thanx**: Card-linked (frictionless, no app needed)
- **Bloom Intelligence**: $105/location/month; WiFi + POS + ordering data aggregation; delivers 52-69x ROI
- Automated retention systems: $105-225/location/month, generating $88K-143K annual incremental revenue per location
- RECOMMENDATION: Build basic loyalty (points/visits/rewards) NOW. Integrate with Fishbowl/Thanx for advanced CDP LATER.

---

## 12. THIRD-PARTY MARKETPLACE PRESENCE

### The Dual-Channel Strategy
- DoorDash: 67% US market share
- UberEats: 23%
- Grubhub: 8%
- Commission rates: 15-30% per order (vs. restaurant margins of 5-10%)

### Should We Help Manage Both Channels? YES.
- Use marketplace for DISCOVERY (new customers)
- Use direct ordering for RETENTION (repeat customers, higher margins)
- 67% of consumers prefer ordering directly from restaurant websites
- 61% of those say it's to support the restaurant directly

### Specific Value We Can Add
1. **Menu sync**: Update once, push to all channels (our site + DoorDash + UberEats + Grubhub)
2. **Pricing strategy**: Higher prices on marketplace (to offset commissions), lower on direct
3. **Insert marketing**: Flyers in marketplace orders driving customers to direct ordering
4. **Data capture**: Marketplace doesn't share customer data; direct ordering does
5. **Order aggregation**: Single dashboard for all incoming orders regardless of source

### Integration Platforms
- **Checkmate** (now part of ItsaCheckmate): Multi-channel order management
- **Deliverect**: Order aggregation + menu sync
- **Chowly**: Connects POS to all major delivery platforms
- **KitchenHub**: Unified API for multiple delivery networks

### RECOMMENDATION: Build menu sync + pricing differentiation tools SOON. Position direct ordering as the primary channel, marketplace as the discovery channel.

---

## 13. PAYMENTS

### Digital Wallets (Build NOW)
- 83% of restaurants accept mobile wallets
- 72% of adults prefer contactless/mobile payment
- **Apple Pay**: Must support via Stripe/Square/payment processor
- **Google Pay**: Same integration path
- **Samsung Pay**: Included in most payment processor SDKs
- Implementation: Stripe supports all three via a single integration

### Tipping on Online Orders (Build NOW)
- Precalculated tip suggestions drive 10% higher tipping
- Standard options: 15%, 18%, 20%, 25%, custom
- Pre-selected default: 18% or 20% (test which converts better)

### Buy Now Pay Later (Build for Catering)
- 104.6M BNPL users in US by 2026
- $143.44B processed annually
- Players: Afterpay, Klarna, Affirm
- 85% of retailers see increased BNPL usage
- Use case: Catering orders ($500+), holiday party orders, event deposits
- RECOMMENDATION: Add BNPL option for orders above a threshold ($200+). Build SOON.

### Split Checks
- Primarily a dine-in POS feature
- For online ordering: "split payment" less relevant (one person usually orders)
- For group ordering: Allow multiple people to add to a single order and pay separately
- RECOMMENDATION: Group ordering with individual payment is more useful than split checks. Build LATER.

### QR Code Payments
- 70% of US restaurants using QR codes for menus/payments
- Contactless table ordering and payment
- RECOMMENDATION: Support QR-code-triggered ordering NOW (this feeds our online ordering system).

---

## 14. REPUTATION MANAGEMENT

### Why This Matters
- 93% of consumers read reviews before visiting
- Ratings jump from 3.8 to 4.3 stars -> bookings climb 30-40%
- Google tightened fake review policies in 2025; real reviews matter more than ever

### Tool Landscape & Pricing
| Tool | Starting Price | Best For | Key Feature |
|------|---------------|----------|-------------|
| Birdeye | $99/month | Multi-location, broad features | BirdAI auto-responses, listings management |
| Podium | $289/month (Essentials) | Active engagement, SMS-first | Text-based review invitations |
| ReviewTrackers | $69/month (single location) | Small/mid restaurant groups | Reviews-first, centralized dashboard |
| Chatmeter | Custom pricing | Enterprise chains | AI sentiment analysis across millions of reviews |
| Momos | Custom pricing | Restaurant-specific | "Alfie" AI for instant on-brand responses |
| Reputation.com | Enterprise pricing | 100+ locations | Multi-location performance comparison |
| Bloom Intelligence | $105/month per location | CDP + reputation | Combines review monitoring with customer data |

### Review Generation Strategy
- Send automated post-visit NPS survey (via email/SMS)
- Happy customers (score 9-10): Route to Google/Yelp to leave review
- Unhappy customers (score 1-6): Route to internal feedback form (prevents public negative review)
- Tools: Zonka Feedback, Delighted, Hotjar, GenReview
- RECOMMENDATION: Build simple review request automation NOW. "How was your order? [Great] [OK] [Bad]" -> Great routes to Google review page.

### Sentiment Analysis
- Aggregate reviews from Google, Yelp, TripAdvisor, Facebook
- Identify patterns: "slow service" mentions trending up, "great tacos" consistently positive
- Alert owners to negative review spikes
- RECOMMENDATION: Build basic review aggregation + alerts NOW. Add sentiment analysis SOON.

---

## OVERLOOKED / EASILY-MISSED FEATURES

These are the features competitors often miss that could differentiate the platform:

### 1. Auto-Generated Schema Markup
Every restaurant site should automatically output Restaurant, Menu, LocalBusiness, FAQ, and Event schema. Most website builders don't do this well. This directly impacts Google visibility.

### 2. Menu-as-HTML (Not PDF)
PDF menus are: inaccessible (ADA lawsuits), un-indexable by Google, uneditable, and mobile-unfriendly. Every menu should be a structured, accessible HTML page with schema markup.

### 3. "Google-Ready" Menu Data
If our menu data structure matches Google's FoodMenus spec from day one, restaurants can plug into Order with Google, voice assistants, and AI search results seamlessly.

### 4. Multi-Language Menu Support
AI translation of menus into Spanish, Chinese, Korean, etc. based on local demographics. Low cost via translation APIs; massive value in diverse markets.

### 5. Allergen & Dietary Filtering
Let online customers filter menu by: gluten-free, vegan, vegetarian, nut-free, dairy-free, halal, kosher. This data also feeds AI recommendations.

### 6. Dynamic Hours & Holiday Closures
Auto-sync holiday hours to Google Business Profile. Prevent orders during closed hours. Show countdown to next open time.

### 7. Weather-Based Promotions
Rainy day? Push notification: "Stay in, we deliver! 10% off today." Simple integration with weather API.

### 8. Recurring Orders / Subscription Meals
"Get your usual every Tuesday" -- recurring orders for regulars. Meal subscription plans for lunch spots. Emerging but high-retention.

### 9. Gift Cards (Digital)
Often overlooked. Digital gift cards purchased and delivered via email/SMS. Square, Toast, and Stripe all support gift card APIs. Drives revenue during holidays.

### 10. Event Ticketing
Wine dinners, chef's tables, cooking classes, special events. Integrated ticketing with deposits. Most restaurant website builders handle this poorly.

### 11. Catering Module
Dedicated catering page with:
- Catering-specific menu (different from regular menu)
- Lead time requirements (72-hour minimum, etc.)
- Deposit collection (50% upfront)
- Headcount-based pricing
- Delivery scheduling
- BNPL for large orders

### 12. First-Party Data Capture at Every Touchpoint
Every interaction (order, reservation, waitlist join, WiFi login, review, loyalty signup) should capture customer email + phone. This is the restaurant's most valuable asset.

---

## COMPETITIVE LANDSCAPE: WHAT OTHERS CHARGE

| Platform | Monthly Cost | Setup Fee | Key Weakness |
|----------|-------------|-----------|--------------|
| BentoBox | $149+/month | $1,000 one-time | Expensive for small restaurants |
| ChowNow | $139+/month | Varies | Focused on ordering, weak on website design |
| Toast (website) | $69+/month | Varies | POS-first, website is secondary |
| Square Online | Free-$79/month | None | Generic, not restaurant-specialized |
| Owner.com | Custom | Custom | Direct competitor; strong on direct ordering |
| Popmenu | $149+/month | Custom | Good AI features but expensive |

---

## KEY API / INTEGRATION PRIORITY LIST

### Must-Have Integrations (NOW)
1. **Stripe** -- payments, Apple Pay, Google Pay, BNPL
2. **DoorDash Drive API** -- white-label delivery
3. **Uber Direct API** -- white-label delivery alternative
4. **Google Business Profile API** -- hours, photos, posts, ordering links
5. **Google Actions Center** -- Order with Google
6. **OpenAI / Claude API** -- menu descriptions, review responses, social posts
7. **Twilio / SendGrid** -- SMS + email for abandoned cart, birthday, win-back
8. **Square / Toast / Clover POS** -- 86'd item sync, menu sync, order routing

### Should-Have Integrations (SOON)
9. **Yelp API** -- review monitoring, waitlist (Guest Manager)
10. **7shifts API** -- labor/scheduling embed
11. **Checkmate / Deliverect** -- multi-marketplace order aggregation
12. **Fishbowl / Thanx** -- CDP and loyalty
13. **Zonka / Delighted** -- NPS surveys and review generation

### Nice-to-Have Integrations (LATER)
14. **SoundHound / ConverseNow** -- AI phone answering
15. **WhatsApp Business API** -- chat ordering
16. **Weather API** -- dynamic promotions
17. **Indeed / Poached** -- job posting syndication

---

## SOURCES

### AI Features
- [6 Ways AI Will Impact Restaurants in 2026 - The Food Institute](https://foodinstitute.com/focus/6-ways-ai-will-impact-restaurants-in-2026/)
- [Why 2026 is the year of the AI-driven restaurant - QSR Web](https://www.qsrweb.com/articles/why-2026-is-the-year-of-the-ai-driven-restaurant/)
- [2025 AI in Restaurants Survey Results - Toast](https://pos.toasttab.com/blog/data/ai-in-restaurants)
- [AI in Restaurants: 25 Tools for 2025 - Fourth](https://www.fourth.com/article/ai-in-restaurants)
- [Best AI Phone Systems for Restaurants 2025 - ReachifyAI](https://reachify.io/blog/the-7-best-ai-phone-systems)
- [Hostie AI vs SoundHound vs ConverseNow - Hostie AI](https://hostie.ai/resources/hostie-ai-vs-soundhound-vs-conversenow-2025-voice-ai-restaurant-comparison)

### Google Integration
- [Google Actions Center - Google for Developers](https://developers.google.com/actions-center)
- [FoodMenus API - Google for Developers](https://developers.google.com/my-business/reference/rest/v4/FoodMenus)
- [How to Offer Food Orders Through Google Business Profile - Local Falcon](https://www.localfalcon.com/blog/how-to-offer-food-orders-through-google-business-profile)
- [FAQ: Food Ordering with Google, Powered by ChowNow](https://get.chownow.com/blog/introducing-food-ordering-with-google-powered-by-chownow/)
- [Google Ordering Changes - ChowNow](https://get.chownow.com/blog/googles-ordering-changes-what-your-restaurant-needs-to-know/)
- [Why Schema Markup Is Crucial for Restaurant SEO in 2025](https://befoundonline.com/blog/why-schema-markup-is-crucial-for-restaurant-seo-in-2025)
- [Restaurant SEO Checklist 2026](https://thedigitalrestaurant.com/restaurant-seo-checklist/)

### Social Media Commerce
- [Social Media for Restaurants: The Complete Guide 2026](https://posteverywhere.ai/blog/social-media-for-restaurants)
- [Restaurant Social Media Statistics 2026 - Cropink](https://cropink.com/restaurant-social-media-statistics)
- [Online Ordering Stats 2026 - Restolabs](https://www.restolabs.com/blog/online-ordering-statistics-every-restaurateur-should-know)
- [How Restaurants Use AI Chatbots 2026 - ChatMaxima](https://chatmaxima.com/blog/how-restaurants-use-ai-chatbots-2026/)

### Waitlist / Queue Management
- [10 Best Restaurant Waitlist Apps 2026 - Eatapp](https://restaurant.eatapp.co/blog/best-restaurant-waitlist-management-systems)
- [Yelp Waitlist Management](https://business.yelp.com/resources/articles/waitlist-management/?domain=restaurants)
- [Restaurant Waitlist App - Waitwhile](https://waitwhile.com/restaurant-waitlist/)

### Delivery Logistics
- [DoorDash Drive On-Demand](https://merchants.doordash.com/en-us/products/drive-on-demand)
- [DoorDash Drive API](https://developer.doordash.com/en-US/api/drive/)
- [DoorDash Drive Pricing](https://developer.doordash.com/en-US/docs/drive_classic/overview/pricing_payment/)
- [Toast Switches to Uber Direct - NRN](https://www.nrn.com/restaurant-technology/toast-switches-its-default-white-label-delivery-partner-from-doordash-to-uber)
- [KitchenHub Unified API](https://www.trykitchenhub.com/developer)

### Kitchen Operations
- [What is KDS - Quantic](https://getquantic.com/what-is-a-kds/)
- [86'd Item Management - Checkmate](https://support.itsacheckmate.com/hc/en-us/articles/8136678055963-Mark-Items-Modifiers-as-Sold-Out-86-d)
- [POS Integration for Real-Time Menu Sync - Bytes AI](https://trybytes.ai/blogs/pos-integration-real-time-menu-sync)

### Staff / Labor
- [7shifts - Restaurant Scheduling](https://www.7shifts.com/)
- [Best Restaurant Scheduling Software 2025](https://www.selectsoftwarereviews.com/buyer-guide/best-restaurant-scheduling-software)
- [Best Restaurant HR Software 2025 - Gusto](https://gusto.com/resources/best-restaurant-hr-software)

### Data & Analytics
- [Data Science for Restaurants 2025 - Toast](https://pos.toasttab.com/blog/on-the-line/data-science-for-restaurants)
- [Restaurant Data Analytics Guide - Restolabs](https://www.restolabs.com/blog/restaurant-data-analytics-guide)
- [Restaurant Analytics - Fishbowl](https://www.fishbowl.com/blog/restaurant-analytics)
- [Restaurant Analytics Metrics - WISK](https://www.wisk.ai/blog/restaurant-analytics-top-metrics-to-track-and-optimize-to-increase-profits)

### Accessibility & Compliance
- [2026 ADA Website Compliance Predictions - Accessible.org](https://accessible.org/2026-ada-website-compliance-lawsuits-ai/)
- [ADA Lawsuit Tracker - UsableNet](https://info.usablenet.com/ada-website-compliance-lawsuit-tracker)
- [2025 Mid-Year ADA Lawsuit Report - EcomBack](https://www.ecomback.com/ada-website-lawsuits-recap-report/2025-mid-year-ada-website-lawsuit-report)
- [ADA Requirement for Restaurants - accessiBe](https://accessibe.com/blog/knowledgebase/ada-compliance-for-restaurants)

### Emerging Tech
- [Cryptocurrency Adoption in Restaurants - Restaurant Technology News](https://restauranttechnologynews.com/2025/07/cryptocurrency-adoption-in-restaurants-gains-momentum-amid-growing-consumer-demand-and-operational-incentives/)
- [Emerging Restaurant Technologies 2026 - Flipdish](https://www.flipdish.com/us/resources/blog/emerging-restaurant-technologies)

### Customer Retention
- [Restaurant Customer Retention 2026 Guide - Bloom Intelligence](https://bloomintelligence.com/blog/restaurant-customer-retention-2026-guide)
- [Customer Loyalty Program Ideas 2025 - OptCulture](https://optculture.com/blogs/post/top-loyalty-rewards-programs-for-restaurants/)
- [Birthday Rewards Ideas 2025 - Antavo](https://antavo.com/blog/birthday-rewards-ideas/)
- [Cart Abandonment Rate Statistics 2026 - Baymard](https://baymard.com/lists/cart-abandonment-rate)

### Third-Party Marketplace
- [DoorDash Enters Reservation Wars - CNBC](https://www.cnbc.com/2026/02/25/doordash-resy-opentable-restaurant-reservation-wars.html)
- [How to Rank Higher on Delivery Apps - Deliverect](https://www.deliverect.com/en-us/blog/online-food-delivery/how-rank-higher-grubhub-doordash-uber-eats-guide-chain-restaurants)
- [Best Food Delivery Services 2025 - Toast](https://pos.toasttab.com/blog/on-the-line/best-food-delivery-services-2025)

### Payments
- [Restaurant Payment Trends 2026 - OneHubPOS](https://onehubpos.com/blog/restaurant-payment-trends-2026)
- [Restaurant Payment Processing 2025 - Merchant World](https://merchantw.com/restaurant-payment-processing-complete-guide-2025/)
- [BNPL FAQ 2026 - eMarketer](https://www.emarketer.com/content/faq-on-buy-now--pay-later--how-payment-trend-will-change-2026)

### Reputation Management
- [10 Best Restaurant Reputation Management Software 2026 - Chatmeter](https://www.chatmeter.com/resource/blog/best-restaurant-reputation-management-software/)
- [Restaurant Reputation Management 2026 - Bloom Intelligence](https://bloomintelligence.com/restaurant-reputation-management/)
- [Birdeye Pricing - Ampifire](https://ampifire.com/blog/birdeye-reputation-management-software-pricing-reviews-is-this-ai-tool-worth-it/)
- [Restaurant Review Monitoring - Birdeye](https://birdeye.com/blog/restaurant-review-monitoring/)
- [16 Best Restaurant Reputation Management Software - Momos](https://www.momos.com/blog/best-restaurant-reputation-management-software)

### Platform Comparisons
- [BentoBox vs ChowNow - GetApp](https://www.getapp.com/retail-consumer-services-software/a/bentobox/compare/chownow/)
- [Best Restaurant Online Ordering Systems 2025 - UpMenu](https://www.upmenu.com/blog/best-restaurant-online-ordering-system/)
- [BentoBox vs Toast - Owner.com](https://www.owner.com/compare/bentobox-vs-toast)

### Catering
- [Catering Online Ordering System Features - Revolution Ordering](https://www.revolutionordering.com/blog/catering-online-ordering-system/)
- [Catering Software Solutions 2025 - Swipesum](https://www.swipesum.com/insights/the-ultimate-guide-to-catering-software-solutions)
