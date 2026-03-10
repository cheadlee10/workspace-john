# QA Quality Gate — Proposals & Outreach Assets (Unified Standard)

**Owner:** John (Revenue Ops)  
**Version:** 2.0 — Harmonized with QA_QUALITY_GATE_V1.md  
**Date:** 2026-03-05  
**Applies to:** cold email, follow-up email, SMS, proposals, custom pitch docs  
**Source of Truth:** `playbooks/QA_QUALITY_GATE_V1.md`  

---

## 1) Quick Decision Flow (60 Seconds)

```
START → Any critical failure? → YES → 🛑 STOP. Fix first.
                              ↓ NO
        Score ≥90%? → YES → ✅ SEND
                    ↓ NO
        Score 80-89%? → YES → ⚠️ Fix warnings, rescan
                      ↓ NO
        ❌ REWRITE from template
```

---

## 2) Practical Checklist (Pre-Send/Pre-Submit)

### Category A: CLARITY (Weight: 30%)

| ID | Check | Pass Criteria |
|----|-------|---------------|
| A1 | Single clear purpose | ONE goal. Reader knows exactly what to do. |
| A2 | First sentence hook | Opens with prospect-specific observation. No "I hope this finds you well." |
| A3 | Readable fast | Email ≤100 words body. Proposal ≤2 pages for simple deals. |
| A4 | Grade-level ≤8 | Simple language. No "leverage synergies." |
| A5 | One idea per sentence | No run-on sentences with 3+ clauses. |

### Category B: OFFER FIT (Weight: 25%)

| ID | Check | Pass Criteria |
|----|-------|---------------|
| B1 | Prospect research verified | ONE specific, verifiable fact about their business. |
| B2 | Problem-solution alignment | Problem stated relates to service offered. |
| B3 | Industry/category match | Template matches their business type. |
| B4 | Geographic accuracy | City, region, service area correct. |
| B5 | Stage relevance | Pitch matches situation (no site vs. outdated vs. bad SEO). |

### Category C: RISK CHECKS (Weight: 30%)

| ID | Check | Pass Criteria |
|----|-------|---------------|
| C1 | No pricing in first touch | Email #1 has zero dollar amounts. (N/A for proposals) |
| C2 | CTA is soft/low-friction | Question format. No "Book a call" on first touch. |
| C3 | Claims are provable | Any stated result has backing. No fabrications. |
| C4 | No spam trigger words | No FREE, URGENT, ACT NOW, GUARANTEE. |
| C5 | Compliance present | Physical address OR opt-out (CAN-SPAM). |
| C6 | Professional sender | From @northstarsynergy.com, real name. |
| C7 | Visual proof included | Link to preview/screenshot. Link tested & working. |

### Category D: FORMATTING (Weight: 15%)

| ID | Check | Pass Criteria |
|----|-------|---------------|
| D1 | Zero encoding errors | No "?" or garbled chars. Apostrophes render. |
| D2 | Links functional | Every URL clicked and confirmed loading. |
| D3 | Name/company correct | Exact match to prospect's actual usage. |
| D4 | No placeholder text | Zero {{variables}} or [FILL IN] remaining. |
| D5 | Plain text format | No HTML in first-touch cold emails. |
| D6 | Signature complete | Name, Company, Phone. |
| D7 | Follow-up staged | Day 3, 10, 17 sequence ready (email campaigns). |

---

## 3) Critical Failures (Auto-Reject — Any ONE = FAIL)

| ID | Failure | Why It's Critical |
|----|---------|-------------------|
| D1 | Encoding errors | Looks like spam/bot, destroys credibility |
| D4 | Placeholder text | Obvious automation failure |
| C1 | Pricing in first-touch | Pre-qualifies rejection before value shown |
| D3 | Name/company misspelled | Proves no real research |
| D2 | Broken links | Can't see proof, wasted opportunity |
| B4 | Wrong geography | Proves mass-blast, not personalized |
| C3* | Fabricated facts | Legal/reputation risk (BLOCKER) |

*C3 fabrication = automatic FAIL regardless of other checks.

---

## 4) Pass/Fail Rubric

### Scoring Formula
```
Score = (A_score/5 × 0.30) + (B_score/5 × 0.25) + 
        (C_score/7 × 0.30) + (D_score/7 × 0.15)
```

### Thresholds

| Score | Verdict | Action |
|-------|---------|--------|
| **≥90%** | ✅ APPROVED | Send/submit immediately |
| **80-89%** | ⚠️ CONDITIONAL | Fix flagged items, re-check, then send |
| **70-79%** | ❌ REVISE | Major revision required. Do not send. |
| **<70%** | 🛑 REJECT | Rewrite from scratch |

---

## 5) Correction Workflow

### Step-by-Step Process

1. **Draft Complete** — All personalization filled in

2. **Encoding Wash** — Paste through Notepad/plain-text editor → back to tool

3. **Critical Check First** — Scan D1, D4, C1, D3, D2, B4, C3
   - ANY fail → STOP. Fix that item. Do not proceed.

4. **Run Full Checklist** — Categories A-D, mark pass/fail

5. **Calculate Score** — Use formula above

6. **Evaluate Threshold**
   - ≥90%: SEND
   - 80-89%: Fix warnings, rescan
   - <80%: REWRITE

7. **Link Click-Test** — Open every link in Incognito browser

8. **Send + Log** — Record in leads.jsonl with QA score

### Fix Protocols (30-Second Fixes)

| Issue | Fix |
|-------|-----|
| Encoding (D1) | Notepad paste-wash → check for `?` |
| Placeholder (D4) | Search `{{` `[` → fill ALL or delete sentence |
| Pricing (C1) | Delete all `$` amounts → save for follow-up |
| Broken link (D2) | Test → fix URL or regenerate preview |
| Name wrong (D3) | Check website/Google listing → copy exact spelling |
| Long (A3) | Cut feature lists, one idea per sentence |

---

## 6) Proposal-Specific Checks (Custom Pitches)

For proposals and pitch docs, add these checks:

### P1: Scope Clarity
- [ ] Deliverables explicitly listed (what client gets)
- [ ] Timeline stated (when they get it)
- [ ] What's NOT included is clear (scope boundaries)

### P2: Pricing Presentation
- [ ] 3-tier format (Good/Better/Best) where appropriate
- [ ] Payment terms explicit (Net-15, 50% upfront, etc.)
- [ ] Recurring vs. one-time clearly distinguished

### P3: Proof of Capability
- [ ] Relevant portfolio piece or demo linked
- [ ] Similar client reference if available
- [ ] No unverifiable claims ("helped hundreds")

### P4: Next Steps
- [ ] Single clear action for client to take
- [ ] Contact method provided
- [ ] Deadline/urgency if legitimate (not fake)

**Proposal Pass Threshold:** 90%+ on standard checks + all P1-P4 complete.

---

## 7) Automated QA Tools

### Email Linter
```bash
python scripts/qa_email_lint.py email.txt        # First-touch
python scripts/qa_email_lint.py email.txt -f     # Follow-up (pricing OK)
```

### Batch QA (5K/week volume)
| Stage | Coverage |
|-------|----------|
| New template | Full QA first 5 emails |
| Ongoing batch | 10% spot check (min 20) |
| Automated scan | 100% via linter |

**Red Flags (PAUSE campaign):**
- >5% spot-check failures
- Any critical failure in sample
- >1% bounce rate

---

## 8) Failure Tracking

Log all failures to `memory/qa_failure_log.md`:
```
[DATE] [BATCH/EMAIL] [CODE] [DESCRIPTION] [FIX] [STATUS]
```

**3+ same code in one week triggers:**
1. Template update
2. Automated check addition
3. KNOWLEDGE.md documentation

---

## 9) Asset Examples (Applied QA)

### Example A: Cold Email — PASS (92%)
```
Hi Mike,

I noticed Complete Landscaping doesn't have a website yet. 
Your competitors are getting online leads you're missing.

I built a preview site for you: [working link]

Worth a quick look?

John
NorthStar Synergy
(425) 600-2267
```
- A: 5/5 | B: 5/5 | C: 6/7 (no address) | D: 7/7
- Score: 92% → ✅ APPROVED

### Example B: Proposal — PASS (94%)
- Clear scope, 3-tier pricing, demo link working, timeline stated
- P1-P4 all complete
- Score: 94% → ✅ APPROVED

---

**Full Reference:** `playbooks/QA_QUALITY_GATE_V1.md`  
**Quick Card:** `playbooks/QA_QUICK_REFERENCE_CARD.md`  
**Automation:** `scripts/qa_email_lint.py`  
**Failure Log:** `memory/qa_failure_log.md`
