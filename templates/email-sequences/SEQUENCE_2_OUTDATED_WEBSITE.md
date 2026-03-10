# Email Sequence 2: Outdated Website / Poor Google Visibility
**Target:** Local businesses with OLD, SLOW, or POORLY-RANKING websites
**Offer:** Modern redesign + SEO optimization ($0 down + monthly subscription)
**Goal:** Show them the gap between their current site and what's possible

---

## Personalization Variables

| Variable | Source | Example |
|----------|--------|---------|
| `{{FirstName}}` | Website contact, LinkedIn | Mike |
| `{{CompanyName}}` | Their website/branding | Green Thumb Landscaping |
| `{{City}}` | Business address | Bellevue |
| `{{Service}}` | Primary service | landscaping |
| `{{CurrentSite}}` | Their existing URL | greenthumbwa.com |
| `{{Issue}}` | Specific problem observed | takes 6 seconds to load |
| `{{IssueImpact}}` | Business impact | 53% of visitors leave before it loads |
| `{{GoogleRank}}` | Where they appear | page 3 |
| `{{SearchTerm}}` | What you searched | landscaping Bellevue |
| `{{Competitor}}` | Competitor ranking above them | Pacific Lawn Care |
| `{{SimilarBusiness}}` | Case study business | Cascade Plumbing |
| `{{SimilarCity}}` | Case study location | Puyallup |
| `{{Result}}` | Case study outcome | 40% more contact form submissions |
| `{{PreviewLink}}` | Demo redesign URL | northstarsynergy.com/preview/green-thumb |

---

## INITIAL EMAIL (Day 0)

### Subject Lines (Test 3, pick winner)

**Primary (Curiosity - specific observation):**
```
Noticed something about {{CompanyName}}'s site
```

**Variant A (Question-based):**
```
Quick question about {{CompanyName}}
```

**Variant B (Problem-focused):**
```
{{CompanyName}} on page {{GoogleRank}}?
```

**Variant C (Competitor angle):**
```
Why {{Competitor}} shows up before {{CompanyName}}
```

### Email Body

```
Hi {{FirstName}},

I was checking out {{CompanyName}}'s website and noticed it {{Issue}}.

That's costing you calls -- {{IssueImpact}}.

I helped {{SimilarBusiness}} in {{SimilarCity}} fix this exact problem.
Their new site loads in under 2 seconds and they saw {{Result}}.

Here's what an updated version could look like for {{CompanyName}}:
{{PreviewLink}}

Worth a quick look?

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 72 words ✓
**Plain text:** Yes ✓
**No pricing:** Yes ✓
**Visual proof:** Yes ✓
**Soft CTA:** Yes ✓

### Issue Templates (Plug into `{{Issue}}` + `{{IssueImpact}}`)

**Slow load time:**
- Issue: `takes {{X}} seconds to load`
- Impact: `53% of mobile users leave if a site takes more than 3 seconds`

**Not mobile-friendly:**
- Issue: `doesn't display properly on phones`
- Impact: `60% of local searches happen on mobile -- they're bouncing to competitors`

**Outdated design:**
- Issue: `looks like it was built around {{year}}`
- Impact: `modern customers judge credibility by design in the first 3 seconds`

**Poor Google ranking:**
- Issue: `doesn't show up until page {{GoogleRank}} for "{{SearchTerm}}"`
- Impact: `75% of searchers never scroll past page 1`

**No SSL/security:**
- Issue: `shows "Not Secure" in the browser`
- Impact: `84% of people abandon purchases on sites without HTTPS`

### CTA Variants

- `Worth a quick look?` (default)
- `Want me to walk you through the differences?`
- `Mind if I send a 2-minute video comparison?`
- `Open to seeing what's possible?`

---

## FOLLOW-UP 1 (Day 3) - The Gentle Bump + New Insight

### Subject Line
```
Re: Noticed something about {{CompanyName}}'s site
```

### Email Body

```
Hi {{FirstName}},

Just bumping this in case it got buried.

I put together that redesign preview for {{CompanyName}}:
{{PreviewLink}}

One more thing I noticed -- when I search "{{SearchTerm}}" on Google,
{{CompanyName}} shows up on page {{GoogleRank}}. That means {{Competitor}}
is getting the calls that could be going to you.

A faster, modern site usually fixes that within 60-90 days.

Happy to show you the before/after -- no pressure.

John
(425) 600-2267
```

**Word count:** 78 words ✓

### CTA Variants

- `Happy to show you the before/after -- no pressure.` (default)
- `Reply "compare" and I'll send screenshots side-by-side.`
- `Quick 5-minute call to walk through it?`

---

## FOLLOW-UP 2 (Day 10) - Case Study Focus

### Subject Line
```
Re: Noticed something about {{CompanyName}}'s site
```

### Email Body

```
Hi {{FirstName}},

Thought you might find this useful -- we just finished tracking results
for {{SimilarBusiness}} in {{SimilarCity}}.

After 90 days with their new site:
- Page 1 ranking for their main keywords
- {{Result}}
- Site loads in under 2 seconds (was 7+)

Here's what we built for them:
{{CaseStudyLink}}

I still think there's a similar opportunity for {{CompanyName}}:
{{PreviewLink}}

Worth a quick conversation?

John
(425) 600-2267
```

**Word count:** 76 words ✓

### CTA Variants

- `Worth a quick conversation?` (default)
- `Want me to share what specifically moved the needle for them?`
- `Open to a quick comparison call this week?`

---

## BREAKUP EMAIL (Day 17)

### Subject Line
```
{{CompanyName}} - closing the loop
```

### Email Body

```
Hi {{FirstName}},

I've reached out a couple of times about modernizing {{CompanyName}}'s
website and haven't heard back -- totally understand, business comes first.

I'll stop reaching out after this. But if {{Issue}} ever becomes a priority,
that offer stands. Just reply to this email anytime and I'll send fresh
options.

Best of luck with everything.

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 64 words ✓

---

## PRE-SEND CHECKLIST

Before sending each email in this sequence:

- [ ] `{{FirstName}}` verified from website contact page or LinkedIn
- [ ] `{{CompanyName}}` matches their branding exactly
- [ ] `{{Issue}}` is REAL and VERIFIABLE (tested their site yourself)
- [ ] `{{GoogleRank}}` is current (searched within last 24 hours)
- [ ] `{{PreviewLink}}` tested and loads correctly
- [ ] Screenshot comparison ready if requested
- [ ] Pasted through plain-text editor (no encoding errors)
- [ ] Follow-up sequence scheduled (Day 3, Day 10)
- [ ] No pricing mentioned anywhere

---

## WHEN TO USE THIS SEQUENCE

**Use when:**
- Business HAS a website but it's:
  - Slow (>3 second load time)
  - Not mobile-friendly
  - Outdated design (looks pre-2020)
  - Poor Google ranking (page 2+)
  - Missing SSL certificate
  - Broken features

**Do NOT use when:**
- They have no website (use Sequence 1)
- Their site is modern and ranks well (not a fit)
- You cannot identify a specific, verifiable issue

---

## ISSUE RESEARCH CHECKLIST

Before writing this email, verify:

1. **Load speed:** Use PageSpeed Insights (pagespeed.web.dev)
2. **Mobile-friendly:** Test on your phone
3. **Google ranking:** Search `"{{Service}} {{City}}"` in incognito
4. **SSL:** Check for padlock icon / "Not Secure" warning
5. **Design age:** Look at footer for copyright year, check Wayback Machine
6. **Functionality:** Test contact forms, buttons, links

Only email if you find a REAL issue you can prove.

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
  "service": "Website - Redesign",
  "sequence": "SEQUENCE_2_OUTDATED_WEBSITE",
  "issue_identified": "{{Issue}}",
  "email_1_sent": "YYYY-MM-DD",
  "email_2_sent": null,
  "email_3_sent": null,
  "status": "contacted",
  "notes": ""
}
```
