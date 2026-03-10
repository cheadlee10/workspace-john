"use client";

import { useState } from "react";

const SERVICES = [
  {
    title: "Landscape Design & Installation",
    description:
      "Custom landscape plans, planting design, and complete installation built to elevate curb appeal and long-term property value.",
    icon: "✦",
  },
  {
    title: "Weekly Lawn Care",
    description:
      "Reliable mowing, edging, seasonal fertilization, and turf health programs to keep your lawn crisp and consistently green.",
    icon: "◉",
  },
  {
    title: "Tree Pruning & Removal",
    description:
      "Safe, professional trimming and removals that improve tree health, reduce risk, and preserve a clean architectural look.",
    icon: "✂",
  },
  {
    title: "Irrigation Systems",
    description:
      "Smart sprinkler installs, diagnostics, and seasonal service designed for efficient water use and healthy landscapes.",
    icon: "◌",
  },
  {
    title: "Custom Deck Building",
    description:
      "Refined outdoor living decks with premium materials and craftsmanship tailored to your home and entertaining style.",
    icon: "▦",
  },
  {
    title: "Fence Design & Construction",
    description:
      "Privacy and decorative fencing options that blend security with strong visual cohesion across your property.",
    icon: "▤",
  },
];

const REVIEWS = [
  {
    quote:
      "Ever-Green turned a tired backyard into a space we use every day. Clean work, excellent communication, and quality that feels premium.",
    author: "Michael R.",
  },
  {
    quote:
      "They've maintained our property for years and the consistency is unmatched. Always on time, always professional.",
    author: "Sarah T.",
  },
  {
    quote:
      "From concept to completion, their team delivered exactly what they promised. Beautiful deck and flawless cleanup.",
    author: "David & Lisa K.",
  },
];

const AREAS = ["Everett", "Marysville", "Lake Stevens", "Mukilteo", "Edmonds", "Lynnwood", "Mill Creek"];

const STATS = [
  { value: "25+", label: "Years serving Snohomish County" },
  { value: "1,200+", label: "Completed residential projects" },
  { value: "5★", label: "Client-rated craftsmanship" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1622227922682-56c92e523e83?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
];

function LeafMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="leaf-mark-svg">
      <path d="M4 19c0-9 7-15 19-15-1 12-7 19-16 21-2 0-3-2-3-6Z" fill="currentColor" />
      <path d="M10 22c5-7 10-11 16-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#" className="brand" aria-label="Ever-Green Landscaping home">
            <span className="brand-mark">
              <LeafMark />
            </span>
            <span>
              Ever-Green <strong>Landscaping</strong>
            </span>
          </a>

          <nav className="nav desktop-nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="btn btn-sm btn-gold desktop-cta" href="tel:4253464961">
            Call (425) 346-4961
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-nav" id="mobile-nav">
            <a href="#services" onClick={() => setMobileOpen(false)}>
              Services
            </a>
            <a href="#about" onClick={() => setMobileOpen(false)}>
              About
            </a>
            <a href="#testimonials" onClick={() => setMobileOpen(false)}>
              Testimonials
            </a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Contact
            </a>
            <a className="btn btn-gold" href="tel:4253464961" onClick={() => setMobileOpen(false)}>
              Call Now
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-glow hero-glow-a" aria-hidden="true" />
          <div className="hero-glow hero-glow-b" aria-hidden="true" />

          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">Premium Outdoor Craftsmanship · Since 2001</p>
              <h1>Landscaping that makes your home the standout on the block.</h1>
              <p className="hero-copy">
                We design, build, and maintain high-end outdoor environments across Everett and surrounding communities—done with white-glove communication and exacting detail.
              </p>
              <div className="hero-actions">
                <a className="btn btn-gold" href="tel:4253464961">
                  Request a Consultation
                </a>
                <a className="btn btn-ghost" href="#services">
                  Explore Services
                </a>
              </div>
              <div className="hero-trust-row">
                <span>Licensed & Insured</span>
                <span>1-Day Quote Turnaround</span>
                <span>Family-Owned Local Team</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <article className="glass-card hero-quote-card float-slow">
                <p className="mini-label">Current Availability</p>
                <h2>Spring projects now booking</h2>
                <p>Design consults and lawn programs currently open in Everett, Mukilteo, and Mill Creek.</p>
              </article>

              <article className="glass-card hero-kpi-card float-fast">
                <p className="mini-label">Project Quality Snapshot</p>
                <div className="kpi-grid">
                  <div>
                    <strong>98%</strong>
                    <span>Clients refer us</span>
                  </div>
                  <div>
                    <strong>1,200+</strong>
                    <span>Installs delivered</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-band">
          <div className="container gallery-grid">
            {GALLERY.map((image, index) => (
              <article key={image} className="gallery-card" style={{ backgroundImage: `url(${image})` }}>
                <span>Project {index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="stats">
          <div className="container stats-grid">
            {STATS.map((stat) => (
              <article key={stat.label}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <p className="eyebrow">Core Services</p>
            <h2 className="section-title">One partner for every phase of your landscape</h2>
            <p className="section-copy">
              From concept planning to recurring care, our team combines design precision with disciplined project execution.
            </p>
            <div className="service-grid">
              {SERVICES.map((service) => (
                <article key={service.title} className="card">
                  <p className="service-icon" aria-hidden="true">
                    {service.icon}
                  </p>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section-dark">
          <div className="container split">
            <div>
              <p className="eyebrow">About Ever-Green</p>
              <h2 className="section-title">A local team with a premium standard</h2>
              <p className="section-copy">
                Family-owned and based in Everett, we bring the care of a neighborhood business with the systems and consistency expected from high-end providers.
              </p>
              <p className="section-copy">
                Every project is managed with proactive communication, clean job sites, and finishing work that respects your home.
              </p>
            </div>
            <aside className="about-panel">
              <h3>Service area</h3>
              <ul>
                {AREAS.map((area) => (
                  <li key={area}>{area}, WA</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <p className="eyebrow">Client Testimonials</p>
            <h2 className="section-title">Trusted by homeowners across Snohomish County</h2>
            <div className="review-grid">
              {REVIEWS.map((review) => (
                <blockquote key={review.author} className="review-card">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                  <cite>— {review.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section cta-section">
          <div className="container cta-box">
            <div>
              <p className="eyebrow">Start Your Project</p>
              <h2 className="section-title">Book your free estimate</h2>
              <p className="section-copy">
                Call now or send details by email. We&apos;ll follow up with next steps, budget guidance, and scheduling options.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn btn-gold" href="tel:4253464961">
                (425) 346-4961
              </a>
              <a className="btn btn-ghost-dark" href="mailto:evergreen_landscaping@ymail.com">
                evergreen_landscaping@ymail.com
              </a>
              <p>6305 Elliott Way, Everett, WA 98203 · Mon–Fri 8:00 AM–5:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      <a className="mobile-sticky-cta" href="tel:4253464961">
        Call for Free Estimate
      </a>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Ever-Green Landscaping. All rights reserved.</p>
          <a href="https://www.yelp.com/biz/ever-green-landscaping-everett" target="_blank" rel="noopener noreferrer">
            View Yelp Reviews
          </a>
        </div>
      </footer>
    </div>
  );
}
