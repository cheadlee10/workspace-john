import json
from pathlib import Path
path=Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
today="2026-03-04"
entries=[
{"id":"sprint55-031","date":today,"source":"Fiverr","client":"joykimaiyo104","service":"Interactive Excel Dashboard","estimated_value":180,"status":"new","url":"https://www.fiverr.com/joykimaiyo104/create-an-interactive-and-automated-excel-dashboard","notes":"Dashboard-focused freelancer; outreach angle: partner on rapid prototype jobs while NorthStar owns client comms."},
{"id":"sprint55-032","date":today,"source":"Fiverr","client":"captain_jack0","service":"Financial Excel Template Automation","estimated_value":260,"status":"new","url":"https://www.fiverr.com/captain_jack0/design-automated-excel-template-for-financial-statements-reports-and-dashboard","notes":"Financial template specialist; angle: white-label finance dashboards for SMB owner reporting."},
{"id":"sprint55-033","date":today,"source":"Fiverr","client":"Aaqib Abbas","service":"Google Apps Script Automation","estimated_value":240,"status":"new","url":"https://www.fiverr.com/gigs/google-script","notes":"Listed in Google Script category with automation depth; angle: overflow implementation partner for sheet workflows."},
{"id":"sprint55-034","date":today,"source":"Fiverr","client":"Aamir Khan","service":"Google Sheets Automation","estimated_value":220,"status":"new","url":"https://www.fiverr.com/gigs/google-script","notes":"Sheet automation provider in high-volume category; angle: referral exchange for US SMB clients needing consultative scoping."},
{"id":"sprint55-035","date":today,"source":"Fiverr","client":"Zain Amjad","service":"Scripted Google Sheet Automation","estimated_value":200,"status":"new","url":"https://www.fiverr.com/gigs/sheet-automation","notes":"Strong social proof in sheet automation category; angle: subcontract tactical build tasks and keep strategy in-house."},
{"id":"sprint55-036","date":today,"source":"Fiverr","client":"Pallab","service":"Excel/Sheets KPI Dashboards","estimated_value":230,"status":"new","url":"https://www.fiverr.com/gigs/sheet-automation","notes":"KPI dashboard positioning fits NorthStar service stack; angle: partner for production execution on fixed-price bundles."},

{"id":"sprint55-037","date":today,"source":"Upwork","client":"Excel Automation Expert Needed for VBA or Power Automate","service":"Excel VBA/Power Automate","estimated_value":650,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Excel-Automation-Expert-Needed-for-VBA-Power-Automate_~022000648293993351761/","notes":"Buyer with direct tool requirement; angle: fast discovery + mapped automation roadmap with ROI estimate."},
{"id":"sprint55-038","date":today,"source":"Upwork","client":"Excel Automation Expert Needed for Data Entry Automation","service":"Data Entry Automation","estimated_value":500,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Excel-Automation-Expert-Needed-for-Data-Entry-Automation_~022014356450369286301/","notes":"Repetitive data-entry pain point; angle: replace manual entry with validated import flow and exception queue."},
{"id":"sprint55-039","date":today,"source":"Upwork","client":"Java script developer for automation tasks in Google Sheets","service":"Google Sheets Script Automation","estimated_value":550,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Java-script-developer-for-automation-tasks-Google-Sheets_~0113c67c19a4ee8f59/","notes":"Straightforward automation need; angle: modernize old scripts + documentation + maintainability handoff."},
{"id":"sprint55-040","date":today,"source":"Upwork","client":"Maintain backend of Google Sheets Order automation system","service":"Order Workflow Automation","estimated_value":850,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Maintain-backend-Google-Sheets-Order-automation-system_~011b3d1b1b27a250e7/","notes":"Interlinked sheets indicate mission-critical ops; angle: stabilize backend and add audit/error controls."},
{"id":"sprint55-041","date":today,"source":"Upwork","client":"GHL and Google Sheets Automation Specialist","service":"CRM + Sheets Integration","estimated_value":700,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/GHL-and-Google-Sheets-Automation-Specialist_~021974326354409940055/","notes":"CRM integration buyer likely recurring need; angle: offer phased implementation with SLA support."},
{"id":"sprint55-042","date":today,"source":"Upwork","client":"n8n Automation Expert Needed","service":"AI-assisted Workflow Automation","estimated_value":1000,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/n8n-Automation-Expert-Needed_~022024420454524705819/","notes":"Complex scoring/research workflow implies budget and strategic importance; angle: production-grade automation + QA guardrails."},

{"id":"sprint55-043","date":today,"source":"Reddit-r/forhire","client":"[Hiring] Excel Expert Needed: Build Custom Search Function for Easy Data Filtering","service":"Custom Excel UX Tooling","estimated_value":320,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1gofhqq/hiring_excel_expert_needed_build_custom_search/","notes":"Specific usability pain point; angle: deliver intuitive search/filter front-end plus maintainable backend formulas."},
{"id":"sprint55-044","date":today,"source":"Reddit-r/forhire","client":"[Hiring] Translate Excel-entered recorded time to web interface","service":"Excel-to-Web Workflow","estimated_value":600,"status":"new","url":"https://www.reddit.com/r/forhire/comments/se3pkr/hiring_translate_excelentered_recorded_time_to/","notes":"Explicit migration request from spreadsheet to web; angle: bridge phase with automated sync before full migration."},
{"id":"sprint55-045","date":today,"source":"Reddit-r/forhire","client":"[Hiring] BI/Data Analytics with Advanced Excel + Domo","service":"BI Reporting Automation","estimated_value":900,"status":"new","url":"https://www.reddit.com/r/forhire/comments/91rxys/hiring_bidata_analytics_with_advanced_excel_domo/","notes":"Analytics maturity signal; angle: start with Excel data model cleanup then automate Domo-ready extracts."},
{"id":"sprint55-046","date":today,"source":"Reddit-r/slavelabour","client":"[TASK] Script/Code export Amazon/Taobao Orders into Google Sheets/Excel","service":"Ecommerce Export Automation","estimated_value":350,"status":"new","url":"https://www.reddit.com/r/slavelabour/comments/11hz3og/task_scriptcode_a_program_to_export_my/","notes":"Cross-platform order export indicates repeatable pain; angle: robust scheduled sync with error reporting."},

{"id":"sprint55-047","date":today,"source":"LinkedIn","client":"Nasim Landscape","service":"Crew + Irrigation Operations Reporting","estimated_value":1200,"status":"new","url":"https://www.linkedin.com/company/nasimlandscape","notes":"Regional landscaping operator with multiple service lines; angle: automate crew utilization and recurring maintenance reporting."},
{"id":"sprint55-048","date":today,"source":"Yelp-Unclaimed","client":"CPA Medical Billing","service":"Billing/Accounting Process Automation","estimated_value":950,"status":"new","url":"https://www.yelp.com/biz/cpa-medical-billing-east-haven-2","notes":"Medical billing plus accounting profile suggests spreadsheet-heavy back office; angle: automate claim lifecycle and reconciliation tracker."}
]

existing=set()
for line in path.read_text(encoding='utf-8',errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        o=json.loads(line)
        existing.add((o.get('source','').lower(),o.get('client','').lower()))
        existing.add(('id',o.get('id','').lower()))
    except: pass

new=[]
for e in entries:
    if (e['source'].lower(),e['client'].lower()) in existing or ('id',e['id'].lower()) in existing:
        continue
    new.append(json.dumps(e,ensure_ascii=False))

if new:
    with path.open('a',encoding='utf-8') as f:
        f.write('\n'+'\n'.join(new)+'\n')
print('appended',len(new))
