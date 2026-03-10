# Personal CRM

Intelligent relationship management system with natural language interface.

## Features

✅ **Contact Management** - Auto-discover from email & calendar  
✅ **Relationship Scoring** - 0-100 score based on recency, frequency, engagement  
✅ **Natural Language Interface** - "Tell me about John", "Who needs attention?"  
✅ **Learning System** - Learns your skip patterns after ~50 decisions  
✅ **Timeline & Context** - Full interaction history with semantic search  
✅ **Smart Nudges** - Proactive reminders for contacts needing attention  
✅ **Meeting Integration** - Sync with calendar, track action items  
✅ **Company News** - Monitor high-signal news for your contacts' companies  
✅ **Email Drafts** - AI-generated drafts with full conversation context  

---

## Quick Start

### 1. Install Dependencies

```bash
cd crm/
pip install -r requirements.txt
```

### 2. Initialize Database

```bash
python crm_cli.py
```

Database `crm.db` will be created with full schema.

### 3. Try Natural Language Queries

```bash
# Interactive mode
python crm_cli.py

crm> stats
crm> who needs attention?
crm> tell me about john@example.com
crm> follow up with jane in 2 weeks

# Single query mode (for automation)
python crm_cli.py "who needs attention?"
```

---

## Gmail Integration (Optional)

### Enable Gmail API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable Gmail API
4. Create OAuth 2.0 credentials (Desktop app)
5. Download `credentials.json` to `crm/` directory

### Scan Email

```python
from gmail_scanner import GmailScanner
from db import CRMDB

db = CRMDB()
scanner = GmailScanner(db)

# Authenticate (opens browser first time)
scanner.authenticate()

# Scan last 24 hours
stats = scanner.scan_recent_emails(days=1, limit=100)
print(stats)  # {'contacts_added': 5, 'interactions_added': 23, 'skipped': 12}
```

### Auto-Add vs Manual Approval

**First 50 contacts:** Manual approval required  
**After 50 decisions:** System learns patterns, suggests auto-add mode  

```bash
# Review pending contacts
python crm_cli.py "pending contacts"

# Approve/reject in CLI (builds learning patterns)
```

---

## Discord/OpenClaw Integration

Add to your Discord bot or OpenClaw workflow:

```python
from crm.nlp import NLPInterface
from crm.db import CRMDB

db = CRMDB('crm/crm.db')
nlp = NLPInterface(db)

# Handle Discord message
@bot.command()
async def crm(ctx, *, query):
    result = nlp.execute(query)
    await ctx.send(result['message'])
```

**Example Discord usage:**
```
/crm tell me about john@example.com
/crm who needs attention?
/crm follow up with jane in 3 days
/crm stats
```

---

## Natural Language Commands

### Contact Lookup
```
"Tell me about [name]"         → Full relationship profile
"Show me [email]"              → Contact details
"Who at [company]?"            → List all contacts at company
"[name or email]"              → Quick search
```

### Relationship Management
```
"Who needs attention?"         → Contacts you haven't talked to recently
"Cold contacts"                → Same as above
"Follow up with [name] in 2 weeks"  → Schedule reminder
"Remind me about [name] in 3 days"  → Same as above
```

### Follow-Ups
```
"Follow ups"                   → List upcoming reminders
"Reminders"                    → Same as above
"Upcoming"                     → Same as above
```

### Analytics
```
"Stats"                        → CRM statistics
"Overview"                     → Same as above
```

---

## LLM Integration

**All AI calls route through centralized llm-router:**
- Contact summaries
- Email drafts
- Sentiment analysis
- Action item extraction
- Nudge generation

**Usage in Python:**
```python
from llm_bridge import generate_contact_summary, generate_email_draft

# Generate relationship summary
summary = generate_contact_summary(contact, interactions, timeline)
print(summary['summary_text'])

# Draft email with context
draft = generate_email_draft(
    contact=contact,
    relationship_summary=summary,
    recent_emails=recent_emails,
    prompt="Follow up on last week's meeting"
)
print(f"Subject: {draft['subject']}")
print(draft['body'])
```

**Usage in Node.js:**
```javascript
const { generateContactSummary } = require('./llm_integration');

const summary = await generateContactSummary({
    name: 'John Smith',
    email: 'john@example.com',
    company: 'Example Corp',
    interactions: [...],
    timeline: [...]
});
```

**Cost tracking:**
- `john-code` - Dev work (summaries, analysis)
- `john-outreach` - Sales (email drafts, nudges)

---

## Database Schema

**Core Tables:**
- `contacts` - People you interact with
- `interactions` - Emails, meetings, calls, notes
- `follow_ups` - Reminders and to-dos
- `contact_context` - Timeline entries with embeddings
- `contact_summaries` - LLM-generated relationship summaries

**Intelligence Tables:**
- `meetings` - Calendar events with transcripts
- `meeting_action_items` - Tasks from meetings
- `company_news` - High-signal news monitoring
- `skip_patterns` - Learning system for auto-filtering

**System Tables:**
- `crm_config` - Settings
- `system_log` - Event logging

---

## Relationship Scoring Algorithm

**Score = Weighted Average of:**

1. **Recency (35%)** - Exponential decay: `100 * e^(-days_since / 90)`
   - Today: 100
   - 30 days ago: ~72
   - 90 days ago: ~37
   - 180 days ago: ~14

2. **Frequency (25%)** - Interactions per month: `100 * (1 - e^(-interactions_per_month))`
   - 1/month: 100
   - 0.5/month: 67
   - 0.25/month: 44

3. **Priority (20%)** - Manual importance (0-100)
   - Set via: `UPDATE contacts SET priority = 90 WHERE email = 'vip@example.com'`

4. **Engagement (20%)** - Sentiment + meeting ratio + email depth
   - Positive sentiment: +100 points
   - Meetings: +20 per meeting (vs emails)
   - Long emails (1000+ chars): +20 points

**Recalculate scores:**
```bash
python crm_cli.py rescore
```

---

## Skip Patterns (Learning System)

CRM learns what to skip based on your approve/reject decisions:

**Auto-skipped:**
- Newsletters (`List-Unsubscribe` header)
- Noreply addresses
- Internal company domain (configurable)
- Large CCs (>10 people)
- Automated emails

**Learned patterns:**
- After 50 approve/reject decisions, system suggests auto-add mode
- Confidence score tracks accuracy (0-1)
- Patterns: domain, sender, subject keywords, meeting size

**Manual patterns:**
```sql
INSERT INTO skip_patterns (pattern_type, pattern_value, action, source)
VALUES ('domain', 'spam.com', 'skip', 'manual');
```

---

## Daily Cron Job

Automate CRM updates:

```python
from gmail_scanner import GmailScanner
from relationship_scorer import RelationshipScorer
from db import CRMDB

db = CRMDB('crm.db')
scanner = GmailScanner(db)
scorer = RelationshipScorer(db)

# 1. Scan last 24h of email
stats = scanner.scan_recent_emails(days=1, limit=200)

# 2. Update relationship scores
scorer.update_all_scores()

# 3. Generate nudges
nudges = scorer.generate_nudges(days_threshold=30, limit=5)

# 4. Report results (send to Discord/Slack)
message = f"""
📊 **Daily CRM Update**
- Contacts added: {stats['contacts_added']}
- Interactions: {stats['interactions_added']}
- Skipped: {stats['skipped']}

**Nudges:**
"""

for nudge in nudges:
    message += f"\n- {nudge['contact']['name']}: {nudge['reason']}"

# Send to your messaging channel
```

**Add to OpenClaw cron:**
```json
{
  "schedule": {"kind": "cron", "expr": "0 8 * * *", "tz": "America/Los_Angeles"},
  "payload": {"kind": "agentTurn", "message": "Run daily CRM sync and report results"},
  "sessionTarget": "isolated"
}
```

---

## Configuration

Edit `crm_config` table or use API:

```python
db.set_config('auto_add_threshold', '50')  # Decisions before suggesting auto-add
db.set_config('relationship_decay_days', '90')  # Recency decay rate
db.set_config('internal_domain', 'yourcompany.com')  # Skip internal emails
db.set_config('large_meeting_threshold', '10')  # Skip meetings with >N people
```

---

## Semantic Search (Advanced)

Enable vector embeddings for semantic contact search:

```python
# Requires sentence-transformers
pip install sentence-transformers

from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings

# Generate embedding for context entry
text = "Discussed Q4 pricing strategy and new enterprise tier"
embedding = model.encode(text).tolist()

# Save with context
db.add_context(
    contact_id=123,
    timestamp=datetime.utcnow().isoformat(),
    event_type='note',
    content=text,
    embedding=embedding
)

# Search (requires custom vector search - SQLite extension or external service)
```

---

## Email Draft System

Generate contextual email drafts:

```python
from email_drafter import EmailDrafter

drafter = EmailDrafter(db)

# Get thread context + contact history
draft = drafter.generate_draft(
    contact_email='john@example.com',
    thread_id='gmail_thread_id',
    prompt='Follow up on last week's meeting about partnership'
)

print(draft['subject'])
print(draft['body'])

# Approve and create in Gmail
drafter.create_draft_in_gmail(draft)
```

---

## API Reference

### CRMDB

```python
# Contacts
contact_id = db.add_contact(email, name, company='Acme', priority=80)
contact = db.get_contact(contact_id=123)
contact = db.get_contact(email='john@example.com')
results = db.search_contacts('john', limit=10)
needs_attention = db.get_contacts_needing_attention(days_threshold=30)

# Interactions
interaction_id = db.add_interaction(
    contact_id=123,
    interaction_type='email_sent',
    timestamp=datetime.utcnow().isoformat(),
    subject='Follow up',
    full_content='...'
)
interactions = db.get_contact_interactions(contact_id=123, limit=50)

# Follow-ups
follow_up_id = db.add_follow_up(
    contact_id=123,
    due_date=(datetime.utcnow() + timedelta(days=7)).isoformat(),
    title='Follow up on proposal',
    priority=80
)
due = db.get_due_follow_ups(days_ahead=7)
db.snooze_follow_up(follow_up_id, days=3)
db.complete_follow_up(follow_up_id)

# Summaries & Context
db.save_summary(contact_id, summary_text, summary_type='relationship')
summary = db.get_summary(contact_id, 'relationship')
timeline = db.get_contact_timeline(contact_id, limit=100)

# Stats
stats = db.get_stats()
```

### RelationshipScorer

```python
scorer = RelationshipScorer(db)

# Score individual contact
score = scorer.calculate_score(contact_id)  # 0-100

# Update all scores
count = scorer.update_all_scores()

# Generate nudges
nudges = scorer.generate_nudges(days_threshold=30, limit=5)

# Profile relationship
profile = scorer.profile_relationship(contact_id)
# Returns: {type, communication_style, key_topics, best_channel}
```

### NLPInterface

```python
nlp = NLPInterface(db)

# Parse query
parsed = nlp.parse("tell me about john")
# Returns: {intent, params, raw_query}

# Execute query
result = nlp.execute("who needs attention?")
# Returns: {intent, success, message, data}
```

---

## Roadmap

**Phase 1 (Current):**
- ✅ Database schema
- ✅ Contact management
- ✅ Relationship scoring
- ✅ Natural language interface
- ✅ Gmail integration
- ✅ Learning system

**Phase 2 (Next):**
- ⏳ Calendar sync (Google Calendar API)
- ⏳ Meeting transcripts (integration with Otter/Fireflies)
- ⏳ Company news monitoring (via newsapi.org)
- ⏳ Semantic search (vector embeddings)
- ⏳ Email draft generation (LLM)

**Phase 3 (Future):**
- WhatsApp/SMS integration
- LinkedIn scraping
- Automated follow-up suggestions
- Relationship health dashboard
- Mobile app (React Native)

---

## Troubleshooting

**"Gmail API not available"**
```bash
pip install google-auth-oauthlib google-api-python-client
```

**"credentials.json not found"**
- Download from Google Cloud Console
- Place in `crm/` directory

**"No contacts found"**
- Run email scanner: `scanner.scan_recent_emails(days=7)`
- Manually add: `db.add_contact('email@example.com', 'Name')`

**"Relationship scores all 0"**
```bash
python crm_cli.py rescore
```

**"How do I reset the database?"**
```bash
rm crm.db
python crm_cli.py  # Recreates from schema.sql
```

---

## Security

- **Local storage only** - All data in `crm.db` (SQLite)
- **Gmail OAuth** - Uses standard Google OAuth flow
- **No external APIs** - (except Gmail/Calendar if enabled)
- **Token storage** - `token.json` stores Gmail credentials locally

**Backup:**
```bash
# Backup database
cp crm.db crm_backup_$(date +%Y%m%d).db

# Backup credentials
cp token.json token_backup.json
```

---

## Support

Built by John for Craig @ NorthStar Synergy.

Questions? Message in Discord #inter-agent channel.
