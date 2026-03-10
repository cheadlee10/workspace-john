# SMS Templates — 2026-03-05 Campaign

## Template: sms_nosite_v1 (Generic)
```
Hi, this is John from NorthStar Synergy. I noticed {business_name} doesn't have a website yet. I built a free preview for you - no strings attached. Want to see it? -John
```
**Chars:** ~150 (under 160 limit)

---

## Template: sms_nosite_personalized (With Owner Name)
```
Hi {owner_name}, this is John from NorthStar Synergy. I noticed {business_name} doesn't have a website yet. Built you a free preview - want me to send the link? -John
```
**Chars:** ~155 (under 160 limit)

---

## Template: sms_followup_1 (Day 3)
```
Hey, John from NorthStar here. Just checking if you got a chance to see the website preview I built for {business_name}. Happy to walk you through it. -John
```
**Chars:** ~148

---

## Template: sms_followup_2 (Day 7)
```
Last message - I built a free website preview for {business_name}. If you're interested, reply YES and I'll send the link. Either way, best of luck! -John
```
**Chars:** ~142

---

## QA Checklist (Per SMS)
- [ ] Under 160 chars (single SMS)
- [ ] Business name included (personalization proof)
- [ ] Clear sender sign-off (-John)
- [ ] No shortened URLs
- [ ] No spam words (free once is OK, not repeated)
- [ ] Soft CTA (question, not command)

---

## Response Handling
| Response Type | Action | Status Update |
|---------------|--------|---------------|
| "YES" / interested | Send preview link + schedule follow-up | `responded_interested` |
| "Who is this?" | Clarify + resend value prop | `responded_clarify` |
| "Not interested" | Log and move on | `responded_declined` |
| "STOP" / unsubscribe | Remove from list IMMEDIATELY | `unsubscribed` |
| No response (48h) | Queue follow-up Day 3 | `no_response` |
