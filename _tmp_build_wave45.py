from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave45")
root.mkdir(parents=True, exist_ok=True)

sites = [
    (
        "hydroforce-cleaning-restoration-chicago-il",
        "HydroForce Cleaning & Restoration",
        "Chicago, IL",
        "Water/Fire/Mold Restoration",
        "(630) 835-0862",
        [
            "24/7 emergency CTA for water, fire, and mold incidents with rapid dispatch positioning",
            "Service blocks for water extraction, structural drying, mold remediation, and smoke odor removal",
            "Trust section highlighting insurance coordination, certified technicians, and documented job updates",
            "Lead form captures loss type, affected rooms, and urgency to pre-qualify high-value restoration calls",
        ],
    ),
    (
        "shelby-roofing-exteriors-arnold-mo",
        "Shelby Roofing & Exteriors",
        "Arnold, MO",
        "Roofing & Exterior Renovation",
        "(636) 942-2300",
        [
            "Emergency storm-damage CTA with fast inspection scheduling and leak triage messaging",
            "Service sections for roof repair, full replacement, siding, gutters, and insurance-claim support",
            "Credibility stack emphasizing licensed crews, workmanship warranty, and photo-based estimates",
            "Quote intake form captures roof type, issue severity, and preferred inspection window",
        ],
    ),
    (
        "joes-roofing-reno-nv",
        "Joe's Roofing",
        "Reno, NV",
        "Roofing",
        "(775) 369-1919",
        [
            "Conversion hero focused on leak response, wind damage fixes, and seasonal roof protection",
            "Service modules for asphalt shingle repair, reroofing, flashing fixes, and preventative maintenance",
            "Trust signals for local experience, transparent scope reviews, and clean job-site standards",
            "Form flow collects problem location, property type, and callback priority for faster close rates",
        ],
    ),
    (
        "mp-plumbing-co-clackamas-or",
        "MP Plumbing Co",
        "Clackamas, OR",
        "Residential & Commercial Plumbing",
        "(503) 664-9473",
        [
            "High-intent plumbing CTA for same-day response on leaks, clogs, and fixture failures",
            "Service sections for drain clearing, water heater service, repipes, and commercial plumbing calls",
            "Authority strip highlights licensed plumbers, upfront pricing, and workmanship-backed repairs",
            "Lead form captures service address, issue category, and urgency to improve first-call resolution",
        ],
    ),
    (
        "u-s-plumbing-clayton-nc",
        "U.S. Plumbing",
        "Clayton, NC",
        "Plumbing",
        "(919) 300-1563",
        [
            "Local conversion hero with free-estimate CTA and emergency plumbing callout positioning",
            "Service blocks for leak repair, sewer line diagnostics, fixture installs, and pressure troubleshooting",
            "Trust-first section reinforcing insured service, punctual arrivals, and no-surprise quote policy",
            "Detailed quote form gathers issue symptoms, property details, and best callback timeframe",
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

notes = """# Premium V3 Wave 45 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave45`
Pages built: 5

## Included demos
1. `hydroforce-cleaning-restoration-chicago-il`
2. `shelby-roofing-exteriors-arnold-mo`
3. `joes-roofing-reno-nv`
4. `mp-plumbing-co-clackamas-or`
5. `u-s-plumbing-clayton-nc`

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
- Contact emails were unavailable for this lead set; phone-first CTA used on all pages.
"""

(root / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")
print("done")
