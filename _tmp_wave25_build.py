import json, re, pathlib, html
root=pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john")
wave=root/'sites'/'premium-v3-wave25'
wave.mkdir(parents=True, exist_ok=True)

selected_ids=['gpass-us-361','gpass-us-359','gpass-us-357','gpass-us-363','gpass-us-360']
rows=[]
for ln in (root/'outreach_queue.jsonl').read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    o=json.loads(ln)
    if o.get('id') in selected_ids:
        rows.append(o)
id_index={r['id']:r for r in rows}
rows=[id_index[i] for i in selected_ids if i in id_index]

if len(rows)!=5:
    raise SystemExit(f"Expected 5 rows, got {len(rows)}")

def slugify(s):
    return re.sub(r'[^a-z0-9]+','-',(s or '').lower()).strip('-')

def city_state(loc):
    m=re.search(r'([^,]+),\s*([A-Za-z]{2})', loc or '')
    if m:
        return m.group(1).strip(), m.group(2).upper()
    return loc or 'Local Market','US'

def digits(phone):
    d=''.join(ch for ch in (phone or '') if ch.isdigit())
    if len(d)==11 and d.startswith('1'):
        d=d[1:]
    return d

service_content={
 'Fencing': {
   'hero':'Premium conversion layout focused on turning fence replacement and new install intent into booked estimate calls within minutes.',
   'services':['Wood, vinyl, and chain-link fence installation','Fence replacement and storm-damage rebuilds','Gate automation and access upgrades','Property-line consultation and permit-ready planning'],
 },
 'Plumbing': {
   'hero':'Premium conversion layout focused on capturing emergency plumbing calls and high-ticket repair requests with fast-response CTAs.',
   'services':['24/7 emergency leak and burst pipe response','Drain, sewer, and clog diagnosis + clearing','Water heater repair and replacement','Repipe and fixture upgrade estimates'],
 },
 'Roofing': {
   'hero':'Premium conversion layout designed to capture roof-repair urgency, inspection requests, and insurance-driven replacement leads.',
   'services':['Emergency roof leak containment','Full roof replacement and material upgrades','Storm damage inspection and documentation','Preventive maintenance and flashing repair'],
 },
 'Electrical': {
   'hero':'Premium conversion layout built to convert urgent electrical troubleshooting and panel upgrade prospects into booked service calls.',
   'services':['Panel upgrades and circuit troubleshooting','EV charger and dedicated circuit installs','Lighting retrofits and code corrections','Safety inspections and surge protection'],
 }
}

for o in rows:
    client=o.get('client','Local Business')
    location=o.get('location','')
    service=o.get('service','Home Services')
    phone=o.get('phone','')
    phone_href=digits(phone)
    email=o.get('email') or f"service@{slugify(client)}.example"
    c,st=city_state(location)
    slug=o.get('site_slug') or f"{slugify(client)}-{slugify(c)}-{st.lower()}"
    bundle=service_content.get(service, {'hero':'Premium conversion layout focused on local lead capture and quote conversion.','services':['Fast response booking workflow','Service-specific landing section','Quote qualification form','Click-to-call conversion path']})

    lis=''.join(f"<li>{html.escape(item)}</li>" for item in bundle['services'])
    title=f"{client} | Premium Demo"
    h1=f"{client} Premium Demo Built for High-Intent {service} Leads"
    html_doc=f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{html.escape(title)}</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{html.escape(location)}</p><h1 style='margin:.2rem 0'>{html.escape(h1)}</h1><p>{html.escape(bundle['hero'])}</p><p><a class='btn pri' href='tel:{phone_href}'>Call {html.escape(phone or 'Now')}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p><a href='tel:{phone_href}'>{html.escape(phone)}</a> | <a href='mailto:{html.escape(email)}'>{html.escape(email)}</a><br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    d=wave/slug
    d.mkdir(parents=True, exist_ok=True)
    (d/'index.html').write_text(html_doc, encoding='utf-8')

notes=[
"# Premium V3 Wave 25 - Deployment Notes",
"",
"Date: 2026-03-02",
"Wave Folder: `sites/premium-v3-wave25`",
"",
"## Built Pages (highest-priority uncovered leads)",
]
for i,o in enumerate(rows,1):
    client=o['client']; loc=o.get('location',''); svc=o.get('service','');
    c,st=city_state(loc)
    slug=o.get('site_slug') or f"{slugify(client)}-{slugify(c)}-{st.lower()}"
    notes.append(f"{i}. `{slug}` (est. ${o.get('estimated_value',0)}, outreach ID: `{o.get('id')}`, tier: `{o.get('priority_tier','')}`, score: {o.get('priority_score','')}, service: {svc})")

notes += [
"",
"## Selection Notes",
"- Source file: `outreach_queue.jsonl`",
"- Selection criteria: top P1 leads not already represented in existing premium wave slugs/IDs, ranked by `priority_score` then `estimated_value`.",
"- Slug convention used: `client-city-state` (normalized lowercase hyphenation).",
"",
"## Conversion Structure Included",
"- Hero section with dual CTA (`Call` + `Get My Quote`)",
"- Above-the-fold quick callback form",
"- Core services section tailored by service vertical",
"- Detailed quote capture form with project-details textarea",
"- Contact reinforcement row with click-to-call + email",
"",
"## Form Endpoint Convention",
"- All forms post to current endpoint convention: `/contact`",
"- Hidden metadata fields on every form:",
"  - `business` = site slug",
"  - `source` = `quick_callback` or `detailed_quote`",
"",
"## Known Blockers / Follow-ups",
"1. `/contact` backend handler still needs final CRM ingest mapping and owner routing.",
"2. CTA click + form-submit analytics events are not embedded yet.",
"3. Production host aliases/routes for wave25 are not yet wired.",
"4. Two selected leads have no verified email in queue; fallback `service@<slug>.example` was used in demo contact block.",
]
(wave/'DEPLOYMENT_NOTES.md').write_text('\n'.join(notes)+"\n", encoding='utf-8')
print('created', wave)
for o in rows:
    c,st=city_state(o.get('location',''))
    slug=o.get('site_slug') or f"{slugify(o.get('client',''))}-{slugify(c)}-{st.lower()}"
    print(slug)
