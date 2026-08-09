import Link from "next/link";
import { social } from "../data";

/**
 * Shared masthead for the home page and standalone routes (e.g. /about).
 * Left: contact links (LinkedIn / X / Email). Right: section nav — Work/Writing
 * point at home-page anchors with a leading slash so they resolve from any
 * route; About is its own page.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-5 backdrop-blur-md">
      <nav className="flex items-center gap-5 text-sm text-muted">
        <a
          href={social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-foreground"
        >
          LinkedIn
        </a>
        <a
          href={social.x}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-foreground"
        >
          X
        </a>
        <a href={social.email} className="transition-colors hover:text-foreground">
          Email
        </a>
      </nav>
      <nav className="flex items-center gap-6 text-sm text-muted">
        <Link href="/#work" className="transition-colors hover:text-foreground">
          work
        </Link>
        <Link
          href="/#writing"
          className="transition-colors hover:text-foreground"
        >
          writing
        </Link>
        <Link href="/about" className="transition-colors hover:text-foreground">
          about
        </Link>
      </nav>
    </header>
  );
}
