# Professional Email Setup — john@northstarsynergy.com

## Option 1: Google Workspace (Recommended)
**Cost:** $6/user/month
**Features:** Gmail interface, 30GB storage, Calendar, Meet, Drive

### Setup Steps
1. Go to https://workspace.google.com
2. Sign up with domain: northstarsynergy.com (or .dev)
3. Add user: john@northstarsynergy.com
4. Google provides MX records to add to DNS
5. Verify domain ownership
6. Email active in 10-30 minutes

**MX Records (Google will provide exact values):**
```
MX  @  1   ASPMX.L.GOOGLE.COM
MX  @  5   ALT1.ASPMX.L.GOOGLE.COM
MX  @  5   ALT2.ASPMX.L.GOOGLE.COM
MX  @  10  ALT3.ASPMX.L.GOOGLE.COM
MX  @  10  ALT4.ASPMX.L.GOOGLE.COM
```

✅ **Best for:** Professional use, client-facing emails, calendar scheduling

---

## Option 2: Zoho Mail (Budget Option)
**Cost:** $1/user/month (Lite plan)
**Features:** Clean interface, 5GB storage, no ads

### Setup Steps
1. Go to https://www.zoho.com/mail
2. Sign up with domain
3. Add email: john@northstarsynergy.com
4. Add Zoho MX records to DNS
5. Verify + activate

✅ **Best for:** Budget-conscious, basic email needs

---

## Option 3: Email Forwarding (Free, Quick Start)
**Cost:** Free
**Features:** Forward to existing email (e.g., chead@me.com)

### Setup Steps (via Cloudflare or Domain Registrar)
1. In DNS settings, add:
   ```
   MX  @  10  john@northstarsynergy.com  →  chead@me.com
   ```
2. Emails sent to john@northstarsynergy.com forward to chead@me.com
3. Reply-as john@northstarsynergy.com (configure in Gmail/Outlook)

⚠️ **Limitation:** Can't send from john@ address natively, only forward

✅ **Best for:** Quick start while setting up full workspace

---

## Option 4: Resend (For Transactional Only)
**Cost:** Free (3K emails/month)
**Features:** API-based, perfect for receipts/notifications

### Setup Steps
1. Sign up at https://resend.com
2. Add domain: northstarsynergy.com
3. Add DNS records (Resend provides)
4. Verify domain
5. Use API to send transactional emails (receipts)

⚠️ **Not for:** Receiving emails or client correspondence

✅ **Best for:** Automated receipts, payment confirmations, system notifications

---

## Recommended Setup (Best of Both Worlds)

### For John (Client-Facing)
- **Google Workspace:** john@northstarsynergy.com
- Use for: Client emails, proposals, support
- Cost: $6/month

### For Automated Receipts
- **Resend API:** receipts@northstarsynergy.com (no-reply)
- Use for: Payment confirmations, automated emails
- Cost: Free (up to 3K/month)

**Total:** $6/month

---

## DNS Configuration (After Domain Registration)

Once northstarsynergy.com (or .dev) is registered:

### Google Workspace MX Records
```
Type  Name  Priority  Value
MX    @     1         ASPMX.L.GOOGLE.COM
MX    @     5         ALT1.ASPMX.L.GOOGLE.COM
MX    @     5         ALT2.ASPMX.L.GOOGLE.COM
MX    @     10        ALT3.ASPMX.L.GOOGLE.COM
MX    @     10        ALT4.ASPMX.L.GOOGLE.COM
```

### SPF Record (Prevent Spoofing)
```
Type  Name  Value
TXT   @     v=spf1 include:_spf.google.com ~all
```

### DKIM Record (Email Authentication)
Google Workspace provides this after setup.

### DMARC Record (Email Security)
```
Type  Name  Value
TXT   _dmarc  v=DMARC1; p=quarantine; rua=mailto:john@northstarsynergy.com
```

---

## Integration with Website Receipt System

Update `/api/send-receipt/route.ts` to use Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { email, sessionId, amount, service, tier } = await request.json()

  await resend.emails.send({
    from: 'NorthStar Synergy <receipts@northstarsynergy.com>',
    to: email,
    subject: 'Payment Receipt - NorthStar Synergy',
    html: receiptHtml,
  })

  return NextResponse.json({ success: true })
}
```

Add to `.env.local`:
```
RESEND_API_KEY=re_...
```

---

## Testing Email Delivery

### Test Inbox Receipt
```bash
# Send test email via Resend
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_..." \
  -H "Content-Type: application/json" \
  -d '{
    "from": "receipts@northstarsynergy.com",
    "to": "your-email@gmail.com",
    "subject": "Test Receipt",
    "html": "<p>Testing NorthStar Synergy receipts</p>"
  }'
```

### Check Spam Score
Use https://www.mail-tester.com
- Send test email to provided address
- Check spam score (aim for 10/10)
- Fix any DNS issues (SPF, DKIM, DMARC)

---

## Current Status

✅ Email address decided: john@northstarsynergy.com
⏳ Pending: Domain registration (northstarsynergy.com or .dev)
⏳ Pending: Google Workspace signup ($6/month)
⏳ Pending: Resend API setup (free, for receipts)
⏳ Pending: DNS MX record configuration

---

## Next Steps

1. **Register domain** (northstar-synergy.dev or northstarsynergy.com)
2. **Sign up Google Workspace** (for john@northstarsynergy.com)
3. **Sign up Resend** (for automated receipts@northstarsynergy.com)
4. **Configure DNS** (MX, SPF, DKIM, DMARC records)
5. **Update website** (contact email, receipt sender)
6. **Test email flow** (send test receipt, verify delivery)

Total setup time: 30-60 minutes
Monthly cost: $6 (Google Workspace) + $0 (Resend free tier) = $6/month
