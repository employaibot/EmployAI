import { Hero } from "@/components/Hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Services Section */}
      <section
        id="services"
        className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-gray-50"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Automation",
                description:
                  "Streamline your marketing workflows and save hours every week with intelligent automation.",
              },
              {
                title: "Social Media Strategy",
                description:
                  "Custom social strategies tailored to your audience that drive engagement and conversions.",
              },
              {
                title: "Creative Content",
                description:
                  "AI-assisted copywriting and design that resonates with your target market.",
              },
            ].map((service, idx) => (
              <div key={idx} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let&apos;s talk about how EmployAI can transform your marketing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
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
