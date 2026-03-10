'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🌳</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-700">Kevin's Yard Work</div>
                <div className="text-xs text-gray-600 -mt-1">Professional Landscaping Services</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Services</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">About</a>
              <a href="#reviews" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Reviews</a>
              <a href="tel:+12063693776" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Call Now
              </a>
            </div>

            <div className="md:hidden">
              <a href="tel:+12063693776" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                Call
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-earth-900/40 to-primary-800/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2000&auto=format&fit=crop"
            alt="Professional yard cleanup and landscaping"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 text-white/90 font-medium"
          >
            ⭐ 155+ Five-Star Reviews | Open 24/7
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Seattle's Most
            <br />
            <span className="text-primary-400">Trusted Yard Care</span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professional landscaping, yard cleanup, and tree services throughout the Seattle area.
            <span className="block mt-2 text-primary-300 font-semibold">Fast response. Quality work. Fair prices.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="tel:+12063693776" className="group bg-primary-500 text-white px-8 py-4 rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 font-bold text-lg shadow-2xl flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call for Free Estimate</span>
            </a>
            <a href="#services" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all font-bold text-lg flex items-center space-x-2">
              <span>View Services</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center space-x-8 text-white/80 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Open 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Free Estimates</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Best Prices</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center text-white">
            <div className="reveal">
              <div className="text-5xl font-bold mb-2">155+</div>
              <div className="text-primary-200">Five-Star Reviews</div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Open Availability</div>
            </div>
            <div className="reveal reveal-delay-2 col-span-2 md:col-span-1">
              <div className="text-5xl font-bold mb-2">4.4⭐</div>
              <div className="text-primary-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional landscaping and yard maintenance for Seattle homes and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌿',
                title: 'Yard Cleanup',
                description: 'Complete yard cleanup services including debris removal, overgrown plant management, and seasonal cleanup.',
                features: ['Debris removal', 'Overgrown yard rescue', 'Seasonal cleanup', 'Waste hauling']
              },
              {
                icon: '🪴',
                title: 'Ivy & Weed Removal',
                description: 'Expert removal of English ivy, Himalayan blackberry, and persistent weeds that damage your property.',
                features: ['English ivy removal', 'Blackberry clearing', 'Root extraction', 'Weed control']
              },
              {
                icon: '🌳',
                title: 'Tree Trimming & Care',
                description: 'Professional tree and shrub trimming to maintain healthy, beautiful plants and ensure safety.',
                features: ['Tree trimming', 'Shrub pruning', 'Branch removal', 'Health assessment']
              },
              {
                icon: '💧',
                title: 'Irrigation Services',
                description: 'Installation, repair, and maintenance of irrigation systems to keep your landscape thriving.',
                features: ['System design', 'Installation', 'Repairs', 'Maintenance']
              },
              {
                icon: '🏗️',
                title: 'Hardscaping',
                description: 'Patios, walkways, retaining walls, and other hardscape features to enhance your outdoor space.',
                features: ['Paver patios', 'Walkways', 'Retaining walls', 'Outdoor structures']
              },
              {
                icon: '🌱',
                title: 'Landscape Maintenance',
                description: 'Regular lawn care, edging, mowing, and maintenance to keep your property looking its best.',
                features: ['Lawn mowing', 'Edging', 'Trimming', 'Ongoing maintenance']
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`reveal reveal-delay-${index % 3 + 1} bg-gradient-to-br from-earth-50 to-white border border-earth-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Yard?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Get a free estimate from Seattle's most trusted yard care professional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+12063693776" className="bg-white text-primary-700 px-10 py-5 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 font-bold text-lg shadow-xl flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now: (206) 369-3776</span>
            </a>
          </div>
          <p className="mt-6 text-primary-200 text-sm">Open 24/7 • Free Estimates • Fast Response</p>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Customers Say</h2>
            <p className="text-xl text-gray-600">155+ five-star reviews on Yelp</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Kevin and his team did an amazing job cleaning up our overgrown backyard. They removed all the ivy and trimmed our trees perfectly. Highly recommend!",
                author: "Sarah M.",
                location: "Seattle, WA",
                rating: 5
              },
              {
                text: "Fast response, fair pricing, and excellent work. Kevin transformed our yard from a jungle to a beautiful space. Will definitely use again!",
                author: "Michael T.",
                location: "West Seattle",
                rating: 5
              },
              {
                text: "Professional and reliable. Kevin showed up on time, did exactly what we needed, and cleaned up everything. Best prices we found too.",
                author: "Jennifer L.",
                location: "Ballard, WA",
                rating: 5
              }
            ].map((review, index) => (
              <div 
                key={index}
                className={`reveal reveal-delay-${index + 1} bg-white rounded-2xl p-8 shadow-lg border border-earth-200`}
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">"{review.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{review.author}</div>
                  <div className="text-gray-600 text-sm">{review.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <a href="https://www.yelp.com/biz/kevins-yard-work-seattle" target="_blank" rel="noopener" className="inline-flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-semibold">
              <span>Read all 155+ reviews on Yelp</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Kevin's Yard Work?</h2>
              <p className="text-lg text-gray-700 mb-6">
                Trusted by Seattle homeowners for professional landscaping and yard maintenance services. We deliver quality work at fair prices, with the flexibility to work around your schedule.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Open 24/7</div>
                    <div className="text-gray-600">Flexible scheduling to work around your availability</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Best Prices Guaranteed</div>
                    <div className="text-gray-600">Competitive rates with no hidden fees</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">155+ Five-Star Reviews</div>
                    <div className="text-gray-600">Proven track record of satisfied customers</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Professional Service</div>
                    <div className="text-gray-600">Expert work with attention to detail</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <img 
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop"
                alt="Professional yard work team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Serving the Greater Seattle Area</h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-700">
            {['Seattle', 'West Seattle', 'Ballard', 'Fremont', 'Capitol Hill', 'Queen Anne', 'Magnolia', 'Green Lake', 'Wallingford', 'University District', 'Beacon Hill', 'Columbia City'].map((area) => (
              <span key={area} className="bg-white px-4 py-2 rounded-lg border border-earth-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌳</span>
                </div>
                <div>
                  <div className="text-xl font-bold">Kevin's Yard Work</div>
                  <div className="text-xs text-gray-400">Professional Landscaping</div>
                </div>
              </div>
              <p className="text-gray-400">
                Seattle's trusted choice for professional landscaping and yard maintenance services.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Yard Cleanup</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Tree Trimming</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Ivy Removal</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Hardscaping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+12063693776" className="hover:text-primary-400 transition-colors">(206) 369-3776</a>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Serving Greater Seattle Area</span>
                </li>
                <li className="text-sm">
                  Open 24/7<br />
                  Call Anytime for Free Estimate
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-earth-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Kevin's Yard Work. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
