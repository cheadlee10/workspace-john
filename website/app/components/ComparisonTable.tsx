export default function ComparisonTable() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Manual Work */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">😰</div>
            <h3 className="text-xl font-bold text-white mb-2">Manual Work</h3>
            <div className="text-3xl font-bold text-red-400 mb-1">$50,000+</div>
            <div className="text-sm text-slate-400">per year</div>
          </div>
          
          <ul className="space-y-3">
            {manualWork.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 mt-1">✗</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hire Assistant */}
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">👤</div>
            <h3 className="text-xl font-bold text-white mb-2">Hire Assistant</h3>
            <div className="text-3xl font-bold text-orange-400 mb-1">$40,000</div>
            <div className="text-sm text-slate-400">per year + benefits</div>
          </div>
          
          <ul className="space-y-3">
            {hireAssistant.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-orange-400 mt-1">~</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Automation */}
        <div className="bg-gradient-to-br from-slate-card to-slate-800 border-2 border-cyan-bright rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-cyan-bright/20">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-bright/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Our Automation</h3>
              <div className="text-3xl font-bold text-cyan-bright mb-1">$1,999</div>
              <div className="text-sm text-slate-400">one-time • unlimited use</div>
            </div>
            
            <ul className="space-y-3">
              {ourAutomation.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-bright mt-1">✓</span>
                  <span className="text-sm font-semibold">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-cyan-bright/30">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">ROI</div>
                <div className="text-2xl font-bold text-green-400">26x return</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const manualWork = [
  '15+ hours/week wasted',
  'Slow, inconsistent results',
  'Human error inevitable',
  'Stops when you stop',
  'Can\'t scale',
  'Burnout guaranteed',
]

const hireAssistant = [
  'Salary + benefits + taxes',
  'Training time required',
  'Vacation, sick days',
  'Limited to work hours',
  'One person\'s capacity',
  'Turnover risk',
]

const ourAutomation = [
  'One-time payment',
  '24/7 operation',
  'Zero errors',
  'Instant scaling',
  'Never takes a break',
  'Pays for itself in 1 month',
]
