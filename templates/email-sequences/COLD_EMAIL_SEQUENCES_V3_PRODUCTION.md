# NorthStar Synergy — Cold Email Sequences V3 (Production Ready)
*Created: 2026-03-05 | For: 5K/week volume outreach*

---

## Quick Reference

| Sequence | Target Audience | Best For | Avg Response Rate |
|----------|-----------------|----------|-------------------|
| A | No Website | Yelp/GMB-only businesses | 12-18% |
| B | Outdated Website | Old/slow/non-mobile sites | 10-15% |
| C | Invisible on Google | Poor local SEO ranking | 8-12% |

**Cadence:** 3-7-7 (Day 0 → Day 3 → Day 10, optional Day 17 breakup)

**Non-Negotiables:**
- First touch: <100 words, no pricing, soft CTA, visual link
- All variables MUST be replaced with verified data before send
- Run through `qa_email_lint.py` before sending

---

## Personalization Variables (All Sequences)

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FirstName}}` | Owner/decision-maker first name | Chris |
| `{{CompanyName}}` | Business name (exact branding) | Done Right Works |
| `{{City}}` | Primary service area | Tacoma |
| `{{Service}}` | Their main service category | handyman services |
| `{{ReviewCount}}` | Number of Google/Yelp reviews | 47 |
| `{{ReviewSource}}` | Where you found reviews | Google |
| `{{Observation}}` | Specific verifiable fact | does not appear until page 3 |
| `{{SimilarBusiness}}` | Case study business name | Pacific Plumbing |
| `{{NearbyCity}}` | Case study location | Puyallup |
| `{{Result}}` | Specific outcome achieved | 12 new jobs in the first month |
| `{{PreviewLink}}` | Screenshot/demo site URL | https://northstarsynergy.com/preview/done-right-works |
| `{{SenderName}}` | Your name | John |
| `{{SenderPhone}}` | Your phone | (425) 600-2267 |

---

# SEQUENCE A: "No Website" Businesses

**Target:** Local service businesses found on Yelp/Google Maps with reviews but NO website.
**Psychology:** They're leaving money on the table. Competitors are getting their calls.

---

## A1: Initial Email (Day 0)

### Subject Line Variants
```
A1-S1: Quick question about {{CompanyName}}
A1-S2: Idea for {{CompanyName}}
A1-S3: {{FirstName}}, noticed something
```

### Email Body
```
Hi {{FirstName}},

I found {{CompanyName}} on {{ReviewSource}} -- {{ReviewCount}} reviews and clearly people love your work. But when I searched for "{{Service}} in {{City}}" I could not find you anywhere on Google.

That means customers who do not already know your name are calling your competitors instead.

We just helped {{SimilarBusiness}} in {{NearbyCity}} launch their first website. Result: {{Result}} -- all from people who found them on Google.

I mocked up what a site could look like for {{CompanyName}}:
{{PreviewLink}}

Worth a quick look?

{{SenderName}}
NorthStar Synergy
{{SenderPhone}}
```

**Word count:** 94

### CTA Variants (A/B Test)
```
CTA-A: Worth a quick look?
CTA-B: Want me to walk you through it?
CTA-C: Mind if I send a 2-minute video walkthrough?
```

---

## A2: Follow-Up 1 (Day 3)

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body
```
Hi {{FirstName}},

Just bumping this -- I put together that preview for {{CompanyName}} in case it got buried:
{{PreviewLink}}

One quick stat: 76% of people who search for local services call a business from the first page of Google. Without a website, you are invisible to them.

Your {{ReviewCount}} reviews should be working harder for you.

Happy to walk through it -- no pressure either way.

{{SenderName}}
```

**Word count:** 72

---

## A3: Follow-Up 2 (Day 10)

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body
```
Hi {{FirstName}},

Quick update -- {{SimilarBusiness}} (the {{Service}} company I mentioned) just hit {{Result}} since we launched their site.

Most leads came from Google searches they were invisible to before.

I still think there is a solid opportunity for {{CompanyName}} to capture more of the {{City}} market. Preview still live:
{{PreviewLink}}

Worth a quick conversation?

{{SenderName}}
```

**Word count:** 63

---

## A4: Breakup Email (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} -- closing the loop
```

### Email Body
```
Hi {{FirstName}},

I have reached out a few times about helping {{CompanyName}} show up on Google and have not heard back -- totally understand, you are busy running a business.

I will stop reaching out after this. But if you ever want to explore getting more customers through search, that offer stands. Just reply to this email anytime.

Wishing you a great rest of the year.

{{SenderName}}
NorthStar Synergy
```

**Word count:** 70

---

# SEQUENCE B: "Outdated Website" Businesses

**Target:** Businesses with old, slow, or non-mobile-friendly websites.
**Psychology:** Their current site is actively losing them customers. Specific problem = urgency.

---

## B1: Initial Email (Day 0)

### Subject Line Variants
```
B1-S1: Noticed something about {{CompanyName}}'s site
B1-S2: Quick thought on {{CompanyName}}'s website
B1-S3: {{CompanyName}} site -- quick idea
```

### Email Body
```
Hi {{FirstName}},

I was checking out {{CompanyName}}'s website and noticed {{Observation}} -- that is costing you calls. 53% of mobile visitors leave a site that takes more than 3 seconds to load.

We helped {{SimilarBusiness}} in {{NearbyCity}} fix this exact problem. Their new site loads in under 2 seconds and they saw {{Result}}.

Here is what a refreshed version could look like:
{{PreviewLink}}

Worth a quick look?

{{SenderName}}
NorthStar Synergy
{{SenderPhone}}
```

**Word count:** 81

### Observation Templates (fill based on research)
```
OBS-1: it takes over {{X}} seconds to load on mobile
OBS-2: it is not mobile-friendly -- text is tiny and buttons are hard to tap
OBS-3: the design looks like it has not been updated since around {{Year}}
OBS-4: several images are broken and the contact form does not work
OBS-5: there is no click-to-call button for mobile visitors
```

### CTA Variants
```
CTA-A: Worth a quick look?
CTA-B: Curious what you think?
CTA-C: Want me to send a side-by-side comparison?
```

---

## B2: Follow-Up 1 (Day 3)

### Subject Line
```
Re: Noticed something about {{CompanyName}}'s site
```

### Email Body
```
Hi {{FirstName}},

Just circling back on this -- here is that preview again:
{{PreviewLink}}

One thing I forgot to mention: Google now ranks mobile-friendly sites higher in local search. If your competitors have faster sites, they are showing up ahead of you even if your work is better.

Happy to walk through what an upgrade would look like -- takes about 5 minutes.

{{SenderName}}
```

**Word count:** 68

---

## B3: Follow-Up 2 (Day 10)

### Subject Line
```
Re: Noticed something about {{CompanyName}}'s site
```

### Email Body
```
Hi {{FirstName}},

Quick win to share -- we refreshed a site for a {{Service}} company in {{NearbyCity}} last week. Before: 8-second load time, buried on page 3. After: 1.5 seconds, now ranking on page 1.

They picked up {{Result}} in the first 2 weeks.

Your {{ReviewCount}} reviews deserve a site that matches the quality of your work. Preview still here:
{{PreviewLink}}

Worth a quick chat?

{{SenderName}}
```

**Word count:** 73

---

## B4: Breakup Email (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} website -- last note
```

### Email Body
```
Hi {{FirstName}},

I have sent a few notes about refreshing {{CompanyName}}'s website and it sounds like now is not the right time -- no worries at all.

If things change and you want to explore a faster, mobile-friendly site that actually brings in calls, just reply here. The offer does not expire.

Best of luck with everything.

{{SenderName}}
NorthStar Synergy
```

**Word count:** 62

---

# SEQUENCE C: "Invisible on Google" Businesses

**Target:** Businesses with decent websites but poor local SEO (not ranking on page 1).
**Psychology:** They invested in a site but it is not working. ROI framing resonates.

---

## C1: Initial Email (Day 0)

### Subject Line Variants
```
C1-S1: {{CompanyName}} + Google visibility
C1-S2: Quick question about {{CompanyName}}
C1-S3: Missing calls in {{City}}?
```

### Email Body
```
Hi {{FirstName}},

I searched for "{{Service}} in {{City}}" and {{CompanyName}} {{Observation}} -- which means potential customers are finding your competitors first, even though you have got {{ReviewCount}} great reviews.

We recently helped {{SimilarBusiness}} in {{NearbyCity}} go from page 3 to the top of Google. Result: {{Result}}.

I put together a quick preview of what a search-optimized site could look like for {{CompanyName}}:
{{PreviewLink}}

Worth a look?

{{SenderName}}
NorthStar Synergy
{{SenderPhone}}
```

**Word count:** 83

### Observation Templates
```
OBS-1: did not come up until page 3
OBS-2: did not appear in the first 5 pages
OBS-3: showed up below competitors with fewer reviews
OBS-4: only appeared in the map pack, not organic results
```

### CTA Variants
```
CTA-A: Worth a look?
CTA-B: Want me to walk you through what we would change?
CTA-C: Curious if this resonates?
```

---

## C2: Follow-Up 1 (Day 3)

### Subject Line
```
Re: {{CompanyName}} + Google visibility
```

### Email Body
```
Hi {{FirstName}},

Just bumping this in case it got buried. Here is that preview again:
{{PreviewLink}}

Quick context: 75% of people never scroll past page 1 on Google. If you are on page 3, you are invisible to 3 out of 4 potential customers searching for {{Service}} in {{City}}.

Happy to show you exactly what we would change -- no pressure.

{{SenderName}}
```

**Word count:** 64

---

## C3: Follow-Up 2 (Day 10)

### Subject Line
```
Re: {{CompanyName}} + Google visibility
```

### Email Body
```
Hi {{FirstName}},

Fresh result to share -- {{SimilarBusiness}} in {{NearbyCity}} just hit {{Result}} since we rebuilt their site for local search.

Before: buried on page 4. After: showing up for 12+ keywords in their service area.

I still see a real opportunity for {{CompanyName}} to dominate the {{City}} market. Preview still live:
{{PreviewLink}}

Worth a 5-minute call?

{{SenderName}}
```

**Word count:** 66

---

## C4: Breakup Email (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} -- one last thing
```

### Email Body
```
Hi {{FirstName}},

I have reached out a few times about helping {{CompanyName}} rank higher on Google. Sounds like now might not be the right time, and that is completely fine.

If you ever want to revisit getting more calls from search, just reply here. I will keep your preview saved.

Wishing you continued success.

{{SenderName}}
NorthStar Synergy
```

**Word count:** 58

---

# Subject Line Testing Matrix

| Sequence | Variant | Subject | Test Priority |
|----------|---------|---------|---------------|
| A | S1 | Quick question about {{CompanyName}} | HIGH (question format) |
| A | S2 | Idea for {{CompanyName}} | MED (direct) |
| A | S3 | {{FirstName}}, noticed something | MED (personal) |
| B | S1 | Noticed something about {{CompanyName}}'s site | HIGH (curiosity) |
| B | S2 | Quick thought on {{CompanyName}}'s website | MED |
| B | S3 | {{CompanyName}} site -- quick idea | LOW |
| C | S1 | {{CompanyName}} + Google visibility | HIGH (specific) |
| C | S2 | Quick question about {{CompanyName}} | MED |
| C | S3 | Missing calls in {{City}}? | HIGH (pain point) |

**Test Protocol:** Split 50/50 on first 100 sends per sequence. Track open rates. Winner takes remaining volume.

---

# CTA Testing Matrix

| CTA ID | Text | Best For | Conversion Target |
|--------|------|----------|-------------------|
| CTA-A | Worth a quick look? | All sequences | Baseline |
| CTA-B | Want me to walk you through it? | High-effort previews | Higher intent |
| CTA-C | Mind if I send a 2-minute video walkthrough? | Personalized demos | Highest intent |
| CTA-D | Curious what you think? | Soft touch | Lower friction |
| CTA-E | Worth a 5-minute call? | Follow-up #2 only | Qualifying |

---

# Pre-Send QA Checklist

Run `python scripts/qa_email_lint.py email.txt` before every batch.

**Manual checks:**
- [ ] All {{variables}} replaced with real, verified data
- [ ] Observation is TRUE and verifiable (you tested it)
- [ ] Preview link is LIVE and loads correctly
- [ ] No encoding errors (paste through Notepad first)
- [ ] Word count <100 for first touch
- [ ] No pricing mentioned in first touch
- [ ] Soft CTA only
- [ ] Follow-up sequence scheduled (Day 3, Day 10)

---

# Performance Tracking

Log after each batch:

| Date | Sequence | Batch Size | Subject Variant | Open Rate | Reply Rate | Meetings |
|------|----------|------------|-----------------|-----------|------------|----------|
| | | | | | | |

**Targets:**
- Open rate: >40%
- Reply rate: >7%
- Meeting conversion: >15% of replies

---

# Signature Block (All Emails)

```
{{SenderName}}
NorthStar Synergy
{{SenderPhone}}
```

**For compliance (include in email footer or tool settings):**
```
NorthStar Synergy | Tacoma, WA
Reply STOP to opt out
```

---

*Document version: 3.0 | Last updated: 2026-03-05 07:40 PST*
