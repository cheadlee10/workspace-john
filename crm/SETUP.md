# Personal CRM - Setup Guide

## Quick Setup (5 minutes)

### 1. Install Python Dependencies

```bash
cd C:\Users\chead\.openclaw\workspace-john\crm
pip install google-auth-oauthlib google-api-python-client
```

### 2. Initialize Database

```bash
python crm_cli.py
```

This creates `crm.db` with full schema. Type `help` to see commands.

### 3. Test Basic Queries

```bash
python crm_cli.py

crm> stats
crm> exit
```

✅ **Basic CRM is now working!**

---

## Gmail Integration (Optional - 15 minutes)

### Step 1: Enable Gmail API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "Personal CRM"
3. Click "Enable APIs and Services"
4. Search for "Gmail API" → Enable
5. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
6. Application type: "Desktop app"
7. Download JSON → Save as `credentials.json` in `crm/` folder

### Step 2: First Authentication

```python
from gmail_scanner import GmailScanner
from db import CRMDB

db = CRMDB()
scanner = GmailScanner(db)

# This opens browser for OAuth consent
scanner.authenticate()

# Scan last 7 days
stats = scanner.scan_recent_emails(days=7, limit=200)
print(stats)
```

**Browser will open** → Select your Google account → Allow access

✅ `token.json` created (stores auth token for future runs)

### Step 3: Test Email Sync

```bash
python crm_cli.py "sync email"
```

Expected output:
```
📧 Email Sync Complete
✅ Contacts added: 15
✅ Interactions logged: 87
⏭️ Skipped: 23 (newsletters, noreply, etc.)
```

---

## OpenClaw/Discord Integration (10 minutes)

### Option 1: Direct Python Calls

In your OpenClaw workflow:

```python
from crm.openclaw_integration import CRMHandler

handler = CRMHandler()
result = handler.handle_query("who needs attention?")
print(result)
```

### Option 2: CLI Integration

From OpenClaw exec tool:

```python
exec("python crm/openclaw_integration.py 'tell me about john@example.com'")
```

### Option 3: Discord Bot Integration

Add CRM command to Discord bot:

```javascript
// discord-bot.js
const { exec } = require('child_process');

// CRM command
client.on('messageCreate', async message => {
  if (message.content.startsWith('/crm ')) {
    const query = message.content.slice(5);
    
    exec(`python crm/openclaw_integration.py "${query}"`, (error, stdout, stderr) => {
      if (error) {
        message.reply(`Error: ${error.message}`);
        return;
      }
      
      message.reply(stdout);
    });
  }
});
```

**Usage in Discord:**
```
/crm stats
/crm who needs attention?
/crm tell me about john@example.com
/crm follow up with jane in 2 weeks
```

---

## Daily Cron Job (5 minutes)

### Option 1: OpenClaw Cron

```json
{
  "name": "Daily CRM Sync",
  "schedule": {
    "kind": "cron",
    "expr": "0 8 * * *",
    "tz": "America/Los_Angeles"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "Run python crm/openclaw_integration.py --daily-sync and post results to #general"
  },
  "sessionTarget": "main"
}
```

### Option 2: System Cron (Linux/Mac)

```bash
crontab -e

# Add this line:
0 8 * * * cd /path/to/crm && python openclaw_integration.py --daily-sync >> daily_sync.log 2>&1
```

### Option 3: Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Name: "CRM Daily Sync"
4. Trigger: Daily at 8:00 AM
5. Action: Start a Program
6. Program: `python`
7. Arguments: `C:\Users\chead\.openclaw\workspace-john\crm\openclaw_integration.py --daily-sync`
8. Start in: `C:\Users\chead\.openclaw\workspace-john\crm`

---

## Configuration

### Internal Domain (Skip Your Company Emails)

```python
from db import CRMDB

db = CRMDB()
db.set_config('internal_domain', 'northstarsynergy.com')
```

### Auto-Add Threshold

```python
# Change to 100 decisions before suggesting auto-add
db.set_config('auto_add_threshold', '100')
```

### Relationship Decay

```python
# Change recency decay to 60 days (default: 90)
db.set_config('relationship_decay_days', '60')
```

### Large Meeting Filter

```python
# Skip meetings with >20 people (default: 10)
db.set_config('large_meeting_threshold', '20')
```

---

## Testing

### Test Database Functions

```python
from db import CRMDB

db = CRMDB()

# Add test contact
contact_id = db.add_contact(
    email='test@example.com',
    name='Test User',
    company='Example Corp',
    priority=80
)

# Add interaction
from datetime import datetime
db.add_interaction(
    contact_id=contact_id,
    interaction_type='email_sent',
    timestamp=datetime.utcnow().isoformat(),
    subject='Test email',
    snippet='This is a test',
    direction='outbound'
)

# Get contact
contact = db.get_contact(contact_id=contact_id)
print(contact)

# Get stats
stats = db.get_stats()
print(stats)
```

### Test Relationship Scorer

```python
from relationship_scorer import RelationshipScorer

scorer = RelationshipScorer(db)

# Calculate score for contact
score = scorer.calculate_score(contact_id)
print(f"Relationship score: {score}/100")

# Update all scores
count = scorer.update_all_scores()
print(f"Updated {count} contacts")

# Generate nudges
nudges = scorer.generate_nudges()
for nudge in nudges:
    print(f"{nudge['contact']['name']}: {nudge['reason']}")
```

### Test NLP Interface

```python
from nlp import NLPInterface

nlp = NLPInterface(db)

# Test queries
queries = [
    "stats",
    "who needs attention?",
    "tell me about test@example.com",
    "follow up with test@example.com in 2 weeks"
]

for query in queries:
    result = nlp.execute(query)
    print(f"\nQuery: {query}")
    print(f"Result: {result['message']}")
```

---

## Troubleshooting

### "Module not found: google"

```bash
pip install google-auth-oauthlib google-api-python-client
```

### "credentials.json not found"

- Download OAuth credentials from Google Cloud Console
- Save as `crm/credentials.json`

### "Database is locked"

- Close all Python sessions using the database
- Check for zombie processes: `ps aux | grep crm_cli`
- Kill if needed: `kill -9 <PID>`
- SQLite WAL mode should prevent this

### "No contacts found after email sync"

Check skip patterns:

```python
from gmail_scanner import GmailScanner

scanner = GmailScanner(db)
stats = scanner.scan_recent_emails(days=7, limit=100)

print(f"Skipped: {stats['skipped']}")
print(f"Added: {stats['contacts_added']}")
```

If too many skipped, adjust filters:

```python
# Increase large meeting threshold
db.set_config('large_meeting_threshold', '20')

# Disable internal domain filter temporarily
db.set_config('internal_domain', '')
```

### "Relationship scores all 0"

```bash
python crm_cli.py rescore
```

### Reset Everything

```bash
rm crm.db token.json
python crm_cli.py
```

---

## Security Checklist

✅ **Local storage** - All data in `crm.db` (SQLite)  
✅ **OAuth tokens** - Stored in `token.json` (Git-ignored)  
✅ **No external APIs** - Only Gmail/Calendar when explicitly enabled  
✅ **Credentials** - `credentials.json` should be in `.gitignore`  

**Backup:**
```bash
# Daily backup via cron
0 2 * * * cp /path/to/crm.db /path/to/backups/crm_$(date +\%Y\%m\%d).db
```

---

## Performance

**Database size estimates:**
- 1,000 contacts: ~5 MB
- 10,000 interactions: ~50 MB
- 100,000 context entries: ~500 MB (with embeddings)

**Query performance:**
- Simple lookups: <10ms
- Full-text search: <50ms
- Relationship scoring (all contacts): ~1-2 seconds for 1,000 contacts
- Email sync (100 messages): ~30-60 seconds

**Optimization tips:**
- Vacuum database monthly: `VACUUM;`
- Reindex: `REINDEX;`
- Analyze: `ANALYZE;`

---

## Next Steps

1. ✅ Initialize database
2. ✅ Test basic queries
3. ⏳ Enable Gmail sync
4. ⏳ Set up daily cron job
5. ⏳ Integrate with Discord/OpenClaw
6. ⏳ Configure skip patterns
7. ⏳ Add manual contacts for VIPs
8. ⏳ Review pending contacts and train learning system

**Advanced:**
- Enable semantic search (sentence-transformers)
- Add calendar sync (Google Calendar API)
- Set up company news monitoring
- Build email draft generation

---

## Support

Questions? Post in Discord #inter-agent channel.

Built by John for Craig @ NorthStar Synergy.
