"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { RESULTS_COPY } from "@/lib/constants/copy";

const conversionData = [
  { month: "Jan", rate: 2.1 },
  { month: "Feb", rate: 2.8 },
  { month: "Mar", rate: 3.4 },
  { month: "Apr", rate: 3.1 },
  { month: "May", rate: 4.2 },
  { month: "Jun", rate: 4.8 },
];

const trafficData = [
  { month: "Jan", visitors: 180000 },
  { month: "Feb", visitors: 310000 },
  { month: "Mar", visitors: 490000 },
  { month: "Apr", visitors: 620000 },
  { month: "May", visitors: 890000 },
  { month: "Jun", visitors: 1200000 },
];

const tooltipStyle = {
  fontSize: 11,
  backgroundColor: "#0F2F43",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 6,
  color: "#ffffff",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: "45%", label: "Avg. Conversion Lift" },
  { value: "12M+", label: "Data Points Analyzed" },
  { value: "80%", label: "OpEx Reduction" },
];

export function Results() {
  return (
    <section
      id="results"
      className="scroll-mt-16 bg-navy-900 px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top stat strip — Big Leap style */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-16 grid grid-cols-1 gap-px border border-white/10 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-navy-800/60 px-8 py-10 text-center"
            >
              <span className="font-display text-5xl font-black text-brand sm:text-6xl">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-bold uppercase tracking-widest text-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Copy + charts */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex-1"
          >
            <span className="inline-block rounded-full bg-brand/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
              Proven Impact
            </span>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
              {RESULTS_COPY.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/50">
              {RESULTS_COPY.subheading}
            </p>
            <ul className="mt-8 space-y-3">
              {RESULTS_COPY.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 font-medium text-white/70"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-black text-white">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — charts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-1 flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1 rounded-xl border border-white/10 bg-navy-800/60 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Conversion Rate
              </p>
              <p className="mt-1 font-display text-3xl font-black text-brand">
                +45.2%
              </p>
              <ResponsiveContainer width="100%" height={140} className="mt-4">
                <BarChart data={conversionData} barSize={14}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v) => typeof v === "number" ? [`${v}%`, "Rate"] : [String(v), "Rate"]} contentStyle={tooltipStyle} />
                  <Bar dataKey="rate" fill="#0B5CFF" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 rounded-xl border border-white/10 bg-navy-800/60 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Organic Traffic
              </p>
              <p className="mt-1 font-display text-3xl font-black text-brand">
                1.2M
              </p>
              <ResponsiveContainer width="100%" height={140} className="mt-4">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v) => typeof v === "number" ? [`${(v / 1000).toFixed(0)}k`, "Visitors"] : [String(v), "Visitors"]} contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="visitors" stroke="#0B5CFF" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
