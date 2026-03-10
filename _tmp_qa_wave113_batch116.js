const fs=require('fs');
const path=require('path');

const cwd=process.cwd();
const wave='113';
const batch='116';
const waveDir=path.join(cwd,'sites',`premium-v3-wave${wave}`);
const batchFile=path.join(cwd,'email-templates',`next-queued-email-assets-2026-03-03-batch${batch}.md`);
const queueJsonl=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const queueCsv=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

function hasLabelForInput(html,id){
  const esc=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp(`<label[^>]*for=["']${esc}["'][^>]*>`,`i`);
  return re.test(html);
}
function visibleText(html){
  return html.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ');
}

const siteResults=[];
const slugs=fs.readdirSync(waveDir,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
for(const slug of slugs){
  const p=path.join(waveDir,slug,'index.html');
  const c=fs.readFileSync(p,'utf8');
  const issues=[];

  if(/\{\{[^}]+\}\}|\bTODO\b|\bTBD\b|lorem ipsum|example\.com/i.test(c)) issues.push('placeholder_token');
  const forms=[...c.matchAll(/<form\b[^>]*>/gi)].map(m=>m[0]);
  if(forms.length!==2) issues.push(`form_count_${forms.length}`);
  for(const f of forms){
    if(!/action=["']\/contact["']/i.test(f) || !/method=["']post["']/i.test(f)) issues.push('form_action_method');
  }

  const businessVals=[...c.matchAll(/<input[^>]*name=["']business["'][^>]*value=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
  const sourceVals=[...c.matchAll(/<input[^>]*name=["']source["'][^>]*value=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
  if(businessVals.length<2 || sourceVals.length<2) issues.push('hidden_fields');
  if(businessVals.some(v=>v!==slug)) issues.push('business_slug_mismatch');

  if(!/href=["']#quote["']/i.test(c) || !/id=["']quote["']/i.test(c)) issues.push('hero_quote_anchor');

  const vt=visibleText(c);
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(vt)) issues.push('non_compliant_claim');
  const phones=vt.match(/\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g)||[];
  if(phones.some(p=>/(^|\D)(555|000)(\D|$)|123[-\s]?456[-\s]?7890/.test(p))) issues.push('fabricated_phone');

  const inputIds=[...c.matchAll(/<(?:input|textarea)\b[^>]*id=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
  const unlabeled=inputIds.filter(id=>!hasLabelForInput(c,id));
  if(unlabeled.length) issues.push(`unlabeled_fields_${unlabeled.join('|')}`);

  siteResults.push({slug,issues});
}

const e=fs.readFileSync(batchFile,'utf8');
const sections=e.split(/\n---\n/).filter(s=>/^##\s+\d+\)/m.test(s));
const emailIssues=[];
sections.forEach((sec,idx)=>{
  const id=(sec.match(/`(wave\d+-\d+)`/)||[])[1]||`section_${idx+1}`;
  const body=(sec.split('**Email body**')[1]||'');
  if(!body.includes('{{live_url}}')) emailIssues.push({id,issue:'missing_live_url'});
  if(!body.includes('{{screenshot_url}}')) emailIssues.push({id,issue:'missing_screenshot_url'});
  if(/[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]/.test(sec)) emailIssues.push({id,issue:'non_ascii_punctuation'});
  const visible=sec.replace(/`[^`]+`/g,' ');
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(visible)) emailIssues.push({id,issue:'non_compliant_claim'});
});

const ids=[...new Set([...e.matchAll(/`(wave\d+-\d+)`/g)].map(m=>m[1]))];
const qj=fs.existsSync(queueJsonl)?fs.readFileSync(queueJsonl,'utf8'):'';
const qc=fs.existsSync(queueCsv)?fs.readFileSync(queueCsv,'utf8'):'';
const missingJsonl=ids.filter(id=>!qj.includes(id));
const missingCsv=ids.filter(id=>!qc.includes(id));

console.log(JSON.stringify({wave,batch,siteResults,emailIssues,ids,missingJsonl,missingCsv},null,2));
