# Perfect Email System — V2 (Research + QA Locked)

## 1) Non-negotiable standards before any send
- Subject line: **30–45 chars** (mobile visibility)
- Preheader: **complements subject** (no repetition)
- Copy: **≤120 words** before CTA
- Structure: **1 promise + 3 proof bullets + 1 CTA**
- CTA: **single ask**, button tap target **44px+**
- Visual: 600px table layout, brand-safe contrast, dark-mode defensive styles
- Deliverability: from-domain auth check (SPF/DKIM/DMARC) + clean links + no spam phrasing

## 2) Research-backed principles used
- Concise + scannable layout improves usability and response behavior (NN/g scanability findings).
- Subject + preheader pairing improves open intent (HubSpot guidance).
- Mobile-thumb CTA sizing (44px+) prevents friction on phones (Litmus/Mailchimp conventions).
- Dark mode behavior varies by client; design for safe fallbacks rather than forcing colors (Litmus).
- Domain authentication directly affects inbox placement (SendGrid support guidance).

## 3) High-performance subject formulas
1. `[City] leads are searching for [Business]`
2. `Built this for [Business] (live)`
3. `A cleaner site for [Business] this week`
4. `Your next 3 booked calls from web`
5. `Quick win for [Business] in [City]`
6. `Can I send your live homepage concept?`
7. `[Business]: mobile page upgrade idea`
8. `A faster, sharper page for [Business]`

## 4) Preheader formulas (pairing)
- `Mobile-first layout + trust sections tailored to your services.`
- `I already mocked this to convert local searches into calls.`
- `One clear path: visitor → quote request in under 30 seconds.`

## 5) Copy formula (used in every send)
- Line 1: hyper-local observation
- Line 2: revenue leak in plain English
- Line 3: what was built (or proposed) + time-to-value
- 3 bullets: concrete outcomes
- CTA: one binary question

## 6) Aesthetic rules (professional + modern)
- Navy/gold gradient hero, clean white body, light-gray card sections
- High whitespace, short line lengths, visual hierarchy by weight not clutter
- No gimmicky animation dependencies; “movement” via gradient depth + layered modules
- Button style: bulletproof table button + clear border for dark-mode resilience

## 7) QA gate (hard stop if any fail)
- [ ] Personalization token check (name/business/city)
- [ ] Subject length 30–45 chars
- [ ] Preheader unique + supporting
- [ ] Body scannable (short paragraphs + bullets)
- [ ] Exactly one CTA
- [ ] All links resolve + UTM clean
- [ ] Spam-risk language scrubbed
- [ ] Mobile render check + dark-mode spot check
- [ ] Plain-text fallback generated
- [ ] Sender auth verified (SPF/DKIM/DMARC)

## 8) Send policy
No campaign launches until every email variant clears Section 7.
