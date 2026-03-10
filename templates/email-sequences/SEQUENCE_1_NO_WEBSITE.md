# Email Sequence 1: No Website
**Target:** Local businesses with NO website (found via Google/Yelp/Google Maps)
**Offer:** $0 down + monthly subscription website
**Goal:** Book a 2-minute walkthrough call or get permission to send preview

---

## Personalization Variables

| Variable | Source | Example |
|----------|--------|---------|
| `{{FirstName}}` | Google Business, Yelp, LinkedIn | Chris |
| `{{CompanyName}}` | Google Business listing | Done Right Works |
| `{{City}}` | Business address | Tacoma |
| `{{Service}}` | Primary service offered | handyman services |
| `{{Platform}}` | Where you found them | Yelp, Google Maps |
| `{{ReviewCount}}` | Number of reviews | 47 |
| `{{ReviewPlatform}}` | Platform with reviews | Google, Yelp |
| `{{Competitor}}` | Competitor with website | Pro Handyman Tacoma |
| `{{SimilarBusiness}}` | Case study business name | Cascade Plumbing |
| `{{SimilarCity}}` | Case study location | Puyallup |
| `{{Result}}` | Case study outcome | 12 new jobs in the first month |
| `{{PreviewLink}}` | Demo site URL | northstarsynergy.com/preview/done-right-works |

---

## INITIAL EMAIL (Day 0)

### Subject Lines (Test 3, pick winner)

**Primary (Question-based - 46% open rate):**
```
Quick question about {{CompanyName}}
```

**Variant A (Curiosity):**
```
Noticed something about {{CompanyName}}
```

**Variant B (Direct value):**
```
Idea for {{CompanyName}}
```

**Variant C (Competitor angle):**
```
{{CompanyName}} vs {{Competitor}}
```

### Email Body

```
Hi {{FirstName}},

I came across {{CompanyName}} on {{Platform}} -- {{ReviewCount}} reviews
and clearly people love your work. But when I tried to find your website,
there wasn't one.

That means every time someone searches "{{Service}} in {{City}}" on Google,
they're finding competitors instead of you.

We just built a site for {{SimilarBusiness}} in {{SimilarCity}} and they
picked up {{Result}} -- all from people who found them on Google for the
first time.

I put together a quick concept for {{CompanyName}}:
{{PreviewLink}}

Worth a quick look?

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 94 words ✓
**Plain text:** Yes ✓
**No pricing:** Yes ✓
**Visual proof:** Yes ✓
**Soft CTA:** Yes ✓

### CTA Variants

- `Worth a quick look?` (default - lowest friction)
- `Want me to walk you through it? Takes 2 minutes.`
- `Mind if I send a quick video walkthrough?`
- `Interested in seeing how this could work for {{CompanyName}}?`

---

## FOLLOW-UP 1 (Day 3) - The Gentle Bump

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body

```
Hi {{FirstName}},

Just bumping this in case it got buried.

I put together that site preview for {{CompanyName}} -- here it is again:
{{PreviewLink}}

One thing worth mentioning: your {{Platform}} listing shows {{ReviewCount}}
great reviews, but there's no website link for people to click through.
That's sending potential customers to competitors who do have sites.

Happy to walk through it -- no pressure either way.

John
(425) 600-2267
```

**Word count:** 72 words ✓

### CTA Variants

- `Happy to walk through it -- no pressure either way.` (default)
- `Just let me know if you'd like a quick 2-minute tour.`
- `Reply "show me" and I'll send a video walkthrough.`

---

## FOLLOW-UP 2 (Day 10) - New Value / Case Study

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body

```
Hi {{FirstName}},

Quick result to share -- we launched a new site for {{SimilarBusiness}}
in {{SimilarCity}} last month, and they've already picked up {{Result}}.
Most came from Google searches for the first time.

Here's what their site looks like:
{{CaseStudyLink}}

I still think there's a solid opportunity for {{CompanyName}} to
capture more of the {{City}} market. Your preview is still live:
{{PreviewLink}}

Worth a quick conversation?

John
(425) 600-2267
```

**Word count:** 76 words ✓

### CTA Variants

- `Worth a quick conversation?` (default)
- `Want me to share what's working for them?`
- `Open to a 5-minute call this week?`

---

## BREAKUP EMAIL (Day 17) - Optional but High-Converting

### Subject Line
```
{{CompanyName}} - closing the loop
```

### Email Body

```
Hi {{FirstName}},

I've reached out a couple of times about helping {{CompanyName}} get found
online and haven't heard back -- totally understand, you're busy running
a business.

I'll stop reaching out after this, but if you ever want to explore getting
more customers through Google, that offer stands. Just reply to this email
anytime.

Wishing you a great rest of the year.

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 70 words ✓

---

## PRE-SEND CHECKLIST

Before sending each email in this sequence:

- [ ] `{{FirstName}}` verified (correct spelling from official source)
- [ ] `{{CompanyName}}` matches their actual branding exactly
- [ ] `{{City}}` is their actual service area
- [ ] `{{ReviewCount}}` is current and accurate
- [ ] `{{PreviewLink}}` tested and loads correctly
- [ ] Pasted through plain-text editor (no encoding errors)
- [ ] Follow-up sequence scheduled (Day 3, Day 10)
- [ ] No pricing mentioned anywhere
- [ ] Signature includes phone number

---

## WHEN TO USE THIS SEQUENCE

**Use when:**
- Business has NO website at all
- Found on Google Maps, Yelp, or Facebook only
- Has reviews/presence but no web destination

**Do NOT use when:**
- They have a website (use Sequence 2 instead)
- You cannot find owner's first name (research more first)
- You cannot build/find a relevant visual proof asset

---

## RESULTS TRACKING

Log in leads.jsonl:
```json
{
  "id": "{{uuid}}",
  "date": "YYYY-MM-DD",
  "source": "cold_email",
  "client": "{{CompanyName}}",
  "contact": "{{FirstName}}",
  "email": "{{Email}}",
  "service": "Website - No Site",
  "sequence": "SEQUENCE_1_NO_WEBSITE",
  "email_1_sent": "YYYY-MM-DD",
  "email_2_sent": null,
  "email_3_sent": null,
  "status": "contacted",
  "notes": ""
}
```
