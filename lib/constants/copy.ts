export const HERO_COPY = {
  headline: {
    before: "Automate Your",
    accent: "Marketing",
    after: "with AI",
  },
  subheadline:
    "AI-Powered Marketing. Human Results. Predictive power and hyper-personalization built for small businesses.",
  primaryCta: "Get Started Free",
  secondaryCta: "View Case Studies",
} as const;

export const NAV_COPY = {
  brand: "EmployAI",
  links: [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ],
  cta: "Schedule a Demo",
} as const;

export const SERVICES_COPY = {
  heading: "AI-Powered Services",
  subheading:
    "We leverage the latest LLMs and predictive models to scale your business without increasing headcount.",
  cards: [
    {
      title: "Automated SEO",
      description:
        "AI-driven keyword research, on-page optimization, and backlink strategies that compound over time.",
    },
    {
      title: "Predictive Analytics",
      description:
        "Machine-learning models that forecast campaign performance and surface high-value audience segments.",
    },
    {
      title: "AI Content Engine",
      description:
        "High-volume, brand-consistent content generation across blog, social, and email — at a fraction of the cost.",
    },
  ],
} as const;

export const RESULTS_COPY = {
  heading: "Proven Results",
  subheading: "Our clients see measurable impact within the first 30 days.",
  bullets: [
    "45% Average Conversion Lift",
    "12M+ Data Points Analyzed",
    "80% Reduction in Op-Ex",
  ],
} as const;

export const TESTIMONIALS_COPY = {
  heading: "Trusted by Industry Leaders",
  items: [
    {
      quote:
        "EmployAI transformed our lead pipeline. We saw a 52% lift in qualified leads within six weeks.",
      name: "Sarah Chen",
      title: "CMO, NovaBrand",
      avatar: "/avatars/sarah.png",
    },
    {
      quote:
        "The AI content engine alone saved us 30 hours a week. The ROI was undeniable by month one.",
      name: "Marcus Rivera",
      title: "Founder, LoopHQ",
      avatar: "/avatars/marcus.png",
    },
    {
      quote:
        "Finally, a marketing partner that speaks data. The predictive analytics dashboard is a game changer.",
      name: "Priya Nair",
      title: "VP Growth, Stackwise",
      avatar: "/avatars/priya.png",
    },
  ],
} as const;

export const CTA_COPY = {
  heading: "Ready to Scale Smarter?",
  subheading:
    "Join 500+ brands leveraging EmployAI to dominate their market. Your automated future starts today.",
  primaryCta: "Schedule a Demo",
  secondaryCta: "Contact Sales",
} as const;

export const FOOTER_COPY = {
  brand: "EmployAI",
  tagline: "AI-Powered Marketing. Human Results.",
  columns: [
    {
      heading: "Platform",
      links: ["How it Works", "AI Models", "Integrations", "Pricing"],
    },
    {
      heading: "Company",
      links: ["About Us", "Careers", "Partners", "Contact"],
    },
  ],
  newsletterLabel: "Stay Updated",
  newsletterPlaceholder: "your@email.com",
  newsletterCta: "Join",
  legal: "© 2026 EmployAI. All rights reserved.",
  legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
} as const;

// Legacy — retained for contact page
export const ABOUT_COPY = {
  heading: "We're Obsessed With Your Growth",
  subheading:
    "EmployAI combines cutting-edge AI with proven marketing strategy to deliver real, measurable results for growing businesses.",
  cards: [
    {
      title: "Who We Are",
      description:
        "A dedicated team of AI specialists and marketing strategists working as a seamless extension of your business.",
    },
    {
      title: "What We Do",
      description:
        "We run your entire marketing operation — from strategy and content creation to automation and performance analytics.",
    },
    {
      title: "Why It Works",
      description:
        "AI learns what converts for your specific audience. Our systems adapt continuously, so your marketing gets sharper over time.",
    },
  ],
} as const;
