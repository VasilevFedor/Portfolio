import Link from "next/link";
import type { Project } from "../data";

/**
 * Work card matching the Framer reference: a rounded 32px media panel (an
 * autoplaying, muted, looped preview video — or a still image when there's no
 * video) with the title + one-line description beneath it. The video loops
 * continuously like the Framer source; `autoPlay muted playsInline` is the
 * reliable way to start a background video across browsers.
 */
export default function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      {/* Media panel: full column width (800), 440px tall → 20/11 aspect. */}
      <div className="relative aspect-[20/11] overflow-hidden rounded-[32px] bg-card">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {/* Title + description: inset 16px, wrapping at 568px (Framer). */}
      <div className="mt-[15px] max-w-[568px] px-4">
        <h3 className="t-card-title">{project.title}</h3>
        <p className="t-body-muted mt-1">{project.description}</p>
      </div>
    </Link>
  );
}
