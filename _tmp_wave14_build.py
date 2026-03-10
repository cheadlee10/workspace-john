import textwrap,re
from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave14')
root.mkdir(parents=True, exist_ok=True)

leads = [
    dict(id='gpass-wa-201', est=700, tier='P1', slug='done-right-works-tacoma-wa', name='Done Right Works', phone='(253) 324-2311', area='Tacoma, WA', title='Tacoma Handyman Services Framed to Convert Calls into Booked Jobs', desc='Premium conversion page for fast homeowner requests, repair calls, and quote-ready project details.', chips=['Local Tacoma Coverage','Fast Callback Funnel','Repairs + Installations'], services=['General Handyman Repairs for Home and Rental Properties','Drywall, Carpentry, and Interior Fixes','Fixture Installations and Minor Electrical/Plumbing Support','Punch-List Work for Property Managers and Sellers']),
    dict(id='gpass-pnw-220', est=1200, tier='P1', slug='quality-pacific-roofing-seattle-wa', name='Quality Pacific Roofing', phone='(206) 264-0955', area='Seattle, WA', title='Seattle Roofing Page Built for Higher-Intent Calls and Quote Requests', desc='Premium lead-capture experience tuned for roof repair and replacement prospects ready to schedule.', chips=['Seattle Roof Specialists','Emergency + Planned Work','Quote-Ready Conversion Flow'], services=['Leak Repair and Rapid Storm Response','Asphalt, Metal, and Flat Roof Replacement','Roof Inspections with Photo-Documented Findings','Preventive Maintenance Plans for Long-Term Roof Health']),
    dict(id='gpass-us-254', est=1200, tier='P1', slug='canyon-roofing-llc-tucson-az', name='Canyon Roofing, LLC', phone='(520) 288-8282', area='Tucson, AZ', title='Tucson Roofing Conversion Page for Faster Estimate Requests', desc='Premium roofing demo designed to turn local search traffic into booked inspections and replacement quotes.', chips=['Tucson Service Area','Inspection-to-Estimate Flow','Repair + Replacement Focus'], services=['Roof Leak Repair and Active Damage Mitigation','Full Roof Replacement with Material Upgrade Options','Storm and Weather Damage Assessments','Routine Roof Checkups and Maintenance Programs']),
    dict(id='gpass-pnw-230', est=950, tier='P1', slug='neighborly-fencing-seattle-wa', name='Neighborly Fencing', phone='(425) 472-5777', area='Seattle, WA', title='Seattle Fence Services Landing Page Structured to Capture Qualified Leads', desc='Premium page for homeowners comparing fencing contractors, with clear calls-to-action and project-intake forms.', chips=['Residential Fencing','Custom Build Options','Fast Quote Capture'], services=['Wood Fence Design and Installation','Vinyl and Composite Fence Replacement','Fence Repair, Gate Alignment, and Hardware Upgrades','Property Boundary and Privacy Planning Support']),
    dict(id='gpass-wa-202', est=800, tier='P1', slug='pnw-lawncare-spokane-wa', name='PNW Lawncare', phone='(509) 868-9559', area='Spokane, WA', title='Spokane Lawncare and Landscaping Page Built to Convert Seasonal Demand', desc='Premium local services demo focused on turning lawncare traffic into recurring service starts and consultations.', chips=['Spokane Lawn Experts','Recurring Service Offers','Consult-to-Book Flow'], services=['Weekly and Biweekly Lawn Maintenance','Yard Cleanup, Trimming, and Seasonal Prep','Landscape Bed Maintenance and Mulch Refresh','Irrigation Checks and Turf Health Recommendations']),
]

def esc(s:str)->str:
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def tel(phone:str)->str:
    return re.sub(r'\D','', phone)

tpl = """<!doctype html>
<html><head><meta charset='UTF-8'/><meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>{name} | {area} Premium Service Demo</title><meta name='description' content='{desc}'/><link rel='canonical' href='https://preview.northstarsynergy.com/{slug}/'/>
<style>body{{font-family:Inter,system-ui;background:#0b1220;color:#dbeafe;margin:0}}.w{{max-width:1080px;margin:auto;padding:22px}}.card{{background:#111c33;border:1px solid #284067;border-radius:16px;padding:20px}}.hero{{display:grid;grid-template-columns:1.15fr .85fr;gap:14px}}.btn{{display:inline-block;padding:11px 14px;border-radius:10px;text-decoration:none;font-weight:700}}.pri{{background:#38bdf8;color:#082f49}}.sec{{border:1px solid #7dd3fc;color:#e0f2fe}}.chips span{{display:inline-block;border:1px solid #365782;border-radius:999px;padding:6px 10px;margin:4px 6px 0 0}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}input,textarea{{width:100%;padding:11px;border-radius:10px;border:1px solid #365782;background:#0b1220;color:#fff;margin:6px 0}}textarea{{min-height:100px}}label{{display:block;margin-top:8px}}ul{{margin:0;padding-left:20px;line-height:1.8}}small{{color:#93c5fd}}@media(max-width:900px){{.hero,.grid{{grid-template-columns:1fr}}}}</style></head>
<body><div class='w'>
  <div class='card' style='display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap'>
    <strong>{name}</strong>
    <div><a class='btn sec' href='tel:{tel}'>Call {phone}</a> <a class='btn pri' href='#quote'>Get My Quote</a></div>
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
      <p>Contact: <a href='tel:{tel}' aria-label='Call {phone}'>{phone}</a> <small>Demo form posts to placeholder endpoint: /contact</small></p></section>
  </div>
</div></body></html>
"""

for l in leads:
    d = root / l['slug']
    d.mkdir(parents=True, exist_ok=True)
    html = tpl.format(
        name=esc(l['name']), area=esc(l['area']), desc=esc(l['desc']), slug=esc(l['slug']),
        tel=tel(l['phone']), phone=esc(l['phone']), title=esc(l['title']),
        chip1=esc(l['chips'][0]), chip2=esc(l['chips'][1]), chip3=esc(l['chips'][2]),
        s1=esc(l['services'][0]), s2=esc(l['services'][1]), s3=esc(l['services'][2]), s4=esc(l['services'][3])
    )
    (d/'index.html').write_text(html, encoding='utf-8')

notes = textwrap.dedent('''
# Premium V3 Wave 14 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave14

## Built Pages (highest-priority uncovered leads)
1. `done-right-works-tacoma-wa` (est. $700, outreach ID: gpass-wa-201, tier: P1)
2. `quality-pacific-roofing-seattle-wa` (est. $1200, outreach ID: gpass-pnw-220, tier: P1)
3. `canyon-roofing-llc-tucson-az` (est. $1200, outreach ID: gpass-us-254, tier: P1)
4. `neighborly-fencing-seattle-wa` (est. $950, outreach ID: gpass-pnw-230, tier: P1)
5. `pnw-lawncare-spokane-wa` (est. $800, outreach ID: gpass-wa-202, tier: P1)

## Selection Notes
- Selected from `outreach_queue.jsonl` where `priority_tier=P1`, excluding outreach IDs already represented in premium-v3 waves.
- Ranking heuristic used: priority tier, then `priority_score`, then `estimated_value`.

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
4. **Input source inconsistency:** some records use `priority_tier/priority_score`, while others only carry `estimated_value`; sorting currently depends on available fields.
''').strip()+"\n"
(root/'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print('created', len(leads), 'pages at', root)
