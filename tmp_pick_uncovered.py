import json,glob,os,re

def slug(s):
    s=s.lower().replace('&',' and ')
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    return s

existing=set()
for w in glob.glob('sites/premium-v3-wave*'):
    if os.path.isdir(w):
        for n in os.listdir(w):
            if os.path.isdir(os.path.join(w,n)):
                existing.add(n)

rows=[]
for fn in ['nosite_top20_leads.jsonl','leads_nosite_hunt.jsonl']:
    with open(fn,encoding='utf-8') as f:
        for line in f:
            if line.strip():
                d=json.loads(line)
                d['slug']=slug(f"{d.get('business_name','')}-{d.get('city','')}")
                d['exists']=d['slug'] in existing
                rows.append(d)

uniq={r['id']:r for r in rows}.values()
unc=[r for r in uniq if not r['exists']]
unc=sorted(unc,key=lambda r:(r.get('priority',99), -(int(r.get('years_established') or 0))))
print('uncovered',len(unc))
for r in unc[:30]:
    print(r['id'], '|', r['business_name'], '|', r['city'], '| p'+str(r.get('priority')), '| y'+str(r.get('years_established')), '|', r['slug'])
