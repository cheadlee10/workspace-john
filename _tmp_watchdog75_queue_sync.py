import json
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(r"C:/Users/chead/.openclaw/workspace-john")
QUEUE_PATH = ROOT / "outreach_queue.jsonl"
TRACKER_PATH = ROOT / "outbound_send_tracker_2026-03-03.json"

TARGET_IDS = [f"gpass-us-{n}" for n in range(502, 510)]
FMT = "%Y-%m-%d %H:%M"


def ensure_followups(rec):
    base_local = datetime.strptime(rec["send_after_local"], FMT)
    base_utc = datetime.strptime(rec["send_after_utc"], FMT)

    fu1_local = (base_local + timedelta(hours=24)).strftime(FMT)
    fu2_local = (base_local + timedelta(hours=72)).strftime(FMT)
    fu3_local = (base_local + timedelta(days=7)).strftime(FMT)

    fu1_utc = (base_utc + timedelta(hours=24)).strftime(FMT)
    fu2_utc = (base_utc + timedelta(hours=72)).strftime(FMT)
    fu3_utc = (base_utc + timedelta(days=7)).strftime(FMT)

    rec["followup_1_at_local"] = fu1_local
    rec["followup_2_at_local"] = fu2_local
    rec["followup_3_at_local"] = fu3_local
    rec["followup_1_at_utc"] = fu1_utc
    rec["followup_2_at_utc"] = fu2_utc
    rec["followup_3_at_utc"] = fu3_utc
    rec["followups"] = {
        "fu1_at_local": fu1_local,
        "fu2_at_local": fu2_local,
        "fu3_at_local": fu3_local,
        "fu1_at_utc": fu1_utc,
        "fu2_at_utc": fu2_utc,
        "fu3_at_utc": fu3_utc,
        "policy": "fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE",
    }


def enforce_common(rec):
    rec["approval_gate"] = "gate4_manual_unlock"
    gates = rec.get("approval_gates") or {}
    gates.update({
        "gate1_data_qa": "complete",
        "gate2_message_qa": "complete",
        "gate3_throughput_qa": "complete",
        "gate4_manual_unlock": "pending",
    })
    rec["approval_gates"] = gates
    rec["gate_status"] = "locked_pending_manual_unlock"
    rec["send_blocked_by_gate"] = True
    rec["send_ready"] = False
    rec["send_state"] = "prepared_pending_gate_unlock"
    rec["auto_send_enabled"] = False
    rec["auto_sent"] = False
    rec["defer_reason"] = "manual gate lock active; do not auto-send"
    rec["timezone_normalized"] = True
    ensure_followups(rec)


queue_rows = [json.loads(l) for l in QUEUE_PATH.read_text(encoding="utf-8").splitlines() if l.strip()]
queue_by_id = {r["id"]: r for r in queue_rows}

for lid in TARGET_IDS:
    enforce_common(queue_by_id[lid])

QUEUE_PATH.write_text("\n".join(json.dumps(r, separators=(",", ":")) for r in queue_rows) + "\n", encoding="utf-8")

tracker = json.loads(TRACKER_PATH.read_text(encoding="utf-8"))
lead_schedule = tracker.get("lead_schedule", [])
sched_by_id = {r["lead_id"]: r for r in lead_schedule}

for lid in TARGET_IDS:
    s = sched_by_id[lid]
    q = queue_by_id[lid]
    for f in [
        "timezone", "window_id", "send_after_local", "send_before_local",
        "send_after_utc", "send_before_utc", "gate4_unlock_by_local", "gate4_unlock_by_utc"
    ]:
        s[f] = q[f]
    enforce_common(s)

window_map = {}
for s in lead_schedule:
    w = s.get("window_id")
    if w:
        window_map.setdefault(w, []).append(s["lead_id"])
for win in tracker.get("windows", []):
    wid = win.get("window_id")
    if wid in window_map:
        win["lead_ids"] = window_map[wid]
        win["lead_count"] = len(window_map[wid])

tracker["lead_ids"] = [r["lead_id"] for r in lead_schedule]
tracker["first_touches_planned"] = len(lead_schedule)
tracker["prepared_not_sent_count"] = sum(1 for r in lead_schedule if not r.get("auto_sent", False))
tracker["gate_lock_state"] = "manual_lock_enforced"
tracker["auto_send_enabled"] = False
tracker["gate_status"] = "locked_pending_manual_unlock"
tracker["send_blocked_by_gate"] = True
tracker["timezone_normalized"] = True
prepared_vals = [str(r.get("prepared_at_local") or "") for r in lead_schedule]
tracker["last_prepared_at_local"] = max(prepared_vals) if prepared_vals else tracker.get("last_prepared_at_local", "")
tracker["updated_at_local"] = "2026-03-03 09:40:00"
tracker["updated_by"] = "subagent-watchdog75-sendops-queueing"

TRACKER_PATH.write_text(json.dumps(tracker, indent=2) + "\n", encoding="utf-8")
print("watchdog75 normalization enforced for", ", ".join(TARGET_IDS))