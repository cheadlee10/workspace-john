import os, json, re, html
from pathlib import Path
from datetime import date

WAVE_NUM = 111
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

css = '''<style>:root{--bg:#050b1c;--panel:#0e1a33;--text:#eef4ff;--muted:#afc1e8;--line:#2a4275;--a:#74d6ff;--b:#8bffcb}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#14254a,#050b1c 64%);color:var(--text)}.wrap{max-width:1140px;margin:auto;padding:32px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.2fr 1fr}.two{grid-template-columns:1fr 1fr}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px}.meta{color:var(--muted);font-size:13px}.btn{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:800;text-decoration:none}.pri{background:linear-gradient(90deg,var(--a),var(--b));color:#071323;border:none;cursor:pointer}.tag{display:inline-block;padding:6px 10px;border:1px solid #385592;background:#16284b;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:11px;border-radius:8px;border:1px solid #3b5690;background:#0a1731;color:var(--text)}textarea{min-height:110px}li{margin:8px 0}code{color:#9ae0ff}@media(max-width:860px){.hero,.two{grid-template-columns:1fr}}</style>'''

for l in selected:
    d = base / l['slug']
    d.mkdir(parents=True, exist_ok=True)
    title = f"{l['client']} | Premium Local Quote Demo"
    html_page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{html.escape(title)}</title>{css}</head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {html.escape(l['lead_id'])} | {html.escape(l['location'])} | {html.escape(l['industry'])}</p><h1>{html.escape(l['client'])}</h1><p>Premium conversion-focused landing page concept for {html.escape(l['industry'].lower())} buyers in {html.escape(l['location'])}.</p><p>Designed to convert urgent, high-intent local traffic into qualified quote requests.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div><span class="tag">Premium Demo</span><span class="tag">Quote Funnel</span><span class="tag">{html.escape(l['industry'])}</span></div></section><section class="card"><h2 style="margin-top:0">Fast Quote Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="fast_quote_callback"/><label for="name-fast">Full Name</label><input id="name-fast" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone-fast">Phone Number</label><input id="phone-fast" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="email-fast">Email</label><input id="email-fast" name="email" type="email" autocomplete="email" aria-label="Email" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">What This Demo Includes</h2><ul><li>Intent-matched headline and CTA sequence for local ready-to-buy searchers.</li><li>Two quote capture forms with hidden attribution tags for source tracking.</li><li>Trust-forward layout blocks built for homeowners and property managers.</li><li>All lead forms post directly to <code>/contact</code> for intake routing.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Project Quote</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="detailed_project_quote"/><label for="name-quote">Full Name</label><input id="name-quote" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone-quote">Phone Number</label><input id="phone-quote" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="details-quote">Project details</label><textarea id="details-quote" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send Quote Request</button></form><p class="meta">Demo quote pipeline endpoint: <code>/contact</code></p></section></div></div></body></html>'''
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
