import json, os, uuid
from datetime import date

leads_file = r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl"
today = "2026-03-04"

candidates = [
    # Fiverr
    {"source":"Fiverr","client":"Abu (Excel Automation Seller)","contact_name":"Abu","location":"Fiverr","service":"White-label Excel/VBA overflow partnership","estimated_value":600,"url":"https://www.fiverr.com/gigs/advanced-excel","notes":"Outreach angle: offer backend delivery support for formula/macros overflow so seller can increase order throughput without hiring full-time."},
    {"source":"Fiverr","client":"Shaji P (Excel Automation Seller)","contact_name":"Shaji P","location":"Fiverr","service":"Google Sheets automation subcontract support","estimated_value":700,"url":"https://www.fiverr.com/gigs/advanced-excel","notes":"Outreach angle: propose revenue-share on complex automation requests; emphasize fast turnaround + QA docs."},
    {"source":"Fiverr","client":"Muddasir Abbas (Dashboard Seller)","contact_name":"Muddasir Abbas","location":"Fiverr","service":"Dashboard + reporting build partnership","estimated_value":650,"url":"https://www.fiverr.com/gigs/excel-expert","notes":"Outreach angle: offer to handle data pipeline/cleanup layer behind dashboard gigs to improve margins and delivery speed."},
    {"source":"Fiverr","client":"Ammad Ahmad (Spreadsheet Formatting Seller)","contact_name":"Ammad Ahmad","location":"Fiverr","service":"Upsell automation add-ons for spreadsheet clients","estimated_value":550,"url":"https://www.fiverr.com/gigs/excel-expert","notes":"Outreach angle: co-sell automation package to existing formatting clients (dedupe, validation, import macros)."},
    {"source":"Fiverr","client":"Abdul Rehman (Excel Automation Seller)","contact_name":"Abdul Rehman","location":"Fiverr","service":"Automation + data cleaning fulfillment partner","estimated_value":750,"url":"https://www.fiverr.com/gigs/excel-automation","notes":"Outreach angle: pitch overflow support for recurring data-cleaning and template automation jobs with fixed SLA."},
    {"source":"Fiverr","client":"Owais Qadir (Excel Data Analysis Seller)","contact_name":"Owais Qadir","location":"Fiverr","service":"Advanced analytics/automation subcontract","estimated_value":680,"url":"https://www.fiverr.com/gigs/excel-automation","notes":"Outreach angle: help seller expand into premium automations (Power Query + Apps Script integration)."},

    # Upwork
    {"source":"Upwork","client":"Excel / Google Sheets - Formula Expert (Job Poster)","contact_name":"","location":"Upwork","service":"Ongoing formula + workflow support","estimated_value":900,"url":"https://www.upwork.com/freelance-jobs/apply/Excel-Google-Sheets-Formula-Expert_~010a7d5ae90cf5018d/","notes":"Outreach angle: they report recurring formula bottlenecks; pitch monthly retainer for on-demand sheet automation."},
    {"source":"Upwork","client":"TREKKA Suite Spreadsheet Product Build (Job Poster)","contact_name":"","location":"Upwork","service":"Template productization + automation","estimated_value":1200,"url":"https://www.upwork.com/freelance-jobs/apply/Hiring-Google-Sheets-Excel-Expert-for-Digital-Products-TREKKA-Suite_~022006060552316597482/","notes":"Outreach angle: bundle template build with backend automation architecture to speed launch cadence."},
    {"source":"Upwork","client":"Excel/Google Sheets Wizard for Tracking Files (Job Poster)","contact_name":"","location":"Upwork","service":"Hubstaff-to-Sheets profitability automation","estimated_value":950,"url":"https://www.upwork.com/freelance-jobs/apply/Excel-Google-Sheets-Wizard-help-with-tracking-files_~01185a5e55e7439fbf/","notes":"Outreach angle: offer end-to-end integration and error-proof formulas across exports/sheets."},
    {"source":"Upwork","client":"Google Sheets Grant Scoring Automation (Job Poster)","contact_name":"","location":"Upwork","service":"Scoring model automation","estimated_value":800,"url":"https://www.upwork.com/freelance-jobs/apply/Google-Sheets-Grant-Application-Review-and-Scoring_~012dcfbd1449b71619/","notes":"Outreach angle: automate weighted scoring + reviewer dashboard to reduce review cycle time."},
    {"source":"Upwork","client":"Data Entry from Photoshop files (Job Poster)","contact_name":"","location":"Upwork","service":"Semi-automated extraction + Excel pipeline","estimated_value":500,"url":"https://www.upwork.com/freelance-jobs/apply/Data-Entry-from-Photoshop-files_~01df9bf8a7717e546d/","notes":"Outreach angle: replace manual entry with structured extraction workflow + QC checks in Sheets."},
    {"source":"Upwork","client":"Spreadsheet Workflow Automation Specialist (Job Poster)","contact_name":"","location":"Upwork","service":"Workflow automation specialist support","estimated_value":1100,"url":"https://www.upwork.com/freelance-jobs/apply/Spreadsheet-Workflow-Automation-Specialist_~021968427865520601294/","notes":"Outreach angle: high-intent automation buyer; pitch quick audit + phased implementation plan."},

    # Reddit
    {"source":"Reddit","client":"u/1aizmuz - Scheduling Excel sheet request","contact_name":"","location":"Reddit","service":"Scheduling workbook automation","estimated_value":350,"url":"https://www.reddit.com/r/forhire/comments/1aizmuz/hiring_someone_who_can_make_an_excel_sheet_for/","notes":"Outreach angle: convert one-off schedule sheet ask into reusable scheduling template + training."},
    {"source":"Reddit","client":"u/1ibg5aw - VBA/Excel expert needed","contact_name":"","location":"Reddit","service":"VBA optimization + repeat support","estimated_value":450,"url":"https://www.reddit.com/r/forhire/comments/1ibg5aw/hiring_online_looking_for_vba_excel_expert_must/","notes":"Outreach angle: poster mentions more work after first success; pitch fast win + ongoing support block."},
    {"source":"Reddit","client":"u/1m12wk3 - Designer needs Excel/Sheets support","contact_name":"","location":"Reddit","service":"Creative ops spreadsheet automation","estimated_value":300,"url":"https://www.reddit.com/r/forhire/comments/1m12wk3/hiring_remote_graphic_designer_w_photoshop/","notes":"Outreach angle: add lightweight template automation for recurring presentation/data tasks."},
    {"source":"Reddit","client":"u/1mgonir - Urgent Excel rate adjustment","contact_name":"","location":"Reddit","service":"Pricing sheet correction automation","estimated_value":220,"url":"https://www.reddit.com/r/forhire/comments/1mgonir/urgent_help_needed_excel_rate_adjustment_keep/","notes":"Outreach angle: urgent pain; offer same-day fix plus reusable pricing calculator to prevent repeat issues."},
    {"source":"Reddit","client":"u/se3pkr - Excel time entry to web interface","contact_name":"","location":"Reddit","service":"Excel-to-web workflow automation","estimated_value":600,"url":"https://www.reddit.com/r/forhire/comments/se3pkr/hiring_translate_excelentered_recorded_time_to/","notes":"Outreach angle: bridge spreadsheet process into automated import pipeline; reduce admin overhead."},
    {"source":"Reddit","client":"u/959gy9 - VBA macro setup request","contact_name":"","location":"Reddit","service":"Macro refactor + documentation","estimated_value":320,"url":"https://www.reddit.com/r/forhire/comments/959gy9/hiring_vbaexcel_programmer/","notes":"Outreach angle: stabilize existing macro-heavy workbook and provide maintainability handoff."},

    # LinkedIn
    {"source":"LinkedIn","client":"Willem Estimable","contact_name":"Willem Estimable","location":"LinkedIn","service":"Bookkeeping workflow and KPI automation","estimated_value":900,"url":"https://www.linkedin.com/in/willem-estimable/","notes":"Outreach angle: position NorthStar as backend automation partner for scaling monthly reporting packages."},
    {"source":"LinkedIn","client":"Kelsey Burks","contact_name":"Kelsey Burks","location":"LinkedIn","service":"Client reporting template automation","estimated_value":850,"url":"https://www.linkedin.com/in/kelsey-burks-92067476/","notes":"Outreach angle: help convert manual bookkeeping deliverables into standardized dashboard outputs."},
    {"source":"LinkedIn","client":"Nick Ford","contact_name":"Nick Ford","location":"LinkedIn","service":"Tax planning model automation","estimated_value":980,"url":"https://www.linkedin.com/in/bas-nickford/","notes":"Outreach angle: offer model + tracker builds for proactive tax planning promises in his positioning."},
    {"source":"LinkedIn","client":"Tina Chandler","contact_name":"Tina Chandler","location":"LinkedIn","service":"Bookkeeping strategist systems automation","estimated_value":920,"url":"https://www.linkedin.com/in/tina-chandler/","notes":"Outreach angle: reduce internal prep time with intake-to-reporting spreadsheet workflows."},
    {"source":"LinkedIn","client":"Sonya Rodgers","contact_name":"Sonya Rodgers","location":"LinkedIn","service":"Accounting data analysis automation","estimated_value":870,"url":"https://www.linkedin.com/in/sonya-rodgers-22425773/","notes":"Outreach angle: align with her data-analysis focus; pitch custom Excel analysis packs for client retention."},
    {"source":"LinkedIn","client":"Rebecca Wunderlich","contact_name":"Rebecca Wunderlich","location":"LinkedIn","service":"QuickBooks/Xero reconciliation automation","estimated_value":940,"url":"https://www.linkedin.com/in/rebeccawunderlich2020/","notes":"Outreach angle: automate reconciliation and monthly close templates to increase capacity per client."},

    # Local SMB niches
    {"source":"Local SMB (Yelp-Unclaimed)","client":"One Solution (formerly Exford & Exford Tax)","contact_name":"","location":"Watertown, NY","service":"Payroll + tax workflow automation","estimated_value":780,"url":"https://www.yelp.com/biz/one-solution-formerly-exford-and-exford-tax-watertown","notes":"Outreach angle: unclaimed Yelp suggests low digital maturity; offer simple payroll/tax tracker automation."},
    {"source":"Local SMB (Yelp-Unclaimed)","client":"Payroll Management Assistance","contact_name":"","location":"Newark, DE","service":"Payroll operations dashboard","estimated_value":760,"url":"https://www.yelp.com/biz/payroll-management-assistance-newark-2","notes":"Outreach angle: provide centralized payroll status dashboard with exception alerts in Sheets."},
    {"source":"Local SMB (Yelp-Unclaimed)","client":"Payrite","contact_name":"","location":"Shelby Township, MI","service":"Payroll data cleanup + reporting automation","estimated_value":820,"url":"https://www.yelp.com/biz/payrite-shelby-township","notes":"Outreach angle: automate recurring payroll exports into client-ready reports."},
    {"source":"Local SMB (Yelp-Unclaimed)","client":"Philadelphia Payroll Services","contact_name":"","location":"Philadelphia, PA","service":"SMB payroll spreadsheet system","estimated_value":790,"url":"https://www.yelp.com/biz/philadelphia-payroll-services-philadelphia","notes":"Outreach angle: improve turnaround with standardized payroll intake + reconciliation templates."},
    {"source":"Local SMB (Yelp-Unclaimed)","client":"Payroll Professionals","contact_name":"","location":"Fargo, ND","service":"Process automation for payroll bookkeeping","estimated_value":810,"url":"https://www.yelp.com/biz/payroll-professionals-fargo-2","notes":"Outreach angle: pitch low-lift automation sprint to eliminate repetitive manual spreadsheet steps."},
    {"source":"Local SMB (Yelp-Unclaimed)","client":"Alternative Payroll Services","contact_name":"","location":"Conroe, TX","service":"Payroll exception tracking automation","estimated_value":840,"url":"https://www.yelp.com/biz/alternative-payroll-services-conroe-3","notes":"Outreach angle: build exception dashboard + monthly KPI reporting to support client retention."},
]

existing_urls = set()
existing_clients = set()
if os.path.exists(leads_file):
    with open(leads_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line=line.strip()
            if not line:
                continue
            try:
                j=json.loads(line)
            except Exception:
                continue
            if j.get('url'): existing_urls.add(j['url'])
            if j.get('client'): existing_clients.add(j['client'].strip().lower())

new_rows=[]
idx=1
for c in candidates:
    if c['url'] in existing_urls:
        continue
    if c['client'].strip().lower() in existing_clients:
        continue
    row={
        "id": f"sprint6-{idx:03d}",
        "date": today,
        "source": c["source"],
        "client": c["client"],
        "contact_name": c.get("contact_name", ""),
        "phone": "",
        "email": "",
        "location": c.get("location",""),
        "service": c["service"],
        "estimated_value": c["estimated_value"],
        "status": "new",
        "url": c["url"],
        "notes": c["notes"]
    }
    new_rows.append(row)
    idx+=1

with open(leads_file, 'a', encoding='utf-8') as f:
    for r in new_rows:
        f.write(json.dumps(r, ensure_ascii=False)+"\n")

print(f"appended={len(new_rows)}")
if new_rows:
    print("first_id",new_rows[0]['id'],"last_id",new_rows[-1]['id'])
