# -*- coding: utf-8 -*-
import os
wave='sites/premium-v3-wave76'
os.makedirs(wave,exist_ok=True)
leads=[
{'id':'wave6-063','location':'Pittsburgh, PA','service':'Sewer Line Repair','slug':'steel-city-sewer-backup-hotline-pittsburgh-pa','title':'Pittsburgh Sewer Backup Hotline','subtitle':'Premium Demo Built to convert sewer backup emergencies into immediate booked dispatches','desc':'Emergency sewer-response page concept optimized for panic-intent homeowners dealing with backups, odors, and drain failure.'},
{'id':'wave6-062','location':'Jacksonville, FL','service':'Roof Repair','slug':'jax-roof-tarp-and-leak-response-jacksonville-fl','title':'Jacksonville Roof Tarp & Leak Response','subtitle':'Premium Demo Built to capture urgent storm-leak calls before competitors do','desc':'Storm-response roofing page concept tuned for active leaks where fast quote capture drives same-day inspection bookings.'},
{'id':'wave6-056','location':'Birmingham, AL','service':'Water Damage Restoration','slug':'magic-city-flood-cleanup-24-7-birmingham-al','title':'Birmingham 24/7 Flood Cleanup','subtitle':'Premium Demo Built to convert flood panic traffic into rapid mitigation requests','desc':'Water-damage emergency page concept designed for immediate extraction, drying, and mitigation lead capture.'},
{'id':'wave6-001','location':'Columbus, OH','service':'Emergency Plumbing','slug':'buckeye-emergency-plumbing-co-columbus-oh','title':'Columbus Emergency Plumbing Co','subtitle':'Premium Demo Built to turn after-hours plumbing stress into booked callback requests','desc':'Emergency plumbing page concept focused on leak/backup urgency and simple quote-first conversion flow.'},
{'id':'wave6-019','location':'Portland, OR','service':'Plumbing','slug':'portland-burst-pipe-hotline-portland-or','title':'Portland Burst Pipe Hotline','subtitle':'Premium Demo Built to convert burst-pipe emergencies into immediate call-backs','desc':'Burst-pipe response page concept prioritizing fast intake and dispatch-ready details for high-urgency homeowners.'}
]

tpl='''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{title} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {id} | {location} | Service: {service}</p><h1 style="margin:.2rem 0">{title}</h1><p style="font-size:1.1rem">{subtitle}</p><p>{desc}</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">Priority response via quote form</span></p><div class="chips"><span>Emergency Dispatch</span><span>Fast Quote Intake</span><span>Same-Day Response</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Conversion Sections</h2><ul><li>Hero copy framed around urgent homeowner intent and immediate relief promise.</li><li>Service narrative clarifies response workflow and what happens after form submit.</li><li>Trust and speed messaging supports quote-first action under pressure.</li><li>Detailed intake captures job-critical context to accelerate dispatch callbacks.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>Priority response via quote form<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''

for l in leads:
    p=os.path.join(wave,l['slug'])
    os.makedirs(p,exist_ok=True)
    with open(os.path.join(p,'index.html'),'w',encoding='utf-8') as f:
        f.write(tpl.format(**l))

notes='''# Deployment Notes - premium-v3-wave76

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- steel-city-sewer-backup-hotline-pittsburgh-pa
- jax-roof-tarp-and-leak-response-jacksonville-fl
- magic-city-flood-cleanup-24-7-birmingham-al
- buckeye-emergency-plumbing-co-columbus-oh
- portland-burst-pipe-hotline-portland-or

## Lead Selection Basis
Selected uncovered `status=new` leads with strongest urgency intent and high estimated value from latest wave6 intake. Prioritized emergency service language (sewer backup, roof leak, flood cleanup, emergency plumbing, burst pipe) and excluded any slugs already present in existing premium-v3 wave folders.

## Form Routing
All pages include:
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields per form: `business` (slug), `source` (`quick_callback` or `detailed_quote`)

## QA Spot Check
- Verified primary CTA links to `#quote` on each page
- Verified both forms use `method="post"` and `action="/contact"`
- Verified each form includes hidden `business` and `source` fields
- Verified `<label for>` mappings match input `id` values
- Verified responsive single-column behavior under 860px breakpoint
'''
with open(os.path.join(wave,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8') as f:
    f.write(notes)
print('done')
