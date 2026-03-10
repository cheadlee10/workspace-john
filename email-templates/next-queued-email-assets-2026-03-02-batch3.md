
I built a website preview for {{business_name}} to increase direct quote requests.

## QA Scope (Strict Guardrails)
- Source file: `outreach_queue.jsonl`
- Selection rule: next queued records after Batch 2 where `status="new"` and `channel_flags.can_email=true`.
- Included leads: `gpass-pnw-219`, `gpass-pnw-220`, `gpass-pnw-223`.
- Skipped in this pass: `gpass-pnw-221`, `gpass-pnw-222` (no verified email channel in queue).
- Verification standard: only queue-verified facts are used (business name, service, location, phone/email status, notes).
- Hard placeholder rule: every email body must include both `{{live_url}}` and `{{screenshot_url}}`.
- Prohibited content: fabricated owner names, fake metrics, unverifiable claims, or promises not supported by queue notes.

---

## 1) A Better Roofing Company (`gpass-pnw-219`) - P1
**Verified facts used**
- Service: Residential Roofing
- Location: Seattle, WA
- Email in queue: `abr@abetterroofing.com`
- Phone in queue: `(206) 935-1575`
- Verification note: contact details captured via Google snippet; contact page exists in queue notes
- Website quality note in queue: weak brochure site

**Subject options**
1. A Better Roofing Company: direct roofing inquiry-page concept
2. Built a Seattle roofing lead-capture preview for your team
3. Quick idea to increase direct residential roofing requests

**Email body**
Hi A Better Roofing Company team,

I drafted a conversion-focused concept designed to help capture more direct residential roofing quote requests.

- Live preview: {{live_url}}
- Screenshot: {{screenshot_url}}

If this direction is a fit, I can send a clear rollout plan and timeline.

**CTA options (pick one):**
- Reply **"PLAN"** and I'll send implementation steps.
- Reply **"REVIEW"** for a short walkthrough.
- Reply **"START"** and I'll send onboarding details today.

Best,
John  
NorthStar Synergy

---

## 2) Quality Pacific Roofing (`gpass-pnw-220`) - P1
**Verified facts used**
- Service: Residential Roofing
- Location: Seattle, WA 98122
- Email in queue: `Info@QualityPacificRoofing.com`
- Phone in queue: `(206) 264-0955`
- Verification note: phone/email verified on-site contact page
- Website quality note in queue: strong local site

**Subject options**
1. Quality Pacific Roofing: conversion-focused quote-flow concept
2. Built a direct-inquiry page concept for your Seattle market
3. Quick web conversion upgrade idea for Quality Pacific Roofing

**Email body**
Hi Quality Pacific Roofing team,

I put together a conversion-focused concept to help turn more website traffic into direct residential roofing inquiries.

- Live preview: {{live_url}}
- Screenshot: {{screenshot_url}}

If this structure matches your goals, I can send the rollout sequence and scope.

**CTA options (pick one):**
- Reply **"DETAILS"** for scope + timeline.
- Reply **"CALL"** for a 10-minute walkthrough.
- Reply **"GO"** and I'll send onboarding steps.

Best,
John  
NorthStar Synergy

---

## 3) A1 Handyman (`gpass-pnw-223`) - P1
**Verified facts used**
- Service: Handyman
- Location: Boise, ID 83706
- Email in queue: `mrhandymanid@gmail.com`
- Phone in queue: `(208) 995-6457`
- Verification note: phone/email verified on-site contact page
- Website quality note in queue: weak brochure site

**Subject options**
1. A1 Handyman: quick concept to increase direct Boise service requests
2. Built a handyman lead-capture preview for A1 Handyman
3. Streamlined quote-request flow concept for your team

**Email body**
Hi A1 Handyman team,

I created a conversion-focused concept aimed at increasing direct handyman quote requests from local search traffic.

- Live preview: {{live_url}}
- Screenshot: {{screenshot_url}}

If this is close to what you want, I can send a same-week rollout plan.

**CTA options (pick one):**
- Reply **"SEND PLAN"** and I'll share implementation steps.
- Reply **"WALKTHROUGH"** for a short review.
- Reply **"READY"** and I'll send onboarding today.

Best,
John  
NorthStar Synergy

---

## Final QA Checklist (Pass)
- Every included lead has `channel_flags.can_email=true` in `outreach_queue.jsonl`.
- No leads without verified email were included.
- No unverified owner names, rankings, revenue, or performance claims were added.
- Every email includes both required placeholders: `{{live_url}}` and `{{screenshot_url}}`.
- Every lead includes 3 subject options and 3 CTA options.
- Grammar/spelling pass completed.

