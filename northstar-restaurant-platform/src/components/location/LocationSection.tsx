"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { isOpen } from "@/lib/utils";

interface LocationSectionProps {
  restaurant: Restaurant;
}

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export function LocationSection({ restaurant }: LocationSectionProps) {
  const { location, hours, contact, branding, name } = restaurant;
  const openStatus = isOpen(hours);
  const sortedHours = [...hours].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  )}`;

  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const mapsEmbedUrl = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(
        `${name}, ${location.address}, ${location.city}, ${location.state}`
      )}`
    : null;

  return (
    <section id="location" className="py-16 md:py-24" aria-label="Location and Hours">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Find Us</h2>
          <div
            className="mx-auto mb-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: branding.accentColor }}
          />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl shadow-md"
          >
            <div className="aspect-[4/3] w-full bg-gray-200">
              {mapsEmbedUrl ? (
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${name} location on Google Maps`}
                />
              ) : (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                >
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">View on Google Maps</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            {/* Address */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Address
              </h3>
              <p className="text-lg text-gray-900">{location.address}</p>
              <p className="text-lg text-gray-900">
                {location.city}, {location.state} {location.zip}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                style={{ color: branding.accentColor }}
              >
                Get Directions
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Contact
              </h3>
              <a
                href={`tel:${contact.phone}`}
                className="block text-lg text-gray-900 transition-colors hover:underline"
              >
                {contact.phone}
              </a>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-lg text-gray-900 transition-colors hover:underline"
                >
                  {contact.email}
                </a>
              )}
            </div>

            {/* Hours */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Hours
              </h3>
              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                  openStatus.isCurrentlyOpen
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    openStatus.isCurrentlyOpen ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {openStatus.isCurrentlyOpen ? "Open Now" : "Closed"} &middot;{" "}
                {openStatus.nextChange}
              </div>
              <div className="space-y-1.5">
                {sortedHours.map((h) => {
                  const today =
                    dayOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] === h.day;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${
                        today ? "bg-gray-50 font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      <span>{dayLabels[h.day] || h.day}</span>
                      <span>{h.closed ? "Closed" : `${h.open} - ${h.close}`}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
