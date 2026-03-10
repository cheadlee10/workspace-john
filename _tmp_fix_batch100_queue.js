const fs=require('fs');
const path=require('path');

const cwd=process.cwd();
const ids=['nosite-061','nosite-062','nosite-063','nosite-064','nosite-065','nosite-066','nosite-067','nosite-068','nosite-069','nosite-070'];
const leadsPath=path.join(cwd,'leads.jsonl');
const leads=fs.readFileSync(leadsPath,'utf8').split(/\r?\n/).filter(Boolean).map(l=>{try{return JSON.parse(l)}catch{return null}}).filter(Boolean);
const leadMap=new Map(leads.map(l=>[l.id,l]));

const jsonlPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const csvPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

const jsonl=fs.readFileSync(jsonlPath,'utf8');
const csv=fs.readFileSync(csvPath,'utf8');

const base = new Date('2026-03-04T07:00:00-08:00');
let addJsonl=[];
let addCsv=[];

for(let i=0;i<ids.length;i++){
  const id=ids[i];
  if(jsonl.includes(`\"lead_id\": \"${id}\"`) || csv.includes(`,${id},`)) continue;
  const lead=leadMap.get(id)||{};
  const business=lead.client || lead.business || lead.name || 'Unknown Business';
  const dt=new Date(base.getTime()+i*5*60*1000);
  const fmt=(d)=>{
    const p=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(d).reduce((a,x)=>{a[x.type]=x.value;return a;},{});
    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}-08:00`;
  };
  const iso=fmt(dt);
  const f1=fmt(new Date(dt.getTime()+24*60*60*1000));
  const f2=fmt(new Date(dt.getTime()+72*60*60*1000));
  const f3=fmt(new Date(dt.getTime()+7*24*60*60*1000));

  addJsonl.push(JSON.stringify({
    scheduled_at: iso,
    batch_id: 'BATCH-K-WAVE6',
    sequence_step: 'email_initial',
    lead_id: id,
    business_name: business,
    email_to: '',
    priority_tier: 'P2',
    priority_score: 79,
    template_asset_file: 'next-queued-email-assets-2026-03-03-batch100.md',
    asset_ready: true,
    placeholder_check: 'pass:{{live_url}},{{screenshot_url}}',
    verification_status: 'pending_contact_enrichment',
    approval_status: 'pending_main_agent_approval',
    send_window_start: '09:00',
    send_window_end: '17:00',
    timezone: 'America/Los_Angeles',
    gate_lock: 'manual_approval_required',
    dispatch_lock: true,
    auto_send_enabled: false,
    followup_24h_at: f1,
    followup_72h_at: f2,
    followup_7d_at: f3,
    followup_1_at: f1,
    followup_2_at: f2,
    suppression_check: 'clear',
    safe_to_send: false
  }));

  addCsv.push(`${iso},BATCH-K-WAVE6,1,email,${id},${String(business).replace(/,/g,' ')},,queued,pending,none,none,no,no,no,none,no,09:00,17:00,America/Los_Angeles,manual_approval_required,true,false,${f1},${f2},${f3},asset=next-queued-email-assets-2026-03-03-batch100.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment`);
}

if(addJsonl.length){
  fs.appendFileSync(jsonlPath,'\n'+addJsonl.join('\n')+'\n');
}
if(addCsv.length){
  fs.appendFileSync(csvPath,'\n'+addCsv.join('\n')+'\n');
}
console.log(JSON.stringify({added:addJsonl.length,idsAdded:ids.filter(id=>addJsonl.some(j=>j.includes(`\"lead_id\":\"${id}\"`)||j.includes(`\"lead_id\": \"${id}\"`)) )},null,2));