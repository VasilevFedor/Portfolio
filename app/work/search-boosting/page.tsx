import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import { social } from "../../data";

export const metadata: Metadata = {
  title: "Search boosting — Fedor Vasiliev",
  description:
    "Case study: reshaping Ozon's seller promotions with elastic search boosting, giving sellers a reason to discount more. +40% items sold, +1.6% total GMV.",
};

const facts = [
  { label: "Role", value: "Product Designer" },
  { label: "Timeline", value: "2024" },
  { label: "Platform", value: "Ozon Seller · web" },
  { label: "Team", value: "Product manager, commercial team, engineers" },
];

const takeaways = [
  "Sellers don't understand the differences between promotions within a single campaign, which hurts the share of products enrolled.",
  "Sellers set their discount based on product margin — but are willing to raise it if a meaningfully bigger search boost is on offer (meaningful being 15–30%).",
  "They track promo sales through the Ozon seller dashboard or third-party plugins.",
  "Adding products to different promotions is inconvenient — it means opening three separate Excel files and constantly switching between them.",
];

const concepts = [
  {
    n: "Concept 1",
    title: "Combine three promotions into one",
    body: "One promotion instead of three, so sellers set a discount anywhere across a wide range rather than picking a fixed tier.",
    src: "/img/search-boosting/concept1-b.png",
    width: 1280,
    height: 957,
    selected: false,
  },
  {
    n: "Concept 2",
    title: "Add a column with boosting",
    body: "The same single promotion, but the search boost is shown as an explicit column tied to the discount the seller enters.",
    src: "/img/search-boosting/concept2-b.png",
    width: 1282,
    height: 720,
    selected: false,
  },
  {
    n: "Concept 3",
    title: "A progress bar with boosting level",
    body: "Elastic boosting — a progress bar maps the discount straight to the search boost, so a bigger discount visibly buys a bigger lift.",
    src: "/img/search-boosting/concept3.png",
    width: 1280,
    height: 719,
    selected: true,
  },
];

const results = [
  { value: "+40%", label: "Items sold" },
  { value: "+8%", label: "Average discount amount" },
  { value: "+2%", label: "Discount amount" },
  { value: "+1.6%", label: "Total Ozon GMV" },
];

export default function SearchBoostingCase() {
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
        <p className="text-sm font-medium text-muted">Product Design · 2024</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Search boosting
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Reshaping Ozon&rsquo;s seller promotions so a bigger discount visibly
          buys a bigger lift in search — and sellers finally have a reason to
          offer more.
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
        src="/img/search-boosting.png"
        width={1600}
        height={800}
        alt="Ozon seller promotions with elastic search boosting"
        priority
        className="mt-12"
      />

      <div className="pb-28">
        {/* Context */}
        <Section eyebrow="01" title="What our team does">
          <p>
            I work on the promotions and product-advertising section for Ozon
            sellers — helping them push products up the search results, drive
            more sales, and take part in special promotional campaigns. The goal
            is to get sellers engaged with promo mechanics and build long-term
            loyalty.
          </p>
        </Section>

        {/* Problem */}
        <Section eyebrow="02" title="The problem">
          <p>
            We ran a set of promotions with three fixed discount tiers and three
            matching boosting tiers. The design gave sellers no incentive to
            raise their discount past the minimum — they hit the threshold just
            to qualify, then had no reason to offer more.
          </p>
        </Section>

        <Figure
          src="/img/search-boosting/problem.png"
          width={1600}
          height={800}
          alt="Three near-identical promotions differing only by required discount"
          caption="Three identical promotions, differing only in the discount they required."
          className="mt-8"
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["promo-1", "promo-2", "promo-3"].map((p, i) => (
            <Reveal
              key={p}
              delay={i * 60}
              className="overflow-hidden rounded-xl border border-border-subtle bg-card"
            >
              <Image
                src={`/img/search-boosting/${p}.png`}
                width={800}
                height={134}
                alt={`Current promotion tier ${i + 1}`}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, 260px"
              />
            </Reveal>
          ))}
        </div>

        {/* Research */}
        <Section eyebrow="03" title="Research">
          <p>
            Analytics showed that about{" "}
            <strong className="text-foreground">60% of sellers</strong> add
            products only to the promotion that requires the minimum discount
            needed to earn a search-ranking boost — and no further.
          </p>
        </Section>

        <Figure
          src="/img/search-boosting/research.png"
          width={800}
          height={351}
          alt="Analytics on seller participation across the discount tiers"
          className="mt-8"
        />

        {/* Interviews */}
        <Section eyebrow="04" title="Interviews & takeaways">
          <p>
            I wrote a guide and a set of questions for user interviews to
            understand how sellers actually use promotions today. Four things
            stood out:
          </p>
        </Section>

        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {takeaways.map((t, i) => (
            <Reveal key={i} delay={i * 50} as="li" className="flex gap-3">
              <span className="mt-0.5 select-none text-sm font-medium tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-7 text-body">{t}</p>
            </Reveal>
          ))}
        </ul>

        {/* Hypotheses / concepts */}
        <Section eyebrow="05" title="Hypotheses">
          <p>
            For each hypothesis I sketched rough designs — easier to discuss
            ideas with the manager and present them to the commercial team. Every
            concept collapsed the three promotions into one, letting a seller
            join a single promotion and set a discount across a wide range.
          </p>
        </Section>

        <div className="mt-8 space-y-4">
          {concepts.map((c, i) => (
            <Reveal
              key={c.n}
              delay={i * 60}
              className={`overflow-hidden rounded-2xl border ${
                c.selected
                  ? "border-foreground/25 bg-foreground/[0.04]"
                  : "border-border-subtle bg-card"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-6 pt-6">
                <div>
                  <span className="text-sm font-medium text-muted">{c.n}</span>
                  <h3 className="mt-1 text-lg font-medium leading-snug text-foreground">
                    {c.title}
                  </h3>
                </div>
                {c.selected && (
                  <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
                    Selected
                  </span>
                )}
              </div>
              <p className="max-w-2xl px-6 pt-2 text-sm leading-6 text-muted">
                {c.body}
              </p>
              <div className="px-6 pb-6 pt-5">
                <div className="overflow-hidden rounded-xl border border-border-subtle bg-background">
                  <Image
                    src={c.src}
                    width={c.width}
                    height={c.height}
                    alt={`${c.title} — interface mockup`}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Scoping */}
        <Section eyebrow="06" title="Scoping">
          <p>
            Together with the product manager we reviewed the hypotheses and kept
            the first and third. We dropped the second: that approach to pricing
            and discounts risked being confusing for sellers and awkward to
            build.
          </p>
        </Section>

        <Callout title="The solution — elastic boosting">
          One promotion, a progress bar, and reference prices that map every
          discount straight to the search boost it earns. Offer more, get more —
          and see exactly how much before you commit.
        </Callout>

        {/* Testing */}
        <Section eyebrow="07" title="Testing">
          <p>
            After thoroughly refining the mockups, I built prototypes and a
            question set for moderated usability testing with sellers to catch
            issues before development.
          </p>
        </Section>

        <Figure
          src="/img/search-boosting/test.png"
          width={1632}
          height={560}
          alt="Prototypes prepared for usability testing"
          className="mt-8"
        />

        {/* A/B & impact */}
        <Section eyebrow="08" title="A/B test & impact">
          <p>
            Once development wrapped, we ran an A/B test on 50% of sellers. The
            results came back strong:
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

        {/* Final result */}
        <Section eyebrow="09" title="Final result">
          <p>
            In the shipped version I added a reference price for each boost, so
            sellers can see at a glance what a given discount buys them in search
            — and decide with the numbers in front of them.
          </p>
        </Section>

        <Figure
          src="/img/search-boosting/final.png"
          width={716}
          height={396}
          alt="The final promotion flow with reference prices for each boost level"
          caption="Reference prices attached to every boost level in the final design."
          className="mt-8"
        />

        {/* CTA */}
        <div className="mt-24 border-t border-border-subtle pt-10">
          <h2 className="text-2xl font-medium tracking-tight">
            Want the full walkthrough?
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-muted">
            Happy to talk through the research, the pricing model and the
            trade-offs behind elastic boosting.
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-12 max-w-2xl rounded-2xl border border-foreground/20 bg-foreground/[0.04] p-6 sm:p-8">
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
