import json
p='leads.jsonl'
existing_urls=set(); existing_clients=set(); maxn=0
for line in open(p,encoding='utf-8',errors='ignore'):
    s=line.strip()
    if not s: 
        continue
    try:
        j=json.loads(s)
    except:
        continue
    existing_urls.add(j.get('url',''))
    existing_clients.add(j.get('client','').strip().lower())
    i=j.get('id','')
    if i.startswith('sprint6-'):
        try:maxn=max(maxn,int(i.split('-')[1]))
        except:pass

new=[
{"source":"Upwork","client":"API integration, Web Scraping, Excel Automation (Job Poster)","contact_name":"","location":"Upwork","service":"API + scraping to Excel automation","estimated_value":950,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/API-integration-Web-Scraping-Excel-Automation_~01934ab526100b419f/","notes":"Outreach angle: convert fixed-scope request into repeatable data pipeline maintenance retainer."},
{"source":"Upwork","client":"Financial Coach for Digital Marketing Agency Owner (Job Poster)","contact_name":"","location":"Upwork","service":"Financial KPI tracking dashboard automation","estimated_value":700,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Financial-Coach-for-Digital-Marketing-Agency-Owner_~021956266169029012422/","notes":"Outreach angle: pair coaching with automated KPI workbook to reduce monthly reporting friction."},
{"source":"LinkedIn","client":"Brandy Luna","contact_name":"Brandy Luna","location":"LinkedIn","service":"Bookkeeping operations automation","estimated_value":780,"status":"new","url":"https://www.linkedin.com/in/brandy-luna-61404827/","notes":"Outreach angle: offer templated month-end close and client reporting workflows for small bookkeeping firm scale."},
{"source":"LinkedIn","client":"Katie Stutz","contact_name":"Katie Stutz","location":"LinkedIn","service":"QuickBooks reporting + Excel automation","estimated_value":860,"status":"new","url":"https://www.linkedin.com/in/katiestutz/","notes":"Outreach angle: help package financial analysis service with automated workbook deliverables."},
{"source":"LinkedIn","client":"Bichai Williams","contact_name":"Bichai Williams","location":"LinkedIn","service":"Tax/bookkeeping workflow optimization","estimated_value":820,"status":"new","url":"https://www.linkedin.com/in/bichaiwilliams/","notes":"Outreach angle: position as implementation partner to standardize and automate bookkeeping systems for SMB clients."}
]
rows=[]
for c in new:
    if c['url'] in existing_urls or c['client'].lower() in existing_clients:
        continue
    maxn+=1
    row={"id":f"sprint6-{maxn:03d}","date":"2026-03-04","source":c['source'],"client":c['client'],"contact_name":c['contact_name'],"phone":"","email":"","location":c['location'],"service":c['service'],"estimated_value":c['estimated_value'],"status":"new","url":c['url'],"notes":c['notes']}
    rows.append(row)

with open(p,'a',encoding='utf-8') as f:
    for r in rows:
        f.write(json.dumps(r,ensure_ascii=False)+'\n')
print('appended',len(rows))
print('ids',[r['id'] for r in rows])
