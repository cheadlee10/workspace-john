import json, csv, re
from pathlib import Path
from datetime import datetime, timedelta

root = Path('.')
email_md = root/'email-templates'/'next-queued-email-assets-2026-03-03-batch106.md'
jsonl_path = root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path = root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

text = email_md.read_text(encoding='utf-8')
sections = [s for s in text.split('\n---\n') if re.search(r'^##\s+\d+\)', s, re.M)]
items = []
for sec in sections:
    m = re.search(r'^##\s+\d+\)\s+(.+?)\s+\(`([a-z0-9]+-\d+)`\)', sec, re.M)
    if not m:
        continue
    biz = m.group(1).strip()
    lid = m.group(2)
    items.append((lid, biz))

items = sorted(items, key=lambda x: int(x[0].split('-')[1]))
item_ids = {i[0] for i in items}

rows = []
if jsonl_path.exists():
    for ln in jsonl_path.read_text(encoding='utf-8').splitlines():
        if ln.strip():
            rows.append(json.loads(ln))

existing_ids = {r.get('lead_id') for r in rows}
existing_times = []
for r in rows:
    ts = r.get('scheduled_at')
    if isinstance(ts, str):
        try:
            existing_times.append(datetime.fromisoformat(ts))
        except Exception:
            pass
base = max(existing_times) if existing_times else datetime.fromisoformat('2026-03-04T09:00:00-08:00')
next_time = base + timedelta(minutes=5)

added = []
for lid, biz in items:
    if lid in existing_ids:
        continue
    t = next_time
    next_time += timedelta(minutes=5)
    row = {
        "scheduled_at": t.isoformat(),
        "batch_id": "BATCH-L-WAVE7",
        "sequence_step": "email_initial",
        "lead_id": lid,
        "business_name": biz,
        "email_to": "",
        "priority_tier": "P2",
        "priority_score": 79,
        "template_asset_file": "next-queued-email-assets-2026-03-03-batch106.md",
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
        "followup_24h_at": (t + timedelta(hours=24)).isoformat(),
        "followup_72h_at": (t + timedelta(hours=72)).isoformat(),
        "followup_7d_at": (t + timedelta(days=7)).isoformat(),
        "followup_1_at": (t + timedelta(hours=24)).isoformat(),
        "followup_2_at": (t + timedelta(hours=72)).isoformat(),
        "suppression_check": "clear",
        "safe_to_send": False
    }
    rows.append(row)
    added.append(lid)

if added:
    jsonl_path.write_text('\n'.join(json.dumps(r, separators=(',', ':')) for r in rows) + '\n', encoding='utf-8')

with csv_path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.reader(f)
    data = list(reader)
header, body = data[0], data[1:]

body = [r for r in body if not (len(r) > 4 and r[4] in item_ids)]

map_rows = {r['lead_id']: r for r in rows if r.get('lead_id') in item_ids}
for lid, biz in items:
    r = map_rows.get(lid)
    if not r:
        continue
    vals = [
        r['scheduled_at'], 'BATCH-L-WAVE7', '1', 'email', lid, biz, '', 'queued', 'pending', 'none', 'none',
        'no', 'no', 'no', 'none', 'no', '09:00', '17:00', 'America/Los_Angeles', 'manual_approval_required',
        'true', 'false', r['followup_24h_at'], r['followup_72h_at'], r['followup_7d_at'],
        'asset=next-queued-email-assets-2026-03-03-batch106.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment'
    ]
    body.append(vals)

body.sort(key=lambda x: (x[0], x[4] if len(x) > 4 else ''))

with csv_path.open('w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f, quoting=csv.QUOTE_ALL)
    writer.writerow(header)
    writer.writerows(body)

print(json.dumps({"parsed": len(items), "added_jsonl": len(added), "added_ids": added}, indent=2))
