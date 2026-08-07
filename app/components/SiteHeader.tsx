import Link from "next/link";

/**
 * Shared masthead for the home page and standalone routes (e.g. /about).
 * Work/Writing point at home-page anchors with a leading slash so they resolve
 * from any route; About is its own page.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-5 backdrop-blur-md">
      <Link
        href="/"
        className="font-wordmark text-[28px] italic leading-none tracking-tight text-foreground"
      >
        fedor.
      </Link>
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
