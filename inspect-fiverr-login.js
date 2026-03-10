// Quick script to inspect Fiverr login page and find actual selectors
const { chromium } = require('playwright');

async function inspectFiverrLogin() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Opening Fiverr login page...');
  await page.goto('https://www.fiverr.com/login', { waitUntil: 'domcontentloaded' });
  console.log('Waiting for React form to load...');
  await page.waitForTimeout(8000); // Wait longer for React to render
  
  // Check page content
  const pageTitle = await page.title();
  const pageUrl = page.url();
  const bodyText = await page.locator('body').textContent();
  
  console.log('\n=== PAGE STATUS ===');
  console.log(`Title: ${pageTitle}`);
  console.log(`URL: ${pageUrl}`);
  console.log(`Body text (first 500 chars): ${bodyText.slice(0, 500)}`);
  console.log('');
  
  console.log('\n=== INSPECTING LOGIN FORM ===\n');
  
  // Find all input fields
  const inputs = await page.locator('input').all();
  console.log(`Found ${inputs.length} input fields\n`);
  
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const type = await input.getAttribute('type').catch(() => 'unknown');
    const name = await input.getAttribute('name').catch(() => 'none');
    const id = await input.getAttribute('id').catch(() => 'none');
    const placeholder = await input.getAttribute('placeholder').catch(() => 'none');
    const className = await input.getAttribute('class').catch(() => 'none');
    
    console.log(`Input ${i + 1}:`);
    console.log(`  type: ${type}`);
    console.log(`  name: ${name}`);
    console.log(`  id: ${id}`);
    console.log(`  placeholder: ${placeholder}`);
    console.log(`  class: ${className}`);
    console.log('');
  }
  
  // Find buttons
  const buttons = await page.locator('button').all();
  console.log(`\nFound ${buttons.length} buttons\n`);
  
  for (let i = 0; i < Math.min(buttons.length, 5); i++) {
    const button = buttons[i];
    const text = await button.textContent().catch(() => '');
    const type = await button.getAttribute('type').catch(() => 'unknown');
    const className = await button.getAttribute('class').catch(() => 'none');
    
    console.log(`Button ${i + 1}:`);
    console.log(`  text: ${text.trim()}`);
    console.log(`  type: ${type}`);
    console.log(`  class: ${className}`);
    console.log('');
  }
  
  console.log('\n=== Browser window left open for manual inspection ===');
  console.log('Press F12 to open DevTools');
  console.log('Inspect the email field to see its exact selector');
  console.log('\nWhen done, close browser window or press Ctrl+C');
  
  // Keep browser open
  await new Promise(() => {});
}

inspectFiverrLogin().catch(console.error);
