import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import BackToTop from "../components/BackToTop";

export const metadata: Metadata = {
  title: "Elastic boosting — Fedor Vasiliev",
  description: "Increased items sold by 40% and Ozon's total GMV by 1.6%",
};

/* ── Media host ──────────────────────────────────────────────────────────── */
const IMG = "https://framerusercontent.com/images";
const ASSET = "https://framerusercontent.com/assets";

/* ── Content (mirrors the published Framer /search-boosting 1:1) ─────────── */

// Interviews & takeaways: one lead-in line, then the four findings.
const takeawaysIntro =
  "I've prepared a guide and a set of questions for user interviews to understand how they're currently using promotions";
const takeaways = [
  "Sellers don't understand the differences between promotions within a single campaign, which hurts the share of products enrolled",
  "Sellers set their discount based on product margin, but are willing to increase it if a meaningfully bigger search boost is on offer (a “meaningful” boost is 15–30%)",
  "They track promo sales through the Ozon seller dashboard analytics or third-party plugins",
  "Adding products to different promotions is inconvenient — it means opening three separate Excel files and constantly switching between them",
];

// Hypotheses. Concept 1 shows two stacked mockups; the others one each.
const concepts = [
  {
    n: "Concept 1",
    body: "I combined three promotions with boosting into one so that users could participate in a single promotion and have the opportunity to set a wide range of discounts",
    images: [
      { src: `${IMG}/0iKMEMtGHxB4uM7pSy85nyB8wk.png`, ratio: "800 / 696" },
      { src: `${IMG}/fXN0Td8pTPoSz70pSZ11Kl89Ils.png`, ratio: "800 / 528" },
    ],
  },
  {
    n: "Concept 2",
    body: "When adding products to a promotion, I added a column showing the boost level. Clicking on it allows you to flexibly adjust the discount",
    images: [{ src: `${IMG}/lGGYsfPG3YZxlL9tI8rHjhQF4.png` }],
  },
  {
    n: "Concept 3",
    body: "I added a scale that changes depending on the discount level. The higher the discount, the greater the boost",
    images: [{ src: `${IMG}/x1OK7lJT0OdaM8kVn84qraQQAI.png` }],
  },
];

// A/B results — two in a row, then a full-width card (mirrors the Framer grid).
const results = [
  { value: "+8%", label: "Average discount amount" },
  { value: "+2%", label: "Discount Amount" },
  { value: "+1.6%", label: "Total Ozon GMV", wide: true },
];

// Stagger step between items that enter together (Emil: 30–80ms).
const STAGGER = 60;

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function SearchBoostingCase() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-6 min-[800px]:px-0">
      <SiteHeader />

      {/* 80px between top-level sections. */}
      <main className="flex flex-col gap-20 pt-10 pb-24">
        {/* Back to home */}
        <BackLink />

        {/* Hero heading */}
        <header className="rise flex flex-col gap-1">
          <h1 className="t-article-title">Elastic boosting</h1>
          <p className="t-article-body max-w-[600px]">
            Increased items sold by 40% and Ozon&apos;s total GMV by 1.6%
          </p>
        </header>

        {/* Hero image */}
        <Reveal>
          <CaseImage
            src={`${IMG}/VMxI7yOseupZG5jKimHH0uA3Kw.png`}
            alt="The final elastic-boosting promotion in the Ozon Seller center"
          />
        </Reveal>

        {/* What our team does */}
        <section className="flex flex-col gap-5">
          <Reveal as="h2" className="t-article-heading">
            What our team does
          </Reveal>
          <Reveal as="p" className="t-article-body max-w-[650px]">
            I work on the promotions and product-advertising section for Ozon
            sellers, helping them promote products in search results, drive more
            sales, and take part in special promotional campaigns. The goal is to
            get sellers engaged with promo mechanics and build long-term loyalty.
          </Reveal>
        </section>

        {/* Problem */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Problem</h2>
            <p className="t-article-body max-w-[650px]">
              We currently run a set of promotions with three fixed discount
              tiers and three matching boosting tiers. This design gives sellers
              no incentive to raise their discount beyond the minimum — they set
              the threshold discount just to qualify, then have no reason to
              offer more.
            </p>
          </Reveal>
          <Reveal>
            <CaseImage
              src={`${IMG}/jycqoJtBPn3eviGsFtqHUayCJOc.png`}
              alt="Three near-identical promotions differing only by the discount they require"
              ratio="800 / 400"
            />
          </Reveal>
        </section>

        {/* Research */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Research</h2>
            <p className="t-article-body max-w-[650px]">
              Analytics showed that about 60% of sellers add products only to
              promotions that require the minimum discount needed to earn a
              search-ranking boost.
            </p>
          </Reveal>
          <Reveal>
            <CaseImage
              src={`${IMG}/syIcaUJaFPKRo088DiO86szp8pY.png`}
              alt="Analytics on seller participation across the discount tiers"
              ratio="800 / 351"
              bordered={false}
            />
          </Reveal>

          {/* Interviews and takeaways */}
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">Interviews and takeaways</h3>
            <p className="t-article-body max-w-[650px]">{takeawaysIntro}</p>
          </Reveal>
          <div className="flex flex-col gap-2">
            {takeaways.map((t, i) => (
              <Reveal key={i} as="p" delay={i * STAGGER} className="t-article-body max-w-[650px]">
                {t}
              </Reveal>
            ))}
          </div>
        </section>

        {/* Hypotheses */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Hypotheses</h2>
            <p className="t-article-body max-w-[650px]">
              For each hypothesis, I sketched rough designs to make it easier to
              discuss ideas with the manager and present them to the commercial
              team.
            </p>
          </Reveal>

          {concepts.map((c) => (
            <Reveal key={c.n}>
              <figure className="flex flex-col gap-4">
                {c.images.map((img, i) => (
                  <CaseImage
                    key={i}
                    src={img.src}
                    alt={`${c.n} — interface mockup`}
                    ratio={img.ratio}
                  />
                ))}
                <figcaption className="flex flex-col gap-1">
                  <span className="t-article-body">{c.n}</span>
                  <span className="t-article-caption max-w-[650px]">
                    {c.body}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          {/* Scoping */}
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">Scoping</h3>
            <p className="t-article-body max-w-[650px]">
              Together with the product manager, we reviewed the hypotheses and
              selected the first and third ones.
            </p>
            <p className="t-article-body max-w-[650px]">
              We decided not to go with the second one because that approach to
              pricing and discounts might be inconvenient for users and difficult
              to implement.
            </p>
          </Reveal>
        </section>

        {/* Test */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Test</h2>
            <p className="t-article-body max-w-[650px]">
              After thoroughly refining the mockups, I prepared prototypes and
              questions for usability testing with users
            </p>
          </Reveal>
          <Reveal>
            <div className="rounded-[32px] border border-border-subtle p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/Jl7xyCahkdZ8uIJfnjpdCHtqCY.png`}
                alt="Prototypes prepared for usability testing"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "737 / 253" }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* Final result */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Final result</h2>
            <p className="t-article-body max-w-[650px]">
              In the final version, I added reference prices for each boost to
              make it easier for users to understand the pricing
            </p>
          </Reveal>
          <Reveal>
            <video
              src={`${ASSET}/ZVv6TQfOEMWUgW4I9S1vFl2PewU.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="w-full rounded-[32px] object-cover"
              style={{ aspectRatio: "800 / 468" }}
            />
          </Reveal>
        </section>

        {/* A/B test & Impact */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">A/B test &amp; Impact</h2>
            <p className="t-article-body max-w-[650px]">
              After completing development of the feature, we ran an A/B test on
              50% of sellers and got some pretty good results
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((r, i) => (
              <Reveal
                key={r.label}
                delay={i * STAGGER}
                className={`h-full ${r.wide ? "sm:col-span-2" : ""}`}
              >
                <div className="lift-card flex h-full flex-col gap-1 rounded-3xl bg-card p-6">
                  <span className="t-article-title">{r.value}</span>
                  <span className="t-article-body">{r.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
}

/* ── Building blocks ─────────────────────────────────────────────────────── */

function BackLink() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center gap-1.5 rounded-full py-2 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-70 active:scale-[0.97]"
    >
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-foreground"
      >
        <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      <span className="t-back">Back to home</span>
    </Link>
  );
}

function CaseImage({
  src,
  alt,
  ratio,
  bordered = true,
}: {
  src: string;
  alt: string;
  ratio?: string;
  bordered?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`w-full rounded-[32px] ${
        ratio ? "object-cover" : "h-auto"
      } ${bordered ? "border border-border-subtle" : ""}`}
    />
  );
}
