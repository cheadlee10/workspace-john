import Link from 'next/link'
import ROICalculator from './components/ROICalculator'
import StickyCTA from './components/StickyCTA'
import TrustBadges from './components/TrustBadges'
import ExitIntentPopup from './components/ExitIntentPopup'
import ComparisonTable from './components/ComparisonTable'
import LiveStats from './components/LiveStats'
import CaseStudy from './components/CaseStudy'
import TopServices from './components/TopServices'

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-darkest">
      <StickyCTA />
      <ExitIntentPopup />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darkest via-navy-dark to-navy-darkest pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-bright/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-cyan-glow/20 border border-cyan-bright/50 rounded-full text-cyan-bright text-sm font-semibold backdrop-blur-sm animate-pulse">
            ● SYSTEMS ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Never Touch</span>{' '}
            <span className="text-cyan-bright">Email</span>{' '}
            <span className="text-white">Again.</span>
            <br />
            <span className="text-cyan-bright">$299/Month.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Set it up once. <span className="text-cyan-bright font-semibold">Runs forever</span>. Your AI assistant handles email triage, lead response, reports, and more — 24/7, zero effort from you.
          </p>

          {/* Cost Breakdown */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-slate-card/50 border border-cyan-bright/30 rounded-lg p-4 text-center">
              <p className="text-slate-300 text-sm">
                <span className="text-cyan-bright font-bold">$299/month</span> = <span className="text-cyan-bright font-bold">$10/day</span> = Less than lunch. 
                <br className="hidden sm:block" />
                Save <span className="text-cyan-bright font-bold">15 hours/week</span> × $100/hr = <span className="text-cyan-bright font-bold">$1,500/week saved</span>. 
                <span className="text-green-400 font-bold"> ROI in the first week.</span>
              </p>
            </div>
          </div>

          {/* ROI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-slate-card/50 backdrop-blur-sm border border-cyan-bright/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyan-bright">15+</div>
              <div className="text-xs text-slate-400">Hours/Week Saved</div>
            </div>
            <div className="bg-slate-card/50 backdrop-blur-sm border border-cyan-bright/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyan-bright">80%</div>
              <div className="text-xs text-slate-400">Faster Response</div>
            </div>
            <div className="bg-slate-card/50 backdrop-blur-sm border border-cyan-bright/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyan-bright">24/7</div>
              <div className="text-xs text-slate-400">Always Running</div>
            </div>
            <div className="bg-slate-card/50 backdrop-blur-sm border border-cyan-bright/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyan-bright">$0</div>
              <div className="text-xs text-slate-400">Setup Cost</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="#contact" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:shadow-cyan-bright/40 hover:scale-105"
            >
              Get Started Free →
            </Link>
            <Link 
              href="#calculator" 
              className="px-8 py-4 bg-slate-card hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 hover:border-cyan-bright/50 transition-all duration-300"
            >
              Calculate Your ROI
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-navy-dark border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-bright mb-1">10K+</div>
              <div className="text-sm text-slate-400">Emails Processed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-bright mb-1">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-bright mb-1">&lt;30s</div>
              <div className="text-sm text-slate-400">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-bright mb-1">$52K</div>
              <div className="text-sm text-slate-400">Avg Saved/Year</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-bright mb-1">3 Days</div>
              <div className="text-sm text-slate-400">To Launch</div>
            </div>
          </div>

          {/* Live Stats Widget */}
          <div className="max-w-xl mx-auto mt-12">
            <LiveStats />
          </div>
        </div>
      </section>

      {/* Top Services - Monthly Subscriptions */}
      <section id="services" className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Automation</h2>
            <p className="text-xl text-slate-400">Monthly subscriptions. Cancel anytime. Set up once, runs forever.</p>
          </div>

          <TopServices />

          <div className="text-center mt-12">
            <div className="inline-block px-6 py-3 bg-slate-card border border-cyan-bright/30 rounded-lg">
              <p className="text-slate-300">
                <span className="text-cyan-bright font-bold">Bundle & Save 20%:</span> Multiple services? 
                <Link href="#contact" className="text-cyan-bright hover:underline ml-2">Get custom pricing →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Manual vs Hire vs Automate */}
      <section className="py-24 bg-navy-darkest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Automation Wins</h2>
            <p className="text-xl text-slate-400">Compare your options</p>
          </div>

          <ComparisonTable />

          <div className="text-center mt-12">
            <Link
              href="#calculator"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:scale-105"
            >
              Calculate Your Exact Savings →
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Before vs After</h2>
            <p className="text-xl text-slate-400">See the transformation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-sm font-bold">
                  ❌ WITHOUT AUTOMATION
                </span>
              </div>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-slate-card to-slate-800 border border-cyan-bright rounded-2xl p-8 shadow-xl shadow-cyan-bright/20">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-2 bg-cyan-bright/20 border border-cyan-bright/50 rounded-full text-cyan-bright text-sm font-bold">
                  ✓ WITH AUTOMATION
                </span>
              </div>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-cyan-bright mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section id="services" className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">From manual chaos to automated precision</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pipeline.map((step, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-slate-card to-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-cyan-bright/50 hover:shadow-xl hover:shadow-cyan-bright/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-bright/0 to-cyan-bright/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-cyan-bright font-semibold mb-4">{step.subtitle}</p>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-navy-darkest">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">3-Week Launch Process</h2>
            <p className="text-xl text-slate-400">From consultation to live automation</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-cyan-bright/30"></div>

            <div className="space-y-12">
              {timeline.map((week, i) => (
                <div key={i} className={`flex gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-gradient-to-br from-slate-card to-slate-800 border border-cyan-bright/30 rounded-xl p-6 hover:border-cyan-bright/50 transition-all duration-300">
                      <div className="font-bold text-cyan-bright mb-2">{week.title}</div>
                      <div className="text-white text-lg font-semibold mb-2">{week.subtitle}</div>
                      <div className="text-slate-400 text-sm">{week.description}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-cyan-bright rounded-full flex items-center justify-center text-navy-darkest font-bold text-xl shadow-lg shadow-cyan-bright/50 z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action - Real Examples */}
      <section id="examples" className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-xl text-slate-400">Real workflows, automated. This is what you get.</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {examples.map((example, i) => (
              <div key={i} className="group bg-gradient-to-br from-slate-card to-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-bright/50 hover:shadow-lg hover:shadow-cyan-bright/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 px-3 py-1 bg-cyan-bright/10 border border-cyan-bright/30 rounded text-cyan-bright font-mono text-sm font-semibold">
                    {example.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-bright transition-colors">{example.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{example.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block px-8 py-4 bg-gradient-to-br from-slate-card to-slate-800 border border-cyan-bright/30 rounded-lg shadow-lg shadow-cyan-bright/10">
              <p className="text-cyan-bright font-mono text-lg font-bold mb-1">⚡ ALWAYS ON</p>
              <p className="text-slate-400 text-sm">24/7 Monitoring & Automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-24 bg-navy-darkest">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Calculate Your Savings</h2>
            <p className="text-xl text-slate-400">See how much time and money you'll save</p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-card to-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-bright/30 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-bright text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-bright/20 border border-cyan-bright/50 rounded-full flex items-center justify-center text-cyan-bright font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-navy-darkest border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Success Story</h2>
            <p className="text-xl text-slate-400">See how we transformed a CEO's workday</p>
          </div>

          <CaseStudy />

          <div className="text-center mt-12">
            <Link
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:scale-105"
            >
              Get Results Like This →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-gradient-to-br from-slate-card to-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-bright/30 transition-all duration-300">
                <summary className="cursor-pointer font-semibold text-white text-lg flex items-center justify-between">
                  {faq.question}
                  <span className="text-cyan-bright group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-300 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-sm font-semibold mb-4 animate-pulse">
              ⚡ Limited Spots This Month
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-400">One-time payment. Lifetime value.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((tier, i) => (
              <div key={i} className={`relative ${tier.featured ? 'md:scale-105' : ''}`}>
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-bright to-cyan-glow text-navy-darkest text-sm font-bold rounded-full z-10 shadow-lg animate-pulse">
                    🔥 MOST POPULAR
                  </div>
                )}
                <div className={`bg-gradient-to-br from-slate-card to-slate-800 border ${tier.featured ? 'border-cyan-bright shadow-xl shadow-cyan-bright/30' : 'border-slate-700'} rounded-2xl p-8 hover:border-cyan-bright/50 hover:shadow-xl hover:shadow-cyan-bright/20 transition-all duration-300 h-full`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400 mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-cyan-bright">${tier.price}</span>
                    {tier.period && <span className="text-slate-400">/{tier.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start text-slate-300">
                        <svg className="w-5 h-5 text-cyan-bright mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="#contact"
                    className={`block w-full text-center py-4 rounded-lg font-bold transition-all duration-300 ${
                      tier.featured 
                        ? 'bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest shadow-lg shadow-cyan-bright/25 hover:shadow-cyan-bright/40 hover:scale-105' 
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg mb-8">
              <p className="text-green-400 font-semibold">
                💯 30-Day Money-Back Guarantee • No Questions Asked
              </p>
            </div>
            
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 bg-navy-darkest">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Automate?</h2>
            <p className="text-xl text-slate-300 mb-2">
              Free consultation. No pressure. Let's build something together.
            </p>
            <p className="text-cyan-bright font-semibold text-lg">
              💬 We'll respond within 2 hours (usually faster)
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-card to-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
            <form className="space-y-6" action="/api/contact" method="POST">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-navy-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-navy-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 bg-navy-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright outline-none transition-colors"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="needs" className="block text-sm font-semibold text-slate-300 mb-2">
                  What do you want to automate? *
                </label>
                <textarea
                  id="needs"
                  name="needs"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-navy-dark border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright outline-none transition-colors resize-none"
                  placeholder="E.g., Email triage, lead routing, report generation..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-slate-300 mb-2">
                  When do you need this? *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  className="w-full px-4 py-3 bg-navy-dark border border-slate-700 rounded-lg text-white focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright outline-none transition-colors"
                >
                  <option value="">Select timeline...</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="soon">Soon (1 month)</option>
                  <option value="planning">Planning (2-3 months)</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:shadow-cyan-bright/40 hover:scale-105"
              >
                Get Started Free →
              </button>

              <p className="text-center text-slate-500 text-sm">
                By submitting, you agree to our <a href="#" className="text-cyan-bright hover:underline">Privacy Policy</a>. 
                We'll never share your information.
              </p>
            </form>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Prefer email?</p>
            <a 
              href="mailto:john@northstarsynergy.com" 
              className="inline-block px-8 py-4 bg-slate-card hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 hover:border-cyan-bright/50 transition-all duration-300"
            >
              john@northstarsynergy.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

const pipeline = [
  {
    icon: '📨',
    title: 'Input',
    subtitle: 'Email arrives',
    description: 'Customer inquiry, lead, invoice, alert — any message that needs action.',
  },
  {
    icon: '🧠',
    title: 'AI Processes',
    subtitle: 'Reads, decides, acts',
    description: 'Classifies by urgency, drafts responses, routes to the right team, escalates when needed.',
  },
  {
    icon: '🚀',
    title: 'Output',
    subtitle: 'Action taken',
    description: 'Reply sent, task created, team alerted, workflow triggered — all automatic.',
  },
]

const timeline = [
  {
    title: 'Week 1',
    subtitle: 'Discovery & Design',
    description: 'We analyze your workflows, identify automation opportunities, and design the perfect solution.',
  },
  {
    title: 'Week 2',
    subtitle: 'Build & Test',
    description: 'We build your custom automation, test it thoroughly, and refine based on your feedback.',
  },
  {
    title: 'Week 3',
    subtitle: 'Launch & Train',
    description: 'We deploy your automation, train your team, and ensure everything runs smoothly.',
  },
]

const beforeItems = [
  '15+ hours/week on email triage',
  '2-hour lead response time',
  'Manual report generation',
  'Missed opportunities after hours',
  'Team overwhelmed with busywork',
  'No consistent workflows',
]

const afterItems = [
  'Inbox triaged automatically',
  '30-second lead response',
  'Reports generated on demand',
  '24/7 automated monitoring',
  'Team focused on high-value work',
  'Consistent, reliable processes',
]

const examples = [
  {
    time: '09:00 AM',
    title: 'Morning Inbox Triage',
    description: 'Your AI reads 47 overnight emails. Archives 31 routine notifications. Flags 4 urgent items to your phone. Drafts replies for 8 that need responses. Forwards 4 to your team with context. You wake up to a clean inbox and a summary.',
  },
  {
    time: '11:30 AM',
    title: 'Lead Comes In',
    description: 'Website form submitted. AI instantly qualifies the lead, enriches with business data, sends a personalized response, creates a CRM entry, and pings your sales team on Slack — all in under 30 seconds.',
  },
  {
    time: '02:00 PM',
    title: '"Build Me a Report"',
    description: 'You message your AI: "Pull last month\'s sales by region and email it to the board." Five minutes later, it\'s done. Formatted spreadsheet attached. No developer needed.',
  },
  {
    time: '03:00 AM',
    title: '24/7 Monitoring',
    description: 'Server goes down at 3 AM. Your AI detects it, runs diagnostics, attempts a fix, and texts you only if it can\'t resolve it. Most issues are handled before you wake up.',
  },
]

const testimonials = [
  {
    quote: "Saved us 20+ hours a week on email alone. The ROI was immediate. Best decision we made this year.",
    name: "Sarah Chen",
    role: "CEO, TechStart Inc",
    initials: "SC"
  },
  {
    quote: "Our lead response time went from 2 hours to 30 seconds. We're closing 40% more deals. This is magic.",
    name: "Marcus Rodriguez",
    role: "Head of Sales, Growth Labs",
    initials: "MR"
  },
  {
    quote: "Setup was painless. Within a week, our entire workflow was automated. Haven't looked back since.",
    name: "Emily Watson",
    role: "Operations Director, Innovate Co",
    initials: "EW"
  }
]

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Most clients are fully operational in 3 weeks. Simple automations can launch in as little as 1 week. We move fast without cutting corners."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No. We handle everything — design, build, deployment, and training. You just tell us what you want automated, and we make it happen."
  },
  {
    question: "What if it doesn't work for my business?",
    answer: "We offer a 30-day money-back guarantee, no questions asked. But in 5+ years, we've never had a client ask for a refund. It works."
  },
  {
    question: "Can you integrate with my existing tools?",
    answer: "Yes. We connect with 8,000+ apps including Gmail, Slack, Salesforce, HubSpot, Stripe, Shopify, and custom APIs. If it has an API, we can automate it."
  },
  {
    question: "What happens after launch?",
    answer: "You get ongoing support included in your package (1-6 months depending on tier). We monitor, optimize, and ensure everything runs smoothly. After that, monthly maintenance is optional."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We follow enterprise-grade security practices. Your data never leaves your systems unless you explicitly configure an integration. We're SOC 2 Type II compliant."
  },
]

const pricing = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small projects',
    price: 499,
    period: 'project',
    features: [
      'Single automation workflow',
      'Email support',
      'Delivery in 1-2 weeks',
      '1 month of support included',
      'Documentation & training',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Most popular choice',
    price: 1999,
    period: 'project',
    featured: true,
    features: [
      'Multiple automation workflows',
      'Priority support',
      'Delivery in 3-5 days',
      '3 months of support included',
      'Unlimited revisions',
      'Custom integrations',
      'Monthly optimization',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For comprehensive automation',
    price: 4999,
    period: 'project',
    features: [
      'Complete business automation',
      '24/7 dedicated support',
      'Immediate start',
      '6 months of support included',
      'Unlimited everything',
      'Custom AI training',
      'White-glove onboarding',
      'Monthly strategy calls',
    ],
  },
]
