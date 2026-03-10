# KNOWLEDGE.md — John's Knowledge Graph
*Hard facts, proven patterns, pricing insights, client behaviors*

## Brand Positioning (CORE — Day 2)
**Visual Identity:** Navy (#0F2340) + Gold (#D4A574)
**Messaging:** "We don't just consult. We build. We operate. We deliver results."
**Tone:** Warm professionalism — confident experts, not consultants

**Key differentiators to emphasize in sales:**
- Built by operators (we run real businesses)
- Results-focused (ROI > hours)
- Enterprise quality, startup speed
- Technical depth across full stack
- Transparent pricing (3-tier: Good/Better/Best)

**All client communications must:**
- Use branded email template (`website/EMAIL_TEMPLATE.html`)
- Match navy + gold aesthetic
- Lead with value/ROI, not features
- Sound confident but approachable (no corporate jargon)

---

## What Sells (Day 1 Hypotheses — Validate ASAP)
- Excel formula audits: high-value, low-effort. "We find the error before your VP does."
- Script automation: huge demand on Fiverr/Upwork. Python + PowerShell.
- Pre-built Excel templates: low CAC, passive income potential.
- OpenClaw bots: high ticket, lower volume. Target small businesses.

## Pricing Insights (UPDATED 2026-02-27 — Data-Backed)

### Website Sales Pricing (PRIMARY REVENUE STREAM)
**Model: $0 down + monthly subscription (12-month minimum)**

| Tier | Monthly | What's Included | Target |
|------|---------|-----------------|--------|
| Starter | $99/mo | 5-page site + hosting + monthly updates | Budget-conscious SMBs |
| Professional | $199/mo | Full site + SEO + Google Business optimization + support | Growth-focused SMBs |
| Premium | $299/mo | Everything + dashboard + priority support + content updates | Established businesses |

**Why $0 down:** Removes #1 objection. Proven by multiple agencies hitting $10-20K/mo MRR.
**Why subscription:** 70-80% profit margin (vs 10-20% on one-time services). Predictable cash flow.
**12-month minimum:** Standard in industry. Protects revenue. Clients rarely churn after month 3.

**Real benchmarks from successful agencies:**
- $0 down + $150/mo → $7,400/mo recurring (49 clients)
- 10-12 new subscriptions/mo → $20K/mo recurring within 12 months
- GoHighLevel SaaS mode agencies: 120 clients × $297/mo = $35,640/mo
- Average one-time site: $1,850-$5,000 (but no recurring)

### Restaurant Platform Pricing (LIVE PRODUCT)
| Tier | Monthly | Target |
|------|---------|--------|
| Starter | $99/mo | Small restaurants, basic online presence |
| Growth | $149/mo | Growing restaurants, online ordering |
| Pro | $249/mo | Full-service, priority support, advanced features |

Live pricing page: https://northstar-restaurant-platform.vercel.app/pricing

### Email Timing (Data-Backed — 2025-2026 Studies)
**Best days:** Tuesday (#1, 16% higher open rate), Thursday (#2, 44% open rate 9-11am)
**Best times:** 9-11am local time (primary), 1-2pm (secondary)
**75% of cold emails opened within 1 hour of sending**
**Average B2B cold email response rate:** 7-10% (top performers: 20%+)
**Our target:** 5%+ response rate, 1-2% close rate on volume

### Outreach Psychology (What Actually Works)
- **Show the site already built** — 10x more powerful than "I can build you a site"
- **Lead with ROI** — "Your competitors have websites getting customers you're missing"
- **$0 down framing** — "No upfront cost, cancel anytime after 12 months"
- **Social proof** — mention review count: "Your 47 Google reviews deserve a website"
- **Urgency** — "I built this for you already — want me to take it live?"
- **Short emails win** — 50-125 words, one clear CTA, 1-3 follow-ups over 7-14 days

## Client Patterns
- Small business owners check email 9-11am and after lunch (1-2pm)
- Weekends: some engagement for very small/solo operators
- Follow up within 24-48 hours or lose them
- 50%+ of deals close on follow-up (not first touch)
- Landscaping/cleaning/handyman owners are phone-first — SMS follow-up after email

## Platform Behaviors
*(Fiverr algorithms, Upwork ranking tips, Reddit posting rules)*

## Bottleneck Log
| Date | Bottleneck | Fix |
|------|-----------|-----|
| — | — | — |

## Cold Email Outreach Standard (ADOPTED 2026-03-02)
Source file: `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md`

Non-negotiables now in force:
- First-touch email is plain-text, short (<100 words), problem-first, with one soft CTA.
- Every web-design outreach includes visual proof (`live preview` or `screenshot link`).
- No first-touch pricing in outreach copy (pricing moves to later touch after interest).
- Use 3-7-7 follow-up cadence (Day 0 / Day 3 / Day 10, optional breakup Day 17).
- Encode safely (no smart-quote artifacts), run pre-send QA/lint, and verify all links.
- Personalize with one verifiable business-specific observation; never generic AI phrasing.

## QA Quality Gate System (UNIFIED 2026-03-05)

### Documentation (Single Source of Truth)
| Document | Purpose | Location |
|----------|---------|----------|
| Full Playbook | 19KB comprehensive guide | `playbooks/QA_QUALITY_GATE_V1.md` |
| Quick Reference | 1-page printable card | `playbooks/QA_QUICK_REFERENCE_CARD.md` |
| Applied Templates | Unified proposal/outreach checks | `templates/QA_QUALITY_GATE_PROPOSALS_OUTREACH.md` |
| Failure Log | Pattern tracking | `memory/qa_failure_log.md` |

### Automated QA Linter (VERIFIED WORKING)
```bash
python scripts/qa_email_lint.py email.txt        # First-touch
python scripts/qa_email_lint.py email.txt -f     # Follow-up (pricing OK)
```

### Scoring System (Unified)
| Category | Weight | Checks |
|----------|--------|--------|
| A: Clarity | 30% | Single purpose, hook, ≤100 words, grade-8, one idea/sentence |
| B: Offer Fit | 25% | Research verified, problem-solution, industry match, geography |
| C: Risk Checks | 30% | No pricing #1, soft CTA, provable claims, compliance, proof link |
| D: Formatting | 15% | No encoding errors, links work, names correct, no placeholders |

**Formula:** `Score = (A/5 × 0.30) + (B/5 × 0.25) + (C/7 × 0.30) + (D/7 × 0.15)`

**Thresholds:** ≥90% = ✅ SEND | 80-89% = ⚠️ FIX & RESCAN | <80% = ❌ REWRITE

### Critical Failures (Auto-Reject — ANY ONE = STOP)
| Code | Failure | Action |
|------|---------|--------|
| D1 | Encoding errors (`?` where apostrophe) | Notepad paste-wash |
| D4 | Placeholder text (`{{`, `[FILL]`) | Fill or delete sentence |
| C1 | Pricing in first touch | Remove all `$` amounts |
| D3 | Name/company misspelled | Verify from website/Google |
| D2 | Broken links | Test in Incognito, fix URL |
| B4 | Wrong geography | Research and correct |
| C3* | Fabricated facts | BLOCKER - rewrite required |

### Correction Workflow (7 Steps)
1. **Draft** — All personalization filled
2. **Encoding Wash** — Notepad paste → back to tool
3. **Critical Check** — D1, D4, C1, D3, D2, B4, C3 (any fail = STOP)
4. **Full Checklist** — Score all categories
5. **Threshold Check** — ≥90% send, 80-89% fix, <80% rewrite
6. **Link Test** — Click every URL in Incognito
7. **Send + Log** — Record in leads.jsonl

### Proposal-Specific Checks (P1-P4)
- **P1 Scope:** Deliverables, timeline, exclusions explicit
- **P2 Pricing:** 3-tier format, terms, recurring vs. one-time
- **P3 Proof:** Portfolio/demo linked, no unverifiable claims
- **P4 Next Steps:** Single CTA, contact method, deadline if real

### SMS-Specific QA
| Code | Check | Critical? |
|------|-------|-----------|
| S1 | ≤160 chars (320 max) | Yes (>320) |
| S3 | No shortened URLs | Yes |
| S5 | No spam words (free, win, click) | Yes |
| S6 | Business name present | Yes |
| S4 | Sign-off (-John) | No |
| S8 | Local business hours | No |

### Volume QA (5K/week)
| Stage | Coverage |
|-------|----------|
| New template | Full QA first 5 emails |
| Ongoing batch | 10% spot check (min 20) |
| Automated scan | 100% via `qa_email_lint.py` |

**Pause Triggers:** >5% spot-check failures, any critical in sample, >1% bounce

### Pattern Tracking
Log all failures to `memory/qa_failure_log.md`. If same code appears 3+ times/week:
1. Update template to prevent recurrence
2. Add automated check if possible
3. Document fix in KNOWLEDGE.md
