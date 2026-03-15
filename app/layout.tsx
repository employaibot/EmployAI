import type { Metadata } from "next";
import "@/app/globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
