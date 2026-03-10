from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave46")
root.mkdir(parents=True, exist_ok=True)

sites = [
    (
        "colorados-best-fence-company-denver-co",
        "Colorado's Best Fence Company",
        "Denver, CO",
        "Fence Installation & Repair",
        "(720) 000-0000",
        [
            "Hero section built around 25+ years of operation with family-owned trust positioning and warranty-focused CTA",
            "Service modules for wood, vinyl, chain-link, and privacy fence installs plus storm and post replacement repairs",
            "Credibility stack featuring licensed/insured messaging, 10-year workmanship confidence, and local project portfolio prompts",
            "Quote intake captures fence type, linear footage estimate, property constraints, and preferred install timeline",
        ],
    ),
    (
        "joe-s-appliance-repair-lv-las-vegas-nv",
        "Joe's Appliance Repair LV",
        "Las Vegas, NV",
        "Appliance Repair",
        "702-801-4525",
        [
            "Conversion-first hero emphasizing master technician experience and rapid same-day diagnostics for major home appliances",
            "Service sections for refrigerator, washer/dryer, oven, and dishwasher repairs with clear symptom-based booking prompts",
            "Trust panel highlights 36 years of hands-on expertise, transparent troubleshooting, and repair-vs-replace guidance",
            "Lead form pre-qualifies by appliance type, failure symptoms, and urgency to improve callback close rates",
        ],
    ),
    (
        "dunn-rite-roofing-houston-houston-tx",
        "Dunn-Rite Roofing Houston",
        "Houston, TX",
        "Residential & Commercial Roofing",
        "877-537-3317",
        [
            "Storm and leak emergency hero offer with inspection-first CTA and financing/coverage support messaging",
            "Service blocks for roof repair, full replacements, gutters, and flat-roof commercial systems",
            "Authority strip showcasing warranty-backed installs, licensed crews, and insurance-claim documentation workflow",
            "Detailed quote form captures roof type, leak severity, and inspection window for faster estimate turnaround",
        ],
    ),
    (
        "houston-roofing-repair-experts-houston-tx",
        "Houston Roofing Repair Experts",
        "Houston, TX",
        "Roofing Repair & Exterior Services",
        "832-300-9947",
        [
            "Lead-focused hero tailored to active leaks and wind damage with immediate callback promise",
            "Service stack for shingles, gutters, soffits, flashing, and preventive maintenance packages",
            "Trust section emphasizing veteran roofers, clear scopes, photo updates, and clean jobsite completion",
            "Form funnel gathers issue location, property type, and timeline urgency to prioritize high-intent jobs",
        ],
    ),
    (
        "austin-auto-doctor-mobile-mechanic-austin-tx",
        "Austin Auto Doctor Mobile Mechanic",
        "Austin, TX",
        "Mobile Auto Repair",
        "512-502-4698",
        [
            "Mobile-first hero built for urgent no-start and breakdown scenarios with on-site diagnostic CTA",
            "Service modules covering brakes, battery/charging, starter issues, tune-ups, and check-engine diagnostics",
            "Trust proof highlights 20+ years experience, transparent parts/labor communication, and metro-wide dispatch",
            "Quote form captures vehicle year/make/model, symptoms, and location to speed scheduling accuracy",
        ],
    ),
]

css = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for slug, name, city, svc, phone, bullets in sites:
    d = root / slug
    d.mkdir(parents=True, exist_ok=True)
    lis = "".join([f"<li>{b}</li>" for b in bullets])
    html = f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{name} | Premium Demo</title><style>{css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{city}</p><h1 style='margin:.2rem 0'>{name} Premium Demo Built to Convert More {svc} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{phone}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{phone}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    (d / "index.html").write_text(html, encoding="utf-8")

notes = """# Premium V3 Wave 46 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave46`
Pages built: 5

## Included demos
1. `colorados-best-fence-company-denver-co` (NS064)
2. `joe-s-appliance-repair-lv-las-vegas-nv` (NS033)
3. `dunn-rite-roofing-houston-houston-tx` (NS044)
4. `houston-roofing-repair-experts-houston-tx` (NS045)
5. `austin-auto-doctor-mobile-mechanic-austin-tx` (NS018)

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm lead routing/notification maps new business slugs to outreach records.
- Smoke test both forms per page after deploy.

## Blockers / risks
- No live endpoint verification was performed in this build pass (static artifact only).
- CRM/back-end slug mapping for new leads is not validated here; requires integration check post-deploy.
- Some sourced leads are phone-first and may require phone normalization at intake.
"""

(root / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")
print("done")
