import { social } from "../data";

/**
 * Hover/focus profile-preview popover for the "You can find me on …" links.
 * Ported 1:1 from the Figma source (Stonks file) — a white rounded-32 card that
 * floats *below* the link. Pure CSS reveal (group-hover + focus-within) so it
 * works without JS; hidden on small / touch layouts.
 */

type Variant = "linkedin" | "x" | "gmail";

const AVATAR = "/img/avatar.jpg";
const GMAIL_G =
  "https://framerusercontent.com/images/qHko08E0BmXXrp3zclgKMv1M0E.png";

export default function ContactPreview({
  variant,
  href,
  children,
}: {
  variant: Variant;
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <span className="group relative inline-flex">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="text-foreground underline decoration-border-subtle underline-offset-2 transition-colors hover:decoration-foreground"
      >
        {children}
      </a>
      <span
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 hidden -translate-x-1/2 -translate-y-1 scale-95 opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 min-[900px]:block"
        aria-hidden="true"
      >
        {variant === "linkedin" && <LinkedInCard />}
        {variant === "x" && <XCard />}
        {variant === "gmail" && <GmailCard />}
      </span>
    </span>
  );
}

/** White floating card — 32px radius, 24px padding, soft drop shadow. */
function Card({
  width,
  gap = true,
  children,
}: {
  width: number;
  gap?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`flex flex-col items-start rounded-[32px] bg-card p-6 text-left shadow-[0_24px_60px_-24px_rgba(20,20,22,0.35)] ${
        gap ? "gap-6" : ""
      }`}
      style={{ width }}
    >
      {children}
    </span>
  );
}

function Avatar({ src, tinted = false }: { src: string; tinted?: boolean }) {
  return (
    <span
      className={`relative block size-12 shrink-0 overflow-hidden rounded-full ${
        tinted ? "bg-[#e8e8e8]" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={48}
        height={48}
        className="absolute inset-0 size-full object-cover"
      />
    </span>
  );
}

/** Pill action button — 27px radius, 20px semibold white label. */
function Button({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[27px] px-6 py-3 text-[20px] font-semibold text-white ${className}`}
    >
      {label}
    </span>
  );
}

function LinkedInCard() {
  return (
    <Card width={321}>
      <span className="flex w-full flex-col gap-4">
        <span className="flex w-full items-center justify-between">
          <Avatar src={AVATAR} />
          <Button label="Connect" className="bg-[#0c65c1]" />
        </span>
        <span className="flex w-full flex-col">
          <span className="text-[24px] font-bold text-foreground">
            Fedor Vasilev
          </span>
          <span className="text-[15px] font-medium tracking-[-0.15px] text-muted">
            Ozon.ru, Higher school of economics
          </span>
        </span>
      </span>
      <span className="text-[16px] font-medium tracking-[-0.16px] text-foreground">
        Senior Product designer ✦ 5+ years of experience ✦ Web &amp; Mobile ✦
        B2C &amp; B2B ✦ Building real products with AI
      </span>
      <span className="flex items-center gap-5 text-[16px] tracking-[-0.16px]">
        <span className="text-muted">
          <span className="font-bold text-foreground">939</span> Followers
        </span>
        <span className="text-muted">
          <span className="font-bold text-foreground">500+</span> connections
        </span>
      </span>
    </Card>
  );
}

function XCard() {
  return (
    <Card width={321}>
      <span className="flex w-full flex-col gap-4">
        <span className="flex w-full items-center justify-between">
          <Avatar src={AVATAR} />
          <Button label="Follow" className="bg-foreground" />
        </span>
        <span className="flex w-full flex-col">
          <span className="text-[24px] font-bold text-foreground">
            Fedor Vasilev
          </span>
          <span className="text-[15px] font-medium tracking-[-0.15px] text-muted">
            @FedorVasilev_
          </span>
        </span>
      </span>
      <span className="text-[16px] font-medium tracking-[-0.16px] text-foreground">
        Building an AI app that help find out you where your money actually goes.
      </span>
      <span className="flex items-center gap-5 text-[16px] tracking-[-0.16px]">
        <span className="text-muted">
          <span className="font-bold text-foreground">71</span> Following
        </span>
        <span className="text-muted">
          <span className="font-bold text-foreground">15</span> Followers
        </span>
      </span>
    </Card>
  );
}

function GmailCard() {
  return (
    <Card width={361} gap={false}>
      <span className="flex w-full items-start gap-4">
        <span className="flex flex-1 items-center gap-2">
          <Avatar src={GMAIL_G} tinted />
          <span className="flex flex-1 flex-col text-[16px] font-medium tracking-[-0.16px]">
            <span className="text-foreground">Fedor Vasilev</span>
            <span className="text-muted">Gmail</span>
          </span>
        </span>
        <a
          href={social.email}
          className="pointer-events-auto inline-flex items-center justify-center rounded-[27px] bg-foreground px-6 py-3 text-[20px] font-semibold text-white"
        >
          Say hi
        </a>
      </span>
    </Card>
  );
}
