import re
from pathlib import Path

base = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave35")
patterns = [r"\{\{", r"TODO", r"TBD", r"Lorem", r"example\.com", r"@example", r"555-", r"123-456"]

any_issues = False
for f in sorted(base.glob("*/index.html")):
    s = f.read_text(encoding="utf-8")
    issues = []

    for p in patterns:
        if re.search(p, s, re.I):
            issues.append("pattern:" + p)

    labels_for = set(re.findall(r"<label[^>]*for=['\"]([^'\"]+)['\"]", s, re.I))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>", s, re.I):
        tag, attrs = m.group(1).lower(), m.group(2)
        if re.search(r"type=['\"]hidden['\"]", attrs, re.I):
            continue
        idm = re.search(r"\bid=['\"]([^'\"]+)['\"]", attrs, re.I)
        has_aria = bool(re.search(r"\baria-label=['\"]([^'\"]+)['\"]", attrs, re.I))
        if has_aria:
            continue
        if idm and idm.group(1) in labels_for:
            continue
        issues.append(f"a11y-missing-label:{tag}:{idm.group(1) if idm else '(no-id)'}")

    for tel in re.findall(r"href=['\"]tel:([^'\"]+)['\"]", s, re.I):
        if not re.fullmatch(r"\+?\d{10,15}", tel):
            issues.append("bad-tel:" + tel)

    if issues:
        any_issues = True
        print(str(f))
        for i in issues:
            print(" -", i)

if not any_issues:
    print("PASS: no critical pattern/a11y/tel issues found")
