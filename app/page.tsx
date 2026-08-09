import Image from "next/image";
import Link from "next/link";
import LocalTime from "./components/LocalTime";
import Eyes from "./components/Eyes";
import Intro from "./components/Intro";
import SocialLinks from "./components/SocialLinks";
import SiteHeader from "./components/SiteHeader";
import GlassOrb from "./components/GlassOrb";
import { articles, projects } from "./data";

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
      <GlassOrb src="/img/avatar.jpg" alt="Fedor Vasiliev" size={80} magnetic />
      <h1 className="mt-6 text-[24px] font-medium leading-tight tracking-tight text-foreground">
        Fedor Vasiliev
      </h1>
      <p className="mt-1 max-w-[540px] text-[18px] leading-snug text-muted">
        Senior product designer with an eye on details
      </p>
      <p className="mt-1 flex items-center gap-2 text-[16px] text-muted">
        <LocalTime />
        <Eyes />
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
      <SocialLinks className="mt-8" />
    </section>
  );
}
