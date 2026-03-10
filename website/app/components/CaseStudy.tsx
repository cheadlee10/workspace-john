export default function CaseStudy() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-card to-slate-800 border-2 border-cyan-bright/50 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-bright/20">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-cyan-bright/20 border border-cyan-bright/50 rounded-full text-cyan-bright text-xs font-bold mb-4">
              CASE STUDY
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              From 20 Hours/Week to 20 Minutes
            </h3>
            <p className="text-slate-400">TechStart Inc • SaaS Company • 15 employees</p>
          </div>
        </div>

        {/* The Story */}
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="text-cyan-bright font-semibold mb-2">The Problem</h4>
            <p className="text-slate-300 leading-relaxed">
              Sarah Chen, CEO of TechStart Inc, was drowning in email. 200+ messages daily. Manual triage took 3-4 hours. Lead response time was 2+ hours. Deals were going cold. Team was overwhelmed.
            </p>
          </div>

          <div>
            <h4 className="text-cyan-bright font-semibold mb-2">The Solution</h4>
            <p className="text-slate-300 leading-relaxed">
              We built a custom AI assistant that:
            </p>
            <ul className="mt-2 space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-bright mt-1">✓</span>
                <span>Classified emails by urgency (customer, lead, internal, noise)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-bright mt-1">✓</span>
                <span>Auto-responded to common inquiries with personalized templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-bright mt-1">✓</span>
                <span>Routed leads to sales team within 30 seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-bright mt-1">✓</span>
                <span>Flagged urgent items to her phone</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-bright font-semibold mb-2">The Results</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-navy-dark border border-cyan-bright/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-bright mb-1">20 hrs</div>
                <div className="text-sm text-slate-400">Saved per week</div>
              </div>
              <div className="bg-navy-dark border border-cyan-bright/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-bright mb-1">30 sec</div>
                <div className="text-sm text-slate-400">Lead response time</div>
              </div>
              <div className="bg-navy-dark border border-cyan-bright/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-bright mb-1">40%</div>
                <div className="text-sm text-slate-400">More deals closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="border-l-4 border-cyan-bright pl-6 py-2">
          <p className="text-lg text-white italic mb-3">
            "This paid for itself in the first month. I got my life back. My team is happier. Our customers get faster responses. Best decision we made this year."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-bright/20 border-2 border-cyan-bright rounded-full flex items-center justify-center text-cyan-bright font-bold text-lg">
              SC
            </div>
            <div>
              <div className="font-semibold text-white">Sarah Chen</div>
              <div className="text-sm text-slate-400">CEO, TechStart Inc</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-white mb-1">Week 1</div>
              <div className="text-slate-400">Discovery & Design</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Week 2</div>
              <div className="text-slate-400">Built & Tested</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Week 3</div>
              <div className="text-slate-400">Live & Saving Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
