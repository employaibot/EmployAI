"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_COPY } from "@/lib/constants/copy";

const navLinks = NAV_COPY.navLinks.map((label) => ({
  label,
  href: `#${label.toLowerCase().replace(/\s+/g, "-")}`,
}));

function NavActions({ mobile = false }: { mobile?: boolean }) {
  const ghostCls = mobile
    ? "text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white"
    : "px-3 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white";
  const outlineCls = `rounded-lg border border-white/25 px-4 ${mobile ? "py-2.5 text-center" : "py-2"} text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10`;
  const primaryCls = `rounded-lg bg-primary px-4 ${mobile ? "py-2.5 text-center" : "py-2"} text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary`;

  return (
    <>
      <Link href="#" className={ghostCls}>{NAV_COPY.support}</Link>
      <Link href="#" className={outlineCls}>{NAV_COPY.getStarted}</Link>
      <Link href="/contact" className={primaryCls}>{NAV_COPY.bookCall}</Link>
    </>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#1A1A2E]">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {NAV_COPY.brand}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-1 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white"
              >
                {label}
                <svg
                  className="h-3 w-3 opacity-50"
                  viewBox="0 0 12 12"
                  width="12"
                  height="12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <NavActions />
        </div>

        <button
          className="p-2 text-white/75 transition-colors hover:text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#1A1A2E] px-6 pb-6 pt-4 lg:hidden">
          <ul className="mb-6 flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <NavActions mobile />
          </div>
        </div>
      )}
    </header>
  );
}
