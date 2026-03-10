# QA Enforcement Report v4 — Sales Assets
**Date:** 2026-03-04  
**Owner:** John QA Enforcement (subagent)  
**Scope:** Recent sales templates + memory guidance consistency/compliance/quality re-audit (v4 assets + governing memory docs).

---

## Executive Decision
**Overall: FAIL (improved, but P0 policy conflicts remain).**  
v4 templates are cleaner and mostly removed first-touch pricing, but execution policy is still not enforceable due to unresolved guidance conflicts and missing mandatory controls.

---

## Files Reviewed (v4 pass)
- `templates/site_demo_pack_v4.md`
- `templates/email_outreach_pack_v4.md`
- `templates/send_ops_queue_v4.md`
- `memory/KNOWLEDGE.md`
- `memory/CRITICAL_RULES.md`
- `MEMORY.md`
- `memory/active_projects.md`
- `memory/qa_enforcement_report_2026-03-04_v3.md` (baseline comparison)

---

## What Improved Since v3
1. **First-touch pricing removed from v4 email/site packs** (major improvement).  
2. **Template readability/scannability improved** (clear sections, reusable blocks).  
3. **Queue operational quality improved** (time windows, follow-up triggers, batching logic).  
4. **Placeholders are called out in site pack publish notes** (partial control).

---

## Remaining Findings & Required Fixes

## P0 — Blockers (must fix before scale)

### 1) Policy conflict still unresolved: plain-text outreach vs branded HTML mandate
**Conflict:**
- `MEMORY.md` says all client-facing materials must use branded template (`website/EMAIL_TEMPLATE.html`).
- `memory/KNOWLEDGE.md` cold email standard requires plain-text, short outreach.

**Risk:** Team can execute either interpretation; deliverability and consistency break.

**Required fix:** Add one precedence block in **both** files:
- Cold outbound (first touch + follow-ups) = plain text only.
- Post-reply nurture/proposal/delivery = branded HTML allowed.

---

### 2) Visual proof requirement not operationalized in active outreach queue
**Policy:** `memory/KNOWLEDGE.md` requires visual proof for web-design outreach (`live preview` or `screenshot link`).

**Gap:** `templates/send_ops_queue_v4.md` first-touch snippets are idea-based and do not require/contain a proof link token.

**Risk:** Lower trust/conversion + policy non-compliance.

**Required fix (template-level):**
- Add required column: `Proof Link`.
- Add send blocker: **DO NOT SEND if Proof Link empty/unverified**.
- Add snippet token in outreach text: `{{VISUAL_PROOF_URL}}`.

---

### 3) Cadence standard drift persists
**Policy:** `memory/KNOWLEDGE.md` sets 3-7-7 cadence (+ optional breakup Day 17).

**Gap:** `templates/email_outreach_pack_v4.md` says follow-up cadence Day 2, 5, 9, 14, 21.

**Risk:** non-standard execution, harder QA, noisy follow-up behavior.

**Required fix:**
- Update v4 sending notes to canonical: Day 0 / Day 3 / Day 10 (+ optional Day 17 breakup).
- Mark any additional touches as “experimental, opt-in, not default.”

---

## P1 — High Priority

### 4) First-touch length rule is softened, not enforced
**Policy intent:** short first touch (<100 words).

**Gap:** `email_outreach_pack_v4.md` says “under 120 words where possible.”

**Required fix:**
- Change rule to **hard cap <100 words** for cold first touch.
- Add quick lint step in sending notes: word count check before send.

---

### 5) Placeholder leak control incomplete across outreach assets
`site_demo_pack_v4.md` warns about placeholders before publish, but outbound pack/queue lacks a universal send blocker.

**Required fix:** add to all active outbound files:
- `SEND BLOCKER: no [..], {{..}}, ___ tokens remain`.

---

### 6) Offer-family separation still implicit (not enforced)
Queue currently mixes website-oriented language while broader packs discuss ops automation.

**Risk:** message mismatch by lead context.

**Required fix:**
- Add mandatory queue field: `Offer Family` (`Website` | `Ops Automation`).
- Keep one offer family per send batch.

---

## P2 — Quality / Governance

### 7) Legacy version sprawl increases execution error risk
Multiple active-looking versions exist (`v1`, `v2`, `v3`, `v4`) for same packs.

**Risk:** reps use stale assets with superseded rules.

**Required fix:**
- Add top-of-file banner to older versions: `DEPRECATED — use v4`.
- Create `templates/ACTIVE_SALES_ASSETS.md` single source of truth.

---

### 8) “Only build for no-website businesses” is not evidenced in queue
`CRITICAL_RULES.md` requires explicit no-website verification before build/outreach. Queue uses IDs like `nosite-*`, but verification fields are absent.

**Required fix:** add columns to send queue:
- `Website Check 1 (query + result)`
- `Website Check 2 (query + result)`
- `Yelp/GBP website link check`
- `Verifier + timestamp`

---

## Pass/Fail Checklist (v4)

| Control | Status | Notes |
|---|---|---|
| No first-touch pricing in active v4 outreach | **PASS** | v4 pack removed explicit early pricing |
| Plain-text vs HTML precedence documented clearly | **FAIL** | `MEMORY.md` and `KNOWLEDGE.md` still conflict |
| Visual proof required and enforced in send queue | **FAIL** | No required proof-link field/blocker in `send_ops_queue_v4.md` |
| Canonical 3-7-7 cadence applied | **FAIL** | v4 still states Day 2/5/9/14/21 |
| First-touch <100 words enforced | **FAIL** | v4 uses “<120 where possible” |
| Placeholder send blocker in all outbound assets | **FAIL** | partial only; not universal |
| Queue includes no-website verification evidence | **FAIL** | `nosite` naming present, evidence fields missing |
| Queue prioritization & execution clarity | **PASS** | strong scheduling/follow-up structure |
| Site demo pack publish-quality guidance | **PASS** | clear builder notes and replacement cues |
| Contact-info safety alignment with CRITICAL_RULES | **PASS** | no direct Craig-contact leakage found in reviewed v4 templates |

**Score:** **4 PASS / 6 FAIL**

---

## Required Remediation Sequence
1. Resolve `MEMORY.md` vs `KNOWLEDGE.md` outreach format precedence (P0).  
2. Enforce visual proof token/field + send blocker in queue (P0).  
3. Normalize cadence to 3-7-7 default and lock as QA rule (P0).  
4. Enforce <100-word first-touch and add pre-send lint checks (P1).  
5. Add universal placeholder blocker and offer-family field in outbound files (P1).  
6. Add no-website verification evidence columns in queue (P2 compliance hardening).  
7. Deprecate older template versions and publish `ACTIVE_SALES_ASSETS.md` (P2 governance).

---

## Final Enforcement Decision
**Not approved for full-scale outbound until P0 fixes are applied.**  
After P0 remediation, run a fast re-audit and permit controlled sends behind checklist gating.