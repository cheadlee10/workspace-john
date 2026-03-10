from pathlib import Path

wave_dir = Path('sites/premium-v3-wave97')
wave_dir.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'lead_id': 'wave6-100',
        'business': 'East Valley Water Heater Emergency',
        'city': 'Mesa, AZ',
        'service': 'Water Heater Repair',
        'est': 960,
        'slug': 'east-valley-water-heater-emergency-mesa-az',
        'tags': ['High Intent', 'Emergency Service', 'Water Heater Repair'],
    },
    {
        'lead_id': 'wave6-097',
        'business': 'Alamo City Emergency Plumbing Dispatch',
        'city': 'San Antonio, TX',
        'service': 'Plumbing',
        'est': 940,
        'slug': 'alamo-city-emergency-plumbing-dispatch-san-antonio-tx',
        'tags': ['High Intent', '24/7 Plumbing', 'Rapid Dispatch'],
    },
    {
        'lead_id': 'wave6-098',
        'business': 'San Antonio Sewer Backup Rescue',
        'city': 'San Antonio, TX',
        'service': 'Drain Cleaning',
        'est': 930,
        'slug': 'san-antonio-sewer-backup-rescue-san-antonio-tx',
        'tags': ['High Intent', 'Sewer Backup', 'Emergency Drain'],
    },
    {
        'lead_id': 'wave6-099',
        'business': 'Mesa No-Cool AC Repair Hotline',
        'city': 'Mesa, AZ',
        'service': 'HVAC',
        'est': 910,
        'slug': 'mesa-no-cool-ac-repair-hotline-mesa-az',
        'tags': ['High Intent', 'No Cool Calls', 'Same-Day HVAC'],
    },
    {
        'lead_id': 'wave6-103',
        'business': 'Louisville Emergency Electric Panel',
        'city': 'Louisville, KY',
        'service': 'Electrical',
        'est': 900,
        'slug': 'louisville-emergency-electric-panel-louisville-ky',
        'tags': ['High Intent', 'Panel Repair', 'Emergency Electrical'],
    },
]

base_css = """:root{--bg:#0a0f1f;--panel:#121a33;--text:#eaf0ff;--muted:#b8c4e4;--line:#2a3f73;--a:#5cc8ff;--b:#76ffbf}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top,#13244a,#0a0f1f 60%);color:var(--text)}.wrap{max-width:1100px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.25fr .95fr}.two{grid-template-columns:1fr 1fr}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}h1,h2{line-height:1.2}.meta{color:var(--muted);font-size:13px}.btn{display:inline-block;padding:12px 16px;border-radius:10px;font-weight:700;text-decoration:none}.pri{background:linear-gradient(90deg,var(--a),var(--b));color:#021023;border:none;cursor:pointer}.tag{display:inline-block;padding:6px 10px;border:1px solid #365089;background:#1a2850;border-radius:999px;margin:0 8px 8px 0;color:var(--muted);font-size:12px}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:11px;border-radius:8px;border:1px solid #39528f;background:#0e1730;color:var(--text)}textarea{min-height:100px}li{margin:8px 0}@media(max-width:860px){.hero,.two{grid-template-columns:1fr}}"""

for l in leads:
    tags_html = ''.join(f'<span class="tag">{t}</span>' for t in l['tags'])
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{l['business']} | {l['service']} Quote Demo</title><style>{base_css}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p class="meta">Lead ID: {l['lead_id']} | {l['city']} | {l['service']}</p><h1>{l['business']}</h1><p>Premium conversion demo tailored for {l['service'].lower()} buyers in {l['city']}.</p><p>Built to capture high-intent local traffic and turn quote requests into booked estimate calls.</p><p><a class="btn pri" href="#quote">Get My Quote</a></p><div>{tags_html}</div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{l['slug']}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input id="name" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="phone">Phone Number</label><input id="phone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid two" style="margin-top:12px"><section class="card"><h2 style="margin-top:0">Conversion Architecture</h2><ul><li>Urgency-aligned hero copy for high-intent {l['service'].lower()} searches in {l['city']}.</li><li>Dual conversion paths: quick callback form plus detailed quote request.</li><li>Trust-focused positioning for local homeowners and property managers.</li><li>All form submissions route to <code>/contact</code> with source attribution fields.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{l['slug']}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input id="qname" name="name" type="text" autocomplete="name" aria-label="Full Name" required/><label for="qphone">Phone Number</label><input id="qphone" name="phone" type="tel" autocomplete="tel" aria-label="Phone Number" required/><label for="details">Project details</label><textarea id="details" name="details" aria-label="Project details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p class="meta">Priority response via quote form. Demo form posts to secure contact intake endpoint.</p></section></div></div></body></html>'''
    d = wave_dir / l['slug']
    d.mkdir(exist_ok=True)
    (d / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 97 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for highest-intent uncovered leads under `sites/premium-v3-wave97/`.
Each page includes:
- Hero CTA linking to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden tracking fields (`business`, `source`) for intake attribution

## Lead selection method
Selected highest-intent uncovered records from `leads.jsonl` (`wave6-*` segment) sorted by `estimated_value`, then excluded any slug already present in `sites/premium-v3-wave*/`.

## Pages
1. `east-valley-water-heater-emergency-mesa-az` (Lead: wave6-100 | East Valley Water Heater Emergency | Mesa, AZ | Water Heater Repair | est $960)
2. `alamo-city-emergency-plumbing-dispatch-san-antonio-tx` (Lead: wave6-097 | Alamo City Emergency Plumbing Dispatch | San Antonio, TX | Plumbing | est $940)
3. `san-antonio-sewer-backup-rescue-san-antonio-tx` (Lead: wave6-098 | San Antonio Sewer Backup Rescue | San Antonio, TX | Drain Cleaning | est $930)
4. `mesa-no-cool-ac-repair-hotline-mesa-az` (Lead: wave6-099 | Mesa No-Cool AC Repair Hotline | Mesa, AZ | HVAC | est $910)
5. `louisville-emergency-electric-panel-louisville-ky` (Lead: wave6-103 | Louisville Emergency Electric Panel | Louisville, KY | Electrical | est $900)

## Deployment checks
- Verify each `index.html` renders correctly on mobile and desktop.
- Confirm both forms on each page POST to `/contact`.
- Confirm hidden `business` values exactly match folder slugs.
- Smoke test hero CTA jump to `#quote` on all pages.
"""

(wave_dir / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print('created', wave_dir)
