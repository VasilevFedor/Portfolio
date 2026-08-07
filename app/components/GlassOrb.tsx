"use client";

import { useEffect, useRef, useState } from "react";

type GlassOrbProps = {
  /** Image sampled "inside" the glass (same-origin, e.g. /img/avatar.jpg). */
  src: string;
  /** Accessible name — the orb carries it via role="img". */
  alt: string;
  /** Rendered diameter in CSS px. */
  size?: number;
  className?: string;
};

const VERT = `#version 300 es
precision highp float;
const vec2 verts[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(verts[gl_VertexID], 0.0, 1.0); }`;

// SDF-raymarched glass sphere. Refraction + chromatic aberration sample the
// avatar on the sphere's centre plane; Fresnel, a top-left specular and a light
// vertical reflection sell the glass. Output is premultiplied so the orb sits
// transparently on the light page.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uTex;
uniform float uTexReady;
out vec4 frag;

float sdSphere(vec3 p, float r){ return length(p) - r; }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes); // -1..1, y up
  float view = 1.18;
  vec2 sp = uv * view;

  float R = 1.0 + 0.02 * sin(uTime * 0.9); // idle breathing

  // Analytic silhouette drives anti-aliased coverage.
  float sil = length(sp) - R;
  float aa = fwidth(sil) * 1.5 + 1e-4;
  float coverage = 1.0 - smoothstep(0.0, aa, sil);
  if(coverage <= 0.0){ frag = vec4(0.0); return; }

  // Orthographic ray, sphere-traced.
  vec3 ro = vec3(sp, 2.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);
  float t = 0.0; vec3 p = ro; bool hit = false;
  for(int i = 0; i < 72; i++){
    p = ro + rd * t;
    float d = sdSphere(p, R);
    if(d < 0.0008){ hit = true; break; }
    t += d;
    if(t > 4.0) break;
  }
  if(!hit){ // AA fringe pixel — place it on the analytic front hemisphere
    float z = sqrt(max(R * R - dot(sp, sp), 0.0));
    p = vec3(sp, z);
  }

  vec3 N = normalize(p);   // centred sphere: normal == position
  vec3 V = -rd;

  float F = pow(1.0 - max(dot(N, V), 0.0), 5.0);
  F = mix(0.04, 1.0, F);

  // Flat photo mapping — no refraction bending, so the avatar reads naturally.
  // The glass lives in the reflections and highlights below, not a fisheye lens.
  vec3 avatar = vec3(0.74, 0.80, 0.88);
  if(uTexReady > 0.5){
    vec2 uvA = sp * 0.5 + 0.5;
    avatar = texture(uTex, uvA).rgb;
  }

  // Light-theme vertical reflection.
  vec3 refl = reflect(rd, N);
  vec3 env = mix(vec3(0.80, 0.86, 0.95), vec3(0.99, 1.0, 1.0),
                 clamp(refl.y * 0.5 + 0.5, 0.0, 1.0));

  vec3 col = mix(avatar, env, clamp(F * 0.65 + 0.06, 0.0, 1.0));
  col *= 1.0 - 0.08 * clamp(-N.y, 0.0, 1.0); // gentle bottom form shadow

  // Two elongated edge highlights hugging the top and bottom rims. Each is a
  // band of constant angle around a tilted, slightly forward axis A: because A
  // has a Z component, the iso-angle rings project to ellipses, so the light
  // line curves as an arc across the sphere instead of a straight stripe.
  const float lean = -0.38;                    // ~-22deg tilt (mirrored)
  vec3 A = normalize(vec3(sin(lean), cos(lean), 0.5));
  float dd = dot(N, A);
  float topHi = exp(-pow((dd - 0.80) / 0.16, 2.0));
  float botHi = exp(-pow((dd + 0.80) / 0.16, 2.0));
  col += topHi * 0.26;                          // top edge streak (calmer)
  col += botHi * vec3(0.90, 0.94, 1.0) * 0.20;  // bottom edge streak (cooler)
  col += F * 0.12;                              // fresnel edge brighten

  col = clamp(col, 0.0, 1.0);
  frag = vec4(col * coverage, coverage);   // premultiplied
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function GlassOrb({
  src,
  alt,
  size = 80,
  className = "",
}: GlassOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Once WebGL is live and the avatar has uploaded, hide the <img> fallback.
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

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);
    const vao = gl.createVertexArray(); // WebGL2 needs a bound VAO to draw
    gl.bindVertexArray(vao);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uTexReady = gl.getUniformLocation(prog, "uTexReady");
    const uTex = gl.getUniformLocation(prog, "uTex");

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const px = Math.round(size * dpr);
    canvas.width = px;
    canvas.height = px;
    gl.viewport(0, 0, px, px);
    gl.uniform2f(uRes, px, px);
    gl.uniform1i(uTex, 0);
    gl.uniform1f(uTexReady, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied
    gl.clearColor(0, 0, 0, 0);

    // Avatar texture (placeholder until the image loads).
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([190, 200, 220, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let disposed = false;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let running = false;
    const start = performance.now();

    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
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

    // Avatar texture upload; redraw once it lands so it appears even when idle.
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.uniform1f(uTexReady, 1);
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
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
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
