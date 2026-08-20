import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "../../data";

// ozon-ai and search-boosting have dedicated routes (app/work/<slug>/page.tsx)
// that take precedence, so exclude them here to avoid a route conflict at build
// time.
const dedicated = new Set(["ozon-ai", "search-boosting"]);

export function generateStaticParams() {
  return projects
    .filter((p) => !dedicated.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Fedor Vasiliev`,
    description: project.description,
  };
}

export default async function WorkCase({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  // Projects with a dedicated flat route (Framer paths) live there now — send
  // the old /work/<slug> URL on to it instead of rendering a stale fallback.
  if (project.href) redirect(project.href);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6">
      <div className="py-6">
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
      </div>

      <article className="rise flex-1 pb-24">
        <p className="text-sm text-muted">{project.year ?? "Case study"}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
          {project.description}
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
            priority
          />
        </div>

        <p className="mt-10 text-[15px] leading-7 text-muted">
          Detailed case study coming soon.
        </p>
      </article>
    </div>
  );
}
