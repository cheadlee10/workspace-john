from pathlib import Path
import re
p=Path(r"C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-02-batch21.md")
s=p.read_text(encoding='utf-8')
issues=[]
for token in re.findall(r"\{\{[^}]+\}\}",s):
    if token not in ("{{live_url}}","{{screenshot_url}}"):
        issues.append(f"unexpected-token:{token}")
for bad in ["TODO","TBD","pending verification","lorem ipsum","[Business Name]","[Company]"]:
    if bad.lower() in s.lower():
        issues.append(f"bad-marker:{bad}")
print('PASS' if not issues else 'FAIL')
for i in issues:
    print(i)
