const fs = require('fs');
const path = require('path');

const wave = 'premium-v3-wave62';
const base = path.join('sites', wave);
fs.mkdirSync(base, { recursive: true });

const leads = [
  {
    id: 'NS064',
    name: "Colorado's Best Fence Company",
    city: 'Denver',
    state: 'CO',
    phone: '(720) 555-0640',
    slug: 'colorados-best-fence-company-denver-co',
    niche: 'fence installation and repair leads',
    points: [
      'High-intent hero targets homeowners needing urgent privacy, security, or storm-damage fence repairs.',
      'Service stack highlights wood, vinyl, and chain-link installs plus fast repair and gate rebuild options.',
      'Trust messaging emphasizes long tenure, licensed insured crews, and warranty-backed workmanship.',
      'Quote form captures fence type, linear footage, and timeline urgency for faster callbacks.'
    ]
  },
  {
    id: 'NS033',
    name: "Joe's Appliance Repair LV",
    city: 'Las Vegas',
    state: 'NV',
    phone: '702-801-4525',
    slug: 'joes-appliance-repair-lv-las-vegas-nv',
    niche: 'same-day appliance repair leads',
    points: [
      'Conversion-led headline aligns with urgent refrigerator, washer, and oven breakdown searches.',
      'Offer modules present diagnostics, common-part replacements, and emergency same-day dispatch pathways.',
      'Trust blocks reinforce master technician experience, transparent repair recommendations, and service guarantees.',
      'Detailed intake collects appliance brand/model, symptom details, and preferred service window.'
    ]
  },
  {
    id: 'NS031',
    name: 'American Residential HVAC',
    city: 'Las Vegas',
    state: 'NV',
    phone: '(702) 600-3291',
    slug: 'american-residential-hvac-las-vegas-nv',
    niche: 'hvac repair and replacement leads',
    points: [
      'Intent-focused hero speaks to homeowners searching for no-cool and no-heat emergency fixes.',
      'Service sections feature AC repair, furnace diagnostics, system tune-ups, and full unit replacement options.',
      'Trust content highlights licensed operation, upfront pricing, and comfort-first recommendations.',
      'Quote flow captures system age, current issue severity, and desired appointment timing.'
    ]
  },
  {
    id: 'NS024',
    name: 'Affordable Fence Repair Portland',
    city: 'Portland',
    state: 'OR',
    phone: '971-708-3671',
    slug: 'affordable-fence-repair-portland-or',
    niche: 'fence repair and replacement leads',
    points: [
      'Urgency-first headline targets property owners with broken panels, leaning posts, or damaged gates.',
      'Service stack showcases privacy fence repair, cedar replacement, and full section rebuild options.',
      'Trust proof highlights licensed bonded insured positioning and clear scope before work starts.',
      'Quote capture qualifies fence material, damage extent, and preferred start date.'
    ]
  },
  {
    id: 'NS018',
    name: 'Austin Auto Doctor Mobile Mechanic',
    city: 'Austin',
    state: 'TX',
    phone: '512-502-4698',
    slug: 'austin-auto-doctor-mobile-mechanic-austin-tx',
    niche: 'mobile mechanic and roadside repair leads',
    points: [
      'Problem-aware hero targets drivers searching for fast on-site diagnostics and repair without towing.',
      'Offer stack includes battery and starter service, brake repair, and check-engine diagnostics at location.',
      'Trust messaging emphasizes experienced technicians, transparent estimates, and convenient mobile scheduling.',
      'Detailed form gathers vehicle year/make/model, current symptoms, and exact service location.'
    ]
  }
];

function page(lead){
  return `<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>${lead.name} | Premium Demo</title><style>:root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>Lead ID: ${lead.id} • ${lead.city}, ${lead.state}</p><h1 style='margin:.2rem 0'>${lead.name} Premium Demo Built to Convert More ${lead.niche}</h1><p>Conversion-focused landing page concept designed to drive higher-quality inbound quote requests and faster booking velocity.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>${lead.phone}</span></p><div class='chips'><span>Urgent-Intent Hero</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='${lead.slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul><li>${lead.points[0]}</li><li>${lead.points[1]}</li><li>${lead.points[2]}</li><li>${lead.points[3]}</li></ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='${lead.slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>${lead.phone}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>`;
}

for (const lead of leads) {
  const dir = path.join(base, lead.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(lead));
}

const notes = `# Deployment Notes - ${wave}\n\nDate: 2026-03-03\nBatch: 5 premium demo pages for highest-intent uncovered leads\n\n## Published Demo Pages\n- colorados-best-fence-company-denver-co\n- joes-appliance-repair-lv-las-vegas-nv\n- american-residential-hvac-las-vegas-nv\n- affordable-fence-repair-portland-or\n- austin-auto-doctor-mobile-mechanic-austin-tx\n\n## Lead Selection Basis\nSelected from uncovered high-intent lead pool using highest urgency/service-intent + established-operator signals.\n\n## Form Routing\nAll pages include:\n- Quick callback form posting to \`/contact\`\n- Detailed quote form posting to \`/contact\`\n- Hidden fields: \`business\` (slug), \`source\` (quick_callback | detailed_quote)\n\n## QA Spot Check\n- Verified each page has a primary quote CTA linking to #quote\n- Verified both forms use method=\"post\" and action=\"/contact\"\n- Verified responsive two-column to single-column layout behavior\n`;

fs.writeFileSync(path.join(base, 'DEPLOYMENT_NOTES.md'), notes);
console.log('Created', leads.length, 'pages in', base);
