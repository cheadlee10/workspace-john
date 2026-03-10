import json
from pathlib import Path
extras = [
{"id":"sprint6-031","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Serenity Bookkeeping & Payroll Services","service":"Payroll reconciliation automation","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/serenity-bookkeeping-and-payroll-services-phoenix","notes":"Payroll + bookkeeping workflows are repetitive and spreadsheet-heavy. Outreach angle: automate payroll rec + exception flags."},
{"id":"sprint6-032","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Pro Bookkeeping & Tax Service","service":"Tax workflow spreadsheet systems","estimated_value":650,"status":"new","url":"https://www.yelp.com/biz/pro-bookkeeping-and-tax-service-phoenix","notes":"Tax + bookkeeping hybrid firm likely has seasonal data bottlenecks. Outreach angle: client intake sheet and prep status tracker."},
{"id":"sprint6-033","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Phoenix Accounting Service","service":"Full-charge bookkeeping automation","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/phoenix-accounting-service-phoenix","notes":"Offers full-charge bookkeeping and payroll. Outreach angle: automate AP/AR and periodic management reporting outputs."},
{"id":"sprint6-034","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Pacific Tax West Seattle","service":"Tax planning data workflow automation","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/pacific-tax-west-seattle-seattle","notes":"Tax strategy and filing support implies recurring client spreadsheet operations. Outreach angle: automate planning and filing checklists."},
{"id":"sprint6-035","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Seattle Tax Group","service":"Tax prep and catch-up workflow automation","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/seattle-tax-group-seattle-2","notes":"Serves businesses and catch-up filings; likely manual process burden. Outreach angle: status dashboard + document intake automation."},
{"id":"sprint6-036","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Tax Relief Advocates","service":"Case tracking spreadsheet automation","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/tax-relief-advocates-seattle","notes":"Tax relief workflows involve case tracking and deadlines. Outreach angle: automated tracker with due-date alerts and progress views."}
]

p=Path('C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
existing=set()
for l in p.read_text(encoding='latin-1').splitlines():
    try:
        o=json.loads(l)
        u=o.get('url')
        if u: existing.add(u)
    except: pass
new=[e for e in extras if e['url'] not in existing]
with p.open('a',encoding='latin-1') as f:
    for e in new:
        f.write(json.dumps(e,ensure_ascii=False)+'\n')
print('appended',len(new))
