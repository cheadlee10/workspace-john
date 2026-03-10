import pathlib,re
root=pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave24")
for p in root.glob('*/index.html'):
 t=p.read_text(encoding='utf-8',errors='ignore')
 tel=len(re.findall(r"href=['\"]tel:",t,re.I))
 mail=re.findall(r"href=['\"]mailto:([^'\"]+)",t,re.I)
 print(p.parent.name, 'tel',tel,'mailto',mail)
 if '.example' in t or '{{' in t or 'TODO' in t or 'TBD' in t:
  print('  potential placeholder token present')
