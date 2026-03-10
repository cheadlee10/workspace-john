import json
from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
existing = set()
sites = root / "sites"

for p in sites.iterdir():
    if not p.is_dir():
        continue
    if p.name.startswith("premium-v3-wave"):
        for d in p.iterdir():
            if d.is_dir():
                existing.add(d.name)
    else:
        existing.add(p.name)

items = []
with open(root / "outreach_queue.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            data = json.loads(line)
        except Exception:
            continue
        slug = data.get("slug") or ""
        if not slug or slug in existing:
            continue
        tier = data.get("tier")
        score = data.get("priority_score") or data.get("score") or 0
        est = data.get("estimated_value") or data.get("est_value") or 0
        items.append((tier, score, est, slug, data))

items.sort(key=lambda t: ((0 if t[0] == "P1" else 1), -(t[1] or 0), -(t[2] or 0)))
for tier, score, est, slug, data in items[:20]:
    print(f"{slug}|{tier}|{score}|{est}|{data.get('business_name')}|{data.get('service_type')}|{data.get('city')},{data.get('state')}|{data.get('id')}")
print("count", len(items))
