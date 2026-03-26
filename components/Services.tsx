"use client";

import { motion } from "framer-motion";
import { SERVICES_COPY } from "@/lib/constants/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
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
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
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
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <span aria-hidden="true" className="text-3xl">
                {card.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {card.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-brand hover:text-brand-dark cursor-pointer transition-colors">
                Learn More →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
