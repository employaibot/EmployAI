"use client";

import { motion } from "framer-motion";
import { HERO_COPY } from "@/lib/constants/copy";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D1B4B] px-6 sm:px-12 lg:px-20"
      style={{
        background: "linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(11,92,255,0.3) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
          {HERO_COPY.badge}
        </span>

        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight tracking-tight text-white">
          {HERO_COPY.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          {HERO_COPY.subheadline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg">
            {HERO_COPY.primaryCta}
          </Button>
          <Button href="#about" variant="outline" size="lg">
            {HERO_COPY.secondaryCta}
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {HERO_COPY.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-5 text-center backdrop-blur-sm"
            >
              <div className="font-display text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
