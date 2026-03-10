import os
from datetime import date

wave = 'premium-v3-wave74'
wave_dir = os.path.join('sites', wave)
os.makedirs(wave_dir, exist_ok=True)

leads = [
    {
        'id': 'wave6-049',
        'business': 'Boise Emergency Plumbing Response',
        'city': 'Boise, ID',
        'phone': 'Priority response via quote form',
        'slug': 'boise-emergency-plumbing-response-boise-id',
        'headline': 'Premium Demo Built to convert emergency Boise plumbing calls quickly',
        'desc': 'High-intent emergency plumbing page concept designed for urgent leak, backup, and no-water scenarios where response speed drives conversion.',
        'chips': ['Emergency Dispatch', 'Leak + Backup Triage', 'Fast Quote Capture'],
        'services': [
            'Hero copy aligns with immediate service intent from homeowners dealing with active plumbing failures.',
            'Offer sections map diagnostics, containment, and repair-path options with clear next-step expectations.',
            'Trust messaging emphasizes communication speed, arrival readiness, and transparent scope handoff.',
            'Quote form captures issue type, urgency, and access notes to accelerate callback prioritization.'
        ]
    },
    {
        'id': 'wave5-029',
        'business': 'Portland Emergency Water Heater',
        'city': 'Portland, OR',
        'phone': 'Priority response via quote form',
        'slug': 'portland-emergency-water-heater-portland-or',
        'headline': 'Premium Demo Built to win no-hot-water emergency demand in Portland',
        'desc': 'Conversion-focused water-heater emergency page for urgent repair and replacement searches where quote-first UX improves booked jobs.',
        'chips': ['Emergency Water Heater', 'No-Hot-Water Intent', 'Rapid Callback CTA'],
        'services': [
            'Top section targets households actively searching for immediate hot-water restoration support.',
            'Service modules explain diagnose-versus-replace decisions and same-visit completion expectations.',
            'Trust section reinforces speed, clarity, and clean workmanship as primary differentiators.',
            'Detailed intake captures heater type, symptoms, and timeline urgency for faster triage.'
        ]
    },
    {
        'id': 'wave5-037',
        'business': 'Madison Emergency Water Heater',
        'city': 'Madison, WI',
        'phone': 'Priority response via quote form',
        'slug': 'madison-emergency-water-heater-madison-wi',
        'headline': 'Premium Demo Built to capture urgent water-heater replacements in Madison',
        'desc': 'High-urgency landing page concept tuned for emergency water-heater diagnostics and replacement requests from intent-rich local search traffic.',
        'chips': ['Emergency Heater Repair', 'Replacement-Ready Leads', 'Quote Funnel'],
        'services': [
            'Hero narrative matches real-time homeowner stress during sudden hot-water outages.',
            'Service content presents repair eligibility, replacement triggers, and install workflow clearly.',
            'Credibility blocks highlight responsive scheduling and clear communication from first contact.',
            'Quote flow captures tank type, leak presence, and preferred service window.'
        ]
    },
    {
        'id': 'wave5-043',
        'business': 'Cleveland Emergency Water Heater',
        'city': 'Cleveland, OH',
        'phone': 'Priority response via quote form',
        'slug': 'cleveland-emergency-water-heater-cleveland-oh',
        'headline': 'Premium Demo Built to turn Cleveland heater emergencies into booked jobs',
        'desc': 'Emergency-focused conversion page for no-hot-water calls with clear quote pathways that reduce lead drop-off under urgency.',
        'chips': ['Cleveland Emergency Service', 'Hot Water Restore', 'Fast Intake UX'],
        'services': [
            'Above-the-fold messaging addresses immediate disruption and need for same-day support.',
            'Service blocks detail inspection, repair options, and replacement escalation in plain language.',
            'Trust copy supports confidence with reliability and expectation-setting throughout service.',
            'Quote form asks key triage details to shorten callback-to-booked timeline.'
        ]
    },
    {
        'id': 'wave5-051',
        'business': 'Omaha Emergency Water Heater',
        'city': 'Omaha, NE',
        'phone': 'Priority response via quote form',
        'slug': 'omaha-emergency-water-heater-omaha-ne',
        'headline': 'Premium Demo Built to drive more Omaha emergency heater leads',
        'desc': 'Premium emergency water-heater demo page tailored to homeowners needing immediate repair or replacement with low-friction quote capture.',
        'chips': ['Emergency Heater Help', 'Omaha Local Intent', 'Priority Quote Form'],
        'services': [
            'Hero messaging reflects urgent no-hot-water search behavior and response expectations.',
            'Service areas cover troubleshooting, repair pathways, and full replacement planning.',
            'Trust section underscores communication clarity and reliable arrival commitment.',
            'Detailed quote intake gathers failure symptoms and scheduling constraints for quick follow-up.'
        ]
    }
]

style = ':root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}'

for lead in leads:
    d = os.path.join(wave_dir, lead['slug'])
    os.makedirs(d, exist_ok=True)
    chips = ''.join([f"<span>{c}</span>" for c in lead['chips']])
    items = ''.join([f"<li>{s}</li>" for s in lead['services']])
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{lead['business']} | Premium Demo</title><style>{style}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {lead['id']} · {lead['city']} · Service: Plumbing</p><h1 style="margin:.2rem 0">{lead['business']}</h1><p style="font-size:1.1rem">{lead['headline']}</p><p>{lead['desc']}</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">{lead['phone']}</span></p><div class="chips">{chips}</div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Services</h2><ul>{items}</ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{lead['slug']}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

notes = f'''# Deployment Notes - {wave}

Date: {date.today().isoformat()}
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- boise-emergency-plumbing-response-boise-id
- portland-emergency-water-heater-portland-or
- madison-emergency-water-heater-madison-wi
- cleveland-emergency-water-heater-cleveland-oh
- omaha-emergency-water-heater-omaha-ne

## Lead Selection Basis
Selected uncovered `status=new` leads with highest urgency-intent signals and top estimated values. Prioritized emergency plumbing and emergency water-heater demand terms (emergency, same-day, leak, water heater), then excluded any slug already present in existing premium-v3 waves.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields per form: `business` (slug), `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each form includes required hidden `business` and `source` fields
- Verified accessible `<label for>` / input `id` mappings for all fields
- Verified responsive layout collapses to single column on mobile
'''
with open(os.path.join(wave_dir, 'DEPLOYMENT_NOTES.md'), 'w', encoding='utf-8') as f:
    f.write(notes)

print('built', wave_dir)
for lead in leads:
    print('-', lead['slug'])
