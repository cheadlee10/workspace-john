# website-sales-pipeline
Skill to automate the end-to-end website sales pipeline: lead discovery, enrichment, dedup, CRM card creation, outreach threading, and KPI logging.

## When to use
- You need to spin up an end-to-end NOSITE pipeline across multiple markets.
- You want consistent data schema for leads, dedupe, and CRM entries.
- You want automated cadence orchestration with multi-channel outreach templates.

## Capabilities
- Discovery: parse trigger text for niche and geo; query Google Places / business directories.
- Verification: confirm no dedicated website via multiple signals; annotate heat score.
- Enrichment: scrape Facebook/Yelp/Nextdoor for owner, hours, contact, photos.
- Dedup: check place_id, phone, embedding similarity before insert.
- CRM: create lead/card with fields (business, address, phone, owner, niche, lead_source, enrichment).
- Outreach: assign to cadences; track status through to close; log to leads.jsonl and jobs.jsonl.
- KPI: surface daily/week progress in memory.

## Workflow (high level)
1) Trigger: keyword + location from chat.
2) Discovery: search + normalization; determine no-website flag.
3) Enrichment: fetch owner and contact details.
4) Dedup: gate duplicates.
5) CRM Card: create or update lead with enrichment.
6) Outreach: schedule touches per cadence; capture outcomes.
7) Logging: append leads.jsonl and jobs.jsonl; memory updates.

## Data model (schema sketches)
- leads table: id, business_name, address, phone, place_id, owner_name, owner_email, niche, lead_source, status, website_template, website_url, outreach_count, last_contacted, notes
- lead_embeddings: lead_id, embedding

## Safety & Governance
- Respect privacy; do not expose credentials.
- Use redaction for sensitive fields in memory.
- Token budget discipline: default to low-token operations; escalate when high ROI tasks appear.
