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
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-3xl bg-[#F0F4F8] px-10 py-16 text-center"
      >
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
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
