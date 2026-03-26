# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing EmployAI home page with a full 7-section marketing landing page matching the teal/dark design spec.

**Architecture:** Each section is an isolated client or server component; copy lives in `lib/constants/copy.ts`; charts live in `components/Results.tsx` (client). The layout shell (`app/layout.tsx`) already mounts `<Navbar />` so the rewritten Navbar component is automatically picked up. `app/page.tsx` assembles all sections.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS 3, Framer Motion 11, Recharts 2

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `tailwind.config.ts` | Add `brand` teal color |
| Modify | `package.json` | Add recharts dependency |
| Modify | `lib/constants/copy.ts` | Add copy for all new sections |
| Replace | `components/Navbar.tsx` | New navbar with center links + teal CTA |
| Replace | `components/Hero.tsx` | Two-column hero with badge, headline, avatar |
| Replace | `app/page.tsx` | Assembles all 7 sections |
| Create | `components/Services.tsx` | 3-card services grid |
| Create | `components/Results.tsx` | Stats + Recharts bar + line charts (client) |
| Create | `components/Testimonials.tsx` | 3-card testimonials |
| Create | `components/CTABanner.tsx` | Centered CTA banner |
| Create | `components/Footer.tsx` | 4-column dark footer |
| Delete | `components/AboutUs.tsx` | Replaced by new sections |

---

## Task 1: Install Recharts + Update Tailwind Config

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Install recharts**

```bash
npm install recharts
npm install --save-dev @types/recharts
```

Expected: recharts appears in `node_modules/recharts`

- [ ] **Step 2: Update tailwind.config.ts**

Replace the full file with:

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
        brand: {
          DEFAULT: "#0D9488",
          light: "#14B8A6",
          dark: "#0F766E",
        },
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

- [ ] **Step 3: Verify Tailwind picks up teal**

Run: `npm run build 2>&1 | head -20`
Expected: no config errors

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts package.json package-lock.json
git commit -m "chore: add recharts dep and brand teal to tailwind config"
```

---

## Task 2: Extend Copy Constants

**Files:**
- Modify: `lib/constants/copy.ts`

- [ ] **Step 1: Replace `lib/constants/copy.ts` with extended version**

```ts
export const HERO_COPY = {
  badge: "NOW POWERED BY GPT-4o + CLAUDE",
  headline: {
    before: "Automate Your",
    accent: "Marketing",
    after: "with AI",
  },
  subheadline:
    "AI-Powered Marketing. Human Results. Predictive power and hyper-personalization built for small businesses.",
  primaryCta: "Get Started Free",
  secondaryCta: "View Case Studies",
} as const;

export const NAV_COPY = {
  brand: "EmployAI",
  links: [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ],
  cta: "Schedule a Demo",
} as const;

export const SERVICES_COPY = {
  heading: "AI-Powered Services",
  subheading:
    "We leverage the latest LLMs and predictive models to scale your business without increasing headcount.",
  cards: [
    {
      icon: "🔍",
      title: "Automated SEO",
      description:
        "AI-driven keyword research, on-page optimization, and backlink strategies that compound over time.",
    },
    {
      icon: "📊",
      title: "Predictive Analytics",
      description:
        "Machine-learning models that forecast campaign performance and surface high-value audience segments.",
    },
    {
      icon: "✍️",
      title: "AI Content Engine",
      description:
        "High-volume, brand-consistent content generation across blog, social, and email — at a fraction of the cost.",
    },
  ],
} as const;

export const RESULTS_COPY = {
  heading: "Proven Results",
  subheading: "Our clients see measurable impact within the first 30 days.",
  bullets: [
    "45% Average Conversion Lift",
    "12M+ Data Points Analyzed",
    "80% Reduction in Op-Ex",
  ],
} as const;

export const TESTIMONIALS_COPY = {
  heading: "Trusted by Industry Leaders",
  items: [
    {
      quote:
        "EmployAI transformed our lead pipeline. We saw a 52% lift in qualified leads within six weeks.",
      name: "Sarah Chen",
      title: "CMO, NovaBrand",
      avatar: "/avatars/sarah.png",
    },
    {
      quote:
        "The AI content engine alone saved us 30 hours a week. The ROI was undeniable by month one.",
      name: "Marcus Rivera",
      title: "Founder, LoopHQ",
      avatar: "/avatars/marcus.png",
    },
    {
      quote:
        "Finally, a marketing partner that speaks data. The predictive analytics dashboard is a game changer.",
      name: "Priya Nair",
      title: "VP Growth, Stackwise",
      avatar: "/avatars/priya.png",
    },
  ],
} as const;

export const CTA_COPY = {
  heading: "Ready to Scale Smarter?",
  subheading:
    "Join 500+ brands leveraging EmployAI to dominate their market. Your automated future starts today.",
  primaryCta: "Schedule a Demo",
  secondaryCta: "Contact Sales",
} as const;

export const FOOTER_COPY = {
  brand: "EmployAI",
  tagline: "AI-Powered Marketing. Human Results.",
  columns: [
    {
      heading: "Platform",
      links: ["How it Works", "AI Models", "Integrations", "Pricing"],
    },
    {
      heading: "Company",
      links: ["About Us", "Careers", "Partners", "Contact"],
    },
  ],
  newsletterLabel: "Stay Updated",
  newsletterPlaceholder: "your@email.com",
  newsletterCta: "Join",
  legal: "© 2024 EmployAI. All rights reserved.",
  legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
} as const;

// Legacy — retained for contact page
export const ABOUT_COPY = {
  heading: "We're Obsessed With Your Growth",
  subheading:
    "EmployAI combines cutting-edge AI with proven marketing strategy to deliver real, measurable results for growing businesses.",
  cards: [
    {
      icon: "🎯",
      title: "Who We Are",
      description:
        "A dedicated team of AI specialists and marketing strategists working as a seamless extension of your business.",
    },
    {
      icon: "⚡",
      title: "What We Do",
      description:
        "We run your entire marketing operation — from strategy and content creation to automation and performance analytics.",
    },
    {
      icon: "📈",
      title: "Why It Works",
      description:
        "AI learns what converts for your specific audience. Our systems adapt continuously, so your marketing gets sharper over time.",
    },
  ],
} as const;
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run type-check 2>&1 | head -30`
Expected: no errors on copy.ts

- [ ] **Step 3: Commit**

```bash
git add lib/constants/copy.ts
git commit -m "feat: add copy constants for all new landing page sections"
```

---

## Task 3: Rewrite Navbar

**Files:**
- Replace: `components/Navbar.tsx`

- [ ] **Step 1: Replace `components/Navbar.tsx`**

```tsx
import Link from "next/link";
import { NAV_COPY } from "@/lib/constants/copy";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white text-sm font-black">
            E
          </span>
          {NAV_COPY.brand}
        </Link>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_COPY.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          {NAV_COPY.cta}
        </Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: rewrite Navbar with center links and teal CTA"
```

---

## Task 4: Rewrite Hero

**Files:**
- Replace: `components/Hero.tsx`

- [ ] **Step 1: Replace `components/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HERO_COPY } from "@/lib/constants/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="bg-white px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center">
        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
              {HERO_COPY.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl"
          >
            {HERO_COPY.headline.before}{" "}
            <span className="text-brand">{HERO_COPY.headline.accent}</span>{" "}
            {HERO_COPY.headline.after}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500"
          >
            {HERO_COPY.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              {HERO_COPY.primaryCta}
            </Link>
            <Link
              href="#results"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-brand hover:text-brand transition-colors"
            >
              {HERO_COPY.secondaryCta}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center"
        >
          <div className="relative h-80 w-80 overflow-hidden rounded-3xl shadow-xl sm:h-96 sm:w-96">
            <Image
              src="/hero-avatar.png"
              alt="EmployAI hero illustration"
              fill
              className="object-cover"
              priority
              onError={() => {}}
            />
            {/* Fallback gradient shown when image absent */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/20 to-teal-100" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite Hero with two-column layout and teal badge"
```

---

## Task 5: Create Services Component

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create `components/Services.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { SERVICES_COPY } from "@/lib/constants/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-[#F0F4F8] px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {SERVICES_COPY.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            {SERVICES_COPY.subheading}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_COPY.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <span aria-hidden="true" className="text-3xl">
                {card.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {card.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-brand hover:text-brand-dark cursor-pointer">
                Learn More →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: add Services section with 3-card grid"
```

---

## Task 6: Create Results Component (Recharts)

**Files:**
- Create: `components/Results.tsx`

- [ ] **Step 1: Create `components/Results.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { RESULTS_COPY } from "@/lib/constants/copy";

const conversionData = [
  { month: "Jan", rate: 2.1 },
  { month: "Feb", rate: 2.8 },
  { month: "Mar", rate: 3.4 },
  { month: "Apr", rate: 3.1 },
  { month: "May", rate: 4.2 },
  { month: "Jun", rate: 4.8 },
];

const trafficData = [
  { month: "Jan", visitors: 180000 },
  { month: "Feb", visitors: 310000 },
  { month: "Mar", visitors: 490000 },
  { month: "Apr", visitors: 620000 },
  { month: "May", visitors: 890000 },
  { month: "Jun", visitors: 1200000 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Results() {
  return (
    <section
      id="results"
      className="scroll-mt-16 bg-[#F0F4F8] px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-14 lg:flex-row lg:items-center">
        {/* Left — copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex-1"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {RESULTS_COPY.heading}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{RESULTS_COPY.subheading}</p>
          <ul className="mt-8 space-y-4">
            {RESULTS_COPY.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-gray-800 font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col gap-6 sm:flex-row"
        >
          {/* Bar chart */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-gray-700">Conversion Rate</p>
            <p className="mb-4 text-2xl font-extrabold text-brand">+45.2%</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={conversionData} barSize={16}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => [`${v}%`, "Rate"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Bar dataKey="rate" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line chart */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-gray-700">Organic Traffic</p>
            <p className="mb-4 text-2xl font-extrabold text-brand">1.2M</p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => [`${(v / 1000).toFixed(0)}k`, "Visitors"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -30`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Results.tsx
git commit -m "feat: add Results section with Recharts bar and line charts"
```

---

## Task 7: Create Testimonials Component

**Files:**
- Create: `components/Testimonials.tsx`

- [ ] **Step 1: Create `components/Testimonials.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS_COPY } from "@/lib/constants/copy";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 bg-white px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {TESTIMONIALS_COPY.heading}
          </h2>
          <div className="mt-3 flex justify-center gap-1" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS_COPY.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <p className="text-gray-600 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand/10">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-brand font-bold text-sm">
                    {item.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: add Testimonials section with 3-card layout"
```

---

## Task 8: Create CTABanner Component

**Files:**
- Create: `components/CTABanner.tsx`

- [ ] **Step 1: Create `components/CTABanner.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA_COPY } from "@/lib/constants/copy";

export function CTABanner() {
  return (
    <section className="px-6 py-20 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-3xl bg-[#F0F4F8] px-10 py-16 text-center"
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {CTA_COPY.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          {CTA_COPY.subheading}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            {CTA_COPY.primaryCta}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-gray-400 px-7 py-3 text-sm font-semibold text-gray-700 hover:border-brand hover:text-brand transition-colors"
          >
            {CTA_COPY.secondaryCta}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/CTABanner.tsx
git commit -m "feat: add CTABanner section"
```

---

## Task 9: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
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
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
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
                <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
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
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with 4-column layout and newsletter form"
```

---

## Task 10: Assemble `app/page.tsx` + Clean Up

**Files:**
- Replace: `app/page.tsx`
- Delete: `components/AboutUs.tsx` (replaced by new sections — import removed from page.tsx)

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Results />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Delete AboutUs (no longer imported)**

```bash
rm components/AboutUs.tsx
```

- [ ] **Step 3: Type-check, lint, build**

```bash
npm run type-check 2>&1 | tail -5
npm run lint 2>&1 | tail -10
npm run build 2>&1 | tail -20
```

Expected: All pass with 0 errors. Build output shows home page.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git rm components/AboutUs.tsx
git commit -m "feat: assemble full 7-section landing page"
```

---

## Task 11: Open Draft PR

- [ ] **Step 1: Push branch and open PR**

```bash
git push -u origin feature/landing-page-redesign
gh pr create --draft --title "feat: full landing page redesign with teal theme" --body "$(cat <<'EOF'
## Summary
- Adds 7-section marketing landing page (Navbar, Hero, Services, Results, Testimonials, CTABanner, Footer)
- Recharts bar + line charts in Results section
- Framer Motion whileInView fade-up animations throughout
- Teal brand color (`#0D9488`) added to Tailwind config
- All copy centralised in `lib/constants/copy.ts`

## Test plan
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] All 7 sections visible at `localhost:3000`
- [ ] Charts render in Results section
- [ ] Navbar links scroll to correct section IDs
- [ ] Mobile layout looks correct at 375px

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Navbar (center links, teal CTA)
- ✅ Hero (badge, two-column, headline with teal word, two CTAs, avatar placeholder)
- ✅ Services (3 cards, Learn More link)
- ✅ Results (left copy + bullets, right Recharts bar + line)
- ✅ Testimonials (stars, 3 cards)
- ✅ CTA Banner (centered, two buttons)
- ✅ Footer (4 columns, newsletter, legal bar)
- ✅ Brand teal added to `tailwind.config.ts`
- ✅ Recharts installed
- ✅ Framer Motion `whileInView` on all sections
- ✅ `font-family` uses existing Syne + system-ui from layout

**Placeholder scan:** No TBDs or "implement later" entries found.

**Type consistency:** `HERO_COPY.headline.{before,accent,after}` used consistently in Hero. All copy keys match between `copy.ts` and component imports.
