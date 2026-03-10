# Daily Operator Summary — Craig Control Plane (Automation Template)

## Metadata
- report_date: {{report_date}}  
- generated_at_pt: {{generated_at_pt}}  
- reporting_window: {{window_start}} → {{window_end}}  
- generator: {{agent_name_or_job_id}}

## Source Files + Freshness
- `jobs.jsonl` → records: {{jobs_count}} | last_modified: {{jobs_mtime}} | status: {{jobs_file_status}}  
- `leads.jsonl` → records: {{leads_count}} | last_modified: {{leads_mtime}} | status: {{leads_file_status}}  
- `outreach_queue.jsonl` → records: {{queue_count}} | last_modified: {{queue_mtime}} | status: {{queue_file_status}}  
- `sales-crm-pitch-log.jsonl` → records: {{pitchlog_count}} | last_modified: {{pitchlog_mtime}} | status: {{pitchlog_file_status}}

---

## 1) Revenue + Delivery Snapshot
- New jobs today: {{jobs_new_today}}  
- Completed jobs today: {{jobs_completed_today}}  
- Revenue booked today ($): {{revenue_booked_today}}  
- Revenue collected today ($): {{revenue_collected_today}}  
- Open jobs (quoted + in_progress): {{jobs_open_total}}  
- Jobs file health: {{jobs_health_note}}

## 2) Top-of-Funnel Lead Engine
- New leads today: {{leads_new_today}}  
- Total lead inventory: {{leads_total}}  
- Est pipeline value ($): {{lead_est_value_total}}  
- Outreach-usable leads: {{leads_usable_count}} ({{leads_usable_pct}}%)  
- Unverifiable/no-direct-channel leads: {{leads_unverifiable_count}} ({{leads_unverifiable_pct}}%)

### Lead Status Mix
- `new`: {{lead_status_new}}  
- `contacted`: {{lead_status_contacted}}  
- `proposal_sent`: {{lead_status_proposal_sent}}  
- `negotiating`: {{lead_status_negotiating}}  
- `closed`: {{lead_status_closed}}  
- `lost`: {{lead_status_lost}}  
- `unclaimed` (if present): {{lead_status_unclaimed}}

### Top Sources (count)
{{top_sources_block}}

### Top Service Verticals (count)
{{top_services_block}}

## 3) Outreach Execution
- Queue total: {{queue_total}}  
- Queue `new`: {{queue_new}}  
- Queue `in_progress`: {{queue_in_progress}}  
- Queue `sent`: {{queue_sent}}  
- Queue `responded`: {{queue_responded}}  
- Queue `closed`: {{queue_closed}}

### Channel Readiness in Queue
- Email+Phone verified (`verification_status=verified_email_phone`): {{queue_verified_both}}  
- Phone-usable only (`verification_status=usable`): {{queue_phone_only}}  
- Primary channel split: {{queue_primary_channel_split}}

## 4) Sales Activity Log
- Pitch log entries today: {{pitch_entries_today}}  
- Contacted today: {{pitch_contacted_today}}  
- Queued today: {{pitch_queued_today}}  
- Responded today: {{pitch_responded_today}}  
- Won today: {{pitch_won_today}}

## 5) Bottlenecks + Decisions
- #1 Bottleneck: {{bottleneck_1}}  
- #2 Bottleneck: {{bottleneck_2}}  
- #3 Bottleneck: {{bottleneck_3}}

- Decision / Action 1: {{decision_1}}  
- Decision / Action 2: {{decision_2}}  
- Decision / Action 3: {{decision_3}}

## 6) 24-Hour Targets
- Lead gen target: {{target_leads_next_24h}}  
- Outreach target: {{target_outreach_next_24h}}  
- Conversations target: {{target_conversations_next_24h}}  
- Revenue target ($): {{target_revenue_next_24h}}

## 7) Exception Digest Link
- exception_digest_ref: {{exception_digest_path_or_id}}

---

## Automation Notes (field mapping)
- `lead_est_value_total` = sum(`estimated_value`) in `leads.jsonl`.
- `leads_usable_count` = count where `outreach_usable=true`.
- `leads_unverifiable_count` = count where `verification_status=unverifiable_no_direct_channel`.
- `queue_verified_both` = count in `outreach_queue.jsonl` with `verification_status=verified_email_phone`.
- `queue_phone_only` = count in `outreach_queue.jsonl` with `verification_status=usable`.
- If `jobs.jsonl` empty or missing, set `jobs_health_note` = "NO JOB DATA — revenue tracking blind" and raise exception.
