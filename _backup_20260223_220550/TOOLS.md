# TOOLS.md - John's Credentials & Setup

## Email
- **Send reports to:** chead@me.com
- **SMTP:** clawcliff@gmail.com via Gmail (app password in send_report.py)

## Stripe (PENDING SETUP)
- **Status:** Not yet configured
- **Plan:** Test mode first, then live
- **Needs:** Stripe API key from Craig

## Platforms to Monitor for Gigs
- Fiverr: https://www.fiverr.com (search: excel automation, python scripts, data cleaning)
- Upwork: https://www.upwork.com (search: spreadsheet expert, automation developer)
- Reddit: r/forhire, r/slavelabour, r/excel, r/learnpython
- Twitter/X: #freelance #automation #excel

## Inter-Agent Communication
- **Scalper:** sessionKey="agent:scalper:main"
- **Cliff:** sessionKey="agent:main:main"
- **John (self):** sessionKey="agent:john:main"

## Key Paths
- Workspace: C:\Users\chead\.openclaw\workspace-john\
- Company dashboard: https://auctions-pupils-practices-commissions.trycloudflare.com
- Dashboard API: http://localhost:8765 (local) or via above URL

## Logging Jobs to the Dashboard
When you close a deal or update a job, append a JSON line to:
  C:\Users\chead\.openclaw\workspace-john\jobs.jsonl

Format (one JSON object per line):
  {"id":"unique-id","date":"2026-02-24","client":"Client Name","service":"Excel Audit","status":"completed","amount":299,"paid":true,"paid_date":"2026-02-24","notes":"Fiverr gig"}

Valid statuses: quoted | in_progress | completed | lost
Valid services: Excel Audit | Script Automation | Bot Building | Excel Template | Reporting Pipeline | Data Cleaning | Database Build | Excel Auditor SaaS

## Logging Leads to the Dashboard
Append a JSON line to:
  C:\Users\chead\.openclaw\workspace-john\leads.jsonl

Format:
  {"id":"unique-id","date":"2026-02-24","source":"Fiverr","client":"Name","service":"Data Cleaning","estimated_value":350,"status":"contacted","notes":""}

Valid lead statuses: new | contacted | proposal_sent | negotiating | closed | lost

## Dashboard API — Direct POST
You can also POST directly to the dashboard (faster than file sync):
  POST http://localhost:8765/api/jobs
  {"job_date":"2026-02-24","client_name":"Client","job_description":"...","status":"completed","invoice_amount":299,"paid":1}

Cliff syncs these files every 5 minutes automatically. You can also tell Cliff to run an immediate sync.
