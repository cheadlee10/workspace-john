// Twitter Lead Monitor - Find people asking for help
// Run: node twitter-lead-monitor.js
// Requires: Brave Search API key

const SEARCH_QUERIES = [
  'need help with excel',
  'automate my spreadsheets',
  'looking for python developer',
  'need web scraper',
  'api integration help',
  'data cleaning service',
  '#freelance #hireme',
  '#hiring python',
  '#gigs automation'
]

async function searchTwitter(query) {
  // Use Brave Search API when available
  const searchQuery = `site:twitter.com OR site:x.com ${query}`
  
  console.log(`Searching: ${query}`)
  
  // Placeholder - will use Brave API
  // const results = await braveSearch(searchQuery, { freshness: 'pd' })
  // return results.filter(r => r.age < 6) // last 6 hours
  
  return []
}

async function monitorTwitter() {
  console.log('🐦 Monitoring Twitter/X for leads...\n')
  
  const leads = []
  
  for (const query of SEARCH_QUERIES) {
    const results = await searchTwitter(query)
    
    results.forEach(result => {
      leads.push({
        query,
        author: extractAuthor(result.url),
        tweet: result.snippet,
        url: result.url,
        age: result.age
      })
    })
  }
  
  // Sort by recency
  leads.sort((a, b) => a.age - b.age)
  
  console.log(`\n✓ Found ${leads.length} potential leads\n`)
  
  leads.forEach((lead, i) => {
    console.log(`${i + 1}. @${lead.author} (${lead.age}h ago)`)
    console.log(`   "${lead.tweet}"`)
    console.log(`   ${lead.url}`)
    console.log('')
  })
  
  // Save to file
  const fs = require('fs')
  const timestamp = new Date().toISOString().split('T')[0]
  fs.writeFileSync(
    `../leads/twitter-leads-${timestamp}.json`,
    JSON.stringify(leads, null, 2)
  )
  
  console.log(`Saved to leads/twitter-leads-${timestamp}.json`)
}

function extractAuthor(url) {
  const match = url.match(/twitter\.com\/([^\/]+)|x\.com\/([^\/]+)/)
  return match ? (match[1] || match[2]) : 'unknown'
}

// Run
monitorTwitter().catch(console.error)
