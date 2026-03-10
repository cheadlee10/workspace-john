import Link from 'next/link'

export default function TopServices() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <div key={i} className={`group relative bg-gradient-to-br from-slate-card to-slate-800 border ${service.popular ? 'border-cyan-bright shadow-xl shadow-cyan-bright/20' : 'border-slate-700'} rounded-2xl p-8 hover:border-cyan-bright/50 hover:shadow-xl hover:shadow-cyan-bright/20 transition-all duration-300`}>
          {service.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-bright to-cyan-glow text-navy-darkest text-xs font-bold rounded-full">
              🔥 MOST POPULAR
            </div>
          )}
          
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
          
          <div className="mb-6">
            <div className="text-4xl font-bold text-cyan-bright mb-1">${service.price}<span className="text-xl text-slate-400">/mo</span></div>
            <div className="text-sm text-slate-400">{service.perDay}/day · {service.savings}</div>
          </div>

          <ul className="space-y-2 mb-6">
            {service.features.map((feature, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-cyan-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className={`block w-full text-center py-3 rounded-lg font-bold transition-all duration-300 ${
              service.popular
                ? 'bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest shadow-lg hover:scale-105'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            Start Free Trial →
          </Link>

          <p className="text-xs text-slate-500 text-center mt-3">Cancel anytime. No questions asked.</p>
        </div>
      ))}
    </div>
  )
}

const services = [
  {
    icon: '📨',
    title: 'Email Automation',
    description: 'Never touch email again. AI triages, drafts, and routes everything. You approve, it executes.',
    price: 299,
    perDay: '$10',
    savings: 'Save 15hrs/week',
    popular: true,
    features: [
      'Unlimited email accounts',
      'Smart AI classification',
      'Draft responses you approve',
      'VIP alerts to your phone',
      'Team routing',
      'Zero effort from you',
    ],
  },
  {
    icon: '⚡',
    title: 'Lead Response',
    description: '30-second auto-response, 24/7. Never miss a deal. Instant qualification and CRM sync.',
    price: 499,
    perDay: '$17',
    savings: '40% more deals',
    popular: false,
    features: [
      'Up to 500 leads/month',
      '30-second response time',
      'Auto-qualification',
      'CRM integration',
      'Multi-channel (email/SMS)',
      'Revenue attribution',
    ],
  },
  {
    icon: '📊',
    title: 'Business Reports',
    description: 'Reports in your inbox every morning. Custom metrics. Visual dashboards. Zero manual work.',
    price: 299,
    perDay: '$10',
    savings: 'Save 10hrs/week',
    popular: false,
    features: [
      'Unlimited reports',
      'Daily delivery',
      'Visual dashboards',
      'Custom metrics',
      'Multi-source data',
      'Export to PDF/Excel',
    ],
  },
  {
    icon: '📅',
    title: 'Calendar & Meetings',
    description: 'No more email tennis. Smart scheduling finds time instantly. Works with your existing calendar.',
    price: 99,
    perDay: '$3',
    savings: 'Save 2hrs/week',
    popular: false,
    features: [
      'Smart scheduling',
      'Team coordination',
      'Calendar sync',
      'Zoom integration',
      'Buffer time management',
      'Time zone handling',
    ],
  },
  {
    icon: '📱',
    title: 'Social Media',
    description: '30 days of content in 1 hour. Auto-schedules across all platforms. Consistent presence, zero effort.',
    price: 199,
    perDay: '$7',
    savings: 'Save 5hrs/week',
    popular: false,
    features: [
      'Unlimited posts',
      '5+ platforms',
      'Best time optimization',
      'Content suggestions',
      'Performance analytics',
      'Multi-account',
    ],
  },
  {
    icon: '🎯',
    title: 'Custom Automation',
    description: 'Anything you do repeatedly, we can automate. Tell us what you need, we build it.',
    price: 499,
    perDay: '$17',
    savings: 'Custom ROI',
    popular: false,
    features: [
      'Custom workflows',
      'API integrations',
      'Unlimited complexity',
      'Ongoing optimization',
      'Priority support',
      'White-glove service',
    ],
  },
]
