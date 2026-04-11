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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            Client Stories
          </span>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-navy-900 sm:text-5xl">
            {TESTIMONIALS_COPY.heading}
          </h2>
          <div className="mt-3 flex justify-center gap-1" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xl text-yellow-400">★</span>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS_COPY.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-gray-100 bg-gray-50 p-8 shadow-[0_3px_6px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_14px_28px_rgba(0,0,0,0.10)]"
            >
              <div className="flex gap-0.5 text-yellow-400" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-sm">★</span>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-gray-600">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand/10">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand">
                    {item.name[0]}
                  </span>
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">{item.name}</p>
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
