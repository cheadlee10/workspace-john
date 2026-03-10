// POOL SERVICES TEMPLATE — Derived from Lustre v2
// Swap: logo, hero image, service names, testimonials, service areas

const POOL_SERVICES = {
  name: "{{POOL_COMPANY_NAME}}",
  tagline: "Crystal Clear Pools. Worry-Free Service.",
  services: [
    { icon: "💧", title: "Weekly Maintenance", items: ["Chemical balancing", "Filter cleaning", "Debris removal", "Equipment check"] },
    { icon: "🔧", title: "Equipment Repair", items: ["Pump replacement", "Heater repair", "Filter upgrades", "Automation systems"] },
    { icon: "🌊", title: "Opening/Closing", items: ["Spring startup", "Winterization", "Cover installation", "Line blowing"] },
    { icon: "✨", title: "Renovation", items: ["Resurfacing", "Tile repair", "Deck coating", "LED lighting"] }
  ],
  pricing: { s: 65, m: 95, l: 145 }, // per visit for maintenance
  colors: { primary: "#0077B6", accent: "#00B4D8", highlight: "#FFD54F" }
};
// Use Lustre v2 component structure, swap services/pricing/colors
