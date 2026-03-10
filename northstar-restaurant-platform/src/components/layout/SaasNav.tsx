"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND = "#0f766e";

export function SaasNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: BRAND }}
          >
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">NorthStar Synergy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Pricing</a>
          <Link href="/help" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Help</Link>
          <Link href="/demo" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Live Demo</Link>
          <Link href="/contact" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 sm:block"
          >
            Log In
          </Link>
          <Link
            href="/demo"
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 sm:inline-flex"
            style={{ backgroundColor: BRAND }}
          >
            See It Live
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#features" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Features</a>
            <a href="#pricing" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Pricing</a>
            <Link href="/help" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Help Center</Link>
            <Link href="/demo" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Live Demo</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Contact</Link>
            <Link href="/admin/login" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-gray-900">Log In</Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full py-3 text-center text-sm font-bold text-white"
              style={{ backgroundColor: BRAND }}
            >
              See It Live
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
