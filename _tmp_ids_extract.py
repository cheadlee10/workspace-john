import json
ids={f'gpass-us-{i}' for i in range(426,436)}
rows=[]
with open('outreach_queue.jsonl',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        j=json.loads(line)
        if j.get('id') in ids:
            rows.append(j)
rows.sort(key=lambda x:int(x['id'].split('-')[-1]))
for j in rows:
    print(f"{j['id']} | {j.get('client')} | {j.get('service')} | {j.get('priority_tier')} | {j.get('notes','')[:120]}")
print('count',len(rows))
