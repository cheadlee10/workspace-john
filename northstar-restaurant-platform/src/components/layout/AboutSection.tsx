"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { useDesign } from "@/components/design/DesignProvider";

interface AboutSectionProps {
  restaurant: Restaurant;
}

export function AboutSection({ restaurant }: AboutSectionProps) {
  const { name, description, cuisine = [], socialMedia = {} as Restaurant['socialMedia'] } = restaurant;
  const design = useDesign();
  const { palette } = design;

  const socialLinks = [
    { key: "instagram", url: socialMedia.instagram, label: "Instagram" },
    { key: "facebook", url: socialMedia.facebook, label: "Facebook" },
    { key: "tiktok", url: socialMedia.tiktok, label: "TikTok" },
    { key: "twitter", url: socialMedia.twitter, label: "Twitter" },
    { key: "yelp", url: socialMedia.yelp, label: "Yelp" },
  ].filter((s) => s.url);

  return (
    <section
      id="about"
      className="py-16 md:py-24"
      style={{ backgroundColor: palette.surfaceAlt }}
      aria-label={`About ${name}`}
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: palette.text }}>
            Our Story
          </h2>
          <div
            className="mx-auto mb-8 h-1 w-16 rounded-full"
            style={{ backgroundColor: palette.accent }}
          />
          {(description || "")
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, idx) => (
              <p key={idx} className="mx-auto mb-5 max-w-2xl text-lg leading-relaxed" style={{ color: palette.textMuted }}>
                {paragraph}
              </p>
            ))}

          {/* Cuisine Tags */}
          {cuisine.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {cuisine.map((c) => (
                <span
                  key={c}
                  className="border px-4 py-1.5 text-sm font-medium capitalize"
                  style={{
                    borderColor: palette.accent,
                    color: palette.accent,
                    borderRadius: design.layout.cornerRadius,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:text-white"
                  style={{ backgroundColor: palette.surface, color: palette.textMuted }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = palette.accent;
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = palette.surface;
                    (e.currentTarget as HTMLElement).style.color = palette.textMuted;
                  }}
                  aria-label={`Visit us on ${social.label}`}
                >
                  <SocialIcon platform={social.key} />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const className = "h-5 w-5";
  switch (platform) {
    case "instagram":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "yelp":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.16 12.594l-4.995 1.807c-.96.345-1.97-.527-1.632-1.508l2.218-6.395c.336-.97 1.727-.89 1.949.112l1.694 7.645c.08.35-.158.7-.5.82-.097.033-.153.043-.234.02zm-8.535 4.89l2.218 4.403c.44.882-.434 1.832-1.36 1.476l-5.32-2.057c-.93-.36-1.048-1.63-.19-2.143l4.16-2.49c.32-.192.71-.122.952.148.123.138.183.256.21.387l.33 1.276zm.45-4.164l4.944 1.98c.97.39.82 1.795-.21 1.987l-6.63 1.22c-.98.18-1.695-.82-1.19-1.685l3.27-5.587c.19-.327.574-.453.91-.3.173.078.293.183.37.327l.536 1.058zM7.395 5.197l2.4 6.32c.37.97-.55 1.95-1.54 1.63L2.13 11.05c-.99-.32-1.07-1.71-.12-2.15l5.76-2.69c.35-.163.757-.053.97.274.11.167.147.29.155.413l.5 1.3zm4.79-4.49l.18 7.82c.02 1.03-1.12 1.67-1.93.95L5.31 5.027c-.78-.7-.38-2 .63-2.12l6.13-.75c.37-.046.72.15.88.48.08.167.1.3.09.43l-.055.64z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
}
