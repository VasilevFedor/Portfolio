"use client";

import { useEffect, useRef } from "react";

export type FanPhoto = { src: string; alt: string };

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;

uniform vec2 uResolution;
uniform vec4 uRect;
uniform float uBendStrength;

out vec2 vUv;
out float vEdge;

void main() {
  vec2 pixel = uRect.xy + aPosition * uRect.zw;
  vec2 position = pixel / uResolution * 2.0 - 1.0;

  float screenX = pixel.x / uResolution.x;
  float distanceToEdge = min(screenX, 1.0 - screenX);
  float edge = pow(smoothstep(0.1, 0.0, distanceToEdge), 2.6);
  float blend = smoothstep(0.0002, 0.0003, edge);

  // The entire rail flares around one shared centreline. X stays untouched —
  // moving it creates a duplicated vertical strip instead of a glassy edge.
  position.y *= 1.0 + uBendStrength * edge * blend;

  gl_Position = vec4(position, 0.0, 1.0);
  vUv = vec2(aPosition.x, 1.0 - aPosition.y);
  vEdge = edge;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uUvScale;

in vec2 vUv;
in float vEdge;

out vec4 outColor;

vec2 coverUv(vec2 uv) {
  return (uv - 0.5) * uUvScale + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 sampleUv = coverUv(uv);
  vec4 centre = texture(uTexture, sampleUv);
  float effect = smoothstep(0.0003, 0.012, vEdge);
  float aberration = 0.02 * effect * (0.4 + vEdge);
  float red = texture(uTexture, coverUv(uv + vec2(0.0, aberration))).r;
  float blue = texture(uTexture, coverUv(uv - vec2(0.0, aberration))).b;
  vec3 colour = mix(centre.rgb, vec3(red, centre.g, blue), effect);

  outColor = vec4(colour, centre.a);
}`;

const COLUMNS = 48;
const ROWS = 14;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function createMesh(gl: WebGL2RenderingContext) {
  const vertices: number[] = [];

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLUMNS; x += 1) {
      const left = x / COLUMNS;
      const right = (x + 1) / COLUMNS;
      const top = y / ROWS;
      const bottom = (y + 1) / ROWS;
      vertices.push(
        left,
        top,
        right,
        top,
        left,
        bottom,
        left,
        bottom,
        right,
        top,
        right,
        bottom,
      );
    }
  }

  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  return { buffer, count: vertices.length / 2 };
}

function loadTexture(gl: WebGL2RenderingContext, src: string) {
  return new Promise<{ texture: WebGLTexture; width: number; height: number }>(
    (resolve, reject) => {
      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        const texture = gl.createTexture();
        if (!texture) {
          reject(new Error("Could not create a photo texture"));
          return;
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image,
        );
        resolve({ texture, width: image.naturalWidth, height: image.naturalHeight });
      };
      image.onerror = reject;
      image.src = src;
    },
  );
}

export default function FanCarousel({
  photos,
  initial = Math.floor(photos.length / 2),
}: {
  photos: FanPhoto[];
  initial?: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas || photos.length === 0) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const program = createProgram(gl);
    const mesh = createMesh(gl);
    if (!program || !mesh) return;

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const rectLocation = gl.getUniformLocation(program, "uRect");
    const uvScaleLocation = gl.getUniformLocation(program, "uUvScale");
    const bendStrengthLocation = gl.getUniformLocation(
      program,
      "uBendStrength",
    );

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let textures: Awaited<ReturnType<typeof loadTexture>>[] = [];
    let frame = 0;
    let previousTime = performance.now();
    let stageWidth = 0;
    let stageHeight = 0;
    let renderHeight = 0;
    let overscan = 0;
    let cardWidth = 0;
    let cardHeight = 0;
    let gap = 0;
    let offset = 0;
    let velocity = 0;
    let dragging = false;
    let dragPointer = -1;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let disposed = false;

    const render = (time: number) => {
      frame = 0;
      if (disposed || textures.length !== photos.length) return;

      const delta = Math.min((time - previousTime) / 1000, 0.035);
      previousTime = time;
      let needsSnap = false;
      if (!dragging) {
        offset += velocity * delta;
        velocity *= Math.pow(0.045, delta);
        if (Math.abs(velocity) < 1) velocity = 0;

        if (stageWidth < 640 && Math.abs(velocity) < 90) {
          const step = cardWidth + gap;
          const centredX = (stageWidth - cardWidth) / 2;
          const rawDelta = centredX - offset;
          const snapDelta =
            ((((rawDelta + step / 2) % step) + step) % step) - step / 2;

          if (Math.abs(snapDelta) > 0.25) {
            offset += snapDelta * Math.min(1, delta * 14);
            needsSnap = true;
          } else {
            offset += snapDelta;
            velocity = 0;
          }
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(stageWidth * dpr);
      const height = Math.round(renderHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolutionLocation, stageWidth, renderHeight);

      const step = cardWidth + gap;
      const totalWidth = step * photos.length;

      for (let index = 0; index < photos.length; index += 1) {
        let x = index * step + offset;
        x = ((((x + step) % totalWidth) + totalWidth) % totalWidth) - step;

        const photo = textures[index];
        const imageAspect = photo.width / photo.height;
        const cardAspect = cardWidth / cardHeight;
        const scaleX = imageAspect > cardAspect ? cardAspect / imageAspect : 1;
        const scaleY = imageAspect < cardAspect ? imageAspect / cardAspect : 1;

        gl.bindTexture(gl.TEXTURE_2D, photo.texture);
        gl.uniform4f(
          rectLocation,
          x,
          overscan + (stageHeight - cardHeight) / 2,
          cardWidth,
          cardHeight,
        );
        gl.uniform2f(uvScaleLocation, scaleX, scaleY);
        gl.drawArrays(gl.TRIANGLES, 0, mesh.count);

        const wrappedX = x + totalWidth;
        if (wrappedX < stageWidth + step) {
          gl.uniform4f(
            rectLocation,
            wrappedX,
            overscan + (stageHeight - cardHeight) / 2,
            cardWidth,
            cardHeight,
          );
          gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
        }
      }

      if (dragging || velocity !== 0 || needsSnap) {
        frame = requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      stageWidth = bounds.width;
      stageHeight = bounds.height;
      gl.uniform1f(bendStrengthLocation, stageWidth < 640 ? 0.15 : 0.6);
      cardHeight = Math.min(stageHeight - 32, 720);
      cardWidth =
        stageWidth < 640
          ? Math.min(cardHeight * 0.72, stageWidth * 0.82)
          : cardHeight * 0.72;
      gap = Math.max(10, Math.min(18, stageWidth * 0.015));
      overscan = Math.ceil(cardHeight * 0.36);
      renderHeight = stageHeight + overscan * 2;
      canvas.style.top = `${-overscan}px`;
      canvas.style.height = `${renderHeight}px`;
      offset = stageWidth / 2 - initial * (cardWidth + gap) - cardWidth / 2;
      requestRender();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      velocity = Math.max(-2400, Math.min(2400, velocity - delta * 5));
      requestRender();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (dragging) return;
      dragging = true;
      dragPointer = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      velocity = 0;
      stage.dataset.dragging = "true";
      stage.setPointerCapture(event.pointerId);
      requestRender();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== dragPointer) return;
      const now = performance.now();
      const deltaX = event.clientX - lastPointerX;
      const deltaTime = Math.max((now - lastPointerTime) / 1000, 0.008);
      offset += deltaX;
      velocity = velocity * 0.55 + (deltaX / deltaTime) * 0.45;
      lastPointerX = event.clientX;
      lastPointerTime = now;
      requestRender();
    };

    const finishDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== dragPointer) return;
      dragging = false;
      dragPointer = -1;
      delete stage.dataset.dragging;
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
      requestRender();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      velocity += event.key === "ArrowLeft" ? 720 : -720;
      velocity = Math.max(-1800, Math.min(1800, velocity));
      requestRender();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", finishDrag);
    stage.addEventListener("pointercancel", finishDrag);
    stage.addEventListener("keydown", onKeyDown);

    Promise.all(photos.map((photo) => loadTexture(gl, photo.src)))
      .then((loaded) => {
        if (disposed) {
          loaded.forEach((photo) => gl.deleteTexture(photo.texture));
          return;
        }
        textures = loaded;
        stage.dataset.webgl = "ready";
        resize();
      })
      .catch(() => {
        delete stage.dataset.webgl;
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", finishDrag);
      stage.removeEventListener("pointercancel", finishDrag);
      stage.removeEventListener("keydown", onKeyDown);
      textures.forEach((photo) => gl.deleteTexture(photo.texture));
      gl.deleteBuffer(mesh.buffer);
      gl.deleteProgram(program);
    };
  }, [initial, photos]);

  return (
    <div
      ref={stageRef}
      className="lens-carousel"
      role="region"
      aria-label="Photos"
      tabIndex={0}
    >
      <canvas
        ref={canvasRef}
        className="lens-carousel__canvas"
        aria-hidden="true"
      />

      <div className="lens-carousel__fallback" aria-hidden="true">
        {photos.map((photo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={photo.src} src={photo.src} alt="" draggable={false} />
        ))}
      </div>

      <ul className="sr-only">
        {photos.map((photo) => (
          <li key={photo.src}>{photo.alt}</li>
        ))}
      </ul>
      <p className="sr-only">Use the arrow keys to move through the photos.</p>
    </div>
  );
}
