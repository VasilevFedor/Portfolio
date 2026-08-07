import Image from "next/image";
import Link from "next/link";
import LocalTime from "./components/LocalTime";
import Cat from "./components/Cat";
import Intro from "./components/Intro";
import Signature from "./components/Signature";
import SiteHeader from "./components/SiteHeader";
import GlassOrb from "./components/GlassOrb";
import { articles, projects, social } from "./data";

export default function Home() {
  return (
    <Intro>
      <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-6">
        <SiteHeader />

        <main className="flex-1 pb-24">
          <Hero />
          <Work />
          <Writing />
          <Contact />
        </main>
      </div>
    </Intro>
  );
}

function Hero() {
  return (
    <section className="rise flex flex-col items-center pt-10 text-center">
      <GlassOrb src="/img/avatar.jpg" alt="Fedor Vasiliev" size={80} />
      <h1 className="mt-7 text-5xl font-medium leading-[1.03] tracking-tight text-foreground sm:text-6xl">
        Fedor Vasiliev
      </h1>
      <p className="mt-4 max-w-[540px] text-lg leading-snug text-muted sm:text-xl">
        Senior product designer with an eye on details
      </p>
      <p className="mt-3 flex items-center gap-2 text-sm text-muted">
        <LocalTime />
        <Cat />
      </p>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mt-24 scroll-mt-24">
      <h2 className="text-4xl font-semibold tracking-tight">Work</h2>
      <ul className="mt-8 space-y-12">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] bg-card transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-translate-y-1">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-foreground underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-200 group-hover:decoration-border-subtle">
                  {p.title}
                </h3>
                <p className="mt-1 max-w-[650px] text-sm leading-6 text-muted">
                  {p.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="mt-24 scroll-mt-24">
      <h2 className="text-4xl font-semibold tracking-tight">Writing</h2>
      <ul className="mt-8 space-y-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={a.href ?? `/writing/${a.slug}`}
              className="group relative flex min-h-[140px] items-center overflow-hidden rounded-[28px] bg-card py-6 pl-[152px] pr-6 sm:pr-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/paper.svg"
                alt=""
                aria-hidden="true"
                width={112}
                height={112}
                className="pointer-events-none absolute bottom-4 left-5 size-28 drop-shadow-[0_12px_26px_rgba(0,0,0,0.14)] transition-transform duration-300 ease-out group-hover:-translate-y-1"
              />
              <div className="max-w-[560px]">
                <h3 className="text-[22px] font-medium leading-tight tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-muted">
                  {a.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="mt-28">
      <h2 className="max-w-[650px] text-[44px] font-medium leading-[1.1] tracking-tight">
        Let&apos;s connect — I&apos;m open to new opportunities
      </h2>
      <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-muted">
        I would love to partner with teams to help clarify the complexities,
        find elegant solutions and deliver the best result.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={social.email}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          Get in touch
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card"
        >
          LinkedIn
        </a>
      </div>

      <Signature className="mt-12 text-[17px]" />
    </section>
  );
}
