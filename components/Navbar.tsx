import Link from "next/link";
import { NAV_COPY } from "@/lib/constants/copy";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black uppercase tracking-tight text-navy-900 transition-colors hover:text-brand"
        >
          {NAV_COPY.brand}
        </Link>

        {/* Center links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_COPY.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="rounded-[10px] bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          {NAV_COPY.cta}
        </Link>
      </nav>
    </header>
  );
}
