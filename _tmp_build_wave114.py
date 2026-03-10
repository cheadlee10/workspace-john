from pathlib import Path

root=Path(r"C:/Users/chead/.openclaw/workspace-john")
wave=root/'sites'/'premium-v3-wave114'
wave.mkdir(parents=True,exist_ok=True)

leads=[
    {
        'id':'gpass-us-458','business':'Best Termite & Pest Control','location':'Tampa, FL','service':'Pest Control',
        'slug':'best-termite-pest-control-tampa-fl','value':920,'priority':84
    },
    {
        'id':'gpass-us-393','business':'American Home Water & Air','location':'Phoenix, AZ','service':'HVAC/Plumbing',
        'slug':'american-home-water-air-phoenix-az','value':990,'priority':83
    },
    {
        'id':'gpass-us-467','business':'ServiceOne Air Conditioning & Plumbing','location':'Orlando, FL','service':'Plumbing/HVAC',
        'slug':'serviceone-air-conditioning-plumbing-orlando-fl','value':990,'priority':83
    },
    {
        'id':'gpass-us-289','business':"Will's Plumbing & Testing Service",'location':'San Antonio, TX','service':'Plumbing',
        'slug':'will-s-plumbing-testing-service-san-antonio-tx','value':980,'priority':83
    },
    {
        'id':'gpass-us-403','business':'Cooper Heating & Cooling','location':'Denver, CO','service':'HVAC',
        'slug':'cooper-heating-cooling-denver-co','value':970,'priority':83
    },
]

tpl='''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{business} | Premium Local Quote Demo</title><style>:root{{--bg:#050b1c;--panel:#0e1a33;--text:#eef4ff;--muted:#afc1e8;--line:#2a4275;--a:#74d6ff;--b:#8bffcb}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#14254a,#050b1c 64%);color:var(--text)}}.wrap{{max-width:1140px;margin:auto;padding:32px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.2fr 1fr}}.two{{grid-template-columns:1fr 1fr}}.card{{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px}}.meta{{color:var(--muted);font-size:13px}}.btn{{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:800;text-decoration:none}}.pri{{background:linear-gradient(90deg,var(--a),var(--b));color:#071323;border:none;cursor:pointer}}.tag{{display:inline-block;padding:6px 10px;border:1px solid #385592;background:#16284b;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:11px;border-radius:8px;border:1px solid #3b5690;background:#0a1731;color:var(--text)}}textarea{{min-height:110px}}li{{margin:8px 0}}code{{color:#9ae0ff}}@media(max-width:860px){{.hero,.two{{grid-template-columns:1fr}}}}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {id} | {location} | {service}</p><h1>{business}</h1><p>Premium conversion-focused landing page concept for {service_lc} buyers in {location}.</p><p>Designed to convert urgent, high-intent local traffic into qualified quote requests.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div><span class="tag">Premium Demo</span><span class="tag">Quote Funnel</span><span class="tag">{service}</span></div></section><section class="card"><h2 style="margin-top:0">Fast Quote Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="fast_quote_callback"/><label for="name-fast">Full Name</label><input id="name-fast" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone-fast">Phone Number</label><input id="phone-fast" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="email-fast">Email</label><input id="email-fast" name="email" type="email" autocomplete="email" aria-label="Email" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">What This Demo Includes</h2><ul><li>Intent-matched headline and CTA sequence for local ready-to-buy searchers.</li><li>Two quote capture forms with hidden attribution tags for source tracking.</li><li>Trust-forward layout blocks built for homeowners and property managers.</li><li>All lead forms post directly to <code>/contact</code> for intake routing.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Project Quote</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="detailed_project_quote"/><label for="name-quote">Full Name</label><input id="name-quote" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone-quote">Phone Number</label><input id="phone-quote" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="details-quote">Project details</label><textarea id="details-quote" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send Quote Request</button></form><p class="meta">Demo quote pipeline endpoint: <code>/contact</code></p></section></div></div></body></html>'''

for l in leads:
    d=wave/l['slug']
    d.mkdir(parents=True,exist_ok=True)
    html=tpl.format(**l,service_lc=l['service'].lower())
    (d/'index.html').write_text(html,encoding='utf-8')

notes='''# Premium V3 Wave 114 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave114/`.
Each page includes:
- Hero quote CTA linking to `#quote`
- Fast quote callback form POSTing to `/contact`
- Detailed quote request form POSTing to `/contact`
- Hidden tracking fields (`business`, `source`) for attribution

## Lead selection method
Ranked uncovered leads from `outreach_queue.jsonl` by `priority_score` then `estimated_value`, slugified as `client + location`, and excluded any slugs already present in `sites/premium-v3-wave*/`.

## Pages
1. `best-termite-pest-control-tampa-fl` (Lead: gpass-us-458 | Best Termite & Pest Control | Tampa, FL | Pest Control | priority 84 | est $920)
2. `american-home-water-air-phoenix-az` (Lead: gpass-us-393 | American Home Water & Air | Phoenix, AZ | HVAC/Plumbing | priority 83 | est $990)
3. `serviceone-air-conditioning-plumbing-orlando-fl` (Lead: gpass-us-467 | ServiceOne Air Conditioning & Plumbing | Orlando, FL | Plumbing/HVAC | priority 83 | est $990)
4. `will-s-plumbing-testing-service-san-antonio-tx` (Lead: gpass-us-289 | Will's Plumbing & Testing Service | San Antonio, TX | Plumbing | priority 83 | est $980)
5. `cooper-heating-cooling-denver-co` (Lead: gpass-us-403 | Cooper Heating & Cooling | Denver, CO | HVAC | priority 83 | est $970)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
'''
(wave/'DEPLOYMENT_NOTES.md').write_text(notes,encoding='utf-8')

print('built',wave)
