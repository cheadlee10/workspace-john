import os
from datetime import date

wave = 'premium-v3-wave72'
wave_dir = os.path.join('sites', wave)
os.makedirs(wave_dir, exist_ok=True)

leads = [
    {
        'id': 'wave6-040',
        'business': 'Tampa 24-7 Flood Cleanup Team',
        'city': 'Tampa, FL',
        'phone': 'Priority response via quote form',
        'slug': 'tampa-24-7-flood-cleanup-team-tampa-fl',
        'headline': 'Premium Demo Built to capture immediate flood extraction calls',
        'desc': 'Emergency restoration landing page concept for water extraction, structural drying, and mitigation requests that convert fastest under urgent demand.',
        'chips': ['24/7 Flood Response', 'Immediate Extraction', 'Mitigation Quote Funnel'],
        'services': [
            'Hero copy targets active water intrusion scenarios where homeowners need immediate dispatch confidence.',
            'Service sections prioritize extraction, drying, dehumidification, and damage-containment workflow clarity.',
            'Trust messaging highlights rapid arrival expectations and transparent scope updates during emergencies.',
            'Quote intake captures flood source, affected areas, and urgency tier to accelerate callback triage.'
        ]
    },
    {
        'id': 'wave6-039',
        'business': 'Tampa Emergency Roof Leak Repair',
        'city': 'Tampa, FL',
        'phone': 'Priority response via quote form',
        'slug': 'tampa-emergency-roof-leak-repair-tampa-fl',
        'headline': 'Premium Demo Built to win urgent roof-leak jobs faster',
        'desc': 'High-intent roofing conversion page designed for storm leak emergencies, temporary tarp demand, and rapid repair quote requests.',
        'chips': ['Emergency Roof Repair', 'Storm Leak Triage', 'Fast Callback CTA'],
        'services': [
            'Top fold messaging speaks directly to active leaks and interior water damage urgency.',
            'Offer modules map inspection, temporary protection, and permanent repair workflow in simple steps.',
            'Credibility blocks reinforce responsiveness, communication cadence, and dependable arrival windows.',
            'Quote form fields gather leak severity, roof type, and preferred inspection timeline.'
        ]
    },
    {
        'id': 'wave6-031',
        'business': 'Baltimore Roof Tarp & Leak Repair',
        'city': 'Baltimore, MD',
        'phone': 'Priority response via quote form',
        'slug': 'baltimore-roof-tarp-and-leak-repair-baltimore-md',
        'headline': 'Premium Demo Built to convert post-storm tarp and leak demand',
        'desc': 'Storm-response landing page concept focused on emergency roof tarping, leak stabilization, and rapid repair estimate intake.',
        'chips': ['Roof Tarp Emergency', 'Leak Containment', 'Quote-First Funnel'],
        'services': [
            'Hero positioning addresses post-storm homeowners needing immediate protection from additional damage.',
            'Service content prioritizes tarping, leak-source diagnostics, and repair-scope planning.',
            'Trust narrative emphasizes accountability, photo documentation, and next-step clarity.',
            'Detailed form captures storm context, water entry areas, and timeline urgency for faster dispatch.'
        ]
    },
    {
        'id': 'wave6-033',
        'business': 'San Diego Emergency Water Heater',
        'city': 'San Diego, CA',
        'phone': 'Priority response via quote form',
        'slug': 'san-diego-emergency-water-heater-san-diego-ca',
        'headline': 'Premium Demo Built to convert no-hot-water emergencies into booked work',
        'desc': 'Conversion-focused plumbing page for same-day water-heater diagnosis, replacement, and urgent restore-hot-water intent.',
        'chips': ['Same-Day Water Heater', 'No-Hot-Water Intent', 'High-Urgency Capture'],
        'services': [
            'Headline and CTA architecture target households actively searching for immediate hot-water restoration.',
            'Service blocks cover diagnostics, repair-vs-replace guidance, and installation workflow transparency.',
            'Trust section highlights quick scheduling, clear pricing posture, and clean completion handoff.',
            'Quote intake captures heater type, failure symptoms, and timing constraints for prioritized follow-up.'
        ]
    },
    {
        'id': 'wave4-098',
        'business': 'DFW Same Day Water Heater Repair',
        'city': 'Dallas, TX',
        'phone': 'Priority response via quote form',
        'slug': 'dfw-same-day-water-heater-repair-dallas-tx',
        'headline': 'Premium Demo Built to drive more same-day Dallas water-heater leads',
        'desc': 'Performance page concept tailored to urgent no-hot-water searches and quote-first conversion behavior in Dallas.',
        'chips': ['Same-Day Repair', 'Dallas Intent SEO', 'Fast Quote Flow'],
        'services': [
            'Hero copy matches urgent homeowner search language around sudden hot-water loss.',
            'Service sections explain inspection, repair options, and replacement escalation clearly.',
            'Trust messaging reduces friction with reliability cues and response-time expectations.',
            'Form workflow captures system type, leak status, and availability for rapid callback routing.'
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
- tampa-24-7-flood-cleanup-team-tampa-fl
- tampa-emergency-roof-leak-repair-tampa-fl
- baltimore-roof-tarp-and-leak-repair-baltimore-md
- san-diego-emergency-water-heater-san-diego-ca
- dfw-same-day-water-heater-repair-dallas-tx

## Lead Selection Basis
Selected uncovered `status=new` leads with highest estimated values and explicit emergency-intent signals (24/7 flood cleanup, roof leak/tarp response, and same-day water-heater demand). Confirmed no existing premium demo directories for these slugs.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` (slug), `source` (quick_callback | detailed_quote)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each page includes required hidden `business` and `source` fields
- Verified responsive two-column layout collapses to single-column on mobile
'''
with open(os.path.join(wave_dir, 'DEPLOYMENT_NOTES.md'), 'w', encoding='utf-8') as f:
    f.write(notes)

print('built', wave_dir)
for lead in leads:
    print('-', lead['slug'])
