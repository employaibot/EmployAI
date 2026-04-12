"use client";

import Link from "next/link";
import { useCalendly } from "@/lib/context/calendly-context";

export function Navbar() {
  const { openCalendly } = useCalendly();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-black uppercase tracking-tight text-navy-900 transition-colors hover:text-brand"
        >
          The Blue Dot Agency
        </Link>

        <button
          onClick={openCalendly}
          className="rounded-[10px] bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Book a Session
        </button>
      </nav>
    </header>
  );
}
