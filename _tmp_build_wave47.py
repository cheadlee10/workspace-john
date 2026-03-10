from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave47")
root.mkdir(parents=True, exist_ok=True)

sites = [
    (
        "san-diego-heating-and-cooling-el-cajon-ca",
        "San Diego Heating and Cooling",
        "El Cajon, CA",
        "HVAC Repair & Installation",
        "619-443-2665",
        [
            "Urgent-comfort hero messaging designed for no-cool/no-heat calls with same-day dispatch CTA",
            "Service sections for AC repair, furnace diagnostics, heat pump tune-ups, and full system replacements",
            "Trust layer featuring licensed technicians, transparent estimates, and warranty-backed workmanship",
            "Quote funnel captures system type, symptom details, and preferred service window to improve close speed",
        ],
    ),
    (
        "cedar-fencing-plus-portland-or",
        "Cedar Fencing Plus",
        "Portland, OR",
        "Fence Installation & Repair",
        "503-244-6216",
        [
            "Conversion-first hero focused on privacy, security, and curb-appeal upgrades with fast onsite estimate CTA",
            "Offer stack for cedar, vinyl, and chain-link installs plus gate repair and post reset services",
            "Credibility panel highlights local craftsmanship, clear timelines, and clean site completion standards",
            "Lead form qualifies project type, linear footage, and HOA/property constraints before callback",
        ],
    ),
    (
        "austin-s-custom-fencing-portland-or",
        "Austin's Custom Fencing",
        "Portland, OR",
        "Custom Fencing Solutions",
        "503-762-6010",
        [
            "Custom-design hero positioned around premium materials and tailored layouts for residential and light commercial jobs",
            "Service modules for privacy fences, decorative perimeter builds, and secure gate integration",
            "Trust section emphasizes craftsmanship photos, scope clarity, and predictable install communication",
            "Detailed quote capture requests style preference, property dimensions, and install timeline urgency",
        ],
    ),
    (
        "ace-fencing-las-vegas-nv",
        "Ace Fencing",
        "Las Vegas, NV",
        "Residential & Commercial Fencing",
        "702-568-8330",
        [
            "High-intent hero tailored for desert-weather durability with rapid estimate CTA for replacements and new installs",
            "Service blocks for wrought iron, vinyl, chain-link, security fencing, and gate automation options",
            "Authority strip features licensed-insured positioning, permit familiarity, and workmanship guarantees",
            "Form workflow captures fence material, property type, and urgency to prioritize ready-to-buy prospects",
        ],
    ),
    (
        "bachman-lawn-care-kansas-city-mo",
        "Bachman Lawn Care",
        "Kansas City, MO",
        "Lawn Care & Landscaping",
        "816-550-8823",
        [
            "Lead-focused hero built around weekly lawn care reliability and seasonal cleanup demand",
            "Service layout includes mowing, edging, mulch refresh, weed control, and landscape maintenance packages",
            "Trust messaging calls out dependable scheduling, photo-verified work quality, and straightforward pricing",
            "Quote form pre-qualifies lot size, recurring-service preference, and start date for faster booking",
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

notes = """# Premium V3 Wave 47 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave47`
Pages built: 5

## Included demos
1. `san-diego-heating-and-cooling-el-cajon-ca` (nosite-109)
2. `cedar-fencing-plus-portland-or` (nosite-101)
3. `austin-s-custom-fencing-portland-or` (nosite-102)
4. `ace-fencing-las-vegas-nv` (nosite-115)
5. `bachman-lawn-care-kansas-city-mo` (nosite-116)

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
- Phone formatting may need normalization for strict downstream validation rules.
"""

(root / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")
print("wave47 complete")
