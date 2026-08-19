import Link from "next/link";

/**
 * Masthead matching the Framer reference: handwritten "fedor." wordmark on the
 * left, section nav on the right. Work/Writing point at home-page anchors with a
 * leading slash so they resolve from any route; About is its own page.
 */
export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="t-wordmark leading-none">
        fedor.
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/#cases" className="t-nav transition-colors hover:text-foreground">
          work
        </Link>
        <Link href="/#writing" className="t-nav transition-colors hover:text-foreground">
          writing
        </Link>
        <Link href="/about" className="t-nav transition-colors hover:text-foreground">
          about
        </Link>
      </nav>
    </header>
  );
}
