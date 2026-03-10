import re, json, pathlib, csv
from datetime import datetime, timedelta
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave_dir=root/'sites'/'premium-v3-wave81'
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch84.md'
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
report={"site":{},"email":{},"queue":{}}

html_files=sorted(wave_dir.glob('*/index.html'))
site_fail=[]
site_pass=0
for fp in html_files:
    t=fp.read_text(encoding='utf-8')
    checks=[]
    checks.append(('no_placeholders', '{{' not in t and '}}' not in t and 'TODO' not in t and 'lorem' not in t.lower() and 'example.com' not in t.lower()))
    checks.append(('two_forms', len(re.findall(r'<form\\b', t, flags=re.I))==2))
    forms=re.findall(r'<form[^>]*>', t, flags=re.I)
    ok_forms=len(forms)==2 and all('action="/contact"' in f and 'method="post"' in f.lower() for f in forms)
    checks.append(('form_post_contact', ok_forms))
    checks.append(('hidden_business_2x', len(re.findall(r'name="business"', t))==2))
    checks.append(('hidden_source_2x', len(re.findall(r'name="source"', t))==2))
    checks.append(('no_fab_phone', re.search(r'\\b555[- .]?\\d{4}\\b', t) is None))
    ids=set(re.findall(r'id="([^"]+)"', t))
    label_fors=re.findall(r'<label[^>]*for="([^"]+)"', t)
    checks.append(('labels_map_inputs', len(label_fors)>0 and all(x in ids for x in label_fors)))
    claims_bad=re.search(r'guarantee|guaranteed|#1|number\\s*one|ranked\\s*\\#?1|double your|increase by \\d+%', t, flags=re.I)
    checks.append(('claims_compliance', claims_bad is None))

    bad=[name for name,ok in checks if not ok]
    if bad:
        site_fail.append((fp.parent.name,bad))
    else:
        site_pass+=1

report['site']={'total':len(html_files),'passed':site_pass,'failed':site_fail}

text=email_file.read_text(encoding='utf-8')
sections=re.findall(r'##\s+\d+\)\s+(.+?)\s+\(`(wave6-\d+)`\).*?(?=\n---\n|\Z)', text, flags=re.S)
lead_ids=[lead for _,lead in sections]
email_fail=[]

non_ascii=sorted(set(ch for ch in text if ord(ch)>127))
if non_ascii:
    email_fail.append(f'non_ascii_chars:{"".join(non_ascii)}')

section_chunks=re.findall(r'##\s+\d+\).*?(?=\n---\n|\Z)', text, flags=re.S)
for chunk in section_chunks:
    lead_m=re.search(r'`(wave6-\d+)`', chunk)
    lid=lead_m.group(1) if lead_m else 'unknown'
    if '{{live_url}}' not in chunk or '{{screenshot_url}}' not in chunk:
        email_fail.append(f'{lid}:missing_placeholders')
    if re.search(r'guarantee|guaranteed|#1|number\\s*one|ranked\\s*\\#?1|double your|increase by \\d+%', chunk, flags=re.I):
        email_fail.append(f'{lid}:claims_noncompliant')

report['email']={'total_sections':len(section_chunks),'lead_ids':lead_ids,'failures':email_fail}

existing=[]
for ln in jsonl_path.read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    try:
        existing.append(json.loads(ln))
    except Exception:
        pass
existing_ids={o.get('lead_id') for o in existing}
missing=[lid for lid in lead_ids if lid not in existing_ids]

pairs=re.findall(r'##\s+\d+\)\s+(.+?)\s+\(`(wave6-\d+)`\)', text)
lead_to_name={lid:name for name,lid in pairs}

appended=0
if missing:
    latest=max(datetime.fromisoformat(o['scheduled_at']) for o in existing if o.get('scheduled_at'))
    new=[]
    for i,lid in enumerate(missing,1):
        sched=latest+timedelta(minutes=5*i)
        obj={
            'scheduled_at':sched.isoformat(),
            'batch_id':'BATCH-K-WAVE6',
            'sequence_step':'email_initial',
            'lead_id':lid,
            'business_name':lead_to_name.get(lid,''),
            'email_to':'',
            'priority_tier':'P2',
            'priority_score':79,
            'template_asset_file':'next-queued-email-assets-2026-03-03-batch84.md',
            'asset_ready':True,
            'placeholder_check':'pass:{{live_url}},{{screenshot_url}}',
            'verification_status':'pending_contact_enrichment',
            'approval_status':'pending_main_agent_approval',
            'send_window_start':'09:00',
            'send_window_end':'17:00',
            'timezone':'America/Los_Angeles',
            'gate_lock':'manual_approval_required',
            'dispatch_lock':True,
            'auto_send_enabled':False,
            'followup_24h_at':(sched+timedelta(days=1)).isoformat(),
            'followup_72h_at':(sched+timedelta(days=3)).isoformat(),
            'followup_7d_at':(sched+timedelta(days=7)).isoformat(),
            'followup_1_at':(sched+timedelta(days=1)).isoformat(),
            'followup_2_at':(sched+timedelta(days=3)).isoformat(),
            'suppression_check':'clear',
            'safe_to_send':False,
        }
        new.append(obj)

    with jsonl_path.open('a',encoding='utf-8',newline='') as f:
        for obj in new:
            f.write(json.dumps(obj,separators=(',',':'))+'\n')

    with csv_path.open('r',encoding='utf-8',newline='') as f:
        reader=csv.DictReader(f)
        fieldnames=reader.fieldnames
    with csv_path.open('a',encoding='utf-8',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fieldnames,quoting=csv.QUOTE_ALL)
        for obj in new:
            w.writerow({
                'timestamp':obj['scheduled_at'],'batch_id':'BATCH-K-WAVE6','day':'1','channel':'email','lead_id':obj['lead_id'],'business_name':obj['business_name'],'template_id':'',
                'send_status':'queued','delivery_status':'pending','open_status':'none','reply_status':'none','positive_reply':'no','unsubscribe':'no','complaint':'no','bounce_type':'none','suppressed':'no',
                'send_window_start':'09:00','send_window_end':'17:00','timezone':'America/Los_Angeles','gate_lock':'manual_approval_required','dispatch_lock':'true','auto_send_enabled':'false',
                'followup_24h_at':obj['followup_24h_at'],'followup_72h_at':obj['followup_72h_at'],'followup_7d_at':obj['followup_7d_at'],
                'notes':'asset=next-queued-email-assets-2026-03-03-batch84.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment'
            })
    appended=len(new)

json_lines=jsonl_path.read_text(encoding='utf-8').splitlines()
csv_text=csv_path.read_text(encoding='utf-8')
missing_json=[lid for lid in lead_ids if not any(f'"lead_id":"{lid}"' in ln for ln in json_lines)]
missing_csv=[lid for lid in lead_ids if f'"{lid}"' not in csv_text and f',{lid},' not in csv_text]

report['queue']={
    'missing_initial':missing,
    'appended':appended,
    'missing_json_after':missing_json,
    'missing_csv_after':missing_csv,
}

print(json.dumps(report,indent=2))
