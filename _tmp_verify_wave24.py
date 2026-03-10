import re,pathlib
root=pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john")
files=list((root/'sites/premium-v3-wave24').glob('*/index.html'))+[root/'email-templates/next-queued-email-assets-2026-03-02-batch27.md']
for f in files:
 txt=f.read_text(encoding='utf-8',errors='ignore')
 print('\n'+str(f.relative_to(root)))
 if f.suffix=='.html':
  tels=re.findall(r"href=['\"]tel:([^'\"]+)",txt,re.I)
  print(' tel links',len(tels))
  missing=[]
  for m in re.finditer(r'<input\b[^>]*>',txt,re.I):
   tag=m.group(0).lower()
   if 'type=' in tag and ("type='hidden'" in tag or 'type="hidden"' in tag):
    continue
   if 'aria-label=' not in tag:
    missing.append('input')
  for m in re.finditer(r'<textarea\b[^>]*>',txt,re.I):
   if 'aria-label=' not in m.group(0).lower():missing.append('textarea')
  print(' missing aria fields',len(missing))
  if '.example' in txt: print(' contains .example placeholder: YES')
  else: print(' contains .example placeholder: no')
 else:
  print(' has required placeholders',('{{live_url}}' in txt) and ('{{screenshot_url}}' in txt))
