import csv, json
from pathlib import Path

root = Path('.')
jsonl = root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvp = root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

ids = [f'nosite-{i}' for i in range(101,111)]
base_hour=10;base_min=20
sched={}
for i,idv in enumerate(ids):
    m = base_min + 5*i
    h = base_hour + m//60
    mm = m%60
    t=f'{h:02d}:{mm:02d}:00'
    sched[idv]={
        'scheduled_at':f'2026-03-04T{t}-08:00',
        'f24':f'2026-03-05T{t}-08:00',
        'f72':f'2026-03-07T{t}-08:00',
        'f7d':f'2026-03-11T{t}-08:00',
    }

rows=[]
for line in jsonl.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    obj=json.loads(line)
    lid=obj.get('lead_id')
    if lid in sched:
        s=sched[lid]
        obj['scheduled_at']=s['scheduled_at']
        obj['followup_24h_at']=s['f24']
        obj['followup_72h_at']=s['f72']
        obj['followup_7d_at']=s['f7d']
        obj['followup_1_at']=s['f24']
        obj['followup_2_at']=s['f72']
    rows.append(obj)
jsonl.write_text('\n'.join(json.dumps(r,separators=(',',':')) for r in rows)+'\n',encoding='utf-8')

with csvp.open('r',encoding='utf-8',newline='') as f:
    reader=csv.reader(f)
    data=list(reader)
header=data[0]
body=data[1:]
for r in body:
    if len(r)<26: 
        continue
    lid=r[4]
    if lid in sched:
        s=sched[lid]
        r[0]=s['scheduled_at']
        r[22]=s['f24']
        r[23]=s['f72']
        r[24]=s['f7d']
with csvp.open('w',encoding='utf-8',newline='') as f:
    writer=csv.writer(f,quoting=csv.QUOTE_ALL)
    writer.writerow(header)
    writer.writerows(body)

print('ok')
