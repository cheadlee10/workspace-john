export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      {/* SOC 2 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-card border border-slate-700 rounded-lg">
        <svg className="w-5 h-5 text-cyan-bright" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-slate-300">SOC 2 Type II</span>
      </div>

      {/* GDPR */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-card border border-slate-700 rounded-lg">
        <svg className="w-5 h-5 text-cyan-bright" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-slate-300">GDPR Compliant</span>
      </div>

      {/* SSL */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-card border border-slate-700 rounded-lg">
        <svg className="w-5 h-5 text-cyan-bright" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-slate-300">256-bit SSL</span>
      </div>

      {/* Stripe */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-card border border-slate-700 rounded-lg">
        <svg className="w-5 h-5 text-cyan-bright" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-slate-300">Stripe Payments</span>
      </div>

      {/* Money-back */}
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-green-400">30-Day Guarantee</span>
      </div>
    </div>
  )
}
