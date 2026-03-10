const fs=require('fs');
const path=require('path');

const waveDir=path.join(process.cwd(),'sites','premium-v3-wave97');
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

const batchFile=path.join(process.cwd(),'email-templates','next-queued-email-assets-2026-03-03-batch100.md');
const e=fs.readFileSync(batchFile,'utf8');
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

const qj=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches.jsonl'),'utf8');
const qc=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches-tracker.csv'),'utf8');
const missingJsonl=ids.filter(id=>!qj.includes(id));
const missingCsv=ids.filter(id=>!qc.includes(id));

console.log(JSON.stringify({site,email:{sectionCount:sections.length,ids,emailIssues,missingJsonl,missingCsv}},null,2));