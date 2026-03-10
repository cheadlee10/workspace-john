import json
from datetime import date
from pathlib import Path

path = Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
today = "2026-03-04"

entries = [
    {"id":"sprint55-001","date":today,"source":"Fiverr","client":"yasirhamedca","service":"Excel VBA Automation","estimated_value":250,"status":"new","url":"https://www.fiverr.com/yasirhamedca/do-excel-macro-excel-automation-vba-data-cleaning-dashboard-formulas-table","notes":"Fiverr seller focused on macro/VBA/data cleaning; outreach angle: white-label overflow partnership + US timezone client-facing delivery."},
    {"id":"sprint55-002","date":today,"source":"Fiverr","client":"daniel63036","service":"Automated Excel Dashboards","estimated_value":180,"status":"new","url":"https://www.fiverr.com/daniel63036/create-a-professional-automated-and-custom-excel-spreadsheet","notes":"Offers fast dashboard automation; angle: subcontract recurring dashboard refresh work from NorthStar overflow clients."},
    {"id":"sprint55-003","date":today,"source":"Fiverr","client":"chaudharyns","service":"Dynamic Excel Dashboard","estimated_value":150,"status":"new","url":"https://www.fiverr.com/chaudharyns/create-a-dynamic-and-automated-excel-dashboard","notes":"Low-ticket dashboard provider; angle: bundle into fixed-price SMB reporting package and upsell monthly maintenance."},
    {"id":"sprint55-004","date":today,"source":"Fiverr","client":"mushfique32","service":"Interactive Excel Reporting","estimated_value":220,"status":"new","url":"https://www.fiverr.com/mushfique32/make-a-perfect-excel-dashboard-pivot-table-and-charts","notes":"Interactive dashboard specialist; angle: partner for one-off build while NorthStar handles discovery/retainers."},
    {"id":"sprint55-005","date":today,"source":"Fiverr","client":"yasirarfat2","service":"Excel Macro + Visualization","estimated_value":240,"status":"new","url":"https://www.fiverr.com/yasirarfat2/visualize-your-data-excel-dashboard-macro-vba-automation","notes":"Macro + viz positioning; angle: offer rev-share on referred US SMB automation deals."},
    {"id":"sprint55-006","date":today,"source":"Fiverr","client":"fridadaniel","service":"Excel Userforms + VBA","estimated_value":260,"status":"new","url":"https://www.fiverr.com/fridadaniel/create-an-excel-dashboard","notes":"Userform automation capability; angle: white-label custom internal tools for service businesses with repetitive intake."},

    {"id":"sprint55-007","date":today,"source":"Upwork","client":"Google App Scripts & Google Sheets Automation Expert Needed","service":"Google Sheets Automation","estimated_value":600,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Google-App-Scripts-Google-Sheets-Automation-Expert-Needed_~021956158046159154118/","notes":"Active buyer seeking process automation; angle: pitch rapid audit + 72hr prototype for one core workflow."},
    {"id":"sprint55-008","date":today,"source":"Upwork","client":"Lead Automation Specialist: Phantom Buster to Google Sheets","service":"Lead Data Pipeline Automation","estimated_value":450,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Lead-Automation-Specialist-Phantom-Buster-Google-Sheets_~021977768086293249315/","notes":"Needs lead extraction pipeline; angle: deliver resilient enrichment + dedupe + QA layer beyond base scrape."},
    {"id":"sprint55-009","date":today,"source":"Upwork","client":"Event Flyer & Email Automation Using Google Sheets + Gmail","service":"Sheets-to-Email Automation","estimated_value":700,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/One-Time-Setup-Event-Flyer-Email-Automation-Using-Google-Sheets-Gmail_~021912133076015248974/","notes":"Clear repetitive ops pain; angle: done-for-you workflow plus SOP handoff for non-technical staff."},
    {"id":"sprint55-010","date":today,"source":"Upwork","client":"n8n Automation Expert for Google Sheets to Slack/Telegram","service":"Notification Automation","estimated_value":350,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/n8n-Automation-Expert-for-Google-Sheets-Slack-Telegram_~021977303949226343715/","notes":"Simple but urgent automation use case; angle: fixed-scope fast turnaround + monitoring/retry hardening."},
    {"id":"sprint55-011","date":today,"source":"Upwork","client":"Zapier Expert for Restaurant Automation","service":"Ops Marketing Automation","estimated_value":900,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Zapier-Expert-Google-Calendar-Eventbrite-Social-Google-Website-Automation-for-Restaurant_~022018717966399105289/","notes":"Restaurant operator with multi-channel manual process; angle: expand from event automation into weekly specials/ROI dashboard."},
    {"id":"sprint55-012","date":today,"source":"Upwork","client":"Zapier + Airtable + Google Sheets Automation Specialist","service":"CRM Workflow Automation","estimated_value":800,"status":"new","url":"https://www.upwork.com/freelance-jobs/apply/Zapier-Airtable-Google-Sheets-Automation-Specialist-CRM-Workflow-Setup_~022022803072181311013/","notes":"CRM automation demand indicates budget and urgency; angle: propose phased build with measurable cycle-time reduction."},

    {"id":"sprint55-013","date":today,"source":"Reddit-r/forhire","client":"[hiring] Someone who can make an excel sheet for scheduling","service":"Scheduling Spreadsheet Automation","estimated_value":300,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1aizmuz/hiring_someone_who_can_make_an_excel_sheet_for/","notes":"Hiring post for scheduling logic; angle: pitch robust scheduling template + protected input UI + change log."},
    {"id":"sprint55-014","date":today,"source":"Reddit-r/forhire","client":"[Hiring] Excel Expert Needed: Build Custom Search Function","service":"Excel Search/Filter Tooling","estimated_value":280,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1gofhqq/hiring_excel_expert_needed_build_custom_search/","notes":"Specific feature request shows immediate need; angle: offer quick win + optional migration to lightweight dashboard."},
    {"id":"sprint55-015","date":today,"source":"Reddit-r/forhire","client":"[Hiring] VBA/Excel Expert ($30)","service":"VBA Fixes + Automation","estimated_value":250,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1ibg5aw/hiring_online_looking_for_vba_excel_expert_must/","notes":"Poster mentions more future work for speed/trust; angle: low-friction first task to open retainer pathway."},
    {"id":"sprint55-016","date":today,"source":"Reddit-r/slavelabour","client":"[TASK] Separate Information in an Excel File","service":"Data Segmentation Automation","estimated_value":150,"status":"new","url":"https://www.reddit.com/r/slavelabour/comments/1fhff21/task_separate_information_in_an_excel_file_15/","notes":"Repetitive category split task; angle: convert one-time help into reusable macro for recurring datasets."},
    {"id":"sprint55-017","date":today,"source":"Reddit-r/slavelabour","client":"[TASK] Export Excel Company location on interactive map","service":"Excel-to-Map Reporting","estimated_value":220,"status":"new","url":"https://www.reddit.com/r/slavelabour/comments/1di6xdo/task_export_excel_company_location_on_interactive/","notes":"Geodata visualization need; angle: deliver map automation + refreshable location pipeline."},
    {"id":"sprint55-018","date":today,"source":"Reddit-r/slavelabour","client":"[TASK] Convert PDF to Excel (~2500 rows)","service":"PDF Data Extraction Workflow","estimated_value":240,"status":"new","url":"https://www.reddit.com/r/slavelabour/comments/1gpz4kq/task_convert_pdf_to_excel/","notes":"Data conversion pain at scale; angle: scripted extraction + validation checks to reduce manual cleanup."},

    {"id":"sprint55-019","date":today,"source":"LinkedIn","client":"New Life Rockeries","service":"Field Ops + Estimating Spreadsheet Automation","estimated_value":1200,"status":"new","url":"https://www.linkedin.com/company/b-d-rockeries","notes":"Landscaping contractor with long tenure; angle: automate estimate, materials, and crew scheduling sheets to improve job margin visibility."},
    {"id":"sprint55-020","date":today,"source":"LinkedIn","client":"Plantscapes Inc.","service":"Recurring Service Route Reporting","estimated_value":1400,"status":"new","url":"https://www.linkedin.com/company/plantscapes-inc.","notes":"Maintenance-heavy operation likely spreadsheet-reliant; angle: route/crew KPI dashboard + renewal forecasting."},
    {"id":"sprint55-021","date":today,"source":"LinkedIn","client":"Advanced Landscape Management","service":"Operations Dashboard Automation","estimated_value":1300,"status":"new","url":"https://www.linkedin.com/company/advanced-landscape-management-seattle","notes":"Multi-area service footprint suggests dispatch/reporting complexity; angle: standardize weekly ops and profitability reporting."},
    {"id":"sprint55-022","date":today,"source":"LinkedIn","client":"Pacific Landscaping Inc","service":"Job Cost Tracking Automation","estimated_value":1250,"status":"new","url":"https://www.linkedin.com/company/pacific-landscaping-inc","notes":"11-50 employee range supports paid process improvements; angle: automate job-cost rollups and quote-vs-actual tracking."},
    {"id":"sprint55-023","date":today,"source":"LinkedIn","client":"Britescape Lighting & Landscaping","service":"Lead-to-Install Workflow Automation","estimated_value":1100,"status":"new","url":"https://www.linkedin.com/company/britescape","notes":"Project-driven lighting/landscape shop; angle: automate pipeline from inquiry to install scheduling and invoicing exports."},
    {"id":"sprint55-024","date":today,"source":"LinkedIn","client":"Simple Bookkeeping Solutions","service":"Internal Process Automation","estimated_value":1000,"status":"new","url":"https://www.linkedin.com/company/simple-bookkeeping-solutions","notes":"Bookkeeping firm with recurring manual tasks; angle: monthly close checklist automation and client status dashboard."},

    {"id":"sprint55-025","date":today,"source":"Yelp-Unclaimed","client":"Calvert Tax & Bookkeeping","service":"Bookkeeping Workflow Automation","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/calvert-tax-and-bookkeeping-kewanee-2","notes":"Unclaimed Yelp profile indicates digital ops gap; angle: automate client intake, reconciliation trackers, and deadline reminders."},
    {"id":"sprint55-026","date":today,"source":"Yelp-Unclaimed","client":"Accurate Bookkeeping Services","service":"Monthly Close Dashboard","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/accurate-bookkeeping-services-new-york","notes":"Bookkeeping niche with repetitive reporting cadence; angle: build standardized close pack and exception alerts."},
    {"id":"sprint55-027","date":today,"source":"Yelp-Unclaimed","client":"Tax Preparation Services (Salt Lake City)","service":"Tax Ops Spreadsheet Automation","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/tax-preparation-services-salt-lake-city","notes":"Seasonal surge workflow likely manual; angle: intake triage sheet + return status board + follow-up automation."},
    {"id":"sprint55-028","date":today,"source":"Yelp-Unclaimed","client":"Medical Billing Unlimited","service":"Revenue Cycle Spreadsheet Automation","estimated_value":950,"status":"new","url":"https://www.yelp.com/biz/medical-billing-unlimited-el-paso","notes":"Medical billing requires high-volume repetitive tracking; angle: denial tracking workbook with auto-priority flags."},
    {"id":"sprint55-029","date":today,"source":"Yelp-Unclaimed","client":"Assuraclaim Medical Billing Solutions","service":"Claims Tracking Dashboard","estimated_value":1000,"status":"new","url":"https://www.yelp.com/biz/assuraclaim-medical-billing-solutions-southfield","notes":"Phone-listed unclaimed profile and billing focus = high process pain potential; angle: KPI board for aging, resubmits, and collector workload."},
    {"id":"sprint55-030","date":today,"source":"Yelp-Unclaimed","client":"Medical Billing Center","service":"Billing + Bookkeeping Automation","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/medical-billing-center-fort-collins","notes":"Explicit billing/bookkeeping combo service; angle: unify billing and bookkeeping data into one owner-facing performance dashboard."},
]

existing = set()
if path.exists():
    for line in path.read_text(encoding='utf-8', errors='ignore').splitlines():
        line=line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
            existing.add((obj.get('source','').lower(), obj.get('client','').lower()))
            existing.add(("id", obj.get('id','').lower()))
        except Exception:
            pass

new_lines = []
for e in entries:
    key=(e['source'].lower(), e['client'].lower())
    kid=("id", e['id'].lower())
    if key in existing or kid in existing:
        continue
    new_lines.append(json.dumps(e, ensure_ascii=False))

if new_lines:
    with path.open('a', encoding='utf-8') as f:
        f.write('\n' + '\n'.join(new_lines) + '\n')
print(f"appended={len(new_lines)}")
