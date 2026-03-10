import re, json
from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
wave = "premium-v3-wave89"
wdir = root / "sites" / wave
site_results = []

for d in sorted([p for p in wdir.iterdir() if p.is_dir()]):
    c = (d / "index.html").read_text(encoding="utf-8")
    issues = []
    forms = re.findall(r"<form\b[^>]*>", c, re.I)
    if re.search(r"\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com", c, re.I):
        issues.append("placeholder_token")
    if len(forms) != 2:
        issues.append(f"form_count_{len(forms)}")
    for fm in forms:
        if not re.search(r"action=['\"]\/contact['\"]", fm, re.I) or not re.search(r"method=['\"]post['\"]", fm, re.I):
            issues.append("form_action_method")
    if len(re.findall(r"name=['\"]business['\"]", c, re.I)) < 2 or len(re.findall(r"name=['\"]source['\"]", c, re.I)) < 2:
        issues.append("hidden_fields")

    visible = re.sub(r"<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>", " ", c, flags=re.I)
    if re.search(r"guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b", visible, re.I):
        issues.append("non_compliant_claim")
    phones = re.findall(r"\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}", visible)
    if any(re.search(r"555|123-456-7890|000", p) for p in phones):
        issues.append("fabricated_phone")

    checks = ["name", "phone", "qname", "qphone", "qdetails"]
    for fid in checks:
        if not (re.search(rf"<label[^>]+for=['\"]{fid}['\"]", c, re.I) and re.search(rf"id=['\"]{fid}['\"]", c, re.I)):
            issues.append(f"missing_label_or_id_{fid}")

    site_results.append({"slug": d.name, "issues": issues})

batch_file = root / "email-templates" / "next-queued-email-assets-2026-03-03-batch92.md"
t = batch_file.read_text(encoding="utf-8")
sections = [s for s in t.split("\n---\n") if re.search(r"^##\s+\d+\)", s, re.M)]
ids = sorted(set(re.findall(r"`(sprint-\d{8}-\d{3})`", t)))
email_issues = []

for i, s in enumerate(sections, 1):
    m = re.search(r"`(sprint-\d{8}-\d{3})`", s)
    sid = m.group(1) if m else f"section_{i}"
    body = s.split("**Email body**", 1)[1] if "**Email body**" in s else ""
    if "{{live_url}}" not in body:
        email_issues.append({"id": sid, "issue": "missing_live_url"})
    if "{{screenshot_url}}" not in body:
        email_issues.append({"id": sid, "issue": "missing_screenshot_url"})
    if re.search(r"[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]", s):
        email_issues.append({"id": sid, "issue": "non_ascii_punctuation"})
    if re.search(r"guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b", re.sub(r"`[^`]+`", " ", s), re.I):
        email_issues.append({"id": sid, "issue": "non_compliant_claim"})

qj = (root / "email-templates" / "send-queue-2026-03-02-next-batches.jsonl").read_text(encoding="utf-8")
qc = (root / "email-templates" / "send-queue-2026-03-02-next-batches-tracker.csv").read_text(encoding="utf-8")

print(json.dumps({
    "wave": wave,
    "site_results": site_results,
    "batch": batch_file.name,
    "section_count": len(sections),
    "ids": ids,
    "email_issues": email_issues,
    "missing_jsonl": [i for i in ids if i not in qj],
    "missing_csv": [i for i in ids if i not in qc]
}, indent=2))
