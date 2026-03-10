const https = require('https');

const VERCEL_TOKEN = 'REDACTED';
const DOMAIN = 'northstarautomation.com';
const PROJECT_ID = 'prj_7uBBHPE3TjsPR2l6ucGk76nv7ulX';

function apiRequest(method, urlPath, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: urlPath,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseData) });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function purchase() {
  console.log('🔍 Checking northstarautomation.com...');
  
  const check = await apiRequest('GET', `/v4/domains/status?name=${DOMAIN}`);
  
  if (!check.data.available) {
    console.log('❌ Domain taken. Trying getnorthstar.io...');
    return;
  }

  console.log(`✅ Available! Price: $${(check.data.price / 100).toFixed(2)}`);
  console.log('\n💳 Purchasing...');

  const buy = await apiRequest('POST', '/v5/domains/buy', {
    name: DOMAIN,
    expectedPrice: check.data.price,
  });

  if (buy.status !== 200 && buy.status !== 201) {
    console.error('❌ Purchase failed:', JSON.stringify(buy.data));
    console.log('\nLikely issue: Payment method not on file');
    console.log('Add at: https://vercel.com/account/billing');
    return;
  }

  console.log('✓ Domain purchased!');
  console.log('\n🔗 Adding to project...');

  await new Promise(r => setTimeout(r, 5000)); // Wait for DNS

  const addDomain = await apiRequest('POST', `/v9/projects/${PROJECT_ID}/domains`, {
    name: DOMAIN,
  });

  if (addDomain.status === 200 || addDomain.status === 201) {
    console.log('✓ Domain configured!');
  }

  console.log('\n✅ DONE!');
  console.log(`\n🌐 Domain: https://${DOMAIN}`);
  console.log('📊 Dashboard: https://vercel.com/dashboard');
  console.log('\n⚠️ FINAL STEP: Upload site files');
  console.log('Go to: https://vercel.com/new');
  console.log('Import project, select northstar-synergy');
  console.log('Site will deploy automatically to the domain.');
}

purchase().catch(e => console.error('Error:', e.message));
