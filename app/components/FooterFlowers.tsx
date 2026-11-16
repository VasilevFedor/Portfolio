"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import FooterMeadow from "./FooterMeadow";

type RGB = [number, number, number];

function tokenRGB(name: string): RGB {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (value.startsWith("#")) {
    const hex = value.length === 4 ? [...value.slice(1)].map(c => c + c).join("") : value.slice(1);
    return [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16)) as RGB;
  }
  return value.match(/[\d.]+/g)!.slice(0, 3).map(Number) as RGB;
}

function mix(from: RGB, to: RGB, amount: number) {
  return `rgb(${from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)).join(" ")})`;
}

const bloomCenters = [[0.2, 0.51], [0.63, 0.27], [0.85, 0.7]];

// Hit testing only. The artwork itself is divided along connected silhouettes.
function flowerLayer(x: number, y: number) {
  const distances = bloomCenters.map(([cx, cy]) => (cx - x) ** 2 + (cy - y) ** 2);
  return distances.indexOf(Math.min(...distances));
}

/** Geodesic flood fill follows petals and stems, never a rectangular crop. */
function flowerLabels(data: Uint8ClampedArray, cols: number, rows: number) {
  const size = cols * rows;
  const occupied = new Uint8Array(size);
  const connected = new Uint8Array(size);
  const labels = new Int8Array(size).fill(-1);
  const neighbors = (index: number) => {
    const x = index % cols;
    const y = Math.floor(index / cols);
    const result: number[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if ((!dx && !dy) || x + dx < 0 || x + dx >= cols || y + dy < 0 || y + dy >= rows) continue;
        result.push((y + dy) * cols + x + dx);
      }
    }
    return result;
  };
  for (let index = 0; index < size; index++) {
    const offset = (Math.floor(index / cols) * 2 * cols * 2 + (index % cols) * 2) * 4 + 3;
    const alpha = data[offset] + data[offset + 4] + data[offset + cols * 8] + data[offset + cols * 8 + 4];
    if (alpha > 40) {
      occupied[index] = 1;
      connected[index] = 1;
      // Preserve transparent gaps: expanding this mask can join neighboring petals.
    }
  }
  const queue: number[] = [];
  bloomCenters.forEach(([cx, cy], label) => {
    let seed = -1;
    let shortest = Infinity;
    for (let index = 0; index < size; index++) {
      if (!occupied[index]) continue;
      const distance = ((index % cols) / cols - cx) ** 2 + (Math.floor(index / cols) / rows - cy) ** 2;
      if (distance < shortest) { shortest = distance; seed = index; }
    }
    if (seed >= 0) { labels[seed] = label; queue.push(seed); }
  });
  for (let head = 0; head < queue.length; head++) {
    const index = queue[head];
    for (const adjacent of neighbors(index)) {
      if (!connected[adjacent] || labels[adjacent] !== -1) continue;
      labels[adjacent] = labels[index];
      queue.push(adjacent);
    }
  }
  // Any detached fine detail is assigned as one complete island, never sliced.
  for (let seed = 0; seed < size; seed++) {
    if (!connected[seed] || labels[seed] !== -1) continue;
    const island = [seed];
    labels[seed] = -2;
    let x = 0, y = 0;
    for (let head = 0; head < island.length; head++) {
      const index = island[head];
      x += index % cols; y += Math.floor(index / cols);
      for (const adjacent of neighbors(index)) {
        if (connected[adjacent] && labels[adjacent] === -1) {
          labels[adjacent] = -2;
          island.push(adjacent);
        }
      }
    }
    const label = flowerLayer(x / island.length / cols, y / island.length / rows);
    for (const index of island) labels[index] = label;
  }
  return labels;
}

const spring = { mass: 1, stiffness: 100, damping: 10 };

/** Sample once per size; animate the three rasterized character layers as transforms. */
export default function FooterFlowers({
  mirrored = false,
  accents = true,
  sourceUrl = "/img/footer-flowers/cosmos-sample.webp",
  label = "Gently sway the flowers",
}: { mirrored?: boolean; accents?: boolean; sourceUrl?: string; label?: string }) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCount = useRef(0);
  const reducedMotion = useReducedMotion();
  const left = useSpring(0, spring);
  const center = useSpring(0, spring);
  const right = useSpring(0, spring);
  const leftTransform = useMotionTemplate`rotate(${left}deg)`;
  const centerTransform = useMotionTemplate`rotate(${center}deg)`;
  const rightTransform = useMotionTemplate`rotate(${right}deg)`;

  function stir(event: MouseEvent<HTMLButtonElement>) {
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    if (reducedMotion || event.detail === 0) {
      containerRef.current?.animate([{ opacity: 0.75 }, { opacity: 1 }], { duration: 160, easing: "ease" });
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width;
    const x = mirrored ? 1 - pointerX : pointerX;
    const y = (event.clientY - bounds.top) / bounds.height;
    const selected = flowerLayer(x, y);
    const direction = ++clickCount.current % 2 ? 1 : -1;
    [left, center, right].forEach((value, index) => {
      value.set(direction * (index === selected ? 3.2 : 1.15) * (index === 2 ? -1 : 1));
    });
    releaseTimer.current = setTimeout(() => {
      [left, center, right].forEach(value => value.set(0));
    }, 160);
  }

  useEffect(() => () => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
  }, []);

  useEffect(() => {
    if (reducedMotion) [left, center, right].forEach(value => value.jump(0));
  }, [reducedMotion, left, center, right]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvases = Array.from(container.querySelectorAll("canvas"));
    const contexts = canvases.map(canvas => canvas.getContext("2d"));
    if (contexts.some(context => !context)) return;

    const source = new Image();
    let disposed = false;
    let sourceReady = false;
    let sourceRequested = false;
    let previousWidth = 0;
    const paint = () => {
      const width = Math.round(container.getBoundingClientRect().width);
      if (disposed || !sourceReady || width < 1 || width === previousWidth) return;
      previousWidth = width;
      const height = Math.round(width * 2 / 3);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvases.forEach((canvas, index) => {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        contexts[index]!.setTransform(dpr, 0, 0, dpr, 0, 0);
        contexts[index]!.clearRect(0, 0, width, height);
      });

      // Keep individual characters readable on narrow screens as well.
      const cellWidth = width < 500 ? 3 : 4;
      const cellHeight = cellWidth * 1.5;
      const cols = Math.ceil(width / cellWidth);
      const rows = Math.ceil(height / cellHeight);
      const sampler = document.createElement("canvas");
      sampler.width = cols * 2;
      sampler.height = rows * 2;
      const sampleContext = sampler.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      // Sampling pixels represent rectangular character cells, not square pixels.
      const scale = Math.min(width / source.naturalWidth, height / source.naturalHeight);
      const imageWidth = source.naturalWidth * scale / cellWidth * 2;
      const imageHeight = source.naturalHeight * scale / cellHeight * 2;
      sampleContext.drawImage(source, (sampler.width - imageWidth) / 2, sampler.height - imageHeight, imageWidth, imageHeight);
      const { data } = sampleContext.getImageData(0, 0, sampler.width, sampler.height);
      const labels = flowerLabels(data, cols, rows);
      const paper = tokenRGB("--background");
      const petal = tokenRGB("--flower-petal");
      const shadow = tokenRGB("--flower-shadow");
      const stem = tokenRGB("--flower-stem");
      const pollen = tokenRGB("--flower-pollen");
      const glyphs = ".,:;+=ox%#@";
      contexts.forEach(context => {
        context!.font = `500 ${cellHeight}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context!.textAlign = "center";
        context!.textBaseline = "middle";
      });

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let red = 0, green = 0, blue = 0, alpha = 0;
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const offset = ((row * 2 + dy) * sampler.width + col * 2 + dx) * 4;
              const coverage = data[offset + 3] / 255;
              red += data[offset] * coverage;
              green += data[offset + 1] * coverage;
              blue += data[offset + 2] * coverage;
              alpha += coverage;
            }
          }
          if (alpha < 0.16) continue;
          red /= alpha; green /= alpha; blue /= alpha;
          const coverage = Math.min(1, alpha / 4);
          const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
          const isPollen = red > blue * 1.3 && green > blue * 1.12 && red > green * 1.04;
          const isStem = !isPollen && luminance < 0.7 && green > blue * 1.15 && green > red * 0.95;
          const depth = Math.min(1, Math.max(0, (1 - luminance) * 1.8));
          const ink = isPollen ? pollen : isStem ? stem : shadow;
          const noise = ((col * 13 + row * 7) % 11) / 11;
          const density = isStem ? 0.4 + depth * 0.55 : 0.08 + depth * 0.8;
          const index = Math.min(glyphs.length - 1, Math.floor((density + (noise - 0.5) * 0.14) * glyphs.length));
          const glyph = coverage < 0.42 ? (isStem ? "/" : ".") : glyphs[Math.max(0, index)];
          const x = col * cellWidth;
          const y = row * cellHeight;

          const label = labels[row * cols + col];
          const context = contexts[label >= 0 ? label : flowerLayer(x / width, y / height)]!;
          // Fine ink and a faint wash retain the light petals and their folded shadows.
          context.globalAlpha = coverage * (isStem ? 0.08 : 0.16);
          context.fillStyle = isPollen || isStem ? mix(paper, ink, 0.45) : mix(paper, petal, 0.6 + depth * 0.4);
          context.fillRect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1);
          context.globalAlpha = Math.min(1, coverage * 1.7);
          context.fillStyle = mix(isStem || isPollen ? paper : petal, ink, isStem || isPollen ? 0.6 + depth * 0.4 : 0.22 + depth * 0.78);
          context.fillText(glyph, x + cellWidth / 2, y + cellHeight / 2);
        }
      }
      contexts.forEach(context => { context!.globalAlpha = 1; });
      container.dataset.ready = "";
    };

    source.onload = () => {
      sourceReady = true;
      paint();
    };
    // Do not download or rasterize an offscreen bouquet during hero startup.
    // A hidden mobile cluster has no intersection and never requests its image.
    const prepare = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || sourceRequested) return;
      sourceRequested = true;
      source.src = sourceUrl;
      prepare.disconnect();
    }, { rootMargin: "600px 0px" });
    prepare.observe(container);
    const observer = new ResizeObserver(paint);
    observer.observe(container);
    const reveal = new IntersectionObserver(([entry]) => {
      container.toggleAttribute("data-in-view", entry.isIntersecting);
      if (entry.isIntersecting) {
        container.dataset.shown = "";
      }
    }, { threshold: 0.2 });
    reveal.observe(container);
    return () => {
      disposed = true;
      source.onload = null;
      prepare.disconnect();
      observer.disconnect();
      reveal.disconnect();
    };
  }, [sourceUrl]);

  return (
    <button ref={containerRef} type="button" className="footer-flowers" onClick={stir} aria-label={label}>
      {accents && <FooterMeadow />}
      {[leftTransform, centerTransform, rightTransform].map((transform, index) => (
        <span key={index} className="footer-flowers__reveal" style={{ transitionDelay: `${index * 70}ms` }}>
          <span className="footer-flowers__sway">
            <motion.canvas className="footer-flowers__canvas" aria-hidden="true" style={{ transform }} />
          </span>
        </span>
      ))}
    </button>
  );
}
