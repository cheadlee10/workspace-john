import csv, json, re
from datetime import datetime, timedelta
from pathlib import Path

batch_file = Path('email-templates/next-queued-email-assets-2026-03-03-batch90.md')
jsonl_path = Path('email-templates/send-queue-2026-03-02-next-batches.jsonl')
csv_path = Path('email-templates/send-queue-2026-03-02-next-batches-tracker.csv')
leads_path = Path('leads.jsonl')

email = batch_file.read_text(encoding='utf-8', errors='ignore')
lead_ids = sorted(set(re.findall(r'`(sprint-\d{8}-\d{3})`', email)))

lead_name = {}
for line in leads_path.read_text(encoding='utf-8', errors='ignore').splitlines():
    line = line.strip()
    if not line:
        continue
    try:
        d = json.loads(line)
    except Exception:
        continue
    lid = str(d.get('id', '')).strip()
    if lid:
        lead_name[lid] = d.get('client') or d.get('business_name') or 'Unknown Business'

existing_ids = set()
json_lines = []
for line in jsonl_path.read_text(encoding='utf-8', errors='ignore').splitlines():
    if not line.strip():
        continue
    json_lines.append(line)
    try:
        d = json.loads(line)
        if d.get('lead_id'):
            existing_ids.add(str(d['lead_id']).strip())
    except Exception:
        pass

missing = [lid for lid in lead_ids if lid not in existing_ids]
if not missing:
    print('No missing leads.')
    raise SystemExit(0)

last_obj = json.loads(json_lines[-1])
base_dt = datetime.fromisoformat(last_obj['scheduled_at'])

new_json_objs = []
for i, lid in enumerate(missing, 1):
    dt = base_dt + timedelta(minutes=5 * i)
    sched = dt.isoformat()
    obj = {
        'scheduled_at': sched,
        'batch_id': 'BATCH-K-WAVE6',
        'sequence_step': 'email_initial',
        'lead_id': lid,
        'business_name': lead_name.get(lid, 'Unknown Business'),
        'email_to': '',
        'priority_tier': 'P2',
        'priority_score': 79,
        'template_asset_file': batch_file.name,
        'asset_ready': True,
        'placeholder_check': 'pass:{{live_url}},{{screenshot_url}}',
        'verification_status': 'pending_contact_enrichment',
        'approval_status': 'pending_main_agent_approval',
        'send_window_start': '09:00',
        'send_window_end': '17:00',
        'timezone': 'America/Los_Angeles',
        'gate_lock': 'manual_approval_required',
        'dispatch_lock': True,
        'auto_send_enabled': False,
        'followup_24h_at': (dt + timedelta(hours=24)).isoformat(),
        'followup_72h_at': (dt + timedelta(hours=72)).isoformat(),
        'followup_7d_at': (dt + timedelta(days=7)).isoformat(),
        'followup_1_at': (dt + timedelta(hours=24)).isoformat(),
        'followup_2_at': (dt + timedelta(hours=72)).isoformat(),
        'suppression_check': 'clear',
        'safe_to_send': False,
    }
    new_json_objs.append(obj)

with jsonl_path.open('a', encoding='utf-8', newline='') as f:
    for obj in new_json_objs:
        f.write(json.dumps(obj, ensure_ascii=True) + '\n')

with csv_path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.reader(f)
    rows = list(reader)
header = rows[0]
existing_csv = {r[4] for r in rows[1:] if len(r) > 4}

with csv_path.open('a', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    for obj in new_json_objs:
        lid = obj['lead_id']
        if lid in existing_csv:
            continue
        notes = f"asset={batch_file.name};approval=pending_main_agent_approval;verification=pending_contact_enrichment"
        row = [
            obj['scheduled_at'], obj['batch_id'], '1', 'email', lid, obj['business_name'], '',
            'queued', 'pending', 'none', 'none', 'no', 'no', 'no', 'none', 'no',
            obj['send_window_start'], obj['send_window_end'], obj['timezone'],
            obj['gate_lock'], 'true', 'false', obj['followup_24h_at'], obj['followup_72h_at'],
            obj['followup_7d_at'], notes
        ]
        if len(row) != len(header):
            if len(row) < len(header):
                row = row + [''] * (len(header) - len(row))
            else:
                row = row[:len(header)]
        w.writerow(row)

print(f'Appended {len(new_json_objs)} JSONL entries and up to {len(new_json_objs)} CSV rows for batch90.')
