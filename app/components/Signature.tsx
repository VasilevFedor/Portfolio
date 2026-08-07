"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Handwritten sign-off that "writes itself" left→right when scrolled into
 * view. The reveal is a clip-path inset wipe over a cursive font — the classic
 * write-on technique. This is rare, first-view decoration seen once per visit,
 * so a longer, deliberate duration is appropriate (unlike everyday UI, which
 * stays under 300ms). Motion is skipped entirely for reduced-motion users.
 */
export default function Signature({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    let done = false;
    let raf = 0;

    const reveal = () => {
      if (done) return;
      // Start writing as soon as the name's top edge enters the viewport. It
      // sits at the very bottom of the page (with padding below), so at max
      // scroll its top can still be ~90% down — a fixed margin is reliable
      // across viewport heights where a percentage threshold would just miss.
      if (el.getBoundingClientRect().top < window.innerHeight - 24) {
        done = true;
        setShown(true);
        cleanup();
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        reveal();
      });
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };

    reveal(); // in case it's already on screen at mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);

  return (
    <span
      ref={ref}
      data-shown={shown}
      aria-label="Fedor Vasilev"
      className={`signature font-signature ${className}`}
    >
      Fedor Vasilev
    </span>
  );
}
