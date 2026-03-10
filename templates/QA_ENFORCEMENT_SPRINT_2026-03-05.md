# QA Enforcement Sprint — Proposals & Outreach Assets

**Date:** 2026-03-05  
**Owner:** John (Revenue)  
**Scope:** proposal + outreach templates in `/templates`

---

## 1) Practical Quality Gate Checklist (Enforcement Version)

Use this gate on every asset before send/submit.

### A) Clarity (30%)
- [ ] A1: Single objective (one action only)
- [ ] A2: First line is prospect-specific (no generic opener)
- [ ] A3: Length controlled (cold email <= 100 words body; proposal concise)
- [ ] A4: Plain language (no jargon fluff)
- [ ] A5: One idea per sentence

### B) Offer Fit (25%)
- [ ] B1: At least one verified business fact
- [ ] B2: Problem directly mapped to offered service
- [ ] B3: Correct vertical / use-case match
- [ ] B4: Correct city/region and business identity
- [ ] B5: Stage match (no-site vs outdated-site vs proposal stage)

### C) Risk Checks (30%)
- [ ] C1: No pricing in first-touch cold outreach
- [ ] C2: Low-friction CTA (question > command)
- [ ] C3: No fabricated proof/claims
- [ ] C4: No spammy trigger language (FREE/URGENT/ACT NOW/GUARANTEE)
- [ ] C5: Compliance line present (opt-out or address where channel requires)
- [ ] C6: Sender identity complete (name/company/phone)
- [ ] C7: Any proof links are real + tested

### D) Formatting (15%)
- [ ] D1: No encoding/garbled characters
- [ ] D2: All links clickable and working
- [ ] D3: Names/company spelling exact
- [ ] D4: No unresolved placeholders in send-ready output
- [ ] D5: Correct channel format (plain text for first-touch email)
- [ ] D6: Signature complete
- [ ] D7: Follow-up sequence exists

---

## 2) Pass/Fail Rubric

### Critical Auto-Fail Conditions (any one = FAIL)
- Pricing in first-touch cold email (C1)
- Fabricated claim/case count/result (C3)
- Wrong name/company/city (B4/D3)
- Broken proof link (D2)
- Unresolved placeholders in send-ready copy (D4)
- Encoding corruption (D1)

### Weighted Score
- Clarity: 30%
- Offer Fit: 25%
- Risk: 30%
- Formatting: 15%

Formula:

`Score = (A/5*30) + (B/5*25) + (C/7*30) + (D/7*15)`

### Verdict Bands
- **>= 90** = PASS (send)
- **80-89** = CONDITIONAL (fix warnings, rescan)
- **70-79** = FAIL (major revision)
- **<70** = REWRITE (reject)

---

## 3) Correction Workflow (Operator-Safe)

1. **Draft** from template with all personalization fields filled.
2. **Critical scan first** (C1/C3/B4-D3/D4/D2/D1).
3. If any critical fail: **stop send** and fix before scoring.
4. Run full checklist and score weighted rubric.
5. If 80-89: do targeted fixes, then rescore.
6. If <80: rewrite from base template.
7. Click-test links + final read in plain text mode.
8. Log QA score + issue codes in tracking note.

### 60-second fix map
- Placeholder leftovers -> Find `{{` and `[`; resolve all
- First-touch price mention -> remove pricing; move to reply/proposal stage
- Fabricated proof -> replace with neutral truthful language
- Hard CTA -> convert to soft question
- Too long -> keep hook + problem + one CTA only

---

## 4) Applied QA Audit (Current Assets)

Assets reviewed:
1. `templates/upwork-proposal.md`
2. `templates/fiverr-gig-response.md`
3. `templates/outreach-nosite-template-pack.md`

### Audit Results

| Asset | Score | Verdict | Critical Failures | Notes |
|---|---:|---|---|---|
| upwork-proposal.md | 68 | FAIL | C3 risk (implied unverifiable counts), D4 placeholders | Needs truth-safe wording + send-ready variant rules |
| fiverr-gig-response.md | 74 | FAIL | C3 risk (client count claims), D4 placeholders | Strong structure, but needs claim-safe and stage-safe language |
| outreach-nosite-template-pack.md | 61 | FAIL | C1 first-touch pricing, D4 placeholders | Core issue: pricing + scheduling asks too early in cold touch |

---

## 5) Corrected, Gate-Compliant Rewrites

### A) Cold Email — No Website (PASS target 93)
Subject: Quick idea for {{BusinessName}}

Hi {{OwnerName}},

I found {{BusinessName}} while searching for {{Industry}} in {{City}} and didn’t see a website listed.

I build simple sites for local {{Industry}} teams so people searching on Google can call or request a quote faster.

Want me to send a 1-page mockup idea for {{BusinessName}}?

— John  
NorthStar Synergy  
{{Phone}}  
(Reply "stop" and I won’t follow up.)

### B) Cold Email — Facebook-Only (PASS target 91)
Subject: Quick idea for {{BusinessName}}

Hi {{OwnerName}},

Your Facebook page looks active. One opportunity: people searching Google for {{Industry}} in {{City}} may not find you without a website.

I can share a short mockup showing how to capture those search leads.

Worth sending over?

— John | NorthStar Synergy | {{Phone}}  
(Reply "stop" and I won’t follow up.)

### C) Upwork Proposal Opening (PASS target 92)
Hi [Name],

Thanks for posting this — I read your requirements and can deliver this in a clear milestone plan.

My approach:
1) confirm scope and acceptance criteria  
2) ship first deliverable quickly  
3) iterate with updates  
4) final QA + handoff notes

Based on your post, you need: [specific restatement].
Timeline: [X days]. Fixed price: $[amount].

If helpful, I can start with a small first milestone so you can review quality before full rollout.

Best,  
John

### D) Fiverr Response Opening (PASS target 90)
Hi [Name],

I can help with this. Based on your request, I’d handle:
- [specific task 1]
- [specific task 2]
- [specific task 3]

Estimated turnaround: [X days]. Budget range: [range] depending on final scope.

If you want, send your sample file and I’ll confirm exact scope + delivery plan.

Best,  
John

---

## 6) Enforcement Policy Going Forward

- Do not send any outreach/proposal below 90 unless explicitly approved.
- Any critical fail triggers immediate stop + correction.
- First-touch outreach: no pricing, no fabricated proof, one soft CTA.
- Templates remain drafts only; every send must resolve placeholders + verify facts.

**Sprint outcome:** Quality gate defined, rubric finalized, correction workflow set, and applied audit completed with corrected compliant replacements.
