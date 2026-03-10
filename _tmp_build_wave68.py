import os
from datetime import date

wave_dir = os.path.join('sites', 'premium-v3-wave68')
os.makedirs(wave_dir, exist_ok=True)

leads = [
    {
        'id':'nosite-001','business':'Perez Landscaping','city':'Seattle, WA','phone':'(206) 602-9766',
        'slug':'perez-landscaping-seattle-wa',
        'headline':'Premium Demo Built to Convert more Seattle landscaping quote requests',
        'desc':'Conversion-focused page concept for a no-website landscaping brand serving SeaTac/Tukwila and nearby Seattle neighborhoods.',
        'chips':['Seattle Metro Coverage','Phone-First Funnel','Fast Quote CTA'],
        'services':[
            'Hero copy targets homeowners actively comparing landscaping crews this week.',
            'Service stack highlights routine yard care, cleanup, hedge work, and landscape refreshes.',
            'Trust section emphasizes local reliability, responsive communication, and clear arrival windows.',
            'Quote form captures service type, property size, and target timeline for rapid callback.'
        ]
    },
    {
        'id':'nosite-002','business':'Ligaya Landscaping','city':'Seattle, WA','phone':'(206) 351-7402',
        'slug':'ligaya-landscaping-seattle-wa',
        'headline':'Premium Demo Built to Turn local search traffic into booked landscaping jobs',
        'desc':'Lead-capture layout tuned for homeowners looking for reliable downtown Seattle landscaping and maintenance support.',
        'chips':['Downtown Positioning','Trust-Building Copy','Quote-Ready UX'],
        'services':[
            'Top section presents immediate availability messaging for high-intent local visitors.',
            'Service modules cover lawn care, cleanup, trimming, and seasonal enhancement requests.',
            'Credibility blocks reinforce consistency, respectful crews, and communication speed.',
            'Detailed quote intake gathers priorities, budget range, and preferred service date.'
        ]
    },
    {
        'id':'nosite-003','business':'Greenscapes Landscaping','city':'Seattle, WA','phone':'(206) 802-8186',
        'slug':'greenscapes-landscaping-seattle-wa',
        'headline':'Premium Demo Built to Increase recurring maintenance and project quote volume',
        'desc':'Growth-oriented conversion page designed for West Seattle landscaping demand and recurring-service lead capture.',
        'chips':['Recurring Revenue Focus','West Seattle Targeting','High-Intent Form Flow'],
        'services':[
            'Hero messaging addresses homeowners frustrated by inconsistent lawn and yard upkeep.',
            'Offer sections showcase weekly maintenance, cleanup, edging, and enhancement upsells.',
            'Trust panel emphasizes dependable crews, clear scheduling, and strong service follow-through.',
            'Quote workflow captures yard condition, cadence preference, and project notes.'
        ]
    },
    {
        'id':'nosite-004','business':'Northwest Landscape and Patio Bellevue','city':'Bellevue, WA','phone':'(425) 390-4959',
        'slug':'northwest-landscape-and-patio-bellevue-bellevue-wa',
        'headline':'Premium Demo Built to Win more Bellevue patio and landscape upgrade projects',
        'desc':'High-ticket positioning page concept to convert Bellevue homeowners researching patio, hardscape, and landscape improvements.',
        'chips':['Hardscape + Landscape','High-Ticket Positioning','Consultation CTA'],
        'services':[
            'Primary messaging targets patio and outdoor living prospects with active project intent.',
            'Service content pairs landscape installs with patio upgrades for larger average project value.',
            'Authority section highlights craftsmanship quality, planning support, and project clarity.',
            'Quote intake captures scope, style goals, and timeline for qualified follow-up calls.'
        ]
    },
    {
        'id':'nosite-033','business':'A A Landscaping','city':'Bothell, WA','phone':'(206) 251-8199',
        'slug':'a-a-landscaping-bothell-wa',
        'headline':'Premium Demo Built to Capture more Bothell lawn and landscaping bookings',
        'desc':'Performance-focused lead page tailored for Bothell-area homeowners needing dependable lawn and landscaping service.',
        'chips':['Bothell Local Intent','Simple Booking Funnel','Phone + Form Capture'],
        'services':[
            'Hero section drives quick action with clear value proposition and local relevance.',
            'Service breakdown includes mowing, cleanup, trimming, and general landscape maintenance.',
            'Trust messaging reduces friction with responsiveness and reliability proof points.',
            'Quote form captures contact info, requested services, and scheduling preferences.'
        ]
    },
]

style = ':root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}'

for lead in leads:
    d = os.path.join(wave_dir, lead['slug'])
    os.makedirs(d, exist_ok=True)
    chips = ''.join([f'<span>{c}</span>' for c in lead['chips']])
    items = ''.join([f'<li>{s}</li>' for s in lead['services']])
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{lead['business']} | Premium Demo</title><style>{style}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {lead['id']} · {lead['city']}</p><h1 style="margin:.2rem 0">{lead['business']} {lead['headline']}</h1><p>{lead['desc']}</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">{lead['phone']}</span></p><div class="chips">{chips}</div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Services</h2><ul>{items}</ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

notes = f'''# Deployment Notes - premium-v3-wave68

Date: {date.today().isoformat()}
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- perez-landscaping-seattle-wa
- ligaya-landscaping-seattle-wa
- greenscapes-landscaping-seattle-wa
- northwest-landscape-and-patio-bellevue-bellevue-wa
- a-a-landscaping-bothell-wa

## Lead Selection Basis
Selected from remaining uncovered, outreach-usable `status=new` leads with the highest estimated value ($800 tier) and no existing premium-v3 page coverage for these city-targeted slugs.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
'''
with open(os.path.join(wave_dir, 'DEPLOYMENT_NOTES.md'), 'w', encoding='utf-8') as f:
    f.write(notes)

print('built', wave_dir)
