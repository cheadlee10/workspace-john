import os, json, re, html
from pathlib import Path
from datetime import date

WAVE_NUM = 106
wave = f'premium-v3-wave{WAVE_NUM}'
base = Path('sites') / wave
base.mkdir(parents=True, exist_ok=True)


def slugify(text: str) -> str:
    text = text.lower().replace('&', ' and ')
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return re.sub(r'-+', '-', text).strip('-')

existing = set()
for root, dirs, files in os.walk('sites'):
    if 'premium-v3-wave' in root:
        for d in dirs:
            existing.add(d)

candidates = []
with open('outreach_queue.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except Exception:
            continue
        client = (row.get('client') or '').strip()
        location = (row.get('location') or '').strip()
        service = (row.get('service') or 'Home Services').strip() or 'Home Services'
        if not client or not location:
            continue
        slug = slugify(f"{client} {location}")
        if slug in existing:
            continue
        candidates.append({
            'lead_id': row.get('id', ''),
            'client': client,
            'location': location,
            'industry': service,
            'priority': int(row.get('priority_score') or 0),
            'est': int(row.get('estimated_value') or 0),
            'slug': slug,
        })

candidates.sort(key=lambda x: (x['priority'], x['est']), reverse=True)
selected = candidates[:5]

if len(selected) < 5:
    raise SystemExit(f'Only found {len(selected)} uncovered leads')

css = '''<style>:root{--bg:#071022;--panel:#0f1c36;--text:#ecf2ff;--muted:#b7c4e3;--line:#2c4274;--a:#69d1ff;--b:#87ffca}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#162a52,#071022 62%);color:var(--text)}.wrap{max-width:1120px;margin:auto;padding:30px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.2fr 1fr}.two{grid-template-columns:1fr 1fr}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}.meta{color:var(--muted);font-size:13px}.btn{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:800;text-decoration:none}.pri{background:linear-gradient(90deg,var(--a),var(--b));color:#041225;border:none;cursor:pointer}.tag{display:inline-block;padding:6px 10px;border:1px solid #365089;background:#18294d;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:11px;border-radius:8px;border:1px solid #3b5690;background:#0b1731;color:var(--text)}textarea{min-height:110px}li{margin:8px 0}@media(max-width:860px){.hero,.two{grid-template-columns:1fr}}</style>'''

for l in selected:
    d = base / l['slug']
    d.mkdir(parents=True, exist_ok=True)
    title = f"{l['client']} | Premium Local Quote Demo"
    html_page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{html.escape(title)}</title>{css}</head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {html.escape(l['lead_id'])} | {html.escape(l['location'])} | {html.escape(l['industry'])}</p><h1>{html.escape(l['client'])}</h1><p>High-conversion local service page concept designed for {html.escape(l['industry'].lower())} buyers in {html.escape(l['location'])}.</p><p>Primary goal: capture urgent quote requests and route prospects directly to your contact intake.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div><span class="tag">Premium Demo</span><span class="tag">Lead Capture</span><span class="tag">{html.escape(l['industry'])}</span></div></section><section class="card"><h2 style="margin-top:0">Fast Quote Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="fast_quote_callback"/><label for="name">Full Name</label><input id="name" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone">Phone Number</label><input id="phone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" aria-label="Email" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">What This Demo Includes</h2><ul><li>Intent-matched headline and CTA flow for local emergency/ready-to-buy searches.</li><li>Dual quote capture points with attribution tags for CRM/source tracking.</li><li>Trust-oriented layout blocks for homeowners and commercial buyers.</li><li>All form submissions POST to <code>/contact</code> for immediate intake routing.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Project Quote</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="detailed_project_quote"/><label for="qname">Full Name</label><input id="qname" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="qphone">Phone Number</label><input id="qphone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="qdetails">Project details</label><textarea id="qdetails" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send Quote Request</button></form><p class="meta">Demo quote pipeline endpoint: <code>/contact</code></p></section></div></div></body></html>'''
    (d / 'index.html').write_text(html_page, encoding='utf-8')

notes = [
    f"# Premium V3 Wave {WAVE_NUM} Deployment Notes",
    "",
    f"Generated: {date.today().isoformat()}",
    "",
    "## Scope",
    f"Built 5 premium demo pages for highest-intent uncovered leads under `sites/{wave}/`.",
    "Each page includes:",
    "- Hero quote CTA linking to `#quote`",
    "- Fast quote callback form POSTing to `/contact`",
    "- Detailed quote request form POSTing to `/contact`",
    "- Hidden tracking fields (`business`, `source`) for attribution",
    "",
    "## Lead selection method",
    "Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.",
    "",
    "## Pages",
]
for i, l in enumerate(selected, 1):
    notes.append(f"{i}. `{l['slug']}` (Lead: {l['lead_id']} | {l['client']} | {l['location']} | {l['industry']} | priority {l['priority']} | est ${l['est']})")

notes += [
    "",
    "## Deployment checks",
    "- Verify each `index.html` renders correctly on mobile and desktop.",
    "- Confirm both forms on each page POST to `/contact`.",
    "- Confirm hidden `business` values exactly match folder slugs.",
    "- Smoke test hero CTA jump to `#quote` on all pages.",
]
(base / 'DEPLOYMENT_NOTES.md').write_text('\n'.join(notes) + '\n', encoding='utf-8')

print('created', base)
for l in selected:
    print(l)
