import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fedor Vasiliev — Senior Product Designer",
    short_name: "Fedor Vasiliev",
    description:
      "Senior product designer with 5+ years of experience. Currently at Ozon, co-founder of Stonks.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#f2f2f2",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
