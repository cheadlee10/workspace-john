import csv, datetime
from pathlib import Path
wd=Path(r'C:\Users\chead\.openclaw\workspace-john')
infile=wd/'send_ops_queue_2026-03-05_ready.csv'
outfile=wd/'send_ops_queue_2026-03-05_watchdog_ready.csv'
rows=list(csv.DictReader(infile.open(newline='',encoding='utf-8')))
start_times={
 'P1':datetime.datetime(2026,3,5,9,35),
 'P2':datetime.datetime(2026,3,5,10,35),
 'P3':datetime.datetime(2026,3,5,13,30),
 'P4':datetime.datetime(2026,3,5,16,0),
}
slot_mins={'P1':6,'P2':6,'P3':8,'P4':10}
counts={k:0 for k in start_times}
for r in rows:
    p=r['priority_batch']
    i=counts[p]
    s=start_times[p]+datetime.timedelta(minutes=slot_mins[p]*i)
    e=s+datetime.timedelta(minutes=slot_mins[p])
    r['send_window_pt']=f"{s.strftime('%H:%M')}-{e.strftime('%H:%M')}"
    if r.get('next_action')=='send_sms':
        r['next_action_at_pt']=(e+datetime.timedelta(minutes=3)).strftime('%H:%M')
    elif r.get('next_action')=='retry_call':
        r['next_action_at_pt']='16:10' if p in ('P1','P2') else '16:40'
    elif r.get('next_action')=='send_dm':
        r['next_action_at_pt']=(e+datetime.timedelta(minutes=5)).strftime('%H:%M')
    r['touch_count_today']=r.get('touch_count_today') or '1'
    counts[p]+=1

fields=rows[0].keys()
with outfile.open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=fields)
    w.writeheader();w.writerows(rows)

total=len(rows)
by_p={}
val=0
mix={}
for r in rows:
    by_p[r['priority_batch']]=by_p.get(r['priority_batch'],0)+1
    mix[r['channel_primary']]=mix.get(r['channel_primary'],0)+1
    try: val+=int(float(r['estimated_value']))
    except: pass

md=wd/'send_ops_queue_2026-03-05_watchdog_ready.md'
with md.open('w',encoding='utf-8') as f:
    f.write('# Send Ops Queue — Watchdog Ready (Thu 2026-03-05, PT)\n\n')
    f.write('## Ready-to-Execute Artifacts\n')
    f.write('- Queue CSV: `send_ops_queue_2026-03-05_watchdog_ready.csv`\n')
    f.write('- Source: `send_ops_queue_2026-03-05_ready.csv` (re-windowed for live execution)\n')
    f.write(f'- Total queued today: **{total}**\n\n')
    f.write('## Prioritized Message Batches\n')
    f.write(f"- **P1:** {by_p.get('P1',0)} leads — high-ticket automation/contractor\n")
    f.write(f"- **P2:** {by_p.get('P2',0)} leads — strong-fit local services\n")
    f.write(f"- **P3:** {by_p.get('P3',0)} leads — mid-tier follow-up candidates\n")
    f.write(f"- **P4:** {by_p.get('P4',0)} leads — fallback + DM cleanup\n\n")
    f.write('## Channel Mix\n')
    for c in ('call','sms','dm'):
        n=mix.get(c,0)
        pct=(n/total*100) if total else 0
        f.write(f"- **{c.upper()}-first:** {n}/{total} ({pct:.1f}%)\n")
    f.write('\n## Send Windows (PT)\n')
    f.write('- **P1 block:** 09:35–10:35\n')
    f.write('- **P2 block:** 10:35–11:35\n')
    f.write('- **P3 block:** 13:30–14:34\n')
    f.write('- **P4 block:** 16:00–16:40\n')
    f.write('- **Retry/callback block:** 16:40–17:20\n\n')
    f.write('## Tracking Fields for Response Logging\n')
    f.write('Core fields in queue rows:\n')
    f.write('`status, last_outcome, next_action, next_action_at_pt, response_summary, owner, response_received_at_pt, response_channel, reply_sentiment, meeting_booked_at_pt, do_not_contact, touch_count_today, last_updated_pt`\n\n')
    f.write('Recommended response statuses:\n')
    f.write('`queued, sent_call, sent_sms, sent_dm, replied, qualified, meeting_booked, not_interested, bad_number, do_not_contact`\n\n')
    f.write(f'## Estimated Pipeline Value\n- **${val:,}**\n')
print('done')
