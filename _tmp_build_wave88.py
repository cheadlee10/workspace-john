from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave88")
root.mkdir(parents=True, exist_ok=True)

leads = [
    ("wave4-108", "Denver Same Day Drain & Sewer Pros", "Denver, CO", "Plumbing", "denver-same-day-drain-sewer-pros-denver-co", "drain clogs, sewer backups, and urgent plumbing dispatch"),
    ("wave4-109", "Orlando No-Cool AC Rescue", "Orlando, FL", "HVAC", "orlando-no-cool-ac-rescue-orlando-fl", "no-cooling emergencies and same-day AC recovery calls"),
    ("wave4-110", "Nashville Break-In Board Up & Glass", "Nashville, TN", "Glass Repair", "nashville-break-in-board-up-glass-nashville-tn", "break-in board-up response and rapid glass replacement requests"),
    ("wave4-111", "Charlotte Weekend Garage Door Rescue", "Charlotte, NC", "Garage Door Repair", "charlotte-weekend-garage-door-rescue-charlotte-nc", "stuck-door and broken-spring emergency repair demand"),
    ("wave5-057", "Boise Emergency Plumber Now", "Boise, ID", "Plumbing", "boise-emergency-plumber-now-boise-id", "24/7 emergency plumbing calls with immediate dispatch intent"),
]

css = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for lead_id, business, location, service, slug, intent in leads:
    city = location.split(",")[0].strip()
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>{business} | Premium Demo</title><style>{css}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: {lead_id} | {location} | Service: {service}</p><h1 style="margin:.2rem 0">{business}</h1><p style="font-size:1.1rem">Premium Demo Built to convert high-intent local service searches into booked calls</p><p>Conversion-first concept targeting {intent}, with streamlined messaging and dual form capture to shorten time-to-booking.</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">Priority response via quote form</span></p><div class="chips"><span>Emergency Intake</span><span>Fast Quote Capture</span><span>Priority Routing</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Conversion Sections</h2><ul><li>Headline and proof cues tuned for immediate local intent in {city}.</li><li>Service framing designed to reduce hesitation and drive faster submissions.</li><li>Simple trust and response-speed positioning for urgent homeowners.</li><li>Detailed form captures job context to support quicker dispatch triage.</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="{slug}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>Priority response via quote form<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>'''

    folder = root / slug
    folder.mkdir(exist_ok=True)
    (folder / "index.html").write_text(html, encoding="utf-8")

notes = '''# Premium V3 Wave 88 Deployment Notes

Generated: 2026-03-03

## Scope
Built 5 premium demo pages for uncovered high-intent leads.
Each page includes:
- Hero CTA to `#quote`
- Quick callback form posting to `/contact`
- Detailed quote form posting to `/contact`
- Hidden fields: `business` slug + `source` attribution

## Pages
1. `denver-same-day-drain-sewer-pros-denver-co` (wave4-108)
2. `orlando-no-cool-ac-rescue-orlando-fl` (wave4-109)
3. `nashville-break-in-board-up-glass-nashville-tn` (wave4-110)
4. `charlotte-weekend-garage-door-rescue-charlotte-nc` (wave4-111)
5. `boise-emergency-plumber-now-boise-id` (wave5-057)

## Suggested deploy check
- Verify each `index.html` renders and both forms POST to `/contact`.
- Confirm hidden `business` slug aligns with folder name for tracking.
- Smoke test CTA jump link to `#quote` on mobile + desktop.
'''

(root / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")
print("built wave88")
