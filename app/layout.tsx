import type { Metadata } from "next";
import {
  Allan,
  Inter,
  Dancing_Script,
  Just_Me_Again_Down_Here,
} from "next/font/google";
import "./globals.css";

// Body / UI typeface — stands in for Helvetica Now Display (paid, not shipped).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Handwritten "fedor." wordmark — matches the Framer site (Allan).
const wordmark = Allan({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wordmark",
  display: "swap",
});

// Cursive used for the handwritten "Fedor Vasilev" sign-off.
const signatureScript = Dancing_Script({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

// Handwritten annotation on the case pages ("Quite a lot of flows").
const handwritten = Just_Me_Again_Down_Here({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/icons/apple-touch-180.png", type: "image/png", sizes: "180x180" },
    ],
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
      className={`h-full antialiased ${inter.variable} ${wordmark.variable} ${signatureScript.variable} ${handwritten.variable}`}
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
