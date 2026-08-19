export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Autoplaying, muted, looped preview video (Framer uses these on the cards). */
  video?: string;
  year?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  href?: string; // external link, if any
};

export const social = {
  linkedin: "https://www.linkedin.com/in/fvasilev/",
  x: "https://x.com/FedorVasilev_",
  email: "mailto:vasilevf250@gmail.com",
};

// Photos shown inside the falling glass orbs on /about. Any remaining orbs
// (see ABOUT_ORB_COUNT in FallingOrbs) render as empty glass.
export const aboutOrbPhotos: string[] = [
  "/img/orbs/me-a.jpg",
  "/img/orbs/me-or.jpg",
  "/img/orbs/thai.jpg",
  "/img/orbs/villa.jpg",
  "/img/orbs/boat.jpg",
  "/img/orbs/bicycle.jpg",
  "/img/orbs/tc.jpg",
  "/img/orbs/statue.jpg",
  "/img/orbs/temple.jpg",
  "/img/orbs/temple2.jpg",
  "/img/orbs/me.jpg",
  "/img/orbs/monk.jpg",
];

const CDN = "https://videos-for-portfolio.b-cdn.net/Main%20page";

export const projects: Project[] = [
  {
    slug: "ozon-ai",
    title: "Ozon AI assistant",
    description:
      "Created a little mate to help sellers increase revenue & reduce the workload on technical support",
    image: "/img/ozon-ai.png",
    video: `${CDN}/Ozon-ai-main-page.mp4`,
    year: "2025",
  },
  {
    slug: "search-boosting",
    title: "Search boosting",
    description: "Increased items sold by 40% and Ozon's total GMV by 1.6%",
    // Real Framer asset (1600×884 ≈ 20/11), served from the Framer CDN.
    image:
      "https://framerusercontent.com/images/Xv98KrDiCe68HjVDjcjKQERSDY4.png",
    year: "2024",
  },
  {
    slug: "stonks",
    title: "Stonks app",
    description: "Fully vibecoded iOS app on SwiftUI for 2 weeks",
    image: "/img/stonks.png",
    video: `${CDN}/Preview%20mobile%20compressed.mp4`,
    year: "2024",
  },
];

export const articles: Article[] = [
  {
    slug: "ozon-search-ai",
    title: "Search and AI Assistant in the Ozon Seller Center",
    description: "How we designed them and what the data showed.",
    date: "April, 2026",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
