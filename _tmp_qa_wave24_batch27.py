import re, pathlib
root=pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john")
files=list((root/'sites/premium-v3-wave24').glob('*/index.html'))+[root/'email-templates/next-queued-email-assets-2026-03-02-batch27.md']
patterns=[r'\bTODO\b',r'lorem ipsum',r'example\.com',r'\bTBD\b',r'\bXXX\b',r'\(555\)',r'123-456',r'\[[^\]]{2,}\]',r'placeholder']
for f in files:
    txt=f.read_text(encoding='utf-8',errors='ignore')
    print(f"\nFILE {f.relative_to(root)}")
    for p in patterns:
      for m in re.finditer(p,txt,flags=re.I|re.M):
        ln=txt.count('\n',0,m.start())+1
        snip=txt[m.start():m.start()+120].split('\n')[0]
        print(f" {ln}: {p} :: {snip}")
    if f.suffix=='.html':
      tels=re.findall(r'href="tel:([^"]+)"',txt,re.I)
      print(' tel links:',len(tels),tels[:3])
      for m in re.finditer(r'<input\b[^>]*>',txt,re.I):
        tag=m.group(0)
        low=tag.lower()
        if 'aria-label=' not in low and 'type="hidden"' not in low:
          ln=txt.count('\n',0,m.start())+1
          print(' input missing aria-label line',ln)
      for m in re.finditer(r'<textarea\b[^>]*>',txt,re.I):
        tag=m.group(0)
        if 'aria-label=' not in tag.lower():
          ln=txt.count('\n',0,m.start())+1
          print(' textarea missing aria-label line',ln)
