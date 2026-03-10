# CRM LLM Integration

**All AI calls route through centralized llm-router**

## Architecture

```
Python CRM Code
    ↓
llm_bridge.py (Python wrapper)
    ↓
subprocess → Node.js
    ↓
llm_integration.js
    ↓
C:/Users/chead/llm-router/shared/llm-router.js
    ↓
askOpus(prompt, 'john-code' | 'john-outreach')
    ↓
Anthropic API
```

## Cost Tracking Tags

| Tag | Use Case | Examples |
|-----|----------|----------|
| `john-code` | Dev/analysis work | Contact summaries, sentiment analysis, action items |
| `john-outreach` | Sales/communication | Email drafts, nudge generation |

## Features

### 1. Contact Summaries

**What:** Generate relationship analysis from CRM data  
**Tag:** `john-code`  
**Cost:** ~500 tokens/summary  

```python
from llm_bridge import generate_contact_summary

summary = generate_contact_summary(
    contact={'name': 'John', 'email': 'john@co.com', 'company': 'Acme'},
    interactions=[...],  # Recent emails/meetings
    timeline=[...]       # Timeline events
)

# Returns:
# {
#     'summary_text': '2-3 sentence overview...',
#     'key_points': ['Topic 1', 'Topic 2', ...]
# }
```

**Database integration:**
```python
from db import CRMDB

db = CRMDB()
summary = db.generate_and_save_summary(contact_id=123)
```

### 2. Email Drafts

**What:** Generate context-aware emails  
**Tag:** `john-outreach`  
**Cost:** ~800 tokens/draft  

```python
from llm_bridge import generate_email_draft

draft = generate_email_draft(
    contact={'name': 'Jane', 'email': 'jane@co.com'},
    relationship_summary=summary,
    recent_emails=[...],  # Email thread context
    prompt='Follow up on partnership discussion'
)

# Returns:
# {
#     'subject': 'Re: Partnership Discussion',
#     'body': 'Hi Jane,\n\nFollowing up...'
# }
```

### 3. Sentiment Analysis

**What:** Classify email/message sentiment  
**Tag:** `john-code`  
**Cost:** ~200 tokens/analysis  

```python
from llm_bridge import analyze_sentiment

sentiment = analyze_sentiment(email_body)
# Returns: 'positive' | 'neutral' | 'negative'
```

**Auto-applied to interactions:**
```python
db.add_interaction(
    contact_id=123,
    interaction_type='email_received',
    full_content=email_body,
    sentiment=analyze_sentiment(email_body)  # Auto-analyzed
)
```

### 4. Action Item Extraction

**What:** Extract tasks from meeting transcripts  
**Tag:** `john-code`  
**Cost:** ~1000 tokens/meeting  

```python
from llm_bridge import extract_action_items

action_items = extract_action_items({
    'title': 'Q1 Planning Call',
    'transcript': '...',
    'attendees': ['craig@...', 'john@...']
})

# Returns:
# [
#     {
#         'task': 'Send proposal by Friday',
#         'assignee_email': 'craig@...',
#         'owner_is_me': True,
#         'due_date': '2026-03-01',
#         'priority': 80
#     },
#     ...
# ]
```

### 5. Nudge Generation

**What:** Personalized re-engagement suggestions  
**Tag:** `john-outreach`  
**Cost:** ~300 tokens/nudge  

```python
from llm_bridge import generate_nudge

nudge = generate_nudge(
    contact={'name': 'Bob', 'company': 'Startup Inc'},
    days_since=45,
    relationship_type='client'
)

# Returns: "Share that article about AI you discussed last month"
```

## Testing

**Run comprehensive test suite:**
```bash
cd C:\Users\chead\.openclaw\workspace-john\crm
python test_llm.py
```

**Tests:**
1. ✅ Contact summary generation
2. ✅ Email draft generation
3. ✅ Sentiment analysis
4. ✅ Nudge generation
5. ✅ Database integration

**Expected output:**
```
🧪 Testing CRM LLM Integration with llm-router
==========================================

1️⃣  Testing Contact Summary Generation...
✅ Summary generated successfully!

2️⃣  Testing Email Draft Generation...
✅ Email draft generated successfully!

3️⃣  Testing Sentiment Analysis...
   ✅ Success rate: 100%

4️⃣  Testing Nudge Generation...
✅ Nudge generated successfully!

5️⃣  Testing Database Integration...
✅ Database integration successful!

📊 Test Results
==========================================
   ✅ PASS: Contact Summary
   ✅ PASS: Email Draft
   ✅ PASS: Sentiment Analysis
   ✅ PASS: Nudge Generation
   ✅ PASS: Database Integration

   Overall: 5/5 tests passed

🎉 All tests passed! LLM integration working correctly.
```

## Cost Estimates

| Feature | Tokens | Cost (Sonnet 4) | Frequency |
|---------|--------|-----------------|-----------|
| Contact summary | ~500 | $0.0075 | On-demand |
| Email draft | ~800 | $0.012 | As needed |
| Sentiment analysis | ~200 | $0.003 | Per email |
| Action items | ~1000 | $0.015 | Per meeting |
| Nudge | ~300 | $0.0045 | Per nudge |

**Daily automation estimate:**
- 50 emails scanned: 50 × $0.003 = $0.15
- 5 summaries generated: 5 × $0.0075 = $0.0375
- 2 email drafts: 2 × $0.012 = $0.024
- **Total: ~$0.21/day** (~$6.30/month)

## Troubleshooting

### "Module 'llm_bridge' not found"
```bash
cd C:\Users\chead\.openclaw\workspace-john\crm
python -c "from llm_bridge import generate_contact_summary; print('OK')"
```

### "llm_integration.js not found"
Check path: `C:\Users\chead\.openclaw\workspace-john\crm\llm_integration.js`

### "llm-router not found"
Verify router exists: `C:/Users/chead/llm-router/shared/llm-router.js`

### "askOpus is not a function"
Check llm-router exports `askOpus`:
```javascript
const { askOpus } = require('C:/Users/chead/llm-router/shared/llm-router');
console.log(typeof askOpus); // Should be 'function'
```

### Test individual feature

**Contact summary:**
```bash
node crm/llm_integration.js summarize '{"name":"John","email":"john@co.com","company":"Acme","interactions":[],"timeline":[]}'
```

**Sentiment:**
```bash
node crm/llm_integration.js sentiment '{"content":"Thanks for your help!"}'
```

## Node.js Usage (Direct)

```javascript
const { generateContactSummary, generateEmailDraft } = require('./llm_integration');

// Generate summary
const summary = await generateContactSummary({
    name: 'John Smith',
    email: 'john@example.com',
    company: 'Example Corp',
    interactions: [...],
    timeline: [...]
});

console.log(summary.summary_text);
console.log(summary.key_points);

// Generate email draft
const draft = await generateEmailDraft({
    contact_email: 'jane@example.com',
    contact_name: 'Jane Doe',
    relationship_summary: summary,
    recent_emails: [...],
    prompt: 'Follow up on last meeting'
});

console.log(`Subject: ${draft.subject}`);
console.log(draft.body);
```

## Python Usage (via Bridge)

```python
from llm_bridge import (
    generate_contact_summary,
    generate_email_draft,
    analyze_sentiment,
    extract_action_items,
    generate_nudge
)

# All functions automatically route through llm-router
summary = generate_contact_summary(contact, interactions, timeline)
draft = generate_email_draft(contact, summary, emails, prompt)
sentiment = analyze_sentiment(text)
action_items = extract_action_items(meeting)
nudge = generate_nudge(contact, days_since, relationship_type)
```

## Adding New AI Features

**1. Add to llm_integration.js:**
```javascript
async function newFeature(data) {
    const prompt = `...`;
    const response = await askOpus(prompt, 'john-code'); // or 'john-outreach'
    return response;
}

module.exports = { newFeature, ... };
```

**2. Add to llm_bridge.py:**
```python
def new_feature(data: Dict) -> str:
    """Wrapper for new feature"""
    return self._call_node('new_feature', data)
```

**3. Add CLI command:**
```javascript
// In llm_integration.js main block
case 'new_feature':
    result = await newFeature(data);
    break;
```

**4. Test it:**
```bash
python -c "from llm_bridge import new_feature; print(new_feature({...}))"
```

## Best Practices

1. **Always use the bridge** - Never call OpenAI directly
2. **Choose correct tag** - `john-code` for analysis, `john-outreach` for sales
3. **Batch when possible** - Generate multiple summaries in one session
4. **Cache results** - Save summaries to DB, refresh monthly
5. **Monitor costs** - Check llm-router logs for spend per tag
6. **Test first** - Run `test_llm.py` before deploying new features

## Files

```
crm/
├── llm_integration.js (8.8KB) - Node.js LLM wrapper
├── llm_bridge.py (8KB) - Python bridge
├── test_llm.py (8.5KB) - Test suite
└── LLM_INTEGRATION.md (this file)
```

## Support

Issues with LLM integration? Check:
1. ✅ llm-router is running
2. ✅ Node.js installed (v14+)
3. ✅ Python 3.8+
4. ✅ All files in crm/ directory
5. ✅ Run `python test_llm.py` to diagnose

---

**Built by John for Craig @ NorthStar Synergy**  
**All AI calls routed through llm-router for cost tracking** ✅
