import json
from pathlib import Path
p=Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
today="2026-03-04"
entries=[
{"id":"sprint55-049","date":today,"source":"Local-SMB-Yelp","client":"Personal Tax & Bookkeeping Services","service":"Tax + Bookkeeping Automation","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/personal-tax-and-bookkeeping-services-dallas-2","notes":"Local tax/bookkeeping shop likely using manual trackers; outreach angle: automate intake, prep queue, and filing status board."},
{"id":"sprint55-050","date":today,"source":"Local-SMB-Yelp","client":"Burkhart Bookkeeping Services","service":"Bookkeeping Workflow Standardization","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/burkhart-bookkeeping-services-clarksville","notes":"Established bookkeeping firm; angle: monthly close automation and client exception reporting for higher throughput."},
{"id":"sprint55-051","date":today,"source":"Local-SMB-Yelp","client":"The Bookkeeping Bookkeeper","service":"Backoffice Spreadsheet Automation","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/the-bookkeeping-bookkeeper-fort-mill","notes":"Small business bookkeeping niche with repeatable tasks; angle: template kit + automation macros for faster delivery."},
{"id":"sprint55-052","date":today,"source":"Local-SMB-Yelp","client":"Calvert Tax & Bookkeeping","service":"Client Pipeline + Deadline Automation","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/calvert-tax-and-bookkeeping-kewanee-2","notes":"Unclaimed profile suggests digital optimization opportunity; angle: automate tax-season prioritization and reminders."},
{"id":"sprint55-053","date":today,"source":"Local-SMB-Yelp","client":"Claim-It Medical Billing","service":"Claims Operations Dashboard","estimated_value":950,"status":"new","url":"https://www.yelp.com/biz/claim-it-medical-billing-houston","notes":"Medical billing workload often spreadsheet-heavy; angle: denial/aging dashboard and collector productivity tracking."},
{"id":"sprint55-054","date":today,"source":"Local-SMB-Yelp","client":"MedX Medical Billing Services","service":"Revenue Cycle Spreadsheet Automation","estimated_value":1000,"status":"new","url":"https://www.yelp.com/biz/medx-medical-billing-services-inc-long-beach","notes":"Long-running billing business with clear repetitive workflows; angle: automate handoffs, QA checks, and KPI reporting."}
]
existing=set()
for line in p.read_text(encoding='utf-8',errors='ignore').splitlines():
    try:
        o=json.loads(line)
        existing.add(('id',o.get('id','').lower()))
    except: pass
new=[json.dumps(e,ensure_ascii=False) for e in entries if ('id',e['id'].lower()) not in existing]
with p.open('a',encoding='utf-8') as f:
    f.write('\n'+'\n'.join(new)+'\n')
print('appended',len(new))
