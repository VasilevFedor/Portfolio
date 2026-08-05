import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

// Elegant serif used for the "fedor." wordmark in the header.
const wordmarkSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fedor-vasiliev.vercel.app"),
  title: "Fedor Vasiliev — Senior Product Designer",
  description:
    "Senior product designer with 5+ years of experience. Currently at Ozon, co-founder of Stonks. I take products from 0 to 1.",
  openGraph: {
    title: "Fedor Vasiliev — Senior Product Designer",
    description:
      "Senior product designer with 5+ years of experience. Currently at Ozon, co-founder of Stonks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${wordmarkSerif.variable}`}
    >
      <head>
        {/* If JS is disabled, scroll-reveal elements must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.iris{clip-path:none !important}.preloader{display:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
