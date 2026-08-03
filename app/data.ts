export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  year?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  href?: string; // external link, if any
};

export const social = {
  linkedin: "https://www.linkedin.com/in/fvasilev/",
  x: "https://x.com/FedorVasilev_",
  email: "mailto:vasilevf250@gmail.com",
};

export const projects: Project[] = [
  {
    slug: "ozon-ai",
    title: "Ozon AI assistant",
    description:
      "Created a little mate to help sellers increase revenue & reduce the workload on technical support.",
    image: "/img/ozon-ai.png",
    year: "2025",
  },
  {
    slug: "search-boosting",
    title: "Search boosting",
    description:
      "Increased items sold by 40% and Ozon's total GMV by 1.6%.",
    image: "/img/search-boosting.png",
    year: "2024",
  },
  {
    slug: "stonks",
    title: "Stonks app",
    description: "Design experiment made for 2 weeks.",
    image: "/img/stonks.png",
    year: "2024",
  },
];

export const articles: Article[] = [
  {
    slug: "ozon-search-ai",
    title: "Search and AI Assistant in the Ozon Seller Center",
    description: "How we designed them and what the data showed.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
