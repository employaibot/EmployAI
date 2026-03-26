"use client";

import Link from "next/link";
import { FOOTER_COPY } from "@/lib/constants/copy";

export function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white text-sm font-black">
                E
              </span>
              {FOOTER_COPY.brand}
            </div>
            <p className="mt-3 text-sm text-gray-400">{FOOTER_COPY.tagline}</p>
          </div>

          {/* Link columns */}
          {FOOTER_COPY.columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {FOOTER_COPY.newsletterLabel}
            </h3>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={FOOTER_COPY.newsletterPlaceholder}
                className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
              >
                {FOOTER_COPY.newsletterCta}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">{FOOTER_COPY.legal}</p>
          <ul className="flex gap-6">
            {FOOTER_COPY.legalLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
