'use client'

import Link from 'next/link'

export default function ServicesPage() {
  return (
    <main>
      <section className="section max-w-7xl mx-auto py-20">
        <h1 className="text-5xl font-bold mb-12">Services</h1>

        {services.map((service) => (
          <div key={service.id} className="mb-16 pb-16 border-b border-slate-800 last:border-0">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
                <p className="text-slate-300 mb-6">{service.longDescription}</p>
              </div>
              <div className="md:col-span-2">
                <div className="bg-slate-900 rounded-lg p-6 mb-6 border border-slate-800">
                  <h3 className="font-bold mb-3">What's Included:</h3>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="text-slate-300">✓ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {service.tiers.map((tier) => (
                    <div key={tier.name} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">{tier.name}</p>
                      <p className="text-2xl font-bold mb-4">${tier.price}</p>
                      <Link
                        href={`/checkout?service=${service.id}&tier=${tier.id}`}
                        className="btn btn-primary w-full text-center text-sm"
                      >
                        Select
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="section bg-slate-900/50 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Don't see what you need?</h2>
          <p className="text-slate-300 mb-8">
            I can build custom solutions for virtually anything. Let's talk about your specific requirements.
          </p>
          <a href="#contact" className="btn btn-primary">
            Schedule a Call
          </a>
        </div>
      </section>
    </main>
  )
}

const services = [
  {
    id: 'excel',
    icon: '📊',
    name: 'Excel Automation',
    longDescription: 'From simple formula audits to complex VBA automation systems. I optimize spreadsheets, automate data entry, and build reporting pipelines that save hours every week.',
    includes: [
      'Formula optimization and debugging',
      'VBA macro development',
      'Power Query ETL pipelines',
      'Dynamic dashboards and charts',
      'Data validation and protection',
      'Integration with other tools',
    ],
    tiers: [
      { id: 'starter', name: 'Audit', price: 150 },
      { id: 'pro', name: 'Build', price: 300 },
      { id: 'enterprise', name: 'Pipeline', price: 500 },
    ],
  },
  {
    id: 'scripts',
    icon: '🐍',
    name: 'Python Scripts',
    longDescription: 'Automate repetitive tasks. Process data at scale. Scrape websites. Integrate systems. Python scripts that run on schedule or on-demand.',
    includes: [
      'Web scraping and data extraction',
      'File processing and automation',
      'API interactions',
      'Scheduled task runners',
      'Data transformation pipelines',
      'Error handling and logging',
    ],
    tiers: [
      { id: 'starter', name: 'Simple', price: 99 },
      { id: 'pro', name: 'Advanced', price: 299 },
      { id: 'enterprise', name: 'Complex', price: 999 },
    ],
  },
  {
    id: 'webdev',
    icon: '🌐',
    name: 'Web Development',
    longDescription: 'Full-stack web applications. Landing pages. Dashboards. Custom platforms. Built with modern tech, deployed to production, ready to scale.',
    includes: [
      'Frontend: React, TypeScript, Tailwind',
      'Backend: Node.js, Express, APIs',
      'Database design and optimization',
      'User authentication and authorization',
      'Responsive mobile design',
      'Deployment and monitoring',
    ],
    tiers: [
      { id: 'starter', name: 'Landing', price: 1000 },
      { id: 'pro', name: 'Web App', price: 3000 },
      { id: 'enterprise', name: 'Platform', price: 5000 },
    ],
  },
  {
    id: 'bots',
    icon: '🤖',
    name: 'Custom Bots',
    longDescription: 'Telegram, Discord, Slack, and OpenClaw bots. Automate conversations, route messages, trigger workflows, integrate with your systems.',
    includes: [
      'Bot development and deployment',
      'Message routing and scheduling',
      'Command handling',
      'Database integration',
      'Webhook handlers',
      ' 24/7 monitoring',
    ],
    tiers: [
      { id: 'starter', name: 'Simple', price: 500 },
      { id: 'pro', name: 'Advanced', price: 2000 },
      { id: 'enterprise', name: 'Complex', price: 5000 },
    ],
  },
  {
    id: 'data',
    icon: '⚙️',
    name: 'Data Engineering',
    longDescription: 'Transform raw data into insights. ETL pipelines. Data cleaning. Automated reporting. Dashboards that update themselves.',
    includes: [
      'Data cleaning and deduplication',
      'ETL pipeline design',
      'Data warehouse setup',
      'Automated reporting',
      'Dashboard development',
      'Performance optimization',
    ],
    tiers: [
      { id: 'starter', name: 'Cleaning', price: 200 },
      { id: 'pro', name: 'Pipeline', price: 500 },
      { id: 'enterprise', name: 'Warehouse', price: 2000 },
    ],
  },
  {
    id: 'api',
    icon: '🔗',
    name: 'API Integration',
    longDescription: 'Connect your tools. CRMs, payment systems, shipping platforms, marketing tools. Seamless data flow between systems.',
    includes: [
      'API documentation review',
      'Integration development',
      'Webhook handlers',
      'Error handling and retries',
      'Data transformation',
      'Testing and deployment',
    ],
    tiers: [
      { id: 'starter', name: 'Single', price: 500 },
      { id: 'pro', name: 'Multiple', price: 1500 },
      { id: 'enterprise', name: 'Suite', price: 3000 },
    ],
  },
]
