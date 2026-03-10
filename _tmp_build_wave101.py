import os, html

wave='premium-v3-wave101'
base=os.path.join('sites',wave)
os.makedirs(base,exist_ok=True)

leads=[
    {"lead_id":"gpass-us-425","client":"Goettl Air Conditioning & Plumbing","location":"Las Vegas, NV","industry":"HVAC/Plumbing","priority":84,"est":1030,"slug":"goettl-air-conditioning-plumbing-las-vegas-nv"},
    {"lead_id":"gpass-us-401","client":"George Brazil Plumbing & Electrical","location":"Phoenix, AZ","industry":"Plumbing/Electrical","priority":84,"est":1020,"slug":"george-brazil-plumbing-electrical-phoenix-az"},
    {"lead_id":"gpass-us-406","client":"A#1 Air, Inc.","location":"Phoenix, AZ","industry":"HVAC","priority":84,"est":1020,"slug":"a-1-air-inc-phoenix-az"},
    {"lead_id":"gpass-us-432","client":"Roto-Rooter Plumbing & Water Cleanup","location":"Atlanta, GA","industry":"Plumbing/Drain/Sewer","priority":84,"est":1020,"slug":"roto-rooter-plumbing-water-cleanup-atlanta-ga"},
    {"lead_id":"gpass-us-426","client":"Barker & Sons Plumbing & Rooter","location":"Anaheim, CA","industry":"Plumbing","priority":84,"est":1010,"slug":"barker-sons-plumbing-rooter-anaheim-ca"},
]

css='''<style>:root{--bg:#0a0f1f;--panel:#121a33;--text:#eaf0ff;--muted:#b8c4e4;--line:#2a3f73;--a:#5cc8ff;--b:#76ffbf}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#13244a,#0a0f1f 60%);color:var(--text)}.wrap{max-width:1100px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.25fr .95fr}.two{grid-template-columns:1fr 1fr}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}h1,h2{line-height:1.2}.meta{color:var(--muted);font-size:13px}.btn{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:700;text-decoration:none}.pri{background:linear-gradient(90deg,var(--a),var(--b));color:#021023;border:none;cursor:pointer}.tag{display:inline-block;padding:6px 10px;border:1px solid #365089;background:#1a2850;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:11px;border-radius:8px;border:1px solid #39528f;background:#0e1730;color:var(--text)}textarea{min-height:100px}li{margin:8px 0}@media(max-width:860px){.hero,.two{grid-template-columns:1fr}}</style>'''

for l in leads:
    d=os.path.join(base,l['slug'])
    os.makedirs(d,exist_ok=True)
    title=f"{l['client']} | {l['industry']} Quote Demo"
    h=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{html.escape(title)}</title>{css}</head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {html.escape(l['lead_id'])} | {html.escape(l['location'])} | {html.escape(l['industry'])}</p><h1>{html.escape(l['client'])}</h1><p>Premium conversion demo tailored for {html.escape(l['industry'].lower())} buyers in {html.escape(l['location'])}.</p><p>Built to capture high-intent local traffic and turn quote requests into booked estimate calls.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div><span class="tag">High Intent</span><span class="tag">Local Buyer Demand</span><span class="tag">{html.escape(l['industry'])}</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input id="name" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone">Phone Number</label><input id="phone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">Conversion Architecture</h2><ul><li>Urgency-aligned hero copy for high-intent {html.escape(l['industry'].lower())} searches in {html.escape(l['location'])}.</li><li>Dual conversion paths: quick callback form plus detailed quote request.</li><li>Trust-focused positioning for local homeowners and property managers.</li><li>All form submissions route to <code>/contact</code> with source attribution fields.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{html.escape(l['slug'])}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input id="qname" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="qphone">Phone Number</label><input id="qphone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="details">Project details</label><textarea id="details" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p class="meta">Priority response via quote form. Demo form posts to secure contact intake endpoint.</p></section></div></div></body></html>'''
    with open(os.path.join(d,'index.html'),'w',encoding='utf-8') as f:
        f.write(h)

notes=[
"# Premium V3 Wave 101 Deployment Notes",
"",
"Generated: 2026-03-03",
"",
"## Scope",
"Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave101/`.",
"Each page includes:",
"- Hero CTA linking to `#quote`",
"- Quick callback form posting to `/contact`",
"- Detailed quote form posting to `/contact`",
"- Hidden tracking fields (`business`, `source`) for intake attribution",
"",
"## Lead selection method",
"Selected highest-intent uncovered records from `outreach_queue.jsonl` by sorting on `priority_score` and `estimated_value`, computing slug as `slugify(client + location)`, then excluding slugs already present in `sites/premium-v3-wave*/`.",
"",
"## Pages",
]
for i,l in enumerate(leads,1):
    notes.append(f"{i}. `{l['slug']}` (Lead: {l['lead_id']} | {l['client']} | {l['location']} | {l['industry']} | priority {l['priority']} | est ${l['est']})")

notes += [
"",
"## Deployment checks",
"- Verify each `index.html` renders correctly on mobile and desktop.",
"- Confirm both forms on each page POST to `/contact`.",
"- Confirm hidden `business` values exactly match folder slugs.",
"- Smoke test hero CTA jump to `#quote` on all pages.",
]
with open(os.path.join(base,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8') as f:
    f.write('\n'.join(notes)+"\n")

print('created',base)
for l in leads: print(l['slug'])
