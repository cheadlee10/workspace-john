import re, json, csv
from pathlib import Path
from datetime import datetime, timedelta

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
email_dir = root / "email-templates"
asset = "next-queued-email-assets-2026-03-03-batch94.md"
jsonl_path = email_dir / "send-queue-2026-03-02-next-batches.jsonl"
csv_path = email_dir / "send-queue-2026-03-02-next-batches-tracker.csv"

text = (email_dir / asset).read_text(encoding="utf-8")
pattern = re.compile(r"##\s+\d+\)\s+(.+?)\s+\(`([a-z]+-\d{3})`\)", re.I)
items = pattern.findall(text)
if not items:
    raise SystemExit("No batch items found")

existing_text = jsonl_path.read_text(encoding="utf-8")
existing_ids = {json.loads(ln).get('lead_id') for ln in existing_text.splitlines() if ln.strip()}
new_items = [(name, lid) for name, lid in items if lid not in existing_ids]
if not new_items:
    print("No missing leads to append")
    raise SystemExit(0)

last_obj = json.loads([ln for ln in existing_text.splitlines() if ln.strip()][-1])
last_dt = datetime.fromisoformat(last_obj["scheduled_at"])

jsonl_lines = []
csv_rows = []
for i, (name, lid) in enumerate(new_items, start=1):
    dt = last_dt + timedelta(minutes=5*i)
    iso = dt.isoformat()
    row_json = {
        "scheduled_at": iso,
        "batch_id": "BATCH-K-WAVE6",
        "sequence_step": "email_initial",
        "lead_id": lid,
        "business_name": name,
        "email_to": "",
        "priority_tier": "P2",
        "priority_score": 79,
        "template_asset_file": asset,
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
        "followup_24h_at": (dt + timedelta(days=1)).isoformat(),
        "followup_72h_at": (dt + timedelta(days=3)).isoformat(),
        "followup_7d_at": (dt + timedelta(days=7)).isoformat(),
        "followup_1_at": (dt + timedelta(days=1)).isoformat(),
        "followup_2_at": (dt + timedelta(days=3)).isoformat(),
        "suppression_check": "clear",
        "safe_to_send": False,
    }
    jsonl_lines.append(json.dumps(row_json, ensure_ascii=False))

    csv_rows.append([
        iso,
        "BATCH-K-WAVE6",
        "1",
        "email",
        lid,
        name,
        "",
        "queued",
        "pending",
        "none",
        "none",
        "no",
        "no",
        "no",
        "none",
        "no",
        "09:00",
        "17:00",
        "America/Los_Angeles",
        "manual_approval_required",
        "true",
        "false",
        (dt + timedelta(days=1)).isoformat(),
        (dt + timedelta(days=3)).isoformat(),
        (dt + timedelta(days=7)).isoformat(),
        f"asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment"
    ])

with jsonl_path.open("a", encoding="utf-8", newline="") as f:
    if not existing_text.endswith("\n"):
        f.write("\n")
    for ln in jsonl_lines:
        f.write(ln + "\n")

with csv_path.open("a", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    for r in csv_rows:
        w.writerow(r)

print(f"Appended {len(new_items)} queue entries for {asset}")
print("Lead IDs:", ", ".join([lid for _, lid in new_items]))
