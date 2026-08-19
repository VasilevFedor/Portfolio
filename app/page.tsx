import Link from "next/link";
import LocalTime from "./components/LocalTime";
import SocialLinks from "./components/SocialLinks";
import SiteHeader from "./components/SiteHeader";
import GlassOrb from "./components/GlassOrb";
import WorkCard from "./components/WorkCard";
import ContactPreview from "./components/ContactPreview";
import { articles, projects, social } from "./data";

export default function Home() {
  // 800px content column, centred. Horizontal padding only kicks in below the
  // column width so the media panels stay full-bleed to the column on desktop
  // (matching the Framer source).
  return (
    <div className="mx-auto w-full max-w-[800px] px-6 min-[800px]:px-0">
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="rise relative z-30 pb-12">
      {/* Intro stack: identity row, bio, contact line — 16px rhythm, 24px below header. */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Identity row: orb + name/role, with the local time pinned opposite. */}
        <div className="flex items-center gap-3">
          <GlassOrb src="/img/avatar.jpg" alt="Fedor Vasiliev" size={48} magnetic />
          <div className="flex flex-1 items-end justify-between gap-4">
            <div>
              <p className="t-body">Fedor Vasiliev</p>
              <p className="t-sub">Senior product designer</p>
            </div>
            <p className="t-sub whitespace-nowrap py-1.5">
              <LocalTime />
            </p>
          </div>
        </div>

        {/* Bio — 650px wide, three paragraphs. Emphasis = foreground colour
            (not bold), matching the Framer source. */}
        <div className="max-w-[650px] space-y-4">
          <p className="t-body">
            Hi! I currently work at <Em>Ozon</Em> as a Senior product designer,
            where <Em>i led design</Em> of promotional mechanics and campaigns.
            I have <Em>over 5 years of experience</Em>, building products for the
            audience of <Em>more than 60 million</Em> people
          </p>
          <p className="t-body">
            I&rsquo;m also <Em>a co-founder of Stonks</Em> — an app that helps
            build financial literacy
          </p>
          <p className="t-body">
            What I enjoy most is taking projects from 0 to 1 — I have an
            entrepreneurial mindset and like owning a problem end-to-end, from
            early concept through to shipped result.
          </p>
        </div>

        {/* Contact line — single row, each link revealing a profile preview. */}
        <p className="t-body-muted flex flex-wrap items-center gap-x-1.5">
          You can find me on
          <ContactPreview variant="linkedin" href={social.linkedin}>
            LinkedIn,
          </ContactPreview>
          <ContactPreview variant="x" href={social.x}>
            X
          </ContactPreview>
          or reach via
          <ContactPreview variant="gmail" href={social.email}>
            Gmail
          </ContactPreview>
        </p>
      </div>
    </section>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}

/** File / document line icon — the exact glyph from the Framer writing card. */
function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={32}
      height={32}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M 2 14.5 L 10.5 14.5 C 11.605 14.5 12.5 13.605 12.5 12.5 L 12.5 4.25 L 8.25 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 12.5 C 0 13.605 0.895 14.5 2 14.5 Z"
        transform="translate(5.75 4.75)"
      />
      <path d="M 4.25 4.25 L 0 4.25 L 0 0" transform="translate(13.75 5)" />
      <path d="M 0 0 L 4.5 0" transform="translate(9.75 15.25)" />
      <path d="M 0 0 L 4.5 0" transform="translate(9.75 12.25)" />
    </svg>
  );
}

function Work() {
  return (
    <section id="cases" className="scroll-mt-24 pb-[140px]">
      <div className="flex flex-col gap-12">
        <h2 className="t-heading">Work</h2>
        <ul className="flex flex-col gap-12">
          {projects.map((p) => (
            <li key={p.slug}>
              <WorkCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="scroll-mt-24">
      <div className="flex flex-col gap-6">
        <h2 className="t-heading">Writing</h2>
        <ul>
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={a.href ?? `/writing/${a.slug}`}
                className="group flex items-start gap-2.5"
              >
                {/* White rounded icon tile (48×48, r16) with a 32px document glyph. */}
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card text-foreground">
                  <DocIcon />
                </span>
                <div className="pt-0.5">
                  <h3 className="t-writing-title">{a.title}</h3>
                  {a.date ? <p className="t-sub mt-1">{a.date}</p> : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-[120px]">
      <div className="flex flex-col items-start gap-4">
        <h2 className="t-heading max-w-[600px]">
          Let&rsquo;s connect—I&rsquo;m open to new opportunities
        </h2>
        <p className="t-body-muted max-w-[600px]">
          I would love to partner with teams to help clarify the complexities,
          find elegant solutions and deliver the best result
        </p>
        <SocialLinks className="mt-4" />
      </div>
    </section>
  );
}
