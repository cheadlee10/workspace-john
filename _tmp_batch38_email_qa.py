from pathlib import Path
import re

p = Path(r"C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-03-batch38.md")
s = p.read_text(encoding='utf-8')

sections = re.split(r"\n---\n", s)
email_sections = [sec for sec in sections if re.search(r"## \d+\)", sec)]

fail = False
for i, sec in enumerate(email_sections, start=1):
    title = re.search(r"## \d+\)\s*(.+)", sec)
    name = title.group(1).strip() if title else f"section {i}"
    has_live = "{{live_url}}" in sec
    has_shot = "{{screenshot_url}}" in sec
    if not (has_live and has_shot):
        fail = True
        print("MISSING_PLACEHOLDER", name, has_live, has_shot)

# detect non-ascii chars
non_ascii = sorted(set(ch for ch in s if ord(ch) > 127))
if non_ascii:
    fail = True
    print("NON_ASCII_FOUND", ''.join(non_ascii))

# quick compliance phrase scan (overclaims)
flag_phrases = [
    'guarantee', 'guaranteed', 'best in', 'number 1', '#1', 'ranked', 'award-winning', 'double your', 'increase by', '%', 'ROI'
]
for ph in flag_phrases:
    if re.search(re.escape(ph), s, re.I):
        print("REVIEW_PHRASE", ph)

if not fail:
    print("PASS: placeholders + ascii checks clean across", len(email_sections), "sections")
