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
};

export default function GlassOrb({
  src,
  alt,
  size = 80,
  className = "",
}: GlassOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  return (
    <div
      role="img"
      aria-label={alt}
      className={`glass-orb ${className}`}
      style={{ width: size, height: size }}
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
}
