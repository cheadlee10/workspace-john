import json
from pathlib import Path

candidates = [
# Upwork
{"id":"sprint6-001","date":"2026-03-04","source":"Upwork","client":"Google Spreadsheet Freelancers Directory (buyer pool)","service":"Excel/Sheets Automation","estimated_value":700,"status":"new","url":"https://www.upwork.com/hire/google-spreadsheet-freelancers/","notes":"Buyer-rich directory page with explicit automation use-cases. Outreach angle: send direct proposals to businesses requesting workflow automation and API-connected sheets."},
{"id":"sprint6-002","date":"2026-03-04","source":"Upwork","client":"Google Sheets Experts for Hire (US)","service":"Spreadsheet process automation","estimated_value":700,"status":"new","url":"https://www.upwork.com/l/us/google-spreadsheet-freelancers/","notes":"US SMB buyer pool for spreadsheet cleanup and automation. Outreach angle: pitch fixed-price cleanup + automation starter package."},
{"id":"sprint6-003","date":"2026-03-04","source":"Upwork","client":"Custom Google Apps Script Automation Service Listing","service":"Apps Script automation","estimated_value":500,"status":"new","url":"https://www.upwork.com/services/product/development-it-custom-google-apps-script-automation-for-google-sheets-docs-drive-1907504509880338353","notes":"Signals active demand for Apps Script automations across Docs/Drive/Sheets. Outreach angle: offer maintainable scripts + handoff docs."},
{"id":"sprint6-004","date":"2026-03-04","source":"Upwork","client":"Google Sheets Automation Service Listing","service":"Google Sheets workflow automation","estimated_value":450,"status":"new","url":"https://www.upwork.com/services/product/development-it-a-google-sheets-automation-1672258736314462208","notes":"Service page indicates ongoing buyer demand for spreadsheet automations. Outreach angle: quick-turn automations for SMB operations teams."},
{"id":"sprint6-005","date":"2026-03-04","source":"Upwork","client":"Google Sheets Freelancers Marketplace","service":"Spreadsheet cleanup + dashboarding","estimated_value":600,"status":"new","url":"https://www.upwork.com/hire/google-sheets-freelancers/","notes":"Broad marketplace where businesses seek Sheets help. Outreach angle: differentiate via ROI-focused automation outcomes, not just formulas."},
{"id":"sprint6-006","date":"2026-03-04","source":"Upwork","client":"Data Analyst Jobs Feed (automation-heavy)","service":"Excel reporting automation","estimated_value":800,"status":"new","url":"https://www.upwork.com/freelance-jobs/data-analysis/","notes":"Jobs feed includes ads attribution + data automation requirements. Outreach angle: offer repeatable report pipelines to reduce analyst hours."},

# Fiverr
{"id":"sprint6-007","date":"2026-03-04","source":"Fiverr","client":"Fiverr Community: I NEED EXCEL WORK ATTCHMENT FOR PRACTICE","service":"Excel sample workflow packaging","estimated_value":200,"status":"new","url":"https://community.fiverr.com/public/forum/boards/start-here-c9d/posts/285632-i-need-excel-work-attchment-for-practice?sortby=date","notes":"New seller asks for real Excel client workflow examples; partnership lead. Outreach angle: sell reusable workflow packs + QA templates."},
{"id":"sprint6-008","date":"2026-03-04","source":"Fiverr","client":"Fiverr Community: Seller profile/gig removed (Excel development)","service":"Compliance-safe gig packaging + delivery SOP","estimated_value":250,"status":"new","url":"https://community.fiverr.com/public/forum/boards/start-here-c9d/posts/325452-seller-profile-not-approved-and-gig-failed-and-removed-no-explanation?sortby=date","notes":"Excel seller needs setup guidance and likely backend support. Outreach angle: provide compliant offer templates + delivery automation."},
{"id":"sprint6-009","date":"2026-03-04","source":"Fiverr","client":"Fiverr Excel Forum","service":"Partner recruitment for spreadsheet projects","estimated_value":300,"status":"new","url":"https://community.fiverr.com/forums/forum/151-fiverr-excel/","notes":"Active niche community of Excel sellers. Outreach angle: recruit white-label partners and identify overflow demand quickly."},
{"id":"sprint6-010","date":"2026-03-04","source":"Fiverr","client":"Excelizerdz Fiverr Gig","service":"VBA/Excel app overflow support","estimated_value":300,"status":"new","url":"https://www.fiverr.com/excelizerdz/create-a-vba-excel-application-for-you","notes":"VBA app seller likely receives spillover tasks. Outreach angle: backend coding support for fast delivery and revision handling."},
{"id":"sprint6-011","date":"2026-03-04","source":"Fiverr","client":"Rafaelsanchezrd Fiverr Gig","service":"Excel-to-web app conversion","estimated_value":700,"status":"new","url":"https://www.fiverr.com/rafaelsanchezrd/convert-your-excel-spreadsheet-to-a-webapp","notes":"Excel-to-web conversion demand suggests higher-ticket workflow migration needs. Outreach angle: offer phased migration + spreadsheet stabilization."},
{"id":"sprint6-012","date":"2026-03-04","source":"Fiverr","client":"Ikramzada Fiverr Gig","service":"Data cleanup and standardization automation","estimated_value":220,"status":"new","url":"https://www.fiverr.com/ikramzada/be-you-excel-guru-with-excel-data-entry-data-merger-cleanup-and-formatting","notes":"High-volume cleanup niche; ideal for templated automation support. Outreach angle: partner for script-assisted cleanup turnaround."},

# Reddit
{"id":"sprint6-013","date":"2026-03-04","source":"Reddit","client":"r/forhire - Urgent Excel rate adjustment (100 items)","service":"Excel adjustment automation","estimated_value":300,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1mgonir/urgent_help_needed_excel_rate_adjustment_keep/","notes":"Urgent + explicit spreadsheet task = high-intent buyer behavior. Outreach angle: immediate fix + reusable formula guardrails."},
{"id":"sprint6-014","date":"2026-03-04","source":"Reddit","client":"r/forhire - Excel Spreadsheet Help","service":"Workbook bug fixing and modernization","estimated_value":250,"status":"new","url":"https://www.reddit.com/r/forhire/comments/87d9j7/hiring_excel_spreadsheet_help/","notes":"Legacy workbook issues are common SMB pain. Outreach angle: bug fix now + future-proof workbook structure."},
{"id":"sprint6-015","date":"2026-03-04","source":"Reddit","client":"r/forhire - Excel De-Duplication Script","service":"Deduplication script automation","estimated_value":350,"status":"new","url":"https://www.reddit.com/r/forhire/comments/637v0z/hiring_excel_deduplication_script/","notes":"Clear script request and repeated data-cleaning need. Outreach angle: custom dedupe script + parameterized rules UI."},
{"id":"sprint6-016","date":"2026-03-04","source":"Reddit","client":"r/forhire - Web-scraping script to auto-generate Excel","service":"Scraping to Excel pipeline","estimated_value":500,"status":"new","url":"https://www.reddit.com/r/forhire/comments/4bx9qo/hiring_onetime_project_write_a_webscraping_script/","notes":"Direct automation ask from web to spreadsheet. Outreach angle: scheduled scraper with clean export schema and handoff docs."},
{"id":"sprint6-017","date":"2026-03-04","source":"Reddit","client":"r/forhire - Excel Solver to website migration","service":"Excel model to app migration","estimated_value":900,"status":"new","url":"https://www.reddit.com/r/forhire/comments/sgm5k/hiring_usually_run_excel_solver_but_would_like_to/","notes":"Migration from spreadsheet model to web implies strategic budget. Outreach angle: phased migration retaining familiar spreadsheet logic."},
{"id":"sprint6-018","date":"2026-03-04","source":"Reddit","client":"r/forhire - VBA/Excel expert (fluent English)","service":"VBA support and recurring tasks","estimated_value":550,"status":"new","url":"https://www.reddit.com/r/forhire/comments/1ibg5aw/hiring_online_looking_for_vba_excel_expert_must/","notes":"Requester mentions more work if speed/trust proven. Outreach angle: fast response + short trial task to lock recurring work."},

# LinkedIn
{"id":"sprint6-019","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn US Excel Freelancer Jobs","service":"Automation outreach to hiring managers","estimated_value":800,"status":"new","url":"https://www.linkedin.com/jobs/excel-freelancer-jobs","notes":"Continuous hiring stream for Excel specialists. Outreach angle: offer project-based automation option before full contract hiring."},
{"id":"sprint6-020","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn Microsoft Excel Jobs (US)","service":"Reporting ops automation","estimated_value":900,"status":"new","url":"https://www.linkedin.com/jobs/microsoft-excel-jobs","notes":"Very large job volume with Excel-heavy roles. Outreach angle: provide done-for-you report automation to reduce hiring urgency."},
{"id":"sprint6-021","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn Excel Jobs (Canada)","service":"Spreadsheet process optimization","estimated_value":700,"status":"new","url":"https://ca.linkedin.com/jobs/excel-jobs/","notes":"Large market with many SMB data roles. Outreach angle: standardized automation package for teams managing recurring exports."},
{"id":"sprint6-022","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn Work From Home Excel Jobs (India)","service":"Remote spreadsheet automation support","estimated_value":650,"status":"new","url":"https://in.linkedin.com/jobs/work-from-home-excel-jobs","notes":"Strong remote demand indicates persistent process pain in spreadsheet operations. Outreach angle: asynchronous automation delivery model."},
{"id":"sprint6-023","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn Excel VBA Freelance Jobs (France)","service":"VBA legacy optimization","estimated_value":850,"status":"new","url":"https://fr.linkedin.com/jobs/expert-excel-vba-freelance-emplois","notes":"VBA-specific freelance demand; likely legacy-heavy workflows. Outreach angle: stabilize macros and add maintainability docs."},
{"id":"sprint6-024","date":"2026-03-04","source":"LinkedIn","client":"LinkedIn Excel VBA Jobs (France)","service":"VBA modernization and support","estimated_value":850,"status":"new","url":"https://fr.linkedin.com/jobs/excel-vba-emplois","notes":"Multiple fresh Excel VBA postings. Outreach angle: fast audit + refactor package for brittle workbook systems."},

# Local SMB niches
{"id":"sprint6-025","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Numbers Matter Accounting & Bookkeeping","service":"Bookkeeping reporting automation","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/numbers-matter-accounting-and-bookkeeping-phoenix","notes":"Bookkeeping/accounting firm with recurring monthly reporting demands. Outreach angle: automate reconciliations and client KPI packs."},
{"id":"sprint6-026","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Business Bookkeeping Resolution","service":"QuickBooks-to-Excel automation","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/business-bookkeeping-resolution-phoenix","notes":"Certified QBO/Xero profile implies multi-system data handling. Outreach angle: unify exports into a clean master reporting workbook."},
{"id":"sprint6-027","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Accurate Bookkeeping and Accounting","service":"Data cleanup and month-end automation","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/accurate-bookkeeping-and-accounting-phoenix","notes":"Likely high recurring manual categorization and month-end routines. Outreach angle: build standardized month-close automation flow."},
{"id":"sprint6-028","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Eric Buchholz Bookkeeping","service":"Solo-bookkeeper process automation","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/eric-buchholz-bookkeeping-phoenix","notes":"Solo operator likely bottlenecked by repetitive spreadsheet admin. Outreach angle: one-click templates and weekly dashboard output."},
{"id":"sprint6-029","date":"2026-03-04","source":"Local SMB (Yelp)","client":"Washington Tax Services","service":"Tax prep workflow automation","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/washington-tax-services-seattle","notes":"Tax + bookkeeping + IRS representation suggests heavy documentation workflows. Outreach angle: automate intake tracking and return status dashboards."},
{"id":"sprint6-030","date":"2026-03-04","source":"Local SMB (Yelp)","client":"EMBCC (Dallas)","service":"Medical billing tracking automation","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/embcc-dallas","notes":"Medical billing services often use multi-step spreadsheet tracking. Outreach angle: claims status tracker with aging and follow-up automations."},
]

p = Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
existing_urls = set()
for line in p.read_text(encoding="latin-1").splitlines():
    line = line.strip()
    if not line:
        continue
    try:
        obj = json.loads(line)
        u = obj.get("url")
        if u:
            existing_urls.add(u)
    except Exception:
        pass

new_entries = [e for e in candidates if e.get('url') not in existing_urls]
new_entries = new_entries[:30]

with p.open("a", encoding="latin-1") as f:
    for e in new_entries:
        f.write(json.dumps(e, ensure_ascii=False) + "\n")

print(f"candidates={len(candidates)} new_appended={len(new_entries)}")
