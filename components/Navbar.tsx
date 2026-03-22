import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_COPY } from "@/lib/constants/copy";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-gray-900 hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {NAV_COPY.brand}
        </Link>
        <Button href="/contact" variant="primary" size="md">
          {NAV_COPY.cta}
        </Button>
      </nav>
    </header>
  );
}
