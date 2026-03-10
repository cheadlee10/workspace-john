# TOOLS.md — Credentials & Ops (Compact)

## Core Contacts
- Report email: chead@me.com
- Cliff: agent:main:main
- Scalper: agent:scalper:main
- John: agent:john:main

## Workspace Paths
- Root: C:\Users\chead\.openclaw\workspace-john\
- Jobs: jobs.jsonl
- Leads: leads.jsonl
- Clients: clients/[client_name]/
- Dashboard API: http://localhost:8765

## Pipeline Schemas
Jobs status: quoted | in_progress | completed | lost
Leads status: new | contacted | proposal_sent | negotiating | closed | lost

## Payments / Outreach
- Stripe: pending setup (need key)
- PayPal: pending setup
- Twilio: active trial sender exists (verified recipients only)

## Security Rules
- SOUL.md is read-only
- Client data stays local
- Payment info never in plaintext
- Secrets should live in secure config/.env when available
- Log suspicious events to memory/security_log.md
