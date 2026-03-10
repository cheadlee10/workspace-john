import os,glob,json
target_ids=['gpass-us-462','gpass-us-478','gpass-us-306','gpass-us-268','gpass-us-470']
files=['leads_nosite_hunt.jsonl','nosite_top20_leads.jsonl','leads_nowebsite.jsonl','leads_unverifiable.jsonl','leads.jsonl','outreach_queue.jsonl']
for f in files:
    if not os.path.exists(f):
        continue
    found=[]
    with open(f,'r',encoding='utf-8') as fh:
        for ln in fh:
            ln=ln.strip()
            if not ln: continue
            try:j=json.loads(ln)
            except: continue
            if j.get('id') in target_ids:
                found.append(j)
    if found:
        print('\nFILE',f,'found',len(found))
        for j in found:
            print(j.get('id'), j.get('client') or j.get('business_name') or j.get('name'), j.get('location'), j.get('service'), j.get('estimated_value'))
