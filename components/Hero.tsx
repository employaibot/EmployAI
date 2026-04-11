"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HERO_COPY } from "@/lib/constants/copy";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const trusted = ["NovaBrand", "LoopHQ", "Stackwise", "Orion Co.", "Vertex"];

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-navy-900 px-6 py-28 sm:py-36 lg:px-8"
    >
      {/* Background depth layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* Eyebrow badge */}
        <motion.span
          variants={fadeUp}
          className="inline-block rounded-full bg-brand/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand"
        >
          Done-For-You Marketing Agency
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-6 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-white"
        >
          {HERO_COPY.headline.before}{" "}
          <span className="text-brand">{HERO_COPY.headline.accent}</span>
          <br />
          {HERO_COPY.headline.after}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/55"
        >
          {HERO_COPY.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-[10px] bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-brand/40"
          >
            {HERO_COPY.primaryCta}
          </Link>
          <Link
            href="#results"
            className="rounded-[10px] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            {HERO_COPY.secondaryCta}
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/30">
            Trusted by growth-stage brands
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-8">
            {trusted.map((name) => (
              <span
                key={name}
                className="text-sm font-bold uppercase tracking-wider text-white/25 transition-colors hover:text-white/50"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
