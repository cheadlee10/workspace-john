const fs=require('fs');
const path=require('path');

const cwd=process.cwd();
const wave='premium-v3-wave98';
const batchFile='next-queued-email-assets-2026-03-03-batch101.md';
const waveDir=path.join(cwd,'sites',wave);
const emailPath=path.join(cwd,'email-templates',batchFile);
const jsonlPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const csvPath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

const slugs=fs.readdirSync(waveDir,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
const site=[];
for(const slug of slugs){
  const c=fs.readFileSync(path.join(waveDir,slug,'index.html'),'utf8');
  const issues=[];
  const forms=[...c.matchAll(/<form\b[^>]*>/gi)].map(m=>m[0]);
  if(forms.length!==2) issues.push(`form_count_${forms.length}`);
  for(const fm of forms){
    if(!/action=['\"]\/contact['\"]/i.test(fm) || !/method=['\"]post['\"]/i.test(fm)) issues.push('form_action_method');
  }
  if((c.match(/name=['\"]business['\"]/g)||[]).length<2) issues.push('business_hidden_count');
  if((c.match(/name=['\"]source['\"]/g)||[]).length<2) issues.push('source_hidden_count');
  const bizVals=[...c.matchAll(/name=['\"]business['\"][^>]*value=['\"]([^'\"]+)['\"]/g)].map(m=>m[1]);
  if(!bizVals.every(v=>v===slug)) issues.push('business_slug_mismatch');
  if(!(/href=['\"]#quote['\"]/i.test(c) && /id=['\"]quote['\"]/i.test(c))) issues.push('quote_anchor');
  if(/\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com/i.test(c)) issues.push('placeholder_token');
  const visible=c.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ');
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(visible)) issues.push('non_compliant_claim');
  if(!(/<label[^>]+for=['\"]name['\"]/i.test(c) && /id=['\"]name['\"]/i.test(c))) issues.push('missing_name_label_quick');
  if(!(/<label[^>]+for=['\"]phone['\"]/i.test(c) && /id=['\"]phone['\"]/i.test(c))) issues.push('missing_phone_label_quick');
  if(!(/<label[^>]+for=['\"]qname['\"]/i.test(c) && /id=['\"]qname['\"]/i.test(c))) issues.push('missing_name_label_quote');
  if(!(/<label[^>]+for=['\"]qphone['\"]/i.test(c) && /id=['\"]qphone['\"]/i.test(c))) issues.push('missing_phone_label_quote');
  if(!(/<label[^>]+for=['\"]details['\"]/i.test(c) && /id=['\"]details['\"]/i.test(c))) issues.push('missing_details_label_quote');
  site.push({slug,issues});
}

const e=fs.readFileSync(emailPath,'utf8');
const sections=e.split(/\n---\n/).filter(s=>/^##\s+\d+\)/m.test(s));
const emailIssues=[];
const ids=[...new Set([...e.matchAll(/`(nosite-\d+)`/g)].map(m=>m[1]))];
sections.forEach((sec,idx)=>{
  const id=(sec.match(/`(nosite-\d+)`/)||[])[1]||`section_${idx+1}`;
  const body=(sec.split('**Email body**')[1]||'');
  if(!body.includes('{{live_url}}')) emailIssues.push({id,issue:'missing_live_url'});
  if(!body.includes('{{screenshot_url}}')) emailIssues.push({id,issue:'missing_screenshot_url'});
  if(/[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]/.test(sec)) emailIssues.push({id,issue:'non_ascii_punctuation'});
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(sec)) emailIssues.push({id,issue:'non_compliant_claim'});
});

const jlines=fs.readFileSync(jsonlPath,'utf8').trimEnd().split('\n').filter(Boolean);
const existingJsonIds=new Set();
let maxSched='';
for(const line of jlines){
  try{
    const obj=JSON.parse(line);
    if(obj.template_asset_file===batchFile) existingJsonIds.add(obj.lead_id);
    if(!maxSched || obj.scheduled_at>maxSched) maxSched=obj.scheduled_at;
  }catch{}
}
const missingJsonl=ids.filter(id=>!existingJsonIds.has(id));

const csvText=fs.readFileSync(csvPath,'utf8').trimEnd();
const csvLines=csvText.split('\n');
const existingCsvIds=new Set();
for(const line of csvLines.slice(1)){
  const m=line.match(/"(nosite-\d+)"/);
  if(m && line.includes(`asset=${batchFile}`)) existingCsvIds.add(m[1]);
}
const missingCsv=ids.filter(id=>!existingCsvIds.has(id));

let fixed=false;
if(missingJsonl.length||missingCsv.length){
  const leadsMap=new Map();
  const leadsLines=fs.readFileSync(path.join(cwd,'leads.jsonl'),'utf8').trim().split('\n').filter(Boolean);
  for(const line of leadsLines){
    try{const o=JSON.parse(line); if(o.id) leadsMap.set(o.id,o);}catch{}
  }
  function fmtLocal(d){
    const pad=n=>String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00-08:00`;
  }
  const start=new Date(maxSched);
  const toAdd=ids.filter(id=>missingJsonl.includes(id)||missingCsv.includes(id));
  let minute=5;
  const appendJson=[];
  const appendCsv=[];
  for(const id of toAdd){
    const lead=leadsMap.get(id)||{};
    const t=new Date(start.getTime()+minute*60000);
    const iso=fmtLocal(t);
    const f24=fmtLocal(new Date(t.getTime()+24*3600*1000));
    const f72=fmtLocal(new Date(t.getTime()+72*3600*1000));
    const f7d=fmtLocal(new Date(t.getTime()+7*24*3600*1000));
    const business=(lead.business_name||lead.client||'').replace(/"/g,'');
    const row={scheduled_at:iso,batch_id:'BATCH-K-WAVE6',sequence_step:'email_initial',lead_id:id,business_name:business,email_to:'',priority_tier:'P2',priority_score:79,template_asset_file:batchFile,asset_ready:true,placeholder_check:'pass:{{live_url}},{{screenshot_url}}',verification_status:'pending_contact_enrichment',approval_status:'pending_main_agent_approval',send_window_start:'09:00',send_window_end:'17:00',timezone:'America/Los_Angeles',gate_lock:'manual_approval_required',dispatch_lock:true,auto_send_enabled:false,followup_24h_at:f24,followup_72h_at:f72,followup_7d_at:f7d,followup_1_at:f24,followup_2_at:f72,suppression_check:'clear',safe_to_send:false};
    appendJson.push(JSON.stringify(row));
    appendCsv.push(`"${iso}","BATCH-K-WAVE6","1","email","${id}","${business}","","queued","pending","none","none","no","no","no","none","no","09:00","17:00","America/Los_Angeles","manual_approval_required","true","false","${f24}","${f72}","${f7d}","asset=${batchFile};approval=pending_main_agent_approval;verification=pending_contact_enrichment"`);
    minute+=5;
  }
  if(appendJson.length) fs.appendFileSync(jsonlPath,'\n'+appendJson.join('\n'));
  if(appendCsv.length) fs.appendFileSync(csvPath,'\n'+appendCsv.join('\n'));
  fixed=true;
}

// recheck linkage
const qj=fs.readFileSync(jsonlPath,'utf8');
const qc=fs.readFileSync(csvPath,'utf8');
const missingJsonlAfter=ids.filter(id=>!(qj.includes(`"lead_id":"${id}"`)&&qj.includes(`"template_asset_file":"${batchFile}"`)));
const missingCsvAfter=ids.filter(id=>!(qc.includes(`"${id}"`)&&qc.includes(`asset=${batchFile}`)));

console.log(JSON.stringify({wave,batchFile,site,email:{sectionCount:sections.length,ids,emailIssues},queue:{missingJsonl,missingCsv,fixed,missingJsonlAfter,missingCsvAfter}},null,2));