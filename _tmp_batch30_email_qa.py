import re
p=r"C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-03-batch30.md"
t=open(p,encoding='utf-8').read()
issues=[]
# split by sections like ## 1)
parts=re.split(r'\n##\s+\d+\)\s+',t)
sections=parts[1:]
print('sections',len(sections))
for i,s in enumerate(sections,1):
    if '{{live_url}}' not in s or '{{screenshot_url}}' not in s:
        issues.append(f'section_{i}_missing_required_placeholder')
    if re.search(r'TODO|TBD|lorem|ipsum|example\.com|@example|555-555|123-456|guarantee|#1|best in|ranked',s,re.I):
        issues.append(f'section_{i}_potential_compliance_or_dummy_text')
print('issues',issues if issues else 'none')
