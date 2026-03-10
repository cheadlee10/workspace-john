const fs=require('fs');
const path=require('path');

const root=process.cwd();
const qjPath=path.join(root,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const qcPath=path.join(root,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

const leads=[
  ['nosite-091','Cleanup Services'],
  ['nosite-092','All Smooth Lawn Maintenance & Landscaping'],
  ['nosite-093','Miami Cooling'],
  ['nosite-094','All County Service and Repair'],
  ['nosite-095','HVAC Denver'],
  ['nosite-096','Enersave HVAC'],
  ['nosite-097','All Temperatures Controlled'],
  ['nosite-098','Reliant Heating and Air Conditioning'],
  ['nosite-099','Denver Heating & Air Conditioning'],
  ['nosite-100','All Weather HVAC'],
];
const names=new Map(leads);

const pad=n=>String(n).padStart(2,'0');
function fmt(y,m,d,h,mi){return `${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(mi)}:00-08:00`;}
function scheduleFor(i){const min=30+i*5;return {h:9+Math.floor(min/60),m:min%60};}
function withOffsetDay(h,m,dayOffset,hourOffset=0){
  const base=new Date(Date.UTC(2026,2,4,h+8,m)); // local -08 reference to UTC
  base.setUTCDate(base.getUTCDate()+dayOffset);
  base.setUTCHours(base.getUTCHours()+hourOffset);
  return `${base.getUTCFullYear()}-${pad(base.getUTCMonth()+1)}-${pad(base.getUTCDate())}T${pad(base.getUTCHours()-8)}:${pad(base.getUTCMinutes())}:00-08:00`;
}

// JSONL repair
const jLines=fs.readFileSync(qjPath,'utf8').split(/\r?\n/);
let jCount=0;
for(let idx=0;idx<leads.length;idx++){
  const [id,business_name]=leads[idx];
  const tm=scheduleFor(idx);
  for(let i=0;i<jLines.length;i++){
    if(!jLines[i].includes(`"lead_id":"${id}"`)) continue;
    const o=JSON.parse(jLines[i]);
    o.scheduled_at=fmt(2026,3,4,tm.h,tm.m);
    o.followup_24h_at=fmt(2026,3,5,tm.h,tm.m);
    o.followup_72h_at=fmt(2026,3,7,tm.h,tm.m);
    o.followup_7d_at=fmt(2026,3,11,tm.h+1,tm.m);
    o.followup_1_at=o.followup_24h_at;
    o.followup_2_at=o.followup_72h_at;
    o.business_name=business_name;
    jLines[i]=JSON.stringify(o);
    jCount++;
    break;
  }
}
fs.writeFileSync(qjPath,jLines.join('\n'));

// CSV repair
const cLines=fs.readFileSync(qcPath,'utf8').split(/\r?\n/);
let cCount=0;
for(let li=0;li<cLines.length;li++){
  const m=cLines[li].match(/"(nosite-\d{3})"/);
  if(!m) continue;
  const id=m[1];
  const idx=leads.findIndex(x=>x[0]===id);
  if(idx===-1) continue;
  const tm=scheduleFor(idx);
  const business_name=names.get(id);
  const scheduled=fmt(2026,3,4,tm.h,tm.m);
  const f24=fmt(2026,3,5,tm.h,tm.m);
  const f72=fmt(2026,3,7,tm.h,tm.m);
  const f7d=fmt(2026,3,11,tm.h+1,tm.m);
  const fields=[
    scheduled,'BATCH-K-WAVE6','1','email',id,business_name,'','queued','pending','none','none','no','no','no','none','no',
    '09:00','17:00','America/Los_Angeles','manual_approval_required','true','false',f24,f72,f7d,
    'asset=next-queued-email-assets-2026-03-03-batch103.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment'
  ];
  cLines[li]=fields.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',');
  cCount++;
}
fs.writeFileSync(qcPath,cLines.join('\n'));
console.log('repaired jsonl',jCount,'csv',cCount);