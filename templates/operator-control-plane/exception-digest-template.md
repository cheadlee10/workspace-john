# Exception Digest — Craig Control Plane (Automation Template)

## Metadata
- report_date: {{report_date}}
- generated_at_pt: {{generated_at_pt}}
- severity_counts: P0={{p0_count}} | P1={{p1_count}} | P2={{p2_count}} | P3={{p3_count}}

## Exception Ruleset
Use deterministic IDs so alerts can dedupe and trend.

### P0 (Critical)
1. **EX-JOBS-EMPTY** — `jobs.jsonl` missing or zero records.
2. **EX-PIPELINE-DROPOFF** — Leads added today > {{pipeline_dropoff_threshold_leads}} AND outreach sent today = 0.

### P1 (High)
3. **EX-LOW-USABLE-RATE** — `leads_usable_pct < {{usable_rate_threshold_pct}}%`.
4. **EX-QUEUE-STALE** — any queue record in `status=new` older than {{stale_new_hours}}h.
5. **EX-RESPONSES-UNFOLLOWED** — responded leads with no follow-up task after {{followup_sla_hours}}h.

### P2 (Medium)
6. **EX-DATA-QUALITY-MISSING-PHONE** — record marked `outreach_usable=true` but phone/email missing.
7. **EX-STATUS-DRIFT** — status value outside approved set per file.
8. **EX-SOURCE-CONCENTRATION** — single source > {{source_concentration_threshold_pct}}% of new leads.

### P3 (Low)
9. **EX-NOTES-MISSING** — blank `notes` in new lead/queue items.
10. **EX-NO-OWNER-NAME** — owner/contact unresolved for priority leads.

---

## Active Exceptions (render one block per exception)

### {{severity}} | {{exception_id}} | {{title}}
- Triggered_at: {{triggered_at_pt}}
- File: {{file_name}}
- Detection_query: {{query_or_logic}}
- Impact: {{impact_summary}}
- Scope: {{affected_count}} records
- Examples:
  - {{example_1}}
  - {{example_2}}
  - {{example_3}}
- Owner: {{owner}}
- SLA: {{sla_due}}
- Mitigation now: {{immediate_action}}
- Prevention fix: {{systemic_fix}}
- Status: {{open_or_resolved}}

---

## Today’s Baseline Snapshot (auto-populate)
- leads_total: {{leads_total}}
- leads_usable_pct: {{leads_usable_pct}}
- leads_unverifiable_pct: {{leads_unverifiable_pct}}
- queue_total: {{queue_total}}
- queue_verified_email_phone: {{queue_verified_both}}
- queue_phone_only: {{queue_phone_only}}
- jobs_count: {{jobs_count}}
- pitch_log_count: {{pitchlog_count}}

## Current Workspace-Derived Alert Seed (2026-03-02)
- P0 EX-JOBS-EMPTY likely active (jobs file currently has 0 records).
- P1 EX-LOW-USABLE-RATE likely active if computed from current leads (usable rate materially below balanced target).
- P1 EX-SOURCE-CONCENTRATION likely active (Yelp-Unclaimed dominates lead source mix).

## Machine-Readable Event Shape (JSON)
```json
{
  "report_date": "{{report_date}}",
  "exception_id": "EX-LOW-USABLE-RATE",
  "severity": "P1",
  "title": "Low outreach-usable lead rate",
  "file": "leads.jsonl",
  "triggered_at": "{{iso_ts}}",
  "metric": {
    "name": "leads_usable_pct",
    "value": {{metric_value}},
    "threshold": {{metric_threshold}}
  },
  "affected_count": {{affected_count}},
  "owner": "john",
  "sla_hours": 24,
  "status": "open",
  "immediate_action": "{{immediate_action}}",
  "prevention_fix": "{{prevention_fix}}"
}
```
