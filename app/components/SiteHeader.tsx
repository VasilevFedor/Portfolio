import Link from "next/link";
import SiteNav from "./SiteNav";

/**
 * Masthead matching the Framer reference: handwritten "fedor." wordmark on the
 * left, section nav on the right. The nav (inline on desktop, burger + full-screen
 * menu on mobile) lives in the SiteNav client component.
 */
export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="t-wordmark leading-none">
        fedor.
      </Link>
      <SiteNav />
    </header>
  );
}
