import { ABOUT_COPY } from "@/lib/constants/copy";

export function AboutUs() {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-white px-6 py-20 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {ABOUT_COPY.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
          {ABOUT_COPY.subheading}
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {ABOUT_COPY.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-left shadow-sm"
            >
              <span aria-hidden="true" className="text-3xl">
                {card.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
