import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
