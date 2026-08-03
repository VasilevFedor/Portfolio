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

// Set the theme before paint to avoid a flash of the wrong theme.
const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : true; // default to dark
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${wordmarkSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* If JS is disabled, scroll-reveal elements must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.iris{clip-path:none !important}.preloader{display:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
