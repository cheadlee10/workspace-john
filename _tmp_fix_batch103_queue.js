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

const qj=fs.readFileSync(qjPath,'utf8');
const qc=fs.readFileSync(qcPath,'utf8');
const missing=leads.filter(([id])=>!qj.includes(id) && !qc.includes(id));
if(!missing.length){
  console.log('No missing IDs for batch103');
  process.exit(0);
}

const start=new Date('2026-03-04T09:30:00-08:00');
const jsonlLines=[];
const csvLines=[];
for(let i=0;i<missing.length;i++){
  const [lead_id,business_name]=missing[i];
  const scheduled=new Date(start.getTime()+i*5*60*1000);
  const f24=new Date(scheduled.getTime()+24*60*60*1000);
  const f72=new Date(scheduled.getTime()+72*60*60*1000);
  const f7d=new Date(scheduled.getTime()+7*24*60*60*1000+60*60*1000);
  const iso=(d)=>d.toISOString().replace('.000Z','-08:00').replace('Z','-08:00');
  const rec={
    scheduled_at:iso(scheduled),
    batch_id:'BATCH-K-WAVE6',
    sequence_step:'email_initial',
    lead_id,
    business_name,
    email_to:'',
    priority_tier:'P2',
    priority_score:79,
    template_asset_file:'next-queued-email-assets-2026-03-03-batch103.md',
    asset_ready:true,
    placeholder_check:'pass:{{live_url}},{{screenshot_url}}',
    verification_status:'pending_contact_enrichment',
    approval_status:'pending_main_agent_approval',
    send_window_start:'09:00',
    send_window_end:'17:00',
    timezone:'America/Los_Angeles',
    gate_lock:'manual_approval_required',
    dispatch_lock:true,
    auto_send_enabled:false,
    followup_24h_at:iso(f24),
    followup_72h_at:iso(f72),
    followup_7d_at:iso(f7d),
    followup_1_at:iso(f24),
    followup_2_at:iso(f72),
    suppression_check:'clear',
    safe_to_send:false
  };
  jsonlLines.push(JSON.stringify(rec));
  const fields=[
    rec.scheduled_at,rec.batch_id,'1','email',rec.lead_id,rec.business_name,'','queued','pending','none','none','no','no','no','none','no',
    rec.send_window_start,rec.send_window_end,rec.timezone,rec.gate_lock,'true','false',
    rec.followup_24h_at,rec.followup_72h_at,rec.followup_7d_at,
    `asset=${rec.template_asset_file};approval=${rec.approval_status};verification=${rec.verification_status}`
  ];
  csvLines.push(fields.map(v=>`"${String(v).replaceAll('"','""')}"`).join(','));
}

fs.appendFileSync(qjPath,'\n'+jsonlLines.join('\n'));
fs.appendFileSync(qcPath,'\n'+csvLines.join('\n'));
console.log('Appended',missing.length,'records:',missing.map(m=>m[0]).join(', '));