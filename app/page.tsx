"use client";

import { useCalendly } from "@/lib/context/calendly-context";
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";

export default function HomePage() {
  const { openCalendly } = useCalendly();

  return (
    <main className="h-screen overflow-hidden">
      <HeroSection
        brandName="The Blue Dot Agency"
        brandNameClassName="text-[#0a0a0a]"
        titleClassName="text-white"
        title="30-minute strategy for your business."
        highlightText=""
        highlightStyle={{
          background: "linear-gradient(90deg, #7B5CF5, #38BDF8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        description="Built around your budget and your next 90 days"
        descriptionStyle={{ color: "#4a4a4a", fontWeight: 400 }}
        buttonText="Book a Session"
        onButtonClick={openCalendly}
        colors={[
          "#2D8CFF",
          "#0E72EB",
          "#003087",
          "#5AA3FF",
          "#B3D4FF",
          "#E8F3FF",
        ]}
        distortion={1.2}
        speed={0.8}
        veilOpacity="bg-black/30"
        fontFamily="var(--font-sora), 'Sora', sans-serif"
        fontWeight={800}
      />
    </main>
  );
}
