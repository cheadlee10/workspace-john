# QA Quality Gate v2 — Proposals & Outreach Assets

Date: 2026-03-05  
Owner: John (watchdog-qa-enforcement sprint)

## 1) Practical Quality Gate Checklist (pre-send, 2–4 minutes)

Use this as a hard gate before any proposal, cold email, DM pitch, or follow-up is sent.

### A) Clarity (6 checks)
1. Audience is explicit (correct name/business, no ambiguity).
2. Value proposition appears in first 2–3 lines.
3. Offer is concrete (what is delivered, not vague promises).
4. Price/terms are understandable in one read.
5. Timeline/next step is specific (date/window + action).
6. Single CTA only (reply/call/book/pay — pick one primary action).

### B) Offer Fit (5 checks)
1. Message references verified prospect facts only (services, city, contact).
2. Deliverable matches prospect type (local service, SaaS, etc.).
3. Pricing aligns with stated scope and market context.
4. Proof/examples are relevant to this prospect segment.
5. Channel fit is correct (email length/tone, SMS brevity, platform etiquette).

### C) Risk & Trust (Hard Gate, 6 checks)
1. No fabricated stats, testimonials, rankings, or social proof.
2. No contradictory numbers (reviews, pricing, dates, guarantees).
3. No unverified compliance-risk claims (e.g., guaranteed rankings/results).
4. No placeholder leakage (`[Name]`, `[price]`, `[domain]`, fake phone).
5. Links/contact/payment data are real and functioning.
6. Ownership/payment scope avoids dispute (what’s included + ongoing fee clarity).

### D) Formatting & Deliverability (6 checks)
1. Subject line specific, benefit-driven, <= 9 words.
2. Paragraphs short (1–3 lines).
3. Readability is scannable (bullets/spacing where useful).
4. Grammar/spelling clean.
5. Signature complete + branded consistently.
6. Link formatting clean (full URL, clickable, no broken placeholders).

---

## 2) Pass/Fail Rubric

Score each line item: **1 = pass, 0 = fail**.

### Section thresholds
- Clarity: **>= 5/6**
- Offer Fit: **>= 4/5**
- Risk & Trust: **6/6 required** (hard gate)
- Formatting: **>= 5/6**

### Decision logic
- **PASS**: All thresholds met + no hard-gate miss.
- **CONDITIONAL PASS**: Only one formatting miss; risk still 6/6.
- **FAIL**: Any risk miss, any placeholder leakage, or any section below threshold.

### Severity tags
- **P0 (Blocker):** Legal/trust risk, fabricated claim, contradictory numbers, placeholder leakage, broken/fake contact/link.
- **P1 (Major):** Weak offer fit, unclear CTA, vague scope/timeline, confusing pricing.
- **P2 (Minor):** Tone/polish/formatting quality issues.

---

## 3) Correction Workflow (enforcement loop)

1. **Intake + classify asset** (proposal, cold pitch, follow-up, platform proposal).
2. **Run gate** and score all 23 checks.
3. **Tag issues** P0/P1/P2.
4. **Fix in order**: P0 -> P1 -> P2.
5. **Re-score once** after edits.
6. **Release rule**: only PASS/CONDITIONAL PASS can send.
7. **Log outcome** (reply/no reply/close/lost) to improve templates.

**SLA:** No outbound asset is sent if any P0 exists.

---

## 4) Applied QA Audit (current assets)

### Asset A — `email-templates/proposal-email.md`
Type: Reusable proposal template (not send-ready as-is)

- Clarity: **5/6** (clear structure, CTA generic)
- Offer Fit: **4/5**
- Risk & Trust: **3/6**
- Formatting: **6/6**
- **Decision: FAIL for send-ready use**

Issues:
- **P0:** Placeholder leakage throughout (`[Name]`, `[price]`, `[Date]`).
- **P1:** Terms/ownership specifics absent for dispute prevention.

Required correction:
- Keep as template but add mandatory pre-send personalization checklist and “DO NOT SEND RAW” header.

---

### Asset B — `templates/upwork-proposal.md`
Type: Platform proposal template

- Clarity: **5/6**
- Offer Fit: **4/5**
- Risk & Trust: **3/6**
- Formatting: **6/6**
- **Decision: FAIL for direct send**

Issues:
- **P0:** Placeholder fields (`[Name]`, `[X]`, `[amount]`) can leak.
- **P1:** Proof claims (`X similar projects`) require verifiable substitution.

Required correction:
- Add substitution guardrails: reject send if any bracket token remains; require one concrete, truthful proof item.

---

### Asset C — `kevins-yard-work/EMAIL_PITCH.md`
Type: Real outreach draft

- Clarity: **6/6**
- Offer Fit: **4/5**
- Risk & Trust: **3/6**
- Formatting: **6/6**
- **Decision: FAIL**

Issues:
- **P0:** Unverified claims present (`155+ five-star`, `60%`, “ranking on Google by end of week”).
- **P0:** Placeholder signature remains (`[Your contact info - Craig to provide]`).
- **P1:** SEO language implies outcome certainty in places.

Required correction:
- Replace unverified numbers with sourced facts only or remove.
- Replace placeholder signature with real sender identity/contact.
- Reword SEO to capability language (optimize for visibility, no guarantee language).

---

### Asset D — `pitches/evergreen-pitch.md`
Type: Real outreach draft

- Clarity: **6/6**
- Offer Fit: **5/5**
- Risk & Trust: **4/6**
- Formatting: **6/6**
- **Decision: FAIL**

Issues:
- **P0:** Unsourced market/stat claims (`80% of customers search on phones`, price anchor range) unless evidence linked.
- **P1:** “SEO optimized to show up” is too close to implied guarantee.

Required correction:
- Remove or source numeric claims.
- Rephrase to: “SEO-ready foundation for local search visibility.”

---

## 5) Enforcement Rule (single line)

**Any P0 = send blocked until corrected and re-scored PASS/CONDITIONAL PASS.**

---

## 6) Ready-to-use QA Log Template

```md
Asset:
Type:
Reviewer:
Date:

Clarity: x/6
Offer Fit: x/5
Risk & Trust: x/6
Formatting: x/6

P0:
P1:
P2:

Decision: PASS | CONDITIONAL PASS | FAIL
Corrections made:
Re-score:
Approved to send by:
```
