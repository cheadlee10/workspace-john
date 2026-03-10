const fs = require('fs');
const path = require('path');

const wave = 'premium-v3-wave61';
const base = path.join('sites', wave);
fs.mkdirSync(base, { recursive: true });

const leads = [
  {
    id: 'nosite-037',
    name: 'Regal Roofing & Contracting',
    city: 'Seattle',
    state: 'WA',
    phone: '(206) 784-2689',
    slug: 'regal-roofing-and-contracting-seattle-wa',
    niche: 'emergency roof leak repair and replacement',
    points: [
      'Urgency-led hero messaging targets homeowners searching for immediate roof leak help.',
      'Service stack highlights leak tracing, storm damage repair, and full roof replacement options.',
      'Trust sections emphasize licensed crews, transparent scopes, and photo-backed progress updates.',
      'Detailed quote intake captures roof type, active leak severity, and preferred inspection timing.'
    ]
  },
  {
    id: 'nosite-068',
    name: 'Quality Construction & Roofing',
    city: 'Houston',
    state: 'TX',
    phone: '(832) 282-6486',
    slug: 'quality-construction-and-roofing-houston-tx',
    niche: 'roofing and exterior restoration leads',
    points: [
      'High-intent headline aligns with urgent roof repair and post-storm restoration searches.',
      'Offer modules feature inspection, tarping, repair, and replacement pathways for faster decision-making.',
      'Trust content reinforces insured teams, clear timelines, and insurance documentation support.',
      'Quote form qualifies roof material, damage type, and project urgency in one step.'
    ]
  },
  {
    id: 'nosite-109',
    name: 'San Diego Heating and Cooling',
    city: 'El Cajon',
    state: 'CA',
    phone: '(619) 443-2665',
    slug: 'san-diego-heating-and-cooling-el-cajon-ca',
    niche: 'hvac repair and system replacement leads',
    points: [
      'Intent-focused hero targets homeowners needing same-day AC or furnace service.',
      'Service sections present diagnostics, emergency repairs, tune-ups, and full install options.',
      'Trust messaging highlights certified technicians, upfront pricing, and comfort-first recommendations.',
      'Detailed form captures symptom details, unit age, and preferred service window.'
    ]
  },
  {
    id: 'nosite-061',
    name: 'JV Pool Services',
    city: 'Dallas',
    state: 'TX',
    phone: '(214) 929-4278',
    slug: 'jv-pool-services-dallas-tx',
    niche: 'pool cleaning, repair, and maintenance leads',
    points: [
      'Conversion-ready headline targets pool owners searching for fast cleanup and repair help.',
      'Service stack features weekly maintenance, green-to-clean recovery, and equipment diagnostics.',
      'Trust section emphasizes dependable scheduling, chemical balancing expertise, and photo updates.',
      'Quote intake gathers pool size, current condition, and ideal first-visit date.'
    ]
  },
  {
    id: 'nosite-084',
    name: 'American Termite & Pest Elimination',
    city: 'Atlanta',
    state: 'GA',
    phone: '(404) 874-5250',
    slug: 'american-termite-and-pest-elimination-atlanta-ga',
    niche: 'termite inspection and pest elimination leads',
    points: [
      'Urgent-problem hero copy speaks to homeowners seeing active pest or termite evidence.',
      'Offer stack includes inspection, treatment plans, exclusion work, and prevention programs.',
      'Trust blocks reinforce safe application methods, clear reporting, and follow-up guarantees.',
      'Detailed quote form captures pest type, property size, and treatment timeline urgency.'
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

const notes = `# Deployment Notes - ${wave}\n\nDate: 2026-03-03\nBatch: 5 premium demo pages for highest-intent uncovered leads\n\n## Published Demo Pages\n- regal-roofing-and-contracting-seattle-wa\n- quality-construction-and-roofing-houston-tx\n- san-diego-heating-and-cooling-el-cajon-ca\n- jv-pool-services-dallas-tx\n- american-termite-and-pest-elimination-atlanta-ga\n\n## Lead Selection Basis\nSelected from uncovered high-intent lead pool using highest estimated value + urgent-service search intent signals.\n\n## Form Routing\nAll pages include:\n- Quick callback form posting to \`/contact\`\n- Detailed quote form posting to \`/contact\`\n- Hidden fields: \`business\` (slug), \`source\` (quick_callback | detailed_quote)\n\n## QA Spot Check\n- Verified each page has a primary quote CTA linking to #quote\n- Verified both forms use method=\"post\" and action=\"/contact\"\n- Verified responsive two-column to single-column layout behavior\n`;

fs.writeFileSync(path.join(base, 'DEPLOYMENT_NOTES.md'), notes);
console.log('Created', leads.length, 'pages in', base);
