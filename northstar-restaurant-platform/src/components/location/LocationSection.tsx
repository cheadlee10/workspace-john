"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { isOpen } from "@/lib/utils";
import { useDesign } from "@/components/design/DesignProvider";

interface LocationSectionProps {
  restaurant: Restaurant;
}

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
};

export function LocationSection({ restaurant }: LocationSectionProps) {
  const { location, hours, contact, name } = restaurant;
  const openStatus = isOpen(hours);
  const design = useDesign();
  const { palette } = design;

  const sortedHours = [...hours].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  )}`;

  const hasCoords = Number.isFinite(location.lat) && Number.isFinite(location.lng) && (location.lat !== 0 || location.lng !== 0);
  const delta = 0.005;
  const osMapEmbedUrl = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - delta}%2C${location.lat - delta}%2C${location.lng + delta}%2C${location.lat + delta}&layer=mapnik&marker=${location.lat}%2C${location.lng}`
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
          <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: palette.text }}>
            Find Us
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full" style={{ backgroundColor: palette.accent }} />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden shadow-md"
            style={{ borderRadius: design.layout.cornerRadius }}
          >
            <div className="aspect-[4/3] w-full" style={{ backgroundColor: palette.surfaceAlt }}>
              {osMapEmbedUrl ? (
                <iframe
                  src={osMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "8px" }}
                  loading="lazy"
                  title={`${name} map location`}
                />
              ) : (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center"
                  style={{ color: palette.textMuted }}
                >
                  Map unavailable — tap to open directions
                </a>
              )}
            </div>
            <div className="border-t px-4 py-3 text-center" style={{ borderColor: palette.menuCardBorder, backgroundColor: palette.surface }}>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-2"
                style={{ color: palette.accent }}
              >
                Open interactive map in Google Maps
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: palette.textMuted }}>Address</h3>
              <p className="text-lg" style={{ color: palette.text }}>{location.address}</p>
              <p className="text-lg" style={{ color: palette.text }}>{location.city}, {location.state} {location.zip}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                style={{ color: palette.accent }}
              >
                Get Directions
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: palette.textMuted }}>Contact</h3>
              <a href={`tel:${contact.phone}`} className="block text-lg transition-colors hover:underline" style={{ color: palette.text }}>{contact.phone}</a>
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="block text-lg transition-colors hover:underline" style={{ color: palette.text }}>{contact.email}</a>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: palette.textMuted }}>Hours</h3>
              <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${openStatus.isCurrentlyOpen ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                <span className={`h-2 w-2 rounded-full ${openStatus.isCurrentlyOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                {openStatus.isCurrentlyOpen ? "Open Now" : "Closed"} &middot; {openStatus.nextChange}
              </div>
              <div className="space-y-1.5">
                {sortedHours.map((h) => {
                  const today = dayOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] === h.day;
                  return (
                    <div
                      key={h.day}
                      className="flex items-center justify-between px-3 py-1.5 text-sm"
                      style={{
                        borderRadius: "6px",
                        ...(today ? { backgroundColor: palette.surfaceAlt, fontWeight: 500, color: palette.text } : { color: palette.textMuted }),
                      }}
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
