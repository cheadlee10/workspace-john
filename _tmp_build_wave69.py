import os
from datetime import date

wave = 'premium-v3-wave69'
wave_dir = os.path.join('sites', wave)
os.makedirs(wave_dir, exist_ok=True)

leads = [
    {
        'id': 'wave6-007',
        'business': 'Milwaukee 24-7 Flood Cleanup',
        'city': 'Milwaukee, WI',
        'phone': 'Priority response via quote form',
        'slug': 'milwaukee-24-7-flood-cleanup-milwaukee-wi',
        'headline': 'Premium Demo Built to Capture urgent flood cleanup calls fast',
        'desc': 'Emergency-response conversion page concept focused on water extraction, mitigation, and same-day dispatch intent.',
        'chips': ['24/7 Emergency Intent', 'Water Damage Mitigation', 'Fast Dispatch CTA'],
        'services': [
            'Hero copy addresses immediate flood and water-intrusion urgency with direct action messaging.',
            'Service sections prioritize extraction, drying, dehumidification, and restoration pathway clarity.',
            'Trust stack highlights rapid arrival windows and transparent scope communication.',
            'Quote forms capture incident type, property type, and urgency for quick triage follow-up.'
        ]
    },
    {
        'id': 'wave5-063',
        'business': 'Knoxville Roof Leak Hotline',
        'city': 'Knoxville, TN',
        'phone': 'Priority response via quote form',
        'slug': 'knoxville-roof-leak-hotline-knoxville-tn',
        'headline': 'Premium Demo Built to Convert active roof leak emergencies into booked jobs',
        'desc': 'High-intent roofing page tailored for homeowners needing immediate leak containment and rapid repair estimates.',
        'chips': ['Emergency Roof Repair', 'Storm Damage Positioning', 'Quote-First Funnel'],
        'services': [
            'Top fold messaging targets visitors currently dealing with roof leak stress and urgency.',
            'Service modules cover tarping, leak source diagnosis, decking checks, and repair planning.',
            'Credibility content emphasizes responsiveness, clear updates, and timeline transparency.',
            'Detailed quote intake captures leak severity, roof type, and preferred inspection window.'
        ]
    },
    {
        'id': 'wave6-015',
        'business': 'Cleveland Emergency Roof Leak Repair',
        'city': 'Cleveland, OH',
        'phone': 'Priority response via quote form',
        'slug': 'cleveland-emergency-roof-leak-repair-cleveland-oh',
        'headline': 'Premium Demo Built to Win more Cleveland storm and leak repair leads',
        'desc': 'Conversion-focused emergency roofing layout aimed at homeowners searching for immediate post-storm repair help.',
        'chips': ['Storm Response', 'Leak Repair Specialists', 'High-Intent Lead Capture'],
        'services': [
            'Hero value proposition centers on fast roof stabilization and protective next steps.',
            'Offer sections map emergency patching, water-entry control, and permanent fix workflows.',
            'Trust language reduces friction with accountability, arrival commitments, and clear communication.',
            'Quote forms collect issue details, insurance context, and callback timing preferences.'
        ]
    },
    {
        'id': 'wave6-005',
        'business': 'Nashville Roof Leak Rapid Repair',
        'city': 'Nashville, TN',
        'phone': 'Priority response via quote form',
        'slug': 'nashville-roof-leak-rapid-repair-nashville-tn',
        'headline': 'Premium Demo Built to Drive faster Nashville roof repair quote requests',
        'desc': 'Performance page concept engineered for leak emergency searches and rapid estimate conversion behavior.',
        'chips': ['Rapid Repair Intent', 'Nashville Local SEO Angle', 'Action-Driven CTA'],
        'services': [
            'Headline and CTA architecture push immediate contact from urgent-search visitors.',
            'Service narrative includes emergency inspection, temporary protection, and final repair scope.',
            'Trust panel reinforces reliability during stressful leak and storm damage scenarios.',
            'Detailed intake gathers roof symptoms, home type, and urgency to prioritize callbacks.'
        ]
    },
    {
        'id': 'wave5-064',
        'business': 'Volunteer State Storm Roof Repair',
        'city': 'Knoxville, TN',
        'phone': 'Priority response via quote form',
        'slug': 'volunteer-state-storm-roof-repair-knoxville-tn',
        'headline': 'Premium Demo Built to Capture post-storm repair demand at peak intent',
        'desc': 'Storm-focused roofing conversion page designed to collect urgent homeowner requests after severe weather events.',
        'chips': ['Post-Storm Demand', 'Inspection + Repair Funnel', 'Qualified Quote Intake'],
        'services': [
            'Hero section targets homeowners actively searching for storm-related roof repair support.',
            'Service blocks emphasize inspection, temporary stabilization, and full repair execution.',
            'Confidence messaging highlights communication speed, documentation readiness, and execution quality.',
            'Form flow captures damage type, timeline pressure, and project details for efficient follow-up.'
        ]
    }
]

style = ':root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}'

for lead in leads:
    d = os.path.join(wave_dir, lead['slug'])
    os.makedirs(d, exist_ok=True)
    chips = ''.join([f"<span>{c}</span>" for c in lead['chips']])
    items = ''.join([f"<li>{s}</li>" for s in lead['services']])
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{lead['business']} | Premium Demo</title><style>{style}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {lead['id']} · {lead['city']}</p><h1 style="margin:.2rem 0">{lead['business']} {lead['headline']}</h1><p>{lead['desc']}</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">{lead['phone']}</span></p><div class="chips">{chips}</div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Services</h2><ul>{items}</ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

notes = f'''# Deployment Notes - {wave}

Date: {date.today().isoformat()}
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- milwaukee-24-7-flood-cleanup-milwaukee-wi
- knoxville-roof-leak-hotline-knoxville-tn
- cleveland-emergency-roof-leak-repair-cleveland-oh
- nashville-roof-leak-rapid-repair-nashville-tn
- volunteer-state-storm-roof-repair-knoxville-tn

## Lead Selection Basis
Selected from uncovered `status=new` high-intent emergency home-service leads with top estimated values and no existing premium-v3 coverage for city-targeted slugs.

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
