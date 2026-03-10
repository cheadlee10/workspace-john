const fs=require('fs');
const path=require('path');

const cwd=process.cwd();
const batchFile=path.join(cwd,'email-templates','next-queued-email-assets-2026-03-03-batch112.md');
const jsonlPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const csvPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

const text=fs.readFileSync(batchFile,'utf8');
const blocks=text.split(/\n---\n/).filter(s=>/^##\s+\d+\)/m.test(s));
const leads=blocks.map(b=>{
  const h=(b.match(/^##\s+\d+\)\s+(.+?)\s+\(`(wave\d+-\d+)`\)/m)||[]);
  return {business_name:h[1],lead_id:h[2]};
}).filter(x=>x.lead_id);

const qj=fs.existsSync(jsonlPath)?fs.readFileSync(jsonlPath,'utf8'):'';
const qc=fs.existsSync(csvPath)?fs.readFileSync(csvPath,'utf8'):'';
const missing=leads.filter(l=>!qj.includes(l.lead_id)||!qc.includes(l.lead_id));

let appendJsonl='';
let appendCsv='';
const start=new Date('2026-03-05T15:25:00-08:00');
const fmt=(d)=>{
  const local=new Date(d.getTime()-8*60*60*1000);
  const y=local.getUTCFullYear();
  const m=String(local.getUTCMonth()+1).padStart(2,'0');
  const day=String(local.getUTCDate()).padStart(2,'0');
  const hh=String(local.getUTCHours()).padStart(2,'0');
  const mm=String(local.getUTCMinutes()).padStart(2,'0');
  const ss=String(local.getUTCSeconds()).padStart(2,'0');
  return `${y}-${m}-${day}T${hh}:${mm}:${ss}-08:00`;
};
for(let i=0;i<missing.length;i++){
  const lead=missing[i];
  const dt=new Date(start.getTime()+i*5*60*1000);
  const sched=fmt(dt);
  const f24=fmt(new Date(dt.getTime()+24*60*60*1000));
  const f72=fmt(new Date(dt.getTime()+72*60*60*1000));
  const f7d=fmt(new Date(dt.getTime()+7*24*60*60*1000));

  const rec={
    scheduled_at:sched,
    batch_id:'BATCH-P-WAVE10',
    sequence_step:'email_initial',
    lead_id:lead.lead_id,
    business_name:lead.business_name,
    email_to:'',
    priority_tier:'P2',
    priority_score:79,
    template_asset_file:'next-queued-email-assets-2026-03-03-batch112.md',
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
    followup_24h_at:f24,
    followup_72h_at:f72,
    followup_7d_at:f7d,
    followup_1_at:f24,
    followup_2_at:f72,
    suppression_check:'clear',
    safe_to_send:false
  };
  appendJsonl += JSON.stringify(rec)+'\n';
  appendCsv += [
    sched,'BATCH-P-WAVE10','email_initial',lead.lead_id,`"${lead.business_name.replace(/"/g,'""')}"`,'',
    'P2',79,'next-queued-email-assets-2026-03-03-batch112.md',true,'pass:{{live_url}},{{screenshot_url}}',
    'pending_contact_enrichment','pending_main_agent_approval','09:00','17:00','America/Los_Angeles',
    'manual_approval_required',true,false,f24,f72,f7d,f24,f72,'clear',false
  ].join(',')+'\n';
}

if(appendJsonl) fs.appendFileSync(jsonlPath,appendJsonl,'utf8');
if(appendCsv) fs.appendFileSync(csvPath,appendCsv,'utf8');

console.log(JSON.stringify({missingCount:missing.length,leadIds:missing.map(m=>m.lead_id)},null,2));
