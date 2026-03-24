import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/Navbar";
import "@/app/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
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
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white pt-16 text-gray-900">
        <Navbar />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
