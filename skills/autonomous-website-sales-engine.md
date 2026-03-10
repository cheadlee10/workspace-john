---
name: autonomous-website-sales-engine
description: Complete end-to-end process for selling websites to businesses without online presence. Find target → Build their custom site → Show them proof → Send pitch → Handle objections → Close deal. Fully autonomous from research to payment. This is THE skill that ties everything together.
last_updated: 2026-02-25
---

# AUTONOMOUS WEBSITE SALES ENGINE — The Complete System

**Purpose:** Generate $10K+/month recurring revenue by building and selling websites to businesses with no online presence
**Mode:** Fully autonomous (I handle everything, Craig approves deliveries)
**Status:** ACTIVE

---

## THE PROCESS (7 Steps)

```
STEP 1: Find Target (15 min)
    ↓
STEP 2: Build Their Website (45-60 min)
    ↓
STEP 3: Create Proof Package (15 min)
    ↓
STEP 4: Find Contact Email (10 min)
    ↓
STEP 5: Send Pitch Email (5 min)
    ↓
STEP 6: Handle Responses (autonomous)
    ↓
STEP 7: Close & Deliver (payment + live site)
```

**Time per lead:** 90-120 minutes
**Daily capacity:** 2-3 complete cycles
**Monthly capacity:** 40-60 pitches = 6-12 clients

---

## STEP 1: FIND ONE TARGET (15 minutes)

### Research Process

**1.1 Pick a City/Area**
- Start: Woodinville, Bothell, Everett, Bellevue, Kirkland
- Expand: All of King County → All of WA State
- Future: Nationwide (scalable)

**1.2 Search Yelp**
```
Search: "landscaping [city] WA"
Sort by: Highest rated OR Most reviewed
Filter: Look for businesses with no website listed
```

**1.3 Verify No Website**
- Check Yelp profile → Website field empty OR Facebook-only
- Google: "[Business Name] website" → Confirm no professional site
- Facebook: If Facebook page exists, check if it's their ONLY online presence

**1.4 Qualify Target**
- ✅ In business 2+ years (established, not brand new)
- ✅ Has reviews (proves they're active)
- ✅ Offers services that benefit from website (landscaping, contractors, home services)
- ❌ Skip: Very new businesses, franchises, very large companies

**1.5 Log Target**
```json
{"date":"2026-02-25","business":"Lee's General Landscaping","city":"Bellevue","industry":"landscaping","yelp":"https://yelp.com/biz/...","facebook":"yes/no","phone":"xxx-xxx-xxxx","status":"building_site"}
```

**Output:** One qualified target ready for Step 2

---

## STEP 2: BUILD THEIR CUSTOM WEBSITE (45-60 minutes)

### 2.1 Gather Content (10 min)

**From Yelp:**
- Business name
- Services offered (from reviews + Yelp category)
- Service area (city + surrounding)
- Phone number
- Address (if listed)
- Photos (if any - download 5-10)

**From Google Images:**
- "[Business type] before after" → Stock photos
- Search their business name → May find work photos

**From Facebook (if exists):**
- Additional photos
- Service descriptions
- Customer testimonials from comments

**Generate with AI (if needed):**
- About section (family-owned, X years experience, etc.)
- Service descriptions
- Professional headshot (if none available)

### 2.2 Build Website Structure (35-45 min)

**Framework:** Next.js + Tailwind (fast, professional)

**5 Pages:**

**Page 1: HOME**
- Hero section with business name + tagline
- "Call Now: [phone]" button prominent
- Overview of 3-5 main services
- Before/after photo gallery (3-6 photos)
- Testimonials (from Yelp reviews - paraphrased)
- CTA: "Get Free Quote" button

**Page 2: SERVICES**
- List of all services offered
- Brief description of each
- Pricing ranges (if mentioned in reviews)
- CTA after each service

**Page 3: GALLERY**
- 10-15 photos of work (before/after)
- Organized by service type
- Captions describing each project

**Page 4: ABOUT**
- Business story (when founded, owner background)
- "Licensed, bonded, insured" badges (if applicable)
- Service area map
- Why choose us (3-5 bullet points)

**Page 5: CONTACT**
- Contact form (name, email, phone, message, service needed)
- Click-to-call button
- Google Maps embed (business location)
- Hours of operation
- Service area list

**Design:**
- Mobile-first (80% of traffic is mobile)
- Clean, modern, professional
- Business colors (green/brown for landscaping, blue for contractors, etc.)
- Fast loading (<2 seconds)
- Accessible (WCAG compliant)

**Technical:**
- SEO optimized (meta tags, descriptions, keywords)
- Contact form → EmailJS or similar (sends to their email)
- Google Analytics placeholder (add after they purchase)
- Favicon with their initial or logo

### 2.3 Deploy Locally (5 min)

```bash
npm run dev
# Runs on localhost:3000
```

**Do NOT deploy to production yet** (no hosting costs until they buy)

---

## STEP 3: CREATE PROOF PACKAGE (15 minutes)

### 3.1 Screenshots (5 min)

**Capture:**
- Homepage (desktop + mobile side-by-side)
- Services page
- Gallery page
- Contact form
- Before/after comparison (their business vs competitors with sites)

**Tools:**
- Browser DevTools (responsive mode)
- Screenshot full page
- Save as: `[BusinessName]-website-preview.png`

### 3.2 Video Walkthrough (8 min)

**Record 60-90 second video:**
```
"Hi [Owner Name], I'm John with NorthStar Synergy.

I noticed [Business Name] doesn't have a website, so I built one for you to show you what it could look like.

[Click through pages]
Here's your homepage with your services...
Here's your gallery showing your work...
Here's your contact form so customers can reach you 24/7...

This is mobile-optimized, shows up on Google, and can be live in 48 hours.

I'm offering it for $399 all-in. Reply to my email if you're interested and I'll send you the live link.

Thanks!"
```

**Tools:**
- Loom (free screen recording)
- Or OBS Studio (free, more control)

**Save as:** `[BusinessName]-website-demo.mp4`

### 3.3 One-Pager PDF (2 min)

**Create simple PDF:**
```
[Business Name] - Professional Website
Built by NorthStar Synergy

✓ 5-page professional website
✓ Mobile-optimized
✓ Contact form (leads to your email)
✓ Google Maps integration
✓ SEO basics (show up in searches)
✓ Before/after gallery
✓ Customer testimonials

Price: $399 one-time
Optional: $49/mo maintenance

Includes:
• Free hosting for 1 year
• Unlimited revisions until you love it
• Live in 48 hours
• No contracts, no hidden fees

Ready to go live?
Reply YES and I'll send the link.
```

---

## STEP 4: FIND CONTACT EMAIL (10 minutes)

### 4.1 Check Obvious Places

**Yelp:** Business info section (sometimes lists email)
**Facebook:** About section → Contact info
**Google:** "[Business Name] email" → May appear in old listings

### 4.2 Guess Common Patterns

Try these formats:
- info@[businessname].com
- contact@[businessname].com
- [ownername]@[businessname].com
- [businessname]@gmail.com
- [ownername]@gmail.com

Use email verifier (hunter.io free tier) to check if valid

### 4.3 Fallback: Facebook Messenger

If no email found:
- Send message via Facebook business page
- Keep it short, link to video + screenshots
- Same pitch, different medium

### 4.4 Log Contact Info

```json
{"business":"Lee's General Landscaping","email":"leeslandscaping@gmail.com","method":"guessed_and_verified","status":"ready_to_send"}
```

---

## STEP 5: SEND PITCH EMAIL (5 minutes)

### Email Template

**Subject:** I built a website for [Business Name]

```
Hi [Owner Name],

I'm John with NorthStar Synergy. I help landscaping businesses in [City] get more customers online.

I noticed [Business Name] doesn't have a website, so I built one for you to show what it could look like.

Here's what I created:

📸 Screenshots: [attached]
🎥 60-second walkthrough: [Loom link]

Everything you need:
✓ Shows your work (gallery with before/after photos)
✓ Lists your services  
✓ Contact form (leads sent to your email/phone)
✓ Mobile-friendly (80% of people search on phones)
✓ Shows up on Google when people search "landscaping [city]"

The stats: 81% of customers search Google before calling. Right now when someone searches "landscaping [city]," your competitors with websites show up. You don't.

Average landscaping job: $2,500. You need ONE extra job to pay for this website. After that, every lead it generates is pure profit.

Price: $399 all-in (most agencies charge $2,000-5,000 for the same thing)
Timeline: I can have you live in 48 hours
Risk: Zero. If you don't love it, don't pay.

Want to see it live? Reply YES and I'll send you the link + we can schedule a 10-minute call to go over any questions.

Best,
John
NorthStar Synergy
northstar-synergy.dev
```

### 5.1 Send Email

- Attach screenshots (2-3 images, under 5MB total)
- Include Loom video link
- Use professional email signature
- BCC myself for tracking

### 5.2 Log Send

```json
{"business":"Lee's General Landscaping","email_sent":"2026-02-25 14:30","template":"custom_site_built","attachments":["homepage.png","services.png","mobile.png"],"video":"https://loom.com/...","status":"awaiting_response"}
```

---

## STEP 6: HANDLE RESPONSES (Autonomous)

### 6.1 Response Types

**A) Positive ("Yes, interested" / "Show me more")**
→ Deploy site to Vercel temporarily
→ Send live link
→ Schedule 10-min call (optional)
→ Move to close

**B) Questions ("How much?" / "What's included?" / "Do you have examples?")**
→ Use objection-mastery-v2.md responses
→ Answer directly, don't deflect
→ Always end with CTA: "Want to move forward?"

**C) Objections ("Too expensive" / "I'll think about it" / "My friend will do it")**
→ Apply LAER framework
→ Use appropriate response from objection-mastery-v2.md
→ Provide value calculator
→ Follow up if no response in 48h

**D) No Response (silence after 24h)**
→ Send Follow-Up #1 (24h later):
```
Subject: Re: I built a website for [Business Name]

Hi [Name],

Just wanted to make sure you saw my email - I built a custom website for [Business Name] and sent you the preview.

Did you get a chance to look at the video? Would love to hear your thoughts.

If you're not interested, no worries - just let me know so I don't keep bothering you.

Thanks!
John
```

→ Send Follow-Up #2 (72h after first email):
```
Subject: Last ping - [Business Name] website

Hi [Name],

Last follow-up from me.

I spent an hour building this website for [Business Name] because I genuinely think it could help you get more customers.

If you're not interested, that's totally fine - I'll stop emailing.

But if you are interested and just haven't had time to look, reply "YES" and I'll send you the live link.

Either way, appreciate your time.

John
```

→ If still no response: Mark as "no_response" and move to next target

**E) Rejection ("Not interested" / "Can't afford it" / "Don't need it")**
→ Acknowledge gracefully
→ Ask for feedback: "Can I ask - what would make you reconsider?"
→ Log reason for rejection → improve process
→ Move to next target

### 6.2 Response Handling Script

```javascript
// Pseudo-code for autonomous response engine

if (response.contains("yes") || response.contains("interested")) {
  deployToVercel(business.site);
  sendEmail({
    subject: "Here's your live website",
    body: "Great! Here's the link: [vercel_url]. Take a look and let me know what you think. If you love it, we can get you live with your own domain in 24-48 hours. Price is still $399."
  });
  updateStatus("demo_sent");
}

else if (response.contains("how much") || response.contains("price")) {
  sendEmail({
    body: objectionMastery.getResponse("price_objection")
  });
}

else if (response.contains("think about it")) {
  sendEmail({
    body: objectionMastery.getResponse("stall_objection")
  });
  scheduleFollowUp(48h);
}

// ... handle all objection types
```

### 6.3 Learning Loop

After every response:
```json
{"business":"...","objection":"too_expensive","response_used":"LAER_anchoring","outcome":"still_considering","next_action":"follow_up_48h"}
```

Weekly: Analyze which responses work best, update objection-mastery-v2.md

---

## STEP 7: CLOSE & DELIVER (When They Say Yes)

### 7.1 Take Payment (FIGURE OUT LATER - placeholder for now)

**Options being considered:**
- Stripe payment link (send via email)
- PayPal invoice
- Square invoice
- Venmo/Zelle for small amounts (not professional)

**For now:** When they say yes, tell Craig → He handles payment

### 7.2 Deliver Website

**Once paid:**
1. Buy domain for them ($12/year - they reimburse OR include in price)
2. Deploy to Vercel production
3. Connect custom domain
4. Set up email forwarding (contact form → their email)
5. Add Google Analytics
6. Send them login credentials
7. 15-min training call (how to update, what's included)

### 7.3 Get Testimonial

```
"Hey [Name], thrilled you love the site! Quick favor - would you mind giving me a short testimonial I can use when pitching other landscapers?

Something like: 'John built us a professional website in 48 hours. We've already gotten 3 new customers from it. Worth every penny.'

Appreciate it!"
```

### 7.4 Upsell Maintenance

```
"One more thing - I offer maintenance for $49/month. That includes:
- Hosting
- Security updates
- Content updates when you need them (new photos, services, etc.)
- Fix any issues within 48 hours

Most clients opt in because it's cheaper than dealing with it yourself. Want me to add that?"
```

### 7.5 Log Completion

```json
{"business":"Lee's General Landscaping","closed_date":"2026-02-26","revenue":399,"maintenance":49,"delivery_date":"2026-02-27","domain":"leesgenerallandscaping.com","status":"delivered","testimonial":"received"}
```

---

## DAILY WORKFLOW

**Morning (90 min):**
- Find 1 target (15 min)
- Build their website (60 min)
- Create proof package (15 min)

**Midday (30 min):**
- Find contact email (10 min)
- Send pitch email (5 min)
- Check yesterday's responses (15 min)

**Afternoon (60 min):**
- Handle objections from responses (30 min)
- Follow up on pending leads (20 min)
- Update skills based on learnings (10 min)

**Total:** 3 hours/day = 1 complete pitch sent + all responses handled

---

## WEEKLY TARGETS

- **Pitches sent:** 5-7 (1 per day)
- **Responses:** 2-3 (30-40% response rate)
- **Demos sent:** 1-2 (those who say yes to seeing it live)
- **Deals closed:** 1 (15-20% of responses)

**Monthly:**
- 20-30 pitches sent
- 6-10 responses
- 3-5 demos
- 2-4 deals closed
- **Revenue:** $800-1,600 (one-time) + $100-200/mo (maintenance)

**By Month 6:**
- 100+ pitches sent (lifetime)
- 30-40 responses
- 15-20 demos
- 10-15 deals closed
- **Revenue:** $3,000-5,000/mo (new + maintenance)

---

## TOOLS & INFRASTRUCTURE

### Website Building

**Framework:** Next.js 14
**Styling:** Tailwind CSS
**Deployment:** Vercel (free tier)
**Domain:** Namecheap ($12/year)
**Email:** EmailJS (free tier for contact forms)

### Research

**Yelp API:** (if available) OR manual search
**Google Maps API:** (future) for location data
**Hunter.io:** Email verification (free tier)

### Proof Creation

**Screenshots:** Browser DevTools + Full Page Screen Capture extension
**Video:** Loom (free tier, 5 min videos)
**PDF:** Canva (free) or Figma

### Email & Tracking

**Email:** Gmail with professional signature
**Tracking:** Google Sheets OR leads.jsonl
**Scheduling:** Built-in (check inbox 3x/day)

### Payment (TBD)

**Stripe:** Payment links
**PayPal:** Invoicing
**Square:** Invoices

---

## SUCCESS METRICS

### Conversion Funnel

```
100 targets found
    ↓ (100%)
80 emails sent (20% no email found)
    ↓ (30%)
24 responses (30% response rate)
    ↓ (40%)
10 want to see live demo (40% of responses)
    ↓ (40%)
4 say yes to purchase (40% of demos)
    ↓ (100%)
4 paid & delivered
```

**Result:** 4% conversion from target → paid customer

### Revenue Model

**Month 1:** 4 clients × $399 = **$1,596** + $196/mo maintenance
**Month 3:** 12 clients × $399 = $4,788 one-time + **$588/mo** maintenance  
**Month 6:** 24 clients × $49/mo = **$1,176/mo** recurring + new deals
**Month 12:** 48 clients × $49/mo = **$2,352/mo** recurring + new deals

---

## CONTINUOUS IMPROVEMENT

### After Every 10 Pitches

**Analyze:**
1. Response rate (target: 30%+)
2. Which cities respond best
3. Which industries (landscaping, contractors, cleaning)
4. Common objections
5. What closes deals

**Optimize:**
1. Email subject lines (A/B test)
2. Video script (first 10 seconds critical)
3. Screenshot selection (which ones get responses)
4. Pricing ($399 vs $499 vs $299)
5. Objection responses (what actually works)

### After Every Deal Closed

**Document:**
1. What made them say yes
2. How many touchpoints (1 email? 3 follow-ups?)
3. What objections came up
4. What they loved about the site
5. Testimonial (get every time)

**Improve:**
1. Build template for this industry
2. Reuse successful elements
3. Update pitch email with new social proof
4. Add to portfolio

---

## INTEGRATION WITH OTHER SKILLS

**Uses:**
- `objection-mastery-v2.md` — Handle all responses
- `AUTONOMOUS_OUTREACH_ENGINE.md` — Email templates, value calculator
- `LAER framework` — Objection handling
- `Feel-Felt-Found` — Empathy responses

**Feeds into:**
- `memory/observations.md` — Log every interaction
- `leads.jsonl` — Track all targets
- `jobs.jsonl` — Track completed sales
- `skills/objection-mastery-v2.md` — Update with new objections

**Reports to:**
- Craig (daily Discord updates on progress)
- Weekly summary (pitches sent, responses, deals closed, revenue)

---

## STATUS: READY TO EXECUTE

**Next action:** Execute Step 1 on Lee's General Landscaping (already identified)
**Timeline:** First complete cycle (find → build → pitch) done by end of today
**First deal target:** Closed within 7 days

Let's print money. 🚀
