const fs=require('fs');
const path=require('path');

const wave='premium-v3-wave62';
const waveDir=path.join(process.cwd(),'sites',wave);
const slugs=fs.readdirSync(waveDir,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);

const siteResults=[];
for(const slug of slugs){
  const file=path.join(waveDir,slug,'index.html');
  const c=fs.readFileSync(file,'utf8');
  const forms=[...c.matchAll(/<form\b[^>]*>/gi)].map(m=>m[0]);
  const issues=[];
  if(/\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com/i.test(c)) issues.push('placeholder_token');
  if(forms.length!==2) issues.push(`form_count_${forms.length}`);
  for(const fm of forms){
    if(!/action=['\"]\/contact['\"]/i.test(fm) || !/method=['\"]post['\"]/i.test(fm)) issues.push('form_action_method');
  }
  const hiddenBusiness=(c.match(/name=['\"]business['\"]/g)||[]).length;
  const hiddenSource=(c.match(/name=['\"]source['\"]/g)||[]).length;
  if(hiddenBusiness<2 || hiddenSource<2) issues.push('hidden_fields');

  const visibleText=c.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ');
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(visibleText)) issues.push('non_compliant_claim');
  const phones=visibleText.match(/\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g)||[];
  if(phones.some(p=>/555|123-456-7890|000/.test(p))) issues.push('fabricated_phone');

  // basic accessibility
  if(!(/<label[^>]+for=['\"]name['\"]/i.test(c) && /id=['\"]name['\"]/i.test(c))) issues.push('missing_name_label_quick');
  if(!(/<label[^>]+for=['\"]phone['\"]/i.test(c) && /id=['\"]phone['\"]/i.test(c))) issues.push('missing_phone_label_quick');
  if(!(/<label[^>]+for=['\"]qname['\"]/i.test(c) && /id=['\"]qname['\"]/i.test(c))) issues.push('missing_name_label_quote');
  if(!(/<label[^>]+for=['\"]qphone['\"]/i.test(c) && /id=['\"]qphone['\"]/i.test(c))) issues.push('missing_phone_label_quote');
  if(!(/<label[^>]+for=['\"]qdetails['\"]/i.test(c) && /id=['\"]qdetails['\"]/i.test(c))) issues.push('missing_details_label_quote');

  siteResults.push({slug,issues});
}

const batch='next-queued-email-assets-2026-03-03-batch65.md';
const ePath=path.join(process.cwd(),'email-templates',batch);
const e=fs.readFileSync(ePath,'utf8');
const sections=e.split(/\n---\n/).filter(s=>/^##\s+\d+\)/m.test(s));
const emailIssues=[];
sections.forEach((sec,idx)=>{
  const id=(sec.match(/`(wave\d+-\d+)`/)||[])[1]||`section_${idx+1}`;
  const body=(sec.split('**Email body**')[1]||'');
  if(!body.includes('{{live_url}}')) emailIssues.push({id,issue:'missing_live_url'});
  if(!body.includes('{{screenshot_url}}')) emailIssues.push({id,issue:'missing_screenshot_url'});
  if(/[\u0080-\uFFFF]/.test(sec)) emailIssues.push({id,issue:'non_ascii'});
  const visible=sec.replace(/`[^`]+`/g,' ');
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(visible)) emailIssues.push({id,issue:'non_compliant_claim'});
});
const ids=[...new Set([...e.matchAll(/`(wave\d+-\d+)`/g)].map(m=>m[1]))];
const qj=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches.jsonl'),'utf8');
const qc=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches-tracker.csv'),'utf8');
const missingJsonl=ids.filter(id=>!qj.includes(id));
const missingCsv=ids.filter(id=>!qc.includes(id));

console.log(JSON.stringify({wave,slugs,siteResults,email:{batch,sectionCount:sections.length,emailIssues,ids,missingJsonl,missingCsv}},null,2));