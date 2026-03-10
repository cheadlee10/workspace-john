import json, pathlib, html
from datetime import date

root = pathlib.Path('sites/premium-v3-wave91')
root.mkdir(parents=True, exist_ok=True)

ids = ['wave4-112','wave4-107','wave4-113','sprint-20260303-047','sprint-20260303-055']
leads = {}
for l in pathlib.Path('leads.jsonl').read_text(encoding='utf-8').splitlines():
    l = l.strip()
    if not l:
        continue
    try:
        d = json.loads(l)
    except Exception:
        continue
    if d.get('id') in ids:
        leads[d['id']] = d

slug_map = {
    'wave4-112':'sacramento-emergency-mold-and-leak-team-sacramento-ca',
    'wave4-107':'atlanta-emergency-roof-tarp-and-repair-atlanta-ga',
    'wave4-113':'columbus-burst-pipe-and-cleanup-co-columbus-oh',
    'sprint-20260303-047':'eugene-basement-flood-pump-out-pros-eugene-or',
    'sprint-20260303-055':'fargo-basement-flood-pump-out-pros-fargo-nd'
}

angle_map = {
    'wave4-112':'Mold remediation and leak cleanup',
    'wave4-107':'Emergency roof tarp and repair',
    'wave4-113':'Burst pipe cleanup and plumbing response',
    'sprint-20260303-047':'Basement flood pump-out',
    'sprint-20260303-055':'Basement flood pump-out'
}

for lid in ids:
    d = leads[lid]
    slug = slug_map[lid]
    biz = d.get('client', 'Business')
    location = d.get('location', '')
    service = d.get('service', 'Home Service')
    angle = angle_map[lid]
    title = f'{biz} | Premium Demo'
    desc = f'Premium demo concept focused on {angle.lower()} quote conversions.'
    bullets = [
        'Intent-matched headline and offer for urgent local service searches.',
        f'Localized copy tuned for {location or "local"} emergency demand.',
        'Fast callback and detailed quote flow posting directly to contact intake.',
        'High-visibility trust and response-speed messaging to increase form submits.'
    ]
    lis = ''.join(f'<li>{html.escape(b)}</li>' for b in bullets)

    doc = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{html.escape(title)}</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {html.escape(lid)} | {html.escape(location)} | Service: {html.escape(service)}</p><h1 style="margin:.2rem 0">{html.escape(biz)}</h1><p style="font-size:1.1rem">{html.escape(desc)}</p><p>Built for high-intent homeowners searching for immediate help with fast callback and streamlined quote submission flow.</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">Priority response via quote form</span></p><div class="chips"><span>Emergency Service Calls</span><span>{html.escape(service)}</span><span>Fast Quote Capture</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(slug)}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Conversion Sections</h2><ul>{lis}</ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(slug)}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>Priority response via quote form<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''

    out = root / slug
    out.mkdir(parents=True, exist_ok=True)
    (out / 'index.html').write_text(doc, encoding='utf-8')

notes = f'''# Premium V3 Wave 91 Deployment Notes

Generated: {date.today().isoformat()}

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave91/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields for `business` slug and form `source`

## Pages
1. `sacramento-emergency-mold-and-leak-team-sacramento-ca` (Lead: wave4-112)
2. `atlanta-emergency-roof-tarp-and-repair-atlanta-ga` (Lead: wave4-107)
3. `columbus-burst-pipe-and-cleanup-co-columbus-oh` (Lead: wave4-113)
4. `eugene-basement-flood-pump-out-pros-eugene-or` (Lead: sprint-20260303-047)
5. `fargo-basement-flood-pump-out-pros-fargo-nd` (Lead: sprint-20260303-055)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
'''
(root / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print('built wave91')
