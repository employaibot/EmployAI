"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HERO_COPY } from "@/lib/constants/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function Hero() {
  return (
    <section aria-label="Hero" className="bg-white px-6 py-20 sm:py-28 lg:px-8">
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
            className="mt-6 font-display text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl"
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
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-1 justify-center"
        >
          <div className="relative h-80 w-80 overflow-hidden rounded-3xl shadow-xl sm:h-96 sm:w-96">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-teal-100" />
            <Image
              src="/hero-avatar.png"
              alt="EmployAI hero illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
