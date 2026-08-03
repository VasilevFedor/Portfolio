import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import LocalTime from "./components/LocalTime";
import { articles, projects, social } from "./data";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6">
      <SiteHeader />

      <main className="flex-1 pb-24">
        <Hero />
        <Work />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-5 backdrop-blur-md">
      <Link
        href="/"
        className="font-serif text-2xl italic tracking-tight text-foreground"
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
        <p className="hidden shrink-0 pt-1 text-sm text-muted sm:block">
          <LocalTime />
        </p>
      </div>

      <div className="mt-8 space-y-5 text-[15px] leading-7 text-foreground/85">
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
      <ul className="mt-8 space-y-4">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border-subtle bg-card transition-colors duration-300 hover:border-foreground/20"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 672px) 100vw, 672px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="font-medium text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {p.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
                >
                  →
                </span>
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
              className="group flex items-start justify-between gap-4 rounded-2xl border border-border-subtle bg-card p-5 transition-colors duration-300 hover:border-foreground/20"
            >
              <div>
                <h3 className="font-medium text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {a.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
              >
                →
              </span>
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
      <h2 className="max-w-md text-2xl font-medium leading-snug tracking-tight">
        Let&apos;s connect — I&apos;m open to new opportunities
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
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

function SiteFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-border-subtle py-8 text-sm text-muted">
      <span className="font-serif text-lg italic text-foreground">fedor.</span>
      <span>© {new Date().getFullYear()} Fedor Vasiliev</span>
    </footer>
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
