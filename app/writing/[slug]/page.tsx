import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "../../data";

// ozon-search-ai has a dedicated route (app/writing/ozon-search-ai/page.tsx)
// that takes precedence, so exclude it here to avoid a route conflict.
export function generateStaticParams() {
  return articles
    .filter((a) => a.slug !== "ozon-search-ai")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Fedor Vasiliev`,
    description: article.description,
  };
}

export default async function WritingArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6">
      <div className="py-6">
        <Link
          href="/#writing"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
      </div>

      <article className="rise flex-1 pb-24">
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
          {article.description}
        </p>
        <p className="mt-10 text-[15px] leading-7 text-muted">
          Full article coming soon.
        </p>
      </article>
    </div>
  );
}
