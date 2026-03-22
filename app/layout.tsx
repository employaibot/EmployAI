import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
  description:
    "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  openGraph: {
    title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
    description:
      "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://employ-ai.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmployAI | Done-For-You AI Marketing for Growing Businesses",
    description:
      "EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={syne.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
