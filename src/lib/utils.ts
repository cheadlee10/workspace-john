import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateMenuItemUrl(
  restaurantSlug: string,
  sectionSlug: string,
  itemSlug: string
): string {
  return `/${restaurantSlug}/menu/${sectionSlug}/${itemSlug}`;
}

/**
 * Convert 24h time string (e.g. "21:30") to 12h AM/PM format (e.g. "9:30 PM")
 */
export function formatTime(time24: string): string {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minute} ${ampm}`;
}

export function isOpen(
  hours: { day: string; open: string; close: string; closed: boolean }[]
): { isCurrentlyOpen: boolean; nextChange: string } {
  const now = new Date();
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = dayNames[now.getDay()];
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const todayHours = hours.find((h) => h.day === today);

  if (!todayHours || todayHours.closed) {
    for (let i = 1; i <= 7; i++) {
      const nextDay = dayNames[(now.getDay() + i) % 7];
      const nextDayHours = hours.find((h) => h.day === nextDay);
      if (nextDayHours && !nextDayHours.closed) {
        return {
          isCurrentlyOpen: false,
          nextChange: `Opens ${nextDay.charAt(0).toUpperCase() + nextDay.slice(1)} at ${formatTime(nextDayHours.open)}`,
        };
      }
    }
    return { isCurrentlyOpen: false, nextChange: "Hours not available" };
  }

  // Handle overnight hours (e.g., open: "17:00", close: "02:00")
  const closesAfterMidnight = todayHours.close < todayHours.open;

  if (closesAfterMidnight) {
    // Open from open time until midnight, or from midnight until close time
    if (currentTime >= todayHours.open || currentTime < todayHours.close) {
      return { isCurrentlyOpen: true, nextChange: `Closes at ${formatTime(todayHours.close)}` };
    }
  } else {
    if (currentTime >= todayHours.open && currentTime < todayHours.close) {
      return { isCurrentlyOpen: true, nextChange: `Closes at ${formatTime(todayHours.close)}` };
    }
  }

  if (currentTime < todayHours.open) {
    return { isCurrentlyOpen: false, nextChange: `Opens today at ${formatTime(todayHours.open)}` };
  }

  return { isCurrentlyOpen: false, nextChange: "Closed for today" };
}
