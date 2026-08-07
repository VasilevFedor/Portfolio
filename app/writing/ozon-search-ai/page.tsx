import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import { social } from "../../data";

export const metadata: Metadata = {
  title:
    "Search and AI Assistant in the Ozon Seller Center — Fedor Vasiliev",
  description:
    "How we designed global search and an AI assistant for the Ozon Seller Center over 6 months — the fork between formulated and unformulated queries, and what the first data showed.",
};

const results = [
  {
    value: "30–33%",
    label: "Open chat → first query",
    note: "Every third seller who opens the chat immediately asks a question.",
  },
  {
    value: "63%",
    label: "Searches end in a click",
    note: "Sellers genuinely find the section or answer they came for.",
  },
  {
    value: "~1,800",
    label: "Daily users via search",
    note: "A separate stream reaching the assistant specifically through search.",
  },
];

export default function OzonSearchAiArticle() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6">
      <div className="py-6">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </div>

      {/* Header */}
      <header className="rise pt-6">
        <p className="text-sm font-medium text-muted">Writing · August 2026</p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[42px] sm:leading-[1.08]">
          Search and AI Assistant in the Ozon Seller Center
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          How we designed them and what the data showed.
        </p>

        <div className="mt-8 flex items-center gap-3 border-t border-border-subtle pt-6">
          <Image
            src="/img/avatar.jpg"
            alt="Fedor Vasiliev"
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-medium text-foreground">Fedor Vasiliev</p>
            <p className="text-muted">8 min read · 6-month project</p>
          </div>
        </div>
      </header>

      <article className="pb-28">
        {/* Lead */}
        <div className="mt-12 space-y-5 text-[17px] leading-[1.75] text-body">
          <p>
            We design Seller Center — a powerful tool for all Ozon sellers. Our
            interface covers every stage of selling on the marketplace: from
            seller registration to customer order logistics. Many different
            teams ship features every week. But it&rsquo;s important to catch in
            time how product growth makes navigation more complex, to the point
            where users struggle to quickly figure things out and find what they
            need.
          </p>
          <p>
            We spotted this through seller support requests. More than 20% of
            seller questions could have been solved through the interface — if
            only they&rsquo;d known where to look. Our task became helping users
            quickly find the functionality they need for each request. In this
            article we share the internal workings of our core projects and talk
            about how, over 6 months, we added search and an AI assistant, and
            what the first data is already showing.
          </p>
        </div>

        {/* Where we started */}
        <Section title="Where we started">
          <p>
            The product didn&rsquo;t come to us as a ready-made spec, but with
            research data and a proposal to figure out how to solve the problem.
            That&rsquo;s a good practice for large projects that affect the whole
            service. When design and product jointly formulate the task, the
            team develops a shared understanding of the goal. This approach set
            the tone for the entire project.
          </p>
          <p>
            The request for search in the Seller Center had existed for a long
            time. In research, more than 60% of sellers said global search would
            help them work more efficiently, since navigation had grown to the
            point where it became hard to orient themselves. But when we looked
            at the tools already available, we saw not one problem but two — two
            distinct behavior patterns, neither of which was addressed.
          </p>
        </Section>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <PatternCard n="Pattern 1">
            The seller knows what they need but doesn&rsquo;t know where to find
            it. They click through the entire menu instead of getting on with
            their task.
          </PatternCard>
          <PatternCard n="Pattern 2">
            The seller opens the Seller Center and doesn&rsquo;t know what they
            need at all. Sales dropped — but why? What changed this week? The
            answers are there, if only they knew where to look.
          </PatternCard>
        </div>

        <Prose>
          <p>
            This is where we found the fork that shaped the whole project. The
            first pattern is directly about navigation and requires shortening
            the path from the start of a search to the result. But the second
            pattern isn&rsquo;t about navigation at all. The seller has nothing
            to search for because they haven&rsquo;t yet formulated a query. What
            they need is for the interface itself to show them what deserves
            attention.
          </p>
          <p>
            Once we broke the user journey down into these patterns, we were able
            to define the core goals for each tool:
          </p>
        </Prose>

        <Pull>
          Global search — for a formulated query. <br />
          AI assistant — for an unformulated one.
        </Pull>

        {/* Search */}
        <Section title="Search: find what you need in seconds">
          <p>
            The hypothesis was simple: if a seller quickly finds the section or
            function they need, they spend more time on their business and less
            time wandering the interface. Research data confirmed it — the
            audience had described the solution before we&rsquo;d even started
            building it.
          </p>
          <p>
            Next we had to figure out what sellers actually search for. They
            definitely need basic orientation across sections and tools, but they
            also need products, orders, settings, and quick actions. Each result
            type follows its own logic, and we didn&rsquo;t cut any of them for
            the sake of simplicity. On the contrary, we tailored each type to the
            specific data a seller needs to make a decision right in the results,
            without opening the section. That&rsquo;s how we moved from a broad
            concept trying to cover everything at once, to a focused MVP with
            clear priorities.
          </p>
        </Section>

        <Pull>
          The seller shouldn&rsquo;t have to search for where search is.
        </Pull>

        <Prose>
          <p>
            The key decision we landed on: search is visible from any page in the
            Seller Center and opens without extra steps. We also separately
            designed the state where search finds nothing. This isn&rsquo;t an
            error to be hidden, but a full-fledged scenario: if there&rsquo;s no
            precise answer, search hands the seller off to the AI assistant. In
            the chat, they don&rsquo;t need to phrase the query precisely — they
            can describe it in their own words. That&rsquo;s how the two tools
            stopped being separate and merged into a single path.
          </p>
        </Prose>

        {/* AI assistant */}
        <Section title="AI assistant: when search isn't enough">
          <p>
            For a seller who doesn&rsquo;t know what to search for, a search bar
            won&rsquo;t help much. They need a tool that looks at their data
            itself and points out what deserves attention. We worked from an
            initial scenario map built by product managers on real context,
            analyzed patterns in support requests, looked at where sellers get
            stuck during onboarding, and identified what recurs in the questions
            experienced sellers ask.
          </p>
        </Section>

        <Section title="AI bubble: just whistle and it appears" level={3}>
          <p>
            Besides answering questions, the assistant also needs to proactively
            start a dialogue when the system senses the user needs help. An
            interface that reaches out first needs careful design, since it can
            easily turn into the kind of pop-up people close without reading.
          </p>
          <p>
            The solution was the AI bubble — a floating message in the
            bottom-right corner. For newcomers, it gives a contextual hint tied
            to the current page: if a seller gets stuck on an onboarding step, it
            suggests the question most commonly asked at that point. For
            experienced sellers, it tracks a set of metrics and appears when a
            value crosses a threshold — showing not a random tip but a real
            change worth seeing right now. We carefully thought through its
            timing: it should appear once the user has settled into the page but
            hasn&rsquo;t yet left, without pressure and without aggressive delays.
          </p>
        </Section>

        <Section title="What the chat can do" level={3}>
          <p>
            We deliberately kept the chat surface simple so sellers wouldn&rsquo;t
            need to figure out how to use it. Behind that simplicity are several
            scenarios, each of which required its own solution. The seller can:
          </p>
        </Section>

        <ul className="mt-6 space-y-4">
          {[
            [
              "Ask a specific question",
              "and get an answer with a link to the knowledge base — a source they can trust.",
            ],
            [
              "Ask for a summary of yesterday's metrics",
              "and get a detailed digest with targeted recommendations. The assistant analyzes the data itself and explains what changed and why.",
            ],
            [
              "Continue with a follow-up",
              "— the assistant keeps context across the whole dialogue. When it's unclear where to start, suggestions offer up the questions other sellers ask in similar situations.",
            ],
          ].map(([lead, rest], i) => (
            <Reveal
              key={lead}
              as="li"
              delay={i * 50}
              className="flex gap-3 text-[17px] leading-[1.7] text-body"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground/30"
              />
              <span>
                <strong className="font-medium text-foreground">{lead}</strong>{" "}
                {rest}
              </span>
            </Reveal>
          ))}
        </ul>

        <Prose>
          <p>
            We also separately designed the state where there&rsquo;s no answer.
            This is a full scenario, not an error to hide: it&rsquo;s important to
            honestly communicate the limitation and point to where to go next.
          </p>
        </Prose>

        {/* AI guide */}
        <Section title="An AI guide for designers">
          <p>
            Alongside work on the assistant, we spotted another problem. AI
            components will eventually appear across different sections of the
            Seller Center, and if every team solves this on its own, we&rsquo;ll
            end up with inconsistency in identity, tone, and state behavior. So we
            put together an internal AI guide for Seller Center designers. It
            includes principles for working with generative states, rules for
            formatting responses, and behavior during errors and uncertainty. The
            guide lets different teams make consistent decisions independently of
            one another.
          </p>
        </Section>

        {/* How we worked */}
        <Section title="Smart Assistant: how we worked">
          <p>
            The project brought together more than eight teams with a shared
            deadline. Things caught fire periodically — an honest picture of
            cross-team work at this scale. It helped that we got involved at the
            stage of formulating the task rather than receiving a finished spec.
            Design and product moved in the same direction from day one, which
            removed some of the final approval friction.
          </p>
          <p>
            In projects like this, the designer becomes the point of assembly —
            final specs and states need to work across several teams at once and
            resolve questions without extra meetings. Deadlines were tight,
            priorities shifted, we barely made the release date, and somehow we
            avoided fights with colleagues.
          </p>
        </Section>

        {/* Data */}
        <Section title="What the data showed after launch">
          <p>
            We rolled the product out in waves: from one test seller in mid-April
            to hundreds of thousands by the end of the month. This let us observe
            real behavior at every step and react in the moment. By mid-May a
            stable pattern had formed — sellers enter the assistant through three
            paths, and each one finds its own audience: the menu captures the
            largest volume of traffic; the bubble brings in people who
            wouldn&rsquo;t have opened the chat on their own; and search creates a
            separate stream of around 1,800 users a day.
          </p>
        </Section>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-3">
          {results.map((r, i) => (
            <Reveal
              key={r.label}
              delay={i * 60}
              className="bg-background p-6"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground">
                {r.value}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground">
                {r.label}
              </div>
              <p className="mt-1.5 text-sm leading-6 text-muted">{r.note}</p>
            </Reveal>
          ))}
        </div>

        <Prose>
          <p>
            The conversion from clicking an entry point to sending the first
            query stabilized at 30–33% — the first days showed an expected dip to
            21% amid rapid audience growth, after which the pattern settled. For
            search itself, about 63% of queries end with a click into the results,
            meaning it genuinely meets the need to quickly find the right section
            or piece of information — the very thing sellers used to go to support
            for.
          </p>
        </Prose>

        {/* Takeaways */}
        <Section title="What the project taught us">
          <p>
            Working on search and AI interfaces reminded us once again that
            we&rsquo;re not designing screens — we&rsquo;re designing user
            behavior. With search, we designed a system that gives the same
            answer every time; we can control the results. Working with the AI
            assistant is quite different, because it answers differently each
            time. So the task becomes making the experience predictable exactly
            where that matters most: during waiting states, when there&rsquo;s no
            answer, and in the first seconds after opening the chat.
          </p>
        </Section>

        <Pull>
          We&rsquo;re not designing screens — we&rsquo;re designing user behavior.
        </Pull>

        <Prose>
          <p>
            We already knew how to design a controllable system; the Smart
            Assistant was a new type of system within Ozon Seller. Other projects
            will follow this one — it was cheaper to agree on the rules in advance
            than to reconcile discrepancies after the fact. The AI guide came from
            that same realization: new systemic decisions require systemic
            artifacts.
          </p>
          <p>
            It also confirmed, in practice, the value of working with metrics —
            for us, post-launch data is a continuation of design work, not a
            separate story. We&rsquo;ll keep developing what&rsquo;s already
            working for more than 100,000 users. A large cross-functional team
            worked on this: product managers, developers, ML engineers, analysts.
            Thanks to everyone who stayed in sync in &ldquo;cried a little, but
            got it done&rdquo; mode.
          </p>
        </Prose>

        {/* CTA */}
        <div className="mt-20 border-t border-border-subtle pt-10">
          <h2 className="text-2xl font-medium tracking-tight">
            Want to talk it through?
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-muted">
            Happy to go deeper on the research, the trade-offs, or the metrics
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
              href="/#writing"
              className="rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card"
            >
              More writing
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ---------- building blocks ---------- */

function Section({
  title,
  level = 2,
  children,
}: {
  title: string;
  level?: 2 | 3;
  children: React.ReactNode;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Reveal as="section" className={level === 2 ? "mt-16" : "mt-12"}>
      <Heading
        className={
          level === 2
            ? "text-2xl font-semibold tracking-tight sm:text-[28px]"
            : "text-xl font-semibold tracking-tight"
        }
      >
        {title}
      </Heading>
      <div className="mt-4 space-y-5 text-[17px] leading-[1.75] text-body">
        {children}
      </div>
    </Reveal>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mt-6 space-y-5 text-[17px] leading-[1.75] text-body">
      {children}
    </Reveal>
  );
}

function PatternCard({
  n,
  children,
}: {
  n: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-2xl border border-border-subtle bg-card p-6">
      <span className="text-sm font-medium text-muted">{n}</span>
      <p className="mt-2 text-[15px] leading-7 text-body">{children}</p>
    </Reveal>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <Reveal
      as="blockquote"
      className="mt-10 border-l-2 border-foreground/25 pl-5 text-xl font-medium leading-[1.5] tracking-tight text-foreground sm:text-2xl"
    >
      {children}
    </Reveal>
  );
}
