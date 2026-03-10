"use client";

import { useState, useEffect, useMemo } from "react";

interface PickupTimeSelectorProps {
  accentColor?: string;
  orderType: "pickup" | "delivery" | "dine-in";
  onTimeSelected: (time: string | null) => void;
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  const now = new Date();
  // Round up to next 15-minute interval + 20 min prep time
  const start = new Date(now);
  start.setMinutes(Math.ceil((now.getMinutes() + 20) / 15) * 15, 0, 0);

  // Generate slots for next 4 hours
  for (let i = 0; i < 16; i++) {
    const slot = new Date(start.getTime() + i * 15 * 60 * 1000);
    // Don't go past 10 PM
    if (slot.getHours() >= 22) break;

    const hours = slot.getHours();
    const minutes = slot.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    slots.push(`${displayHour}:${minutes} ${ampm}`);
  }

  return slots;
}

export function PickupTimeSelector({
  accentColor = "#D4A574",
  orderType,
  onTimeSelected,
}: PickupTimeSelectorProps) {
  const [mode, setMode] = useState<"asap" | "scheduled">("asap");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  // Refresh trigger — increments every 5 minutes to regenerate stale slots
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRefreshKey((k) => k + 1), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const timeSlots = useMemo(() => generateTimeSlots(), [refreshKey]);

  // If the previously selected slot is no longer available, clear it
  useEffect(() => {
    if (selectedSlot && !timeSlots.includes(selectedSlot)) {
      setSelectedSlot(null);
      if (mode === "scheduled") {
        onTimeSelected(null);
      }
    }
  }, [timeSlots, selectedSlot, mode, onTimeSelected]);

  const label = orderType === "delivery" ? "Delivery" : orderType === "dine-in" ? "Dine-in" : "Pickup";
  const asapEstimate = orderType === "delivery" ? "30-45 min" : "15-25 min";

  const handleModeChange = (newMode: "asap" | "scheduled") => {
    setMode(newMode);
    if (newMode === "asap") {
      setSelectedSlot(null);
      onTimeSelected(null);
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    onTimeSelected(slot);
  };

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold text-gray-700">{label} Time</h3>

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => handleModeChange("asap")}
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            mode === "asap"
              ? "text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          style={mode === "asap" ? { backgroundColor: accentColor } : undefined}
        >
          ASAP ({asapEstimate})
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("scheduled")}
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            mode === "scheduled"
              ? "text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          style={mode === "scheduled" ? { backgroundColor: accentColor } : undefined}
        >
          Schedule
        </button>
      </div>

      {mode === "scheduled" && (
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => handleSlotSelect(slot)}
              className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                selectedSlot === slot
                  ? "text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              style={selectedSlot === slot ? { backgroundColor: accentColor } : undefined}
            >
              {slot}
            </button>
          ))}
          {timeSlots.length === 0 && (
            <p className="col-span-4 py-4 text-center text-sm text-gray-400">
              No time slots available today
            </p>
          )}
        </div>
      )}
    </div>
  );
}
