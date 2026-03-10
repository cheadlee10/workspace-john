'use client'
import { useState } from 'react'

const services = [
  { icon: '🏗️', name: 'Fencing & Gates', desc: 'Custom wood, cedar, and chain-link fence installation and repair. Privacy fences, gates, and decorative options.' },
  { icon: '🌿', name: 'Landscaping Design', desc: 'Complete landscape design and installation. Transform your outdoor space with professional planning and execution.' },
  { icon: '🧱', name: 'Hardscaping', desc: 'Patios, walkways, retaining walls, and decorative stone work. Built to last with premium materials.' },
  { icon: '🌲', name: 'Tree & Shrub Care', desc: 'Professional pruning, trimming, and removal. Keep your trees healthy and your property safe.' },
  { icon: '🍂', name: 'Yard Cleanup', desc: 'Seasonal cleanups, debris removal, mulch installation, and complete property restoration.' },
  { icon: '🏠', name: 'Property Maintenance', desc: 'Regular maintenance programs for residential and commercial properties. Weekly, bi-weekly, or monthly.' },
]

const reviews = [
  { name: 'Happy Customer', text: 'I cannot recommend Anthony enough! Our sad, dilapidated fence was in dire need of replacement and we were so nervous to hire someone. Immediately upon meeting Anthony, we felt so at ease and knew we were in good hands.', rating: 5 },
  { name: 'Satisfied Homeowner', text: 'Rather than ignoring issues, Anthony evaluated solutions and in the end suggested we change our landscape plan. His honesty and expertise saved us money and delivered a better result.', rating: 5 },
  { name: 'Repeat Client', text: 'Consistent fair price and quality work. He came out the next day to scope the work, was clear in his communication, and did a wonderful job installing the new fence.', rating: 5 },
  { name: 'Delighted Neighbor', text: 'We then added a huge wrap around patio and pathway. Anthony and his crew were professional, on time, and the finished product exceeded our expectations.', rating: 5 },
]

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-eagle-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-eagle-navy/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🦅</span>
              <div>
                <h1 className="text-white font-heading text-lg sm:text-xl font-bold leading-tight">The Eagle</h1>
                <p className="text-eagle-gold text-xs sm:text-sm font-medium -mt-1">Landscaping & Construction</p>
              </div>
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/80 hover:text-eagle-gold transition-colors text-sm font-medium">Services</a>
              <a href="#about" className="text-white/80 hover:text-eagle-gold transition-colors text-sm font-medium">About</a>
              <a href="#reviews" className="text-white/80 hover:text-eagle-gold transition-colors text-sm font-medium">Reviews</a>
              <a href="#gallery" className="text-white/80 hover:text-eagle-gold transition-colors text-sm font-medium">Gallery</a>
              <a href="tel:4253096791" className="bg-eagle-gold text-eagle-navy px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-all shadow-lg">
                📞 (425) 309-6791
              </a>
            </div>
            {/* Mobile Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl p-2">{menuOpen ? '✕' : '☰'}</button>
          </div>
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4 space-y-3">
              <a href="#services" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-eagle-gold py-2">Services</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-eagle-gold py-2">About</a>
              <a href="#reviews" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-eagle-gold py-2">Reviews</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-eagle-gold py-2">Gallery</a>
              <a href="tel:4253096791" className="block bg-eagle-gold text-eagle-navy px-5 py-3 rounded-lg font-bold text-center mt-3">📞 Call Now</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-eagle-navy via-eagle-green to-eagle-navy pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzRWNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-eagle-gold/20 border border-eagle-gold/40 text-eagle-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            🏆 #1 Rated in Everett • 11 Five-Star Reviews on Yelp
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight text-shadow-lg mb-6">
            Your Property<br />
            <span className="text-eagle-gold">Deserves Better</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional landscaping & construction services in Everett, WA. 
            From fencing and hardscaping to full property maintenance — we bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:4253096791" className="bg-eagle-gold text-eagle-navy px-8 py-4 rounded-xl text-lg font-bold hover:bg-yellow-500 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              📞 Call Now — (425) 309-6791
            </a>
            <a href="#contact" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all">
              Get Free Estimate →
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">✅ Licensed & Bonded</span>
            <span className="flex items-center gap-2">✅ Insured</span>
            <span className="flex items-center gap-2">✅ Available 24/7</span>
            <span className="flex items-center gap-2">✅ Free Estimates</span>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-eagle-navy py-6 border-y border-eagle-gold/20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><p className="text-3xl font-bold text-eagle-gold">310+</p><p className="text-white/60 text-sm">Project Photos</p></div>
          <div><p className="text-3xl font-bold text-eagle-gold">23</p><p className="text-white/60 text-sm">Yelp Reviews</p></div>
          <div><p className="text-3xl font-bold text-eagle-gold">24/7</p><p className="text-white/60 text-sm">Availability</p></div>
          <div><p className="text-3xl font-bold text-eagle-gold">5.0</p><p className="text-white/60 text-sm">Star Rating</p></div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-eagle-gold font-medium text-sm uppercase tracking-wider mb-3">What We Do</h3>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-eagle-navy">Our Services</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">From small yard cleanups to complete property transformations — we handle it all with the same level of care and professionalism.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-eagle-cream/50 border border-eagle-stone/20 rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-4xl block mb-4">{s.icon}</span>
                <h4 className="text-xl font-heading font-bold text-eagle-navy mb-3 group-hover:text-eagle-green transition-colors">{s.name}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="tel:4253096791" className="inline-block bg-eagle-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg">
              Get a Free Quote Today →
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-eagle-navy text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-eagle-gold font-medium text-sm uppercase tracking-wider mb-3">About Us</h3>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">Built on Integrity,<br />Driven by Results</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                The Eagle Landscaping and Construction is your trusted partner for all outdoor projects in the Everett, WA area. 
                Led by owner Anthony, we&apos;ve built our reputation on honest communication, fair pricing, and exceptional craftsmanship.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                Whether you need a new fence installed, a complete landscape redesign, or regular property maintenance — we treat every 
                project like it&apos;s our own home. That&apos;s why our clients keep coming back and recommending us to their neighbors.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-eagle-gold text-2xl font-bold">EAGLEL*829CB</p>
                  <p className="text-white/60 text-xs mt-1">WA License #</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-eagle-gold text-2xl font-bold">Everett</p>
                  <p className="text-white/60 text-xs mt-1">Based & Serving</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-eagle-green/30 to-eagle-gold/20 rounded-2xl p-8 border border-white/10">
              <h4 className="text-xl font-heading font-bold mb-6 text-eagle-gold">Why Choose The Eagle?</h4>
              <ul className="space-y-4">
                {[
                  'Owner on every job — Anthony personally oversees all work',
                  'Honest estimates — no surprise charges or hidden fees',
                  'Available 24/7 — we work around your schedule',
                  'Licensed, bonded & insured for your protection',
                  'Clean job sites — we leave your property spotless',
                  'Photo documentation of every project',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-eagle-gold mt-1 flex-shrink-0">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-eagle-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-eagle-gold font-medium text-sm uppercase tracking-wider mb-3">Testimonials</h3>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-eagle-navy">What Our Clients Say</h2>
            <div className="flex justify-center gap-1 mt-4">
              {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-500 text-2xl">★</span>)}
            </div>
            <p className="text-gray-600 mt-2">23 reviews on Yelp • 5.0 average rating</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <span key={s} className="text-yellow-500">★</span>)}</div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
                <p className="text-eagle-navy font-bold text-sm">— {r.name}</p>
                <p className="text-gray-400 text-xs mt-1">via Yelp</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://www.yelp.com/biz/the-eagle-landscaping-and-construction-everett" target="_blank" rel="noopener noreferrer" className="text-eagle-green font-bold hover:underline">
              Read all 23 reviews on Yelp →
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-eagle-gold font-medium text-sm uppercase tracking-wider mb-3">Our Work</h3>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-eagle-navy">Project Gallery</h2>
            <p className="mt-4 text-gray-600">310+ photos of completed projects on our Yelp page</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Fence Installation', 'Patio & Walkways', 'Landscape Design', 'Retaining Walls', 'Yard Cleanup', 'Tree Services'].map((title, i) => (
              <div key={i} className="aspect-[4/3] bg-gradient-to-br from-eagle-green/20 to-eagle-navy/20 rounded-xl flex items-center justify-center border-2 border-dashed border-eagle-stone/30 hover:border-eagle-gold/50 transition-colors group">
                <div className="text-center p-4">
                  <span className="text-4xl block mb-2">{['🏗️','🧱','🌿','🪨','🍂','🌲'][i]}</span>
                  <p className="text-eagle-navy font-bold text-sm">{title}</p>
                  <p className="text-gray-400 text-xs mt-1">Photos coming soon</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.yelp.com/biz/the-eagle-landscaping-and-construction-everett" target="_blank" rel="noopener noreferrer" className="text-eagle-green font-bold hover:underline">
              See all 310+ project photos on Yelp →
            </a>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-eagle-green text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4">Proudly Serving Everett & Surrounding Areas</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            We serve Everett, Marysville, Lake Stevens, Mukilteo, Edmonds, Lynnwood, Bothell, Mill Creek, Snohomish, and all of Snohomish County.
          </p>
          <a href="tel:4253096791" className="inline-block bg-eagle-gold text-eagle-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg">
            📞 Call for Free Estimate
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-eagle-navy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-eagle-gold font-medium text-sm uppercase tracking-wider mb-3">Get Started</h3>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Request a Free Estimate</h2>
            <p className="mt-4 text-white/60">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 bg-white rounded-2xl p-8 shadow-xl">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will contact you within 24 hours.') }}>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eagle-gold focus:border-transparent outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eagle-gold focus:border-transparent outline-none" placeholder="(425) 555-0123" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eagle-gold focus:border-transparent outline-none" placeholder="your@email.com" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                  <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eagle-gold focus:border-transparent outline-none bg-white">
                    <option value="">Select a service...</option>
                    <option>Fencing & Gates</option>
                    <option>Landscaping Design</option>
                    <option>Hardscaping</option>
                    <option>Tree & Shrub Care</option>
                    <option>Yard Cleanup</option>
                    <option>Property Maintenance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                  <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eagle-gold focus:border-transparent outline-none resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full bg-eagle-gold text-eagle-navy py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg">
                  Get Free Estimate →
                </button>
              </form>
            </div>
            <div className="md:col-span-2 text-white space-y-8">
              <div>
                <h4 className="text-eagle-gold font-bold mb-3">📞 Call Us</h4>
                <a href="tel:4253096791" className="text-2xl font-bold hover:text-eagle-gold transition-colors">(425) 309-6791</a>
                <p className="text-white/60 text-sm mt-1">Available 24 hours, 7 days a week</p>
              </div>
              <div>
                <h4 className="text-eagle-gold font-bold mb-3">📍 Location</h4>
                <p className="text-white/80">Everett, WA 98201</p>
                <p className="text-white/60 text-sm mt-1">Serving all of Snohomish & King County</p>
              </div>
              <div>
                <h4 className="text-eagle-gold font-bold mb-3">⏰ Hours</h4>
                <p className="text-white/80">Open 24/7</p>
                <p className="text-white/60 text-sm mt-1">We work around your schedule</p>
              </div>
              <div>
                <h4 className="text-eagle-gold font-bold mb-3">🔗 Find Us On</h4>
                <a href="https://www.yelp.com/biz/the-eagle-landscaping-and-construction-everett" target="_blank" rel="noopener noreferrer" className="text-eagle-gold hover:underline font-medium">
                  Yelp (23 reviews) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-eagle-navy border-t border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🦅</span>
            <span className="text-white font-heading font-bold">The Eagle Landscaping & Construction</span>
          </div>
          <p className="text-white/40 text-sm">Everett, WA • Licensed, Bonded & Insured • Available 24/7</p>
          <p className="text-white/30 text-xs mt-4">© {new Date().getFullYear()} The Eagle Landscaping and Construction. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
