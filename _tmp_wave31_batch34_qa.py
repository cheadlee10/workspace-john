import re,glob,os
from bs4 import BeautifulSoup
base=r'C:\Users\chead\.openclaw\workspace-john'
site_files=glob.glob(base+r'\sites\premium-v3-wave31\*\index.html')
print('files',len(site_files))
for fp in site_files:
    html=open(fp,encoding='utf-8').read()
    soup=BeautifulSoup(html,'html.parser')
    issues=[]
    pats=[r'\{\{[^}]+\}\}',r'\bTODO\b',r'\bTBD\b',r'lorem ipsum',r'coming soon']
    for p in pats:
        if re.search(p,html,re.I): issues.append('contains '+p)
    for inp in soup.find_all(['input','textarea','select']):
        t=inp.get('type','text').lower()
        if t in ('hidden','submit','button','image','reset'): continue
        iid=inp.get('id')
        aria=inp.get('aria-label')
        labelled=inp.get('aria-labelledby')
        title=inp.get('title')
        has_label=False
        if iid and soup.find('label',attrs={'for':iid}): has_label=True
        if inp.find_parent('label') is not None: has_label=True
        if not (has_label or aria or labelled or title):
            issues.append(f"missing label: <{inp.name} name={inp.get('name')!r} id={iid!r}>")
    for img in soup.find_all('img'):
        if img.get('alt') is None:
            issues.append('img missing alt')
            break
    tels=[a.get('href','') for a in soup.find_all('a',href=True) if a['href'].startswith('tel:')]
    if not tels:
        issues.append('no tel: link present')
    for t in tels:
        num=t[4:]
        if not re.fullmatch(r'\+?[0-9\-\(\)\s\.]+',num):
            issues.append('invalid tel href '+t)
    if re.search(r'\b#1\b|best in (the )?world|guaranteed results|100% guaranteed',html,re.I):
        issues.append('possibly non-compliant claim language')
    print('\n'+os.path.relpath(fp,base))
    if issues:
        for i in issues: print(' -',i)
    else:
        print(' - PASS')

email_fp=base+r'\email-templates\next-queued-email-assets-2026-03-03-batch34.md'
t=open(email_fp,encoding='utf-8').read()
print('\nEMAIL FILE:',os.path.relpath(email_fp,base))
sections=re.split(r'\n---\n',t)
body_blocks=[s for s in sections if '**Email body**' in s]
missing=[]
for idx,s in enumerate(body_blocks,1):
    if '{{live_url}}' not in s or '{{screenshot_url}}' not in s:
        missing.append(idx)
print(' email bodies',len(body_blocks),'missing placeholders in',missing)
if re.search(r'\bTODO\b|\bTBD\b|lorem ipsum',t,re.I):
    print(' TODO/TBD/lorem found')
bad=[ch for ch in t if ord(ch)>127]
print(' non-ascii chars',len(bad))
