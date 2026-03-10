import textwrap
from pathlib import Path

root = Path('C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave12')
root.mkdir(parents=True, exist_ok=True)

leads = [
    dict(id='nosite-037',slug='regal-roofing-and-contracting-seattle-wa',name='Regal Roofing & Contracting',phone='12067842689',display='(206) 784-2689',area='Seattle, WA',title='Seattle Roofing and Contracting Built for Fast Response and Long-Term Protection',desc='Premium roofing demo designed to convert urgent repair searches and replacement shoppers into booked estimate calls.',chips=['Emergency Leak Response','Residential + Light Commercial','Insurance-Friendly Scope Support'],services=['Roof Leak Repair and Storm Damage Response','Complete Roof Replacement and Re-Roofing','Flashing, Ventilation, and Drainage Corrections','Preventive Roof Maintenance and Annual Inspections']),
    dict(id='gpass-us-269',slug='arrington-roofing-dallas-tx',name='Arrington Roofing',phone='12146988443',display='(214) 698-8443',area='Dallas, TX',title='Dallas Roofing Estimates That Turn Urgent Repairs Into Signed Projects',desc='Premium lead-capture page built to drive call volume and qualified quote requests for repair and replacement work.',chips=['Free Estimate CTA','24/7 Emergency Call Support','Repair + Full Replacement'],services=['Emergency Roof Leak Repair','Asphalt, Metal, and Flat Roof Replacement','Storm and Hail Damage Restoration','Maintenance Plans for Roof Longevity']),
    dict(id='gpass-pnw-210',slug='elite-metal-roofing-llc-vancouver-wa',name='Elite Metal Roofing LLC',phone='13604879090',display='(360) 487-9090',area='Vancouver / SW Washington Metro, WA',title='Metal Roofing Expertise for SW Washington Homes and Small Commercial Properties',desc='Premium roofing demo focused on high-ticket metal roof projects and faster conversion from estimate intent.',chips=['Metal Roofing Specialists','SW Washington Coverage','High-Durability Systems'],services=['Standing Seam and Metal Panel Installation','Metal Roof Repair and Leak Mitigation','Roof Replacement for Aging Composite Systems','Inspection and Project Planning Consultations']),
    dict(id='gpass-us-301',slug='klaus-roofing-systems-of-ohio-westerville-oh',name='Klaus Roofing Systems of Ohio',phone='16146817663',display='(614) 681-7663',area='Westerville / Central Ohio, OH',title='Central Ohio Roofing Systems Designed for Performance, Warranty, and Peace of Mind',desc='Premium conversion page targeting homeowners seeking trusted inspections, clear scopes, and durable roof systems.',chips=['Central Ohio Service Area','Inspection-First Sales Flow','Warranty-Focused Solutions'],services=['Detailed Roof Inspections and Condition Reports','Full Roof Replacement and Re-Roofing','Leak Repair and Waterproofing Upgrades','Planned Maintenance and Seasonal Tune-Ups']),
    dict(id='gpass-us-280',slug='rainier-roofing-llc-tampa-fl',name='Rainier Roofing LLC',phone='18139209065',display='(813) 920-9065',area='Tampa, FL',title='Tampa Roofing Services for Faster Quotes and Cleaner Project Delivery',desc='Premium demo page built to capture quote-ready Tampa homeowners and route them to fast callback scheduling.',chips=['Fast Local Quote Flow','Repair + Replacement Teams','Storm-Ready Roofing Crews'],services=['Roof Repair and Active Leak Response','Roof Replacement and Material Upgrades','Storm Damage Assessment and Scope Writing','Preventive Roof Care Programs']),
]

def esc(s: str) -> str:
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

tpl = """<!doctype html>
<html><head><meta charset='UTF-8'/><meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>{name} | {area} Premium Service Demo</title><meta name='description' content='{desc}'/><link rel='canonical' href='https://preview.northstarsynergy.com/{slug}/'/>
<style>body{{font-family:Inter,system-ui;background:#0b1220;color:#dbeafe;margin:0}}.w{{max-width:1080px;margin:auto;padding:22px}}.card{{background:#111c33;border:1px solid #284067;border-radius:16px;padding:20px}}.hero{{display:grid;grid-template-columns:1.15fr .85fr;gap:14px}}.btn{{display:inline-block;padding:11px 14px;border-radius:10px;text-decoration:none;font-weight:700}}.pri{{background:#38bdf8;color:#082f49}}.sec{{border:1px solid #7dd3fc;color:#e0f2fe}}.chips span{{display:inline-block;border:1px solid #365782;border-radius:999px;padding:6px 10px;margin:4px 6px 0 0}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}input,textarea{{width:100%;padding:11px;border-radius:10px;border:1px solid #365782;background:#0b1220;color:#fff;margin:6px 0}}textarea{{min-height:100px}}label{{display:block;margin-top:8px}}ul{{margin:0;padding-left:20px;line-height:1.8}}small{{color:#93c5fd}}@media(max-width:900px){{.hero,.grid{{grid-template-columns:1fr}}}}</style></head>
<body><div class='w'>
  <div class='card' style='display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap'>
    <strong>{name}</strong>
    <div><a class='btn sec' href='tel:{phone}'>Call {display}</a> <a class='btn pri' href='#quote'>Get My Quote</a></div>
  </div>
  <div class='hero' style='margin-top:12px'>
    <section class='card'><p>{area}</p><h1>{title}</h1><p>{desc}</p><div class='chips'><span>{chip1}</span><span>{chip2}</span><span>{chip3}</span></div></section>
    <section class='card'><h2>Request a Quick Callback</h2><form action='/contact' method='post'>
      <input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/>
      <label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/>
      <label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/>
      <button class='btn pri' type='submit'>Request Callback</button></form></section>
  </div>
  <div class='grid' style='margin-top:12px'>
    <section class='card'><h2>Core Services</h2><ul><li>{s1}</li><li>{s2}</li><li>{s3}</li><li>{s4}</li></ul></section>
    <section class='card' id='quote'><h2>Detailed Quote Request</h2><form action='/contact' method='post'>
      <input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/>
      <label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/>
      <label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/>
      <label for='qemail'>Email</label><input id='qemail' name='email' type='email' required autocomplete='email'/>
      <label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea>
      <button class='btn pri' type='submit'>Send My Quote Request</button></form>
      <p>Contact: <a href='tel:{phone}' aria-label='Call {display}'>{display}</a> <small>Demo form posts to placeholder endpoint: /contact</small></p></section>
  </div>
</div></body></html>
"""

for l in leads:
    d = root / l['slug']
    d.mkdir(parents=True, exist_ok=True)
    safe = {k: esc(v) if isinstance(v, str) else v for k, v in l.items()}
    html = tpl.format(**safe, chip1=esc(l['chips'][0]), chip2=esc(l['chips'][1]), chip3=esc(l['chips'][2]), s1=esc(l['services'][0]), s2=esc(l['services'][1]), s3=esc(l['services'][2]), s4=esc(l['services'][3]))
    (d / 'index.html').write_text(html, encoding='utf-8')

notes = textwrap.dedent('''
# Premium V3 Wave 12 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave12

## Built Pages (highest-priority uncovered leads)
1. `regal-roofing-and-contracting-seattle-wa` (est. $1500, outreach ID: nosite-037)
2. `arrington-roofing-dallas-tx` (est. $1200, outreach ID: gpass-us-269)
3. `elite-metal-roofing-llc-vancouver-wa` (est. $1200, outreach ID: gpass-pnw-210)
4. `klaus-roofing-systems-of-ohio-westerville-oh` (est. $1180, outreach ID: gpass-us-301)
5. `rainier-roofing-llc-tampa-fl` (est. $1180, outreach ID: gpass-us-280)

## Conversion Structure Included
- Hero with immediate dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 offer blocks)
- Detailed quote form with project detail capture
- Contact reinforcement with click-to-call in conversion section

## Form Endpoint Convention
- Current endpoint convention preserved: all forms post to `/contact`
- Hidden form metadata included on all forms:
  - `business` (site slug)
  - `source` (`quick_callback` / `detailed_quote`)

## Known Blockers / Follow-ups
1. **`/contact` backend handler still unbound** in production environment (needs webhook/API route).
2. **No analytics instrumentation present** (GA4/Meta events not configured on these static demos).
3. **No per-site deploy alias mapping committed** yet for this wave.
4. **Lead queue quality gap:** several top-value records appear in mixed source pools without explicit normalized `priority` field, so ranking used estimated value + uncovered status.
''').strip()+"\n"
(root / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print('created', len(leads), 'pages in', root)
