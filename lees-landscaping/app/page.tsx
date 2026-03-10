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
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-700">Lee's</div>
                <div className="text-xs text-gray-600 -mt-1">General Landscaping</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Services</a>
              <a href="#portfolio" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Our Work</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Reviews</a>
              <a href="tel:+12063122445" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Get Free Quote
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-primary-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-earth-900/30 to-primary-800/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
            alt="Beautiful landscaped backyard with patio and garden beds"
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
            🏆 Seattle Times 2025 Best in PNW Nominee
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your
            <br />
            <span className="text-primary-400">Outdoor Space</span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            30+ years serving Seattle homeowners. Expert landscaping, hardscaping, and yard transformation.
            <span className="block mt-2 text-primary-300 font-semibold">5,000+ properties beautified. 600+ five-star reviews.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="tel:+12063122445" className="group bg-primary-500 text-white px-8 py-4 rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 font-bold text-lg shadow-2xl flex items-center space-x-2">
              <span>Call for Free Estimate</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a href="#services" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all font-bold text-lg flex items-center space-x-2">
              <span>View Our Services</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center space-x-8 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Licensed & Bonded</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Same-Week Service</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="reveal">
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-primary-200">Years Experience</div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-primary-200">Properties Transformed</div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="text-5xl font-bold mb-2">600+</div>
              <div className="text-primary-200">5-Star Reviews</div>
            </div>
            <div className="reveal reveal-delay-3">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-200">Satisfaction Guaranteed</div>
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
              From yard cleanup to complete landscape design, we handle it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌿',
                title: 'General Yard Service',
                description: 'Weeding, pruning, trimming, raking, mowing, edging, pressure washing, and yard waste removal.',
                features: ['One-time cleanup', 'Overgrown yard rescue', 'Low maintenance design', 'Home sale prep']
              },
              {
                icon: '🏡',
                title: 'Landscape Design & Construction',
                description: 'Custom CAD design, pavers, patios, retaining walls, garden beds, fire pits, and hardscape.',
                features: ['Custom CAD design', 'Paver installation', 'Retaining walls', 'Outdoor living spaces']
              },
              {
                icon: '🌱',
                title: 'Lawn Care & Maintenance',
                description: 'New sod install, thatching, aerating, hydro-seeding, fertilization, and irrigation systems.',
                features: ['New sod installation', 'Aerating & thatching', 'Hydro-seeding', 'Fertilization programs']
              },
              {
                icon: '🚧',
                title: 'Hardscaping',
                description: 'Patios, walkways, retaining walls, fencing, concrete work, and outdoor structures.',
                features: ['Paver patios', 'Stone walkways', 'Retaining walls', 'Concrete work']
              },
              {
                icon: '🌳',
                title: 'Tree & Shrub Care',
                description: 'Professional trimming, pruning, planting, and removal services for healthy landscapes.',
                features: ['Tree trimming', 'Shrub pruning', 'Planting services', 'Safe removal']
              },
              {
                icon: '🔥',
                title: 'Invasive Plant Removal',
                description: 'Expert removal of bamboo, English ivy, Himalayan blackberry, and other invasive species.',
                features: ['Bamboo removal', 'English ivy cleanup', 'Blackberry clearing', 'Root extraction']
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
            Get a free, no-obligation estimate from Seattle's most trusted landscaping team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+12063122445" className="bg-white text-primary-700 px-10 py-5 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 font-bold text-lg shadow-xl flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now: (206) 312-2445</span>
            </a>
            <a href="#contact" className="border-2 border-white text-white px-10 py-5 rounded-xl hover:bg-white/10 transition-all font-bold text-lg">
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">600+ five-star reviews across Yelp and Google</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Lee's team transformed our overgrown jungle into a beautiful garden paradise. Professional, punctual, and the quality is outstanding. Highly recommend!",
                author: "Sarah M.",
                location: "Bellevue, WA",
                rating: 5
              },
              {
                text: "Amazing work on our paver patio and retaining wall. They turned our vision into reality. The crew was respectful and cleaned up perfectly every day.",
                author: "Michael T.",
                location: "Seattle, WA",
                rating: 5
              },
              {
                text: "We've used Lee's for over 5 years. Always reliable, fair pricing, and beautiful results. They genuinely care about their work and it shows.",
                author: "Jennifer L.",
                location: "Redmond, WA",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`reveal reveal-delay-${index + 1} bg-white rounded-2xl p-8 shadow-lg border border-earth-200`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <div className="flex items-center justify-center space-x-8">
              <a href="https://www.yelp.com/biz/lees-general-landscaping-and-yard-clean-up-seattle-2" target="_blank" rel="noopener" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <span className="font-semibold">450+ Yelp Reviews</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-semibold">160+ Google Reviews</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">30+ Years Serving Seattle</h2>
              <p className="text-lg text-gray-700 mb-6">
                Mr. Lee and his expert team have proudly served the greater Seattle area for over three decades, transforming more than 5,000 properties with top-quality landscaping and hardscaping services.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We treat every yard like our own—bringing the same care and attention we'd expect in our own backyard. From removing stubborn invasive plants to crafting beautiful outdoor living spaces, our experts do it all.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Licensed, Bonded & Insured</div>
                    <div className="text-gray-600">Full protection and peace of mind for every project</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Same-Week Service Available</div>
                    <div className="text-gray-600">Fast scheduling for urgent projects and time-sensitive work</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Expert Team</div>
                    <div className="text-gray-600">Experienced professionals committed to excellence</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <img 
                src="https://images.unsplash.com/photo-1599629954294-c8037654bc01?q=80&w=1000&auto=format&fit=crop"
                alt="Professional landscaping team at work"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Proudly Serving Greater Seattle</h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-700">
            {['Seattle', 'Bellevue', 'Redmond', 'Bothell', 'Woodinville', 'Kirkland', 'Renton', 'Mercer Island', 'Sammamish', 'Issaquah', 'Newcastle', 'Kent', 'Federal Way', 'Burien', 'SeaTac', 'Tukwila'].map((city) => (
              <span key={city} className="bg-white px-4 py-2 rounded-lg border border-earth-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">Lee's</div>
                  <div className="text-xs text-gray-400">General Landscaping</div>
                </div>
              </div>
              <p className="text-gray-400">
                30+ years of professional landscaping excellence serving the greater Seattle area.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Yard Service</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Landscape Design</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Lawn Care</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Hardscaping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="#testimonials" className="hover:text-primary-400 transition-colors">Reviews</a></li>
                <li><a href="#services" className="hover:text-primary-400 transition-colors">Service Areas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+12063122445" className="hover:text-primary-400 transition-colors">(206) 312-2445</a>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>12224 5th Ave S<br />Seattle, WA 98168</span>
                </li>
                <li className="text-sm">
                  Mon-Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 9:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-earth-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Lee's General Landscaping. All rights reserved. | Licensed, Bonded & Insured</p>
          </div>
        </div>
      </footer>
    </>
  )
}
