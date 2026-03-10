import os,re,textwrap

wave='sites/premium-v3-wave40'
os.makedirs(wave,exist_ok=True)
leads=[
 {'id':'gpass-us-414','client':'Gene Johnson Plumbing','slug':'gene-johnson-plumbing-seattle-wa','city':'Seattle, WA','service':'Plumbing','est':1010,'score':85,'tier':'P1','phone':'(206) 792-7495','email':''},
 {'id':'gpass-us-387','client':'Mister Sparky of Denver','slug':'mister-sparky-of-denver-denver-co','city':'Denver, CO','service':'Electrical','est':970,'score':85,'tier':'P1','phone':'303-747-4279','email':''},
 {'id':'gpass-us-306','client':'Las Vegas Electrician Pros','slug':'las-vegas-electrician-pros-las-vegas-nv','city':'Las Vegas, NV','service':'Electrical','est':950,'score':85,'tier':'P1','phone':'(702) 323-0810','email':'service@lasvegas-electrician.com'},
 {'id':'gpass-us-460','client':'Weather Roofing','slug':'weather-roofing-charlotte-nc','city':'Charlotte, NC','service':'Roofing','est':950,'score':85,'tier':'P1','phone':'(704) 774-3041','email':''},
 {'id':'gpass-us-454','client':'512 Plumbing','slug':'512-plumbing-austin-tx','city':'Austin, TX','service':'Plumbing','est':930,'score':85,'tier':'P1','phone':'(512) 956-6426','email':''},
]
services={
 'Roofing':[
  'Rapid roof leak response CTA lane for storm damage and emergency tarping calls',
  'Service stack for inspections, repairs, replacements, and insurance-claim support',
  'Trust proof band highlighting licensed crews, warranty coverage, and project photos',
  'Quote pre-qualifier prompts for roof type, issue severity, and timeline to book fast'],
 'Plumbing':[
  'Emergency plumbing CTA for clogs, leaks, and no-hot-water situations with same-day intent',
  'Core service cards for drain cleaning, water heaters, repipes, and fixture installs',
  'Credibility row with licensed plumbers, upfront pricing, and workmanship guarantees',
  'Lead-intake prompts for symptom, property type, and urgency to prioritize best-fit calls'],
 'HVAC':[
  'Fast-response HVAC hero CTA for no-cool/no-heat breakdown requests',
  'Service modules for AC repair, furnace service, system replacements, and tune-ups',
  'Trust section featuring certified techs, financing options, and maintenance memberships',
  'Pre-quote fields to capture equipment type, comfort issue, and target schedule'],
 'Electrical':[
  'Urgent electrical CTA path for outages, panel issues, and safety-related calls',
  'Service cards covering panel upgrades, wiring repairs, EV chargers, and lighting installs',
  'Authority block for licensed electricians, code-compliant work, and satisfaction guarantee',
  'Screening prompts to classify project scope and dispatch the right technician quickly'],
}
css=":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for L in leads:
    items=''.join(f"<li>{x}</li>" for x in services[L['service']])
    digits='+'+re.sub(r'[^0-9]','',L['phone'])
    email=L['email'] if L['email'] else 'Email not publicly listed'
    html=f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{L['client']} | Premium Demo</title><style>{css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{L['city']}</p><h1 style='margin:.2rem 0'>{L['client']} Premium Demo Built to Convert More {L['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <a class='btn sec' href='tel:{digits}'>Call {L['phone']}</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{items}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p><a href='tel:{digits}' style='color:#9dd2ff;text-decoration:none;font-weight:700'>Call {L['phone']}</a> | {email}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    p=os.path.join(wave,L['slug'])
    os.makedirs(p,exist_ok=True)
    open(os.path.join(p,'index.html'),'w',encoding='utf-8').write(html)

notes=textwrap.dedent('''# Premium V3 Wave 40 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave40

## Built Pages (highest-priority uncovered leads)
1. gene-johnson-plumbing-seattle-wa (est. $1010, outreach ID: gpass-us-414, tier: P1, score: 85, service: Plumbing)
2. mister-sparky-of-denver-denver-co (est. $970, outreach ID: gpass-us-387, tier: P1, score: 85, service: Electrical)
3. las-vegas-electrician-pros-las-vegas-nv (est. $950, outreach ID: gpass-us-306, tier: P1, score: 85, service: Electrical)
4. weather-roofing-charlotte-nc (est. $950, outreach ID: gpass-us-460, tier: P1, score: 85, service: Roofing)
5. 512-plumbing-austin-tx (est. $930, outreach ID: gpass-us-454, tier: P1, score: 85, service: Plumbing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1), highest available scores/value, and slugs not already present in prior premium-v3 wave folders.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and secondary click-to-call CTA
- Above-the-fold quick callback form
- Service-specific core services section for each vertical
- Detailed quote form with project details capture
- Contact reinforcement row with verified phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public email is unavailable for 4/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave40 production domain/path wiring and deploy aliases remain pending deployment config.
5. Some selected brands have strong existing sites (e.g., franchise/multi-location operators); demo pages remain valid as conversion-focused alternate landing concepts, but offer positioning should emphasize speed-to-lead gains over "new website" replacement.
''')
open(os.path.join(wave,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8').write(notes)
print('built',len(leads),'pages in',wave)
