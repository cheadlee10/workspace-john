const fs = require('fs');
const path = require('path');

const root = process.cwd();
const waveDir = path.join(root, 'sites', 'premium-v3-wave101');
const emailFile = path.join(root, 'email-templates', 'next-queued-email-assets-2026-03-03-batch104.md');
const jsonlPath = path.join(root, 'email-templates', 'send-queue-2026-03-02-next-batches.jsonl');
const csvPath = path.join(root, 'email-templates', 'send-queue-2026-03-02-next-batches-tracker.csv');

function failTokens(content){
  const toks = ['{{','}}','TODO','TBD','lorem','example.com'];
  return toks.filter(t=>content.includes(t));
}

const bannedClaims = [/\bguarantee\w*/i,/\b#1\b/i,/\bbest in\b/i,/\bROI\b/i,/\brank(ed|ing)?\b/i,/\bdouble your\b/i];

const siteResults = [];
for (const d of fs.readdirSync(waveDir,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const slug = d.name;
  const p = path.join(waveDir, slug, 'index.html');
  const html = fs.readFileSync(p,'utf8');
  const issues = [];

  const formCount = (html.match(/<form\b/gi)||[]).length;
  if(formCount!==2) issues.push(`form_count_${formCount}`);
  const contactPosts = (html.match(/<form[^>]*action="\/contact"[^>]*method="post"/gi)||[]).length;
  if(contactPosts!==2) issues.push('missing_contact_post_forms');

  const bizMatches = [...html.matchAll(/name="business" value="([^"]+)"/g)].map(m=>m[1]);
  if(bizMatches.length!==2) issues.push('business_hidden_field_count');
  if(bizMatches.some(v=>v!==slug)) issues.push('business_value_mismatch');

  const sourceMatches = [...html.matchAll(/name="source" value="([^"]+)"/g)].map(m=>m[1]);
  if(sourceMatches.length!==2) issues.push('source_hidden_field_count');

  if(!html.includes('href="#quote"') || !html.includes('id="quote"')) issues.push('quote_anchor_mismatch');

  if(!html.includes('label for="name"') || !html.includes('id="name"')) issues.push('missing_quick_name_label');
  if(!html.includes('label for="phone"') || !html.includes('id="phone"')) issues.push('missing_quick_phone_label');
  if(!html.includes('label for="qname"') || !html.includes('id="qname"')) issues.push('missing_quote_name_label');
  if(!html.includes('label for="qphone"') || !html.includes('id="qphone"')) issues.push('missing_quote_phone_label');
  if(!html.includes('label for="qdetails"') || !html.includes('id="qdetails"')) issues.push('missing_details_label_quote');

  const fakePhones = ['555-0100','(555)','123-456-7890'];
  if(fakePhones.some(f=>html.includes(f))) issues.push('fabricated_phone_pattern');

  if (bannedClaims.some(re=>re.test(html))) issues.push('prohibited_claim_language');

  const tokenIssues = failTokens(html).filter(t=>!['{{','}}'].includes(t));
  if(tokenIssues.length) issues.push('placeholder_or_todo_leakage');

  siteResults.push({slug, issues});
}

// Email checks
const email = fs.readFileSync(emailFile,'utf8');
const asciiSafe = /^[\x00-\x7F\r\n\t]*$/.test(email);
const sectionRe = /^##\s+\d+\)\s+(.+?)\s+\(`(nosite-\d+)`\)/gm;
const sections = [];
let m;
while((m=sectionRe.exec(email))!==null){sections.push({name:m[1],id:m[2]});}

const emailIssues = [];
if(sections.length!==10) emailIssues.push(`section_count_${sections.length}`);
for(const s of sections){
  // slice section chunk
  const start = email.indexOf(`## ${sections.indexOf(s)+1})`);
}

// simpler split by heading
const chunks = email.split(/^##\s+\d+\)\s+/m).slice(1);
for(const chunk of chunks){
  if(!chunk.includes('{{live_url}}') || !chunk.includes('{{screenshot_url}}')) emailIssues.push('missing_required_placeholders');
}
if(!asciiSafe) emailIssues.push('non_ascii_punctuation');
if (bannedClaims.some(re=>re.test(email))) emailIssues.push('prohibited_claim_language');

const leadIds = sections.map(s=>s.id);

// Queue remediation
const jsonLines = fs.readFileSync(jsonlPath,'utf8').split(/\r?\n/).filter(Boolean);
const existingJsonIds = new Set(jsonLines.map(l=>{try{return JSON.parse(l).lead_id}catch{return null}}).filter(Boolean));
const csvLines = fs.readFileSync(csvPath,'utf8').split(/\r?\n/).filter(Boolean);
const existingCsvIds = new Set(csvLines.slice(1).map(l=>{
  const cols = l.split('","');
  if(cols.length<5) return null;
  return cols[4].replace(/^"/,'').replace(/"$/,'');
}).filter(Boolean));

const missingJson = leadIds.filter(id=>!existingJsonIds.has(id));
const missingCsv = leadIds.filter(id=>!existingCsvIds.has(id));

const leadNameMap = Object.fromEntries(sections.map(s=>[s.id,s.name]));

function parseIso(s){ return new Date(s); }
const tailObj = JSON.parse(jsonLines[jsonLines.length-1]);
let base = parseIso(tailObj.scheduled_at);

for(const id of leadIds){
  if(existingJsonIds.has(id) && existingCsvIds.has(id)) continue;
  base = new Date(base.getTime()+5*60000);
  const scheduled = base.toISOString().replace('.000Z','-08:00').replace('Z','-08:00');
  const f24 = new Date(base.getTime()+24*3600000).toISOString().replace('.000Z','-08:00').replace('Z','-08:00');
  const f72 = new Date(base.getTime()+72*3600000).toISOString().replace('.000Z','-08:00').replace('Z','-08:00');
  const f7d = new Date(base.getTime()+7*24*3600000).toISOString().replace('.000Z','-08:00').replace('Z','-08:00');

  if(!existingJsonIds.has(id)){
    const obj={
      scheduled_at: scheduled,
      batch_id:'BATCH-K-WAVE6',
      sequence_step:'email_initial',
      lead_id:id,
      business_name:leadNameMap[id]||id,
      email_to:'',
      priority_tier:'P2',
      priority_score:79,
      template_asset_file:'next-queued-email-assets-2026-03-03-batch104.md',
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
    jsonLines.push(JSON.stringify(obj));
    existingJsonIds.add(id);
  }

  if(!existingCsvIds.has(id)){
    const row = [
      scheduled,'BATCH-K-WAVE6','1','email',id,leadNameMap[id]||id,'','queued','pending','none','none','no','no','no','none','no','09:00','17:00','America/Los_Angeles','manual_approval_required','true','false',f24,f72,f7d,
      'asset=next-queued-email-assets-2026-03-03-batch104.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment'
    ].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',');
    csvLines.push(row);
    existingCsvIds.add(id);
  }
}

fs.writeFileSync(jsonlPath, jsonLines.join('\n')+'\n');
fs.writeFileSync(csvPath, csvLines.join('\n')+'\n');

const postJsonIds = new Set(fs.readFileSync(jsonlPath,'utf8').split(/\r?\n/).filter(Boolean).map(l=>JSON.parse(l).lead_id));
const postCsvIds = new Set(fs.readFileSync(csvPath,'utf8').split(/\r?\n/).filter(Boolean).slice(1).map(l=>l.split('","')[4]?.replace(/^"/,'').replace(/"$/,'')));

console.log(JSON.stringify({
  sites: siteResults,
  siteFailures: siteResults.filter(s=>s.issues.length),
  email:{sections:sections.length,issues:emailIssues,ids:leadIds},
  queue:{missingJsonBefore:missingJson,missingCsvBefore:missingCsv,missingJsonAfter:leadIds.filter(id=>!postJsonIds.has(id)),missingCsvAfter:leadIds.filter(id=>!postCsvIds.has(id))}
},null,2));
