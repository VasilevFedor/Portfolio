import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import BackToTop from "../components/BackToTop";

export const metadata: Metadata = {
  title: "Stonks app — Fedor Vasiliev",
  description: "Design experiment made for 2 weeks.",
};

/* ── Media host ──────────────────────────────────────────────────────────── */
const VID = "https://videos-for-portfolio.b-cdn.net/Stonks%20app%20case";

/* ── Content (mirrors the Framer /stonks source 1:1) ─────────────────────── */

// Feature demos — each is a screen recording (composited 800×468 landscape,
// object-cover) with a short Body label and an Author-grey caption below.
// URLs kept exactly as stored on the CDN (note the trailing space that Framer
// left in "Purchase freeze .mp4").
const features = [
  {
    src: `${VID}/First%20touch.mp4`,
    label: "Onboarding flow",
    caption:
      "When a user opens the app for the first time, the AI assistant shows the user the available features",
  },
  {
    src: `${VID}/Add%20expense.mp4`,
    label: "Add expenses",
    caption:
      "Users can add expenses in two ways: manually or by uploading a screenshot from their bank",
  },
  {
    src: `${VID}/Purchase%20freeze%20.mp4`,
    label: "Purchase freeze",
    caption: "To reduce impulse purchases, a user can freeze spending",
  },
  {
    src: `${VID}/Achievement.mp4`,
    label: "Achievement for completing lessons",
    caption: "Users can take financial literacy lessons and earn achievements",
  },
  {
    src: `${VID}/Analytics.mp4`,
    label: "Spending analytics",
    caption: "Users can view their spending in detailed analytics",
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function StonksCase() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-6 min-[800px]:px-0">
      <SiteHeader />

      {/* 80px between top-level sections. */}
      <main className="flex flex-col gap-20 pt-10 pb-24">
        {/* Back to home */}
        <BackLink />

        {/* Hero heading */}
        <header className="rise flex flex-col gap-1">
          <h1 className="t-article-title">Stonks app</h1>
          <p className="t-article-body max-w-[600px]">
            Design experiment made for 2 weeks
          </p>
        </header>

        {/* A Little About the Project */}
        <section className="flex flex-col gap-4">
          <Reveal as="h2" className="t-article-heading">
            A Little About the Project
          </Reveal>
          <Reveal as="p" className="t-article-body max-w-[600px]">
            I worked on this project with my co-founder, who is a backend
            developer. I was responsible for the entire product side, UX, and
            user interaction. I built this project using Claude Code, and the
            whole process took about three weeks. We are currently in the active
            testing phase leading up to the release.
          </Reveal>
        </section>

        {/* Feature demos */}
        <section className="flex flex-col gap-16">
          {features.map((f) => (
            <Reveal key={f.label}>
              <figure className="flex flex-col gap-4">
                <video
                  src={f.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="h-[468px] w-full rounded-[32px] object-cover"
                />
                <figcaption className="flex flex-col gap-1">
                  <span className="t-article-body">{f.label}</span>
                  <span className="t-article-caption max-w-[600px]">
                    {f.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </section>
      </main>

      <BackToTop />
    </div>
  );
}

/* ── Building blocks ─────────────────────────────────────────────────────── */

function BackLink() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center gap-1.5 rounded-full py-2 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-70 active:scale-[0.97]"
    >
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-foreground"
      >
        <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      <span className="t-back">Back to home</span>
    </Link>
  );
}
