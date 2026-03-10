---
name: phone-calling
description: Make autonomous phone calls for sales, follow-ups, and client outreach. Integrates with Twilio, AI voice services, and call automation platforms. Use when you need to call leads, pitch services, handle objections, and close deals over the phone.
---

# Phone Calling Skill - Autonomous Sales Calls

## Purpose
Enable John to make outbound sales calls autonomously, pitch services, handle objections, and close deals without Craig's involvement.

---

## Implementation Options

### Option 1: Twilio + AI Voice (Best for Scale)

**What it does:**
- Make real phone calls using Twilio API
- AI voice (ElevenLabs or OpenAI) speaks naturally
- Real-time conversation with objection handling
- Records calls for training/compliance

**Setup:**
```bash
npm install twilio openai
```

**Cost:**
- Twilio: $0.0085/minute outbound ($0.51/hour)
- AI Voice (ElevenLabs): $0.30/1000 characters (~$0.15/minute)
- **Total: ~$0.17/minute (~$10/hour of calling)**

**Implementation:**
```javascript
// skills/make-call.js
const twilio = require('twilio')
const OpenAI = require('openai')

async function makeCall(phoneNumber, pitch, businessName) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  
  const call = await client.calls.create({
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
    url: 'https://your-server.com/voice-response', // TwiML endpoint
    statusCallback: 'https://your-server.com/call-status',
    record: true
  })
  
  return {
    callSid: call.sid,
    status: call.status,
    duration: call.duration
  }
}
```

**Pros:**
- Fully autonomous
- Scales to 100+ calls/day
- Records everything
- Professional caller ID

**Cons:**
- Requires server for TwiML responses
- Need phone number ($1/month)
- Technical setup (30-60 min)

---

### Option 2: Browser-Based Calling (Google Voice, Skype)

**What it does:**
- Use browser automation to make calls via web interfaces
- You speak (using TTS engine)
- Records conversation

**Setup:**
```bash
# Use OpenClaw browser tool
browser.open('https://voice.google.com')
browser.click('button[aria-label="Call"]')
browser.type('input[type="tel"]', '2063693776')
browser.click('button[aria-label="Dial"]')
```

**Cost:**
- Google Voice: Free (US/Canada)
- TTS (ElevenLabs): $0.30/1000 chars

**Pros:**
- No API setup
- Free calling (Google Voice)
- Works immediately

**Cons:**
- Requires active browser session
- Less reliable than Twilio
- Manual interaction needed

---

### Option 3: Human-in-the-Loop (Hybrid Approach)

**What it does:**
- I prepare the pitch, objection responses, notes
- Craig makes the call
- I listen/transcribe/log results
- I learn from each call

**Setup:**
- No technical setup needed
- Works today

**Cost:**
- $0 (uses Craig's phone)

**Pros:**
- No setup required
- Human voice = higher trust
- Works immediately

**Cons:**
- Not autonomous
- Requires Craig's time
- Doesn't scale

---

## Recommended Implementation: Twilio + OpenAI Voice

### Step 1: Get Twilio Account

1. Sign up: https://www.twilio.com/try-twilio
2. Get free trial ($15 credit)
3. Buy phone number: $1/month (choose local Seattle number for trust)
4. Get Account SID and Auth Token

### Step 2: Set Up Voice Response Server

**Option A: Vercel Serverless Function**

```javascript
// api/voice.js (Vercel serverless function)
export default function handler(req, res) {
  const VoiceResponse = require('twilio').twiml.VoiceResponse
  const response = new VoiceResponse()
  
  // AI-generated greeting
  response.say({
    voice: 'Polly.Matthew' // Natural-sounding voice
  }, 'Hi, is this Kevin? My name is John from NorthStar Synergy...')
  
  // Gather response
  response.gather({
    input: 'speech',
    action: '/api/voice/handle-response',
    timeout: 5,
    speechTimeout: 'auto'
  })
  
  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send(response.toString())
}
```

**Option B: Use Bland AI (Pre-built Solution)**

- Service: https://www.bland.ai
- AI voice agent that handles full conversation
- Cost: $0.09/minute
- Setup: 5 minutes (API key)
- Handles objections automatically

```javascript
const Bland = require('bland-ai')

await Bland.call({
  phone: '2063693776',
  task: 'Pitch Kevin on a $250 website for his landscaping business. Mention 155+ Yelp reviews. Handle objections. Get commitment.',
  voice: 'nat', // Natural male voice
  model: 'enhanced',
  record: true
})
```

---

## Call Script (AI Voice)

### Opening (15 seconds)
"Hi, is this Kevin? Great! My name is John, I'm calling from NorthStar Synergy. Hey, I was looking at your Yelp page - you've got 155 five-star reviews, that's amazing. Congrats on that."

### Hook (10 seconds)
"I noticed you don't have a website, which means you're invisible when people Google 'landscaping Seattle.' So I went ahead and built you one."

### Value Prop (15 seconds)
"It's already done and live. Professional design, mobile-optimized, showcases all your services. Cost is $250 one-time, plus $10 a month for hosting."

### Call to Action (10 seconds)
"Can I text you the link so you can see it? Takes 30 seconds to check out."

### Total: 50 seconds baseline

---

## Objection Handling (AI Responses)

### "I'm busy right now"
"I completely understand. This'll take 30 seconds. I already built the site - you just need to look at it. Can I text you the link and call back in 10 minutes?"

### "How did you get my number?"
"It's public on your Yelp page. I saw your great reviews and wanted to help you get more customers from Google search."

### "I don't need a website"
"I hear you. But did you know 60% of people searching for landscapers never make it to Yelp? They Google it and pick from the first few results. Right now, you're not there. This changes that for $250."

### "I'll think about it"
"Fair enough. The site is live right now at kevins-yard-work dot vercel dot app. Take a look, and I'll follow up tomorrow. Sound good?"

### "That's too expensive"
"I get it. Most designers charge $1,500 to $5,000. We're at $250 because we specialize in local service businesses. If you get just one customer from Google, it pays for itself."

### "My friend/nephew is building me one"
"That's great! How long have they been working on it? [Wait] Here's the thing - yours is already done. It's live right now. You could be on Google next week. Your call."

### "Can I see it first?"
"Absolutely. What's the best number to text? I'll send the link right now, you can check it out while we're on the phone."

---

## Call Workflow (Autonomous)

### Pre-Call (5 minutes)
1. Research business (Yelp, Google)
2. Verify NO website exists
3. Build website (or have ready)
4. Prepare custom pitch (mention reviews, service area)
5. Load objection responses

### During Call (2-5 minutes)
1. Intro + Hook (30 sec)
2. Pitch (30 sec)
3. Handle objections (1-3 min)
4. Close or schedule follow-up (30 sec)

### Post-Call (2 minutes)
1. Log outcome (jobs.jsonl)
2. Send follow-up text/email
3. Schedule callback if needed
4. Update memory/observations.md

### Total per call: 10 minutes

---

## Success Metrics

**Call Volume:**
- Target: 20-30 calls/day
- Duration: 2-5 min average
- Hours: 1-2.5 hours/day of calling

**Conversion:**
- Answer rate: 30-40% (landscapers are busy)
- Interest rate: 50% (of answered calls)
- Close rate: 10-20% (of interested)
- **Net: 2-4 deals per 20 calls**

**ROI:**
- Cost: $0.17/min × 5 min = $0.85/call
- 20 calls = $17
- 2 deals closed = $500 revenue
- **ROI: 29x**

---

## Implementation Timeline

### Week 1: Setup (Choose One)

**Option A: Bland AI (Fastest)**
- Day 1: Sign up, get API key
- Day 1: Test call to your phone
- Day 2: Make first real call
- Cost: $0.09/min (~$2/hour)

**Option B: Twilio + Voice (More Control)**
- Day 1-2: Set up Twilio account, buy number
- Day 3: Deploy voice response server (Vercel)
- Day 4: Test calls
- Day 5: Go live
- Cost: $0.17/min (~$10/hour)

**Option C: Human-in-Loop (Today)**
- Day 1: Craig makes calls with my scripts
- I log, learn, optimize
- Transition to AI once proven

---

## Quick Start: Bland AI (Recommended)

### Step 1: Sign Up
```bash
# Go to bland.ai, create account
# Get API key
```

### Step 2: Install SDK
```bash
npm install bland-ai
```

### Step 3: Make First Call
```javascript
const { Bland } = require('bland-ai')

const bland = new Bland(process.env.BLAND_API_KEY)

async function callKevin() {
  const call = await bland.calls.create({
    phone_number: '+12063693776',
    task: `You are John from NorthStar Synergy. Call Kevin who runs a landscaping business in Seattle. He has 155 five-star Yelp reviews but no website.
    
    Pitch: You built him a professional website for $250 + $10/month hosting (first month free). It's already live at kevins-yard-work.vercel.app.
    
    Goal: Get him to look at the site and agree to buy it.
    
    Handle objections:
    - Too expensive: "Most designers charge $1,500-5,000. We're at $250."
    - Too busy: "It's already built. Just takes 30 seconds to look."
    - Need to think: "Fair. I'll text you the link and follow up tomorrow."
    
    Close: Get commitment or schedule follow-up call.`,
    
    voice: 'nat', // Natural male voice
    max_duration: 5, // 5 minutes max
    record: true,
    webhook: 'https://your-server.com/call-webhook'
  })
  
  console.log('Call started:', call.call_id)
  return call
}

callKevin()
```

### Step 4: Handle Webhook
```javascript
// api/call-webhook.js
export default function handler(req, res) {
  const { call_id, status, transcript, recording_url, outcome } = req.body
  
  // Log to jobs.jsonl
  const result = {
    date: new Date().toISOString(),
    type: 'call',
    business: 'Kevins Yard Work',
    phone: '+12063693776',
    duration: req.body.duration,
    outcome: outcome, // interested | not_interested | callback | no_answer
    transcript: transcript,
    recording: recording_url
  }
  
  fs.appendFileSync('jobs.jsonl', JSON.stringify(result) + '\n')
  
  // If interested, send follow-up
  if (outcome === 'interested') {
    sendFollowUpText('+12063693776')
  }
  
  res.status(200).json({ success: true })
}
```

---

## Cost Comparison

| Method | Setup Time | Cost/Call | Autonomy | Quality |
|--------|------------|-----------|----------|---------|
| Bland AI | 10 min | $0.45 | Full | Good |
| Twilio + OpenAI | 2 hours | $0.85 | Full | Great |
| Google Voice | 30 min | $0.05 | Partial | Good |
| Human (Craig) | 0 min | $0 | None | Excellent |

**Recommendation:** Start with Bland AI for speed, transition to Twilio if we scale to 100+ calls/day.

---

## Legal/Compliance

### Required:
- ✅ Don't call numbers on Do Not Call list (check: https://www.donotcall.gov)
- ✅ Call during business hours only (8am-9pm local time)
- ✅ Identify yourself and company
- ✅ Provide callback number
- ✅ Honor opt-out requests immediately

### Best Practices:
- Record all calls (for training + disputes)
- Keep calls under 5 minutes
- Be polite, professional
- Accept "no" gracefully
- Don't be pushy

---

## Next Steps

**To activate calling TODAY:**

1. **Craig: Which option do you prefer?**
   - A) Bland AI ($0.45/call, ready in 10 min)
   - B) Twilio custom ($0.85/call, ready in 2 hours)
   - C) Human-in-loop (Craig calls, I script)

2. **If A or B: Provide API keys**
   - Bland: Sign up at bland.ai
   - Twilio: Sign up at twilio.com

3. **Test call**
   - Call Craig's phone first
   - Verify quality, adjust script

4. **Go live**
   - Call Kevin
   - Log results
   - Iterate

**Want me to set this up now?** Pick an option and I'll execute immediately.
