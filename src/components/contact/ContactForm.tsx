"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesign } from "@/components/design/DesignProvider";

interface ContactFormProps {
  accentColor?: string;
  restaurantName: string;
  restaurantEmail?: string;
  restaurantPhone: string;
  enableCatering?: boolean;
  enableReservations?: boolean;
}

type FormMode = "contact" | "catering" | "reservation";

export function ContactForm({
  accentColor,
  restaurantName,
  restaurantEmail,
  restaurantPhone,
  enableCatering = false,
  enableReservations = false,
}: ContactFormProps) {
  const [mode, setMode] = useState<FormMode>("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const design = useDesign();
  const { palette } = design;
  const accent = accentColor || palette.accent;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          mode,
          restaurantName,
          restaurantEmail,
          ...(mode === "reservation" && {
            date: data.get("date"),
            time: data.get("time"),
            partySize: data.get("partySize"),
          }),
          ...(mode === "catering" && {
            eventDate: data.get("eventDate"),
            guestCount: data.get("guestCount"),
            eventType: data.get("eventType"),
            budget: data.get("budget"),
          }),
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modes: { key: FormMode; label: string; show: boolean }[] = [
    { key: "contact", label: "Contact Us", show: true },
    { key: "catering", label: "Catering", show: enableCatering },
    { key: "reservation", label: "Reserve", show: enableReservations },
  ];

  const visibleModes = modes.filter((m) => m.show);

  const inputStyle: React.CSSProperties = {
    backgroundColor: palette.surface,
    borderColor: palette.menuCardBorder,
    color: palette.text,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: design.layout.cornerRadius,
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 sm:py-20" style={{ backgroundColor: palette.surfaceAlt }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${accent}15` }}>
            <svg className="h-8 w-8" fill="none" stroke={accent} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold" style={{ color: palette.text }}>Message Sent!</h3>
          <p style={{ color: palette.textMuted }}>
            Thank you for reaching out to {restaurantName}. We&apos;ll get back to you shortly.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-20" style={{ backgroundColor: palette.surfaceAlt }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold" style={{ color: palette.text }}>Get in Touch</h2>
          <p style={{ color: palette.textMuted }}>
            We&apos;d love to hear from you. Reach out with questions, feedback, or special requests.
          </p>
        </div>

        {/* Mode Tabs */}
        {visibleModes.length > 1 && (
          <div className="mb-8 flex justify-center gap-2">
            {visibleModes.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className="px-5 py-2 text-sm font-medium transition-all"
                style={{
                  borderRadius: design.layout.cornerRadius,
                  ...(mode === m.key
                    ? { backgroundColor: accent, color: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }
                    : { backgroundColor: palette.surface, color: palette.textMuted }),
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {submitError && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="border p-6 shadow-sm sm:p-8"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.menuCardBorder,
            borderRadius: design.layout.cornerRadius,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Name</label>
                  <input id="contact-name" name="name" type="text" required className="w-full px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2" style={inputStyle} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Email</label>
                  <input id="contact-email" name="email" type="email" required className="w-full px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2" style={inputStyle} placeholder="you@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Phone</label>
                <input id="contact-phone" name="phone" type="tel" className="w-full px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2" style={inputStyle} placeholder="(206) 555-0142" />
              </div>

              {mode === "reservation" && (
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="res-date" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Date</label>
                    <input id="res-date" name="date" type="date" required className="w-full px-4 py-3 text-sm" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="res-time" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Time</label>
                    <input id="res-time" name="time" type="time" required className="w-full px-4 py-3 text-sm" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="res-party" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Party Size</label>
                    <select id="res-party" name="partySize" required className="w-full px-4 py-3 text-sm" style={inputStyle}>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {mode === "catering" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cat-date" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Event Date</label>
                      <input id="cat-date" name="eventDate" type="date" required className="w-full px-4 py-3 text-sm" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="cat-guests" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Number of Guests</label>
                      <input id="cat-guests" name="guestCount" type="number" min="10" required className="w-full px-4 py-3 text-sm" style={inputStyle} placeholder="50" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cat-type" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Event Type</label>
                    <select id="cat-type" name="eventType" className="w-full px-4 py-3 text-sm" style={inputStyle}>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding / Reception</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="holiday">Holiday Party</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cat-budget" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>Budget Range</label>
                    <select id="cat-budget" name="budget" className="w-full px-4 py-3 text-sm" style={inputStyle}>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium" style={{ color: palette.text }}>
                  {mode === "reservation" ? "Special Requests" : mode === "catering" ? "Tell us about your event" : "Message"}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required={mode === "contact"}
                  className="w-full resize-none px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
                  style={inputStyle}
                  placeholder={
                    mode === "reservation"
                      ? "Any dietary restrictions, special occasions, or seating preferences..."
                      : mode === "catering"
                        ? "Menu preferences, dietary restrictions, setup requirements..."
                        : "Your message..."
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70"
                style={{
                  backgroundColor: accent,
                  borderRadius: design.layout.cornerRadius,
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : mode === "reservation" ? "Request Reservation" : mode === "catering" ? "Submit Catering Inquiry" : "Send Message"}
              </button>
            </motion.div>
          </AnimatePresence>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm" style={{ color: palette.textMuted }}>
          <a href={`tel:${restaurantPhone}`} className="flex items-center gap-2 transition-colors hover:opacity-80">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {restaurantPhone}
          </a>
          {restaurantEmail && (
            <a href={`mailto:${restaurantEmail}`} className="flex items-center gap-2 transition-colors hover:opacity-80">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {restaurantEmail}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
