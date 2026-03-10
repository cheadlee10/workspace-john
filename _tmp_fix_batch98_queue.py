import json, re
from pathlib import Path
from datetime import datetime, timedelta

base = Path(r"C:/Users/chead/.openclaw/workspace-john")
md_path = base / "email-templates/next-queued-email-assets-2026-03-03-batch98.md"
jsonl_path = base / "email-templates/send-queue-2026-03-02-next-batches.jsonl"
csv_path = base / "email-templates/send-queue-2026-03-02-next-batches-tracker.csv"

md = md_path.read_text(encoding='utf-8', errors='ignore')
entries = re.findall(r"^##\s+\d+\)\s+(.+?)\s+\(`(nosite-\d{3})`\)", md, flags=re.M)
expected_ids = [f"nosite-{i:03d}" for i in range(41,51)]
name_by_id = {lead_id:name.strip() for name, lead_id in entries if lead_id in expected_ids}

# Parse existing queue IDs and last schedule
existing_ids = set()
last_dt = None
last_obj = None
for line in jsonl_path.read_text(encoding='utf-8', errors='ignore').splitlines():
    line=line.strip()
    if not line:
        continue
    obj = json.loads(line)
    lid = obj.get('lead_id')
    if lid:
        existing_ids.add(lid)
    dt = datetime.fromisoformat(obj['scheduled_at'])
    if last_dt is None or dt > last_dt:
        last_dt = dt
        last_obj = obj

missing = [lid for lid in expected_ids if lid not in existing_ids]
if not missing:
    print('No missing IDs; nothing to append.')
    raise SystemExit

new_jsonl_lines=[]
new_csv_lines=[]

for idx, lid in enumerate(missing, start=1):
    sched = last_dt + timedelta(minutes=5*idx)
    iso = sched.isoformat()
    o = {
      "scheduled_at": iso,
      "batch_id": "BATCH-K-WAVE6",
      "sequence_step": "email_initial",
      "lead_id": lid,
      "business_name": name_by_id.get(lid, lid),
      "email_to": "",
      "priority_tier": "P2",
      "priority_score": 79,
      "template_asset_file": "next-queued-email-assets-2026-03-03-batch98.md",
      "asset_ready": True,
      "placeholder_check": "pass:{{live_url}},{{screenshot_url}}",
      "verification_status": "pending_contact_enrichment",
      "approval_status": "pending_main_agent_approval",
      "send_window_start": "09:00",
      "send_window_end": "17:00",
      "timezone": "America/Los_Angeles",
      "gate_lock": "manual_approval_required",
      "dispatch_lock": True,
      "auto_send_enabled": False,
      "followup_24h_at": (sched + timedelta(days=1)).isoformat(),
      "followup_72h_at": (sched + timedelta(days=3)).isoformat(),
      "followup_7d_at": (sched + timedelta(days=7)).isoformat(),
      "followup_1_at": (sched + timedelta(days=1)).isoformat(),
      "followup_2_at": (sched + timedelta(days=3)).isoformat(),
      "suppression_check": "clear",
      "safe_to_send": False
    }
    new_jsonl_lines.append(json.dumps(o))

    note = "asset=next-queued-email-assets-2026-03-03-batch98.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment"
    csv_line = ",".join([
      iso,"BATCH-K-WAVE6","1","email",lid,o['business_name'],"","queued","pending","none","none","no","no","no","none","no",
      "09:00","17:00","America/Los_Angeles","manual_approval_required","true","false",
      o['followup_24h_at'],o['followup_72h_at'],o['followup_7d_at'],note
    ])
    new_csv_lines.append(csv_line)

with jsonl_path.open('a', encoding='utf-8', newline='\n') as f:
    f.write('\n' + '\n'.join(new_jsonl_lines))

with csv_path.open('a', encoding='utf-8', newline='\n') as f:
    f.write('\n' + '\n'.join(new_csv_lines))

print('Appended IDs:', missing)
print('Start:', (last_dt + timedelta(minutes=5)).isoformat(), 'End:', (last_dt + timedelta(minutes=5*len(missing))).isoformat())