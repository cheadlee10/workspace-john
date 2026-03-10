// Domain Registration Script - northstar-synergy.dev
// Run: node scripts/setup-domain.js

const fetch = require('node-fetch')

const DOMAIN = 'northstar-synergy.dev'
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const PROJECT_ID = process.env.VERCEL_PROJECT_ID

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN not set')
  console.log('Get token from: https://vercel.com/account/tokens')
  process.exit(1)
}

if (!PROJECT_ID) {
  console.error('❌ VERCEL_PROJECT_ID not set')
  console.log('Get from Vercel dashboard → Your Project → Settings')
  process.exit(1)
}

async function setupDomain() {
  console.log('🔍 Checking domain availability...')
  
  // Check availability
  const checkRes = await fetch(
    `https://api.vercel.com/v4/domains/status?name=${DOMAIN}`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  )
  
  if (!checkRes.ok) {
    console.error('❌ Failed to check availability:', await checkRes.text())
    return
  }

  const { available, price } = await checkRes.json()
  
  if (!available) {
    console.log('❌ Domain not available:', DOMAIN)
    console.log('Try alternatives:')
    console.log('  - northstarsynergy.com')
    console.log('  - northstar.services')
    console.log('  - northstar-automation.dev')
    return
  }

  console.log(`✓ Domain available: ${DOMAIN}`)
  console.log(`  Price: $${(price / 100).toFixed(2)}`)
  console.log('')

  // Purchase domain
  console.log('💳 Purchasing domain...')
  const buyRes = await fetch('https://api.vercel.com/v5/domains/buy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name: DOMAIN, 
      expectedPrice: price 
    }),
  })

  if (!buyRes.ok) {
    console.error('❌ Purchase failed:', await buyRes.text())
    console.log('Possible issues:')
    console.log('  - Payment method not on file')
    console.log('  - Insufficient funds')
    console.log('  - API permissions')
    return
  }

  console.log('✓ Domain purchased!')
  console.log('')

  // Wait for DNS propagation
  console.log('⏳ Waiting 30s for DNS setup...')
  await new Promise(resolve => setTimeout(resolve, 30000))

  // Add domain to project
  console.log('🔗 Adding domain to Vercel project...')
  const addRes = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: DOMAIN }),
    }
  )

  if (!addRes.ok) {
    console.error('❌ Failed to add domain:', await addRes.text())
    return
  }

  console.log('✓ Domain added to project')
  console.log('')
  console.log('🔐 SSL certificate will be provisioned in 5-10 minutes')
  console.log('')
  console.log('🚀 Your site will be live at:')
  console.log(`   https://${DOMAIN}`)
  console.log('')
  console.log('Next steps:')
  console.log('  1. Deploy site: npm run deploy')
  console.log('  2. Update .env.local with live Stripe keys')
  console.log('  3. Configure Stripe webhook: https://${DOMAIN}/api/webhooks/stripe')
  console.log('  4. Test payment flow with real card')
}

setupDomain().catch(err => {
  console.error('❌ Setup failed:', err.message)
  process.exit(1)
})
