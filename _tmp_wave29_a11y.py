import os,glob,re
from bs4 import BeautifulSoup
root=r'C:\Users\chead\.openclaw\workspace-john\sites\premium-v3-wave29'
files=glob.glob(os.path.join(root,'*','index.html'))
for f in files:
    html=open(f,encoding='utf-8').read()
    soup=BeautifulSoup(html,'html.parser')
    rel=os.path.relpath(f,r'C:\Users\chead\.openclaw\workspace-john')
    issues=[]
    # form controls labels
    labels_for={l.get('for') for l in soup.find_all('label') if l.get('for')}
    for inp in soup.find_all(['input','textarea','select']):
        if inp.get('type')=='hidden':
            continue
        iid=inp.get('id')
        has_label = bool(iid and iid in labels_for)
        has_aria = bool(inp.get('aria-label') or inp.get('aria-labelledby'))
        if not (has_label or has_aria):
            issues.append(f"missing_label:{str(inp)[:90]}")
    # anchor accessibility text
    for a in soup.find_all('a'):
        txt=' '.join(a.get_text(strip=True).split())
        aria=a.get('aria-label','').strip()
        if not txt and not aria:
            issues.append(f"empty_link_text:{str(a)[:90]}")
    # tel links exist
    tels=soup.select('a[href^="tel:"]')
    if not tels:
        issues.append('no_tel_link')
    else:
        for a in tels:
            h=a.get('href','')
            digits=re.sub(r'\D','',h)
            if len(digits)<10:
                issues.append(f'bad_tel:{h}')
    if issues:
        print(rel)
        for i in issues:
            print(' -',i)
