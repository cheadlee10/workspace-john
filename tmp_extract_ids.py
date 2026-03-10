import json
prefixes=('sprint26-','sprint11-','wave5-')
with open('leads.jsonl','r',encoding='utf-8',errors='ignore') as f:
    for ln in f:
        ln=ln.strip()
        if not ln: continue
        try:d=json.loads(ln)
        except: continue
        i=d.get('id','')
        if i.startswith(prefixes):
            print(json.dumps({k:d.get(k) for k in ['id','date','source','client','service','estimated_value','status','phone','phone_normalized','location','city','state','notes','channel_flags']},ensure_ascii=False))
