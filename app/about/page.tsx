import Image from "next/image";
import type { Metadata } from "next";
import Intro from "../components/Intro";
import SiteHeader from "../components/SiteHeader";
import Signature from "../components/Signature";
import { social } from "../data";

export const metadata: Metadata = {
  title: "About — Fedor Vasiliev",
  description:
    "Senior product designer at Ozon and co-founder of Stonks. I take products from 0 to 1 and like owning a problem end-to-end.",
};

export default function About() {
  return (
    <Intro>
      <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-6">
        <SiteHeader />

        <main className="flex-1 pb-24">
          <section className="rise pt-10">
            <div className="flex items-center gap-3">
              <Image
                src="/img/avatar.jpg"
                alt="Fedor Vasiliev"
                width={56}
                height={56}
                priority
                className="size-14 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-medium tracking-tight text-foreground">
                  About
                </h1>
                <p className="text-sm text-muted">
                  Fedor Vasiliev — Senior product designer
                </p>
              </div>
            </div>

            <div className="mt-8 max-w-[650px] space-y-5 text-[15px] leading-7 text-body">
              <p>
                I currently work at <Accent>Ozon</Accent> as a Senior product
                designer, where I led design of promotional mechanics and
                campaigns.
              </p>
              <p>
                I&apos;m also a co-founder of <Accent>Stonks</Accent> — an app
                that helps build financial literacy.
              </p>
              <p>
                What I enjoy most is taking projects from 0 to 1 — I have an
                entrepreneurial mindset and like owning a problem end-to-end,
                from early concept through to shipped result.
              </p>
              <p className="text-muted">
                You can find me on{" "}
                <Social href={social.linkedin}>LinkedIn</Social>,{" "}
                <Social href={social.x}>X</Social> or reach via{" "}
                <Social href={social.email}>email</Social>.
              </p>
            </div>

            <Signature className="mt-12 text-[17px]" />
          </section>
        </main>
      </div>
    </Intro>
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
