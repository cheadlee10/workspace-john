import re, glob, os
base = r"C:/Users/chead/.openclaw/workspace-john"
files = glob.glob(base + '/sites/premium-v3-wave27/*/index.html')
for f in files:
    t = open(f, encoding='utf-8').read()
    issues = []
    if re.search(r'TODO|TBD|lorem|ipsum|\{\{|example\.com|@example|555-555|123-456', t, re.I):
        issues.append('placeholder_or_dummy_text')
    ids = re.findall(r"<(?:input|textarea)[^>]*\sid=['\"]([^'\"]+)['\"]", t, re.I)
    fors = set(re.findall(r"<label[^>]*\sfor=['\"]([^'\"]+)['\"]", t, re.I))
    missing = sorted(set(i for i in ids if i not in fors))
    if missing:
        issues.append('missing_label_for:' + ','.join(missing))
    if not re.search(r"href=['\"]tel:[^'\"]+", t, re.I):
        issues.append('missing_tel_link')
    print(f"{os.path.basename(os.path.dirname(f))}: {'OK' if not issues else '; '.join(issues)}")
