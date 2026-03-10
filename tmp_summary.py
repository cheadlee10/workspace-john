import json,collections,os
for fn in ["jobs.jsonl","leads.jsonl"]:
    total=0
    status=collections.Counter()
    val=0
    usable=0
    with_phone=0
    with_email=0
    by_source=collections.Counter()
    by_service=collections.Counter()
    top=[]
    if os.path.exists(fn):
        with open(fn,encoding='utf-8') as f:
            for line in f:
                line=line.strip()
                if not line:
                    continue
                try:
                    d=json.loads(line)
                except Exception:
                    continue
                total+=1
                s=d.get('status','')
                status[s]+=1
                v=d.get('estimated_value') or d.get('amount') or 0
                if isinstance(v,(int,float)):
                    val+=v
                if d.get('outreach_usable')==True:
                    usable+=1
                if d.get('phone') or d.get('phone_normalized'):
                    with_phone+=1
                if d.get('email'):
                    with_email+=1
                by_source[d.get('source','')]+=1
                by_service[d.get('service','')]+=1
                top.append((v,d.get('id'),d.get('client'),s,d.get('outreach_usable')))
    print(f"\n## {fn}")
    print('total',total)
    print('status',dict(status))
    print('value_sum',val)
    print('outreach_usable',usable)
    print('with_phone',with_phone,'with_email',with_email)
    print('top_sources',by_source.most_common(8))
    print('top_services',by_service.most_common(10))
    top=sorted(top,reverse=True)[:15]
    print('top_value_rows:')
    for r in top:
        print(r)
