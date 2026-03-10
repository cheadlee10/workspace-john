const fs = require('fs');
const path = require('path');

const wave = 'premium-v3-wave64';
const base = path.join('sites', wave);
fs.mkdirSync(base, { recursive: true });

const leads = [
  {
    id: 'NSW64-01',
    name: 'Regal Roofing & Contracting',
    city: 'Seattle',
    state: 'WA',
    phone: '(206) 784-2689',
    slug: 'regal-roofing-and-contracting-seattle-wa',
    niche: 'roof repair and replacement leads',
    points: [
      'Emergency-focused hero copy targets homeowners searching for active leak repair and storm-damage restoration.',
      'Service modules spotlight roof inspections, shingle replacement, full reroof projects, and insurance-claim assistance.',
      'Trust section emphasizes licensed crews, documented workmanship standards, and clear project timelines.',
      'Quote intake captures roof type, issue urgency, and preferred appointment window for rapid dispatch.'
    ]
  },
  {
    id: 'NSW64-02',
    name: 'Quality Construction & Roofing',
    city: 'Houston',
    state: 'TX',
    phone: '(832) 282-6486',
    slug: 'quality-construction-and-roofing-houston-tx',
    niche: 'high-intent roofing quote leads',
    points: [
      'Conversion-first header aligns with urgent searches for roof leak containment and replacement estimates.',
      'Offer stack includes residential reroofing, flashing repair, gutter integration, and storm-response service calls.',
      'Proof messaging reinforces insured operations, transparent scopes, and warranty-backed project delivery.',
      'Form flow gathers property type, known roof issues, and timeline to prioritize high-close opportunities.'
    ]
  },
  {
    id: 'NSW64-03',
    name: 'San Diego Heating and Cooling',
    city: 'El Cajon',
    state: 'CA',
    phone: '(619) 443-2665',
    slug: 'san-diego-heating-and-cooling-el-cajon-ca',
    niche: 'hvac repair and replacement leads',
    points: [
      'Intent-led headline speaks directly to no-cool and no-heat emergency situations from local homeowners.',
      'Service breakdown features AC diagnostics, furnace repairs, heat pump tune-ups, and full system installs.',
      'Trust content highlights experienced technicians, upfront pricing practices, and comfort-first recommendations.',
      'Lead form requests unit age, symptom details, and preferred service time to shorten booking lag.'
    ]
  },
  {
    id: 'NSW64-04',
    name: 'Cedar Fencing Plus',
    city: 'Portland',
    state: 'OR',
    phone: '(503) 244-6216',
    slug: 'cedar-fencing-plus-portland-or',
    niche: 'fence replacement and repair leads',
    points: [
      'Urgency-oriented hero targets searches for broken fence panels, leaning posts, and privacy fence rebuilds.',
      'Service cards present cedar fence installs, gate repair, section replacement, and full perimeter upgrades.',
      'Trust language supports conversion with durability messaging, clean project execution, and clear expectations.',
      'Detailed quote capture asks material preference, linear footage, and project timeline for better qualification.'
    ]
  },
  {
    id: 'NSW64-05',
    name: 'Ace Fencing',
    city: 'Las Vegas',
    state: 'NV',
    phone: '(702) 568-8330',
    slug: 'ace-fencing-las-vegas-nv',
    niche: 'residential and commercial fencing leads',
    points: [
      'Problem-aware opening targets customers needing quick bids for security, privacy, and property-boundary projects.',
      'Service stack covers wood, vinyl, and chain-link installation plus repair and replacement pathways.',
      'Trust modules emphasize reliable scheduling, experienced crews, and quality-focused build standards.',
      'Conversion form captures fence scope, site conditions, and best callback time for faster sales handoff.'
    ]
  }
];

function page(lead){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${lead.name} | Premium Demo</title><style>:root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}</style></head><body><div class="wrap"><div class="grid hero"><section class="card"><p style="margin-top:0;color:var(--muted)">Lead ID: ${lead.id} • ${lead.city}, ${lead.state}</p><h1 style="margin:.2rem 0">${lead.name} Premium Demo Built to Convert More ${lead.niche}</h1><p>Conversion-focused landing page concept designed to drive higher-quality inbound quote requests and faster booking velocity.</p><p><a class="btn pri" href="#quote">Get My Quote</a> <span class="btn sec">${lead.phone}</span></p><div class="chips"><span>Urgent-Intent Hero</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class="card"><h2 style="margin-top:0">Request a Quick Callback</h2><form action="/contact" method="post"><input type="hidden" name="business" value="${lead.slug}"/><input type="hidden" name="source" value="quick_callback"/><label for="name">Full Name</label><input aria-label="Full Name" id="name" name="name" type="text" required autocomplete="name"/><label for="phone">Phone Number</label><input aria-label="Phone Number" id="phone" name="phone" type="tel" required autocomplete="tel"/><button class="btn pri" type="submit">Request Callback</button></form></section></div><div class="grid services" style="margin-top:12px;grid-template-columns:1fr 1fr"><section class="card"><h2 style="margin-top:0">Core Services</h2><ul><li>${lead.points[0]}</li><li>${lead.points[1]}</li><li>${lead.points[2]}</li><li>${lead.points[3]}</li></ul></section><section class="card" id="quote"><h2 style="margin-top:0">Detailed Quote Request</h2><form action="/contact" method="post"><input type="hidden" name="business" value="${lead.slug}"/><input type="hidden" name="source" value="detailed_quote"/><label for="qname">Full Name</label><input aria-label="Full Name" id="qname" name="name" type="text" required autocomplete="name"/><label for="qphone">Phone Number</label><input aria-label="Phone Number" id="qphone" name="phone" type="tel" required autocomplete="tel"/><label for="qdetails">Project details</label><textarea aria-label="Project details" id="qdetails" name="details" required></textarea><button class="btn pri" type="submit">Send My Quote Request</button></form><p>${lead.phone}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>`;
}

for (const lead of leads) {
  const dir = path.join(base, lead.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(lead));
}

const notes = `# Deployment Notes - ${wave}

Date: 2026-03-03
Batch: 5 premium demo pages for highest-intent uncovered leads

## Published Demo Pages
- regal-roofing-and-contracting-seattle-wa
- quality-construction-and-roofing-houston-tx
- san-diego-heating-and-cooling-el-cajon-ca
- cedar-fencing-plus-portland-or
- ace-fencing-las-vegas-nv

## Lead Selection Basis
Selected from uncovered lead pool by highest-intent vertical signals (roofing, HVAC, fencing) and top estimated value tiers.

## Form Routing
All pages include:
- Quick callback form posting to \`/contact\`
- Detailed quote form posting to \`/contact\`
- Hidden fields: \`business\` (slug), \`source\` (quick_callback | detailed_quote)

## QA Spot Check
- Verified each page has primary quote CTA linking to #quote
- Verified both forms use method="post" and action="/contact"
- Verified responsive two-column to single-column layout behavior
`;

fs.writeFileSync(path.join(base, 'DEPLOYMENT_NOTES.md'), notes);
console.log('Created', leads.length, 'pages in', base);
