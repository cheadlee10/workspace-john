# Production Outreach Pack - Top Leads (2026-03-01)

## 1) Screenshot Proof Process (Pre-Send Evidence SOP)

### Goal
Capture auditable proof that each lead is a true "no-site / weak-presence" target before first touch.

### Folder + filename standard
- Root: `crm/proof/2026-03-01/`
- Per lead folder: `crm/proof/2026-03-01/<lead_id>_<business_slug>/`
- Required screenshots:
  1. `01-source-listing.png` (Yelp/Craigslist listing visible)
  2. `02-no-website-signal.png` (no website button/link visible)
  3. `03-google-brand-search.png` (brand + city search results)
  4. `04-contact-proof.png` (phone/email visible in source listing)

### Capture workflow (repeat per lead)
1. Open source listing from CRM notes (Yelp/Craigslist).
2. Capture listing page with business name + category + location.
3. Capture explicit no-website signal (no site button, unclaimed listing, or missing site field).
4. Run Google search query: `"<Business Name>" "<City>"` and capture first result page.
5. Capture contact channel evidence (phone/email presence).
6. Save all files to lead folder using exact names above.
7. Mark lead proof status in CRM notes: `proof_complete=true`.

### Pass/Fail rule
- **PASS:** all 4 screenshots present and readable.
- **FAIL/HOLD:** missing screenshot, conflicting website evidence, or no direct channel.

---

## 2) Email Drafts (Proven Frameworks)

> Note: current top queue is phone/SMS-ready first. These drafts are for leads where email becomes available during enrichment.

### A) PAS Framework (Problem-Agitate-Solution) - Trades/Contractors
**Subject options:**
- `Quick win for {{business_name}} lead flow`
- `You're likely losing direct jobs from listing traffic`

**Body:**
Hi {{first_name_or_team}},

I found {{business_name}} while reviewing {{city}} {{service_type}} providers.

Most companies in your position are getting views from Yelp/Google, but losing direct jobs because there isn't a fast website path to quote requests.

We fix that with a conversion-focused site setup (mobile-first, quote form, click-to-call) with **$0 down** and monthly management.

If helpful, I can send a 1-page sample mockup built specifically for {{business_name}}.

- John
NorthStar Synergy

### B) AIDA Framework (Attention-Interest-Desire-Action) - Landscaping/Handyman
**Subject options:**
- `Sample page idea for {{business_name}}`
- `Turn listing traffic into booked jobs`

**Body:**
Hi {{first_name_or_team}},

**Quick idea:** {{business_name}} can convert more local search traffic with a simple direct-booking website.

We build pages designed for home-service buyers (before/after visuals, trust blocks, fast quote CTA, click-to-call).

The model is easy: **$0 upfront**, then monthly management so updates and lead flow stay handled.

Want me to send a personalized sample layout for {{business_name}}?

- John
NorthStar Synergy

### C) "Permission-Based" Soft Ask (Low-friction first touch)
**Subject options:**
- `Can I send one idea for {{business_name}}?`
- `Worth a 2-minute look?`

**Body:**
Hi {{first_name_or_team}},

I noticed {{business_name}} while researching {{service_type}} providers in {{city}}.

I put together a simple idea that could help you get more direct calls without relying as much on platform traffic.

Open to me sending a quick mockup and 2-minute breakdown?

- John
NorthStar Synergy

---

## 3) Send-Readiness Checklist (Hard Gate Before Send)

## 3.1 Universal pre-send checks
- [ ] Business name matches source listing exactly.
- [ ] Lead ID exists in `leads.jsonl`.
- [ ] Phone/email channel exists and is valid.
- [ ] No contradictory website found in Google check screenshot.
- [ ] Script/email template matches service vertical.
- [ ] Personalization fields resolved (no raw `{{tokens}}` left).
- [ ] CTA is single-action (reply/call/send mockup).
- [ ] Follow-up dates entered (24h / 72h / 7d).
- [ ] Proof screenshots complete (4/4).
- [ ] Compliance: no false claims, no spammy links, no sensitive data.

## 3.2 Link/field validation status for top 20 queue
Validation source: `leads.jsonl` cross-check on 2026-03-01.

| Lead ID | Business | Phone | phone_validation | can_call | can_sms | outreach_usable | Status |
|---|---|---|---|---|---|---|---|
| nosite-037 | Regal Roofing & Contracting | (206) 784-2689 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-068 | Quality Construction & Roofing | (832) 282-6486 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-109 | San Diego Heating and Cooling | (619) 443-2665 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-001 | Perez Landscaping | (206) 602-9766 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-004 | Northwest Landscape and Patio Bellevue | (425) 390-4959 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-005 | Envision Landscaping | (206) 679-8525 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-033 | A A Landscaping | (206) 251-8199 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-061 | JV Pool Services | (214) 929-4278 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-002 | Ligaya Landscaping | (206) 351-7402 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-003 | Greenscapes Landscaping | (206) 802-8186 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-116 | Bachman Lawn Care | (816) 550-8823 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-101 | Cedar Fencing Plus | (503) 244-6216 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-102 | Austin's Custom Fencing | (503) 762-6010 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-115 | Ace Fencing | (702) 568-8330 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-023 | Handy-Den | (253) 230-2928 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-055 | Tony Handyman Survives | (480) 740-7144 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-056 | Rick The Handyman | (602) 200-4521 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-057 | Manny Handyman Svcs | (480) 450-8097 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-006 | Home-Crafters-Handyman | (206) 235-6574 | valid_us_format | PASS | PASS | PASS | READY |
| nosite-007 | Half-Price Handyman | (425) 269-8545 | valid_us_format | PASS | PASS | PASS | READY |

### 3.3 Final send gate
- **All 20 leads:** channel-valid and outreach-usable PASS
- **Email channel for this batch:** not primary (phone/SMS first)
- **Go/No-Go:** **GO** for call/SMS sequence; email drafts are prepared for enrichment-based follow-up


Required proof block for every outreach email:
Live preview: {{live_url}}
Screenshot: {{screenshot_url}}

