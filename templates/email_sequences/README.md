# NorthStar Synergy — Cold Email Sequences
*High-Converting Outbound Templates*
*Created: 2026-03-05 | Version: 1.0*

---

## Quick Reference: Which Sequence to Use

| Sequence | Target | Avg Deal Size | Primary Source |
|----------|--------|---------------|----------------|
| **1. Website Sales** | Local SMBs needing online presence | $99-299/mo recurring | Google Maps, Yelp, local directories |
| **2. Excel/Automation** | Businesses with data/spreadsheet pain | $150-999 one-time | Fiverr, Upwork, Reddit |
| **3. Tech Operations** | Growth businesses needing systems | $500-5,000+ | LinkedIn, referrals, direct outreach |

---

## Files

```
email_sequences/
├── README.md                           # This file
├── SEQUENCE_1_WEBSITE_SALES.md         # Local business web design
├── SEQUENCE_2_EXCEL_AUTOMATION.md      # Excel, scripts, data work
└── SEQUENCE_3_TECH_OPERATIONS.md       # Bots, integrations, custom dev
```

---

## Universal Rules (All Sequences)

1. **No pricing in Email #1** — Start conversations, not negotiations
2. **Under 100 words** — Phone-friendly, 15-second read
3. **Plain text only** — No HTML, no formatting, no smart quotes
4. **One visual/proof** — Screenshot, preview link, or portfolio piece
5. **Soft CTA** — Questions that invite reply, not demands
6. **3-7-7 Cadence** — Day 0, 3, 10 (optional breakup Day 17)
7. **Speed wins** — Send within 2 hours of finding lead
8. **Test subject lines** — Rotate variants, track opens

---

## Sending Schedule (Optimal Times)

| Day | Time | Priority |
|-----|------|----------|
| Tuesday | 9-11am local | #1 |
| Thursday | 9-11am local | #2 |
| Wednesday | 1-2pm local | #3 |
| Monday/Friday | 9-11am | Acceptable |
| Weekend | Avoid | Small biz only |

---

## QA Before Every Send

```bash
# Run automated linter
python scripts/qa_email_lint.py email.txt        # First-touch
python scripts/qa_email_lint.py email.txt -f     # Follow-up
```

**Pass threshold:** ≥90% = SEND | 80-89% = FIX | <80% = REWRITE

**Critical failures (auto-reject):**
- Encoding errors (question marks for apostrophes)
- Placeholder text ({{variables}} not replaced)
- Pricing in first email
- Broken links

---

## Tracking

Log every send to `leads.jsonl`:
```json
{
  "id": "unique-id",
  "date": "2026-03-05",
  "source": "Google Maps",
  "client": "Done Right Works",
  "service": "Website",
  "estimated_value": 199,
  "status": "contacted",
  "sequence": "SEQUENCE_1",
  "email_number": 1,
  "notes": "Handyman, Tacoma, no website"
}
```

Update status as sequence progresses:
- `contacted` → Email #1 sent
- `followed_up` → Email #2 or #3 sent
- `replied` → Prospect responded (stop sequence)
- `negotiating` → In conversation
- `closed` → Deal won
- `lost` → No response after full sequence

---

## Performance Benchmarks

| Metric | Target | Good | Excellent |
|--------|--------|------|-----------|
| Open Rate | 40%+ | 50%+ | 60%+ |
| Reply Rate | 5%+ | 10%+ | 15%+ |
| Meeting Rate | 2%+ | 5%+ | 8%+ |
| Close Rate | 1%+ | 2%+ | 5%+ |

If hitting below targets:
- Open <40% → Test new subject lines
- Reply <5% → Improve personalization / hook
- Meeting <2% → Strengthen CTA / proof
- Close <1% → Review pricing / offer fit

---

## Template Customization

Each sequence has:
- **Subject line variants** — Rotate to avoid pattern fatigue
- **CTA variants** — Match to prospect temperature
- **Personalization variables** — Fill with REAL verified data
- **Service-specific hooks** — Use when targeting specific pain

**Never send a template without:**
1. Replacing ALL {{variables}} with real data
2. Testing the preview/portfolio link
3. Running through plain-text editor
4. Verifying prospect name/company spelling

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial creation — 3 sequences |

---

*Part of NorthStar Synergy Outreach System*
*Reference: playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md*
