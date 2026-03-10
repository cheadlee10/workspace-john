from pathlib import Path
import re
base=Path(r"C:/Users/chead/.openclaw/workspace-john")
wave=base/'sites/premium-v3-wave32'
files=sorted(wave.glob('*/index.html'))
print('FILES',len(files))
for f in files:
    s=f.read_text(encoding='utf-8',errors='ignore')
    placeholders=re.findall(r'\{\{[^}]+\}\}|\bTODO\b|\bTBD\b|lorem ipsum|\bINSERT\b',s,re.I)
    tels=re.findall(r'href=["\']tel:([^"\']+)',s,re.I)
    missing=[]
    for m in re.finditer(r'<(input|textarea|select)\b[^>]*>',s,re.I):
        tag=m.group(0)
        if re.search(r'type=["\']hidden["\']',tag,re.I):
            continue
        has_aria=bool(re.search(r'\baria-label=["\'][^"\']+["\']',tag,re.I))
        idm=re.search(r'\bid=["\']([^"\']+)["\']',tag,re.I)
        has_label=False
        if idm:
            idv=re.escape(idm.group(1))
            has_label=bool(re.search(rf'<label[^>]*for=["\']{idv}["\']',s,re.I))
        if not (has_aria or has_label):
            missing.append(tag)
    claims=re.findall(r'\b(#1|best in|guaranteed|100%|five-star|top-rated|no\.1)\b',s,re.I)
    print(f"\n{f.relative_to(base)}")
    print('placeholders',len(placeholders),'tel_links',len(tels),'a11y_missing',len(missing),'claim_hits',len(claims))

email=(base/'email-templates/next-queued-email-assets-2026-03-03-batch35.md').read_text(encoding='utf-8',errors='ignore')
print('\nEMAIL batch35')
print('todo_tbd_lorem_insert',len(re.findall(r'\bTODO\b|\bTBD\b|lorem ipsum|\bINSERT\b',email,re.I)))
print('live_url',len(re.findall(r'\{\{live_url\}\}',email)))
print('screenshot_url',len(re.findall(r'\{\{screenshot_url\}\}',email)))
non_ascii=[ch for ch in email if ord(ch)>127]
print('non_ascii_chars',len(non_ascii))
