"use client";

import { useEffect, useRef } from "react";
import { Bodies, Body, Composite, Engine } from "matter-js";
import {
  coverFor,
  createOrbProgram,
  createTexture,
  disposeOrbProgram,
  drawOrb,
  ORB_VIEW,
  uploadImage,
} from "./glassOrbGl";

// Total orbs on the scene. The first `photos.length` carry a photo; the rest
// render as empty glass.
const ABOUT_ORB_COUNT = 12;
const WALL = 400; // static wall/floor thickness (thick → no tunnelling)
const STEP = 1000 / 60; // fixed physics step (ms) — stable across frame rates

type FallingOrbsProps = {
  /** Photo paths for the filled orbs (see data.ts `aboutOrbPhotos`). */
  photos: string[];
  /** Total orb count; extras beyond `photos` are empty glass. */
  count?: number;
  className?: string;
};

type OrbMeta = { body: Body; radius: number; texIndex: number };
type Tex = { texture: WebGLTexture; cover: [number, number] } | null;

export default function FallingOrbs({
  photos,
  count = ABOUT_ORB_COUNT,
  className = "",
}: FallingOrbsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return; // no WebGL2 → scene is simply absent, About text unaffected

    const prog = createOrbProgram(gl);
    if (!prog) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    // One texture per photo, loaded once and reused across rebuilds.
    const textures: Tex[] = photos.map(() => null);
    photos.forEach((src, i) => {
      const tex = createTexture(gl);
      if (!tex) return;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        uploadImage(gl, tex, img);
        textures[i] = {
          texture: tex,
          cover: coverFor(img.naturalWidth, img.naturalHeight),
        };
        if (!running) draw(performance.now()); // settled/idle → repaint once
      };
      img.src = src;
    });

    let engine: Engine | null = null;
    let orbs: OrbMeta[] = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let quiet = 0;
    const start = performance.now();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 0.5; // gentle fall

      const walls = [
        Bodies.rectangle(W / 2, H + WALL / 2, W + 4 * WALL, WALL, {
          isStatic: true,
        }), // floor
        Bodies.rectangle(-WALL / 2, 0, WALL, 20000, { isStatic: true }), // left
        Bodies.rectangle(W + WALL / 2, 0, WALL, 20000, { isStatic: true }), // right
      ];
      Composite.add(engine.world, walls);

      const scale = Math.min(1, W / 900);
      const gap = 130 * scale; // spawn spacing (grows with the bigger orbs)
      orbs = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.max(39, rand(60, 96) * scale); // +50% vs before
        const x = rand(radius + 8, W - radius - 8);
        const y = -radius - i * gap - rand(0, 40); // staggered above the top
        // Physics circle matches the VISIBLE sphere (which fills 1/ORB_VIEW of
        // its viewport), so bodies touch exactly where the glass spheres touch.
        const body = Bodies.circle(x, y, radius / ORB_VIEW, {
          restitution: 0.32,
          friction: 0.06,
          frictionStatic: 0.4,
          frictionAir: 0.008,
        });
        Body.setVelocity(body, { x: rand(-1.2, 1.2), y: 0 });
        Composite.add(engine.world, body);
        orbs.push({ body, radius, texIndex: i < photos.length ? i : -1 });
      }
      quiet = 0;
    };

    const draw = (now: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const time = (now - start) / 1000;
      // Back-to-front by screen-y: lower orbs paint last, sit in front.
      const ordered = [...orbs].sort(
        (a, b) => a.body.position.y - b.body.position.y,
      );
      for (const o of ordered) {
        const { x, y } = o.body.position;
        const r = o.radius;
        const t = o.texIndex >= 0 ? textures[o.texIndex] : null;
        drawOrb(gl, prog, {
          x: (x - r) * dpr,
          y: (H - (y + r)) * dpr,
          size: 2 * r * dpr,
          time,
          texture: t ? t.texture : null,
          cover: t ? t.cover : [1, 1],
        });
      }
    };

    // True once every orb is asleep — the pile has come to rest.
    const settled = () => orbs.length > 0 && orbs.every((o) => o.body.isSleeping);

    const loop = (now: number) => {
      if (!running || !engine) return;
      Engine.update(engine, STEP);
      draw(now);
      quiet = settled() ? quiet + 1 : 0;
      if (quiet > 30) {
        pause(); // rest — stop burning frames until a resize wakes us
        return;
      }
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

    const onVis = () => {
      if (document.visibilityState !== "visible") pause();
      else if (!settled()) play();
    };
    document.addEventListener("visibilitychange", onVis);

    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        pause();
        if (engine) Engine.clear(engine);
        run();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const run = () => {
      build();
      if (reduce) {
        // No animation — settle the pile off-screen, then paint one frame.
        for (let i = 0; i < 3000 && engine && !settled(); i++)
          Engine.update(engine, STEP);
        draw(performance.now());
      } else {
        play();
      }
    };

    run();

    return () => {
      pause();
      window.clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (engine) Engine.clear(engine);
      for (const t of textures) if (t) gl.deleteTexture(t.texture);
      disposeOrbProgram(gl, prog);
    };
  }, [photos, count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
