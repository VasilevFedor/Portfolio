import Link from "next/link";
import Image from "next/image";
import LocalTime from "./components/LocalTime";
import SocialLinks from "./components/SocialLinks";
import SiteHeader from "./components/SiteHeader";
import WorkCard from "./components/WorkCard";
import ContactPreview from "./components/ContactPreview";
import Reveal from "./components/Reveal";
import { TextAnimate, TextAnimateOnce } from "./components/TextAnimate";
import { articles, projects, social } from "./data";
import HeroSky from "./components/HeroSky";
import FooterGarden from "./components/FooterGarden";

export default function Home() {
  // 800px content column, centred. Horizontal padding only kicks in below the
  // column width so the media panels stay full-bleed to the column on desktop
  // (matching the Framer source).
  return (
    <div className="home-page">
      <HeroSky />
      <div className="home-content mx-auto w-full max-w-[800px] px-6 min-[800px]:px-0">
        <SiteHeader />
        <main>
          <Hero />
          <Work />
          <Writing />
          <Contact />
        </main>
      </div>
      <FooterGarden />
    </div>
  );
}

function Hero() {
  return (
    <TextAnimateOnce>
      <section className="relative z-30 pb-[96px]">
      {/* Intro stack: identity row, bio, contact line — 16px rhythm, 24px below
          header. Text reveals from top to bottom with a compact character
          stagger; the long copy overlaps so the sequence stays under 3 seconds. */}
      <div className="hero-copy mt-6 flex flex-col gap-4">
        {/* Identity row: portrait + name/role. */}
        <div className="flex items-center gap-3">
          <Image
            src="/img/avatar.jpg"
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
          <div>
            <TextAnimate animation="blurInUp" by="character" once className="t-body">
              Fedor Vasiliev
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="character"
              once
              delay={0.12}
              className="t-sub"
            >
              Senior product designer
            </TextAnimate>
          </div>
        </div>

        {/* Bio and project links share the same reading width. */}
        <div className="max-w-[550px] space-y-4">
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            delay={0.16}
            duration={0.45}
            stagger={0.003}
            className="t-body-muted"
          >
            Hi! I currently work at{" "}
            <Em>Ozon as a Senior product designer</Em>, where I{" "}
            <Em>led design of promotional mechanics and campaigns</Em>. I have{" "}
            <Em>over 5 years</Em> of experience, building products for the
            audience of more than <Em>60 million</Em> people
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="character" once delay={0.7} duration={0.45} stagger={0.003} className="t-body-muted">
            What I enjoy most is taking projects from <Em>0 to 1</Em> — I have
            an entrepreneurial mindset and{" "}
            <Em>like owning a problem end-to-end</Em>, from early concept
            through to shipped result.
          </TextAnimate>
        </div>

        {/* Contact line — single row, each link revealing a profile preview. */}
        <TextAnimate
          animation="blurInUp"
          by="character"
          once
          delay={1}
          duration={0.45}
          stagger={0.008}
          className="t-body-muted relative z-10 flex flex-wrap items-center gap-x-1.5"
        >
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
        </TextAnimate>

        <section aria-labelledby="built-heading" className="max-w-[550px] space-y-2">
          <h2 id="built-heading" className="font-sans text-sm font-medium text-muted">Built</h2>
          <ul className="flex flex-col gap-3 font-sans">
            {[
              {
                id: "specimen-lab", title: "Specimen Lab", href: "https://specimenlab.vercel.app/",
                icon: "/icons/specimen.svg", description: "An interactive ASCII playground",
              },
              {
                title: "Stonks", href: "/stonks", icon: "/icons/stonks.webp",
                description: "An app for building financial literacy", platform: "TestFlight",
              },
            ].map(({ id, title, href, icon, description, platform }) => (
              <li key={href} id={id}>
                <Link href={href} className="group inline-flex max-w-full items-center gap-2 rounded-lg align-top">
                  <Image src={icon} width={40} height={40} alt="" className="size-10 shrink-0 rounded-lg" />
                  <span className="min-w-0">
                    <span className="block text-base leading-5 font-medium tracking-[-0.02em] text-foreground group-hover:underline">{title}</span>
                    <span className="block text-sm leading-5 tracking-[-0.02em] text-muted">
                      {description}
                      {platform && (
                        <span className="whitespace-nowrap"><span aria-hidden="true" className="mx-2">•</span>{platform}</span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <TextAnimate
          animation="blurInUp"
          by="character"
          once
          delay={1.1}
          duration={0.45}
          className="t-body-muted"
        >
          <LocalTime />
        </TextAnimate>
      </div>
      </section>
    </TextAnimateOnce>
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
    <section id="cases" className="scroll-mt-24">
      <div className="flex flex-col gap-12">
        <Reveal as="h2" className="t-heading">
          Work
        </Reveal>
        <ul className="flex flex-col gap-12">
          {projects.map((p, i) => (
            <li key={p.slug} id={p.slug} className="scroll-mt-24">
              <Reveal delay={i * 70}>
                <WorkCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="scroll-mt-24 pt-[96px]">
      <div className="flex flex-col gap-6">
        <Reveal as="h2" className="t-heading">
          Writing
        </Reveal>
        <ul>
          {articles.map((a, i) => (
            <li key={a.slug} id={a.slug} className="scroll-mt-24">
              <Reveal delay={i * 70}>
                <Link
                  href={a.href ?? `/writing/${a.slug}`}
                  className="writing-row group flex items-start gap-2.5"
                >
                  {/* White rounded icon tile (48×48, r16) with a 32px document glyph. */}
                  <span className="writing-row__icon grid size-12 shrink-0 place-items-center rounded-2xl bg-card text-foreground">
                    <DocIcon />
                  </span>
                  <div className="pt-0.5">
                    <h3 className="writing-row__title t-writing-title">{a.title}</h3>
                    {a.date ? <p className="t-sub mt-1">{a.date}</p> : null}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="pt-[96px] pb-10">
      <div className="flex flex-col items-start gap-4">
        <Reveal as="h2" className="t-heading max-w-[600px]">
          Let&rsquo;s connect—I&rsquo;m open to new opportunities
        </Reveal>
        <Reveal as="p" delay={70} className="t-body-muted max-w-[600px]">
          I would love to partner with teams to help clarify the complexities,
          find elegant solutions and deliver the best result
        </Reveal>
        <Reveal delay={140} className="mt-4">
          <SocialLinks />
        </Reveal>
      </div>
    </section>
  );
}
