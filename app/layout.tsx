import type { Metadata } from "next";
import { Lato, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/Navbar";
import { CalendlyProvider } from "@/lib/context/calendly-context";
import "@/app/globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Blue Dot Agency | Done-For-You AI Marketing for Growing Businesses",
  description:
    "The Blue Dot Agency helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  openGraph: {
    title: "The Blue Dot Agency | Done-For-You AI Marketing for Growing Businesses",
    description:
      "The Blue Dot Agency helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://employ-ai.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Blue Dot Agency | Done-For-You AI Marketing for Growing Businesses",
    description:
      "The Blue Dot Agency helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lato.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
      </head>
      <body className="h-screen overflow-hidden bg-white pt-16 text-gray-900">
        <CalendlyProvider>
          <Navbar />
          {children}
        </CalendlyProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
