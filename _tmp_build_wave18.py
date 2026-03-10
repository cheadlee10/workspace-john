import pathlib
root=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john')
wave=root/'sites'/'premium-v3-wave18'
wave.mkdir(parents=True, exist_ok=True)
leads=[
{'slug':'greenscape-landscaping-of-spokane-spokane-wa','name':'Greenscape Landscaping of Spokane','id':'gpass-pnw-224','phone':'(509) 461-0525','email':'contact@spokanegreenscape.com','location':'Spokane, WA','ev':850,'headline':'Premium Demo Built for Landscape Quote Conversion','pitch':'Premium landscaping page concept focused on seasonal projects, fast site-visit booking, and qualified quote capture.','services':['Landscape design and installation','Irrigation setup and repair','Retaining walls and hardscape features','Seasonal cleanup and recurring maintenance']},
{'slug':'nam-s-landscaping-llc-vancouver-wa','name':"Nam's Landscaping LLC",'id':'gpass-wa-204','phone':'(360) 213-7839','email':'info@namslandscaping.com','location':'Vancouver, WA','ev':850,'headline':'Premium Demo Built for Local Landscaping Lead Capture','pitch':'Premium landscaping page concept designed to convert homeowners searching for yard upgrades into booked estimate calls.','services':['Sod, planting, and full yard refreshes','Patio, paver, and pathway installs','Irrigation troubleshooting and tune-ups','Monthly maintenance and cleanup plans']},
{'slug':'charlotte-roofing-group-charlotte-nc','name':'Charlotte Roofing Group','id':'gpass-us-325','phone':'(980) 279-2497','email':'','location':'Charlotte, NC','ev':1180,'headline':'Premium Demo Built for Storm-Season Roofing Conversions','pitch':'Premium roofing page concept built around inspection urgency, insurance workflows, and high-intent quote requests.','services':['Storm damage inspections and reports','Asphalt shingle and metal roof replacements','Leak detection and emergency repair','Insurance-claim documentation assistance']},
{'slug':'crown-plumbing-greensboro-nc','name':'Crown Plumbing','id':'gpass-us-307','phone':'(336) 996-1821','email':'service@crownplumbing.com','location':'Greensboro, NC','ev':990,'headline':'Premium Demo Built for Emergency Plumbing Lead Intake','pitch':'Premium plumbing page concept centered on urgent-call routing, trust signals, and detailed service-request forms.','services':['Emergency leak and pipe repair','Water heater installs and replacements','Drain cleaning and sewer troubleshooting','Fixture upgrades and whole-home repipes']},
{'slug':'pro-electric-kansas-city-ks','name':'Pro Electric','id':'gpass-us-336','phone':'(913) 621-6611','email':'info@proelectriclc.com','location':'Kansas City, KS','ev':990,'headline':'Premium Demo Built for Residential Electrical Quote Requests','pitch':'Premium electrical page concept focused on safety-first positioning, quick callback conversion, and project qualification.','services':['Panel upgrades and service changes','Lighting installation and rewiring','Troubleshooting, diagnostics, and repairs','EV charger and smart-home electrical installs']},
]
style=":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero{grid-template-columns:1fr}}"

for lead in leads:
    d=wave/lead['slug']; d.mkdir(parents=True, exist_ok=True)
    tel=''.join(ch for ch in lead['phone'] if ch.isdigit())
    mail=("<a href='mailto:%s'>%s</a>"%(lead['email'],lead['email'])) if lead['email'] else "<span style='color:var(--muted)'>Email pending verification</span>"
    lis=''.join('<li>%s</li>'%s for s in lead['services'])
    html=("<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/>"
          f"<title>{lead['name']} | Premium Demo</title><style>{style}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'>"
          f"<p style='margin-top:0;color:var(--muted)'>{lead['location']}</p><h1 style='margin:.2rem 0'>{lead['name']} {lead['headline']}</h1><p>{lead['pitch']}</p>"
          f"<p><a class='btn pri' href='tel:{tel}'>Call {lead['phone']}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section>"
          f"<section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div>"
          f"<div class='grid' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form>"
          f"<p><a href='tel:{tel}'>{lead['phone']}</a> | {mail}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>")
    (d/'index.html').write_text(html,encoding='utf-8')

notes=[
"# Premium V3 Wave 18 - Deployment Notes",
"",
"Date: 2026-03-02",
"Wave Folder: `sites/premium-v3-wave18`",
"",
"## Built Pages (highest-priority uncovered leads)",
*(f"{i+1}. `{l['slug']}` (est. ${l['ev']}, outreach ID: `{l['id']}`, tier: P1)" for i,l in enumerate(leads)),
"",
"## Selection Notes",
"- Source file: `outreach_queue.jsonl`",
"- Selection criteria: P1 leads not already represented in `covered_slugs.txt` and not present as exact slug folders in prior premium waves, then sorted by `priority_score` and `estimated_value`.",
"- Some high-score leads were excluded because they are already covered under earlier slug variants (city/state suffix differences).",
"",
"## Conversion Structure Included",
"- Hero section with dual CTA (`Call` + `Get My Quote`)",
"- Above-the-fold callback form for high-intent visitors",
"- Core services section with 4 service bullets",
"- Detailed quote capture form with project-details textarea",
"- Contact reinforcement with click-to-call + email (or verification placeholder)",
"",
"## Form Endpoint Convention",
"- All forms post to current endpoint convention: `/contact`",
"- Hidden metadata fields on every form:",
"  - `business` = site slug",
"  - `source` = `quick_callback` or `detailed_quote`",
"",
"## Known Blockers / Follow-ups",
"1. `/contact` backend handler is not yet wired to final CRM routing.",
"2. Analytics/event instrumentation (GA4/Meta/CAPI) not yet embedded.",
"3. Deploy aliases / route mappings for wave18 not yet committed.",
"4. Charlotte Roofing Group contact email is missing in source data; email CTA left as verification placeholder.",
"5. Canonical slug reconciliation is still needed to avoid duplicate-coverage ambiguity across prior waves.",
]
(wave/'DEPLOYMENT_NOTES.md').write_text('\n'.join(notes),encoding='utf-8')
print('ok')
