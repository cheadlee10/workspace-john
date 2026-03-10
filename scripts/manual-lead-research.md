# Manual Lead Research Workflow
*Since Fiverr/Upwork require login, manual research is faster than scraping.*

## Daily Workflow (20 min max)

### 1. Reddit Scan (5 min)
- Browse r/forhire, r/slavelabour, r/webdev, r/learnpython
- Sort by "New"
- Look for posts matching these keywords:
  - "excel" / "spreadsheet" / "formula"
  - "python" / "script" / "automation"
  - "web" / "app" / "full-stack"
  - "api" / "integration" / "webhook"
  - "data" / "cleaning" / "reporting"
- Copy promising posts to `leads.jsonl`
- Reply to 2-3 most recent with template

### 2. Twitter Search (5 min)
Search hashtags:
- #freelance #hireme #hiring
- #excel #python #webdev
- Sort by "Latest"
- Follow promising prospects
- Reply to 1-2 recent tweets with pitch

### 3. LinkedIn Outreach (5 min)
- Search for "small business owners" + "business analyst"
- Look at recent activity (posts about manual work, spreadsheets)
- Send 3 connection requests with personalized note
- Example: "Hey [Name], saw your post about [problem]. I solve that. Chat?"

### 4. Log Everything (5 min)
- Add all new leads to `leads.jsonl`
- Set reminder to follow up tomorrow if no response
- Update status from "new" → "contacted"

---

## Lead Search Filters

### Good Leads (High Conversion Likelihood)
✓ Specific problem ("Our Excel file is slowing down")
✓ Budget mentioned ("$500-1000")
✓ Timeline mentioned ("Need by Friday")
✓ Sounds professional (grammar, clear communication)
✓ Multiple people involved (bigger budgets)

### Bad Leads (Skip These)
❌ Vague problem ("I need help with something")
❌ No budget or "let's see what it costs"
❌ Unrealistic timeline ("Need today, $50")
❌ Poor communication (typos, unclear)
❌ Sounds like personal project (hobby level)

---

## Reddit Post Structure
Sample post you're looking for:

> "Looking for a freelancer to [specific task]. Need [timeline]. Budget [$ amount]. Must be [quality requirement]."

Copy the link + details → `leads.jsonl`
Example entry:
```json
{"id":"reddit-20260224-001","date":"2026-02-24","source":"reddit","client":"John_Smith","service":"Excel Automation","estimated_value":500,"status":"new","notes":"r/slavelabour post about data consolidation"}
```

---

## Twitter Pitch Structure
When replying to hiring tweets:

"I can handle this. [X years/projects] in [service]. 
- [Solution 1]
- [Solution 2]
- Timeline: [X days]. Budget: $[X]
DM me or reply here."

Keep under 280 characters. Add relevant emoji (💬 for messaging, 🚀 for launch, etc).

---

## LinkedIn Cold Outreach
When reaching out cold:

**Connection request message:**
"Hey [Name], I saw your post about [problem]. I specialize in solving exactly that. Would love to chat — I might be able to save you time/money."

**If they accept + message back:**
"Thanks for connecting! Quick question — how are you currently [solving problem]? I've helped [X clients] with [specific improvement]."

Let them ask questions. Only pitch if they're interested.

---

## Entry Template for leads.jsonl
```json
{
  "id": "[date]-[source]-[number]",
  "date": "2026-02-24",
  "source": "reddit|twitter|linkedin|email|other",
  "client": "Name or Username",
  "service": "Excel|Python|Web|Bot|Data|API",
  "estimated_value": 250,
  "status": "new|contacted|proposal_sent|negotiating|closed|lost",
  "notes": "Where/how you found them + context"
}
```

---

## Conversion Goals
- **Contact Rate:** 100% (respond to everything)
- **Response Rate:** 50%+ (they reply to you)
- **Proposal Rate:** 60% of responses (send detailed quote)
- **Close Rate:** 30% of proposals (they pay)

**Overall:** 100% → 50% → 30% → 9% = ~9% contact-to-deal
Goal: 15+ contacts/week = 1.5 deals/week = $600-1500/week

---

## Weekly Lead Targets
| Day | Platform | Target | Est. Leads |
|-----|----------|--------|-----------|
| Mon | Reddit | 3 posts | 3 |
| Tue | Twitter | 5 tweets | 3 |
| Wed | Reddit | 3 posts | 3 |
| Thu | LinkedIn | 3 profiles | 3 |
| Fri | Twitter | 5 tweets | 3 |
| Sat | Reddit | 2 posts | 2 |
| Sun | Cleanup & follow-up | — | — |
| **Total** | — | — | **17** |

---

## Follow-Up Sequence
1. **T+0:** Initial response (same day or within 2h)
2. **T+24h:** If no reply → Gentle nudge ("Still interested?")
3. **T+48h:** If no reply → Mark as "lost", move on

Don't waste time chasing. Move to next lead.

---

## Automation Ideas (Future)
- Browser extension to auto-monitor Reddit/Twitter
- Email digest of new posts matching keywords
- Auto-response templates in clipboard (quick paste)
- Daily reminder to do 20-min research
- Lead scoring (which types convert best)
