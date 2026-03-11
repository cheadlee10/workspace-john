"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { useDesign } from "@/components/design/DesignProvider";

interface StickyNavProps {
  restaurant: Restaurant;
}

export function StickyNav({ restaurant }: StickyNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { name, features, contact } = restaurant;
  const design = useDesign();
  const { palette } = design;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#menu", label: "Menu" },
    ...(features.onlineOrdering ? [{ href: "#order", label: "Order Online" }] : []),
    ...(features.reservations ? [{ href: "#reservations", label: "Reservations" }] : []),
    { href: "#about", label: "About" },
    { href: "#location", label: "Location" },
    { href: "#reviews", label: "Reviews" },
    ...(features.cateringPortal ? [{ href: "#catering", label: "Catering" }] : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 right-0 top-0 z-50 border-b shadow-sm backdrop-blur-md"
        style={{
          backgroundColor: palette.navBackground,
          borderColor: palette.menuCardBorder,
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo / Name */}
          <a href="#" className="text-lg font-bold" style={{ color: palette.accent }}>
            {name}
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: palette.textMuted }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${contact.phone}`}
              className="transition-colors hover:opacity-80"
              style={{ color: palette.textMuted }}
              aria-label={`Call ${name}`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            {features.onlineOrdering && (
              <a
                href="#order"
                className="px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-[0.98]"
                style={{
                  backgroundColor: palette.accent,
                  borderRadius: design.layout.cornerRadius,
                }}
              >
                Order Now
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ color: palette.text }}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t md:hidden"
              style={{ borderColor: palette.menuCardBorder }}
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: palette.text }}
                  >
                    {item.label}
                  </a>
                ))}
                {features.onlineOrdering && (
                  <a
                    href="#order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 py-3 text-center text-sm font-semibold text-white"
                    style={{
                      backgroundColor: palette.accent,
                      borderRadius: design.layout.cornerRadius,
                    }}
                  >
                    Order Now
                  </a>
                )}
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 border-2 py-3 text-center text-sm font-semibold transition-colors"
                  style={{
                    borderColor: palette.accent,
                    color: palette.accent,
                    borderRadius: design.layout.cornerRadius,
                  }}
                >
                  Call {contact.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Fixed Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden"
        style={{
          backgroundColor: palette.surface,
          borderColor: palette.menuCardBorder,
        }}
      >
        <div className="flex gap-2">
          <a
            href="#menu"
            className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold"
            style={{
              backgroundColor: palette.surfaceAlt,
              color: palette.text,
              borderRadius: design.layout.cornerRadius,
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Menu
          </a>
          {features.onlineOrdering ? (
            <a
              href="#order"
              className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
              style={{
                backgroundColor: palette.accent,
                borderRadius: design.layout.cornerRadius,
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Order
            </a>
          ) : (
            <a
              href={`tel:${contact.phone}`}
              className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
              style={{
                backgroundColor: palette.accent,
                borderRadius: design.layout.cornerRadius,
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          )}
        </div>
      </div>
    </>
  );
}
