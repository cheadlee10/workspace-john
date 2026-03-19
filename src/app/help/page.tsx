"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { FaqArticle } from "@/types/business";

const CATEGORY_ICONS: Record<string, string> = {
  Billing: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  Website: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  Ordering: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
  Technical: "M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H20.25M4.5 12a7.5 7.5 0 1015 0 7.5 7.5 0 00-15 0z",
  "Getting Started": "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75",
};

export default function HelpPage() {
  const [faqs, setFaqs] = useState<FaqArticle[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<{ id: string; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/support/public")
      .then((r) => r.json())
      .then((data) => {
        setFaqs(data.faqs || []);
        setLoading(false);
      });
  }, []);

  // Search with debounce
  useEffect(() => {
    if (!search.trim()) return;
    const timeout = setTimeout(() => {
      fetch(`/api/support/public?q=${encodeURIComponent(search)}`)
        .then((r) => r.json())
        .then((data) => setFaqs(data.faqs || []));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Reset when search is cleared
  useEffect(() => {
    if (search === "") {
      fetch("/api/support/public")
        .then((r) => r.json())
        .then((data) => setFaqs(data.faqs || []));
    }
  }, [search]);

  const categories = useMemo(() => {
    const cats = new Map<string, FaqArticle[]>();
    for (const faq of faqs) {
      const cat = cats.get(faq.category) || [];
      cat.push(faq);
      cats.set(faq.category, cat);
    }
    return cats;
  }, [faqs]);

  const filteredFaqs = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : faqs;

  const handleTicketSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTicketSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/support/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketResult({ id: data.ticket.id, message: data.message });
        (e.target as HTMLFormElement).reset();
      }
    } finally {
      setTicketSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">
            NorthStar Synergy
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/help" className="text-sm font-medium text-gray-900">
              Help Center
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-white">How can we help?</h1>
        <p className="mt-2 text-gray-400">Search our knowledge base or submit a support request</p>
        <div className="mx-auto mt-6 max-w-xl">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers... (e.g., billing, menu, domain)"
              aria-label="Search FAQs"
              className="w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="h-8 w-8 animate-spin text-gray-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <>
            {/* Category Pills */}
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  !activeCategory
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Topics
              </button>
              {Array.from(categories.keys()).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat} ({categories.get(cat)!.length})
                </button>
              ))}
            </div>

            {/* Category Cards (when no filter active and no search) */}
            {!activeCategory && !search && (
              <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from(categories.entries()).map(([cat, items]) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors">
                      <svg
                        className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={CATEGORY_ICONS[cat] || "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"}
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{cat}</h3>
                    <p className="mt-1 text-xs text-gray-500">{items.length} article{items.length !== 1 ? "s" : ""}</p>
                  </button>
                ))}
              </div>
            )}

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  <p className="mt-3 text-gray-500">No articles found for &ldquo;{search}&rdquo;</p>
                  <p className="mt-1 text-sm text-gray-400">Try different keywords or submit a support request below</p>
                </div>
              ) : (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-500">
                          {faq.category}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      <svg
                        className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                          expandedFaq === faq.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="border-t border-gray-100 px-5 py-4">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                            {faq.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1">
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    onClick={() => setSearch(tag)}
                                    className="cursor-pointer rounded bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>

            {/* Support Ticket Section */}
            <div className="mt-12 rounded-xl border border-gray-200 bg-white p-8">
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-900">Still need help?</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Submit a support request and we&apos;ll get back to you within 24 hours
                </p>
                {!showTicketForm && !ticketResult && (
                  <button
                    onClick={() => setShowTicketForm(true)}
                    className="mt-4 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Submit a Request
                  </button>
                )}
              </div>

              {/* Success Message */}
              {ticketResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center"
                >
                  <svg className="mx-auto h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-sm font-semibold text-emerald-700">
                    Ticket {ticketResult.id} created
                  </p>
                  <p className="mt-1 text-sm text-emerald-600">{ticketResult.message}</p>
                  <button
                    onClick={() => {
                      setTicketResult(null);
                      setShowTicketForm(false);
                    }}
                    className="mt-3 text-sm text-emerald-600 underline hover:text-emerald-700"
                  >
                    Submit another request
                  </button>
                </motion.div>
              )}

              {/* Ticket Form */}
              {showTicketForm && !ticketResult && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleTicketSubmit}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="help-name" className="mb-1 block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="help-name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="help-email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="help-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="help-subject" className="mb-1 block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      id="help-subject"
                      name="subject"
                      required
                      placeholder="Brief description of your issue"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="help-message" className="mb-1 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="help-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Please describe your issue in detail..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={ticketSubmitting}
                      className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                      {ticketSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTicketForm(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                <svg className="mx-auto h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">Email Support</p>
                <p className="mt-1 text-xs text-gray-500">support@northstarsynergy.org</p>
                <p className="mt-0.5 text-xs text-gray-400">Response within 4 hours</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                <svg className="mx-auto h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">Business Hours</p>
                <p className="mt-1 text-xs text-gray-500">Mon-Fri, 9am-6pm PST</p>
                <p className="mt-0.5 text-xs text-gray-400">Emergency support 24/7</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                <svg className="mx-auto h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">SLA Guarantee</p>
                <p className="mt-1 text-xs text-gray-500">99.9% uptime</p>
                <p className="mt-0.5 text-xs text-gray-400">24-hour response time</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-5xl text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} NorthStar Synergy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
