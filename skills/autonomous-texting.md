# AUTONOMOUS TEXTING SKILL — Send SMS to Business Owners

**PURPOSE:** Send professional sales texts to local business owners without Craig's involvement

**WHEN TO USE:**
- Pitching websites to businesses without websites
- Following up on leads
- Responding to inquiries
- Booking appointments or demos

---

## TEXTING PLATFORM OPTIONS (2026)

### Option 1: Twilio (RECOMMENDED)
**Pros:**
- Industry standard, best documentation
- Reliable delivery (99.95% uptime)
- Free trial: 50 messages/day
- Cost after trial: $0.0079/SMS (~$5/month for 600 texts)
- Easy API, 5-minute setup

**Cons:**
- Requires phone number verification
- Trial account shows "Sent from Twilio trial account" (upgrade removes this)

**Setup:**
1. Sign up: https://www.twilio.com/try-twilio
2. Verify your phone number
3. Get free trial credits
4. Create API credentials
5. Send 50 messages/day FREE

### Option 2: Plivo
**Pros:**
- Slightly cheaper than Twilio
- Similar API structure
- Good international coverage

**Cons:**
- Less documentation
- Smaller community

### Option 3: Vonage (Nexmo)
**Pros:**
- Free tier available
- Good for high-volume

**Cons:**
- More complex setup
- API less intuitive

---

## TWILIO INTEGRATION (Node.js)

### Installation
```bash
npm install twilio
```

### Send SMS Script
```javascript
// autonomous-text.js
const twilio = require('twilio');

// Craig: Add your Twilio credentials here after signup
const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const fromNumber = '+1YOURNUMBER'; // Your Twilio number

const client = twilio(accountSid, authToken);

async function sendText(toNumber, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber
    });
    
    console.log(`✅ Text sent to ${toNumber}`);
    console.log(`Message SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error(`❌ Failed to send text: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Export for use in other scripts
module.exports = { sendText };

// Test usage
if (require.main === module) {
  const targetNumber = process.argv[2];
  const messageText = process.argv[3];
  
  if (!targetNumber || !messageText) {
    console.log('Usage: node autonomous-text.js "+12063693776" "Your message here"');
    process.exit(1);
  }
  
  sendText(targetNumber, messageText);
}
```

### Usage Examples
```bash
# Send Kevin the website pitch
node autonomous-text.js "+12063693776" "Hey Kevin! Saw your 155 reviews on Yelp. Built you a website to check out: kevins-yard-work.vercel.app - $250 one-time if you like it. Interested?"

# Follow up after 2 days
node autonomous-text.js "+12063693776" "Hey Kevin, just following up on the website I built for you. Any questions? Happy to hop on a quick call."
```

---

## TEXTING BEST PRACTICES (LOCAL BUSINESSES)

### Timing
- **Best times:** 10 AM - 12 PM, 2 PM - 4 PM (weekdays)
- **Avoid:** Before 9 AM, after 6 PM, weekends
- **Follow-up cadence:** Day 1 → Day 3 → Day 7 (then stop)

### Length
- **Ideal:** 140-160 characters (1 SMS segment)
- **Max:** 320 characters (2 segments, still readable)
- **Never:** 500+ characters (looks spammy)

### Structure (AIDA Framework)
1. **Attention:** Hook (compliment, pain point, curiosity)
2. **Interest:** What you built/offer
3. **Desire:** Link to see it + benefit
4. **Action:** Simple CTA ("Interested?" or "Want to talk?")

### Template Library

#### Initial Pitch (Website Built)
```
Hey [NAME]! Saw your [REVIEWS] on Yelp. Built you a website to check out: [URL]

Takes 30 seconds to look. $250 one-time if you like it. You're losing calls to competitors with websites. Interested?
```

#### Follow-Up #1 (Day 3)
```
Hey [NAME], following up on the website I built. Did you get a chance to look? Happy to answer any questions or hop on a quick call.
```

#### Follow-Up #2 (Day 7 - Final)
```
[NAME], last follow-up on the website. If timing isn't right now, no worries! Keeping it live for you if you change your mind. Good luck with the season!
```

#### Response to "How much?"
```
$250 one-time to transfer ownership + $10/month hosting (first month free). You own the domain, content, everything. Can have it live in 24 hours.
```

#### Response to "I'll think about it"
```
Totally understand! No pressure. I'll keep the site live for a week. If you want to see how it looks on mobile or have questions, just text back anytime.
```

#### Response to "Too expensive"
```
I hear you. What were you thinking budget-wise? I can adjust the package—maybe start with just the basics and add features later?
```

---

## CRM LOGGING (REQUIRED)

**Every text sent MUST be logged to CRM:**

```javascript
const fs = require('fs');

function logTextToCRM(businessName, contactName, phone, messageText) {
  const timestamp = new Date().toISOString();
  const crmEntry = {
    date: timestamp.split('T')[0],
    time: timestamp.split('T')[1].split('.')[0],
    business: businessName,
    contact: contactName,
    phone: phone,
    pitch_channel: 'SMS',
    pitch_text: messageText,
    response: '',
    status: 'CONTACTED',
    estimated_income_onetime: 250,
    estimated_income_monthly: 10,
    notes: 'Initial outreach via SMS'
  };
  
  // Append to JSONL
  fs.appendFileSync(
    'sales-crm-pitch-log.jsonl',
    JSON.stringify(crmEntry) + '\n'
  );
  
  // Append to CSV (human-readable)
  const csvRow = `${crmEntry.date},${crmEntry.time},"${crmEntry.business}","${crmEntry.contact}",${crmEntry.phone},,,,"${crmEntry.pitch_channel}","${crmEntry.pitch_text}","",${crmEntry.status},${crmEntry.estimated_income_onetime},${crmEntry.estimated_income_monthly},"${crmEntry.notes}"\n`;
  fs.appendFileSync('sales-crm.csv', csvRow);
  
  console.log('✅ Logged to CRM');
}
```

---

## SETUP CHECKLIST

**Craig's Action Items:**
1. ☐ Sign up for Twilio: https://www.twilio.com/try-twilio
2. ☐ Verify your phone number
3. ☐ Get a Twilio phone number (free with trial)
4. ☐ Copy Account SID from dashboard
5. ☐ Copy Auth Token from dashboard
6. ☐ Add credentials to TOOLS.md:
   ```
   ## Twilio SMS
   - Account SID: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   - Auth Token: your_auth_token_here
   - From Number: +1YOURNUMBER
   ```
7. ☐ Install Twilio package: `npm install twilio`
8. ☐ Test with one message (to yourself first)
9. ☐ Grant John permission to text autonomously

**John's Action Items:**
1. ☐ Read Twilio credentials from TOOLS.md
2. ☐ Send test message to Craig's phone (verify it works)
3. ☐ Text Kevin with website pitch
4. ☐ Log every text to CRM (sales-crm-pitch-log.jsonl)
5. ☐ Follow up on responses within 2 hours
6. ☐ Track conversion rate (texts sent → responses → deals closed)

---

## COMPLIANCE & BEST PRACTICES

### TCPA Compliance (USA)
- **Only text businesses** (not consumers at home numbers)
- **Identify yourself:** "I'm John from NorthStar Synergy"
- **Offer opt-out:** If they reply "STOP", never text again
- **Business hours only:** 9 AM - 6 PM local time
- **One business = one text thread** (don't spam from multiple numbers)

### Do's
✅ Compliment their business first  
✅ Show what you built (proof)  
✅ Make it easy to say yes  
✅ Respect "not interested"  
✅ Log everything to CRM  

### Don'ts
❌ Text after 6 PM or before 9 AM  
❌ Send more than 3 texts total  
❌ Use all caps (LOOKS SPAMMY)  
❌ Send links without context  
❌ Lie or exaggerate  

---

## COST ANALYSIS

**Twilio Free Trial:**
- 50 messages/day
- Enough for 1-2 months of outreach (30 pitches/month)

**After Trial:**
- $0.0079/SMS
- 20 texts/day × 30 days = 600 texts/month = **$4.74/month**
- 1 deal ($250) = 52x ROI

**Phone number rental:**
- $1.15/month (optional, only if upgrading from trial)

**Total monthly cost:** ~$6/month for unlimited autonomous outreach

---

## SUCCESS METRICS (Track Weekly)

| Metric | Target | Track In |
|--------|--------|----------|
| Texts Sent | 20-30/week | CRM |
| Response Rate | 20%+ | CRM |
| Positive Responses | 5+/week | CRM |
| Deals Closed | 1-2/week | jobs.jsonl |
| Cost per Deal | <$1 | Twilio dashboard |
| ROI | 250x+ | Calculated |

---

## INTEGRATION WITH EXISTING WORKFLOW

**Full Autonomous Loop:**
1. Find business without website (Yelp/Google)
2. Verify NO existing website (Google search)
3. Build website (Next.js, 45 min)
4. Deploy to Vercel (2 min)
5. **TEXT business owner** ← NEW STEP (autonomous)
6. Log to CRM (sales-crm-pitch-log.jsonl)
7. Track response
8. Follow up automatically (Day 3, Day 7)
9. Close deal
10. Deliver & collect payment

**Craig's role:** Only review closed deals + approve payment collection

**John's role:** EVERYTHING else (fully autonomous)

---

## STATUS

**Ready to execute when:**
✅ Twilio credentials added to TOOLS.md  
✅ Craig approves autonomous texting  
✅ Test message sent successfully  

**Then:**
🚀 Text Kevin immediately  
🚀 Start 20-30 pitches/week  
🚀 Close first deal this week  
🚀 Scale to $5K/month in 2 months  

---

**GOAL:** Fully autonomous sales engine. I find leads, build websites, pitch via text, handle objections, close deals. Craig only reviews payment collection.

**REVENUE TARGET:** $1,000/month by Month 1, $5,000/month by Month 3.
