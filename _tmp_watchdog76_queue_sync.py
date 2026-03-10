import json
from datetime import datetime, timedelta
from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
qpath = root / "outreach_queue.jsonl"
tpath = root / "outbound_send_tracker_2026-03-03.json"
target = [f"gpass-us-{n}" for n in range(502, 510)]
FMT = "%Y-%m-%d %H:%M"


def apply(rec):
    rec["approval_gate"] = "gate4_manual_unlock"
    gates = rec.get("approval_gates") or {}
    gates.update(
        {
            "gate1_data_qa": "complete",
            "gate2_message_qa": "complete",
            "gate3_throughput_qa": "complete",
            "gate4_manual_unlock": "pending",
        }
    )
    rec["approval_gates"] = gates
    rec["gate_status"] = "locked_pending_manual_unlock"
    rec["send_blocked_by_gate"] = True
    rec["send_ready"] = False
    rec["send_state"] = "prepared_pending_gate_unlock"
    rec["auto_send_enabled"] = False
    rec["auto_sent"] = False
    rec["defer_reason"] = "manual gate lock active; do not auto-send"
    rec["timezone_normalized"] = True

    bl = datetime.strptime(rec["send_after_local"], FMT)
    bu = datetime.strptime(rec["send_after_utc"], FMT)

    rec["followup_1_at_local"] = (bl + timedelta(hours=24)).strftime(FMT)
    rec["followup_2_at_local"] = (bl + timedelta(hours=72)).strftime(FMT)
    rec["followup_3_at_local"] = (bl + timedelta(days=7)).strftime(FMT)
    rec["followup_1_at_utc"] = (bu + timedelta(hours=24)).strftime(FMT)
    rec["followup_2_at_utc"] = (bu + timedelta(hours=72)).strftime(FMT)
    rec["followup_3_at_utc"] = (bu + timedelta(days=7)).strftime(FMT)
    rec["followups"] = {
        "fu1_at_local": rec["followup_1_at_local"],
        "fu2_at_local": rec["followup_2_at_local"],
        "fu3_at_local": rec["followup_3_at_local"],
        "fu1_at_utc": rec["followup_1_at_utc"],
        "fu2_at_utc": rec["followup_2_at_utc"],
        "fu3_at_utc": rec["followup_3_at_utc"],
        "policy": "fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE",
    }


rows = [json.loads(l) for l in qpath.read_text(encoding="utf-8").splitlines() if l.strip()]
byid = {r["id"]: r for r in rows}
for lid in target:
    apply(byid[lid])
qpath.write_text("\n".join(json.dumps(r, separators=(",", ":")) for r in rows) + "\n", encoding="utf-8")

tr = json.loads(tpath.read_text(encoding="utf-8"))
ls = tr.get("lead_schedule", [])
mp = {r["lead_id"]: r for r in ls}

for lid in target:
    s = mp[lid]
    q = byid[lid]
    for f in [
        "timezone",
        "window_id",
        "send_after_local",
        "send_before_local",
        "send_after_utc",
        "send_before_utc",
        "gate4_unlock_by_local",
        "gate4_unlock_by_utc",
    ]:
        s[f] = q[f]
    apply(s)

wm = {}
for s in ls:
    w = s.get("window_id")
    if w:
        wm.setdefault(w, []).append(s["lead_id"])

for win in tr.get("windows", []):
    wid = win.get("window_id")
    if wid in wm:
        win["lead_ids"] = wm[wid]
        win["lead_count"] = len(wm[wid])

tr["lead_ids"] = [r["lead_id"] for r in ls]
tr["first_touches_planned"] = len(ls)
tr["prepared_not_sent_count"] = sum(1 for r in ls if not r.get("auto_sent", False))
tr["gate_lock_state"] = "manual_lock_enforced"
tr["auto_send_enabled"] = False
tr["gate_status"] = "locked_pending_manual_unlock"
tr["send_blocked_by_gate"] = True
tr["timezone_normalized"] = True
prepared_vals = [str(r.get("prepared_at_local") or "") for r in ls]
tr["last_prepared_at_local"] = max(prepared_vals) if prepared_vals else tr.get("last_prepared_at_local", "")
tr["updated_at_local"] = "2026-03-03 09:50:00"
tr["updated_by"] = "subagent-watchdog76-sendops-queueing"

tpath.write_text(json.dumps(tr, indent=2) + "\n", encoding="utf-8")
print("watchdog76 normalization enforced for", ", ".join(target))
