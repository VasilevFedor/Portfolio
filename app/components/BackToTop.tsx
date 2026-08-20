"use client";

import { useEffect, useState } from "react";

/**
 * Floating "back to top" button for the case pages — the white pill + grey
 * chevron from the Figma Stonks file (node 4171:19811). Hidden until the reader
 * scrolls past the hero, then fades up; a click smooth-scrolls to the start of
 * the case (respecting reduced-motion). The chevron is the exact exported glyph
 * (fill #6E6E73 → our --muted), drawn with currentColor so it themes from tokens.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      data-shown={shown}
      className="back-to-top fixed bottom-6 right-6 z-40 grid size-9 place-items-center rounded-full border border-border-subtle bg-card text-muted"
    >
      <svg
        viewBox="0 0 10 6.66668"
        width={10}
        height={7}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0.413805 6.34578C0.926942 6.80761 1.7173 6.76601 2.17913 6.25287L5.00001 3.11856L7.82089 6.25287C8.28272 6.76601 9.07308 6.80761 9.58622 6.34578C10.0994 5.88396 10.141 5.0936 9.67913 4.58046L5.92913 0.413794C5.69207 0.150402 5.35437 -1.54895e-08 5.00001 0C4.64565 1.54895e-08 4.30795 0.150402 4.07089 0.413795L0.320893 4.58046C-0.140931 5.0936 -0.0993327 5.88396 0.413805 6.34578Z" />
      </svg>
    </button>
  );
}
