import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | NorthStar Synergy",
  description: "Find answers to common questions about NorthStar Synergy restaurant website platform.",
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does NorthStar Synergy cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer three plans: Starter ($99/mo), Growth ($149/mo), and Pro ($249/mo). All plans include hosting, SSL, and basic SEO.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a 14-day free trial on all plans. No credit card required to start. You'll get full access to all features during the trial period.",
      },
    },
    {
      "@type": "Question",
      name: "How do online orders work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customers place orders through your website. You receive notifications via email and SMS. Orders are processed through Square POS if integrated, or through our built-in order management dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my own domain name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! On Growth and Pro plans, you can connect your own domain. Go to Settings > Domain, enter your domain, and follow the DNS setup instructions. We handle SSL certificates automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign up at northstarsynergy.org/pricing. We'll build your custom site within 48 hours. Review and approve the design, then we handle domain setup and go live.",
      },
    },
  ],
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      {children}
    </>
  );
}
