// Try alternative domains
const https = require('https');

const VERCEL_TOKEN = 'REDACTED';
const ALTERNATIVES = [
  'northstarsynergy.com',
  'northstar-automation.dev',
  'northstar.services',
  'northstarsynergy.dev',
  'getnorthstar.com'
];

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

async function findAvailableDomain() {
  console.log('🔍 Checking domain availability...\n');

  for (const domain of ALTERNATIVES) {
    const res = await apiRequest('GET', `/v4/domains/status?name=${domain}`);
    
    if (res.data.available) {
      console.log(`✅ AVAILABLE: ${domain} - $${(res.data.price / 100).toFixed(2)}`);
      return { domain, price: res.data.price };
    } else {
      console.log(`❌ Taken: ${domain}`);
    }
  }

  return null;
}

async function purchaseAndDeploy() {
  const available = await findAvailableDomain();
  
  if (!available) {
    console.log('\n❌ None of the domains are available!');
    console.log('Suggestion: Choose a custom name and I\'ll register it.');
    return;
  }

  console.log(`\n💳 Purchasing ${available.domain}...`);
  
  const buyRes = await apiRequest('POST', '/v5/domains/buy', {
    name: available.domain,
    expectedPrice: available.price,
  });

  if (buyRes.status !== 200) {
    console.error('❌ Purchase failed:', buyRes.data);
    console.log('\nAdd payment at: https://vercel.com/account/billing');
    return;
  }

  console.log('✓ Domain purchased!');
  console.log(`\n🌐 Your domain: https://${available.domain}`);
  console.log('\nNext: Upload site at https://vercel.com/new');
}

purchaseAndDeploy().catch(console.error);
