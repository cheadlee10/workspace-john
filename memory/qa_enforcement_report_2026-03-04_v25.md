# QA Enforcement Report — Sales Assets
**Version:** v25  
**Date:** 2026-03-04  
**Scope:** Enforce consistency, compliance, and quality across active sales templates + memory guidance.

---

## Executive Verdict
**Overall status: FAIL (blocking contradictions remain in active + legacy send assets).**

### Delta vs v24
- ✅ Active bundle parity is now on **v24** (`email_outreach_pack_v24.md`, `send_ops_queue_v24.md`, `site_demo_pack_v24.md`).
- ✅ `send_ops_queue_v24.md` remains operationally strong (prioritized, channel-aware, follow-up triggers).
- ❌ Canonical cold-email rules still not hard-gated in active outreach pack.
- ❌ SMS compliance controls still missing in send ops queue.
- ❌ Legacy templates/playbooks still contradict canonical standards and are not deprecated.
- ❌ Governance artifacts still missing (`release_manifest`, pricing SOT, QA schema).

---

## Assets Reviewed (v25 pass)
- `templates/email_outreach_pack_v24.md`
- `templates/send_ops_queue_v24.md`
- `templates/site_demo_pack_v24.md`
- `playbooks/COLD_EMAIL_OUTREACH_PLAYBOOK_V1_2026-03-02.md` (canonical)
- `memory/KNOWLEDGE.md`
- `MEMORY.md`
- Legacy conflict set:
  - `templates/email_outreach_pack.md`
  - `templates/email-variations.md`
  - `templates/outreach-nosite-template-pack.md`
  - `playbooks/nosite-outreach-playbook.md`

---

## Findings (Gaps / Contradictions / Compliance)

### 1) Active outreach cadence conflicts with canonical standard (HIGH)
**Files:** `templates/email_outreach_pack_v24.md` vs canonical playbook

**Evidence**
- v24 pack states follow-ups at **2 days / 4 days / 7 days**.
- Canonical playbook requires **Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)**.

**Risk**
- Sequence drift from proven standard; degraded consistency and testing validity.

**Required fix**
- Replace cadence language in v24 pack with canonical 0/3/10(+17).

---

### 2) Active outreach pack does not enforce canonical send-gates (HIGH)
**File:** `templates/email_outreach_pack_v24.md`

**Evidence**
- No mandatory block for: `<100 words`, `1 verifiable observation`, `1 soft CTA`, `no placeholders`, `visual proof required for website outreach`.

**Risk**
- Operators can send noncompliant copy even if templates are “good.”

**Required fix**
- Insert a non-negotiable send-gate at top of file.

---

### 3) SMS/TCPA guardrails still absent in active send queue (HIGH)
**File:** `templates/send_ops_queue_v24.md`

**Evidence**
- No mandatory sender identification line.
- No explicit opt-out language standard (e.g., STOP handling).
- No suppression schema/process.

**Risk**
- Legal/reputation exposure and downstream deliverability damage.

**Required fix**
- Add mandatory SMS compliance block + suppression log schema.

---

### 4) Memory/policy contradiction: branded email vs plain-text cold outreach (MEDIUM)
**Files:** `memory/KNOWLEDGE.md`, canonical playbook

**Evidence**
- `KNOWLEDGE.md`: “All client communications must use branded email template.”
- Canonical playbook: first-touch cold email must be plain text.

**Risk**
- Team confusion; reduced cold-email deliverability.

**Required fix**
- Explicit policy split in `memory/KNOWLEDGE.md`:
  - Cold first-touch = plain text
  - Branded HTML = post-reply/proposal/onboarding/active-client comms

---

### 5) Legacy outbound assets remain live and contradictory (HIGH)
**Files:**
- `templates/email-variations.md`
- `templates/outreach-nosite-template-pack.md`
- `playbooks/nosite-outreach-playbook.md`
- `templates/email_outreach_pack.md`

**Evidence**
- First-touch pricing appears in multiple templates.
- Hard CTAs (calendar/time-slot ask) appear in first touch.
- Non-canonical follow-up cadences (e.g., Day 1/5/10).
- No `DEPRECATED — DO NOT SEND` banners.

**Risk**
- Accidental noncompliant sends from wrong file.

**Required fix**
- Add deprecation headers now; archive with replacement map.

---

### 6) Governance artifacts still missing (MEDIUM)
**Missing files verified:**
- `templates/release_manifest.md`
- `templates/pricing_source_of_truth.md`
- `memory/qa_report_schema.md`

**Risk**
- No canonical release control; repeated drift every version cycle.

---

## Positive Findings (PASS)
- `templates/site_demo_pack_v24.md` remains structurally strong and clear.
- `templates/send_ops_queue_v24.md` has solid prioritization, channel sequencing, and follow-up logic.
- Active v24 templates avoid obvious encoding artifact issues.
- `memory/KNOWLEDGE.md` correctly records key canonical items (no first-touch pricing, visual proof, 3-7-7 standard) even though template enforcement lags.

---

## Fix Pack (Copy/Paste Ready)

### A) Insert at top of `templates/email_outreach_pack_v24.md`
```md
## SEND GATE — NON-NEGOTIABLE (Cold First Touch)
- Body <100 words (excluding signature)
- Exactly 1 verifiable business-specific observation
- Exactly 1 soft CTA question
- No first-touch pricing
- No send if placeholders remain
- Cadence lock: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup)
- For website/no-site outreach: include 1 visual proof URL
```

### B) Replace cadence instructions in `templates/email_outreach_pack_v24.md`
```md
## Recommended Sending Cadence (Canonical)
1. Day 0: Cold email
2. Day 3: Follow-up 1
3. Day 10: Follow-up 2
4. Day 17: Optional breakup
```

### C) Insert near top of `templates/send_ops_queue_v24.md`
```md
## SMS COMPLIANCE BLOCK (MANDATORY)
- First SMS must identify sender + company.
- Every SMS must include opt-out language (e.g., "Reply STOP to opt out.") where required by channel/law.
- Send only within recipient-local legal send windows.
- On STOP/complaint/revocation: immediate suppression and no further contact.

Suppression log schema:
`lead_id, channel, event_type, source, timestamp_local, operator`
```

### D) Add to top of legacy outbound files
```md
# DEPRECATED — DO NOT SEND
This asset is retained for historical reference only.
Use approved files listed in `templates/release_manifest.md`.
```

### E) Add to `memory/KNOWLEDGE.md`
```md
### Email Format Policy Split (Effective Immediately)
- Cold outbound first-touch: plain text only.
- Branded HTML template: post-reply follow-up, proposal, onboarding, and active client communications.
```

### F) Create governance files
- `templates/release_manifest.md` (approved send-ready bundle + version)
- `templates/pricing_source_of_truth.md` (offer hierarchy + channel/stage rules)
- `memory/qa_report_schema.md` (fixed QA rubric and scoring)

---

## Pass/Fail Checklist (v25)

### A) Canonical Cold-Email Enforcement
- [ ] **FAIL** Send-gate block present in active outreach pack
- [ ] **FAIL** Canonical cadence (0/3/10 + optional 17) enforced
- [ ] **FAIL** Visual proof requirement hard-enforced for website/no-site pitches
- [ ] **FAIL** Placeholder no-send rule embedded

### B) Version & Release Governance
- [x] **PASS** Active core pack version parity (v24)
- [ ] **FAIL** `templates/release_manifest.md` exists with approved asset list

### C) Pricing Governance
- [ ] **FAIL** `templates/pricing_source_of_truth.md` exists
- [ ] **FAIL** Legacy pricing contradictions deprecated/labeled
- [ ] **FAIL** Offer precedence by channel/stage is documented

### D) SMS / Legal Compliance
- [ ] **FAIL** Sender-ID standard embedded in send ops
- [ ] **FAIL** STOP/opt-out handling embedded in operational instructions
- [ ] **FAIL** Recipient-local legal window guardrail embedded
- [ ] **FAIL** Suppression schema/process embedded

### E) Guidance Consistency
- [ ] **FAIL** Plain-text cold vs branded-email policy split explicitly documented
- [ ] **FAIL** No-site outreach playbooks aligned/deprecated

### F) Quality Signals
- [x] **PASS** Site demo pack quality remains high
- [x] **PASS** Send ops prioritization quality remains strong
- [ ] **FAIL** Entire send-ready stack aligned to one canonical compliance standard

**Current score:** **FAIL** (blocking issues: canonical enforcement, SMS compliance, legacy contradiction risk, missing governance artifacts)

---

## Final QA Decision
**v25 Enforcement Result: FAIL — do not scale outbound volume until fix pack items A–F are applied.**