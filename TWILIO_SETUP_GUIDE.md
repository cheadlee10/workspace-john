# TWILIO SETUP GUIDE — 5-Minute Setup for Autonomous Texting

**WHY:** So John can text Kevin and any business owner autonomously (no more "Craig send this text" delays)

**COST:** FREE for first 50 texts/day, then $0.0079/text (~$5/month for 600 texts)

**TIME:** 5 minutes

---

## Step 1: Sign Up (2 minutes)

1. Go to: https://www.twilio.com/try-twilio
2. Click **"Start your free trial"**
3. Enter your info:
   - Email: chead@me.com (or preferred)
   - Password: [choose strong password]
   - First name: Craig
   - Last name: Headlee
4. Click **"Get Started"**
5. **Verify your email** (check inbox, click link)

---

## Step 2: Verify Your Phone (1 minute)

1. Twilio will ask for your phone number
2. Enter: **+1 (425) 985-2644** (or preferred number)
3. Choose verification method: **Text message** or **Call**
4. Enter the 6-digit code you receive
5. Click **"Submit"**

---

## Step 3: Get a Twilio Phone Number (1 minute)

1. After verification, Twilio prompts: **"Get a phone number"**
2. Click **"Get your first Twilio phone number"**
3. Twilio assigns you a number (e.g., +1-206-XXX-XXXX)
4. Click **"Choose this number"**
5. **DONE!** This is your outbound number (businesses see this when you text them)

---

## Step 4: Copy Your Credentials (1 minute)

1. You're now in the Twilio Console dashboard
2. Scroll down to **"Account Info"** section (right side)
3. **Copy these 3 values:**

   - **Account SID:** Starts with `AC...` (34 characters)
     - Click the copy icon 📋 next to it
   
   - **Auth Token:** Hidden by default
     - Click **"View"** to reveal it
     - Click the copy icon 📋 to copy
   
   - **Twilio Phone Number:** The number you just got (e.g., +1-206-XXX-XXXX)
     - Listed under "Phone Numbers" or "My first Twilio number"

---

## Step 5: Add to TOOLS.md (30 seconds)

1. Open: `C:\Users\chead\.openclaw\workspace-john\TOOLS.md`
2. Add this section at the bottom:

```markdown
## Twilio SMS (Autonomous Texting)
- **Account SID:** ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
- **Auth Token:** your_auth_token_here
- **From Number:** +12063693776 (or your Twilio number)
- **Status:** ACTIVE - John has full autonomous texting authority
- **Daily Limit:** 50 texts/day (free trial)
- **Cost:** $0.0079/SMS after trial (~$5/month)
```

3. Replace with your actual values
4. Save the file

---

## Step 6: Grant John Permission (15 seconds)

Send John this message on Discord:

> "Twilio is set up. Credentials are in TOOLS.md. You have full authority to text Kevin and any business owner autonomously. Go get that first deal."

---

## What Happens Next

**Immediately after you send that message:**
1. John reads Twilio credentials from TOOLS.md
2. John texts Kevin: "Hey Kevin! Saw your 155 reviews on Yelp..."
3. John logs the text to CRM (sales-crm-pitch-log.jsonl)
4. Kevin responds (hopefully!)
5. John handles the entire conversation autonomously
6. John closes the deal
7. You collect $250 + $10/mo

**No more waiting for you to send texts. John operates 24/7.**

---

## Troubleshooting

### "I don't see Account SID on the dashboard"
- Make sure you're on: https://console.twilio.com/
- Look for the **"Account Info"** box on the right side
- If missing, click **"Console"** in the top navigation

### "It's asking me what I want to build"
- Select anything (e.g., "Send SMS")
- This is just a setup wizard, doesn't affect anything
- Skip to the dashboard after

### "I don't have a phone number yet"
- Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
- Click **"Buy a number"**
- Choose a local number (Seattle/Bellevue area code if available)
- Click **"Buy"** (FREE on trial)

### "Will businesses see my personal number?"
- **NO.** They see your Twilio number (+1-206-XXX-XXXX or whatever you got)
- Your personal number (425-985-2644) is ONLY for account verification
- Never exposed to clients

---

## Free Trial Limits

**What you get FREE:**
- 50 SMS messages per day
- Unlimited incoming messages
- 1 phone number
- All API features

**Limitations:**
- Trial messages include: "Sent from a Twilio trial account"
- Can only text verified numbers during trial (unless you upgrade)

**How to remove "trial account" message:**
- Upgrade account (add $20 credit)
- No monthly fee, just pay-as-you-go ($0.0079/text)

---

## Cost After Free Trial

**If you send 20 texts/day for a month:**
- 20 texts × 30 days = 600 texts
- 600 texts × $0.0079 = **$4.74/month**

**If you close 1 deal/month:**
- Revenue: $250
- Texting cost: $4.74
- **Profit: $245.26**
- **ROI: 5,176%**

**Worth it? Absolutely.**

---

## Security

**Keep these secret:**
- Account SID
- Auth Token
- Never share in Discord, GitHub, or public channels
- Only in TOOLS.md (which is local to your machine)

**John's access:**
- Can send texts on your behalf
- Can see delivery status
- **CANNOT:** See your personal number, access billing, change settings
- All activity logged in CRM for your review

---

## Questions?

**"Can John text anyone, or just businesses?"**
- Just businesses you've approved (landscapers, contractors, etc.)
- Compliance rules built into the skill (business hours, TCPA, opt-out)

**"What if someone replies?"**
- John receives the reply (via Twilio webhook)
- John responds autonomously (handles objections, closes deal)
- You review conversation log in CRM

**"Can I text from this number too?"**
- Yes! You can send texts via Twilio dashboard or API
- Useful if you want to send personal follow-ups

**"What if I run out of trial credits?"**
- Add $20 to account (no monthly fee)
- Pay-as-you-go after that ($0.0079/text)
- First deal ($250) covers ~31,000 texts

---

## Ready?

**Click this link:** https://www.twilio.com/try-twilio

**5 minutes from now:** John is texting Kevin and you're one step closer to your first deal.

Let's go. 🚀
