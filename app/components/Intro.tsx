"use client";

import { useEffect, useState } from "react";

const COUNT_MS = 1800; // time to count 1 → 100
const REVEAL_MS = 900; // iris-open duration (matches globals.css)

type Phase = "counting" | "revealing" | "done";

/**
 * Boot sequence: a full-screen counter ticks 1 → 100, then the page irises
 * open from the centre (Star-Wars style) as the preloader fades away.
 */
export default function Intro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("counting");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("done");
      return;
    }

    let raf = 0;
    const timers: number[] = [];
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.max(1, Math.round(t * 100)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small beat on 100, then reveal, then unmount the preloader.
        timers.push(window.setTimeout(() => setPhase("revealing"), 180));
        timers.push(window.setTimeout(() => setPhase("done"), 180 + REVEAL_MS));
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div
        className={phase === "done" ? "" : "iris"}
        data-open={phase !== "counting"}
      >
        {children}
      </div>

      {phase !== "done" && (
        <div className="preloader" data-hiding={phase !== "counting"}>
          <span className="preloader-count">{count}</span>
        </div>
      )}
    </>
  );
}
