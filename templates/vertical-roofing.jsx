// ROOFING CONTRACTOR TEMPLATE — Derived from Lustre v2
const ROOFING_SERVICES = {
  name: "{{ROOFING_COMPANY_NAME}}",
  tagline: "Quality Above. Protection Below.",
  services: [
    { icon: "🏠", title: "Roof Replacement", items: ["Asphalt shingles", "Metal roofing", "Flat roofs", "Tile roofing"] },
    { icon: "🔍", title: "Roof Repair", items: ["Leak detection", "Storm damage", "Emergency patches", "Gutter repair"] },
    { icon: "🛡️", title: "Inspections", items: ["Annual checkup", "Pre-sale inspection", "Insurance claims", "Drone surveys"] },
    { icon: "🌧️", title: "Waterproofing", items: ["Gutter installation", "Skylight sealing", "Ventilation", "Attic insulation"] }
  ],
  pricing: { s: 350, m: 850, l: 2500 }, // repair/project estimates
  colors: { primary: "#D32F2F", accent: "#FF6B6B", highlight: "#FFD54F" }
};
