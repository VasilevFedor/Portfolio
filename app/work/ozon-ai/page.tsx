import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import { social } from "../../data";

export const metadata: Metadata = {
  title: "Ozon AI assistant — Fedor Vasiliev",
  description:
    "Case study: designing an AI assistant for the Ozon Seller Center to help sellers grow revenue and cut the load on support. +30% DAU, 35% 7-day retention.",
};

/* ---------- content ---------- */

const team = [
  "Lead Product Designer",
  "3 Product Managers",
  "Product Director",
  "User Researcher",
  "4 Software Engineers",
  "2 Mobile Engineers",
];

const principles = [
  {
    n: "01",
    title: "AI is a teammate, not a tool",
    body: "AI should feel like a helpful assistant working behind the scenes — supporting users without demanding their attention.",
  },
  {
    n: "02",
    title: "AI should empower people, not make things more complicated",
    body: "Users shouldn't have to learn how to use AI. The best products integrate it seamlessly, enhancing the experience instead of adding complexity.",
  },
  {
    n: "03",
    title: "Start with the problem, not the technology",
    body: "It's tempting to build flashy AI features, but without a clear user need they fail. Thoughtful design keeps the technology serving the user — not the other way around.",
  },
  {
    n: "04",
    title: "Test",
    body: "AI can be unpredictable, which makes testing before rollout extremely important.",
  },
];

const concepts = [
  {
    n: "Concept 1",
    body: "Combine the knowledge base and the AI assistant into a single surface, so users keep access to the tool they already know.",
    src: "/img/ozon-ai/concept-1.png",
    selected: false,
  },
  {
    n: "Concept 2",
    body: "The same combination of both tools, but with more emphasis placed on the AI assistant itself.",
    src: "/img/ozon-ai/concept-2.png",
    selected: true,
  },
  {
    n: "Concept 3",
    body: "The most familiar type of AI assistant — the knowledge base and onboarding features integrated directly inside it.",
    src: "/img/ozon-ai/concept-3.png",
    selected: false,
  },
];

const finalFeatures = [
  {
    title: "Proactively initiating a dialogue with the user",
    body: "Together with the PM we identified the main triggers that prompt a message from the assistant — for example, when a seller spends a long time searching for something on the page.",
    src: "/img/ozon-ai/final-1.png",
    width: 3840,
    height: 2400,
    caption: "The assistant, in context — proactively offering to pull yesterday's metrics.",
  },
  {
    title: "User sales analysis",
    body: "The LLM analyses a seller's sales across several parameters and reports the previous day's statistics. Sellers can request the analysis themselves, or the assistant pushes it as a notification.",
    src: "/img/ozon-ai/final-sales.png",
    width: 2000,
    height: 1600,
  },
  {
    title: "Answers based on the knowledge base",
    body: "With the knowledge base built in, sellers can ask for exactly the information they need. The assistant and the knowledge base exist side by side.",
    src: "/img/ozon-ai/final-knowledge.png",
    width: 2000,
    height: 1250,
  },
  {
    title: "Interaction with support and reviews",
    body: "Contacting technical support and leaving feedback about the account stays one tap away — always available in the bottom chat bar.",
    src: "/img/ozon-ai/final-support.png",
    width: 2000,
    height: 1250,
  },
];

const results = [
  { value: "30%", label: "DAU" },
  { value: "35%", label: "7-day retention" },
  { value: "£3.1M", label: "Contribution margin" },
  { value: "1.5 mo", label: "Delivery time" },
];

export default function OzonAiCase() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <div className="py-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </div>

      {/* Hero */}
      <header className="rise pt-6">
        <p className="text-sm font-medium text-muted">Product Design · 2025</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Ozon AI assistant
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Created a little mate to help sellers increase revenue and reduce the
          workload on technical support.
        </p>
      </header>

      <Figure
        src="/img/ozon-ai.png"
        width={1600}
        height={882}
        alt="The Ozon AI assistant across the Seller Center on desktop and mobile"
        priority
        className="mt-12"
      />

      {/* Meet the team */}
      <Reveal as="section" className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Meet the team
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border-subtle pt-8 sm:grid-cols-3">
          {team.map((role, i) => (
            <Reveal key={role} delay={i * 40} as="li">
              <span className="flex items-center gap-2.5 text-sm leading-6 text-foreground">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                />
                {role}
                {i === 0 && (
                  <span className="text-xs text-muted">· me</span>
                )}
              </span>
            </Reveal>
          ))}
        </ul>
      </Reveal>

      <div className="pb-28">
        {/* Problem */}
        <Section eyebrow="01" title="Problem">
          <p>
            Ozon is a large marketplace with plenty of sales opportunities.
            Sellers constantly ask for tips on how to boost sales, and personal
            account managers and support staff can&rsquo;t keep up with the
            volume of requests.
          </p>
          <p>
            We saw an AI assistant as a way to give sellers a single point of
            access for every help-and-support question about their account,
            lift Ozon&rsquo;s GMV through personalised recommendations, and meet
            sellers where they already were — interviews showed many of them
            were reaching for AI on their own.
          </p>
        </Section>

        <Callout title="Why AI-assistant?">
          We already had a production ML model working with all the data sellers
          need. It could become a single point of access for help and support,
          and grow GMV through personalised sales recommendations — and sellers
          told us, repeatedly, that they already use AI.
        </Callout>

        {/* Discovery */}
        <Section eyebrow="02" title="Discovery">
          <p>
            Before designing any flow, I studied how modern AI tools are built
            so I wouldn&rsquo;t overlook anything important. That research
            distilled into four principles — the foundation for the entire
            assistant.
          </p>
        </Section>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 60}
              className="rounded-2xl border border-border-subtle bg-card p-6"
            >
              <span className="text-sm font-medium text-muted tabular-nums">
                Principle {p.n}
              </span>
              <h3 className="mt-3 text-lg font-medium leading-snug text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Competitive analysis */}
        <Section eyebrow="03" title="Competitive analysis">
          <p>
            Together with the product manager we ran a competitor analysis that
            covered both direct and indirect players, and mapped what sellers
            already had to work with.
          </p>
        </Section>

        {/* Early concepts */}
        <Section eyebrow="04" title="Early concepts">
          <p>
            After discovery I sketched several rough concepts for the assistant
            to present to the C-level executives. First, though, it&rsquo;s worth
            seeing the experience sellers had before.
          </p>
        </Section>

        <Reveal as="section" className="mt-10 max-w-2xl">
          <h3 className="text-base font-medium text-foreground">
            Current user experience
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-muted">
            A separate &ldquo;Help &amp; Training&rdquo; panel bolted onto the
            side of the interface.
          </p>
        </Reveal>

        <Figure
          src="/img/ozon-ai/big-1.png"
          width={3596}
          height={2088}
          alt="The existing Help & Training panel in the Ozon Seller Center"
          caption="The knowledge base as it existed before — a static side panel."
          className="mt-6"
        />

        <div className="mt-10 space-y-14">
          {concepts.map((c, i) => (
            <Reveal as="figure" key={c.n} delay={i * 40}>
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-lg font-medium text-foreground sm:text-xl">
                  {c.n}
                </h3>
                {c.selected && (
                  <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
                    Took this one
                  </span>
                )}
              </div>
              <p className="mb-5 max-w-2xl text-[15px] leading-7 text-muted">
                {c.body}
              </p>
              <div
                className={`overflow-hidden rounded-2xl border bg-card ${
                  c.selected ? "border-foreground/25" : "border-border-subtle"
                }`}
              >
                <Image
                  src={c.src}
                  width={2400}
                  height={1860}
                  alt={`${c.n} mockup`}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Main flows */}
        <Section eyebrow="05" title="Main flows">
          <p>
            Once the concept was approved, the PM and I built out the
            assistant&rsquo;s core workflows: proactive recommendations, an
            analysis of the seller&rsquo;s sales from the previous day, and
            knowledge-base answers on demand.
          </p>
        </Section>

        <Figure
          src="/img/ozon-ai/main-flows.png"
          width={2400}
          height={762}
          alt="The full flow map for the AI assistant"
          caption="Quite a lot of flows."
          className="mt-8"
        />

        {/* Final design */}
        <Section eyebrow="06" title="What the final design looks like">
          <p>
            I built mockups and prototypes of the assistant&rsquo;s core
            features to review with executives and test with users. Four pieces
            carried the experience.
          </p>
        </Section>

        <div className="mt-8 space-y-14">
          {finalFeatures.map((f, i) => (
            <Reveal as="section" key={f.title} delay={i * 40}>
              <h3 className="max-w-2xl text-lg font-medium text-foreground sm:text-xl">
                {f.title}
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-muted">
                {f.body}
              </p>
              <Figure
                src={f.src}
                width={f.width}
                height={f.height}
                alt={f.title}
                caption={f.caption}
                className="mt-6"
              />
            </Reveal>
          ))}
        </div>

        {/* Test */}
        <Section eyebrow="07" title="Test">
          <p>
            I wrote a guide and a question set for moderated usability testing to
            iron out issues before production. Eight sellers took part.
          </p>
        </Section>

        <Figure
          src="/img/ozon-ai/flows.png"
          width={2400}
          height={1065}
          alt="Research guide and the usability-test flow map"
          caption="A research guide on the left, the full test flow map on the right."
          className="mt-8"
        />

        {/* A/B test & launch */}
        <Section eyebrow="08" title="A/B test & launch">
          <p>
            The assistant rolled out in waves — a handful of loyal users, then
            10%, 30%, 50%, and finally 100% of the platform.
          </p>
        </Section>

        {/* What didn't work */}
        <Reveal as="section" className="mt-10 max-w-2xl">
          <h3 className="text-base font-medium text-foreground">
            What didn&rsquo;t work
          </h3>
          <p className="mt-1.5 text-[15px] leading-7 text-muted">
            The proactive bubble that started conversations landed a
            click-through rate of just{" "}
            <strong className="text-foreground">1.5%</strong>. In-depth
            interviews revealed why: sellers simply don&rsquo;t look in that
            corner, buried under a pile of pop-up notifications.
          </p>
        </Reveal>

        <Figure
          src="/img/ozon-ai/didnt-work.png"
          width={2000}
          height={1250}
          alt="The proactive bubble on the dashboard converted at only 1.5%"
          caption="The conversion rate is just 1.5%."
          className="mt-6"
        />

        {/* A/B test of entry points */}
        <Reveal as="section" className="mt-16 max-w-2xl">
          <h3 className="text-base font-medium text-foreground">
            A/B test of entry points
          </h3>
          <p className="mt-1.5 text-[15px] leading-7 text-muted">
            Since a help window already existed in the interface, I hypothesised
            the assistant would convert better from the header. We ran a 35-day
            A/B test between two entry points — and the floating button won,
            decisively.
          </p>
        </Reveal>

        <Figure
          src="/img/ozon-ai/ab-annotated.png"
          width={2400}
          height={1500}
          alt="The two entry points compared — the header slot and the floating button"
          className="mt-6"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
            <Image
              src="/img/ozon-ai/ab-header.png"
              width={3840}
              height={2400}
              alt="Header entry point variant"
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="flex items-baseline justify-between p-5">
              <span className="text-sm text-muted">Header entry point</span>
              <span className="text-xl font-semibold text-foreground">5%</span>
            </div>
          </Reveal>
          <Reveal
            delay={60}
            className="overflow-hidden rounded-2xl border border-foreground/25 bg-foreground/[0.04]"
          >
            <Image
              src="/img/ozon-ai/ab-floating.png"
              width={3840}
              height={2400}
              alt="Floating button entry point variant"
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="flex items-baseline justify-between p-5">
              <span className="text-sm font-medium text-foreground">
                Floating button · winner
              </span>
              <span className="text-xl font-semibold text-foreground">15%</span>
            </div>
          </Reveal>
        </div>

        {/* Results */}
        <Section eyebrow="09" title="Results">
          <p>
            After several months live across the platform, the assistant
            delivered:
          </p>
        </Section>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-4">
          {results.map((r, i) => (
            <Reveal
              key={r.label}
              delay={i * 60}
              className="bg-background p-6 text-center sm:text-left"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {r.value}
              </div>
              <div className="mt-2 text-sm text-muted">{r.label}</div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 border-t border-border-subtle pt-10">
          <h2 className="text-2xl font-medium tracking-tight">
            Want the full walkthrough?
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-muted">
            Happy to talk through the decisions, the research and the trade-offs
            behind this project.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={social.email}
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              Get in touch
            </a>
            <Link
              href="/#work"
              className="rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card"
            >
              More work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- building blocks ---------- */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="mt-24 max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tabular-nums text-muted">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-body">
        {children}
      </div>
    </Reveal>
  );
}

function Callout({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "warn";
}) {
  return (
    <Reveal
      className={`mt-12 max-w-2xl rounded-2xl border p-6 sm:p-8 ${
        tone === "warn"
          ? "border-amber-500/25 bg-amber-500/[0.06]"
          : "border-border-subtle bg-card"
      }`}
    >
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-[15px] leading-7 text-muted">{children}</p>
    </Reveal>
  );
}

function Figure({
  src,
  width,
  height,
  alt,
  caption,
  priority,
  className = "",
}: {
  src: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Reveal as="figure" className={className}>
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-6 text-muted">
          {caption}
        </figcaption>
      )}
    </Reveal>
  );
}
