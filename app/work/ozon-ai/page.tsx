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

const facts = [
  { label: "Role", value: "Lead Product Designer" },
  { label: "Timeline", value: "1.5 months to delivery" },
  { label: "Platform", value: "Ozon Seller · web & mobile" },
  { label: "Team", value: "Product director, 3 PMs, researcher, 6 engineers" },
];

const principles = [
  {
    n: "01",
    title: "AI is a teammate, not a tool",
    body: "It should feel like a helpful assistant working behind the scenes — supporting users without demanding their attention.",
  },
  {
    n: "02",
    title: "Empower people, don't add complexity",
    body: "Users shouldn't have to learn how to use AI. The best products integrate it seamlessly, enhancing the experience instead of complicating it.",
  },
  {
    n: "03",
    title: "Start with the problem, not the technology",
    body: "Flashy AI features fail without a clear user need. Thoughtful design keeps the technology serving the user — not the other way around.",
  },
  {
    n: "04",
    title: "Test relentlessly",
    body: "AI can be unpredictable, which makes testing before rollout non-negotiable.",
  },
];

const concepts = [
  {
    n: "Concept 1",
    body: "Combine the knowledge base and the AI assistant into one surface, so users keep access to the tool they already know.",
    selected: false,
  },
  {
    n: "Concept 2",
    body: "The same combination of both tools, but with more emphasis placed on the AI assistant itself.",
    selected: true,
  },
  {
    n: "Concept 3",
    body: "The most familiar type of AI assistant — knowledge base and onboarding features integrated directly inside it.",
    selected: false,
  },
];

const results = [
  { value: "+30%", label: "DAU" },
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
          A little mate that helps sellers increase revenue and reduces the
          workload on technical support.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border-subtle pt-8 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-sm leading-6 text-foreground">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <Figure
        src="/img/ozon-ai.png"
        width={1600}
        height={882}
        alt="The Ozon AI assistant across the Seller Center on desktop and mobile"
        priority
        className="mt-12"
      />

      <div className="pb-28">
        {/* Problem */}
        <Section eyebrow="01" title="The problem">
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

        <Callout title="Why an AI assistant?">
          We already had a production ML model working with all the data sellers
          need. It could become a single point of access for help and support,
          and grow GMV through personalised sales recommendations — and sellers
          told us, repeatedly, that they already use AI.
        </Callout>

        {/* Discovery */}
        <Section eyebrow="02" title="Discovery">
          <p>
            Before designing any flow, I studied how modern AI tools are built
            so I wouldn&rsquo;t miss anything important. That research distilled
            into four principles — the foundation for the entire assistant.
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
                {p.n}
              </span>
              <h3 className="mt-3 text-lg font-medium leading-snug text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Current UX */}
        <Section eyebrow="03" title="The current experience">
          <p>
            Together with the product manager we ran a competitor analysis
            across direct and indirect players, and mapped what sellers already
            had: a separate &ldquo;Help &amp; Training&rdquo; panel bolted onto
            the side of the interface.
          </p>
        </Section>

        <Figure
          src="/img/ozon-ai/big-1.png"
          width={3596}
          height={2088}
          alt="The existing Help & Training panel in the Ozon Seller Center"
          caption="The knowledge base as it existed before — a static side panel."
          className="mt-8"
        />

        {/* Concepts */}
        <Section eyebrow="04" title="Early concepts">
          <p>
            After discovery I sketched several rough concepts to present to
            C-level executives. Three made the cut — and we chose the one that
            leaned hardest into the assistant.
          </p>
        </Section>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {concepts.map((c, i) => (
            <Reveal
              key={c.n}
              delay={i * 60}
              className={`relative rounded-2xl border p-6 ${
                c.selected
                  ? "border-foreground/25 bg-foreground/[0.04]"
                  : "border-border-subtle bg-card"
              }`}
            >
              {c.selected && (
                <span className="absolute right-4 top-4 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
                  Selected
                </span>
              )}
              <h3 className="text-sm font-medium text-foreground">{c.n}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Main flows */}
        <Section eyebrow="05" title="Main flows">
          <p>
            Once the concept was approved, the PM and I built out the assistant&rsquo;s
            core workflows: proactive recommendations, an analysis of the seller&rsquo;s
            sales from the previous day, and knowledge-base answers on demand.
          </p>
        </Section>

        <Figure
          src="/img/ozon-ai/flows.png"
          width={4941}
          height={1929}
          alt="Research guide and the full Figma flow map for the assistant"
          caption="A research guide on the left, the full flow map on the right — quite a lot of flows."
          className="mt-8"
        />

        {/* Final design */}
        <Section eyebrow="06" title="What the final design looks like">
          <p>
            I built mockups and prototypes of the assistant&rsquo;s core features to
            review with executives and test with users. Four pieces carried the
            experience:
          </p>
        </Section>

        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {[
            [
              "Proactive dialogue",
              "The assistant opens a conversation off clear triggers — for example, when a seller spends a long time hunting for something on a page.",
            ],
            [
              "Sales analysis",
              "The LLM analyses a seller's sales across several parameters and reports yesterday's stats — on request, or pushed as a notification.",
            ],
            [
              "Knowledge-base answers",
              "With the knowledge base built in, sellers can ask for exactly the information they need. Assistant and knowledge base live side by side.",
            ],
            [
              "Support & reviews",
              "Contacting technical support and leaving feedback stays one tap away, always available in the bottom chat bar.",
            ],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 50} as="li">
              <h3 className="text-base font-medium text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </ul>

        <Figure
          src="/img/ozon-ai/final-1.png"
          width={3840}
          height={2400}
          alt="The AI assistant embedded in the Ozon Seller dashboard"
          caption="The assistant, in context — proactively offering to pull yesterday's metrics."
          className="mt-10"
        />

        {/* Testing */}
        <Section eyebrow="07" title="Testing & launch">
          <p>
            I wrote a guide and a question set for moderated usability testing to
            iron out issues before production; eight sellers took part. The
            assistant then rolled out in waves — a handful of loyal users, then
            10%, 30%, 50%, and finally 100% of the platform.
          </p>
        </Section>

        <Callout title="What didn't work" tone="warn">
          The proactive bubble that started conversations landed a click-through
          rate of just <strong className="text-foreground">1.5%</strong>.
          In-depth interviews revealed why: sellers simply don&rsquo;t look in
          that corner, buried under a pile of pop-up notifications.
        </Callout>

        {/* A/B entry points */}
        <Section eyebrow="08" title="A/B testing the entry point">
          <p>
            Since a help window already existed in the interface, I hypothesised
            the assistant would convert better from the header. We ran a 35-day
            A/B test between two entry points — and the floating button won,
            decisively.
          </p>
        </Section>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
            <Image
              src="/img/ozon-ai/ab-header.png"
              width={720}
              height={406}
              alt="Header entry point variant"
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="flex items-baseline justify-between p-5">
              <span className="text-sm text-muted">Header entry point</span>
              <span className="text-xl font-semibold text-foreground">
                5%
              </span>
            </div>
          </Reveal>
          <Reveal
            delay={60}
            className="overflow-hidden rounded-2xl border border-foreground/25 bg-foreground/[0.04]"
          >
            <Image
              src="/img/ozon-ai/ab-floating.png"
              width={716}
              height={407}
              alt="Floating button entry point variant"
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="flex items-baseline justify-between p-5">
              <span className="text-sm font-medium text-foreground">
                Floating button · winner
              </span>
              <span className="text-xl font-semibold text-foreground">
                15%
              </span>
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
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/85">
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
