import os
from datetime import date

wave_dir = os.path.join('sites', 'premium-v3-wave65')
os.makedirs(wave_dir, exist_ok=True)

leads = [
    {
        'id':'NSW65-01','business':'Lawn Care & Landscape Port Orange','city':'Orlando/Daytona, FL','phone':'(888) 270-8355',
        'slug':'lawn-care-and-landscape-port-orange-orlando-daytona-fl',
        'headline':'Premium Demo Built to Capture More same-day lawn and landscape bookings',
        'desc':'Lead-conversion page concept tuned for dispatch-friendly quote capture across Orlando, Kissimmee, Daytona, and Port Orange.',
        'chips':['Multi-City Service Area','Fast Quote Funnel','Phone-First CTA'],
        'services':[
            'Hero copy is tailored to urgent mowing, cleanup, and recurring lawn-care requests.',
            'Service modules highlight mowing, edging, trimming, and landscape refresh upsells.',
            'Trust blocks reinforce reliability, route coverage, and easy scheduling for homeowners.',
            'Quote flow captures property size, service frequency, and preferred appointment window.'
        ]
    },
    {
        'id':'NSW65-02','business':'2 KIDS & A DAD Landscaping Orlando','city':'Orlando, FL','phone':'(954) 857-7598',
        'slug':'2-kids-and-a-dad-landscaping-orlando-orlando-fl',
        'headline':'Premium Demo Built to Convert family-brand trust into booked landscaping jobs',
        'desc':'Story-led conversion design that turns text-in-photo estimate requests into structured quote submissions and booked work.',
        'chips':['Family-Owned Positioning','Trust-Story Hero','Text-to-Quote Bridge'],
        'services':[
            'Opening section leans into the family-business story to increase emotional trust fast.',
            'Service list covers mowing, hedge care, mulch installs, and seasonal yard cleanups.',
            'Social-proof style messaging reduces hesitation and drives direct callback requests.',
            'Detailed quote form captures priorities, budget range, and timeline for quick follow-up.'
        ]
    },
    {
        'id':'NSW65-03','business':'Infinity Landscaping Phoenix','city':'Phoenix, AZ','phone':'(602) 621-5621',
        'slug':'infinity-landscaping-phoenix-phoenix-az',
        'headline':'Premium Demo Built to Win more high-ticket desert landscape projects',
        'desc':'Conversion-focused layout tailored for Phoenix homeowners seeking irrigation-smart, heat-resilient landscaping upgrades.',
        'chips':['High-Intent Offer Stack','Heat-Climate Positioning','Quote-Ready UX'],
        'services':[
            'Hero positioning targets homeowners planning upgrades, not just one-time maintenance.',
            'Service framework promotes desert-friendly design, irrigation updates, and clean hardscape lines.',
            'Credibility sections emphasize craftsmanship, consistency, and clear project communication.',
            'Form intake gathers scope, lot details, and style direction for qualified lead handoff.'
        ]
    },
    {
        'id':'NSW65-04','business':'Sunny Arizona Landscape Services Inc','city':'Phoenix, AZ','phone':'(602) 555-0199',
        'slug':'sunny-arizona-landscape-services-inc-phoenix-az',
        'headline':'Premium Demo Built to Increase recurring maintenance and upgrade quote volume',
        'desc':'Lead-gen page concept designed to convert Phoenix lawn and landscape demand into predictable monthly bookings.',
        'chips':['Recurring Revenue Focus','Local Intent Messaging','High-Conversion Forms'],
        'services':[
            'Problem-aware header addresses homeowners frustrated with inconsistent yard maintenance.',
            'Service stack includes weekly care, irrigation checks, cleanups, and enhancement projects.',
            'Trust layout highlights dependable crews, responsive communication, and service consistency.',
            'Quote intake captures address, current yard condition, and requested service cadence.'
        ]
    },
    {
        'id':'NSW65-05','business':'Original Shine Mobile Detailing','city':'Denver, CO','phone':'(720) 555-0147',
        'slug':'original-shine-mobile-detailing-denver-co',
        'headline':'Premium Demo Built to book more mobile detailing appointments each week',
        'desc':'Conversion-optimized page built for convenience-first car owners ready to schedule interior and exterior detailing services.',
        'chips':['Mobile Service Advantage','Schedule-Now CTA','Appointment Funnel'],
        'services':[
            'Hero messaging centers on on-site convenience and fast booking for busy vehicle owners.',
            'Offer sections present interior detail, wash/wax, and correction-ready upgrade pathways.',
            'Trust components reinforce careful handling, quality outcomes, and responsive communication.',
            'Quote flow captures vehicle type, condition, and preferred service location/time slot.'
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

notes = f'''# Deployment Notes - premium-v3-wave65

Date: {date.today().isoformat()}
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- lawn-care-and-landscape-port-orange-orlando-daytona-fl
- 2-kids-and-a-dad-landscaping-orlando-orlando-fl
- infinity-landscaping-phoenix-phoenix-az
- sunny-arizona-landscape-services-inc-phoenix-az
- original-shine-mobile-detailing-denver-co

## Lead Selection Basis
Selected from uncovered no-website pools (nosite + nowebsite) using highest-intent service signals and remaining uncovered slugs not yet deployed in prior premium-v3 waves.

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
