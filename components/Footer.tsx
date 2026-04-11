"use client";

import Link from "next/link";
import { FOOTER_COPY } from "@/lib/constants/copy";

export function Footer() {
  return (
    <footer className="bg-navy-900 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-xl font-black uppercase tracking-tight text-white">
              {FOOTER_COPY.brand}
            </div>
            <p className="mt-3 text-sm text-white/40">{FOOTER_COPY.tagline}</p>
          </div>

          {/* Link columns */}
          {FOOTER_COPY.columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/60 transition-colors hover:text-white"
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              {FOOTER_COPY.newsletterLabel}
            </h3>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={FOOTER_COPY.newsletterPlaceholder}
                className="flex-1 rounded-[10px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-brand/60 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-[10px] bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
              >
                {FOOTER_COPY.newsletterCta}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/30">{FOOTER_COPY.legal}</p>
          <ul className="flex gap-6">
            {FOOTER_COPY.legalLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-sm text-white/30 transition-colors hover:text-white"
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
