"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fan Card Carousel — a fanned deck of photos (inspired by the Framer
 * "Fan Card Carousel" composition, rebuilt from scratch).
 *
 * Three motions, deliberately kept independent so they never fight:
 *  1. Fan layout   — each card is offset from the active one by rotation +
 *     horizontal spread + a downward arc, pivoting from below (hand-of-cards).
 *     Lives on the outer `.fan-slot`; animates on switch.
 *  2. Parallax hover — only the active card tilts in 3D toward the pointer, and
 *     its photo shifts the opposite way for depth. Lives on the inner
 *     `.fan-card` / its `<img>`, driven by CSS vars set on the stage.
 *  3. Switch        — clicking a side card (or arrow keys / swipe) re-centres it
 *     and the whole deck re-fans on `--ease-out-strong`.
 *
 * Dynamic transforms are inline (per-card, computed from the active index);
 * transitions + reduced-motion live in globals.css (`.fan-*`).
 */

export type FanPhoto = { src: string; alt: string };

// Fan geometry — tuned for a tight, legible spread on one screen.
const STEP_ROTATE = 7; // deg per card away from centre
const STEP_X = 64; // px horizontal spread per step
const STEP_Y = 24; // px downward arc per step
const STEP_SCALE = 0.05; // shrink per step
const MAX_VISIBLE = 3; // cards shown on each side of the active one

export default function FanCarousel({
  photos,
  initial = Math.floor(photos.length / 2),
}: {
  photos: FanPhoto[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);
  const dragX = useRef<number | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(photos.length - 1, i)),
    [photos.length],
  );

  // Pointer tilt → CSS vars on the stage (only the active card reads them).
  const onMove = useCallback((e: React.MouseEvent) => {
    if (reduced.current) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--fan-tx", `${px * 16}deg`);
    el.style.setProperty("--fan-ty", `${-py * 12}deg`);
    el.style.setProperty("--fan-px", `${px * -14}px`);
    el.style.setProperty("--fan-py", `${py * -14}px`);
  }, []);

  const resetTilt = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    for (const v of ["--fan-tx", "--fan-ty", "--fan-px", "--fan-py"])
      el.style.setProperty(v, "0");
  }, []);

  // Keyboard: ←/→ move through the deck.
  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActive((a) => clamp(a - 1));
      else if (e.key === "ArrowRight") setActive((a) => clamp(a + 1));
    },
    [clamp],
  );

  // Pointer drag / swipe → prev / next.
  const onDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (dx > 44) setActive((a) => clamp(a - 1));
    else if (dx < -44) setActive((a) => clamp(a + 1));
  };

  return (
    <div
      ref={stageRef}
      className="fan-stage"
      role="group"
      aria-label="Photos"
      tabIndex={0}
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {photos.map((p, i) => {
        const d = i - active;
        const ad = Math.abs(d);
        const hidden = ad > MAX_VISIBLE;
        const isActive = d === 0;
        const slotStyle: React.CSSProperties = {
          transform: `translateX(${d * STEP_X}px) translateY(${ad * STEP_Y}px) rotate(${d * STEP_ROTATE}deg) scale(${Math.max(0.8, 1 - ad * STEP_SCALE)})`,
          zIndex: 100 - ad,
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
        };
        return (
          <button
            key={p.src}
            type="button"
            className="fan-slot"
            data-active={isActive}
            style={slotStyle}
            aria-label={isActive ? `${p.alt} (current)` : `Show ${p.alt}`}
            aria-current={isActive}
            tabIndex={-1}
            onClick={() => !isActive && setActive(i)}
          >
            <span className="fan-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} draggable={false} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
