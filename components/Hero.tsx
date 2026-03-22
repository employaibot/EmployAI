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
        aria-hidden="true"
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
              aria-hidden="true"
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
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
