// NORTHSTAR WEBSITE TEMPLATE ENGINE v1.0
// Derived from Lustre Services v2 (Opus 4.6 baseline)
// Reusable for any local service business
// Swap these variables per client:

const CLIENT = {
  name: "{{BUSINESS_NAME}}",
  tagline: "{{TAGLINE}}",
  phone: "{{PHONE}}",
  email: "{{EMAIL}}",
  location: "{{CITY, ST}}",
  services: ["{{SERVICE_1}}", "{{SERVICE_2}}", "{{SERVICE_3}}", "{{SERVICE_4}}"],
  pricing: { starter: 99, professional: 199, premium: 299 },
  logo: "{{LOGO_URL}}",
  heroImage: "{{HERO_IMAGE_URL}}",
  galleryImages: ["{{IMG1}}", "{{IMG2}}", "{{IMG3}}"],
  testimonials: [
    { name: "{{NAME}}", role: "{{ROLE}}", quote: "{{QUOTE}}", stars: 5 }
  ],
  serviceAreas: ["{{AREA1}}", "{{AREA2}}", "{{AREA3}}"]
};

const THEMES = {
  landscaping: {
    primary: "#1a3a8a",
    secondary: "#22a652",
    accent: "#FFD54F",
    heroEmojis: ["🌿", "🌳", "🏡"]
  },
  cleaning: {
    primary: "#007BFF",
    secondary: "#00C9A7",
    accent: "#FFF59D",
    heroEmojis: ["✨", "🧹", "🏠"]
  },
  contractor: {
    primary: "#D32F2F",
    secondary: "#FFA726",
    accent: "#B0BEC5",
    heroEmojis: ["🔨", "🏗️", "📐"]
  },
  default: {
    primary: "#0F2340",
    secondary: "#D4A574",
    accent: "#FFD54F",
    heroEmojis: ["★", "✦", "✓"]
  }
};

export function generateSite(config) {
  // Returns complete JSX for deployment
  // Swappable: colors, services, pricing, images, testimonials
  return `<jsx template here>`;
}

// Deployment: npx create-vite client-site --template react
// Replace src/App.jsx with generated JSX
// Deploy: vercel --prod or netlify deploy --prod
