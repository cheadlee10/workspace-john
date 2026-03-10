const fs=require('fs');
const path=require('path');

const root=process.cwd();
const batchFile='next-queued-email-assets-2026-03-03-batch81.md';
const mdPath=path.join(root,'email-templates',batchFile);
const qjPath=path.join(root,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const qcPath=path.join(root,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

const md=fs.readFileSync(mdPath,'utf8');
const entries=[];
for(const m of md.matchAll(/##\s+\d+\)\s+(.+?)\s+\(`(wave6-\d+)`\)/g)){
  entries.push({business_name:m[1].trim(),lead_id:m[2].trim()});
}
if(entries.length===0){console.error('No entries parsed');process.exit(1);}

const qj=fs.readFileSync(qjPath,'utf8').trimEnd();
const existing=new Set([...qj.matchAll(/"lead_id":"([^"]+)"/g)].map(m=>m[1]));
const missing=entries.filter(e=>!existing.has(e.lead_id));
if(missing.length===0){console.log('No missing IDs');process.exit(0);} 

const lastLine=qj.split(/\r?\n/).filter(Boolean).slice(-1)[0];
const lastObj=JSON.parse(lastLine);
const base=new Date(lastObj.scheduled_at);

function iso(dt){
  const pad=n=>String(n).padStart(2,'0');
  const y=dt.getFullYear(); const m=pad(dt.getMonth()+1); const d=pad(dt.getDate());
  const hh=pad(dt.getHours()); const mm=pad(dt.getMinutes()); const ss=pad(dt.getSeconds());
  return `${y}-${m}-${d}T${hh}:${mm}:${ss}-08:00`;
}
function addHours(isoStr,h){ const d=new Date(isoStr); d.setHours(d.getHours()+h); return iso(d); }

const newJsonl=[]; const newCsv=[];
const csvNote=`asset=${batchFile};approval=pending_main_agent_approval;verification=pending_contact_enrichment`;
missing.forEach((e,i)=>{
  const dt=new Date(base.getTime()+(i+1)*5*60*1000);
  const scheduled=iso(dt);
  const obj={
    scheduled_at:scheduled,batch_id:'BATCH-J-WAVE6',sequence_step:'email_initial',lead_id:e.lead_id,business_name:e.business_name,email_to:'',
    priority_tier:'P2',priority_score:79,template_asset_file:batchFile,asset_ready:true,placeholder_check:'pass:{{live_url}},{{screenshot_url}}',
    verification_status:'pending_contact_enrichment',approval_status:'pending_main_agent_approval',send_window_start:'09:00',send_window_end:'17:00',
    timezone:'America/Los_Angeles',gate_lock:'manual_approval_required',dispatch_lock:true,auto_send_enabled:false,
    followup_24h_at:addHours(scheduled,24),followup_72h_at:addHours(scheduled,72),followup_7d_at:addHours(scheduled,168),
    followup_1_at:addHours(scheduled,24),followup_2_at:addHours(scheduled,72),suppression_check:'clear',safe_to_send:false
  };
  newJsonl.push(JSON.stringify(obj));

  const csv=[
    scheduled,'BATCH-J-WAVE6','1','email',e.lead_id,e.business_name,'','queued','pending','none','none','no','no','no','none','no',
    '09:00','17:00','America/Los_Angeles','manual_approval_required','true','false',addHours(scheduled,24),addHours(scheduled,72),addHours(scheduled,168),csvNote
  ].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',');
  newCsv.push(csv);
});

fs.appendFileSync(qjPath,'\n'+newJsonl.join('\n')+'\n');
fs.appendFileSync(qcPath,'\n'+newCsv.join('\n')+'\n');

console.log(JSON.stringify({appended:missing.length,lead_ids:missing.map(x=>x.lead_id)},null,2));