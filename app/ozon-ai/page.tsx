import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import BackToTop from "../components/BackToTop";

export const metadata: Metadata = {
  title: "Ozon AI assistant — Fedor Vasiliev",
  description:
    "Created a little mate to help sellers increase revenue and reduce the workload on technical support.",
};

/* ── Media hosts ─────────────────────────────────────────────────────────── */
const VID = "https://videos-for-portfolio.b-cdn.net";
const IMG = "https://framerusercontent.com/images";

/* ── Content (mirrors the Framer /ozon-ai source 1:1) ────────────────────── */

// Fedor is handing over the memoji avatars — drop them at these paths.
const team: { label: string; avatar: string }[][] = [
  [
    { label: "Lead Product designer", avatar: "/img/ozon-ai/team/lead.png" },
    { label: "3 Product managers", avatar: "/img/ozon-ai/team/managers.png" },
    { label: "Product director", avatar: "/img/ozon-ai/team/director.png" },
    { label: "User researcher", avatar: "/img/ozon-ai/team/researcher.png" },
  ],
  [
    { label: "4 Software engineers", avatar: "/img/ozon-ai/team/engineers.png" },
    { label: "2 Mobile engineers", avatar: "/img/ozon-ai/team/mobile.png" },
  ],
];

// 2×2 grid, numbered 1,2 / 3,4 (Framer stores them column-major).
const principles = [
  {
    n: "Principle 1",
    title: "AI is a teammate, not a tool",
    body: "AI feels like a helpful assistant that works behind the scenes and supports users without requiring their attention",
  },
  {
    n: "Principle 2",
    title: "AI should empower people, not make things more complicated",
    body: "Users don't need to learn how to use AI. The best projects seamlessly integrate AI, enhancing the experience without adding unnecessary complexity.",
  },
  {
    n: "Principle 3",
    title: "Start with the problem, not the technology",
    body: "It's tempting to create flashy features powered by artificial intelligence, but without a clear user need, they don't work; thoughtful design ensures that the technology serves the user, not the other way around.",
  },
  {
    n: "Principle 4",
    title: "Test",
    body: "AI can be unpredictable, which makes testing extremely important",
  },
];

const competitors = [
  { name: "Shopify", src: `${IMG}/ZKCWew65B5NS0s5NJEaThr2D20.png` },
  { name: "Gemini", src: `${IMG}/feVeBFe8p1Z1cCtHXRcanC2bBU.png` },
  { name: "GPT", src: `${IMG}/s9ga6o9gEApEu7UG9Yi9uhO8rWY.png` },
  { name: "Alice AI", src: `${IMG}/rvTODm2Xqd3uas68oFjmlcfc.png` },
  { name: "Whoop", src: `${IMG}/podhaFy3hix1UlO6tjMkibkoBlk.png` },
];

const concepts = [
  {
    n: "Concept 1",
    src: `${IMG}/5BDF4xzyCC1S06hdhVOb315HM.png`,
    caption:
      "Combining the knowledge base and the AI assistant into a single driver. To ensure users retain access to the tool they're familiar with",
  },
  {
    n: "Concept 2",
    src: `${IMG}/kP8eZl1TOEMw1gujpdqE8ziCkM.png`,
    caption:
      "This is the same combination of two tools, but in this version we place more emphasis on the AI assistant",
  },
  {
    n: "Concept 3",
    src: `${IMG}/GlALL4rnbS4lw5G82MHl9iUEjU.png`,
    caption:
      "The most familiar type of AI assistant. We're integrating all the knowledge base and onboarding features directly into it",
  },
];

const finalFeatures = [
  {
    title: "Proactively initiating a dialogue with the user",
    body: "Together with the product manager, we identified the main triggers that will prompt a message from the AI assistant",
    video: `${VID}/Ozon%20AI%20case/AI_bubble.mp4`,
    caption:
      "One of the triggers is when a seller spends a long time searching for something on the page",
  },
  {
    title: "User Sales Analysis",
    body: "The LLM analyzes a user's sales based on several parameters, and each one provides sales statistics for the previous day.",
    video: `${VID}/Ozon%20AI%20case/User%20sales%20analysis.mp4`,
    caption:
      "The user can request a sales analysis on their own, or the AI assistant will send a notification on its own",
  },
  {
    title: "AI Assistant's Responses Based on a Knowledge Base",
    body: "Since the AI assistant has a built-in knowledge base, users can ask it for the information they need",
    video: `${VID}/Ozon%20AI%20case/knowledge%20base.mp4`,
    caption: "The AI assistant and the Knowledge Base exist simultaneously",
  },
  {
    title: "Interaction with support and reviews",
    body: "I've also kept the option for users to contact technical support and leave feedback about their personal account",
    video: `${VID}/Ozon%20AI%20case/Review.mp4`,
    caption:
      "Feedback on this section and support are always available in the bottom chat bar",
  },
];

const abCards = [
  { label: "Header entry point", value: "5%", win: false },
  { label: "Floating button entry point", value: "15%", win: true },
];

const results = [
  { value: "30%", label: "DAU" },
  { value: "35%", label: "7-day retention" },
  { value: "£ 3.1 М", label: "Contribution margin" },
  { value: "1,5 month", label: "Delivery time" },
];

// Stagger step between items that enter together (Emil: 30–80ms).
const STAGGER = 60;

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function OzonAiCase() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-6 min-[800px]:px-0">
      <SiteHeader />

      {/* 80px between top-level sections. */}
      <main className="flex flex-col gap-20 pt-10 pb-24">
        {/* Back to home */}
        <BackLink />

        {/* Hero heading */}
        <header className="rise flex flex-col gap-1">
          <h1 className="t-article-title">Ozon AI assistant</h1>
          <p className="t-article-body max-w-[600px]">
            Created a little mate to help sellers increase revenue and reduce
            the workload on technical support
          </p>
        </header>

        {/* Hero video */}
        <Reveal>
          <CaseVideo src={`${VID}/Main%20page/Ozon-ai-main-page.mp4`} />
        </Reveal>

        {/* Meet the team */}
        <section className="flex flex-col gap-8">
          <Reveal as="h2" className="t-article-heading">
            Meet the team
          </Reveal>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {team[0].map((m, i) => (
                <Reveal key={m.label} delay={i * STAGGER}>
                  <TeamMember {...m} />
                </Reveal>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-8">
              {team[1].map((m, i) => (
                <Reveal key={m.label} delay={i * STAGGER}>
                  <TeamMember {...m} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Problem</h2>
            <p className="t-article-body max-w-[650px]">
              Ozon is a large marketplace with plenty of sales opportunities.
              Sellers are constantly asking for tips on how to boost their
              sales, and personal account managers and support staff can&apos;t
              keep up with all the requests. Here are a few reasons why we
              decided to address these issues with an AI assistant: we will
              provide a single point of access for all help and support
              information regarding a seller&apos;s personal account; we can
              increase Ozon&apos;s GMV through personalized sales
              recommendations; and during interviews, sellers mentioned several
              times that they use AI, which is a good reason to move some of
              these tasks to our interface.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">Why AI-assistant?</h3>
            <p className="t-article-body max-w-[650px]">
              We already have a production ML model that works with all the data
              sellers need. It can provide a single point of access for all help
              and support information regarding a seller&apos;s personal account,
              and increase Ozon&apos;s GMV through personalized sales
              recommendations. During interviews, sellers mentioned several times
              that they use AI, which is a good reason to move some of these
              tasks to our interface.
            </p>
          </Reveal>
        </section>

        {/* Discovery */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Discovery</h2>
            <p className="t-article-body max-w-[650px]">
              Before I began designing the user flow, I studied how modern AI
              tools are designed so I wouldn&apos;t overlook anything important.
              By the end of my research, I had identified several principles
              that would serve as the foundation for the entire AI assistant
              interface:
            </p>
          </Reveal>

          {/* 2×2 principle cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * STAGGER} className="h-full">
                <div className="lift-card flex h-full flex-col gap-3 rounded-[32px] bg-card p-6">
                  <span className="t-article-caption">{p.n}</span>
                  <h3 className="t-article-sub">{p.title}</h3>
                  <p className="t-article-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">Competitive analysis</h3>
            <p className="t-article-body max-w-[650px]">
              Together with the product manager, we conducted a competitor
              analysis that included both direct and indirect competitors
            </p>
          </Reveal>

          {/* Competitor logo card with a seamless auto-scrolling strip. Two
              identical copies; the track slides left by exactly one copy
              (-50%). Spacing lives on each tile's margin-right (not flex gap)
              so -50% lands tile-on-tile — no seam, no right-hand void. One copy
              (5 tiles × 202px = 1010px) is wider than the card, so the same
              logo never appears twice at once. */}
          <Reveal>
            <div className="flex h-72 items-center overflow-hidden rounded-[32px] bg-card">
              <div className="marquee-track">
                {[...competitors, ...competitors].map((c, i) => (
                  <div
                    key={`${c.name}-${i}`}
                    className="mr-[112px] grid size-[90px] shrink-0 place-items-center rounded-3xl bg-card"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.src}
                      alt={c.name}
                      className="size-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Early concepts */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Early concepts</h2>
            <h3 className="t-article-sub">Current user experience</h3>
            <p className="t-article-body max-w-[650px]">
              Together with the product manager, we conducted a competitor
              analysis that included both direct and indirect competitors
            </p>
          </Reveal>

          <Reveal>
            <CaseVideo src={`${VID}/Ozon%20AI%20case/current%20experience.mp4`} />
          </Reveal>

          <Reveal>
            <p className="t-article-body max-w-[650px]">
              After the discovery process, I sketched out several rough concepts
              for the AI assistant to present to the C-level executives.
            </p>
          </Reveal>

          {concepts.map((c) => (
            <Reveal key={c.n}>
              <figure className="flex flex-col gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.n}
                  className="w-full rounded-[32px] border border-border-subtle"
                />
                <figcaption className="flex flex-col gap-1">
                  <span className="t-article-body">{c.n}</span>
                  <span className="t-article-caption max-w-[650px]">
                    {c.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </section>

        {/* Main flows */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Main flows</h2>
            <p className="t-article-body max-w-[650px]">
              Once the concept was approved, the product manager and I began
              developing the main workflows for the AI assistant. The main
              workflows include: proactive recommendations from the AI assistant
              to users; analysis of the user&apos;s sales from the previous day;
              and answers to questions based on the knowledge base.
            </p>
          </Reveal>

          <Reveal>
            <figure className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/F7EaTBoqMzEL90Q6nyxDslbh8UI.png`}
                alt="The full flow map for the AI assistant"
                className="w-full rounded-[32px] border border-border-subtle"
              />
              <figcaption className="t-hand">Quite a lot of flows</figcaption>
            </figure>
          </Reveal>
        </section>

        {/* What the final design looks like */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">
              What the final design looks like
            </h2>
            <p className="t-article-body max-w-[650px]">
              I have prepared design mockups and prototypes of the AI
              assistant&rsquo;s core features to review them with C-level
              executives and test them with users
            </p>
          </Reveal>

          {finalFeatures.map((f) => (
            <Reveal key={f.title}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="t-article-sub">{f.title}</h3>
                  <p className="t-article-body max-w-[650px]">{f.body}</p>
                </div>
                <CaseVideo src={f.video} caption={f.caption} />
              </div>
            </Reveal>
          ))}
        </section>

        {/* Test */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Test</h2>
            <p className="t-article-body max-w-[650px]">
              I prepared a guide and a set of questions for usability testing to
              iron out any issues before rolling out the feature to production.
              Eight users participated in the study.
            </p>
          </Reveal>
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/TnN1WoshPGwVTEFIOrPuA7cHmrs.png`}
              alt="Research guide and the usability-test flow map"
              className="w-full rounded-[32px] border border-border-subtle"
            />
          </Reveal>
        </section>

        {/* A/B test & launch */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">A/B test &amp; launch</h2>
            <p className="t-article-body max-w-[650px]">
              The AI assistant was rolled out gradually, in small waves: a few
              loyal users, 10% of the platform&apos;s users, 30% of the
              platform&apos;s users, 50% of the platform&apos;s users, and
              finally 100% of the platform&apos;s users.
            </p>
          </Reveal>

          {/* What didn't work */}
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">What didn&apos;t work</h3>
            <p className="t-article-body max-w-[650px]">
              One thing that didn&apos;t work out based on the release results
              was the proactive AI bubble, which initiated a conversation with
              the user. The click-through rate for this bubble was only 1.5%.
              Through in-depth interviews with users, we realized the reason is
              that they simply don&apos;t look in that corner because of the
              large number of pop-up notifications.
            </p>
          </Reveal>
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/PLezlxv6OkH9FFsJyYJxqd6VFPk.png`}
              alt="The proactive bubble on the dashboard converted at only 1.5%"
              className="w-full rounded-3xl"
            />
          </Reveal>

          {/* A/B test of entry points */}
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">A/B test of entry points</h3>
            <p className="t-article-body max-w-[650px]">
              Since there was already an entry point to the help window in the
              interface, we decided to conduct an A/B test of entry points to the
              AI assistant, because I hypothesized that the conversion rate would
              be higher in the header.
            </p>
          </Reveal>

          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/1xplFRacVNYbXdWZR32yaexJJA.png`}
              alt="The two entry points compared — the header slot and the floating button"
              className="w-full rounded-[32px] border border-border-subtle"
            />
          </Reveal>

          {/* A/B test results */}
          <Reveal className="flex flex-col gap-4">
            <h3 className="t-article-sub">A/B test results</h3>
            <p className="t-article-body max-w-[650px]">
              Since there was already an entry point to the help window in the
              interface, we decided to conduct an A/B test of entry points to the
              AI assistant, because I hypothesized that the conversion rate would
              be higher in the header. The A/B test lasted 35 days, and based on
              the results, the floating button option won.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {abCards.map((c, i) => (
              <Reveal key={c.label} delay={i * STAGGER} className="h-full">
                <div className="lift-card flex h-full flex-col gap-4 rounded-3xl bg-card p-6">
                  <span className="t-article-body">{c.label}</span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="t-article-title">{c.value}</span>
                      {c.win && <WinnerCheck />}
                    </div>
                    <span className="t-article-body">Conversion</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="t-article-heading">Results</h2>
            <p className="t-article-body max-w-[650px]">
              After several months, the AI assistant produced the following
              results
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((r, i) => (
              <Reveal key={r.label} delay={i * STAGGER} className="h-full">
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

function WinnerCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={34}
      height={34}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-success"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TeamMember({ label, avatar }: { label: string; avatar: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt=""
        aria-hidden="true"
        className="size-10 rounded-full bg-card object-cover"
      />
      <span className="t-article-body whitespace-nowrap">{label}</span>
    </div>
  );
}

function CaseVideo({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-[440px] w-full rounded-[32px] object-cover"
      />
      {caption && (
        <span className="t-article-caption max-w-[650px]">{caption}</span>
      )}
    </div>
  );
}
