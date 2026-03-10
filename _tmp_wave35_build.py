import os, re, textwrap

wave = 'sites/premium-v3-wave35'
os.makedirs(wave, exist_ok=True)

leads = [
    {'id':'nosite-068','client':'Quality Construction & Roofing','slug':'quality-construction-and-roofing-houston-tx','city':'Houston, TX','service':'General Contractor/Roofing','est':1500,'score':92,'tier':'P1','phone':'(832) 282-6486','email':''},
    {'id':'gpass-us-381','client':'Minuteman Plumbing, Heating & Cooling','slug':'minuteman-plumbing-heating-and-cooling-cambridge-ma','city':'Cambridge, MA','service':'Plumbing/HVAC','est':1150,'score':90,'tier':'P1','phone':'(617) 999-3249','email':''},
    {'id':'gpass-us-368','client':'Dilling Heating, Cooling, Plumbing & Electrical','slug':'dilling-heating-cooling-plumbing-and-electrical-charlotte-nc','city':'Charlotte, NC','service':'HVAC/Plumbing/Electrical','est':1080,'score':88,'tier':'P1','phone':'(704) 741-8773','email':'schedule@dillingnc.com'},
    {'id':'gpass-us-390','client':'Roto-Rooter Plumbing & Water Cleanup Seattle','slug':'roto-rooter-plumbing-and-water-cleanup-seattle-wa','city':'Seattle, WA','service':'Plumbing','est':1020,'score':88,'tier':'P1','phone':'(206) 935-6600','email':''},
    {'id':'gpass-us-392','client':'Gene Johnson Plumbing, Heating, Cooling & Electrical','slug':'gene-johnson-plumbing-heating-cooling-and-electrical-seattle-wa','city':'Seattle, WA','service':'Plumbing/HVAC/Electrical','est':1120,'score':87,'tier':'P1','phone':'(206) 792-7495','email':''},
]

services = {
    'General Contractor/Roofing':[
        'Roof replacement, storm restoration, and exterior renovation cards tuned to high-ticket intent',
        'Project-phase roadmap section that moves visitors from inspection request to signed scope quickly',
        'Trust layer for licensing, insurance, and workmanship warranty proof placed before the long form',
        'Quote intake prompts for roof type, damage urgency, and insurance status to pre-qualify leads'],
    'Plumbing/HVAC':[
        'Emergency plumbing + HVAC repair split section with dual-path CTA routing',
        'Water heater, drain, furnace, and AC tune-up conversion cards with response-time promises',
        'Credibility row for licensing, warranty, and financing support to improve close rate',
        'Form qualifiers for issue type, urgency, and property type to improve lead quality'],
    'HVAC/Plumbing/Electrical':[
        'Seasonal HVAC urgency blocks paired with plumbing/electrical repair quick-book modules',
        'Service-line cards for cooling, heating, drains, and panel/safety work with direct CTA handoff',
        'Social-proof and warranty row placed above fold break to reinforce trust before long-form submit',
        'Quote capture prompts for equipment age, symptom details, and target service window'],
    'Plumbing':[
        '24/7 plumbing emergency hero messaging with immediate-call and quote-first dual CTAs',
        'Drain, leak, water-heater, and sewer service cards structured for high-intent scan behavior',
        'Trust stack for licensed techs, transparent pricing, and workmanship guarantee reinforcement',
        'Project intake prompts for symptom, severity, and timeline to accelerate dispatch qualification'],
    'Plumbing/HVAC/Electrical':[
        'Emergency dispatch hero offer with same-day booking CTA and trust-backed guarantee strip',
        'Plumbing, HVAC, and electrical intent sections with fast navigation anchors for higher conversion',
        'Financing and membership-plan microcopy positioned beside quote triggers for reduced objection friction',
        'Lead qualifier fields for issue type, urgency, and property profile to pre-score inbound requests'],
}

css = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for L in leads:
    items = ''.join(f"<li>{x}</li>" for x in services[L['service']])
    phone_digits = re.sub(r'[^0-9+]', '', L['phone']) if L['phone'] else ''
    callcta = f"<a class='btn sec' href='tel:{phone_digits}'>Call {L['phone']}</a>" if L['phone'] else "<a class='btn sec' href='#quote'>Request Callback</a>"
    email_text = L['email'] if L['email'] else 'Email not publicly listed'
    contact = (f"<p><a href='tel:{phone_digits}' style='color:#9dd2ff;text-decoration:none;font-weight:700'>Call {L['phone']}</a> | {email_text}<br/><small>Demo form routes to secure contact intake endpoint.</small></p>" if L['phone'] else f"<p>Phone verification pending | {email_text}<br/><small>Demo form routes to secure contact intake endpoint.</small></p>")

    html = f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{L['client']} | Premium Demo</title><style>{css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{L['city']}</p><h1 style='margin:.2rem 0'>{L['client']} Premium Demo Built to Convert More {L['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> {callcta}</p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{items}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form>{contact}</section></div></div></body></html>"

    p = os.path.join(wave, L['slug'])
    os.makedirs(p, exist_ok=True)
    with open(os.path.join(p, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

notes = textwrap.dedent('''# Premium V3 Wave 35 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave35

## Built Pages (highest-priority uncovered leads)
1. quality-construction-and-roofing-houston-tx (est. $1500, outreach ID: nosite-068, tier: P1, score: 92, service: General Contractor/Roofing)
2. minuteman-plumbing-heating-and-cooling-cambridge-ma (est. $1150, outreach ID: gpass-us-381, tier: P1, score: 90, service: Plumbing/HVAC)
3. dilling-heating-cooling-plumbing-and-electrical-charlotte-nc (est. $1080, outreach ID: gpass-us-368, tier: P1, score: 88, service: HVAC/Plumbing/Electrical)
4. roto-rooter-plumbing-and-water-cleanup-seattle-wa (est. $1020, outreach ID: gpass-us-390, tier: P1, score: 88, service: Plumbing)
5. gene-johnson-plumbing-heating-cooling-and-electrical-seattle-wa (est. $1120, outreach ID: gpass-us-392, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) + top available priority scores among uncovered leads, excluding outreach IDs already listed in prior premium-v3 wave deployment notes.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with clear primary CTA (Get My Quote) and secondary call CTA
- Above-the-fold quick callback form
- Service-specific core services section by trade vertical
- Detailed quote form with project-details textarea
- Contact reinforcement row with verified phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public emails are missing/unverified for 4 of 5 selected leads; those pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend still needs final CRM ingest mapping + owner routing confirmation.
3. CTA click and form-submit analytics events are not embedded yet.
4. Production domain/route wiring for wave35 pages is pending deployment configuration.
5. Duplicate-brand risk: Gene Johnson appears in multiple lead variants in outreach data; keep outreach link assignment locked to specific wave35 slug to avoid cross-send confusion.
''')

with open(os.path.join(wave, 'DEPLOYMENT_NOTES.md'), 'w', encoding='utf-8') as f:
    f.write(notes)

print('built', len(leads), 'pages in', wave)
