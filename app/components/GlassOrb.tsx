"use client";

import { useEffect, useRef, useState } from "react";
import {
  coverFor,
  createOrbProgram,
  createTexture,
  disposeOrbProgram,
  drawOrb,
  uploadImage,
} from "./glassOrbGl";

type GlassOrbProps = {
  /** Image sampled "inside" the glass (same-origin, e.g. /img/avatar.jpg). */
  src: string;
  /** Accessible name — the orb carries it via role="img". */
  alt: string;
  /** Rendered diameter in CSS px. */
  size?: number;
  className?: string;
  /** Magnetically pull the orb toward the cursor when it comes close. */
  magnetic?: boolean;
};

export default function GlassOrb({
  src,
  alt,
  size = 80,
  className = "",
  magnetic = false,
}: GlassOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  // Once WebGL is live and the photo has uploaded, hide the <img> fallback.
  const [webglActive, setWebglActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return; // no WebGL2 → <img> fallback stays

    const prog = createOrbProgram(gl);
    if (!prog) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const px = Math.round(size * dpr);
    canvas.width = px;
    canvas.height = px;

    // Photo texture — stays null (empty glass) until the image lands.
    const tex = createTexture(gl);
    let texReady: WebGLTexture | null = null;
    let cover: [number, number] = [1, 1];

    let disposed = false;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let running = false;
    const start = performance.now();

    const draw = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawOrb(gl, prog, {
        x: 0,
        y: 0,
        size: px,
        time: (now - start) / 1000,
        texture: texReady,
        cover,
      });
    };
    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Run only while visible and the tab is active.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && document.visibilityState === "visible") play();
        else pause();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);
    const onVis = () => {
      if (document.visibilityState !== "visible") pause();
      else if (io) play();
    };
    document.addEventListener("visibilitychange", onVis);

    // Photo texture upload; redraw once it lands so it appears even when idle.
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed || !tex) return;
      uploadImage(gl, tex, img);
      cover = coverFor(img.naturalWidth, img.naturalHeight);
      texReady = tex;
      setWebglActive(true);
      draw(performance.now());
    };
    img.src = src;

    // First paint (also the only paint under reduced motion).
    draw(performance.now());

    return () => {
      disposed = true;
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      img.onload = null;
      if (tex) gl.deleteTexture(tex);
      disposeOrbProgram(gl, prog);
      // NB: no WEBGL_lose_context here — React reuses the same <canvas> across
      // remounts (HMR, Strict Mode), and a lost context can't be re-inited.
    };
  }, [src, size]);

  // Magnetic follow: pull the orb toward the cursor while it's near, spring back
  // to center when it leaves. Moves only `transform`; disabled for touch/reduced.
  useEffect(() => {
    if (!magnetic) return;
    const wrap = wrapRef.current;
    const orb = orbRef.current;
    if (!wrap || !orb) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return; // no effect — orb stays centered
    }

    const TRIGGER = 150 + size / 2; // 150px from the orb's edge → from its center
    const STRENGTH = 0.3;
    const MAX = 60;
    const EASE = 0.15;

    let cursorX = 0;
    let cursorY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

    const frame = () => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cursorX - cx;
      const dy = cursorY - cy;
      const near = Math.hypot(dx, dy) < TRIGGER;
      const targetX = near ? clamp(dx * STRENGTH) : 0;
      const targetY = near ? clamp(dy * STRENGTH) : 0;

      curX += (targetX - curX) * EASE;
      curY += (targetY - curY) * EASE;

      // Settled and idle → snap to center and stop until the next move.
      if (
        !near &&
        Math.abs(curX) < 0.1 &&
        Math.abs(curY) < 0.1
      ) {
        curX = 0;
        curY = 0;
        orb.style.transform = "translate3d(0,0,0)";
        running = false;
        raf = 0;
        return;
      }

      orb.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      wake();
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      orb.style.transform = "";
    };
  }, [magnetic, size]);

  const orb = (
    <div
      ref={orbRef}
      role="img"
      aria-label={alt}
      className={`glass-orb ${className}`}
      style={{ width: size, height: size, willChange: magnetic ? "transform" : undefined }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ width: size, height: size, display: "block" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="glass-orb-fallback"
        data-hidden={webglActive}
      />
    </div>
  );

  if (!magnetic) return orb;

  // Untransformed wrapper — a stable box to measure the rest-center from while
  // the inner .glass-orb is being translated. `flex` (not inline-block) so no
  // inline descender space is reserved below the orb, which would inflate the
  // gap to the text beneath it.
  return (
    <div ref={wrapRef} style={{ display: "flex" }}>
      {orb}
    </div>
  );
}
