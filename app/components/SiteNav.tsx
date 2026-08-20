"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

/**
 * Site navigation. On sm+ it's the inline row (work / writing / about); below sm
 * it collapses to a burger that opens a full-screen menu with a centred list and
 * a close (X). Same-page hash links (home's #cases / #writing) scroll smoothly —
 * we dropped the global `scroll-behavior: smooth` (it broke route scroll-to-top),
 * so smoothness is applied here, explicitly and reduced-motion aware.
 */
const links = [
  { href: "/#cases", label: "work" },
  { href: "/#writing", label: "writing" },
  { href: "/about", label: "about" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);
      // Smooth-scroll to an on-page section when we're already on the home page.
      if (pathname === "/" && href.startsWith("/#")) {
        const el = document.getElementById(href.slice(2));
        if (el) {
          e.preventDefault();
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          el.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
          history.pushState(null, "", href);
        }
      }
    };

  // While the menu is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Desktop: inline links */}
      <nav className="hidden items-center gap-6 sm:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={handleClick(l.href)}
            className="t-nav transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: burger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-9 place-items-center text-foreground sm:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      </button>

      {/* Mobile: full-screen menu */}
      <div
        data-open={open}
        className="mobile-menu sm:hidden"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between py-6 pr-6 pl-6">
          <span className="t-wordmark leading-none">fedor.</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-9 place-items-center text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              width={22}
              height={22}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleClick(l.href)}
              className="text-2xl font-medium text-foreground transition-opacity active:opacity-60"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
