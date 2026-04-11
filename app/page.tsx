import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden">
      <HeroSection
        brandName="EmployAI"
        brandNameClassName="text-white/90"
        title="30-minute strategy for your business."
        highlightText=""
        description="Built around your budget and your next 90 days"
        buttonText="Book a Session"
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
        fontFamily="var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif"
      />
    </main>
  );
}
