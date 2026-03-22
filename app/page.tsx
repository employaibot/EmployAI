import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutUs />

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let&apos;s talk about how EmployAI can transform your marketing.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} EmployAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
