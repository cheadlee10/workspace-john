import textwrap
from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave11')
root.mkdir(parents=True, exist_ok=True)

leads = [
    dict(id='gpass-pnw-248',slug='spokane-roofing-company-spokane-wa',name='Spokane Roofing Company',phone='5098388633',display='(509) 838-8633',area='Spokane / Liberty Lake, WA',title='High-Trust Roofing for Spokane Homes, HOAs, and Small Commercial Buildings',desc='Premium roofing demo focused on converting inspection searches into booked estimates and emergency callbacks.',chips=['Emergency Leak Calls','Residential + Commercial','Warranty-Backed Roof Systems'],services=['Leak Repair and Storm Damage Response','Complete Roof Replacement and Re-Roofing','Preventive Roof Maintenance Programs','Inspection Reports for Real Estate and Insurance']),
    dict(id='gpass-pnw-235',slug='valley-roofing-services-salem-or',name='Valley Roofing Services',phone='5033831406',display='(503) 383-1406',area='Salem, OR',title='Salem Roofing Projects Delivered Fast, Clean, and Built to Last',desc='Premium quote funnel designed to increase quality roofing leads with clear service packaging and quick conversion paths.',chips=['Fast Estimate Turnaround','Repair + Full Replacement','Financing-Friendly Project Scopes'],services=['Roof Leak Diagnostics and Repair','Asphalt, Metal, and Flat Roof Replacement','Flashing, Ventilation, and Drainage Corrections','Seasonal Roof Maintenance and Tune-Ups']),
    dict(id='gpass-pnw-240',slug='legacy-roofing-spokane-valley-wa',name='Legacy Roofing',phone='5092624411',display='(509) 262-4411',area='Spokane Valley, WA / Hayden, ID',title='Legacy Roofing for Durable Protection and Better Long-Term Property Value',desc='Premium multi-market roofing page built to drive higher-ticket estimate requests and booked on-site inspections.',chips=['Spokane Valley + North ID','Detailed Roof Assessments','Residential Roofing Specialists'],services=['Roof Repair and Weatherproofing','Full Roof Tear-Off and Replacement','Ventilation and Flashing Upgrades','Pre-Sale and Annual Roof Inspections']),
    dict(id='gpass-pnw-247',slug='509-roofs-spokane-valley-wa',name='509 Roofs',phone='5092170704',display='(509) 217-0704',area='Spokane Valley, WA',title='Reliable Spokane Valley Roofing with Rapid Response and Clear Pricing',desc='Premium roofing conversion page designed to capture call-ready homeowners and route them into booked estimate slots.',chips=['Rapid Response Scheduling','Clear Scope + Pricing','Repair and Replace Options'],services=['Same-Week Roof Repair Appointments','Roof Replacement for Aging Systems','Storm and Wind Damage Restoration','Roof Health Checkups and Preventive Care']),
    dict(id='gpass-pnw-236',slug='best-roofing-waterproofing-eugene-or',name='BEST Roofing & Waterproofing',phone='5418442378',display='(541) 844-2378',area='Eugene, OR',title='Roofing and Waterproofing Built for Eugene Weather and Long-Term Protection',desc='Premium landing page tailored to convert roof + waterproofing shoppers into qualified callbacks and quote submissions.',chips=['Roofing + Waterproofing','Leak Prevention Focus','Commercial + Residential'],services=['Roof Repair and Full Replacement','Deck and Surface Waterproofing Solutions','Leak Source Identification and Sealing','Maintenance Plans for Long-Term Performance']),
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
# Premium V3 Wave 11 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave11

## Built Pages (highest-value uncovered leads from current gpass queue)
1. `spokane-roofing-company-spokane-wa` (est. $1250, outreach ID: gpass-pnw-248)
2. `valley-roofing-services-salem-or` (est. $1200, outreach ID: gpass-pnw-235)
3. `legacy-roofing-spokane-valley-wa` (est. $1200, outreach ID: gpass-pnw-240)
4. `509-roofs-spokane-valley-wa` (est. $1200, outreach ID: gpass-pnw-247)
5. `best-roofing-waterproofing-eugene-or` (est. $1100, outreach ID: gpass-pnw-236)

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
4. **Lead prioritization metadata gap:** queue file does not include explicit `priority` fields for these records; ranking used estimated value + uncovered status.
''').strip() + "\n"
(root / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')

print(f'created {len(leads)} pages in {root}')
