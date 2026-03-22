# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the inline hero section in `app/page.tsx` with a bold, full-viewport `Hero` component featuring large display typography, Framer Motion entrance animations, and high-contrast CTAs targeting business-owner conversion.

**Architecture:** Centralised copy in `lib/constants/copy.ts`, a reusable `Button` primitive in `components/ui/Button.tsx`, and a client-side `Hero` component that consumes both. `app/page.tsx` stays a Server Component and simply renders `<Hero />` in place of its current inline hero section. Font tokens are registered via `next/font/google` (no new npm dependency) and wired into Tailwind.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS, Framer Motion (already installed), `next/font/google` (built into Next.js)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `app/layout.tsx` | Register Syne display font via `next/font/google`, expose CSS variable |
| Modify | `tailwind.config.ts` | Add `font-display` family pointing at `--font-syne` |
| Create | `lib/constants/copy.ts` | All hero copy strings — badge, headline lines, subheadline, CTAs, stats |
| Create | `components/ui/Button.tsx` | Polymorphic button: renders `<button>`, `<a>`, or Next.js `<Link>` based on `href` prop |
| Create | `components/Hero.tsx` | Full-viewport hero with Framer Motion stagger, dark bg, glow blob, grid overlay |
| Modify | `app/page.tsx` | Remove inline hero `<section>`, import and render `<Hero />` |

---

## Task 1: Register display font and extend Tailwind

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add Syne font to layout.tsx**

Replace the content of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
  description:
    "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  openGraph: {
    title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
    description:
      "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://employ-ai.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
    description:
      "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={syne.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
```

- [ ] **Step 2: Extend Tailwind with display font**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify type-check passes**

```bash
npm run type-check
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx tailwind.config.ts
git commit -m "feat: register Syne display font and extend Tailwind font-family"
```

---

## Task 2: Create hero copy constants

**Files:**
- Create: `lib/constants/copy.ts`

- [ ] **Step 1: Create the lib directory and copy file**

```bash
mkdir -p lib/constants
```

Create `lib/constants/copy.ts`:

```ts
export const HERO_COPY = {
  badge: "Done-For-You AI Marketing",
  headlineLines: ["MORE LEADS.", "LESS EFFORT.", "POWERED BY AI."],
  accentLineIndex: 2,
  subheadline:
    "EmployAI is your full-service AI marketing team. We build the strategy, create the content, and run the campaigns — 100% done for you.",
  primaryCta: "Book a Free Consultation",
  secondaryCta: "See How It Works",
  stats: [
    { value: "23+", label: "Active Clients" },
    { value: "3.2×", label: "Avg. ROI" },
    { value: "100%", label: "Done For You" },
  ],
} as const;
```

> **Note:** Stats are placeholder values. Replace with real numbers before launch.

- [ ] **Step 2: Verify type-check passes**

```bash
npm run type-check
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/constants/copy.ts
git commit -m "feat: add hero copy constants"
```

---

## Task 3: Create Button primitive

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create the ui directory and Button component**

```bash
mkdir -p components/ui
```

Create `components/ui/Button.tsx`:

```tsx
import Link from "next/link";

type BaseProps = {
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

type AsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
  };

type ButtonProps = AsButton | AsAnchor;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-primary text-white hover:bg-secondary focus-visible:outline-primary",
  outline:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
};

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AsAnchor;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Verify type-check and lint pass**

```bash
npm run type-check && npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add polymorphic Button primitive"
```

---

## Task 4: Create Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { HERO_COPY } from "@/lib/constants/copy";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#080810] px-6 sm:px-12 lg:px-20"
    >
      {/* Blue glow blob — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px]"
        style={{
          background:
            "radial-gradient(circle at 65% 25%, rgba(37,99,235,0.2) 0%, transparent 68%)",
          filter: "blur(48px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/50">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
            {HERO_COPY.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-8 font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
        >
          {HERO_COPY.headlineLines.map((line, i) => (
            <span
              key={i}
              className={`block ${
                i === HERO_COPY.accentLineIndex ? "text-primary" : "text-white"
              }`}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl"
        >
          {HERO_COPY.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary" size="lg">
            {HERO_COPY.primaryCta}
          </Button>
          <Button href="#services" variant="outline" size="lg">
            {HERO_COPY.secondaryCta}
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8"
        >
          {HERO_COPY.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check and lint pass**

```bash
npm run type-check && npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component with Framer Motion entrance animations"
```

---

## Task 5: Wire Hero into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace inline hero section with Hero component**

Replace `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Services Section */}
      <section
        id="services"
        className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-gray-50"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Automation",
                description:
                  "Streamline your marketing workflows and save hours every week with intelligent automation.",
              },
              {
                title: "Social Media Strategy",
                description:
                  "Custom social strategies tailored to your audience that drive engagement and conversions.",
              },
              {
                title: "Creative Content",
                description:
                  "AI-assisted copywriting and design that resonates with your target market.",
              },
            ].map((service, idx) => (
              <div key={idx} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let&apos;s talk about how EmployAI can transform your marketing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} EmployAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Run full verification**

```bash
npm run lint && npm run type-check && npm run build
```

Expected: all pass, build completes with no errors

- [ ] **Step 3: Visually verify in browser**

```bash
npm run dev
```

Check at `http://localhost:3000`:
- Full-viewport dark hero loads
- Framer Motion stagger animation plays on page load
- All three headline lines visible (third line in blue)
- Both CTA buttons render — primary (solid blue) and secondary (white outline)
- Stats strip shows below CTAs
- Responsive: stacks cleanly on mobile viewport
- "See How It Works" anchor scrolls to `#services`

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: render Hero component in home page"
```
