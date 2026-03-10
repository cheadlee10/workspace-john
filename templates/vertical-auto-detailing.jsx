// AUTO DETAILING TEMPLATE — Derived from Lustre v2
const AUTO_DETAILING = {
  name: "{{DETAILING_COMPANY_NAME}}",
  tagline: "Showroom Shine. Doorstep Service.",
  services: [
    { icon: "🚗", title: "Exterior Wash", items: ["Hand wash", "Clay bar", "Wax protection", "Wheel detailing"] },
    { icon: "🛋️", title: "Interior Detail", items: ["Steam cleaning", "Leather conditioning", "Odor removal", "Dashboard polish"] },
    { icon: "✨", title: "Full Detail", items: ["Paint correction", "Ceramic coating", "Ceramic coating", "Protection film"] },
    { icon: "🏢", title: "Fleet Service", items: ["Corporate accounts", "Dealership prep", "Rental turnover", "RV detailing"] }
  ],
  pricing: { s: 85, m: 165, l: 325 }, // per service
  colors: { primary: "#1A1A2E", accent: "#4ECDC4", highlight: "#FFD54F" }
};
