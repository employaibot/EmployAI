"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS_COPY } from "@/lib/constants/copy";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 bg-[#F0F4F8] px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {TESTIMONIALS_COPY.heading}
          </h2>
          <div className="mt-3 flex justify-center gap-1" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xl text-yellow-400">
                ★
              </span>
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
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <p className="leading-relaxed text-gray-600">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand/10">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand">
                    {item.name[0]}
                  </span>
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
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
