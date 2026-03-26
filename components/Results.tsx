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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Results() {
  return (
    <section
      id="results"
      className="scroll-mt-16 bg-white px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-14 lg:flex-row lg:items-center">
        {/* Left — copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex-1"
        >
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {RESULTS_COPY.heading}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{RESULTS_COPY.subheading}</p>
          <ul className="mt-8 space-y-4">
            {RESULTS_COPY.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 font-medium text-gray-800"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-1 flex-col gap-6 sm:flex-row"
        >
          {/* Bar chart */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Conversion Rate
            </p>
            <p className="mb-4 text-2xl font-extrabold text-brand">+45.2%</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={conversionData} barSize={16}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number"
                      ? [`${value}%`, "Rate"]
                      : [String(value), "Rate"]
                  }
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Bar dataKey="rate" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line chart */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Organic Traffic
            </p>
            <p className="mb-4 text-2xl font-extrabold text-brand">1.2M</p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number"
                      ? [`${(value / 1000).toFixed(0)}k`, "Visitors"]
                      : [String(value), "Visitors"]
                  }
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
