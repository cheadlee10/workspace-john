import json
from pathlib import Path
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

POLICY = "fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE"
TZ = ZoneInfo("America/Los_Angeles")

queue_path = Path("outreach_queue.jsonl")
tracker_path = Path("outbound_send_tracker_2026-03-03.json")

queue_rows = [json.loads(line) for line in queue_path.read_text(encoding="utf-8").splitlines() if line.strip()]
tracker = json.loads(tracker_path.read_text(encoding="utf-8"))

# newest queued leads = tail unique ids from queue (latest 20)
newest_ids = []
seen = set()
for row in reversed(queue_rows):
    lid = row.get("id")
    if not lid or lid in seen:
        continue
    seen.add(lid)
    newest_ids.append(lid)
    if len(newest_ids) >= 20:
        break
newest_ids = list(reversed(newest_ids))
newest_set = set(newest_ids)

tracker_sched_map = {e.get("lead_id"): e for e in tracker.get("lead_schedule", [])}

updated_queue = 0
updated_tracker = 0

for row in queue_rows:
    lid = row.get("id")
    if lid not in newest_set:
        continue

    dt_local = datetime.strptime(row["send_after_local"], "%Y-%m-%d %H:%M").replace(tzinfo=TZ)
    fu1_local = dt_local + timedelta(hours=24)
    fu2_local = dt_local + timedelta(hours=72)
    fu3_local = dt_local + timedelta(days=7)

    row["followup_1_at_local"] = fu1_local.strftime("%Y-%m-%d %H:%M")
    row["followup_2_at_local"] = fu2_local.strftime("%Y-%m-%d %H:%M")
    row["followup_3_at_local"] = fu3_local.strftime("%Y-%m-%d %H:%M")
    row["followup_1_at_utc"] = fu1_local.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%d %H:%M")
    row["followup_2_at_utc"] = fu2_local.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%d %H:%M")
    row["followup_3_at_utc"] = fu3_local.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%d %H:%M")

    row["approval_gate"] = "gate4_manual_unlock"
    row["gate_status"] = "locked_pending_manual_unlock"
    row["send_blocked_by_gate"] = True
    row["send_ready"] = False
    row["send_state"] = "prepared_pending_gate_unlock"
    row["auto_send_enabled"] = False
    row["auto_sent"] = False
    row["defer_reason"] = "manual gate lock active; do not auto-send"
    row["timezone_normalized"] = True
    row["followups"] = {
        "fu1_at_local": row["followup_1_at_local"],
        "fu2_at_local": row["followup_2_at_local"],
        "fu3_at_local": row["followup_3_at_local"],
        "fu1_at_utc": row["followup_1_at_utc"],
        "fu2_at_utc": row["followup_2_at_utc"],
        "fu3_at_utc": row["followup_3_at_utc"],
        "policy": POLICY,
    }
    updated_queue += 1

    ts = tracker_sched_map.get(lid)
    if ts:
        for k in [
            "window_id", "timezone", "send_after_local", "send_before_local", "send_after_utc", "send_before_utc",
            "gate4_unlock_by_local", "gate4_unlock_by_utc",
            "followup_1_at_local", "followup_2_at_local", "followup_3_at_local",
            "followup_1_at_utc", "followup_2_at_utc", "followup_3_at_utc",
            "approval_gate", "gate_status", "send_blocked_by_gate", "send_ready", "send_state",
            "auto_send_enabled", "auto_sent", "defer_reason", "timezone_normalized", "followups"
        ]:
            if k in row:
                ts[k] = row[k]
        updated_tracker += 1

queue_path.write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in queue_rows) + "\n", encoding="utf-8")

tracker["gate_lock_state"] = "manual_lock_enforced"
tracker["auto_send_enabled"] = False
tracker["gate_status"] = "locked_pending_manual_unlock"
tracker["send_blocked_by_gate"] = True
tracker["timezone_normalized"] = True
tracker["updated_by"] = "subagent-watchdog97-sendops-queueing"
tracker["updated_at_local"] = "2026-03-03 16:30:00"

tracker_path.write_text(json.dumps(tracker, indent=2) + "\n", encoding="utf-8")

print(json.dumps({
    "newest_ids": newest_ids,
    "updated_queue_rows": updated_queue,
    "updated_tracker_rows": updated_tracker
}))
