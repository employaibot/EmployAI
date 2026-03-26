"use client";

import { motion } from "framer-motion";
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
          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(3rem,9vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-gray-900"
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
          <div className="h-80 w-80 rounded-3xl bg-gradient-to-br from-brand/20 to-teal-100 shadow-xl sm:h-96 sm:w-96" />
        </motion.div>
      </div>
    </section>
  );
}
