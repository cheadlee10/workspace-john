# V2 Variant Spec — Local Service WOW + Conversion Flow

## 1) Experience Positioning
**Theme:** "Premium local operator" — modern, trustworthy, fast-response.

- Visual tone: dark-to-light contrast, glassy cards, bold trust badges
- Conversion tone: speed + reliability + local proof
- Mobile behavior: thumb-first, two-tap lead path

## 2) Page Flow (Home / Core Service)

1. **Hero (0–600px viewport)**
   - Headline formula: Result + Service + Location
   - Subhead: response-time promise + trust claim
   - Primary CTA: Get Fast Quote
   - Secondary CTA: Call Now
   - Trust chips: rating, licensed/insured, response SLA

2. **Proof Strip**
   - Star rating count
   - jobs completed
   - years in business
   - warranty badge

3. **Services Outcome Grid**
   - 3–6 cards: service + customer outcome + ETA

4. **Before/After Impact Block**
   - side-by-side visual panel + KPI deltas

5. **Process Timeline (4 steps)**
   - Request → Confirm → Deliver → Follow-up

6. **Offer + Risk Reversal**
   - seasonal offer + guarantee language

7. **FAQ (objection handling)**
   - price, schedule, service area, warranty, payment options

8. **Final CTA Hub**
   - short form + click-to-call + service area list

## 3) Conversion Architecture
- **Primary action:** form submit (book estimate)
- **Secondary action:** click-to-call
- **Assist action:** SMS callback request

### Lead Capture Logic
- Above fold: CTA buttons only
- Mid-page: single-line callback capture (name + phone)
- Final block: full lead form (name, phone, email, service, details)

### Trust Injection Points
- Header utility bar
- Hero badge stack
- Pre-form guarantee note
- Footer compliance/legal

## 4) Mobile WOW Rules
- Sticky bottom CTA bar (call + quote)
- 48px+ tap targets
- Max 2 CTAs visible per section
- Form fields use numeric keypad for phone
- Service cards become horizontal snap carousel on <768px

## 5) Niche Overrides

### Landscaping
- Accent: green spectrum
- Hero media: transformation collage
- Offer: seasonal cleanup / maintenance bundle

### Roofing
- Accent: orange/amber urgency
- Hero media: crew + roofline + storm response badge
- Offer: free inspection + insurance support

### HVAC
- Accent: cool blue trust
- Hero media: technician + thermostat closeup
- Offer: same-day diagnostic + membership plan

### Pool Service
- Accent: aqua/cyan
- Hero media: water clarity before/after
- Offer: weekly route discount

### Pest Control
- Accent: lime + deep slate
- Hero media: family-safe treatment narrative
- Offer: first-treatment guarantee

## 6) Performance Targets
- Lighthouse mobile performance >= 88
- LCP < 2.3s on 4G profile
- CLS < 0.08
- INP < 180ms
- Initial CSS <= 70KB
- Above-the-fold image <= 180KB webp

## 7) Content Constraints
- Headlines <= 12 words
- Paragraphs <= 2 sentences
- Every section ends with action affordance
- No unsubstantiated superlatives
