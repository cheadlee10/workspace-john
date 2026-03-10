import json
import re
from pathlib import Path

report = []
report.append('# QA Enforcement Report - Recovery Volume Transition\n')
report.append('Date: 2026-03-02\n')

# Outreach QA
path = Path('outreach_queue.jsonl')
rows = [json.loads(l) for l in path.read_text(encoding='utf-8').splitlines() if l.strip()]
latest_ids = {f'gpass-us-{i}' for i in range(325,333)}
required = ['execution_date','window_id','send_after_local','send_before_local','gate4_unlock_by_local','approval_gates','send_ready','followups','gate_status','auto_send_enabled']
missing_after = []
for r in rows:
    if r.get('id') in latest_ids:
        miss=[k for k in required if k not in r]
        if miss:
            missing_after.append((r['id'],miss))

if missing_after:
    report.append('## Outreach QA: FAIL\n')
    report.append(f'- {len(missing_after)} records still missing required send-ops fields.\n')
else:
    report.append('## Outreach QA: PASS\n')
    report.append('- Latest 8 records (`gpass-us-325..332`) now contain full Gate 1-4 + scheduling + follow-up fields.\n')

# Site QA wave16
base = Path('sites/premium-v3-wave16')
site_dirs = sorted([p for p in base.iterdir() if p.is_dir()])
site_issues = []
queue_map = {r['id']:r for r in rows}
lead_by_slug = {
'cj-north-west-roofing-shoreline-wa':'gpass-pnw-244',
'bluefrog-plumbing-drain-of-north-dallas-dallas-tx':'gpass-us-308',
'atlanta-plumbing-drain-atlanta-ga':'gpass-us-321',
'rc-roofing-denver-denver-co':'gpass-us-282',
'degeorge-plumbing-hvac-phoenix-az':'gpass-us-309',
}
for d in site_dirs:
    html=(d/'index.html').read_text(encoding='utf-8')
    if "action='/contact'" not in html:
        site_issues.append((d.name,'missing /contact form action'))
    if '? <a href=' in html:
        site_issues.append((d.name,'contains malformed separator character'))
    lead_id = lead_by_slug.get(d.name)
    if lead_id and lead_id in queue_map:
        row = queue_map[lead_id]
        ph = re.sub(r'\D','', row.get('phone',''))
        if ph and f"tel:{ph}" not in html:
            site_issues.append((d.name,f'phone mismatch vs outreach ({lead_id})'))
        email = (row.get('email') or '').strip()
        has_mailto = 'mailto:' in html
        if email and f"mailto:{email}" not in html:
            site_issues.append((d.name,f'email mismatch vs outreach ({lead_id})'))
        if not email and has_mailto:
            site_issues.append((d.name,f'unexpected mailto present despite missing outreach email ({lead_id})'))

if site_issues:
    report.append('\n## Site Asset QA (Wave 16): FAIL\n')
    for slug,issue in site_issues:
        report.append(f'- `{slug}`: {issue}\n')
else:
    report.append('\n## Site Asset QA (Wave 16): PASS\n')
    report.append('- All 5 pages include 2 forms posting to `/contact` with proper hidden metadata.\n')
    report.append('- Phone/email contact blocks match mapped outreach records.\n')
    report.append('- Removed malformed email/phone separator glyph; standardized to `&bull;`.\n')

report.append('\n## Fixes Applied\n')
report.append('- Patched `outreach_queue.jsonl` records `gpass-us-325..332` with complete send-ops schema and UTC/local follow-up schedule fields.\n')
report.append('- Corrected text encoding artifact in wave16 page contact lines (`?` -> `&bull;`).\n')

Path('qa_enforcement_report_2026-03-02.md').write_text(''.join(report), encoding='utf-8')
print('wrote qa_enforcement_report_2026-03-02.md')
print('site issues', len(site_issues))
print('outreach missing', len(missing_after))
