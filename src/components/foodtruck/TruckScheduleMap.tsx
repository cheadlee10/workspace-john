"use client";

import { useState } from "react";
import type { TruckSchedule, DayOfWeek } from "@/types/restaurant";

interface TruckScheduleMapProps {
  schedule: TruckSchedule[];
  truckName: string;
  accentColor?: string;
}

const DAY_ORDER: DayOfWeek[] = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

const DAY_SHORT: Record<DayOfWeek, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export function TruckScheduleMap({
  schedule,
  truckName,
  accentColor = "#D4A574",
}: TruckScheduleMapProps) {
  const today = DAY_ORDER[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(today);

  const todaySchedule = schedule.filter((s) => s.day === selectedDay);
  const selectedLocation = todaySchedule[0];

  // Build Google Maps embed URL
  const mapSrc = selectedLocation
    ? `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(
        selectedLocation.address
      )}&zoom=15`
    : null;

  return (
    <section id="locations" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Find {truckName}</h2>
          <p className="text-gray-500">Check our weekly schedule to find us near you</p>
        </div>

        {/* Day Selector */}
        <div className="mb-8 flex justify-center gap-1 sm:gap-2">
          {DAY_ORDER.map((day) => {
            const hasSchedule = schedule.some((s) => s.day === day);
            const isToday = day === today;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                disabled={!hasSchedule}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                  selectedDay === day
                    ? "text-white shadow-sm"
                    : hasSchedule
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gray-50 text-gray-300"
                }`}
                style={selectedDay === day ? { backgroundColor: accentColor } : undefined}
              >
                {DAY_SHORT[day]}
                {isToday && (
                  <span className="absolute -right-1 -top-1 flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Schedule Card */}
        {todaySchedule.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Map */}
            <div className="relative aspect-[16/9] bg-gray-100 sm:aspect-[2/1]">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${truckName} location map`}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-400">Map requires Google Maps API key</p>
                </div>
              )}
            </div>

            {/* Location Details */}
            <div className="p-6">
              {todaySchedule.map((loc, i) => (
                <div
                  key={`${loc.day}-${i}`}
                  className={`${i > 0 ? "mt-4 border-t border-gray-100 pt-4" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{loc.locationName}</h3>
                      <p className="mt-1 text-sm text-gray-500">{loc.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: accentColor }}>
                        {loc.startTime} - {loc.endTime}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-[0.98]"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Get Directions
                    </a>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `${truckName} - ${loc.locationName}`,
                            text: `Find ${truckName} at ${loc.address} today from ${loc.startTime}-${loc.endTime}`,
                          });
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share Location
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <svg className="mx-auto mb-4 h-12 w-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-400">
              No stops scheduled for {DAY_SHORT[selectedDay]}
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Check another day or follow us on social media for updates
            </p>
          </div>
        )}

        {/* Weekly Overview */}
        <div className="mt-8">
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
            This Week&apos;s Full Schedule
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {DAY_ORDER.map((day) => {
              const daySchedule = schedule.filter((s) => s.day === day);
              if (daySchedule.length === 0) return null;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all hover:shadow-sm ${
                    selectedDay === day ? "border-gray-300 bg-gray-50" : "border-gray-100 bg-white"
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                      {day === today && (
                        <span className="ml-2 text-xs font-normal" style={{ color: accentColor }}>
                          Today
                        </span>
                      )}
                    </p>
                    {daySchedule.map((loc, i) => (
                      <p key={i} className="text-xs text-gray-500">
                        {loc.locationName}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-400">
                    {daySchedule[0].startTime}-{daySchedule[0].endTime}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
