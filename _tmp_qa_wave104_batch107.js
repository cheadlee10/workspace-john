const fs=require('fs');
const path=require('path');
const root=process.cwd();

const wave='premium-v3-wave104';
const slugs=fs.readdirSync(path.join(root,'sites',wave),{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
const siteIssues=[];
for(const slug of slugs){
  const c=fs.readFileSync(path.join(root,'sites',wave,slug,'index.html'),'utf8');
  const issues=[];
  const forms=c.match(/<form\b[^>]*>/gi)||[];
  if(forms.length!==2) issues.push(`form_count_${forms.length}`);
  for(const fm of forms){
    if(!/action=['"]\/contact['"]/i.test(fm) || !/method=['"]post['"]/i.test(fm)) issues.push('form_action_method');
  }
  if((c.match(/name=['"]business['"]/g)||[]).length<2) issues.push('business_hidden');
  if((c.match(/name=['"]source['"]/g)||[]).length<2) issues.push('source_hidden');
  if(/\{\{[^}]+\}\}|TODO|TBD|lorem ipsum/i.test(c)) issues.push('placeholder');
  const txt=c.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ');
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(txt)) issues.push('claim');

  if(!(/<label[^>]+for=['"]name['"]/i.test(c) && /id=['"]name['"]/i.test(c))) issues.push('quick_name_label');
  if(!(/<label[^>]+for=['"]phone['"]/i.test(c) && /id=['"]phone['"]/i.test(c))) issues.push('quick_phone_label');
  if(!(/<label[^>]+for=['"]qname['"]/i.test(c) && /id=['"]qname['"]/i.test(c))) issues.push('quote_name_label');
  if(!(/<label[^>]+for=['"]qphone['"]/i.test(c) && /id=['"]qphone['"]/i.test(c))) issues.push('quote_phone_label');
  if(!(/<label[^>]+for=['"]details['"]/i.test(c) && /id=['"]details['"]/i.test(c))) issues.push('quote_details_label');

  if(issues.length) siteIssues.push({slug,issues});
}

const batchFile='next-queued-email-assets-2026-03-03-batch107.md';
const e=fs.readFileSync(path.join(root,'email-templates',batchFile),'utf8');
const sections=e.split(/\n---\n/).filter(s=>/^##\s+\d+\)/m.test(s));
const emailIssues=[];
for(const sec of sections){
  const id=(sec.match(/`(sprint-\d{8}-\d{3})`/)||[])[1]||'unknown';
  const body=(sec.split('**Email body**')[1]||'');
  if(!body.includes('{{live_url}}')) emailIssues.push({id,issue:'missing_live_url'});
  if(!body.includes('{{screenshot_url}}')) emailIssues.push({id,issue:'missing_screenshot_url'});
  if(/[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]/.test(sec)) emailIssues.push({id,issue:'non_ascii'});
  if(/guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b/i.test(sec.replace(/`[^`]+`/g,' '))) emailIssues.push({id,issue:'claim'});
}

const ids=[...e.matchAll(/`(sprint-\d{8}-\d{3})`/g)].map(m=>m[1]);
const qj=fs.readFileSync(path.join(root,'email-templates','send-queue-2026-03-02-next-batches.jsonl'),'utf8');
const qc=fs.readFileSync(path.join(root,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv'),'utf8');
const missingJsonl=ids.filter(id=>!qj.includes(id));
const missingCsv=ids.filter(id=>!qc.includes(id));

console.log(JSON.stringify({wave,siteCount:slugs.length,siteIssues,batchFile,sectionCount:sections.length,emailIssues,missingJsonl,missingCsv},null,2));
