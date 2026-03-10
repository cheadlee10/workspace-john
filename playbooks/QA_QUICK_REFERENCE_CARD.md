# QA Quick Reference Card — Print & Use
**One-page checklist for rapid email QA before send**

---

## 🛑 CRITICAL (Any ONE = AUTO-REJECT)

| Code | Check | What to Look For |
|------|-------|------------------|
| **D1** | Encoding | Any `?` where apostrophe should be (`I?ll`, `won?t`) |
| **D4** | Placeholders | Any `{{`, `}}`, `[FILL]`, `[INSERT]`, `XXX` |
| **C1** | First-Touch Pricing | Any `$` amount in email #1 |
| **D3** | Name Spelling | Misspelled prospect/company name |
| **D2** | Broken Links | Click every link — does it load? |
| **B4** | Wrong Location | City, region, market mismatch |

**If ANY critical failure: STOP. Fix before proceeding.**

---

## ⚠️ WARNINGS (Fix before send, not auto-reject)

| Code | Check | Target |
|------|-------|--------|
| **A3** | Word Count | ≤100 words body (≤120 acceptable) |
| **A2** | Generic Opener | No "I hope this finds you well" |
| **C4** | Spam Words | No FREE, URGENT, ACT NOW, GUARANTEE |
| **C7** | Visual Proof | Must have working preview/screenshot link |
| **C2** | Soft CTA | Question format, not "Book a call" |
| **D6** | Signature | Name + Company + Phone |

---

## PASS/FAIL DECISION

```
┌──────────────────────────────────┐
│ Any critical failure?            │
│   YES → 🛑 REJECT. Fix first.    │
│   NO  → Continue ↓               │
├──────────────────────────────────┤
│ Score ≥90%?                      │
│   YES → ✅ SEND                  │
│   NO  → Continue ↓               │
├──────────────────────────────────┤
│ Score 80-89%?                    │
│   YES → ⚠️ Fix warnings, rescan  │
│   NO  → ❌ REWRITE               │
└──────────────────────────────────┘
```

---

## FIX PROTOCOLS (30-Second Fixes)

| Issue | Fix |
|-------|-----|
| **Encoding (D1)** | Paste into Notepad → Paste back → Check for `?` |
| **Placeholder (D4)** | Search `{{` `[` — Fill ALL or delete sentence |
| **Pricing (C1)** | Delete all `$` amounts — save for follow-up |
| **Long (A3)** | Cut feature lists, cut filler, one idea per sentence |
| **No Link (C7)** | Add screenshot URL — test it loads |
| **Hard CTA (C2)** | Replace "Book a call" with "Worth a quick look?" |

---

## AUTOMATED CHECK COMMAND

```bash
# Run before every batch
python scripts/qa_email_lint.py email.txt

# For follow-up emails (pricing OK)
python scripts/qa_email_lint.py email.txt --follow-up

# Pipe from clipboard
pbpaste | python scripts/qa_email_lint.py
```

---

## ENCODING WASH (Do EVERY Time)

1. Copy email body
2. Open Notepad (Windows) or TextEdit Plain (Mac)
3. Paste
4. Select All → Copy
5. Paste into email tool
6. Visual scan for `?` characters
7. If found → manually retype those words

---

## VOLUME QA (5K/week)

| Stage | Coverage |
|-------|----------|
| New template | Full QA on first 5 emails |
| Ongoing batch | 10% spot check (min 20) |
| Automated scan | 100% via `qa_email_lint.py` |

**Red flag thresholds (PAUSE campaign):**
- >5% spot-check failures
- Any critical failure in sample
- >1% bounce rate

---

---

## 📱 SMS QUICK CHECKS (Before Email Checks)

| Code | Check | Target |
|------|-------|--------|
| **S1** | Character count | ≤160 chars (320 max) |
| **S2** | Recipient verified | Trial: must be verified number |
| **S3** | No shortened URLs | No bit.ly, tinyurl, goo.gl |
| **S4** | Sender sign-off | "-John" or "-John, NorthStar" |
| **S5** | Spam words | Extra strict: NO "free", "win", "click" |
| **S6** | Business name | Must mention THEIR business name |
| **S7** | Soft CTA | Question format only |
| **S8** | Time zone | Send during THEIR local business hours |

**SMS Critical:** S1 (>320 chars), S3 (shortened URL), S5 (spam words), S6 (no biz name)

---

**Document:** QA_QUICK_REFERENCE_CARD.md  
**Full system:** `playbooks/QA_QUALITY_GATE_V1.md`  
**Automation:** `scripts/qa_email_lint.py`
