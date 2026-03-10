import json, csv, re
from pathlib import Path
from datetime import datetime, timedelta

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
md_path = root / "email-templates" / "next-queued-email-assets-2026-03-03-batch107.md"
jsonl_path = root / "email-templates" / "send-queue-2026-03-02-next-batches.jsonl"
csv_path = root / "email-templates" / "send-queue-2026-03-02-next-batches-tracker.csv"

md = md_path.read_text(encoding="utf-8")
pat = re.compile(r"##\s+\d+\)\s+(.+?)\s+\(`(sprint-\d{8}-\d{3})`\)", re.M)
items = pat.findall(md)

existing_jsonl = jsonl_path.read_text(encoding="utf-8") if jsonl_path.exists() else ""
existing_csv = csv_path.read_text(encoding="utf-8") if csv_path.exists() else ""

# Start right after existing latest slot (11:10 from batch106)
base = datetime.fromisoformat("2026-03-05T11:15:00-08:00")
batch_id = "BATCH-M-WAVE8"
asset = "next-queued-email-assets-2026-03-03-batch107.md"

new_jsonl = []
new_csv_rows = []
for i, (biz, lead_id) in enumerate(items):
    if lead_id in existing_jsonl and lead_id in existing_csv:
        continue
    scheduled = base + timedelta(minutes=5*i)
    s = scheduled.isoformat()
    f24 = (scheduled + timedelta(days=1)).isoformat()
    f72 = (scheduled + timedelta(days=3)).isoformat()
    f7d = (scheduled + timedelta(days=7)).isoformat()

    obj = {
        "scheduled_at": s,
        "batch_id": batch_id,
        "sequence_step": "email_initial",
        "lead_id": lead_id,
        "business_name": biz,
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
        "followup_24h_at": f24,
        "followup_72h_at": f72,
        "followup_7d_at": f7d,
        "followup_1_at": f24,
        "followup_2_at": f72,
        "suppression_check": "clear",
        "safe_to_send": False,
    }
    new_jsonl.append(json.dumps(obj, separators=(",", ":")))

    notes = f"asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment"
    new_csv_rows.append([
        s,batch_id,"1","email",lead_id,biz,"","queued","pending","none","none","no","no","no","none","no",
        "09:00","17:00","America/Los_Angeles","manual_approval_required","true","false",f24,f72,f7d,notes
    ])

if new_jsonl:
    with jsonl_path.open("a", encoding="utf-8", newline="") as f:
        if not existing_jsonl.endswith("\n"):
            f.write("\n")
        f.write("\n".join(new_jsonl) + "\n")

if new_csv_rows:
    with csv_path.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerows(new_csv_rows)

print(f"appended_jsonl={len(new_jsonl)} appended_csv={len(new_csv_rows)} parsed_items={len(items)}")
