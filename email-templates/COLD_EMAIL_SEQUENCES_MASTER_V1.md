# NorthStar Synergy — Cold Email Sequences Master Template
## Version 1.0 | Created 2026-03-05

**Usage:** Copy-paste ready sequences. Replace ALL `{{variables}}` before sending.
**QA Required:** Run through `scripts/qa_email_lint.py` before send.
**Cadence:** 3-7-7 (Day 0 → Day 3 → Day 10, optional Day 17 breakup)

---

# SEQUENCE 1: WEB DESIGN — $0 DOWN SUBSCRIPTION MODEL
**Best for:** Local service businesses (landscaping, plumbing, HVAC, contractors, cleaning)
**Offer:** Professional website, $0 upfront, $99-$299/mo subscription

---

## Email 1.1: Initial Outreach (Day 0)

### Subject Line Variants
```
A. Quick question about {{CompanyName}}
B. {{FirstName}}, idea for {{CompanyName}}
C. {{CompanyName}} + more {{City}} customers?
D. Built something for {{CompanyName}}
E. Noticed something about {{CompanyName}}'s online presence
```

### Email Body
```
Hi {{FirstName}},

I searched "{{ServiceType}} in {{City}}" and {{CompanyName}} {{ObservationDetail}} — which means {{BusinessImpact}}.

We helped {{SimilarBusiness}} in {{NearbyCity}} go from {{BeforeState}} to {{AfterResult}} after launching their new site.

I put together a quick preview for {{CompanyName}}:
{{PreviewLink}}

Worth a look?

John
NorthStar Synergy
(425) 600-2267
```

### Personalization Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{FirstName}}` | Owner/decision-maker first name | Chris |
| `{{CompanyName}}` | Exact business name as branded | Done Right Works |
| `{{ServiceType}}` | Their primary service | handyman services |
| `{{City}}` | Their service area | Tacoma |
| `{{ObservationDetail}}` | Specific, verifiable finding | didn't appear until page 3 |
| `{{BusinessImpact}}` | Why this matters to them | you're losing calls to competitors with weaker reviews |
| `{{SimilarBusiness}}` | Real client in similar industry | a plumbing company |
| `{{NearbyCity}}` | Nearby city for relevance | Puyallup |
| `{{BeforeState}}` | Where they started | invisible on Google |
| `{{AfterResult}}` | Concrete outcome | booking 12 new jobs in the first month |
| `{{PreviewLink}}` | Live preview or screenshot URL | https://northstarsynergy.com/preview/done-right-works |

### CTA Variants
```
A. Worth a look?
B. Want me to walk you through it?
C. Interested in a quick 2-minute walkthrough?
D. Does this direction make sense for {{CompanyName}}?
E. Should I send over the details?
```

---

## Email 1.2: Follow-Up #1 (Day 3)

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body
```
Hi {{FirstName}},

Just bumping this in case it got buried. The preview I put together for {{CompanyName}} is still live:
{{PreviewLink}}

One thing worth noting: {{NewInsight}}.

Happy to walk through it — no pressure either way.

John
```

### NewInsight Variables (pick one based on research)
```
A. Your Google Business listing links to {{Issue}} — anyone searching can't see your full services
B. {{X}}% of people searching "{{ServiceType}} {{City}}" never scroll past page 1
C. Your competitors {{CompetitorName}} and {{CompetitorName2}} are running Google Ads against your business name
D. Mobile searches for {{ServiceType}} in {{City}} are up {{X}}% this year — and your current site {{MobileIssue}}
E. I noticed your {{ReviewCount}} reviews on {{Platform}} aren't showing on your website
```

### CTA Variants
```
A. Happy to walk through it — no pressure either way.
B. 5 minutes to show you how it works?
C. Want me to send the full breakdown?
D. Worth a quick conversation?
```

---

## Email 1.3: Follow-Up #2 (Day 10)

### Subject Line
```
Re: Quick question about {{CompanyName}}
```

### Email Body
```
Hi {{FirstName}},

Quick result to share — we launched a site for {{CaseStudyBusiness}} in {{CaseStudyCity}} last month. In {{Timeframe}}, they picked up {{CaseStudyResult}}.

Most came from Google searches they weren't capturing before.

I still see the same opportunity for {{CompanyName}} in the {{City}} market. Preview is still live if you want to take a look:
{{PreviewLink}}

Worth a quick conversation?

John
NorthStar Synergy
(425) 600-2267
```

### Case Study Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{CaseStudyBusiness}}` | Real or anonymized client | a fence company |
| `{{CaseStudyCity}}` | Their location | Bellevue |
| `{{Timeframe}}` | How long to see results | the first 3 weeks |
| `{{CaseStudyResult}}` | Specific outcome | 8 new estimate requests |

### CTA Variants
```
A. Worth a quick conversation?
B. Should I send over the pricing breakdown?
C. 10 minutes this week to walk through how it works?
D. Ready to move forward?
```

---

## Email 1.4: Breakup (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} — closing the loop
```

### Email Body
```
Hi {{FirstName}},

I've reached out a few times about helping {{CompanyName}} get more customers through Google and haven't heard back — totally understand, you're busy running a business.

I'll stop reaching out after this. But if you ever want to capture more of the {{City}} {{ServiceType}} market, that offer stands. Just reply anytime.

Wishing you a great {{Season}}.

John
NorthStar Synergy
```

### Season Variables
```
A. rest of the year
B. spring season
C. summer
D. busy season
```

---
---

# SEQUENCE 2: EXCEL & AUTOMATION SERVICES
**Best for:** Small businesses drowning in spreadsheets, manual data entry, reporting pain
**Offer:** Formula audits ($150-$500), automation scripts ($99-$999), custom solutions

---

## Email 2.1: Initial Outreach (Day 0)

### Subject Line Variants
```
A. {{CompanyName}} — quick question about your spreadsheets
B. Cutting {{TaskType}} time in half for {{CompanyName}}?
C. {{FirstName}}, spotted a potential time-saver
D. The {{PainPoint}} problem at {{CompanyName}}
E. {{CompanyName}} + automation idea
```

### Email Body
```
Hi {{FirstName}},

I work with {{IndustryType}} businesses that spend hours on {{ManualTask}} — the kind of work that should take minutes, not half a day.

We recently helped {{SimilarBusiness}} automate their {{AutomatedProcess}}. What used to take {{TimeBefore}} now runs in {{TimeAfter}} with zero manual entry.

If {{CompanyName}} deals with {{SpecificPainPoint}}, I can show you exactly how we'd fix it — no cost to look.

Want me to send a quick breakdown?

John
NorthStar Synergy
(425) 600-2267
```

### Personalization Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{FirstName}}` | Owner/manager name | Mike |
| `{{CompanyName}}` | Business name | Pacific Supply Co |
| `{{IndustryType}}` | Their industry | distribution |
| `{{ManualTask}}` | What they're doing manually | weekly inventory reports |
| `{{SimilarBusiness}}` | Anonymized/real client | a wholesale company in Portland |
| `{{AutomatedProcess}}` | What was automated | order tracking and reporting |
| `{{TimeBefore}}` | Previous time investment | 6 hours every Friday |
| `{{TimeAfter}}` | New time investment | under 5 minutes |
| `{{SpecificPainPoint}}` | Their pain (research-based) | manual data entry between systems |

### CTA Variants
```
A. Want me to send a quick breakdown?
B. Worth a 10-minute call to see if it fits?
C. Should I show you what the fix looks like?
D. Interested in seeing how it would work for {{CompanyName}}?
E. Can I send over a quick scope?
```

---

## Email 2.2: Follow-Up #1 (Day 3)

### Subject Line
```
Re: {{CompanyName}} — quick question about your spreadsheets
```

### Email Body
```
Hi {{FirstName}},

Following up on my note about {{ManualTask}} at {{CompanyName}}.

One thing I see constantly: businesses lose {{LostHours}} hours/month to work that can be fully automated — often with a single script or formula fix.

If that sounds familiar, I'm happy to do a quick (free) audit and show you exactly where the time is going.

No pressure — just reply "AUDIT" if you want me to take a look.

John
```

### Variable: LostHours
```
A. 10-20 hours/month
B. 2-3 hours/week
C. a full day every week
D. 40+ hours/month
```

### CTA Variants
```
A. Just reply "AUDIT" if you want me to take a look.
B. Want me to scope it out?
C. 15 minutes to walk through your current process?
D. Should I send the audit questionnaire?
```

---

## Email 2.3: Follow-Up #2 (Day 10)

### Subject Line
```
Re: {{CompanyName}} — quick question about your spreadsheets
```

### Email Body
```
Hi {{FirstName}},

Thought you'd find this useful — we just finished an automation project for {{CaseStudyBusiness}} that cut their {{TaskType}} from {{TimeBefore}} to {{TimeAfter}}.

The ROI: they're saving {{MonthlySavings}} in labor costs every month. The project paid for itself in {{PaybackPeriod}}.

If {{CompanyName}} has similar bottlenecks, happy to show you what a solution would look like — completely free to scope.

Worth a quick call?

John
NorthStar Synergy
(425) 600-2267
```

### Case Study Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{CaseStudyBusiness}}` | Client reference | a construction company |
| `{{TaskType}}` | What was automated | end-of-week job costing |
| `{{TimeBefore}}` | Old time | 8 hours |
| `{{TimeAfter}}` | New time | 15 minutes |
| `{{MonthlySavings}}` | Dollar savings | $1,200 |
| `{{PaybackPeriod}}` | Time to ROI | 3 weeks |

---

## Email 2.4: Breakup (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} — last note on automation
```

### Email Body
```
Hi {{FirstName}},

I've reached out a couple times about automating {{ManualTask}} for {{CompanyName}} and haven't connected — no worries, I know you're busy.

I'll leave it here. But if you ever want to reclaim those hours and stop doing {{PainPointShort}} manually, just reply to this email. The offer stands.

Best,
John
NorthStar Synergy
```

### PainPointShort Examples
```
A. data entry
B. report building
C. inventory tracking
D. invoice reconciliation
E. scheduling and dispatch
```

---
---

# SEQUENCE 3: CUSTOM BOT & BUSINESS AUTOMATION
**Best for:** Growing businesses wanting to automate customer service, lead capture, scheduling, internal workflows
**Offer:** Custom bots ($500-$5,000), reporting pipelines ($500-$2,500), workflow automation

---

## Email 3.1: Initial Outreach (Day 0)

### Subject Line Variants
```
A. {{CompanyName}} — automation idea
B. What if {{CompanyName}} could {{AutomationBenefit}}?
C. {{FirstName}}, quick thought on scaling {{CompanyName}}
D. Handling {{Volume}} without hiring at {{CompanyName}}
E. {{CompanyName}} + a smarter way to {{Process}}
```

### Email Body
```
Hi {{FirstName}},

I noticed {{CompanyName}} is {{GrowthSignal}} — which usually means {{GrowthChallenge}}.

We build custom automation for businesses at your stage. Recent example: {{SimilarBusiness}} was {{TheirProblem}}. We built a system that {{SolutionSummary}} — now they handle {{VolumeAfter}} without adding headcount.

If {{CompanyName}} is hitting similar growing pains, I can show you what a solution would look like. Takes 15 minutes.

Worth a quick call?

John
NorthStar Synergy
(425) 600-2267
```

### Personalization Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{FirstName}}` | Decision-maker name | Sarah |
| `{{CompanyName}}` | Business name | Cascade Property Management |
| `{{GrowthSignal}}` | Evidence of growth | expanding to 3 new locations |
| `{{GrowthChallenge}}` | Common pain at that stage | the back-office work is scaling faster than your team |
| `{{SimilarBusiness}}` | Client reference | a property management company |
| `{{TheirProblem}}` | Their situation | drowning in tenant requests |
| `{{SolutionSummary}}` | What was built | auto-routes requests, tracks status, and sends updates |
| `{{VolumeAfter}}` | Scale achieved | 3x the requests |

### CTA Variants
```
A. Worth a quick call?
B. 15 minutes to see if it fits?
C. Should I send over a quick scope?
D. Interested in seeing how it would work?
E. Want me to map out what this looks like for {{CompanyName}}?
```

---

## Email 3.2: Follow-Up #1 (Day 3)

### Subject Line
```
Re: {{CompanyName}} — automation idea
```

### Email Body
```
Hi {{FirstName}},

Bumping my note about automation for {{CompanyName}}.

The businesses I work with usually hit a point where {{CommonPain}} — and the choice is either hire more people or build smarter systems.

If that sounds familiar, happy to show you what "smarter systems" actually looks like in practice. No commitment to look.

Interested?

John
```

### CommonPain Variables
```
A. they're spending more time managing processes than growing the business
B. customer response times are slipping because the team is stretched thin
C. data lives in 5 different places and nobody has the full picture
D. they're manually doing work that should happen automatically
E. hiring can't keep up with demand
```

### CTA Variants
```
A. Interested?
B. Want to see an example?
C. 15 minutes to explore?
D. Should I send a quick overview?
```

---

## Email 3.3: Follow-Up #2 (Day 10)

### Subject Line
```
Re: {{CompanyName}} — automation idea
```

### Email Body
```
Hi {{FirstName}},

Quick win to share — we just deployed an automation system for {{CaseStudyBusiness}} that {{CaseStudyOutcome}}.

The total build took {{BuildTime}}. ROI hit within {{ROITime}}.

If {{CompanyName}} is dealing with {{TheirPain}}, this is exactly the kind of fix that pays for itself fast.

Worth a 15-minute call to scope it?

John
NorthStar Synergy
(425) 600-2267
```

### Case Study Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `{{CaseStudyBusiness}}` | Client reference | a staffing agency |
| `{{CaseStudyOutcome}}` | Specific result | auto-qualifies candidates and schedules interviews — saving 25 hours/week |
| `{{BuildTime}}` | Time to deploy | 2 weeks |
| `{{ROITime}}` | Payback period | the first month |
| `{{TheirPain}}` | Relevant pain point | manual scheduling and follow-up |

---

## Email 3.4: Breakup (Day 17 — Optional)

### Subject Line
```
{{CompanyName}} — closing the loop
```

### Email Body
```
Hi {{FirstName}},

I've reached out a few times about automation for {{CompanyName}} — sounds like the timing might not be right, and that's totally fine.

I'll leave it here. But when {{CompanyName}} hits the point where {{FuturePain}}, feel free to reach back out. We'll still be building this stuff.

Best of luck with {{CurrentFocus}}.

John
NorthStar Synergy
```

### FuturePain Variables
```
A. you need to scale without adding headcount
B. manual processes start breaking
C. growth outpaces your systems
D. you want to reclaim time from repetitive work
```

### CurrentFocus Variables
```
A. the growth
B. the busy season
C. the expansion
D. everything on your plate
```

---
---

# APPENDIX: UNIVERSAL RULES

## Encoding Checklist (Run Before Every Send)
- [ ] Pasted through plain-text editor (Notepad/TextEdit)
- [ ] No smart quotes (', ", –, —)
- [ ] No "?" where apostrophes should be
- [ ] All links tested and working
- [ ] No placeholder text remaining (`{{variables}}` all replaced)

## Timing Guidelines
- **Best days:** Tuesday, Wednesday, Thursday
- **Best times:** 9:30-11:00 AM or 1:30-3:00 PM (recipient's local time)
- **Avoid:** Monday morning, Friday afternoon, weekends (unless targeting solopreneurs)

## Response Handling
- **If they reply:** STOP sequence immediately. Respond within 2 hours.
- **If they ask for pricing:** Now OK to share (follow-ups are post-engagement)
- **If they say no:** Thank them, mark as closed, move on
- **If they ghost:** Breakup email at Day 17, then archive

## QA Command
```bash
python scripts/qa_email_lint.py email.txt        # First-touch
python scripts/qa_email_lint.py email.txt -f     # Follow-up (pricing OK)
```

**Thresholds:** ≥90% = SEND | 80-89% = FIX | <80% = REWRITE

---

*NorthStar Synergy — March 2026*
*"We don't just consult. We build. We operate. We deliver results."*
