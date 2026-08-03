import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import LocalTime from "./components/LocalTime";
import Cat from "./components/Cat";
import Intro from "./components/Intro";
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

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-5 backdrop-blur-md">
      <Link
        href="/"
        className="font-wordmark text-[28px] italic leading-none tracking-tight text-foreground"
      >
        fedor.
      </Link>
      <nav className="flex items-center gap-6 text-sm text-muted">
        <a href="#work" className="transition-colors hover:text-foreground">
          work
        </a>
        <a href="#writing" className="transition-colors hover:text-foreground">
          writing
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="rise pt-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/img/avatar.jpg"
            alt="Fedor Vasiliev"
            width={48}
            height={48}
            priority
            className="size-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-base font-medium text-foreground">
              Fedor Vasiliev
            </h1>
            <p className="text-sm text-muted">
              Senior product designer with 5+ years of experience
            </p>
          </div>
        </div>
        <p className="hidden shrink-0 items-center gap-2 pt-1 text-sm text-muted sm:flex">
          <LocalTime />
          <Cat />
        </p>
      </div>

      <div className="mt-8 max-w-[650px] space-y-5 text-[15px] leading-7 text-foreground/85">
        <p>
          I currently work at <Accent>Ozon</Accent> as a Senior product
          designer, where I led design of promotional mechanics and campaigns.
        </p>
        <p>
          I&apos;m also a co-founder of <Accent>Stonks</Accent> — an app that
          helps build financial literacy.
        </p>
        <p>
          What I enjoy most is taking projects from 0 to 1 — I have an
          entrepreneurial mindset and like owning a problem end-to-end, from
          early concept through to shipped result.
        </p>
        <p className="text-muted">
          You can find me on{" "}
          <Social href={social.linkedin}>LinkedIn</Social>,{" "}
          <Social href={social.x}>X</Social> or reach via{" "}
          <Social href={social.email}>email</Social>.
        </p>
      </div>
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
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-card">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-foreground">{p.title}</h3>
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
              className="group flex items-center gap-5 rounded-2xl bg-card p-5 sm:gap-7 sm:p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/paper.svg"
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
                className="size-16 shrink-0 rotate-[15deg] transition-transform duration-300 ease-out group-hover:rotate-0 sm:size-[72px]"
              />
              <div className="max-w-[650px]">
                <h3 className="text-lg font-medium leading-snug text-foreground">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">
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
      <h2 className="max-w-[650px] text-2xl font-medium leading-snug tracking-tight">
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
    </section>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

function Social({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-foreground underline decoration-border-subtle underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}
