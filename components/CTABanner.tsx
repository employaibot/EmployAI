"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA_COPY } from "@/lib/constants/copy";

export function CTABanner() {
  return (
    <section className="zoom-gradient px-6 py-20 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90">
          Get Started Today
        </span>
        <h2 className="mt-6 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
          {CTA_COPY.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          {CTA_COPY.subheading}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-[10px] bg-white px-8 py-3.5 text-sm font-black text-brand shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          >
            {CTA_COPY.primaryCta}
          </Link>
          <Link
            href="/contact"
            className="rounded-[10px] border-2 border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/20"
          >
            {CTA_COPY.secondaryCta}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
