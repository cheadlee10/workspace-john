# NorthStar Synergy — Quality Gate System for Proposals & Outreach
**Version 1.0 — March 2026**
**Purpose:** Enforce consistent quality on all outbound communications before send.

---

## Overview

Every proposal, cold email, follow-up, and client-facing asset MUST pass this quality gate before delivery. No exceptions.

**Philosophy:** A single bad email damages brand reputation and wastes the lead. The 2-minute QA check prevents hours of damage control.

---

# SECTION 1: QUALITY GATE CHECKLIST

## Category A: CLARITY (Weight: 30%)

| ID | Check | Pass Criteria | Fail Examples |
|----|-------|---------------|---------------|
| A1 | **Single clear purpose** | Email has ONE goal (reply, click, schedule). Reader knows exactly what to do. | Multiple CTAs, unclear ask, "let me know your thoughts" |
| A2 | **First sentence hook** | Opens with prospect-specific observation. No generic AI phrases. | "I hope this email finds you well", "I'd like to introduce myself" |
| A3 | **Readable in 15 seconds** | Body ≤100 words. No scrolling required on mobile. | Wall of text, feature lists, company history |
| A4 | **Grade-level ≤8** | Simple language. No jargon unless prospect's industry demands it. | "Leverage synergies", "optimize value proposition", "enterprise-grade solutions" |
| A5 | **One idea per sentence** | Each sentence makes one point. No run-ons. | Compound sentences with 3+ clauses |

## Category B: OFFER FIT (Weight: 25%)

| ID | Check | Pass Criteria | Fail Examples |
|----|-------|---------------|---------------|
| B1 | **Prospect research verified** | At least ONE specific, verifiable fact about their business. | Generic observation that fits any business |
| B2 | **Problem-solution alignment** | Problem stated relates to service offered. No bait-and-switch. | Mentioning SEO problem, pitching brochure site |
| B3 | **Industry/category match** | Template matches their business type (contractor, restaurant, retail, etc.) | Using "plumber" template for landscaper |
| B4 | **Geographic accuracy** | City, region, market area correct. | Wrong city, misspelled location |
| B5 | **Relevance to their stage** | Pitch matches their current situation (no website vs. outdated vs. bad SEO). | Pitching redesign to business with no site |

## Category C: RISK CHECKS (Weight: 30%)

| ID | Check | Pass Criteria | Fail Examples |
|----|-------|---------------|---------------|
| C1 | **No pricing in first touch** | Email #1 contains zero dollar amounts. | "$299/mo", "starting at $99", any price |
| C2 | **CTA is soft/low-friction** | Question format, no calendar links, no hard sell. | "Book a call", "Schedule now", "Reply YES" |
| C3 | **Claims are provable** | Any stated result has backing (real client, real number). | "We helped hundreds of businesses" (unverifiable) |
| C4 | **No spam trigger words** | Avoid: FREE, URGENT, ACT NOW, LIMITED TIME, GUARANTEE, CLICK HERE. | "Free consultation", "Act now before..." |
| C5 | **Compliance elements present** | Physical address OR opt-out method included (CAN-SPAM). | No address, no way to opt out |
| C6 | **Sender identity professional** | Sent from @northstarsynergy.com, not gmail. Real name in From field. | gmail.com, info@ with no name |
| C7 | **Visual proof included** | Link to screenshot, preview, or portfolio piece. Link tested & working. | No visual, broken link, shortened URL |

## Category D: FORMATTING & TECHNICAL (Weight: 15%)

| ID | Check | Pass Criteria | Fail Examples |
|----|-------|---------------|---------------|
| D1 | **Zero encoding errors** | No "?" or "�" or garbled characters. All apostrophes render correctly. | "I?ll", "won?t", "–" showing as "?" |
| D2 | **Links functional** | Every URL clicked and confirmed loading. | 404, redirect loops, typo in URL |
| D3 | **Name/company spelled correctly** | Exact match to prospect's actual usage. | "John" when it's "Jon", "CompanyName LLC" when it's "Company Name" |
| D4 | **No placeholder text remaining** | Zero {{variables}} or [FILL IN] left in email. | "Hi {{FirstName}}", "[CITY]", "{{LINK}}" |
| D5 | **Plain text format** | No HTML formatting in cold first-touch emails. | Bold, colors, embedded images |
| D6 | **Signature complete** | Name, Title, Company, Phone number. | Missing phone, missing company name |
| D7 | **Follow-up sequence staged** | Day 3, Day 10, Day 17 emails written and scheduled. | Standalone email with no follow-up plan |

---

# SECTION 2: PASS/FAIL RUBRIC

## Scoring Method

Each check is scored:
- **PASS (1 point):** Fully meets criteria
- **FAIL (0 points):** Does not meet criteria
- **N/A:** Not applicable to this email type (excluded from calculation)

## Category Weights

| Category | Weight | Max Points |
|----------|--------|------------|
| A: Clarity | 30% | 5 |
| B: Offer Fit | 25% | 5 |
| C: Risk Checks | 30% | 7 |
| D: Formatting | 15% | 7 |

## Final Score Calculation

```
Final Score = (A_score/A_max × 0.30) + (B_score/B_max × 0.25) + 
              (C_score/C_max × 0.30) + (D_score/D_max × 0.15)
```

## Pass/Fail Thresholds

| Score | Verdict | Action |
|-------|---------|--------|
| **≥90%** | ✅ APPROVED | Send immediately |
| **80-89%** | ⚠️ CONDITIONAL | Fix flagged items, re-check, then send |
| **70-79%** | ❌ REVISE | Major revision required. Do not send. |
| **<70%** | 🛑 REJECT | Rewrite from scratch using templates |

## Critical Failures (Automatic Reject — Any ONE = FAIL)

Regardless of total score, these items cause automatic rejection:

| ID | Critical Failure | Why |
|----|-----------------|-----|
| D1 | Encoding errors present | Looks like spam/bot, destroys credibility |
| D4 | Placeholder text remaining | Obvious automation failure, unprofessional |
| C1 | Pricing in first-touch email | Pre-qualifies rejection before value shown |
| D3 | Name/company misspelled | Proves no real research, instant delete |
| D2 | Broken links | Prospect can't see proof, wasted opportunity |
| B4 | Wrong geographic info | Proves mass-blast, not personalized outreach |

---

# SECTION 3: CORRECTION WORKFLOW

## Pre-Send QA Process (Required for ALL Outbound)

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: DRAFT COMPLETE                                     │
│  Email written with all personalization filled in           │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: ENCODING WASH                                      │
│  Paste through Notepad/plain-text editor → back to tool     │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: CHECKLIST SCAN (Categories A-D)                    │
│  Go through each item. Mark PASS/FAIL. Calculate score.     │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: CRITICAL FAILURE CHECK                             │
│  Any critical failure? → STOP. Fix before proceeding.       │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: SCORE EVALUATION                                   │
│  ≥90%: SEND     80-89%: FIX & RESCAN     <80%: REWRITE     │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: LINK CLICK-TEST                                    │
│  Open every link in browser. Confirm loads correctly.       │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: SEND + LOG                                         │
│  Send email. Record in leads.jsonl with QA score.           │
└─────────────────────────────────────────────────────────────┘
```

## Fix Protocols by Failure Type

### Encoding Errors (D1)
1. Copy entire email body
2. Open Notepad (Win) or TextEdit set to Plain Text (Mac)
3. Paste → Select All → Copy
4. Paste back into email tool
5. Visual scan for "?" characters
6. If still present: manually retype the affected words

### Placeholder Text (D4)
1. Search email for: `{{`, `}}`, `[`, `]`, `FILL`, `INSERT`, `XXX`
2. For each placeholder found:
   - Research the actual value
   - Replace with verified data
   - If data unavailable: remove sentence or choose different template
3. Re-scan after all replacements

### Broken Links (D2)
1. Open link in new browser tab (Incognito mode)
2. If 404/error:
   - Check for typos in URL
   - Confirm file/page exists on server
   - If preview site: regenerate or use different proof asset
3. Replace with working link
4. Re-test before proceeding

### Name/Company Misspelling (D3)
1. Navigate to prospect's official website or Google Business listing
2. Copy exact spelling of name and company
3. Search-replace all instances in email
4. Double-check subject line (often missed)

### Pricing in First Touch (C1)
1. Delete all dollar amounts and pricing references
2. If email relies on price as hook: rewrite using value/outcome hook instead
3. Save pricing for follow-up #2 or later

### Weak/Generic Opening (A2)
Replace with one of these patterns:
- "I searched for [service] in [city] and noticed [specific finding]..."
- "I was looking at [Company]'s [website/Google listing/reviews] and saw..."
- "Your [X] reviews on [Yelp/Google] are impressive, but I noticed..."

### Missing Visual Proof (C7)
Do not proceed without this. Options:
1. Create screenshot mockup via screely.com (5 min)
2. Link to existing portfolio site for similar industry
3. Generate quick preview page using template (15-30 min)

---

# SECTION 4: QA SCORECARD TEMPLATE

Use this template to document QA results per email batch.

```
═══════════════════════════════════════════════════════════════
QA SCORECARD — [DATE] — [BATCH NAME/CAMPAIGN]
═══════════════════════════════════════════════════════════════

CATEGORY A: CLARITY (30%)
[ ] A1: Single clear purpose
[ ] A2: First sentence hook (specific, not generic)
[ ] A3: Readable in 15 seconds (≤100 words)
[ ] A4: Grade-level ≤8
[ ] A5: One idea per sentence
A Score: __/5

CATEGORY B: OFFER FIT (25%)
[ ] B1: Prospect research verified
[ ] B2: Problem-solution alignment
[ ] B3: Industry/category match
[ ] B4: Geographic accuracy
[ ] B5: Relevance to their stage
B Score: __/5

CATEGORY C: RISK CHECKS (30%)
[ ] C1: No pricing in first touch         ⚠️ CRITICAL
[ ] C2: CTA is soft/low-friction
[ ] C3: Claims are provable
[ ] C4: No spam trigger words
[ ] C5: Compliance elements present
[ ] C6: Sender identity professional
[ ] C7: Visual proof included (link tested)
C Score: __/7

CATEGORY D: FORMATTING (15%)
[ ] D1: Zero encoding errors              ⚠️ CRITICAL
[ ] D2: Links functional                  ⚠️ CRITICAL
[ ] D3: Name/company spelled correctly    ⚠️ CRITICAL
[ ] D4: No placeholder text remaining     ⚠️ CRITICAL
[ ] D5: Plain text format
[ ] D6: Signature complete
[ ] D7: Follow-up sequence staged
D Score: __/7

═══════════════════════════════════════════════════════════════
FINAL CALCULATION
═══════════════════════════════════════════════════════════════
A: __/5 × 0.30 = ___
B: __/5 × 0.25 = ___
C: __/7 × 0.30 = ___
D: __/7 × 0.15 = ___
─────────────────
TOTAL SCORE: ___%

CRITICAL FAILURES: [ ] None  [ ] D1  [ ] D2  [ ] D3  [ ] D4  [ ] C1  [ ] B4

VERDICT: [ ] ✅ APPROVED  [ ] ⚠️ CONDITIONAL  [ ] ❌ REVISE  [ ] 🛑 REJECT

ISSUES TO FIX:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

QA BY: __________ DATE: __________ TIME: __________
═══════════════════════════════════════════════════════════════
```

---

# SECTION 5: BATCH QA FOR HIGH-VOLUME CAMPAIGNS

For the 5,000 emails/week volume mandate, apply statistical QA:

## Sampling Protocol
- **Full QA:** First 5 emails of any new template or campaign
- **Spot Check:** Random 10% of remaining batch (minimum 20 emails)
- **Automated Checks:** Run on 100% of batch:
  - Encoding scan (regex for `?` adjacent to letters)
  - Placeholder scan (regex for `{{`, `}}`, `[`, `]`)
  - Link validation (HTTP HEAD request)
  - Word count check
  - Spam word scan

## Automation Script Checks (Run Before Every Batch)

```python
# Minimum automated QA checks for batch sends:

def qa_batch_check(email_body, links):
    failures = []
    
    # D1: Encoding errors
    if re.search(r"[a-zA-Z]\?[a-zA-Z]", email_body):
        failures.append("D1: Potential encoding error detected")
    
    # D4: Placeholder text
    if re.search(r"\{\{|\}\}|\[(?:FILL|INSERT|NAME|CITY|LINK)", email_body):
        failures.append("D4: Placeholder text found")
    
    # A3: Word count
    word_count = len(email_body.split())
    if word_count > 120:
        failures.append(f"A3: Too long ({word_count} words)")
    
    # C4: Spam triggers
    spam_words = ['free', 'urgent', 'act now', 'limited time', 'guarantee', 'click here']
    for word in spam_words:
        if word.lower() in email_body.lower():
            failures.append(f"C4: Spam trigger word: {word}")
    
    # D2: Link validation
    for link in links:
        if not validate_url(link):
            failures.append(f"D2: Broken link: {link}")
    
    return failures
```

## Red Flag Thresholds (Pause Campaign)
- >5% of spot-checked emails fail QA → PAUSE. Review entire batch.
- Any critical failure found in spot check → PAUSE. Full audit required.
- >1% bounce rate on sends → PAUSE. Verify email list quality.

---

# SECTION 6: QA FAILURE LOG

Track all failures to identify patterns and improve templates.

```
QA FAILURE LOG — [MONTH YYYY]
═══════════════════════════════════════════════════════════════
[DATE] [EMAIL/BATCH ID] [FAILURE CODE] [DESCRIPTION] [FIX APPLIED]
───────────────────────────────────────────────────────────────
2026-03-05  batch-23  D1  Encoding error "I?ll"  Plain-text wash
2026-03-05  batch-23  B4  Wrong city (Seattle→Tacoma)  Manual correction
───────────────────────────────────────────────────────────────
```

Review log weekly. If same failure appears 3+ times:
1. Update template to prevent recurrence
2. Add automated check if possible
3. Document fix in KNOWLEDGE.md

---

# QUICK REFERENCE: QA DECISION TREE

```
START
  │
  ├─ Any encoding errors (D1)? ───────────────────────→ STOP. Encoding wash.
  │
  ├─ Any placeholders remaining (D4)? ────────────────→ STOP. Fill all variables.
  │
  ├─ Pricing in email #1 (C1)? ───────────────────────→ STOP. Remove pricing.
  │
  ├─ Name/company misspelled (D3)? ───────────────────→ STOP. Verify & correct.
  │
  ├─ Links broken (D2)? ──────────────────────────────→ STOP. Fix or replace.
  │
  ├─ Wrong city/region (B4)? ─────────────────────────→ STOP. Research & correct.
  │
  └─ All critical checks pass?
       │
       ├─ Score ≥90%? ────────────────────────────────→ ✅ SEND
       │
       ├─ Score 80-89%? ──────────────────────────────→ ⚠️ Fix flagged items, rescan
       │
       └─ Score <80%? ────────────────────────────────→ ❌ Major revision or rewrite
```

---

---

# SECTION 7: SMS OUTREACH QUALITY GATE

SMS has stricter constraints than email. Apply these additional checks.

## SMS-Specific Checks (Apply BEFORE Categories A-D)

| ID | Check | Pass Criteria | Fail Examples |
|----|-------|---------------|---------------|
| S1 | **Character limit** | ≤160 characters (single SMS) or ≤320 (2-part max) | Wall of text requiring 3+ SMS parts |
| S2 | **Phone number verified** | Recipient number is verified (trial) OR account upgraded | Sending to unverified number on trial |
| S3 | **No shortened URLs** | Full URLs or no URL (SMS spam filter trigger) | bit.ly, tinyurl, goo.gl links |
| S4 | **Clear sender ID** | Sign-off with name: "-John" or "-John, NorthStar" | Anonymous or no sign-off |
| S5 | **No spam words** | Extra strict: Avoid FREE, WIN, CASH, CLICK, URGENT | "Free website" (instant spam flag) |
| S6 | **Business context** | Mention their business name (proves not mass-blast) | Generic "Hi! I noticed your business..." |
| S7 | **Soft CTA** | Question format, not directive | "Reply YES", "Call now", "Click here" |
| S8 | **Time zone aware** | Send during business hours in recipient's local time | 9am PT to NY recipient (6am local) |

## SMS Critical Failures (Auto-Reject)

| ID | Critical | Why |
|----|----------|-----|
| S1 | >320 chars | Splits into 3+ messages, looks spammy |
| S2 | Unverified recipient (trial) | Message won't deliver |
| S3 | Shortened URLs | Major spam trigger, often blocked |
| S5 | Spam trigger words | Carrier-level filtering |
| S6 | No business name | Mass-blast signal, instant delete |

## SMS Templates (Pre-Approved)

These templates are QA-compliant. Use variable substitution only.

### Standard (Landscaping/Handyman) — 147 chars
```
Hi! I noticed {business} doesn't have a website yet. I built a free preview site for you - would you like to see it? No cost to look. -John
```

### HVAC/Trades — 159 chars
```
Hi! Saw {business} on Yelp without a website. Your competitors are getting leads online you're missing. I made a demo for you - want to see? -John
```

### With Contact Name — 153 chars
```
Hi {name}! I saw {business} doesn't have a website. I built a preview for you - want to check it out? No cost, just wanted to show you what's possible. -John
```

## SMS QA Workflow

1. **Verify recipient** — Is number verified (trial) or account upgraded?
2. **Character count** — ≤160 preferred, ≤320 max
3. **Variable check** — All {variables} replaced with actual values
4. **Business name** — Recipient's actual business name present
5. **Spam scan** — No trigger words (FREE, WIN, URGENT, CLICK)
6. **Time zone** — Sending during recipient's local business hours?
7. **Sign-off** — Clear sender identification

## SMS Compliance (TCPA/Carrier Rules)

- **Consent:** First-touch SMS to business numbers is generally permitted (B2B exemption)
- **Opt-out:** Must honor "STOP" replies immediately
- **Frequency:** Max 3 SMS per lead in 30-day window
- **Identification:** Must include sender name/company
- **Timing:** 8am-9pm in recipient's local time zone
- **No:** Automated/bot appearance, deceptive content, missing business context

---

**Document Owner:** John (Business Development)
**Effective Date:** 2026-03-05
**Review Cycle:** Monthly or after any campaign with >3% failure rate
