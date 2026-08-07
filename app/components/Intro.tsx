"use client";

import { useEffect, useState } from "react";

const REVEAL_MS = 900; // iris-open duration (matches globals.css)

type Phase = "counting" | "revealing" | "done";

// Module-scoped so the intro plays once per page load and NOT on every
// client-side navigation back to "/". Resets on a full reload.
let hasIntroPlayed = false;

/**
 * Boot sequence: a full-screen counter climbs toward 100 in step with the
 * page's REAL load progress (fonts + window `load`), then the page irises
 * open from the centre as the preloader fades away.
 */
export default function Intro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() =>
    hasIntroPlayed ? "done" : "counting",
  );
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (hasIntroPlayed) return;
    // Mark as played the moment it starts, so navigating away mid-intro and
    // coming back does not replay it. Only a full reload shows it again.
    hasIntroPlayed = true;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("done");
      return;
    }

    let raf = 0;
    const timers: number[] = [];
    let done = false;

    // `target` tracks the real load progress; `shown` eases toward it so the
    // number never jumps. When everything is loaded, target snaps to 100.
    let target = 0.08; // a little movement immediately, so it never sits at 1
    let shown = 0;

    const finish = () => {
      target = 1;
    };

    // Real-load signals. `document.fonts.ready` covers webfonts; the `load`
    // event covers images and other subresources. Whichever lands, we nudge
    // toward completion; when both are in (or `load` fires) we snap to 100.
    let fontsReady = false;
    let windowLoaded = document.readyState === "complete";

    const maybeFinish = () => {
      if (fontsReady && windowLoaded) finish();
    };

    // Partial credit as each signal arrives, so the bar visibly progresses.
    document.fonts?.ready.then(() => {
      fontsReady = true;
      target = Math.max(target, 0.6);
      maybeFinish();
    });

    if (windowLoaded) {
      target = Math.max(target, 0.8);
      maybeFinish();
    } else {
      const onLoad = () => {
        windowLoaded = true;
        target = Math.max(target, 0.8);
        maybeFinish();
      };
      window.addEventListener("load", onLoad, { once: true });
      timers.push(
        // Safety net: never trap the user behind the preloader if `load`
        // is delayed by a slow third-party resource.
        window.setTimeout(finish, 8000),
      );
    }

    const tick = () => {
      // Ease `shown` toward the current target. While waiting on a load
      // milestone (target < 1) it asymptotes and holds just under it. Once
      // everything is loaded (target = 1) a small floor guarantees a steady,
      // non-stalling finish instead of an ever-slower crawl to 100.
      const gap = target - shown;
      shown +=
        target >= 1 ? Math.max(gap * 0.12, 0.006) : gap * 0.08;
      if (shown > target) shown = target;
      const pct = Math.min(100, Math.max(1, Math.round(shown * 100)));
      setCount(pct);

      if (!done && target >= 1 && pct >= 100) {
        done = true;
        timers.push(window.setTimeout(() => setPhase("revealing"), 140));
        timers.push(window.setTimeout(() => setPhase("done"), 140 + REVEAL_MS));
        return;
      }
      raf = requestAnimationFrame(tick);
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
