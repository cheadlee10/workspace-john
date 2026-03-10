import json, re, html
from pathlib import Path
from datetime import date

wave='92'
root=Path(f'sites/premium-v3-wave{wave}')
root.mkdir(parents=True, exist_ok=True)

ids=['wave4-106','wave6-064','wave6-102','wave6-024','wave6-056']
lead_by={}
for line in Path('leads.jsonl').read_text(encoding='utf-8',errors='ignore').splitlines():
    s=line.strip()
    if not s:
        continue
    try:
        d=json.loads(s)
    except Exception:
        continue
    if d.get('id') in ids:
        lead_by[d['id']]=d

def slugify(x:str)->str:
    x=x.lower()
    x=re.sub(r'[^a-z0-9]+','-',x).strip('-')
    return re.sub(r'-+','-',x)

pages=[]
for lid in ids:
    d=lead_by[lid]
    biz=d.get('client','Business').strip()
    loc=d.get('location','').strip()
    service=d.get('service','Home Service').strip()
    city=(loc.split(',')[0].strip() if loc else 'Local')
    slug=slugify(f"{biz} {loc}")
    title=f"{biz} | {city} {service} Quote Demo"
    subtitle=f"Premium conversion demo for {service.lower()} leads in {loc}."
    bullets=[
        f"Urgency-focused hero for {city} homeowners searching immediate {service.lower()} support.",
        "Dual conversion paths: 30-second callback form + detailed quote request.",
        "Trust-positioning blocks built for high-intent local emergency traffic.",
        "All quote capture submits route to /contact with source tracking fields."
    ]
    lis=''.join(f'<li>{html.escape(b)}</li>' for b in bullets)

    doc=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{html.escape(title)}</title><style>:root{{--bg:#0a0f1f;--panel:#121a33;--text:#eaf0ff;--muted:#b8c4e4;--line:#2a3f73;--a:#5cc8ff;--b:#76ffbf}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#13244a,#0a0f1f 60%);color:var(--text)}}.wrap{{max-width:1100px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.25fr .95fr}}.two{{grid-template-columns:1fr 1fr}}.card{{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}}h1,h2{{line-height:1.2}}.meta{{color:var(--muted);font-size:13px}}.btn{{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:700;text-decoration:none}}.pri{{background:linear-gradient(90deg,var(--a),var(--b));color:#021023;border:none;cursor:pointer}}.tag{{display:inline-block;padding:6px 10px;border:1px solid #365089;background:#1a2850;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:11px;border-radius:8px;border:1px solid #39528f;background:#0e1730;color:var(--text)}}textarea{{min-height:100px}}li{{margin:8px 0}}@media(max-width:860px){{.hero,.two{{grid-template-columns:1fr}}}}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {html.escape(lid)} · {html.escape(loc)} · {html.escape(service)}</p><h1>{html.escape(biz)}</h1><p>{html.escape(subtitle)}</p><p>Built to convert urgent inbound demand into booked estimate calls with a streamlined quote flow.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div><span class="tag">High Intent</span><span class="tag">{html.escape(service)}</span><span class="tag">Fast Response</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(slug)}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input id="name" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone">Phone Number</label><input id="phone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">Conversion Architecture</h2><ul>{lis}</ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(slug)}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input id="qname" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="qphone">Phone Number</label><input id="qphone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="details">Project details</label><textarea id="details" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p class="meta">Priority response via quote form. Demo form posts to secure contact intake endpoint.</p></section></div></div></body></html>'''

    out=root/slug
    out.mkdir(parents=True,exist_ok=True)
    (out/'index.html').write_text(doc,encoding='utf-8')
    pages.append((slug,lid,biz,loc,service,d.get('estimated_value')))

notes=[
    '# Premium V3 Wave 92 Deployment Notes','',
    f'Generated: {date.today().isoformat()}','',
    '## Scope',
    'Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave92/`.',
    'Each page includes:',
    '- Hero CTA linking to `#quote`',
    '- Quick callback form posting to `/contact`',
    '- Detailed quote form posting to `/contact`',
    '- Hidden tracking fields (`business`, `source`) for intake attribution','',
    '## Lead selection method',
    'Picked highest estimated-value uncovered leads not already present in prior premium-v3 deployment notes, with urgency-weighted services (water damage / emergency).','',
    '## Pages'
]
for i,(slug,lid,biz,loc,service,ev) in enumerate(pages,1):
    notes.append(f"{i}. `{slug}` (Lead: {lid} | {biz} | {loc} | {service} | est ${ev})")
notes += [
    '',
    '## Deployment checks',
    '- Verify each `index.html` renders correctly on mobile and desktop.',
    '- Confirm both forms on each page POST to `/contact`.',
    '- Confirm hidden `business` values exactly match folder slugs.',
    '- Smoke test hero CTA jump to `#quote` on all pages.'
]
(root/'DEPLOYMENT_NOTES.md').write_text('\n'.join(notes),encoding='utf-8')

print('built',root)
for p in pages:
    print(p[1],p[0])
