# Email Sequence 3: Business Automation Services
**Target:** Businesses posting on Reddit, Upwork, Fiverr, or LinkedIn seeking automation help
**Offer:** Excel automation, Python scripts, data pipelines, custom bots
**Goal:** Convert inbound signals into booked projects

---

## Personalization Variables

| Variable | Source | Example |
|----------|--------|---------|
| `{{FirstName}}` | Post author, profile | Sarah |
| `{{CompanyName}}` | Profile/post context | Apex Logistics |
| `{{Platform}}` | Where you found them | Reddit r/excel |
| `{{TheirPost}}` | What they asked for | automating monthly reports |
| `{{PainPoint}}` | The problem behind the ask | spending 8 hours/week on manual data entry |
| `{{SolutionSummary}}` | How you'd solve it | VBA macro that pulls data and formats in 30 seconds |
| `{{TimeSaved}}` | Concrete time savings | 7+ hours/week |
| `{{SimilarProject}}` | Relevant past work | inventory tracking dashboard |
| `{{SimilarClient}}` | Past client type | logistics company |
| `{{SimilarResult}}` | What it achieved | cut reporting time from 6 hours to 15 minutes |
| `{{DeliverableType}}` | What you'd build | Excel template with VBA automation |
| `{{TimeEstimate}}` | Delivery timeline | 3-5 business days |

---

## INITIAL EMAIL (Day 0)

### Subject Lines (Test variants based on platform)

**Reddit/Forum response:**
```
Re: {{TheirPost}}
```

**Upwork/Fiverr proposal:**
```
Quick solution for {{TheirPost}}
```

**LinkedIn DM:**
```
Saw your post about {{TheirPost}}
```

**Cold outreach (signal detected):**
```
Quick question for {{FirstName}}
```

### Email Body - Platform Response

```
Hi {{FirstName}},

Saw your post about {{TheirPost}}.

This is exactly what I do -- I've built similar {{DeliverableType}} for
a {{SimilarClient}} that {{SimilarResult}}.

For your situation, I'm thinking a {{SolutionSummary}} would work.
That should save you {{TimeSaved}} immediately.

Want me to send a quick outline of how I'd approach this?

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 62 words ✓
**Plain text:** Yes ✓
**No pricing:** Yes ✓
**Soft CTA:** Yes ✓

### Email Body - Cold Outreach (Signal-Based)

Use when you observe a business manually doing something you could automate:

```
Hi {{FirstName}},

I came across {{CompanyName}} and noticed you're likely
{{PainPoint}} -- that's usually the case for {{their industry}}.

We recently built a {{SolutionSummary}} for a {{SimilarClient}}
that {{SimilarResult}}.

Would something like that be useful for {{CompanyName}}?

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 52 words ✓

### CTA Variants

- `Want me to send a quick outline of how I'd approach this?` (default)
- `Would something like that be useful for {{CompanyName}}?`
- `Worth a quick conversation to scope it out?`
- `Reply "interested" and I'll send a project outline.`

---

## FOLLOW-UP 1 (Day 3) - Add Technical Credibility

### Subject Line
```
Re: {{TheirPost}}
```

### Email Body

```
Hi {{FirstName}},

Just following up on my note about {{TheirPost}}.

One thing I should mention -- I've been building Excel/Python automation
for {{X}} years, including:
- {{SimilarProject}} for {{SimilarClient}}
- Custom reporting dashboards
- Data pipeline automation

If you're still looking for help on this, I can turn it around in
{{TimeEstimate}}.

Happy to jump on a quick call to scope it out properly.

John
(425) 600-2267
```

**Word count:** 69 words ✓

### Credential Inserts (Choose relevant ones)

**Excel expertise:**
- Advanced VBA development
- Power Query data transformation
- Complex formula optimization
- Dashboard design

**Python/Scripting:**
- Data cleaning and processing
- API integrations
- Web scraping
- Automated reporting

**Bot/Automation:**
- Custom Discord/Telegram bots
- Workflow automation
- Scheduled task systems
- Integration development

---

## FOLLOW-UP 2 (Day 10) - Case Study / Proof

### Subject Line
```
Re: {{TheirPost}}
```

### Email Body

```
Hi {{FirstName}},

Wanted to share a quick result -- just finished a project for a
{{SimilarClient}} with a similar challenge to yours.

The problem: {{SimilarProblem}}
What I built: {{SimilarProject}}
Result: {{SimilarResult}}

If {{TheirPost}} is still on your plate, I'm confident we could get
similar results for you.

Worth a quick chat this week?

John
(425) 600-2267
```

**Word count:** 64 words ✓

### Case Study Templates

**Report Automation:**
- Problem: Spending 8+ hours/week compiling reports manually
- Solution: VBA-powered Excel template with one-click refresh
- Result: Reports now generate in 30 seconds, saving 7+ hours/week

**Data Cleaning:**
- Problem: Customer data across 5 spreadsheets with inconsistent formatting
- Solution: Python script that merges, cleans, and deduplicates automatically
- Result: 2 days of manual work now takes 3 minutes

**Dashboard:**
- Problem: Leadership asking for weekly updates, no central data view
- Solution: Interactive Excel dashboard pulling from multiple sources
- Result: Real-time visibility, eliminated weekly update meetings

**Inventory/Tracking:**
- Problem: Manual inventory counts, frequent stockouts
- Solution: Automated tracking system with low-stock alerts
- Result: Reduced stockouts by 80%, freed up 10 hours/week

---

## BREAKUP EMAIL (Day 17)

### Subject Line
```
Closing the loop on {{TheirPost}}
```

### Email Body

```
Hi {{FirstName}},

I reached out a couple of times about helping with {{TheirPost}} and
haven't heard back -- no worries, timing might not be right.

I'll stop following up, but if this project comes back around (or you
have something similar), just reply to this email. I'm happy to help.

Best,

John
NorthStar Synergy
(425) 600-2267
```

**Word count:** 58 words ✓

---

## PRE-SEND CHECKLIST

Before sending each email in this sequence:

- [ ] Read their FULL post/request to understand actual need
- [ ] `{{TheirPost}}` summarizes their ask accurately
- [ ] `{{SolutionSummary}}` is realistic and deliverable
- [ ] `{{SimilarProject}}` is real (or clearly hypothetical framing)
- [ ] `{{TimeEstimate}}` is honest (pad 20%)
- [ ] No pricing mentioned (save for follow-up conversation)
- [ ] Pasted through plain-text editor (no encoding errors)
- [ ] Follow-up sequence scheduled (Day 3, Day 10)
- [ ] Response fast (<2 hours if possible on Reddit/Upwork)

---

## WHEN TO USE THIS SEQUENCE

**Use when:**
- Someone posts on Reddit (r/excel, r/learnpython, r/forhire, r/slavelabour)
- Upwork/Fiverr job posting matches our skills
- LinkedIn post asking for automation help
- Cold outreach to business with clear automation opportunity

**Do NOT use when:**
- Request is outside our capabilities
- Budget is clearly too low (<$50 for meaningful work)
- Already has multiple responses and you're late
- Request requires ongoing employment (not project-based)

---

## PLATFORM-SPECIFIC RULES

### Reddit
- **Speed matters:** First quality response often wins
- **Be helpful first:** Answer part of their question in your response
- **No hard sell:** Redditors hate obvious pitching
- **Use their language:** Match technical level of their post

### Upwork
- **Address all requirements:** Show you read the full posting
- **Ask one clarifying question:** Shows engagement, starts conversation
- **Keep proposal short:** Most clients skim, not read

### LinkedIn
- **Connection first:** If not connected, personalize the request
- **Reference their content:** Show you follow their work
- **Professional tone:** More formal than Reddit

### Fiverr (Buyer Requests)
- **Fast response:** Set up alerts, respond in minutes
- **Template + personalization:** Have base response ready
- **Highlight relevant gigs:** Link to your relevant service

---

## SERVICE OFFERING QUICK REFERENCE

| Service | Good ($) | Better ($$) | Best ($$$) |
|---------|----------|-------------|------------|
| Formula Audit | $150 | $300 | $500 |
| Excel Template | $39 | $59 | $99 |
| VBA Automation | $200 | $500 | $1,000+ |
| Python Script | $150 | $400 | $800+ |
| Data Cleaning | $200 | $500 | $800 |
| Dashboard Build | $300 | $750 | $1,500+ |
| Custom Bot | $500 | $2,000 | $5,000 |

**NOTE:** Do NOT include pricing in first-touch email. Use only in follow-up conversation after interest confirmed.

---

## RESULTS TRACKING

Log in leads.jsonl:
```json
{
  "id": "{{uuid}}",
  "date": "YYYY-MM-DD",
  "source": "{{Platform}}",
  "client": "{{FirstName}}",
  "email": "{{Email}}",
  "service": "{{DeliverableType}}",
  "sequence": "SEQUENCE_3_BUSINESS_AUTOMATION",
  "original_post": "{{link to their post}}",
  "email_1_sent": "YYYY-MM-DD",
  "email_2_sent": null,
  "email_3_sent": null,
  "status": "contacted",
  "estimated_value": null,
  "notes": "{{TheirPost}}"
}
```
